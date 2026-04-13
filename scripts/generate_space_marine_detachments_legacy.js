const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_PATH = path.join(__dirname, '.cache', 'space-marines-faction-page.html');
const OUTPUT_PATH = path.join(ROOT, 'data', 'detachments', 'space-marines.js');

const SOURCE_URL = 'https://wahapedia.ru/wh40k10ed/factions/space-marines/';
const MOJIBAKE_APOSTROPHE = String.fromCharCode(226, 8364, 8482);
const MOJIBAKE_LEFT_SINGLE = String.fromCharCode(226, 8364, 8480);
const MOJIBAKE_LEFT_DOUBLE = String.fromCharCode(226, 8364, 339);
const MOJIBAKE_RIGHT_DOUBLE = String.fromCharCode(226, 8364, 8221);
const MOJIBAKE_DASH = String.fromCharCode(226, 8364, 8211);
const MOJIBAKE_HYPHEN = String.fromCharCode(226, 8364, 8216);
const MOJIBAKE_ELLIPSIS = String.fromCharCode(226, 8364, 166);
const DETACHMENTS = [
  { anchor: 'Gladius-Task-Force', slug: 'gladius-task-force' },
  { anchor: 'Anvil-Siege-Force', slug: 'anvil-siege-force' },
  { anchor: 'Ironstorm-Spearhead', slug: 'ironstorm-spearhead' },
  { anchor: 'Firestorm-Assault-Force', slug: 'firestorm-assault-force' },
  { anchor: 'Stormlance-Task-Force', slug: 'stormlance-task-force' },
  { anchor: 'Vanguard-Spearhead', slug: 'vanguard-spearhead' },
  { anchor: '1st-Company-Task-Force', slug: '1st-company-task-force' },
  { anchor: 'Librarius-Conclave', slug: 'librarius-conclave' },
  { anchor: 'Bastion-Task-Force', slug: 'bastion-task-force' },
  { anchor: 'Orbital-Assault-Force', slug: 'orbital-assault-force' },
  { anchor: 'Ceramite-Sentinels', slug: 'ceramite-sentinels' }
];

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function decodeHtml(value) {
  return String(value || '')
    .split(MOJIBAKE_APOSTROPHE).join('\'')
    .split(MOJIBAKE_LEFT_SINGLE).join('\'')
    .split(MOJIBAKE_LEFT_DOUBLE).join('"')
    .split(MOJIBAKE_RIGHT_DOUBLE).join('"')
    .split(MOJIBAKE_DASH).join('-')
    .split(MOJIBAKE_HYPHEN).join('-')
    .split(MOJIBAKE_ELLIPSIS).join('...')
    .replace(/&#(\d+);/g, function (_, code) { return String.fromCharCode(Number(code)); })
    .replace(/&#x([0-9a-f]+);/gi, function (_, code) { return String.fromCharCode(parseInt(code, 16)); })
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, '\'')
    .replace(/&#39;/gi, '\'')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function sanitizeText(value) {
  return decodeHtml(value)
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function stripHtml(value, options) {
  const config = options || {};
  let text = String(value || '');
  if (config.dropFluff !== false) {
    text = text.replace(/<p[^>]*class="[^"]*ShowFluff[^"]*"[^>]*>[\s\S]*?<\/p>/gi, '');
  }
  text = text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|table|tbody|tr|td|ul|li|h2|h3)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');
  return sanitizeText(text);
}

function escapeJs(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n');
}

function sectionStart(content, anchor) {
  return content.indexOf('<a name="' + anchor + '"></a>');
}

function sliceDetachmentBlock(content, detachment, nextDetachment) {
  const start = sectionStart(content, detachment.anchor);
  if (start === -1) {
    throw new Error('Could not find detachment anchor: ' + detachment.anchor);
  }
  const end = nextDetachment ? sectionStart(content, nextDetachment.anchor) : content.length;
  if (end === -1) {
    throw new Error('Could not find next detachment anchor after: ' + detachment.anchor);
  }
  return content.slice(start, end);
}

function extractHeading(block) {
  const match = block.match(/<h2 class="outline_header">(?:<img[^>]+>)?([\s\S]*?)<\/h2>/i);
  return sanitizeText(stripHtml(match ? match[1] : '', { dropFluff: false }));
}

function extractBetween(block, startAnchorPattern, endAnchorPattern) {
  const startMatch = block.match(startAnchorPattern);
  if (!startMatch) return '';
  const startIndex = block.indexOf(startMatch[0]);
  const sliced = block.slice(startIndex);
  const endMatch = sliced.match(endAnchorPattern);
  if (!endMatch) return sliced;
  return sliced.slice(0, sliced.indexOf(endMatch[0]));
}

function extractRule(block) {
  const ruleHtml = extractBetween(
    block,
    /<a name="Detachment-Rule(?:-[0-9]+)?"><\/a><h2>Detachment Rule<\/h2>/i,
    /<a name="Enhancements(?:-[0-9]+)?"><\/a><h2>Enhancements<\/h2>/i
  );
  const firstHeadingMatch = ruleHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
  const ruleName = sanitizeText(stripHtml(firstHeadingMatch ? firstHeadingMatch[1] : 'Detachment Rule', { dropFluff: false }));
  let ruleText = stripHtml(ruleHtml, { dropFluff: true });
  if (ruleText.indexOf('Detachment Rule') === 0) {
    ruleText = ruleText.slice('Detachment Rule'.length).trim();
  }
  if (ruleText.indexOf(ruleName) === 0) {
    ruleText = ruleText.slice(ruleName.length).trim();
  }
  return {
    name: ruleName || 'Detachment Rule',
    text: ruleText
  };
}

function extractEnhancements(block) {
  const enhancementsHtml = extractBetween(
    block,
    /<a name="Enhancements(?:-[0-9]+)?"><\/a><h2>Enhancements<\/h2>/i,
    /<a name="Stratagems(?:-[0-9]+)?"><\/a><h2>Stratagems<\/h2>/i
  );
  const results = [];
  const regex = /<ul class="EnhancementsPts"><li><span>([\s\S]*?)<\/span>\s*<span>(\d+)\s*pts<\/span><\/li><\/ul>([\s\S]*?)(?=<div class="BreakInsideAvoid"><table|max-width="480px"|<div><br\/>|$)/gi;
  let match;
  while ((match = regex.exec(enhancementsHtml)) !== null) {
    const name = sanitizeText(stripHtml(match[1], { dropFluff: false }));
    const points = Number(match[2] || 0);
    const paragraphs = [];
    const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let paragraphMatch;
    while ((paragraphMatch = paragraphRegex.exec(match[3])) !== null) {
      const cleaned = stripHtml(paragraphMatch[1], { dropFluff: false });
      if (cleaned) paragraphs.push(cleaned);
    }
    const text = paragraphs.length ? paragraphs[paragraphs.length - 1] : '';
    if (name && text) {
      results.push({
        name: name,
        points: points,
        text: text
      });
    }
  }
  return results;
}

function parsePhaseTags(cardHtml) {
  const tags = [];
  const regex = /class="str10(Command|Movement|Shooting|Charge|Fight|End)\b/gi;
  let match;
  while ((match = regex.exec(cardHtml)) !== null) {
    const value = match[1];
    if (tags.indexOf(value) === -1) tags.push(value);
  }
  return tags;
}

function parseTiming(cardHtml, whenText) {
  if (/str10ColorEnemy/i.test(cardHtml)) return 'opponent';
  if (/str10ColorYour/i.test(cardHtml)) return 'your';
  if (/your opponent/i.test(whenText)) return 'opponent';
  if (/your /i.test(whenText)) return 'your';
  return 'any';
}

function parseStratagemTextSections(text) {
  const sections = {};
  const regex = /(?:^|\n)\s*(WHEN|TARGET|EFFECT|RESTRICTIONS?):\s*([\s\S]*?)(?=\n\s*(?:WHEN|TARGET|EFFECT|RESTRICTIONS?):|$)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const key = match[1].toLowerCase();
    sections[key] = sanitizeText(match[2]);
  }
  return sections;
}

function createId(slug, name) {
  return slug + '-' + String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractStratagems(block, detachmentName, detachmentSlug) {
  const stratAnchorMatch = block.match(/<a name="Stratagems(?:-[0-9]+)?"><\/a><h2>Stratagems<\/h2>/i);
  const stratagemsHtml = stratAnchorMatch ? block.slice(block.indexOf(stratAnchorMatch[0])) : '';
  const results = [];
  const cardRegex = /<div class=" str10Wrap[\s\S]*?<div class="str10Line"><\/div>\s*<\/div><\/div>/gi;
  let match;
  while ((match = cardRegex.exec(stratagemsHtml)) !== null) {
    const card = match[0];
    const nameMatch = card.match(/<div class="str10Name">([\s\S]*?)<\/div>/i);
    const cpMatch = card.match(/<div class="str10CP">(\d+)CP<\/div>/i);
    const typeMatch = card.match(/<div class="str10Type">([\s\S]*?)<\/div>/i);
    const textMatch = card.match(/<div class="str10Text">([\s\S]*?)<\/div>\s*<div class="str10Line"><\/div>/i);
    const name = sanitizeText(stripHtml(nameMatch ? nameMatch[1] : '', { dropFluff: false }));
    const cp = Number(cpMatch ? cpMatch[1] : 0);
    const fullType = sanitizeText(stripHtml(typeMatch ? typeMatch[1] : '', { dropFluff: false }));
    const type = fullType
      .replace(/^.*?(?: - | – )/, '')
      .replace(/\s*Stratagem$/i, '')
      .trim();
    const sections = parseStratagemTextSections(stripHtml(textMatch ? textMatch[1] : '', { dropFluff: false }));
    if (!name || !sections.when || !sections.effect) continue;
    const stratagem = {
      id: createId(detachmentSlug, name),
      name: name,
      cp: cp,
      type: type || 'Stratagem',
      timing: parseTiming(card, sections.when),
      when: sections.when,
      target: sections.target || '',
      effect: sections.effect,
      phaseTags: parsePhaseTags(card)
    };
    if (sections.restrictions) stratagem.restrictions = sections.restrictions;
    if (/once per battle/i.test((sections.effect || '') + ' ' + (sections.restrictions || ''))) {
      stratagem.usageLimit = 'perBattle';
    }
    results.push(stratagem);
  }
  return results.slice(0, 6);
}

function buildDetachments(content) {
  return DETACHMENTS.map(function (detachment, index) {
    const block = sliceDetachmentBlock(content, detachment, DETACHMENTS[index + 1]);
    const name = extractHeading(block);
    return {
      slug: detachment.slug,
      name: name,
      source: SOURCE_URL,
      rules: [extractRule(block)],
      enhancements: extractEnhancements(block),
      stratagems: extractStratagems(block, name, detachment.slug)
    };
  });
}

function toJs(value, indent) {
  const spacing = indent || 0;
  const pad = new Array(spacing + 1).join(' ');
  const childPad = new Array(spacing + 3).join(' ');
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    return '[\n' + value.map(function (entry) {
      return childPad + toJs(entry, spacing + 2);
    }).join(',\n') + '\n' + pad + ']';
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (!keys.length) return '{}';
    return '{\n' + keys.map(function (key) {
      return childPad + key + ': ' + toJs(value[key], spacing + 2);
    }).join(',\n') + '\n' + pad + '}';
  }
  if (typeof value === 'string') return '\'' + escapeJs(value) + '\'';
  return String(value);
}

function writeOutput(detachments) {
  const output = [
    '(function () {',
    '  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };',
    '  window.WH40K_DETACHMENT_DATABASE.byFaction[\'space-marines\'] = ' + toJs(detachments, 2) + ';',
    '}());',
    ''
  ].join('\n');
  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
}

function main() {
  if (!fs.existsSync(SOURCE_PATH)) {
    throw new Error('Missing source HTML: ' + SOURCE_PATH);
  }
  const content = readFile(SOURCE_PATH);
  const detachments = buildDetachments(content);
  writeOutput(detachments);
  console.log('Generated ' + detachments.length + ' Space Marines detachments to ' + OUTPUT_PATH);
}

main();
