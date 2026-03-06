import { type CEFRLevel } from '@/lib/firestore';

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface PracticeTest {
  id: string;
  level: CEFRLevel;
  testNumber: number;
  title: string;
  questions: PracticeQuestion[];
}

// ═══════════════════════════════════════════════════════════════════
// A1 – Beginner (4 tests × 10 questions)
// ═══════════════════════════════════════════════════════════════════

const a1Test1: PracticeQuestion[] = [
  { id: 'a1-1-01', question: 'My name _____ Anita.', options: ['am', 'is', 'are', 'be'], correctAnswer: 'is' },
  { id: 'a1-1-02', question: 'I _____ a student.', options: ['is', 'am', 'are', 'be'], correctAnswer: 'am' },
  { id: 'a1-1-03', question: 'They _____ from Chennai.', options: ['is', 'am', 'are', 'be'], correctAnswer: 'are' },
  { id: 'a1-1-04', question: '_____ is your favourite colour?', options: ['Who', 'What', 'Where', 'When'], correctAnswer: 'What' },
  { id: 'a1-1-05', question: 'She _____ tea every morning.', options: ['drink', 'drinks', 'drinking', 'drank'], correctAnswer: 'drinks' },
  { id: 'a1-1-06', question: 'This is _____ book.', options: ['a', 'an', 'the', 'some'], correctAnswer: 'a' },
  { id: 'a1-1-07', question: 'He lives _____ Delhi.', options: ['in', 'on', 'at', 'to'], correctAnswer: 'in' },
  { id: 'a1-1-08', question: 'I have two _____.', options: ['brother', 'brothers', 'brotheres', 'brotherss'], correctAnswer: 'brothers' },
  { id: 'a1-1-09', question: 'The cat is _____ the table.', options: ['in', 'on', 'at', 'to'], correctAnswer: 'on' },
  { id: 'a1-1-10', question: 'We _____ happy today.', options: ['is', 'am', 'are', 'be'], correctAnswer: 'are' },
];

const a1Test2: PracticeQuestion[] = [
  { id: 'a1-2-01', question: 'How _____ are you?', options: ['much', 'many', 'old', 'big'], correctAnswer: 'old' },
  { id: 'a1-2-02', question: 'I _____ like spicy food.', options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'], correctAnswer: 'don\'t' },
  { id: 'a1-2-03', question: '_____ you have a pen?', options: ['Do', 'Does', 'Is', 'Are'], correctAnswer: 'Do' },
  { id: 'a1-2-04', question: 'She goes to school _____ bus.', options: ['in', 'on', 'by', 'with'], correctAnswer: 'by' },
  { id: 'a1-2-05', question: 'There _____ five people in my family.', options: ['is', 'am', 'are', 'be'], correctAnswer: 'are' },
  { id: 'a1-2-06', question: '_____ you speak English?', options: ['Can', 'Is', 'Am', 'Are'], correctAnswer: 'Can' },
  { id: 'a1-2-07', question: 'I wake up _____ 7 o\'clock.', options: ['in', 'on', 'at', 'to'], correctAnswer: 'at' },
  { id: 'a1-2-08', question: 'He _____ not like cricket.', options: ['do', 'does', 'is', 'are'], correctAnswer: 'does' },
  { id: 'a1-2-09', question: 'This is _____ apple.', options: ['a', 'an', 'the', 'some'], correctAnswer: 'an' },
  { id: 'a1-2-10', question: 'My mother _____ very well.', options: ['cook', 'cooks', 'cooking', 'cooked'], correctAnswer: 'cooks' },
];

const a1Test3: PracticeQuestion[] = [
  { id: 'a1-3-01', question: '_____ is the hospital?', options: ['What', 'Who', 'Where', 'When'], correctAnswer: 'Where' },
  { id: 'a1-3-02', question: 'We _____ football on Sundays.', options: ['play', 'plays', 'playing', 'played'], correctAnswer: 'play' },
  { id: 'a1-3-03', question: 'Ravi is _____ brother.', options: ['I', 'me', 'my', 'mine'], correctAnswer: 'my' },
  { id: 'a1-3-04', question: 'The children _____ in the park.', options: ['is', 'am', 'are', 'be'], correctAnswer: 'are' },
  { id: 'a1-3-05', question: 'I go to bed _____ 10 pm.', options: ['in', 'on', 'at', 'to'], correctAnswer: 'at' },
  { id: 'a1-3-06', question: '_____ many pencils do you have?', options: ['What', 'How', 'Who', 'Where'], correctAnswer: 'How' },
  { id: 'a1-3-07', question: 'She _____ watching TV right now.', options: ['is', 'am', 'are', 'be'], correctAnswer: 'is' },
  { id: 'a1-3-08', question: 'The shop is _____ to the bank.', options: ['near', 'next', 'close', 'beside'], correctAnswer: 'next' },
  { id: 'a1-3-09', question: 'I _____ breakfast at 8 am.', options: ['has', 'have', 'having', 'had'], correctAnswer: 'have' },
  { id: 'a1-3-10', question: 'These are _____ shoes.', options: ['her', 'she', 'hers', 'she\'s'], correctAnswer: 'her' },
];

