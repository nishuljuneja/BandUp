'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { PenTool, CheckCircle, AlertCircle, Send, Star, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { LevelBadge } from '@/components/Exercises';
import type { CEFRLevel } from '@/lib/firestore';
import { gradeWriting, type GradingResult, type WritingMistake } from '@/lib/writing-grader';
import { writingPrompts, type WritingPrompt } from '@/content/writing-prompts';

export default function WritingPage() {
  const { uiLanguage } = useAppStore();
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [showMistakes, setShowMistakes] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const filteredPrompts = selectedLevel === 'all'
    ? writingPrompts
    : writingPrompts.filter((p) => p.level === selectedLevel);

  const handleSubmit = () => {
    if (!selectedPrompt) return;
    const result = gradeWriting(
      text,
      selectedPrompt.level,
      selectedPrompt.instruction,
      selectedPrompt.minWords,
      selectedPrompt.maxWords,
    );
    setGradingResult(result);
    setSubmitted(true);
  };

  const handleBack = () => {
    setSelectedPrompt(null);
    setText('');
    setSubmitted(false);
    setShowSample(false);
    setGradingResult(null);
    setShowMistakes(true);
    setShowBreakdown(false);
  };

  // ── PROMPT SELECTION ──
  if (!selectedPrompt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <PenTool className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.writing', uiLanguage)}</h1>
            <p className="text-gray-500 text-sm">Practice writing with guided prompts</p>
          </div>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedLevel === level
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level === 'all' ? 'All Levels' : level}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedPrompt(prompt)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{prompt.title}</h3>
                <LevelBadge level={prompt.level} size="sm" />
              </div>
              <p className="text-sm text-gray-500 mb-2">{prompt.instruction}</p>
              <p className="text-xs text-gray-400">{prompt.minWords}–{prompt.maxWords} words</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── WRITING PHASE ──
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 text-sm mb-4 flex items-center gap-1">
        ← Back to prompts
      </button>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800">{selectedPrompt.title}</h2>
          <LevelBadge level={selectedPrompt.level} />
        </div>
        <p className="text-gray-600 mb-2">{selectedPrompt.instruction}</p>
        <p className="text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
          💡 Hint: {selectedPrompt.hint}
        </p>
      </div>

      {!submitted ? (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing here..."
            rows={12}
            className="w-full p-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm">
              <span className={`font-medium ${
                wordCount < selectedPrompt.minWords ? 'text-red-500' :
                wordCount > selectedPrompt.maxWords ? 'text-orange-500' : 'text-green-500'
              }`}>
                {wordCount} words
              </span>
              <span className="text-gray-400">
                (target: {selectedPrompt.minWords}–{selectedPrompt.maxWords})
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={wordCount < selectedPrompt.minWords}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Send className="w-4 h-4" /> Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Score Hero */}
          {gradingResult && (
            <div className={`rounded-2xl p-6 border ${
              gradingResult.score >= 7 ? 'bg-green-50 border-green-200' :
              gradingResult.score >= 5 ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-5">
                {/* Score circle */}
                <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center flex-shrink-0 ${
                  gradingResult.score >= 7 ? 'bg-green-600' :
                  gradingResult.score >= 5 ? 'bg-yellow-500' :
                  'bg-red-500'
                } text-white`}>
                  <span className="text-2xl font-extrabold leading-none">{gradingResult.score}</span>
                  <span className="text-xs opacity-80">/10</span>
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${
                    gradingResult.score >= 7 ? 'text-green-800' :
                    gradingResult.score >= 5 ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>{gradingResult.summary}</h3>
                  <p className="text-sm text-gray-500 mt-1">You wrote {wordCount} words for a {selectedPrompt.level} level prompt.</p>
                </div>
              </div>
            </div>
          )}

          {/* Your Writing */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Writing</h4>
            <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">{text}</div>
          </div>

          {/* Mistakes */}
          {gradingResult && gradingResult.mistakes.length > 0 && (
            <div className="bg-white rounded-xl border border-red-100 overflow-hidden">
              <button
                onClick={() => setShowMistakes(!showMistakes)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-gray-800">
                    Mistakes Found ({gradingResult.mistakes.length})
                  </span>
                </div>
                {showMistakes ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {showMistakes && (
                <div className="px-5 pb-4 space-y-3">
                  {gradingResult.mistakes.map((m, i) => (
                    <div key={i} className="rounded-lg bg-red-50 border border-red-100 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded-full ${
                          m.type === 'grammar' ? 'bg-purple-100 text-purple-700' :
                          m.type === 'spelling' ? 'bg-blue-100 text-blue-700' :
                          m.type === 'punctuation' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {m.type}
                        </span>
                        <span className="text-sm font-mono text-red-700">&ldquo;{m.text}&rdquo;</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Suggestion:</span> {m.suggestion}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{m.explanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Strengths & Improvements */}
          {gradingResult && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl border border-green-200 p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-green-800 mb-3">
                  <CheckCircle className="w-4 h-4" /> Strengths
                </h4>
                <ul className="space-y-1.5">
                  {gradingResult.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-green-700 flex items-start gap-1.5">
                      <Star className="w-3.5 h-3.5 mt-0.5 text-green-500 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-3">
                  <AlertCircle className="w-4 h-4" /> Areas to Improve
                </h4>
                <ul className="space-y-1.5">
                  {gradingResult.improvements.map((s, i) => (
                    <li key={i} className="text-sm text-amber-700 flex items-start gap-1.5">
                      <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Score Breakdown */}
          {gradingResult && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">Score Breakdown</span>
                {showBreakdown ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {showBreakdown && (
                <div className="px-5 pb-5 space-y-3">
                  {([
                    { label: 'Grammar', value: gradingResult.breakdown.grammar, color: 'bg-purple-500' },
                    { label: 'Spelling', value: gradingResult.breakdown.spelling, color: 'bg-blue-500' },
                    { label: 'Punctuation', value: gradingResult.breakdown.punctuation, color: 'bg-orange-500' },
                    { label: 'Vocabulary', value: gradingResult.breakdown.vocabulary, color: 'bg-teal-500' },
                    { label: 'Structure', value: gradingResult.breakdown.structure, color: 'bg-indigo-500' },
                    { label: 'Task Adherence', value: gradingResult.breakdown.taskAdherence, color: 'bg-pink-500' },
                  ]).map(({ label, value, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-semibold text-gray-800">{value}/10</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value * 10}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sample Answer */}
          {selectedPrompt.sampleAnswer && (
            <div>
              <button
                onClick={() => setShowSample(!showSample)}
                className="text-sm text-indigo-600 hover:underline font-medium"
              >
                {showSample ? 'Hide' : 'Show'} sample answer
              </button>
              {showSample && (
                <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-800 whitespace-pre-line">
                  {selectedPrompt.sampleAnswer}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => { setSubmitted(false); setGradingResult(null); }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Edit &amp; Resubmit
            </button>
            <button onClick={handleBack} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
              Try Another Prompt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
