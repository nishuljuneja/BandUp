'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { LANGUAGES, type SupportedLanguage } from '@/lib/i18n';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Globe, ChevronRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, setProfile, setUILanguage } = useAppStore();
  const [selected, setSelected] = useState<SupportedLanguage | null>(null);
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!selected || !user) return;
    setSaving(true);
    try {
      // Update Firestore profile
      await updateDoc(doc(db, 'users', user.uid), { nativeLanguage: selected });
      // Update local state
      setUILanguage(selected);
      if (profile) {
        setProfile({ ...profile, nativeLanguage: selected });
      }
      // Store in localStorage so the layout picks it up immediately
      localStorage.setItem('uiLanguage', selected);
      router.push('/placement-test');
    } catch (err) {
      console.error('Failed to save language preference:', err);
      // Still continue even if save fails
      setUILanguage(selected);
      localStorage.setItem('uiLanguage', selected);
      router.push('/placement-test');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
              <Globe className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Which language are you comfortable with?
            </h1>
            <p className="text-gray-500 text-sm">
              We&apos;ll show instructions, translations, and word meanings in this language.
            </p>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`relative flex flex-col items-start p-4 rounded-xl border-2 transition text-left ${
                  selected === lang.code
                    ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <span className="text-lg font-bold text-gray-800">{lang.nativeName}</span>
                <span className="text-sm text-gray-500">{lang.name}</span>
                {selected === lang.code && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selected || saving}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {saving ? 'Saving...' : 'Continue'}
            {!saving && <ChevronRight className="w-5 h-5" />}
          </button>

          {/* Skip Option */}
          <button
            onClick={() => {
              setUILanguage('en');
              localStorage.setItem('uiLanguage', 'en');
              router.push('/placement-test');
            }}
            className="w-full mt-3 py-2 text-gray-400 text-sm hover:text-gray-600 transition"
          >
            Skip — use English
          </button>
        </div>
      </div>
    </div>
  );
}
