// App bootstrap: initialize persisted state and wire UI event handlers.
let armyLists = loadArmyLists();
let battles = loadBattles();
let activeBuilderList = createEmptyArmyList();
let activeBattle = loadBattleDraft() || createEmptyBattle();
let battleUndoStack = [];
let builderData = structuredClone(defaultData);
let currentBuilderFactionSlug = 'astra-militarum';
let editingBuilderUnitId = null;
let activeCombatList = null;

const factionManifest = Array.isArray(window.WH40K_FACTION_MANIFEST) && window.WH40K_FACTION_MANIFEST.length
  ? window.WH40K_FACTION_MANIFEST
  : [{ slug: 'astra-militarum', name: 'Astra Militarum', script: '' }];
const pointsDatabase = window.WH40K_POINTS_DATABASE || { source: {}, byFaction: {} };
const unitCompositionDatabase = window.WH40K_UNIT_COMPOSITION_DATABASE || { source: {}, byFaction: {} };
const wargearDatabase = window.WH40K_WARGEAR_DATABASE || { source: {}, byFaction: {} };

document.getElementById('openArmyBuilderBtn').addEventListener('click', () => showView('builder'));
document.getElementById('openCalculatorBtn').addEventListener('click', () => {
  clearBattleAttackContext();
  showView('calculator');
});
document.getElementById('openBattleTrackerBtn').addEventListener('click', () => showView('battle-tracker'));
document.getElementById('openRulebookBtn').addEventListener('click', () => showView('rulebook-editions'));
document.getElementById('rulebookEditionBackBtn').addEventListener('click', () => showView('landing'));
document.getElementById('openRulebook10thBtn').addEventListener('click', () => showView('rulebook'));
document.getElementById('rulebookEditionSelectBtn').addEventListener('click', () => showView('rulebook-editions'));
document.getElementById('battleTrackerStratagemsBtn').addEventListener('click', () => showView('battle-stratagems'));
document.getElementById('battleStratagemsBackBtn').addEventListener('click', () => showView('battle-tracker'));

function navigateToModuleView(viewName) {
  if (viewName === 'calculator' || viewName === 'battle-tracker') {
    clearBattleAttackContext();
  }
  showView(viewName);
}

Array.from(document.querySelectorAll('.module-nav-select')).forEach(select => {
  select.addEventListener('change', event => {
    const targetView = String(event.target.value || '');
    if (!targetView) return;
    navigateToModuleView(targetView);
  });
});

calculatorCancelBattleAttackBtn.addEventListener('click', cancelBattleAttackContext);
calculatorRecordBattleWeaponBtn.addEventListener('click', recordBattleAttackWeapon);
calculatorBattleNewTargetBtn.addEventListener('click', addBattleAttackTargetGroup);
calculatorApplyBattleAttackBtn.addEventListener('click', applyBattleAttackResolution);
calculatorClearBattleDamageBtn.addEventListener('click', () => {
  calculatorResolvedDamageInput.value = '';
  updateBattleAttackApplyState();
});

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
  const eventName = el.tagName === 'SELECT' ? 'change' : 'input';
  el.addEventListener(eventName, syncBattleDraftFromForm);
  if (eventName !== 'change') el.addEventListener('change', syncBattleDraftFromForm);
});

document.getElementById('battleStartBtn').addEventListener('click', startBattleTracking);
battleEndBattleBtn.addEventListener('click', promptEndBattle);
battleEndBattleYesBtn.addEventListener('click', endBattleTracking);
battleEndBattleNoBtn.addEventListener('click', cancelEndBattle);
document.getElementById('battleSaveBtn').addEventListener('click', saveActiveBattle);
document.getElementById('battleLoadBtn').addEventListener('click', () => loadBattle(savedBattleSelect.value));
document.getElementById('battleDeleteBtn').addEventListener('click', () => deleteBattle(savedBattleSelect.value));
battleStratagemSearchInput.addEventListener('input', renderBattleStratagems);
rulebookSearchInput.addEventListener('input', renderRulebookEntries);
rulebookTopicSelect.addEventListener('change', renderRulebookEntries);
rulebookImportBtn.addEventListener('click', importRulebookFile);
rulebookClearImportBtn.addEventListener('click', clearImportedRulebook);
document.getElementById('battleNewBtn').addEventListener('click', () => {
  clearBattleAttackContext({ persist: false, renderCalculator: false });
  activeBattle = createEmptyBattle();
  battleUndoStack = [];
  persistBattleDraft();
  renderBattleSetup();
  setBattleStatus('New battle draft ready.');
});
battleUndoBtn.addEventListener('click', undoBattleAction);
document.getElementById('battlePrevPhaseBtn').addEventListener('click', () => moveBattlePhase(-1));
document.getElementById('battleNextPhaseBtn').addEventListener('click', () => moveBattlePhase(1));
document.getElementById('battleEndTurnBtn').addEventListener('click', endBattleTurn);
document.getElementById('battleNextRoundBtn').addEventListener('click', nextBattleRound);
Array.from(document.querySelectorAll('.battle-adjust-btn')).forEach(button => {
  button.addEventListener('click', () => adjustBattleStat(button.dataset.side, button.dataset.stat, button.dataset.amount));
});
Array.from(document.querySelectorAll('.battle-adjust-custom-btn')).forEach(button => {
  button.addEventListener('click', () => adjustBattleCustomStat(
    button.dataset.side,
    button.dataset.stat,
    button.dataset.inputId,
    button.dataset.direction || 1
  ));
});

