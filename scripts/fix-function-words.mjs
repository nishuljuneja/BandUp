/**
 * Fix function-word definitions (pronouns, determiners, modals, prepositions, etc.)
 * that were incorrectly fetched from the Free Dictionary API.
 * Also fixes content words with programming/math jargon definitions.
 */
import { readFileSync, writeFileSync } from 'fs';

const PATH = 'src/content/word-definitions.json';
const defs = JSON.parse(readFileSync(PATH, 'utf-8'));

// Manual overrides — correct definitions for function words and jargon-affected words
const overrides = {
  // ── Pronouns ──
  he:    { d: "Used to refer to a man or boy previously mentioned or easily identified.", e: "He went to the store.", p: "pronoun" },
  she:   { d: "Used to refer to a woman or girl previously mentioned or easily identified.", e: "She is my sister.", p: "pronoun" },
  it:    { d: "Used to refer to a thing previously mentioned or easily identified.", e: "It is raining outside.", p: "pronoun" },
  we:    { d: "Used by a speaker to refer to himself or herself and one or more other people.", e: "We are going to the park.", p: "pronoun" },
  they:  { d: "Used to refer to two or more people or things previously mentioned or easily identified.", e: "They arrived early.", p: "pronoun" },
  me:    { d: "Used by a speaker to refer to himself or herself as the object of a verb or preposition.", e: "She gave me a book.", p: "pronoun" },
  him:   { d: "Used as the object of a verb or preposition to refer to a male person previously mentioned.", e: "I told him the news.", p: "pronoun" },
  us:    { d: "Used as the object of a verb or preposition to refer to the speaker together with other people.", e: "She invited us to dinner.", p: "pronoun" },
  them:  { d: "Used as the object of a verb or preposition to refer to two or more people or things previously mentioned.", e: "I saw them at the market.", p: "pronoun" },
  who:   { d: "What or which person or people; used to introduce a clause giving more information about a person.", e: "Who is that?", p: "pronoun" },
  whom:  { d: "Used instead of 'who' as the object of a verb or preposition.", e: "To whom did you speak?", p: "pronoun" },
  whose: { d: "Belonging to or associated with which person; of whom or which.", e: "Whose bag is this?", p: "pronoun" },
  which: { d: "Asking for information specifying one or more people or things from a set.", e: "Which one do you want?", p: "pronoun" },
  what:  { d: "Asking for information about something; the thing or things that.", e: "What is your name?", p: "pronoun" },

  // ── Determiners / Possessives ──
  his:    { d: "Belonging to or associated with a male person or animal previously mentioned.", e: "His car is parked outside.", p: "determiner" },
  her:    { d: "Belonging to or associated with a female person or animal previously mentioned.", e: "Her dress is beautiful.", p: "determiner" },
  hers:   { d: "Used to refer to a thing or things belonging to or associated with a female person previously mentioned.", e: "The red coat is hers.", p: "pronoun" },
  its:    { d: "Belonging to or associated with a thing previously mentioned or easily identified.", e: "The dog wagged its tail.", p: "determiner" },
  my:     { d: "Belonging to or associated with the speaker.", e: "My name is Alex.", p: "determiner" },
  mine:   { d: "Used to refer to a thing or things belonging to or associated with the speaker.", e: "That book is mine.", p: "pronoun" },
  our:    { d: "Belonging to or associated with the speaker and one or more other people.", e: "Our house is on the corner.", p: "determiner" },
  ours:   { d: "Used to refer to a thing or things belonging to or associated with the speaker and one or more other people.", e: "This garden is ours.", p: "pronoun" },
  your:   { d: "Belonging to or associated with the person or people that the speaker is addressing.", e: "Is this your pen?", p: "determiner" },
  yours:  { d: "Used to refer to a thing or things belonging to or associated with the person being addressed.", e: "This seat is yours.", p: "pronoun" },
  their:  { d: "Belonging to or associated with the people or things previously mentioned.", e: "Their house is very big.", p: "determiner" },
  theirs: { d: "Used to refer to a thing or things belonging to or associated with two or more people previously mentioned.", e: "The choice was theirs.", p: "pronoun" },
  the:    { d: "Used before a noun to refer to a specific or previously mentioned person, place, or thing.", e: "The sun is shining.", p: "determiner" },
  a:      { d: "Used before a noun to refer to someone or something for the first time or to indicate one of a particular group.", e: "She is a teacher.", p: "determiner" },
  an:     { d: "Used before a word beginning with a vowel sound, same meaning as 'a'.", e: "He ate an apple.", p: "determiner" },
  this:   { d: "Used to identify a specific person or thing close at hand or being experienced.", e: "This book is interesting.", p: "determiner" },
  that:   { d: "Used to identify a specific person or thing observed by the speaker; also used to introduce a clause.", e: "That was a great movie.", p: "determiner" },
  these:  { d: "Used to identify specific people or things close at hand (plural of 'this').", e: "These shoes are comfortable.", p: "determiner" },
  those:  { d: "Used to identify specific people or things at a distance (plural of 'that').", e: "Those mountains are beautiful.", p: "determiner" },
  every:  { d: "Used to refer to all the individual members of a group without exception.", e: "Every student passed the exam.", p: "determiner" },
  each:   { d: "Used to refer to every one of two or more people or things, regarded separately.", e: "Each child received a gift.", p: "determiner" },
  all:    { d: "Used to refer to the whole quantity or extent of a group or thing.", e: "All the students were present.", p: "determiner" },
  both:   { d: "Used to refer to two people or things, regarded and identified together.", e: "Both answers are correct.", p: "determiner" },
  some:   { d: "An unspecified amount or number of something.", e: "Would you like some water?", p: "determiner" },
  any:    { d: "Used to refer to one or some of a thing, no matter how much or how many.", e: "Do you have any questions?", p: "determiner" },
  no:     { d: "Not any; used to indicate that something is absent or not permitted.", e: "There is no milk left.", p: "determiner" },
  other:  { d: "Used to refer to a person or thing that is different from one already mentioned or known.", e: "Do you have any other questions?", p: "adjective" },
  another: { d: "Used to refer to an additional person or thing of the same type.", e: "Would you like another cup of tea?", p: "determiner" },
  such:   { d: "Of the type previously mentioned or about to be mentioned; to so great a degree.", e: "I have never seen such beauty.", p: "determiner" },

  // ── Modal verbs ──
  will:   { d: "Used to express the future tense or indicate willingness and intention.", e: "I will call you tomorrow.", p: "verb" },
  would:  { d: "Past tense of 'will'; used to indicate a conditional action, make polite requests, or talk about habits in the past.", e: "I would help if I could.", p: "verb" },
  shall:  { d: "Used to express the future tense, especially in formal contexts, or to make suggestions.", e: "Shall we go?", p: "verb" },
  should: { d: "Used to indicate obligation, duty, or correctness; also used to express expectation.", e: "You should study harder.", p: "verb" },
  may:    { d: "Used to express possibility or to ask for or give permission.", e: "It may rain later.", p: "verb" },
  might:  { d: "Past tense of 'may'; used to express possibility, especially a smaller chance.", e: "She might come to the party.", p: "verb" },
  must:   { d: "Used to indicate that something is necessary, very important, or certain.", e: "You must wear a seatbelt.", p: "verb" },
  can:    { d: "Used to say that someone is able to do something or that something is possible.", e: "She can speak three languages.", p: "verb" },
  could:  { d: "Past tense of 'can'; used to indicate possibility or to make polite requests.", e: "Could you help me?", p: "verb" },
  ought:  { d: "Used to indicate duty, correctness, or what is advisable (usually followed by 'to').", e: "You ought to apologize.", p: "verb" },

  // ── Common prepositions / adverbs with wrong POS or def ──
  up:     { d: "Toward a higher place or position; from a lower to a higher point.", e: "She climbed up the hill.", p: "adverb" },
  down:   { d: "Toward or in a lower place or position; from a higher to a lower point.", e: "He walked down the stairs.", p: "adverb" },
  off:    { d: "Away from a place or position; so as to be removed or separated.", e: "She took off her coat.", p: "adverb" },
  out:    { d: "Moving or appearing to move away from a particular place, especially one that is enclosed.", e: "He went out of the room.", p: "adverb" },
  into:   { d: "Expressing movement or action with the result that someone or something becomes enclosed or surrounded.", e: "She walked into the room.", p: "preposition" },
  onto:   { d: "Moving to a position on the surface of something.", e: "The cat jumped onto the table.", p: "preposition" },
  of:     { d: "Expressing the relationship between a part and a whole; belonging to; connected with.", e: "A cup of tea.", p: "preposition" },
  by:     { d: "Indicating the means of achieving something; near or beside; not later than.", e: "The book was written by her.", p: "preposition" },
  for:    { d: "Intended to belong to or be used by; having as a purpose or reason.", e: "This gift is for you.", p: "preposition" },
  to:     { d: "Expressing motion in the direction of something; used before a verb to form the infinitive.", e: "She went to school.", p: "preposition" },
  from:   { d: "Indicating the point in space or time at which a journey, process, or action starts.", e: "He traveled from London to Paris.", p: "preposition" },
  at:     { d: "Expressing location or arrival in a particular place or position.", e: "She is at home.", p: "preposition" },
  in:     { d: "Expressing the situation of being enclosed or surrounded by something; during a period of time.", e: "She lives in London.", p: "preposition" },
  on:     { d: "Physically in contact with and supported by a surface; about a particular topic.", e: "The book is on the table.", p: "preposition" },
  with:   { d: "Accompanied by; in the company of; having or possessing.", e: "She came with her friend.", p: "preposition" },
  about:  { d: "On the subject of; concerning; approximately.", e: "Tell me about yourself.", p: "preposition" },

  // ── Conjunctions ──
  or:     { d: "Used to link alternatives or different possibilities.", e: "Would you like tea or coffee?", p: "conjunction" },
  if:     { d: "On the condition or supposition that; in the event that.", e: "If it rains, we will stay inside.", p: "conjunction" },
  when:   { d: "At what time; at the time that; considering that.", e: "When did you arrive?", p: "adverb" },
  while:  { d: "During the time that; at the same time as.", e: "I read while waiting for the bus.", p: "conjunction" },
  where:  { d: "In or to what place or position.", e: "Where do you live?", p: "adverb" },
  because:{ d: "For the reason that; since.", e: "I stayed home because it was raining.", p: "conjunction" },

  // ── Adverbs with wrong def ──
  only:   { d: "No more than; solely; just.", e: "I only have five minutes.", p: "adverb" },
  yes:    { d: "Used to give an affirmative response or to express agreement.", e: "Yes, I agree with you.", p: "exclamation" },
  not:    { d: "Used to form a negative phrase after verbs like 'do', 'be', 'have', and modals.", e: "She is not coming.", p: "adverb" },
  how:    { d: "In what way or manner; to what extent or degree.", e: "How are you?", p: "adverb" },
  why:    { d: "For what reason or purpose.", e: "Why did you leave?", p: "adverb" },
  here:   { d: "In, at, or to this place or position.", e: "Come here, please.", p: "adverb" },
  there:  { d: "In, at, or to that place or position.", e: "Put it over there.", p: "adverb" },

  // ── Content words with jargon definitions ──
  method:  { d: "A particular procedure for accomplishing or approaching something, especially a systematic or established one.", e: "We need a new method to solve this problem.", p: "noun" },
  concept: { d: "An abstract idea or a general notion.", e: "The concept of freedom is important.", p: "noun" },
  exit:    { d: "A way out of a building, room, or vehicle; to go out of or leave a place.", e: "Please use the emergency exit.", p: "noun" },
  compile: { d: "To produce a list or book by assembling information collected from other sources.", e: "She compiled a list of all the participants.", p: "verb" },
  logic:   { d: "Reasoning conducted according to strict principles of validity; a system of reasoning.", e: "His argument lacked logic.", p: "noun" },
  fan:     { d: "A person who has a strong interest in or admiration for a particular person, sport, or art form.", e: "She is a big fan of cricket.", p: "noun" },
};

