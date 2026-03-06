#!/usr/bin/env node
/**
 * Final cleanup: re-fetches missing/short/mismatched definitions.
 * Targets ~130 words — takes ~1 minute.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const defs = JSON.parse(readFileSync(join(ROOT, 'src/content/word-definitions.json'), 'utf-8'));
const ox3000 = JSON.parse(readFileSync(join(ROOT, 'src/content/oxford-3000.json'), 'utf-8'));
const ox5000 = JSON.parse(readFileSync(join(ROOT, 'src/content/oxford-5000-extra.json'), 'utf-8'));

// ── Build Oxford POS map ──
function cleanWord(w) { return w.split(/[,/]/)[0].trim().toLowerCase(); }

const oxPosMap = {};
for (const entry of [...ox3000, ...ox5000]) {
  const w = cleanWord(entry.word);
  if (!oxPosMap[w]) oxPosMap[w] = [];
  const pos = entry.pos;
  if (pos.includes('n.') && !oxPosMap[w].includes('noun')) oxPosMap[w].push('noun');
  if (pos.includes('v.') && !oxPosMap[w].includes('verb')) oxPosMap[w].push('verb');
  if (pos.includes('adj.') && !oxPosMap[w].includes('adjective')) oxPosMap[w].push('adjective');
  if (pos.includes('adv.') && !oxPosMap[w].includes('adverb')) oxPosMap[w].push('adverb');
  if (pos.includes('prep.') && !oxPosMap[w].includes('preposition')) oxPosMap[w].push('preposition');
  if (pos.includes('conj.') && !oxPosMap[w].includes('conjunction')) oxPosMap[w].push('conjunction');
  if (pos.includes('pron.') && !oxPosMap[w].includes('pronoun')) oxPosMap[w].push('pronoun');
  if (pos.includes('det.') && !oxPosMap[w].includes('determiner')) oxPosMap[w].push('determiner');
}

// ── Manual overrides for tricky multi-sense words & short defs ──
const MANUAL = {
  // Multi-sense words missing from the dictionary
  "all right": { d: "Satisfactory; acceptable; in a satisfactory way.", e: "Are you all right?", p: "adjective" },
  bank: { d: "An institution where people can save, borrow, and exchange money.", e: "I need to go to the bank to withdraw some cash.", p: "noun" },
  bear: { d: "A large, heavy mammal with thick fur and a short tail.", e: "We saw a bear in the forest during our trek.", p: "noun" },
  can: { d: "To be able to; to have the ability or possibility to do something.", e: "She can speak three languages.", p: "verb" },
  content: { d: "In a state of peaceful happiness; satisfied.", e: "He felt content with his simple life.", p: "adjective" },
  do: { d: "To perform or carry out an action or activity.", e: "What do you do for a living?", p: "verb" },
  expert: { d: "A person who has a very high level of knowledge or skill in a particular subject.", e: "She is an expert in computer science.", p: "noun" },
  kind: { d: "Generous, helpful, and caring about other people.", e: "She is always kind to everyone.", p: "adjective" },
  last: { d: "Coming after all others in time or order; most recent.", e: "I saw her last week.", p: "adjective" },
  lead: { d: "To guide or direct someone or a group; to be in charge.", e: "She was chosen to lead the team.", p: "verb" },
  lie: { d: "To be in or move into a horizontal position on a surface.", e: "He likes to lie on the grass and read.", p: "verb" },
  like: { d: "To find pleasant or attractive; to enjoy.", e: "I like reading books in the evening.", p: "verb" },
  match: { d: "A contest or game in which people or teams compete against each other.", e: "India won the cricket match yesterday.", p: "noun" },
  mine: { d: "Used to refer to something belonging to or associated with the speaker.", e: "That blue bag is mine.", p: "pronoun" },
  minute: { d: "A period of time equal to sixty seconds.", e: "The train leaves in five minutes.", p: "noun" },
  nor: { d: "Used to introduce a further negative statement.", e: "He neither called nor sent a message.", p: "conjunction" },
  out: { d: "Moving or appearing to move away from a particular place.", e: "She went out to buy groceries.", p: "adverb" },
  pension: { d: "A regular payment made to a retired person from a fund they contributed to during their working life.", e: "He receives a pension from the government.", p: "noun" },
  plus: { d: "With the addition of.", e: "Two plus three equals five.", p: "preposition" },
  race: { d: "A competition between people, animals, or vehicles to see which is fastest.", e: "She won the 100-metre race.", p: "noun" },
  refuse: { d: "To say that you will not do or accept something.", e: "He refused to answer the question.", p: "verb" },
  rest: { d: "To cease work or movement in order to relax or recover strength.", e: "You should rest after the long journey.", p: "verb" },
  ring: { d: "A small circular band worn on a finger as an ornament or a sign of marriage.", e: "She wore a beautiful gold ring.", p: "noun" },
  row: { d: "A number of people or things in a line.", e: "The students sat in the front row.", p: "noun" },
  set: { d: "To put something in a specified place or position.", e: "She set the plates on the table.", p: "verb" },
  stick: { d: "A thin piece of wood that has fallen or been cut from a tree.", e: "The children collected sticks for the bonfire.", p: "noun" },
  tear: { d: "A drop of clear salty liquid produced from the eyes when crying.", e: "Tears rolled down her cheeks.", p: "noun" },
  throughout: { d: "In or to every part of a place or period of time.", e: "The festival is celebrated throughout India.", p: "preposition" },
  till: { d: "Up to the point in time mentioned; until.", e: "Wait here till I come back.", p: "preposition" },
  until: { d: "Up to the point in time or event mentioned.", e: "I will wait until you arrive.", p: "preposition" },
  used: { d: "Accustomed to; familiar with through experience.", e: "I'm used to waking up early.", p: "adjective" },
  what: { d: "Asking for information about something.", e: "What is your favourite colour?", p: "pronoun" },
  which: { d: "Asking for information specifying one or more from a set.", e: "Which train should we take?", p: "pronoun" },
  wind: { d: "The natural movement of air, especially outdoors.", e: "The wind blew the leaves off the trees.", p: "noun" },
  bass: { d: "The lowest adult male singing voice.", e: "He sings bass in the choir.", p: "noun" },
  bow: { d: "A curved weapon for shooting arrows, or a knot tied with two loops.", e: "She tied the ribbon in a bow.", p: "noun" },
  counter: { d: "A long flat surface over which goods are sold or food is served.", e: "She placed the money on the counter.", p: "noun" },
  grave: { d: "A place where a dead person is buried.", e: "They visited the grave of their grandfather.", p: "noun" },
  recount: { d: "To tell someone about something; to describe an experience.", e: "He recounted his adventures in the mountains.", p: "verb" },
  strip: { d: "A long, narrow piece of cloth, paper, or other material.", e: "Cut the paper into thin strips.", p: "noun" },

  // Short definitions that need expanding
  everybody: { d: "Every person; all the people in a group or in general.", e: "Everybody enjoyed the party.", p: "pronoun" },
  everyone: { d: "Every person; all the people in a group or in general.", e: "Everyone is welcome to attend the event.", p: "pronoun" },
  famous: { d: "Known about by many people; widely recognised and admired.", e: "The Taj Mahal is one of the most famous buildings in the world.", p: "adjective" },
  in: { d: "Expressing the situation of being enclosed or surrounded by something.", e: "She is in the kitchen.", p: "preposition" },
  nurse: { d: "A person trained to care for the sick or injured, especially in a hospital.", e: "The nurse checked the patient's temperature.", p: "noun" },
  off: { d: "Away from a place or position; no longer attached or connected.", e: "Please take your shoes off before entering.", p: "adverb" },
  on: { d: "Physically in contact with and supported by a surface.", e: "The book is on the table.", p: "preposition" },
  "o'clock": { d: "Used after a number from one to twelve to indicate the hour.", e: "The meeting starts at three o'clock.", p: "adverb" },
  pencil: { d: "A thin instrument used for writing or drawing, made of graphite enclosed in wood.", e: "Write your answer in pencil.", p: "noun" },
  twice: { d: "Two times; on two occasions or in double the amount.", e: "I've been to Goa twice.", p: "adverb" },
  ad: { d: "An advertisement; a notice or announcement promoting a product or event.", e: "I saw an ad for the new phone.", p: "noun" },
  flu: { d: "A common infectious illness causing fever, aches, and weakness.", e: "She stayed home because she had the flu.", p: "noun" },
  kid: { d: "A child or young person.", e: "The kids are playing in the garden.", p: "noun" },
  nowhere: { d: "Not in or to any place; not anywhere.", e: "There was nowhere to sit on the crowded bus.", p: "adverb" },
  oil: { d: "A thick liquid used for cooking, fuel, or lubrication.", e: "Heat some oil in the pan before adding the onions.", p: "noun" },
  pleased: { d: "Feeling or showing pleasure and satisfaction.", e: "I'm pleased to meet you.", p: "adjective" },
  vegetable: { d: "A plant or part of a plant used as food, such as a potato, carrot, or tomato.", e: "You should eat more fresh vegetables.", p: "noun" },
  dust: { d: "Fine, dry powder consisting of tiny particles of earth or waste matter.", e: "There was a layer of dust on the furniture.", p: "noun" },
  involved: { d: "Connected or concerned with someone or something; taking part.", e: "She was involved in organising the school event.", p: "adjective" },
  surely: { d: "Without doubt; certainly; used to express confidence.", e: "Surely you don't believe that!", p: "adverb" },
  tiny: { d: "Extremely small in size or amount.", e: "The baby had tiny little fingers.", p: "adjective" },
  plain: { d: "Not decorated or elaborate; simple in character or appearance.", e: "She prefers plain clothes without patterns.", p: "adjective" },
  representative: { d: "A person chosen to act or speak on behalf of a wider group.", e: "She is the class representative.", p: "noun" },
  unpleasant: { d: "Causing discomfort or unhappiness; disagreeable.", e: "There was an unpleasant smell from the kitchen.", p: "adjective" },
  amusing: { d: "Causing laughter and providing entertainment; funny.", e: "He told an amusing story about his childhood.", p: "adjective" },
  failed: { d: "Not achieving the desired outcome; unsuccessful.", e: "The experiment was a failed attempt.", p: "adjective" },
  gender: { d: "The state of being male or female, often with reference to social and cultural differences.", e: "Gender equality is an important issue.", p: "noun" },
  info: { d: "Facts or details about a person, subject, or event; information.", e: "You can find more info on our website.", p: "noun" },
  lyric: { d: "The words of a song.", e: "She knows the lyrics to every Bollywood song.", p: "noun" },
  burden: { d: "A heavy load that is difficult to carry; a duty or responsibility that causes worry.", e: "He didn't want to be a burden on his family.", p: "noun" },
  convict: { d: "To declare someone guilty of a criminal offence in a court of law.", e: "The jury convicted him of fraud.", p: "verb" },
  endless: { d: "Having or seeming to have no end or limit.", e: "The possibilities are endless.", p: "adjective" },
  hopeful: { d: "Feeling or inspiring optimism about a future event.", e: "She is hopeful about getting the job.", p: "adjective" },
  interim: { d: "Relating to or being a temporary arrangement; provisional.", e: "An interim report will be submitted next week.", p: "adjective" },
  nonetheless: { d: "In spite of that; nevertheless; however.", e: "The task was difficult; nonetheless, she completed it.", p: "adverb" },
  vice: { d: "Immoral or wicked behaviour; a bad habit.", e: "Smoking is his only vice.", p: "noun" },
};

// ── Apply manual overrides ──
let manualCount = 0;
for (const [word, fix] of Object.entries(MANUAL)) {
  defs[word] = fix;
  manualCount++;
}
console.log(`Applied ${manualCount} manual fixes`);

// ── Re-fetch remaining POS mismatches from API ──
const BLOCKLIST = /penis|breasts|sex with|sexual intercourse|genitals|erotic|orgasm|ejacul|circumcis|buttocks|prostitut/i;
const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DELAY_MS = 450;

const needsRefetch = [];
for (const [word, info] of Object.entries(defs)) {
  if (MANUAL[word]) continue;
  if (!info.d) { needsRefetch.push(word); continue; }
  const exp = oxPosMap[word] || [];
  if (exp.length > 0 && !exp.includes(info.p)) needsRefetch.push(word);
}

console.log(`Words to re-fetch from API: ${needsRefetch.length}`);

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchBetterDef(word, preferredPos) {
  try {
    const res = await fetch(API + encodeURIComponent(word), { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) return null;

    let bestDef = '', bestExample = '', bestPos = '';
    let fallbackDef = '', fallbackExample = '', fallbackPos = '';

    for (const entry of data) {
      for (const meaning of entry.meanings || []) {
        const isPreferred = preferredPos.length === 0 || preferredPos.includes(meaning.partOfSpeech);
        for (const def of meaning.definitions || []) {
          if (!def.definition || BLOCKLIST.test(def.definition) || def.definition.length < 10) continue;
          if (isPreferred && !bestDef) {
            bestDef = def.definition;
            bestPos = meaning.partOfSpeech || '';
            bestExample = def.example || '';
          }
          if (!fallbackDef) {
            fallbackDef = def.definition;
            fallbackPos = meaning.partOfSpeech || '';
            fallbackExample = def.example || '';
          }
          if (isPreferred && bestDef && !bestExample && def.example) bestExample = def.example;
          if (bestDef && bestExample) break;
        }
        if (bestDef && bestExample) break;
      }
      if (bestDef && bestExample) break;
    }

    const d = bestDef || fallbackDef;
    if (!d) return null;
    return { d, e: (bestDef ? bestExample : fallbackExample) || '', p: bestDef ? bestPos : fallbackPos };
  } catch { return null; }
}

let fixed = 0, failed = 0;
for (let i = 0; i < needsRefetch.length; i++) {
  const word = needsRefetch[i];
  const preferred = oxPosMap[word] || [];
  const result = await fetchBetterDef(word, preferred);
  if (result) { defs[word] = result; fixed++; }
  else failed++;

  if ((i + 1) % 20 === 0 || i === needsRefetch.length - 1) {
    writeFileSync(join(ROOT, 'src/content/word-definitions.json'), JSON.stringify(defs, null, 0), 'utf-8');
    console.log(`[${i + 1}/${needsRefetch.length}] fixed: ${fixed}, failed: ${failed}`);
  }
  await sleep(DELAY_MS);
}

writeFileSync(join(ROOT, 'src/content/word-definitions.json'), JSON.stringify(defs, null, 0), 'utf-8');
console.log(`\nDone! Manual: ${manualCount}, API: ${fixed}, failed: ${failed}`);
console.log(`Total: ${Object.values(defs).filter(v => v.d).length} definitions`);
