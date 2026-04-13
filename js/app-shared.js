// Shared persistence, points, wargear, and builder support utilities.
function createId(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createEmptyArmyList() {
  return {
    id: createId('list'),
    name: 'New Strike Force',
    factionSlug: 'astra-militarum',
    factionName: 'Astra Militarum',
    detachmentSlug: 'combined-arms',
    detachmentName: 'Combined Arms',
    units: [],
    updatedAt: new Date().toISOString()
  };
}

function detachmentsForFaction(slug) {
  const configured = window.WH40K_DETACHMENT_DATABASE?.byFaction?.[slug];
  if (Array.isArray(configured) && configured.length) return configured;
  return [{
    slug: 'core-detachment',
    name: 'Core Detachment',
  }];
}

function detachmentNameForFaction(slug, detachmentSlug) {
  return detachmentsForFaction(slug).find(detachment => detachment.slug === detachmentSlug)?.name
    || detachmentsForFaction(slug)[0]?.name
    || 'Core Detachment';
}

function normalizeArmyListRecord(list) {
  const normalized = structuredClone(list || {});
  normalized.id = normalized.id || createId('list');
  normalized.name = normalized.name || 'New Strike Force';
  normalized.factionSlug = normalized.factionSlug || 'astra-militarum';
  normalized.factionName = normalized.factionName || factionNameForSlug(normalized.factionSlug);
  const detachments = detachmentsForFaction(normalized.factionSlug);
  normalized.detachmentSlug = detachments.some(detachment => detachment.slug === normalized.detachmentSlug)
    ? normalized.detachmentSlug
    : (detachments[0]?.slug || 'core-detachment');
  normalized.detachmentName = detachments.find(detachment => detachment.slug === normalized.detachmentSlug)?.name
    || normalized.detachmentName
    || 'Core Detachment';
  normalized.units = Array.isArray(normalized.units) ? normalized.units : [];
  normalized.updatedAt = normalized.updatedAt || new Date().toISOString();
  return normalized;
}

function createEmptyBattleSecondarySide() {
  return {
    selectedObjectiveIds: [],
    entries: [],
    manualVp: 0,
    isExpanded: false,
  };
}

function battleSecondaryObjectiveTotal(sideState) {
  if (!sideState || !Array.isArray(sideState.entries)) return 0;
  return sideState.entries.reduce((sum, entry) => sum + Math.max(0, Number(entry?.vp || 0)), 0);
}

function createEmptyBattle() {
  const timestamp = new Date().toISOString();
  return {
    id: createId('battle'),
    name: 'New Engagement',
    yourFactionSlug: 'astra-militarum',
    opponentFactionSlug: 'astra-militarum',
    yourArmyListId: '',
    missionName: '',
    deployment: '',
    missionRule: '',
    yourBattleRole: 'attacker',
    firstTurn: 'you',
    isStarted: false,
    startedAt: '',
    isEnded: false,
    endedAt: '',
    round: 1,
    currentPlayer: 'you',
    currentPhase: 'Command',
    players: {
      you: { cp: 0, primaryVp: 0, secondaryVp: 0, totalVp: 0 },
      opponent: { cp: 0, primaryVp: 0, secondaryVp: 0, totalVp: 0 },
    },
    secondaryObjectives: {
      you: createEmptyBattleSecondarySide(),
      opponent: createEmptyBattleSecondarySide(),
    },
    unitStates: {},
    phaseActions: {},
    pendingAttackContext: null,
    unitDamage: {},
    oneUseStatus: {},
    stratagemUsage: [],
    stratagemSearchHistory: [],
    log: [],
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

function loadArmyLists() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ARMY_LIST_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.map(normalizeArmyListRecord) : [];
  } catch (err) {
    console.warn('Failed to load saved army lists:', err);
    return [];
  }
}

function loadBattles() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BATTLE_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.map(normalizeBattleRecord) : [];
  } catch (err) {
    console.warn('Failed to load saved battles:', err);
    return [];
  }
}

function loadBattleDraft() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BATTLE_DRAFT_STORAGE_KEY) || 'null');
    return parsed ? normalizeBattleRecord(parsed) : null;
  } catch (err) {
    console.warn('Failed to load active battle draft:', err);
    return null;
  }
}

function persistArmyLists() {
  localStorage.setItem(ARMY_LIST_STORAGE_KEY, JSON.stringify(armyLists));
  populateArmyListSelectors();
  populateBattleArmyListOptions();
}