builderFactionSelect.addEventListener('change', () => {
  clearBuilderUnitEditMode();
  builderSquadName.value = '';
  setBuilderFaction(builderFactionSelect.value, { resetUnits: true });
});
builderDetachmentSelect.addEventListener('change', () => {
  activeBuilderList.detachmentSlug = builderDetachmentSelect.value || detachmentsForFaction(currentBuilderFactionSlug)[0]?.slug || 'core-detachment';
  activeBuilderList.detachmentName = detachmentNameForFaction(currentBuilderFactionSlug, activeBuilderList.detachmentSlug);
  activeBuilderList.updatedAt = new Date().toISOString();
  renderBuilderList();
});
builderDetachmentDetailsToggle.addEventListener('click', () => {
  builderDetachmentDetailsExpanded = !builderDetachmentDetailsExpanded;
  renderBuilderDetachmentDetails();
});
builderListName.addEventListener('input', syncBuilderListDraftName);
builderListName.addEventListener('change', syncBuilderListDraftName);
builderUnitSelect.addEventListener('change', () => {
  clearBuilderUnitEditMode();
  builderSquadName.value = '';
  renderBuilderWeaponOptions({ resetModelCount: true });
});
builderModelCount.addEventListener('input', () => {
  normalizeBuilderModelCount();
  renderBuilderWeaponOptions();
});
builderModelCount.addEventListener('change', () => {
  normalizeBuilderModelCount();
  renderBuilderWeaponOptions();
});
document.getElementById('builderAddUnitBtn').addEventListener('click', addBuilderUnit);
document.getElementById('builderSaveListBtn').addEventListener('click', saveActiveBuilderList);
document.getElementById('builderLoadListBtn').addEventListener('click', () => loadBuilderList(savedArmyListSelect.value));
document.getElementById('builderDeleteListBtn').addEventListener('click', () => deleteBuilderList(savedArmyListSelect.value));
document.getElementById('builderNewListBtn').addEventListener('click', () => {
  activeBuilderList = createEmptyArmyList();
  currentBuilderFactionSlug = activeBuilderList.factionSlug;
  clearBuilderUnitEditMode();
  builderSquadName.value = '';
  setBuilderFaction(currentBuilderFactionSlug, { resetUnits: true });
  populateArmyListSelectors();
});

combatArmyListSelect.addEventListener('change', () => setCombatArmyList(combatArmyListSelect.value));

unitSelect.addEventListener('change', populateWeapons);
weaponSelect.addEventListener('change', () => {
  updateModelsFromSelectedWeapon();
  renderCalculatorBattleMode();
  render();
});
factionSelect.addEventListener('change', () => {
  if (activeCombatList) return;
  setFaction(factionSelect.value);
});
targetFactionSelect.addEventListener('change', () => {
  hideFloatingTooltip();
  if (activeBattleAttackContext()) return;
  setTargetFaction(targetFactionSelect.value);
});
targetUnitSelect.addEventListener('change', () => {
  hideFloatingTooltip();
  const activeGroup = activeBattleAttackTargetGroup();
  if (activeBattleAttackContext() && activeGroup && !activeGroup.recordedWeapons.length) {
    activeGroup.targetUnitName = targetUnitSelect.value || '';
  }
  applyTargetUnit(targetData.units?.[targetUnitSelect.value]);
  renderCalculatorBattleMode();
});

document.getElementById('resetModifiersBtn').addEventListener('click', () => {
  hideFloatingTooltip();
  hitMod.value = 0;
  woundMod.value = 0;
  apMod.value = 0;
  saveMod.value = 0;
  heavyBox.checked = false;
  rapidFireBox.checked = false;
  coverBox.checked = false;
  armorContemptBox.checked = false;
  render();
});

populateFactions();
populateArmyListSelectors();
populateBattleArmyListOptions();
populateSavedBattleOptions();
populateRulebookTopicOptions();
setFaction(currentFactionSlug);
setTargetFaction(currentTargetFactionSlug);
setBuilderFaction(currentBuilderFactionSlug, { resetUnits: false });
renderBattleSetup();
renderRulebookEntries();
loadStoredRulebookImport().then(() => {
  populateRulebookTopicOptions();
  renderRulebookEntries();
}).catch(() => {
  renderRulebookImportStatus('Imported rulebook storage could not be loaded on this device.');
});
showView('landing');
document.addEventListener('click', event => {
  if (!event.target.closest('.tooltip-term') && !event.target.closest('.floating-tooltip')) {
    hideFloatingTooltip();
  }
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.tooltip-term') && !event.target.closest('.floating-tooltip')) {
    hideFloatingTooltip();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') hideFloatingTooltip();
});
window.addEventListener('resize', hideFloatingTooltip);
window.addEventListener('scroll', hideFloatingTooltip, true);


