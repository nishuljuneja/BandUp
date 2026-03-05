import { type CEFRLevel } from '../lib/firestore';

// ------------------------------------------------------------------
// Listening Exercises — uses browser SpeechSynthesis API to read text
// aloud. Exercises include dictation, gap-fill, and comprehension.
// ------------------------------------------------------------------

export interface ListeningExercise {
  id: string;
  level: CEFRLevel;
  title: string;
  type: 'dictation' | 'gap-fill' | 'comprehension';
  /** The full text that will be spoken aloud (hidden from user) */
  transcript: string;
  /** For gap-fill: the transcript with ___N___ placeholders */
  gapText?: string;
  /** For gap-fill: the correct words for each gap */
  gaps?: string[];
  /** For comprehension: questions asked after listening */
  questions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  /** For dictation: sentences spoken one at a time */
  sentences?: string[];
  topic: string;
  duration: string;
  speechRate?: number; // 0.5–2.0, default 0.9
}

export const listeningExercises: ListeningExercise[] = [
  // ==================== A1 ====================
  {
    id: 'l-a1-01',
    level: 'A1',
    title: 'At the Train Station',
    type: 'dictation',
    transcript: 'Excuse me. Where is the train to Delhi? Platform number three. Thank you very much. The train leaves at ten o clock.',
    sentences: [
      'Excuse me.',
      'Where is the train to Delhi?',
      'Platform number three.',
      'Thank you very much.',
      'The train leaves at ten o clock.',
    ],
    topic: 'Travel',
    duration: '2 min',
    speechRate: 0.8,
  },
  {
    id: 'l-a1-02',
    level: 'A1',
    title: 'Ordering Food',
    type: 'gap-fill',
    transcript: 'I would like two cups of tea and one plate of samosa please. How much does it cost? It costs fifty rupees. Here you go. Thank you.',
    gapText: 'I would like two cups of ___1___ and one plate of ___2___ please. How much does it ___3___? It costs ___4___ rupees. Here you go. Thank you.',
    gaps: ['tea', 'samosa', 'cost', 'fifty'],
    topic: 'Food & Drink',
    duration: '2 min',
    speechRate: 0.8,
  },
  {
    id: 'l-a1-03',
    level: 'A1',
    title: 'Meeting a New Friend',
    type: 'comprehension',
    transcript: 'Hello, my name is Priya. I am from Bangalore. I am a teacher. I teach English at a school. I like reading books and watching movies. My favourite colour is blue. I have one brother and one sister.',
    questions: [
      { question: 'What is Priya\'s job?', options: ['Doctor', 'Teacher', 'Engineer', 'Student'], correctAnswer: 'Teacher' },
      { question: 'Where is Priya from?', options: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'], correctAnswer: 'Bangalore' },
      { question: 'What is her favourite colour?', options: ['Red', 'Green', 'Blue', 'Yellow'], correctAnswer: 'Blue' },
      { question: 'How many siblings does she have?', options: ['None', 'One', 'Two', 'Three'], correctAnswer: 'Two' },
    ],
    topic: 'Introductions',
    duration: '2 min',
    speechRate: 0.8,
  },

  // ==================== A2 ====================
  {
    id: 'l-a2-01',
    level: 'A2',
    title: 'A Phone Call',
    type: 'comprehension',
    transcript: 'Hello, this is Ravi calling from ABC Company. I would like to speak to Mr. Sharma please. I am sorry, Mr. Sharma is in a meeting right now. Can I take a message? Yes, please tell him that the meeting tomorrow has been moved to three o clock instead of two o clock. Sure, I will pass on the message. Thank you, goodbye.',
    questions: [
      { question: 'Who is calling?', options: ['Mr. Sharma', 'Ravi', 'The receptionist', 'The manager'], correctAnswer: 'Ravi' },
      { question: 'Why can\'t Mr. Sharma talk?', options: ['He is on holiday', 'He is in a meeting', 'He is sick', 'He left the office'], correctAnswer: 'He is in a meeting' },
      { question: 'What time is the meeting now?', options: ['1 o\'clock', '2 o\'clock', '3 o\'clock', '4 o\'clock'], correctAnswer: '3 o\'clock' },
    ],
    topic: 'Business',
    duration: '3 min',
    speechRate: 0.85,
  },
  {
    id: 'l-a2-02',
    level: 'A2',
    title: 'Giving Directions',
    type: 'gap-fill',
    transcript: 'Go straight on this road for about two hundred metres. Then turn left at the traffic signal. You will see a big temple on your right side. The hospital is just next to the temple. It takes about ten minutes to walk there.',
    gapText: 'Go ___1___ on this road for about two hundred metres. Then turn ___2___ at the traffic signal. You will see a big ___3___ on your right side. The ___4___ is just next to the temple. It takes about ___5___ minutes to walk there.',
    gaps: ['straight', 'left', 'temple', 'hospital', 'ten'],
    topic: 'Directions',
    duration: '3 min',
    speechRate: 0.85,
  },
  {
    id: 'l-a2-03',
    level: 'A2',
    title: 'Weekend Plans',
    type: 'dictation',
    transcript: 'This weekend I am going to visit my grandparents. They live in a small village near Jaipur. We will eat delicious food and play cricket in the evening.',
    sentences: [
      'This weekend I am going to visit my grandparents.',
      'They live in a small village near Jaipur.',
      'We will eat delicious food and play cricket in the evening.',
    ],
    topic: 'Daily Life',
    duration: '2 min',
    speechRate: 0.85,
  },

  // ==================== B1 ====================
  {
    id: 'l-b1-01',
    level: 'B1',
    title: 'Job Interview Tips',
    type: 'comprehension',
    transcript: 'Preparing for a job interview can be stressful, but with the right preparation, you can feel confident. First, research the company thoroughly. Know what they do, who their customers are, and what their values are. Second, practice common interview questions with a friend or family member. Questions like tell me about yourself and what are your strengths and weaknesses are almost always asked. Third, dress professionally. In India, formal attire like a shirt and trousers for men or a salwar suit or formal dress for women is usually appropriate. Finally, arrive at least fifteen minutes early. Being late creates a very bad first impression. Remember, the interviewer wants you to succeed, so be yourself and stay positive.',
    questions: [
      { question: 'What should you research before an interview?', options: ['The salary range', 'The company, its customers and values', 'The interviewer\'s background', 'Other job openings'], correctAnswer: 'The company, its customers and values' },
      { question: 'How early should you arrive?', options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'], correctAnswer: '15 minutes' },
      { question: 'What creates a bad first impression?', options: ['Being nervous', 'Asking questions', 'Being late', 'Wearing traditional clothes'], correctAnswer: 'Being late' },
    ],
    topic: 'Career',
    duration: '4 min',
    speechRate: 0.9,
  },
  {
    id: 'l-b1-02',
    level: 'B1',
    title: 'News Report: Monsoon Season',
    type: 'gap-fill',
    transcript: 'The monsoon season has arrived in Kerala, bringing heavy rainfall across the southern state. The India Meteorological Department has issued a warning for the next seventy two hours. Several districts have reported flooding, and over five thousand people have been moved to relief camps. Schools in affected areas will remain closed until further notice. The government has deployed rescue teams and is distributing food and clean water to those affected.',
    gapText: 'The ___1___ season has arrived in Kerala, bringing heavy ___2___ across the southern state. The India Meteorological Department has issued a ___3___ for the next seventy two hours. Several districts have reported ___4___, and over five thousand people have been moved to relief camps. Schools in affected areas will remain ___5___ until further notice.',
    gaps: ['monsoon', 'rainfall', 'warning', 'flooding', 'closed'],
    topic: 'News & Weather',
    duration: '4 min',
    speechRate: 0.9,
  },
  {
    id: 'l-b1-03',
    level: 'B1',
    title: 'Booking a Hotel Room',
    type: 'dictation',
    transcript: 'I would like to book a double room for three nights. Do you have any rooms available from the fifteenth to the eighteenth of March? Does the room include breakfast? Is there free wifi in the hotel?',
    sentences: [
      'I would like to book a double room for three nights.',
      'Do you have any rooms available from the fifteenth to the eighteenth of March?',
      'Does the room include breakfast?',
      'Is there free wifi in the hotel?',
    ],
    topic: 'Travel',
    duration: '3 min',
    speechRate: 0.9,
  },

  // ==================== B2 ====================
  {
    id: 'l-b2-01',
    level: 'B2',
    title: 'Climate Change Discussion',
    type: 'comprehension',
    transcript: 'Climate change is arguably the most pressing challenge of our generation. The scientific consensus is clear. Human activities, particularly the burning of fossil fuels and deforestation, have significantly increased the concentration of greenhouse gases in the atmosphere. India is especially vulnerable to the effects of climate change. Rising temperatures are affecting agricultural productivity, glacial melting in the Himalayas threatens water security for millions, and extreme weather events like cyclones and heatwaves are becoming more frequent and intense. However, India is also making significant strides in renewable energy. The country has become one of the largest producers of solar energy in the world, and the government has set ambitious targets for reducing carbon emissions by twenty thirty.',
    questions: [
      { question: 'What is the main cause of increased greenhouse gases?', options: ['Natural cycles', 'Volcanic activity', 'Burning fossil fuels and deforestation', 'Solar radiation'], correctAnswer: 'Burning fossil fuels and deforestation' },
      { question: 'How does glacial melting affect India?', options: ['It increases tourism', 'It threatens water security', 'It improves agriculture', 'It creates new jobs'], correctAnswer: 'It threatens water security' },
      { question: 'What progress has India made?', options: ['Built nuclear plants', 'Become a leader in solar energy', 'Stopped using fossil fuels', 'Planted the most trees globally'], correctAnswer: 'Become a leader in solar energy' },
    ],
    topic: 'Environment',
    duration: '5 min',
    speechRate: 0.95,
  },
  {
    id: 'l-b2-02',
    level: 'B2',
    title: 'University Lecture: Economics',
    type: 'gap-fill',
    transcript: 'The concept of supply and demand is fundamental to understanding how markets work. When demand for a product increases but supply remains constant, prices tend to rise. Conversely, when supply exceeds demand, prices generally fall. In the Indian context, we can observe this clearly with agricultural commodities. During harvest season, when supply is abundant, prices for crops like wheat and rice tend to decrease. However, during off season or when there is a drought, reduced supply leads to significant price increases.',
    gapText: 'The concept of ___1___ and demand is fundamental to understanding how markets work. When demand for a product increases but supply remains ___2___, prices tend to rise. ___3___, when supply exceeds demand, prices generally fall. In the Indian context, we can observe this clearly with agricultural ___4___. During harvest season, when supply is ___5___, prices for crops like wheat and rice tend to decrease.',
    gaps: ['supply', 'constant', 'Conversely', 'commodities', 'abundant'],
    topic: 'Economics',
    duration: '5 min',
    speechRate: 0.95,
  },

  // ==================== C1 ====================
  {
    id: 'l-c1-01',
    level: 'C1',
    title: 'TED-Style Talk: Innovation in India',
    type: 'comprehension',
    transcript: 'What makes India unique in the global innovation landscape is a concept we call jugaad, or frugal innovation. While Silicon Valley focuses on cutting edge technology with massive budgets, Indian innovators have historically excelled at finding creative, low cost solutions to complex problems. Consider the Jaipur Foot, a prosthetic limb that costs a fraction of Western equivalents but provides remarkable mobility. Or the Mitticool, a clay refrigerator that works without electricity. These innovations emerge from necessity and demonstrate that constraints can actually fuel creativity rather than hinder it. The challenge now is to scale these innovations while maintaining their accessibility. As India positions itself as a global technology hub, the question is not whether we can innovate, but whether we can do so inclusively, ensuring that the benefits reach the seven hundred million Indians who still live in rural areas.',
    questions: [
      { question: 'What is "jugaad"?', options: ['A coding framework', 'Frugal innovation', 'A government scheme', 'A startup accelerator'], correctAnswer: 'Frugal innovation' },
      { question: 'What is special about the Jaipur Foot?', options: ['It uses AI', 'It costs much less than Western alternatives', 'It was invented in Silicon Valley', 'It runs on solar power'], correctAnswer: 'It costs much less than Western alternatives' },
      { question: 'According to the speaker, what fuels creativity?', options: ['Large budgets', 'Government support', 'Constraints', 'Competition'], correctAnswer: 'Constraints' },
      { question: 'What is the key challenge mentioned?', options: ['Getting funding', 'Scaling innovations inclusively', 'Competing with China', 'Training more engineers'], correctAnswer: 'Scaling innovations inclusively' },
    ],
    topic: 'Innovation & Society',
    duration: '6 min',
    speechRate: 1.0,
  },
  {
    id: 'l-c1-02',
    level: 'C1',
    title: 'Academic Lecture: Constitutional Law',
    type: 'dictation',
    transcript: 'The Indian Constitution is the longest written constitution of any sovereign nation. It was drafted over a period of nearly three years. The fundamental rights enshrined in Part Three guarantee individual liberties against state overreach.',
    sentences: [
      'The Indian Constitution is the longest written constitution of any sovereign nation.',
      'It was drafted over a period of nearly three years.',
      'The fundamental rights enshrined in Part Three guarantee individual liberties against state overreach.',
    ],
    topic: 'Law & Government',
    duration: '4 min',
    speechRate: 1.0,
  },
];

export function getListeningExercisesByLevel(level: string): ListeningExercise[] {
  return listeningExercises.filter((e) => e.level === level);
}
