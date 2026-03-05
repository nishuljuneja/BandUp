'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Gamepad2, LetterText, ArrowRight, Trophy, Clock, Lightbulb } from 'lucide-react';

export default function GamesPage() {
  const { uiLanguage } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Games</h1>
          <p className="text-gray-500 text-sm">Learn English while having fun!</p>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Word Puzzle */}
        <Link
          href="/games/word-puzzle"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
        >
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <LetterText className="w-10 h-10" />
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                Daily Challenge
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">Word Puzzle</h2>
            <p className="text-white/80 text-sm">
              Unscramble 7 letters and find as many words as you can!
            </p>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                Timed
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Hints
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Leaderboard
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition">
                Play Now
              </span>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Coming Soon placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden opacity-60">
          <div className="bg-gradient-to-br from-gray-400 to-gray-500 p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <Gamepad2 className="w-10 h-10" />
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                Coming Soon
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">More Games</h2>
            <p className="text-white/80 text-sm">
              New word games and challenges are on the way!
            </p>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-400">Stay tuned for sentence builders, word chains, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
