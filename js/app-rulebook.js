const rulebookDatabase = window.WH40K_RULEBOOK_DATABASE || { source: {}, editions: [] };
const rulebookEditions = Array.isArray(rulebookDatabase.editions) ? rulebookDatabase.editions : [];
const defaultRulebookEdition = rulebookEditions.find(function (edition) { return edition.id === '10th'; }) || rulebookEditions[0] || null;
const RULEBOOK_IMPORT_DB_NAME = 'wh40k-rulebook-imports';
const RULEBOOK_IMPORT_STORE = 'imports';
const RULEBOOK_IMPORT_KEY = '10th-core-rules';
let importedRulebookIndex = null;
let rulebookImportInProgress = false;
let pdfJsLoaderPromise = null;
const WAHAPEDIA_CORE_RULES_ALLOWED_HEADINGS = [
  'Introduction',
  'CORE CONCEPTS',
  'Missions',
  'Armies',
  'Units',
  'Datasheets',
  'Keywords',
  'Redeployments',
  'Engagement Range',
  'Unit Coherency',
  'Battlefield',
  'Terrain Features',
  'Measuring Distances',
  'Determining Visibility',
  'Model Visible',
  'Unit Visible',
  'Model Fully Visible',
  'Unit Fully Visible',
  'Dice',
  'Re-rolls',
  'Roll-offs',
  'Sequencing',
  'The Battle Round',
  'Persisting Effects',
  'Out-of-Phase Rules',
  'COMMAND PHASE',
  '1. Command',
  '2. Battle-shock',
  'Gaining Command Points',
  'Starting Strength',
  'Below Half-strength',
  'Destroyed',
  'Attached Units',
  'MOVEMENT PHASE',
  '1. Move Units',
  'Remain Stationary',
  'Normal Moves',
  'Straight Lines',
  'Pivots',
  'Advance Moves',
  'Fall Back Moves',
  'Moving Over Terrain',
  'Flying',
  '2. Reinforcements',
  'Transports',
  'Transport Capacity',
  'Embark',
  'Disembark',
  'Destroyed Transports',
  'SHOOTING PHASE',
  'Select Targets',
  'Make Ranged Attacks',
  'Locked in Combat',
  'Big Guns Never Tire',
  'Making Attacks',
  '1. Hit Roll',
  '2. Wound Roll',
  '3. Allocate Attack',
  '4. Saving Throw',
  'Invulnerable Saves',
  'Mortal Wounds',
  '5. Inflict Damage',
  'Weapon Abilities',
  'CHARGE PHASE',
  'Charge Bonus',
  'Charging with a Unit',
  'Charging Over Terrain',
  'Charging with Flying Models',
  'FIGHT PHASE',
  '1. Fights First',
  '2. Remaining Combats',
  'Fight',
  '1. Pile In',
  '2. Make Melee Attacks',
  'Which Models Fight',
  'Select Weapon',
  'Make Attacks',
  '3. Consolidate',
  'Leadership Tests',
  'Random Characteristics',
  'Aura Abilities',
  'Psychic Weapons and Abilities',
  'Deployment Abilities',
  'Stratagems',
  'Strategic Reserves',
  'Placing Units into Strategic Reserves',
  'Arriving from Strategic Reserves',
  'Setting Up Strategic Reserve Units',
  'Benefit of Cover',
  'Example Battlefields',
  'Aircraft',
  'Deploying Aircraft',
  'Aircraft in the Movement Phase',
  'Aircraft and the Movement of Other Models',
  'Aircraft in the Charge and Fight Phases',
  'Muster Your Army',
  'Objective Markers',
  'Objective Markers and Terrain Features',
  'Mission Map Key',
  'Only War'
];
const WAHAPEDIA_CORE_RULES_ALLOWED_HEADING_SET = new Set(WAHAPEDIA_CORE_RULES_ALLOWED_HEADINGS.map(function (heading) {
  return String(heading).toLowerCase();
}));
const WAHAPEDIA_RULE_MANIFEST = [
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

function activeRulebookEditionRecord() {
  return importedRulebookIndex || defaultRulebookEdition;
}

function activeRulebookTopics() {
  const edition = activeRulebookEditionRecord();
  return edition && Array.isArray(edition.topics) ? edition.topics : [];
}

function rulebookEntries() {
  const entries = [];
  activeRulebookTopics().forEach(function (topic) {
    if (!Array.isArray(topic.entries)) return;
    topic.entries.forEach(function (entry) {
      entries.push(Object.assign({}, entry, {
        topicId: entry && entry.topicId ? entry.topicId : topic.id,
        topicLabel: entry && entry.topicLabel ? entry.topicLabel : topic.label
      }));
    });
  });
  return entries;
}

function populateRulebookTopicOptions() {
  if (!rulebookTopicSelect) return;
  if (importedRulebookIndex) {
    rulebookTopicSelect.innerHTML = '<option value="">Imported Sections</option>';
    rulebookTopicSelect.value = '';
    rulebookTopicSelect.disabled = true;
    return;
  }
  rulebookTopicSelect.disabled = false;
  const previousValue = rulebookTopicSelect.value || '';
  const topics = activeRulebookTopics();
  rulebookTopicSelect.innerHTML = ['<option value="">All Topics</option>']
    .concat(topics.map(function (topic) {
      return `<option value="${escapeHtml(topic.id)}">${escapeHtml(topic.label)}</option>`;
    }))
    .join('');
  if (previousValue && topics.some(function (topic) { return topic.id === previousValue; })) {
    rulebookTopicSelect.value = previousValue;
  }
}

function rulebookEntryMatchesSearch(entry, searchTerm) {
  if (!searchTerm) return true;
  const haystack = [
    entry.title,
    entry.summary,
    entry.topicLabel,
    entry.body || '',
  ]
    .concat(Array.isArray(entry.bullets) ? entry.bullets : [])
    .concat(Array.isArray(entry.bodySegments) ? entry.bodySegments : [])
    .concat(Array.isArray(entry.keywords) ? entry.keywords : [])
    .join(' ')
    .toLowerCase();
  return haystack.includes(searchTerm);
}

function renderRulebookImportStatus(message) {
  if (rulebookImportStatus) rulebookImportStatus.textContent = message;
}

function updateRulebookImportControls() {
  const disabled = !!rulebookImportInProgress;
  if (rulebookImportBtn) rulebookImportBtn.disabled = disabled;
  if (rulebookClearImportBtn) rulebookClearImportBtn.disabled = disabled;
  if (rulebookImportInput) rulebookImportInput.disabled = disabled;
}

function openRulebookImportDatabase() {
  return new Promise(function (resolve, reject) {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not available.'));
      return;
    }
    const request = window.indexedDB.open(RULEBOOK_IMPORT_DB_NAME, 1);
    request.onupgradeneeded = function () {
      const db = request.result;
      if (!db.objectStoreNames.contains(RULEBOOK_IMPORT_STORE)) {
        db.createObjectStore(RULEBOOK_IMPORT_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = function () { resolve(request.result); };
    request.onerror = function () { reject(request.error || new Error('Unable to open rulebook import database.')); };
  });
}

function readStoredRulebookImport() {
  return openRulebookImportDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(RULEBOOK_IMPORT_STORE, 'readonly');
      const store = tx.objectStore(RULEBOOK_IMPORT_STORE);
      const request = store.get(RULEBOOK_IMPORT_KEY);
      request.onsuccess = function () {
        db.close();
        resolve(request.result || null);
      };
      request.onerror = function () {
        db.close();
        reject(request.error || new Error('Unable to read imported rulebook.'));
      };
    });
  });
}

