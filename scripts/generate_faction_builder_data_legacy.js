var fs = require('fs');
var path = require('path');
var vm = require('vm');
var https = require('https');
var http = require('http');
var urlLib = require('url');

var ROOT = path.resolve(__dirname, '..');
var CACHE_DIR = path.join(ROOT, 'scripts', '.cache', 'unit-composition-pages');
var UNIT_COMPOSITION_OUTPUT = path.join(ROOT, 'data', 'unit-composition', 'unit-composition.js');
var WARGEAR_OUTPUT = path.join(ROOT, 'data', 'wargear', 'index.js');
var LEGACY_WARGEAR_OUTPUT = path.join(ROOT, 'data', 'wargear', 'astra-militarum-wargear.js');
var REQUEST_DELAY_MS = 1500;
var REQUEST_TIMEOUT_MS = 15000;

function argValue(name) {
  var flag = '--' + name;
  var index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : '';
}

function hasFlag(name) {
  return process.argv.indexOf('--' + name) >= 0;
}

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function ensureDir(dirPath) {
  if (!dirPath || fs.existsSync(dirPath)) return;
  ensureDir(path.dirname(dirPath));
  try {
    fs.mkdirSync(dirPath);
  } catch (error) {
    if (!error || error.code !== 'EEXIST') throw error;
  }
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
    .map(function (line) {
      return line.replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean)
    .join('\n');
}

function slugify(value) {
  return String(value || '')
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
  var key = normalizeKey(value)
    .replace(/\s+-\s+epic hero$/i, '')
    .replace(/^other\s+/i, '')
    .replace(/^models?$/i, 'model');
  if (/ies$/.test(key)) return key.slice(0, -3) + 'y';
  if (/s$/.test(key) && !/ss$/.test(key)) return key.slice(0, -1);
  return key;
}

function addCount(map, key, amount) {
  var clean = normalizeKey(key);
  if (!clean) return;
  map[clean] = (map[clean] || 0) + amount;
}

function expandRange(min, max) {
  var values = [];
  for (var value = min; value <= max; value += 1) values.push(value);
  return values;
}

function loadWindowVar(filePath, variableName) {
  if (!fs.existsSync(filePath)) return null;
  var context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(filePath, 'utf8'), context);
  return context.window[variableName] || null;
}

