'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { LANGUAGES, type SupportedLanguage } from '@/lib/i18n';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Globe, ChevronRight, CalendarDays } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, setProfile, setUILanguage } = useAppStore();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<SupportedLanguage | null>(null);
  const [examDate, setExamDate] = useState('');
  const [saving, setSaving] = useState(false);

  // Step 1: save language and go to step 2
  const handleLanguageContinue = async () => {
    if (!selected || !user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), { nativeLanguage: selected });
      setUILanguage(selected);
      if (profile) setProfile({ ...profile, nativeLanguage: selected });
      localStorage.setItem('uiLanguage', selected);
    } catch {
      setUILanguage(selected);
      localStorage.setItem('uiLanguage', selected);
    }
    setSaving(false);
    setStep(2);
  };

  const skipLanguage = () => {
    setUILanguage('en');
    localStorage.setItem('uiLanguage', 'en');
    setStep(2);
  };

  // Step 2: save exam date (or skip) and go to placement test
  const handleExamDateContinue = async () => {
    if (examDate && user) {
      setSaving(true);
      try {
        await updateDoc(doc(db, 'users', user.uid), { ieltsExamDate: examDate });
        if (profile) setProfile({ ...profile, ieltsExamDate: examDate });
      } catch {
        // continue anyway
      }
      setSaving(false);
    }
    router.push('/placement-test');
  };

  // Compute minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Compute days until exam
  const daysUntil = examDate
    ? Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {step === 1 && (
            <>
              {/* Step 1: Language */}
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

              <button
                onClick={handleLanguageContinue}
                disabled={!selected || saving}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {saving ? 'Saving...' : 'Continue'}
                {!saving && <ChevronRight className="w-5 h-5" />}
              </button>

              <button
                onClick={skipLanguage}
                className="w-full mt-3 py-2 text-gray-400 text-sm hover:text-gray-600 transition"
              >
                Skip — use English
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2: IELTS Exam Date */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
                  <CalendarDays className="w-8 h-8 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  When is your IELTS exam?
                </h1>
                <p className="text-gray-500 text-sm">
                  We&apos;ll create a study plan to help you prepare on time.
                </p>
              </div>

              <div className="mb-6">
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  min={minDate}
                  className="w-full px-4 py-4 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-center"
                />
                {daysUntil !== null && daysUntil > 0 && (
                  <p className="text-center text-sm text-purple-600 font-medium mt-3">
                    {daysUntil} days to go — let&apos;s make them count!
                  </p>
                )}
              </div>

              <button
                onClick={handleExamDateContinue}
                disabled={saving}
                className="w-full py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {saving ? 'Saving...' : examDate ? 'Continue' : 'Skip for Now'}
                {!saving && <ChevronRight className="w-5 h-5" />}
              </button>

              {examDate && (
                <button
                  onClick={() => { setExamDate(''); handleExamDateContinue(); }}
                  className="w-full mt-3 py-2 text-gray-400 text-sm hover:text-gray-600 transition"
                >
                  I don&apos;t have a date yet
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