const a1Test4: PracticeQuestion[] = [
  { id: 'a1-4-01', question: 'I _____ to the market yesterday.', options: ['go', 'goes', 'went', 'going'], correctAnswer: 'went' },
  { id: 'a1-4-02', question: 'There is _____ water in the glass.', options: ['a', 'an', 'some', 'many'], correctAnswer: 'some' },
  { id: 'a1-4-03', question: 'Today is _____ than yesterday.', options: ['hot', 'hotter', 'hottest', 'more hot'], correctAnswer: 'hotter' },
  { id: 'a1-4-04', question: 'She _____ her homework now.', options: ['do', 'does', 'is doing', 'did'], correctAnswer: 'is doing' },
  { id: 'a1-4-05', question: '_____ do you go to school?', options: ['What', 'Where', 'How', 'Who'], correctAnswer: 'How' },
  { id: 'a1-4-06', question: 'We need _____ buy rice.', options: ['for', 'at', 'to', 'in'], correctAnswer: 'to' },
  { id: 'a1-4-07', question: 'The book is _____ the shelf.', options: ['in', 'on', 'at', 'under'], correctAnswer: 'on' },
  { id: 'a1-4-08', question: 'He _____ English and Hindi.', options: ['speak', 'speaks', 'speaking', 'spoke'], correctAnswer: 'speaks' },
  { id: 'a1-4-09', question: 'I like _____ football.', options: ['play', 'plays', 'playing', 'played'], correctAnswer: 'playing' },
  { id: 'a1-4-10', question: '_____ is your father\'s name?', options: ['Who', 'What', 'Where', 'When'], correctAnswer: 'What' },
];

// ═══════════════════════════════════════════════════════════════════
// A2 – Elementary (4 tests × 10 questions)
// ═══════════════════════════════════════════════════════════════════

const a2Test1: PracticeQuestion[] = [
  { id: 'a2-1-01', question: 'I _____ to Jaipur last summer.', options: ['go', 'went', 'gone', 'going'], correctAnswer: 'went' },
  { id: 'a2-1-02', question: 'She is _____ than her sister.', options: ['tall', 'taller', 'tallest', 'more tall'], correctAnswer: 'taller' },
  { id: 'a2-1-03', question: 'We _____ dinner at 8 pm every day.', options: ['has', 'have', 'having', 'had'], correctAnswer: 'have' },
  { id: 'a2-1-04', question: 'He _____ already finished his homework.', options: ['have', 'has', 'is', 'was'], correctAnswer: 'has' },
  { id: 'a2-1-05', question: 'The train is _____ crowded today.', options: ['much', 'very', 'many', 'lot'], correctAnswer: 'very' },
  { id: 'a2-1-06', question: 'You should _____ more water.', options: ['drink', 'drinks', 'drinking', 'drank'], correctAnswer: 'drink' },
  { id: 'a2-1-07', question: 'I\'m looking _____ my keys.', options: ['at', 'for', 'to', 'on'], correctAnswer: 'for' },
  { id: 'a2-1-08', question: 'They _____ to the cinema last night.', options: ['go', 'goes', 'went', 'gone'], correctAnswer: 'went' },
  { id: 'a2-1-09', question: 'She has _____ working here since 2020.', options: ['be', 'been', 'being', 'was'], correctAnswer: 'been' },
  { id: 'a2-1-10', question: 'I will call you _____ I reach home.', options: ['when', 'while', 'during', 'until'], correctAnswer: 'when' },
];

const a2Test2: PracticeQuestion[] = [
  { id: 'a2-2-01', question: 'You _____ wear a helmet while riding a bike.', options: ['can', 'must', 'may', 'might'], correctAnswer: 'must' },
  { id: 'a2-2-02', question: 'The movie was _____ boring. I fell asleep.', options: ['very', 'much', 'many', 'lot'], correctAnswer: 'very' },
  { id: 'a2-2-03', question: 'If it rains, we _____ stay at home.', options: ['does', 'do', 'will', 'are'], correctAnswer: 'will' },
  { id: 'a2-2-04', question: 'She asked me _____ I wanted some chai.', options: ['that', 'if', 'what', 'which'], correctAnswer: 'if' },
  { id: 'a2-2-05', question: 'I _____ never been to Goa.', options: ['am', 'was', 'have', 'had'], correctAnswer: 'have' },
  { id: 'a2-2-06', question: 'He is interested _____ learning music.', options: ['at', 'for', 'in', 'on'], correctAnswer: 'in' },
  { id: 'a2-2-07', question: 'The shop opens _____ 9 am _____ 9 pm.', options: ['from...to', 'at...at', 'in...in', 'on...on'], correctAnswer: 'from...to' },
  { id: 'a2-2-08', question: '_____ you like to come with us?', options: ['Will', 'Would', 'Do', 'Are'], correctAnswer: 'Would' },
  { id: 'a2-2-09', question: 'She speaks English _____ than me.', options: ['good', 'better', 'best', 'more good'], correctAnswer: 'better' },
  { id: 'a2-2-10', question: 'I was watching TV _____ my phone rang.', options: ['while', 'when', 'during', 'as'], correctAnswer: 'when' },
];

