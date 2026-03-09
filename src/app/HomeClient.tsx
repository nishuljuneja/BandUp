'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { BookOpen, Brain, Headphones, MessageSquare, PenTool, Globe, Gamepad2, LetterText, Skull, Shuffle, Layers, Volume2 } from 'lucide-react';
import definitions from '@/content/word-definitions.json';
import { IELTS_BAND_LABELS, type CEFRLevel } from '@/lib/firestore';

// Deterministic Word of the Day — 6+ letters, changes daily
function getWordOfTheDay() {
  const defs = definitions as Record<string, { p?: string; d?: string; e?: string }>;
  const longWords = Object.keys(defs).filter((w) => w.length >= 6 && defs[w].d && defs[w].e);
  const today = new Date();
  const dayIndex = today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate();
  const word = longWords[dayIndex % longWords.length];
  return { word, ...defs[word] };
}

export default function Home() {
  const { uiLanguage, user } = useAppStore();
  const wotd = getWordOfTheDay();

  const features = [
    {
      icon: BookOpen,
      title: 'IELTS Reading',
      description: 'Practice passages matching real IELTS test difficulty. Build speed and comprehension for Academic and General Training.',
    },
    {
      icon: Brain,
      title: 'Grammar for IELTS',
      description: 'Master the grammar patterns tested in IELTS — complex sentences, conditionals, passive voice and reported speech.',
    },
    {
      icon: PenTool,
      title: 'IELTS Writing',
      description: 'Task 1 and Task 2 practice with structured prompts. Improve coherence, task response and lexical resource.',
    },
    {
      icon: MessageSquare,
      title: 'IELTS Speaking',
      description: 'Practice all three parts of the IELTS speaking test with an AI examiner. Get feedback on fluency and vocabulary.',
    },
    {
      icon: Headphones,
      title: 'IELTS Listening',
      description: 'Audio exercises modelled on the IELTS listening test. Train your ear with conversations, lectures and monologues.',
    },
    {
      icon: Globe,
      title: 'IELTS Vocabulary',
      description: 'Band-level word lists with spaced repetition. Learn high-frequency IELTS words, collocations and academic vocabulary.',
    },
  ];

  const levels: { id: CEFRLevel; band: string; color: string }[] = [
    { id: 'A1', band: 'Band 3', color: 'from-emerald-400 to-emerald-600' },
    { id: 'A2', band: 'Band 4', color: 'from-green-400 to-green-600' },
    { id: 'B1', band: 'Band 5', color: 'from-blue-400 to-blue-600' },
    { id: 'B2', band: 'Band 6', color: 'from-purple-400 to-purple-600' },
    { id: 'C1', band: 'Band 7', color: 'from-orange-400 to-orange-600' },
    { id: 'C2', band: 'Band 8-9', color: 'from-red-400 to-red-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Ace the IELTS, Band by Band
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Targeted practice for Reading, Writing, Listening and Speaking. Know your band. Raise your band.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={user ? '/dashboard' : '/signup'}
                className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Free IELTS Prep
              </Link>
              <Link
                href="/placement-test"
                className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
              >
                Take Free Diagnostic Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IELTS Band Levels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">6 IELTS Bands, One Clear Path</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Content structured by IELTS band level. Take a free diagnostic test to find your starting band.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {levels.map((level) => (
              <div key={level.id} className={`bg-gradient-to-br ${level.color} rounded-2xl p-6 text-white text-center shadow-lg hover:scale-105 transition-transform cursor-pointer`}>
                <div className="text-3xl font-black mb-2">{level.band}</div>
                <div className="text-sm font-medium opacity-90">{t(`level.${level.id}`, uiLanguage)}</div>
                <div className="text-xs opacity-70 mt-1">{t(`level.${level.id}.desc`, uiLanguage)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Everything you need to ace the IELTS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try Our Games — No Sign-up Required */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">🎮 Try Our Games — Free, No Sign-up</h2>
          <p className="text-center text-gray-500 mb-10">Designed to improve your vocabulary, sentence structure, and reading skills. Play instantly. Challenge your friends. Sign up later to save your scores.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/games/word-puzzle" className="group bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <LetterText className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Unjumble</h3>
              <p className="text-xs text-gray-500">Find the 7-letter word from jumbled letters</p>
            </Link>
            <Link href="/games/hangman" className="group bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-6 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Skull className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Hangman</h3>
              <p className="text-xs text-gray-500">Guess the word letter by letter</p>
            </Link>
            <Link href="/games/sentence-scramble" className="group bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Shuffle className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Scramble</h3>
              <p className="text-xs text-gray-500">Reorder words to build sentences</p>
            </Link>
            <Link href="/games/word-match" className="group bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Pairs</h3>
              <p className="text-xs text-gray-500">Match words with their definitions</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Word of the Day */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">📖 Word of the Day</h2>
          <p className="text-center text-gray-500 mb-8">Learn a new word every day — no sign-up needed</p>
          <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
            <div className="text-4xl font-black text-indigo-700 mb-2 tracking-wide">{wotd.word.toUpperCase()}</div>
            {wotd.p && (
              <span className="inline-block text-sm font-medium text-indigo-400 bg-indigo-50 px-3 py-0.5 rounded-full mb-4">{wotd.p}</span>
            )}
            <p className="text-lg text-gray-700 mb-3">{wotd.d}</p>
            {wotd.e && (
              <p className="text-sm text-gray-400 italic">&ldquo;{wotd.e}&rdquo;</p>
            )}
            <button
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(wotd.word);
                utterance.lang = 'en-US';
                speechSynthesis.speak(utterance);
              }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition"
            >
              <Volume2 className="w-4 h-4" /> Listen
            </button>
          </div>
        </div>
      </section>

      {/* Why BandUp */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why BandUp?</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <h3 className="font-semibold text-amber-800 mb-2">🎯 IELTS-Specific Practice</h3>
              <p className="text-sm text-amber-700">Every lesson, exercise and test is designed around the IELTS format — Task 1, Task 2, Part 1–3 Speaking, and real listening question types.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">📊 Band-Level Content</h3>
              <p className="text-sm text-blue-700">Content is organised by IELTS band level. Start where you are and work your way up to your target band score.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-2">🗓️ Daily Practice Plans</h3>
              <p className="text-sm text-green-700">Structured 5-minute daily sessions covering all four IELTS sections. Build consistency with streak tracking.</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-800 mb-2">💰 Affordable</h3>
              <p className="text-sm text-purple-700">Free Band 3–5 content forever. Unlock everything with Pro for just $1.99/month — cheaper than a coffee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to ace the IELTS?</h2>
          <p className="text-indigo-200 mb-8">Take a free diagnostic test to find your current band level. No sign-up required.</p>
          <Link href="/placement-test" className="inline-block px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Take Free Diagnostic Test →
          </Link>
        </div>
      </section>
    </div>
  );
}
