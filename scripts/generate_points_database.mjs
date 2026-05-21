import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const ROOT = path.resolve(import.meta.dirname, '..');
const PDF_PATH = path.join(ROOT, 'scripts', '.cache', 'munitorum-field-manual-v4.pdf');
const OUTPUT_PATH = path.join(ROOT, 'data', 'points', 'points-v4.js');
const SOURCE_URL = 'https://assets.warhammer-community.com/eng_04-03_wh40k_core%26key_munitorum_field_manual-wusmp8gbdw-poy2kdhoy0.pdf';

function requirePdfParse() {
  try {
    return require('./.deps/node_modules/pdf-parse');
  } catch (err) {
    throw new Error('Missing pdf-parse dependency. Run: npm install pdf-parse --prefix scripts/.deps --no-save');
  }
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/[�]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function normalizeAlias(value) {
  return normalizeName(value)
    .replace(/squad$/i, '')
    .replace(/s$/i, '');
}

function loadFactionDatabases() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, 'data', 'factions', 'index.js'), 'utf8'),
    context,
  );

  for (const faction of context.window.WH40K_FACTION_MANIFEST || []) {
    if (!faction.script) continue;
    const scriptPath = path.join(ROOT, faction.script.replace(/^\.\//, ''));
    if (fs.existsSync(scriptPath)) {
      vm.runInContext(fs.readFileSync(scriptPath, 'utf8'), context);
    }
  }

  return {
    manifest: context.window.WH40K_FACTION_MANIFEST || [],
    databases: context.window.WH40K_FACTION_DATABASES || {},
  };
}

function isNoiseLine(line) {
  if (!line) return true;
  if (/^--\s*\d+\s+of\s+\d+\s*--$/i.test(line)) return true;
  if (/^\d+$/.test(line)) return true;
  if (/^MUNITORUM$/i.test(line)) return true;
  if (/^FIELD MANUAL$/i.test(line)) return true;
  if (/^VERSION\s+/i.test(line)) return true;
  if (/^CONTENTS$/i.test(line)) return true;
  if (/^PRODUCED BY THE WARHAMMER DESIGN STUDIO$/i.test(line)) return true;
  if (/^Munitorum Field Manual/i.test(line)) return true;
  if (/^(CODEX|INDEX|IMPERIAL ARMOUR):/i.test(line)) return true;
  if (/^DETACHMENT ENHANCEMENTS$/i.test(line)) return true;
  if (/^FORGE WORLD POINTS VALUES$/i.test(line)) return true;
  if (/^BOARDING ACTIONS$/i.test(line)) return true;
  if (/^COMBAT PATROL$/i.test(line)) return true;
  if (/^ENHANCEMENTS$/i.test(line)) return true;
  if (/^[A-Z0-9][A-Z0-9 '&-]+$/.test(line) && line.length > 3) return true;
  return false;
}

function parsePointEntries(text) {
  const lines = text.split(/\r?\n/)
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const entriesByKey = new Map();
  let titleParts = [];
  let currentTitle = '';

  for (const line of lines) {
    const pointMatch = line.match(/^(.+?)[\s.�]+(?:\([+-]?\d+\)\s*)?(\d+)\s+pts$/i);
    if (pointMatch) {
      if (titleParts.length) {
        currentTitle = titleParts.join(' ');
        titleParts = [];
      }
      if (!currentTitle) continue;

      const label = pointMatch[1].trim();
      const modelNumbers = [...label.matchAll(/\d+/g)].map(match => Number(match[0]));
      const models = /models?/i.test(label)
        ? modelNumbers[0]
        : modelNumbers.reduce((sum, number) => sum + number, 0);
      const points = Number(pointMatch[2]);
      if (!models || !points) continue;

      const key = normalizeName(currentTitle);
      if (!entriesByKey.has(key)) entriesByKey.set(key, { name: currentTitle, variants: [] });
      const entry = entriesByKey.get(key);
      if (!entry.variants.some(variant => variant.models === models && variant.points === points)) {
        entry.variants.push({ models, points, label });
      }
      continue;
    }

    if (isNoiseLine(line)) {
      titleParts = [];
      currentTitle = '';
      continue;
    }

    titleParts.push(line);
  }

  for (const entry of entriesByKey.values()) {
    entry.variants.sort((a, b) => a.models - b.models);
  }

  return entriesByKey;
}

function findPointMatch(entriesByKey, unitName) {
  const exact = entriesByKey.get(normalizeName(unitName));
  if (exact) return exact;

  const unitAlias = normalizeAlias(unitName);
  const alias = [...entriesByKey.values()].find(entry => normalizeAlias(entry.name) === unitAlias);
  if (alias) return alias;

  const unitKey = normalizeName(unitName);
  return [...entriesByKey.values()].find(entry => {
    const entryKey = normalizeName(entry.name);
    return entryKey.includes(unitKey) || unitKey.includes(entryKey);
  });
}

function matchPointsToFactions(entriesByKey, manifest, databases) {
  const byFaction = {};
  const unmatched = {};

  for (const faction of manifest) {
    const db = databases[faction.slug];
    if (!db?.units) continue;

    const units = {};
    const missing = [];
    for (const unitName of Object.keys(db.units).sort((a, b) => a.localeCompare(b))) {
      const match = findPointMatch(entriesByKey, unitName);
      if (match) {
        units[unitName] = {
          sourceName: match.name,
          variants: match.variants,
        };
      } else {
        missing.push(unitName);
      }
    }

    byFaction[faction.slug] = {
      faction: {
        id: faction.id,
        name: faction.name,
        slug: faction.slug,
      },
      units,
      missing,
    };
    unmatched[faction.slug] = missing.length;
  }

  return { byFaction, unmatched };
}

async function main() {
  const { PDFParse } = requirePdfParse();
  const parser = new PDFParse({ data: fs.readFileSync(PDF_PATH) });
  const result = await parser.getText();
  await parser.destroy();

  const entriesByKey = parsePointEntries(result.text);
  const { manifest, databases } = loadFactionDatabases();
  const { byFaction, unmatched } = matchPointsToFactions(entriesByKey, manifest, databases);

  const database = {
    source: {
      name: 'Munitorum Field Manual',
      version: '4.0',
      publicationDate: '2026-03-04',
      url: SOURCE_URL,
      generatedFrom: path.basename(PDF_PATH),
    },
    generatedAt: new Date().toISOString(),
    byFaction,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(
    OUTPUT_PATH,
    `window.WH40K_POINTS_DATABASE = ${JSON.stringify(database)};\n`,
  );

  console.log(`Parsed ${entriesByKey.size} point entries.`);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}.`);
  console.log('Missing points by faction:', unmatched);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