function writeStoredRulebookImport(record) {
  return openRulebookImportDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(RULEBOOK_IMPORT_STORE, 'readwrite');
      const store = tx.objectStore(RULEBOOK_IMPORT_STORE);
      store.put(record);
      tx.oncomplete = function () {
        db.close();
        resolve(record);
      };
      tx.onerror = function () {
        db.close();
        reject(tx.error || new Error('Unable to save imported rulebook.'));
      };
    });
  });
}

function deleteStoredRulebookImport() {
  return openRulebookImportDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(RULEBOOK_IMPORT_STORE, 'readwrite');
      tx.objectStore(RULEBOOK_IMPORT_STORE).delete(RULEBOOK_IMPORT_KEY);
      tx.oncomplete = function () {
        db.close();
        resolve();
      };
      tx.onerror = function () {
        db.close();
        reject(tx.error || new Error('Unable to delete imported rulebook.'));
      };
    });
  });
}

function summarizeImportedRulebook(record) {
  if (!record) {
    return 'No imported full-text rulebook is stored on this device.';
  }
  const importedAt = record.importedAt ? new Date(record.importedAt).toLocaleString() : 'unknown time';
  const entryCount = Array.isArray(record.topics) ? record.topics.reduce(function (sum, topic) {
    return sum + (Array.isArray(topic.entries) ? topic.entries.length : 0);
  }, 0) : 0;
  const sourceType = record && record.source && record.source.type ? String(record.source.type) : '';
  let importLabel = 'Imported full-text rulebook';
  if (record.fileType === 'application/json' || sourceType === 'saved-wahapedia-html') {
    importLabel = 'Imported JSON snapshot';
  } else if (record.fileType === 'text/html') {
    importLabel = 'Imported raw HTML rulebook';
  } else if (record.fileType === 'application/pdf') {
    importLabel = 'Imported PDF rulebook';
  } else if (record.fileType && record.fileType.indexOf('text/') === 0) {
    importLabel = 'Imported text rulebook';
  }
  const recommendation = importLabel === 'Imported raw HTML rulebook'
    ? ' JSON snapshots are recommended for the cleanest results.'
    : '';
  return `${importLabel} loaded from ${record.fileName || 'local file'} on ${importedAt}. ${entryCount} indexed section${entryCount === 1 ? '' : 's'} available on this device.${recommendation}`;
}

function loadStoredRulebookImport() {
  return readStoredRulebookImport().then(function (record) {
    importedRulebookIndex = record ? {
      id: '10th',
      name: record.name || 'Warhammer 40,000 10th Edition',
      summary: record.summary || 'Imported local rulebook text.',
      topics: Array.isArray(record.topics) ? record.topics : []
    } : null;
    renderRulebookImportStatus(summarizeImportedRulebook(record));
    return importedRulebookIndex;
  }).catch(function () {
    importedRulebookIndex = null;
    renderRulebookImportStatus('Imported rulebook storage is unavailable on this device. Built-in reference remains available.');
    return null;
  });
}

function clearImportedRulebook() {
  if (rulebookImportInProgress) return;
  rulebookImportInProgress = true;
  updateRulebookImportControls();
  renderRulebookImportStatus('Clearing imported rulebook...');
  deleteStoredRulebookImport().catch(function () {
    return null;
  }).then(function () {
    importedRulebookIndex = null;
    if (rulebookImportInput) rulebookImportInput.value = '';
    populateRulebookTopicOptions();
    renderRulebookEntries();
    renderRulebookImportStatus('Imported rulebook removed from this device. Built-in quick reference is active again.');
  }).finally(function () {
    rulebookImportInProgress = false;
    updateRulebookImportControls();
  });
}

