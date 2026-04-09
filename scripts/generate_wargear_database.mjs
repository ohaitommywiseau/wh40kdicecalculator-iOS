import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE_DIR = path.join(ROOT, 'scripts', '.cache', 'unit-composition-pages');
const OUTPUT_PATH = path.join(ROOT, 'data', 'wargear', 'astra-militarum-wargear.js');

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
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ndash;|&mdash;/g, '-')
    .replace(/&#34;/g, '"')
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

function normalizeKey(value) {
  return String(value || '')
    .replace(/[’‘]/g, "'")
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/\.$/, '')
    .trim()
    .toLowerCase();
}

function singularKey(value) {
  const key = normalizeKey(value)
    .replace(/\s+-\s+epic hero$/i, '')
    .replace(/^other\s+/i, '')
    .replace(/^models?$/i, 'model');
  if (key.endsWith('ies')) return `${key.slice(0, -3)}y`;
  if (key.endsWith('s') && !key.endsWith('ss')) return key.slice(0, -1);
  return key;
}

function addCount(map, key, amount) {
  const clean = normalizeKey(key);
  if (!clean) return;
  map[clean] = (map[clean] || 0) + amount;
}

function expandRange(min, max) {
  const values = [];
  for (let value = min; value <= max; value += 1) values.push(value);
  return values;
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

function loadUnitCompositionDatabase() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'unit-composition', 'unit-composition.js'), 'utf8'), context);
  return context.window.WH40K_UNIT_COMPOSITION_DATABASE || { byFaction: {} };
}

function extractCompositionHtml(html) {
  const match = String(html).match(/<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>\s*<div class="dsAbility">([\s\S]*?)<\/div>\s*<div class="dsAbility">/i)
    || String(html).match(/<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>\s*<div class="dsAbility">([\s\S]*?)<\/div>/i);
  return match ? match[1] : '';
}

