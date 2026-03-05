// Check how many words have examples that don't contain the word itself
const path = require('path');
const defs = require(path.join(__dirname, '..', 'src', 'content', 'word-definitions.json'));
const ox3 = require(path.join(__dirname, '..', 'src', 'content', 'oxford-3000.json'));
const ox5 = require(path.join(__dirname, '..', 'src', 'content', 'oxford-5000-extra.json'));

const allWords = [...ox3, ...ox5];
let mismatch = 0, noEx = 0, total = 0;
const examples = [];

for (const w of allWords) {
  const key = w.word.toLowerCase();
  const d = defs[key];
  if (!d) continue;
  total++;
  if (!d.e) { noEx++; continue; }
  
  const exLower = d.e.toLowerCase();
  const wl = key;
  
  // Generate common inflected forms
  const variants = [wl];
  variants.push(wl + 's', wl + 'es');
  variants.push(wl + 'ed', wl + 'd');
  variants.push(wl + 'ing');
  variants.push(wl + 'er', wl + 'est');
  variants.push(wl + 'ly');
  variants.push(wl + 'tion', wl + 'ness');
  // Handle words ending in e
  if (wl.endsWith('e')) {
    variants.push(wl.slice(0, -1) + 'ing');
    variants.push(wl.slice(0, -1) + 'ed');
  }
  // Handle words ending in y
  if (wl.endsWith('y')) {
    variants.push(wl.slice(0, -1) + 'ied');
    variants.push(wl.slice(0, -1) + 'ies');
    variants.push(wl.slice(0, -1) + 'ily');
  }
  
  const found = variants.some(v => {
    const re = new RegExp('\\b' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    return re.test(exLower);
  });
  
  if (!found) {
    mismatch++;
    if (mismatch <= 50) examples.push(`${key}: "${d.e.substring(0, 100)}"`);
  }
}

console.log('Total with defs:', total);
console.log('No example:', noEx);
console.log('Example MISSING the word:', mismatch);
console.log('\nFirst 50 mismatches:');
examples.forEach(e => console.log(' ', e));