let fixCount = 0;
for (const [word, fix] of Object.entries(overrides)) {
  const old = defs[word];
  if (!old) {
    console.log(`  NEW: ${word}`);
  } else {
    const changed = old.d !== fix.d || old.p !== fix.p;
    if (changed) {
      console.log(`  FIX: ${word} [${old.p} → ${fix.p}]: "${old.d.substring(0, 50)}" → "${fix.d.substring(0, 50)}"`);
    } else {
      console.log(`  OK:  ${word} (already correct)`);
      continue;
    }
  }
  defs[word] = fix;
  fixCount++;
}

// Normalize any remaining abbreviated POS values
let posFixCount = 0;
const posNorm = { 'det.': 'determiner', 'prep.': 'preposition', 'adj.': 'adjective', 'adv.': 'adverb', 'n.': 'noun', 'v.': 'verb', 'conj.': 'conjunction', 'pron.': 'pronoun', 'excl.': 'exclamation' };
for (const [word, info] of Object.entries(defs)) {
  if (posNorm[info.p]) {
    defs[word].p = posNorm[info.p];
    posFixCount++;
  }
}

writeFileSync(PATH, JSON.stringify(defs, null, 2), 'utf-8');
console.log(`\nDone: ${fixCount} definitions fixed, ${posFixCount} POS values normalized.`);
console.log(`Total entries: ${Object.keys(defs).length}`);