function persistBattles() {
  localStorage.setItem(BATTLE_STORAGE_KEY, JSON.stringify(battles));
  populateSavedBattleOptions();
}

function persistBattleDraft() {
  localStorage.setItem(BATTLE_DRAFT_STORAGE_KEY, JSON.stringify(normalizeBattleRecord(activeBattle)));
}

function upsertSavedBattle(snapshot = activeBattle) {
  const normalized = normalizeBattleRecord(snapshot);
  const existingIndex = battles.findIndex(battle => battle.id === normalized.id);
  if (existingIndex >= 0) battles.splice(existingIndex, 1, normalized);
  else battles.push(normalized);
  persistBattles();
}

function syncActiveBattlePersistence({ updateSaved = false } = {}) {
  activeBattle = normalizeBattleRecord(activeBattle);
  persistBattleDraft();
  if (updateSaved || battles.some(battle => battle.id === activeBattle.id)) {
    upsertSavedBattle(activeBattle);
  } else {
    populateSavedBattleOptions();
  }
  renderBattlePersistenceNote();
}

function battleSavedTimestampLabel(value) {
  if (!value) return 'Not yet saved';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not yet saved';
  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function showView(viewName) {
  hideFloatingTooltip();
  landingView.hidden = viewName !== 'landing';
  rulebookEditionView.hidden = viewName !== 'rulebook-editions';
  armyBuilderView.hidden = viewName !== 'builder';
  calculatorView.hidden = viewName !== 'calculator';
  battleTrackerView.hidden = viewName !== 'battle-tracker';
  battleStratagemsView.hidden = viewName !== 'battle-stratagems';
  rulebookView.hidden = viewName !== 'rulebook';
  Array.from(document.querySelectorAll('.module-nav-select')).forEach(function (select) {
    select.value = viewName === 'rulebook-editions' ? 'rulebook' : viewName;
  });
}

function factionNameForSlug(slug) {
  return factionManifest.find(entry => entry.slug === slug)?.name || slug || 'Unknown';
}

function armyListLabel(list) {
  const count = list?.units?.length || 0;
  const points = calculateArmyListPoints(list);
  const detachment = list?.detachmentName || detachmentNameForFaction(list?.factionSlug, list?.detachmentSlug);
  return `${list?.name || 'Untitled List'} (${list?.factionName || factionNameForSlug(list?.factionSlug)} - ${detachment} - ${count} unit${count === 1 ? '' : 's'} - ${points.totalKnown}${points.hasUnknown ? '+' : ''} pts)`;
}

function battleLabel(battle) {
  const yourFaction = factionNameForSlug(battle?.yourFactionSlug);
  const opponentFaction = factionNameForSlug(battle?.opponentFactionSlug);
  return `${battle?.name || 'Untitled Battle'} (${yourFaction} vs ${opponentFaction})`;
}

function normalizeBattleRecord(battle) {
  const normalized = structuredClone(battle || {});
  const hasSecondaryState = normalized.secondaryObjectives && typeof normalized.secondaryObjectives === 'object';
  normalized.id = normalized.id || createId('battle');
  normalized.name = normalized.name || 'New Engagement';
  normalized.yourFactionSlug = normalized.yourFactionSlug || 'astra-militarum';
  normalized.opponentFactionSlug = normalized.opponentFactionSlug || 'astra-militarum';
  normalized.yourArmyListId = normalized.yourArmyListId || '';
  normalized.missionName = normalized.missionName || '';
  normalized.deployment = normalized.deployment || '';
  normalized.missionRule = normalized.missionRule || '';
  normalized.yourBattleRole = normalized.yourBattleRole === 'defender' ? 'defender' : 'attacker';
  normalized.firstTurn = normalized.firstTurn === 'opponent' ? 'opponent' : 'you';
  normalized.isStarted = normalized.isStarted === true;
  normalized.startedAt = normalized.startedAt || '';
  normalized.isEnded = normalized.isEnded === true;
  normalized.endedAt = normalized.endedAt || '';
  normalized.round = Math.max(1, Number(normalized.round || 1));
  normalized.currentPlayer = normalized.currentPlayer === 'opponent' ? 'opponent' : 'you';
  normalized.currentPhase = BATTLE_PHASES.includes(normalized.currentPhase) ? normalized.currentPhase : 'Command';
  normalized.players = normalized.players || {};
  normalized.players.you = normalized.players.you || {};
  normalized.players.opponent = normalized.players.opponent || {};
  normalized.players.you.cp = Math.max(0, Number(normalized.players.you.cp || 0));
  normalized.players.you.primaryVp = Math.max(0, Number(normalized.players.you.primaryVp || 0));
  normalized.players.opponent.cp = Math.max(0, Number(normalized.players.opponent.cp || 0));
  normalized.players.opponent.primaryVp = Math.max(0, Number(normalized.players.opponent.primaryVp || 0));
  normalized.secondaryObjectives = hasSecondaryState ? normalized.secondaryObjectives : {};
  ['you', 'opponent'].forEach(side => {
    const existing = normalized.secondaryObjectives?.[side] || {};
    const legacyManualVp = hasSecondaryState ? 0 : Math.max(0, Number(normalized.players?.[side]?.secondaryVp || 0));
    normalized.secondaryObjectives[side] = {
      selectedObjectiveIds: Array.isArray(existing.selectedObjectiveIds)
        ? Array.from(new Set(existing.selectedObjectiveIds.map(value => String(value || '').trim()).filter(Boolean)))
        : [],
      entries: Array.isArray(existing.entries)
        ? existing.entries
          .filter(entry => entry && typeof entry === 'object')
          .map(entry => ({
            id: entry.id || createId('secondary-score'),
            objectiveId: String(entry.objectiveId || '').trim(),
            label: String(entry.label || '').trim(),
            vp: Math.max(0, Number(entry.vp || 0)),
            round: Math.max(1, Number(entry.round || normalized.round || 1)),
            player: entry.player === 'opponent' ? 'opponent' : 'you',
            phase: BATTLE_PHASES.includes(entry.phase) ? entry.phase : 'Command',
            createdAt: entry.createdAt || new Date().toISOString(),
          }))
          .filter(entry => entry.objectiveId)
        : [],
      manualVp: Math.max(0, Number(
        Object.prototype.hasOwnProperty.call(existing, 'manualVp')
          ? existing.manualVp
          : legacyManualVp
      )),
      isExpanded: existing.isExpanded === true,
    };
    normalized.players[side].secondaryVp = normalized.secondaryObjectives[side].manualVp + battleSecondaryObjectiveTotal(normalized.secondaryObjectives[side]);
    normalized.players[side].totalVp = normalized.players[side].primaryVp + normalized.players[side].secondaryVp;
  });
  normalized.unitStates = normalized.unitStates && typeof normalized.unitStates === 'object' ? normalized.unitStates : {};
  normalized.phaseActions = normalized.phaseActions && typeof normalized.phaseActions === 'object' ? normalized.phaseActions : {};
  normalized.pendingAttackContext = normalized.pendingAttackContext && typeof normalized.pendingAttackContext === 'object'
    ? normalized.pendingAttackContext
    : null;
  if (normalized.pendingAttackContext) {
    const legacyRecordedWeapons = Array.isArray(normalized.pendingAttackContext.recordedWeapons)
      ? normalized.pendingAttackContext.recordedWeapons
      : [];
    normalized.pendingAttackContext.targetGroups = Array.isArray(normalized.pendingAttackContext.targetGroups)
      ? normalized.pendingAttackContext.targetGroups.map(group => ({
          id: group?.id || createId('attack-target'),
          targetUnitName: group?.targetUnitName || '',
          recordedWeapons: Array.isArray(group?.recordedWeapons) ? group.recordedWeapons : [],
        }))
      : [];
    if (!normalized.pendingAttackContext.targetGroups.length && legacyRecordedWeapons.length) {
      normalized.pendingAttackContext.targetGroups = [{
        id: createId('attack-target'),
        targetUnitName: '',
        recordedWeapons: legacyRecordedWeapons,
      }];
    }
    if (!normalized.pendingAttackContext.targetGroups.length) {
      normalized.pendingAttackContext.targetGroups = [{
        id: createId('attack-target'),
        targetUnitName: '',
        recordedWeapons: [],
      }];
    }
    normalized.pendingAttackContext.activeTargetGroupId = normalized.pendingAttackContext.activeTargetGroupId
      || normalized.pendingAttackContext.targetGroups[normalized.pendingAttackContext.targetGroups.length - 1]?.id
      || normalized.pendingAttackContext.targetGroups[0]?.id
      || '';
    delete normalized.pendingAttackContext.recordedWeapons;
  }
  normalized.unitDamage = normalized.unitDamage && typeof normalized.unitDamage === 'object' ? normalized.unitDamage : {};
  normalized.oneUseStatus = normalized.oneUseStatus && typeof normalized.oneUseStatus === 'object' ? normalized.oneUseStatus : {};
  normalized.stratagemUsage = Array.isArray(normalized.stratagemUsage)
    ? normalized.stratagemUsage
      .filter(entry => entry && typeof entry === 'object')
      .map(entry => ({
        id: entry.id || createId('stratagem-use'),
        stratagemId: String(entry.stratagemId || '').trim(),
        source: entry.source === 'detachment' ? 'detachment' : 'core',
        side: entry.side === 'opponent' ? 'opponent' : 'you',
        cp: Math.max(0, Number(entry.cp || 0)),
        round: Math.max(1, Number(entry.round || normalized.round || 1)),
        player: entry.player === 'opponent' ? 'opponent' : 'you',
        phase: BATTLE_PHASES.includes(entry.phase) ? entry.phase : 'Command',
        spentCp: entry.spentCp !== false,
        createdAt: entry.createdAt || new Date().toISOString(),
      }))
      .filter(entry => entry.stratagemId)
    : [];
  normalized.stratagemSearchHistory = Array.isArray(normalized.stratagemSearchHistory)
    ? normalized.stratagemSearchHistory
      .map(entry => String(entry || '').trim())
      .filter(Boolean)
      .slice(0, 3)
    : [];
  normalized.log = Array.isArray(normalized.log) ? normalized.log : [];
  normalized.createdAt = normalized.createdAt || new Date().toISOString();
  normalized.updatedAt = normalized.updatedAt || normalized.createdAt;
  return normalized;
}

function getUnitPointsEntry(factionSlug, unitName) {
  return pointsDatabase.byFaction?.[factionSlug]?.units?.[unitName] || null;
}

function getUnitCompositionEntry(factionSlug, unitName) {
  return unitCompositionDatabase.byFaction?.[factionSlug]?.units?.[unitName] || null;
}

function getWargearEntry(factionSlug, unitName) {
  return wargearDatabase.byFaction?.[factionSlug]?.units?.[unitName] || null;
}

function normalizeWeaponProfileKey(name) {
  return String(name || '')
    .replace(/[\u2018\u2019]/g, String.fromCharCode(39))
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/\s+-\s+(standard|supercharge|frag|krak|strike|sweep)$/i, '')
    .trim()
    .toLowerCase();
}

