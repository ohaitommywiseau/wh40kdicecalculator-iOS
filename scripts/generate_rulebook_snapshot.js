const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const RULE_MANIFEST = [
  { kind: 'section', title: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Engagement Range', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Unit Coherency', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Measuring Distances', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Determining Visibility', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Model Visible', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Unit Visible', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Model Fully Visible', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Unit Fully Visible', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Dice', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Re-rolls', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Roll-offs', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Sequencing', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'The Battle Round', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Persisting Effects', parent: 'CORE CONCEPTS' },
  { kind: 'rule', title: 'Out-of-Phase Rules', parent: 'CORE CONCEPTS' },
  { kind: 'section', title: 'COMMAND PHASE' },
  { kind: 'rule', title: '1. Command', parent: 'COMMAND PHASE' },
  { kind: 'rule', title: '2. Battle-shock', parent: 'COMMAND PHASE' },
  { kind: 'rule', title: 'Gaining Command Points', parent: 'COMMAND PHASE' },
  { kind: 'rule', title: 'Starting Strength', parent: 'COMMAND PHASE' },
  { kind: 'rule', title: 'Below Half-strength', parent: 'COMMAND PHASE' },
  { kind: 'rule', title: 'Destroyed', parent: 'COMMAND PHASE' },
  { kind: 'rule', title: 'Attached Units', parent: 'COMMAND PHASE' },
  { kind: 'section', title: 'MOVEMENT PHASE' },
  { kind: 'rule', title: '1. Move Units', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Remain Stationary', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Normal Moves', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Straight Lines', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Pivots', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Advance Moves', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Fall Back Moves', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Moving Over Terrain', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Flying', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: '2. Reinforcements', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Transports', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Transport Capacity', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Embark', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Disembark', parent: 'MOVEMENT PHASE' },
  { kind: 'rule', title: 'Destroyed Transports', parent: 'MOVEMENT PHASE' },
  { kind: 'section', title: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Select Targets', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Make Ranged Attacks', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Locked in Combat', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Big Guns Never Tire', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Making Attacks', parent: 'SHOOTING PHASE', aliases: ['Making Attacks [Shooting]'] },
  { kind: 'rule', title: '1. Hit Roll', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: '2. Wound Roll', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: '3. Allocate Attack', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: '4. Saving Throw', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Invulnerable Saves', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Mortal Wounds', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: '5. Inflict Damage', parent: 'SHOOTING PHASE' },
  { kind: 'rule', title: 'Weapon Abilities', parent: 'SHOOTING PHASE' },
  { kind: 'section', title: 'CHARGE PHASE' },
  { kind: 'rule', title: 'Charge Bonus', parent: 'CHARGE PHASE' },
  { kind: 'rule', title: 'Charging with a Unit', parent: 'CHARGE PHASE' },
  { kind: 'rule', title: 'Charging Over Terrain', parent: 'CHARGE PHASE' },
  { kind: 'rule', title: 'Charging with Flying Models', parent: 'CHARGE PHASE' },
  { kind: 'section', title: 'FIGHT PHASE' },
  { kind: 'rule', title: '1. Fights First', parent: 'FIGHT PHASE' },
  { kind: 'rule', title: '2. Remaining Combats', parent: 'FIGHT PHASE' },
  { kind: 'rule', title: 'Fight', parent: 'FIGHT PHASE' },
  { kind: 'rule', title: '1. Pile In', parent: 'FIGHT PHASE' },
  { kind: 'rule', title: '2. Make Melee Attacks', parent: 'FIGHT PHASE' },
  { kind: 'rule', title: 'Which Models Fight', parent: 'FIGHT PHASE' },
  { kind: 'rule', title: 'Select Weapon', parent: 'FIGHT PHASE' },
  { kind: 'rule', title: 'Make Attacks', parent: 'FIGHT PHASE', aliases: ['Making Attacks [Fight]'] },
  { kind: 'rule', title: '3. Consolidate', parent: 'FIGHT PHASE' },
  { kind: 'section', title: 'OTHER RULES' },
  { kind: 'rule', title: 'Leadership Tests', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Random Characteristics', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Aura Abilities', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Psychic Weapons and Abilities', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Deployment Abilities', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Stratagems', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Strategic Reserves', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Placing Units into Strategic Reserves', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Arriving from Strategic Reserves', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Setting Up Strategic Reserve Units', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Benefit of Cover', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Aircraft', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Deploying Aircraft', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Aircraft in the Movement Phase', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Aircraft and the Movement of Other Models', parent: 'OTHER RULES' },
  { kind: 'rule', title: 'Aircraft in the Charge and Fight Phases', parent: 'OTHER RULES' }
];

const EXCLUDED_HEADINGS = new Set([
  'introduction',
  'missions',
  'only war',
  'muster your army',
  'objective markers',
  'objective markers and terrain features',
  'mission map key',
  'example battlefields',
  'armies',
  'units',
  'datasheets',
  'keywords',
  'redeployments',
  'battlefield',
  'terrain features'
]);

function argValue(name) {
  const flag = `--${name}`;
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : '';
}

function decodeEntities(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return String(value || '').replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, function (match, entity) {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const code = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (entity.startsWith('#')) {
      const code = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return named[entity] || match;
  });
}

function fixMojibake(value) {
  let result = String(value || '');
  for (let index = 0; index < 2; index += 1) {
    if (!result.includes('â') && !result.includes('Ã')) break;
    result = Buffer.from(result, 'latin1').toString('utf8');
  }
  return result;
}

function cleanText(value) {
  return fixMojibake(decodeEntities(value))
    .replace(/\u00a0/g, ' ')
    .replace(/[’‘]/g, "'")
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeHeading(value) {
  return cleanText(String(value || '').replace(/\s*Image\s*/gi, ' '))
    .replace(/[^\w\s.'\-:&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizedHeadingKey(value) {
  return normalizeHeading(value).toLowerCase();
}

function slugify(value) {
  return normalizedHeadingKey(value).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function manifestRulesForSection(sectionTitle) {
  const sectionKey = normalizedHeadingKey(sectionTitle);
  return RULE_MANIFEST
    .filter(function (entry) {
      return entry.kind === 'rule' && normalizedHeadingKey(entry.parent || '') === sectionKey;
    })
    .map(function (entry) { return entry.title; });
}

function sectionRecord(title) {
  const key = normalizedHeadingKey(title);
  return RULE_MANIFEST.find(function (entry) {
    return entry.kind === 'section' && normalizedHeadingKey(entry.title) === key;
  }) || null;
}

function findManifestRule(heading, currentSectionTitle) {
  const headingKey = normalizedHeadingKey(heading);
  const sectionKey = normalizedHeadingKey(currentSectionTitle || '');
  const exactInSection = RULE_MANIFEST.find(function (entry) {
    if (entry.kind !== 'rule') return false;
    const candidates = [entry.title].concat(Array.isArray(entry.aliases) ? entry.aliases : []);
    const matches = candidates.some(function (candidate) {
      return normalizedHeadingKey(candidate) === headingKey;
    });
    if (!matches) return false;
    if (!entry.parent) return true;
    return normalizedHeadingKey(entry.parent) === sectionKey;
  });
  if (exactInSection) return exactInSection;

  return RULE_MANIFEST.find(function (entry) {
    if (entry.kind !== 'rule') return false;
    const candidates = [entry.title].concat(Array.isArray(entry.aliases) ? entry.aliases : []);
    return candidates.some(function (candidate) {
      return normalizedHeadingKey(candidate) === headingKey;
    });
  }) || null;
}

function stripNoise(html) {
  return String(html || '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, '');
}

function trimToLikelyRulesRegion(html) {
  const lower = html.toLowerCase();
  const startMarker = '<a name="introduction"></a>';
  const endMarker = '<div class="tooltip_templates">';
  const startIndex = lower.indexOf(startMarker);
  const endIndex = lower.indexOf(endMarker, Math.max(startIndex, 0));
  return html.slice(startIndex >= 0 ? startIndex : 0, endIndex > startIndex ? endIndex : html.length);
}

function stripRuleMarkup(html) {
  return String(html || '')
    .replace(/<div style="margin:auto; max-width:[^"]*"[\s\S]*?<\/div>\s*/gi, ' ')
    .replace(/<div class="noprint[\s\S]*?<\/div>\s*/gi, ' ')
    .replace(/<div class="page_ads_[^"]*"[\s\S]*?<\/div>\s*/gi, ' ')
    .replace(/<span id="ezoic-pub-[^"]*"[\s\S]*?<\/span>\s*/gi, ' ')
    .replace(/<div[^>]*class="[^"]*ShowFluff[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<p[^>]*class="[^"]*(?:legend|ShowFluff|stratLegend2)[^"]*"[^>]*>[\s\S]*?<\/p>/gi, ' ')
    .replace(/<div[^>]*class="[^"]*(?:img-opa|redExample|frameLight|frameDark|customTable|str10Wrap)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<table[\s\S]*?<\/table>/gi, ' ')
    .replace(/<img\b[^>]*>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|li|blockquote|pre|tr|table|section|article|div|ul|ol)>/gi, '\n')
    .replace(/<(li|p|blockquote|pre|ul|ol)\b[^>]*>/gi, '')
    .replace(/<\/?(span|a|b|i|strong|em|s)[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ');
}

function stripLeadingRepeatedTitle(part, title) {
  const cleanTitle = cleanText(title || '');
  if (!cleanTitle) return part;
  const upperTitle = cleanTitle.toUpperCase();
  const candidate = String(part || '');
  if (candidate.indexOf(`${upperTitle} `) === 0) return candidate.slice(upperTitle.length).trim();
  const directPattern = new RegExp(`^${upperTitle.replace(/[^A-Z0-9 ]/g, '\\$&')}\\s+`, 'i');
  return candidate.replace(directPattern, '').trim();
}

function cleanupExtractedParagraph(part, title) {
  let value = cleanText(String(part || ''))
    .replace(/\bExample:\b[\s\S]*$/i, '')
    .replace(/\b[A-Z]\s+Each model in this\b/g, 'Each model in this')
    .trim();
  const hardCutMarkers = [
    'Each model in this Sternguard Veterans unit of five models',
    'The Termagant unit is selected to fight',
    'The controlling player chooses the order in which to move their models.'
  ];
  hardCutMarkers.forEach(function (marker) {
    const markerIndex = value.indexOf(marker);
    if (markerIndex >= 0) value = value.slice(0, markerIndex).trim();
  });
  return stripLeadingRepeatedTitle(value, title).trim();
}

function normalizedParagraphsFromHtml(html, options) {
  const title = options && options.title ? options.title : '';
  return cleanText(stripRuleMarkup(html))
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .split(/\n\s*\n/)
    .map(function (part) { return cleanupExtractedParagraph(part, title); })
    .filter(Boolean)
    .filter(function (part) { return !shouldSkipTextLine(part); });
}

function shouldSkipTextLine(text) {
  const value = cleanText(text);
  if (!value) return true;
  if (value.length <= 2) return true;
  if (/^(wahapedia|home|login|settings|the rules|factions)$/i.test(value)) return true;
  if (/^page \d+$/i.test(value)) return true;
  if (/^warhammer 40,?000/i.test(value) && value.length < 50) return true;
  if (/^(A|B|C|D|E|F)$/.test(value)) return true;
  return false;
}

function titleCaseRuleName(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/\b([a-z])/g, function (_, letter) { return letter.toUpperCase(); })
    .replace(/^([0-9]+)([a-z])/i, '$1$2');
}

function extractAbilityBlocksFromChunk(html) {
  const blocks = [];
  const pattern = /<div class="Corner33 abWrap BreakInsideAvoid">[\s\S]*?<div class="abName">([\s\S]*?)<\/div>[\s\S]*?<\/div>\s*(?=<div class="Corner33 abWrap BreakInsideAvoid">|$)/gi;
  let match;
  while ((match = pattern.exec(String(html || ''))) !== null) {
    blocks.push({
      title: titleCaseRuleName(match[1].replace(/<[^>]+>/g, ' ')),
      html: match[0]
    });
  }
  return blocks;
}

function buildSnapshotFromHtml(html, fileName) {
  const sourceHtml = trimToLikelyRulesRegion(stripNoise(html));
  const entries = [];
  const warnings = [];
  const seenSections = new Set();
  const seenRules = new Set();
  let currentSection = null;
  let started = false;
  const headingPattern = /<a name="([^"]+)"><\/a>\s*<h([23])[^>]*>([\s\S]*?)<\/h\2>/gi;
  const headingMatches = [];
  let match;

  while ((match = headingPattern.exec(sourceHtml)) !== null) {
    headingMatches.push({
      index: match.index,
      endIndex: headingPattern.lastIndex,
      anchor: match[1],
      title: normalizeHeading(match[3].replace(/<[^>]+>/g, ' '))
    });
  }

  function ensureSection(title) {
    const record = sectionRecord(title);
    if (!record) return null;
    const key = normalizedHeadingKey(record.title);
    currentSection = {
      id: `imported-section-${slugify(record.title)}`,
      title: record.title,
      topicId: 'imported-document',
      topicLabel: 'Imported Document',
      summary: '',
      body: '',
      bodySegments: [],
      bullets: manifestRulesForSection(record.title),
      keywords: []
    };
    if (!seenSections.has(key)) {
      entries.push(currentSection);
      seenSections.add(key);
    }
    return currentSection;
  }

  headingMatches.forEach(function (headingMatch, index) {
    const heading = headingMatch.title;
    const headingKey = normalizedHeadingKey(heading);
    if (!heading) return;
    if (EXCLUDED_HEADINGS.has(headingKey)) return;
    if (!started) {
      if (headingKey === 'core concepts') started = true;
      else return;
    }

    const nextMatch = headingMatches[index + 1];
    const bodyHtml = sourceHtml.slice(headingMatch.endIndex, nextMatch ? nextMatch.index : sourceHtml.length);

    const section = sectionRecord(heading);
    if (section) {
      ensureSection(section.title);
      return;
    }

    const rule = findManifestRule(heading, currentSection ? currentSection.title : '');
    if (!rule) {
      if (heading.length <= 90) warnings.push(`Unmatched heading: ${heading}`);
      return;
    }

    if (rule.parent) ensureSection(rule.parent);
    const ruleKey = normalizedHeadingKey(rule.title);
    if (seenRules.has(ruleKey)) return;

    if (rule.title === 'Deployment Abilities' || rule.title === 'Weapon Abilities') {
      const abilityBlocks = extractAbilityBlocksFromChunk(bodyHtml);
      if (abilityBlocks.length) {
        abilityBlocks.forEach(function (abilityBlock) {
          const abilityKey = normalizedHeadingKey(abilityBlock.title);
          if (!abilityKey || seenRules.has(abilityKey)) return;
          const abilitySegments = normalizedParagraphsFromHtml(abilityBlock.html, { title: abilityBlock.title });
          if (!abilitySegments.length) return;
          entries.push({
            id: `imported-rule-${slugify(abilityBlock.title)}`,
            title: abilityBlock.title,
            topicId: 'imported-document',
            topicLabel: currentSection ? currentSection.title : 'Imported Document',
            summary: '',
            body: abilitySegments.join('\n\n'),
            bodySegments: abilitySegments,
            bullets: [],
            keywords: []
          });
          seenRules.add(abilityKey);
        });
        return;
      }
    }

    const bodySegments = normalizedParagraphsFromHtml(bodyHtml, { title: rule.title });
    if (!bodySegments.length) {
      warnings.push(`Skipped empty rule: ${rule.title}`);
      return;
    }

    entries.push({
      id: `imported-rule-${slugify(rule.title)}`,
      title: rule.title,
      topicId: 'imported-document',
      topicLabel: currentSection ? currentSection.title : 'Imported Document',
      summary: '',
      body: bodySegments.join('\n\n'),
      bodySegments: bodySegments,
      bullets: [],
      keywords: []
    });
    seenRules.add(ruleKey);
  });

  return {
    name: 'Warhammer 40,000 10th Edition',
    summary: 'Rulebook snapshot generated from saved Wahapedia Core Rules HTML.',
    fileName: fileName || 'wahapedia-core-rules-snapshot.json',
    generatedAt: new Date().toISOString(),
    source: {
      type: 'saved-wahapedia-html',
      page: 'Core Rules'
    },
    topics: [
      {
        id: 'imported-document',
        label: 'Imported Document',
        entries: entries
      }
    ],
    warnings: warnings
  };
}

function ensureDirSync(dirPath) {
  if (!dirPath || fs.existsSync(dirPath)) return;
  const parent = path.dirname(dirPath);
  if (parent && parent !== dirPath) ensureDirSync(parent);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
}

function main() {
  const inputArg = argValue('input');
  const outputArg = argValue('output');
  if (!inputArg) {
    throw new Error('Usage: node scripts/generate_rulebook_snapshot.js --input <saved-core-rules.html> [--output <snapshot.json>]');
  }

  const inputPath = path.resolve(ROOT, inputArg);
  const outputPath = outputArg
    ? path.resolve(ROOT, outputArg)
    : path.join(ROOT, 'data', 'rulebook', 'imports', `${path.basename(inputPath, path.extname(inputPath))}.json`);

  const html = fs.readFileSync(inputPath, 'utf8');
  const snapshot = buildSnapshotFromHtml(html, path.basename(outputPath));

  ensureDirSync(path.dirname(outputPath));
  fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

  const entryCount = snapshot.topics.reduce(function (sum, topic) {
    return sum + (Array.isArray(topic.entries) ? topic.entries.length : 0);
  }, 0);
  console.log(`Wrote ${entryCount} rulebook entries to ${outputPath}`);
  if (snapshot.warnings.length) {
    console.log(`Warnings: ${snapshot.warnings.length}`);
  }
}

main();
