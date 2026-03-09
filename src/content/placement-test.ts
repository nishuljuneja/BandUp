import { type CEFRLevel, IELTS_BAND_LABELS } from '@/lib/firestore';

export interface PlacementQuestion {
  id: string;
  level: CEFRLevel;
  question: string;
  type: 'multiple-choice' | 'fill-blank';
  options?: string[];
  correctAnswer: string;
}

// 25 questions, 5 per level, progressive difficulty
// IELTS-focused — no regional context
export const placementQuestions: PlacementQuestion[] = [
  // ===== Band 3 (A1) - Beginner =====
  {
    id: 'p-a1-1',
    level: 'A1',
    question: 'My name _____ Sarah.',
    type: 'multiple-choice',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 'is',
  },
  {
    id: 'p-a1-2',
    level: 'A1',
    question: 'She _____ a teacher.',
    type: 'multiple-choice',
    options: ['is', 'am', 'are', 'be'],
    correctAnswer: 'is',
  },
  {
    id: 'p-a1-3',
    level: 'A1',
    question: 'I _____ from Canada.',
    type: 'multiple-choice',
    options: ['is', 'am', 'are', 'be'],
    correctAnswer: 'am',
  },
  {
    id: 'p-a1-4',
    level: 'A1',
    question: '_____ is your name?',
    type: 'multiple-choice',
    options: ['Who', 'What', 'Where', 'When'],
    correctAnswer: 'What',
  },
  {
    id: 'p-a1-5',
    level: 'A1',
    question: 'I have two _____.',
    type: 'multiple-choice',
    options: ['brother', 'brothers', 'brothres', 'brothier'],
    correctAnswer: 'brothers',
  },

  // ===== Band 4 (A2) - Elementary =====
  {
    id: 'p-a2-1',
    level: 'A2',
    question: 'She _____ to the supermarket every Sunday.',
    type: 'multiple-choice',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
  },
  {
    id: 'p-a2-2',
    level: 'A2',
    question: 'We _____ football yesterday.',
    type: 'multiple-choice',
    options: ['play', 'plays', 'played', 'playing'],
    correctAnswer: 'played',
  },
  {
    id: 'p-a2-3',
    level: 'A2',
    question: 'There are _____ apples on the table.',
    type: 'multiple-choice',
    options: ['some', 'a', 'an', 'much'],
    correctAnswer: 'some',
  },
  {
    id: 'p-a2-4',
    level: 'A2',
    question: 'The train is _____ than the bus.',
    type: 'multiple-choice',
    options: ['fast', 'faster', 'fastest', 'more fast'],
    correctAnswer: 'faster',
  },
  {
    id: 'p-a2-5',
    level: 'A2',
    question: 'I _____ like to have some coffee, please.',
    type: 'multiple-choice',
    options: ['will', 'would', 'can', 'shall'],
    correctAnswer: 'would',
  },

  // ===== Band 5 (B1) - Intermediate =====
  {
    id: 'p-b1-1',
    level: 'B1',
    question: 'If it _____ tomorrow, we will cancel the trip.',
    type: 'multiple-choice',
    options: ['rains', 'will rain', 'rained', 'raining'],
    correctAnswer: 'rains',
  },
  {
    id: 'p-b1-2',
    level: 'B1',
    question: 'She has been working here _____ 2019.',
    type: 'multiple-choice',
    options: ['since', 'for', 'from', 'during'],
    correctAnswer: 'since',
  },
  {
    id: 'p-b1-3',
    level: 'B1',
    question: 'The report _____ by the manager yesterday.',
    type: 'multiple-choice',
    options: ['was reviewed', 'reviewed', 'is reviewed', 'has reviewed'],
    correctAnswer: 'was reviewed',
  },
  {
    id: 'p-b1-4',
    level: 'B1',
    question: 'I wish I _____ speak English fluently.',
    type: 'multiple-choice',
    options: ['could', 'can', 'will', 'may'],
    correctAnswer: 'could',
  },
  {
    id: 'p-b1-5',
    level: 'B1',
    question: 'He asked me where I _____.',
    type: 'multiple-choice',
    options: ['lived', 'live', 'living', 'lives'],
    correctAnswer: 'lived',
  },

  // ===== Band 6 (B2) - Upper Intermediate =====
  {
    id: 'p-b2-1',
    level: 'B2',
    question: 'Had I known about the delay, I _____ taken a different route.',
    type: 'multiple-choice',
    options: ['would have', 'will have', 'had', 'would'],
    correctAnswer: 'would have',
  },
  {
    id: 'p-b2-2',
    level: 'B2',
    question: 'The project, _____ was due last week, has been postponed.',
    type: 'multiple-choice',
    options: ['which', 'that', 'what', 'who'],
    correctAnswer: 'which',
  },
  {
    id: 'p-b2-3',
    level: 'B2',
    question: 'Not only _____ the exam, but she also topped the class.',
    type: 'multiple-choice',
    options: ['did she pass', 'she passed', 'she did pass', 'passed she'],
    correctAnswer: 'did she pass',
  },
  {
    id: 'p-b2-4',
    level: 'B2',
    question: 'The government has _____ new regulations regarding emissions.',
    type: 'multiple-choice',
    options: ['implemented', 'implementing', 'implement', 'implements'],
    correctAnswer: 'implemented',
  },
  {
    id: 'p-b2-5',
    level: 'B2',
    question: 'She spoke so softly that I could _____ hear her.',
    type: 'multiple-choice',
    options: ['barely', 'mostly', 'nearly', 'merely'],
    correctAnswer: 'barely',
  },

  // ===== Band 7 (C1) - Advanced =====
  {
    id: 'p-c1-1',
    level: 'C1',
    question: 'The manuscript, _____ authenticity has been questioned, dates back centuries.',
    type: 'multiple-choice',
    options: ['whose', 'which', 'that', 'of whom'],
    correctAnswer: 'whose',
  },
  {
    id: 'p-c1-2',
    level: 'C1',
    question: 'Were it not for the heavy rainfall, the reservoirs _____.',
    type: 'multiple-choice',
    options: ['would have dried up', 'will dry up', 'had dried up', 'would dry up'],
    correctAnswer: 'would have dried up',
  },
  {
    id: 'p-c1-3',
    level: 'C1',
    question: 'The economist argued that inflation could be _____ by reducing the fiscal deficit.',
    type: 'multiple-choice',
    options: ['curbed', 'curved', 'cured', 'culled'],
    correctAnswer: 'curbed',
  },
  {
    id: 'p-c1-4',
    level: 'C1',
    question: 'Scarcely _____ the announcement been made when protests erupted.',
    type: 'multiple-choice',
    options: ['had', 'has', 'have', 'was'],
    correctAnswer: 'had',
  },
  {
    id: 'p-c1-5',
    level: 'C1',
    question: 'The novel provides a nuanced _____ of post-war society.',
    type: 'multiple-choice',
    options: ['portrayal', 'display', 'depiction', 'exhibition'],
    correctAnswer: 'portrayal',
  },
];

/**
 * IELTS-style scoring:
 * - Assign highest band where user got 3+/5 correct
 * - Cap at Band 7 (C1) unless EVERY answer is correct → Band 8-9 (C2)
 */
export function calculatePlacementLevel(
  answers: { questionId: string; correct: boolean }[]
): CEFRLevel {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const scoreByLevel: Record<string, number> = {
    A1: 0, A2: 0, B1: 0, B2: 0, C1: 0,
  };

  answers.forEach(({ questionId, correct }) => {
    if (correct) {
      const question = placementQuestions.find((q) => q.id === questionId);
      if (question) scoreByLevel[question.level]++;
    }
  });

  const totalCorrect = answers.filter((a) => a.correct).length;
  const totalQuestions = placementQuestions.length;

  // Perfect score → Band 8-9 (C2)
  if (totalCorrect === totalQuestions) {
    return 'C2';
  }

  // Find highest level where user scored >= 3/5
  let assignedLevel: CEFRLevel = 'A1';
  for (const level of levels) {
    if (scoreByLevel[level] >= 3) {
      assignedLevel = level;
    } else {
      break; // Stop at first failure - can't skip levels
    }
  }

  return assignedLevel;
}
