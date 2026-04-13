// Combat math, tooltips, statline rendering, and calculator UI refresh.
function clamp(num, min, max) { return Math.max(min, Math.min(max, num)); }
function val(el) { return Number(el.value || 0); }
function cleanNeeded(n) {
  if (n <= 1) return '2+*';
  if (n >= 7) return 'Impossible';
  return `${n}+`;
}
function probabilityText(needed) {
  if (needed >= 7) return '0%';
  if (needed <= 2) return '83.3%';
  const success = (7 - needed) / 6;
  return `${(success * 100).toFixed(1)}%`;
}
function woundBase(strength, tough) {
  if (strength >= tough * 2) return 2;
  if (strength > tough) return 3;
  if (strength === tough) return 4;
  if (strength * 2 <= tough) return 6;
  return 5;
}
function parseDamage(dmg) {
  if (/^\d+$/.test(String(dmg))) return Number(dmg);
  return null;
}
function setTextIfPresent(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}
function parseAttacks(atk) {
  if (/^\d+$/.test(String(atk))) return Number(atk);
  return String(atk);
}
function hasAbility(weapon, keyword) {
  return (weapon.abilities || []).some(a => String(a).toLowerCase().includes(keyword.toLowerCase()));
}
function formatAttackExpression(base, bonus) {
  const text = String(base).trim();
  if (!bonus) return text;
  if (/^\d+$/.test(text)) return String(Number(text) + bonus);
  const m = text.match(/^(\d*)D(\d+)([+-]\d+)?$/i);
  if (m) {
    const prefix = m[1] ? m[1] : '';
    const die = `D${m[2]}`;
    const flat = Number(m[3] || 0) + bonus;
    if (flat === 0) return `${prefix}${die}`;
    return `${prefix}${die}${flat > 0 ? '+' : ''}${flat}`;
  }
  return `${text} + ${bonus}`;
}

