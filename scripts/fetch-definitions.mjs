#!/usr/bin/env node
/**
 * Fetches English definitions from the Free Dictionary API.
 * Sequential with retry logic to handle 429 rate limits.
 * Resumable — retries words that previously failed (empty definitions).
 *
 * Run: node scripts/fetch-definitions.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const ox3000 = JSON.parse(readFileSync(join(ROOT, 'src/content/oxford-3000.json'), 'utf-8'));
const ox5000 = JSON.parse(readFileSync(join(ROOT, 'src/content/oxford-5000-extra.json'), 'utf-8'));
const allWords = [...ox3000, ...ox5000];

const OUT_FILE = join(ROOT, 'src/content/word-definitions.json');

let existing = {};
if (existsSync(OUT_FILE)) {
  try { existing = JSON.parse(readFileSync(OUT_FILE, 'utf-8')); } catch {}
}

function cleanWord(w) {
  return w.split(/[,/]/)[0].trim().toLowerCase();
}

const uniqueWords = [...new Set(allWords.map(e => cleanWord(e.word)))];
const todo = uniqueWords.filter(w => !existing[w] || !existing[w].d);

console.log(`Total unique words: ${uniqueWords.length}`);
console.log(`With definitions: ${uniqueWords.filter(w => existing[w]?.d).length}`);
console.log(`Remaining to fetch: ${todo.length}`);

const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DELAY_MS = 600;
const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWord(word, retries = 0) {
  try {
    const res = await fetch(API + encodeURIComponent(word), { signal: AbortSignal.timeout(10000) });

    if (res.status === 429) {
      if (retries < MAX_RETRIES) {
        const wait = RETRY_DELAY * (retries + 1);
        await sleep(wait);
        return fetchWord(word, retries + 1);
      }
      return { word, definition: '', example: '', pos: '' };
    }

    if (!res.ok) return { word, definition: '', example: '', pos: '' };

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return { word, definition: '', example: '', pos: '' };

    let bestDef = '';
    let bestExample = '';
    let bestPos = '';

    for (const entry of data) {
      for (const meaning of entry.meanings || []) {
        for (const def of meaning.definitions || []) {
          if (!bestDef && def.definition) {
            bestDef = def.definition;
            bestPos = meaning.partOfSpeech || '';
          }
          if (!bestExample && def.example) {
            bestExample = def.example;
          }
          if (bestDef && bestExample) break;
        }
        if (bestDef && bestExample) break;
      }
      if (bestDef && bestExample) break;
    }

    return { word, definition: bestDef, example: bestExample, pos: bestPos };
  } catch {
    return { word, definition: '', example: '', pos: '' };
  }
}

function save() {
  writeFileSync(OUT_FILE, JSON.stringify(existing, null, 0), 'utf-8');
}

let processed = 0;
const startTime = Date.now();

for (const word of todo) {
  const r = await fetchWord(word);
  if (r.definition) {
    existing[word] = { d: r.definition, e: r.example, p: r.pos };
  }
  processed++;

  if (processed % 25 === 0 || processed === todo.length) {
    save();
    const elapsed = (Date.now() - startTime) / 1000;
    const rate = processed / elapsed;
    const remaining = (todo.length - processed) / rate;
    const withDefs = Object.values(existing).filter(v => v.d).length;
    console.log(`[${processed}/${todo.length}] ${rate.toFixed(1)} w/s, ~${Math.round(remaining)}s left | ${withDefs} defs total`);
  }

  await sleep(DELAY_MS);
}

save();
const finalDefs = Object.values(existing).filter(v => v.d).length;
console.log(`\nDone! ${finalDefs} definitions out of ${Object.keys(existing).length} words saved.`);
