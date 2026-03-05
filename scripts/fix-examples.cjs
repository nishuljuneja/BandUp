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
