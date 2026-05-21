import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SCRIPT_DIR = path.dirname(decodeURIComponent(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1'));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const FACTIONS_DIR = path.join(ROOT, 'data', 'factions');
const ABILITIES_DIR = path.join(ROOT, 'data', 'abilities');
const BASE_URL = 'https://www.wahapedia.ru/wh40k10ed/';

const CSV_FILES = {
  datasheets: 'Datasheets.csv',
  abilities: 'Abilities.csv',
  datasheetsAbilities: 'Datasheets_abilities.csv',
};

function decodeEntities(value = '') {
  const named = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
  };

  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const code = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : _;
    }
    if (entity.startsWith('#')) {
      const code = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : _;
    }
    return named[entity] ?? _;
  });
}

function fixMojibake(value = '') {
  let result = value;
  for (let i = 0; i < 2; i += 1) {
    if (!result || (!result.includes('â') && !result.includes('Ã'))) break;
    result = Buffer.from(result, 'latin1').toString('utf8');
  }
  return result;
}

function cleanHtmlText(value = '', { stripFluff = true } = {}) {
  let text = String(value);
  if (stripFluff) {
    text = text.replace(/<p[^>]*class="[^"]*ShowFluff[^"]*"[^>]*>[\s\S]*?<\/p>/gi, '');
  }

  text = text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/?(ul|ol)[^>]*>/gi, '\n')
    .replace(/<\/?(div|span|a|b|i|strong|em)[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '');

  text = fixMojibake(decodeEntities(text))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  return text;
}

function normalizeKey(value = '') {
  return fixMojibake(decodeEntities(String(value)))
    .trim()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function parsePipeCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];

  const headers = lines[0].split('|');
  return lines.slice(1).map(line => {
    const parts = line.split('|');
    const row = {};
    headers.forEach((header, index) => {
      row[header] = parts[index] ?? '';
    });
    return row;
  }).filter(row => Object.values(row).some(Boolean));
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function fetchCsv(name) {
  const text = await fetchText(BASE_URL + name);
  return parsePipeCsv(text.replace(/^\uFEFF/, ''));
}

async function loadFactionPayloads() {
  const entries = await readdir(FACTIONS_DIR, { withFileTypes: true });
  const payloads = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.js') || entry.name === 'index.js') continue;
    const filePath = path.join(FACTIONS_DIR, entry.name);
    const text = await readFile(filePath, 'utf8');
    const match = text.match(/window\.WH40K_FACTION_DATABASES\[[^\]]+\]\s*=\s*(\{[\s\S]*\});\s*$/);
    if (!match) continue;
    payloads.push(JSON.parse(match[1]));
  }

  return payloads;
}

function collectSupportedDatasheets(payloads) {
  const supported = new Map();

  for (const payload of payloads) {
    for (const [unitName, unit] of Object.entries(payload.units || {})) {
      const datasheetLink = unit?.source?.datasheet;
      if (!datasheetLink) continue;

      if (!supported.has(datasheetLink)) {
        supported.set(datasheetLink, {
          unitName,
          weaponAbilities: new Set(),
        });
      }

      const entry = supported.get(datasheetLink);
      for (const weapon of Object.values(unit.weapons || {})) {
        for (const ability of weapon.abilities || []) {
          if (ability) entry.weaponAbilities.add(String(ability).trim());
        }
      }
    }
  }

  return supported;
}

function extractBalancedSpanBlocks(html) {
  const blocks = [];
  const startRegex = /<span id="tooltip_content[^"]*"[^>]*>/gi;

  for (const startMatch of html.matchAll(startRegex)) {
    const startIndex = startMatch.index;
    const tokenRegex = /<span\b[^>]*>|<\/span>/gi;
    tokenRegex.lastIndex = startIndex;
    let depth = 0;
    let endIndex = -1;

    for (let tokenMatch = tokenRegex.exec(html); tokenMatch; tokenMatch = tokenRegex.exec(html)) {
      if (tokenMatch[0][1] === '/') {
        depth -= 1;
      } else {
        depth += 1;
      }

      if (depth === 0) {
        endIndex = tokenRegex.lastIndex;
        break;
      }
    }

    if (endIndex > startIndex) {
      blocks.push(html.slice(startIndex, endIndex));
    }
  }

  return blocks;
}

