// Astra Militarum-specific army builder rules and special loadout logic.
function isRulesBuilderUnit(unitName = builderUnitSelect.value) {
  return Boolean(getBuilderWargearRule(unitName));
}

const CONFIGURED_BUILDER_WARGEAR_RULE = {
  render: renderConfiguredInfantryWargearOptions,
  quantities: selectedConfiguredInfantryWeaponQuantities,
  errors: configuredInfantryWargearErrors,
};

function builderRuleConfigRegistry() {
  return window.WH40K_BUILDER_RULE_CONFIGS || {};
}

function builderRuleConfigForUnit(unitName = builderUnitSelect.value) {
  const registry = builderRuleConfigRegistry();
  const factionConfigs = registry && registry[currentBuilderFactionSlug] ? registry[currentBuilderFactionSlug] : {};
  if (factionConfigs && factionConfigs[unitName]) return factionConfigs[unitName];
  if (currentBuilderFactionSlug === 'astra-militarum') {
    return window.ASTRA_MILITARUM_INFANTRY_RULE_CONFIGS?.[unitName] || null;
  }
  return null;
}

function getBuilderWargearRule(unitName = builderUnitSelect.value) {
  if (currentBuilderFactionSlug === 'astra-militarum' && ASTRA_MILITARUM_WARGEAR_RULES[unitName]) {
    return ASTRA_MILITARUM_WARGEAR_RULES[unitName];
  }
  if (builderRuleConfigForUnit(unitName)) return CONFIGURED_BUILDER_WARGEAR_RULE;
  return null;
}

function clampRulesNumber(value, min, max) {
  const number = Math.floor(Number(value || 0));
  return Math.max(min, Math.min(max, Number.isFinite(number) ? number : min));
}

function ruleInputValue(key) {
  const input = builderWeaponOptions.querySelector(`.dkok-option[data-key="${key}"]`);
  if (!input) return 0;
  const value = clampRulesNumber(input.value, Number(input.min || 0), Number(input.max || 0));
  input.value = String(value);
  return value;
}

function deathKorpsModelCounts(models) {
  const scale = Math.max(1, Number(models || 10) / 10);
  return {
    scale,
    watchmasters: scale,
    troopers: scale * 9,
    maxSpecials: scale * 2,
    maxSameSpecial: scale,
    maxSupport: scale,
  };
}

function rulesNumberLine(key, label, value, max) {
  return `
    <label class="rules-line">
      <span>${escapeHtml(label)}</span>
      <input type="number" class="dkok-option" data-key="${escapeHtml(key)}" min="0" max="${max}" value="${value}" />
    </label>
  `;
}

