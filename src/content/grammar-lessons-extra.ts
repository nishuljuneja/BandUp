// Additional grammar lessons — B2, C1, C2
// Imported and merged in grammar-lessons.ts

import { type GrammarLesson } from '../lib/firestore';

const T = { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' };

export const additionalGrammarLessons: GrammarLesson[] = [
  // ==================== B2: PASSIVE VOICE (ADVANCED) ====================
  {
    id: 'b2-gram-04',
    level: 'B2',
    title: 'Advanced Passive Voice',
    titleTranslations: { ...T, hi: 'उन्नत कर्मवाच्य', en: 'Advanced Passive Voice' },
    description: 'Use passive constructions with modals, continuous tenses, and reporting verbs.',
    descriptionTranslations: { ...T, hi: 'Modals, continuous tenses, और reporting verbs के साथ passive बनाएं।' },
    order: 4,
    content: {
      explanation: `**Basic passive:** Subject + be + past participle
Active: They **build** many IT parks in India.
Passive: Many IT parks **are built** in India.

**Passive with modals:**
- can/could/should/must + be + past participle
- The project **must be completed** by Friday.
- The report **should be submitted** online.

**Passive with continuous:**
- is/was being + past participle
- A new metro line **is being constructed** in Bangalore.
- The road **was being repaired** when we arrived.

**Passive with perfect:**
- has/had been + past participle
- The results **have been announced** by the university.
- The tickets **had been sold out** before we arrived.

**Passive with reporting verbs:**
- It is said/believed/reported/known that...
- It **is believed** that the company will expand.
- She **is known** to be an excellent coder.`,
      explanationTranslations: { ...T, hi: `**Passive with modals:** must/should/can + be + past participle
**Continuous passive:** is/was being + past participle
**Perfect passive:** has/had been + past participle
**Reporting:** It is said/believed/known that...` },
      examples: [
        { english: 'A new airport is being built near Noida.', translations: { ...T, hi: 'नोएडा के पास एक नया हवाई अड्डा बनाया जा रहा है।' }, highlight: 'is being built' },
        { english: 'It is believed that Indian IT will continue to grow.', translations: { ...T, hi: 'माना जाता है कि भारतीय IT बढ़ता रहेगा।' }, highlight: 'It is believed' },
      ],
      tips: [
        { text: '💡 Use passive when the action matters more than who does it: "The Taj Mahal was built in 1632" — we focus on the monument, not the workers.', translations: { ...T, hi: '💡 Passive तब प्रयोग करें जब कार्य महत्वपूर्ण हो, कर्ता नहीं।' } },
      ],
    },
    exercises: [
      { id: 'b2-g4-ex1', type: 'multiple-choice', question: 'The new highway _____ by next year.', options: ['will complete', 'will be completed', 'is completing', 'has completed'], correctAnswer: 'will be completed', explanation: 'Future passive: will be + past participle.', explanationTranslations: { ...T, hi: 'Future passive: will be + past participle.' } },
      { id: 'b2-g4-ex2', type: 'fill-blank', question: 'The application must _____ before the deadline. (submit)', correctAnswer: 'be submitted', explanation: 'Modal passive: must + be + past participle.', explanationTranslations: { ...T, hi: 'Modal passive: must + be + past participle.' } },
      { id: 'b2-g4-ex3', type: 'correct-error', question: 'Find the error: "The bridge is being build since last year."', correctAnswer: 'The bridge has been being built since last year.', explanation: '"Since" requires present perfect. Also "build" should be "built" (past participle).', explanationTranslations: { ...T, hi: '"Since" के साथ present perfect चाहिए। "build" → "built".' } },
      { id: 'b2-g4-ex4', type: 'multiple-choice', question: 'It _____ that over 500 languages are spoken in India.', options: ['believes', 'is believed', 'was believing', 'has believing'], correctAnswer: 'is believed', explanation: 'Reporting passive: It is believed that...', explanationTranslations: { ...T, hi: 'Reporting passive: It is believed that...' } },
      { id: 'b2-g4-ex5', type: 'fill-blank', question: 'The metro line _____ when we visited Lucknow. (construct — past continuous passive)', correctAnswer: 'was being constructed', explanation: 'Past continuous passive: was being + past participle.', explanationTranslations: { ...T, hi: 'Past continuous passive: was being + past participle.' } },
      { id: 'b2-g4-ex6', type: 'multiple-choice', question: 'All the tickets _____ by the time we reached the counter.', options: ['sold', 'have been sold', 'had been sold', 'were selling'], correctAnswer: 'had been sold', explanation: 'Past perfect passive for something completed before another past event.', explanationTranslations: { ...T, hi: 'Past perfect passive: had been + past participle.' } },
      { id: 'b2-g4-ex7', type: 'correct-error', question: 'Find the error: "The results have been announce by the board."', correctAnswer: 'The results have been announced by the board.', explanation: 'Perfect passive needs past participle: announced, not announce.', explanationTranslations: { ...T, hi: 'Perfect passive में past participle चाहिए: announced.' } },
      { id: 'b2-g4-ex8', type: 'fill-blank', question: 'She is known _____ be an expert in machine learning. (reporting passive)', correctAnswer: 'to', explanation: 'Subject + is known + to + base verb: She is known to be...', explanationTranslations: { ...T, hi: 'Subject + is known + to + base verb.' } },
      { id: 'b2-g4-ex9', type: 'multiple-choice', question: 'The road _____ repaired right now.', options: ['is', 'is being', 'has been', 'was'], correctAnswer: 'is being', explanation: 'Present continuous passive: is being + past participle.', explanationTranslations: { ...T, hi: 'Present continuous passive: is being + past participle.' } },
      { id: 'b2-g4-ex10', type: 'fill-blank', question: 'The mangoes should _____ stored in a cool place. (store)', correctAnswer: 'be', explanation: 'Modal passive: should + be + past participle.', explanationTranslations: { ...T, hi: 'Modal passive: should + be + past participle.' } },
      { id: 'b2-g4-ex11', type: 'correct-error', question: 'Find the error: "A new school is build in our village."', correctAnswer: 'A new school is being built in our village.', explanation: 'Present continuous passive: is being built (ongoing action).', explanationTranslations: { ...T, hi: 'Present continuous passive: is being built (चल रही क्रिया).' } },
      { id: 'b2-g4-ex12', type: 'multiple-choice', question: 'It _____ that the monsoon will arrive early this year.', options: ['reports', 'is reported', 'was reporting', 'has reporting'], correctAnswer: 'is reported', explanation: 'Reporting passive: It is reported that...', explanationTranslations: { ...T, hi: 'Reporting passive: It is reported that...' } },
      { id: 'b2-g4-ex13', type: 'fill-blank', question: 'The homework could _____ finished earlier if you had started on time.', correctAnswer: 'have been', explanation: 'Past modal passive: could have been + past participle.', explanationTranslations: { ...T, hi: 'Past modal passive: could have been + past participle.' } },
      { id: 'b2-g4-ex14', type: 'correct-error', question: 'Find the error: "Tea is growed in Assam and Darjeeling."', correctAnswer: 'Tea is grown in Assam and Darjeeling.', explanation: 'The past participle of "grow" is "grown", not "growed".', explanationTranslations: { ...T, hi: '"Grow" का past participle "grown" है, "growed" नहीं.' } },
    ],
  },

  // ==================== B2: RELATIVE CLAUSES ====================
  {
    id: 'b2-gram-05',
    level: 'B2',
    title: 'Defining & Non-Defining Relative Clauses',
    titleTranslations: { ...T, hi: 'परिभाषित और अपरिभाषित संबंधवाचक उपवाक्य', en: 'Defining & Non-Defining Relative Clauses' },
    description: 'Use who, which, that, whose, and where to add information to sentences.',
    descriptionTranslations: { ...T, hi: 'वाक्यों में जानकारी जोड़ने के लिए who, which, that, whose, where का प्रयोग करें।' },
    order: 5,
    content: {
      explanation: `**Defining relative clauses** — essential information (no commas):
- The man **who works** at Infosys is my cousin.
- The phone **that I bought** was expensive.
- "That" can replace "who/which" in defining clauses.

**Non-defining** — extra information (WITH commas):
- My sister, **who lives in Pune**, is a doctor.
- The Ganges, **which flows through Varanasi**, is sacred.
- ❌ Cannot use "that" in non-defining clauses.

**Whose** (possession):
- The teacher **whose class** I attended was excellent.

**Where / When:**
- Chennai is the city **where** I grew up.
- 2020 was the year **when** everything changed.

**Omitting the relative pronoun:**
- The book **(that/which) I read** was interesting. ✅ (object)
- The man **who called** is my boss. ❌ Cannot omit (subject).`,
      explanationTranslations: { ...T, hi: `**Defining:** ज़रूरी जानकारी (बिना comma): The man who works...
**Non-defining:** अतिरिक्त जानकारी (comma के साथ): My sister, who lives in Pune,...
**Whose:** अधिकार, **Where:** स्थान, **When:** समय` },
      examples: [
        { english: 'The biryani that my mother makes is the best in the world.', translations: { ...T, hi: 'मेरी माँ जो बिरयानी बनाती हैं वह दुनिया में सबसे अच्छी है।' }, highlight: 'that my mother makes' },
        { english: 'Mumbai, which is India\'s financial capital, never sleeps.', translations: { ...T, hi: 'मुंबई, जो भारत की वित्तीय राजधानी है, कभी नहीं सोती।' }, highlight: ', which is India\'s financial capital,' },
      ],
      tips: [
        { text: '💡 If removing the clause changes the meaning of the sentence, it\'s defining (no commas). If it just adds extra info, it\'s non-defining (with commas).', translations: { ...T, hi: '💡 अगर clause हटाने से अर्थ बदल जाए → defining (बिना comma)। अतिरिक्त जानकारी → non-defining (comma)।' } },
      ],
    },
    exercises: [
      { id: 'b2-g5-ex1', type: 'multiple-choice', question: 'The woman _____ bags were stolen reported it to police.', options: ['who', 'which', 'whose', 'that'], correctAnswer: 'whose', explanation: '"Whose" shows possession — the woman\'s bags.', explanationTranslations: { ...T, hi: '"Whose" अधिकार दिखाता है — महिला के बैग।' } },
      { id: 'b2-g5-ex2', type: 'fill-blank', question: 'The Taj Mahal, _____ was built by Shah Jahan, attracts millions of tourists.', correctAnswer: 'which', explanation: 'Non-defining clause about a thing → "which" (not "that").', explanationTranslations: { ...T, hi: 'Non-defining clause (वस्तु) → "which" ("that" नहीं)।' } },
      { id: 'b2-g5-ex3', type: 'correct-error', question: 'Find the error: "My father, that works at TCS, is retiring next year."', correctAnswer: 'My father, who works at TCS, is retiring next year.', explanation: 'Non-defining clauses use "who" for people, never "that".', explanationTranslations: { ...T, hi: 'Non-defining clauses में "who" आता है, "that" नहीं।' } },
      { id: 'b2-g5-ex4', type: 'multiple-choice', question: 'Jaipur is the city _____ I was born.', options: ['which', 'that', 'where', 'whose'], correctAnswer: 'where', explanation: '"Where" is used for places.', explanationTranslations: { ...T, hi: '"Where" स्थान के लिए प्रयोग होता है।' } },
      { id: 'b2-g5-ex5', type: 'fill-blank', question: 'The book _____ you recommended was very interesting.', correctAnswer: 'that', explanation: 'Defining clause, object position → "that" or "which" both work.', explanationTranslations: { ...T, hi: 'Defining clause, कर्म स्थिति → "that" या "which" दोनों सही हैं।' } },
      { id: 'b2-g5-ex6', type: 'multiple-choice', question: 'The IIT entrance exam, _____ is extremely competitive, takes place every year.', options: ['that', 'which', 'who', 'whose'], correctAnswer: 'which', explanation: 'Non-defining clause about a thing → "which".', explanationTranslations: { ...T, hi: 'Non-defining clause (वस्तु) → "which".' } },
      { id: 'b2-g5-ex7', type: 'correct-error', question: 'Find the error: "The teacher who\'s students topped the exam was honoured."', correctAnswer: 'The teacher whose students topped the exam was honoured.', explanation: '"Whose" = possession. "Who\'s" = who is/who has.', explanationTranslations: { ...T, hi: '"Whose" = अधिकार। "Who\'s" = who is/who has.' } },
      { id: 'b2-g5-ex8', type: 'fill-blank', question: 'The year _____ India gained independence was 1947.', correctAnswer: 'when', explanation: '"When" is used for time references.', explanationTranslations: { ...T, hi: '"When" समय के लिए प्रयोग होता है।' } },
      { id: 'b2-g5-ex9', type: 'multiple-choice', question: 'The chai _____ my grandmother makes is the best.', options: ['who', 'which', 'whose', 'where'], correctAnswer: 'which', explanation: 'Defining clause about a thing → "which" or "that".', explanationTranslations: { ...T, hi: 'Defining clause (वस्तु) → "which" या "that".' } },
      { id: 'b2-g5-ex10', type: 'correct-error', question: 'Find the error: "Delhi which is very polluted needs more trees."', correctAnswer: 'Delhi, which is very polluted, needs more trees.', explanation: 'Non-defining clauses need commas around them.', explanationTranslations: { ...T, hi: 'Non-defining clauses के आसपास comma चाहिए।' } },
      { id: 'b2-g5-ex11', type: 'fill-blank', question: 'She is the engineer _____ designed the bridge over the Brahmaputra.', correctAnswer: 'who', explanation: 'Defining clause about a person (subject) → "who".', explanationTranslations: { ...T, hi: 'Defining clause (व्यक्ति, कर्ता) → "who".' } },
      { id: 'b2-g5-ex12', type: 'multiple-choice', question: 'The students, most of _____ passed, celebrated happily.', options: ['who', 'whom', 'which', 'that'], correctAnswer: 'whom', explanation: 'After prepositions (of/for/to), use "whom" for people.', explanationTranslations: { ...T, hi: 'Preposition (of/for/to) के बाद "whom" आता है।' } },
      { id: 'b2-g5-ex13', type: 'fill-blank', question: 'The reason _____ he left the job was poor management.', correctAnswer: 'why', explanation: '"Why" can be used with "reason" in relative clauses.', explanationTranslations: { ...T, hi: '"Why" "reason" के साथ relative clause में प्रयोग हो सकता है।' } },
      { id: 'b2-g5-ex14', type: 'correct-error', question: 'Find the error: "The man which called you is my uncle."', correctAnswer: 'The man who called you is my uncle.', explanation: 'For people, use "who" or "that", not "which".', explanationTranslations: { ...T, hi: 'व्यक्तियों के लिए "who" या "that", "which" नहीं।' } },
    ],
  },

  // ==================== B2: PHRASAL VERBS ====================
  {
    id: 'b2-gram-06',
    level: 'B2',
    title: 'Phrasal Verbs in Context',
    titleTranslations: { ...T, hi: 'संदर्भ में Phrasal Verbs', en: 'Phrasal Verbs in Context' },
    description: 'Master common phrasal verbs used in everyday and professional English.',
    descriptionTranslations: { ...T, hi: 'रोज़मर्रा और पेशेवर अंग्रेज़ी में प्रयोग होने वाले phrasal verbs सीखें।' },
    order: 6,
    content: {
      explanation: `A **phrasal verb** = verb + particle (preposition/adverb). The meaning often changes completely.

**Common separable phrasal verbs** (object can go in between):
- **pick up** → collect: I'll **pick you up** from the station.
- **turn down** → reject: She **turned down** the offer.
- **put off** → postpone: They **put off** the meeting.
- **figure out** → understand: I can't **figure out** this problem.
- **fill in/out** → complete a form: Please **fill in** this application.

**Inseparable phrasal verbs** (object must go after):
- **look after** → take care of: She **looks after** her parents.
- **come across** → find by chance: I **came across** an old photo.
- **get along with** → have a good relationship: Do you **get along with** your colleagues?
- **run out of** → have no more: We've **run out of** sugar.

**Professional/formal:**
- **carry out** → conduct: The team **carried out** a survey.
- **set up** → establish: He **set up** his own startup.
- **bring up** → raise a topic: She **brought up** a valid concern.`,
      explanationTranslations: { ...T, hi: `**Phrasal verb** = verb + particle। अर्थ बदल जाता है।
**Separable:** pick up, turn down, put off, fill in (बीच में object आ सकता है)
**Inseparable:** look after, come across, get along with (object बाद में)` },
      examples: [
        { english: 'Can you pick me up from the railway station at 6?', translations: { ...T, hi: 'क्या तुम मुझे 6 बजे रेलवे स्टेशन से ले सकते हो?' }, highlight: 'pick me up' },
        { english: 'The startup ran out of funding within two years.', translations: { ...T, hi: 'स्टार्टअप दो साल में फंडिंग खत्म हो गई।' }, highlight: 'ran out of' },
      ],
      tips: [
        { text: '💡 If the object is a pronoun (me, him, it), separable phrasal verbs MUST be split: "pick it up" ✅, "pick up it" ❌', translations: { ...T, hi: '💡 अगर object सर्वनाम है (me, him, it), तो separable phrasal verb ज़रूर split करें: "pick it up" ✅' } },
      ],
    },
    exercises: [
      { id: 'b2-g6-ex1', type: 'multiple-choice', question: 'She _____ the job offer because the salary was too low.', options: ['turned down', 'turned up', 'turned on', 'turned over'], correctAnswer: 'turned down', explanation: '"Turn down" = reject an offer.', explanationTranslations: { ...T, hi: '"Turn down" = प्रस्ताव ठुकराना।' } },
      { id: 'b2-g6-ex2', type: 'fill-blank', question: 'We have _____ of milk. Can you buy some? (run)', correctAnswer: 'run out', explanation: '"Run out of" = have no more of something.', explanationTranslations: { ...T, hi: '"Run out of" = किसी चीज़ का ख़त्म हो जाना।' } },
      { id: 'b2-g6-ex3', type: 'correct-error', question: 'Find the error: "Please pick up it from the table."', correctAnswer: 'Please pick it up from the table.', explanation: 'With pronouns, separable phrasal verbs must split: pick it up.', explanationTranslations: { ...T, hi: 'Pronoun के साथ split करें: pick it up.' } },
      { id: 'b2-g6-ex4', type: 'multiple-choice', question: 'Who _____ the children while you\'re at work?', options: ['looks after', 'looks up', 'looks for', 'looks out'], correctAnswer: 'looks after', explanation: '"Look after" = take care of someone.', explanationTranslations: { ...T, hi: '"Look after" = किसी की देखभाल करना।' } },
      { id: 'b2-g6-ex5', type: 'fill-blank', question: 'The meeting has been _____ until next Monday. (put)', correctAnswer: 'put off', explanation: '"Put off" = postpone.', explanationTranslations: { ...T, hi: '"Put off" = टालना।' } },
      { id: 'b2-g6-ex6', type: 'multiple-choice', question: 'He _____ a very interesting article about Indian startups.', options: ['came across', 'came up', 'came along', 'came over'], correctAnswer: 'came across', explanation: '"Come across" = find something by chance.', explanationTranslations: { ...T, hi: '"Come across" = संयोग से कुछ मिलना।' } },
      { id: 'b2-g6-ex7', type: 'fill-blank', question: 'Please _____ this form with your personal details. (fill)', correctAnswer: 'fill in', explanation: '"Fill in/out" = complete a form.', explanationTranslations: { ...T, hi: '"Fill in/out" = फॉर्म भरना।' } },
      { id: 'b2-g6-ex8', type: 'correct-error', question: 'Find the error: "I get along well my colleagues."', correctAnswer: 'I get along well with my colleagues.', explanation: '"Get along with" — the preposition "with" is required.', explanationTranslations: { ...T, hi: '"Get along with" — "with" ज़रूरी है।' } },
      { id: 'b2-g6-ex9', type: 'multiple-choice', question: 'He _____ his own company after leaving Wipro.', options: ['set up', 'set off', 'set in', 'set out'], correctAnswer: 'set up', explanation: '"Set up" = establish a business or organization.', explanationTranslations: { ...T, hi: '"Set up" = व्यवसाय स्थापित करना।' } },
      { id: 'b2-g6-ex10', type: 'fill-blank', question: 'I couldn\'t _____ what the professor was saying in the lecture. (figure)', correctAnswer: 'figure out', explanation: '"Figure out" = understand or solve.', explanationTranslations: { ...T, hi: '"Figure out" = समझना या हल करना।' } },
      { id: 'b2-g6-ex11', type: 'multiple-choice', question: 'She _____ an important issue during the meeting.', options: ['brought up', 'brought in', 'brought down', 'brought back'], correctAnswer: 'brought up', explanation: '"Bring up" = raise/mention a topic.', explanationTranslations: { ...T, hi: '"Bring up" = विषय उठाना।' } },
      { id: 'b2-g6-ex12', type: 'correct-error', question: 'Find the error: "They carried on a detailed investigation."', correctAnswer: 'They carried out a detailed investigation.', explanation: '"Carry out" = conduct. "Carry on" = continue.', explanationTranslations: { ...T, hi: '"Carry out" = करना/संचालित करना। "Carry on" = जारी रखना।' } },
      { id: 'b2-g6-ex13', type: 'fill-blank', question: 'Don\'t give _____! Keep trying. (give)', correctAnswer: 'up', explanation: '"Give up" = stop trying.', explanationTranslations: { ...T, hi: '"Give up" = हार मानना।' } },
      { id: 'b2-g6-ex14', type: 'multiple-choice', question: 'The flight was _____ due to bad weather.', options: ['called off', 'called on', 'called up', 'called in'], correctAnswer: 'called off', explanation: '"Call off" = cancel.', explanationTranslations: { ...T, hi: '"Call off" = रद्द करना।' } },
    ],
  },

  // ==================== B2: GERUNDS VS INFINITIVES ====================
  {
    id: 'b2-gram-07',
    level: 'B2',
    title: 'Gerunds vs. Infinitives',
    titleTranslations: { ...T, hi: 'Gerund बनाम Infinitive', en: 'Gerunds vs. Infinitives' },
    description: 'Know when to use -ing forms and when to use "to + verb".',
    descriptionTranslations: { ...T, hi: 'जानें कि -ing कब और "to + verb" कब प्रयोग करें।' },
    order: 7,
    content: {
      explanation: `**Gerund (-ing) after these verbs:**
enjoy, avoid, consider, finish, mind, suggest, practise, keep, risk, deny
- I **enjoy cooking** South Indian food.
- She **avoids travelling** during peak hours.

**Infinitive (to + verb) after these verbs:**
want, need, decide, plan, hope, offer, promise, agree, refuse, learn
- He **wants to study** at IIT.
- They **decided to move** to Hyderabad.

**Both (same meaning):** start, begin, continue, like, love, hate, prefer
- I **like swimming** / I **like to swim**. (both OK)

**Both (different meaning!):**
- **remember doing** = recall a past action: I remember **locking** the door.
- **remember to do** = not forget: Remember **to lock** the door.
- **stop doing** = quit: He stopped **smoking**.
- **stop to do** = pause in order to: He stopped **to smoke**. (paused to have a cigarette)
- **try doing** = experiment: Try **adding** more salt.
- **try to do** = attempt: I tried **to open** the jar.`,
      explanationTranslations: { ...T, hi: `**Gerund (-ing):** enjoy, avoid, consider, finish, mind, suggest
**Infinitive (to):** want, need, decide, plan, hope, agree
**दोनों (अलग अर्थ):** remember, stop, try` },
      examples: [
        { english: 'I enjoy watching IPL matches with my family.', translations: { ...T, hi: 'मुझे परिवार के साथ IPL मैच देखना पसंद है।' }, highlight: 'enjoy watching' },
        { english: 'Remember to bring your Aadhaar card to the interview.', translations: { ...T, hi: 'इंटरव्यू में आधार कार्ड लाना मत भूलना।' }, highlight: 'Remember to bring' },
      ],
      tips: [
        { text: '💡 After prepositions, always use the gerund: "interested in learning", "good at cooking", "tired of waiting" — never the infinitive.', translations: { ...T, hi: '💡 Preposition के बाद हमेशा gerund: "interested in learning", "good at cooking".' } },
      ],
    },
    exercises: [
      { id: 'b2-g7-ex1', type: 'multiple-choice', question: 'She enjoys _____ classical music in the evenings.', options: ['listen', 'to listen', 'listening', 'listened'], correctAnswer: 'listening', explanation: '"Enjoy" is always followed by gerund (-ing).', explanationTranslations: { ...T, hi: '"Enjoy" के बाद हमेशा gerund (-ing).' } },
      { id: 'b2-g7-ex2', type: 'fill-blank', question: 'He decided _____ for the UPSC exam. (prepare)', correctAnswer: 'to prepare', explanation: '"Decide" is followed by infinitive (to + verb).', explanationTranslations: { ...T, hi: '"Decide" के बाद infinitive (to + verb).' } },
      { id: 'b2-g7-ex3', type: 'multiple-choice', question: 'I remember _____ the Taj Mahal when I was a child. (past action)', options: ['to visit', 'visiting', 'visit', 'visited'], correctAnswer: 'visiting', explanation: '"Remember doing" = recall a past action.', explanationTranslations: { ...T, hi: '"Remember doing" = भूतकाल की क्रिया याद करना.' } },
      { id: 'b2-g7-ex4', type: 'correct-error', question: 'Find the error: "She avoided to answer the question."', correctAnswer: 'She avoided answering the question.', explanation: '"Avoid" is always followed by gerund.', explanationTranslations: { ...T, hi: '"Avoid" के बाद हमेशा gerund.' } },
      { id: 'b2-g7-ex5', type: 'fill-blank', question: 'He stopped _____ because his doctor advised him to. (smoke)', correctAnswer: 'smoking', explanation: '"Stop doing" = quit the activity permanently.', explanationTranslations: { ...T, hi: '"Stop doing" = स्थायी रूप से छोड़ना.' } },
      { id: 'b2-g7-ex6', type: 'multiple-choice', question: 'I\'m interested _____ more about Indian history.', options: ['to learn', 'learning', 'in learning', 'for learning'], correctAnswer: 'in learning', explanation: '"Interested in" + gerund. Always gerund after prepositions.', explanationTranslations: { ...T, hi: '"Interested in" + gerund. Preposition के बाद gerund.' } },
      { id: 'b2-g7-ex7', type: 'fill-blank', question: 'They suggested _____ the meeting to Friday. (postpone)', correctAnswer: 'postponing', explanation: '"Suggest" is followed by gerund.', explanationTranslations: { ...T, hi: '"Suggest" के बाद gerund.' } },
      { id: 'b2-g7-ex8', type: 'multiple-choice', question: 'Don\'t forget _____ the door when you leave.', options: ['locking', 'to lock', 'lock', 'locked'], correctAnswer: 'to lock', explanation: '"Forget to do" = not remember to do a future action.', explanationTranslations: { ...T, hi: '"Forget to do" = भविष्य की क्रिया भूलना.' } },
      { id: 'b2-g7-ex9', type: 'correct-error', question: 'Find the error: "He is good at to solve problems."', correctAnswer: 'He is good at solving problems.', explanation: 'After preposition "at", use gerund not infinitive.', explanationTranslations: { ...T, hi: 'Preposition "at" के बाद gerund, infinitive नहीं.' } },
      { id: 'b2-g7-ex10', type: 'fill-blank', question: 'She promised _____ us with the project. (help)', correctAnswer: 'to help', explanation: '"Promise" is followed by infinitive.', explanationTranslations: { ...T, hi: '"Promise" के बाद infinitive.' } },
      { id: 'b2-g7-ex11', type: 'multiple-choice', question: 'Try _____ the spices — it might improve the flavour.', options: ['to change', 'changing', 'change', 'changed'], correctAnswer: 'changing', explanation: '"Try doing" = experiment with something.', explanationTranslations: { ...T, hi: '"Try doing" = प्रयोग/परीक्षण करना.' } },
      { id: 'b2-g7-ex12', type: 'correct-error', question: 'Find the error: "I can\'t afford buying a flat in Mumbai."', correctAnswer: 'I can\'t afford to buy a flat in Mumbai.', explanation: '"Afford" is always followed by infinitive.', explanationTranslations: { ...T, hi: '"Afford" के बाद हमेशा infinitive.' } },
      { id: 'b2-g7-ex13', type: 'fill-blank', question: 'Would you mind _____ the window? It\'s very hot. (open)', correctAnswer: 'opening', explanation: '"Mind" is always followed by gerund.', explanationTranslations: { ...T, hi: '"Mind" के बाद हमेशा gerund.' } },
      { id: 'b2-g7-ex14', type: 'multiple-choice', question: 'She needs _____ her visa before travelling abroad.', options: ['renewing', 'to renew', 'renew', 'renewed'], correctAnswer: 'to renew', explanation: '"Need" is followed by infinitive.', explanationTranslations: { ...T, hi: '"Need" के बाद infinitive.' } },
    ],
  },

  // ==================== C1: INVERSION ====================
  {
    id: 'c1-gram-03',
    level: 'C1',
    title: 'Inversion for Emphasis',
    titleTranslations: { ...T, hi: 'ज़ोर देने के लिए उलटा वाक्य क्रम', en: 'Inversion for Emphasis' },
    description: 'Use inverted word order with negative adverbials and formal constructions.',
    descriptionTranslations: { ...T, hi: 'नकारात्मक क्रियाविशेषणों और औपचारिक संरचनाओं के साथ उलटा शब्द क्रम प्रयोग करें।' },
    order: 3,
    content: {
      explanation: `In formal/literary English, placing a negative or restrictive word at the start triggers **subject-auxiliary inversion** (like questions).

**Never / Rarely / Seldom / Hardly:**
- **Never have** I seen such a beautiful sunrise over the Himalayas.
- **Rarely does** he arrive on time.
- **Hardly had** we reached the station **when** the train departed.

**Not only ... but also:**
- **Not only did** she top the exam, **but** she also won a scholarship.

**Only + time/condition:**
- **Only after** the monsoon **did** the farmers start sowing.
- **Only when** she left **did** I realise her importance.

**Little / At no time / Under no circumstances:**
- **Little did** he know that his startup would become a unicorn.
- **Under no circumstances should** you share your OTP.

**So / Such ... that (fronted):**
- **So heavy was** the traffic **that** we missed the flight.`,
      explanationTranslations: { ...T, hi: `नकारात्मक/प्रतिबंधात्मक शब्द शुरू में → subject-auxiliary inversion:
Never have I..., Not only did..., Little did..., Only after... did...` },
      examples: [
        { english: 'Never have I tasted such delicious dal makhani.', translations: { ...T, hi: 'मैंने कभी इतनी स्वादिष्ट दाल मखनी नहीं खाई।' }, highlight: 'Never have I' },
        { english: 'Not only did Sundar Pichai become CEO, but he also transformed the company.', translations: { ...T, hi: 'सुंदर पिचाई न केवल CEO बने, बल्कि उन्होंने कंपनी को बदल भी दिया।' }, highlight: 'Not only did' },
      ],
      tips: [
        { text: '💡 Inversion sounds very formal. In everyday speech, say "I have never seen..." In essays, IELTS writing, or speeches, use "Never have I seen..."', translations: { ...T, hi: '💡 Inversion बहुत formal लगता है। रोज़मर्रा में "I have never seen..." कहें। निबंध/IELTS/भाषण में "Never have I seen..." कहें।' } },
      ],
    },
    exercises: [
      { id: 'c1-g3-ex1', type: 'fill-blank', question: 'Never _____ I seen such a long queue at an Indian railway station.', correctAnswer: 'have', explanation: 'Inversion: Never + auxiliary + subject: Never have I...', explanationTranslations: { ...T, hi: 'Inversion: Never + सहायक + कर्ता: Never have I...' } },
      { id: 'c1-g3-ex2', type: 'multiple-choice', question: 'Not only _____ she pass the exam, but she also got a gold medal.', options: ['does', 'did', 'has', 'was'], correctAnswer: 'did', explanation: 'Not only + did + subject + base verb (past reference).', explanationTranslations: { ...T, hi: 'Not only + did + subject + base verb.' } },
      { id: 'c1-g3-ex3', type: 'correct-error', question: 'Find the error: "Rarely he is late for class."', correctAnswer: 'Rarely is he late for class.', explanation: 'Inversion after "Rarely": Rarely + auxiliary + subject.', explanationTranslations: { ...T, hi: '"Rarely" के बाद inversion: Rarely + auxiliary + subject.' } },
      { id: 'c1-g3-ex4', type: 'fill-blank', question: 'Hardly had we sat down _____ the power went off.', correctAnswer: 'when', explanation: '"Hardly had... when..." is the standard pattern.', explanationTranslations: { ...T, hi: '"Hardly had... when..." मानक pattern है।' } },
      { id: 'c1-g3-ex5', type: 'multiple-choice', question: 'Little _____ they know about the surprise party.', options: ['do', 'did', 'does', 'are'], correctAnswer: 'did', explanation: 'Little + did + subject + base verb for past tense.', explanationTranslations: { ...T, hi: 'Little + did + subject + base verb (भूतकाल).' } },
      { id: 'c1-g3-ex6', type: 'correct-error', question: 'Find the error: "Only after the exam finished we realised it was easy."', correctAnswer: 'Only after the exam finished did we realise it was easy.', explanation: '"Only after" triggers inversion in the main clause.', explanationTranslations: { ...T, hi: '"Only after" के बाद मुख्य उपवाक्य में inversion।' } },
      { id: 'c1-g3-ex7', type: 'fill-blank', question: 'Under no circumstances _____ you share your banking password.', correctAnswer: 'should', explanation: '"Under no circumstances" + should/must + subject + verb.', explanationTranslations: { ...T, hi: '"Under no circumstances" + should/must + subject + verb.' } },
      { id: 'c1-g3-ex8', type: 'multiple-choice', question: 'So impressive _____ the presentation that the investors immediately agreed.', options: ['is', 'was', 'has', 'did'], correctAnswer: 'was', explanation: '"So + adjective + was + subject + that..." fronted for emphasis.', explanationTranslations: { ...T, hi: '"So + विशेषण + was + subject + that..." ज़ोर के लिए।' } },
      { id: 'c1-g3-ex9', type: 'correct-error', question: 'Find the error: "Seldom we see such talent in young cricketers."', correctAnswer: 'Seldom do we see such talent in young cricketers.', explanation: 'Seldom + auxiliary + subject: Seldom do we see...', explanationTranslations: { ...T, hi: 'Seldom + auxiliary + subject: Seldom do we see...' } },
      { id: 'c1-g3-ex10', type: 'fill-blank', question: 'Not until the results were published _____ the students celebrate.', correctAnswer: 'did', explanation: '"Not until" triggers inversion in main clause.', explanationTranslations: { ...T, hi: '"Not until" मुख्य उपवाक्य में inversion ट्रिगर करता है।' } },
      { id: 'c1-g3-ex11', type: 'multiple-choice', question: 'Only when she left India _____ she realise how much she loved it.', options: ['does', 'did', 'has', 'was'], correctAnswer: 'did', explanation: '"Only when" + clause + did + subject + base verb.', explanationTranslations: { ...T, hi: '"Only when" + clause + did + subject + base verb.' } },
      { id: 'c1-g3-ex12', type: 'correct-error', question: 'Find the error: "No sooner the bell rang when the students rushed out."', correctAnswer: 'No sooner had the bell rung than the students rushed out.', explanation: '"No sooner had... than..." is the correct pattern.', explanationTranslations: { ...T, hi: '"No sooner had... than..." सही pattern है।' } },
      { id: 'c1-g3-ex13', type: 'fill-blank', question: 'At no time _____ anyone allowed to use their phone during the exam.', correctAnswer: 'is', explanation: '"At no time" + is/was + subject + allowed/permitted.', explanationTranslations: { ...T, hi: '"At no time" + is/was + subject + allowed.' } },
      { id: 'c1-g3-ex14', type: 'multiple-choice', question: '_____ had she finished her speech when the audience started clapping.', options: ['Hardly', 'Seldom', 'Little', 'Only'], correctAnswer: 'Hardly', explanation: '"Hardly had... when..." = something happened immediately after.', explanationTranslations: { ...T, hi: '"Hardly had... when..." = तुरंत बाद कुछ हुआ।' } },
    ],
  },

  // ==================== C1: CLEFT SENTENCES ====================
  {
    id: 'c1-gram-04',
    level: 'C1',
    title: 'Cleft Sentences for Focus',
    titleTranslations: { ...T, hi: 'फ़ोकस के लिए Cleft वाक्य', en: 'Cleft Sentences for Focus' },
    description: 'Use "It is/was... that" and "What... is" constructions to emphasise parts of a sentence.',
    descriptionTranslations: { ...T, hi: '"It is/was... that" और "What... is" वाक्य रचना से वाक्य के भागों पर ज़ोर दें।' },
    order: 4,
    content: {
      explanation: `**It-cleft:** It + is/was + focused element + that/who + rest
Normal: Ravi broke the window.
Focus on Ravi: **It was Ravi who** broke the window. (not someone else)
Focus on window: **It was the window that** Ravi broke. (not the door)

**What-cleft (pseudo-cleft):** What + subject + verb + is/was + focused element
Normal: I need a holiday.
Cleft: **What I need is** a holiday.

**All-cleft:**
Normal: She wants respect.
Cleft: **All she wants is** respect.

**The thing/person/reason/place cleft:**
- **The reason** I moved to Bangalore **was** the tech opportunities.
- **The person** who helped me most **was** my teacher.

These are very useful in IELTS/formal writing and speeches!`,
      explanationTranslations: { ...T, hi: `**It-cleft:** It was Ravi who broke the window.
**What-cleft:** What I need is a holiday.
**All-cleft:** All she wants is respect.` },
      examples: [
        { english: 'It was the monsoon that caused the flooding in Kerala.', translations: { ...T, hi: 'केरल में बाढ़ की वजह मानसून ही था।' }, highlight: 'It was the monsoon that' },
        { english: 'What India needs most is better infrastructure.', translations: { ...T, hi: 'भारत को सबसे ज़्यादा ज़रूरत बेहतर बुनियादी ढांचे की है।' }, highlight: 'What India needs most is' },
      ],
      tips: [
        { text: '💡 Use cleft sentences in essays when you want to strongly highlight one piece of information: "It is education that can transform rural India" is more impactful than "Education can transform rural India."', translations: { ...T, hi: '💡 निबंध में एक जानकारी पर ज़ोर देने के लिए cleft प्रयोग करें।' } },
      ],
    },
    exercises: [
      { id: 'c1-g4-ex1', type: 'fill-blank', question: 'It was Sachin Tendulkar _____ inspired millions to play cricket.', correctAnswer: 'who', explanation: 'It-cleft with a person → "who".', explanationTranslations: { ...T, hi: 'It-cleft व्यक्ति के साथ → "who".' } },
      { id: 'c1-g4-ex2', type: 'multiple-choice', question: '_____ she really wants is a better work-life balance.', options: ['It', 'What', 'That', 'Which'], correctAnswer: 'What', explanation: 'What-cleft: What + subject + verb + is + focus.', explanationTranslations: { ...T, hi: 'What-cleft: What + subject + verb + is + focus.' } },
      { id: 'c1-g4-ex3', type: 'correct-error', question: 'Find the error: "It was in Mumbai where the conference was held."', correctAnswer: 'It was in Mumbai that the conference was held.', explanation: 'In it-cleft sentences, always use "that", not "where".', explanationTranslations: { ...T, hi: 'It-cleft में हमेशा "that" प्रयोग करें, "where" नहीं।' } },
      { id: 'c1-g4-ex4', type: 'fill-blank', question: 'All he _____ is a chance to prove himself.', correctAnswer: 'wants', explanation: 'All-cleft: All + subject + verb + is + focus.', explanationTranslations: { ...T, hi: 'All-cleft: All + subject + verb + is + focus.' } },
      { id: 'c1-g4-ex5', type: 'multiple-choice', question: 'It _____ the traffic jam that made us late.', options: ['is', 'was', 'has', 'does'], correctAnswer: 'was', explanation: 'Past context → It was... that.', explanationTranslations: { ...T, hi: 'भूतकाल → It was... that.' } },
      { id: 'c1-g4-ex6', type: 'fill-blank', question: 'The reason I study English _____ to get a better job.', correctAnswer: 'is', explanation: 'The reason... is + purpose.', explanationTranslations: { ...T, hi: 'The reason... is + उद्देश्य.' } },
      { id: 'c1-g4-ex7', type: 'correct-error', question: 'Find the error: "What I need are more practice."', correctAnswer: 'What I need is more practice.', explanation: '"What I need" is treated as singular → "is".', explanationTranslations: { ...T, hi: '"What I need" एकवचन माना जाता है → "is".' } },
      { id: 'c1-g4-ex8', type: 'multiple-choice', question: 'It was _____ 2014 that the Digital India programme was launched.', options: ['on', 'in', 'at', 'during'], correctAnswer: 'in', explanation: 'Years use "in": It was in 2014 that...', explanationTranslations: { ...T, hi: 'वर्षों के साथ "in": It was in 2014 that...' } },
      { id: 'c1-g4-ex9', type: 'fill-blank', question: 'What surprised me most _____ his fluency in five languages.', correctAnswer: 'was', explanation: 'What-cleft past context: What... was...', explanationTranslations: { ...T, hi: 'What-cleft भूतकाल: What... was...' } },
      { id: 'c1-g4-ex10', type: 'correct-error', question: 'Find the error: "It was because of rain what the match was cancelled."', correctAnswer: 'It was because of rain that the match was cancelled.', explanation: 'It-cleft always uses "that", not "what".', explanationTranslations: { ...T, hi: 'It-cleft में हमेशा "that", "what" नहीं।' } },
      { id: 'c1-g4-ex11', type: 'multiple-choice', question: 'The thing _____ bothers me most is the noise pollution in Delhi.', options: ['what', 'that', 'which', 'who'], correctAnswer: 'that', explanation: '"The thing that" introduces a cleft-like focus.', explanationTranslations: { ...T, hi: '"The thing that" cleft जैसा focus देता है।' } },
      { id: 'c1-g4-ex12', type: 'fill-blank', question: 'It is hard work, not luck, _____ leads to success.', correctAnswer: 'that', explanation: 'It-cleft contrasting two elements: It is X, not Y, that...', explanationTranslations: { ...T, hi: 'It-cleft दो तत्वों की तुलना: It is X, not Y, that...' } },
      { id: 'c1-g4-ex13', type: 'correct-error', question: 'Find the error: "What the country needs are better leaders."', correctAnswer: 'What the country needs is better leaders.', explanation: '"What... needs" = singular subject → "is".', explanationTranslations: { ...T, hi: '"What... needs" = एकवचन → "is".' } },
      { id: 'c1-g4-ex14', type: 'multiple-choice', question: 'It was Dr. Kalam _____ motivated an entire generation of Indians.', options: ['which', 'what', 'who', 'that'], correctAnswer: 'who', explanation: 'It-cleft with a person → "who" (or "that").', explanationTranslations: { ...T, hi: 'It-cleft व्यक्ति → "who" (या "that").' } },
    ],
  },

  // ==================== C1: ADVANCED MODALS ====================
  {
    id: 'c1-gram-05',
    level: 'C1',
    title: 'Advanced Modal Verbs: Deduction & Speculation',
    titleTranslations: { ...T, hi: 'उन्नत Modal Verbs: निष्कर्ष और अनुमान', en: 'Advanced Modal Verbs: Deduction & Speculation' },
    description: 'Use modals to express certainty, probability, and speculation about present and past events.',
    descriptionTranslations: { ...T, hi: 'वर्तमान और भूतकाल की घटनाओं के बारे में निश्चितता, संभावना, और अनुमान व्यक्त करने के लिए modals प्रयोग करें।' },
    order: 5,
    content: {
      explanation: `**Present deduction:**
- **must** = almost certain: He **must be** at the office. (I'm 95% sure)
- **can't / couldn't** = impossible: She **can't be** sick — I just saw her!
- **may / might / could** = possible: He **might be** stuck in traffic.

**Past deduction:**
- **must have** + pp: She **must have forgotten** the meeting.
- **can't / couldn't have** + pp: He **can't have finished** so quickly!
- **may / might / could have** + pp: They **might have left** already.

**Should have** (expectation/criticism):
- They **should have arrived** by now. (expectation)
- You **should have studied** harder. (criticism)

**Needn't have** vs **didn't need to:**
- I **needn't have bought** a ticket. (I bought one, but it wasn't necessary)
- I **didn't need to buy** a ticket. (I didn't buy one — it wasn't necessary)

**Would have** (hypothetical past):
- I **would have gone** to the concert, but it was sold out.`,
      explanationTranslations: { ...T, hi: `**वर्तमान:** must be (निश्चित), can't be (असंभव), might be (संभव)
**भूतकाल:** must have done, can't have done, might have done
**should have:** अपेक्षा/आलोचना, **needn't have:** अनावश्यक क्रिया` },
      examples: [
        { english: 'She must have taken the wrong turn — this isn\'t the way to Agra.', translations: { ...T, hi: 'उसने ज़रूर ग़लत मोड़ ले लिया — यह आगरा का रास्ता नहीं है।' }, highlight: 'must have taken' },
        { english: 'You should have applied for the visa earlier!', translations: { ...T, hi: 'तुम्हें पहले वीज़ा के लिए आवेदन करना चाहिए था!' }, highlight: 'should have applied' },
      ],
      tips: [
        { text: '💡 "Must" for deduction is NOT the same as "must" for obligation! "You must study" (obligation) vs "He must be tired" (deduction). Context tells you which.', translations: { ...T, hi: '💡 निष्कर्ष वाला "must" कर्तव्य वाले "must" से अलग है! "You must study" (कर्तव्य) vs "He must be tired" (निष्कर्ष).' } },
      ],
    },
    exercises: [
      { id: 'c1-g5-ex1', type: 'multiple-choice', question: 'She _____ be at home — her car is in the driveway.', options: ['must', 'might', 'should', 'would'], correctAnswer: 'must', explanation: 'Strong deduction based on evidence → "must".', explanationTranslations: { ...T, hi: 'प्रमाण पर आधारित मजबूत निष्कर्ष → "must".' } },
      { id: 'c1-g5-ex2', type: 'fill-blank', question: 'He _____ have eaten the last samosa — he was in the kitchen!', correctAnswer: 'must', explanation: 'Past deduction: must have + past participle.', explanationTranslations: { ...T, hi: 'भूतकाल निष्कर्ष: must have + past participle.' } },
      { id: 'c1-g5-ex3', type: 'multiple-choice', question: 'They _____ be Indian — they\'re speaking Japanese.', options: ['must', 'can\'t', 'might', 'should'], correctAnswer: 'can\'t', explanation: '"Can\'t" = impossible based on evidence.', explanationTranslations: { ...T, hi: '"Can\'t" = प्रमाण पर आधारित असंभव।' } },
      { id: 'c1-g5-ex4', type: 'correct-error', question: 'Find the error: "You should have study harder for the exam."', correctAnswer: 'You should have studied harder for the exam.', explanation: 'Should have + past participle: studied, not study.', explanationTranslations: { ...T, hi: 'Should have + past participle: studied.' } },
      { id: 'c1-g5-ex5', type: 'fill-blank', question: 'The lights are off. They _____ have gone to bed already.', correctAnswer: 'might', explanation: '"Might have" = possibility about a past action.', explanationTranslations: { ...T, hi: '"Might have" = भूतकाल क्रिया की संभावना।' } },
      { id: 'c1-g5-ex6', type: 'multiple-choice', question: 'I _____ have bought so much food — half of it went to waste!', options: ['shouldn\'t', 'needn\'t', 'mustn\'t', 'couldn\'t'], correctAnswer: 'needn\'t', explanation: '"Needn\'t have" = did something unnecessary.', explanationTranslations: { ...T, hi: '"Needn\'t have" = कुछ अनावश्यक किया।' } },
      { id: 'c1-g5-ex7', type: 'fill-blank', question: 'He _____ have finished the project so fast — it usually takes weeks!', correctAnswer: 'can\'t', explanation: '"Can\'t have" = past action seems impossible.', explanationTranslations: { ...T, hi: '"Can\'t have" = भूतकाल क्रिया असंभव लगती है।' } },
      { id: 'c1-g5-ex8', type: 'correct-error', question: 'Find the error: "She must has left her phone at the restaurant."', correctAnswer: 'She must have left her phone at the restaurant.', explanation: 'Modal + have (not has) + past participle.', explanationTranslations: { ...T, hi: 'Modal + have (has नहीं) + past participle.' } },
      { id: 'c1-g5-ex9', type: 'multiple-choice', question: 'The traffic is terrible. He _____ be stuck on the highway.', options: ['would', 'could', 'should', 'must'], correctAnswer: 'could', explanation: '"Could" = possibility: it is possible he is stuck.', explanationTranslations: { ...T, hi: '"Could" = संभावना: हो सकता है वह फंसा हो।' } },
      { id: 'c1-g5-ex10', type: 'fill-blank', question: 'You _____ have told me about the meeting! I missed it completely. (should)', correctAnswer: 'should', explanation: '"Should have" expresses criticism about a past action.', explanationTranslations: { ...T, hi: '"Should have" भूतकाल की क्रिया पर आलोचना व्यक्त करता है।' } },
      { id: 'c1-g5-ex11', type: 'correct-error', question: 'Find the error: "He can\'t has been at the party — he was with me."', correctAnswer: 'He can\'t have been at the party — he was with me.', explanation: 'Modal + have (not has): can\'t have been.', explanationTranslations: { ...T, hi: 'Modal + have (has नहीं): can\'t have been.' } },
      { id: 'c1-g5-ex12', type: 'multiple-choice', question: 'I _____ have gone to Goa, but my leave was rejected.', options: ['must', 'could', 'would', 'shall'], correctAnswer: 'would', explanation: '"Would have" = hypothetical past — wanted to but couldn\'t.', explanationTranslations: { ...T, hi: '"Would have" = काल्पनिक भूतकाल — चाहते थे पर नहीं हो पाया।' } },
      { id: 'c1-g5-ex13', type: 'fill-blank', question: 'She didn\'t need _____ bring lunch — the office provides it.', correctAnswer: 'to', explanation: '"Didn\'t need to" = it wasn\'t necessary (she probably didn\'t bring it).', explanationTranslations: { ...T, hi: '"Didn\'t need to" = ज़रूरी नहीं था (शायद नहीं लाई)।' } },
      { id: 'c1-g5-ex14', type: 'multiple-choice', question: 'That restaurant _____ be good — it\'s always packed with people.', options: ['can\'t', 'must', 'shouldn\'t', 'needn\'t'], correctAnswer: 'must', explanation: 'Evidence (always packed) → strong deduction → must.', explanationTranslations: { ...T, hi: 'प्रमाण (हमेशा भरा) → मजबूत निष्कर्ष → must.' } },
    ],
  },

  // ==================== C1: NOMINALISATION ====================
  {
    id: 'c1-gram-06',
    level: 'C1',
    title: 'Nominalisation in Academic Writing',
    titleTranslations: { ...T, hi: 'अकादमिक लेखन में Nominalisation', en: 'Nominalisation in Academic Writing' },
    description: 'Convert verbs and adjectives into nouns to make writing more formal and academic.',
    descriptionTranslations: { ...T, hi: 'लेखन को अधिक औपचारिक बनाने के लिए क्रियाओं और विशेषणों को संज्ञाओं में बदलें।' },
    order: 6,
    content: {
      explanation: `**Nominalisation** = turning a verb/adjective into a noun to make writing more formal.

**Verb → Noun:**
- develop → **development**: The government's **development** of rural areas...
- investigate → **investigation**: An **investigation** was carried out.
- apply → **application**: Please submit your **application**.
- decide → **decision**: The committee's **decision** was final.
- improve → **improvement**: There has been a significant **improvement**.

**Adjective → Noun:**
- important → **importance**: The **importance** of education...
- poor → **poverty**: **Poverty** remains a challenge.
- different → **difference**: The **difference** between the two approaches...

**Why nominalise?**
Informal: "The company grew because they invested in technology."
Formal: "The company's **growth** was driven by **investment** in technology."

Informal: "Students fail because they don't prepare properly."
Formal: "Student **failure** is often due to inadequate **preparation**."`,
      explanationTranslations: { ...T, hi: `**Nominalisation** = verb/adjective → noun (अधिक formal)
develop → development, decide → decision, important → importance
अनौपचारिक: "They grew because they invested."
औपचारिक: "Their growth was driven by investment."` },
      examples: [
        { english: 'The implementation of the new policy led to a reduction in corruption.', translations: { ...T, hi: 'नई नीति के कार्यान्वयन से भ्रष्टाचार में कमी आई।' }, highlight: 'implementation ... reduction' },
        { english: 'The significance of digital literacy cannot be underestimated.', translations: { ...T, hi: 'डिजिटल साक्षरता के महत्व को कम नहीं आंका जा सकता।' }, highlight: 'significance ... literacy' },
      ],
      tips: [
        { text: '💡 Don\'t over-nominalise! Too many abstract nouns make writing hard to read. Mix nominalised and active sentences for the best academic writing.', translations: { ...T, hi: '💡 ज़्यादा nominalise न करें! बहुत सारी अमूर्त संज्ञाएं पढ़ने में कठिन लगती हैं।' } },
      ],
    },
    exercises: [
      { id: 'c1-g6-ex1', type: 'fill-blank', question: 'The _____ of renewable energy is crucial for India\'s future. (develop)', correctAnswer: 'development', explanation: 'develop (verb) → development (noun).', explanationTranslations: { ...T, hi: 'develop (क्रिया) → development (संज्ञा).' } },
      { id: 'c1-g6-ex2', type: 'multiple-choice', question: 'Rewrite formally: "People pollute rivers because they are not aware." → "River pollution is caused by a lack of ___."', options: ['aware', 'awareness', 'being aware', 'awaring'], correctAnswer: 'awareness', explanation: 'aware (adjective) → awareness (noun).', explanationTranslations: { ...T, hi: 'aware (विशेषण) → awareness (संज्ञा).' } },
      { id: 'c1-g6-ex3', type: 'fill-blank', question: 'The _____ between rural and urban schools is significant. (different)', correctAnswer: 'difference', explanation: 'different (adjective) → difference (noun).', explanationTranslations: { ...T, hi: 'different (विशेषण) → difference (संज्ञा).' } },
      { id: 'c1-g6-ex4', type: 'multiple-choice', question: '"The team investigated the incident" → "The team\'s _____ of the incident..."', options: ['investigating', 'investigation', 'investigational', 'investigator'], correctAnswer: 'investigation', explanation: 'investigate (verb) → investigation (noun).', explanationTranslations: { ...T, hi: 'investigate (क्रिया) → investigation (संज्ञा).' } },
      { id: 'c1-g6-ex5', type: 'fill-blank', question: 'The _____ of the exam results caused widespread anxiety. (announce)', correctAnswer: 'announcement', explanation: 'announce (verb) → announcement (noun).', explanationTranslations: { ...T, hi: 'announce (क्रिया) → announcement (संज्ञा).' } },
      { id: 'c1-g6-ex6', type: 'correct-error', question: 'Find the less formal option: "The improvement of healthcare requires significant invest."', correctAnswer: 'The improvement of healthcare requires significant investment.', explanation: '"Invest" is a verb. The noun form is "investment".', explanationTranslations: { ...T, hi: '"Invest" क्रिया है। संज्ञा रूप "investment" है.' } },
      { id: 'c1-g6-ex7', type: 'fill-blank', question: 'The _____ of women in STEM fields has increased over the past decade. (participate)', correctAnswer: 'participation', explanation: 'participate (verb) → participation (noun).', explanationTranslations: { ...T, hi: 'participate (क्रिया) → participation (संज्ञा).' } },
      { id: 'c1-g6-ex8', type: 'multiple-choice', question: '"Students fail" → "Student _____ is a concern."', options: ['fail', 'failure', 'failing', 'failed'], correctAnswer: 'failure', explanation: 'fail (verb) → failure (noun).', explanationTranslations: { ...T, hi: 'fail (क्रिया) → failure (संज्ञा).' } },
      { id: 'c1-g6-ex9', type: 'fill-blank', question: 'The _____ of traditional crafts is important for cultural heritage. (preserve)', correctAnswer: 'preservation', explanation: 'preserve (verb) → preservation (noun).', explanationTranslations: { ...T, hi: 'preserve (क्रिया) → preservation (संज्ञा).' } },
      { id: 'c1-g6-ex10', type: 'multiple-choice', question: '"Prices rose sharply" → "There was a sharp _____ in prices."', options: ['rose', 'rise', 'rising', 'risen'], correctAnswer: 'rise', explanation: 'rose/rise (verb) → rise (noun).', explanationTranslations: { ...T, hi: 'rose/rise (क्रिया) → rise (संज्ञा).' } },
      { id: 'c1-g6-ex11', type: 'fill-blank', question: 'The _____ of the candidate was based on merit. (select)', correctAnswer: 'selection', explanation: 'select (verb) → selection (noun).', explanationTranslations: { ...T, hi: 'select (क्रिया) → selection (संज्ञा).' } },
      { id: 'c1-g6-ex12', type: 'correct-error', question: 'Find the error: "The important of education cannot be denied."', correctAnswer: 'The importance of education cannot be denied.', explanation: '"Important" is an adjective. Use the noun form "importance".', explanationTranslations: { ...T, hi: '"Important" विशेषण है। संज्ञा रूप "importance" प्रयोग करें.' } },
      { id: 'c1-g6-ex13', type: 'fill-blank', question: 'Rapid _____ has transformed Indian cities. (urban - noun form for the process)', correctAnswer: 'urbanisation', explanation: 'urban (adjective) → urbanisation (noun for the process).', explanationTranslations: { ...T, hi: 'urban (विशेषण) → urbanisation (प्रक्रिया की संज्ञा).' } },
      { id: 'c1-g6-ex14', type: 'multiple-choice', question: '"The manager decided to expand" → "The manager\'s _____ to expand..."', options: ['decide', 'decision', 'deciding', 'decided'], correctAnswer: 'decision', explanation: 'decide (verb) → decision (noun).', explanationTranslations: { ...T, hi: 'decide (क्रिया) → decision (संज्ञा).' } },
    ],
  },

  // ==================== C2: SUBJUNCTIVE MOOD ====================
  {
    id: 'c2-gram-01',
    level: 'C2',
    title: 'The Subjunctive Mood',
    titleTranslations: { ...T, hi: 'Subjunctive Mood (काल्पनिक भाव)', en: 'The Subjunctive Mood' },
    description: 'Use the subjunctive in formal demands, suggestions, and hypothetical expressions.',
    descriptionTranslations: { ...T, hi: 'औपचारिक मांगों, सुझावों और काल्पनिक अभिव्यक्तियों में subjunctive प्रयोग करें।' },
    order: 1,
    content: {
      explanation: `The **subjunctive** uses the **base form** of the verb (no -s, no -ed) after certain expressions.

**After verbs of demand/suggestion/recommendation:**
insist, suggest, recommend, demand, request, propose, require
- The committee **insisted** that he **attend** the meeting. (not "attends")
- She **suggested** that the policy **be revised**. (not "is revised")

**After adjectives: essential, vital, important, necessary, crucial**
- It is **essential** that every student **submit** the form. (not "submits")
- It is **important** that he **be** on time. (not "is")

**Fixed expressions:**
- **If need be** = if necessary
- **Be that as it may** = despite that
- **Come what may** = no matter what happens
- **Far be it from me** to criticise, but...
- **God forbid** / **Heaven forbid**
- **Suffice it to say** = it is enough to say

**Were-subjunctive (formal "if"):**
- If I **were** the Prime Minister... (not "was" in formal English)
- **Were** he to resign, the party would collapse.`,
      explanationTranslations: { ...T, hi: `**Subjunctive:** क्रिया का base form — insist/suggest/recommend that he attend (attends नहीं)।
essential/important that he be (is नहीं)।
Were he to resign... (If he were to resign...)` },
      examples: [
        { english: 'The principal insisted that every student wear the uniform.', translations: { ...T, hi: 'प्रधानाचार्य ने ज़ोर दिया कि हर छात्र वर्दी पहने।' }, highlight: 'insisted that ... wear' },
        { english: 'It is crucial that India invest more in renewable energy.', translations: { ...T, hi: 'यह महत्वपूर्ण है कि भारत नवीकरणीय ऊर्जा में और निवेश करे।' }, highlight: 'crucial that India invest' },
      ],
      tips: [
        { text: '💡 The subjunctive is more common in American English. British English often uses "should": "She suggested that he should attend." Both are correct at C2 level.', translations: { ...T, hi: '💡 Subjunctive अमेरिकी अंग्रेज़ी में ज़्यादा आम है। ब्रिटिश में "should" प्रयोग: "She suggested that he should attend."' } },
      ],
    },
    exercises: [
      { id: 'c2-g1-ex1', type: 'multiple-choice', question: 'The doctor recommended that she _____ more rest.', options: ['takes', 'take', 'took', 'taking'], correctAnswer: 'take', explanation: 'Subjunctive after "recommended": base form "take" (not "takes").', explanationTranslations: { ...T, hi: '"Recommended" के बाद subjunctive: base form "take".' } },
      { id: 'c2-g1-ex2', type: 'fill-blank', question: 'It is essential that every citizen _____ their vote. (cast)', correctAnswer: 'cast', explanation: 'Subjunctive after "essential that": base form "cast".', explanationTranslations: { ...T, hi: '"Essential that" के बाद subjunctive: base form "cast".' } },
      { id: 'c2-g1-ex3', type: 'correct-error', question: 'Find the error: "She insisted that he attends the ceremony."', correctAnswer: 'She insisted that he attend the ceremony.', explanation: 'Subjunctive: "attend" (base form), not "attends".', explanationTranslations: { ...T, hi: 'Subjunctive: "attend" (base form), "attends" नहीं।' } },
      { id: 'c2-g1-ex4', type: 'multiple-choice', question: '_____ he to apply for the position, he would certainly be shortlisted.', options: ['If', 'Were', 'Should', 'Had'], correctAnswer: 'Were', explanation: 'Were-subjunctive: Were he to apply = If he were to apply.', explanationTranslations: { ...T, hi: 'Were-subjunctive: Were he to apply = If he were to apply.' } },
      { id: 'c2-g1-ex5', type: 'fill-blank', question: 'It is vital that the government _____ action on pollution immediately. (take)', correctAnswer: 'take', explanation: '"Vital that" → subjunctive: base form "take".', explanationTranslations: { ...T, hi: '"Vital that" → subjunctive: base form "take".' } },
      { id: 'c2-g1-ex6', type: 'multiple-choice', question: 'The board demanded that the CEO _____ immediately.', options: ['resigns', 'resign', 'resigned', 'resigning'], correctAnswer: 'resign', explanation: '"Demanded that" → subjunctive: base form "resign".', explanationTranslations: { ...T, hi: '"Demanded that" → subjunctive: base form "resign".' } },
      { id: 'c2-g1-ex7', type: 'correct-error', question: 'Find the error: "Be that as it might, we must proceed."', correctAnswer: 'Be that as it may, we must proceed.', explanation: '"Be that as it may" is a fixed subjunctive expression.', explanationTranslations: { ...T, hi: '"Be that as it may" एक fixed subjunctive expression है।' } },
      { id: 'c2-g1-ex8', type: 'fill-blank', question: 'The judge ordered that the prisoner _____ released on bail. (be)', correctAnswer: 'be', explanation: 'Subjunctive passive: that he be released (not "is released").', explanationTranslations: { ...T, hi: 'Subjunctive passive: that he be released ("is released" नहीं).' } },
      { id: 'c2-g1-ex9', type: 'multiple-choice', question: 'Come _____ may, we will complete this project.', options: ['who', 'that', 'what', 'which'], correctAnswer: 'what', explanation: '"Come what may" = no matter what happens.', explanationTranslations: { ...T, hi: '"Come what may" = चाहे कुछ भी हो।' } },
      { id: 'c2-g1-ex10', type: 'fill-blank', question: 'Far _____ it from me to question your judgement.', correctAnswer: 'be', explanation: '"Far be it from me" = fixed subjunctive expression.', explanationTranslations: { ...T, hi: '"Far be it from me" = fixed subjunctive expression.' } },
      { id: 'c2-g1-ex11', type: 'correct-error', question: 'Find the error: "The policy requires that each employee has an ID card."', correctAnswer: 'The policy requires that each employee have an ID card.', explanation: '"Requires that" → subjunctive: "have" (not "has").', explanationTranslations: { ...T, hi: '"Requires that" → subjunctive: "have" ("has" नहीं).' } },
      { id: 'c2-g1-ex12', type: 'multiple-choice', question: 'She proposed that the meeting _____ rescheduled to Monday.', options: ['is', 'be', 'was', 'been'], correctAnswer: 'be', explanation: '"Proposed that" → subjunctive: "be" (not "is/was").', explanationTranslations: { ...T, hi: '"Proposed that" → subjunctive: "be".' } },
      { id: 'c2-g1-ex13', type: 'fill-blank', question: '_____ it to say, the results were disappointing. (suffice)', correctAnswer: 'Suffice', explanation: '"Suffice it to say" = fixed subjunctive expression.', explanationTranslations: { ...T, hi: '"Suffice it to say" = fixed subjunctive expression.' } },
      { id: 'c2-g1-ex14', type: 'correct-error', question: 'Find the error: "If I was the CEO, I would change the policy."', correctAnswer: 'If I were the CEO, I would change the policy.', explanation: 'Were-subjunctive in formal conditional: "If I were" (not "was").', explanationTranslations: { ...T, hi: 'औपचारिक शर्त में were-subjunctive: "If I were" ("was" नहीं).' } },
    ],
  },

  // ==================== C2: DISCOURSE MARKERS ====================
  {
    id: 'c2-gram-02',
    level: 'C2',
    title: 'Advanced Discourse Markers & Connectors',
    titleTranslations: { ...T, hi: 'उन्नत वार्ता चिह्नक और संयोजक', en: 'Advanced Discourse Markers & Connectors' },
    description: 'Use sophisticated linking words to structure arguments in academic and professional writing.',
    descriptionTranslations: { ...T, hi: 'अकादमिक और पेशेवर लेखन में तर्कों को व्यवस्थित करने के लिए परिष्कृत लिंकिंग शब्द प्रयोग करें।' },
    order: 2,
    content: {
      explanation: `**Concession (admitting the opposing view):**
- **Admittedly / Granted / Arguably**, the plan has some flaws.
- **Notwithstanding** the risks, the investment seems sound.
- **Albeit** (= although) slow, progress is being made.
- **Whilst** acknowledging the challenges...

**Adding emphasis/reinforcement:**
- **Indeed / In fact / As a matter of fact**
- **Furthermore / Moreover / What is more**
- **Not to mention** the cost implications.

**Cause & consequence:**
- **Owing to / On account of** heavy rainfall...
- **Thereby** reducing costs by 30%.
- **Hence / Thus / Consequently / Accordingly**

**Contrast & comparison:**
- **Conversely / On the contrary** — opposite view
- **By contrast / In contrast to**
- **Whereas / While** the first study found X, the second found Y.
- **Having said that / That said** — partial retraction

**Generalising / Specifying:**
- **By and large / On the whole / For the most part**
- **In particular / Specifically / Namely**
- **That is to say / In other words**`,
      explanationTranslations: { ...T, hi: `**Concession:** Admittedly, Notwithstanding, Albeit
**Emphasis:** Indeed, Furthermore, Not to mention
**Cause:** Owing to, Thereby, Hence, Consequently
**Contrast:** Conversely, Whereas, That said` },
      examples: [
        { english: 'Notwithstanding the economic downturn, India\'s tech sector continued to grow.', translations: { ...T, hi: 'आर्थिक मंदी के बावजूद, भारत का तकनीकी क्षेत्र बढ़ता रहा।' }, highlight: 'Notwithstanding' },
        { english: 'The reforms were, albeit overdue, a step in the right direction.', translations: { ...T, hi: 'सुधार, हालांकि देर से, सही दिशा में एक कदम थे।' }, highlight: 'albeit' },
      ],
      tips: [
        { text: '💡 Don\'t overuse fancy connectors! One or two per paragraph is enough. Too many makes writing feel forced and unnatural.', translations: { ...T, hi: '💡 अत्यधिक fancy connectors प्रयोग न करें! प्रति अनुच्छेद एक-दो पर्याप्त हैं।' } },
      ],
    },
    exercises: [
      { id: 'c2-g2-ex1', type: 'multiple-choice', question: '_____ the initial setbacks, the ISRO mission was ultimately successful.', options: ['Despite', 'Notwithstanding', 'Although', 'Even'], correctAnswer: 'Notwithstanding', explanation: '"Notwithstanding" = despite (formal). All options could work, but "notwithstanding" is C2 level.', explanationTranslations: { ...T, hi: '"Notwithstanding" = formal "despite".' } },
      { id: 'c2-g2-ex2', type: 'fill-blank', question: 'The project was successful, _____ slow, in achieving its goals. (= although)', correctAnswer: 'albeit', explanation: '"Albeit" = although (very formal, C2 level).', explanationTranslations: { ...T, hi: '"Albeit" = although (बहुत formal, C2).' } },
      { id: 'c2-g2-ex3', type: 'multiple-choice', question: '_____ to the flooding, several trains were cancelled.', options: ['Because', 'Owing', 'Since', 'Due'], correctAnswer: 'Owing', explanation: '"Owing to" = because of (formal). Note: "Due to" would also work.', explanationTranslations: { ...T, hi: '"Owing to" = formal "because of".' } },
      { id: 'c2-g2-ex4', type: 'correct-error', question: 'Find the error: "He performed well. On the contrary, he received a promotion."', correctAnswer: 'He performed well. Consequently, he received a promotion.', explanation: '"On the contrary" introduces an opposite idea, not a result. Use "Consequently".', explanationTranslations: { ...T, hi: '"On the contrary" विपरीत बात के लिए है। परिणाम के लिए "Consequently" प्रयोग करें।' } },
      { id: 'c2-g2-ex5', type: 'fill-blank', question: 'By and _____, the reforms have been positive for the economy.', correctAnswer: 'large', explanation: '"By and large" = generally, on the whole.', explanationTranslations: { ...T, hi: '"By and large" = सामान्यतः।' } },
      { id: 'c2-g2-ex6', type: 'multiple-choice', question: 'The first quarter was weak. _____, the second quarter showed recovery.', options: ['Moreover', 'That said', 'Furthermore', 'Indeed'], correctAnswer: 'That said', explanation: '"That said" = partial retraction, introducing a contrasting point.', explanationTranslations: { ...T, hi: '"That said" = आंशिक वापसी, विरोधी बात का परिचय।' } },
      { id: 'c2-g2-ex7', type: 'fill-blank', question: 'The government increased taxes, _____ reducing the fiscal deficit. (= and in doing so)', correctAnswer: 'thereby', explanation: '"Thereby" = by doing that / as a result of that action.', explanationTranslations: { ...T, hi: '"Thereby" = ऐसा करके / उस क्रिया के परिणामस्वरूप।' } },
      { id: 'c2-g2-ex8', type: 'correct-error', question: 'Find the error: "Granted the evidence is strong. However, the jury must decide."', correctAnswer: 'Granted, the evidence is strong. However, the jury must decide.', explanation: '"Granted" as a discourse marker needs a comma after it.', explanationTranslations: { ...T, hi: '"Granted" discourse marker के रूप में comma चाहिए।' } },
      { id: 'c2-g2-ex9', type: 'multiple-choice', question: 'Rural areas lack infrastructure; _____, they have lower literacy rates.', options: ['conversely', 'moreover', 'albeit', 'notwithstanding'], correctAnswer: 'moreover', explanation: '"Moreover" adds a supporting point to the same argument.', explanationTranslations: { ...T, hi: '"Moreover" उसी तर्क में सहायक बात जोड़ता है।' } },
      { id: 'c2-g2-ex10', type: 'fill-blank', question: 'Three states — _____, Karnataka, Tamil Nadu, and Maharashtra — lead in IT exports.', correctAnswer: 'namely', explanation: '"Namely" introduces specific examples.', explanationTranslations: { ...T, hi: '"Namely" विशिष्ट उदाहरण प्रस्तुत करता है।' } },
      { id: 'c2-g2-ex11', type: 'multiple-choice', question: '_____ the first study showed positive results, the second study found no significant effect.', options: ['Although', 'Whereas', 'Despite', 'Notwithstanding'], correctAnswer: 'Whereas', explanation: '"Whereas" directly contrasts two parallel findings.', explanationTranslations: { ...T, hi: '"Whereas" दो समानांतर निष्कर्षों की सीधे तुलना करता है।' } },
      { id: 'c2-g2-ex12', type: 'fill-blank', question: 'India is, for the most _____, a multilingual society.', correctAnswer: 'part', explanation: '"For the most part" = mostly, generally.', explanationTranslations: { ...T, hi: '"For the most part" = अधिकतर, सामान्यतः।' } },
      { id: 'c2-g2-ex13', type: 'correct-error', question: 'Find the error: "She is highly qualified. Not to mention, she has ten years of experience."', correctAnswer: 'She is highly qualified, not to mention she has ten years of experience.', explanation: '"Not to mention" flows within the same sentence, not as a separate sentence.', explanationTranslations: { ...T, hi: '"Not to mention" उसी वाक्य में चलता है, अलग वाक्य में नहीं।' } },
      { id: 'c2-g2-ex14', type: 'multiple-choice', question: '_____, I believe the policy will benefit the majority.', options: ['On the whole', 'On the contrary', 'In contrast', 'Conversely'], correctAnswer: 'On the whole', explanation: '"On the whole" = considering everything, generally.', explanationTranslations: { ...T, hi: '"On the whole" = कुल मिलाकर, सामान्यतः।' } },
    ],
  },

  // ==================== C2: ELLIPSIS & SUBSTITUTION ====================
  {
    id: 'c2-gram-03',
    level: 'C2',
    title: 'Ellipsis, Substitution & Fronting',
    titleTranslations: { ...T, hi: 'लोप, प्रतिस्थापन और Fronting', en: 'Ellipsis, Substitution & Fronting' },
    description: 'Master advanced techniques for avoiding repetition and adding emphasis in speech and writing.',
    descriptionTranslations: { ...T, hi: 'बोलने और लिखने में दोहराव से बचने और ज़ोर देने की उन्नत तकनीकें सीखें।' },
    order: 3,
    content: {
      explanation: `**Ellipsis** = leaving out words that are understood:
- "Are you coming?" "I might (come)." — verb omitted
- She wanted to complain but didn't (complain).
- "Which train?" "(It's) The one to Mumbai."

**Substitution** = replacing words to avoid repetition:
- **do/does/did:** "She sings better than he **does**."
- **so/not:** "Will it rain?" "I think **so**." / "I hope **not**."
- **one/ones:** "I like the red **one**, not the blue **one**."

**Fronting** = moving elements to the front for emphasis:
- **Object fronting:** "This book **I have read** three times." (normal: I have read this book)
- **Complement fronting:** "Brilliant **was** the performance." (literary)
- **Adverbial fronting:** "Into the room **walked** the headmaster."
- **Negative fronting** (with inversion): "Never again **would** she trust him."

**So/Neither inversion:**
- "I love biryani." "**So do** I."
- "She hasn't been to Goa." "**Neither have** I."`,
      explanationTranslations: { ...T, hi: `**Ellipsis:** समझे गए शब्द छोड़ना: "I might (come)."
**Substitution:** do/so/not/one: "I think so."
**Fronting:** ज़ोर के लिए शुरू में ले जाना: "This book I have read three times."
**So/Neither:** "So do I." / "Neither have I."` },
      examples: [
        { english: '"Do you think they\'ll win the World Cup?" "I certainly hope so."', translations: { ...T, hi: '"क्या तुम्हें लगता है वे विश्व कप जीतेंगे?" "मुझे तो ज़रूर ऐसी उम्मीद है।"' }, highlight: 'hope so' },
        { english: 'Delicious though the street food was, I couldn\'t eat more.', translations: { ...T, hi: 'हालांकि स्ट्रीट फ़ूड स्वादिष्ट था, मैं और नहीं खा सका।' }, highlight: 'Delicious though ... was' },
      ],
      tips: [
        { text: '💡 "I think so / I hope so / I\'m afraid so" — "so" substitutes for a whole clause. But with "not": "I hope not" (NOT "I hope so not").', translations: { ...T, hi: '💡 "I think so / I hope so" — "so" पूरे clause की जगह लेता है। "not" के साथ: "I hope not".' } },
      ],
    },
    exercises: [
      { id: 'c2-g3-ex1', type: 'fill-blank', question: '"Will it rain tomorrow?" "I hope _____."', correctAnswer: 'not', explanation: '"I hope not" = I hope it won\'t rain. (substitution with "not")', explanationTranslations: { ...T, hi: '"I hope not" = मुझे आशा है बारिश नहीं होगी।' } },
      { id: 'c2-g3-ex2', type: 'multiple-choice', question: '"I love South Indian food." "_____ do I!"', options: ['So', 'Neither', 'Nor', 'Too'], correctAnswer: 'So', explanation: '"So do I" = I also love it. (positive agreement)', explanationTranslations: { ...T, hi: '"So do I" = मुझे भी पसंद है। (सकारात्मक सहमति)' } },
      { id: 'c2-g3-ex3', type: 'correct-error', question: 'Find the error: "She can speak Hindi and her brother can speak Hindi too."', correctAnswer: 'She can speak Hindi and so can her brother.', explanation: 'Avoid repetition using "so can": substitution + inversion.', explanationTranslations: { ...T, hi: '"So can" से दोहराव से बचें: substitution + inversion.' } },
      { id: 'c2-g3-ex4', type: 'fill-blank', question: '"I haven\'t visited the Taj Mahal." "Neither _____ I."', correctAnswer: 'have', explanation: '"Neither have I" = I also haven\'t visited. (negative agreement)', explanationTranslations: { ...T, hi: '"Neither have I" = मैंने भी नहीं देखा। (नकारात्मक सहमति)' } },
      { id: 'c2-g3-ex5', type: 'multiple-choice', question: '"Is she coming to the party?" "I believe _____."', options: ['it', 'that', 'so', 'yes'], correctAnswer: 'so', explanation: '"I believe so" = I believe she is coming. Substitution of the whole clause.', explanationTranslations: { ...T, hi: '"I believe so" = मुझे लगता है वह आ रही है।' } },
      { id: 'c2-g3-ex6', type: 'fill-blank', question: 'She plays tabla better than he _____. (substitution)', correctAnswer: 'does', explanation: '"Does" substitutes for "plays tabla": She plays better than he does.', explanationTranslations: { ...T, hi: '"Does" "plays tabla" की जगह लेता है।' } },
      { id: 'c2-g3-ex7', type: 'correct-error', question: 'Find the error: "I don\'t like the blue shirt. I prefer the red shirt."', correctAnswer: 'I don\'t like the blue shirt. I prefer the red one.', explanation: 'Use "one" to substitute for the repeated noun "shirt".', explanationTranslations: { ...T, hi: 'दोहराव से बचने के लिए "one" प्रयोग करें।' } },
      { id: 'c2-g3-ex8', type: 'multiple-choice', question: 'Strange _____ it may seem, he quit a high-paying job to become a farmer.', options: ['as', 'though', 'although', 'even'], correctAnswer: 'though', explanation: '"Adj + though + subject + verb" = fronted concessive clause.', explanationTranslations: { ...T, hi: '"Adj + though + subject + verb" = fronted concessive clause.' } },
      { id: 'c2-g3-ex9', type: 'fill-blank', question: '"He didn\'t pass the exam." "_____ did his sister."', correctAnswer: 'Neither', explanation: '"Neither did" for negative agreement.', explanationTranslations: { ...T, hi: 'नकारात्मक सहमति के लिए "Neither did".' } },
      { id: 'c2-g3-ex10', type: 'correct-error', question: 'Find the error: "I wanted to help but I couldn\'t help."', correctAnswer: 'I wanted to help but couldn\'t.', explanation: 'Ellipsis: omit the repeated verb "help".', explanationTranslations: { ...T, hi: 'Ellipsis: दोहराई गई क्रिया "help" हटाएं।' } },
      { id: 'c2-g3-ex11', type: 'multiple-choice', question: '"Are you going to Hyderabad?" "I might _____."', options: ['go', 'do', 'be', '(nothing)'], correctAnswer: '(nothing)', explanation: 'Ellipsis: "I might" is enough — "go" is understood.', explanationTranslations: { ...T, hi: 'Ellipsis: "I might" काफ़ी है — "go" समझ आ जाता है।' } },
      { id: 'c2-g3-ex12', type: 'fill-blank', question: 'This point the professor made very clearly. (What is fronted here?)', correctAnswer: 'object', explanation: '"This point" (object) is fronted for emphasis.', explanationTranslations: { ...T, hi: '"This point" (कर्म/object) ज़ोर के लिए शुरू में रखा गया है।' } },
      { id: 'c2-g3-ex13', type: 'multiple-choice', question: '"She doesn\'t like horror movies." "I don\'t _____."', options: ['too', 'either', 'neither', 'also'], correctAnswer: 'either', explanation: '"I don\'t either" = I also don\'t like them.', explanationTranslations: { ...T, hi: '"I don\'t either" = मुझे भी पसंद नहीं।' } },
      { id: 'c2-g3-ex14', type: 'fill-blank', question: '"Do you think India will win?" "I certainly think _____."', correctAnswer: 'so', explanation: '"Think so" = think that India will win. Substitution.', explanationTranslations: { ...T, hi: '"Think so" = सोचता हूं कि भारत जीतेगा।' } },
    ],
  },

  // ==================== C2: ADVANCED CONDITIONALS ====================
  {
    id: 'c2-gram-04',
    level: 'C2',
    title: 'Advanced & Formal Conditionals',
    titleTranslations: { ...T, hi: 'उन्नत और औपचारिक Conditionals', en: 'Advanced & Formal Conditionals' },
    description: 'Master formal conditional inversions, implied conditionals, and nuanced structures.',
    descriptionTranslations: { ...T, hi: 'औपचारिक conditional inversions, implied conditionals और सूक्ष्म संरचनाएं सीखें।' },
    order: 4,
    content: {
      explanation: `**Formal inverted conditionals** (no "if"):
- **Had** I known → If I had known
  Had I known about the delay, I would have taken another flight.
- **Were** she to accept → If she were to accept
  Were she to accept the offer, she would move to Bangalore.
- **Should** you need → If you need
  Should you need assistance, please contact reception.

**Implied conditionals** (no "if" clause at all):
- **Otherwise / Or else:** Study hard; **otherwise**, you'll fail.
- **But for:** **But for** his help, I wouldn't have passed. (= If not for)
- **With / Without:** **Without** technology, modern banking would collapse.
- **Supposing / Assuming:** **Supposing** you won the lottery, what would you do?

**Provided / As long as / On condition that:**
- You can borrow my car **provided that** you return it by evening.
- I'll help you **as long as** you help me too.

**Even if vs. Even though:**
- **Even if** it rains, we'll go. (hypothetical — might rain)
- **Even though** it's raining, we're going. (factual — it IS raining)`,
      explanationTranslations: { ...T, hi: `**Inverted:** Had I known..., Were she to..., Should you need...
**Implied:** But for, Otherwise, Without
**Conditions:** Provided that, As long as, On condition that
**Even if** (काल्पनिक) vs **Even though** (वास्तविक)` },
      examples: [
        { english: 'Had the monsoon arrived on time, the crops would not have failed.', translations: { ...T, hi: 'अगर मानसून समय पर आया होता, तो फसलें नहीं बर्बाद होतीं।' }, highlight: 'Had the monsoon arrived' },
        { english: 'But for the scholarship, she could never have studied at IIT.', translations: { ...T, hi: 'छात्रवृत्ति के बिना, वह कभी IIT में नहीं पढ़ पाती।' }, highlight: 'But for' },
      ],
      tips: [
        { text: '💡 Inverted conditionals sound very formal. Use them in essays, business emails, and speeches — not in casual conversation.', translations: { ...T, hi: '💡 Inverted conditionals बहुत formal लगते हैं। निबंध, व्यावसायिक ईमेल, भाषणों में प्रयोग करें।' } },
      ],
    },
    exercises: [
      { id: 'c2-g4-ex1', type: 'multiple-choice', question: '_____ I known about the traffic, I would have left earlier.', options: ['If', 'Had', 'Should', 'Were'], correctAnswer: 'Had', explanation: '"Had I known" = formal inversion of "If I had known".', explanationTranslations: { ...T, hi: '"Had I known" = "If I had known" का औपचारिक inversion.' } },
      { id: 'c2-g4-ex2', type: 'fill-blank', question: '_____ you require any assistance, please do not hesitate to contact us.', correctAnswer: 'Should', explanation: '"Should you require" = formal for "If you require".', explanationTranslations: { ...T, hi: '"Should you require" = "If you require" का formal रूप.' } },
      { id: 'c2-g4-ex3', type: 'correct-error', question: 'Find the error: "But for his advice, I would fail the interview."', correctAnswer: 'But for his advice, I would have failed the interview.', explanation: '"But for" + past context needs "would have" + past participle.', explanationTranslations: { ...T, hi: '"But for" + भूतकाल → "would have" + past participle.' } },
      { id: 'c2-g4-ex4', type: 'multiple-choice', question: '_____ she to resign, the entire team would fall apart.', options: ['If', 'Had', 'Were', 'Should'], correctAnswer: 'Were', explanation: '"Were she to resign" = formal for "If she were to resign".', explanationTranslations: { ...T, hi: '"Were she to resign" = "If she were to resign" का formal रूप.' } },
      { id: 'c2-g4-ex5', type: 'fill-blank', question: 'You can use my laptop _____ that you handle it carefully. (condition)', correctAnswer: 'provided', explanation: '"Provided that" = on the condition that.', explanationTranslations: { ...T, hi: '"Provided that" = इस शर्त पर कि.' } },
      { id: 'c2-g4-ex6', type: 'multiple-choice', question: '_____ technology, modern India would be very different.', options: ['Unless', 'Without', 'Except', 'Besides'], correctAnswer: 'Without', explanation: '"Without" creates an implied conditional: Without X, Y would be...', explanationTranslations: { ...T, hi: '"Without" implied conditional बनाता है।' } },
      { id: 'c2-g4-ex7', type: 'correct-error', question: 'Find the error: "Even if it is raining right now, we decided to go."', correctAnswer: 'Even though it is raining right now, we decided to go.', explanation: '"Even though" for factual situations. "Even if" for hypothetical.', explanationTranslations: { ...T, hi: 'वास्तविक → "Even though"। काल्पनिक → "Even if".' } },
      { id: 'c2-g4-ex8', type: 'fill-blank', question: '_____ you had mentioned it earlier, we could have planned better. (formal "if")', correctAnswer: 'Had', explanation: 'Formal inverted conditional: Had you mentioned = If you had mentioned.', explanationTranslations: { ...T, hi: 'Formal inverted: Had you mentioned = If you had mentioned.' } },
      { id: 'c2-g4-ex9', type: 'multiple-choice', question: 'Finish the report by Friday; _____, your appraisal will be affected.', options: ['moreover', 'otherwise', 'thereby', 'albeit'], correctAnswer: 'otherwise', explanation: '"Otherwise" = if you don\'t. Implied negative condition.', explanationTranslations: { ...T, hi: '"Otherwise" = अगर ऐसा नहीं किया। Implied negative condition.' } },
      { id: 'c2-g4-ex10', type: 'fill-blank', question: '_____ you won a crore in the lottery, what would you do?', correctAnswer: 'Supposing', explanation: '"Supposing" = what if / imagine that.', explanationTranslations: { ...T, hi: '"Supposing" = मान लो / कल्पना करो।' } },
      { id: 'c2-g4-ex11', type: 'correct-error', question: 'Find the error: "As long as you will study hard, you will pass."', correctAnswer: 'As long as you study hard, you will pass.', explanation: 'After "as long as", use present simple (not "will") for conditions.', explanationTranslations: { ...T, hi: '"As long as" के बाद present simple, "will" नहीं.' } },
      { id: 'c2-g4-ex12', type: 'multiple-choice', question: '_____ for the quick action of the firefighters, the building would have burned down.', options: ['If not', 'But', 'Without', 'Unless'], correctAnswer: 'But', explanation: '"But for" = if it hadn\'t been for.', explanationTranslations: { ...T, hi: '"But for" = अगर नहीं होता।' } },
      { id: 'c2-g4-ex13', type: 'fill-blank', question: 'She agreed to help on _____ that we give her credit on the paper.', correctAnswer: 'condition', explanation: '"On condition that" = provided that.', explanationTranslations: { ...T, hi: '"On condition that" = इस शर्त पर कि.' } },
      { id: 'c2-g4-ex14', type: 'correct-error', question: 'Find the error: "Should you would need more information, contact the helpdesk."', correctAnswer: 'Should you need more information, contact the helpdesk.', explanation: '"Should you need" — no "would" after "should" in inverted conditionals.', explanationTranslations: { ...T, hi: '"Should you need" — inverted conditionals में "would" नहीं।' } },
    ],
  },

  // ==================== C2: ADVANCED TENSE REVIEW ====================
  {
    id: 'c2-gram-05',
    level: 'C2',
    title: 'Nuanced Tense Usage & Aspect',
    titleTranslations: { ...T, hi: 'सूक्ष्म काल प्रयोग और पहलू', en: 'Nuanced Tense Usage & Aspect' },
    description: 'Master subtle tense distinctions, narrative tenses, and the progressive aspect for emphasis.',
    descriptionTranslations: { ...T, hi: 'सूक्ष्म काल भेद, कथा काल, और ज़ोर के लिए progressive aspect सीखें।' },
    order: 5,
    content: {
      explanation: `**Present Simple for scheduled future:**
- The train **departs** at 6 AM. (timetable)
- The conference **starts** next Monday. (fixed schedule)

**Present Continuous for annoying habits (with "always"):**
- She's **always complaining** about the traffic! (irritation)
- He's **always losing** his keys. (exasperation)

**Past Simple vs Present Perfect (Indian English trap!):**
❌ "I have gone to Jaipur last week."
✅ "I **went** to Jaipur last week." (finished time = past simple)
✅ "I **have been** to Jaipur." (no time specified = present perfect)

**Past Perfect for "the earlier past":**
- When I reached the station, the train **had already left**.
- She told me she **had visited** Amritsar before.

**Future Perfect:**
- By 2030, India **will have become** the world's most populous country.

**Narrative tenses (storytelling):**
- Past Simple for main events: He **walked** into the room.
- Past Continuous for background: The rain **was falling** heavily.
- Past Perfect for earlier events: He realised he **had forgotten** his umbrella.

**"Would" for past habits:**
- As children, we **would play** cricket every evening.
- (Similar to "used to", but can't describe states.)`,
      explanationTranslations: { ...T, hi: `**Present Simple → timetable:** The train departs at 6 AM.
**Present Continuous + always → चिड़चिड़ाहट:** She's always complaining!
**Past Simple vs Present Perfect:** went (finished time) vs have been (no time)
**Would for past habits:** We would play cricket every evening.` },
      examples: [
        { english: 'By the time we reached the cinema, the movie had already started.', translations: { ...T, hi: 'जब तक हम सिनेमा पहुंचे, फ़िल्म पहले ही शुरू हो चुकी थी।' }, highlight: 'had already started' },
        { english: 'When I was young, we would visit our grandparents every Diwali.', translations: { ...T, hi: 'जब मैं छोटा था, हम हर दिवाली दादा-दादी से मिलने जाते थे।' }, highlight: 'would visit' },
      ],
      tips: [
        { text: '💡 Common Indian English error: "I am having a car" ❌. "Have" for possession is stative — don\'t use continuous: "I have a car" ✅. But "I am having lunch" ✅ (action = eating).', translations: { ...T, hi: '💡 "I am having a car" ❌। "Have" अधिकार के लिए stative है — continuous नहीं: "I have a car" ✅। लेकिन "I am having lunch" ✅ (क्रिया = खाना).' } },
      ],
    },
    exercises: [
      { id: 'c2-g5-ex1', type: 'multiple-choice', question: 'The Rajdhani Express _____ at 4:30 PM every day. (timetable)', options: ['is departing', 'departs', 'will depart', 'has departed'], correctAnswer: 'departs', explanation: 'Present simple for fixed schedules/timetables.', explanationTranslations: { ...T, hi: 'निर्धारित कार्यक्रम के लिए present simple.' } },
      { id: 'c2-g5-ex2', type: 'correct-error', question: 'Find the error: "I have visited Agra last month."', correctAnswer: 'I visited Agra last month.', explanation: '"Last month" = finished time → past simple, not present perfect.', explanationTranslations: { ...T, hi: '"Last month" = समाप्त समय → past simple, present perfect नहीं.' } },
      { id: 'c2-g5-ex3', type: 'fill-blank', question: 'By 2030, India _____ the third-largest economy. (become — future perfect)', correctAnswer: 'will have become', explanation: 'Future perfect: will have + past participle.', explanationTranslations: { ...T, hi: 'Future perfect: will have + past participle.' } },
      { id: 'c2-g5-ex4', type: 'multiple-choice', question: 'She\'s _____ losing her phone! This is the third time this month.', options: ['often', 'always', 'usually', 'sometimes'], correctAnswer: 'always', explanation: 'Present continuous + "always" expresses irritation/exasperation.', explanationTranslations: { ...T, hi: 'Present continuous + "always" चिड़चिड़ाहट व्यक्त करता है.' } },
      { id: 'c2-g5-ex5', type: 'fill-blank', question: 'When I was a child, we _____ go to Marina Beach every Sunday. (past habit)', correctAnswer: 'would', explanation: '"Would" for repeated past habits/routines.', explanationTranslations: { ...T, hi: '"Would" दोहराई जाने वाली भूतकाल की आदतों के लिए.' } },
      { id: 'c2-g5-ex6', type: 'correct-error', question: 'Find the error: "I am knowing the answer."', correctAnswer: 'I know the answer.', explanation: '"Know" is a stative verb — cannot use continuous form.', explanationTranslations: { ...T, hi: '"Know" stative verb है — continuous form नहीं।' } },
      { id: 'c2-g5-ex7', type: 'multiple-choice', question: 'When the taxi arrived, we _____ packed our bags. (earlier action)', options: ['already', 'had already', 'have already', 'were already'], correctAnswer: 'had already', explanation: 'Past perfect for the "earlier past" before another past event.', explanationTranslations: { ...T, hi: 'दूसरी भूतकाल घटना से पहले → past perfect.' } },
      { id: 'c2-g5-ex8', type: 'fill-blank', question: 'It was a dark evening. The wind _____ blowing hard and the streets were empty. (narrative background)', correctAnswer: 'was', explanation: 'Past continuous for background/setting in narratives.', explanationTranslations: { ...T, hi: 'कथा में पृष्ठभूमि के लिए past continuous.' } },
      { id: 'c2-g5-ex9', type: 'correct-error', question: 'Find the error: "She is having a beautiful house in Kerala."', correctAnswer: 'She has a beautiful house in Kerala.', explanation: '"Have" (possession) is stative — use present simple.', explanationTranslations: { ...T, hi: '"Have" (अधिकार) stative है — present simple प्रयोग करें.' } },
      { id: 'c2-g5-ex10', type: 'multiple-choice', question: 'By the time you read this email, I _____ for Delhi.', options: ['will leave', 'will have left', 'leave', 'had left'], correctAnswer: 'will have left', explanation: 'Future perfect for something completed before a future point.', explanationTranslations: { ...T, hi: 'भविष्य बिंदु से पहले पूर्ण → future perfect.' } },
      { id: 'c2-g5-ex11', type: 'fill-blank', question: 'She realised she _____ left her passport at the hotel. (past before past)', correctAnswer: 'had', explanation: 'Past perfect: had left (earlier) → realised (later).', explanationTranslations: { ...T, hi: 'Past perfect: had left (पहले) → realised (बाद).' } },
      { id: 'c2-g5-ex12', type: 'correct-error', question: 'Find the error: "He would be a very shy child." (past state, not habit)', correctAnswer: 'He used to be a very shy child.', explanation: '"Would" is for past habits/actions only, not states. Use "used to" for states.', explanationTranslations: { ...T, hi: '"Would" केवल भूतकाल आदतों के लिए, states के लिए नहीं। States → "used to".' } },
      { id: 'c2-g5-ex13', type: 'multiple-choice', question: '_____ you ever eaten pani puri?', options: ['Did', 'Have', 'Had', 'Were'], correctAnswer: 'Have', explanation: '"Have you ever..." = present perfect for life experience.', explanationTranslations: { ...T, hi: '"Have you ever..." = जीवन अनुभव के लिए present perfect.' } },
      { id: 'c2-g5-ex14', type: 'fill-blank', question: 'This time tomorrow, we _____ flying over the Himalayas. (future continuous)', correctAnswer: 'will be', explanation: 'Future continuous: will be + -ing for actions in progress at a future time.', explanationTranslations: { ...T, hi: 'Future continuous: will be + -ing भविष्य में चल रही क्रिया।' } },
    ],
  },
];