const unitAbilityDatabase = window.WH40K_UNIT_ABILITY_DATABASE || { shared: {}, byDatasheet: {} };
const weaponAbilityDatabase = window.WH40K_WEAPON_ABILITY_DATABASE || { shared: {}, byDatasheet: {} };
const CONCISE_UNIT_TOOLTIPS = {
  'leader': 'Can attach to one eligible Bodyguard unit during deployment. While attached, they act as one unit until the Bodyguard is destroyed or a rule separates them.',
  'voice of command': 'This OFFICER can issue Orders to eligible friendly units, usually in your Command phase. Each unit is normally affected by only one Order at a time until your next Command phase.',
  'scouts 6"': 'Before the first turn begins, this unit can make a Normal move of up to 6".',
  'scouts 7"': 'Before the first turn begins, this unit can make a Normal move of up to 7".',
  'scouts 8"': 'Before the first turn begins, this unit can make a Normal move of up to 8".',
  'scouts 9"': 'Before the first turn begins, this unit can make a Normal move of up to 9".',
  'reanimation protocols': 'At the end of your Command phase, this unit can return destroyed models or regain wounds, depending on the unit and remaining space in coherency.',
  'oath of moment': 'You select an enemy unit as your army’s Oath target. Space Marines gain improved focus into that target for the round.',
  'acts of faith': 'This unit can perform an Act of Faith by using Miracle dice to replace one or more rolls when allowed by the rule.',
  'cult ambush': 'Destroyed Genestealer Cults units can be set aside for possible return later using the army’s Cult Ambush / Resurgence rules.',
  'battle focus': 'Your army gains a limited number of Battle Focus tokens each round to fuel movement or agility effects from the army rule.',
  'code chivalric': 'Imperial Knights follow an Oath for the round, unlocking army-wide bonuses tied to that chosen code.',
  'blessings of khorne': 'At the start of the battle round, roll Blessings dice and spend matching results to activate World Eaters army buffs for that round.',
  'power from pain': 'Drukhari units become Empowered through Pain tokens, unlocking their Pain abilities while empowered.',
  'harbingers of dread': 'Chaos Knights apply Dread abilities to pressure enemy units as the battle progresses.',
  'the shadow of chaos': 'Areas of the battlefield can become part of the Shadow of Chaos, empowering Daemons and enabling extra army-rule effects there.',
  'doctrina imperatives': 'At the start of the battle round, choose one Doctrina Imperative; Ad Mech units with the rule gain that round’s listed bonus.',
  'cabal of sorcerers': 'In your Shooting phase, one or more eligible Thousand Sons Psykers can attempt Rituals, each usually once per turn.',
  'mission tactics': 'At the start of your Command phase, choose one Mission Tactic that applies army-wide until your next Command phase. Each tactic can normally be chosen only once per battle.',
  'templar vows': 'At the start of the first battle round, select one Vow. That vow grants your Black Templars army its battle-wide bonus.',
  'prioritised efficiency': 'Leagues of Votann units switch between army-rule benefits depending on your current Yield points total.',
  'assigned agents': 'Agents of the Imperium choose an assigned doctrine / rule package during detachment setup, which determines their army-wide bonus.'
};
const PARAMETERIZED_WEAPON_RULES = {
  'rapid fire': 'Weapons with [RAPID FIRE X] in their profile are known as Rapid Fire weapons. Each time such a weapon targets a unit within half that weapon\'s range, the Attacks characteristic of that weapon is increased by the amount denoted by \'x\'. Example: A model targets a unit that is within half range of a weapon with an Attacks characteristic of 1 and the [RAPID FIRE X] ability. That weapon therefore makes two attacks at the target, and you make two Hit rolls. [RAPID FIRE X]: Increase the Attacks by \'x\' when targeting units within half range.',
  'sustained hits': 'Weapons with [SUSTAINED HITS X] in their profile are known as Sustained Hits weapons. Each time an attack is made with such a weapon, if a Critical Hit is rolled, that attack scores a number of additional hits on the target as denoted by \'x\'. Example: A model makes an attack with a melee weapon with the [SUSTAINED HITS X] ability. If the Hit roll is an unmodified 6 (a Critical Hit), then that attack scores a total of 1+x hits on the target. [SUSTAINED HITS X]: Each Critical Hit scores \'x\' additional hits on the target.',
  'melta': 'Weapons with [MELTA X] in their profile are known as Melta weapons. Each time an attack made with such a weapon targets a unit within half that weapon\'s range, that attack\'s Damage characteristic is increased by the amount denoted by \'x\'. Example: A model targets a unit that is within half range of a weapon with a Damage characteristic of D6 and the [MELTA X] ability. If that attack inflicts damage on the target, it inflicts D6+x damage. [MELTA X]: Increase the Damage by \'x\' when targeting units within half range.',
  'anti': 'Weapons with [ANTI-KEYWORD X+] in their profile are known as Anti weapons. Each time an attack is made with such a weapon against a target with the keyword after the word \'Anti-\', an unmodified Wound roll of \'x+\' scores a Critical Wound. Example: An attack made with an [ANTI-VEHICLE 4+] weapon will score a Critical Wound against - and so successfully wound - a VEHICLE unit on an unmodified Wound roll of 4+, while an attack made with an [ANTI-PSYKER 2+] weapon will score a Critical Wound against - and so successfully wound - a PSYKER unit on an unmodified Wound roll of 2+. [ANTI-KEYWORD X+]: An unmodified Wound roll of \'x+\' against a target with the matching keyword scores a Critical Wound.'
};
const CONCISE_WEAPON_TOOLTIPS = {
  'hazardous': 'After this unit finishes shooting or fighting, make one Hazardous test for each Hazardous weapon used. Failed tests inflict mortal wounds on the bearer.',
  'indirect fire': 'This weapon can target enemies that are not visible to the bearer, but indirect shots are less accurate and easier to save against.',
  'pistol': 'This unit can shoot Pistols while within Engagement Range, but if it does, it normally cannot shoot its other non-Pistol weapons.',
  'devastating wounds': 'Critical Wounds from this weapon bypass normal saving throws and are resolved as mortal damage per the rule.',
  'blast': 'Add 1 attack for every 5 models in the target unit. Blast weapons cannot be used to make attacks against units in Engagement Range.',
  'extra attacks': 'These attacks are made in addition to the bearer’s other melee weapon attacks; they do not replace its main weapon.',
  'precision': 'When attacking an Attached unit, successful wounds can be allocated to a visible CHARACTER in that unit.',
  'assault': 'This weapon can still be shot after the bearer’s unit Advanced.',
  'heavy': 'If the bearer’s unit Remained Stationary this turn, add 1 to Hit rolls made with this weapon.',
  'ignores cover': 'The target cannot gain the Benefit of Cover against attacks from this weapon.',
  'lance': 'If the bearer charged this turn, add 1 to Wound rolls made with this weapon.',
  'lethal hits': 'Critical Hits with this weapon automatically wound the target.',
  'twin-linked': 'You can re-roll Wound rolls made with this weapon.',
  'torrent': 'Attacks with this weapon automatically hit the target.'
};
const MAX_TOOLTIP_LENGTH = 420;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeAbilityKey(term) {
  return String(term || '')
    .trim()
    .replace(/[\u2018\u2019]/g, String.fromCharCode(39))
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function abilityLookup(db, datasheetLink, term) {
  const key = normalizeAbilityKey(term);
  if (!key) return '';
  if (datasheetLink && db.byDatasheet && db.byDatasheet[datasheetLink] && db.byDatasheet[datasheetLink][key]) {
    return db.byDatasheet[datasheetLink][key];
  }
  return (db.shared && db.shared[key]) || '';
}

function conciseTooltipOverride(term, options = {}) {
  const key = normalizeAbilityKey(term);
  if (!key) return '';
  if (options.kind === 'weapon') {
    return CONCISE_WEAPON_TOOLTIPS[key] || '';
  }
  return CONCISE_UNIT_TOOLTIPS[key] || '';
}

function sanitizeTooltipText(text) {
  return String(text || '')
    .replace(/\b([A-Z][A-Z' -]{3,})\1{1,}\b/g, '$1')
    .replace(/([A-Za-z])([A-Z][a-z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .replace(/^\s*([A-Z][A-Z ]{3,})\s*/g, '')
    .trim();
}

function shortenTooltipText(text) {
  const clean = sanitizeTooltipText(text);
  if (clean.length <= MAX_TOOLTIP_LENGTH) return clean;

  const sentences = clean.match(/[^.!?]+[.!?]+/g) || [];
  let summary = '';
  for (const sentence of sentences) {
    const next = `${summary} ${sentence}`.trim();
    if (next.length > 280) break;
    summary = next;
    if (summary.length >= 180) break;
  }

  if (summary) return `${summary} Summary shortened for in-app tooltip.`;
  return `${clean.slice(0, 280).trim()}...`;
}

function parameterizedWeaponRule(term) {
  const clean = String(term || '').trim();
  const normalized = normalizeAbilityKey(clean);
  if (!normalized) return '';

  const antiMatch = normalized.match(/^anti-[a-z-]+\s+([0-9]+\+)$/);
  if (antiMatch) {
    return PARAMETERIZED_WEAPON_RULES.anti.replaceAll('KEYWORD', clean.replace(/^anti-/i, '').replace(/\s+[0-9]+\+$/i, '').toUpperCase()).replaceAll('X', antiMatch[1]);
  }

  const match = normalized.match(/^(rapid fire|sustained hits|melta)\s+([a-z0-9+]+)$/i);
  if (!match) return '';

  const [, baseRule, value] = match;
  const template = PARAMETERIZED_WEAPON_RULES[baseRule];
  return template ? template.replaceAll('X', value.toUpperCase()) : '';
}

function formatWeaponAbilityLabel(term) {
  return String(term || '')
    .trim()
    .toLowerCase()
    .replace(/\b([a-z])/g, char => char.toUpperCase())
    .replace(/-([a-z])/g, (_, char) => `-${char.toUpperCase()}`);
}

function getTooltipText(term, options = {}) {
  const clean = String(term || '').trim();
  if (!clean) return '';
  const override = conciseTooltipOverride(clean, options);
  if (override) return override;
  const datasheetLink = options.datasheetLink || '';
  let tooltip = '';
  if (options.kind === 'weapon') {
    tooltip = abilityLookup(weaponAbilityDatabase, datasheetLink, clean)
      || parameterizedWeaponRule(clean)
      || abilityLookup(unitAbilityDatabase, datasheetLink, clean);
  } else {
    tooltip = abilityLookup(unitAbilityDatabase, datasheetLink, clean);
  }
  return shortenTooltipText(tooltip);
}

function tooltipWrap(term, options = {}) {
  const clean = String(term || '').trim();
  const tooltip = getTooltipText(clean, options);
  const label = options.kind === 'weapon' ? formatWeaponAbilityLabel(clean) : clean;
  if (!tooltip) return escapeHtml(label);
  return `<span class="tooltip-term" tabindex="0" data-tooltip="${escapeHtml(tooltip)}">${escapeHtml(label)}</span>`;
}

function renderTooltipList(items, options = {}) {
  if (!items || !items.length) return 'None';
  return items.map(item => tooltipWrap(item, options)).join(', ');
}

let activeTooltipTerm = null;
let floatingTooltip = null;

function ensureFloatingTooltip() {
  if (floatingTooltip) return floatingTooltip;
  floatingTooltip = document.createElement('div');
  floatingTooltip.className = 'floating-tooltip';
  floatingTooltip.hidden = true;
  document.body.appendChild(floatingTooltip);
  return floatingTooltip;
}

function hideFloatingTooltip() {
  if (activeTooltipTerm) {
    activeTooltipTerm.classList.remove('active-tooltip');
    activeTooltipTerm = null;
  }
  if (floatingTooltip) {
    floatingTooltip.hidden = true;
    floatingTooltip.classList.remove('visible', 'below');
    floatingTooltip.textContent = '';
  }
}

function positionFloatingTooltip(term) {
  const tooltip = ensureFloatingTooltip();
  const margin = 12;
  const rect = term.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const centeredLeft = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  const left = Math.min(
    window.innerWidth - tooltipRect.width - margin,
    Math.max(margin, centeredLeft),
  );

  let top = rect.top - tooltipRect.height - 14;
  let below = false;
  if (top < margin) {
    top = rect.bottom + 14;
    below = true;
  }

  top = Math.min(
    window.innerHeight - tooltipRect.height - margin,
    Math.max(margin, top),
  );

  const arrowLeft = Math.min(
    tooltipRect.width - 16,
    Math.max(16, (rect.left + rect.width / 2) - left),
  );

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.setProperty('--tooltip-arrow-left', `${arrowLeft}px`);
  tooltip.classList.toggle('below', below);
}

function showFloatingTooltip(term) {
  const tooltipText = term?.dataset?.tooltip;
  if (!tooltipText) return;

  if (activeTooltipTerm === term && floatingTooltip && !floatingTooltip.hidden) {
    hideFloatingTooltip();
    return;
  }

  hideFloatingTooltip();
  activeTooltipTerm = term;
  activeTooltipTerm.classList.add('active-tooltip');

  const tooltip = ensureFloatingTooltip();
  tooltip.textContent = tooltipText;
  tooltip.hidden = false;
  tooltip.classList.remove('below');
  positionFloatingTooltip(term);
  requestAnimationFrame(() => {
    tooltip.classList.add('visible');
    positionFloatingTooltip(term);
  });
}

function bindTooltipInteractions(scope = document) {
  scope.querySelectorAll('.tooltip-term').forEach(term => {
    if (term.dataset.tooltipBound === 'true') return;
    term.dataset.tooltipBound = 'true';
    term.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      showFloatingTooltip(term);
    });
    term.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showFloatingTooltip(term);
      }
      if (event.key === 'Escape') {
        hideFloatingTooltip();
        term.blur();
      }
    });
    term.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        showFloatingTooltip(term);
      }
    });
  });
}

