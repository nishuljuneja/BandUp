import { type CEFRLevel } from '../lib/firestore';

// ------------------------------------------------------------------
// Speaking Exercises — uses browser SpeechRecognition API for input
// and SpeechSynthesis for model pronunciation.
// ------------------------------------------------------------------

export interface SpeakingExercise {
  id: string;
  level: CEFRLevel;
  title: string;
  type: 'repeat' | 'respond' | 'describe' | 'role-play';
  description: string;
  /** Sentences for repeat-after-me or model responses */
  sentences: {
    text: string;
    hint?: string;
  }[];
  /** For role-play: alternating lines (system vs user) */
  rolePlayScript?: {
    speaker: 'system' | 'user';
    line: string;
    hint?: string;
  }[];
  topic: string;
  tips?: string[];
}

export const speakingExercises: SpeakingExercise[] = [
  // ==================== A1 ====================
  {
    id: 's-a1-01',
    level: 'A1',
    title: 'Introduce Yourself',
    type: 'repeat',
    description: 'Listen and repeat these self-introduction sentences. Focus on clear pronunciation.',
    sentences: [
      { text: 'Hello, my name is Aarav.', hint: 'Say your own name instead' },
      { text: 'I am from Mumbai.', hint: 'Say your city' },
      { text: 'I am twenty-five years old.' },
      { text: 'I am a software engineer.' },
      { text: 'I like playing cricket and reading books.' },
      { text: 'Nice to meet you.' },
    ],
    topic: 'Introductions',
    tips: [
      'Speak slowly and clearly',
      'Don\'t worry about your accent — focus on being understood',
    ],
  },
  {
    id: 's-a1-02',
    level: 'A1',
    title: 'At a Shop',
    type: 'role-play',
    description: 'Practice a conversation at a shop. The system plays the shopkeeper, you are the customer.',
    rolePlayScript: [
      { speaker: 'system', line: 'Good morning! Welcome to my shop. How can I help you?' },
      { speaker: 'user', line: 'I would like to buy some milk, please.', hint: 'Ask for milk' },
      { speaker: 'system', line: 'Sure! We have full cream and toned milk. Which one would you like?' },
      { speaker: 'user', line: 'I will take toned milk, please.', hint: 'Choose one type' },
      { speaker: 'system', line: 'That will be forty rupees.' },
      { speaker: 'user', line: 'Here you are. Thank you!', hint: 'Pay and thank' },
      { speaker: 'system', line: 'Thank you! Have a nice day!' },
    ],
    sentences: [],
    topic: 'Shopping',
  },
  {
    id: 's-a1-03',
    level: 'A1',
    title: 'Numbers and Time',
    type: 'repeat',
    description: 'Practice saying numbers, prices, and times clearly.',
    sentences: [
      { text: 'The time is half past nine.' },
      { text: 'My phone number is nine eight seven six five four three two one zero.' },
      { text: 'This shirt costs four hundred and fifty rupees.' },
      { text: 'The train arrives at quarter to six.' },
      { text: 'I wake up at seven o\'clock every morning.' },
    ],
    topic: 'Numbers & Time',
    tips: [
      'Practice numbers clearly — they are crucial for daily communication',
      'Indian English often says "four fifty" instead of "four hundred and fifty" — both are fine',
    ],
  },

  // ==================== A2 ====================
  {
    id: 's-a2-01',
    level: 'A2',
    title: 'Asking for Directions',
    type: 'role-play',
    description: 'You are lost and asking a stranger for directions. Practice polite requests.',
    rolePlayScript: [
      { speaker: 'user', line: 'Excuse me, could you help me?', hint: 'Get attention politely' },
      { speaker: 'system', line: 'Of course! Where do you need to go?' },
      { speaker: 'user', line: 'I am looking for the nearest metro station.', hint: 'Say where you want to go' },
      { speaker: 'system', line: 'Go straight for about two hundred metres, then turn right at the traffic signal. The metro station is on your left.' },
      { speaker: 'user', line: 'How long will it take to walk there?', hint: 'Ask about time' },
      { speaker: 'system', line: 'About five to ten minutes on foot.' },
      { speaker: 'user', line: 'Thank you so much for your help!', hint: 'Thank them' },
    ],
    sentences: [],
    topic: 'Directions',
  },
  {
    id: 's-a2-02',
    level: 'A2',
    title: 'Describe Your Daily Routine',
    type: 'describe',
    description: 'Describe what you do on a typical day. Use the sentences as models, then try your own.',
    sentences: [
      { text: 'I usually wake up at six thirty in the morning.' },
      { text: 'After brushing my teeth, I have a cup of tea.' },
      { text: 'I take the bus to work at eight o\'clock.' },
      { text: 'I have lunch at one in the afternoon.' },
      { text: 'I finish work at five and go home.' },
      { text: 'In the evening, I watch television or go for a walk.' },
      { text: 'I go to bed at around ten thirty.' },
    ],
    topic: 'Daily Life',
    tips: [
      'Use time expressions: in the morning, in the afternoon, in the evening',
      'Use adverbs of frequency: always, usually, sometimes, never',
    ],
  },

  // ==================== B1 ====================
  {
    id: 's-b1-01',
    level: 'B1',
    title: 'Express Your Opinion',
    type: 'respond',
    description: 'Read each question, then speak your answer aloud for at least 30 seconds. Use opinion phrases.',
    sentences: [
      { text: 'Do you think social media is good for students?', hint: 'Use: In my opinion... / I believe... / On the other hand...' },
      { text: 'Should school uniforms be mandatory in India?', hint: 'Use: I think... / The advantage is... / However...' },
      { text: 'Is it better to live in a city or a village?', hint: 'Use: From my perspective... / While some people think...' },
    ],
    topic: 'Opinions',
    tips: [
      'Structure your answer: State opinion → Give reason → Give example → Conclude',
      'Use linking words: because, however, therefore, moreover, in addition',
    ],
  },
  {
    id: 's-b1-02',
    level: 'B1',
    title: 'Job Interview Practice',
    type: 'role-play',
    description: 'Practice a job interview. The system is the interviewer.',
    rolePlayScript: [
      { speaker: 'system', line: 'Good morning. Please take a seat. Could you start by telling me about yourself?' },
      { speaker: 'user', line: 'Good morning. My name is... I have been working as a software developer for three years.', hint: 'Introduce yourself professionally' },
      { speaker: 'system', line: 'That sounds interesting. What are your main strengths?' },
      { speaker: 'user', line: 'I am a good team player and I pay attention to detail. I also learn new technologies quickly.', hint: 'Share 2-3 strengths' },
      { speaker: 'system', line: 'Can you tell me about a challenging situation at work and how you handled it?' },
      { speaker: 'user', line: 'In my previous role, we had a tight deadline for a project. I organized the team and we divided the work efficiently. We delivered on time.', hint: 'Use past tense to tell a story' },
      { speaker: 'system', line: 'Very good. Do you have any questions for us?' },
      { speaker: 'user', line: 'Yes, could you tell me about the team I would be working with?', hint: 'Ask a thoughtful question' },
    ],
    sentences: [],
    topic: 'Career',
    tips: [
      'Use the STAR method: Situation, Task, Action, Result',
      'Speak confidently but not too fast',
      'Avoid filler words like "basically", "actually", "like"',
    ],
  },

  // ==================== B2 ====================
  {
    id: 's-b2-01',
    level: 'B2',
    title: 'Give a Mini Presentation',
    type: 'describe',
    description: 'Pick one topic and speak for 2 minutes. Use the structure provided. Record yourself and listen back.',
    sentences: [
      { text: 'Topic: The impact of technology on education in India', hint: 'Use: Today I would like to discuss...' },
      { text: 'Introduction: State the topic and why it matters.', hint: 'Use: This is particularly relevant because...' },
      { text: 'Point 1: Discuss the advantages.', hint: 'Use: One significant advantage is..., Furthermore...' },
      { text: 'Point 2: Discuss the challenges.', hint: 'Use: However, there are also challenges such as...' },
      { text: 'Conclusion: Summarise and give your view.', hint: 'Use: In conclusion, I believe that..., To sum up...' },
    ],
    topic: 'Presentations',
    tips: [
      'Use signposting language: firstly, secondly, moving on to, in conclusion',
      'Pause between main points — don\'t rush',
      'Use examples from Indian context to support your arguments',
    ],
  },
  {
    id: 's-b2-02',
    level: 'B2',
    title: 'Debate: Remote Work',
    type: 'respond',
    description: 'Respond to each statement with a counter-argument. Practice expressing disagreement politely.',
    sentences: [
      { text: 'Working from home reduces productivity because of distractions.', hint: 'Disagree politely: I see your point, however... / While that may be true in some cases...' },
      { text: 'Companies should require employees to come to the office every day.', hint: 'Present alternatives: Rather than..., a more balanced approach would be...' },
      { text: 'Technology has made work-life balance worse, not better.', hint: 'Nuanced response: It depends on... / There are two sides to this...' },
    ],
    topic: 'Work & Society',
    tips: [
      'Acknowledging the other view before disagreeing shows maturity: "While I understand that..., I would argue that..."',
      'Support your counter-argument with evidence or examples',
    ],
  },

  // ==================== C1 ====================
  {
    id: 's-c1-01',
    level: 'C1',
    title: 'Academic Discussion',
    type: 'respond',
    description: 'Respond to each academic prompt with a well-structured spoken answer (60-90 seconds each).',
    sentences: [
      { text: 'Discuss the implications of artificial intelligence on employment in developing countries like India.', hint: 'Use hedging language: It could be argued that... / Evidence suggests... / This is likely to...' },
      { text: 'Evaluate the effectiveness of India\'s digital payment revolution in promoting financial inclusion.', hint: 'Use evaluative language: To a large extent... / The evidence is mixed... / A critical assessment reveals...' },
      { text: 'To what extent should governments regulate social media platforms?', hint: 'Balance arguments: Proponents argue... / Critics, however, contend... / A nuanced perspective suggests...' },
    ],
    topic: 'Academic',
    tips: [
      'Use hedging and cautious language in academic discussions',
      'Reference evidence or examples even in spoken responses',
      'Structure: Context → Analysis → Evaluation → Conclusion',
    ],
  },
  {
    id: 's-c1-02',
    level: 'C1',
    title: 'Pronunciation: Problem Sounds',
    type: 'repeat',
    description: 'Practice sounds that are commonly challenging for Indian English speakers. Listen carefully and repeat.',
    sentences: [
      { text: 'The thick thief thought about three things.', hint: 'Focus on "th" sound — tongue between teeth' },
      { text: 'She sells sea shells by the sea shore.', hint: 'Focus on "sh" vs "s" distinction' },
      { text: 'The vase was very valuable.', hint: 'Focus on "v" sound — upper teeth on lower lip, not "w"' },
      { text: 'I would like a bottle of water.', hint: 'Focus on "w" vs "v": "water" not "vater"' },
      { text: 'The professor asked the students to submit their papers.', hint: 'Focus on "p" with aspiration (puff of air)' },
      { text: 'World, word, work, worm, worth.', hint: 'Focus on the "w" + "er" vowel combination' },
    ],
    topic: 'Pronunciation',
    tips: [
      'Record yourself and compare with the model pronunciation',
      'Indian languages often lack the "th" sound — practice placing your tongue between your teeth',
      'The "v" and "w" distinction is important: "vine" vs "wine"',
    ],
  },
];

export function getSpeakingExercisesByLevel(level: string): SpeakingExercise[] {
  return speakingExercises.filter((e) => e.level === level);
}