function extractTooltipTemplates(html) {
  const templates = {};

  for (const block of extractBalancedSpanBlocks(html)) {
    const headerMatch = block.match(/<div class="tooltip_header">([\s\S]*?)<\/div>/i);
    if (!headerMatch) continue;
    const name = cleanHtmlText(headerMatch[1], { stripFluff: false });
    if (!name) continue;

    let body = block.replace(headerMatch[0], '');
    body = cleanHtmlText(body);
    if (!body) continue;

    templates[normalizeKey(name)] = body;
  }

  return templates;
}

function extractWeaponAbilityBlocks(html) {
  const rightColIndex = html.indexOf('<div class="dsRight');
  const leftColumn = rightColIndex >= 0 ? html.slice(0, rightColIndex) : html;
  const lastTableEnd = leftColumn.lastIndexOf('</table>');
  if (lastTableEnd < 0) return {};

  let section = leftColumn.slice(lastTableEnd + '</table>'.length);
  const wargearIndex = section.indexOf('WARGEAR OPTIONS');
  if (wargearIndex >= 0) {
    section = section.slice(0, wargearIndex);
  }

  const blocks = {};
  const regex = /<div class="dsAbility">([\s\S]*?)<\/div>/gi;
  for (const match of section.matchAll(regex)) {
    const text = cleanHtmlText(match[1], { stripFluff: false });
    const separatorIndex = text.indexOf(':');
    if (separatorIndex <= 0) continue;

    const name = text.slice(0, separatorIndex).trim();
    const body = text.slice(separatorIndex + 1).trim();
    if (!name || !body) continue;

    blocks[normalizeKey(name)] = body;
  }

  return blocks;
}

function resolveAbilityName(row, abilityNames, factionId) {
  const inlineName = cleanHtmlText(row.name, { stripFluff: false });
  let name = inlineName || abilityNames.get(`${row.ability_id}::${factionId}`) || abilityNames.get(`${row.ability_id}::`) || '';
  const parameter = cleanHtmlText(row.parameter, { stripFluff: false });

  if (parameter && name && !name.toLowerCase().includes(parameter.toLowerCase())) {
    if (['feel no pain', 'deadly demise', 'scouts', 'firing deck'].includes(name.toLowerCase())) {
      name = `${name} ${parameter}`;
    }
  }

  return name.trim();
}

function substituteParameter(text, parameter) {
  if (!parameter || !text) return text;
  return text
    .replace(/\bX\b/g, parameter)
    .replace(/\bx\b/g, parameter);
}

function ensureShared(sharedMap, key, text) {
  if (!key || !text || sharedMap[key]) return;
  sharedMap[key] = text;
}