function weaponBaseLabel(name) {
  return String(name || '')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\s+-\s+(standard|supercharge|frag|krak|strike|sweep)$/i, '')
    .trim();
}

function weaponGroupsForUnit(unit) {
  const groups = new Map();
  Object.keys(unit?.weapons || {}).forEach(profileName => {
    const key = normalizeWeaponProfileKey(profileName);
    if (!groups.has(key)) groups.set(key, { key, label: weaponBaseLabel(profileName), profiles: [] });
    groups.get(key).profiles.push(profileName);
  });
  return Array.from(groups.values());
}

function rosterWargearLabel(key, unit) {
  const profileLabel = weaponGroupsForUnit(unit).find(group => group.key === key)?.label;
  if (profileLabel) return profileLabel;
  const supportLabels = {
    'death korps medi-pack': 'Death Korps Medi-pack',
    'vox-caster': 'Vox-caster',
    'alchemyk counteragents': 'Alchemyk Counteragents',
    'servo-scribes': 'Servo-scribes',
    'master vox': 'Master Vox',
    'regimental standard': 'Regimental Standard',
  };
  return supportLabels[key] || key;
}

function baseWargearQuantities(factionSlug, unitName, models) {
  const entry = getWargearEntry(factionSlug, unitName);
  return entry?.baseByModelCount?.[String(models)] || {};
}