const a2Test3: PracticeQuestion[] = [
  { id: 'a2-3-01', question: 'He _____ play the guitar very well.', options: ['can', 'is', 'has', 'does'], correctAnswer: 'can' },
  { id: 'a2-3-02', question: 'We saw _____ old temple near the river.', options: ['a', 'an', 'the', 'some'], correctAnswer: 'an' },
  { id: 'a2-3-03', question: 'Last week, I _____ a very good book.', options: ['read', 'reads', 'reading', 'readed'], correctAnswer: 'read' },
  { id: 'a2-3-04', question: 'The food here is _____ expensive than there.', options: ['more', 'most', 'much', 'many'], correctAnswer: 'more' },
  { id: 'a2-3-05', question: 'I need to go to the bank _____ withdraw money.', options: ['for', 'to', 'at', 'in'], correctAnswer: 'to' },
  { id: 'a2-3-06', question: 'She was _____ tired that she went to bed early.', options: ['very', 'so', 'too', 'much'], correctAnswer: 'so' },
  { id: 'a2-3-07', question: 'My friend _____ in Bangalore for five years.', options: ['lives', 'lived', 'has lived', 'is living'], correctAnswer: 'has lived' },
  { id: 'a2-3-08', question: 'I usually travel _____ train to work.', options: ['in', 'on', 'by', 'with'], correctAnswer: 'by' },
  { id: 'a2-3-09', question: '_____ happened at the meeting yesterday?', options: ['Who', 'What', 'Where', 'How'], correctAnswer: 'What' },
  { id: 'a2-3-10', question: 'The children enjoyed _____ at the park.', options: ['them', 'their', 'theirs', 'themselves'], correctAnswer: 'themselves' },
];

const a2Test4: PracticeQuestion[] = [
  { id: 'a2-4-01', question: 'I _____ you tomorrow morning.', options: ['call', 'called', 'will call', 'calling'], correctAnswer: 'will call' },
  { id: 'a2-4-02', question: 'She doesn\'t have _____ friends in the new city.', options: ['much', 'many', 'a lot', 'some'], correctAnswer: 'many' },
  { id: 'a2-4-03', question: 'We _____ waiting for the bus when it started raining.', options: ['was', 'were', 'are', 'is'], correctAnswer: 'were' },
  { id: 'a2-4-04', question: 'This is the _____ restaurant in our area.', options: ['good', 'better', 'best', 'most good'], correctAnswer: 'best' },
  { id: 'a2-4-05', question: 'Please turn _____ the lights before you leave.', options: ['of', 'off', 'out', 'on'], correctAnswer: 'off' },
  { id: 'a2-4-06', question: 'I _____ my uncle next weekend.', options: ['visit', 'visited', 'am visiting', 'visits'], correctAnswer: 'am visiting' },
  { id: 'a2-4-07', question: 'He got up early _____ catch the train.', options: ['for', 'to', 'so', 'because'], correctAnswer: 'to' },
  { id: 'a2-4-08', question: 'My sister is good _____ cooking biriyani.', options: ['in', 'on', 'at', 'for'], correctAnswer: 'at' },
  { id: 'a2-4-09', question: 'It\'s too _____ to play outside in the summer.', options: ['hot', 'cold', 'warm', 'cool'], correctAnswer: 'hot' },
  { id: 'a2-4-10', question: 'Neither Ravi _____ Sita came to the party.', options: ['or', 'and', 'nor', 'but'], correctAnswer: 'nor' },
];

// ═══════════════════════════════════════════════════════════════════
// B1 – Intermediate (4 tests × 10 questions)
// ═══════════════════════════════════════════════════════════════════

const b1Test1: PracticeQuestion[] = [
  { id: 'b1-1-01', question: 'If I _____ more time, I would travel around India.', options: ['have', 'had', 'has', 'having'], correctAnswer: 'had' },
  { id: 'b1-1-02', question: 'She suggested _____ to the new restaurant.', options: ['go', 'to go', 'going', 'gone'], correctAnswer: 'going' },
  { id: 'b1-1-03', question: 'The report _____ by the manager yesterday.', options: ['was reviewed', 'reviewed', 'is reviewed', 'has reviewed'], correctAnswer: 'was reviewed' },
  { id: 'b1-1-04', question: 'I wish I _____ speak better English.', options: ['can', 'could', 'would', 'should'], correctAnswer: 'could' },
  { id: 'b1-1-05', question: 'Despite _____ hard, he didn\'t pass the exam.', options: ['study', 'studied', 'studying', 'to study'], correctAnswer: 'studying' },
  { id: 'b1-1-06', question: 'She asked me where I _____.', options: ['live', 'lived', 'living', 'lives'], correctAnswer: 'lived' },
  { id: 'b1-1-07', question: 'By the time we arrived, the movie _____ already started.', options: ['has', 'have', 'had', 'was'], correctAnswer: 'had' },
  { id: 'b1-1-08', question: 'The number of students _____ increased this year.', options: ['have', 'has', 'are', 'is'], correctAnswer: 'has' },
  { id: 'b1-1-09', question: 'He apologised _____ being late to the meeting.', options: ['of', 'about', 'for', 'to'], correctAnswer: 'for' },
  { id: 'b1-1-10', question: 'You should get used _____ Indian traffic.', options: ['for', 'with', 'to', 'at'], correctAnswer: 'to' },
];

