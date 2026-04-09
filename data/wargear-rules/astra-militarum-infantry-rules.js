(function () {
  const labelWeapon = value => String(value)
    .replace(/[’‘]/g, "'")
    .replace(/\b\w/g, char => char.toUpperCase());

  const loadoutText = override => Object.entries(override || {})
    .filter(([, amount]) => Number(amount || 0) > 0)
    .map(([key, amount]) => `${amount > 1 ? amount + 'x ' : ''}${labelWeapon(key)}`)
    .join('; ');

  const fixed = (title, override = null) => {
    const description = override
      ? `Fixed loadout: ${loadoutText(override)}. No available wargear options.`
      : 'Fixed loadout shown from this datasheet. No available wargear options.';
    return {
      sections: [{ title, description }],
      quantities: ctx => ctx.base(override),
    };
  };

  const add = (ctx, q, key, amount = 1) => ctx.add(q, key, amount);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;
  const number = (ctx, key) => ctx.number(key);

  const heavyWeaponTeam = (baseWeapon, fixedWeapons) => ({
    sections: [{
      title: 'Heavy Weapons Teams',
      description: `Any number of models can each have their ${baseWeapon} replaced with one of the following: 1 autocannon; 1 lascannon; 1 missile launcher; 1 mortar.`,
      controls: [
        { key: 'autocannon', label: 'Autocannon', max: 3 },
        { key: 'lascannon', label: 'Lascannon', max: 3 },
        { key: 'missile_launcher', label: 'Missile launcher', max: 3 },
        { key: 'mortar', label: 'Mortar', max: 3 },
      ],
    }],
    quantities: ctx => {
      const autocannon = number(ctx, 'autocannon');
      const lascannon = number(ctx, 'lascannon');
      const missile = number(ctx, 'missile_launcher');
      const mortar = number(ctx, 'mortar');
      const upgrades = autocannon + lascannon + missile + mortar;
      if (upgrades > 3) ctx.errors.push(`Heavy weapon upgrades must total 3 or fewer; currently ${upgrades}.`);
      const q = {};
      add(ctx, q, baseWeapon, Math.max(0, 3 - upgrades));
      add(ctx, q, 'autocannon', autocannon);
      add(ctx, q, 'lascannon', lascannon);
      add(ctx, q, 'missile launcher', missile);
      add(ctx, q, 'mortar', mortar);
      Object.entries(fixedWeapons).forEach(([key, value]) => add(ctx, q, key, value));
      ctx.derived.push(`Unupgraded ${baseWeapon}: ${Math.max(0, 3 - upgrades)}. Upgrades: ${upgrades}/3.`);
      return q;
    },
  });

  window.ASTRA_MILITARUM_INFANTRY_RULE_CONFIGS = {
    'Artillery Team': {
      sections: [{ title: 'Artillery weapon', description: "This model's heavy mortar can be replaced with one of the following: 1 siege cannon; 1 heavy quad launcher; 1 multiple rocket launcher.", controls: [{ type: 'select', key: 'main', label: 'Artillery weapon', value: 'heavy mortar', options: [
        { value: 'heavy mortar', label: 'Heavy mortar' },
        { value: 'siege cannon', label: 'Siege cannon' },
        { value: 'heavy quad launcher', label: 'Heavy quad launcher' },
        { value: 'multiple rocket launcher', label: 'Multiple rocket launcher' },
      ] }] }],
      quantities: ctx => { const q = {}; add(ctx, q, select(ctx, 'main', 'heavy mortar'), 1); add(ctx, q, 'lasgun', 1); add(ctx, q, 'crew close combat weapons', 1); return q; },
    },

    'Field Ordnance Battery': {
      sections: [{ title: 'Ordnance Teams', description: 'Any number of models can each have their malleus rocket launcher replaced with one of the following: 1 bombast field gun; 1 heavy lascannon.', controls: [
        { key: 'bombast', label: 'Bombast field gun', max: 2 },
        { key: 'heavy_lascannon', label: 'Heavy lascannon', max: 2 },
      ] }],
      quantities: ctx => {
        const bombast = number(ctx, 'bombast');
        const lascannon = number(ctx, 'heavy_lascannon');
        const upgrades = bombast + lascannon;
        if (upgrades > 2) ctx.errors.push(`Field Ordnance weapon upgrades must total 2 or fewer; currently ${upgrades}.`);
        const q = {};
        add(ctx, q, 'malleus rocket launcher', Math.max(0, 2 - upgrades));
        add(ctx, q, 'bombast field gun', bombast);
        add(ctx, q, 'heavy lascannon', lascannon);
        add(ctx, q, 'lasgun', 2);
        add(ctx, q, 'laspistol', 2);
        add(ctx, q, 'battery close combat weapons', 2);
        ctx.derived.push(`Unupgraded malleus rocket launchers: ${Math.max(0, 2 - upgrades)}. Upgrades: ${upgrades}/2.`);
        return q;
      },
    },

    'Cadian Castellan': {
      sections: [{ title: 'Cadian Castellan', description: "This model's chainsword can be replaced with one of the following: 1 boltgun and 1 close combat weapon; 1 power fist; 1 power weapon. This model's laspistol can be replaced with one of the following: 1 bolt pistol; 1 plasma pistol.", controls: [
        { type: 'select', key: 'pistol', label: 'Pistol', value: 'laspistol', options: [{ value: 'laspistol', label: 'Laspistol' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { type: 'select', key: 'melee', label: 'Melee/loadout', value: 'chainsword', options: [{ value: 'chainsword', label: 'Chainsword' }, { value: 'boltgun', label: 'Boltgun and close combat weapon' }, { value: 'power fist', label: 'Power fist' }, { value: 'power weapon', label: 'Power weapon' }] },
      ] }],
      quantities: ctx => { const q = {}; add(ctx, q, select(ctx, 'pistol', 'laspistol'), 1); const melee = select(ctx, 'melee', 'chainsword'); if (melee === 'boltgun') { add(ctx, q, 'boltgun', 1); add(ctx, q, 'close combat weapon', 1); } else add(ctx, q, melee, 1); return q; },
    },

    'Commissar': {
      sections: [{ title: 'Commissar', description: "This model's bolt pistol can be replaced with 1 plasma pistol. This model's chainsword can be replaced with 1 power weapon.", controls: [
        { type: 'select', key: 'pistol', label: 'Pistol', value: 'bolt pistol', options: [{ value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { type: 'select', key: 'melee', label: 'Melee weapon', value: 'chainsword', options: [{ value: 'chainsword', label: 'Chainsword' }, { value: 'power weapon', label: 'Power weapon' }] },
      ] }],
      quantities: ctx => { const q = {}; add(ctx, q, select(ctx, 'pistol', 'bolt pistol'), 1); add(ctx, q, select(ctx, 'melee', 'chainsword'), 1); return q; },
    },

    'Ministorum Priest': {
      sections: [{ title: 'Ministorum Priest', description: "This model's zealot's vindictor can be replaced with 1 holy pistol and 1 power weapon.", controls: [{ type: 'select', key: 'loadout', label: 'Loadout', value: "zealot's vindictor", options: [{ value: "zealot's vindictor", label: "Zealot's vindictor" }, { value: 'holy pistol', label: 'Holy pistol and power weapon' }] }] }],
      quantities: ctx => { const q = {}; if (select(ctx, 'loadout', "zealot's vindictor") === 'holy pistol') { add(ctx, q, 'holy pistol', 1); add(ctx, q, 'power weapon', 1); } else add(ctx, q, "zealot's vindictor", 1); return q; },
    },

    'Ogryn Bodyguard': {
      sections: [{ title: 'Ogryn Bodyguard', description: "This model's ripper gun can be replaced with one of the following: 1 grenadier gauntlet; 1 Bullgryn maul. This model's huge knife can be replaced with one of the following: 1 brute shield; 1 slabshield.", controls: [
        { type: 'select', key: 'gun', label: 'Ripper gun replacement', value: 'ripper gun', options: [{ value: 'ripper gun', label: 'Ripper gun' }, { value: 'grenadier gauntlet', label: 'Grenadier gauntlet' }, { value: 'bullgryn maul', label: 'Bullgryn maul' }] },
        { type: 'select', key: 'knife', label: 'Huge knife replacement', value: 'huge knife', options: [{ value: 'huge knife', label: 'Huge knife' }, { value: 'brute shield', label: 'Brute shield' }, { value: 'slabshield', label: 'Slabshield' }] },
      ] }],
      quantities: ctx => { const q = {}; add(ctx, q, select(ctx, 'gun', 'ripper gun'), 1); add(ctx, q, 'close combat weapon', 1); add(ctx, q, select(ctx, 'knife', 'huge knife'), 1); return q; },
    },

    'Primaris Psyker': fixed('Primaris Psyker', { 'laspistol': 1, 'psychic maelstrom': 1, 'force weapon': 1 }),
    'Sly Marbo': fixed('Sly Marbo', { 'ripper pistol': 1, 'envenomed blade': 1 }),
    'Tech-Priest Enginseer': fixed('Tech-Priest Enginseer', { 'mechanicus pistol': 1, 'enginseer axe': 1, 'servo-arm': 1 }),
    'Ursula Creed': fixed('Ursula Creed', { 'duty and vengeance': 1, 'power weapon': 1 }),
    'Nork Deddog': fixed('Nork Deddog', { 'ripper gun': 1, 'huge knife': 1 }),
    'Ogryn Squad': fixed('Ogryn Squad', { 'ripper gun': 1 }),
    'Gaunt’s Ghosts': fixed('Gaunt’s Ghosts', { 'bolt pistol': 1, 'gaunt’s chainsword': 1, 'corbec’s hot-shot lascarbine': 1, 'rawne’s lascarbine': 1, 'larkin’s long-las': 1, 'bragg’s autocannon': 1, 'lascarbine': 1, 'straight silver knife': 4, 'mkoll’s straight silver knife': 1 }),

    'Catachan Jungle Fighters': {
      sections: [{ title: models => `Jungle Fighters (${models} models)`, description: "For every 10 models in this unit, 1 Jungle Fighter equipped with a lasgun can be equipped with 1 vox-caster (that model's lasgun cannot be replaced).", controls: [
        { key: 'vox', label: '1 vox-caster', max: models => Math.floor(Number(models || 0) / 10) },
      ] }, { title: models => `Jungle Fighter special weapons (${models} models)`, description: "For every 5 models in this unit, 1 Jungle Fighter's lasgun can be replaced with 1 flamer.", controls: [
        { key: 'flamer', label: '1 flamer', max: models => Math.floor(Number(models || 0) / 5) },
      ] }],
      quantities: ctx => { const sergeants = ctx.modelCount / 10; const troopers = ctx.modelCount - sergeants; const flamers = number(ctx, 'flamer'); const vox = number(ctx, 'vox'); if (flamers + vox > troopers) ctx.errors.push(`Jungle Fighter assignments exceed available models by ${flamers + vox - troopers}.`); const q = {}; add(ctx, q, 'laspistol', sergeants); add(ctx, q, 'close combat weapon', ctx.modelCount); add(ctx, q, 'lasgun', Math.max(0, troopers - flamers)); add(ctx, q, 'flamer', flamers); add(ctx, q, 'vox-caster', vox); ctx.derived.push(`Basic lasgun Jungle Fighters: ${Math.max(0, troopers - flamers)}.`); return q; },
    },

    'Kasrkin': {
      sections: [{ title: 'Kasrkin Sergeant', description: "The Kasrkin Sergeant's chainsword can be replaced with 1 power weapon. The Kasrkin Sergeant's hot-shot laspistol can be replaced with one of the following: 1 bolt pistol; 1 plasma pistol.", controls: [
        { type: 'select', key: 'sgt_pistol', label: 'Pistol', value: 'hot-shot laspistol', options: [{ value: 'hot-shot laspistol', label: 'Hot-shot laspistol' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { key: 'sgt_power', label: '1 power weapon', max: 1 },
      ] }, { title: 'Kasrkin Troopers', description: "Up to 4 Kasrkin Troopers can each have their hot-shot lasgun replaced with one of the following: 1 flamer; 1 grenade launcher; 1 hot-shot volley gun; 1 meltagun; 1 plasma gun. 1 Kasrkin Trooper's hot-shot lasgun can be replaced with 1 hot-shot marksman rifle. 1 Kasrkin Trooper's hot-shot lasgun can be replaced with 1 hot-shot laspistol and 1 melta mine. 1 Kasrkin Trooper equipped with a hot-shot lasgun can be equipped with 1 vox-caster (that model's hot-shot lasgun cannot be replaced). You cannot select the same weapon from this list more than twice per unit.", controls: [
        { key: 'flamer', label: '1 flamer', max: 2 }, { key: 'grenade', label: '1 grenade launcher', max: 2 }, { key: 'volley', label: '1 hot-shot volley gun', max: 2 }, { key: 'melta', label: '1 meltagun', max: 2 }, { key: 'plasma', label: '1 plasma gun', max: 2 }, { key: 'marksman', label: '1 hot-shot marksman rifle', max: 1 }, { key: 'mine', label: '1 hot-shot laspistol and 1 melta mine', max: 1 }, { key: 'vox', label: '1 vox-caster', max: 1 },
      ] }],
      quantities: ctx => { const v = {}; ['flamer','grenade','volley','melta','plasma','marksman','mine','vox'].forEach(k => v[k] = number(ctx, k)); const specials = v.flamer + v.grenade + v.volley + v.melta + v.plasma; const assigned = specials + v.marksman + v.mine + v.vox; if (specials > 4) ctx.errors.push(`Kasrkin special weapons must total 4 or fewer; currently ${specials}.`); if (assigned > 9) ctx.errors.push(`Kasrkin Trooper assignments exceed available Troopers by ${assigned - 9}.`); const q = {}; add(ctx, q, select(ctx, 'sgt_pistol', 'hot-shot laspistol'), 1); add(ctx, q, number(ctx, 'sgt_power') ? 'power weapon' : 'chainsword', 1); add(ctx, q, 'close combat weapon', 9); add(ctx, q, 'hot-shot lasgun', Math.max(0, 9 - assigned) + v.vox); add(ctx, q, 'flamer', v.flamer); add(ctx, q, 'grenade launcher', v.grenade); add(ctx, q, 'hot-shot volley gun', v.volley); add(ctx, q, 'meltagun', v.melta); add(ctx, q, 'plasma gun', v.plasma); add(ctx, q, 'hot-shot marksman rifle', v.marksman); add(ctx, q, 'hot-shot laspistol', v.mine); add(ctx, q, 'melta mine', v.mine); add(ctx, q, 'vox-caster', v.vox); ctx.derived.push(`Basic hot-shot lasgun Troopers: ${Math.max(0, 9 - assigned)}.`); return q; },
    },

    'Tempestus Scions': {
      sections: [{ title: 'Tempestor', description: "The Tempestor's chainsword can be replaced with one of the following: 1 power fist; 1 power weapon. The Tempestor's hot-shot laspistol can be replaced with one of the following: 1 bolt pistol; 1 plasma pistol.", controls: [
        { type: 'select', key: 'sgt_pistol', label: 'Pistol', value: 'hot-shot laspistol', options: [{ value: 'hot-shot laspistol', label: 'Hot-shot laspistol' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { type: 'select', key: 'sgt_melee', label: 'Melee weapon', value: 'chainsword', options: [{ value: 'chainsword', label: 'Chainsword' }, { value: 'power fist', label: 'Power fist' }, { value: 'power weapon', label: 'Power weapon' }] },
      ] }, { title: models => `Tempestus Scion vox-caster (${Math.max(0, Number(models || 0) - 1)} Scions)`, description: "1 Tempestus Scion's hot-shot lasgun can be replaced with 1 hot-shot laspistol and 1 vox-caster.", controls: [
        { key: 'vox', label: '1 hot-shot laspistol and 1 vox-caster', max: 1 },
      ] }, { title: models => `Tempestus Scion special weapons (${Math.max(0, Number(models || 0) - 1)} Scions)`, description: models => `For every 5 models in this unit, up to two Tempestus Scions can each have their hot-shot lasgun replaced with one of the following: 1 flamer; 1 grenade launcher; 1 hot-shot volley gun; 1 meltagun; 1 plasma gun. You cannot select the same weapon from this list more than once per unit, unless this unit contains 10 models, in which case you cannot select the same weapon more than twice per unit.`, controls: [
        { key: 'flamer', label: '1 flamer', max: models => Number(models || 0) >= 10 ? 2 : 1 }, { key: 'grenade', label: '1 grenade launcher', max: models => Number(models || 0) >= 10 ? 2 : 1 }, { key: 'volley', label: '1 hot-shot volley gun', max: models => Number(models || 0) >= 10 ? 2 : 1 }, { key: 'melta', label: '1 meltagun', max: models => Number(models || 0) >= 10 ? 2 : 1 }, { key: 'plasma', label: '1 plasma gun', max: models => Number(models || 0) >= 10 ? 2 : 1 },
      ] }],
      quantities: ctx => { const v = {}; ['flamer','grenade','volley','melta','plasma','vox'].forEach(k => v[k] = number(ctx, k)); const scions = ctx.modelCount - 1; const maxSpecials = Math.floor(ctx.modelCount / 5) * 2; const specials = v.flamer + v.grenade + v.volley + v.melta + v.plasma; const assigned = specials + v.vox; if (specials > maxSpecials) ctx.errors.push(`Tempestus Scion special weapons must total ${maxSpecials} or fewer; currently ${specials}.`); if (assigned > scions) ctx.errors.push(`Tempestus Scion assignments exceed available Scions by ${assigned - scions}.`); const q = {}; add(ctx, q, select(ctx, 'sgt_pistol', 'hot-shot laspistol'), 1); add(ctx, q, select(ctx, 'sgt_melee', 'chainsword'), 1); add(ctx, q, 'close combat weapon', scions); add(ctx, q, 'hot-shot lasgun', Math.max(0, scions - assigned)); add(ctx, q, 'flamer', v.flamer); add(ctx, q, 'grenade launcher', v.grenade); add(ctx, q, 'hot-shot volley gun', v.volley); add(ctx, q, 'meltagun', v.melta); add(ctx, q, 'plasma gun', v.plasma); add(ctx, q, 'hot-shot laspistol', v.vox); add(ctx, q, 'vox-caster', v.vox); ctx.derived.push(`Basic hot-shot lasgun Scions: ${Math.max(0, scions - assigned)}.`); return q; },
    },

    'Cadian Heavy Weapons Squad': heavyWeaponTeam('heavy bolter', { 'laspistol': 3, 'weapons team close combat weapons': 3 }),
    'Catachan Heavy Weapons Squad': heavyWeaponTeam('heavy bolter', { 'lasgun': 3, 'weapons team close combat weapons': 3 }),

    'Krieg Heavy Weapons Squad': {
      sections: [{ title: 'Heavy Weapons Gunners', description: "Any number of models can each have their lascannon replaced with one of the following: 1 Krieg heavy flamer; 1 twin Krieg heavy stubber.", controls: [{ key: 'flamer', label: '1 Krieg heavy flamer', max: 3 }, { key: 'stubber', label: '1 twin Krieg heavy stubber', max: 3 }] }],
      quantities: ctx => { const flamer = number(ctx, 'flamer'); const stubber = number(ctx, 'stubber'); const upgrades = flamer + stubber; if (upgrades > 3) ctx.errors.push(`Krieg Heavy Weapons upgrades must total 3 or fewer; currently ${upgrades}.`); const q = {}; add(ctx, q, 'lascannon', Math.max(0, 3 - upgrades)); add(ctx, q, 'krieg heavy flamer', flamer); add(ctx, q, 'twin krieg heavy stubber', stubber); add(ctx, q, 'laspistol', 4); add(ctx, q, 'close combat weapon', 4); ctx.derived.push(`Unupgraded lascannons: ${Math.max(0, 3 - upgrades)}.`); return q; },
    },

    'Ratlings': {
      sections: [{ title: models => `Ratlings (${models} models)`, description: "If this unit contains 10 models, one model's sniper rifle can be replaced with 1 tankstopper rifle. If this unit contains 10 models, one model can be equipped with demolition gear. If this unit contains 10 models, it can be equipped with one Ratling Battlemutt.", controls: [
        { key: 'tankstopper', label: '1 tankstopper rifle', max: models => Number(models) >= 10 ? 1 : 0 }, { key: 'demo', label: 'Demolition gear', max: models => Number(models) >= 10 ? 1 : 0 }, { key: 'battlemutt', label: '1 Ratling Battlemutt', max: models => Number(models) >= 10 ? 1 : 0 },
      ] }],
      quantities: ctx => { const tank = number(ctx, 'tankstopper'); const q = {}; add(ctx, q, 'sniper rifle', Math.max(0, ctx.modelCount - tank)); add(ctx, q, 'tankstopper rifle', tank); add(ctx, q, 'close combat weapon', ctx.modelCount); add(ctx, q, 'demolition gear', number(ctx, 'demo')); add(ctx, q, 'ratling battlemutt', number(ctx, 'battlemutt')); return q; },
    },

    'Bullgryn Squad': {
      sections: [{ title: models => `Bullgryns (${models} models)`, description: 'Any number of models can each have their grenadier gauntlet replaced with 1 Bullgryn maul. Any number of models can each have their slabshield replaced with 1 brute shield.', controls: [{ key: 'maul', label: '1 Bullgryn maul', max: models => Number(models || 0) }, { key: 'brute', label: '1 brute shield', max: models => Number(models || 0) }] }],
      quantities: ctx => { const maul = number(ctx, 'maul'); const brute = number(ctx, 'brute'); const q = {}; add(ctx, q, 'grenadier gauntlet', Math.max(0, ctx.modelCount - maul)); add(ctx, q, 'bullgryn maul', maul); add(ctx, q, 'close combat weapon', ctx.modelCount); add(ctx, q, 'slabshield', Math.max(0, ctx.modelCount - brute)); add(ctx, q, 'brute shield', brute); return q; },
    },

    'Krieg Combat Engineers': {
      sections: [{ title: models => `Krieg Combat Engineers (${models} models)`, description: '1 Krieg Combat Engineer can be equipped with 1 flamer and 1 close combat weapon. 1 Krieg Combat Engineer can be equipped with 1 autopistol, 1 remote mine and 1 close combat weapon. Any number of Krieg Combat Engineers can each replace their autopistol and trench club with 1 combat shotgun and 1 close combat weapon.', controls: [
        { key: 'flamer', label: '1 flamer and 1 close combat weapon', max: 1 }, { key: 'remote_mine', label: '1 autopistol, 1 remote mine, and 1 close combat weapon', max: 1 }, { key: 'shotgun', label: '1 combat shotgun and 1 close combat weapon', max: models => Math.max(0, Number(models || 0) - 1) },
      ] }, { title: 'Krieg Engineer Watchmaster', description: "The Krieg Engineer Watchmaster's autopistol can be replaced with one of the following: 1 bolt pistol; 1 hand flamer; 1 plasma pistol. The Krieg Engineer Watchmaster's trench club can be replaced with one of the following: 1 chainsword; 1 power weapon.", controls: [
        { type: 'select', key: 'watch_pistol', label: 'Pistol', value: 'autopistol', options: [{ value: 'autopistol', label: 'Autopistol' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'hand flamer', label: 'Hand flamer' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { type: 'select', key: 'watch_melee', label: 'Melee weapon', value: 'trench club', options: [{ value: 'trench club', label: 'Trench club' }, { value: 'chainsword', label: 'Chainsword' }, { value: 'power weapon', label: 'Power weapon' }] },
      ] }],
      quantities: ctx => { const engineers = ctx.modelCount - 1; const flamer = number(ctx, 'flamer'); const remote = number(ctx, 'remote_mine'); const shotgun = number(ctx, 'shotgun'); const assigned = flamer + remote + shotgun; if (assigned > engineers) ctx.errors.push(`Engineer assignments exceed available Engineers by ${assigned - engineers}.`); const basic = Math.max(0, engineers - assigned); const q = {}; add(ctx, q, select(ctx, 'watch_pistol', 'autopistol'), 1); add(ctx, q, select(ctx, 'watch_melee', 'trench club'), 1); add(ctx, q, 'autopistol', basic + remote); add(ctx, q, 'trench club', basic); add(ctx, q, 'flamer', flamer); add(ctx, q, 'remote mine', remote); add(ctx, q, 'combat shotgun', shotgun); add(ctx, q, 'close combat weapon', flamer + remote + shotgun); ctx.derived.push(`Basic autopistol/trench club Engineers: ${basic}.`); return q; },
    },

    'Tempestus Aquilons': {
      sections: [{ title: 'Tempestor Aquilon', description: "The Tempestor Aquilon's sentry flamer can be replaced with one of the following: 1 sentry hot-shot volley gun; 1 sentry grenade launcher. The Tempestor Aquilon's hot-shot lascarbine can be replaced with one of the following: 1 chainsword; 1 power weapon; 1 hot-shot laspistol. The Tempestor Aquilon can be equipped with one of the following: 1 bolt pistol; 1 hot-shot laspistol.", controls: [
        { type: 'select', key: 'sentry', label: 'Sentry weapon', value: 'sentry flamer', options: [{ value: 'sentry flamer', label: 'Sentry flamer' }, { value: 'sentry hot-shot volley gun', label: 'Sentry hot-shot volley gun' }, { value: 'sentry grenade launcher', label: 'Sentry grenade launcher' }] },
        { type: 'select', key: 'tempestor_carbine', label: 'Lascarbine replacement', value: '', options: [{ value: '', label: 'None' }, { value: 'chainsword', label: 'Chainsword' }, { value: 'power weapon', label: 'Power weapon' }, { value: 'hot-shot laspistol', label: 'Hot-shot laspistol' }] },
        { type: 'select', key: 'tempestor_pistol', label: 'Additional pistol', value: '', options: [{ value: '', label: 'None' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'hot-shot laspistol', label: 'Hot-shot laspistol' }] },
      ] }, { title: 'Tempestus Aquilons', description: "One Tempestus Aquilon's hot-shot lascarbine can be replaced with 1 melta carbine. One Tempestus Aquilon's hot-shot lascarbine can be replaced with 1 plasma carbine. One Tempestus Aquilon's hot-shot lascarbine can be replaced with 2 hot-shot laspistols. One Tempestus Aquilon's hot-shot lascarbine can be replaced with 1 hot-shot long-las. Up to two Tempestus Aquilons can each have their hot-shot lascarbine replaced with 1 hot-shot laspistol.", controls: [
        { key: 'melta', label: '1 melta carbine', max: 1 }, { key: 'plasma', label: '1 plasma carbine', max: 1 }, { key: 'double_pistol', label: '2 hot-shot laspistols', max: 1 }, { key: 'longlas', label: '1 hot-shot long-las', max: 1 }, { key: 'pistol', label: '1 hot-shot laspistol', max: 2 },
      ] }],
      quantities: ctx => { const v = {}; ['melta','plasma','double_pistol','longlas','pistol'].forEach(k => v[k] = number(ctx, k)); const assigned = v.melta + v.plasma + v.double_pistol + v.longlas + v.pistol; if (assigned > 9) ctx.errors.push(`Tempestus Aquilon assignments exceed available Aquilons by ${assigned - 9}.`); const q = {}; const carbineReplacement = select(ctx, 'tempestor_carbine', ''); add(ctx, q, 'hot-shot lascarbine', Math.max(0, 9 - assigned) + (carbineReplacement ? 0 : 1)); add(ctx, q, select(ctx, 'sentry', 'sentry flamer'), 1); add(ctx, q, 'close combat weapon', 10); add(ctx, q, carbineReplacement, 1); add(ctx, q, select(ctx, 'tempestor_pistol', ''), 1); add(ctx, q, 'melta carbine', v.melta); add(ctx, q, 'plasma carbine', v.plasma); add(ctx, q, 'hot-shot laspistol', (v.double_pistol * 2) + v.pistol); add(ctx, q, 'hot-shot long-las', v.longlas); ctx.derived.push(`Basic hot-shot lascarbine Aquilons: ${Math.max(0, 9 - assigned)}.`); return q; },
    },

    'Cadian Command Squad': {
      sections: [{ title: 'Cadian Commander', description: "The Cadian Commander's laspistol can be replaced with one of the following: 1 bolt pistol; 1 plasma pistol. The Cadian Commander's chainsword can be replaced with one of the following: 1 power fist; 1 power weapon.", controls: [
        { type: 'select', key: 'cmd_pistol', label: '1 bolt pistol or 1 plasma pistol', value: 'laspistol', options: [{ value: 'laspistol', label: 'Laspistol' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { type: 'select', key: 'cmd_melee', label: '1 power fist or 1 power weapon', value: 'chainsword', options: [{ value: 'chainsword', label: 'Chainsword' }, { value: 'power fist', label: 'Power fist' }, { value: 'power weapon', label: 'Power weapon' }] },
      ] }, { title: 'Veteran Guardsman with chainsword', description: "1 Cadian Veteran Guardsman's laspistol can be replaced with one of the following: 1 bolt pistol; 1 plasma pistol. 1 Cadian Veteran Guardsman's chainsword can be replaced with one of the following: 1 flamer and 1 close combat weapon; 1 grenade launcher and 1 close combat weapon; 1 meltagun and 1 close combat weapon; 1 plasma gun and 1 close combat weapon; 1 power fist; 1 power weapon.", controls: [
        { type: 'select', key: 'vet_pistol', label: '1 bolt pistol or 1 plasma pistol', value: 'laspistol', options: [{ value: 'laspistol', label: 'Laspistol' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { type: 'select', key: 'vet_melee', label: 'Replacement', value: 'chainsword', options: [{ value: 'chainsword', label: 'Chainsword' }, { value: 'flamer', label: 'Flamer and close combat weapon' }, { value: 'grenade launcher', label: 'Grenade launcher and close combat weapon' }, { value: 'meltagun', label: 'Meltagun and close combat weapon' }, { value: 'plasma gun', label: 'Plasma gun and close combat weapon' }, { value: 'power fist', label: 'Power fist' }, { value: 'power weapon', label: 'Power weapon' }] },
      ] }, { title: 'Veteran Guardsman with regimental standard', description: "1 Cadian Veteran Guardsman's lasgun and regimental standard can be replaced with one of the following: 1 flamer; 1 grenade launcher; 1 meltagun; 1 plasma gun.", controls: [{ type: 'select', key: 'standard', label: 'Replacement', value: '', options: [{ value: '', label: 'None' }, { value: 'flamer', label: 'Flamer' }, { value: 'grenade launcher', label: 'Grenade launcher' }, { value: 'meltagun', label: 'Meltagun' }, { value: 'plasma gun', label: 'Plasma gun' }] }] }, { title: 'Fixed Veteran Guardsmen', description: 'Fixed loadout: 1 master vox Veteran Guardsman and 1 medi-pack Veteran Guardsman, each with a lasgun and close combat weapon. No available wargear options.', controls: [] }],
      quantities: ctx => { const q = {}; const vetMelee = select(ctx, 'vet_melee', 'chainsword'); const standard = select(ctx, 'standard', ''); add(ctx, q, select(ctx, 'cmd_pistol', 'laspistol'), 1); add(ctx, q, select(ctx, 'cmd_melee', 'chainsword'), 1); add(ctx, q, select(ctx, 'vet_pistol', 'laspistol'), 1); if (['flamer','grenade launcher','meltagun','plasma gun'].includes(vetMelee)) { add(ctx, q, vetMelee, 1); add(ctx, q, 'close combat weapon', 1); } else add(ctx, q, vetMelee, 1); add(ctx, q, 'lasgun', 2 + (standard ? 0 : 1)); add(ctx, q, 'close combat weapon', 3); add(ctx, q, 'master vox', 1); add(ctx, q, 'medi-pack', 1); add(ctx, q, 'regimental standard', standard ? 0 : 1); add(ctx, q, standard, 1); return q; },
    },

    'Catachan Command Squad': {
      sections: [{ title: 'Catachan Commander', description: "The Catachan Commander's laspistol can be replaced with one of the following: 1 bolt pistol; 1 plasma pistol. The Catachan Commander can be equipped with one of the following: 1 boltgun; 1 chainsword; 1 power fist; 1 power weapon.", controls: [
        { type: 'select', key: 'cmd_pistol', label: '1 bolt pistol or 1 plasma pistol', value: 'laspistol', options: [{ value: 'laspistol', label: 'Laspistol' }, { value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }] },
        { type: 'select', key: 'cmd_weapon', label: 'Commander extra weapon', value: 'close combat weapon', options: [{ value: 'close combat weapon', label: 'Close combat weapon' }, { value: 'boltgun', label: 'Boltgun' }, { value: 'chainsword', label: 'Chainsword' }, { value: 'power fist', label: 'Power fist' }, { value: 'power weapon', label: 'Power weapon' }] },
      ] }, { title: 'Veteran Guardsman support gear', description: 'Veteran Guardsman equipped with a lasgun can be equipped with 1 master vox. Veteran Guardsman equipped with a lasgun can be equipped with 1 medi-pack. 1 Veteran Guardsman equipped with a lasgun can be equipped with 1 regimental standard. A model can only take one of these options.', controls: [
        { key: 'master_vox', label: '1 master vox', max: 1 }, { key: 'medi', label: '1 medi-pack', max: 1 }, { key: 'standard', label: '1 regimental standard', max: 1 },
      ] }, { title: 'Veteran Guardsman special weapons', description: 'Any number of Veteran Guardsmen can each have their lasgun replaced with one of the following: 1 flamer; 1 grenade launcher; 1 heavy flamer; 1 meltagun; 1 plasma gun; 1 sniper rifle.', controls: [
        { key: 'flamer', label: '1 flamer', max: 1 }, { key: 'grenade', label: '1 grenade launcher', max: 1 }, { key: 'heavy_flamer', label: '1 heavy flamer', max: 1 }, { key: 'melta', label: '1 meltagun', max: 1 }, { key: 'plasma', label: '1 plasma gun', max: 1 }, { key: 'sniper', label: '1 sniper rifle', max: 1 },
      ] }],
      quantities: ctx => { const v = {}; ['flamer','grenade','heavy_flamer','melta','plasma','sniper','master_vox','medi','standard'].forEach(k => v[k] = number(ctx, k)); const special = v.flamer + v.grenade + v.heavy_flamer + v.melta + v.plasma + v.sniper; const support = v.master_vox + v.medi + v.standard; if (special + support > 4) ctx.errors.push(`Veteran Guardsman assignments exceed available Veterans by ${special + support - 4}.`); const q = {}; add(ctx, q, select(ctx, 'cmd_pistol', 'laspistol'), 1); add(ctx, q, select(ctx, 'cmd_weapon', 'close combat weapon'), 1); add(ctx, q, 'lasgun', Math.max(0, 4 - special)); add(ctx, q, 'laspistol', 4); add(ctx, q, 'close combat weapon', 4); add(ctx, q, 'flamer', v.flamer); add(ctx, q, 'grenade launcher', v.grenade); add(ctx, q, 'heavy flamer', v.heavy_flamer); add(ctx, q, 'meltagun', v.melta); add(ctx, q, 'plasma gun', v.plasma); add(ctx, q, 'sniper rifle', v.sniper); add(ctx, q, 'master vox', v.master_vox); add(ctx, q, 'medi-pack', v.medi); add(ctx, q, 'regimental standard', v.standard); return q; },
    },

    'Militarum Tempestus Command Squad': {
      sections: [{ title: 'Tempestor Prime', description: "The Tempestor Prime's bolt pistol can be replaced with one of the following: 1 plasma pistol; 1 command rod.", controls: [{ type: 'select', key: 'prime_pistol', label: '1 plasma pistol or 1 command rod', value: 'bolt pistol', options: [{ value: 'bolt pistol', label: 'Bolt pistol' }, { value: 'plasma pistol', label: 'Plasma pistol' }, { value: 'command rod', label: 'Command rod' }] }] }, { title: 'Tempestus Scion support gear', description: "1 Tempestus Scion equipped with a hot-shot lasgun can be equipped with 1 regimental standard (that model's hot-shot lasgun cannot be replaced). 1 Tempestus Scion's hot-shot lasgun can be replaced with 1 hot-shot laspistol and 1 master vox. 1 Tempestus Scion's hot-shot lasgun can be replaced with one of the following: 1 hot-shot laspistol and 1 medi-pack; 1 hot-shot lasgun, 1 hot-shot laspistol and 1 medi-pack [that model's hot-shot lasgun cannot be replaced].", controls: [
        { key: 'standard', label: '1 regimental standard', max: 1 }, { key: 'vox', label: '1 hot-shot laspistol and 1 master vox', max: 1 }, { key: 'medi_pistol', label: '1 hot-shot laspistol and 1 medi-pack', max: 1 }, { key: 'medi_lasgun', label: '1 hot-shot lasgun, 1 hot-shot laspistol, and 1 medi-pack', max: 1 },
      ] }, { title: 'Tempestus Scion special weapons', description: 'Any number of Tempestus Scions can each have their hot-shot lasgun replaced with one of the following: 1 flamer; 1 grenade launcher; 1 hot-shot volley gun; 1 meltagun; 1 plasma gun. You cannot select the same weapon from this list more than once per unit.', controls: [
        { key: 'flamer', label: '1 flamer', max: 1 }, { key: 'grenade', label: '1 grenade launcher', max: 1 }, { key: 'volley', label: '1 hot-shot volley gun', max: 1 }, { key: 'melta', label: '1 meltagun', max: 1 }, { key: 'plasma', label: '1 plasma gun', max: 1 },
      ] }],
      quantities: ctx => { const v = {}; ['flamer','grenade','volley','melta','plasma','standard','vox','medi_pistol','medi_lasgun'].forEach(k => v[k] = number(ctx, k)); const special = v.flamer + v.grenade + v.volley + v.melta + v.plasma; const support = v.standard + v.vox + v.medi_pistol + v.medi_lasgun; if (special + support > 4) ctx.errors.push(`Tempestus Scion assignments exceed available Scions by ${special + support - 4}.`); const q = {}; const prime = select(ctx, 'prime_pistol', 'bolt pistol'); if (prime === 'command rod') add(ctx, q, 'command rod', 1); else add(ctx, q, prime, 1); add(ctx, q, 'tempestus dagger', 1); add(ctx, q, 'close combat weapon', 4); add(ctx, q, 'hot-shot lasgun', Math.max(0, 4 - special - v.vox - v.medi_pistol) + v.standard + v.medi_lasgun); add(ctx, q, 'flamer', v.flamer); add(ctx, q, 'grenade launcher', v.grenade); add(ctx, q, 'hot-shot volley gun', v.volley); add(ctx, q, 'meltagun', v.melta); add(ctx, q, 'plasma gun', v.plasma); add(ctx, q, 'regimental standard', v.standard); add(ctx, q, 'hot-shot laspistol', v.vox + v.medi_pistol + v.medi_lasgun); add(ctx, q, 'master vox', v.vox); add(ctx, q, 'medi-pack', v.medi_pistol + v.medi_lasgun); return q; },
    },
    'Attilan Rough Riders': {
      sections: [{
        title: models => `Attilan Rough Riders (${models} models)`,
        description: "For every 5 models in this unit, 1 model's hunting lance can be replaced with 1 goad lance. The Rough Rider Sergeant can be equipped with 1 power sabre.",
        controls: [
          { key: 'goad_lance', label: '1 goad lance', max: models => Math.floor(Number(models || 0) / 5) },
          { key: 'sergeant_power_sabre', label: '1 power sabre', max: 1 },
        ],
      }],
      quantities: ctx => {
        const goad = number(ctx, 'goad_lance');
        const maxGoad = Math.floor(ctx.modelCount / 5);
        if (goad > maxGoad) ctx.errors.push(`Goad lance replacements must be ${maxGoad} or fewer; currently ${goad}.`);
        const q = {};
        add(ctx, q, 'lasgun', ctx.modelCount);
        add(ctx, q, 'laspistol', ctx.modelCount);
        add(ctx, q, 'hunting lance', Math.max(0, ctx.modelCount - goad));
        add(ctx, q, 'goad lance', goad);
        add(ctx, q, 'steed’s hooves', ctx.modelCount);
        add(ctx, q, 'power sabre', number(ctx, 'sergeant_power_sabre'));
        ctx.derived.push(`Unupgraded hunting lances: ${Math.max(0, ctx.modelCount - goad)}.`);
        return q;
      },
    },

    'Death Riders': {
      sections: [{
        title: models => `Death Riders (${models} models)`,
        description: 'Fixed loadout: every model has a Death Rider lascarbine, frag lance, power sabre, and steed’s savage claws. No available wargear options.',
      }],
      quantities: ctx => ctx.base(),
    },

    'Lord Marshal Dreir': fixed('Lord Marshal Dreir', { 'laspistol': 1, 'sabre of sacrifice': 1, 'savage claws': 1 }),
    'Lord Solar Leontus': fixed('Lord Solar Leontus', { "sol's righteous gaze": 1, 'conquest': 1, "konstantin's hooves": 1 }),  };
}());
