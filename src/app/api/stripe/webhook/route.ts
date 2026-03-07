import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAdminDb } from '@/lib/firebase-admin';
import type Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// ── Helpers ──────────────────────────────────────────────────────────

/** Get firebase UID from a subscription (metadata lookup) */
async function getUidFromSubscription(subscriptionId: string): Promise<string | null> {
  try {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    return sub.metadata?.firebaseUid || null;
  } catch { return null; }
}

/** Get firebase UID from a customer ID by querying Firestore */
async function getUidFromCustomer(customerId: string): Promise<string | null> {
  const db = getAdminDb();
  const snap = await db.collection('users')
    .where('stripeCustomerId', '==', customerId)
    .limit(1)
    .get();
  return snap.empty ? null : snap.docs[0].id;
}

/** Extract subscription expiry date */
function getExpiryDate(subscription: Stripe.Subscription): string {
  const periodEnd = subscription.items.data[0]?.current_period_end;
  const ms = periodEnd ? periodEnd * 1000 : Date.now() + 365 * 24 * 60 * 60 * 1000;
  return new Date(ms).toISOString().split('T')[0];
}

// ── Webhook Handler ──────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  const db = getAdminDb();

  try {
    switch (event.type) {

      // ── Checkout ──────────────────────────────────────────────────

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.metadata?.firebaseUid;
        if (!uid) break;

        const subscriptionId = session.subscription as string;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'pro',
          subscriptionStatus: 'active',
          subscriptionExpiry: getExpiryDate(subscription),
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscriptionId,
          paymentFailedAt: null,
          disputeOpen: false,
        });

        console.log(`[Stripe] Activated Pro for user ${uid}`);
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.metadata?.firebaseUid;
        console.log(`[Stripe] Checkout expired for user ${uid || 'unknown'}`);
        break;
      }

      // ── Subscription lifecycle ────────────────────────────────────

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'pro',
          subscriptionStatus: 'active',
          subscriptionExpiry: getExpiryDate(subscription),
          stripeSubscriptionId: subscription.id,
        });

        console.log(`[Stripe] Subscription created for user ${uid}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        const status = subscription.status; // active, past_due, canceled, unpaid, paused
        const isPro = ['active', 'trialing'].includes(status);

        await db.collection('users').doc(uid).update({
          subscriptionTier: isPro ? 'pro' : 'free',
          subscriptionStatus: status as 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused',
          subscriptionExpiry: getExpiryDate(subscription),
        });

        console.log(`[Stripe] Subscription updated for user ${uid}, status: ${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'free',
          subscriptionStatus: 'canceled',
          stripeSubscriptionId: null,
        });

        console.log(`[Stripe] Downgraded user ${uid} to free tier`);
        break;
      }

      case 'customer.subscription.paused': {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'free',
          subscriptionStatus: 'paused',
        });

        console.log(`[Stripe] Subscription paused for user ${uid}`);
        break;
      }

      case 'customer.subscription.resumed': {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'pro',
          subscriptionStatus: 'active',
          subscriptionExpiry: getExpiryDate(subscription),
        });

        console.log(`[Stripe] Subscription resumed for user ${uid}`);
        break;
      }

      // ── Invoices & payments ───────────────────────────────────────

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as unknown as Record<string, unknown>).subscription as string | null;
        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'pro',
          subscriptionStatus: 'active',
          subscriptionExpiry: getExpiryDate(subscription),
          paymentFailedAt: null, // clear any previous failure
        });

        console.log(`[Stripe] Invoice paid for user ${uid}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as unknown as Record<string, unknown>).subscription as string | null;
        if (!subscriptionId) break;

        const uid = await getUidFromSubscription(subscriptionId);
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionStatus: 'past_due',
          paymentFailedAt: new Date().toISOString(),
        });
        // Note: DON'T immediately downgrade — Stripe will retry.
        // Only downgrade when subscription.deleted fires after all retries fail.

        console.warn(`[Stripe] Payment failed for user ${uid} — subscription now past_due`);
        break;
      }

      case 'invoice.upcoming': {
        // Sent ~3 days before renewal — could trigger a reminder email
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as unknown as Record<string, unknown>).subscription as string | null;
        if (!subscriptionId) break;

        const uid = await getUidFromSubscription(subscriptionId);
        console.log(`[Stripe] Upcoming invoice for user ${uid || 'unknown'}, subscription ${subscriptionId}`);
        // TODO: Send renewal reminder email via Resend
        break;
      }

      // ── Disputes & refunds ────────────────────────────────────────

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        const customerId = (dispute as unknown as Record<string, unknown>).customer as string | null;
        if (!customerId) break;

        const uid = await getUidFromCustomer(customerId);
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          disputeOpen: true,
          // Immediately revoke Pro access during dispute
          subscriptionTier: 'free',
          subscriptionStatus: 'unpaid',
        });

        console.warn(`[Stripe] DISPUTE OPENED for user ${uid}, charge ${dispute.charge}`);
        break;
      }

      case 'charge.dispute.closed': {
        const dispute = event.data.object as Stripe.Dispute;
        const customerId = (dispute as unknown as Record<string, unknown>).customer as string | null;
        if (!customerId) break;

        const uid = await getUidFromCustomer(customerId);
        if (!uid) break;

        if (dispute.status === 'won') {
          // We won the dispute — restore Pro access
          const subId = (await db.collection('users').doc(uid).get()).data()?.stripeSubscriptionId;
          if (subId) {
            try {
              const subscription = await stripe.subscriptions.retrieve(subId);
              await db.collection('users').doc(uid).update({
                subscriptionTier: 'pro',
                subscriptionStatus: 'active',
                subscriptionExpiry: getExpiryDate(subscription),
                disputeOpen: false,
              });
            } catch {
              await db.collection('users').doc(uid).update({ disputeOpen: false });
            }
          } else {
            await db.collection('users').doc(uid).update({ disputeOpen: false });
          }
          console.log(`[Stripe] Dispute WON for user ${uid} — Pro restored`);
        } else {
          // Lost or withdrawn — keep downgraded
          await db.collection('users').doc(uid).update({
            disputeOpen: false,
            subscriptionTier: 'free',
          });
          console.warn(`[Stripe] Dispute LOST for user ${uid} — remains on free tier`);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const customerId = charge.customer as string | null;
        if (!customerId) break;

        const uid = await getUidFromCustomer(customerId);
        if (!uid) break;

        // Full refund → downgrade; partial refund → log only
        if (charge.refunded) {
          await db.collection('users').doc(uid).update({
            subscriptionTier: 'free',
            subscriptionStatus: 'canceled',
          });
          console.log(`[Stripe] Full refund for user ${uid} — downgraded to free`);
        } else {
          console.log(`[Stripe] Partial refund for user ${uid} — no tier change`);
        }
        break;
      }

      // ── Customer events ───────────────────────────────────────────

      case 'customer.updated': {
        const customer = event.data.object as Stripe.Customer;
        const uid = await getUidFromCustomer(customer.id);
        if (!uid) break;

        // Sync email/name if changed on Stripe side
        const updates: Record<string, unknown> = {};
        if (customer.email) updates.email = customer.email;
        if (customer.name) updates.displayName = customer.name;
        if (Object.keys(updates).length > 0) {
          await db.collection('users').doc(uid).update(updates);
        }

        console.log(`[Stripe] Customer updated for user ${uid}`);
        break;
      }

      case 'customer.deleted': {
        const customer = event.data.object as Stripe.Customer;
        const uid = await getUidFromCustomer(customer.id);
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'free',
          subscriptionStatus: 'canceled',
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        });

        console.log(`[Stripe] Customer deleted for user ${uid} — downgraded to free`);
        break;
      }

      // ── Payment intents ───────────────────────────────────────────

      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe] Payment succeeded: ${pi.id}, amount: ${pi.amount / 100} ${pi.currency.toUpperCase()}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        const lastError = pi.last_payment_error;
        console.warn(`[Stripe] Payment failed: ${pi.id}, reason: ${lastError?.message || 'unknown'}`);
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event: ${event.type}`);
        break;
    }
  } catch (err) {
    console.error(`[Stripe] Error processing ${event.type}:`, err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