const b1Test2: PracticeQuestion[] = [
  { id: 'b1-2-01', question: 'The project needs to be completed _____ Friday.', options: ['until', 'by', 'on', 'at'], correctAnswer: 'by' },
  { id: 'b1-2-02', question: 'I\'d rather you _____ smoke inside the house.', options: ['don\'t', 'didn\'t', 'won\'t', 'not'], correctAnswer: 'didn\'t' },
  { id: 'b1-2-03', question: 'She _____ working at Infosys for three years before she quit.', options: ['is', 'was', 'has been', 'had been'], correctAnswer: 'had been' },
  { id: 'b1-2-04', question: 'The more you practise, the _____ you will become.', options: ['good', 'better', 'best', 'well'], correctAnswer: 'better' },
  { id: 'b1-2-05', question: 'He denied _____ the money from the drawer.', options: ['take', 'to take', 'taking', 'took'], correctAnswer: 'taking' },
  { id: 'b1-2-06', question: '_____ I were you, I would accept the offer.', options: ['If', 'When', 'Unless', 'Although'], correctAnswer: 'If' },
  { id: 'b1-2-07', question: 'She told me that she _____ call me later.', options: ['will', 'would', 'can', 'may'], correctAnswer: 'would' },
  { id: 'b1-2-08', question: 'The bridge _____ built in 1985.', options: ['is', 'was', 'has been', 'had been'], correctAnswer: 'was' },
  { id: 'b1-2-09', question: 'Could you tell me how _____ to the railway station?', options: ['get', 'to get', 'getting', 'got'], correctAnswer: 'to get' },
  { id: 'b1-2-10', question: 'Unless you hurry, you _____ miss the train.', options: ['would', 'will', 'might', 'should'], correctAnswer: 'will' },
];

const b1Test3: PracticeQuestion[] = [
  { id: 'b1-3-01', question: 'I look forward _____ hearing from you.', options: ['for', 'at', 'to', 'on'], correctAnswer: 'to' },
  { id: 'b1-3-02', question: 'It\'s no use _____ about the past.', options: ['worry', 'to worry', 'worrying', 'worried'], correctAnswer: 'worrying' },
  { id: 'b1-3-03', question: 'The film was so _____ that half the audience left.', options: ['bored', 'boring', 'bore', 'bores'], correctAnswer: 'boring' },
  { id: 'b1-3-04', question: 'She _____ be at home — her car is in the driveway.', options: ['can', 'might', 'must', 'should'], correctAnswer: 'must' },
  { id: 'b1-3-05', question: 'The teacher made the students _____ the test again.', options: ['take', 'to take', 'taking', 'took'], correctAnswer: 'take' },
  { id: 'b1-3-06', question: 'I\'m not used to _____ up this early.', options: ['get', 'getting', 'got', 'gets'], correctAnswer: 'getting' },
  { id: 'b1-3-07', question: 'Neither the manager _____ the team agreed to the changes.', options: ['or', 'and', 'nor', 'but'], correctAnswer: 'nor' },
  { id: 'b1-3-08', question: 'The new policy will come _____ effect next month.', options: ['in', 'into', 'to', 'at'], correctAnswer: 'into' },
  { id: 'b1-3-09', question: 'He regrets _____ his previous job.', options: ['leave', 'to leave', 'leaving', 'left'], correctAnswer: 'leaving' },
  { id: 'b1-3-10', question: 'As _____ as I know, the meeting is still on.', options: ['far', 'long', 'much', 'well'], correctAnswer: 'far' },
];

