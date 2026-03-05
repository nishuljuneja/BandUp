/**
 * Fix word-definitions.json so every example sentence actually contains its word.
 * 
 * Strategy:
 * 1. For each word, check if the example contains the word (or a common inflection).
 * 2. If not, clear the example so the UI can fall back gracefully.
 * 3. Also fix known bad entries (e.g. "should" having "shall"'s definition).
 */

const fs = require('fs');
const path = require('path');

const DEFS_PATH = path.join(__dirname, '..', 'src', 'content', 'word-definitions.json');
const defs = JSON.parse(fs.readFileSync(DEFS_PATH, 'utf-8'));

/**
 * Check if a word (or any of its common inflections) appears in a sentence.
 */
function wordAppearsIn(word, sentence) {
  const w = word.toLowerCase();
  const s = sentence.toLowerCase();
  
  // Generate inflected forms
  const variants = new Set([w]);
  
  // Basic suffixes
  variants.add(w + 's');
  variants.add(w + 'es');
  variants.add(w + 'ed');
  variants.add(w + 'd');
  variants.add(w + 'ing');
  variants.add(w + 'er');
  variants.add(w + 'est');
  variants.add(w + 'ly');
  variants.add(w + 'ment');
  variants.add(w + 'ness');
  variants.add(w + 'tion');
  variants.add(w + 'ation');
  variants.add(w + 'ful');
  variants.add(w + 'less');
  variants.add(w + 'able');
  variants.add(w + 'ible');
  variants.add(w + 'ous');
  variants.add(w + 'ive');
  variants.add(w + 'al');
  variants.add(w + 'ity');
  
  // Drop trailing e before -ing/-ed/-er/-est/-ation
  if (w.endsWith('e')) {
    variants.add(w.slice(0, -1) + 'ing');
    variants.add(w.slice(0, -1) + 'ed');
    variants.add(w.slice(0, -1) + 'er');
    variants.add(w.slice(0, -1) + 'est');
    variants.add(w.slice(0, -1) + 'ation');
  }
  
  // Double final consonant before -ing/-ed/-er
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
    const last = w.slice(-1);
    variants.add(w + last + 'ing');
    variants.add(w + last + 'ed');
    variants.add(w + last + 'er');
    variants.add(w + last + 'est');
  }
  
  // Words ending in y → ied/ies/ier/iest/ily
  if (w.endsWith('y') && w.length > 2 && !/[aeiou]y$/.test(w)) {
    const stem = w.slice(0, -1);
    variants.add(stem + 'ied');
    variants.add(stem + 'ies');
    variants.add(stem + 'ier');
    variants.add(stem + 'iest');
    variants.add(stem + 'ily');
  }
  
  // Words ending in y → just add s (plays, days)
  if (w.endsWith('y')) {
    variants.add(w + 's');
  }
  
  // Handle -ic → -ically 
  if (w.endsWith('ic')) {
    variants.add(w + 'ally');
    variants.add(w + 'al');
  }
  
  // Handle un- prefix (check base)
  if (w.startsWith('un')) {
    variants.add(w.slice(2));
  }
  // Handle re- prefix
  if (w.startsWith('re')) {
    variants.add(w.slice(2));
  }
  
  // Handle -ise/-ize variants
  if (w.endsWith('ise')) {
    variants.add(w.slice(0, -3) + 'ize');
    variants.add(w.slice(0, -3) + 'ization');
    variants.add(w.slice(0, -3) + 'isation');
  }
  if (w.endsWith('ize')) {
    variants.add(w.slice(0, -3) + 'ise');
    variants.add(w.slice(0, -3) + 'ization');
    variants.add(w.slice(0, -3) + 'isation');
  }
  
  // Handle -our/-or variants (colour/color)
  if (w.endsWith('our')) {
    variants.add(w.slice(0, -3) + 'or');
  }
  if (w.endsWith('or') && w.length > 3) {
    variants.add(w.slice(0, -2) + 'our');
  }
  
  // Handle -re/-er variants (centre/center)
  if (w.endsWith('re') && w.length > 3) {
    variants.add(w.slice(0, -2) + 'er');
  }
  
  // Handle past participles for irregular verbs - partial forms
  // e.g. "broken" should match "break", "drunk" for "drink", etc.
  // We check if the word is a SUBSTRING of any word in the sentence
  // This catches: "drive" in "driving", "advertise" in "advertise" etc.
  
  // Check each variant as a whole word in the sentence
  for (const v of variants) {
    const escaped = v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b', 'i');
    if (re.test(s)) return true;
  }
  
  // Last resort: check if the word (3+ chars) is a substring of any word in the sentence
  // This catches things like "cafe" in "café" or partial stems
  if (w.length >= 4) {
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(escaped, 'i').test(s)) return true;
  }
  
  return false;
}

