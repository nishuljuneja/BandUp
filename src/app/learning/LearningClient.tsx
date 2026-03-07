'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { ProgressBar } from '@/components/Exercises';
import {
  BookOpen, Brain, Headphones, MessageSquare, PenTool, ArrowRight, GraduationCap,
} from 'lucide-react';

export default function LearningPage() {
  const { profile, uiLanguage } = useAppStore();

  const skills = [
    {
      key: 'vocabulary',
      label: t('nav.vocabulary', uiLanguage),
      icon: BookOpen,
      href: '/vocabulary',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      description: 'Learn new words, review flashcards, and expand your vocabulary with spaced repetition.',
    },
    {
      key: 'grammar',
      label: t('nav.grammar', uiLanguage),
      icon: Brain,
      href: '/grammar',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-fuchsia-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      description: 'Master English grammar rules through interactive lessons and practice exercises.',
    },
    {
      key: 'reading',
      label: t('nav.reading', uiLanguage),
      icon: BookOpen,
      href: '/reading',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      description: 'Improve comprehension with passages and stories at your level.',
    },
    {
      key: 'listening',
      label: t('nav.listening', uiLanguage),
      icon: Headphones,
      href: '/listening',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      description: 'Sharpen your ear with audio exercises, dictation, and listening comprehension.',
    },
    {
      key: 'speaking',
      label: t('nav.speaking', uiLanguage),
      icon: MessageSquare,
      href: '/speaking',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-600',
      description: 'Practice pronunciation, conversation patterns, and speaking confidence.',
    },
    {
      key: 'writing',
      label: t('nav.writing', uiLanguage),
      icon: PenTool,
      href: '/writing',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-600',
      description: 'Develop your writing skills with guided prompts, essays, and feedback.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Choose a skill to practice. Each area adapts to your level and tracks your progress.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill) => {
          const score = profile?.skillScores?.[skill.key as keyof typeof profile.skillScores] || 0;
          return (
            <Link
              key={skill.key}
              href={skill.href}
              className={`group bg-gradient-to-br ${skill.bgColor} ${skill.borderColor} border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-lg font-bold text-gray-800 group-hover:${skill.textColor} transition-colors`}>
                  {skill.label}
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {skill.description}
              </p>
              {profile && (
                <div className="mb-3">
                  <ProgressBar current={score} total={100} />
                  <div className="text-xs text-gray-500 mt-1">{score}% complete</div>
                </div>
              )}
              <div className={`flex items-center gap-1 text-sm font-medium ${skill.textColor} group-hover:gap-2 transition-all`}>
                Start learning <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