const b1Test4: PracticeQuestion[] = [
  { id: 'b1-4-01', question: 'The results were _____ disappointing than we expected.', options: ['less', 'fewer', 'least', 'little'], correctAnswer: 'less' },
  { id: 'b1-4-02', question: 'I won\'t go _____ she invites me personally.', options: ['if', 'when', 'unless', 'although'], correctAnswer: 'unless' },
  { id: 'b1-4-03', question: 'She has been _____ for the job interview all week.', options: ['prepare', 'prepared', 'preparing', 'to prepare'], correctAnswer: 'preparing' },
  { id: 'b1-4-04', question: 'The company, _____ was founded in Pune, is now global.', options: ['that', 'which', 'who', 'where'], correctAnswer: 'which' },
  { id: 'b1-4-05', question: 'He ran fast _____ not to miss the flight.', options: ['so as', 'in order', 'because', 'due to'], correctAnswer: 'so as' },
  { id: 'b1-4-06', question: 'I\'d _____ stay home than go to the crowded market.', options: ['better', 'rather', 'prefer', 'like'], correctAnswer: 'rather' },
  { id: 'b1-4-07', question: '_____ having a map, we got lost in the old city.', options: ['Although', 'Despite', 'Because', 'Since'], correctAnswer: 'Despite' },
  { id: 'b1-4-08', question: 'It\'s high time you _____ serious about your career.', options: ['get', 'got', 'getting', 'gets'], correctAnswer: 'got' },
  { id: 'b1-4-09', question: 'She is _____ responsible for the accident.', options: ['part', 'partly', 'partial', 'parting'], correctAnswer: 'partly' },
  { id: 'b1-4-10', question: 'I\'m having my car _____ at the garage.', options: ['repair', 'repaired', 'repairing', 'repairs'], correctAnswer: 'repaired' },
];

// ═══════════════════════════════════════════════════════════════════
// B2 – Upper Intermediate (4 tests × 10 questions)
// ═══════════════════════════════════════════════════════════════════

const b2Test1: PracticeQuestion[] = [
  { id: 'b2-1-01', question: 'Hardly had the meeting started _____ the fire alarm went off.', options: ['when', 'than', 'that', 'before'], correctAnswer: 'when' },
  { id: 'b2-1-02', question: 'She would have passed the exam if she _____ harder.', options: ['study', 'studied', 'had studied', 'has studied'], correctAnswer: 'had studied' },
  { id: 'b2-1-03', question: 'The government is committed to _____ unemployment.', options: ['reduce', 'reducing', 'reduced', 'reduction'], correctAnswer: 'reducing' },
  { id: 'b2-1-04', question: 'He speaks English fluently, _____ he\'s never lived abroad.', options: ['although', 'because', 'so', 'therefore'], correctAnswer: 'although' },
  { id: 'b2-1-05', question: 'The decision was taken _____ the best interests of the employees.', options: ['at', 'on', 'in', 'for'], correctAnswer: 'in' },
  { id: 'b2-1-06', question: 'Not until the results were published _____ realise the impact.', options: ['did we', 'we did', 'we had', 'had we'], correctAnswer: 'did we' },
  { id: 'b2-1-07', question: 'She found it hard to come to _____ with the loss.', options: ['terms', 'words', 'hands', 'mind'], correctAnswer: 'terms' },
  { id: 'b2-1-08', question: 'The investigation brought _____ several irregularities.', options: ['out', 'up', 'about', 'to light'], correctAnswer: 'to light' },
  { id: 'b2-1-09', question: 'I would appreciate it if you _____ this matter urgently.', options: ['handle', 'handled', 'would handle', 'handling'], correctAnswer: 'handled' },
  { id: 'b2-1-10', question: 'His performance left a lot to be _____.', options: ['desired', 'wanted', 'expected', 'hoped'], correctAnswer: 'desired' },
];

const b2Test2: PracticeQuestion[] = [
  { id: 'b2-2-01', question: 'The new policy aims to bridge the _____ between urban and rural education.', options: ['hole', 'gap', 'space', 'distance'], correctAnswer: 'gap' },
  { id: 'b2-2-02', question: 'Were it not for his dedication, the project _____ failed.', options: ['will have', 'would have', 'had', 'has'], correctAnswer: 'would have' },
  { id: 'b2-2-03', question: 'She takes pride _____ her ability to multitask.', options: ['at', 'for', 'in', 'on'], correctAnswer: 'in' },
  { id: 'b2-2-04', question: 'The issue is far more _____ than it appears on the surface.', options: ['complex', 'completed', 'compliant', 'complacent'], correctAnswer: 'complex' },
  { id: 'b2-2-05', question: '_____ what people say, he is actually a kind person.', options: ['Although', 'Despite', 'Contrary to', 'In spite'], correctAnswer: 'Contrary to' },
  { id: 'b2-2-06', question: 'Little _____ know about the challenges he faced growing up.', options: ['people do', 'do people', 'people did', 'did people'], correctAnswer: 'do people' },
  { id: 'b2-2-07', question: 'The scientist\'s findings have far-_____ implications.', options: ['reaching', 'going', 'seeing', 'stretching'], correctAnswer: 'reaching' },
  { id: 'b2-2-08', question: 'She managed to get her point _____ despite the noisy audience.', options: ['through', 'across', 'over', 'around'], correctAnswer: 'across' },
  { id: 'b2-2-09', question: 'On _____ thought, I think we should reconsider our approach.', options: ['first', 'next', 'second', 'other'], correctAnswer: 'second' },
  { id: 'b2-2-10', question: 'The company is _____ the verge of a major breakthrough.', options: ['at', 'in', 'on', 'by'], correctAnswer: 'on' },
];

