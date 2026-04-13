// Shared DOM references, constants, and top-level runtime state.
let data = structuredClone(defaultData);
let currentFactionSlug = 'astra-militarum';
let targetData = structuredClone(defaultData);
let currentTargetFactionSlug = 'astra-militarum';

const factionSelect = document.getElementById('factionSelect');
const unitSelect = document.getElementById('unitSelect');
const weaponSelect = document.getElementById('weaponSelect');
const targetFactionSelect = document.getElementById('targetFactionSelect');
const targetUnitSelect = document.getElementById('targetUnitSelect');
const modelsInput = document.getElementById('modelsInput');
const attacksOverride = document.getElementById('attacksOverride');
const hitMod = document.getElementById('hitMod');
const woundMod = document.getElementById('woundMod');
const apMod = document.getElementById('apMod');
const saveMod = document.getElementById('saveMod');
const heavyBox = document.getElementById('heavyBox');
const coverBox = document.getElementById('coverBox');
const armorContemptBox = document.getElementById('armorContemptBox');
const rapidFireBox = document.getElementById('rapidFireBox');
const toughness = document.getElementById('toughness');
const save = document.getElementById('save');
const invuln = document.getElementById('invuln');
const damageReduction = document.getElementById('damageReduction');
const targetModels = document.getElementById('targetModels');
const dataSourceNote = document.getElementById('dataSourceNote');
const unitAbilitiesNote = document.getElementById('unitAbilitiesNote');
const unitKeywordsNote = document.getElementById('unitKeywordsNote');
const targetAbilitiesNote = document.getElementById('targetAbilitiesNote');
const targetKeywordsNote = document.getElementById('targetKeywordsNote');
const landingView = document.getElementById('landingView');
const rulebookEditionView = document.getElementById('rulebookEditionView');
const armyBuilderView = document.getElementById('armyBuilderView');
const calculatorView = document.getElementById('calculatorView');
const battleTrackerView = document.getElementById('battleTrackerView');
const battleStratagemsView = document.getElementById('battleStratagemsView');
const rulebookView = document.getElementById('rulebookView');
const calculatorCancelBattleAttackBtn = document.getElementById('calculatorCancelBattleAttackBtn');
const calculatorBattleModeNote = document.getElementById('calculatorBattleModeNote');
const calculatorBattleTrackerBtn = document.getElementById('calculatorBattleTrackerBtn');
const calculatorBuilderBtn = document.getElementById('calculatorBuilderBtn');
const calculatorBattleResolveRow = document.getElementById('calculatorBattleResolveRow');
const calculatorResolvedDamageInput = document.getElementById('calculatorResolvedDamageInput');
const calculatorRecordBattleWeaponBtn = document.getElementById('calculatorRecordBattleWeaponBtn');
const calculatorApplyBattleAttackBtn = document.getElementById('calculatorApplyBattleAttackBtn');
const calculatorClearBattleDamageBtn = document.getElementById('calculatorClearBattleDamageBtn');
const calculatorBattleResolveNote = document.getElementById('calculatorBattleResolveNote');
const calculatorBattleRecordedWeapons = document.getElementById('calculatorBattleRecordedWeapons');
const calculatorBattleFinalizeRow = document.getElementById('calculatorBattleFinalizeRow');
const calculatorBattleNewTargetBtn = document.getElementById('calculatorBattleNewTargetBtn');
const battleNameInput = document.getElementById('battleNameInput');
const battleYourFactionSelect = document.getElementById('battleYourFactionSelect');
const battleArmyListSelect = document.getElementById('battleArmyListSelect');
const battleOpponentFactionSelect = document.getElementById('battleOpponentFactionSelect');
const battleMissionNameInput = document.getElementById('battleMissionNameInput');
const battleDeploymentInput = document.getElementById('battleDeploymentInput');
const battleMissionRuleInput = document.getElementById('battleMissionRuleInput');
const battleYourRoleSelect = document.getElementById('battleYourRoleSelect');
const battleFirstTurnSelect = document.getElementById('battleFirstTurnSelect');
const battleYourStartingCpInput = document.getElementById('battleYourStartingCpInput');
const battleOpponentStartingCpInput = document.getElementById('battleOpponentStartingCpInput');
const battleSetupStatus = document.getElementById('battleSetupStatus');
const savedBattleSelect = document.getElementById('savedBattleSelect');
const battlePersistenceNote = document.getElementById('battlePersistenceNote');
const battleRoundBig = document.getElementById('battleRoundBig');
const battleCurrentPlayerBig = document.getElementById('battleCurrentPlayerBig');
const battleCurrentPhaseBig = document.getElementById('battleCurrentPhaseBig');
const battleYouCpBig = document.getElementById('battleYouCpBig');
const battleOpponentCpBig = document.getElementById('battleOpponentCpBig');
const battleYouPrimaryBig = document.getElementById('battleYouPrimaryBig');
const battleOpponentPrimaryBig = document.getElementById('battleOpponentPrimaryBig');
const battleYouSecondaryBig = document.getElementById('battleYouSecondaryBig');
const battleOpponentSecondaryBig = document.getElementById('battleOpponentSecondaryBig');
const battleYouTotalBig = document.getElementById('battleYouTotalBig');
const battleOpponentTotalBig = document.getElementById('battleOpponentTotalBig');
const battleSecondaryYouPanel = document.getElementById('battleSecondaryYouPanel');
const battleSecondaryOpponentPanel = document.getElementById('battleSecondaryOpponentPanel');
const battleStratagemSummary = document.getElementById('battleStratagemSummary');
const battleStratagemSearchInput = document.getElementById('battleStratagemSearchInput');
const battleStratagemHistory = document.getElementById('battleStratagemHistory');
const battleStratagemList = document.getElementById('battleStratagemList');
const rulebookSummary = document.getElementById('rulebookSummary');
const rulebookSearchInput = document.getElementById('rulebookSearchInput');
const rulebookTopicSelect = document.getElementById('rulebookTopicSelect');
const rulebookResults = document.getElementById('rulebookResults');
const rulebookImportInput = document.getElementById('rulebookImportInput');
const rulebookImportBtn = document.getElementById('rulebookImportBtn');
const rulebookClearImportBtn = document.getElementById('rulebookClearImportBtn');
const rulebookImportStatus = document.getElementById('rulebookImportStatus');
const battleLogEmpty = document.getElementById('battleLogEmpty');
const battleLogList = document.getElementById('battleLogList');
const battleUnitStateSummary = document.getElementById('battleUnitStateSummary');
const battleUnitStateList = document.getElementById('battleUnitStateList');
const battlePanelButtons = Array.from(document.querySelectorAll('.battle-panel-toggle-btn'));
const battlePanelSections = Array.from(document.querySelectorAll('.battle-panel'));
const battleUndoBtn = document.getElementById('battleUndoBtn');
const battleStartBtn = document.getElementById('battleStartBtn');
const battlePrevPhaseBtn = document.getElementById('battlePrevPhaseBtn');
const battleNextPhaseBtn = document.getElementById('battleNextPhaseBtn');
const battleEndTurnBtn = document.getElementById('battleEndTurnBtn');
const battleNextRoundBtn = document.getElementById('battleNextRoundBtn');
const battleEndBattleBtn = document.getElementById('battleEndBattleBtn');
const battleEndConfirmRow = document.getElementById('battleEndConfirmRow');
const battleEndBattleYesBtn = document.getElementById('battleEndBattleYesBtn');
const battleEndBattleNoBtn = document.getElementById('battleEndBattleNoBtn');
const builderListName = document.getElementById('builderListName');
const builderFactionSelect = document.getElementById('builderFactionSelect');
const builderUnitSelect = document.getElementById('builderUnitSelect');
const builderDetachmentSelect = document.getElementById('builderDetachmentSelect');
const builderModelCount = document.getElementById('builderModelCount');
const builderSquadName = document.getElementById('builderSquadName');
const builderDetachmentDetailsToggle = document.getElementById('builderDetachmentDetailsToggle');
const builderDetachmentDetailsPanel = document.getElementById('builderDetachmentDetailsPanel');
const builderWeaponOptions = document.getElementById('builderWeaponOptions');
const builderUnitsList = document.getElementById('builderUnitsList');
const savedArmyListSelect = document.getElementById('savedArmyListSelect');
const combatArmyListSelect = document.getElementById('combatArmyListSelect');
const builderCompositionNote = document.getElementById('builderCompositionNote');

