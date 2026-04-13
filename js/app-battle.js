// Battle tracker state, actions, logging, and battle-linked attack flow.
function normalizeBattleStartingCp(input) {
  const normalized = Math.max(0, Math.floor(Number(input.value || 0)));
  input.value = String(Number.isFinite(normalized) ? normalized : 0);
  return normalized;
}

function linkedArmyListForBattle() {
  return armyLists.find(list => list.id === activeBattle?.yourArmyListId) || null;
}

function linkedBattleUnits() {
  return linkedArmyListForBattle()?.units || [];
}

function linkedBattleDetachment() {
  const list = linkedArmyListForBattle();
  if (!list?.factionSlug) return null;
  return detachmentsForFaction(list.factionSlug).find(detachment => detachment.slug === list.detachmentSlug) || null;
}

function linkedBattleFactionData() {
  const list = linkedArmyListForBattle();
  if (!list?.factionSlug) return null;
  return window.WH40K_FACTION_DATABASES?.[list.factionSlug] || null;
}

function ensureBattleFactionDataLoaded() {
  const list = linkedArmyListForBattle();
  if (!list?.factionSlug) return Promise.resolve(null);
  const loaded = linkedBattleFactionData();
  if (loaded) return Promise.resolve(loaded);
  const faction = factionManifest.find(entry => entry.slug === list.factionSlug);
  if (!faction) return Promise.resolve(null);
  return loadFactionScript(faction).then(() => linkedBattleFactionData()).catch(() => null);
}

function battleUnitStatusLabel(status) {
  const labels = {
    ready: 'Ready',
    reserves: 'Reserves',
    battleshocked: 'Battle-shocked',
    destroyed: 'Destroyed',
  };
  return labels[status] || 'Ready';
}

function battleHasStarted() {
  return activeBattle?.isStarted === true;
}

function battleHasEnded() {
  return activeBattle?.isEnded === true;
}

function battleLiveEditingEnabled() {
  return battleHasStarted() && !battleHasEnded();
}

function battlePanelChoice() {
  return activeBattle?.ui?.panel || 'scoreboard';
}

function ensureBattlePanelChoice() {
  if (!battlePanelSections?.length) return battlePanelChoice();
  const available = battlePanelSections.map(section => section.dataset.panel).filter(Boolean);
  let choice = battlePanelChoice();
  if (!available.includes(choice)) {
    choice = available[0] || 'scoreboard';
    activeBattle.ui = activeBattle.ui || {};
    activeBattle.ui.panel = choice;
  }
  return choice;
}