function modelTypeCountForWargear(entry, models, pattern) {
  const counts = entry?.modelTypeCounts?.[String(models)] || {};
  return Object.entries(counts)
    .filter(([type]) => new RegExp(pattern, 'i').test(type))
    .reduce((sum, [, count]) => sum + Number(count || 0), 0);
}

function inferWargearMax(factionSlug, unitName, weaponKey, models) {
  const entry = getWargearEntry(factionSlug, unitName);
  const base = Number(baseWargearQuantities(factionSlug, unitName, models)[weaponKey] || 0);
  const text = String(entry?.wargearOptionsText || '').toLowerCase();
  if (!entry || !text.includes(weaponKey)) return base;

  const directMatches = Array.from(text.matchAll(new RegExp('(\\d+)\\s+' + weaponKey.replace(/[.*+?^$()|[\]\\]/g, '\\$&'), 'g')));
  const directMax = directMatches.length ? directMatches.reduce((sum, match) => sum + Number(match[1] || 0), 0) : 1;

  if (/same (?:option|weapon) more than once.*20 models.*twice/i.test(text)) {
    return Math.max(base, Math.floor(Number(models || 1) / 10));
  }
  if (/same weapon from this list more than twice/i.test(text)) return Math.max(base, 2);

  const upTo = text.match(/up to\s+(\d+)[^:]+one of the following/i);
  if (upTo) return Math.max(base, Number(upTo[1]));

  const every = text.match(/for every\s+(\d+)\s+models[^:]+up to\s+(\d+)/i);
  if (every) return Math.max(base, Math.floor(Number(models || 1) / Number(every[1])) * Number(every[2]));

  if (/any number of .*sergeant|any number of .*watchmaster|any number of .*tempestor/i.test(text)) {
    const leaders = modelTypeCountForWargear(entry, models, 'sergeant|watchmaster|tempestor|commander|ridemaster|bone');
    if (leaders) return Math.max(base, leaders * directMax);
  }

  if (/this model can be equipped|this model.s .* can be replaced/i.test(text)) return Math.max(base, directMax);
  return Math.max(base, Number(models || 1));
}