function loadFactionDatabases() {
  var context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'factions', 'index.js'), 'utf8'), context);
  (context.window.WH40K_FACTION_MANIFEST || []).forEach(function (faction) {
    if (!faction.script) return;
    var scriptPath = path.join(ROOT, faction.script.replace(/^\.\//, ''));
    if (fs.existsSync(scriptPath)) vm.runInContext(fs.readFileSync(scriptPath, 'utf8'), context);
  });
  return {
    manifest: context.window.WH40K_FACTION_MANIFEST || [],
    databases: context.window.WH40K_FACTION_DATABASES || {}
  };
}

function loadUnitCompositionDatabase() {
  return loadWindowVar(UNIT_COMPOSITION_OUTPUT, 'WH40K_UNIT_COMPOSITION_DATABASE') || {
    source: {
      name: 'Wahapedia datasheet Unit Composition sections',
      baseUrl: 'https://wahapedia.ru/wh40k10ed/',
      generatedFrom: 'datasheet pages',
      requestPolicy: 'One faction per run; cached pages; 1.5s delay for uncached requests.'
    },
    generatedAt: new Date().toISOString(),
    byFaction: {}
  };
}

function loadWargearDatabase() {
  return loadWindowVar(WARGEAR_OUTPUT, 'WH40K_WARGEAR_DATABASE')
    || loadWindowVar(LEGACY_WARGEAR_OUTPUT, 'WH40K_WARGEAR_DATABASE')
    || {
      source: {
        name: 'Wahapedia datasheet Unit Composition and Wargear Options sections',
        requestPolicy: 'Cache-only generator; does not request Wahapedia.'
      },
      generatedAt: new Date().toISOString(),
      byFaction: {}
    };
}

function extractComposition(html) {
  var match = String(html).match(/<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>\s*<div class="dsAbility">([\s\S]*?)<\/div>\s*<div class="dsAbility">/i)
    || String(html).match(/<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>\s*<div class="dsAbility">([\s\S]*?)<\/div>/i);
  if (!match) return null;

  var text = stripMarkup(match[1]);
  if (!text) return null;
  var lines = text.split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
  var compositionLines = [];
  lines.forEach(function (line) {
    if (/equipped with:/i.test(line)) return;
    if (/^This unit can/i.test(line)) return;
    compositionLines.push(line.replace(/^OR\s*/i, ''));
  });
  return {
    html: match[1],
    text: text,
    lines: compositionLines.length ? compositionLines : lines
  };
}

function parseCompositionLine(line) {
  var normalized = String(line || '').replace(/[–—−]/g, '-');
  var match;
  var regex = /(\d+)\s*(?:-\s*(\d+))?/g;
  var segments = [];
  while ((match = regex.exec(normalized))) {
    segments.push({
      min: Number(match[1]),
      max: Number(match[2] || match[1])
    });
  }
  if (!segments.length) return null;
  return {
    min: segments.reduce(function (sum, segment) { return sum + segment.min; }, 0),
    max: segments.reduce(function (sum, segment) { return sum + segment.max; }, 0),
    source: line,
    segmentCount: segments.length
  };
}

function deriveCounts(lines) {
  var parsedLines = lines.map(parseCompositionLine);
  if (parsedLines.some(function (entry) { return !entry; })) return null;

  var hasAlternativeTotals = parsedLines.some(function (entry) { return entry.segmentCount > 1; });
  var totals = hasAlternativeTotals
    ? parsedLines
    : [{
      min: parsedLines.reduce(function (sum, entry) { return sum + entry.min; }, 0),
      max: parsedLines.reduce(function (sum, entry) { return sum + entry.max; }, 0),
      source: lines.join(' + ')
    }];

  var allowedMap = {};
  totals.forEach(function (total) {
    expandRange(total.min, total.max).forEach(function (value) {
      allowedMap[value] = true;
    });
  });
  var allowed = Object.keys(allowedMap).map(Number).sort(function (a, b) { return a - b; });
  if (!allowed.length) return null;
  return {
    allowed: allowed,
    min: allowed[0],
    max: allowed[allowed.length - 1],
    sources: totals.map(function (entry) {
      return { min: entry.min, max: entry.max, source: entry.source };
    })
  };
}

function parseModelSegments(line) {
  var normalized = String(line || '')
    .replace(/[–—−]/g, '-')
    .replace(/\s+-\s+EPIC HERO/i, '')
    .replace(/\s+\+\s+/g, ' and ');
  var segments = [];
  var regex = /(\d+)\s*(?:-\s*(\d+))?\s+(.+?)(?=\s+and\s+\d+|\s+\+\s+\d+|\s*,\s*\d+|$)/gi;
  var match;
  while ((match = regex.exec(normalized))) {
    segments.push({
      min: Number(match[1]),
      max: Number(match[2] || match[1]),
      type: singularKey(match[3])
    });
  }
  return segments;
}

function deriveModelTypeCounts(compositionLines, allowedCounts) {
  var results = {};
  compositionLines.forEach(function (line) {
    var segments = parseModelSegments(line);
    if (!segments.length) return;
    var fixed = segments.filter(function (segment) { return segment.min === segment.max; });
    var ranged = segments.filter(function (segment) { return segment.min !== segment.max; });
    if (!ranged.length) {
      var total = segments.reduce(function (sum, segment) { return sum + segment.min; }, 0);
      results[String(total)] = {};
      segments.forEach(function (segment) {
        results[String(total)][segment.type] = segment.min;
      });
      return;
    }
    if (ranged.length === 1) {
      var fixedTotal = fixed.reduce(function (sum, segment) { return sum + segment.min; }, 0);
      var range = ranged[0];
      (allowedCounts || expandRange(fixedTotal + range.min, fixedTotal + range.max)).forEach(function (count) {
        var rangedCount = count - fixedTotal;
        if (rangedCount < range.min || rangedCount > range.max) return;
        results[String(count)] = {};
        fixed.forEach(function (segment) {
          results[String(count)][segment.type] = segment.min;
        });
        results[String(count)][range.type] = rangedCount;
      });
    }
  });
  return results;
}

function parseEquipmentLine(line, totalModels, typeCounts) {
  var normalized = String(line || '').replace(/\s+/g, ' ').trim();
  var thisModel = normalized.match(/^This model\s+is\s+equipped with:\s*(.+)$/i);
  if (thisModel) {
    return {
      count: totalModels || 1,
      subject: 'model',
      weapons: thisModel[1].replace(/\.$/, '').split(';').map(function (part) { return part.trim(); }).filter(Boolean)
    };
  }
  var match = normalized.match(/^(Every|Each|The|One|1|\d+)(?:\s+other)?\s+(.+?)\s+(?:is|are)\s+equipped with:\s*(.+)$/i);
  if (!match) return null;
  var amountToken = match[1];
  var subject = singularKey(match[2]);
  var count = 0;
  if (/^(Every|Each)$/i.test(amountToken)) {
    count = subject === 'model' ? totalModels : Number((typeCounts || {})[subject] || 0);
  } else if (/^The$/i.test(amountToken)) {
    count = Number((typeCounts || {})[subject] || 1);
  } else if (/^One$/i.test(amountToken)) {
    count = 1;
  } else {
    count = Number(amountToken) || 0;
  }
  if (!count) return null;
  return {
    count: count,
    subject: subject,
    weapons: match[3]
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/\.$/, '')
      .split(';')
      .map(function (part) { return part.trim(); })
      .filter(Boolean)
  };
}