function extractWargearOptionsHtml(html) {
  const match = String(html).match(/<div class="dsHeader[^>]*">WARGEAR OPTIONS<\/div>\s*([\s\S]*?)(?:<\/div>\s*<div class="dsRight|<div class="dsHeader[^>]*">ABILITIES<\/div>|<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>)/i);
  return match ? match[1] : '';
}

function parseModelSegments(line) {
  const normalized = line.replace(/[–—−]/g, '-').replace(/\s+-\s+EPIC HERO/i, '').replace(/\s+\+\s+/g, ' and ');
  const segments = [];
  const regex = /(\d+)\s*(?:-\s*(\d+))?\s+(.+?)(?=\s+and\s+\d+|\s+\+\s+\d+|\s*,\s*\d+|$)/gi;
  let match;
  while ((match = regex.exec(normalized))) {
    segments.push({
      min: Number(match[1]),
      max: Number(match[2] || match[1]),
      type: singularKey(match[3]),
    });
  }
  return segments;
}

function deriveModelTypeCounts(compositionLines, allowedCounts) {
  const results = {};
  for (const line of compositionLines) {
    const segments = parseModelSegments(line);
    if (!segments.length) continue;
    const fixed = segments.filter(segment => segment.min === segment.max);
    const ranged = segments.filter(segment => segment.min !== segment.max);
    if (!ranged.length) {
      const total = segments.reduce((sum, segment) => sum + segment.min, 0);
      results[total] = Object.fromEntries(segments.map(segment => [segment.type, segment.min]));
      continue;
    }
    if (ranged.length === 1) {
      const fixedTotal = fixed.reduce((sum, segment) => sum + segment.min, 0);
      const range = ranged[0];
      for (const count of allowedCounts || expandRange(fixedTotal + range.min, fixedTotal + range.max)) {
        const rangedCount = count - fixedTotal;
        if (rangedCount < range.min || rangedCount > range.max) continue;
        results[count] = Object.fromEntries(fixed.map(segment => [segment.type, segment.min]));
        results[count][range.type] = rangedCount;
      }
    }
  }
  return results;
}

function parseEquipmentLine(line, totalModels, typeCounts) {
  const normalized = line.replace(/\s+/g, ' ').trim();
  const thisModel = normalized.match(/^This model\s+is\s+equipped with:\s*(.+)$/i);
  if (thisModel) {
    return {
      count: totalModels || 1,
      subject: 'model',
      weapons: thisModel[1].replace(/\.$/, '').split(';').map(part => part.trim()).filter(Boolean),
    };
  }
  const match = normalized.match(/^(Every|Each|The|One|1|\d+)(?:\s+other)?\s+(.+?)\s+(?:is|are)\s+equipped with:\s*(.+)$/i);
  if (!match) return null;
  const [, amountToken, subjectRaw, equipmentRaw] = match;
  let subject = singularKey(subjectRaw);
  let count = 0;
  if (/^(Every|Each)$/i.test(amountToken)) {
    count = subject === 'model' ? totalModels : Number(typeCounts[subject] || 0);
  } else if (/^The$/i.test(amountToken)) {
    count = Number(typeCounts[subject] || 1);
  } else if (/^This model/i.test(amountToken)) {
    count = totalModels || 1;
    subject = 'model';
  } else if (/^One$/i.test(amountToken)) {
    count = 1;
  } else {
    count = Number(amountToken) || 0;
  }
  if (!count) return null;
  const weapons = equipmentRaw
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\.$/, '')
    .split(';')
    .map(part => part.trim())
    .filter(Boolean);
  return { count, subject, weapons };
}

function quantityAndWeapon(value) {
  const match = String(value || '').trim().match(/^(\d+)\s+(.+)$/);
  return match
    ? { quantity: Number(match[1]), weapon: normalizeKey(match[2]) }
    : { quantity: 1, weapon: normalizeKey(value) };
}

function deriveBaseWeapons(compositionText, modelTypeCounts) {
  const lines = String(compositionText || '').split('\n').map(line => line.trim()).filter(Boolean);
  const result = {};
  for (const [modelCount, typeCounts] of Object.entries(modelTypeCounts)) {
    const totalModels = Number(modelCount);
    const base = {};
    for (const line of lines) {
      if (!/equipped with:/i.test(line)) continue;
      const parsed = parseEquipmentLine(line, totalModels, typeCounts);
      if (!parsed) continue;
      for (const weaponText of parsed.weapons) {
        const { quantity, weapon } = quantityAndWeapon(weaponText);
        addCount(base, weapon, parsed.count * quantity);
      }
    }
    result[modelCount] = base;
  }
  return result;
}

function parseChoiceWeapons(block) {
  return [...String(block || '').matchAll(/<li>\s*([^<]+?)\s*<\/li>/gi)]
    .map(match => stripMarkup(match[1]))
    .map(quantityAndWeapon)
    .filter(choice => choice.weapon);
}

function parseWargearOptionGroups(optionsHtml) {
  const groups = [];
  const blocks = [...String(optionsHtml || '').matchAll(/<li>([\s\S]*?)(?=<\/li>)/gi)].map(match => match[1]);
  for (const block of blocks) {
    if (!/<ul/i.test(block)) continue;
    const intro = stripMarkup(block.replace(/<ul[\s\S]*$/i, ''));
    const choices = parseChoiceWeapons(block.match(/<ul[\s\S]*<\/ul>/i)?.[0] || '');
    if (!choices.length) continue;
    const perEvery = intro.match(/For every\s+(\d+)\s+models.*?up to\s+(\d+)/i);
    const replace = intro.match(/have their\s+(.+?)\s+replaced/i) || intro.match(/have (?:his|her|its|their)\s+(.+?)\s+replaced/i);
    const canBeEquipped = /can be equipped with one of the following/i.test(intro);
    groups.push({
      intro,
      type: replace ? 'replace-one-of' : canBeEquipped ? 'add-one-of' : 'choose-one-of',
      perModels: perEvery ? Number(perEvery[1]) : null,
      maxSelections: perEvery ? Number(perEvery[2]) : 1,
      replace: replace ? normalizeKey(replace[1]) : '',
      choices,
    });
  }
  return groups;
}

function main() {
  const factionSlug = 'astra-militarum';
  const { manifest, databases } = loadFactionDatabases();
  const compositionDatabase = loadUnitCompositionDatabase();
  const faction = manifest.find(entry => entry.slug === factionSlug);
  const db = databases[factionSlug];
  const compositionFaction = compositionDatabase.byFaction?.[factionSlug];
  if (!faction || !db?.units || !compositionFaction?.units) {
    throw new Error('Astra Militarum faction and composition databases must exist before generating wargear.');
  }
  const output = {
    source: {
      name: 'Wahapedia datasheet Unit Composition and Wargear Options sections',
      faction: 'Astra Militarum',
      requestPolicy: 'Cache-only generator; does not request Wahapedia.',
    },
    generatedAt: new Date().toISOString(),
    byFaction: {
      [factionSlug]: {
        faction: { id: faction.id, name: faction.name, slug: faction.slug },
        units: {},
        missing: [],
      },
    },
  };
  for (const [unitName, unit] of Object.entries(db.units)) {
    const cachePath = path.join(CACHE_DIR, `${factionSlug}-${slugify(unitName)}.html`);
    if (!fs.existsSync(cachePath)) {
      output.byFaction[factionSlug].missing.push(unitName);
      continue;
    }
    const html = fs.readFileSync(cachePath, 'utf8');
    const composition = compositionFaction.units[unitName];
    const compositionHtml = extractCompositionHtml(html);
    const compositionText = stripMarkup(compositionHtml) || composition?.text || '';
    const allowedCounts = composition?.counts?.allowed || [];
    const compositionSourceLines = composition?.counts?.sources?.map(entry => entry.source) || composition?.lines || [];
    const modelTypeCounts = deriveModelTypeCounts(compositionSourceLines, allowedCounts);
    const wargearOptionsHtml = extractWargearOptionsHtml(html);
    output.byFaction[factionSlug].units[unitName] = {
      datasheet: unit?.source?.datasheet || composition?.datasheet || '',
      baseByModelCount: deriveBaseWeapons(compositionText, modelTypeCounts),
      modelTypeCounts,
      optionGroups: parseWargearOptionGroups(wargearOptionsHtml),
      wargearOptionsText: stripMarkup(wargearOptionsHtml),
      notes: [],
    };
  }
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `window.WH40K_WARGEAR_DATABASE = ${JSON.stringify(output)};\n`);
  const count = Object.keys(output.byFaction[factionSlug].units).length;
  console.log(`Astra Militarum: ${count}/${Object.keys(db.units).length} wargear entries`);
  console.log(`Missing cached pages: ${output.byFaction[factionSlug].missing.join(', ') || 'none'}`);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}.`);
}

main();