const b2Test3: PracticeQuestion[] = [
  { id: 'b2-3-01', question: 'Had I known about the delay, I _____ taken the earlier flight.', options: ['would', 'will', 'would have', 'will have'], correctAnswer: 'would have' },
  { id: 'b2-3-02', question: 'The painting was attributed _____ a famous 16th-century artist.', options: ['for', 'with', 'to', 'by'], correctAnswer: 'to' },
  { id: 'b2-3-03', question: 'It goes without _____ that punctuality is essential.', options: ['telling', 'saying', 'speaking', 'talking'], correctAnswer: 'saying' },
  { id: 'b2-3-04', question: 'The firm is likely to _____ significant losses this quarter.', options: ['undergo', 'incur', 'proceed', 'commit'], correctAnswer: 'incur' },
  { id: 'b2-3-05', question: 'Under no circumstances _____ you reveal this information.', options: ['you should', 'should you', 'you must', 'must you'], correctAnswer: 'should you' },
  { id: 'b2-3-06', question: 'The proposal was met with _____ resistance from the board.', options: ['severe', 'fierce', 'rough', 'wild'], correctAnswer: 'fierce' },
  { id: 'b2-3-07', question: 'I\'d sooner _____ on my own than seek their help.', options: ['manage', 'managed', 'managing', 'to manage'], correctAnswer: 'manage' },
  { id: 'b2-3-08', question: 'She tends to take things _____ granted.', options: ['as', 'for', 'by', 'with'], correctAnswer: 'for' },
  { id: 'b2-3-09', question: '_____ from a few minor errors, the report was excellent.', options: ['Apart', 'Except', 'Other', 'Away'], correctAnswer: 'Apart' },
  { id: 'b2-3-10', question: 'The marketing team needs to think outside the _____.', options: ['line', 'circle', 'box', 'frame'], correctAnswer: 'box' },
];

