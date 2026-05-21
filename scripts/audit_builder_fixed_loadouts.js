const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const RULES_DIR = path.join(ROOT, 'data', 'wargear-rules');

function read(fileName) {
  return fs.readFileSync(path.join(RULES_DIR, fileName), 'utf8');
}

function fixedUnits(source) {
  const matches = [];
  const regex = /'([^']+)':\s*fixed\(/g;
  let match;
  while ((match = regex.exec(source))) matches.push(match[1]);
  return matches;
}

const files = fs.readdirSync(RULES_DIR)
  .filter(name => name.endsWith('-builder-rules.js'))
  .sort();

files.forEach(fileName => {
  const units = fixedUnits(read(fileName));
  console.log(`${fileName}: ${units.length} fixed`);
  units.slice(0, 25).forEach(unit => console.log(`  - ${unit}`));
  if (units.length > 25) console.log(`  ... ${units.length - 25} more`);
});
