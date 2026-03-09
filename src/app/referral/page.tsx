import type { Metadata } from 'next';
import ReferralClient from './ReferralClient';

export const metadata: Metadata = {
  title: 'Refer & Earn Free Pro',
  description: 'Invite friends to BandUp and earn free Pro access. Every 3 referrals = 1 week of Pro.',
};

export default function ReferralPage() {
  return <ReferralClient />;
}