async function main() {
  await mkdir(ABILITIES_DIR, { recursive: true });

  const factionPayloads = await loadFactionPayloads();
  const supportedDatasheets = collectSupportedDatasheets(factionPayloads);
  const supportedLinks = new Set(supportedDatasheets.keys());

  const [datasheets, abilities, datasheetsAbilities] = await Promise.all([
    fetchCsv(CSV_FILES.datasheets),
    fetchCsv(CSV_FILES.abilities),
    fetchCsv(CSV_FILES.datasheetsAbilities),
  ]);

  const datasheetById = new Map(datasheets.map(row => [row.id, row]));
  const supportedDatasheetIds = new Set(
    datasheets
      .filter(row => supportedLinks.has(row.link))
      .map(row => row.id),
  );

  const abilityNames = new Map();
  const abilityDescriptions = new Map();
  for (const row of abilities) {
    const name = cleanHtmlText(row.name, { stripFluff: false });
    const description = cleanHtmlText(row.description);
    abilityNames.set(`${row.id}::${row.faction_id}`, name);
    abilityDescriptions.set(`${row.id}::${row.faction_id}`, description);
    if (!abilityNames.has(`${row.id}::`)) abilityNames.set(`${row.id}::`, name);
    if (!abilityDescriptions.has(`${row.id}::`)) abilityDescriptions.set(`${row.id}::`, description);
  }

  const templateByDatasheet = {};
  const weaponBlocksByDatasheet = {};
  const globalTooltipText = {};

  const links = Array.from(supportedLinks);
  const concurrency = 6;
  let cursor = 0;

  async function worker() {
    while (cursor < links.length) {
      const index = cursor++;
      const link = links[index];
      const html = await fetchText(link);
      const templates = extractTooltipTemplates(html);
      const weaponBlocks = extractWeaponAbilityBlocks(html);
      templateByDatasheet[link] = templates;
      weaponBlocksByDatasheet[link] = weaponBlocks;

      Object.entries(templates).forEach(([key, text]) => ensureShared(globalTooltipText, key, text));
      Object.entries(weaponBlocks).forEach(([key, text]) => ensureShared(globalTooltipText, key, text));
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  const unitAbilityDb = { shared: {}, byDatasheet: {} };
  const weaponAbilityDb = { shared: {}, byDatasheet: {} };

  for (const row of datasheetsAbilities) {
    if (!supportedDatasheetIds.has(row.datasheet_id)) continue;

    const datasheet = datasheetById.get(row.datasheet_id);
    if (!datasheet?.link) continue;

    const abilityName = resolveAbilityName(row, abilityNames, datasheet.faction_id);
    if (!abilityName) continue;

    const key = normalizeKey(abilityName);
    const parameter = cleanHtmlText(row.parameter, { stripFluff: false });
    const inlineDescription = cleanHtmlText(row.description);
    const fallbackDescription = substituteParameter(
      abilityDescriptions.get(`${row.ability_id}::${datasheet.faction_id}`) || abilityDescriptions.get(`${row.ability_id}::`) || '',
      parameter,
    );
    const text = inlineDescription
      || templateByDatasheet[datasheet.link]?.[key]
      || globalTooltipText[key]
      || fallbackDescription;

    if (!text) continue;

    unitAbilityDb.byDatasheet[datasheet.link] = unitAbilityDb.byDatasheet[datasheet.link] || {};
    unitAbilityDb.byDatasheet[datasheet.link][key] = text;
    ensureShared(unitAbilityDb.shared, key, text);
  }

  for (const [datasheetLink, entry] of supportedDatasheets.entries()) {
    for (const abilityName of entry.weaponAbilities) {
      const key = normalizeKey(abilityName);
      const text = weaponBlocksByDatasheet[datasheetLink]?.[key]
        || templateByDatasheet[datasheetLink]?.[key]
        || globalTooltipText[key];

      if (!text) continue;

      weaponAbilityDb.byDatasheet[datasheetLink] = weaponAbilityDb.byDatasheet[datasheetLink] || {};
      weaponAbilityDb.byDatasheet[datasheetLink][key] = text;
      ensureShared(weaponAbilityDb.shared, key, text);
    }
  }

  await writeFile(
    path.join(ABILITIES_DIR, 'unit-abilities.js'),
    'window.WH40K_UNIT_ABILITY_DATABASE = '
      + JSON.stringify(unitAbilityDb, null, 0)
      + ';\n',
    'utf8',
  );

  await writeFile(
    path.join(ABILITIES_DIR, 'weapon-abilities.js'),
    'window.WH40K_WEAPON_ABILITY_DATABASE = '
      + JSON.stringify(weaponAbilityDb, null, 0)
      + ';\n',
    'utf8',
  );

  console.log(`Generated ${Object.keys(unitAbilityDb.shared).length} shared unit abilities and ${Object.keys(weaponAbilityDb.shared).length} shared weapon abilities.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});