function rulesSelectLine(key, label, value, options) {
  return `
    <label class="rules-line has-select">
      <span>${escapeHtml(label)}</span>
      <select class="rules-select-option" data-key="${escapeHtml(key)}">
        ${options.map(option => `<option value="${escapeHtml(option.value)}"${option.value === value ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
      </select>
    </label>
  `;
}

function ruleSelectValue(key) {
  return builderWeaponOptions.querySelector(`.rules-select-option[data-key="${key}"]`)?.value || '';
}

function renderDeathKorpsWargearOptions(unitName, modelCount) {
  const counts = deathKorpsModelCounts(modelCount);      builderWeaponOptions.innerHTML = `
    <div class="rules-wargear" data-rules-unit="death-korps-of-krieg">
      <div class="rules-error" id="deathKorpsRulesError"></div>
      <div class="rules-group">
        <div class="rules-group-title">Death Korps Watchmasters (${counts.watchmasters}/${counts.watchmasters})</div>
        <div class="rules-derived">Any number of Death Korps Watchmasters can each replace their laspistol and chainsword with 1 boltgun and 1 close combat weapon. Any number of Death Korps Watchmasters can each replace their chainsword with 1 power weapon. Any number of Death Korps Watchmasters can each replace their laspistol with one of the following: 1 bolt pistol; 1 plasma pistol.</div>
        ${rulesNumberLine('watch_boltgun_ccw', '1 boltgun and 1 close combat weapon', 0, counts.watchmasters)}
        ${rulesNumberLine('watch_power_weapon', '1 power weapon', 0, counts.watchmasters)}
        ${rulesNumberLine('watch_bolt_pistol', '1 bolt pistol', 0, counts.watchmasters)}
        ${rulesNumberLine('watch_plasma_pistol', '1 plasma pistol', 0, counts.watchmasters)}
        <div class="rules-derived" id="deathKorpsDerivedWatchmasters"></div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Death Korps Troopers (${counts.troopers}/${counts.troopers})</div>
        <div class="rules-derived">For every 10 models in this unit, 1 Death Korps Trooper equipped with a lasgun can be equipped with 1 Death Korps medi-pack or 1 vox-caster; a model can only take one of these options, and that model's lasgun cannot be replaced.</div>
        ${rulesNumberLine('medi_pack', '1 Death Korps medi-pack', 0, counts.maxSupport)}
        ${rulesNumberLine('vox_caster', '1 vox-caster', 0, counts.maxSupport)}
        <div class="rules-derived">For every 10 models in this unit, up to 2 Death Korps Troopers can each have their lasgun replaced with one of the following: 1 flamer; 1 grenade launcher; 1 long-las; 1 meltagun; 1 plasma gun. You cannot select the same option more than once per unit unless it contains 20 models, in which case you cannot select the same option more than twice per unit.</div>
        ${rulesNumberLine('flamer', '1 flamer', 0, counts.maxSameSpecial)}
        ${rulesNumberLine('grenade launcher', '1 grenade launcher', 0, counts.maxSameSpecial)}
        ${rulesNumberLine('long-las', '1 long-las', 0, counts.maxSameSpecial)}
        ${rulesNumberLine('meltagun', '1 meltagun', 0, counts.maxSameSpecial)}
        ${rulesNumberLine('plasma gun', '1 plasma gun', 0, counts.maxSameSpecial)}
        <div class="rules-derived" id="deathKorpsDerivedTroopers"></div>
      </div>
    </div>
  `;
  builderWeaponOptions.querySelectorAll('.dkok-option').forEach(input => {
    input.addEventListener('input', () => selectedDeathKorpsWeaponQuantities());
    input.addEventListener('change', () => selectedDeathKorpsWeaponQuantities());
  });
  selectedDeathKorpsWeaponQuantities();
  updateBuilderSelectedPoints();
}

function selectedDeathKorpsWeaponQuantities() {
  const modelCount = Number(builderModelCount.value || 10);
  const counts = deathKorpsModelCounts(modelCount);
  const values = {
    watch_boltgun_ccw: ruleInputValue('watch_boltgun_ccw'),
    watch_power_weapon: ruleInputValue('watch_power_weapon'),
    watch_bolt_pistol: ruleInputValue('watch_bolt_pistol'),
    watch_plasma_pistol: ruleInputValue('watch_plasma_pistol'),
    medi_pack: ruleInputValue('medi_pack'),
    vox_caster: ruleInputValue('vox_caster'),
    flamer: ruleInputValue('flamer'),
    grenade_launcher: ruleInputValue('grenade launcher'),
    long_las: ruleInputValue('long-las'),
    meltagun: ruleInputValue('meltagun'),
    plasma_gun: ruleInputValue('plasma gun'),
  };

  const pistolMeleeWatchmasters = counts.watchmasters - values.watch_boltgun_ccw;
  const watchmasterPistolUpgrades = values.watch_bolt_pistol + values.watch_plasma_pistol;
  const specialTotal = values.flamer + values.grenade_launcher + values.long_las + values.meltagun + values.plasma_gun;
  const assignedTroopers = values.medi_pack + values.vox_caster + specialTotal;
  const basicTroopers = counts.troopers - assignedTroopers;
  const errors = [];

  if (values.watch_power_weapon > pistolMeleeWatchmasters) errors.push(`Power weapon upgrades must be ${pistolMeleeWatchmasters} or fewer; currently ${values.watch_power_weapon}.`);
  if (watchmasterPistolUpgrades > pistolMeleeWatchmasters) errors.push(`Watchmaster pistol upgrades must be ${pistolMeleeWatchmasters} or fewer; currently ${watchmasterPistolUpgrades}.`);
  if (specialTotal > counts.maxSpecials) errors.push(`Special weapon Troopers must total ${counts.maxSpecials} or fewer; currently ${specialTotal}.`);
  if (assignedTroopers > counts.troopers) errors.push(`Trooper assignments exceed available Troopers by ${assignedTroopers - counts.troopers}.`);

  const errorBox = document.getElementById('deathKorpsRulesError');
  if (errorBox) errorBox.innerHTML = errors.map(escapeHtml).join('<br>');
  const watchDerived = document.getElementById('deathKorpsDerivedWatchmasters');
  if (watchDerived) watchDerived.textContent = `Pistol/melee Watchmasters: ${pistolMeleeWatchmasters}. Unupgraded pistols: ${Math.max(0, pistolMeleeWatchmasters - watchmasterPistolUpgrades)}. Unupgraded chainswords: ${Math.max(0, pistolMeleeWatchmasters - values.watch_power_weapon)}.`;
  const derived = document.getElementById('deathKorpsDerivedTroopers');
  if (derived) derived.textContent = `Basic lasgun Troopers: ${Math.max(0, basicTroopers)}. Assigned Troopers: ${assignedTroopers}/${counts.troopers}.`;

  const quantities = {
    laspistol: Math.max(0, pistolMeleeWatchmasters - watchmasterPistolUpgrades),
    chainsword: Math.max(0, pistolMeleeWatchmasters - values.watch_power_weapon),
    'power weapon': values.watch_power_weapon,
    'bolt pistol': values.watch_bolt_pistol,
    'plasma pistol': values.watch_plasma_pistol,
    boltgun: values.watch_boltgun_ccw,
    'close combat weapon': counts.troopers + values.watch_boltgun_ccw,
    lasgun: Math.max(0, basicTroopers) + values.medi_pack + values.vox_caster,
    'death korps medi-pack': values.medi_pack,
    'vox-caster': values.vox_caster,
    flamer: values.flamer,
    'grenade launcher': values.grenade_launcher,
    'long-las': values.long_las,
    meltagun: values.meltagun,
    'plasma gun': values.plasma_gun,
  };

  return Object.fromEntries(Object.entries(quantities).filter(([, value]) => Number(value) > 0));
}

function deathKorpsWargearErrors() {
  const errorBox = document.getElementById('deathKorpsRulesError');
  return errorBox?.textContent?.trim() || '';
}

function cadianShockTroopsModelCounts(models) {
  const scale = Math.max(1, Number(models || 10) / 10);
  return {
    scale,
    sergeants: scale,
    troopers: scale * 9,
    maxSpecials: scale * 2,
    maxSameSpecial: scale,
    maxVox: scale,
  };
}

function renderCadianShockTroopsWargearOptions(unitName, modelCount) {
  const counts = cadianShockTroopsModelCounts(modelCount);      builderWeaponOptions.innerHTML = `
    <div class="rules-wargear" data-rules-unit="cadian-shock-troops">
      <div class="rules-error" id="cadianShockRulesError"></div>
      <div class="rules-group">
        <div class="rules-group-title">Shock Trooper Sergeants (${counts.sergeants}/${counts.sergeants})</div>
        <div class="rules-derived">Any number of Shock Trooper Sergeants can each have their laspistol replaced with 1 bolt pistol. Any number of Shock Trooper Sergeants can each have their laspistol and chainsword replaced with 1 Sergeant's autogun and 1 close combat weapon.</div>
        ${rulesNumberLine('cadian_sergeant_autogun', "1 Sergeant's autogun and 1 close combat weapon", 0, counts.sergeants)}
        ${rulesNumberLine('cadian_sergeant_bolt_pistol', '1 bolt pistol', 0, counts.sergeants)}
        <div class="rules-derived" id="cadianShockDerivedSergeants"></div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Shock Troopers (${counts.troopers}/${counts.troopers})</div>
        <div class="rules-derived">For every 10 models in this unit, 1 Shock Trooper equipped with a lasgun can be equipped with 1 vox-caster; that model's lasgun cannot be replaced.</div>
        ${rulesNumberLine('cadian_vox_caster', '1 vox-caster', 0, counts.maxVox)}
        <div class="rules-derived">For every 10 models in this unit, up to 2 Shock Troopers can each have their lasgun replaced with one of the following: 1 flamer; 1 grenade launcher; 1 meltagun; 1 plasma gun. You cannot select the same weapon more than once per unit unless it contains 20 models, in which case you cannot select the same weapon more than twice per unit.</div>
        ${rulesNumberLine('cadian_flamer', '1 flamer', 0, counts.maxSameSpecial)}
        ${rulesNumberLine('cadian_grenade_launcher', '1 grenade launcher', 0, counts.maxSameSpecial)}
        ${rulesNumberLine('cadian_meltagun', '1 meltagun', 0, counts.maxSameSpecial)}
        ${rulesNumberLine('cadian_plasma_gun', '1 plasma gun', 0, counts.maxSameSpecial)}
        <div class="rules-derived" id="cadianShockDerivedTroopers"></div>
      </div>
    </div>
  `;
  builderWeaponOptions.querySelectorAll('.dkok-option').forEach(input => {
    input.addEventListener('input', () => selectedCadianShockTroopsWeaponQuantities());
    input.addEventListener('change', () => selectedCadianShockTroopsWeaponQuantities());
  });
  selectedCadianShockTroopsWeaponQuantities();
  updateBuilderSelectedPoints();
}

function selectedCadianShockTroopsWeaponQuantities() {
  const modelCount = Number(builderModelCount.value || 10);
  const counts = cadianShockTroopsModelCounts(modelCount);
  const values = {
    sergeant_autogun: ruleInputValue('cadian_sergeant_autogun'),
    sergeant_bolt_pistol: ruleInputValue('cadian_sergeant_bolt_pistol'),
    vox_caster: ruleInputValue('cadian_vox_caster'),
    flamer: ruleInputValue('cadian_flamer'),
    grenade_launcher: ruleInputValue('cadian_grenade_launcher'),
    meltagun: ruleInputValue('cadian_meltagun'),
    plasma_gun: ruleInputValue('cadian_plasma_gun'),
  };
  const pistolMeleeSergeants = counts.sergeants - values.sergeant_autogun;
  const specialTotal = values.flamer + values.grenade_launcher + values.meltagun + values.plasma_gun;
  const assignedTroopers = values.vox_caster + specialTotal;
  const basicTroopers = counts.troopers - assignedTroopers;
  const errors = [];

  if (values.sergeant_bolt_pistol > pistolMeleeSergeants) errors.push(`Sergeant bolt pistol upgrades must be ${pistolMeleeSergeants} or fewer; currently ${values.sergeant_bolt_pistol}.`);
  if (specialTotal > counts.maxSpecials) errors.push(`Special weapon Troopers must total ${counts.maxSpecials} or fewer; currently ${specialTotal}.`);
  if (assignedTroopers > counts.troopers) errors.push(`Trooper assignments exceed available Troopers by ${assignedTroopers - counts.troopers}.`);

  const errorBox = document.getElementById('cadianShockRulesError');
  if (errorBox) errorBox.innerHTML = errors.map(escapeHtml).join('<br>');
  const sergeantDerived = document.getElementById('cadianShockDerivedSergeants');
  if (sergeantDerived) sergeantDerived.textContent = `Pistol/melee Sergeants: ${pistolMeleeSergeants}. Unupgraded laspistols: ${Math.max(0, pistolMeleeSergeants - values.sergeant_bolt_pistol)}. Unupgraded chainswords: ${Math.max(0, pistolMeleeSergeants)}.`;
  const trooperDerived = document.getElementById('cadianShockDerivedTroopers');
  if (trooperDerived) trooperDerived.textContent = `Basic lasgun Troopers: ${Math.max(0, basicTroopers)}. Assigned Troopers: ${assignedTroopers}/${counts.troopers}.`;

  const quantities = {
    laspistol: Math.max(0, pistolMeleeSergeants - values.sergeant_bolt_pistol),
    'bolt pistol': values.sergeant_bolt_pistol,
    chainsword: Math.max(0, pistolMeleeSergeants),
    "sergeant's autogun": values.sergeant_autogun,
    'close combat weapon': counts.troopers + values.sergeant_autogun,
    lasgun: Math.max(0, basicTroopers) + values.vox_caster,
    'vox-caster': values.vox_caster,
    flamer: values.flamer,
    'grenade launcher': values.grenade_launcher,
    meltagun: values.meltagun,
    'plasma gun': values.plasma_gun,
  };

  return Object.fromEntries(Object.entries(quantities).filter(([, value]) => Number(value) > 0));
}

function cadianShockTroopsWargearErrors() {
  const errorBox = document.getElementById('cadianShockRulesError');
  return errorBox?.textContent?.trim() || '';
}

function renderKriegCommandWargearOptions(unitName, modelCount) {      builderWeaponOptions.innerHTML = `
    <div class="rules-wargear" data-rules-unit="krieg-command-squad">
      <div class="rules-error" id="kriegCommandRulesError"></div>
      <div class="rules-group">
        <div class="rules-group-title">Lord Commissar</div>
        <div class="rules-derived">The Lord Commissar's power weapon can be replaced with 1 power fist. The Lord Commissar's laspistol can be replaced with 1 plasma pistol.</div>
        ${rulesNumberLine('commissar_power_fist', '1 power fist', 0, 1)}
        ${rulesNumberLine('commissar_plasma_pistol', '1 plasma pistol', 0, 1)}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Veteran Guardsman with chainsword</div>
        <div class="rules-derived">This Veteran Guardsman's chainsword can be replaced with 1 trench club or 1 power weapon. This Veteran Guardsman's laspistol can be replaced with 1 bolt pistol or 1 plasma pistol.</div>
        ${rulesNumberLine('veteran_trench_club', '1 trench club', 0, 1)}
        ${rulesNumberLine('veteran_power_weapon', '1 power weapon', 0, 1)}
        ${rulesNumberLine('veteran_bolt_pistol', '1 bolt pistol', 0, 1)}
        ${rulesNumberLine('veteran_plasma_pistol', '1 plasma pistol', 0, 1)}
        <div class="rules-derived" id="kriegCommandDerivedChainswordVeteran"></div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Veteran Guardsman with boltgun</div>
        <div class="rules-derived">This Veteran Guardsman's boltgun can be replaced with 1 flamer, 1 grenade launcher, 1 meltagun, or 1 plasma gun.</div>
        ${rulesNumberLine('veteran_flamer', '1 flamer', 0, 1)}
        ${rulesNumberLine('veteran_grenade_launcher', '1 grenade launcher', 0, 1)}
        ${rulesNumberLine('veteran_meltagun', '1 meltagun', 0, 1)}
        ${rulesNumberLine('veteran_plasma_gun', '1 plasma gun', 0, 1)}
        <div class="rules-derived" id="kriegCommandDerivedBoltgunVeteran"></div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Veteran Guardsman with alchemyk counteragents</div>
        <div class="rules-derived">Fixed: laspistol; close combat weapon; alchemyk counteragents; servo-scribes. No wargear options.</div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Veteran Guardsman with master vox</div>
        <div class="rules-derived">Fixed: lasgun; close combat weapon; master vox. No wargear options.</div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Veteran Guardsman with regimental standard</div>
        <div class="rules-derived">Fixed: lasgun; close combat weapon; regimental standard. No wargear options.</div>
      </div>
    </div>
  `;
  builderWeaponOptions.querySelectorAll('.dkok-option').forEach(input => {
    input.addEventListener('input', () => selectedKriegCommandWeaponQuantities());
    input.addEventListener('change', () => selectedKriegCommandWeaponQuantities());
  });
  selectedKriegCommandWeaponQuantities();
  updateBuilderSelectedPoints();
}

function selectedKriegCommandWeaponQuantities() {
  const values = {
    commissar_power_fist: ruleInputValue('commissar_power_fist'),
    commissar_plasma_pistol: ruleInputValue('commissar_plasma_pistol'),
    veteran_trench_club: ruleInputValue('veteran_trench_club'),
    veteran_power_weapon: ruleInputValue('veteran_power_weapon'),
    veteran_bolt_pistol: ruleInputValue('veteran_bolt_pistol'),
    veteran_plasma_pistol: ruleInputValue('veteran_plasma_pistol'),
    veteran_flamer: ruleInputValue('veteran_flamer'),
    veteran_grenade_launcher: ruleInputValue('veteran_grenade_launcher'),
    veteran_meltagun: ruleInputValue('veteran_meltagun'),
    veteran_plasma_gun: ruleInputValue('veteran_plasma_gun'),
  };
  const chainswordReplacements = values.veteran_trench_club + values.veteran_power_weapon;
  const veteranPistolReplacements = values.veteran_bolt_pistol + values.veteran_plasma_pistol;
  const boltgunReplacements = values.veteran_flamer + values.veteran_grenade_launcher + values.veteran_meltagun + values.veteran_plasma_gun;
  const errors = [];

  if (chainswordReplacements > 1) errors.push(`Chainsword Veteran melee replacements must total 1 or fewer; currently ${chainswordReplacements}.`);
  if (veteranPistolReplacements > 1) errors.push(`Chainsword Veteran pistol replacements must total 1 or fewer; currently ${veteranPistolReplacements}.`);
  if (boltgunReplacements > 1) errors.push(`Boltgun Veteran weapon replacements must total 1 or fewer; currently ${boltgunReplacements}.`);

  const errorBox = document.getElementById('kriegCommandRulesError');
  if (errorBox) errorBox.innerHTML = errors.map(escapeHtml).join('<br>');
  const chainswordDerived = document.getElementById('kriegCommandDerivedChainswordVeteran');
  if (chainswordDerived) chainswordDerived.textContent = `Unupgraded laspistol: ${Math.max(0, 1 - veteranPistolReplacements)}. Unupgraded chainsword: ${Math.max(0, 1 - chainswordReplacements)}.`;
  const boltgunDerived = document.getElementById('kriegCommandDerivedBoltgunVeteran');
  if (boltgunDerived) boltgunDerived.textContent = `Unupgraded boltgun: ${Math.max(0, 1 - boltgunReplacements)}.`;

  const quantities = {
    laspistol: 2 + Math.max(0, 1 - veteranPistolReplacements),
    'plasma pistol': values.commissar_plasma_pistol + values.veteran_plasma_pistol,
    'bolt pistol': values.veteran_bolt_pistol,
    'power weapon': Math.max(0, 1 - values.commissar_power_fist) + values.veteran_power_weapon,
    'power fist': values.commissar_power_fist,
    chainsword: Math.max(0, 1 - chainswordReplacements),
    'trench club': values.veteran_trench_club,
    'close combat weapon': 4,
    lasgun: 2,
    boltgun: Math.max(0, 1 - boltgunReplacements),
    flamer: values.veteran_flamer,
    'grenade launcher': values.veteran_grenade_launcher,
    meltagun: values.veteran_meltagun,
    'plasma gun': values.veteran_plasma_gun,
    'alchemyk counteragents': 1,
    'servo-scribes': 1,
    'master vox': 1,
    'regimental standard': 1,
  };

  return Object.fromEntries(Object.entries(quantities).filter(([, value]) => Number(value) > 0));
}

function kriegCommandWargearErrors() {
  const errorBox = document.getElementById('kriegCommandRulesError');
  return errorBox?.textContent?.trim() || '';
}

function renderLemanRussBattleTankWargearOptions(unitName, modelCount) {
  const russConfig = LEMAN_RUSS_CONFIGS[unitName] || LEMAN_RUSS_CONFIGS['Leman Russ Battle Tank'];      const turretHtml = russConfig.turretOptions?.length
    ? `
      <div class="rules-group">
        <div class="rules-group-title">Turret weapon</div>
        <div class="rules-derived">${russConfig.turretOptions?.length ? "This model's Leman Russ battle cannon can be replaced with one of the following: 1 demolisher battle cannon; 1 eradicator nova cannon; 1 executioner plasma cannon; 1 exterminator autocannon; 1 punisher gatling cannon; 1 vanquisher battle cannon." : `Fixed: ${escapeHtml(russConfig.turretLabel)}. No wargear options.`}</div>
        ${rulesSelectLine('russ_turret_weapon', 'Turret weapon', russConfig.turret, russConfig.turretOptions)}
      </div>
    `
    : `
      <div class="rules-group">
        <div class="rules-group-title">Turret weapon</div>
        <div class="rules-derived">Fixed: ${escapeHtml(russConfig.turretLabel)}. No wargear options.</div>
      </div>
    `;
  builderWeaponOptions.innerHTML = `
    <div class="rules-wargear" data-rules-unit="leman-russ-battle-tank">
      <div class="rules-error" id="lemanRussRulesError"></div>
      ${turretHtml}
      <div class="rules-group">
        <div class="rules-group-title">Hull weapon</div>
        <div class="rules-derived">This model's lascannon can be replaced with one of the following: 1 heavy bolter; 1 heavy flamer.</div>
        ${rulesSelectLine('russ_hull_weapon', 'Hull weapon', 'lascannon', [
          { value: 'lascannon', label: 'Lascannon' },
          { value: 'heavy bolter', label: 'Heavy bolter' },
          { value: 'heavy flamer', label: 'Heavy flamer' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Sponson weapons</div>
        <div class="rules-derived">This model can be equipped with one of the following: 2 heavy bolters; 2 heavy flamers; 2 multi-meltas; 2 plasma cannons.</div>
        ${rulesSelectLine('russ_sponsons', 'Sponsons', '', [
          { value: '', label: 'None' },
          { value: 'heavy bolter', label: '2 heavy bolters' },
          { value: 'heavy flamer', label: '2 heavy flamers' },
          { value: 'multi-melta', label: '2 multi-meltas' },
          { value: 'plasma cannon', label: '2 plasma cannons' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Pintle weapon</div>
        <div class="rules-derived">This model can be equipped with one of the following: 1 heavy stubber; 1 storm bolter.</div>
        ${rulesSelectLine('russ_pintle', 'Pintle weapon', '', [
          { value: '', label: 'None' },
          { value: 'heavy stubber', label: 'Heavy stubber' },
          { value: 'storm bolter', label: 'Storm bolter' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">One-shot missile</div>
        <div class="rules-derived">This model can be equipped with 1 hunter-killer missile.</div>
        ${rulesSelectLine('russ_hunter_killer', 'Hunter-killer missile', '', [
          { value: '', label: 'None' },
          { value: 'hunter-killer missile', label: 'Hunter-killer missile' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Chassis</div>
        <div class="rules-derived">Fixed: armoured tracks. No wargear options.</div>
      </div>
    </div>
  `;
  builderWeaponOptions.querySelectorAll('.rules-select-option').forEach(input => {
    input.addEventListener('input', () => selectedLemanRussBattleTankWeaponQuantities());
    input.addEventListener('change', () => selectedLemanRussBattleTankWeaponQuantities());
  });
  selectedLemanRussBattleTankWeaponQuantities();
  updateBuilderSelectedPoints();
}

function selectedLemanRussBattleTankWeaponQuantities() {
  const russConfig = LEMAN_RUSS_CONFIGS[builderUnitSelect.value] || LEMAN_RUSS_CONFIGS['Leman Russ Battle Tank'];
  const turretWeapon = ruleSelectValue('russ_turret_weapon') || russConfig.turret;
  const hullWeapon = ruleSelectValue('russ_hull_weapon') || 'lascannon';
  const sponsons = ruleSelectValue('russ_sponsons');
  const pintle = ruleSelectValue('russ_pintle');
  const hunterKiller = ruleSelectValue('russ_hunter_killer');
  const quantities = {
    [turretWeapon]: 1,
    'armoured tracks': 1,
    [hullWeapon]: 1,
  };
  if (sponsons) quantities[sponsons] = (quantities[sponsons] || 0) + 2;
  if (pintle) quantities[pintle] = (quantities[pintle] || 0) + 1;
  if (hunterKiller) quantities[hunterKiller] = (quantities[hunterKiller] || 0) + 1;

  const errorBox = document.getElementById('lemanRussRulesError');
  if (errorBox) errorBox.textContent = '';
  return Object.fromEntries(Object.entries(quantities).filter(([, value]) => Number(value) > 0));
}

function lemanRussBattleTankWargearErrors() {
  const errorBox = document.getElementById('lemanRussRulesError');
  return errorBox?.textContent?.trim() || '';
}

const LEMAN_RUSS_CONFIGS = {
  'Leman Russ Battle Tank': { turret: 'leman russ battle cannon', turretLabel: 'Leman Russ battle cannon' },
  'Leman Russ Demolisher': { turret: 'demolisher battle cannon', turretLabel: 'Demolisher battle cannon' },
  'Leman Russ Eradicator': { turret: 'eradicator nova cannon', turretLabel: 'Eradicator nova cannon' },
  'Leman Russ Executioner': { turret: 'executioner plasma cannon', turretLabel: 'Executioner plasma cannon' },
  'Leman Russ Exterminator': { turret: 'exterminator autocannon', turretLabel: 'Exterminator autocannon' },
  'Leman Russ Punisher': { turret: 'punisher gatling cannon', turretLabel: 'Punisher gatling cannon' },
  'Leman Russ Vanquisher': { turret: 'vanquisher battle cannon', turretLabel: 'Vanquisher battle cannon' },
  'Leman Russ Commander': {
    turret: 'leman russ battle cannon',
    turretLabel: 'Leman Russ battle cannon',
    turretOptions: [
      { value: 'leman russ battle cannon', label: 'Leman Russ battle cannon' },
      { value: 'demolisher battle cannon', label: 'Demolisher battle cannon' },
      { value: 'eradicator nova cannon', label: 'Eradicator nova cannon' },
      { value: 'executioner plasma cannon', label: 'Executioner plasma cannon' },
      { value: 'exterminator autocannon', label: 'Exterminator autocannon' },
      { value: 'punisher gatling cannon', label: 'Punisher gatling cannon' },
      { value: 'vanquisher battle cannon', label: 'Vanquisher battle cannon' },
    ],
  },
};

function renderRogalDornBattleTankWargearOptions(unitName, modelCount) {      builderWeaponOptions.innerHTML = `
    <div class="rules-wargear" data-rules-unit="rogal-dorn-battle-tank">
      <div class="rules-error" id="rogalDornRulesError"></div>
      <div class="rules-group">
        <div class="rules-group-title">Primary turret weapon</div>
        <div class="rules-derived">This model's twin battle cannon can be replaced with 1 oppressor cannon and 1 coaxial autocannon.</div>
        ${rulesSelectLine('dorn_primary_turret', 'Primary turret', 'twin battle cannon', [
          { value: 'twin battle cannon', label: 'Twin battle cannon' },
          { value: 'oppressor cannon', label: 'Oppressor cannon and coaxial autocannon' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Secondary turret weapon</div>
        <div class="rules-derived">This model's castigator gatling cannon can be replaced with 1 pulveriser cannon.</div>
        ${rulesSelectLine('dorn_secondary_turret', 'Secondary turret', 'castigator gatling cannon', [
          { value: 'castigator gatling cannon', label: 'Castigator gatling cannon' },
          { value: 'pulveriser cannon', label: 'Pulveriser cannon' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Forward mount weapons</div>
        <div class="rules-derived">This model can be equipped with one of the following: 2 meltaguns; 2 additional heavy stubbers.</div>
        ${rulesSelectLine('dorn_forward_mounts', 'Forward mounts', '', [
          { value: '', label: 'None' },
          { value: 'meltagun', label: '2 meltaguns' },
          { value: 'heavy stubber', label: '2 additional heavy stubbers' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Side weapons</div>
        <div class="rules-derived">This model can be equipped with one of the following: 2 heavy bolters; 2 multi-meltas.</div>
        ${rulesSelectLine('dorn_side_weapons', 'Side weapons', '', [
          { value: '', label: 'None' },
          { value: 'heavy bolter', label: '2 heavy bolters' },
          { value: 'multi-melta', label: '2 multi-meltas' },
        ])}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Pintle weapon</div>
        <div class="rules-derived">Fixed: heavy stubber. No wargear options.</div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Chassis</div>
        <div class="rules-derived">Fixed: armoured tracks. No wargear options.</div>
      </div>
    </div>
  `;
  builderWeaponOptions.querySelectorAll('.rules-select-option').forEach(input => {
    input.addEventListener('input', () => selectedRogalDornBattleTankWeaponQuantities());
    input.addEventListener('change', () => selectedRogalDornBattleTankWeaponQuantities());
  });
  selectedRogalDornBattleTankWeaponQuantities();
  updateBuilderSelectedPoints();
}

function selectedRogalDornBattleTankWeaponQuantities() {
  const primaryTurret = ruleSelectValue('dorn_primary_turret') || 'twin battle cannon';
  const secondaryTurret = ruleSelectValue('dorn_secondary_turret') || 'castigator gatling cannon';
  const forwardMounts = ruleSelectValue('dorn_forward_mounts');
  const sideWeapons = ruleSelectValue('dorn_side_weapons');
  const quantities = {
    'armoured tracks': 1,
    'heavy stubber': 1,
    [primaryTurret]: 1,
    [secondaryTurret]: 1,
  };
  if (primaryTurret === 'oppressor cannon') quantities['coaxial autocannon'] = 1;
  if (forwardMounts) quantities[forwardMounts] = (quantities[forwardMounts] || 0) + 2;
  if (sideWeapons) quantities[sideWeapons] = (quantities[sideWeapons] || 0) + 2;

  const errorBox = document.getElementById('rogalDornRulesError');
  if (errorBox) errorBox.textContent = '';
  return Object.fromEntries(Object.entries(quantities).filter(([, value]) => Number(value) > 0));
}

function rogalDornBattleTankWargearErrors() {
  const errorBox = document.getElementById('rogalDornRulesError');
  return errorBox?.textContent?.trim() || '';
}

function renderScoutSentinelsWargearOptions(unitName, modelCount) {
  const models = Math.max(1, Number(modelCount || 1));
  const sentinelLabel = unitName === 'Armoured Sentinels' ? 'Armoured Sentinel' : 'Scout Sentinel';
  const sentinelPlural = unitName === 'Armoured Sentinels' ? 'Armoured Sentinels' : 'Scout Sentinels';      builderWeaponOptions.innerHTML = `
    <div class="rules-wargear" data-rules-unit="scout-sentinels">
      <div class="rules-error" id="scoutSentinelsRulesError"></div>
      <div class="rules-group">
        <div class="rules-group-title">Main weapon upgrades</div>
        <div class="rules-derived">Any number of models can each have their multi-laser replaced with one of the following: 1 autocannon; 1 heavy flamer; 1 lascannon; 1 missile launcher; 1 plasma cannon.</div>
        ${rulesNumberLine('scout_autocannon', 'Autocannon', 0, models)}
        ${rulesNumberLine('scout_heavy_flamer', 'Heavy flamer', 0, models)}
        ${rulesNumberLine('scout_lascannon', 'Lascannon', 0, models)}
        ${rulesNumberLine('scout_missile_launcher', 'Missile launcher', 0, models)}
        ${rulesNumberLine('scout_plasma_cannon', 'Plasma cannon', 0, models)}
        <div class="rules-derived" id="scoutSentinelsDerivedWeapons"></div>
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Optional Equipment</div>
        <div class="rules-derived">Any number of models can each be equipped with 1 Sentinel chainsaw. Any number of models can each be equipped with 1 hunter-killer missile.</div>
        ${rulesNumberLine('scout_sentinel_chainsaw', 'Sentinel chainsaw', 0, models)}
        ${rulesNumberLine('scout_hunter_killer', 'Hunter-killer missile', 0, models)}
      </div>
      <div class="rules-group">
        <div class="rules-group-title">Chassis</div>
        <div class="rules-derived">Fixed: close combat weapon on every model. No wargear options.</div>
      </div>
    </div>
  `;
  builderWeaponOptions.querySelectorAll('.dkok-option').forEach(input => {
    input.addEventListener('input', () => selectedScoutSentinelsWeaponQuantities());
    input.addEventListener('change', () => selectedScoutSentinelsWeaponQuantities());
  });
  selectedScoutSentinelsWeaponQuantities();
  updateBuilderSelectedPoints();
}

function selectedScoutSentinelsWeaponQuantities() {
  const models = Math.max(1, Number(builderModelCount.value || 1));
  const values = {
    autocannon: ruleInputValue('scout_autocannon'),
    heavy_flamer: ruleInputValue('scout_heavy_flamer'),
    lascannon: ruleInputValue('scout_lascannon'),
    missile_launcher: ruleInputValue('scout_missile_launcher'),
    plasma_cannon: ruleInputValue('scout_plasma_cannon'),
    sentinel_chainsaw: ruleInputValue('scout_sentinel_chainsaw'),
    hunter_killer: ruleInputValue('scout_hunter_killer'),
  };
  const upgradedMainWeapons = values.autocannon + values.heavy_flamer + values.lascannon + values.missile_launcher + values.plasma_cannon;
  const multiLasers = models - upgradedMainWeapons;
  const errors = [];
  if (upgradedMainWeapons > models) errors.push(`Main weapon upgrades must total ${models} or fewer; currently ${upgradedMainWeapons}.`);

  const errorBox = document.getElementById('scoutSentinelsRulesError');
  if (errorBox) errorBox.innerHTML = errors.map(escapeHtml).join('<br>');
  const derived = document.getElementById('scoutSentinelsDerivedWeapons');
  if (derived) derived.textContent = `Unupgraded multi-lasers: ${Math.max(0, multiLasers)}. Upgraded main weapons: ${upgradedMainWeapons}/${models}.`;

  const quantities = {
    'multi-laser': Math.max(0, multiLasers),
    autocannon: values.autocannon,
    'heavy flamer': values.heavy_flamer,
    lascannon: values.lascannon,
    'missile launcher': values.missile_launcher,
    'plasma cannon': values.plasma_cannon,
    'sentinel chainsaw': values.sentinel_chainsaw,
    'hunter-killer missile': values.hunter_killer,
    'close combat weapon': models,
  };

  return Object.fromEntries(Object.entries(quantities).filter(([, value]) => Number(value) > 0));
}

function scoutSentinelsWargearErrors() {
  const errorBox = document.getElementById('scoutSentinelsRulesError');
  return errorBox?.textContent?.trim() || '';
}

function mappedQuantityKey(unitName, key) {
  const normalized = normalizeWeaponProfileKey(key);
  const groups = weaponGroupsForUnit(builderData.units?.[unitName]);
  if (groups.some(group => group.key === normalized)) return normalized;
  const loose = groups.find(group => group.key.startsWith(normalized + ' (') || group.key.startsWith(normalized + ' - '));
  return loose?.key || normalized;
}

function addConfiguredQuantity(quantities, unitName, key, amount = 1) {
  const value = Number(amount || 0);
  if (!value) return;
  const mappedKey = mappedQuantityKey(unitName, key);
  quantities[mappedKey] = (quantities[mappedKey] || 0) + value;
}

function configuredBaseQuantities(unitName, modelCount, override = null) {
  const base = override || baseWargearQuantities(currentBuilderFactionSlug, unitName, modelCount);
  const quantities = {};
  Object.entries(base || {}).forEach(([key, value]) => addConfiguredQuantity(quantities, unitName, key, value));
  return quantities;
}

function configuredNumberValue(key) {
  return ruleInputValue('configured_' + key);
}

function configuredSelectValue(key) {
  return ruleSelectValue('configured_' + key);
}

function configuredMax(max, modelCount, unitName) {
  return typeof max === 'function' ? max(Number(modelCount || 0), unitName) : max;
}

function renderConfiguredInfantryWargearOptions(unitName, modelCount) {
  const config = builderRuleConfigForUnit(unitName);
  if (!config) return;      const sections = config.sections.map(section => {
    const title = typeof section.title === 'function' ? section.title(modelCount) : section.title;
    const description = typeof section.description === 'function' ? section.description(modelCount) : section.description;
    const controls = (section.controls || []).map(control => {
      if (control.type === 'select') return rulesSelectLine('configured_' + control.key, control.label, control.value || '', control.options);
      return rulesNumberLine('configured_' + control.key, control.label, control.value || 0, configuredMax(control.max, modelCount, unitName));
    }).join('');
    return `
      <div class="rules-group">
        <div class="rules-group-title">${escapeHtml(title)}</div>
        ${description ? `<div class="rules-derived">${escapeHtml(description)}</div>` : ''}
        ${controls || '<div class="rules-derived">Fixed loadout. No wargear options.</div>'}
      </div>
    `;
  }).join('');

  builderWeaponOptions.innerHTML = `
    <div class="rules-wargear" data-rules-unit="configured-infantry">
      <div class="rules-error" id="configuredInfantryRulesError"></div>
      ${sections}
      <div class="rules-derived" id="configuredInfantryDerived"></div>
    </div>
  `;

  builderWeaponOptions.querySelectorAll('.dkok-option, .rules-select-option').forEach(input => {
    input.addEventListener('input', () => selectedConfiguredInfantryWeaponQuantities());
    input.addEventListener('change', () => selectedConfiguredInfantryWeaponQuantities());
  });
  selectedConfiguredInfantryWeaponQuantities();
  updateBuilderSelectedPoints();
}

function selectedConfiguredInfantryWeaponQuantities() {
  const unitName = builderUnitSelect.value;
  const config = builderRuleConfigForUnit(unitName);
  if (!config) return {};
  const modelCount = Number(builderModelCount.value || 1);
  const context = {
    unitName,
    modelCount,
    number: configuredNumberValue,
    select: configuredSelectValue,
    base: override => configuredBaseQuantities(unitName, modelCount, override),
    add: (quantities, key, amount) => addConfiguredQuantity(quantities, unitName, key, amount),
    errors: [],
    derived: [],
  };
  const quantities = config.quantities(context);
  const errorBox = document.getElementById('configuredInfantryRulesError');
  if (errorBox) errorBox.innerHTML = context.errors.map(escapeHtml).join('<br>');
  const derived = document.getElementById('configuredInfantryDerived');
  if (derived) derived.textContent = context.derived.join(' ');
  return Object.fromEntries(Object.entries(quantities).filter(([, value]) => Number(value) > 0));
}

function configuredInfantryWargearErrors() {
  const errorBox = document.getElementById('configuredInfantryRulesError');
  return errorBox?.textContent?.trim() || '';
}
const ASTRA_MILITARUM_WARGEAR_RULES = {
  'Death Korps Of Krieg': {
    render: renderDeathKorpsWargearOptions,
    quantities: selectedDeathKorpsWeaponQuantities,
    errors: deathKorpsWargearErrors,
  },
  'Cadian Shock Troops': {
    render: renderCadianShockTroopsWargearOptions,
    quantities: selectedCadianShockTroopsWeaponQuantities,
    errors: cadianShockTroopsWargearErrors,
  },
  'Krieg Command Squad': {
    render: renderKriegCommandWargearOptions,
    quantities: selectedKriegCommandWeaponQuantities,
    errors: kriegCommandWargearErrors,
  },
  'Leman Russ Battle Tank': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Leman Russ Commander': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Leman Russ Demolisher': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Leman Russ Eradicator': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Leman Russ Executioner': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Leman Russ Exterminator': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Leman Russ Punisher': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Leman Russ Vanquisher': {
    render: renderLemanRussBattleTankWargearOptions,
    quantities: selectedLemanRussBattleTankWeaponQuantities,
    errors: lemanRussBattleTankWargearErrors,
  },
  'Rogal Dorn Battle Tank': {
    render: renderRogalDornBattleTankWargearOptions,
    quantities: selectedRogalDornBattleTankWeaponQuantities,
    errors: rogalDornBattleTankWargearErrors,
  },
  'Armoured Sentinels': {
    render: renderScoutSentinelsWargearOptions,
    quantities: selectedScoutSentinelsWeaponQuantities,
    errors: scoutSentinelsWargearErrors,
  },
  'Scout Sentinels': {
    render: renderScoutSentinelsWargearOptions,
    quantities: selectedScoutSentinelsWeaponQuantities,
    errors: scoutSentinelsWargearErrors,
  },
};


Object.keys(window.ASTRA_MILITARUM_INFANTRY_RULE_CONFIGS || {}).forEach(unitName => {
  if (!ASTRA_MILITARUM_WARGEAR_RULES[unitName]) {
    ASTRA_MILITARUM_WARGEAR_RULES[unitName] = CONFIGURED_BUILDER_WARGEAR_RULE;
  }
});


