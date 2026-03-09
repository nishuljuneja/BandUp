'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { practiceTests, getTestsByLevel, type PracticeTest } from '@/content/practice-tests';
import { MultipleChoice, ProgressBar, LevelBadge } from '@/components/Exercises';
import {
  SkipForward, ArrowRight, ArrowLeft, ClipboardCheck, TrendingUp, TrendingDown,
  Minus, Clock, ChevronRight, CheckCircle2, BookOpen,
} from 'lucide-react';
import { IELTS_BAND_LABELS } from '@/lib/firestore';
import type { CEFRLevel } from '@/lib/firestore';

const LEVEL_ORDER: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const STORAGE_KEY = 'bandup-practice-tests';

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  A1: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', gradient: 'from-emerald-400 to-emerald-600' },
  A2: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', gradient: 'from-green-400 to-green-600' },
  B1: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-400 to-blue-600' },
  B2: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', gradient: 'from-purple-400 to-purple-600' },
  C1: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'from-orange-400 to-orange-600' },
};

// ── Saved results per test ──
interface TestResult {
  testId: string;
  score: number;
  total: number;
  date: string;
  answers: { questionId: string; correct: boolean }[];
}

function getSavedResults(): Record<string, TestResult[]> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveResult(result: TestResult) {
  const all = getSavedResults();
  if (!all[result.testId]) all[result.testId] = [];
  all[result.testId].push(result);
  // Keep last 5 attempts per test
  if (all[result.testId].length > 5) all[result.testId] = all[result.testId].slice(-5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function getBestScore(testId: string, results: Record<string, TestResult[]>): number | null {
  const runs = results[testId];
  if (!runs || runs.length === 0) return null;
  return Math.max(...runs.map((r) => Math.round((r.score / r.total) * 100)));
}

function getLastAttempt(testId: string, results: Record<string, TestResult[]>): TestResult | null {
  const runs = results[testId];
  if (!runs || runs.length === 0) return null;
  return runs[runs.length - 1];
}

export default function TestsPage() {
  const { profile, uiLanguage } = useAppStore();
  const [phase, setPhase] = useState<'levels' | 'tests' | 'taking' | 'result'>('levels');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | null>(null);
  const [activeTest, setActiveTest] = useState<PracticeTest | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [savedResults, setSavedResults] = useState<Record<string, TestResult[]>>({});

  useEffect(() => {
    setSavedResults(getSavedResults());
  }, []);

  const userLevel = profile?.currentLevel || 'A1';

  // ── Level progress summary ──
  const levelStats = useMemo(() => {
    const stats: Record<string, { completed: number; total: number; avgScore: number }> = {};
    for (const level of LEVEL_ORDER) {
      const tests = getTestsByLevel(level);
      let completed = 0;
      let totalScore = 0;
      for (const test of tests) {
        const best = getBestScore(test.id, savedResults);
        if (best !== null) {
          completed++;
          totalScore += best;
        }
      }
      stats[level] = {
        completed,
        total: tests.length,
        avgScore: completed > 0 ? Math.round(totalScore / completed) : 0,
      };
    }
    return stats;
  }, [savedResults]);

  // ── Start a test ──
  const startTest = (test: PracticeTest) => {
    setActiveTest(test);
    setCurrentIndex(0);
    setAnswers([]);
    setHasAnswered(false);
    setPhase('taking');
  };

  const handleAnswer = (correct: boolean) => {
    if (!activeTest) return;
    setAnswers([...answers, { questionId: activeTest.questions[currentIndex].id, correct }]);
    setHasAnswered(true);
  };

  const handleNext = () => {
    if (!activeTest) return;
    setHasAnswered(false);
    if (currentIndex < activeTest.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest();
    }
  };

  const handleSkip = () => {
    if (!activeTest) return;
    const newAnswers = [...answers, { questionId: activeTest.questions[currentIndex].id, correct: false }];
    setAnswers(newAnswers);

    if (currentIndex < activeTest.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTestWith(newAnswers);
    }
  };

  const finishTest = () => finishTestWith(answers);

  const finishTestWith = (finalAnswers: typeof answers) => {
    if (!activeTest) return;
    const result: TestResult = {
      testId: activeTest.id,
      score: finalAnswers.filter((a) => a.correct).length,
      total: activeTest.questions.length,
      date: new Date().toISOString(),
      answers: finalAnswers,
    };
    saveResult(result);
    setSavedResults(getSavedResults());
    setPhase('result');
  };

  // ══════════════════════════════════════════════════════════════
  // PHASE: Level Selection
  // ══════════════════════════════════════════════════════════════
  if (phase === 'levels') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Practice Tests</h1>
            <p className="text-gray-500 text-sm">4 tests per level — track your progress as you improve</p>
          </div>
        </div>

        {/* Current level indicator */}
        <div className="mt-6 mb-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Your Current Level</p>
              <div className="flex items-center gap-3">
                <LevelBadge level={userLevel} size="lg" />
                <div>
                  <p className="font-semibold text-gray-800">{t(`level.${userLevel}`, uiLanguage)}</p>
                  <p className="text-sm text-gray-400">{t(`level.${userLevel}.desc`, uiLanguage)}</p>
                </div>
              </div>
            </div>
            {/* Overall stats */}
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">Overall Completion</p>
              <p className="text-xl font-bold text-indigo-600">
                {Object.values(levelStats).reduce((s, v) => s + v.completed, 0)}/{practiceTests.length}
              </p>
            </div>
          </div>
        </div>

        {/* Level Cards */}
        <div className="space-y-4">
          {LEVEL_ORDER.map((level) => {
            const stats = levelStats[level];
            const colors = LEVEL_COLORS[level];
            const allDone = stats.completed === stats.total;
            return (
              <button
                key={level}
                onClick={() => { setSelectedLevel(level); setPhase('tests'); }}
                className={`w-full text-left bg-white rounded-2xl p-5 shadow-sm border ${colors.border} hover:shadow-md transition-all group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                      {IELTS_BAND_LABELS[level]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {t(`level.${level}`, uiLanguage)}
                      </h3>
                      <p className="text-sm text-gray-400">{t(`level.${level}.desc`, uiLanguage)}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={`text-xs font-medium ${stats.completed > 0 ? colors.text : 'text-gray-400'}`}>
                          {stats.completed}/{stats.total} tests done
                        </span>
                        {stats.avgScore > 0 && (
                          <span className={`text-xs font-medium ${
                            stats.avgScore >= 80 ? 'text-green-600' : stats.avgScore >= 60 ? 'text-amber-600' : 'text-red-500'
                          }`}>
                            Avg: {stats.avgScore}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {allDone && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
                {/* Mini progress bar */}
                {stats.total > 0 && (
                  <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
                      style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE: Tests for a level
  // ══════════════════════════════════════════════════════════════
  if (phase === 'tests' && selectedLevel) {
    const tests = getTestsByLevel(selectedLevel);
    const colors = LEVEL_COLORS[selectedLevel];

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back button & level header */}
        <button
          onClick={() => setPhase('levels')}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All Levels
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
            {IELTS_BAND_LABELS[selectedLevel]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {IELTS_BAND_LABELS[selectedLevel]} — {t(`level.${selectedLevel}`, uiLanguage)}
            </h1>
            <p className="text-gray-500 text-sm">{t(`level.${selectedLevel}.desc`, uiLanguage)}</p>
          </div>
        </div>

        {/* Test list */}
        <div className="space-y-3">
          {tests.map((test) => {
            const bestScore = getBestScore(test.id, savedResults);
            const lastAttempt = getLastAttempt(test.id, savedResults);
            const attemptCount = savedResults[test.id]?.length || 0;
            const isDone = bestScore !== null;

            return (
              <div
                key={test.id}
                className={`bg-white rounded-xl p-5 border ${isDone ? 'border-green-200' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isDone ? 'bg-green-100' : colors.bg
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <BookOpen className={`w-5 h-5 ${colors.text}`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Test {test.testNumber}: {test.title}
                      </h3>
                      <p className="text-sm text-gray-400">{test.questions.length} questions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Score info */}
                    {bestScore !== null && (
                      <div className="text-right hidden sm:block">
                        <p className={`text-lg font-bold ${
                          bestScore >= 80 ? 'text-green-600' : bestScore >= 60 ? 'text-amber-600' : 'text-red-500'
                        }`}>
                          {bestScore}%
                        </p>
                        <p className="text-xs text-gray-400">
                          {attemptCount} attempt{attemptCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => startTest(test)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDone
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isDone ? 'Retake' : 'Start'}
                    </button>
                  </div>
                </div>

                {/* Last attempt details */}
                {lastAttempt && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Last: {new Date(lastAttempt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                    <span>Score: {lastAttempt.score}/{lastAttempt.total}</span>
                    {/* Trend vs previous */}
                    {attemptCount >= 2 && (() => {
                      const runs = savedResults[test.id]!;
                      const prev = runs[runs.length - 2];
                      const diff = lastAttempt.score - prev.score;
                      if (diff > 0) return <span className="text-green-500 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+{diff}</span>;
                      if (diff < 0) return <span className="text-red-500 flex items-center gap-0.5"><TrendingDown className="w-3 h-3" />{diff}</span>;
                      return <span className="text-gray-400 flex items-center gap-0.5"><Minus className="w-3 h-3" />same</span>;
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE: Taking a test
  // ══════════════════════════════════════════════════════════════
  if (phase === 'taking' && activeTest) {
    const q = activeTest.questions[currentIndex];
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <LevelBadge level={activeTest.level} size="sm" />
            <span className="text-sm text-gray-500 font-medium">Test {activeTest.testNumber}: {activeTest.title}</span>
          </div>
          <button
            onClick={() => { setPhase('tests'); }}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Quit
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Question {currentIndex + 1} of {activeTest.questions.length}
            </span>
          </div>
          <ProgressBar current={currentIndex + 1} total={activeTest.questions.length} />
        </div>

        {/* Question */}
        <MultipleChoice
          key={q.id}
          question={q.question}
          options={q.options}
          correctAnswer={q.correctAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />

        {/* Skip */}
        {!hasAnswered && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-1 mx-auto transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>
          </div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // PHASE: Result
  // ══════════════════════════════════════════════════════════════
  if (phase === 'result' && activeTest) {
    const score = answers.filter((a) => a.correct).length;
    const total = activeTest.questions.length;
    const pct = Math.round((score / total) * 100);
    const prevResults = savedResults[activeTest.id] || [];
    const prevAttempt = prevResults.length >= 2 ? prevResults[prevResults.length - 2] : null;
    const prevPct = prevAttempt ? Math.round((prevAttempt.score / prevAttempt.total) * 100) : null;

    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '💪' : '📚';
    const message = pct >= 90
      ? 'Excellent! You\'ve mastered this!'
      : pct >= 70
      ? 'Great job! You\'re doing well.'
      : pct >= 50
      ? 'Good effort! Keep practising.'
      : 'Keep studying — you\'ll get there!';

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Score card */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">{emoji}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Test {activeTest.testNumber} Complete
          </h1>
          <p className="text-gray-500 mb-2">{activeTest.title}</p>
          <p className="text-gray-400 text-sm">{message}</p>
        </div>

        {/* Score */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LevelBadge level={activeTest.level} size="md" />
              <h3 className="font-semibold text-gray-800">Your Score</h3>
            </div>
            <span className={`text-3xl font-black ${
              pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-amber-600' : 'text-red-500'
            }`}>
              {pct}%
            </span>
          </div>
          <ProgressBar current={score} total={total} />
          <p className="text-sm text-gray-500 mt-2">{score} of {total} correct</p>

          {/* Comparison with previous attempt */}
          {prevPct !== null && (
            <div className={`mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              pct > prevPct ? 'bg-green-50 text-green-700' : pct === prevPct ? 'bg-gray-50 text-gray-600' : 'bg-amber-50 text-amber-700'
            }`}>
              {pct > prevPct && <TrendingUp className="w-4 h-4" />}
              {pct === prevPct && <Minus className="w-4 h-4" />}
              {pct < prevPct && <TrendingDown className="w-4 h-4" />}
              {pct > prevPct
                ? `Improved by ${pct - prevPct}% from last attempt!`
                : pct === prevPct
                ? 'Same score as last time'
                : `${prevPct - pct}% lower than last attempt — review the material`
              }
            </div>
          )}
        </div>

        {/* Question review */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Question Review</h3>
          <div className="space-y-2">
            {activeTest.questions.map((q, i) => {
              const ans = answers[i];
              return (
                <div key={q.id} className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
                  ans?.correct ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className={`mt-0.5 ${ans?.correct ? 'text-green-500' : 'text-red-500'}`}>
                    {ans?.correct ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{q.question}</p>
                    {!ans?.correct && (
                      <p className="text-xs text-gray-500 mt-1">
                        Correct answer: <span className="font-medium text-green-700">{q.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => startTest(activeTest)}
            className="flex-1 py-3 px-6 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            Retake Test
          </button>
          <button
            onClick={() => setPhase('tests')}
            className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            Back to {IELTS_BAND_LABELS[selectedLevel!]} Tests <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