function normalizeImportedParagraphs(text) {
  return String(text || '')
    .replace(/\r/g, '')
    .replace(/\u0000/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .split(/\n\s*\n/)
    .map(function (part) { return part.trim(); })
    .filter(Boolean);
}

function looksLikeHeading(paragraph) {
  const value = String(paragraph || '').trim();
  if (!value || value.length > 90) return false;
  if (/[.!?]$/.test(value)) return false;
  if (/^contents$/i.test(value)) return true;
  if (/^page\s+\d+/i.test(value)) return true;
  const lettersOnly = value.replace(/[^A-Za-z]/g, '');
  if (lettersOnly && lettersOnly === lettersOnly.toUpperCase() && lettersOnly.length >= 4) return true;
  return /^[A-Z0-9][A-Za-z0-9 ,:()'/-]+$/.test(value);
}

function sentencePreview(text) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return 'Imported rules text.';
  if (normalized.length <= 220) return normalized;
  return `${normalized.slice(0, 217).trim()}...`;
}

function keywordsFromText(text) {
  const common = [
    'command', 'movement', 'shooting', 'charge', 'fight', 'terrain', 'objective',
    'transport', 'reserves', 'stratagem', 'cover', 'aircraft', 'leadership',
    'battle-shock', 'weapon', 'damage', 'coherency', 'engagement range'
  ];
  const lower = String(text || '').toLowerCase();
  return common.filter(function (keyword) { return lower.indexOf(keyword) >= 0; }).slice(0, 8);
}

function chunkTextIntoImportedEntries(text, sourceLabel) {
  const paragraphs = normalizeImportedParagraphs(text);
  const chunks = [];
  let currentTitle = sourceLabel || 'Imported Rules';
  let currentBody = [];
  let sectionCounter = 1;

  function pushChunk() {
    if (!currentBody.length) return;
    const bodySegments = currentBody.slice();
    const combined = bodySegments.join('\n\n');
    chunks.push({
      id: `imported-entry-${sectionCounter}`,
      title: currentTitle || `Imported Section ${sectionCounter}`,
      summary: sentencePreview(combined),
      body: combined,
      bodySegments: bodySegments,
      keywords: keywordsFromText(`${currentTitle} ${combined}`)
    });
    sectionCounter += 1;
    currentBody = [];
  }

  paragraphs.forEach(function (paragraph) {
    if (looksLikeHeading(paragraph)) {
      pushChunk();
      currentTitle = paragraph;
      return;
    }
    const currentLength = currentBody.join('\n\n').length;
    if (currentLength > 1400) {
      pushChunk();
      currentTitle = `${sourceLabel || 'Imported Rules'} ${sectionCounter}`;
    }
    currentBody.push(paragraph);
  });
  pushChunk();
  return chunks;
}

function buildImportedTopicsFromEntries(entries) {
  return [
    {
      id: 'imported-document',
      label: 'Imported Document',
      entries: Array.isArray(entries) ? entries : []
    }
  ];
}

function importPlainTextRulebook(text, fileName) {
  const entries = chunkTextIntoImportedEntries(text, fileName.replace(/\.[^.]+$/, '') || 'Imported Rules');
  return {
    id: RULEBOOK_IMPORT_KEY,
    name: 'Warhammer 40,000 10th Edition',
    summary: 'Imported local full-text rulebook.',
    importedAt: new Date().toISOString(),
    fileName: fileName,
    fileType: 'text/plain',
    topics: buildImportedTopicsFromEntries(entries)
  };
}

function preferredHtmlImportRoot(doc) {
  return doc.querySelector('main')
    || doc.querySelector('article')
    || doc.querySelector('#content')
    || doc.querySelector('.content')
    || doc.querySelector('.main')
    || doc.body;
}

function cleanHtmlImportRoot(root) {
  const clone = root.cloneNode(true);
  Array.from(clone.querySelectorAll('script, style, noscript, svg, nav, footer, header, form, button, input, select, textarea, iframe')).forEach(function (node) {
    node.remove();
  });
  return clone;
}

function normalizeHtmlText(text) {
  return String(text || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shouldIgnoreHtmlText(text) {
  const value = normalizeHtmlText(text);
  if (!value) return true;
  if (value.length <= 2) return true;
  if (/^(home|menu|login|log in|share|print)$/i.test(value)) return true;
  if (/^wahapedia/i.test(value)) return true;
  if (/^page\s+\d+$/i.test(value)) return true;
  return false;
}

function extractSegmentsFromHtmlTable(tableNode) {
  const rows = Array.from(tableNode.querySelectorAll('tr'));
  const segments = [];
  let previousRow = '';
  rows.forEach(function (row) {
    const cells = Array.from(row.querySelectorAll('th, td'))
      .map(function (cell) { return normalizeHtmlText(cell.textContent || ''); })
      .filter(function (cellText) { return !shouldIgnoreHtmlText(cellText); });
    if (!cells.length) return;
    let rowText = '';
    if (cells.length === 1) {
      rowText = cells[0];
    } else if (cells.length === 2) {
      rowText = `${cells[0]}: ${cells[1]}`;
    } else {
      rowText = cells.join(' | ');
    }
    if (!rowText || rowText === previousRow) return;
    previousRow = rowText;
    segments.push(rowText);
  });
  return segments;
}

function extractSegmentsFromHtmlNode(node) {
  const tagName = String(node.tagName || '').toLowerCase();
  if (tagName === 'table') return extractSegmentsFromHtmlTable(node);
  const textValue = normalizeHtmlText(node.textContent || '');
  if (shouldIgnoreHtmlText(textValue)) return [];
  return [textValue];
}

function htmlNodeHasNestedContentNodes(node) {
  if (!node || typeof node.querySelector !== 'function') return false;
  return !!node.querySelector('p, li, blockquote, pre, table');
}

function isLikelyWahapediaCoreRulesDocument(doc, text) {
  const title = normalizeHtmlText((doc && doc.title) || '');
  const lower = `${title} ${String(text || '').slice(0, 2000)}`.toLowerCase();
  return lower.indexOf('wahapedia') >= 0 && lower.indexOf('core rules') >= 0;
}

function normalizeWahapediaHeading(text) {
  return normalizeHtmlText(String(text || '')
    .replace(/\s*Image\s*/gi, ' ')
    .replace(/[^\w\s.'’\-:&]/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function isAllowedWahapediaHeading(text) {
  return WAHAPEDIA_CORE_RULES_ALLOWED_HEADING_SET.has(normalizeWahapediaHeading(text).toLowerCase());
}

function normalizedManifestHeading(text) {
  return normalizeWahapediaHeading(text).toLowerCase();
}

function findManifestEntryByHeading(heading, currentSectionTitle) {
  const normalizedHeading = normalizedManifestHeading(heading);
  const normalizedSection = currentSectionTitle ? normalizedManifestHeading(currentSectionTitle) : '';
  for (let index = 0; index < WAHAPEDIA_RULE_MANIFEST.length; index += 1) {
    const entry = WAHAPEDIA_RULE_MANIFEST[index];
    const candidates = [entry.title].concat(Array.isArray(entry.aliases) ? entry.aliases : []);
    const matchesHeading = candidates.some(function (candidate) {
      return normalizedManifestHeading(candidate) === normalizedHeading;
    });
    if (!matchesHeading) continue;
    if (entry.parent && normalizedManifestHeading(entry.parent) !== normalizedSection) continue;
    return entry;
  }
  return null;
}

function manifestRulesForSection(sectionTitle) {
  const normalizedSection = normalizedManifestHeading(sectionTitle);
  return WAHAPEDIA_RULE_MANIFEST
    .filter(function (entry) {
      return entry.kind === 'rule' && normalizedManifestHeading(entry.parent || '') === normalizedSection;
    })
    .map(function (entry) { return entry.title; });
}

function manifestSectionEntry(sectionTitle) {
  if (!sectionTitle) return null;
  return WAHAPEDIA_RULE_MANIFEST.find(function (entry) {
    return entry.kind === 'section' && normalizedManifestHeading(entry.title) === normalizedManifestHeading(sectionTitle);
  }) || null;
}

function isPromotableManifestHeadingNode(node, segments) {
  const tagName = String((node && node.tagName) || '').toLowerCase();
  if (/^h[1-6]$/.test(tagName)) return true;
  if (!Array.isArray(segments) || segments.length !== 1) return false;
  if (htmlNodeHasNestedContentNodes(node)) return false;
  const textValue = normalizeWahapediaHeading(segments[0] || '');
  if (!textValue || textValue.length > 90) return false;
  if (/[.!?]$/.test(textValue)) return false;
  return isAllowedWahapediaHeading(textValue);
}

function importWahapediaCoreRulesHtml(doc, fileName) {
  const root = cleanHtmlImportRoot(preferredHtmlImportRoot(doc));
  const nodes = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, blockquote, pre'));
  const entries = [];
  let started = false;
  let currentSection = null;
  let currentRuleEntry = null;
  const seenHeadings = new Set();
  const emittedSectionKeys = new Set();

  function pushCurrentRuleEntry() {
    if (!currentRuleEntry) return;
    const exactSegments = currentRuleEntry.bodySegments.filter(Boolean);
    if (!exactSegments.length) {
      currentRuleEntry = null;
      return;
    }
    currentRuleEntry.body = exactSegments.join('\n\n');
    currentRuleEntry.summary = '';
    currentRuleEntry.bullets = [];
    currentRuleEntry.keywords = [];
    entries.push(currentRuleEntry);
    currentRuleEntry = null;
  }

  function ensureSection(sectionTitle) {
    const sectionRecord = manifestSectionEntry(sectionTitle);
    if (!sectionRecord) return null;
    const sectionKey = normalizedManifestHeading(sectionRecord.title);
    currentSection = {
      id: `imported-section-${sectionKey.replace(/[^a-z0-9]+/g, '-')}`,
      title: sectionRecord.title,
      topicId: 'imported-document',
      topicLabel: 'Imported Document',
      summary: '',
      body: '',
      bodySegments: [],
      bullets: manifestRulesForSection(sectionRecord.title),
      keywords: []
    };
    if (!emittedSectionKeys.has(sectionKey)) {
      entries.push(currentSection);
      emittedSectionKeys.add(sectionKey);
    }
    return currentSection;
  }

  function startRuleEntry(ruleRecord) {
    if (!ruleRecord) return;
    if (ruleRecord.parent) ensureSection(ruleRecord.parent);
    currentRuleEntry = {
      id: `imported-rule-${normalizedManifestHeading(ruleRecord.title).replace(/[^a-z0-9]+/g, '-')}`,
      title: ruleRecord.title,
      topicId: 'imported-document',
      topicLabel: currentSection ? currentSection.title : 'Imported Document',
      summary: '',
      body: '',
      bodySegments: [],
      bullets: [],
      keywords: []
    };
  }

  nodes.forEach(function (node) {
    const tagName = String(node.tagName || '').toLowerCase();
    const extractedSegments = extractSegmentsFromHtmlNode(node);
    const promotableHeading = isPromotableManifestHeadingNode(node, extractedSegments);
    if (promotableHeading) {
      const normalizedHeading = normalizeWahapediaHeading((extractedSegments[0] || node.textContent || ''));
      const headingKey = normalizedHeading.toLowerCase();
      if (!isAllowedWahapediaHeading(normalizedHeading)) return;

      if (!started) {
        if (headingKey === 'introduction' || headingKey === 'core concepts') {
          started = true;
        } else {
          return;
        }
      }

      if (headingKey === 'contents' || headingKey === 'books') return;
      if (seenHeadings.has(headingKey)) return;
      seenHeadings.add(headingKey);
      const matchedManifestEntry = findManifestEntryByHeading(normalizedHeading, currentSection ? currentSection.title : '') || findManifestEntryByHeading(normalizedHeading, '');
      if (!matchedManifestEntry) return;

      pushCurrentRuleEntry();

      if (matchedManifestEntry.kind === 'section') {
        ensureSection(matchedManifestEntry.title);
        return;
      }

      startRuleEntry(matchedManifestEntry);
      return;
    }

    if (!currentRuleEntry) return;
    if (htmlNodeHasNestedContentNodes(node)) return;
    const segments = extractedSegments;
    if (!segments.length) return;
    segments.forEach(function (segment) {
      if (!segment) return;
      const previousSegment = currentRuleEntry.bodySegments[currentRuleEntry.bodySegments.length - 1];
      if (segment === previousSegment) return;
      currentRuleEntry.bodySegments.push(segment);
    });
  });

  pushCurrentRuleEntry();

  return {
    id: RULEBOOK_IMPORT_KEY,
    name: 'Warhammer 40,000 10th Edition',
    summary: 'Imported exact-text gameplay rules from a saved Wahapedia Core Rules page.',
    importedAt: new Date().toISOString(),
    fileName: fileName,
    fileType: 'text/html',
    topics: buildImportedTopicsFromEntries(entries)
  };
}

function importHtmlRulebook(text, fileName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  if (isLikelyWahapediaCoreRulesDocument(doc, text)) {
    return importWahapediaCoreRulesHtml(doc, fileName);
  }
  const root = cleanHtmlImportRoot(preferredHtmlImportRoot(doc));
  const nodes = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, blockquote, pre, table'));
  const entries = [];
  let currentTitle = doc.title || fileName.replace(/\.[^.]+$/, '') || 'Imported Rules';
  let currentBodySegments = [];
  let sectionCounter = 1;
  let previousText = '';

  function pushEntry() {
    if (!currentBodySegments.length) return;
    const bodySegments = currentBodySegments.slice();
    const body = bodySegments.join('\n\n');
    entries.push({
      id: `imported-html-entry-${sectionCounter}`,
      title: currentTitle || `Imported Section ${sectionCounter}`,
      summary: sentencePreview(body),
      body: body,
      bodySegments: bodySegments,
      keywords: keywordsFromText(`${currentTitle} ${body}`)
    });
    sectionCounter += 1;
    currentBodySegments = [];
  }

  nodes.forEach(function (node) {
    const tagName = String(node.tagName || '').toLowerCase();
    if (tagName !== 'table' && !/^h[1-6]$/.test(tagName) && htmlNodeHasNestedContentNodes(node)) return;
    const segments = extractSegmentsFromHtmlNode(node);
    if (!segments.length) return;
    const textValue = tagName === 'table' ? segments.join(' ') : segments[0];
    if (textValue === previousText) return;

    if (/^h[1-6]$/.test(tagName)) {
      pushEntry();
      currentTitle = textValue;
      previousText = textValue;
      return;
    }

    if (previousText && (previousText.indexOf(textValue) >= 0 || textValue.indexOf(previousText) >= 0) && textValue.length <= previousText.length) {
      return;
    }

    segments.forEach(function (segment) {
      if (segment === previousText) return;
      if (previousText && (previousText.indexOf(segment) >= 0 || segment.indexOf(previousText) >= 0) && segment.length <= previousText.length) {
        return;
      }
      currentBodySegments.push(segment);
      previousText = segment;
    });
  });

  pushEntry();

  if (!entries.length) {
    return importPlainTextRulebook(doc.body ? doc.body.textContent || '' : text, fileName);
  }

  return {
    id: RULEBOOK_IMPORT_KEY,
    name: 'Warhammer 40,000 10th Edition',
    summary: 'Imported saved HTML rulebook page.',
    importedAt: new Date().toISOString(),
    fileName: fileName,
    fileType: 'text/html',
    topics: buildImportedTopicsFromEntries(entries)
  };
}

function loadPdfJs() {
  if (pdfJsLoaderPromise) return pdfJsLoaderPromise;
  pdfJsLoaderPromise = Function('return import("https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.min.mjs");')().then(function (pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.mjs';
    return pdfjsLib;
  });
  return pdfJsLoaderPromise;
}

function normalizePdfLineText(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function shouldIgnorePdfLine(text) {
  const value = String(text || '').trim();
  if (!value) return true;
  if (/^\d+$/.test(value)) return true;
  if (/^[A-Z](\s+[A-Z]){0,2}$/.test(value)) return true;
  if (value.replace(/\s/g, '').length <= 2) return true;
  if (/^page\s+\d+$/i.test(value)) return true;
  if (/^page\s+\d+\s+of\s+\d+$/i.test(value)) return true;
  if (/^warhammer\s*40,?000/i.test(value) && value.length < 40) return true;
  if (/^core rules$/i.test(value)) return true;
  if (/^wahapedia/i.test(value)) return true;
  return false;
}

function reorderPdfLinesForReadingOrder(lines) {
  if (!Array.isArray(lines) || lines.length < 12) return lines || [];
  const sortedByX = lines.slice().sort(function (a, b) { return a.x - b.x; });
  let bestGap = 0;
  let bestIndex = -1;
  for (let index = 1; index < sortedByX.length; index += 1) {
    const gap = sortedByX[index].x - sortedByX[index - 1].x;
    if (gap > bestGap) {
      bestGap = gap;
      bestIndex = index;
    }
  }

  if (bestGap < 110 || bestIndex < 4 || (sortedByX.length - bestIndex) < 4) {
    return lines;
  }

  const splitX = (sortedByX[bestIndex - 1].x + sortedByX[bestIndex].x) / 2;
  const leftColumn = lines.filter(function (line) { return line.x <= splitX; });
  const rightColumn = lines.filter(function (line) { return line.x > splitX; });
  if (leftColumn.length < 4 || rightColumn.length < 4) return lines;

  function sortColumn(columnLines) {
    return columnLines.slice().sort(function (a, b) {
      if (Math.abs(b.y - a.y) > 2) return b.y - a.y;
      return a.x - b.x;
    });
  }

  return sortColumn(leftColumn).concat(sortColumn(rightColumn));
}

function buildPdfLinesFromItems(items) {
  const normalizedItems = (items || [])
    .map(function (item) {
      const transform = Array.isArray(item.transform) ? item.transform : [0, 0, 0, 0, 0, 0];
      return {
        text: String(item.str || '').trim(),
        x: Number(transform[4] || 0),
        y: Number(transform[5] || 0),
        fontSize: Math.max(Math.abs(Number(transform[0] || 0)), Math.abs(Number(transform[3] || 0)), Number(item.height || 0), 0)
      };
    })
    .filter(function (item) { return item.text; })
    .sort(function (a, b) {
      if (Math.abs(b.y - a.y) > 2) return b.y - a.y;
      return a.x - b.x;
    });

  const lines = [];
  normalizedItems.forEach(function (item) {
    const lastLine = lines[lines.length - 1];
    if (!lastLine || Math.abs(lastLine.y - item.y) > 2.5) {
      lines.push({
        y: item.y,
        fontSize: item.fontSize,
        parts: [item]
      });
      return;
    }
    lastLine.parts.push(item);
    if (item.fontSize > lastLine.fontSize) lastLine.fontSize = item.fontSize;
  });

  const mappedLines = lines.map(function (line) {
    const parts = line.parts.sort(function (a, b) { return a.x - b.x; });
    const text = normalizePdfLineText(parts.map(function (part) { return part.text; }).join(' '));
    return {
      text: text,
      fontSize: line.fontSize,
      y: line.y,
      x: parts.length ? parts[0].x : 0
    };
  }).filter(function (line) { return !shouldIgnorePdfLine(line.text); });

  return reorderPdfLinesForReadingOrder(mappedLines);
}

function medianNumber(values) {
  if (!values.length) return 0;
  const sorted = values.slice().sort(function (a, b) { return a - b; });
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function looksLikePdfHeading(line, medianFontSize) {
  if (!line || !line.text) return false;
  const text = String(line.text).trim();
  if (text.replace(/\s/g, '').length <= 3) return false;
  if (text.length > 100) return false;
  if (/^[0-9]+\.[0-9]+/.test(text)) return true;
  if (looksLikeHeading(text) && text.split(/\s+/).length <= 8) return true;
  if (line.fontSize > (medianFontSize * 1.28) && text.split(/\s+/).length <= 12) return true;
  return false;
}

function chunkPdfPagesIntoEntries(pages, fileName) {
  const allLines = [];
  pages.forEach(function (page) {
    (page.lines || []).forEach(function (line) {
      allLines.push({
        pageNumber: page.pageNumber,
        text: line.text,
        fontSize: line.fontSize
      });
    });
  });

  const medianFontSize = medianNumber(allLines.map(function (line) { return Number(line.fontSize || 0); }).filter(Boolean)) || 10;
  const entries = [];
  let currentTitle = fileName.replace(/\.[^.]+$/, '') || 'Imported Rules';
  let currentParagraphs = [];
  let currentPages = [];
  let sectionCounter = 1;

  function pushEntry() {
    if (!currentParagraphs.length) return;
    const bodySegments = currentParagraphs.slice();
    const body = bodySegments.join('\n\n');
    const pageLabel = currentPages.length ? `Pages ${currentPages[0]}-${currentPages[currentPages.length - 1]}` : '';
    entries.push({
      id: `imported-pdf-entry-${sectionCounter}`,
      title: currentTitle || `Imported Section ${sectionCounter}`,
      summary: pageLabel ? `${pageLabel}. ${sentencePreview(body)}` : sentencePreview(body),
      body: body,
      bodySegments: bodySegments,
      keywords: keywordsFromText(`${currentTitle} ${body}`)
    });
    currentParagraphs = [];
    currentPages = [];
    sectionCounter += 1;
  }

  pages.forEach(function (page) {
    let paragraphBuffer = [];
    let previousParagraph = '';

    function flushParagraph() {
      if (!paragraphBuffer.length) return;
      const paragraph = paragraphBuffer.join(' ').replace(/\s+/g, ' ').trim();
      paragraphBuffer = [];
      if (!paragraph) return;
      const normalizedParagraph = paragraph.toLowerCase();
      if (normalizedParagraph === previousParagraph) return;
      if (previousParagraph && (previousParagraph.indexOf(normalizedParagraph) >= 0 || normalizedParagraph.indexOf(previousParagraph) >= 0)) {
        if (normalizedParagraph.length <= previousParagraph.length) return;
        currentParagraphs[currentParagraphs.length - 1] = paragraph;
        previousParagraph = normalizedParagraph;
        return;
      }
      currentParagraphs.push(paragraph);
      previousParagraph = normalizedParagraph;
    }

    (page.lines || []).forEach(function (line) {
      if (looksLikePdfHeading(line, medianFontSize)) {
        flushParagraph();
        pushEntry();
        currentTitle = line.text;
        currentPages = [page.pageNumber];
        return;
      }

      if (!currentPages.length || currentPages[currentPages.length - 1] !== page.pageNumber) {
        currentPages.push(page.pageNumber);
      }

      paragraphBuffer.push(line.text);
      const paragraphText = paragraphBuffer.join(' ');
      if (paragraphText.length > 900 || /[.!?]$/.test(line.text)) {
        flushParagraph();
      }
    });

    flushParagraph();
  });

  pushEntry();
  if (entries.length) return entries;

  return pages
    .filter(function (page) { return page.text; })
    .map(function (page) {
      return {
        id: `imported-page-${page.pageNumber}`,
        title: `Page ${page.pageNumber}`,
        summary: sentencePreview(page.text),
        body: page.text,
        bodySegments: [page.text],
        keywords: keywordsFromText(page.text)
      };
    });
}

function importPdfRulebook(arrayBuffer, fileName) {
  return loadPdfJs().then(function (pdfjsLib) {
    return pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  }).then(function (pdf) {
    const pagePromises = [];
    for (let index = 1; index <= pdf.numPages; index += 1) {
      pagePromises.push(
        pdf.getPage(index).then(function (page) {
          return page.getTextContent().then(function (content) {
            const lines = buildPdfLinesFromItems(content.items || []);
            const text = lines.map(function (line) { return line.text; }).join('\n').trim();
            return {
              pageNumber: index,
              text: text,
              lines: lines
            };
          });
        })
      );
    }
    return Promise.all(pagePromises);
  }).then(function (pages) {
    const entries = chunkPdfPagesIntoEntries(pages, fileName);
    return {
      id: RULEBOOK_IMPORT_KEY,
      name: 'Warhammer 40,000 10th Edition',
      summary: 'Imported local PDF full-text rulebook.',
      importedAt: new Date().toISOString(),
      fileName: fileName,
      fileType: 'application/pdf',
      topics: buildImportedTopicsFromEntries(entries)
    };
  });
}

function importJsonRulebook(text) {
  const parsed = JSON.parse(text);
  return {
    id: RULEBOOK_IMPORT_KEY,
    name: parsed.name || 'Warhammer 40,000 10th Edition',
    summary: parsed.summary || 'Imported local full-text rulebook.',
    importedAt: new Date().toISOString(),
    fileName: parsed.fileName || 'imported-rulebook.json',
    fileType: 'application/json',
    topics: Array.isArray(parsed.topics) ? parsed.topics : [],
    source: parsed.source || null
  };
}

function importRulebookFile() {
  if (rulebookImportInProgress) return;
  if (!rulebookImportInput || !rulebookImportInput.files || !rulebookImportInput.files.length) {
    renderRulebookImportStatus('Choose an HTML, PDF, TXT, MD or JSON file first.');
    return;
  }
  const file = rulebookImportInput.files[0];
  const lowerName = String(file.name || '').toLowerCase();
  const isHtml = lowerName.endsWith('.html') || lowerName.endsWith('.htm') || file.type === 'text/html';
  const isPdf = lowerName.endsWith('.pdf') || file.type === 'application/pdf';
  const isJson = lowerName.endsWith('.json') || file.type === 'application/json';
  const isTextLike = !isHtml && !isPdf && (lowerName.endsWith('.txt') || lowerName.endsWith('.md') || file.type.indexOf('text/') === 0 || !file.type);

  if (!isHtml && !isPdf && !isJson && !isTextLike) {
    renderRulebookImportStatus('Unsupported file type. Use HTML, PDF, TXT, MD or JSON.');
    return;
  }

  rulebookImportInProgress = true;
  updateRulebookImportControls();
  renderRulebookImportStatus(`Importing ${file.name}...`);

  let importPromise;
  if (isHtml) {
    importPromise = file.text().then(function (htmlText) {
      return importHtmlRulebook(htmlText, file.name);
    });
  } else if (isPdf) {
    importPromise = file.arrayBuffer().then(function (buffer) {
      return importPdfRulebook(buffer, file.name);
    });
  } else {
    importPromise = file.text().then(function (text) {
      if (isJson) return importJsonRulebook(text);
      return importPlainTextRulebook(text, file.name);
    });
  }

  importPromise.then(function (record) {
    if (!record || !Array.isArray(record.topics) || !record.topics.length) {
      throw new Error('The imported rulebook did not produce any searchable sections.');
    }
    return writeStoredRulebookImport(record);
  }).then(function (record) {
    importedRulebookIndex = {
      id: '10th',
      name: record.name,
      summary: record.summary,
      topics: record.topics
    };
    populateRulebookTopicOptions();
    renderRulebookEntries();
    renderRulebookImportStatus(summarizeImportedRulebook(record));
  }).catch(function (error) {
    const detail = error && error.message ? error.message : 'Unknown import error.';
    renderRulebookImportStatus(`Rulebook import failed: ${detail}`);
  }).finally(function () {
    rulebookImportInProgress = false;
    updateRulebookImportControls();
  });
}

function formattedRulebookParagraphs(entry) {
  const bodySegments = Array.isArray(entry.bodySegments) ? entry.bodySegments.filter(Boolean) : [];
  if (bodySegments.length > 1) return bodySegments;
  if (!bodySegments.length) return [];

  const paragraph = String(bodySegments[0] || '').trim();
  if (!paragraph || paragraph.length < 280) return bodySegments;

  const splitPattern = /(?<=[.!?])\s+(?=(?:If|When|Each|At|For|While|Some|The|To|You|Models|Units|An|A|This|These|Such|Once|During|Then|Otherwise)\b)/g;
  const splitSegments = paragraph
    .split(splitPattern)
    .map(function (segment) { return String(segment || '').trim(); })
    .filter(Boolean);

  return splitSegments.length > 1 ? splitSegments : bodySegments;
}

function rulebookEntryMeta(entry) {
  const title = String((entry && entry.title) || '');
  const topicLabel = String((entry && entry.topicLabel) || '');
  const bulletLines = Array.isArray(entry && entry.bullets) ? entry.bullets : [];
  const bodySegments = Array.isArray(entry && entry.bodySegments) ? entry.bodySegments : [];
  const titleUpper = title.toUpperCase();
  const topicUpper = topicLabel.toUpperCase();
  const tags = [];
  let variant = 'standard';

  if (bulletLines.length && !bodySegments.length) {
    variant = 'section';
    tags.push('Section');
  } else if (/PHASE$/.test(titleUpper)) {
    variant = 'phase';
    tags.push('Phase');
  } else if (/^\d+\./.test(title)) {
    variant = 'step';
    tags.push('Step');
  } else if (importedRulebookIndex) {
    if (topicUpper === 'OTHER RULES') {
      variant = 'subrule';
      tags.push('Subrule');
    } else if (/PHASE$/.test(topicUpper)) {
      variant = 'phase-rule';
      tags.push('Phase Rule');
    }
  }

  if (topicUpper === 'OTHER RULES') tags.push('Other Rules');
  if (['DEEP STRIKE', 'SCOUTS', 'INFILTRATORS', 'LEADER'].indexOf(titleUpper) >= 0) tags.push('Deployment Ability');
  if ([
    'ASSAULT', 'RAPID FIRE', 'IGNORES COVER', 'TWIN-LINKED', 'PISTOL', 'TORRENT', 'LETHAL HITS',
    'LANCE', 'INDIRECT FIRE', 'PRECISION', 'BLAST', 'MELTA', 'HEAVY', 'HAZARDOUS',
    'DEVASTATING WOUNDS', 'SUSTAINED HITS', 'EXTRA ATTACKS', 'ANTI'
  ].indexOf(titleUpper) >= 0) tags.push('Weapon Ability');
  if (topicUpper === 'COMMAND PHASE' || topicUpper === 'MOVEMENT PHASE' || topicUpper === 'SHOOTING PHASE' || topicUpper === 'CHARGE PHASE' || topicUpper === 'FIGHT PHASE') {
    tags.push(topicLabel);
  }

  return {
    variant: variant,
    tags: tags.filter(function (tag, index, source) {
      return !!tag && source.indexOf(tag) === index;
    })
  };
}

function renderRulebookEntries() {
  if (!rulebookResults || !rulebookSummary) return;
  const edition = activeRulebookEditionRecord();
  if (!edition) {
    rulebookSummary.textContent = 'No rulebook data is loaded yet.';
    rulebookResults.innerHTML = '<div class="army-empty">Rulebook data is unavailable.</div>';
    return;
  }

  const selectedTopic = String((rulebookTopicSelect && rulebookTopicSelect.value) || '');
  const searchTerm = String((rulebookSearchInput && rulebookSearchInput.value) || '').trim().toLowerCase();
  const entries = rulebookEntries()
    .filter(function (entry) { return !selectedTopic || entry.topicId === selectedTopic; })
    .filter(function (entry) { return rulebookEntryMatchesSearch(entry, searchTerm); });

  const selectedTopicRecord = activeRulebookTopics().find(function (topic) { return topic.id === selectedTopic; });
  const selectedTopicLabel = importedRulebookIndex
    ? 'imported sections'
    : (selectedTopicRecord ? selectedTopicRecord.label : 'All topics');
  const sourceLabel = importedRulebookIndex ? 'Imported exact-text rules' : 'Built-in quick reference';
  rulebookSummary.textContent = `${edition.name}. ${sourceLabel}. ${entries.length} reference ${entries.length === 1 ? 'entry' : 'entries'} shown for ${String(selectedTopicLabel).toLowerCase()}.`;

  if (!entries.length) {
    rulebookResults.innerHTML = '<div class="army-empty">No rulebook entries match the current search.</div>';
    return;
  }

  rulebookResults.innerHTML = `<div class="rulebook-list">${entries.map(function (entry) {
    const bodySegments = formattedRulebookParagraphs(entry);
    const bulletLines = Array.isArray(entry.bullets) ? entry.bullets : [];
    const keywordPills = Array.isArray(entry.keywords) ? entry.keywords : [];
    const meta = rulebookEntryMeta(entry);
    const showSummary = !importedRulebookIndex && entry.summary;
    return `
      <article class="rulebook-entry rulebook-entry-${escapeHtml(meta.variant)}">
        <div class="rulebook-entry-header">
          <div>
            <div class="rulebook-entry-title">${escapeHtml(entry.title)}</div>
            <div class="rulebook-entry-topic">${escapeHtml(entry.topicLabel)}</div>
          </div>
        </div>
        ${meta.tags.length ? `
          <div class="rulebook-entry-tags">
            ${meta.tags.map(function (tag) {
              return `<span class="rulebook-tag">${escapeHtml(tag)}</span>`;
            }).join('')}
          </div>
        ` : ''}
        ${showSummary ? `<div class="rulebook-entry-summary">${escapeHtml(entry.summary || '')}</div>` : ''}
        ${bodySegments.length ? `
          <div class="rulebook-entry-body">
            ${bodySegments.map(function (paragraph) {
              return `<div class="rulebook-entry-paragraph">${escapeHtml(paragraph)}</div>`;
            }).join('')}
          </div>
        ` : ''}
        ${bulletLines.length ? `
          <div class="rulebook-entry-bullets">
            ${bulletLines.map(function (line) {
              return `<div class="rulebook-entry-bullet">${escapeHtml(line)}</div>`;
            }).join('')}
          </div>
        ` : ''}
        ${keywordPills.length ? `
          <div class="stratagem-row-tags">
            ${keywordPills.map(function (keyword) {
              return `<span class="pill">${escapeHtml(keyword)}</span>`;
            }).join('')}
          </div>
        ` : ''}
      </article>
    `;
  }).join('')}</div>`;
}
