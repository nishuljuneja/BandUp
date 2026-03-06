'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LevelBadge } from '@/components/Exercises';
import {
  Trophy, Flame, BookOpen, Brain, Star, Zap, Target,
  Award, Crown, Sparkles, Lock, CheckCircle2, ArrowRight,
  Gamepad2, Headphones, Mic, Pencil, BookMarked, Repeat,
  GraduationCap, Shield, Gem, Heart, Rocket, Medal,
  Calendar, TrendingUp, Globe, Eye,
} from 'lucide-react';
import type { UserProfile } from '@/lib/firestore';

// ─── Badge definitions ───────────────────────────────────────────────
interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  /** Returns true when the user has earned this badge */
  check: (p: UserProfile) => boolean;
  /** Returns progress 0-100 */
  progress: (p: UserProfile) => number;
  /** Human-readable requirement */
  requirement: string;
  category: 'streak' | 'xp' | 'vocabulary' | 'lessons' | 'level' | 'skill' | 'mastery' | 'dedication';
}

// Helper for level ordering checks
const LEVEL_ORDER: Record<string, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4 };
const atOrAbove = (current: string, target: string) =>
  (LEVEL_ORDER[current] ?? 0) >= (LEVEL_ORDER[target] ?? 99);

const BADGES: Badge[] = [
  // ══════════════════════════════════════════════════════════════
  // ── STREAK (9 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'streak-3', title: 'Getting Started', description: '3-day learning streak',
    icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => p.streak >= 3, progress: (p) => Math.min(100, Math.round((p.streak / 3) * 100)),
    requirement: '3-day streak', category: 'streak',
  },
  {
    id: 'streak-7', title: 'Week Warrior', description: '7-day learning streak',
    icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => p.streak >= 7, progress: (p) => Math.min(100, Math.round((p.streak / 7) * 100)),
    requirement: '7-day streak', category: 'streak',
  },
  {
    id: 'streak-14', title: 'Fortnight Focus', description: '14-day learning streak',
    icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => p.streak >= 14, progress: (p) => Math.min(100, Math.round((p.streak / 14) * 100)),
    requirement: '14-day streak', category: 'streak',
  },
  {
    id: 'streak-30', title: 'Monthly Master', description: '30-day learning streak',
    icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300',
    check: (p) => p.streak >= 30, progress: (p) => Math.min(100, Math.round((p.streak / 30) * 100)),
    requirement: '30-day streak', category: 'streak',
  },
  {
    id: 'streak-60', title: 'Two-Month Titan', description: '60-day learning streak',
    icon: Shield, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => p.streak >= 60, progress: (p) => Math.min(100, Math.round((p.streak / 60) * 100)),
    requirement: '60-day streak', category: 'streak',
  },
  {
    id: 'streak-90', title: 'Quarter Champion', description: '90-day learning streak',
    icon: Gem, color: 'text-cyan-600', bg: 'bg-cyan-100', border: 'border-cyan-300',
    check: (p) => p.streak >= 90, progress: (p) => Math.min(100, Math.round((p.streak / 90) * 100)),
    requirement: '90-day streak', category: 'streak',
  },
  {
    id: 'streak-180', title: 'Half-Year Hero', description: '180-day learning streak',
    icon: Crown, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => p.streak >= 180, progress: (p) => Math.min(100, Math.round((p.streak / 180) * 100)),
    requirement: '180-day streak', category: 'streak',
  },
  {
    id: 'streak-365', title: 'Year of English', description: '365-day learning streak',
    icon: GraduationCap, color: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400',
    check: (p) => p.streak >= 365, progress: (p) => Math.min(100, Math.round((p.streak / 365) * 100)),
    requirement: '365-day streak', category: 'streak',
  },
  {
    id: 'streak-500', title: 'Unstoppable', description: '500-day learning streak — legendary!',
    icon: Rocket, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300',
    check: (p) => p.streak >= 500, progress: (p) => Math.min(100, Math.round((p.streak / 500) * 100)),
    requirement: '500-day streak', category: 'streak',
  },

  // ══════════════════════════════════════════════════════════════
  // ── XP (10 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'xp-100', title: 'First Steps', description: 'Earn 100 XP',
    icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300',
    check: (p) => p.xp >= 100, progress: (p) => Math.min(100, Math.round((p.xp / 100) * 100)),
    requirement: '100 XP', category: 'xp',
  },
  {
    id: 'xp-500', title: 'Rising Star', description: 'Earn 500 XP',
    icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300',
    check: (p) => p.xp >= 500, progress: (p) => Math.min(100, Math.round((p.xp / 500) * 100)),
    requirement: '500 XP', category: 'xp',
  },
  {
    id: 'xp-1000', title: 'Knowledge Seeker', description: 'Earn 1,000 XP',
    icon: Star, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => p.xp >= 1000, progress: (p) => Math.min(100, Math.round((p.xp / 1000) * 100)),
    requirement: '1,000 XP', category: 'xp',
  },
  {
    id: 'xp-2500', title: 'XP Stacker', description: 'Earn 2,500 XP',
    icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => p.xp >= 2500, progress: (p) => Math.min(100, Math.round((p.xp / 2500) * 100)),
    requirement: '2,500 XP', category: 'xp',
  },
  {
    id: 'xp-5000', title: 'XP Champion', description: 'Earn 5,000 XP',
    icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => p.xp >= 5000, progress: (p) => Math.min(100, Math.round((p.xp / 5000) * 100)),
    requirement: '5,000 XP', category: 'xp',
  },
  {
    id: 'xp-10000', title: 'XP Legend', description: 'Earn 10,000 XP',
    icon: Medal, color: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400',
    check: (p) => p.xp >= 10000, progress: (p) => Math.min(100, Math.round((p.xp / 10000) * 100)),
    requirement: '10,000 XP', category: 'xp',
  },
  {
    id: 'xp-25000', title: 'XP Titan', description: 'Earn 25,000 XP',
    icon: Gem, color: 'text-cyan-600', bg: 'bg-cyan-100', border: 'border-cyan-300',
    check: (p) => p.xp >= 25000, progress: (p) => Math.min(100, Math.round((p.xp / 25000) * 100)),
    requirement: '25,000 XP', category: 'xp',
  },
  {
    id: 'xp-50000', title: 'XP Overlord', description: 'Earn 50,000 XP',
    icon: Crown, color: 'text-purple-700', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.xp >= 50000, progress: (p) => Math.min(100, Math.round((p.xp / 50000) * 100)),
    requirement: '50,000 XP', category: 'xp',
  },
  {
    id: 'xp-100000', title: 'XP Immortal', description: 'Earn 100,000 XP — you are a legend',
    icon: Sparkles, color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-400',
    check: (p) => p.xp >= 100000, progress: (p) => Math.min(100, Math.round((p.xp / 100000) * 100)),
    requirement: '100,000 XP', category: 'xp',
  },
  {
    id: 'xp-250000', title: 'Transcendent', description: 'Earn 250,000 XP — beyond mortal learners',
    icon: Rocket, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300',
    check: (p) => p.xp >= 250000, progress: (p) => Math.min(100, Math.round((p.xp / 250000) * 100)),
    requirement: '250,000 XP', category: 'xp',
  },

  // ══════════════════════════════════════════════════════════════
  // ── VOCABULARY (9 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'words-10', title: 'Word Collector', description: 'Learn 10 words',
    icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => p.wordsLearned >= 10, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 10) * 100)),
    requirement: '10 words', category: 'vocabulary',
  },
  {
    id: 'words-50', title: 'Vocabulary Builder', description: 'Learn 50 words',
    icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => p.wordsLearned >= 50, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 50) * 100)),
    requirement: '50 words', category: 'vocabulary',
  },
  {
    id: 'words-100', title: 'Century of Words', description: 'Learn 100 words',
    icon: BookMarked, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => p.wordsLearned >= 100, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 100) * 100)),
    requirement: '100 words', category: 'vocabulary',
  },
  {
    id: 'words-200', title: 'Word Wizard', description: 'Learn 200 words',
    icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => p.wordsLearned >= 200, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 200) * 100)),
    requirement: '200 words', category: 'vocabulary',
  },
  {
    id: 'words-500', title: 'Lexicon Legend', description: 'Learn 500 words',
    icon: Sparkles, color: 'text-violet-600', bg: 'bg-violet-100', border: 'border-violet-300',
    check: (p) => p.wordsLearned >= 500, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 500) * 100)),
    requirement: '500 words', category: 'vocabulary',
  },
  {
    id: 'words-1000', title: 'Thousand Words', description: 'Learn 1,000 words',
    icon: Globe, color: 'text-teal-600', bg: 'bg-teal-100', border: 'border-teal-300',
    check: (p) => p.wordsLearned >= 1000, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 1000) * 100)),
    requirement: '1,000 words', category: 'vocabulary',
  },
  {
    id: 'words-2000', title: 'Walking Dictionary', description: 'Learn 2,000 words',
    icon: BookMarked, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => p.wordsLearned >= 2000, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 2000) * 100)),
    requirement: '2,000 words', category: 'vocabulary',
  },
  {
    id: 'words-3000', title: 'Oxford Scholar', description: 'Learn 3,000 words — the full Oxford 3000!',
    icon: GraduationCap, color: 'text-indigo-700', bg: 'bg-indigo-100', border: 'border-indigo-400',
    check: (p) => p.wordsLearned >= 3000, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 3000) * 100)),
    requirement: '3,000 words', category: 'vocabulary',
  },
  {
    id: 'words-5000', title: 'Vocabulary Master', description: 'Learn 5,000 words — the full Oxford 5000!',
    icon: Crown, color: 'text-purple-700', bg: 'bg-purple-100', border: 'border-purple-400',
    check: (p) => p.wordsLearned >= 5000, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 5000) * 100)),
    requirement: '5,000 words', category: 'vocabulary',
  },

  // ══════════════════════════════════════════════════════════════
  // ── LESSONS (7 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'lessons-1', title: 'First Lesson', description: 'Complete your first lesson',
    icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.lessonsCompleted >= 1, progress: (p) => Math.min(100, p.lessonsCompleted >= 1 ? 100 : 0),
    requirement: '1 lesson', category: 'lessons',
  },
  {
    id: 'lessons-5', title: 'Lesson Starter', description: 'Complete 5 lessons',
    icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.lessonsCompleted >= 5, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 5) * 100)),
    requirement: '5 lessons', category: 'lessons',
  },
  {
    id: 'lessons-10', title: 'Double Digits', description: 'Complete 10 lessons',
    icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.lessonsCompleted >= 10, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 10) * 100)),
    requirement: '10 lessons', category: 'lessons',
  },
  {
    id: 'lessons-20', title: 'Dedicated Student', description: 'Complete 20 lessons',
    icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.lessonsCompleted >= 20, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 20) * 100)),
    requirement: '20 lessons', category: 'lessons',
  },
  {
    id: 'lessons-50', title: 'Lesson Machine', description: 'Complete 50 lessons',
    icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.lessonsCompleted >= 50, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 50) * 100)),
    requirement: '50 lessons', category: 'lessons',
  },
  {
    id: 'lessons-100', title: 'Century Scholar', description: 'Complete 100 lessons',
    icon: Award, color: 'text-purple-700', bg: 'bg-purple-100', border: 'border-purple-400',
    check: (p) => p.lessonsCompleted >= 100, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 100) * 100)),
    requirement: '100 lessons', category: 'lessons',
  },
  {
    id: 'lessons-200', title: 'Lesson Legend', description: 'Complete 200 lessons',
    icon: Crown, color: 'text-purple-700', bg: 'bg-purple-100', border: 'border-purple-400',
    check: (p) => p.lessonsCompleted >= 200, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 200) * 100)),
    requirement: '200 lessons', category: 'lessons',
  },

  // ══════════════════════════════════════════════════════════════
  // ── LEVEL (6 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'level-a2', title: 'Beyond Basics', description: 'Reach level A2',
    icon: Target, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300',
    check: (p) => atOrAbove(p.currentLevel, 'A2'),
    progress: (p) => atOrAbove(p.currentLevel, 'A2') ? 100 : 0,
    requirement: 'Reach A2', category: 'level',
  },
  {
    id: 'level-b1', title: 'Intermediate Achiever', description: 'Reach level B1',
    icon: Target, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300',
    check: (p) => atOrAbove(p.currentLevel, 'B1'),
    progress: (p) => atOrAbove(p.currentLevel, 'B1') ? 100 : 0,
    requirement: 'Reach B1', category: 'level',
  },
  {
    id: 'level-b2', title: 'Upper Intermediate', description: 'Reach level B2',
    icon: Award, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => atOrAbove(p.currentLevel, 'B2'),
    progress: (p) => atOrAbove(p.currentLevel, 'B2') ? 100 : 0,
    requirement: 'Reach B2', category: 'level',
  },
  {
    id: 'level-c1', title: 'Advanced Master', description: 'Reach level C1',
    icon: Crown, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => atOrAbove(p.currentLevel, 'C1'),
    progress: (p) => atOrAbove(p.currentLevel, 'C1') ? 100 : 0,
    requirement: 'Reach C1', category: 'level',
  },

  {
    id: 'level-test', title: 'Tested & Proven', description: 'Complete the placement test',
    icon: Target, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300',
    check: (p) => p.placementTestCompleted,
    progress: (p) => p.placementTestCompleted ? 100 : 0,
    requirement: 'Take the diagnostic test', category: 'level',
  },

  // ══════════════════════════════════════════════════════════════
  // ── SKILL (12 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'skill-all-40', title: 'Well Rounded', description: 'Score 40%+ in all 6 skills',
    icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => Object.values(p.skillScores).every((s) => s >= 40),
    progress: (p) => {
      const scores = Object.values(p.skillScores);
      return Math.round((scores.filter((s) => s >= 40).length / scores.length) * 100);
    },
    requirement: '40%+ in all skills', category: 'skill',
  },
  {
    id: 'skill-all-60', title: 'Balanced Learner', description: 'Score 60%+ in all 6 skills',
    icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => Object.values(p.skillScores).every((s) => s >= 60),
    progress: (p) => {
      const scores = Object.values(p.skillScores);
      return Math.round((scores.filter((s) => s >= 60).length / scores.length) * 100);
    },
    requirement: '60%+ in all skills', category: 'skill',
  },
  {
    id: 'skill-all-80', title: 'All-Star', description: 'Score 80%+ in all 6 skills',
    icon: Crown, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => Object.values(p.skillScores).every((s) => s >= 80),
    progress: (p) => {
      const scores = Object.values(p.skillScores);
      return Math.round((scores.filter((s) => s >= 80).length / scores.length) * 100);
    },
    requirement: '80%+ in all skills', category: 'skill',
  },
  {
    id: 'skill-any-80', title: 'Skill Specialist', description: 'Score 80%+ in any skill',
    icon: Award, color: 'text-pink-600', bg: 'bg-pink-100', border: 'border-pink-300',
    check: (p) => Object.values(p.skillScores).some((s) => s >= 80),
    progress: (p) => {
      const max = Math.max(...Object.values(p.skillScores));
      return Math.min(100, Math.round((max / 80) * 100));
    },
    requirement: '80%+ in any skill', category: 'skill',
  },
  {
    id: 'skill-vocab-80', title: 'Word Expert', description: 'Score 80%+ in Vocabulary',
    icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => (p.skillScores.vocabulary ?? 0) >= 80,
    progress: (p) => Math.min(100, Math.round(((p.skillScores.vocabulary ?? 0) / 80) * 100)),
    requirement: '80%+ Vocabulary', category: 'skill',
  },
  {
    id: 'skill-grammar-80', title: 'Grammar Guru', description: 'Score 80%+ in Grammar',
    icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => (p.skillScores.grammar ?? 0) >= 80,
    progress: (p) => Math.min(100, Math.round(((p.skillScores.grammar ?? 0) / 80) * 100)),
    requirement: '80%+ Grammar', category: 'skill',
  },
  {
    id: 'skill-reading-80', title: 'Avid Reader', description: 'Score 80%+ in Reading',
    icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-300',
    check: (p) => (p.skillScores.reading ?? 0) >= 80,
    progress: (p) => Math.min(100, Math.round(((p.skillScores.reading ?? 0) / 80) * 100)),
    requirement: '80%+ Reading', category: 'skill',
  },
  {
    id: 'skill-listening-80', title: 'Keen Listener', description: 'Score 80%+ in Listening',
    icon: Headphones, color: 'text-sky-600', bg: 'bg-sky-100', border: 'border-sky-300',
    check: (p) => (p.skillScores.listening ?? 0) >= 80,
    progress: (p) => Math.min(100, Math.round(((p.skillScores.listening ?? 0) / 80) * 100)),
    requirement: '80%+ Listening', category: 'skill',
  },
  {
    id: 'skill-writing-80', title: 'Wordsmith', description: 'Score 80%+ in Writing',
    icon: Pencil, color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-300',
    check: (p) => (p.skillScores.writing ?? 0) >= 80,
    progress: (p) => Math.min(100, Math.round(((p.skillScores.writing ?? 0) / 80) * 100)),
    requirement: '80%+ Writing', category: 'skill',
  },
  {
    id: 'skill-speaking-80', title: 'Silver Tongue', description: 'Score 80%+ in Speaking',
    icon: Mic, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => (p.skillScores.speaking ?? 0) >= 80,
    progress: (p) => Math.min(100, Math.round(((p.skillScores.speaking ?? 0) / 80) * 100)),
    requirement: '80%+ Speaking', category: 'skill',
  },
  {
    id: 'skill-perfectionist', title: 'Perfectionist', description: 'Score 100% in any skill',
    icon: Gem, color: 'text-cyan-600', bg: 'bg-cyan-100', border: 'border-cyan-300',
    check: (p) => Object.values(p.skillScores).some((s) => s >= 100),
    progress: (p) => {
      const max = Math.max(...Object.values(p.skillScores));
      return max;
    },
    requirement: '100% in any skill', category: 'skill',
  },
  {
    id: 'skill-all-100', title: 'Total Mastery', description: 'Score 100% in all 6 skills',
    icon: Rocket, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300',
    check: (p) => Object.values(p.skillScores).every((s) => s >= 100),
    progress: (p) => {
      const scores = Object.values(p.skillScores);
      return Math.round((scores.filter((s) => s >= 100).length / scores.length) * 100);
    },
    requirement: '100% in all skills', category: 'skill',
  },

  // ══════════════════════════════════════════════════════════════
  // ── MASTERY — combined metric badges (6 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'mastery-first-blood', title: 'First Blood', description: 'Earn XP, learn a word, and complete a lesson',
    icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-300',
    check: (p) => p.xp >= 10 && p.wordsLearned >= 1 && p.lessonsCompleted >= 1,
    progress: (p) => {
      const parts = [p.xp >= 10 ? 1 : 0, p.wordsLearned >= 1 ? 1 : 0, p.lessonsCompleted >= 1 ? 1 : 0];
      return Math.round((parts.reduce((a, b) => a + b, 0) / 3) * 100);
    },
    requirement: 'XP + word + lesson', category: 'mastery',
  },
  {
    id: 'mastery-triple-digit', title: 'Triple Digits', description: '100+ XP, 100+ words, 10+ lessons',
    icon: Sparkles, color: 'text-violet-600', bg: 'bg-violet-100', border: 'border-violet-300',
    check: (p) => p.xp >= 100 && p.wordsLearned >= 100 && p.lessonsCompleted >= 10,
    progress: (p) => {
      const a = Math.min(1, p.xp / 100);
      const b = Math.min(1, p.wordsLearned / 100);
      const c = Math.min(1, p.lessonsCompleted / 10);
      return Math.round(((a + b + c) / 3) * 100);
    },
    requirement: '100 XP, 100 words, 10 lessons', category: 'mastery',
  },
  {
    id: 'mastery-streak-vocab', title: 'Consistent & Curious', description: '7-day streak + 50 words learned',
    icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100', border: 'border-pink-300',
    check: (p) => p.streak >= 7 && p.wordsLearned >= 50,
    progress: (p) => {
      const a = Math.min(1, p.streak / 7);
      const b = Math.min(1, p.wordsLearned / 50);
      return Math.round(((a + b) / 2) * 100);
    },
    requirement: '7-day streak + 50 words', category: 'mastery',
  },
  {
    id: 'mastery-power-learner', title: 'Power Learner', description: '30-day streak + 500 XP + 200 words',
    icon: Rocket, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => p.streak >= 30 && p.xp >= 500 && p.wordsLearned >= 200,
    progress: (p) => {
      const a = Math.min(1, p.streak / 30);
      const b = Math.min(1, p.xp / 500);
      const c = Math.min(1, p.wordsLearned / 200);
      return Math.round(((a + b + c) / 3) * 100);
    },
    requirement: '30-streak, 500 XP, 200 words', category: 'mastery',
  },
  {
    id: 'mastery-completionist', title: 'Completionist', description: '1000+ XP, 500+ words, B2+ level, 50+ lessons',
    icon: Shield, color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-400',
    check: (p) => p.xp >= 1000 && p.wordsLearned >= 500 && atOrAbove(p.currentLevel, 'B2') && p.lessonsCompleted >= 50,
    progress: (p) => {
      const a = Math.min(1, p.xp / 1000);
      const b = Math.min(1, p.wordsLearned / 500);
      const c = atOrAbove(p.currentLevel, 'B2') ? 1 : 0;
      const d = Math.min(1, p.lessonsCompleted / 50);
      return Math.round(((a + b + c + d) / 4) * 100);
    },
    requirement: '1K XP, 500 words, B2+, 50 lessons', category: 'mastery',
  },
  {
    id: 'mastery-ultimate', title: 'SpeakEasy Champion', description: 'C1+ level, 5000+ XP, 1000+ words, 100+ lessons, 60+ streak',
    icon: Crown, color: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400',
    check: (p) => atOrAbove(p.currentLevel, 'C1') && p.xp >= 5000 && p.wordsLearned >= 1000 && p.lessonsCompleted >= 100 && p.streak >= 60,
    progress: (p) => {
      const a = atOrAbove(p.currentLevel, 'C1') ? 1 : 0;
      const b = Math.min(1, p.xp / 5000);
      const c = Math.min(1, p.wordsLearned / 1000);
      const d = Math.min(1, p.lessonsCompleted / 100);
      const e = Math.min(1, p.streak / 60);
      return Math.round(((a + b + c + d + e) / 5) * 100);
    },
    requirement: 'C1+, 5K XP, 1K words, 100 lessons, 60 streak', category: 'mastery',
  },

  // ══════════════════════════════════════════════════════════════
  // ── DEDICATION — engagement milestones (5 badges) ──
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ded-profile', title: 'Identity Set', description: 'Set up your profile & native language',
    icon: Calendar, color: 'text-teal-600', bg: 'bg-teal-100', border: 'border-teal-300',
    check: (p) => !!p.displayName && !!p.nativeLanguage,
    progress: (p) => (p.displayName ? 50 : 0) + (p.nativeLanguage ? 50 : 0),
    requirement: 'Profile setup', category: 'dedication',
  },
  {
    id: 'ded-explorer', title: 'Explorer', description: 'Try all 6 skill areas (score > 0 in each)',
    icon: Globe, color: 'text-teal-600', bg: 'bg-teal-100', border: 'border-teal-300',
    check: (p) => Object.values(p.skillScores).every((s) => s > 0),
    progress: (p) => {
      const scores = Object.values(p.skillScores);
      return Math.round((scores.filter((s) => s > 0).length / scores.length) * 100);
    },
    requirement: 'Use all 6 skill areas', category: 'dedication',
  },
  {
    id: 'ded-comeback', title: 'Comeback Kid', description: 'Rebuild a streak to 7+ after losing one',
    icon: Repeat, color: 'text-teal-600', bg: 'bg-teal-100', border: 'border-teal-300',
    check: (p) => p.streak >= 7 && p.lessonsCompleted >= 10,
    progress: (p) => Math.min(100, Math.round(((Math.min(1, p.streak / 7) + Math.min(1, p.lessonsCompleted / 10)) / 2) * 100)),
    requirement: '7+ streak after activity', category: 'dedication',
  },
  {
    id: 'ded-night-owl', title: 'Night Owl', description: 'Earn 500+ XP and 50+ words (you clearly study late!)',
    icon: Star, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => p.xp >= 500 && p.wordsLearned >= 50,
    progress: (p) => {
      const a = Math.min(1, p.xp / 500);
      const b = Math.min(1, p.wordsLearned / 50);
      return Math.round(((a + b) / 2) * 100);
    },
    requirement: '500 XP + 50 words', category: 'dedication',
  },
  {
    id: 'ded-scholar', title: 'True Scholar', description: 'Reach B1+ with 1000+ XP and 30+ streak',
    icon: GraduationCap, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => atOrAbove(p.currentLevel, 'B1') && p.xp >= 1000 && p.streak >= 30,
    progress: (p) => {
      const a = atOrAbove(p.currentLevel, 'B1') ? 1 : 0;
      const b = Math.min(1, p.xp / 1000);
      const c = Math.min(1, p.streak / 30);
      return Math.round(((a + b + c) / 3) * 100);
    },
    requirement: 'B1+, 1K XP, 30 streak', category: 'dedication',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'streak', label: 'Streak' },
  { key: 'xp', label: 'XP' },
  { key: 'vocabulary', label: 'Words' },
  { key: 'lessons', label: 'Lessons' },
  { key: 'level', label: 'Level' },
  { key: 'skill', label: 'Skills' },
  { key: 'mastery', label: 'Mastery' },
  { key: 'dedication', label: 'Dedication' },
];

