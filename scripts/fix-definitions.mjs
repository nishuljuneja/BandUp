#!/usr/bin/env node
/**
 * Re-fetches word definitions from the Free Dictionary API and picks
 * the BEST definition for ESL learners instead of the first one.
 *
 * Problems with original fetch:
 *  - Picked the FIRST definition (often archaic / rare noun form)
 *  - e.g. "celebrity" → "A rite or ceremony" instead of "a famous person"
 *  - e.g. "president" → definition of "precedent"
 *  - e.g. "computer" → "A person employed to perform computations"
 *
 * This script scores ALL definitions and picks the most suitable one.
 *
 * Run:  node scripts/fix-definitions.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_FILE = join(ROOT, 'src/content/word-definitions.json');

let defs = {};
if (existsSync(OUT_FILE)) {
  defs = JSON.parse(readFileSync(OUT_FILE, 'utf-8'));
}

const allWords = Object.keys(defs);
console.log(`Total words to process: ${allWords.length}`);

const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DELAY_MS = 500; // ms between requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;
const SAVE_EVERY = 50;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Scoring function ─────────────────────────────────────────────────
// Higher score = better definition for ESL learners

function scoreDef(word, meaning, def) {
  let score = 0;
  const d = def.definition || '';
  const dl = d.toLowerCase();
  const pos = meaning.partOfSpeech || '';

  // 1. Penalise definitions starting with parenthetical qualifiers
  if (/^\(/.test(d)) score -= 30;
  if (dl.startsWith('senses relating to')) score -= 40;

  // 2. Penalise archaic/obscure markers
  if (/\b(archaic|obsolete|dialectal|dated|rare)\b/i.test(d)) score -= 50;
  if (/\bchiefly\b/i.test(d)) score -= 15;
  if (/\busually capitalized\b/i.test(d)) score -= 20;

  // 3. Penalise nominalisation definitions for words that aren't obviously nouns
  //    "The act of X", "The process of X", "The state of being X"
  if (
    pos === 'noun' &&
    /^(The|An?) (act|process|result|state|instance|manner) (of|being)\b/i.test(d)
  ) {
    // Only penalise if the word itself is more commonly a verb/adj
    // Heuristic: if the word doesn't end in -tion, -ment, -ness, -ity, -ance, -ence
    //            it's probably primarily a verb and the noun form is secondary
    if (
      !/(?:tion|ment|ness|ity|ance|ence|ism|dom|ship|hood|ure|age|al|ing|ery|acy|ics)$/i.test(
        word
      )
    ) {
      score -= 25;
    }
  }

  // 4. Prefer verb definitions for common action words
  if (pos === 'verb') score += 5;
  if (pos === 'adjective') score += 5;

  // 5. Prefer definitions of moderate length (good for ESL)
  const wordCount = d.split(/\s+/).length;
  if (wordCount >= 5 && wordCount <= 25) score += 10;
  if (wordCount < 3) score -= 10;
  if (wordCount > 50) score -= 5;

  // 6. Bonus if definition contains simple, clear language
  //    (no semicolons suggesting multiple obscure meanings crammed in)
  if (d.includes(';')) score -= 3;

  // 7. Bonus if there's an example sentence
  if (def.example) score += 8;

  // 8. Penalise definitions that sound like they belong to homonyms
  //    e.g. "president" getting the definition of "precedent"

  // 9. Strong bonus for definitions that seem directly relevant
  //    If the word itself (or a variation) appears in the definition
  //    example: "angry" -> "Displaying or feeling anger" (contains "anger")
  const stem = word.replace(/(ing|ed|er|est|ly|ness|ment|tion|s|es)$/i, '');
  if (stem.length >= 3 && dl.includes(stem)) score += 5;

  return score;
}

async function fetchBestDef(word, retries = 0) {
  try {
    const res = await fetch(API + encodeURIComponent(word), {
      signal: AbortSignal.timeout(10000),
    });

    if (res.status === 429) {
      if (retries < MAX_RETRIES) {
        await sleep(RETRY_DELAY * (retries + 1));
        return fetchBestDef(word, retries + 1);
      }
      return null;
    }
    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    // Collect ALL definitions with scores
    const candidates = [];
    for (const entry of data) {
      for (const meaning of entry.meanings || []) {
        for (const def of meaning.definitions || []) {
          if (!def.definition) continue;
          const s = scoreDef(word, meaning, def);
          candidates.push({
            d: def.definition,
            e: def.example || '',
            p: meaning.partOfSpeech || '',
            score: s,
          });
        }
      }
    }

    if (candidates.length === 0) return null;

    // Sort by score descending, pick best
    candidates.sort((a, b) => b.score - a.score);
    const best = candidates[0];

    // If best has no example, try to find any example from other defs
    if (!best.e) {
      const withEx = candidates.find((c) => c.e);
      if (withEx) best.e = withEx.e;
    }

    return { d: best.d, e: best.e, p: best.p };
  } catch {
    return null;
  }
}

function save() {
  writeFileSync(OUT_FILE, JSON.stringify(defs, null, 0), 'utf-8');
}

// ─── Main loop ────────────────────────────────────────────────────────

let updated = 0;
let skipped = 0;
let failed = 0;
const startTime = Date.now();

for (let i = 0; i < allWords.length; i++) {
  const word = allWords[i];
  const result = await fetchBestDef(word);

  if (result && result.d) {
    const old = defs[word];
    // Only update if the new definition is different
    if (old.d !== result.d) {
      defs[word] = { d: result.d, e: result.e || old.e || '', p: result.p || old.p || '' };
      updated++;
    } else {
      // Keep existing but fill in missing example
      if (!old.e && result.e) {
        old.e = result.e;
        updated++;
      }
      skipped++;
    }
  } else {
    failed++;
  }

  if ((i + 1) % SAVE_EVERY === 0 || i === allWords.length - 1) {
    save();
    const elapsed = (Date.now() - startTime) / 1000;
    const rate = (i + 1) / elapsed;
    const remaining = (allWords.length - i - 1) / rate;
    console.log(
      `[${i + 1}/${allWords.length}] ${rate.toFixed(1)} w/s | updated: ${updated} | same: ${skipped} | failed: ${failed} | ~${Math.round(remaining)}s left`
    );
  }

  await sleep(DELAY_MS);
}

save();
console.log(`\nDone! Updated: ${updated}, Unchanged: ${skipped}, Failed: ${failed}`);