function renderUnitNotes(unit) {
  const datasheetLink = unit?.source?.datasheet || '';
  const explicitAbilities = Array.isArray(unit?.abilities) ? unit.abilities.filter(Boolean) : [];
  const sourceItems = explicitAbilities.length ? explicitAbilities : String(unit?.note || '').split(/\s*,\s*/).filter(Boolean);
  const abilityItems = sourceItems.filter(item => getTooltipText(item, { kind: 'unit', datasheetLink }));
  return abilityItems.length ? `Abilities: ${renderTooltipList(abilityItems, { kind: 'unit', datasheetLink })}` : 'None';
}

function renderUnitKeywords(unit) {
  const factionKeywords = Array.isArray(unit?.factionKeywords) ? unit.factionKeywords.filter(Boolean) : [];
  const keywords = Array.isArray(unit?.keywords) ? unit.keywords.filter(Boolean) : [];
  if (!factionKeywords.length && !keywords.length) return '';
  const tooltipLines = [];
  if (factionKeywords.length) tooltipLines.push(`Faction Keywords: ${factionKeywords.join(', ')}`);
  if (keywords.length) tooltipLines.push(`Keywords: ${keywords.join(', ')}`);
  const count = factionKeywords.length + keywords.length;
  return `Keywords: <span class="tooltip-term" tabindex="0" data-tooltip="${escapeHtml(tooltipLines.join('\n'))}">${count} listed</span>`;
}