export default function AchievementsPage() {
  const { profile, uiLanguage, loading, refreshProfile } = useAppStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const earned = useMemo(
    () => (profile ? BADGES.filter((b) => b.check(profile)) : []),
    [profile]
  );

  const displayed = useMemo(
    () => filter === 'all' ? BADGES : BADGES.filter((b) => b.category === filter),
    [filter]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view achievements</h1>
        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
          {t('common.login', uiLanguage)} →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
          <Trophy className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
          <p className="text-gray-500 text-sm">
            {earned.length} / {BADGES.length} badges earned
          </p>
        </div>
      </div>

      {/* Summary bar */}
      <div className="mt-4 mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${Math.round((earned.length / BADGES.length) * 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-1 text-right">
          {Math.round((earned.length / BADGES.length) * 100)}% complete
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === cat.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((badge) => {
          const isEarned = badge.check(profile);
          const pct = badge.progress(profile);
          const Icon = badge.icon;

          return (
            <div
              key={badge.id}
              className={`relative rounded-2xl p-5 border-2 transition-all ${
                isEarned
                  ? `${badge.border} ${badge.bg} shadow-md`
                  : 'border-gray-200 bg-white opacity-70'
              }`}
            >
              {isEarned && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              )}
              {!isEarned && (
                <div className="absolute top-3 right-3">
                  <Lock className="w-4 h-4 text-gray-300" />
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                isEarned ? badge.bg : 'bg-gray-100'
              }`}>
                <Icon className={`w-6 h-6 ${isEarned ? badge.color : 'text-gray-400'}`} />
              </div>

              <h3 className={`font-bold mb-1 ${isEarned ? 'text-gray-800' : 'text-gray-500'}`}>
                {badge.title}
              </h3>
              <p className={`text-sm mb-3 ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                {badge.description}
              </p>

              {!isEarned && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-indigo-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">{pct}% — {badge.requirement}</p>
                </>
              )}
              {isEarned && (
                <p className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Earned!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