function parseSpecialWeaponGroups(factionSlug, unitName, models) {
  const entry = getWargearEntry(factionSlug, unitName);
  const text = String(entry?.wargearOptionsText || '');
  const groups = [];
  const regex = /For every\s+(\d+)\s+models[\s\S]*?up to\s+(\d+)[\s\S]*?one of the following\*?:\s*([\s\S]*?)(?=\nFor every|\nAny number|\n\d+\s|\nThe\s|$)/gi;
  let match;
  while ((match = regex.exec(text))) {
    const per = Number(match[1]);
    const maxPer = Number(match[2]);
    const keys = match[3]
      .split('\n')
      .map(line => line.match(/^\s*\d+\s+(.+?)[.*]*$/)?.[1] || '')
      .map(normalizeWeaponProfileKey)
      .filter(Boolean);
    if (keys.length) groups.push({ max: Math.floor(Number(models || 1) / per) * maxPer, keys });
  }
  return groups;
}

function enforceBuilderWargearGroupLimits(quantities) {
  const groups = parseSpecialWeaponGroups(currentBuilderFactionSlug, builderUnitSelect.value, builderModelCount.value);
  groups.forEach(group => {
    let remaining = group.max;
    group.keys.forEach(key => {
      const input = Array.from(builderWeaponOptions.querySelectorAll('.builder-weapon-option')).find(option => option.dataset.weaponKey === key);
      const current = Number(quantities[key] || 0);
      const clamped = Math.max(0, Math.min(current, remaining));
      if (input) input.value = String(clamped);
      if (clamped > 0) quantities[key] = clamped;
      else delete quantities[key];
      remaining -= clamped;
    });
  });
  return quantities;
}

function defaultBuilderWeaponQuantities(unitName, models) {
  const unit = builderData.units?.[unitName];
  const base = baseWargearQuantities(currentBuilderFactionSlug, unitName, models);
  const quantities = {};
  weaponGroupsForUnit(unit).forEach(group => {
    quantities[group.key] = Number(base[group.key] || 0);
  });
  return quantities;
}

function weaponQuantityForProfile(listEntry, profileName) {
  if (!activeCombatList || !listEntry) return null;
  const key = normalizeWeaponProfileKey(profileName);
  if (listEntry.weaponQuantities && Object.hasOwn(listEntry.weaponQuantities, key)) {
    return Number(listEntry.weaponQuantities[key] || 0);
  }
  return Array.isArray(listEntry.weapons) && listEntry.weapons.includes(profileName)
    ? Number(listEntry.models || 1)
    : 0;
}

