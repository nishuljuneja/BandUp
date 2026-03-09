import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile, getUserProfile, type CEFRLevel, type SupportedLanguage, generateReferralCode, getUserByReferralCode, recordReferral } from './firestore';
import { Timestamp } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  nativeLanguage: SupportedLanguage,
  referralCode?: string
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName });

  // Resolve referrer before creating profile
  let referrerUid: string | undefined;
  if (referralCode) {
    const referrer = await getUserByReferralCode(referralCode);
    if (referrer && referrer.uid !== result.user.uid) {
      referrerUid = referrer.uid;
    }
  }

  try {
    await createUserProfile({
      uid: result.user.uid,
      displayName,
      email,
      nativeLanguage,
      currentLevel: 'A1',
      xp: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      createdAt: Timestamp.now(),
      skillScores: {
        vocabulary: 0,
        grammar: 0,
        reading: 0,
        listening: 0,
        writing: 0,
        speaking: 0,
      },
      lessonsCompleted: 0,
      wordsLearned: 0,
      placementTestCompleted: false,
      subscriptionTier: 'free',
      referralCode: generateReferralCode(result.user.uid),
      referredBy: referrerUid,
      referralCount: 0,
      referralRewardsClaimed: 0,
    });
  } catch (firestoreErr) {
    // If Firestore profile creation fails, delete the Auth user to avoid zombie accounts
    console.error('Firestore profile creation failed, cleaning up Auth user:', firestoreErr);
    await result.user.delete();
    throw firestoreErr;
  }

  // Record the referral (increments count + grants reward if threshold met)
  if (referrerUid) {
    await recordReferral(referrerUid, result.user.uid, email);
  }

  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signInWithGoogle(nativeLanguage: SupportedLanguage = 'hi', referralCode?: string): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const existing = await getUserProfile(result.user.uid);

  if (!existing) {
    // Resolve referrer
    let referrerUid: string | undefined;
    if (referralCode) {
      const referrer = await getUserByReferralCode(referralCode);
      if (referrer && referrer.uid !== result.user.uid) {
        referrerUid = referrer.uid;
      }
    }

    await createUserProfile({
      uid: result.user.uid,
      displayName: result.user.displayName || 'Learner',
      email: result.user.email || '',
      nativeLanguage,
      currentLevel: 'A1',
      xp: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      createdAt: Timestamp.now(),
      skillScores: {
        vocabulary: 0,
        grammar: 0,
        reading: 0,
        listening: 0,
        writing: 0,
        speaking: 0,
      },
      lessonsCompleted: 0,
      wordsLearned: 0,
      placementTestCompleted: false,
      subscriptionTier: 'free',
      referralCode: generateReferralCode(result.user.uid),
      referredBy: referrerUid,
      referralCount: 0,
      referralRewardsClaimed: 0,
    });

    // Record the referral
    if (referrerUid) {
      await recordReferral(referrerUid, result.user.uid, result.user.email || '');
    }
  }

  return result.user;
}

export async function logOut(): Promise<void> {
  await signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