let builderDetachmentDetailsExpanded = false;

const ARMY_LIST_STORAGE_KEY = 'wh40kArmyLists.v1';
const BATTLE_STORAGE_KEY = 'wh40kBattles.v1';
const BATTLE_DRAFT_STORAGE_KEY = 'wh40kBattleDraft.v1';
const BATTLE_PHASES = ['Command', 'Movement', 'Shooting', 'Charge', 'Fight'];
const ASTRA_MILITARUM_MIXED_WOUND_BUCKETS = {
  'Cadian Command Squad': {
    5: [
      { label: 'Cadian Veteran Guardsman', count: 4, wounds: 1 },
      { label: 'Cadian Commander', count: 1, wounds: 3 },
    ]
  },
  'Catachan Command Squad': {
    5: [
      { label: 'Veteran Guardsman', count: 4, wounds: 1 },
      { label: 'Catachan Commander', count: 1, wounds: 3 },
    ]
  },
  'Krieg Command Squad': {
    6: [
      { label: 'Veteran Guardsman', count: 5, wounds: 1 },
      { label: 'Lord Commissar', count: 1, wounds: 3 },
    ]
  },
  'Krieg Heavy Weapons Squad': {
    4: [
      { label: 'Heavy Weapons Gunner', count: 3, wounds: 2 },
      { label: 'Fire Coordinator', count: 1, wounds: 1 },
    ]
  },
  'Militarum Tempestus Command Squad': {
    5: [
      { label: 'Tempestus Scion', count: 4, wounds: 1 },
      { label: 'Tempestor Prime', count: 1, wounds: 3 },
    ]
  },
  'Gauntâ€™s Ghosts': {
    6: [
      { label: 'Tanith Ghost', count: 5, wounds: 2 },
      { label: 'Ibram Gaunt', count: 1, wounds: 3 },
    ]
  },
  "Gaunt's Ghosts": {
    6: [
      { label: 'Tanith Ghost', count: 5, wounds: 2 },
      { label: 'Ibram Gaunt', count: 1, wounds: 3 },
    ]
  },
};