function renderBattlePanelVisibility() {
  if (!battlePanelSections?.length || !battlePanelButtons?.length) return;
  const choice = ensureBattlePanelChoice();
  battlePanelSections.forEach(section => {
    section.hidden = section.dataset.panel !== choice;
  });
  battlePanelButtons.forEach(button => {
    const active = button.dataset.panel === choice;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function setBattlePanelChoice(panel) {
  if (!panel) return;
  activeBattle.ui = activeBattle.ui || {};
  activeBattle.ui.panel = panel;
  syncActiveBattlePersistence();
  renderBattlePanelVisibility();
}

function hideBattleEndConfirmation() {
  battleEndConfirmRow.hidden = true;
}

function currentBattleUnitAction() {
  if (!battleHasStarted() || activeBattle.currentPlayer !== 'you') return null;
  const actionMap = {
    Movement: 'move',
    Shooting: 'shoot',
    Charge: 'charge',
    Fight: 'fight',
  };
  return actionMap[activeBattle.currentPhase] || null;
}

function battlePhaseActionLabel(action) {
  const labels = {
    move: 'Move',
    shoot: 'Shoot',
    charge: 'Charge',
    fight: 'Fight',
  };
  return labels[action] || '';
}

function battlePhaseActionPastTense(action) {
  const labels = {
    move: 'moved',
    shoot: 'shot',
    charge: 'charged',
    fight: 'fought',
  };
  return labels[action] || action;
}

function battlePhaseActionKey(unitId, action) {
  return [
    unitId,
    activeBattle.round || 1,
    activeBattle.currentPlayer || 'you',
    activeBattle.currentPhase || 'Command',
    action,
  ].join('::');
}

function hasBattlePhaseActionBeenUsed(unitId, action) {
  if (!unitId || !action) return false;
  return activeBattle.phaseActions?.[battlePhaseActionKey(unitId, action)] === true;
}

function activeBattleAttackContext() {
  return activeBattle?.pendingAttackContext || null;
}

function battleAttackTargetGroups() {
  return Array.isArray(activeBattleAttackContext()?.targetGroups) ? activeBattleAttackContext().targetGroups : [];
}

function activeBattleAttackTargetGroup() {
  const context = activeBattleAttackContext();
  if (!context) return null;
  return battleAttackTargetGroups().find(group => group.id === context.activeTargetGroupId) || battleAttackTargetGroups()[0] || null;
}

function battleAttackAllRecordedWeapons() {
  return battleAttackTargetGroups().flatMap(group => Array.isArray(group.recordedWeapons) ? group.recordedWeapons : []);
}

function battleAttackRecordedWeaponNames() {
  return new Set(battleAttackAllRecordedWeapons().map(entry => entry.weaponName));
}

function battleAttackRecordedTotalDamage() {
  return battleAttackAllRecordedWeapons().reduce((sum, entry) => sum + Math.max(0, Number(entry.damage || 0)), 0);
}

function battleAttackTargetGroupTotalDamage(group) {
  if (!group || !Array.isArray(group.recordedWeapons)) return 0;
  return group.recordedWeapons.reduce((sum, entry) => sum + Math.max(0, Number(entry.damage || 0)), 0);
}

function battleAttackCompletedTargetGroups() {
  return battleAttackTargetGroups().filter(group => Array.isArray(group.recordedWeapons) && group.recordedWeapons.length);
}

function updateBattleAttackApplyState() {
  const context = activeBattleAttackContext();
  if (!context) {
    calculatorRecordBattleWeaponBtn.disabled = false;
    calculatorBattleNewTargetBtn.disabled = false;
    calculatorApplyBattleAttackBtn.disabled = false;
    return;
  }
  const hasWeapon = Boolean(getSelectedWeapon());
  const hasDamage = Number.isFinite(Number(calculatorResolvedDamageInput.value || '')) && Number(calculatorResolvedDamageInput.value || 0) >= 0;
  const activeGroup = activeBattleAttackTargetGroup();
  const targetName = activeGroup?.targetUnitName || targetUnitSelect.value || '';
  const hasRecordedWeapons = battleAttackCompletedTargetGroups().length > 0;
  calculatorRecordBattleWeaponBtn.disabled = !(hasWeapon && hasDamage && targetName);
  calculatorBattleNewTargetBtn.disabled = !(activeGroup && activeGroup.recordedWeapons.length > 0);
  calculatorApplyBattleAttackBtn.disabled = !hasRecordedWeapons;
}

function renderCalculatorBattleMode() {
  const context = activeBattleAttackContext();
  if (!context) {
    calculatorView.classList.remove('battle-linked');
    calculatorBattleModeNote.hidden = true;
    calculatorBattleModeNote.textContent = '';
    calculatorCancelBattleAttackBtn.hidden = true;
    calculatorBattleResolveRow.hidden = true;
    calculatorBattleResolveNote.hidden = true;
    calculatorBattleResolveNote.textContent = '';
    calculatorBattleRecordedWeapons.hidden = true;
    calculatorBattleRecordedWeapons.innerHTML = '';
    calculatorBattleFinalizeRow.hidden = true;
    calculatorRecordBattleWeaponBtn.textContent = 'Record Weapon Damage';
    calculatorApplyBattleAttackBtn.textContent = 'Apply Damage';
    if (calculatorBattleTrackerBtn) calculatorBattleTrackerBtn.disabled = false;
    if (calculatorBuilderBtn) calculatorBuilderBtn.disabled = false;
    combatArmyListSelect.disabled = false;
    unitSelect.disabled = false;
    targetFactionSelect.disabled = false;
    factionSelect.disabled = Boolean(activeCombatList);
    updateBattleAttackApplyState();
    return;
  }
  if (
    !battleLiveEditingEnabled()
    || context.battleId !== activeBattle.id
    || context.round !== activeBattle.round
    || context.player !== activeBattle.currentPlayer
    || context.phase !== activeBattle.currentPhase
    || context.action !== currentBattleUnitAction()
  ) {
    clearBattleAttackContext();
    return;
  }
  calculatorView.classList.add('battle-linked');
  const linkedUnits = linkedBattleUnits();
  const entry = linkedUnits.find(unit => unit.id === context.unitId);
  const unitLabel = entry ? formatRosterUnitTitle(entry, linkedUnits.indexOf(entry)) : context.unitName || 'Linked unit';
  const actionLabel = battlePhaseActionLabel(context.action);
  const targetGroups = battleAttackTargetGroups();
  const activeGroup = activeBattleAttackTargetGroup();
  const completedGroups = battleAttackCompletedTargetGroups();
  const activeTargetName = activeGroup?.targetUnitName || targetUnitSelect.value || 'Select a target unit';
  const activeTargetTotal = battleAttackTargetGroupTotalDamage(activeGroup);
  if (activeGroup?.targetUnitName && targetUnitSelect.querySelector(`option[value="${activeGroup.targetUnitName}"]`)) {
    targetUnitSelect.value = activeGroup.targetUnitName;
  }
  calculatorBattleModeNote.hidden = false;
  calculatorBattleModeNote.textContent = `Battle-linked ${actionLabel} action: ${unitLabel}. Opponent faction synced from Battle Tracker.`;
  calculatorCancelBattleAttackBtn.hidden = false;
  calculatorBattleResolveRow.hidden = false;
  calculatorRecordBattleWeaponBtn.textContent = `Record ${actionLabel} Weapon`;
  calculatorApplyBattleAttackBtn.textContent = `Apply ${actionLabel}`;
  calculatorBattleResolveNote.hidden = false;
  calculatorBattleResolveNote.textContent = `Current target: ${activeTargetName}. Target groups: ${completedGroups.length}. Current target total: ${activeTargetTotal}.`;
  const showActiveTargetGroup = Boolean(activeGroup && !activeGroup.recordedWeapons.length && completedGroups.length > 0);
  const activeGroupMarkup = showActiveTargetGroup ? `
    <div class="army-unit-row active-target-group">
      <strong>Target ${completedGroups.length + 1}: ${escapeHtml(activeTargetName)}</strong>
      <div class="small">New target in progress. Record weapons for this target or choose a different target before recording.</div>
    </div>
  ` : '';
  calculatorBattleRecordedWeapons.hidden = !(completedGroups.length || showActiveTargetGroup);
  calculatorBattleRecordedWeapons.innerHTML = completedGroups.map((group, groupIndex) => `
    <div class="army-unit-row">
      <strong>Target ${groupIndex + 1}: ${escapeHtml(group.targetUnitName || 'Unknown Target')}</strong>
      <div class="small">Target total: ${battleAttackTargetGroupTotalDamage(group)} damage</div>
      ${group.recordedWeapons.map(entry => `
        <div class="small">${escapeHtml(entry.weaponName)} - ${escapeHtml(String(entry.damage))} damage recorded</div>
        <div class="army-unit-actions">
          <button type="button" class="secondary calculator-remove-recorded-weapon-btn" data-group-id="${escapeHtml(group.id)}" data-weapon-name="${escapeHtml(entry.weaponName)}">Remove</button>
        </div>
      `).join('')}
    </div>
  `).join('') + activeGroupMarkup;
  calculatorBattleFinalizeRow.hidden = completedGroups.length === 0;
  if (calculatorBattleTrackerBtn) calculatorBattleTrackerBtn.disabled = true;
  if (calculatorBuilderBtn) calculatorBuilderBtn.disabled = true;
  combatArmyListSelect.disabled = true;
  factionSelect.disabled = true;
  unitSelect.disabled = true;
  targetFactionSelect.disabled = true;
  targetUnitSelect.disabled = Boolean(activeGroup && activeGroup.recordedWeapons.length > 0);
  calculatorBattleRecordedWeapons.querySelectorAll('.calculator-remove-recorded-weapon-btn').forEach(button => {
    button.addEventListener('click', () => removeRecordedBattleAttackWeapon(button.dataset.groupId, button.dataset.weaponName));
  });
  updateBattleAttackApplyState();
}

function clearBattleAttackContext({ persist = true, renderCalculator = true } = {}) {
  if (!activeBattle?.pendingAttackContext) return;
  activeBattle.pendingAttackContext = null;
  calculatorResolvedDamageInput.value = '';
  calculatorBattleResolveNote.textContent = '';
  if (persist) syncActiveBattlePersistence();
  if (renderCalculator) renderCalculatorBattleMode();
}

async function beginBattleAttackContext(unitId, action) {
  if (!battleLiveEditingEnabled()) return;
  const linkedList = linkedArmyListForBattle();
  const linkedUnits = linkedBattleUnits();
  const entry = linkedUnits.find(unit => unit.id === unitId);
  const currentAction = currentBattleUnitAction();
  if (!linkedList || !entry || !['shoot', 'fight'].includes(action) || action !== currentAction) return;
  activeBattle.pendingAttackContext = {
    unitId,
    unitName: entry.unitName,
    action,
    targetGroups: [{
      id: createId('attack-target'),
      targetUnitName: '',
      recordedWeapons: [],
    }],
    activeTargetGroupId: '',
    battleId: activeBattle.id,
    armyListId: linkedList.id,
    opponentFactionSlug: activeBattle.opponentFactionSlug,
    round: activeBattle.round,
    player: activeBattle.currentPlayer,
    phase: activeBattle.currentPhase,
    createdAt: new Date().toISOString(),
  };
  activeBattle.pendingAttackContext.activeTargetGroupId = activeBattle.pendingAttackContext.targetGroups[0].id;
  syncActiveBattlePersistence();
  await setCombatArmyList(linkedList.id);
  if (unitSelect.querySelector(`option[value="${unitId}"]`)) {
    unitSelect.value = unitId;
    populateWeapons();
  }
  if (activeBattle.opponentFactionSlug) {
    await setTargetFaction(activeBattle.opponentFactionSlug);
  }
  renderCalculatorBattleMode();
  showView('calculator');
}

function cancelBattleAttackContext() {
  if (!activeBattleAttackContext()) return;
  clearBattleAttackContext();
  showView('battle-tracker');
  setBattleStatus('Battle-linked attack canceled.');
}

function recordBattleAttackWeapon() {
  const context = activeBattleAttackContext();
  const activeGroup = activeBattleAttackTargetGroup();
  const weapon = getSelectedWeapon();
  const weaponName = weaponSelect.value || '';
  const rawDamage = Number(calculatorResolvedDamageInput.value || 0);
  const damage = Math.max(0, Math.floor(rawDamage));
  if (!context || !weapon || !weaponName) {
    calculatorBattleResolveNote.hidden = false;
    calculatorBattleResolveNote.textContent = 'Select a valid linked weapon profile before recording damage.';
    return;
  }
  if (battleAttackRecordedWeaponNames().has(weaponName)) {
    calculatorBattleResolveNote.hidden = false;
    calculatorBattleResolveNote.textContent = `${weaponName} has already been recorded for this attack.`;
    return;
  }
  if (!Number.isFinite(rawDamage) || rawDamage < 0) {
    calculatorBattleResolveNote.hidden = false;
    calculatorBattleResolveNote.textContent = 'Enter a resolved damage value of 0 or more.';
    return;
  }
  const targetName = targetUnitSelect.value || activeGroup?.targetUnitName || '';
  if (!activeGroup || !targetName) {
    calculatorBattleResolveNote.hidden = false;
    calculatorBattleResolveNote.textContent = 'Select a target unit before recording weapon damage.';
    return;
  }
  activeGroup.targetUnitName = targetName;
  activeGroup.recordedWeapons.push({
    weaponName,
    damage,
  });
  calculatorResolvedDamageInput.value = '';
  syncActiveBattlePersistence();
  populateWeapons();
  renderCalculatorBattleMode();
}

function removeRecordedBattleAttackWeapon(groupId, weaponName) {
  const context = activeBattleAttackContext();
  if (!context || !groupId || !weaponName) return;
  context.targetGroups = battleAttackTargetGroups().map(group => {
    if (group.id !== groupId) return group;
    return {
      ...group,
      recordedWeapons: group.recordedWeapons.filter(entry => entry.weaponName !== weaponName),
    };
  }).filter(group => group.recordedWeapons.length || group.id === context.activeTargetGroupId);
  if (!context.targetGroups.length) {
    const fallbackGroup = {
      id: createId('attack-target'),
      targetUnitName: '',
      recordedWeapons: [],
    };
    context.targetGroups = [fallbackGroup];
    context.activeTargetGroupId = fallbackGroup.id;
  }
  syncActiveBattlePersistence();
  populateWeapons();
  if (weaponSelect.querySelector(`option[value="${weaponName}"]`)) {
    weaponSelect.value = weaponName;
  }
  renderCalculatorBattleMode();
}

function createBattleAttackTargetGroup() {
  return {
    id: createId('attack-target'),
    targetUnitName: '',
    recordedWeapons: [],
  };
}

function addBattleAttackTargetGroup() {
  const context = activeBattleAttackContext();
  const activeGroup = activeBattleAttackTargetGroup();
  if (!context || !activeGroup || !activeGroup.recordedWeapons.length) return;
  const nextGroup = createBattleAttackTargetGroup();
  context.targetGroups.push(nextGroup);
  context.activeTargetGroupId = nextGroup.id;
  calculatorResolvedDamageInput.value = '';
  syncActiveBattlePersistence();
  renderCalculatorBattleMode();
  updateBattleAttackApplyState();
}

function applyBattleAttackResolution() {
  const context = activeBattleAttackContext();
  if (!context || !battleLiveEditingEnabled()) return;
  const linkedUnits = linkedBattleUnits();
  const entry = linkedUnits.find(unit => unit.id === context.unitId);
  const completedGroups = battleAttackCompletedTargetGroups();
  if (!entry) return;
  if (!completedGroups.length) {
    calculatorBattleResolveNote.hidden = false;
    calculatorBattleResolveNote.textContent = 'Record at least one weapon result before applying the attack.';
    return;
  }
  const key = battlePhaseActionKey(context.unitId, context.action);
  if (activeBattle.phaseActions?.[key]) return;
  pushBattleUndoSnapshot();
  activeBattle.phaseActions[key] = true;
  const targetBreakdown = completedGroups
    .map((group, index) => `Target ${index + 1}: ${group.targetUnitName}. ${group.recordedWeapons.map(entry => `${entry.weaponName} ${entry.damage}`).join('; ')}. Total damage ${battleAttackTargetGroupTotalDamage(group)}.`)
    .join(' ');
  addBattleLogEntry(
    'phase-action',
    `${formatRosterUnitTitle(entry, linkedUnits.indexOf(entry))} ${battlePhaseActionPastTense(context.action)}. ${targetBreakdown}`
  );
  clearBattleAttackContext({ persist: false, renderCalculator: true });
  syncActiveBattlePersistence();
  renderBattleDashboard();
  showView('battle-tracker');
  setBattleStatus(`${formatRosterUnitTitle(entry, linkedUnits.indexOf(entry))} ${battlePhaseActionPastTense(context.action)} resolved.`);
}

function reserveUnitsAtBattleStart() {
  return linkedBattleUnits().filter(entry => (activeBattle.unitStates?.[entry.id] || 'ready') === 'reserves');
}

function updateBattleLiveControls() {
  const started = battleHasStarted();
  const ended = battleHasEnded();
  const liveEditing = battleLiveEditingEnabled();
  const stratagemButton = document.getElementById('battleTrackerStratagemsBtn');
  const phaseLabel = currentBattlePhaseTag();
  [
    battleNameInput,
    battleYourFactionSelect,
    battleArmyListSelect,
    battleOpponentFactionSelect,
    battleMissionNameInput,
    battleDeploymentInput,
    battleMissionRuleInput,
    battleYourRoleSelect,
    battleFirstTurnSelect,
    battleYourStartingCpInput,
    battleOpponentStartingCpInput,
  ].forEach(el => {
    el.disabled = started || ended;
  });
  battleStartBtn.disabled = started || ended;
  battleStartBtn.textContent = ended ? 'Battle Ended' : (started ? 'Battle Started' : 'Start Battle');
  [
    battlePrevPhaseBtn,
    battleNextPhaseBtn,
    battleEndTurnBtn,
    battleNextRoundBtn,
  ].forEach(button => {
    button.disabled = !liveEditing;
  });
  if (stratagemButton) {
    stratagemButton.textContent = phaseLabel ? `Open ${phaseLabel} Stratagems` : 'Open Stratagems';
  }
  battleUndoBtn.disabled = battleUndoStack.length === 0 || !liveEditing;
  battleEndBattleBtn.disabled = !started || ended;
  document.querySelectorAll('.battle-adjust-btn, .battle-adjust-custom-btn').forEach(button => {
    button.disabled = !liveEditing;
  });
  document.querySelectorAll('.battle-custom-adjust input').forEach(input => {
    input.disabled = !liveEditing;
  });
  if (ended) hideBattleEndConfirmation();
}

function syncBattleUnitStates() {
  const linkedUnits = linkedBattleUnits();
  const nextStates = {};
  const nextDamage = {};
  const nextOneUse = {};
  linkedUnits.forEach(entry => {
    const previous = activeBattle.unitStates?.[entry.id];
    nextStates[entry.id] = previous && ['ready', 'reserves', 'battleshocked', 'destroyed'].includes(previous)
      ? previous
      : 'ready';
    nextDamage[entry.id] = Math.max(0, Number(activeBattle.unitDamage?.[entry.id] || 0));
    Object.entries(activeBattle.oneUseStatus || {})
      .filter(([key]) => key.startsWith(`${entry.id}::`))
      .forEach(([key, value]) => {
        nextOneUse[key] = Math.max(0, Number(value || 0));
      });
  });
  activeBattle.unitStates = nextStates;
  activeBattle.unitDamage = nextDamage;
  activeBattle.oneUseStatus = nextOneUse;
}

function syncBattleDraftFromForm() {
  activeBattle.name = battleNameInput.value.trim() || 'New Engagement';
  activeBattle.yourArmyListId = battleArmyListSelect.value || '';
  const linkedList = linkedArmyListForBattle();
  activeBattle.yourFactionSlug = linkedList?.factionSlug || battleYourFactionSelect.value || 'astra-militarum';
  activeBattle.opponentFactionSlug = battleOpponentFactionSelect.value || 'astra-militarum';
  activeBattle.missionName = battleMissionNameInput.value.trim();
  activeBattle.deployment = battleDeploymentInput.value.trim();
  activeBattle.missionRule = battleMissionRuleInput.value.trim();
  activeBattle.yourBattleRole = battleYourRoleSelect.value === 'defender' ? 'defender' : 'attacker';
  activeBattle.firstTurn = battleFirstTurnSelect.value === 'opponent' ? 'opponent' : 'you';
  activeBattle.players.you.cp = normalizeBattleStartingCp(battleYourStartingCpInput);
  activeBattle.players.opponent.cp = normalizeBattleStartingCp(battleOpponentStartingCpInput);
  pruneBattleSecondaryObjectivesForCurrentRoles();
  syncBattleUnitStates();
  activeBattle.updatedAt = new Date().toISOString();
  battleYourFactionSelect.value = activeBattle.yourFactionSlug;
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function ensureBattleTotals() {
  ['you', 'opponent'].forEach(side => {
    const player = activeBattle.players?.[side];
    if (!player) return;
    player.cp = Math.max(0, Number(player.cp || 0));
    player.primaryVp = Math.max(0, Number(player.primaryVp || 0));
    const sideState = activeBattle.secondaryObjectives?.[side] || createEmptyBattleSecondarySide();
    sideState.manualVp = Math.max(0, Number(sideState.manualVp || 0));
    player.secondaryVp = sideState.manualVp + battleSecondaryObjectiveTotal(sideState);
    player.totalVp = player.primaryVp + player.secondaryVp;
  });
}

function battleRoleLabel(role) {
  return role === 'defender' ? 'Defender' : 'Attacker';
}

function opposingBattleRole(role) {
  return role === 'defender' ? 'attacker' : 'defender';
}

function battleRoleForSide(side) {
  return side === 'opponent'
    ? opposingBattleRole(activeBattle?.yourBattleRole)
    : (activeBattle?.yourBattleRole === 'defender' ? 'defender' : 'attacker');
}

function battleSecondaryDeckData(role) {
  const data = window.WH40K_SECONDARY_OBJECTIVES || {};
  return Array.isArray(data?.[role]) ? data[role] : [];
}

function battleSecondaryStateForSide(side) {
  if (!activeBattle.secondaryObjectives) {
    activeBattle.secondaryObjectives = {
      you: createEmptyBattleSecondarySide(),
      opponent: createEmptyBattleSecondarySide(),
    };
  }
  if (!activeBattle.secondaryObjectives[side]) {
    activeBattle.secondaryObjectives[side] = createEmptyBattleSecondarySide();
  }
  return activeBattle.secondaryObjectives[side];
}

function battleSecondaryObjectiveLookup(side, objectiveId) {
  const role = battleRoleForSide(side);
  return battleSecondaryDeckData(role).find(objective => objective.id === objectiveId) || null;
}

function battleSecondarySelectedObjectives(side) {
  const state = battleSecondaryStateForSide(side);
  return state.selectedObjectiveIds
    .map(objectiveId => battleSecondaryObjectiveLookup(side, objectiveId))
    .filter(Boolean);
}

function battleSecondaryAvailableObjectives(side) {
  const state = battleSecondaryStateForSide(side);
  const selected = new Set(state.selectedObjectiveIds);
  return battleSecondaryDeckData(battleRoleForSide(side)).filter(objective => !selected.has(objective.id));
}

function battleSecondaryEntriesForObjective(side, objectiveId) {
  return battleSecondaryStateForSide(side).entries.filter(entry => entry.objectiveId === objectiveId);
}

function battleSecondaryObjectiveScoreTotal(side, objectiveId) {
  return battleSecondaryEntriesForObjective(side, objectiveId)
    .reduce((sum, entry) => sum + Math.max(0, Number(entry.vp || 0)), 0);
}

function currentBattlePhaseTag() {
  return BATTLE_PHASES.includes(activeBattle?.currentPhase) ? activeBattle.currentPhase : null;
}

function currentBattleTurnWindow() {
  return activeBattle?.currentPlayer === 'opponent' ? 'opponent' : 'your';
}

function battleCoreStratagems() {
  return Array.isArray(window.WH40K_CORE_STRATAGEMS) ? window.WH40K_CORE_STRATAGEMS : [];
}

function battleAvailableStratagems() {
  const linkedList = linkedArmyListForBattle();
  const detachment = linkedBattleDetachment();
  const core = battleCoreStratagems().map(entry => ({ ...entry, source: 'core', sourceLabel: 'Core' }));
  const detachmentEntries = Array.isArray(detachment?.stratagems)
    ? detachment.stratagems.map(entry => ({
        ...entry,
        source: 'detachment',
        sourceLabel: detachment.name,
      }))
    : [];
  if (!linkedList) return core;
  return core.concat(detachmentEntries);
}

function battleStratagemUsageEntries() {
  return Array.isArray(activeBattle?.stratagemUsage) ? activeBattle.stratagemUsage : [];
}

function battleHasStratagemBeenUsedThisPhase(stratagem) {
  return battleStratagemUsageEntries().some(entry =>
    entry.stratagemId === stratagem.id
    && entry.side === 'you'
    && entry.round === activeBattle.round
    && entry.player === activeBattle.currentPlayer
    && entry.phase === activeBattle.currentPhase
  );
}

function battleHasStratagemHitUsageLimit(stratagem) {
  if (!stratagem?.usageLimit) return false;
  if (stratagem.usageLimit === 'perBattle') {
    return battleStratagemUsageEntries().some(entry => entry.stratagemId === stratagem.id && entry.side === 'you');
  }
  if (stratagem.usageLimit === 'perTurn') {
    return battleStratagemUsageEntries().some(entry =>
      entry.stratagemId === stratagem.id
      && entry.side === 'you'
      && entry.round === activeBattle.round
      && entry.player === activeBattle.currentPlayer
    );
  }
  return false;
}

function battleStratagemMatchesSearch(stratagem, searchTerm) {
  if (!searchTerm) return true;
  const haystack = [
    stratagem.name,
    stratagem.type,
    stratagem.when,
    stratagem.target,
    stratagem.effect,
    stratagem.restrictions,
    stratagem.sourceLabel,
  ].join(' ').toLowerCase();
  return haystack.includes(searchTerm);
}

function battleStratagemMatchesCurrentWindow(stratagem) {
  const phaseTag = currentBattlePhaseTag();
  if (!phaseTag) return false;
  const phaseMatches = Array.isArray(stratagem.phaseTags) && stratagem.phaseTags.includes(phaseTag);
  if (!phaseMatches) return false;
  const timing = stratagem?.timing || 'any';
  if (timing === 'any') return true;
  return timing === currentBattleTurnWindow();
}

function compareBattleStratagemsForDisplay(a, b) {
  const aCurrent = battleStratagemMatchesCurrentWindow(a);
  const bCurrent = battleStratagemMatchesCurrentWindow(b);
  if (aCurrent !== bCurrent) return aCurrent ? -1 : 1;
  if ((a.source || '') !== (b.source || '')) return (a.source || '').localeCompare(b.source || '');
  return String(a.name || '').localeCompare(String(b.name || ''));
}

function battleStratagemSearchHistoryEntries() {
  return Array.isArray(activeBattle?.stratagemSearchHistory) ? activeBattle.stratagemSearchHistory : [];
}

function rememberBattleStratagemSearchTerm(term) {
  const normalized = String(term || '').trim();
  if (!normalized) return;
  const nextHistory = [normalized].concat(
    battleStratagemSearchHistoryEntries().filter(function (entry) {
      return String(entry || '').trim().toLowerCase() !== normalized.toLowerCase();
    })
  ).slice(0, 3);
  activeBattle.stratagemSearchHistory = nextHistory;
}

function renderBattleStratagems() {
  const linkedList = linkedArmyListForBattle();
  const detachment = linkedBattleDetachment();
  const stratagems = battleAvailableStratagems();
  const detachmentStratagemCount = Array.isArray(detachment?.stratagems) ? detachment.stratagems.length : 0;
  const searchTerm = String(battleStratagemSearchInput?.value || '').trim().toLowerCase();
  const filtered = stratagems
    .filter(stratagem => battleStratagemMatchesSearch(stratagem, searchTerm))
    .sort(compareBattleStratagemsForDisplay);
  if (!linkedList) {
    battleStratagemSummary.textContent = 'Link one of your army lists in Battle Setup to load detachment stratagems. Core Stratagems are shown for reference.';
  } else {
    battleStratagemSummary.textContent = detachmentStratagemCount
      ? `Linked roster: ${linkedList.name}. Detachment: ${detachment?.name || linkedList.detachmentName || 'Unknown'}. Core stratagems plus seeded detachment stratagems are shown below.`
      : `Linked roster: ${linkedList.name}. Detachment: ${detachment?.name || linkedList.detachmentName || 'Unknown'}. Core stratagems are loaded; detachment stratagem data for this detachment is not seeded yet.`;
  }
  if (battleStratagemHistory) {
    const historyEntries = battleStratagemSearchHistoryEntries();
    battleStratagemHistory.innerHTML = historyEntries.length ? `
      <div class="battle-stratagem-history-label">Recent searches</div>
      <div class="battle-stratagem-history-list">
        ${historyEntries.map(function (term) {
          return `<button type="button" class="secondary battle-stratagem-history-btn" data-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`;
        }).join('')}
      </div>
    ` : '';
  }
  if (!filtered.length) {
    battleStratagemList.innerHTML = '<div class="army-empty">No stratagems match the current search.</div>';
    if (battleStratagemHistory) {
      battleStratagemHistory.querySelectorAll('.battle-stratagem-history-btn').forEach(function (button) {
        button.addEventListener('click', function () {
          battleStratagemSearchInput.value = button.dataset.term || '';
          renderBattleStratagems();
        });
      });
    }
    return;
  }
  battleStratagemList.innerHTML = `<div class="stratagem-list">${filtered.map(stratagem => {
    const currentPhase = battleStratagemMatchesCurrentWindow(stratagem);
    const usedThisPhase = battleHasStratagemBeenUsedThisPhase(stratagem);
    const usageLocked = battleHasStratagemHitUsageLimit(stratagem);
    const canUse = battleLiveEditingEnabled() && !usedThisPhase && !usageLocked && Number(activeBattle.players?.you?.cp || 0) >= Number(stratagem.cp || 0);
    return `
      <div class="stratagem-row ${currentPhase ? 'current-phase' : ''}">
        <div class="stratagem-row-header">
          <div class="stratagem-row-title">${escapeHtml(stratagem.name)}</div>
          <div class="battle-secondary-score-total">${escapeHtml(String(stratagem.cp))}CP</div>
        </div>
        <div class="stratagem-row-tags">
          <span class="pill">${escapeHtml(stratagem.sourceLabel || 'Core')}</span>
          <span class="pill">${escapeHtml(stratagem.type || 'Stratagem')}</span>
          <span class="pill">${escapeHtml((stratagem.timing || 'any') === 'any' ? 'Any Turn' : `${stratagem.timing === 'opponent' ? 'Opponent' : 'Your'} Turn`)}</span>
          ${currentPhase ? '<span class="pill">Current Phase</span>' : ''}
          ${usedThisPhase ? '<span class="pill">Used This Phase</span>' : ''}
          ${usageLocked && !usedThisPhase ? '<span class="pill">Usage Locked</span>' : ''}
        </div>
        <div class="stratagem-row-note"><strong>When:</strong> ${escapeHtml(stratagem.when || '-')}</div>
        <div class="stratagem-row-note"><strong>Target:</strong> ${escapeHtml(stratagem.target || '-')}</div>
        <div class="stratagem-row-note"><strong>Effect:</strong> ${escapeHtml(stratagem.effect || '-')}</div>
        ${stratagem.restrictions ? `<div class="stratagem-row-note"><strong>Restrictions:</strong> ${escapeHtml(stratagem.restrictions)}</div>` : ''}
        <div class="army-unit-actions">
          <button
            type="button"
            class="secondary battle-use-stratagem-btn"
            data-stratagem-id="${escapeHtml(stratagem.id)}"
            data-source="${escapeHtml(stratagem.source || 'core')}"
            ${canUse ? '' : 'disabled'}
          >Use for You</button>
        </div>
      </div>
    `;
  }).join('')}</div>`;
  if (battleStratagemHistory) {
    battleStratagemHistory.querySelectorAll('.battle-stratagem-history-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        battleStratagemSearchInput.value = button.dataset.term || '';
        renderBattleStratagems();
      });
    });
  }
  battleStratagemList.querySelectorAll('.battle-use-stratagem-btn').forEach(button => {
    button.addEventListener('click', () => useBattleStratagem(button.dataset.stratagemId, button.dataset.source));
  });
}

function useBattleStratagem(stratagemId, source) {
  if (!battleLiveEditingEnabled() || !stratagemId) return;
  const stratagem = battleAvailableStratagems().find(entry => entry.id === stratagemId && entry.source === source);
  if (!stratagem) return;
  if (battleHasStratagemBeenUsedThisPhase(stratagem)) {
    setBattleStatus(`${stratagem.name} has already been used this phase.`);
    return;
  }
  if (battleHasStratagemHitUsageLimit(stratagem)) {
    setBattleStatus(`${stratagem.name} has already reached its usage limit.`);
    return;
  }
  const currentCp = Math.max(0, Number(activeBattle.players?.you?.cp || 0));
  if (currentCp < Number(stratagem.cp || 0)) {
    setBattleStatus(`Not enough CP to use ${stratagem.name}.`);
    return;
  }
  pushBattleUndoSnapshot();
  activeBattle.players.you.cp = currentCp - Number(stratagem.cp || 0);
  rememberBattleStratagemSearchTerm(battleStratagemSearchInput?.value || stratagem.name || '');
  activeBattle.stratagemUsage.unshift({
    id: createId('stratagem-use'),
    stratagemId: stratagem.id,
    source: stratagem.source || 'core',
    side: 'you',
    cp: Number(stratagem.cp || 0),
    round: activeBattle.round || 1,
    player: activeBattle.currentPlayer || 'you',
    phase: activeBattle.currentPhase || 'Command',
    spentCp: true,
    createdAt: new Date().toISOString(),
  });
  addBattleLogEntry('stratagem', `You used ${stratagem.name} (${stratagem.cp}CP).`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
  setBattleStatus(`Used ${stratagem.name}.`);
  showView('battle-tracker');
}

function battleSecondaryOptionLabel(option) {
  return `${option.vp}VP - ${option.label}`;
}

function pruneBattleSecondaryObjectivesForCurrentRoles() {
  ['you', 'opponent'].forEach(side => {
    const sideState = battleSecondaryStateForSide(side);
    const validIds = new Set(battleSecondaryDeckData(battleRoleForSide(side)).map(objective => objective.id));
    sideState.selectedObjectiveIds = sideState.selectedObjectiveIds.filter(id => validIds.has(id));
    sideState.entries = sideState.entries.filter(entry => validIds.has(entry.objectiveId));
  });
}

function renderBattleSecondaryObjectives() {
  pruneBattleSecondaryObjectivesForCurrentRoles();
  renderBattleSecondaryObjectivePanel('you', battleSecondaryYouPanel);
  renderBattleSecondaryObjectivePanel('opponent', battleSecondaryOpponentPanel);
}

function renderBattleSecondaryObjectivePanel(side, container) {
  if (!container) return;
  const role = battleRoleForSide(side);
  const sideState = battleSecondaryStateForSide(side);
  const liveEditing = battleLiveEditingEnabled();
  const editable = !battleHasEnded();
  const selectedObjectives = battleSecondarySelectedObjectives(side);
  const availableObjectives = battleSecondaryAvailableObjectives(side);
  const selectedCount = selectedObjectives.length;
  const currentTotal = battleSecondaryObjectiveTotal(sideState);
  const addDisabled = !editable || availableObjectives.length === 0;
  const selectOptions = availableObjectives.length
    ? availableObjectives.map(objective => `<option value="${escapeHtml(objective.id)}">${escapeHtml(objective.name)}</option>`).join('')
    : '<option value="">No remaining objectives</option>';

  container.innerHTML = `
    <div class="battle-secondary-summary-row">
      <div class="battle-secondary-meta"><strong>${escapeHtml(battleSideLabel(side))}</strong> - ${escapeHtml(battleRoleLabel(role))} deck. ${selectedCount} tracked. ${currentTotal}VP scored.</div>
    </div>
    <div class="battle-secondary-panel-body">
      <div class="battle-secondary-toolbar">
        <div>
          <label for="battleSecondarySelect-${side}">Add objective</label>
          <select id="battleSecondarySelect-${side}" ${addDisabled ? 'disabled' : ''}>
            ${selectOptions}
          </select>
        </div>
        <button type="button" class="secondary battle-secondary-add-btn" data-side="${escapeHtml(side)}" ${addDisabled ? 'disabled' : ''}>Add</button>
      </div>
      ${selectedObjectives.length ? selectedObjectives.map(objective => {
      const entries = battleSecondaryEntriesForObjective(side, objective.id);
      const history = entries.slice(0, 5).map(entry => `${entry.vp}VP - ${entry.label}`).join(' | ');
      const optionMarkup = (objective.scoringOptions || []).map((option, index) => `
        <option value="${index}">${escapeHtml(battleSecondaryOptionLabel(option))}</option>
      `).join('');
      return `
        <div class="battle-secondary-row">
          <div class="battle-secondary-row-top">
            <strong>${escapeHtml(objective.name)}</strong>
            <div class="battle-secondary-score-total">${battleSecondaryObjectiveScoreTotal(side, objective.id)}VP</div>
          </div>
          <div class="battle-secondary-controls">
            <select
              class="battle-secondary-score-select"
              data-side="${escapeHtml(side)}"
              data-objective-id="${escapeHtml(objective.id)}"
              ${liveEditing ? '' : 'disabled'}
            >
              ${optionMarkup}
            </select>
            <button
              type="button"
              class="secondary battle-secondary-score-btn"
              data-side="${escapeHtml(side)}"
              data-objective-id="${escapeHtml(objective.id)}"
              ${liveEditing ? '' : 'disabled'}
            >Score</button>
            <button
              type="button"
              class="secondary battle-secondary-remove-btn"
              data-side="${escapeHtml(side)}"
              data-objective-id="${escapeHtml(objective.id)}"
              ${editable ? '' : 'disabled'}
            >Remove</button>
          </div>
          <details class="battle-secondary-details">
            <summary>Details</summary>
            <div class="battle-secondary-meta">${escapeHtml(objective.summary || '')}</div>
            ${objective.whenDrawn ? `<div class="battle-secondary-meta"><strong>When drawn:</strong> ${escapeHtml(objective.whenDrawn)}</div>` : ''}
            ${objective.notes ? `<div class="battle-secondary-meta"><strong>Note:</strong> ${escapeHtml(objective.notes)}</div>` : ''}
            <div class="battle-secondary-meta">${(objective.scoringOptions || []).map(option => battleSecondaryOptionLabel(option)).join(' | ')}</div>
          </details>
          ${history ? `<div class="battle-secondary-history">Recent scores: ${escapeHtml(history)}</div>` : ''}
        </div>
      `;
    }).join('') : '<div class="army-empty">No secondary objectives selected for this side yet.</div>'}
    </div>
  `;

  const addButton = container.querySelector('.battle-secondary-add-btn');
  const select = container.querySelector(`#battleSecondarySelect-${side}`);
  if (addButton && select) {
    addButton.addEventListener('click', () => addBattleSecondaryObjective(side, select.value));
  }
  container.querySelectorAll('.battle-secondary-remove-btn').forEach(button => {
    button.addEventListener('click', () => removeBattleSecondaryObjective(button.dataset.side, button.dataset.objectiveId));
  });
  container.querySelectorAll('.battle-secondary-score-btn').forEach(button => {
    button.addEventListener('click', () => {
      const sideValue = button.dataset.side;
      const objectiveId = button.dataset.objectiveId;
      const selectEl = container.querySelector(`.battle-secondary-score-select[data-side="${sideValue}"][data-objective-id="${objectiveId}"]`);
      scoreBattleSecondaryObjective(
        sideValue,
        objectiveId,
        Number(selectEl?.value || 0)
      );
    });
  });
}

function toggleBattleSecondaryPanel(side) {
  const sideState = battleSecondaryStateForSide(side);
  sideState.isExpanded = sideState.isExpanded !== true;
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function addBattleSecondaryObjective(side, objectiveId) {
  if (battleHasEnded() || !objectiveId) return;
  const objective = battleSecondaryObjectiveLookup(side, objectiveId);
  if (!objective) return;
  const sideState = battleSecondaryStateForSide(side);
  if (sideState.selectedObjectiveIds.includes(objectiveId)) return;
  pushBattleUndoSnapshot();
  sideState.selectedObjectiveIds.push(objectiveId);
  ensureBattleTotals();
  addBattleLogEntry('secondary', `${battleSideLabel(side)} selected ${objective.name}.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function removeBattleSecondaryObjective(side, objectiveId) {
  if (battleHasEnded() || !objectiveId) return;
  const objective = battleSecondaryObjectiveLookup(side, objectiveId);
  const sideState = battleSecondaryStateForSide(side);
  if (!sideState.selectedObjectiveIds.includes(objectiveId)) return;
  pushBattleUndoSnapshot();
  sideState.selectedObjectiveIds = sideState.selectedObjectiveIds.filter(id => id !== objectiveId);
  ensureBattleTotals();
  addBattleLogEntry('secondary', `${battleSideLabel(side)} removed ${objective?.name || 'a secondary objective'} from active tracking.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function scoreBattleSecondaryObjective(side, objectiveId, optionIndex) {
  if (!battleLiveEditingEnabled() || !objectiveId) return;
  const objective = battleSecondaryObjectiveLookup(side, objectiveId);
  const option = objective?.scoringOptions?.[optionIndex];
  if (!objective || !option) return;
  pushBattleUndoSnapshot();
  battleSecondaryStateForSide(side).entries.unshift({
    id: createId('secondary-score'),
    objectiveId,
    label: option.label,
    vp: Math.max(0, Number(option.vp || 0)),
    round: activeBattle.round || 1,
    player: activeBattle.currentPlayer,
    phase: activeBattle.currentPhase || 'Command',
    createdAt: new Date().toISOString(),
  });
  ensureBattleTotals();
  addBattleLogEntry('secondary', `${battleSideLabel(side)} scored ${option.vp}VP for ${objective.name}: ${option.label}.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function battleSideLabel(side) {
  return side === 'opponent' ? 'Opponent' : 'You';
}

function battleUnitProfile(entry) {
  const factionData = linkedBattleFactionData();
  return factionData?.units?.[entry.unitName] || null;
}

function battleUnitWoundBuckets(entry) {
  if (!entry) return [];
  if (linkedArmyListForBattle()?.factionSlug === 'astra-militarum') {
    const modelCount = Number(entry.models || 0);
    const trustedBuckets = ASTRA_MILITARUM_MIXED_WOUND_BUCKETS[entry.unitName]?.[modelCount];
    if (trustedBuckets) return trustedBuckets.map(bucket => ({ ...bucket }));
  }

  const profile = battleUnitProfile(entry);
  const woundsPerModel = parseStatNumber(profile?.stats?.wounds);
  if (!woundsPerModel) return [];
  return [{ label: entry.unitName, count: Math.max(1, Number(entry.models || 1)), wounds: woundsPerModel }];
}

function battleUnitWoundInfo(entry) {
  const buckets = battleUnitWoundBuckets(entry);
  if (!buckets.length) return null;
  const modelCount = buckets.reduce((sum, bucket) => sum + bucket.count, 0);
  const totalWounds = buckets.reduce((sum, bucket) => sum + (bucket.count * bucket.wounds), 0);
  const damageTaken = Math.max(0, Math.min(totalWounds, Number(activeBattle.unitDamage?.[entry.id] || 0)));
  const woundsRemaining = Math.max(0, totalWounds - damageTaken);

  let remainingDamage = damageTaken;
  let destroyedModels = 0;
  let modelsRemaining = modelCount;
  let currentModelWoundsRemaining = 0;
  let currentModelLabel = '';
  let currentModelMaxWounds = 0;
  const bucketStates = [];

  buckets.forEach(bucket => {
    const bucketTotal = bucket.count * bucket.wounds;
    const bucketDamage = Math.max(0, Math.min(bucketTotal, remainingDamage));
    remainingDamage -= bucketDamage;

    const bucketDestroyed = Math.min(bucket.count, Math.floor(bucketDamage / bucket.wounds));
    const bucketModelsRemaining = bucketDamage >= bucketTotal ? 0 : bucket.count - bucketDestroyed;
    const partialDamage = bucketDamage >= bucketTotal ? 0 : bucketDamage % bucket.wounds;
    const partialWoundsRemaining = bucketModelsRemaining > 0
      ? (partialDamage === 0 ? bucket.wounds : bucket.wounds - partialDamage)
      : 0;

    destroyedModels += bucketDestroyed;
    modelsRemaining -= bucketDestroyed;
    if (!currentModelLabel && bucketModelsRemaining > 0) {
      currentModelLabel = bucket.label;
      currentModelWoundsRemaining = partialWoundsRemaining;
      currentModelMaxWounds = bucket.wounds;
    }

    bucketStates.push({
      ...bucket,
      destroyed: bucketDestroyed,
      remaining: bucketModelsRemaining,
      currentModelWoundsRemaining: partialWoundsRemaining,
    });
  });

  return {
    buckets,
    bucketStates,
    modelCount,
    totalWounds,
    damageTaken,
    woundsRemaining,
    destroyedModels,
    modelsRemaining,
    currentModelWoundsRemaining,
    currentModelLabel,
    currentModelMaxWounds,
  };
}

function battleUnitWoundSummary(entry) {
  const info = battleUnitWoundInfo(entry);
  if (!info) return 'Wound tracker unavailable; linked datasheet wounds are not loaded yet.';
  if (info.woundsRemaining <= 0) return `${formatRosterUnitTitle(entry, linkedBattleUnits().indexOf(entry))} has taken ${info.damageTaken} damage and has 0 wounds remaining. Unit destroyed.`;
  if (info.modelCount === 1) return `${formatRosterUnitTitle(entry, linkedBattleUnits().indexOf(entry))} has taken ${info.damageTaken} damage and has ${info.woundsRemaining} wound${info.woundsRemaining === 1 ? '' : 's'} remaining.`;
  if (info.buckets.length > 1) {
    const bucketText = info.bucketStates
      .map(bucket => {
        if (bucket.remaining <= 0) return `${bucket.label}: destroyed`;
        if (bucket.currentModelWoundsRemaining && bucket.currentModelWoundsRemaining < bucket.wounds) {
          return `${bucket.label}: ${bucket.remaining} remaining, front model ${bucket.currentModelWoundsRemaining}/${bucket.wounds}W`;
        }
        return `${bucket.label}: ${bucket.remaining} remaining`;
      })
      .join('; ');
    return `${formatRosterUnitTitle(entry, linkedBattleUnits().indexOf(entry))} has taken ${info.damageTaken} damage. ${bucketText}.`;
  }
  const destroyedText = `${info.destroyedModels} model${info.destroyedModels === 1 ? '' : 's'} destroyed`;
  const remainingText = `${info.modelsRemaining} model${info.modelsRemaining === 1 ? '' : 's'} remaining`;
  return `${formatRosterUnitTitle(entry, linkedBattleUnits().indexOf(entry))} has taken ${info.damageTaken} damage. ${destroyedText}, ${remainingText}; current model has ${info.currentModelWoundsRemaining}/${info.currentModelMaxWounds} wounds remaining.`;
}

function battleOneUseItems(entry) {
  const unit = battleUnitProfile(entry);
  if (!unit) return [];
  const datasheetLink = unit?.source?.datasheet || '';
  const items = [];
  const seen = new Set();
  const datasheetAbilityEntries = unitAbilityDatabase?.byDatasheet?.[datasheetLink] || {};
  const isLimitedUseText = text => /once per battle|the first time .* is destroyed|first time .* is destroyed/i.test(String(text || ''));
  const addItem = item => {
    if (!item?.id || seen.has(item.id)) return;
    seen.add(item.id);
    items.push(item);
  };

  const unitAbilities = new Set();
  const noteAbilities = String(unit?.note || '').split(/\s*,\s*/).filter(Boolean);
  noteAbilities.forEach(name => unitAbilities.add(name));
  if (Array.isArray(unit?.abilities)) unit.abilities.filter(Boolean).forEach(name => unitAbilities.add(name));
  Object.entries(datasheetAbilityEntries).forEach(([name, text]) => {
    if (isLimitedUseText(text)) unitAbilities.add(name);
  });

  unitAbilities.forEach(name => {
    if (normalizeAbilityKey(name) === 'one shot') return;
    const text = getTooltipText(name, { kind: 'unit', datasheetLink });
    if (isLimitedUseText(text)) {
      addItem({
        id: `ability:${normalizeAbilityKey(name)}`,
        label: name,
        maxUses: 1,
        type: 'ability',
      });
    }
  });

  const quantities = entry.weaponQuantities || {};
  Object.entries(quantities).forEach(([weaponKey, quantity]) => {
    const count = Math.max(0, Number(quantity || 0));
    if (!count) return;
    const matchingProfiles = Object.entries(unit.weapons || {}).filter(([profileName]) => normalizeWeaponProfileKey(profileName) === weaponKey);
    const hasOneShot = matchingProfiles.some(([, profile]) =>
      (profile?.abilities || []).some(ability => normalizeAbilityKey(ability) === 'one shot')
    );
    const oneUseWeaponAbility = matchingProfiles.some(([, profile]) =>
      (profile?.abilities || []).some(ability => isLimitedUseText(getTooltipText(ability, { kind: 'weapon', datasheetLink })))
    );
    if (hasOneShot || oneUseWeaponAbility) {
      addItem({
        id: `weapon:${weaponKey}`,
        label: rosterWargearLabel(weaponKey, unit),
        maxUses: count,
        type: 'weapon',
      });
    }
  });

  return items;
}

function oneUseStateKey(unitId, itemId) {
  return `${unitId}::${itemId}`;
}

function pushBattleUndoSnapshot() {
  battleUndoStack.push(structuredClone(normalizeBattleRecord(activeBattle)));
  if (battleUndoStack.length > 20) battleUndoStack.shift();
}

function updateBattleUndoButton() {
  battleUndoBtn.disabled = battleUndoStack.length === 0 || !battleLiveEditingEnabled();
}

function addBattleLogEntry(type, text) {
  if (!Array.isArray(activeBattle.log)) activeBattle.log = [];
  activeBattle.log.unshift({
    id: createId('battle-log'),
    type,
    text,
    round: activeBattle.round,
    player: activeBattle.currentPlayer,
    phase: activeBattle.currentPhase,
    createdAt: new Date().toISOString()
  });
  activeBattle.updatedAt = new Date().toISOString();
}

function renderBattleLog() {
  const entries = Array.isArray(activeBattle.log) ? activeBattle.log : [];
  if (!entries.length) {
    battleLogEmpty.hidden = false;
    battleLogList.hidden = true;
    battleLogList.innerHTML = '';
    return;
  }
  battleLogEmpty.hidden = true;
  battleLogList.hidden = false;
  battleLogList.innerHTML = entries.map(entry => {
    const prefix = `Round ${escapeHtml(entry.round)}, ${escapeHtml(battleSideLabel(entry.player))}, ${escapeHtml(entry.phase)}`;
    return `<div style="margin-bottom:10px;"><strong>${prefix}</strong><br />${escapeHtml(entry.text)}</div>`;
  }).join('');
}

function renderBattleUnitStates() {
  syncBattleUnitStates();
  const linkedUnits = linkedBattleUnits();
  if (!linkedUnits.length) {
    battleUnitStateSummary.textContent = 'Link an army list in Battle Setup to track unit states.';
    battleUnitStateList.innerHTML = '<div class="army-empty">No linked roster units available for state tracking.</div>';
    return;
  }

  if (!linkedBattleFactionData()) {
    battleUnitStateSummary.textContent = 'Loading linked roster datasheets for wound tracking...';
    battleUnitStateList.innerHTML = '<div class="army-empty">Fetching the linked faction datasheets for battle-state tools.</div>';
    ensureBattleFactionDataLoaded().then(() => renderBattleDashboard());
    return;
  }

  const counts = linkedUnits.reduce((acc, entry) => {
    const status = activeBattle.unitStates?.[entry.id] || 'ready';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, { ready: 0, reserves: 0, battleshocked: 0, destroyed: 0 });

  battleUnitStateSummary.textContent = battleHasStarted()
    ? `Ready ${counts.ready || 0} - Reserves ${counts.reserves || 0} - Battle-shocked ${counts.battleshocked || 0} - Destroyed ${counts.destroyed || 0}`
    : `Ready ${counts.ready || 0} - Reserves ${counts.reserves || 0}`;
  battleUnitStateList.innerHTML = linkedUnits.map((entry, index) => {
    const status = activeBattle.unitStates?.[entry.id] || 'ready';
    const woundInfo = battleUnitWoundInfo(entry);
    const oneUseItems = battleHasStarted() ? battleOneUseItems(entry) : [];
    const liveEditing = battleLiveEditingEnabled();
    const phaseAction = currentBattleUnitAction();
    const phaseActionUsed = phaseAction ? hasBattlePhaseActionBeenUsed(entry.id, phaseAction) : false;
    const woundSelect = battleHasStarted() && woundInfo
      ? `
        <label class="wargear-line" style="margin-top:8px;">
          <span>Wounds remaining</span>
          <select class="battle-unit-wounds-select" data-unit-id="${escapeHtml(entry.id)}" ${liveEditing ? '' : 'disabled'}>
            ${Array.from({ length: woundInfo.totalWounds + 1 }, (_, offset) => {
              const remaining = woundInfo.totalWounds - offset;
              const selected = remaining === woundInfo.woundsRemaining ? ' selected' : '';
              return `<option value="${remaining}"${selected}>${remaining}</option>`;
            }).join('')}
          </select>
        </label>
      `
      : (battleHasStarted() ? '<div class="small">Wound tracker unavailable; datasheet wounds could not be resolved.</div>' : '');
    const oneUseControls = oneUseItems.length
      ? `
        <div class="checks" style="margin-top:8px;">
          ${oneUseItems.map(item => {
            const key = oneUseStateKey(entry.id, item.id);
            const remaining = Math.max(0, Math.min(item.maxUses, Number(activeBattle.oneUseStatus?.[key] ?? item.maxUses)));
            const expended = remaining === 0;
            return `
              <label class="checkline">
                <input type="checkbox" class="battle-one-use-checkbox" data-unit-id="${escapeHtml(entry.id)}" data-item-id="${escapeHtml(item.id)}" data-item-label="${escapeHtml(item.label)}" data-max-uses="${item.maxUses}" ${expended ? 'checked' : ''} ${liveEditing ? '' : 'disabled'} />
                ${escapeHtml(item.label)} <span class="muted">(${item.type === 'weapon' ? 'Weapon' : 'Ability'}${item.maxUses > 1 ? `, ${remaining}/${item.maxUses} remaining` : ''})</span>
              </label>
            `;
          }).join('')}
        </div>
      `
      : '';
    const stateButtons = battleHasStarted()
      ? `
          <button type="button" class="secondary battle-unit-state-btn" data-unit-id="${escapeHtml(entry.id)}" data-state="ready" ${liveEditing ? '' : 'disabled'}>Ready</button>
          <button type="button" class="secondary battle-unit-state-btn" data-unit-id="${escapeHtml(entry.id)}" data-state="reserves" ${liveEditing ? '' : 'disabled'}>Reserves</button>
          <button type="button" class="secondary battle-unit-state-btn" data-unit-id="${escapeHtml(entry.id)}" data-state="battleshocked" ${liveEditing ? '' : 'disabled'}>Battle-shocked</button>
          <button type="button" class="secondary battle-unit-state-btn" data-unit-id="${escapeHtml(entry.id)}" data-state="destroyed" ${liveEditing ? '' : 'disabled'}>Destroyed</button>
        `
      : `
          <button type="button" class="secondary battle-unit-state-btn" data-unit-id="${escapeHtml(entry.id)}" data-state="ready">Ready</button>
          <button type="button" class="secondary battle-unit-state-btn" data-unit-id="${escapeHtml(entry.id)}" data-state="reserves">Reserves</button>
        `;
    const phaseActionControls = phaseAction
      ? `
        <div class="army-unit-actions">
          <button
            type="button"
            class="secondary battle-unit-phase-action-btn"
            data-unit-id="${escapeHtml(entry.id)}"
            data-action="${escapeHtml(phaseAction)}"
            ${(liveEditing && !phaseActionUsed) ? '' : 'disabled'}
          >${escapeHtml(battlePhaseActionLabel(phaseAction))}</button>
        </div>
      `
      : '';
    return `
      <div class="army-unit-row">
        <strong>${escapeHtml(formatRosterUnitTitle(entry, index))}</strong>
        <div class="small">Current state: ${escapeHtml(battleUnitStatusLabel(status))}</div>
        ${battleHasStarted() ? `<div class="small">${escapeHtml(battleUnitWoundSummary(entry))}</div>` : ''}
        ${woundSelect}
        ${oneUseControls}
        <div class="army-unit-actions">
          ${stateButtons}
        </div>
        ${phaseActionControls}
      </div>
    `;
  }).join('');

  battleUnitStateList.querySelectorAll('.battle-unit-state-btn').forEach(button => {
    const unitId = button.dataset.unitId;
    const state = button.dataset.state;
    button.disabled = button.disabled || (activeBattle.unitStates?.[unitId] || 'ready') === state;
    button.addEventListener('click', () => setBattleUnitState(unitId, state));
  });
  battleUnitStateList.querySelectorAll('.battle-unit-phase-action-btn').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'shoot' || action === 'fight') {
        beginBattleAttackContext(button.dataset.unitId, action);
        return;
      }
      setBattlePhaseActionUsed(button.dataset.unitId, action);
    });
  });
  battleUnitStateList.querySelectorAll('.battle-unit-wounds-select').forEach(select => {
    select.addEventListener('change', () => setBattleUnitWoundsRemaining(select.dataset.unitId, select.value));
  });
  battleUnitStateList.querySelectorAll('.battle-one-use-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => setBattleOneUseRemaining(
      checkbox.dataset.unitId,
      checkbox.dataset.itemId,
      checkbox.dataset.itemLabel,
      Number(checkbox.dataset.maxUses || 0),
      checkbox.checked ? 0 : Number(checkbox.dataset.maxUses || 0)
    ));
  });
}

function renderBattleDashboard() {
  pruneBattleSecondaryObjectivesForCurrentRoles();
  ensureBattleTotals();
  updateBattleLiveControls();
  battleRoundBig.textContent = String(activeBattle.round || 1);
  battleCurrentPlayerBig.textContent = battleSideLabel(activeBattle.currentPlayer);
  battleCurrentPhaseBig.textContent = activeBattle.currentPhase || 'Command';
  battleYouCpBig.textContent = String(activeBattle.players?.you?.cp || 0);
  battleOpponentCpBig.textContent = String(activeBattle.players?.opponent?.cp || 0);
  battleYouPrimaryBig.textContent = String(activeBattle.players?.you?.primaryVp || 0);
  battleOpponentPrimaryBig.textContent = String(activeBattle.players?.opponent?.primaryVp || 0);
  battleYouSecondaryBig.textContent = String(activeBattle.players?.you?.secondaryVp || 0);
  battleOpponentSecondaryBig.textContent = String(activeBattle.players?.opponent?.secondaryVp || 0);
  battleYouTotalBig.textContent = String(activeBattle.players?.you?.totalVp || 0);
  battleOpponentTotalBig.textContent = String(activeBattle.players?.opponent?.totalVp || 0);
  renderBattleSecondaryObjectives();
  renderBattleStratagems();
  renderBattleLog();
  renderBattleUnitStates();
  renderBattlePanelVisibility();
  updateBattleUndoButton();
}

function renderBattlePersistenceNote() {
  const savedRecord = battles.find(battle => battle.id === activeBattle.id);
  const parts = ['Active battle draft autosaves locally.'];
  if (battleHasEnded()) parts.push('Battle is locked for review.');
  if (savedRecord) {
    parts.push(`Named save synced ${battleSavedTimestampLabel(savedRecord.updatedAt)}.`);
  } else {
    parts.push('This draft is not in the saved battles list yet.');
  }
  battlePersistenceNote.textContent = parts.join(' ');
}

function renderBattleSetup() {
  activeBattle = normalizeBattleRecord(activeBattle);
  battleNameInput.value = activeBattle.name || 'New Engagement';
  battleArmyListSelect.value = activeBattle.yourArmyListId || '';
  battleYourFactionSelect.value = activeBattle.yourFactionSlug || 'astra-militarum';
  battleOpponentFactionSelect.value = activeBattle.opponentFactionSlug || 'astra-militarum';
  battleMissionNameInput.value = activeBattle.missionName || '';
  battleDeploymentInput.value = activeBattle.deployment || '';
  battleMissionRuleInput.value = activeBattle.missionRule || '';
  battleYourRoleSelect.value = activeBattle.yourBattleRole === 'defender' ? 'defender' : 'attacker';
  battleFirstTurnSelect.value = activeBattle.firstTurn === 'opponent' ? 'opponent' : 'you';
  battleYourStartingCpInput.value = String(Math.max(0, Number(activeBattle.players?.you?.cp || 0)));
  battleOpponentStartingCpInput.value = String(Math.max(0, Number(activeBattle.players?.opponent?.cp || 0)));
  populateBattleArmyListOptions();
  populateSavedBattleOptions();
  hideBattleEndConfirmation();
  renderBattlePersistenceNote();
  updateBattleLiveControls();
  renderBattleDashboard();
}

function setBattleStatus(message) {
  battleSetupStatus.textContent = message;
}

function saveActiveBattle() {
  syncBattleDraftFromForm();
  syncActiveBattlePersistence({ updateSaved: true });
  renderBattlePersistenceNote();
  setBattleStatus(`Saved battle: ${activeBattle.name}.`);
}

function loadBattle(battleId) {
  const record = battles.find(battle => battle.id === battleId);
  if (!record) return;
  clearBattleAttackContext({ persist: false, renderCalculator: false });
  activeBattle = normalizeBattleRecord(record);
  battleUndoStack = [];
  persistBattleDraft();
  renderBattleSetup();
  setBattleStatus(`Loaded battle: ${activeBattle.name}.`);
}

function deleteBattle(battleId) {
  if (!battleId) return;
  const record = battles.find(battle => battle.id === battleId);
  if (!record) return;
  battles = battles.filter(battle => battle.id !== battleId);
  persistBattles();
  if (activeBattle.id === battleId) {
    activeBattle = createEmptyBattle();
    battleUndoStack = [];
    persistBattleDraft();
    renderBattleSetup();
  } else {
    populateSavedBattleOptions();
    renderBattlePersistenceNote();
    renderBattleDashboard();
  }
  setBattleStatus(`Deleted battle: ${record.name}.`);
}

function startBattleTracking() {
  if (battleHasEnded()) {
    setBattleStatus('Battle already ended.');
    return;
  }
  if (battleHasStarted()) {
    setBattleStatus('Battle already started.');
    return;
  }
  pushBattleUndoSnapshot();
  syncBattleDraftFromForm();
  clearBattleAttackContext({ persist: false, renderCalculator: false });
  const startedAt = new Date().toISOString();
  const reserveUnits = reserveUnitsAtBattleStart();
  const linkedList = linkedArmyListForBattle();
  activeBattle.isStarted = true;
  activeBattle.startedAt = startedAt;
  activeBattle.round = 1;
  activeBattle.currentPlayer = activeBattle.firstTurn;
  activeBattle.currentPhase = 'Command';
  if (!Array.isArray(activeBattle.log)) activeBattle.log = [];
  addBattleLogEntry(
    'setup',
    `${activeBattle.name} started. You are the ${battleRoleLabel(activeBattle.yourBattleRole)} and your opponent is the ${battleRoleLabel(opposingBattleRole(activeBattle.yourBattleRole))}. ${battleSideLabel(activeBattle.firstTurn)} has the first turn. Starting CP: You ${activeBattle.players?.you?.cp || 0}, Opponent ${activeBattle.players?.opponent?.cp || 0}.${linkedList ? ` Linked roster: ${linkedList.name}.` : ''} ${reserveUnits.length} unit${reserveUnits.length === 1 ? '' : 's'} in Reserves.`
  );
  syncActiveBattlePersistence();
  renderBattleDashboard();
  setBattleStatus('Battle started.');
}

function promptEndBattle() {
  if (!battleLiveEditingEnabled()) return;
  battleEndConfirmRow.hidden = false;
  setBattleStatus('Confirm ending the battle.');
}

function cancelEndBattle() {
  hideBattleEndConfirmation();
  setBattleStatus(battleHasEnded() ? 'Battle ended. Review mode active.' : 'Battle in progress.');
}

function endBattleTracking() {
  if (!battleLiveEditingEnabled()) return;
  pushBattleUndoSnapshot();
  clearBattleAttackContext({ persist: false, renderCalculator: false });
  activeBattle.isEnded = true;
  activeBattle.endedAt = new Date().toISOString();
  addBattleLogEntry('end', `${activeBattle.name} ended.`);
  hideBattleEndConfirmation();
  syncActiveBattlePersistence();
  renderBattleDashboard();
  setBattleStatus('Battle ended. Review mode active.');
}

function moveBattlePhase(direction) {
  if (!battleLiveEditingEnabled()) return;
  const index = BATTLE_PHASES.indexOf(activeBattle.currentPhase || 'Command');
  const currentIndex = index >= 0 ? index : 0;
  const nextIndex = Math.max(0, Math.min(BATTLE_PHASES.length - 1, currentIndex + direction));
  if (nextIndex === currentIndex) return;
  pushBattleUndoSnapshot();
  activeBattle.currentPhase = BATTLE_PHASES[nextIndex];
  addBattleLogEntry('phase', `${battleSideLabel(activeBattle.currentPlayer)} moved to the ${activeBattle.currentPhase} phase.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function endBattleTurn() {
  if (!battleLiveEditingEnabled()) return;
  pushBattleUndoSnapshot();
  activeBattle.currentPlayer = activeBattle.currentPlayer === 'opponent' ? 'you' : 'opponent';
  activeBattle.currentPhase = 'Command';
  addBattleLogEntry('turn', `${battleSideLabel(activeBattle.currentPlayer)} began their turn.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function nextBattleRound() {
  if (!battleLiveEditingEnabled()) return;
  pushBattleUndoSnapshot();
  activeBattle.round = Math.max(1, Number(activeBattle.round || 1) + 1);
  activeBattle.currentPlayer = activeBattle.firstTurn;
  activeBattle.currentPhase = 'Command';
  addBattleLogEntry('round', `Battle Round ${activeBattle.round} began.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function adjustBattleStat(side, stat, amount) {
  if (!battleLiveEditingEnabled()) return;
  const player = activeBattle.players?.[side];
  if (!player) return;
  const delta = Number(amount || 0);
  if (!Number.isFinite(delta)) return;
  pushBattleUndoSnapshot();
  player[stat] = Math.max(0, Number(player[stat] || 0) + delta);
  ensureBattleTotals();
  const statLabel = stat === 'cp' ? 'CP' : stat === 'primaryVp' ? 'Primary VP' : 'Secondary VP';
  const verb = delta >= 0 ? 'gained' : 'lost';
  const value = Math.abs(delta);
  addBattleLogEntry('score', `${battleSideLabel(side)} ${verb} ${value} ${statLabel}.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function adjustBattleCustomStat(side, stat, inputId, direction = 1) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const rawValue = Number(input.value || 0);
  if (!Number.isFinite(rawValue) || rawValue <= 0) return;
  adjustBattleStat(side, stat, rawValue * (Number(direction || 1) < 0 ? -1 : 1));
  input.value = '';
}

function setBattleUnitState(unitId, nextState) {
  const linkedUnits = linkedBattleUnits();
  const entry = linkedUnits.find(unit => unit.id === unitId);
  if (!entry) return;
  const allowedStates = battleHasStarted()
    ? ['ready', 'reserves', 'battleshocked', 'destroyed']
    : ['ready', 'reserves'];
  const normalizedState = allowedStates.includes(nextState) ? nextState : 'ready';
  const currentState = activeBattle.unitStates?.[unitId] || 'ready';
  if (currentState === normalizedState) return;
  pushBattleUndoSnapshot();
  activeBattle.unitStates[unitId] = normalizedState;
  if (battleHasStarted()) {
    addBattleLogEntry('unit-state', `${formatRosterUnitTitle(entry, linkedUnits.indexOf(entry))} marked ${battleUnitStatusLabel(normalizedState)}.`);
  }
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function setBattlePhaseActionUsed(unitId, action) {
  if (!battleLiveEditingEnabled()) return;
  const linkedUnits = linkedBattleUnits();
  const entry = linkedUnits.find(unit => unit.id === unitId);
  const currentAction = currentBattleUnitAction();
  if (!entry || !action || action !== currentAction) return;
  const key = battlePhaseActionKey(unitId, action);
  if (activeBattle.phaseActions?.[key]) return;
  pushBattleUndoSnapshot();
  activeBattle.phaseActions[key] = true;
  addBattleLogEntry('phase-action', `${formatRosterUnitTitle(entry, linkedUnits.indexOf(entry))} ${battlePhaseActionPastTense(action)}.`);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function setBattleUnitWoundsRemaining(unitId, remainingValue) {
  if (!battleLiveEditingEnabled()) return;
  const linkedUnits = linkedBattleUnits();
  const entry = linkedUnits.find(unit => unit.id === unitId);
  const info = entry ? battleUnitWoundInfo(entry) : null;
  if (!entry || !info) return;
  const woundsRemaining = Math.max(0, Math.min(info.totalWounds, Number(remainingValue || info.totalWounds)));
  const damageTaken = info.totalWounds - woundsRemaining;
  if (damageTaken === info.damageTaken) return;
  pushBattleUndoSnapshot();
  activeBattle.unitDamage[unitId] = damageTaken;
  if (woundsRemaining <= 0) {
    activeBattle.unitStates[unitId] = 'destroyed';
  } else if ((activeBattle.unitStates?.[unitId] || 'ready') === 'destroyed') {
    activeBattle.unitStates[unitId] = 'ready';
  }
  addBattleLogEntry('wounds', battleUnitWoundSummary(entry));
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function setBattleOneUseRemaining(unitId, itemId, itemLabel, maxUses, remainingValue) {
  if (!battleLiveEditingEnabled()) return;
  const linkedUnits = linkedBattleUnits();
  const entry = linkedUnits.find(unit => unit.id === unitId);
  if (!entry) return;
  const key = oneUseStateKey(unitId, itemId);
  const clampedRemaining = Math.max(0, Math.min(Number(maxUses || 0), Number(remainingValue || 0)));
  const previousRemaining = Math.max(0, Math.min(Number(maxUses || 0), Number(activeBattle.oneUseStatus?.[key] ?? maxUses)));
  if (clampedRemaining === previousRemaining) return;
  pushBattleUndoSnapshot();
  activeBattle.oneUseStatus[key] = clampedRemaining;
  const used = Math.max(0, Number(maxUses || 0) - clampedRemaining);
  const previousUsed = Math.max(0, Number(maxUses || 0) - previousRemaining);
  const delta = used - previousUsed;
  const actionText = delta > 0
    ? `${formatRosterUnitTitle(entry, linkedBattleUnits().indexOf(entry))} expended ${delta} use${delta === 1 ? '' : 's'} of ${itemLabel}. ${clampedRemaining} remaining.`
    : `${formatRosterUnitTitle(entry, linkedBattleUnits().indexOf(entry))} restored ${Math.abs(delta)} use${Math.abs(delta) === 1 ? '' : 's'} of ${itemLabel}. ${clampedRemaining} remaining.`;
  addBattleLogEntry('one-use', actionText);
  syncActiveBattlePersistence();
  renderBattleDashboard();
}

function undoBattleAction() {
  const snapshot = battleUndoStack.pop();
  if (!snapshot) return;
  activeBattle = normalizeBattleRecord(snapshot);
  syncActiveBattlePersistence();
  renderBattleSetup();
  setBattleStatus('Reverted the last live battle action.');
}