function quantityAndWeapon(value) {
  var match = String(value || '').trim().match(/^(\d+)\s+(.+)$/);
  return match
    ? { quantity: Number(match[1]), weapon: normalizeKey(match[2]) }
    : { quantity: 1, weapon: normalizeKey(value) };
}

function deriveBaseWeapons(compositionText, modelTypeCounts) {
  var lines = String(compositionText || '').split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
  var result = {};
  Object.keys(modelTypeCounts || {}).forEach(function (modelCount) {
    var totalModels = Number(modelCount);
    var base = {};
    lines.forEach(function (line) {
      if (!/equipped with:/i.test(line)) return;
      var parsed = parseEquipmentLine(line, totalModels, modelTypeCounts[modelCount]);
      if (!parsed) return;
      parsed.weapons.forEach(function (weaponText) {
        var info = quantityAndWeapon(weaponText);
        addCount(base, info.weapon, parsed.count * info.quantity);
      });
    });
    result[modelCount] = base;
  });
  return result;
}

function extractWargearOptionsHtml(html) {
  var match = String(html).match(/<div class="dsHeader[^>]*">WARGEAR OPTIONS<\/div>\s*([\s\S]*?)(?:<\/div>\s*<div class="dsRight|<div class="dsHeader[^>]*">ABILITIES<\/div>|<div class="dsHeader[^>]*">UNIT COMPOSITION<\/div>)/i);
  return match ? match[1] : '';
}

function parseChoiceWeapons(block) {
  var choices = [];
  var regex = /<li>\s*([^<]+?)\s*<\/li>/gi;
  var match;
  while ((match = regex.exec(String(block || '')))) {
    var choice = quantityAndWeapon(stripMarkup(match[1]));
    if (choice.weapon) choices.push(choice);
  }
  return choices;
}

function parseWargearOptionGroups(optionsHtml) {
  var groups = [];
  var regex = /<li>([\s\S]*?)(?=<\/li>)/gi;
  var match;
  while ((match = regex.exec(String(optionsHtml || '')))) {
    var block = match[1];
    if (!/<ul/i.test(block)) continue;
    var intro = stripMarkup(block.replace(/<ul[\s\S]*$/i, ''));
    var listMatch = block.match(/<ul[\s\S]*<\/ul>/i);
    var choices = parseChoiceWeapons(listMatch ? listMatch[0] : '');
    var perEvery = intro.match(/For every\s+(\d+)\s+models.*?up to\s+(\d+)/i);
    var replace = intro.match(/have their\s+(.+?)\s+replaced/i) || intro.match(/have (?:his|her|its|their)\s+(.+?)\s+replaced/i);
    var canBeEquipped = /can be equipped with one of the following/i.test(intro);
    if (!choices.length) continue;
    groups.push({
      intro: intro,
      type: replace ? 'replace-one-of' : (canBeEquipped ? 'add-one-of' : 'choose-one-of'),
      perModels: perEvery ? Number(perEvery[1]) : null,
      maxSelections: perEvery ? Number(perEvery[2]) : 1,
      replace: replace ? normalizeKey(replace[1]) : '',
      choices: choices
    });
  }
  return groups;
}

function fetchUrl(url) {
  return new Promise(function (resolve, reject) {
    var client = /^https:/i.test(url) ? https : http;
    var timedOut = false;
    var requestOptions = urlLib.parse(url);
    if (/^https:/i.test(url)) requestOptions.rejectUnauthorized = false;
    var req = client.get(requestOptions, function (res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(String(res.statusCode) + ' ' + String(res.statusMessage || 'Request failed') + ' for ' + url));
        return;
      }
      var chunks = [];
      res.on('data', function (chunk) { chunks.push(chunk); });
      res.on('end', function () {
        if (timedOut) return;
        resolve(Buffer.concat(chunks).toString('utf8'));
      });
    });
    req.setTimeout(REQUEST_TIMEOUT_MS, function () {
      timedOut = true;
      req.abort();
      reject(new Error('Timed out fetching ' + url));
    });
    req.on('error', reject);
  });
}

function ensureCachedHtml(url, cachePath, fetchMissing) {
  if (fs.existsSync(cachePath)) return Promise.resolve(fs.readFileSync(cachePath, 'utf8'));
  if (!fetchMissing) return Promise.resolve('');
  ensureDir(path.dirname(cachePath));
  return fetchUrl(url).then(function (html) {
    fs.writeFileSync(cachePath, html);
    return sleep(REQUEST_DELAY_MS).then(function () { return html; });
  });
}

