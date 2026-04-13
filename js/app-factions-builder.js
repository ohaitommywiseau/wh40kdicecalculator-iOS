// Faction loading, target selection, and army builder interaction flow.
function loadFactionScript(faction) {
  if (!faction?.script || window.WH40K_FACTION_DATABASES?.[faction.slug]) {
    return Promise.resolve(window.WH40K_FACTION_DATABASES?.[faction.slug] || null);
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-faction-script="${faction.slug}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.WH40K_FACTION_DATABASES?.[faction.slug] || null), { once: true });
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${faction.name}`)), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = faction.script;
    script.dataset.factionScript = faction.slug;
    script.addEventListener('load', () => resolve(window.WH40K_FACTION_DATABASES?.[faction.slug] || null), { once: true });
    script.addEventListener('error', () => reject(new Error(`Failed to load ${faction.name}`)), { once: true });
    document.head.appendChild(script);
  });
}

async function setFaction(slug) {
  const faction = factionManifest.find(entry => entry.slug === slug) || factionManifest[0];
  if (!faction) return;

  try {
    const loaded = await loadFactionScript(faction);
    currentFactionSlug = faction.slug;
    data = loaded?.units ? loaded : structuredClone(defaultData);
  } catch (err) {
    console.error(err);
    currentFactionSlug = 'astra-militarum';
    data = structuredClone(defaultData);
  }

  factionSelect.value = currentFactionSlug;
  populateUnits();
}

function parseStatNumber(value) {
  const match = String(value ?? '').match(/\d+/);
  return match ? Number(match[0]) : null;
}

function applyTargetUnit(unit) {
  if (!unit) return;
  const stats = unit.stats || {};
  const targetToughness = parseStatNumber(stats.toughness);
  const targetSave = parseStatNumber(stats.save);
  const targetInvuln = parseStatNumber(stats.invulnerable);

  if (targetToughness) toughness.value = targetToughness;
  if (targetSave) save.value = targetSave;
  invuln.value = targetInvuln ? targetInvuln : '';
  render();
}

function populateTargetUnits() {
  targetUnitSelect.innerHTML = '';
  Object.keys(targetData.units || {}).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    targetUnitSelect.appendChild(opt);
  });
  if (targetUnitSelect.options.length) {
    applyTargetUnit(targetData.units[targetUnitSelect.value]);
  } else {
    render();
  }
}

async function setTargetFaction(slug) {
  const faction = factionManifest.find(entry => entry.slug === slug) || factionManifest[0];
  if (!faction) return;

  currentTargetFactionSlug = faction.slug;
  targetFactionSelect.value = currentTargetFactionSlug;

  await loadFactionScript(faction);
  const loaded = window.WH40K_FACTION_DATABASES?.[faction.slug];
  targetData = loaded ? structuredClone(loaded) : structuredClone(defaultData);

  populateTargetUnits();
}

async function setBuilderFaction(slug, { resetUnits = true } = {}) {
  const faction = factionManifest.find(entry => entry.slug === slug) || factionManifest[0];
  if (!faction) return;

  currentBuilderFactionSlug = faction.slug;
  builderFactionSelect.value = currentBuilderFactionSlug;

  await loadFactionScript(faction);
  const loaded = window.WH40K_FACTION_DATABASES?.[faction.slug];
  builderData = loaded ? structuredClone(loaded) : structuredClone(defaultData);

  activeBuilderList.factionSlug = currentBuilderFactionSlug;
  activeBuilderList.factionName = builderData.faction?.name || faction.name;
  if (resetUnits) activeBuilderList.units = [];

  document.getElementById('builderFactionPill').textContent = `Faction: ${activeBuilderList.factionName}`;
  populateBuilderDetachmentOptions();
  populateBuilderUnits();
  renderBuilderList();
}

function currentBuilderDetachmentData() {
  return detachmentsForFaction(currentBuilderFactionSlug)
    .find(detachment => detachment.slug === activeBuilderList?.detachmentSlug)
    || detachmentsForFaction(currentBuilderFactionSlug)[0]
    || null;
}

function renderBuilderDetachmentDetails() {
  const detachment = currentBuilderDetachmentData();
  builderDetachmentDetailsToggle.textContent = builderDetachmentDetailsExpanded ? 'Hide Detachment Details' : 'View Detachment Details';
  builderDetachmentDetailsPanel.hidden = !builderDetachmentDetailsExpanded;
  if (!builderDetachmentDetailsExpanded) {
    builderDetachmentDetailsPanel.innerHTML = '';
    return;
  }
  if (!detachment) {
    builderDetachmentDetailsPanel.innerHTML = '<div class="army-empty">No detachment reference is available for this faction yet.</div>';
    return;
  }
  const rulesMarkup = Array.isArray(detachment.rules) && detachment.rules.length
    ? detachment.rules.map(rule => `
      <div class="detachment-reference-item">
        <div class="detachment-reference-name">${escapeHtml(rule.name)}</div>
        <div class="detachment-reference-text">${escapeHtml(rule.text || '')}</div>
      </div>
    `).join('')
    : '<div class="army-empty">No detachment rule reference is available yet.</div>';
  const enhancementsMarkup = Array.isArray(detachment.enhancements) && detachment.enhancements.length
    ? detachment.enhancements.map(enhancement => `
      <div class="detachment-reference-item">
        <div class="detachment-reference-name">${escapeHtml(enhancement.name)}<span class="detachment-reference-cost">${escapeHtml(String(enhancement.points || 0))} pts</span></div>
        <div class="detachment-reference-text">${escapeHtml(enhancement.text || '')}</div>
      </div>
    `).join('')
    : '<div class="army-empty">No enhancements are available for this detachment yet.</div>';
  builderDetachmentDetailsPanel.innerHTML = `
    <div class="detachment-reference-title">${escapeHtml(detachment.name)}</div>
    <div class="detachment-reference-block">
      <div class="detachment-reference-name">Detachment Rules</div>
      ${rulesMarkup}
    </div>
    <div class="detachment-reference-block">
      <div class="detachment-reference-name">Enhancements</div>
      ${enhancementsMarkup}
    </div>
  `;
}

function populateBuilderUnits() {
  builderUnitSelect.innerHTML = '';
  Object.keys(builderData.units || {}).filter(name => name !== 'Example Wargear').forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    builderUnitSelect.appendChild(opt);
  });
  renderBuilderWeaponOptions({ resetModelCount: true });
}

function renderBuilderWeaponOptions({ resetModelCount = false } = {}) {
  const unitName = builderUnitSelect.value;
  const unit = builderData.units?.[unitName];
  enforceBuilderModelComposition({ reset: resetModelCount });
  const modelCount = Number(builderModelCount.value || 0);
  const hardcodedRule = getBuilderWargearRule(unitName);
  if (hardcodedRule) {
    hardcodedRule.render(unitName, modelCount);
    return;
  }
  const groups = weaponGroupsForUnit(unit);
  if (!groups.length) {
    builderWeaponOptions.innerHTML = '<div class="army-empty">No weapon profiles found for this unit.</div>';
    updateBuilderSelectedPoints();
    return;
  }

  const defaults = defaultBuilderWeaponQuantities(unitName, modelCount);      builderWeaponOptions.innerHTML = groups.map(group => {
    const value = defaults[group.key] || 0;
    const max = Math.max(value, inferWargearMax(currentBuilderFactionSlug, unitName, group.key, modelCount));
    return `
      <label class="wargear-line">
        <span>${escapeHtml(group.label)}</span>
        <input type="number" class="builder-weapon-option" data-weapon-key="${escapeHtml(group.key)}" data-weapon-label="${escapeHtml(group.label)}" min="0" max="${max}" value="${value}" />
      </label>
    `;
  }).join('');
  updateBuilderSelectedPoints();
}

function updateBuilderSelectedPoints() {
  const unitName = builderUnitSelect.value;
  const unitPoints = calculateUnitPoints(currentBuilderFactionSlug, unitName, builderModelCount.value);
  document.getElementById('builderSelectedPoints').textContent = `Points: ${unitPoints.label}`;
}

function selectedBuilderWeaponQuantities() {
  const hardcodedRule = getBuilderWargearRule();
  if (hardcodedRule) return hardcodedRule.quantities();
  const quantities = {};
  builderWeaponOptions.querySelectorAll('.builder-weapon-option').forEach(input => {
    const key = input.dataset.weaponKey;
    if (!key) return;
    const max = Number(input.max || 0);
    const value = Math.max(0, Math.min(max || Infinity, Number(input.value || 0)));
    input.value = String(value);
    if (value > 0) quantities[key] = value;
  });
  return enforceBuilderWargearGroupLimits(quantities);
}

function selectedBuilderWargearConfig() {
  const config = {};
  builderWeaponOptions.querySelectorAll('.dkok-option, .rules-select-option, .builder-weapon-option').forEach(input => {
    const key = input.dataset.key || input.dataset.weaponKey;
    if (!key) return;
    config[`${input.classList.contains('builder-weapon-option') ? 'legacy' : 'rule'}:${key}`] = input.value;
  });
  return config;
}

function applyBuilderWargearConfig(config = {}) {
  builderWeaponOptions.querySelectorAll('.dkok-option, .rules-select-option, .builder-weapon-option').forEach(input => {
    const key = input.dataset.key || input.dataset.weaponKey;
    if (!key) return;
    const configKey = `${input.classList.contains('builder-weapon-option') ? 'legacy' : 'rule'}:${key}`;
    if (Object.prototype.hasOwnProperty.call(config, configKey)) {
      input.value = config[configKey];
    }
  });
}

function applyLegacyBuilderWeaponQuantities(quantities = {}) {
  builderWeaponOptions.querySelectorAll('.builder-weapon-option').forEach(input => {
    const key = input.dataset.weaponKey;
    if (key && Object.prototype.hasOwnProperty.call(quantities, key)) {
      input.value = quantities[key];
    }
  });
}

function selectedBuilderWeapons() {
  const unit = builderData.units?.[builderUnitSelect.value];
  const quantities = selectedBuilderWeaponQuantities();
  return Object.keys(unit?.weapons || {}).filter(profileName => quantities[normalizeWeaponProfileKey(profileName)] > 0);
}

function formatWeaponQuantities(entry, unit) {
  if (entry.weaponQuantities) {
    return Object.entries(entry.weaponQuantities)
      .filter(([, count]) => Number(count) > 0)
      .map(([key, count]) => `${count}x ${rosterWargearLabel(key, unit)}`)
      .join(', ') || 'No weapons selected';
  }
  return Array.isArray(entry.weapons) ? entry.weapons.map(escapeHtml).join(', ') : 'No weapons selected';
}

function formatRosterUnitTitle(entry, index) {
  const modelLabel = `${entry.models} Model${entry.models === 1 ? '' : 's'}`;
  const squadName = String(entry.squadName || '').trim();
  const unitLabel = squadName
    ? `${entry.unitName} - ${squadName}`
    : `${entry.unitName} #${index + 1}`;
  return `${unitLabel} (${modelLabel})`;
}

function clearBuilderUnitEditMode() {
  editingBuilderUnitId = null;
  document.getElementById('builderAddUnitBtn').textContent = 'Add Unit to List';
}

function loadBuilderUnitForEdit(unitId) {
  const entry = activeBuilderList.units.find(unitEntry => unitEntry.id === unitId);
  if (!entry || !builderData.units?.[entry.unitName]) return;

  editingBuilderUnitId = entry.id;
  builderUnitSelect.value = entry.unitName;
  builderSquadName.value = entry.squadName || '';
  renderBuilderWeaponOptions({ resetModelCount: true });
  builderModelCount.value = String(entry.models);
  renderBuilderWeaponOptions();
  if (entry.wargearConfig) {
    applyBuilderWargearConfig(entry.wargearConfig);
  } else {
    applyLegacyBuilderWeaponQuantities(entry.weaponQuantities);
  }
  selectedBuilderWeaponQuantities();
  updateBuilderSelectedPoints();
  document.getElementById('builderAddUnitBtn').textContent = 'Update Unit';
  builderUnitSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function addBuilderUnit() {
  const unitName = builderUnitSelect.value;
  const unit = builderData.units?.[unitName];
  if (!unit) return;
  syncBuilderListDraftName();
  normalizeBuilderModelCount();
  if (!builderModelCount.value) {
    alert('Cannot add this unit until its Unit Composition model count is available.');
    return;
  }

  const weaponQuantities = selectedBuilderWeaponQuantities();
  const validationMessage = getBuilderWargearRule(unitName)?.errors?.() || '';
  if (validationMessage) {
    alert(validationMessage);
    return;
  }
  const weapons = selectedBuilderWeapons();
  if (!weapons.length) {
    alert('Select at least one weapon quantity before adding this unit.');
    return;
  }
  const nextEntry = {
    id: editingBuilderUnitId || createId('unit'),
    unitName,
    models: Math.max(1, Number(builderModelCount.value || 1)),
    squadName: builderSquadName.value.trim(),
    weaponQuantities,
    wargearConfig: selectedBuilderWargearConfig(),
    weapons: weapons.length ? weapons : Object.keys(unit.weapons || {}).slice(0, 1)
  };
  if (editingBuilderUnitId) {
    const existingIndex = activeBuilderList.units.findIndex(entry => entry.id === editingBuilderUnitId);
    if (existingIndex >= 0) {
      activeBuilderList.units[existingIndex] = nextEntry;
    } else {
      activeBuilderList.units.push(nextEntry);
    }
  } else {
    activeBuilderList.units.push(nextEntry);
  }
  activeBuilderList.updatedAt = new Date().toISOString();
  clearBuilderUnitEditMode();
  builderSquadName.value = '';
  renderBuilderList();
}

function renderBuilderList() {
  activeBuilderList = normalizeArmyListRecord(activeBuilderList);
  builderListName.value = activeBuilderList.name || '';
  builderFactionSelect.value = activeBuilderList.factionSlug;
  builderDetachmentSelect.value = activeBuilderList.detachmentSlug || '';
  document.getElementById('builderFactionPill').textContent = `Faction: ${activeBuilderList.factionName || factionNameForSlug(activeBuilderList.factionSlug)}`;
  document.getElementById('builderUnitCountPill').textContent = `Units: ${activeBuilderList.units.length}`;
  document.getElementById('builderPointsPill').textContent = `Points: ${formatPointsTotal(calculateArmyListPoints(activeBuilderList))}`;
  renderBuilderDetachmentDetails();

  if (!activeBuilderList.units.length) {
    builderUnitsList.innerHTML = '<div class="army-empty">No units added yet. Configure a unit and add it to this list.</div>';
    return;
  }

  builderUnitsList.innerHTML = activeBuilderList.units.map((entry, index) => {
    const unit = builderData.units?.[entry.unitName];
    return `
      <div class="army-unit-row">
        <strong>${escapeHtml(formatRosterUnitTitle(entry, index))}</strong>
        <div class="small">${calculateUnitPoints(activeBuilderList.factionSlug, entry.unitName, entry.models).label} - ${escapeHtml(formatWeaponQuantities(entry, unit))}</div>
        <div class="army-unit-actions">
          <button type="button" class="secondary edit-builder-unit" data-unit-id="${escapeHtml(entry.id)}">Edit</button>
          <button type="button" class="secondary remove-builder-unit" data-unit-id="${escapeHtml(entry.id)}">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  builderUnitsList.querySelectorAll('.edit-builder-unit').forEach(button => {
    button.addEventListener('click', () => loadBuilderUnitForEdit(button.dataset.unitId));
  });

  builderUnitsList.querySelectorAll('.remove-builder-unit').forEach(button => {
    button.addEventListener('click', () => {
      if (editingBuilderUnitId === button.dataset.unitId) clearBuilderUnitEditMode();
      activeBuilderList.units = activeBuilderList.units.filter(entry => entry.id !== button.dataset.unitId);
      activeBuilderList.updatedAt = new Date().toISOString();
      renderBuilderList();
    });
  });
}
function saveActiveBuilderList() {
  activeBuilderList = normalizeArmyListRecord(activeBuilderList);
  activeBuilderList.name = builderListName.value.trim() || 'Untitled Strike Force';
  activeBuilderList.factionSlug = currentBuilderFactionSlug;
  activeBuilderList.factionName = builderData.faction?.name || factionNameForSlug(currentBuilderFactionSlug);
  activeBuilderList.detachmentSlug = builderDetachmentSelect.value || detachmentsForFaction(currentBuilderFactionSlug)[0]?.slug || 'core-detachment';
  activeBuilderList.detachmentName = detachmentNameForFaction(currentBuilderFactionSlug, activeBuilderList.detachmentSlug);
  activeBuilderList.updatedAt = new Date().toISOString();

  const existingIndex = armyLists.findIndex(list => list.id === activeBuilderList.id);
  if (existingIndex >= 0) {
    armyLists[existingIndex] = structuredClone(activeBuilderList);
  } else {
    armyLists.push(structuredClone(activeBuilderList));
  }
  persistArmyLists();
  if (activeCombatList?.id === activeBuilderList.id) {
    activeCombatList = structuredClone(activeBuilderList);
    setCombatArmyList(activeCombatList.id);
  }
  renderBuilderList();
}

async function loadBuilderList(id) {
  const saved = armyLists.find(list => list.id === id);
  if (!saved) return;

  activeBuilderList = normalizeArmyListRecord(saved);
  currentBuilderFactionSlug = activeBuilderList.factionSlug;
  clearBuilderUnitEditMode();
  builderSquadName.value = '';
  await setBuilderFaction(activeBuilderList.factionSlug, { resetUnits: false });
  renderBuilderList();
  populateArmyListSelectors();
}

function deleteBuilderList(id) {
  if (!id) return;
  armyLists = armyLists.filter(list => list.id !== id);
  if (activeBuilderList.id === id) {
    activeBuilderList = createEmptyArmyList();
    currentBuilderFactionSlug = activeBuilderList.factionSlug;
    clearBuilderUnitEditMode();
    builderSquadName.value = '';
    setBuilderFaction(currentBuilderFactionSlug, { resetUnits: true });
  }
  if (activeCombatList?.id === id) {
    activeCombatList = null;
    setCombatArmyList('');
  }
  persistArmyLists();
  renderBuilderList();
}

async function setCombatArmyList(listId) {
  activeCombatList = armyLists.find(list => list.id === listId) || null;
  combatArmyListSelect.value = activeCombatList?.id || '';

  if (!activeCombatList) {
    factionSelect.disabled = false;
    factionSelect.title = '';
    await setFaction(currentFactionSlug);
    return;
  }

  factionSelect.disabled = true;
  factionSelect.title = `Loaded list: ${activeCombatList.name}. Attacker choices are filtered to this roster.`;
  await setFaction(activeCombatList.factionSlug);
}

function availableCombatUnitNames() {
  if (!activeCombatList) {
    return Object.keys(data.units || {}).filter(function (name) {
      return name !== 'Example Wargear';
    });
  }
  return activeCombatList.units
    .map(entry => entry.unitName)
    .filter((name, index, arr) => name !== 'Example Wargear' && data.units?.[name] && arr.indexOf(name) === index);
}

function selectedCombatListEntry() {
  if (!activeCombatList) return null;
  return activeCombatList.units.find(entry => entry.id === unitSelect.value) || null;
}

function selectedCombatUnitName() {
  return selectedCombatListEntry()?.unitName || unitSelect.value;
}

function availableCombatWeaponNames(unitName, listEntry = selectedCombatListEntry()) {
  const context = activeBattleAttackContext();
  const unit = data.units?.[unitName];
  if (!unit) return [];
  let names = Object.keys(unit.weapons || {});
  if (activeCombatList) {
    names = names.filter(name => weaponQuantityForProfile(listEntry, name) > 0);
  }
  if (context?.action === 'shoot') {
    names = names.filter(name => {
      const weapon = unit.weapons?.[name];
      return weapon?.phase === 'Shooting' || weapon?.type === 'Ranged';
    });
  } else if (context?.action === 'fight') {
    names = names.filter(name => {
      const weapon = unit.weapons?.[name];
      return weapon?.phase === 'Fight' || weapon?.type === 'Melee';
    });
  }
  if (context) {
    const recordedWeaponNames = battleAttackRecordedWeaponNames();
    names = names.filter(name => !recordedWeaponNames.has(name));
  }
  return names;
}

function combatModelCountForWeapon(unitName, weaponName = weaponSelect.value, listEntry = selectedCombatListEntry()) {
  if (!activeCombatList || listEntry?.unitName !== unitName) return null;
  const quantity = weaponQuantityForProfile(listEntry, weaponName);
  return quantity > 0 ? quantity : Number(listEntry.models || 1);
}

function updateModelsFromSelectedWeapon() {
  const unitName = selectedCombatUnitName();
  const listModelCount = combatModelCountForWeapon(unitName, weaponSelect.value);
  if (listModelCount) modelsInput.value = listModelCount;
}