function statCell(label, value) {
  return `<div class="datasheet-cell"><span class="datasheet-head">${label}</span><span class="datasheet-val">${value ?? '-'}</span></div>`;
}

function normalizeSave(value) {
  if (value === undefined || value === null || value === '') return '-';
  const text = String(value);
  return text.includes('+') ? text : `${text}+`;
}

function renderStatLineBar(name, stats) {
  return `
    <div class="datasheet-bar">
      ${name ? `<div class="datasheet-name">${name}</div>` : ''}
      <div class="datasheet-grid">
        ${statCell('M', stats.move ?? '-')}
        ${statCell('T', stats.toughness ?? '-')}
        ${statCell('SV', normalizeSave(stats.save))}
        ${statCell('W', stats.wounds ?? '-')}
        ${statCell('LD', stats.leadership ?? '-')}
        ${statCell('OC', stats.oc ?? '-')}
      </div>
    </div>
  `;
}

function renderUnitStatlines(unit) {
  const box = document.getElementById('statLineBox');
  if (!box) return;

  const bars = [];
  if (Array.isArray(unit.statlines) && unit.statlines.length) {
    unit.statlines.forEach(entry => {
      if (entry && entry.stats) {
        bars.push(renderStatLineBar(entry.label || '', entry.stats));
      }
    });
  } else if (unit.stats) {
    bars.push(renderStatLineBar('', unit.stats));
  }

  if (!bars.length) {
    box.innerHTML = '';
    return;
  }

  box.innerHTML = `
    <div class="datasheet-label">Stat Line</div>
    ${bars.join('')}
  `;
}

