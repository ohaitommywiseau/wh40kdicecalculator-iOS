import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const factionPath = path.join(root, 'data', 'factions', 'astra-militarum.js');
const cacheDir = path.join(__dirname, '.cache', 'unit-composition-pages');

function slugifyUnitName(name) {
  return String(name)
    .toLowerCase()
    .replace(/[’']s\b/g, '-s')
    .replace(/[’']/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&#34;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ');
}

function normalizeKeyword(value) {
  return decodeHtml(value)
    .replace(/\s+/g, ' ')
    .trim();
}

function unique(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    const normalized = normalizeKeyword(value);
    const key = normalized.toLowerCase();
    if (!normalized || seen.has(key)) continue;
    seen.add(key);
    result.push(normalized);
  }
  return result;
}

function extractMetaKeywords(html, unitName) {
  const match = html.match(/<meta name="keywords" content="([^"]+)"/i);
  if (!match) return [];

  const ignored = new Set([
    'wahapedia',
    'warhammer 40,000 10th edition',
    'warhammer 40',
    '000 10th edition',
    'astra militarum',
    unitName.toLowerCase(),
  ]);

  return unique(
    match[1]
      .split(',')
      .map(normalizeKeyword)
      .filter(keyword => !ignored.has(keyword.toLowerCase())),
  );
}

function extractFactionKeywords(html) {
  const line = html.match(/FACTION KEYWORDS:<br\/><span>([\s\S]*?)<\/span><\/div>/i)?.[1] || '';
  const words = [...line.matchAll(/<span class="kwb(?: kwbu)?">([^<]+)<\/span>/gi)]
    .map(match => normalizeKeyword(match[1]));

  if (!words.length) return ['Astra Militarum'];
  return unique([words.map(word => word.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())).join(' ')]);
}

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(factionPath, 'utf8'), context);
const faction = context.window.WH40K_FACTION_DATABASES['astra-militarum'];

const missing = [];
let updated = 0;

for (const [unitName, unit] of Object.entries(faction.units)) {
  const cachePath = path.join(cacheDir, `astra-militarum-${slugifyUnitName(unitName)}.html`);
  if (!fs.existsSync(cachePath)) {
    missing.push(unitName);
    continue;
  }

  const html = fs.readFileSync(cachePath, 'utf8');
  unit.keywords = extractMetaKeywords(html, unitName);
  unit.factionKeywords = extractFactionKeywords(html);
  updated += 1;
}

const output = 'window.WH40K_FACTION_DATABASES = window.WH40K_FACTION_DATABASES || {};\n'
  + 'window.WH40K_FACTION_DATABASES["astra-militarum"] = '
  + JSON.stringify(faction)
  + ';\n';

fs.writeFileSync(factionPath, output, 'utf8');

console.log(`Updated ${updated} Astra Militarum unit keyword entries.`);
if (missing.length) {
  console.log(`Missing cached datasheets: ${missing.join(', ')}`);
}