function writeWindowVar(filePath, variableName, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, 'window.' + variableName + ' = ' + JSON.stringify(value) + ';\n');
}

function main() {
  var factionSlug = argValue('faction');
  var fetchMissing = hasFlag('fetch-missing');
  if (!factionSlug) {
    throw new Error('Pass exactly one faction slug, e.g. --faction space-marines');
  }

  var loaded = loadFactionDatabases();
  var faction = loaded.manifest.find(function (entry) { return entry.slug === factionSlug; });
  var database = loaded.databases[factionSlug];
  if (!faction || !database || !database.units) {
    throw new Error('Unknown or unloaded faction: ' + factionSlug);
  }

  var compositionOutput = loadUnitCompositionDatabase();
  var wargearOutput = loadWargearDatabase();

  compositionOutput.byFaction[factionSlug] = {
    faction: { id: faction.id, name: faction.name, slug: faction.slug },
    units: {},
    missing: []
  };

  wargearOutput.byFaction[factionSlug] = {
    faction: { id: faction.id, name: faction.name, slug: faction.slug },
    units: {},
    missing: []
  };

  var unitEntries = Object.keys(database.units).map(function (unitName) {
    return { unitName: unitName, unit: database.units[unitName] };
  });

  var sequence = Promise.resolve();

  unitEntries.forEach(function (entry, index) {
    sequence = sequence.then(function () {
      var unitName = entry.unitName;
      var unit = entry.unit;
      var url = unit && unit.source && unit.source.datasheet;
      if (!url) {
        compositionOutput.byFaction[factionSlug].missing.push(unitName);
        wargearOutput.byFaction[factionSlug].missing.push(unitName);
        return;
      }

      var cachePath = path.join(CACHE_DIR, factionSlug + '-' + slugify(unitName) + '.html');
      console.log('[' + String(index + 1) + '/' + String(unitEntries.length) + '] ' + unitName);

      return ensureCachedHtml(url, cachePath, fetchMissing).then(function (html) {
        if (!html) {
          compositionOutput.byFaction[factionSlug].missing.push(unitName);
          wargearOutput.byFaction[factionSlug].missing.push(unitName);
          return;
        }

        var composition = extractComposition(html);
        if (!composition) {
          compositionOutput.byFaction[factionSlug].missing.push(unitName);
          wargearOutput.byFaction[factionSlug].missing.push(unitName);
          return;
        }

        var counts = deriveCounts(composition.lines);
        var compositionEntry = {
          datasheet: url,
          text: composition.text,
          lines: composition.lines,
          counts: counts
        };
        compositionOutput.byFaction[factionSlug].units[unitName] = compositionEntry;

        var modelTypeCounts = deriveModelTypeCounts(
          (counts && counts.sources ? counts.sources.map(function (source) { return source.source; }) : composition.lines),
          counts ? counts.allowed : []
        );
        wargearOutput.byFaction[factionSlug].units[unitName] = {
          datasheet: url,
          baseByModelCount: deriveBaseWeapons(composition.text, modelTypeCounts),
          modelTypeCounts: modelTypeCounts,
          optionGroups: parseWargearOptionGroups(extractWargearOptionsHtml(html)),
          wargearOptionsText: stripMarkup(extractWargearOptionsHtml(html)),
          notes: []
        };
      }).catch(function (error) {
        console.warn('Skipping ' + factionSlug + ' / ' + unitName + ': ' + error.message);
        compositionOutput.byFaction[factionSlug].missing.push(unitName);
        wargearOutput.byFaction[factionSlug].missing.push(unitName);
      });
    });
  });

  return sequence.then(function () {
    compositionOutput.generatedAt = new Date().toISOString();
    wargearOutput.generatedAt = new Date().toISOString();
    writeWindowVar(UNIT_COMPOSITION_OUTPUT, 'WH40K_UNIT_COMPOSITION_DATABASE', compositionOutput);
    writeWindowVar(WARGEAR_OUTPUT, 'WH40K_WARGEAR_DATABASE', wargearOutput);

    var compositionCount = Object.keys(compositionOutput.byFaction[factionSlug].units).length;
    var wargearCount = Object.keys(wargearOutput.byFaction[factionSlug].units).length;
    console.log(faction.name + ': ' + compositionCount + '/' + unitEntries.length + ' composition entries');
    console.log(faction.name + ': ' + wargearCount + '/' + unitEntries.length + ' wargear entries');
    console.log('Wrote ' + path.relative(ROOT, UNIT_COMPOSITION_OUTPUT) + '.');
    console.log('Wrote ' + path.relative(ROOT, WARGEAR_OUTPUT) + '.');
  });
}

main().catch(function (error) {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