function formatAllowedCounts(counts) {
  if (!counts?.allowed?.length) return 'No parsed model-count restriction';
  return counts.allowed.length > 8
    ? `${counts.min}-${counts.max} models`
    : `${counts.allowed.join(', ')} model${counts.allowed.length === 1 && counts.allowed[0] === 1 ? '' : 's'}`;
}

function enforceBuilderModelComposition({ reset = false } = {}) {
  const composition = getUnitCompositionEntry(currentBuilderFactionSlug, builderUnitSelect.value);
  const counts = composition?.counts;
  const previousValue = builderModelCount.value;
  builderModelCount.innerHTML = '';

  if (!counts?.allowed?.length) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Composition unavailable';
    builderModelCount.appendChild(opt);
    builderModelCount.disabled = true;
    builderCompositionNote.textContent = composition
      ? `Unit Composition: ${composition.lines.join(' | ')}. Model count cannot be selected because this composition could not be parsed safely.`
      : 'Unit Composition: not generated for this faction/unit yet. Model count cannot be selected.';
    return;
  }

  builderModelCount.disabled = false;
  counts.allowed.forEach(count => {
    const opt = document.createElement('option');
    opt.value = String(count);
    opt.textContent = `${count} model${count === 1 ? '' : 's'}`;
    builderModelCount.appendChild(opt);
  });
  const preferredValue = !reset && counts.allowed.map(String).includes(previousValue)
    ? previousValue
    : String(counts.allowed[0]);
  builderModelCount.value = preferredValue;
  builderCompositionNote.textContent = `Unit Composition: ${composition.lines.join(' | ')}.`;
}

function normalizeBuilderModelCount() {
  const composition = getUnitCompositionEntry(currentBuilderFactionSlug, builderUnitSelect.value);
  const allowed = composition?.counts?.allowed?.map(Number);
  if (!allowed?.length) return;

  const value = Number(builderModelCount.value || allowed[0]);
  if (allowed.includes(value)) return;
  builderModelCount.value = String(allowed.reduce((closest, candidate) =>
    Math.abs(candidate - value) < Math.abs(closest - value) ? candidate : closest,
  allowed[0]));
}

function calculateUnitPoints(factionSlug, unitName, models) {
  const entry = getUnitPointsEntry(factionSlug, unitName);
  const modelCount = Math.max(1, Number(models || 1));
  if (!entry?.variants?.length) {
    return { points: null, label: 'No points found', bracket: null };
  }

  const sorted = [...entry.variants].sort((a, b) => a.models - b.models);
  const bracket = sorted.find(variant => modelCount <= Number(variant.models)) || sorted[sorted.length - 1];
  return {
    points: Number(bracket.points),
    label: `${bracket.points} pts (${bracket.label})`,
    bracket,
  };
}

function calculateArmyListPoints(list) {
  const result = { totalKnown: 0, hasUnknown: false };
  for (const entry of list?.units || []) {
    const unitPoints = calculateUnitPoints(list.factionSlug, entry.unitName, entry.models);
    if (unitPoints.points === null) {
      result.hasUnknown = true;
    } else {
      result.totalKnown += unitPoints.points;
    }
  }
  return result;
}

function formatPointsTotal(points) {
  return points.hasUnknown ? `${points.totalKnown}+ pts` : `${points.totalKnown} pts`;
}

function syncBuilderListDraftName() {
  activeBuilderList.name = builderListName.value.trim() || 'New Strike Force';
}

function populateBuilderDetachmentOptions() {
  const detachments = detachmentsForFaction(currentBuilderFactionSlug);
  builderDetachmentSelect.innerHTML = '';
  detachments.forEach(detachment => {
    const option = document.createElement('option');
    option.value = detachment.slug;
    option.textContent = detachment.name;
    builderDetachmentSelect.appendChild(option);
  });
  const activeSlug = detachments.some(detachment => detachment.slug === activeBuilderList?.detachmentSlug)
    ? activeBuilderList.detachmentSlug
    : (detachments[0]?.slug || '');
  builderDetachmentSelect.value = activeSlug;
  activeBuilderList.detachmentSlug = activeSlug;
  activeBuilderList.detachmentName = detachmentNameForFaction(currentBuilderFactionSlug, activeSlug);
}