function getSelectedWeapon() {
  const unit = data.units[selectedCombatUnitName()];
  return unit?.weapons?.[weaponSelect.value];
}

function populateUnits() {
  unitSelect.innerHTML = '';
  const context = activeBattleAttackContext();
  if (activeCombatList) {
    activeCombatList.units.forEach((entry, index) => {
      if (context && entry.id !== context.unitId) return;
      if (!data.units?.[entry.unitName]) return;
      const opt = document.createElement('option');
      opt.value = entry.id;
      opt.textContent = formatRosterUnitTitle(entry, index);
      unitSelect.appendChild(opt);
    });
  } else {
    availableCombatUnitNames().forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      unitSelect.appendChild(opt);
    });
  }
  populateWeapons();
}

function populateWeapons() {
  const unitName = selectedCombatUnitName();
  const previousValue = weaponSelect.value;
  weaponSelect.innerHTML = '';
  availableCombatWeaponNames(unitName).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    weaponSelect.appendChild(opt);
  });
  if (previousValue && weaponSelect.querySelector(`option[value="${previousValue}"]`)) {
    weaponSelect.value = previousValue;
  }
  updateModelsFromSelectedWeapon();
  render();
}

function render() {
  renderCalculatorBattleMode();
  const unit = data.units[selectedCombatUnitName()];
  const weapon = getSelectedWeapon();
  if (!unit || !weapon) {
    document.getElementById('statLineBox').innerHTML = '';
    unitAbilitiesNote.innerHTML = '';
    unitKeywordsNote.innerHTML = '';
    dataSourceNote.innerHTML = '';
    targetAbilitiesNote.innerHTML = '';
    targetKeywordsNote.innerHTML = '';
    setTextIfPresent('phasePill', 'Phase: -');
    setTextIfPresent('weaponPill', 'Weapon: -');
    setTextIfPresent('attackSummary', 'Attacks: -');
    document.getElementById('profileBox').textContent = activeCombatList
      ? 'No matching units or weapons are configured in the loaded army list.'
      : 'No unit or weapon selected.';
    return;
  }
  const torrent = hasAbility(weapon, 'Torrent');
  const blast = hasAbility(weapon, 'Blast');
  const targetModelCount = Math.max(1, val(targetModels) || 1);
  const blastBonus = blast ? Math.floor(targetModelCount / 5) : 0;

  const targetUnit = targetData.units?.[targetUnitSelect.value];
  renderUnitStatlines(unit);
  unitAbilitiesNote.innerHTML = renderUnitNotes(unit);
  unitKeywordsNote.innerHTML = renderUnitKeywords(unit);
  targetAbilitiesNote.innerHTML = targetUnit ? renderUnitNotes(targetUnit) : '';
  targetKeywordsNote.innerHTML = targetUnit ? renderUnitKeywords(targetUnit) : '';
  setDataSourceNote(unit);
  setTextIfPresent('phasePill', `Phase: ${weapon.phase}`);
  setTextIfPresent('weaponPill', `${weapon.skillType} ${weapon.skill}+ | S ${weapon.strength} | AP ${weapon.ap} | D ${weapon.damage}`);

  const rawAttacksUsed = attacksOverride.value.trim() || weapon.attacks;
  let attackBonus = blastBonus;
  let rapidFireBonus = 0;
  if (rapidFireBox.checked) {
    const rapidFireAbility = (weapon.abilities || []).find(a => /^Rapid Fire\s*\d+/i.test(String(a)));
    if (rapidFireAbility) {
      const rapidFireMatch = String(rapidFireAbility).match(/^Rapid Fire\s*(\d+)/i);
      if (rapidFireMatch) rapidFireBonus = Number(rapidFireMatch[1]);
    }
  }
  attackBonus += rapidFireBonus;

  const attacksUsed = formatAttackExpression(rawAttacksUsed, attackBonus);
  setTextIfPresent('attackSummary', `Attacks: ${attacksUsed} per model${blast ? ` (includes Blast bonus of +${blastBonus} vs ${targetModelCount} target model(s))` : ''}${rapidFireBonus ? `${blast ? ';' : ' ('} Rapid Fire bonus of +${rapidFireBonus}${blast ? '' : ')'}` : ''}`);

  const totalAttackText = /^\d+$/.test(String(attacksUsed))
    ? `${Number(attacksUsed) * Number(modelsInput.value || 1)}`
    : `${attacksUsed} each`;
  document.getElementById('attacksBig').textContent = totalAttackText;
  document.getElementById('attacksBigExplain').textContent =
    `Using ${modelsInput.value} model(s) with ${attacksUsed} attack(s) each${blast ? `; Blast bonus included against ${targetModelCount} target model(s)` : ''}${rapidFireBonus ? `${blast ? ';' : ''} Rapid Fire active` : ''}.`;

  let hitNeeded = torrent ? 1 : weapon.skill - val(hitMod) - (heavyBox.checked ? 1 : 0);
  hitNeeded = clamp(hitNeeded, 1, 7);

  let woundNeeded = woundBase(Number(weapon.strength), val(toughness)) - val(woundMod);
  woundNeeded = clamp(woundNeeded, 2, 7);

  let effectiveAP = Number(weapon.ap) + val(apMod);
  if (armorContemptBox.checked && effectiveAP < 0) effectiveAP += 1;

  let armorSave = val(save) - effectiveAP;
  if (coverBox.checked && effectiveAP <= 0) armorSave = armorSave - 1;
  armorSave = armorSave - val(saveMod);
  armorSave = clamp(armorSave, 2, 7);

  let inv = invuln.value ? clamp(Number(invuln.value), 2, 7) : null;
  let finalSave = inv ? Math.min(armorSave, inv) : armorSave;

  const baseDamage = parseDamage(weapon.damage);
  let finalDamage = baseDamage !== null ? Math.max(1, baseDamage - val(damageReduction)) : weapon.damage;

  document.getElementById('hitNeeded').textContent = torrent ? 'Auto' : cleanNeeded(hitNeeded);
  document.getElementById('hitChance').textContent = `Chance: ${torrent ? '100%' : probabilityText(hitNeeded)}`;
  document.getElementById('hitExplain').textContent = torrent
    ? `Torrent detected, so this weapon automatically hits.`
    : `${weapon.skillType} ${weapon.skill}+ with net hit modifier ${val(hitMod) + (heavyBox.checked ? 1 : 0) >= 0 ? '+' : ''}${val(hitMod) + (heavyBox.checked ? 1 : 0)}.`;

  const woundChart = Number(weapon.strength) >= val(toughness) * 2 ? 'Strength is at least double Toughness.'
    : Number(weapon.strength) > val(toughness) ? 'Strength is greater than Toughness.'
    : Number(weapon.strength) === val(toughness) ? 'Strength equals Toughness.'
    : Number(weapon.strength) * 2 <= val(toughness) ? 'Strength is half Toughness or less.'
    : 'Strength is lower than Toughness.';
  document.getElementById('woundNeeded').textContent = cleanNeeded(woundNeeded);
  document.getElementById('woundChance').textContent = `Chance: ${probabilityText(woundNeeded)}`;
  document.getElementById('woundExplain').textContent = `${woundChart} Net wound modifier: ${val(woundMod) >= 0 ? '+' : ''}${val(woundMod)}.`;

  document.getElementById('saveNeeded').textContent = cleanNeeded(finalSave);
  document.getElementById('saveChance').textContent = `Chance: ${probabilityText(finalSave)}`;
  document.getElementById('saveExplain').textContent = `Base save ${val(save)}+, effective AP ${effectiveAP}, cover ${coverBox.checked ? 'on' : 'off'}, invulnerable ${inv ? inv + '+' : 'none'}. Defender succeeds on ${cleanNeeded(finalSave)}.`;

  document.getElementById('damageValue').textContent = `${finalDamage}`;
  document.getElementById('damageExplain').textContent = baseDamage !== null
    ? `Printed damage ${weapon.damage}; after damage reduction ${val(damageReduction)}, each failed save deals ${finalDamage}.`
    : `Printed damage is variable (${weapon.damage}), so the app leaves it variable.`;

  const resultCards = Array.from(document.querySelectorAll('.result'));
  resultCards.forEach(card => card.classList.remove('modified-result'));
  if (rapidFireBonus || blastBonus || attacksOverride.value.trim()) {
    const attackCard = document.getElementById('attacksBig').closest('.result');
    if (attackCard) attackCard.classList.add('modified-result');
  }
  if (val(hitMod) || heavyBox.checked) {
    const hitCard = document.getElementById('hitNeeded').closest('.result');
    if (hitCard) hitCard.classList.add('modified-result');
  }
  if (val(woundMod)) {
    const woundCard = document.getElementById('woundNeeded').closest('.result');
    if (woundCard) woundCard.classList.add('modified-result');
  }
  if (val(apMod) || val(saveMod) || coverBox.checked || armorContemptBox.checked || invuln.value) {
    const saveCard = document.getElementById('saveNeeded').closest('.result');
    if (saveCard) saveCard.classList.add('modified-result');
  }
  if (val(damageReduction)) {
    const damageCard = document.getElementById('damageValue').closest('.result');
    if (damageCard) damageCard.classList.add('modified-result');
  }

  document.getElementById('profileBox').innerHTML = `
    <strong>${weaponSelect.value}</strong><br>
    Phase: ${weapon.phase}<br>
    Type: ${weapon.type}<br>
    Range: ${weapon.range}<br>
    Attacks: ${attacksUsed}<br>
    ${weapon.skillType}: ${weapon.skill}+<br>
    Strength: ${weapon.strength}<br>
    AP: ${effectiveAP}<br>
    Damage: ${weapon.damage}<br>
    Abilities: ${renderTooltipList(weapon.abilities, { kind: 'weapon', datasheetLink: unit?.source?.datasheet || '' })}<br><br>
    Estimated total attacks from ${modelsInput.value} model(s): ${/^\d+$/.test(String(attacksUsed)) ? Number(attacksUsed) * Number(modelsInput.value || 1) : attacksUsed + ' each'}${blast ? `<br>Blast bonus auto-applied from target unit size: +${blastBonus} attack(s).` : ''}${torrent ? `<br>Torrent detected: skip the Hit roll and go straight to Wound rolls.` : ''}.
  `;
  bindTooltipInteractions();
}

[modelsInput, attacksOverride, hitMod, woundMod, apMod, saveMod, heavyBox, rapidFireBox, coverBox, armorContemptBox, toughness, save, invuln, damageReduction, targetModels].forEach(el => {
  el.addEventListener('input', render);
  el.addEventListener('change', render);
});