// Known manual fixes for completely wrong definitions
const MANUAL_FIXES = {
  // ── Common function words with obscure API definitions ──
  'to': { d: 'in the direction of; used before a verb to form the infinitive', e: 'I walk to school every day.', p: 'prep.' },
  'the': { d: 'used before a noun to show that it is a specific one', e: 'The sun rises in the east.', p: 'det.' },
  'a': { d: 'one; used before a noun when mentioning it for the first time or referring to any one of a type', e: 'She ate a banana for breakfast.', p: 'det.' },
  'an': { d: 'used instead of "a" before a word beginning with a vowel sound', e: 'He bought an umbrella.', p: 'det.' },
  'is': { d: 'third person singular present of "be"', e: 'She is a good student.', p: 'verb' },
  'am': { d: 'first person singular present of "be"', e: 'I am happy to see you.', p: 'verb' },
  'are': { d: 'second person singular and plural present of "be"', e: 'They are playing in the park.', p: 'verb' },
  'was': { d: 'past tense of "be" (first and third person singular)', e: 'He was tired after the long walk.', p: 'verb' },
  'were': { d: 'past tense of "be" (second person singular, plural)', e: 'They were excited about the trip.', p: 'verb' },
  'it': { d: 'used to refer to a thing, animal, or situation already mentioned', e: 'I found the book. It was on the table.', p: 'pron.' },
  'its': { d: 'belonging to or connected with a thing, animal, or baby', e: 'The dog wagged its tail happily.', p: 'det.' },
  'he': { d: 'used to refer to a man or boy already mentioned', e: 'My brother is a doctor. He works at a hospital.', p: 'pron.' },
  'she': { d: 'used to refer to a woman or girl already mentioned', e: 'My sister loves reading. She reads every night.', p: 'pron.' },
  'we': { d: 'used by a speaker to refer to himself or herself and one or more other people', e: 'We went to the market together.', p: 'pron.' },
  'they': { d: 'used to refer to people, animals, or things already mentioned', e: 'The children are playing. They look happy.', p: 'pron.' },
  'me': { d: 'used to refer to the speaker as the object of a verb or preposition', e: 'Can you help me with this?', p: 'pron.' },
  'him': { d: 'used to refer to a man or boy as the object of a verb or preposition', e: 'I gave him the keys.', p: 'pron.' },
  'her': { d: 'used to refer to a woman or girl as the object of a verb or preposition; also: belonging to her', e: 'I saw her at the shop.', p: 'pron.' },
  'us': { d: 'used to refer to the speaker and one or more other people as the object of a verb', e: 'The teacher asked us to sit down.', p: 'pron.' },
  'them': { d: 'used to refer to people, animals, or things as the object of a verb or preposition', e: 'I gave them the directions to the railway station.', p: 'pron.' },
  'my': { d: 'belonging to or connected with the speaker', e: 'My name is Priya.', p: 'det.' },
  'his': { d: 'belonging to or connected with a man or boy already mentioned', e: 'Ravi forgot his lunch at home.', p: 'det.' },
  'our': { d: 'belonging to or connected with us', e: 'Our school won the inter-school cricket tournament.', p: 'det.' },
  'their': { d: 'belonging to or connected with the people or things already mentioned', e: 'The students completed their assignments on time.', p: 'det.' },
  'your': { d: 'belonging to or connected with the person being spoken to', e: 'What is your favourite colour?', p: 'det.' },
  'this': { d: 'used to refer to something that is near the speaker or has just been mentioned', e: 'This is my house.', p: 'det.' },
  'that': { d: 'used to refer to a person, thing, or idea that has been mentioned or is further away', e: 'That book on the shelf is mine.', p: 'det.' },
  'these': { d: 'plural of "this"; referring to things near the speaker', e: 'These mangoes are very sweet.', p: 'det.' },
  'those': { d: 'plural of "that"; referring to things further away', e: 'Those mountains look beautiful from here.', p: 'det.' },
  'who': { d: 'used to ask about the identity of a person', e: 'Who is your favourite teacher?', p: 'pron.' },
  'what': { d: 'used to ask for information about something', e: 'What time does the train leave?', p: 'pron.' },
  'which': { d: 'used to ask about a choice between two or more things', e: 'Which colour do you prefer, red or blue?', p: 'det.' },
  'where': { d: 'at, in, or to what place', e: 'Where do you live?', p: 'adv.' },
  'when': { d: 'at what time; at the time that', e: 'When does the movie start?', p: 'adv.' },
  'how': { d: 'in what way or manner; to what extent', e: 'How do you get to school?', p: 'adv.' },
  'why': { d: 'for what reason or purpose', e: 'Why are you late today?', p: 'adv.' },
  'not': { d: 'used to make a word, phrase, or sentence negative', e: 'I do not like spicy food.', p: 'adv.' },
  'no': { d: 'used to give a negative answer; not any', e: 'No, I have not seen that movie.', p: 'det.' },
  'yes': { d: 'used to give a positive answer or agree', e: 'Yes, I would love to come to the party.', p: 'exclam.' },
  'in': { d: 'inside a container, place, or area', e: 'The keys are in my bag.', p: 'prep.' },
  'on': { d: 'touching the surface of something; supported by', e: 'The book is on the table.', p: 'prep.' },
  'of': { d: 'belonging to; relating to; containing', e: 'She drank a glass of water.', p: 'prep.' },
  'for': { d: 'intended to belong to or be used by; because of', e: 'This gift is for you.', p: 'prep.' },
  'with': { d: 'together with; having or carrying', e: 'I went to the park with my friends.', p: 'prep.' },
  'from': { d: 'indicating the starting point of a place, time, or range', e: 'I got a letter from my brother.', p: 'prep.' },
  'up': { d: 'towards a higher position; from a lower to a higher level', e: 'She climbed up the stairs.', p: 'adv.' },
  'out': { d: 'away from the inside of a place', e: 'He walked out of the room.', p: 'adv.' },
  'off': { d: 'away from a place or position; not operating', e: 'Please turn off the lights before you leave.', p: 'adv.' },
  'down': { d: 'towards a lower position; from a higher to a lower level', e: 'She walked down the hill.', p: 'adv.' },
  'into': { d: 'to a position inside something', e: 'She walked into the classroom.', p: 'prep.' },
  'over': { d: 'above or higher than something; across from one side to the other', e: 'The cat jumped over the wall.', p: 'prep.' },
  'about': { d: 'on the subject of; concerning', e: 'Tell me about your family.', p: 'prep.' },
  'after': { d: 'later in time than; following', e: 'We went for a walk after dinner.', p: 'prep.' },
  'between': { d: 'in the space separating two things, people, or places', e: 'The school is between the park and the hospital.', p: 'prep.' },
  'through': { d: 'moving in one side and out of the other side of something', e: 'The train went through the tunnel.', p: 'prep.' },
  'without': { d: 'not having or doing something', e: 'I left home without my umbrella.', p: 'prep.' },
  'under': { d: 'in or to a position below something', e: 'The cat is sleeping under the bed.', p: 'prep.' },
  'above': { d: 'in or to a higher position than something', e: 'The painting hangs above the sofa.', p: 'prep.' },
  'below': { d: 'at a lower level or position than something', e: 'The temperature fell below zero last night.', p: 'prep.' },
  'around': { d: 'on every side of; in the area near a place', e: 'There are many shops around the station.', p: 'prep.' },
  'along': { d: 'from one end to the other of something', e: 'We walked along the river bank.', p: 'prep.' },
  'against': { d: 'in opposition to; touching for support', e: 'She leaned against the wall.', p: 'prep.' },
  'across': { d: 'from one side to the other side of something', e: 'He swam across the river.', p: 'prep.' },
  'behind': { d: 'at the back of; further back than something', e: 'The garden is behind the house.', p: 'prep.' },
  'beyond': { d: 'on the other side of; further than', e: 'The village is just beyond those hills.', p: 'prep.' },
  'near': { d: 'a short distance away from', e: 'Our house is near the school.', p: 'prep.' },
  'than': { d: 'used to compare two things', e: 'She is taller than her brother.', p: 'conj.' },
  'so': { d: 'to such a great extent; therefore; in the same way', e: 'The weather was so hot that we stayed inside.', p: 'adv.' },
  'or': { d: 'used to connect alternatives', e: 'Would you like tea or coffee?', p: 'conj.' },
  'and': { d: 'used to connect words, phrases, or clauses', e: 'Ravi and Priya are good friends.', p: 'conj.' },
  'if': { d: 'on the condition that; whether', e: 'If it rains, I will take an umbrella.', p: 'conj.' },
  'will': { d: 'used to talk about the future or show willingness', e: 'I will call you tomorrow.', p: 'verb' },
  'may': { d: 'used to ask for or give permission; to express possibility', e: 'May I borrow your pen?', p: 'verb' },
  'during': { d: 'throughout the course of a period of time', e: 'I fell asleep during the movie.', p: 'prep.' },
  'do': { d: 'to perform or carry out an action', e: 'I do my homework every evening.', p: 'verb' },
  'does': { d: 'third person singular present of "do"', e: 'She does her work carefully.', p: 'verb' },
  'did': { d: 'past tense of "do"', e: 'He did well in the exam.', p: 'verb' },
  'have': { d: 'to possess, own, or hold; used to form perfect tenses', e: 'I have two sisters.', p: 'verb' },
  'has': { d: 'third person singular present of "have"', e: 'She has a beautiful garden.', p: 'verb' },
  'had': { d: 'past tense of "have"', e: 'They had a wonderful time at the festival.', p: 'verb' },
  'been': { d: 'past participle of "be"', e: 'I have been to Delhi twice.', p: 'verb' },
  'being': { d: 'present participle of "be"; a living creature', e: 'Human beings have the ability to learn new languages.', p: 'n.' },

  // ── Previously fixed words ──
  'should': { d: 'used to say what is the right or correct thing to do', e: 'You should eat more vegetables.', p: 'verb' },
  'could': { d: 'used to say that something was possible or that someone had the ability to do something', e: 'When I was young, I could run very fast.', p: 'verb' },
  'would': { d: 'used to talk about what someone was willing to do or what something was able to do', e: 'She said she would help me with my homework.', p: 'verb' },
  'shall': { d: 'used to express the future tense, a suggestion, or an offer', e: 'Shall we go to the park?', p: 'verb' },
  'might': { d: 'used to express possibility or make a suggestion', e: 'It might rain later, so take an umbrella.', p: 'verb' },
  'must': { d: 'used to say that something is necessary or very important', e: 'You must wear a helmet when riding a bike.', p: 'verb' },
  'born': { d: 'brought into life by birth', e: 'She was born in Mumbai in 1995.', p: 'adj.' },
  'at': { d: 'used to say where someone or something is', e: 'We met at the train station.', p: 'prep.' },
  'by': { d: 'near; beside; through the action of', e: 'The book is by the window.', p: 'prep.' },
  'ah': { d: 'used to express surprise, pleasure, or understanding', e: 'Ah, now I understand what you mean!', p: 'exclam.' },
  'but': { d: 'used to introduce something that is different from or the opposite of what has been said', e: 'I wanted to go, but it was raining.', p: 'conj.' },
  'arms': { d: 'the two long parts of the body between the shoulders and hands', e: 'She crossed her arms and waited.', p: 'n.' },
  'clothes': { d: 'things such as shirts, trousers, etc. that people wear', e: 'She packed her clothes for the trip.', p: 'n.' },
  'become': { d: 'to start to be something', e: 'He wants to become a teacher when he grows up.', p: 'verb' },
  'chose': { d: 'past tense of choose', e: 'I chose the blue shirt instead of the red one.', p: 'verb' },
  'choose': { d: 'to decide which thing you want from two or more things', e: 'You can choose any book from the shelf.', p: 'verb' },
  'drink': { d: 'to take liquid into your body through your mouth', e: 'I drink two glasses of milk every day.', p: 'verb' },
  'drunk': { d: 'having drunk too much alcohol', e: 'He got drunk at the party last night.', p: 'adj.' },
  'broken': { d: 'damaged and no longer working', e: 'The broken window let cold air into the room.', p: 'adj.' },
  'bent': { d: 'not straight; curved', e: 'The bent nail was difficult to remove from the wall.', p: 'adj.' },
  'bus': { d: 'a large vehicle that carries passengers along a fixed route', e: 'I take the bus to school every morning.', p: 'n.' },
  'crew': { d: 'a group of people who work together, especially on a ship or plane', e: 'The crew prepared the aircraft for takeoff.', p: 'n.' },
  'blonde': { d: 'having pale yellow or golden hair', e: 'The blonde girl sat at the front of the class.', p: 'adj.' },
  'driving': { d: 'the activity of operating a vehicle', e: 'She is learning driving at a driving school.', p: 'n.' },
  'drawing': { d: 'a picture made with a pencil or pen', e: 'The child made a beautiful drawing of her family.', p: 'n.' },
  'dancing': { d: 'the activity of moving your body to music', e: 'She enjoys dancing at parties.', p: 'n.' },
  'camping': { d: 'the activity of staying in a tent for a holiday', e: 'We went camping near the lake last summer.', p: 'n.' },
  'breathing': { d: 'the process of taking air into and out of the lungs', e: 'Deep breathing can help you relax.', p: 'n.' },
  'clothing': { d: 'clothes, especially a particular type of clothes', e: 'Warm clothing is essential for winter.', p: 'n.' },
  'boring': { d: 'not interesting or exciting', e: 'The movie was so boring that I fell asleep.', p: 'adj.' },
  'bored': { d: 'feeling tired and unhappy because something is not interesting', e: 'I was bored during the long lecture.', p: 'adj.' },
  'amazing': { d: 'very surprising and impressive', e: 'The view from the mountain was amazing.', p: 'adj.' },
  'annoying': { d: 'making you feel slightly angry or impatient', e: 'The annoying noise from next door kept me awake.', p: 'adj.' },
  'complicated': { d: 'consisting of many different parts or steps and difficult to understand', e: 'The instructions were too complicated for me to follow.', p: 'adj.' },
  'concerned': { d: 'worried about something', e: 'Her parents were concerned about her health.', p: 'adj.' },
  'connected': { d: 'joined or linked together', e: 'The two rooms are connected by a hallway.', p: 'adj.' },
  'depressed': { d: 'feeling very sad and without hope', e: 'He felt depressed after losing his job.', p: 'adj.' },
  'depressing': { d: 'making you feel sad and without hope', e: 'The news about the floods was very depressing.', p: 'adj.' },
  'delighted': { d: 'very pleased and happy', e: 'She was delighted to receive the award.', p: 'adj.' },
  'disappointing': { d: 'not as good as you hoped', e: 'The exam results were disappointing for many students.', p: 'adj.' },
  'divorced': { d: 'no longer married', e: 'Her parents got divorced when she was ten.', p: 'adj.' },
  'educated': { d: 'having had a good education', e: 'She is a well-educated woman with two degrees.', p: 'adj.' },
  'aged': { d: 'of the age of', e: 'The competition is for children aged 8 to 12.', p: 'adj.' },
  'advertising': { d: 'the activity of producing advertisements', e: 'She works in advertising for a big company.', p: 'n.' },
  'associated': { d: 'connected with something', e: 'The disease is associated with poor diet.', p: 'adj.' },
  'cancelled': { d: 'no longer going to happen', e: 'The flight was cancelled due to bad weather.', p: 'adj.' },
  'cancel': { d: 'to decide that something planned will not happen', e: 'I had to cancel my appointment with the dentist.', p: 'verb' },
  'coloured': { d: 'having a particular colour or colours', e: 'She wore a brightly coloured dress to the party.', p: 'adj.' },
  'colour': { d: 'the quality that makes things look red, blue, green, etc.', e: 'What colour is your new car?', p: 'n.' },
  'centre': { d: 'the middle point or part of something', e: 'The shopping centre is in the centre of town.', p: 'n.' },
  'critic': { d: 'a person who gives their opinion about something', e: 'The film critic gave the movie four stars.', p: 'n.' },
  'detailed': { d: 'giving a lot of information with many details', e: 'She gave a detailed description of the suspect.', p: 'adj.' },
  'curved': { d: 'having a smooth round shape', e: 'The road followed a curved path through the hills.', p: 'adj.' },
  'committed': { d: 'willing to give your time and energy to something', e: 'She is committed to helping the community.', p: 'adj.' },
  'commit': { d: 'to do something wrong or illegal', e: 'He was accused of committing a crime.', p: 'verb' },
  'cafe': { d: 'a small restaurant where you can buy drinks and simple meals', e: 'We had coffee at a small cafe near the park.', p: 'n.' },
  'cake': { d: 'a sweet food made from flour, eggs, sugar, and butter', e: 'She baked a chocolate cake for the party.', p: 'n.' },
  'dominate': { d: 'to have control over a place or person', e: 'The castle dominates the landscape.', p: 'verb' },
};

let fixed = 0;
let cleared = 0;

// Apply manual fixes first
for (const [word, fix] of Object.entries(MANUAL_FIXES)) {
  if (defs[word]) {
    defs[word] = fix;
    fixed++;
  }
}

// Now scan remaining and clear examples that don't contain the word
for (const [word, entry] of Object.entries(defs)) {
  if (!entry.e) continue;
  if (MANUAL_FIXES[word]) continue; // Already fixed
  
  if (!wordAppearsIn(word, entry.e)) {
    // Clear the example - keep definition
    entry.e = '';
    cleared++;
  }
}

console.log(`Manual fixes applied: ${fixed}`);
console.log(`Examples cleared (word not found): ${cleared}`);

// Verify: count remaining mismatches
let remaining = 0;
for (const [word, entry] of Object.entries(defs)) {
  if (entry.e && !wordAppearsIn(word, entry.e)) {
    remaining++;
    if (remaining <= 10) console.log(`  Still mismatched: ${word}: "${entry.e.substring(0, 80)}"`);
  }
}
console.log(`Remaining mismatches: ${remaining}`);

// Write back
fs.writeFileSync(DEFS_PATH, JSON.stringify(defs), 'utf-8');
console.log('✓ Updated word-definitions.json');
