'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Gift, Copy, Check, Users, Crown, Share2, Link as LinkIcon } from 'lucide-react';

export default function ReferralClient() {
  const router = useRouter();
  const { user, profile } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!user || !profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Gift className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Log in to access referrals</h2>
        <p className="text-gray-500 mb-6">Sign in to get your personal referral link and earn free Pro access.</p>
        <button onClick={() => router.push('/login')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
          Log In
        </button>
      </div>
    );
  }

  const referralCode = profile.referralCode || '';
  const referralLink = `https://bandup-ebon.vercel.app/signup?ref=${referralCode}`;
  const referralCount = profile.referralCount || 0;
  const rewardsClaimed = profile.referralRewardsClaimed || 0;
  const nextRewardAt = (rewardsClaimed + 1) * 3;
  const progressToNext = referralCount % 3;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = referralLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BandUp — IELTS Prep',
          text: 'I\'m using BandUp to prepare for IELTS. Join me and get free practice!',
          url: referralLink,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center mb-6">
        <Gift className="w-12 h-12 mx-auto mb-3" />
        <h1 className="text-3xl font-bold mb-2">Refer & Earn Free Pro</h1>
        <p className="text-white/80">Invite friends to BandUp. Every 3 sign-ups earn you 1 week of Pro — free!</p>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-indigo-500" /> Your Referral Link
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-3 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 text-sm font-mono truncate"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors ${
              copied ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleShare}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" /> Share with Friends
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`I'm using BandUp to prepare for IELTS. Join me! ${referralLink}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Your code: <span className="font-mono font-bold text-gray-600">{referralCode}</span>
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" /> Your Progress
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">{referralCount}</p>
            <p className="text-xs text-gray-500">Friends Joined</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{rewardsClaimed}</p>
            <p className="text-xs text-gray-500">Weeks Earned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{nextRewardAt - referralCount}</p>
            <p className="text-xs text-gray-500">Until Next Reward</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="bg-gray-100 rounded-full h-4 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(progressToNext / 3) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center">
          {progressToNext}/3 referrals toward your next free Pro week
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" /> How It Works
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-indigo-600">1</div>
            <div>
              <p className="font-medium text-gray-800">Share your link</p>
              <p className="text-sm text-gray-500">Send your referral link to friends preparing for IELTS.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-indigo-600">2</div>
            <div>
              <p className="font-medium text-gray-800">They sign up</p>
              <p className="text-sm text-gray-500">When they create a free BandUp account using your link, it counts as a referral.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-indigo-600">3</div>
            <div>
              <p className="font-medium text-gray-800">Earn free Pro</p>
              <p className="text-sm text-gray-500">Every 3 friends who join = 1 week of BandUp Pro, completely free!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
