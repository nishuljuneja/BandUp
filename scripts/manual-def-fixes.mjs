/**
 * Manual corrections for common words that still have
 * wrong / archaic / obscure definitions after the API re-fetch.
 *
 * Run:  node scripts/manual-def-fixes.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFS_PATH = join(__dirname, '..', 'src', 'content', 'word-definitions.json');
const defs = JSON.parse(readFileSync(DEFS_PATH, 'utf8'));

const fixes = {
  celebrity: {
    d: 'A famous person, especially in entertainment or sport.',
    p: 'noun',
  },
  computer: {
    d: 'An electronic device that can store, retrieve, and process data.',
    p: 'noun',
  },
  bad: {
    d: 'Of poor quality or a low standard; not good.',
    p: 'adjective',
  },
  drive: {
    d: 'To operate and control a motor vehicle or to travel in one.',
    p: 'verb',
  },
  country: {
    d: 'A nation with its own government, occupying a particular territory.',
    p: 'noun',
  },
  deep: {
    d: 'Extending far down from the top or surface; having great depth.',
    p: 'adjective',
  },
  draw: {
    d: 'To produce a picture or diagram by making lines and marks on paper with a pencil or pen.',
    p: 'verb',
  },
  check: {
    d: 'To examine something in order to determine its accuracy, quality, or condition.',
    p: 'verb',
  },
  cover: {
    d: 'To place something over or in front of something in order to protect or hide it.',
    p: 'verb',
  },
  cross: {
    d: 'To go or extend across or to the other side of something.',
    p: 'verb',
  },
  cut: {
    d: 'To use a sharp instrument to divide something into pieces or to make an opening in it.',
    p: 'verb',
  },
  change: {
    d: 'To make or become different; to alter or modify.',
    p: 'verb',
  },
  hot: {
    d: 'Having a high temperature; producing or giving off heat.',
    p: 'adjective',
  },
  old: {
    d: 'Having lived for a long time; no longer young; having existed for a long time.',
    p: 'adjective',
  },
  all: {
    d: 'Used to refer to the whole quantity or extent of something; every one of.',
    p: 'determiner',
  },
  fast: {
    d: 'Moving or capable of moving at high speed; happening quickly.',
    p: 'adjective',
  },
  fresh: {
    d: 'Recently made or obtained; not stale, tinned, or frozen.',
    p: 'adjective',
  },
  box: {
    d: 'A container with a flat base and sides, typically square or rectangular, with a lid.',
    p: 'noun',
  },
  dead: {
    d: 'No longer alive; having died.',
    p: 'adjective',
  },
  forward: {
    d: 'In the direction that one is facing or travelling; towards the front.',
    p: 'adverb',
  },
  general: {
    d: 'Affecting or concerning all or most people or things; widespread; not limited.',
    p: 'adjective',
  },
  give: {
    d: 'To freely transfer the possession of something to someone; to hand over.',
    p: 'verb',
  },
  go: {
    d: 'To move from one place to another; to travel or proceed.',
    p: 'verb',
  },
  good: {
    d: 'Of a high quality, standard, or level; satisfactory; pleasant.',
    p: 'adjective',
  },
  house: {
    d: 'A building for people to live in, usually for one family.',
    p: 'noun',
  },
  sign: {
    d: 'A notice giving information, directions, or a warning; a gesture or action used to convey meaning.',
    p: 'noun',
  },
  academic: {
    d: 'Relating to education and scholarship, especially at a school or university.',
    p: 'adjective',
  },
  build: {
    d: 'To construct something by putting parts or materials together.',
    p: 'verb',
  },
  even: {
    d: 'Flat and smooth; equal in number, amount, or value; used to emphasise something surprising.',
    p: 'adjective',
  },
  intimate: {
    d: 'Very close and familiar; having a warm personal relationship.',
    p: 'adjective',
  },
  narrow: {
    d: 'Of small width in relation to length; not wide.',
    p: 'adjective',
  },
  find: {
    d: 'To discover or perceive by chance or unexpectedly; to locate something that was lost.',
    p: 'verb',
  },
  fit: {
    d: 'Of a suitable quality, standard, or type to meet the required purpose; in good health.',
    p: 'adjective',
  },
  flat: {
    d: 'Having a level surface; without raised areas or indentations; smooth and even.',
    p: 'adjective',
  },
  free: {
    d: 'Not under the control or in the power of another; able to act as one wishes; costing nothing.',
    p: 'adjective',
  },
  hold: {
    d: 'To grasp, carry, or support with your hands or arms; to keep in a specified position.',
    p: 'verb',
  },
  miss: {
    d: 'To fail to hit, reach, or come into contact with something; to feel sadness at the absence of someone.',
    p: 'verb',
  },
  right: {
    d: 'Morally good, justified, or acceptable; true or correct as a fact; on the opposite side from left.',
    p: 'adjective',
  },
  run: {
    d: 'To move at a speed faster than walking, with both feet off the ground at regular intervals.',
    p: 'verb',
  },
  save: {
    d: 'To keep safe or rescue someone or something from harm or danger; to keep money for future use.',
    p: 'verb',
  },
  serve: {
    d: 'To perform duties or services for; to present food or drink to someone.',
    p: 'verb',
  },
  show: {
    d: 'To make something visible; to display or exhibit; to demonstrate or explain.',
    p: 'verb',
  },
  spring: {
    d: 'The season after winter and before summer, when plants begin to grow.',
    p: 'noun',
  },
  stand: {
    d: 'To be in or rise to an upright position on the feet.',
    p: 'verb',
  },
  strike: {
    d: 'To hit forcibly and deliberately; to refuse to work as a form of organised protest.',
    p: 'verb',
  },
  turn: {
    d: 'To move in a circular direction or to face a different direction; to change position.',
    p: 'verb',
  },
  type: {
    d: 'A category of people or things having common characteristics; a kind or sort.',
    p: 'noun',
  },
  use: {
    d: 'To take, hold, or deploy something as a means of accomplishing a purpose.',
    p: 'verb',
  },
  way: {
    d: 'A method, style, or manner of doing something; a road, path, or direction.',
    p: 'noun',
  },
  wear: {
    d: 'To have clothing, jewellery, or other items on your body as covering or decoration.',
    p: 'verb',
  },
  mind: {
    d: 'The part of a person that thinks, reasons, feels, and remembers; the intellect.',
    p: 'noun',
  },
  // Additional common words that may have suboptimal defs
  clean: {
    d: 'Free from dirt, marks, or unwanted matter; not dirty.',
    p: 'adjective',
  },
  close: {
    d: 'A short distance away in space or time; to move so as to block an opening; to shut.',
    p: 'adjective',
  },
  come: {
    d: 'To move or travel towards the speaker or a specified place; to arrive.',
    p: 'verb',
  },
  care: {
    d: 'The provision of what is necessary for health, welfare, and protection; serious attention or concern.',
    p: 'noun',
  },
  break: {
    d: 'To separate into pieces as a result of a blow, shock, or strain; to stop working properly.',
    p: 'verb',
  },
  style: {
    d: 'A particular way of doing, being, or appearing; a manner or fashion.',
    p: 'noun',
  },
  world: {
    d: 'The earth, together with all of its countries and peoples; the planet on which we live.',
    p: 'noun',
  },
};

let count = 0;
for (const [word, fix] of Object.entries(fixes)) {
  if (defs[word]) {
    defs[word].d = fix.d;
    defs[word].p = fix.p;
    // Keep existing example sentence
    count++;
  }
}

writeFileSync(DEFS_PATH, JSON.stringify(defs, null, 0), 'utf8');
console.log(`Manually fixed ${count} definitions.`);