const b2Test4: PracticeQuestion[] = [
  { id: 'b2-4-01', question: 'The event was postponed _____ account of heavy rainfall.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'on' },
  { id: 'b2-4-02', question: 'She _____ to have worked for the United Nations.', options: ['believed', 'is believed', 'believes', 'was believing'], correctAnswer: 'is believed' },
  { id: 'b2-4-03', question: 'We need to take _____ of this opportunity immediately.', options: ['notice', 'advantage', 'care', 'hold'], correctAnswer: 'advantage' },
  { id: 'b2-4-04', question: 'The speaker dwelt _____ the challenges facing the education sector.', options: ['at', 'in', 'on', 'about'], correctAnswer: 'on' },
  { id: 'b2-4-05', question: 'By _____ large, the experiment was considered a success.', options: ['and', 'or', 'in', 'at'], correctAnswer: 'and' },
  { id: 'b2-4-06', question: 'The committee has yet _____ a final decision.', options: ['make', 'to make', 'making', 'made'], correctAnswer: 'to make' },
  { id: 'b2-4-07', question: 'Their approach to the problem is _____ odds with ours.', options: ['in', 'at', 'on', 'by'], correctAnswer: 'at' },
  { id: 'b2-4-08', question: 'The athlete\'s performance was nothing _____ of extraordinary.', options: ['less', 'short', 'more', 'far'], correctAnswer: 'short' },
  { id: 'b2-4-09', question: 'The CEO\'s resignation came as a bolt from the _____.', options: ['sky', 'blue', 'cloud', 'storm'], correctAnswer: 'blue' },
  { id: 'b2-4-10', question: 'I _____ blind eye to his mistakes for too long.', options: ['took a', 'gave a', 'turned a', 'made a'], correctAnswer: 'turned a' },
];

// ═══════════════════════════════════════════════════════════════════
// C1 – Advanced (4 tests × 10 questions)
// ═══════════════════════════════════════════════════════════════════

const c1Test1: PracticeQuestion[] = [
  { id: 'c1-1-01', question: 'The government\'s _____ economic policies have drawn criticism.', options: ['austere', 'austerity', 'austerer', 'austerely'], correctAnswer: 'austere' },
  { id: 'c1-1-02', question: 'The allegations against the minister remain _____.', options: ['unsubstantiated', 'unsubstantial', 'insubstantial', 'disproven'], correctAnswer: 'unsubstantiated' },
  { id: 'c1-1-03', question: 'Not only did the company fail to innovate, _____ it also lost key talent.', options: ['and', 'but', 'so', 'yet'], correctAnswer: 'but' },
  { id: 'c1-1-04', question: 'The ruling _____ a precedent for future cases of this nature.', options: ['sets', 'makes', 'puts', 'gives'], correctAnswer: 'sets' },
  { id: 'c1-1-05', question: 'Her writing style is characterised by _____ elegance.', options: ['effortful', 'effortless', 'efforting', 'effortlessly'], correctAnswer: 'effortless' },
  { id: 'c1-1-06', question: 'The diplomat\'s response was deliberately _____ to avoid committing to either side.', options: ['ambiguous', 'ambitious', 'amicable', 'anomalous'], correctAnswer: 'ambiguous' },
  { id: 'c1-1-07', question: 'The researcher _____ a correlation between diet and cognitive performance.', options: ['established', 'installed', 'instituted', 'ensured'], correctAnswer: 'established' },
  { id: 'c1-1-08', question: 'The merger will _____ have significant ramifications for the industry.', options: ['inevitably', 'invariably', 'inconceivably', 'inadvertently'], correctAnswer: 'inevitably' },
  { id: 'c1-1-09', question: 'He was _____ in his efforts to modernise the curriculum.', options: ['relentless', 'reluctant', 'reclusive', 'redundant'], correctAnswer: 'relentless' },
  { id: 'c1-1-10', question: 'The novel provides a _____ account of partition-era India.', options: ['poignant', 'pungent', 'prudent', 'prevalent'], correctAnswer: 'poignant' },
];

const c1Test2: PracticeQuestion[] = [
  { id: 'c1-2-01', question: 'The evidence _____ the theory that early intervention is effective.', options: ['corroborates', 'collaborates', 'correlates', 'commemorates'], correctAnswer: 'corroborates' },
  { id: 'c1-2-02', question: 'The committee was _____ in its criticism of the proposal.', options: ['unanimous', 'anonymous', 'analogous', 'ambiguous'], correctAnswer: 'unanimous' },
  { id: 'c1-2-03', question: 'His argument, though superficially appealing, lacks _____.', options: ['substance', 'sustenance', 'surveillance', 'subsistence'], correctAnswer: 'substance' },
  { id: 'c1-2-04', question: 'The festival serves to _____ the cultural heritage of the region.', options: ['prescribe', 'preserve', 'perceive', 'preclude'], correctAnswer: 'preserve' },
  { id: 'c1-2-05', question: 'She made a _____ contribution to the field of renewable energy.', options: ['mundane', 'mediocre', 'monumental', 'marginal'], correctAnswer: 'monumental' },
  { id: 'c1-2-06', question: 'The report highlights the _____ between economic growth and environmental sustainability.', options: ['tension', 'tenacity', 'tendency', 'tenure'], correctAnswer: 'tension' },
  { id: 'c1-2-07', question: 'The activist\'s speech _____ widespread public support for the cause.', options: ['garnered', 'governed', 'generated', 'guaranteed'], correctAnswer: 'garnered' },
  { id: 'c1-2-08', question: 'The findings are _____ with previous research in the area.', options: ['consistent', 'constant', 'constituent', 'constructive'], correctAnswer: 'consistent' },
  { id: 'c1-2-09', question: 'We should not _____ the complexity of the situation.', options: ['undermine', 'undertake', 'underestimate', 'undergo'], correctAnswer: 'underestimate' },
  { id: 'c1-2-10', question: 'The infrastructure plan will _____ billions of rupees in investment.', options: ['entail', 'engage', 'enforce', 'endure'], correctAnswer: 'entail' },
];

const c1Test3: PracticeQuestion[] = [
  { id: 'c1-3-01', question: 'The artist\'s work is _____ with themes of identity and belonging.', options: ['permeated', 'persuaded', 'perceived', 'perpetuated'], correctAnswer: 'permeated' },
  { id: 'c1-3-02', question: 'The policy was widely _____ as a step in the right direction.', options: ['regarded', 'rewarded', 'related', 'reserved'], correctAnswer: 'regarded' },
  { id: 'c1-3-03', question: 'It would be _____ to draw conclusions from such limited data.', options: ['premature', 'preoccupied', 'prejudiced', 'preliminary'], correctAnswer: 'premature' },
  { id: 'c1-3-04', question: 'The scandal has _____ raised questions about institutional accountability.', options: ['uniquely', 'invariably', 'inevitably', 'inadvertently'], correctAnswer: 'inevitably' },
  { id: 'c1-3-05', question: 'The professor\'s lecture was both _____ and thought-provoking.', options: ['lucid', 'lurid', 'lukewarm', 'luminous'], correctAnswer: 'lucid' },
  { id: 'c1-3-06', question: 'The new legislation seeks to _____ the existing regulatory framework.', options: ['overwhelm', 'overhaul', 'overlook', 'override'], correctAnswer: 'overhaul' },
  { id: 'c1-3-07', question: 'The witness gave a _____ account of the events that transpired.', options: ['comprehensive', 'compulsory', 'comparative', 'compatible'], correctAnswer: 'comprehensive' },
  { id: 'c1-3-08', question: 'The debate _____ around the question of social justice.', options: ['revolved', 'resolved', 'reserved', 'revealed'], correctAnswer: 'revolved' },
  { id: 'c1-3-09', question: 'The manager\'s decision to restructure was _____ controversial.', options: ['deeply', 'highly', 'largely', 'broadly'], correctAnswer: 'highly' },
  { id: 'c1-3-10', question: 'The findings _____ the need for more rigorous research methods.', options: ['underline', 'undermine', 'undergo', 'undertake'], correctAnswer: 'underline' },
];

const c1Test4: PracticeQuestion[] = [
  { id: 'c1-4-01', question: 'The city\'s rapid urbanisation has _____ considerable strain on infrastructure.', options: ['placed', 'posed', 'proposed', 'proceeded'], correctAnswer: 'placed' },
  { id: 'c1-4-02', question: 'The documentary sheds _____ on the plight of migrant workers.', options: ['light', 'shadow', 'weight', 'doubt'], correctAnswer: 'light' },
  { id: 'c1-4-03', question: 'The _____ of evidence suggests that the programme has been effective.', options: ['preponderance', 'predominance', 'preference', 'prevalence'], correctAnswer: 'preponderance' },
  { id: 'c1-4-04', question: 'The author\'s latest work _____ the boundaries of contemporary fiction.', options: ['presses', 'pushes', 'passes', 'pulls'], correctAnswer: 'pushes' },
  { id: 'c1-4-05', question: 'Her dedication to social work is truly _____.', options: ['commendable', 'combustible', 'comparable', 'compatible'], correctAnswer: 'commendable' },
  { id: 'c1-4-06', question: 'The court\'s ruling effectively _____ the government\'s earlier decision.', options: ['overturned', 'overlooked', 'overwhelmed', 'overtook'], correctAnswer: 'overturned' },
  { id: 'c1-4-07', question: 'The trade agreement is expected to _____ mutual economic benefits.', options: ['yield', 'yell', 'yearn', 'yoke'], correctAnswer: 'yield' },
  { id: 'c1-4-08', question: 'The crisis has laid _____ the systemic weaknesses in social welfare.', options: ['down', 'out', 'bare', 'off'], correctAnswer: 'bare' },
  { id: 'c1-4-09', question: 'The politician\'s remarks were taken out of _____ by the media.', options: ['context', 'content', 'contact', 'contract'], correctAnswer: 'context' },
  { id: 'c1-4-10', question: 'Studies have shown a _____ link between poverty and health outcomes.', options: ['casual', 'causal', 'chronic', 'crucial'], correctAnswer: 'causal' },
];

// ═══════════════════════════════════════════════════════════════════
// Assemble all tests
// ═══════════════════════════════════════════════════════════════════

export const practiceTests: PracticeTest[] = [
  // A1
  { id: 'a1-test-1', level: 'A1', testNumber: 1, title: 'Basics: Be & Have', questions: a1Test1 },
  { id: 'a1-test-2', level: 'A1', testNumber: 2, title: 'Questions & Negatives', questions: a1Test2 },
  { id: 'a1-test-3', level: 'A1', testNumber: 3, title: 'Everyday Actions', questions: a1Test3 },
  { id: 'a1-test-4', level: 'A1', testNumber: 4, title: 'Past & Comparisons', questions: a1Test4 },
  // A2
  { id: 'a2-test-1', level: 'A2', testNumber: 1, title: 'Past & Present Perfect', questions: a2Test1 },
  { id: 'a2-test-2', level: 'A2', testNumber: 2, title: 'Modals & Conditionals', questions: a2Test2 },
  { id: 'a2-test-3', level: 'A2', testNumber: 3, title: 'Tenses & Comparisons', questions: a2Test3 },
  { id: 'a2-test-4', level: 'A2', testNumber: 4, title: 'Future & Conjunctions', questions: a2Test4 },
  // B1
  { id: 'b1-test-1', level: 'B1', testNumber: 1, title: 'Conditionals & Reported Speech', questions: b1Test1 },
  { id: 'b1-test-2', level: 'B1', testNumber: 2, title: 'Advanced Tenses', questions: b1Test2 },
  { id: 'b1-test-3', level: 'B1', testNumber: 3, title: 'Gerunds & Modals', questions: b1Test3 },
  { id: 'b1-test-4', level: 'B1', testNumber: 4, title: 'Complex Sentences', questions: b1Test4 },
  // B2
  { id: 'b2-test-1', level: 'B2', testNumber: 1, title: 'Inversion & Idioms', questions: b2Test1 },
  { id: 'b2-test-2', level: 'B2', testNumber: 2, title: 'Advanced Vocabulary', questions: b2Test2 },
  { id: 'b2-test-3', level: 'B2', testNumber: 3, title: 'Third Conditional & Collocation', questions: b2Test3 },
  { id: 'b2-test-4', level: 'B2', testNumber: 4, title: 'Formal English & Idioms', questions: b2Test4 },
  // C1
  { id: 'c1-test-1', level: 'C1', testNumber: 1, title: 'Academic Vocabulary', questions: c1Test1 },
  { id: 'c1-test-2', level: 'C1', testNumber: 2, title: 'Precision & Nuance', questions: c1Test2 },
  { id: 'c1-test-3', level: 'C1', testNumber: 3, title: 'Critical Analysis', questions: c1Test3 },
  { id: 'c1-test-4', level: 'C1', testNumber: 4, title: 'Advanced Expression', questions: c1Test4 },
];

/** Get tests for a specific level */
export function getTestsByLevel(level: CEFRLevel): PracticeTest[] {
  return practiceTests.filter((t) => t.level === level);
}

/** Get a specific test by ID */
export function getTestById(id: string): PracticeTest | undefined {
  return practiceTests.find((t) => t.id === id);
}