function populateArmyListSelectors() {
  savedArmyListSelect.innerHTML = '';
  combatArmyListSelect.innerHTML = '';

  const sandboxOpt = document.createElement('option');
  sandboxOpt.value = '';
  sandboxOpt.textContent = 'Sandbox mode - all units';
  combatArmyListSelect.appendChild(sandboxOpt);

  if (!armyLists.length) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.textContent = 'No saved lists yet';
    savedArmyListSelect.appendChild(emptyOpt);
  }

  armyLists.forEach(list => {
    const savedOpt = document.createElement('option');
    savedOpt.value = list.id;
    savedOpt.textContent = armyListLabel(list);
    savedArmyListSelect.appendChild(savedOpt);

    const combatOpt = document.createElement('option');
    combatOpt.value = list.id;
    combatOpt.textContent = armyListLabel(list);
    combatArmyListSelect.appendChild(combatOpt);
  });

  if (activeBuilderList?.id && armyLists.some(list => list.id === activeBuilderList.id)) {
    savedArmyListSelect.value = activeBuilderList.id;
  }
  combatArmyListSelect.value = activeCombatList?.id || '';
}

function populateBattleArmyListOptions() {
  battleArmyListSelect.innerHTML = '';
  const noneOpt = document.createElement('option');
  noneOpt.value = '';
  noneOpt.textContent = 'No linked army list';
  battleArmyListSelect.appendChild(noneOpt);

  armyLists.forEach(list => {
    const opt = document.createElement('option');
    opt.value = list.id;
    opt.textContent = armyListLabel(list);
    battleArmyListSelect.appendChild(opt);
  });

  battleArmyListSelect.value = activeBattle?.yourArmyListId || '';
}

function populateSavedBattleOptions() {
  savedBattleSelect.innerHTML = '';
  if (!battles.length) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.textContent = 'No saved battles yet';
    savedBattleSelect.appendChild(emptyOpt);
    return;
  }

  battles.forEach(battle => {
    const opt = document.createElement('option');
    opt.value = battle.id;
    opt.textContent = battleLabel(battle);
    savedBattleSelect.appendChild(opt);
  });

  if (activeBattle?.id && battles.some(battle => battle.id === activeBattle.id)) {
    savedBattleSelect.value = activeBattle.id;
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function setDataSourceNote(unit) {
  const parts = [];
  if (data.faction?.name) parts.push(`<strong>Faction:</strong> ${escapeHtml(data.faction.name)}`);
  if (unit?.role) parts.push(`<strong>Role:</strong> ${escapeHtml(unit.role)}`);
  if (unit?.source?.name) parts.push(`<strong>Source:</strong> ${escapeHtml(unit.source.name)}`);
  if (unit?.source?.datasheet) {
    parts.push(`<a href="${unit.source.datasheet}" target="_blank" rel="noreferrer">Open Wahapedia datasheet</a>`);
  }
  dataSourceNote.innerHTML = parts.join(' - ');
}

function populateFactions() {
  factionSelect.innerHTML = '';
  targetFactionSelect.innerHTML = '';
  builderFactionSelect.innerHTML = '';
  battleYourFactionSelect.innerHTML = '';
  battleOpponentFactionSelect.innerHTML = '';
  factionManifest.forEach(faction => {
    const opt = document.createElement('option');
    opt.value = faction.slug;
    opt.textContent = faction.name;
    factionSelect.appendChild(opt);

    const targetOpt = document.createElement('option');
    targetOpt.value = faction.slug;
    targetOpt.textContent = faction.name;
    targetFactionSelect.appendChild(targetOpt);

    const builderOpt = document.createElement('option');
    builderOpt.value = faction.slug;
    builderOpt.textContent = faction.name;
    builderFactionSelect.appendChild(builderOpt);

    const yourBattleOpt = document.createElement('option');
    yourBattleOpt.value = faction.slug;
    yourBattleOpt.textContent = faction.name;
    battleYourFactionSelect.appendChild(yourBattleOpt);

    const opponentBattleOpt = document.createElement('option');
    opponentBattleOpt.value = faction.slug;
    opponentBattleOpt.textContent = faction.name;
    battleOpponentFactionSelect.appendChild(opponentBattleOpt);
  });
  factionSelect.value = currentFactionSlug;
  targetFactionSelect.value = currentTargetFactionSlug;
  builderFactionSelect.value = currentBuilderFactionSlug;
  battleYourFactionSelect.value = activeBattle?.yourFactionSlug || 'astra-militarum';
  battleOpponentFactionSelect.value = activeBattle?.opponentFactionSlug || 'astra-militarum';
}




