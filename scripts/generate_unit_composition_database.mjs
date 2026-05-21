import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE_DIR = path.join(ROOT, 'scripts', '.cache', 'unit-composition-pages');
const OUTPUT_PATH = path.join(ROOT, 'data', 'unit-composition', 'unit-composition.js');
const REQUEST_TIMEOUT_MS = 15000;
const REQUEST_DELAY_MS = 1500;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function argValue(name) {
  const flag = `--${name}`;
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : '';
}

function stripMarkup(value) {
  return String(value || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ndash;|&mdash;/g, '-')
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[’‘]/g, '-')
    .replace(/[–—−]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function loadFactionDatabases() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'factions', 'index.js'), 'utf8'), context);

  for (const faction of context.window.WH40K_FACTION_MANIFEST || []) {
    if (!faction.script) continue;
    const scriptPath = path.join(ROOT, faction.script.replace(/^\.\//, ''));
    if (fs.existsSync(scriptPath)) vm.runInContext(fs.readFileSync(scriptPath, 'utf8'), context);
  }

  return {
    manifest: context.window.WH40K_FACTION_MANIFEST || [],
    databases: context.window.WH40K_FACTION_DATABASES || {},
  };
}

function loadExistingOutput() {
  if (!fs.existsSync(OUTPUT_PATH)) return null;
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(OUTPUT_PATH, 'utf8'), context);
  return context.window.WH40K_UNIT_COMPOSITION_DATABASE || null;
}

function extractComposition(html) {
  const match = String(html).match(/<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>\s*<div class="dsAbility">([\s\S]*?)<\/div>\s*<div class="dsAbility">/i)
    || String(html).match(/<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>\s*<div class="dsAbility">([\s\S]*?)<\/div>/i);
  if (!match) return null;

  const text = stripMarkup(match[1]);
  if (!text) return null;
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const compositionLines = [];
  for (const line of lines) {
    if (/equipped with:/i.test(line)) break;
    if (/^This unit can/i.test(line)) break;
    compositionLines.push(line.replace(/^OR\s*/i, ''));
  }
  return {
    text,
    lines: compositionLines.length ? compositionLines : lines,
  };
}

function expandRange(min, max) {
  const values = [];
  for (let value = min; value <= max; value += 1) values.push(value);
  return values;
}

function parseCompositionLine(line) {
  const normalized = line.replace(/[–—−]/g, '-');
  const segments = [...normalized.matchAll(/(\d+)\s*(?:-\s*(\d+))?/g)].map(match => ({
    min: Number(match[1]),
    max: Number(match[2] || match[1]),
  }));
  if (!segments.length) return null;
  return {
    min: segments.reduce((sum, segment) => sum + segment.min, 0),
    max: segments.reduce((sum, segment) => sum + segment.max, 0),
    source: line,
    segmentCount: segments.length,
  };
}

function deriveCounts(lines) {
  const parsedLines = lines.map(parseCompositionLine);
  if (parsedLines.some(entry => !entry)) return null;

  const hasAlternativeTotals = parsedLines.some(entry => entry.segmentCount > 1);
  const totals = hasAlternativeTotals
    ? parsedLines
    : [{
        min: parsedLines.reduce((sum, entry) => sum + entry.min, 0),
        max: parsedLines.reduce((sum, entry) => sum + entry.max, 0),
        source: lines.join(' + '),
        segmentCount: parsedLines.length,
      }];

  const allowed = [...new Set(totals.flatMap(total => expandRange(total.min, total.max)))]
    .sort((a, b) => a - b);

  return {
    allowed,
    min: Math.min(...allowed),
    max: Math.max(...allowed),
    sources: totals.map(({ min, max, source }) => ({ min, max, source })),
  };
}

async function fetchCached(url, cacheName) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cachePath = path.join(CACHE_DIR, `${cacheName}.html`);
  if (fs.existsSync(cachePath)) return fs.readFileSync(cachePath, 'utf8');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
    const html = await response.text();
    fs.writeFileSync(cachePath, html);
    await sleep(REQUEST_DELAY_MS);
    return html;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const factionSlug = argValue('faction');
  if (!factionSlug) {
    throw new Error('Pass exactly one faction slug, e.g. --faction astra-militarum');
  }

  const { manifest, databases } = loadFactionDatabases();
  const faction = manifest.find(entry => entry.slug === factionSlug);
  if (!faction) throw new Error(`Unknown faction slug: ${factionSlug}`);

  const db = databases[faction.slug];
  if (!db?.units) throw new Error(`No faction database loaded for ${faction.slug}`);

  const existing = loadExistingOutput();
  const database = existing || {
    source: {
      name: 'Wahapedia datasheet Unit Composition sections',
      baseUrl: 'https://wahapedia.ru/wh40k10ed/',
      generatedFrom: 'datasheet pages',
      requestPolicy: 'One faction per run; cached pages; 1.5s delay for uncached requests.',
    },
    generatedAt: new Date().toISOString(),
    byFaction: {},
  };

  database.byFaction[faction.slug] = {
    faction: { id: faction.id, name: faction.name, slug: faction.slug },
    units: {},
    missing: [],
  };

  const unitEntries = Object.entries(db.units);
  for (let index = 0; index < unitEntries.length; index += 1) {
    const [unitName, unit] = unitEntries[index];
    const url = unit?.source?.datasheet;
    if (!url) {
      database.byFaction[faction.slug].missing.push(unitName);
      continue;
    }

    try {
      console.log(`[${index + 1}/${unitEntries.length}] ${unitName}`);
      const html = await fetchCached(url, `${faction.slug}-${slugify(unitName)}`);
      const composition = extractComposition(html);
      if (!composition) {
        database.byFaction[faction.slug].missing.push(unitName);
        continue;
      }

      database.byFaction[faction.slug].units[unitName] = {
        datasheet: url,
        text: composition.text,
        lines: composition.lines,
        counts: deriveCounts(composition.lines),
      };
    } catch (error) {
      console.warn(`Skipping ${faction.slug} / ${unitName}: ${error.message}`);
      database.byFaction[faction.slug].missing.push(unitName);
    }
  }

  database.generatedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `window.WH40K_UNIT_COMPOSITION_DATABASE = ${JSON.stringify(database)};\n`);
  const matched = Object.keys(database.byFaction[faction.slug].units).length;
  console.log(`${faction.name}: ${matched}/${unitEntries.length} unit composition entries`);
  console.log(`Missing: ${database.byFaction[faction.slug].missing.join(', ') || 'none'}`);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});


