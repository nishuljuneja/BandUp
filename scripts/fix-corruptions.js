const fs = require('fs');
const path = require('path');
const fixes = {
  // dalsoup corruptions
  'Mosoups': 'Modals',
  'mosoups': 'modals',
  'Mosoup': 'Modal',
  'mosoup': 'modal',
  'Mesoup': 'Medal',
  'mesoup': 'medal',
  'scansoup': 'scandal',
  'Scansoup': 'Scandal',
  'fousouption': 'foundation',
  'pesoupogy': 'pedagogy',
  'feusoup': 'feudal',
  // More corruptions
  'clemonadecal': 'classical',
  'Clemonadecal': 'Classical',
  'clemonadefication': 'classification',
  'clemonadefied': 'classified',
  'coffeens': 'chains',
  'coffeen': 'chain',
  'coffeir': 'chair',
  // Fix awkward replacements
  'the worldn': 'local',
  'an local': 'a local',
};
const root = path.resolve(__dirname, '..');
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.next') walk(f);
    else if (e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.tsx'))) files.push(f);
  }
}
walk(path.join(root, 'src'));
const keys = Object.keys(fixes).sort((a, b) => b.length - a.length);
let total = 0;
for (const fp of files) {
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  for (const k of keys) c = c.split(k).join(fixes[k]);
  if (c !== orig) {
    fs.writeFileSync(fp, c, 'utf8');
    const n = orig.split('\n').filter((l, i) => l !== c.split('\n')[i]).length;
    total += n;
    console.log('Fixed ' + path.relative(root, fp) + ' (' + n + ' lines)');
  }
}
console.log('\nTotal: ' + total + ' lines fixed');
