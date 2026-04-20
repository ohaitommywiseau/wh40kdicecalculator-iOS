(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount = 1) => ctx.add(q, key, amount);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;
  const number = (ctx, key) => ctx.number(key);
  const maxPerFive = models => Math.floor(Number(models || 0) / 5);
  const maxPerThree = models => Math.floor(Number(models || 0) / 3);

  const pistolOptions = ['bolt pistol', 'grav-pistol', 'plasma pistol'];
  const rangedOptions = ['bolt pistol', 'boltgun', 'combi-weapon', 'grav-pistol', 'plasma pistol', 'storm bolter'];

  registry['space-marines'] = {
    'Intercessor Squad': {
      sections: [{
        title: 'Intercessor Sergeant',
        description: "The Intercessor Sergeant's bolt rifle can be replaced with one of the following: 1 Astartes chainsword; 1 hand flamer; 1 plasma pistol; 1 power weapon. The Intercessor Sergeant's close combat weapon can be replaced with one of the following: 1 Astartes chainsword; 1 power fist; 1 power weapon; 1 thunder hammer.",
        controls: [
          { type: 'select', key: 'sergeant_ranged', label: 'Bolt rifle replacement', value: 'bolt rifle', options: [
            { value: 'bolt rifle', label: 'Bolt rifle' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
          { type: 'select', key: 'sergeant_melee', label: 'Close combat weapon replacement', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }, {
        title: models => `Intercessor grenade launchers (${models} models)`,
        description: 'For every 5 models in this unit, 1 model equipped with a bolt rifle can be equipped with 1 Astartes grenade launcher.',
        controls: [
          { key: 'grenade_launcher', label: '1 Astartes grenade launcher', max: maxPerFive },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const sergeantRanged = select(ctx, 'sergeant_ranged', 'bolt rifle');
        const sergeantMelee = select(ctx, 'sergeant_melee', 'close combat weapon');
        const grenadeLaunchers = number(ctx, 'grenade_launcher');
        const maxLaunchers = maxPerFive(ctx.modelCount);
        const boltRiflesAvailable = (ctx.modelCount - 1) + (sergeantRanged === 'bolt rifle' ? 1 : 0);
        if (grenadeLaunchers > maxLaunchers) ctx.errors.push(`Astartes grenade launchers must total ${maxLaunchers} or fewer; currently ${grenadeLaunchers}.`);
        if (grenadeLaunchers > boltRiflesAvailable) ctx.errors.push(`Astartes grenade launchers require bolt rifles. Only ${boltRiflesAvailable} bolt rifle models are available right now.`);
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'bolt rifle', Math.max(0, boltRiflesAvailable));
        add(ctx, q, 'close combat weapon', ctx.modelCount - (sergeantMelee === 'close combat weapon' ? 0 : 1));
        if (sergeantRanged !== 'bolt rifle') add(ctx, q, sergeantRanged, 1);
        if (sergeantMelee !== 'close combat weapon') add(ctx, q, sergeantMelee, 1);
        add(ctx, q, 'astartes grenade launcher', grenadeLaunchers);
        ctx.derived.push(`Bolt rifle models available for grenade launchers: ${boltRiflesAvailable}.`);
        return q;
      },
    },

    'Assault Intercessor Squad': {
      sections: [{
        title: 'Assault Intercessor Sergeant',
        description: "The Assault Intercessor Sergeant's heavy bolt pistol can be replaced with one of the following: 1 hand flamer; 1 plasma pistol. The Assault Intercessor Sergeant's Astartes chainsword can be replaced with one of the following: 1 power fist; 1 power weapon; 1 thunder hammer.",
        controls: [
          { type: 'select', key: 'sergeant_pistol', label: 'Heavy bolt pistol replacement', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'sergeant_melee', label: 'Astartes chainsword replacement', value: 'astartes chainsword', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const sergeantPistol = select(ctx, 'sergeant_pistol', 'heavy bolt pistol');
        const sergeantMelee = select(ctx, 'sergeant_melee', 'astartes chainsword');
        add(ctx, q, 'heavy bolt pistol', (ctx.modelCount - 1) + (sergeantPistol === 'heavy bolt pistol' ? 1 : 0));
        if (sergeantPistol !== 'heavy bolt pistol') add(ctx, q, sergeantPistol, 1);
        add(ctx, q, 'astartes chainsword', (ctx.modelCount - 1) + (sergeantMelee === 'astartes chainsword' ? 1 : 0));
        if (sergeantMelee !== 'astartes chainsword') add(ctx, q, sergeantMelee, 1);
        return q;
      },
    },

    'Tactical Squad': {
      sections: [{
        title: 'Tactical Marines',
        description: "1 Tactical Marine's boltgun can be replaced with one of the following: 1 flamer; 1 heavy bolter; 1 grav-cannon; 1 grav-gun; 1 lascannon; 1 meltagun; 1 missile launcher; 1 multi-melta; 1 plasma cannon; 1 plasma gun. 1 Tactical Marine's boltgun can be replaced with one of the following: 1 flamer; 1 grav-gun; 1 meltagun; 1 plasma gun.",
        controls: [
          { type: 'select', key: 'heavy_weapon', label: 'Heavy/special weapon slot', value: '', options: [
            { value: '', label: 'None' },
            { value: 'flamer', label: 'Flamer' },
            { value: 'heavy bolter', label: 'Heavy bolter' },
            { value: 'grav-cannon', label: 'Grav-cannon' },
            { value: 'grav-gun', label: 'Grav-gun' },
            { value: 'lascannon', label: 'Lascannon' },
            { value: 'meltagun', label: 'Meltagun' },
            { value: 'missile launcher', label: 'Missile launcher' },
            { value: 'multi-melta', label: 'Multi-melta' },
            { value: 'plasma cannon', label: 'Plasma cannon' },
            { value: 'plasma gun', label: 'Plasma gun' },
          ] },
          { type: 'select', key: 'special_weapon', label: 'Special weapon slot', value: '', options: [
            { value: '', label: 'None' },
            { value: 'flamer', label: 'Flamer' },
            { value: 'grav-gun', label: 'Grav-gun' },
            { value: 'meltagun', label: 'Meltagun' },
            { value: 'plasma gun', label: 'Plasma gun' },
          ] },
        ],
      }, {
        title: 'Tactical Sergeant',
        description: "The Tactical Sergeant's bolt pistol and boltgun can be replaced with 1 twin lightning claws, or two different weapons from the following list: 1 Astartes chainsword; 1 bolt pistol; 1 boltgun; 1 combi-weapon; 1 grav-pistol; 1 plasma pistol; 1 storm bolter; 1 power fist; 1 power weapon; 1 thunder hammer. This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol).",
        controls: [
          { type: 'select', key: 'sergeant_mode', label: 'Sergeant loadout', value: 'paired', options: [
            { value: 'paired', label: 'Two selected weapons' },
            { value: 'twin lightning claws', label: 'Twin lightning claws' },
          ] },
          { type: 'select', key: 'sergeant_weapon_a', label: 'Sergeant weapon A', value: 'bolt pistol', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'grav-pistol', label: 'Grav-pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
          { type: 'select', key: 'sergeant_weapon_b', label: 'Sergeant weapon B', value: 'boltgun', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'grav-pistol', label: 'Grav-pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const heavyWeapon = select(ctx, 'heavy_weapon', '');
        const specialWeapon = select(ctx, 'special_weapon', '');
        const marinesReplaced = (heavyWeapon ? 1 : 0) + (specialWeapon ? 1 : 0);
        const sergeantMode = select(ctx, 'sergeant_mode', 'paired');
        const weaponA = select(ctx, 'sergeant_weapon_a', 'bolt pistol');
        const weaponB = select(ctx, 'sergeant_weapon_b', 'boltgun');
        add(ctx, q, 'bolt pistol', 9);
        add(ctx, q, 'close combat weapon', 10);
        add(ctx, q, 'boltgun', Math.max(0, 9 - marinesReplaced));
        add(ctx, q, heavyWeapon, heavyWeapon ? 1 : 0);
        add(ctx, q, specialWeapon, specialWeapon ? 1 : 0);

        if (sergeantMode === 'twin lightning claws') {
          add(ctx, q, 'twin lightning claws', 1);
        } else {
          if (weaponA === weaponB) ctx.errors.push('Tactical Sergeant weapons A and B must be different choices.');
          const rangedCount = [weaponA, weaponB].filter(option => rangedOptions.includes(option)).length;
          const pistolCount = [weaponA, weaponB].filter(option => pistolOptions.includes(option)).length;
          if (rangedCount === 2 && pistolCount !== 1) {
            ctx.errors.push('The Tactical Sergeant can only take two ranged weapons if exactly one of them is a Pistol.');
          }
          if (pistolCount > 1) {
            ctx.errors.push('The Tactical Sergeant can only have one Pistol.');
          }
          add(ctx, q, weaponA, 1);
          add(ctx, q, weaponB, 1);
        }

        ctx.derived.push(`Standard Tactical Marines still carrying boltguns: ${Math.max(0, 9 - marinesReplaced)}.`);
        return q;
      },
    },

    'Terminator Squad': {
      sections: [{
        title: 'Terminator heavy weapons',
        description: "For every 5 models in this unit, 1 Terminator's storm bolter can be replaced with one of the following: 1 assault cannon; 1 heavy flamer; 1 cyclone missile launcher and 1 storm bolter. This model's storm bolter cannot be replaced.",
        controls: [
          { key: 'assault_cannon', label: '1 assault cannon', max: maxPerFive },
          { key: 'heavy_flamer', label: '1 heavy flamer', max: maxPerFive },
          { key: 'cyclone_launcher', label: '1 cyclone missile launcher and 1 storm bolter', max: maxPerFive },
        ],
      }, {
        title: 'Power fist replacements',
        description: "Any number of models can each have their power fist replaced with 1 chainfist. The Terminator Squad Leader's power fist can be replaced with 1 power weapon.",
        controls: [
          { key: 'chainfist', label: '1 chainfist (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { type: 'select', key: 'leader_melee', label: 'Squad Leader melee weapon', value: 'power fist', options: [
            { value: 'power fist', label: 'Power fist' },
            { value: 'chainfist', label: 'Chainfist' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const assaultCannons = number(ctx, 'assault_cannon');
        const heavyFlamers = number(ctx, 'heavy_flamer');
        const cycloneLaunchers = number(ctx, 'cyclone_launcher');
        const heavyTotal = assaultCannons + heavyFlamers + cycloneLaunchers;
        const heavyMax = maxPerFive(ctx.modelCount);
        const chainfists = number(ctx, 'chainfist');
        const leaderMelee = select(ctx, 'leader_melee', 'power fist');
        if (heavyTotal > heavyMax) ctx.errors.push(`Terminator heavy weapons must total ${heavyMax} or fewer; currently ${heavyTotal}.`);
        add(ctx, q, 'storm bolter', Math.max(0, ctx.modelCount - assaultCannons - heavyFlamers));
        add(ctx, q, 'assault cannon', assaultCannons);
        add(ctx, q, 'heavy flamer', heavyFlamers);
        add(ctx, q, 'cyclone missile launcher', cycloneLaunchers);
        add(ctx, q, 'power fist', Math.max(0, (ctx.modelCount - 1) - chainfists) + (leaderMelee === 'power fist' ? 1 : 0));
        add(ctx, q, 'chainfist', chainfists + (leaderMelee === 'chainfist' ? 1 : 0));
        if (leaderMelee === 'power weapon') add(ctx, q, 'power weapon', 1);
        ctx.derived.push(`Standard power fists remaining: ${Math.max(0, (ctx.modelCount - 1) - chainfists) + (leaderMelee === 'power fist' ? 1 : 0)}.`);
        return q;
      },
    },

    'Aggressor Squad': {
      sections: [{
        title: 'Aggressor loadout',
        description: 'All models in this unit can each have their flamestorm gauntlets replaced with 1 auto boltstorm gauntlets and 1 fragstorm grenade launcher.',
        controls: [
          { type: 'select', key: 'loadout', label: 'Squad loadout', value: 'flamestorm gauntlets', options: [
            { value: 'flamestorm gauntlets', label: 'Flamestorm gauntlets' },
            { value: 'auto boltstorm gauntlets', label: 'Auto boltstorm gauntlets and fragstorm grenade launchers' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'flamestorm gauntlets');
        add(ctx, q, loadout, ctx.modelCount);
        if (loadout === 'auto boltstorm gauntlets') add(ctx, q, 'fragstorm grenade launcher', ctx.modelCount);
        add(ctx, q, 'twin power fist', ctx.modelCount);
        return q;
      },
    },

    'Infernus Squad': {
      sections: [{
        title: 'Infernus loadout',
        description: 'Every model is equipped with: bolt pistol; pyreblaster; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'pyreblaster', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      },
    },

    'Heavy Intercessor Squad': {
      sections: [{
        title: 'Heavy weapon marine',
        description: 'For every 5 models in this unit, 1 Heavy Intercessor can replace its heavy bolt rifle with 1 heavy bolter.',
        controls: [
          { key: 'heavy_bolter', label: '1 heavy bolter', max: maxPerFive },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const heavyBolters = number(ctx, 'heavy_bolter');
        const heavyBolterMax = maxPerFive(ctx.modelCount);
        const nonSergeantCount = Math.max(0, ctx.modelCount - 1);
        if (heavyBolters > heavyBolterMax) ctx.errors.push(`Heavy bolters must total ${heavyBolterMax} or fewer; currently ${heavyBolters}.`);
        if (heavyBolters > nonSergeantCount) ctx.errors.push(`Only ${nonSergeantCount} non-sergeant Heavy Intercessors are available for heavy bolters.`);
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        add(ctx, q, 'heavy bolt rifle', Math.max(0, ctx.modelCount - heavyBolters));
        add(ctx, q, 'heavy bolter', heavyBolters);
        ctx.derived.push(`Standard heavy bolt rifles remaining: ${Math.max(0, ctx.modelCount - heavyBolters)}.`);
        return q;
      },
    },

    'Sternguard Veteran Squad': {
      sections: [{
        title: 'Veteran heavy weapons',
        description: 'For every 5 models in this unit, 1 Sternguard Veteran can replace its Sternguard bolt rifle with 1 pyrecannon or 1 Sternguard heavy bolter.',
        controls: [
          { key: 'pyrecannon', label: '1 pyrecannon', max: maxPerFive },
          { key: 'sternguard_heavy_bolter', label: '1 Sternguard heavy bolter', max: maxPerFive },
        ],
      }, {
        title: 'Veteran combi-weapons',
        description: 'Any number of Sternguard Veterans can each replace their Sternguard bolt rifle with 1 combi-weapon.',
        controls: [
          { key: 'veteran_combi', label: '1 combi-weapon (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
        ],
      }, {
        title: 'Sternguard Veteran Squad Leader',
        description: "The Sternguard Veteran Squad Leader can replace its Sternguard bolt rifle with 1 combi-weapon. The Squad Leader's close combat weapon can be replaced with 1 Astartes chainsword, 1 power fist or 1 power weapon.",
        controls: [
          { type: 'select', key: 'leader_ranged', label: 'Sternguard bolt rifle replacement', value: 'sternguard bolt rifle', options: [
            { value: 'sternguard bolt rifle', label: 'Sternguard bolt rifle' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
          ] },
          { type: 'select', key: 'leader_melee', label: 'Close combat weapon replacement', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const pyrecannons = number(ctx, 'pyrecannon');
        const heavyBolters = number(ctx, 'sternguard_heavy_bolter');
        const heavyTotal = pyrecannons + heavyBolters;
        const heavyMax = maxPerFive(ctx.modelCount);
        const veteranCombi = number(ctx, 'veteran_combi');
        const leaderRanged = select(ctx, 'leader_ranged', 'sternguard bolt rifle');
        const leaderMelee = select(ctx, 'leader_melee', 'close combat weapon');
        const nonLeaderCount = Math.max(0, ctx.modelCount - 1);
        const veteranBoltRifles = nonLeaderCount - heavyTotal - veteranCombi;

        if (heavyTotal > heavyMax) ctx.errors.push(`Pyrecannons and Sternguard heavy bolters must total ${heavyMax} or fewer; currently ${heavyTotal}.`);
        if (heavyTotal + veteranCombi > nonLeaderCount) {
          ctx.errors.push(`Sternguard Veterans only have ${nonLeaderCount} non-leader bolt rifle slots to replace; currently using ${heavyTotal + veteranCombi}.`);
        }

        add(ctx, q, 'sternguard bolt pistol', ctx.modelCount);
        add(ctx, q, 'close combat weapon', (ctx.modelCount - 1) + (leaderMelee === 'close combat weapon' ? 1 : 0));
        add(ctx, q, 'sternguard bolt rifle', Math.max(0, veteranBoltRifles) + (leaderRanged === 'sternguard bolt rifle' ? 1 : 0));
        add(ctx, q, 'combi-weapon', veteranCombi + (leaderRanged === 'combi-weapon' ? 1 : 0));
        add(ctx, q, 'pyrecannon', pyrecannons);
        add(ctx, q, 'sternguard heavy bolter', heavyBolters);
        if (leaderMelee !== 'close combat weapon') add(ctx, q, leaderMelee, 1);
        ctx.derived.push(`Standard Sternguard bolt rifles remaining: ${Math.max(0, veteranBoltRifles) + (leaderRanged === 'sternguard bolt rifle' ? 1 : 0)}.`);
        return q;
      },
    },

    'Bladeguard Veteran Squad': {
      sections: [{
        title: 'Bladeguard Veteran Sergeant',
        description: "The Bladeguard Veteran Sergeant's heavy bolt pistol can be replaced with 1 neo-volkite pistol or 1 plasma pistol.",
        controls: [
          { type: 'select', key: 'sergeant_pistol', label: 'Heavy bolt pistol replacement', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'neo-volkite pistol', label: 'Neo-volkite pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const sergeantPistol = select(ctx, 'sergeant_pistol', 'heavy bolt pistol');
        add(ctx, q, 'heavy bolt pistol', (ctx.modelCount - 1) + (sergeantPistol === 'heavy bolt pistol' ? 1 : 0));
        add(ctx, q, 'master-crafted power weapon', ctx.modelCount);
        if (sergeantPistol !== 'heavy bolt pistol') add(ctx, q, sergeantPistol, 1);
        return q;
      },
    },

    'Scout Squad': {
      sections: [{
        title: 'Scout weapons',
        description: "Any number of Scouts can each replace their boltgun with 1 Astartes shotgun, 1 combat knife or 1 scout sniper rifle. 1 Scout can replace its boltgun with 1 heavy bolter or 1 missile launcher.",
        controls: [
          { key: 'shotgun', label: '1 Astartes shotgun (non-sergeant)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'combat_knife', label: '1 combat knife (non-sergeant)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'sniper_rifle', label: '1 scout sniper rifle (non-sergeant)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'heavy_bolter', label: '1 heavy bolter', max: 1 },
          { key: 'missile_launcher', label: '1 missile launcher', max: 1 },
        ],
      }, {
        title: 'Scout Sergeant',
        description: "The Scout Sergeant's boltgun can be replaced with 1 Astartes chainsword or 1 combat knife.",
        controls: [
          { type: 'select', key: 'sergeant_weapon', label: 'Boltgun replacement', value: 'boltgun', options: [
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'combat knife', label: 'Combat knife' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const shotguns = number(ctx, 'shotgun');
        const combatKnives = number(ctx, 'combat_knife');
        const sniperRifles = number(ctx, 'sniper_rifle');
        const heavyBolters = number(ctx, 'heavy_bolter');
        const missileLaunchers = number(ctx, 'missile_launcher');
        const sergeantWeapon = select(ctx, 'sergeant_weapon', 'boltgun');
        const nonSergeantCount = Math.max(0, ctx.modelCount - 1);
        const nonSergeantReplacements = shotguns + combatKnives + sniperRifles + heavyBolters + missileLaunchers;

        if (heavyBolters + missileLaunchers > 1) ctx.errors.push('Scout heavy bolters and missile launchers can total 1 or fewer.');
        if (nonSergeantReplacements > nonSergeantCount) {
          ctx.errors.push(`Only ${nonSergeantCount} non-sergeant Scouts can replace their boltguns; currently using ${nonSergeantReplacements}.`);
        }

        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'boltgun', Math.max(0, nonSergeantCount - nonSergeantReplacements) + (sergeantWeapon === 'boltgun' ? 1 : 0));
        add(ctx, q, 'close combat weapon', Math.max(0, nonSergeantCount - combatKnives) + (sergeantWeapon === 'boltgun' ? 1 : 0));
        add(ctx, q, 'astartes shotgun', shotguns);
        add(ctx, q, 'combat knife', combatKnives + (sergeantWeapon === 'combat knife' ? 1 : 0));
        add(ctx, q, 'scout sniper rifle', sniperRifles);
        add(ctx, q, 'heavy bolter', heavyBolters);
        add(ctx, q, 'missile launcher', missileLaunchers);
        if (sergeantWeapon === 'astartes chainsword') add(ctx, q, 'astartes chainsword', 1);
        ctx.derived.push(`Standard Scout boltguns remaining: ${Math.max(0, nonSergeantCount - nonSergeantReplacements) + (sergeantWeapon === 'boltgun' ? 1 : 0)}.`);
        return q;
      },
    },

    'Assault Intercessors With Jump Packs': {
      sections: [{
        title: 'Assault Intercessor Sergeant with Jump Pack',
        description: "The Sergeant's heavy bolt pistol can be replaced with 1 hand flamer or 1 plasma pistol. The Sergeant's Astartes chainsword can be replaced with 1 power fist or 1 power weapon.",
        controls: [
          { type: 'select', key: 'sergeant_pistol', label: 'Heavy bolt pistol replacement', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'sergeant_melee', label: 'Astartes chainsword replacement', value: 'astartes chainsword', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const sergeantPistol = select(ctx, 'sergeant_pistol', 'heavy bolt pistol');
        const sergeantMelee = select(ctx, 'sergeant_melee', 'astartes chainsword');
        add(ctx, q, 'heavy bolt pistol', (ctx.modelCount - 1) + (sergeantPistol === 'heavy bolt pistol' ? 1 : 0));
        add(ctx, q, 'astartes chainsword', (ctx.modelCount - 1) + (sergeantMelee === 'astartes chainsword' ? 1 : 0));
        if (sergeantPistol !== 'heavy bolt pistol') add(ctx, q, sergeantPistol, 1);
        if (sergeantMelee !== 'astartes chainsword') add(ctx, q, sergeantMelee, 1);
        return q;
      },
    },

    'Devastator Squad': {
      sections: [{
        title: 'Devastator Marines',
        description: 'Up to 4 Devastator Marines can each replace their boltgun with 1 grav-cannon, 1 heavy bolter, 1 lascannon, 1 missile launcher, 1 multi-melta or 1 plasma cannon.',
        controls: [
          { key: 'grav_cannon', label: '1 grav-cannon', max: 4 },
          { key: 'heavy_bolter', label: '1 heavy bolter', max: 4 },
          { key: 'lascannon', label: '1 lascannon', max: 4 },
          { key: 'missile_launcher', label: '1 missile launcher', max: 4 },
          { key: 'multi_melta', label: '1 multi-melta', max: 4 },
          { key: 'plasma_cannon', label: '1 plasma cannon', max: 4 },
        ],
      }, {
        title: 'Devastator Sergeant',
        description: "The Devastator Sergeant's bolt pistol and boltgun can be replaced with two different weapons from the following list: 1 Astartes chainsword; 1 bolt pistol; 1 boltgun; 1 combi-weapon; 1 grav-pistol; 1 plasma pistol; 1 power fist; 1 power weapon; 1 thunder hammer. This model can only be equipped with two ranged weapons if one of them is a Pistol, and it can only have one Pistol.",
        controls: [
          { type: 'select', key: 'sergeant_weapon_a', label: 'Sergeant weapon A', value: 'bolt pistol', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'grav-pistol', label: 'Grav-pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
          { type: 'select', key: 'sergeant_weapon_b', label: 'Sergeant weapon B', value: 'boltgun', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'grav-pistol', label: 'Grav-pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const gravCannons = number(ctx, 'grav_cannon');
        const heavyBolters = number(ctx, 'heavy_bolter');
        const lascannons = number(ctx, 'lascannon');
        const missileLaunchers = number(ctx, 'missile_launcher');
        const multiMeltas = number(ctx, 'multi_melta');
        const plasmaCannons = number(ctx, 'plasma_cannon');
        const heavyTotal = gravCannons + heavyBolters + lascannons + missileLaunchers + multiMeltas + plasmaCannons;
        const nonSergeantCount = Math.max(0, ctx.modelCount - 1);
        const maxHeavyWeapons = Math.min(4, nonSergeantCount);
        const weaponA = select(ctx, 'sergeant_weapon_a', 'bolt pistol');
        const weaponB = select(ctx, 'sergeant_weapon_b', 'boltgun');

        if (heavyTotal > maxHeavyWeapons) {
          ctx.errors.push(`Devastator heavy weapons must total ${maxHeavyWeapons} or fewer; currently ${heavyTotal}.`);
        }
        if (weaponA === weaponB) ctx.errors.push('Devastator Sergeant weapons A and B must be different choices.');
        const rangedCount = [weaponA, weaponB].filter(option => rangedOptions.includes(option)).length;
        const pistolCount = [weaponA, weaponB].filter(option => pistolOptions.includes(option)).length;
        if (rangedCount === 2 && pistolCount !== 1) {
          ctx.errors.push('The Devastator Sergeant can only take two ranged weapons if exactly one of them is a Pistol.');
        }
        if (pistolCount > 1) {
          ctx.errors.push('The Devastator Sergeant can only have one Pistol.');
        }

        add(ctx, q, 'bolt pistol', nonSergeantCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        add(ctx, q, 'boltgun', Math.max(0, nonSergeantCount - heavyTotal));
        add(ctx, q, 'grav-cannon', gravCannons);
        add(ctx, q, 'heavy bolter', heavyBolters);
        add(ctx, q, 'lascannon', lascannons);
        add(ctx, q, 'missile launcher', missileLaunchers);
        add(ctx, q, 'multi-melta', multiMeltas);
        add(ctx, q, 'plasma cannon', plasmaCannons);
        add(ctx, q, weaponA, 1);
        add(ctx, q, weaponB, 1);
        ctx.derived.push(`Standard Devastator boltguns remaining: ${Math.max(0, nonSergeantCount - heavyTotal)}.`);
        return q;
      },
    },

    'Desolation Squad': {
      sections: [{
        title: 'Desolation launchers',
        description: 'All models in this unit can each replace their superfrag rocket launcher with 1 superkrak rocket launcher. The Desolation Sergeant can replace its superfrag rocket launcher or superkrak rocket launcher with 1 vengor launcher.',
        controls: [
          { type: 'select', key: 'squad_launcher', label: 'Squad launcher pattern', value: 'superfrag rocket launcher', options: [
            { value: 'superfrag rocket launcher', label: 'Superfrag rocket launcher' },
            { value: 'superkrak rocket launcher', label: 'Superkrak rocket launcher' },
          ] },
          { type: 'select', key: 'sergeant_launcher', label: 'Sergeant launcher', value: '', options: [
            { value: '', label: 'Match squad launcher' },
            { value: 'vengor launcher', label: 'Vengor launcher' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const squadLauncher = select(ctx, 'squad_launcher', 'superfrag rocket launcher');
        const sergeantLauncher = select(ctx, 'sergeant_launcher', '');
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'castellan launcher', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        add(ctx, q, squadLauncher, ctx.modelCount - (sergeantLauncher === 'vengor launcher' ? 1 : 0));
        if (sergeantLauncher === 'vengor launcher') add(ctx, q, 'vengor launcher', 1);
        return q;
      },
    },

    'Eliminator Squad': {
      sections: [{
        title: 'Eliminator Sergeant',
        description: "The Eliminator Sergeant's bolt sniper rifle can be replaced with 1 instigator bolt carbine or 1 las fusil.",
        controls: [
          { type: 'select', key: 'sergeant_rifle', label: 'Sergeant rifle', value: 'bolt sniper rifle', options: [
            { value: 'bolt sniper rifle', label: 'Bolt sniper rifle' },
            { value: 'instigator bolt carbine', label: 'Instigator bolt carbine' },
            { value: 'las fusil', label: 'Las fusil' },
          ] },
        ],
      }, {
        title: 'Eliminator fire team',
        description: 'All Eliminators in this unit can each have their bolt sniper rifle replaced with 1 las fusil.',
        controls: [
          { type: 'select', key: 'squad_rifle', label: 'Eliminator rifle pattern', value: 'bolt sniper rifle', options: [
            { value: 'bolt sniper rifle', label: 'Bolt sniper rifle' },
            { value: 'las fusil', label: 'Las fusil' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const sergeantRifle = select(ctx, 'sergeant_rifle', 'bolt sniper rifle');
        const squadRifle = select(ctx, 'squad_rifle', 'bolt sniper rifle');
        const eliminatorCount = Math.max(0, ctx.modelCount - 1);
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        add(ctx, q, squadRifle, eliminatorCount);
        add(ctx, q, sergeantRifle, 1);
        return q;
      },
    },

    'Suppressor Squad': {
      sections: [{
        title: 'Suppressor loadout',
        description: 'Every model is equipped with: accelerator autocannon; bolt pistol; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'accelerator autocannon', ctx.modelCount);
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      },
    },

    'Centurion Devastator Squad': {
      sections: [{
        title: 'Centurion missile systems',
        description: 'Any number of models can each replace their Centurion bolters with 1 Centurion missile launcher.',
        controls: [
          { key: 'missile_launcher', label: '1 Centurion missile launcher', max: models => Math.max(0, Number(models || 0)) },
        ],
      }, {
        title: 'Heavy weapon battery',
        description: 'Any number of models can each replace their grav-cannon with 1 twin heavy bolter or 1 twin lascannon.',
        controls: [
          { key: 'twin_heavy_bolter', label: '1 twin heavy bolter', max: models => Math.max(0, Number(models || 0)) },
          { key: 'twin_lascannon', label: '1 twin lascannon', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const missileLaunchers = number(ctx, 'missile_launcher');
        const twinHeavyBolters = number(ctx, 'twin_heavy_bolter');
        const twinLascannons = number(ctx, 'twin_lascannon');
        const heavyWeaponReplacements = twinHeavyBolters + twinLascannons;

        if (missileLaunchers > ctx.modelCount) {
          ctx.errors.push(`Centurion missile launchers must total ${ctx.modelCount} or fewer; currently ${missileLaunchers}.`);
        }
        if (heavyWeaponReplacements > ctx.modelCount) {
          ctx.errors.push(`Twin heavy bolters and twin lascannons must total ${ctx.modelCount} or fewer; currently ${heavyWeaponReplacements}.`);
        }

        add(ctx, q, 'centurion bolters', Math.max(0, ctx.modelCount - missileLaunchers));
        add(ctx, q, 'centurion missile launcher', missileLaunchers);
        add(ctx, q, 'grav-cannon', Math.max(0, ctx.modelCount - heavyWeaponReplacements));
        add(ctx, q, 'twin heavy bolter', twinHeavyBolters);
        add(ctx, q, 'twin lascannon', twinLascannons);
        add(ctx, q, 'centurion fists', ctx.modelCount);
        return q;
      },
    },

    'Captain': {
      sections: [{
        title: 'Captain loadout',
        description: "The Captain's bolt pistol, master-crafted bolter and close combat weapon can be replaced with one of the following: 1 heavy bolt pistol and 1 power fist; 1 heavy bolt pistol and 1 master-crafted power weapon; 1 neo-volkite pistol and 1 power fist; 1 neo-volkite pistol and 1 master-crafted power weapon; 1 plasma pistol and 1 power fist; 1 plasma pistol and 1 master-crafted power weapon; 1 heavy bolt pistol, 1 master-crafted power weapon and 1 relic shield. The Captain's close combat weapon can also be replaced with 1 master-crafted power weapon or 1 power fist.",
        controls: [
          { type: 'select', key: 'loadout', label: 'Captain loadout', value: 'default', options: [
            { value: 'default', label: 'Bolt pistol, master-crafted bolter, close combat weapon' },
            { value: 'power-weapon', label: 'Bolt pistol, master-crafted bolter, master-crafted power weapon' },
            { value: 'power-fist', label: 'Bolt pistol, master-crafted bolter, power fist' },
            { value: 'heavy-power-fist', label: 'Heavy bolt pistol and power fist' },
            { value: 'heavy-master-crafted', label: 'Heavy bolt pistol and master-crafted power weapon' },
            { value: 'neo-power-fist', label: 'Neo-volkite pistol and power fist' },
            { value: 'neo-master-crafted', label: 'Neo-volkite pistol and master-crafted power weapon' },
            { value: 'plasma-power-fist', label: 'Plasma pistol and power fist' },
            { value: 'plasma-master-crafted', label: 'Plasma pistol and master-crafted power weapon' },
            { value: 'shield-loadout', label: 'Heavy bolt pistol, master-crafted power weapon and relic shield' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'default');
        switch (loadout) {
          case 'power-weapon':
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'master-crafted bolter', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            break;
          case 'power-fist':
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'master-crafted bolter', 1);
            add(ctx, q, 'power fist', 1);
            break;
          case 'heavy-power-fist':
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'power fist', 1);
            break;
          case 'heavy-master-crafted':
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            break;
          case 'neo-power-fist':
            add(ctx, q, 'neo-volkite pistol', 1);
            add(ctx, q, 'power fist', 1);
            break;
          case 'neo-master-crafted':
            add(ctx, q, 'neo-volkite pistol', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            break;
          case 'plasma-power-fist':
            add(ctx, q, 'plasma pistol', 1);
            add(ctx, q, 'power fist', 1);
            break;
          case 'plasma-master-crafted':
            add(ctx, q, 'plasma pistol', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            break;
          case 'shield-loadout':
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            ctx.derived.push('Relic shield equipped.');
            break;
          default:
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'master-crafted bolter', 1);
            add(ctx, q, 'close combat weapon', 1);
            break;
        }
        return q;
      },
    },

    'Lieutenant': {
      sections: [{
        title: 'Lieutenant loadout',
        description: "The Lieutenant's master-crafted bolter can be replaced with 1 plasma pistol, 1 master-crafted power weapon or 1 power fist. The Lieutenant's bolt pistol, master-crafted bolter and close combat weapon can be replaced with 1 neo-volkite pistol, 1 master-crafted power weapon and 1 storm shield. The Lieutenant's bolt pistol can be replaced with 1 heavy bolt pistol. The Lieutenant's close combat weapon can be replaced with 1 master-crafted power weapon or 1 power fist.",
        controls: [
          { type: 'select', key: 'loadout', label: 'Lieutenant loadout', value: 'default', options: [
            { value: 'default', label: 'Bolt pistol, master-crafted bolter, close combat weapon' },
            { value: 'heavy-bolt', label: 'Heavy bolt pistol, master-crafted bolter, close combat weapon' },
            { value: 'plasma-bolter', label: 'Bolt pistol, plasma pistol, close combat weapon' },
            { value: 'bolter-master-crafted', label: 'Bolt pistol, master-crafted power weapon, close combat weapon' },
            { value: 'bolter-power-fist', label: 'Bolt pistol, power fist, close combat weapon' },
            { value: 'melee-master-crafted', label: 'Bolt pistol, master-crafted bolter, master-crafted power weapon' },
            { value: 'melee-power-fist', label: 'Bolt pistol, master-crafted bolter, power fist' },
            { value: 'neo-shield', label: 'Neo-volkite pistol, master-crafted power weapon and storm shield' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'default');
        switch (loadout) {
          case 'heavy-bolt':
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'master-crafted bolter', 1);
            add(ctx, q, 'close combat weapon', 1);
            break;
          case 'plasma-bolter':
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'plasma pistol', 1);
            add(ctx, q, 'close combat weapon', 1);
            break;
          case 'bolter-master-crafted':
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            add(ctx, q, 'close combat weapon', 1);
            break;
          case 'bolter-power-fist':
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'power fist', 1);
            add(ctx, q, 'close combat weapon', 1);
            break;
          case 'melee-master-crafted':
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'master-crafted bolter', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            break;
          case 'melee-power-fist':
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'master-crafted bolter', 1);
            add(ctx, q, 'power fist', 1);
            break;
          case 'neo-shield':
            add(ctx, q, 'neo-volkite pistol', 1);
            add(ctx, q, 'master-crafted power weapon', 1);
            ctx.derived.push('Storm shield equipped.');
            break;
          default:
            add(ctx, q, 'bolt pistol', 1);
            add(ctx, q, 'master-crafted bolter', 1);
            add(ctx, q, 'close combat weapon', 1);
            break;
        }
        return q;
      },
    },

    'Chaplain': {
      sections: [{
        title: 'Chaplain loadout',
        description: 'This model is equipped with: absolvor bolt pistol; crozius arcanum.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'crozius arcanum', 1);
        return q;
      },
    },

    'Librarian': {
      sections: [{
        title: 'Librarian loadout',
        description: 'This model is equipped with: bolt pistol; Smite; force weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'force weapon', 1);
        add(ctx, q, 'smite', 1);
        return q;
      },
    },

    'Captain In Terminator Armour': {
      sections: [{
        title: 'Captain in Terminator Armour',
        description: "This model's storm bolter can be replaced with 1 combi-weapon. This model's relic weapon can be replaced with 1 relic fist.",
        controls: [
          { type: 'select', key: 'ranged', label: 'Storm bolter replacement', value: 'storm bolter', options: [
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
          ] },
          { type: 'select', key: 'melee', label: 'Relic weapon replacement', value: 'relic weapon', options: [
            { value: 'relic weapon', label: 'Relic weapon' },
            { value: 'relic fist', label: 'Relic fist' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged', 'storm bolter'), 1);
        add(ctx, q, select(ctx, 'melee', 'relic weapon'), 1);
        return q;
      },
    },

    'Captain With Jump Pack': {
      sections: [{
        title: 'Captain with Jump Pack',
        description: "The Captain's heavy bolt pistol can be replaced with 1 plasma pistol or 1 hand flamer. The Astartes chainsword can be replaced with 1 power fist or 1 relic weapon. The heavy bolt pistol and Astartes chainsword can be replaced with 1 thunder hammer and 1 relic shield. If this model is equipped with a heavy bolt pistol and an Astartes chainsword, it can be equipped with 1 relic shield; in that case they cannot be replaced.",
        controls: [
          { type: 'select', key: 'loadout', label: 'Captain with Jump Pack loadout', value: 'default', options: [
            { value: 'default', label: 'Heavy bolt pistol and Astartes chainsword' },
            { value: 'hand-flamer', label: 'Hand flamer and Astartes chainsword' },
            { value: 'plasma-pistol', label: 'Plasma pistol and Astartes chainsword' },
            { value: 'power-fist', label: 'Heavy bolt pistol and power fist' },
            { value: 'relic-weapon', label: 'Heavy bolt pistol and relic weapon' },
            { value: 'shield-default', label: 'Heavy bolt pistol, Astartes chainsword and relic shield' },
            { value: 'thunder-hammer-shield', label: 'Thunder hammer and relic shield' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'default');
        switch (loadout) {
          case 'hand-flamer':
            add(ctx, q, 'hand flamer', 1);
            add(ctx, q, 'astartes chainsword', 1);
            break;
          case 'plasma-pistol':
            add(ctx, q, 'plasma pistol', 1);
            add(ctx, q, 'astartes chainsword', 1);
            break;
          case 'power-fist':
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'power fist', 1);
            break;
          case 'relic-weapon':
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'relic weapon', 1);
            break;
          case 'shield-default':
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'astartes chainsword', 1);
            ctx.derived.push('Relic shield equipped.');
            break;
          case 'thunder-hammer-shield':
            add(ctx, q, 'thunder hammer', 1);
            ctx.derived.push('Relic shield equipped.');
            break;
          default:
            add(ctx, q, 'heavy bolt pistol', 1);
            add(ctx, q, 'astartes chainsword', 1);
            break;
        }
        return q;
      },
    },

    'Techmarine': {
      sections: [{
        title: 'Techmarine loadout',
        description: 'This model is equipped with: forge bolter; grav-pistol; Omnissian power axe; servo-arm.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'forge bolter', 1);
        add(ctx, q, 'grav-pistol', 1);
        add(ctx, q, 'omnissian power axe', 1);
        add(ctx, q, 'servo-arm', 1);
        return q;
      },
    },

    'Ballistus Dreadnought': {
      sections: [{
        title: 'Ballistus loadout',
        description: 'This model is equipped with: Ballistus missile launcher; Ballistus lascannon; twin storm bolter; armoured feet.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'ballistus missile launcher', 1);
        add(ctx, q, 'ballistus lascannon', 1);
        add(ctx, q, 'twin storm bolter', 1);
        add(ctx, q, 'armoured feet', 1);
        return q;
      },
    },

    'Brutalis Dreadnought': {
      sections: [{
        title: 'Brutalis chest weapons',
        description: 'This modelâ€™s twin heavy bolter can be replaced with 1 twin multi-melta.',
        controls: [
          { type: 'select', key: 'chest_weapon', label: 'Chest weapon', value: 'twin heavy bolter', options: [
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin multi-melta', label: 'Twin multi-melta' },
          ] },
        ],
      }, {
        title: 'Brutalis melee arms',
        description: 'This modelâ€™s Brutalis fists can be replaced with 1 Brutalis talons.',
        controls: [
          { type: 'select', key: 'melee_arms', label: 'Melee arms', value: 'brutalis fists', options: [
            { value: 'brutalis fists', label: 'Brutalis fists' },
            { value: 'brutalis talons', label: 'Brutalis talons' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'twin icarus ironhail heavy stubber', 1);
        add(ctx, q, 'brutalis bolt rifles', 1);
        add(ctx, q, select(ctx, 'chest_weapon', 'twin heavy bolter'), 1);
        add(ctx, q, select(ctx, 'melee_arms', 'brutalis fists'), 1);
        return q;
      },
    },

    'Invictor Tactical Warsuit': {
      sections: [{
        title: 'Invictor main weapon',
        description: 'This modelâ€™s incendium cannon can be replaced with 1 twin ironhail autocannon.',
        controls: [
          { type: 'select', key: 'main_weapon', label: 'Main weapon', value: 'incendium cannon', options: [
            { value: 'incendium cannon', label: 'Incendium cannon' },
            { value: 'twin ironhail autocannon', label: 'Twin ironhail autocannon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'fragstorm grenade launcher', 1);
        add(ctx, q, 'heavy bolter', 1);
        add(ctx, q, select(ctx, 'main_weapon', 'incendium cannon'), 1);
        add(ctx, q, 'twin ironhail heavy stubber', 1);
        add(ctx, q, 'invictor fist', 1);
        return q;
      },
    },

    'Redemptor Dreadnought': {
      sections: [{
        title: 'Primary weapon',
        description: 'This modelâ€™s heavy onslaught gatling cannon can be replaced with 1 macro plasma incinerator.',
        controls: [
          { type: 'select', key: 'primary_weapon', label: 'Primary weapon', value: 'heavy onslaught gatling cannon', options: [
            { value: 'heavy onslaught gatling cannon', label: 'Heavy onslaught gatling cannon' },
            { value: 'macro plasma incinerator', label: 'Macro plasma incinerator' },
          ] },
        ],
      }, {
        title: 'Underslung weapon',
        description: 'This modelâ€™s heavy flamer can be replaced with 1 onslaught gatling cannon or 1 twin storm bolter.',
        controls: [
          { type: 'select', key: 'underslung_weapon', label: 'Underslung weapon', value: 'heavy flamer', options: [
            { value: 'heavy flamer', label: 'Heavy flamer' },
            { value: 'onslaught gatling cannon', label: 'Onslaught gatling cannon' },
            { value: 'twin storm bolter', label: 'Twin storm bolter' },
          ] },
        ],
      }, {
        title: 'Carapace launcher',
        description: 'This modelâ€™s twin fragstorm grenade launcher can be replaced with 1 Icarus rocket pod.',
        controls: [
          { type: 'select', key: 'carapace_weapon', label: 'Carapace weapon', value: 'twin fragstorm grenade launcher', options: [
            { value: 'twin fragstorm grenade launcher', label: 'Twin fragstorm grenade launcher' },
            { value: 'icarus rocket pod', label: 'Icarus rocket pod' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'primary_weapon', 'heavy onslaught gatling cannon'), 1);
        add(ctx, q, select(ctx, 'underslung_weapon', 'heavy flamer'), 1);
        add(ctx, q, select(ctx, 'carapace_weapon', 'twin fragstorm grenade launcher'), 1);
        add(ctx, q, 'redemptor fist', 1);
        return q;
      },
    },

    'Impulsor': {
      sections: [{
        title: 'Hull weapons',
        description: 'This modelâ€™s 2 storm bolters can be replaced with 2 fragstorm grenade launchers.',
        controls: [
          { type: 'select', key: 'hull_weapons', label: 'Hull weapon pair', value: 'storm bolter', options: [
            { value: 'storm bolter', label: '2 storm bolters' },
            { value: 'fragstorm grenade launcher', label: '2 fragstorm grenade launchers' },
          ] },
        ],
      }, {
        title: 'Pintle weapon',
        description: 'This model can be equipped with one of the following: 1 ironhail heavy stubber; 1 multi-melta.',
        controls: [
          { type: 'select', key: 'pintle_weapon', label: 'Optional pintle weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'ironhail heavy stubber', label: 'Ironhail heavy stubber' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }, {
        title: 'Support system',
        description: 'This model can be equipped with one of the following: 1 bellicatus missile array; 1 ironhail skytalon array; 1 orbital comms array; 1 shield dome.',
        controls: [
          { type: 'select', key: 'support_system', label: 'Support system', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'bellicatus missile array', label: 'Bellicatus missile array' },
            { value: 'ironhail skytalon array', label: 'Ironhail skytalon array' },
            { value: 'orbital comms array', label: 'Orbital comms array' },
            { value: 'shield dome', label: 'Shield dome' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const hullWeapons = select(ctx, 'hull_weapons', 'storm bolter');
        const pintleWeapon = select(ctx, 'pintle_weapon', 'none');
        const supportSystem = select(ctx, 'support_system', 'none');
        add(ctx, q, hullWeapons, 2);
        add(ctx, q, 'armoured hull', 1);
        if (pintleWeapon !== 'none') add(ctx, q, pintleWeapon, 1);
        if (supportSystem === 'bellicatus missile array' || supportSystem === 'ironhail skytalon array') {
          add(ctx, q, supportSystem, 1);
        } else if (supportSystem === 'orbital comms array') {
          ctx.derived.push('Orbital comms array equipped.');
        } else if (supportSystem === 'shield dome') {
          ctx.derived.push('Shield dome equipped.');
        }
        return q;
      },
    },

    'Repulsor': {
      sections: [{
        title: 'Turret weapon',
        description: 'This modelâ€™s heavy onslaught gatling cannon can be replaced with 1 las-talon.',
        controls: [
          { type: 'select', key: 'turret_weapon', label: 'Turret weapon', value: 'heavy onslaught gatling cannon', options: [
            { value: 'heavy onslaught gatling cannon', label: 'Heavy onslaught gatling cannon' },
            { value: 'las-talon', label: 'Las-talon' },
          ] },
        ],
      }, {
        title: 'Sponson weapon',
        description: 'This modelâ€™s twin heavy bolter can be replaced with 1 twin lascannon.',
        controls: [
          { type: 'select', key: 'sponson_weapon', label: 'Sponson weapon', value: 'twin heavy bolter', options: [
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin lascannon', label: 'Twin lascannon' },
          ] },
        ],
      }, {
        title: 'Optional pintle weapon',
        description: 'This model can be equipped with 1 multi-melta.',
        controls: [
          { type: 'select', key: 'pintle_weapon', label: 'Pintle weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'turret_weapon', 'heavy onslaught gatling cannon'), 1);
        add(ctx, q, 'hunter-slayer missile', 1);
        add(ctx, q, 'repulsor defensive array', 1);
        add(ctx, q, select(ctx, 'sponson_weapon', 'twin heavy bolter'), 1);
        add(ctx, q, 'armoured hull', 1);
        const pintleWeapon = select(ctx, 'pintle_weapon', 'none');
        if (pintleWeapon !== 'none') add(ctx, q, pintleWeapon, 1);
        return q;
      },
    },

    'Repulsor Executioner': {
      sections: [{
        title: 'Main gun',
        description: 'This modelâ€™s macro plasma incinerator can be replaced with 1 heavy laser destroyer.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'macro plasma incinerator', options: [
            { value: 'macro plasma incinerator', label: 'Macro plasma incinerator' },
            { value: 'heavy laser destroyer', label: 'Heavy laser destroyer' },
          ] },
        ],
      }, {
        title: 'Optional pintle weapon',
        description: 'This model can be equipped with one of the following: 1 ironhail heavy stubber; 1 multi-melta.',
        controls: [
          { type: 'select', key: 'pintle_weapon', label: 'Pintle weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'ironhail heavy stubber', label: 'Ironhail heavy stubber' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }, {
        title: 'Carapace launcher',
        description: 'This model can be equipped with 1 Icarus rocket pod.',
        controls: [
          { type: 'select', key: 'carapace_weapon', label: 'Carapace weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'icarus rocket pod', label: 'Icarus rocket pod' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy onslaught gatling cannon', 1);
        add(ctx, q, select(ctx, 'main_gun', 'macro plasma incinerator'), 1);
        add(ctx, q, 'repulsor executioner defensive array', 1);
        add(ctx, q, 'twin heavy bolter', 1);
        add(ctx, q, 'twin icarus ironhail heavy stubber', 1);
        add(ctx, q, 'armoured hull', 1);
        const pintleWeapon = select(ctx, 'pintle_weapon', 'none');
        const carapaceWeapon = select(ctx, 'carapace_weapon', 'none');
        if (pintleWeapon !== 'none') add(ctx, q, pintleWeapon, 1);
        if (carapaceWeapon !== 'none') add(ctx, q, carapaceWeapon, 1);
        return q;
      },
    },

    'Gladiator Lancer': {
      sections: [{
        title: 'Hull weapons',
        description: 'This modelâ€™s 2 storm bolters can be replaced with 2 fragstorm grenade launchers.',
        controls: [
          { type: 'select', key: 'hull_weapons', label: 'Hull weapon pair', value: 'storm bolter', options: [
            { value: 'storm bolter', label: '2 storm bolters' },
            { value: 'fragstorm grenade launcher', label: '2 fragstorm grenade launchers' },
          ] },
        ],
      }, {
        title: 'Optional pintle weapon',
        description: 'This model can be equipped with 1 ironhail heavy stubber.',
        controls: [
          { type: 'select', key: 'pintle_weapon', label: 'Pintle weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'ironhail heavy stubber', label: 'Ironhail heavy stubber' },
          ] },
        ],
      }, {
        title: 'Carapace launcher',
        description: 'This model can be equipped with 1 Icarus rocket pod.',
        controls: [
          { type: 'select', key: 'carapace_weapon', label: 'Carapace weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'icarus rocket pod', label: 'Icarus rocket pod' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'lancer laser destroyer', 1);
        add(ctx, q, select(ctx, 'hull_weapons', 'storm bolter'), 2);
        add(ctx, q, 'armoured hull', 1);
        const pintleWeapon = select(ctx, 'pintle_weapon', 'none');
        const carapaceWeapon = select(ctx, 'carapace_weapon', 'none');
        if (pintleWeapon !== 'none') add(ctx, q, pintleWeapon, 1);
        if (carapaceWeapon !== 'none') add(ctx, q, carapaceWeapon, 1);
        return q;
      },
    },

    'Gladiator Reaper': {
      sections: [{
        title: 'Optional pintle weapon',
        description: 'This model can be equipped with one of the following: 1 ironhail heavy stubber; 1 multi-melta.',
        controls: [
          { type: 'select', key: 'pintle_weapon', label: 'Pintle weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'ironhail heavy stubber', label: 'Ironhail heavy stubber' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }, {
        title: 'Carapace launcher',
        description: 'This model can be equipped with 1 Icarus rocket pod.',
        controls: [
          { type: 'select', key: 'carapace_weapon', label: 'Carapace weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'icarus rocket pod', label: 'Icarus rocket pod' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'tempest bolter', 2);
        add(ctx, q, 'twin heavy onslaught gatling cannon', 1);
        add(ctx, q, 'armoured hull', 1);
        const pintleWeapon = select(ctx, 'pintle_weapon', 'none');
        const carapaceWeapon = select(ctx, 'carapace_weapon', 'none');
        if (pintleWeapon !== 'none') add(ctx, q, pintleWeapon, 1);
        if (carapaceWeapon !== 'none') add(ctx, q, carapaceWeapon, 1);
        return q;
      },
    },

    'Gladiator Valiant': {
      sections: [{
        title: 'Optional pintle weapon',
        description: 'This model can be equipped with one of the following: 1 ironhail heavy stubber; 1 multi-melta.',
        controls: [
          { type: 'select', key: 'pintle_weapon', label: 'Pintle weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'ironhail heavy stubber', label: 'Ironhail heavy stubber' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }, {
        title: 'Carapace launcher',
        description: 'This model can be equipped with 1 Icarus rocket pod.',
        controls: [
          { type: 'select', key: 'carapace_weapon', label: 'Carapace weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'icarus rocket pod', label: 'Icarus rocket pod' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'multi-melta', 2);
        add(ctx, q, 'twin las-talon', 1);
        add(ctx, q, 'armoured hull', 1);
        const pintleWeapon = select(ctx, 'pintle_weapon', 'none');
        const carapaceWeapon = select(ctx, 'carapace_weapon', 'none');
        if (pintleWeapon !== 'none') add(ctx, q, pintleWeapon, 1);
        if (carapaceWeapon !== 'none') add(ctx, q, carapaceWeapon, 1);
        return q;
      },
    },

    'Land Raider': {
      sections: [{
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile, 1 multi-melta and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'multi_melta', label: 'Multi-melta', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'twin heavy bolter', 1);
        add(ctx, q, 'godhammer lascannon', 2);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'multi_melta', 'no') === 'yes') add(ctx, q, 'multi-melta', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Land Raider Crusader': {
      sections: [{
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile, 1 multi-melta and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'multi_melta', label: 'Multi-melta', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'hurricane bolter', 2);
        add(ctx, q, 'twin assault cannon', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'multi_melta', 'no') === 'yes') add(ctx, q, 'multi-melta', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Land Raider Redeemer': {
      sections: [{
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile, 1 multi-melta and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'multi_melta', label: 'Multi-melta', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'flamestorm cannon', 2);
        add(ctx, q, 'twin assault cannon', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'multi_melta', 'no') === 'yes') add(ctx, q, 'multi-melta', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Outrider Squad': {
      sections: [{
        title: 'Invader ATV attachment',
        description: 'This unit can include 0-1 Invader ATV. An Invader ATVâ€™s onslaught gatling cannon can be replaced with 1 multi-melta.',
        controls: [
          { type: 'select', key: 'include_atv', label: 'Include Invader ATV', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'atv_weapon', label: 'Invader ATV weapon', value: 'onslaught gatling cannon', options: [
            { value: 'onslaught gatling cannon', label: 'Onslaught gatling cannon' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const includeAtv = select(ctx, 'include_atv', 'no') === 'yes';
        const atvCount = includeAtv ? 1 : 0;
        const bikeCount = ctx.modelCount - atvCount;

        if (bikeCount < 3) {
          ctx.errors.push('Outrider Squad must contain at least 3 Outrider models including the Sergeant.');
        }
        if (bikeCount > 6) {
          ctx.errors.push('Outrider Squad can contain no more than 6 Outrider models including the Sergeant.');
        }
        if (ctx.modelCount === 7 && !includeAtv) {
          ctx.errors.push('A 7-model Outrider Squad must include the Invader ATV.');
        }

        add(ctx, q, 'heavy bolt pistol', Math.max(0, bikeCount));
        add(ctx, q, 'twin bolt rifle', Math.max(0, bikeCount) + atvCount);
        add(ctx, q, 'astartes chainsword', Math.max(0, bikeCount));
        if (atvCount) {
          add(ctx, q, 'bolt pistol', 1);
          add(ctx, q, select(ctx, 'atv_weapon', 'onslaught gatling cannon'), 1);
          add(ctx, q, 'close combat weapon', 1);
        }
        return q;
      },
    },

    'Inceptor Squad': {
      sections: [{
        title: 'Inceptor weapon pattern',
        description: 'All models in this unit can each have their assault bolters replaced with 1 plasma exterminators.',
        controls: [
          { type: 'select', key: 'weapon_pattern', label: 'Squad weapon pattern', value: 'assault bolters', options: [
            { value: 'assault bolters', label: 'Assault bolters' },
            { value: 'plasma exterminators', label: 'Plasma exterminators' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'weapon_pattern', 'assault bolters'), ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      },
    },

    'Incursor Squad': {
      sections: [{
        title: 'Incursor equipment',
        description: 'One Incursor can be equipped with 1 haywire mine.',
        controls: [
          { type: 'select', key: 'haywire_mine', label: 'Haywire mine', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'occulus bolt carbine', ctx.modelCount);
        add(ctx, q, 'paired combat blades', ctx.modelCount);
        if (select(ctx, 'haywire_mine', 'no') === 'yes') {
          ctx.derived.push('Haywire mine equipped.');
        }
        return q;
      },
    },

    'Infiltrator Squad': {
      sections: [{
        title: 'Infiltrator wargear',
        description: '1 Infiltrator can be equipped with 1 helix gauntlet. 1 Infiltrator can be equipped with 1 Infiltrator comms array. These options cannot be taken on the same model.',
        controls: [
          { type: 'select', key: 'special_wargear', label: 'Special wargear', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'helix gauntlet', label: 'Helix gauntlet' },
            { value: 'infiltrator comms array', label: 'Infiltrator comms array' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'marksman bolt carbine', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        const specialWargear = select(ctx, 'special_wargear', 'none');
        if (specialWargear !== 'none') {
          ctx.derived.push(`${specialWargear === 'helix gauntlet' ? 'Helix gauntlet' : 'Infiltrator comms array'} equipped.`);
        }
        return q;
      },
    },

    'Reiver Squad': {
      sections: [{
        title: 'Primary loadout',
        description: 'All models in this unit can each have their combat knife replaced with 1 bolt carbine and 1 close combat weapon. If the Reiver Sergeant is equipped with 1 bolt carbine, it can be equipped with 1 combat knife.',
        controls: [
          { type: 'select', key: 'squad_loadout', label: 'Squad loadout', value: 'pistol-knife', options: [
            { value: 'pistol-knife', label: 'Special issue bolt pistol and combat knife' },
            { value: 'carbine', label: 'Bolt carbine and close combat weapon' },
          ] },
          { type: 'select', key: 'sergeant_extra_knife', label: 'Sergeant extra combat knife', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }, {
        title: 'Mobility gear',
        description: 'All models in this unit can each be equipped with 1 Reiver grav-chute. All models in this unit can each be equipped with 1 grapnel launcher.',
        controls: [
          { type: 'select', key: 'grav_chute', label: 'Reiver grav-chutes', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'grapnel_launcher', label: 'Grapnel launchers', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const squadLoadout = select(ctx, 'squad_loadout', 'pistol-knife');
        const extraKnife = select(ctx, 'sergeant_extra_knife', 'no') === 'yes';
        if (squadLoadout === 'carbine' && extraKnife) {
          add(ctx, q, 'bolt carbine', ctx.modelCount);
          add(ctx, q, 'close combat weapon', ctx.modelCount);
          add(ctx, q, 'combat knife', 1);
        } else if (squadLoadout === 'carbine') {
          add(ctx, q, 'bolt carbine', ctx.modelCount);
          add(ctx, q, 'close combat weapon', ctx.modelCount);
        } else {
          add(ctx, q, 'special issue bolt pistol', ctx.modelCount);
          add(ctx, q, 'combat knife', ctx.modelCount);
        }
        if (select(ctx, 'grav_chute', 'no') === 'yes') ctx.derived.push('Reiver grav-chutes equipped.');
        if (select(ctx, 'grapnel_launcher', 'no') === 'yes') ctx.derived.push('Grapnel launchers equipped.');
        if (extraKnife && squadLoadout !== 'carbine') ctx.errors.push('The Sergeant can only take the extra combat knife if the squad is using bolt carbines.');
        return q;
      },
    },

    'Terminator Assault Squad': {
      sections: [{
        title: 'Assault Terminator weapons',
        description: 'Any number of models can each have their thunder hammer and storm shield replaced with 1 twin lightning claws.',
        controls: [
          { key: 'lightning_claws', label: '1 twin lightning claws', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const claws = number(ctx, 'lightning_claws');
        if (claws > ctx.modelCount) {
          ctx.errors.push(`Twin lightning claws must total ${ctx.modelCount} or fewer; currently ${claws}.`);
        }
        add(ctx, q, 'thunder hammer', Math.max(0, ctx.modelCount - claws));
        add(ctx, q, 'twin lightning claws', claws);
        if (claws < ctx.modelCount) ctx.derived.push(`Storm shields remaining in unit: ${ctx.modelCount - claws}.`);
        return q;
      },
    },

    'Invader ATV': {
      sections: [{
        title: 'ATV main weapon',
        description: 'This modelâ€™s onslaught gatling cannon can be replaced with 1 multi-melta.',
        controls: [
          { type: 'select', key: 'main_weapon', label: 'Main weapon', value: 'onslaught gatling cannon', options: [
            { value: 'onslaught gatling cannon', label: 'Onslaught gatling cannon' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'twin bolt rifle', 1);
        add(ctx, q, select(ctx, 'main_weapon', 'onslaught gatling cannon'), 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Storm Speeder Hailstrike': {
      sections: [{
        title: 'Hailstrike loadout',
        description: 'This model is equipped with: 2 fragstorm grenade launchers; onslaught gatling cannon; twin ironhail heavy stubber; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'fragstorm grenade launcher', 2);
        add(ctx, q, 'onslaught gatling cannon', 1);
        add(ctx, q, 'twin ironhail heavy stubber', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Storm Speeder Hammerstrike': {
      sections: [{
        title: 'Hammerstrike loadout',
        description: 'This model is equipped with: Hammerstrike missile launcher; 2 krakstorm grenade launchers; melta destroyer; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'hammerstrike missile launcher', 1);
        add(ctx, q, 'krakstorm grenade launcher', 2);
        add(ctx, q, 'melta destroyer', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Storm Speeder Thunderstrike': {
      sections: [{
        title: 'Thunderstrike loadout',
        description: 'This model is equipped with: stormfury missiles; Thunderstrike las-talon; twin Icarus rocket pod; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'stormfury missiles', 1);
        add(ctx, q, 'thunderstrike las-talon', 1);
        add(ctx, q, 'twin icarus rocket pod', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Stormhawk Interceptor': {
      sections: [{
        title: 'Missile rack',
        description: 'This modelâ€™s skyhammer missile launcher can be replaced with 1 twin heavy bolter or 1 typhoon missile launcher.',
        controls: [
          { type: 'select', key: 'missile_rack', label: 'Missile rack', value: 'skyhammer missile launcher', options: [
            { value: 'skyhammer missile launcher', label: 'Skyhammer missile launcher' },
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'typhoon missile launcher', label: 'Typhoon missile launcher' },
          ] },
        ],
      }, {
        title: 'Secondary cannon',
        description: 'This modelâ€™s las-talon can be replaced with 1 Icarus stormcannon.',
        controls: [
          { type: 'select', key: 'secondary_cannon', label: 'Secondary cannon', value: 'las-talon', options: [
            { value: 'las-talon', label: 'Las-talon' },
            { value: 'icarus stormcannon', label: 'Icarus stormcannon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'twin assault cannon', 1);
        add(ctx, q, select(ctx, 'missile_rack', 'skyhammer missile launcher'), 1);
        add(ctx, q, select(ctx, 'secondary_cannon', 'las-talon'), 1);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Stormtalon Gunship': {
      sections: [{
        title: 'Wing weapon',
        description: 'This modelâ€™s skyhammer missile launcher can be replaced with 1 twin heavy bolter, 1 twin lascannon or 1 typhoon missile launcher.',
        controls: [
          { type: 'select', key: 'wing_weapon', label: 'Wing weapon', value: 'skyhammer missile launcher', options: [
            { value: 'skyhammer missile launcher', label: 'Skyhammer missile launcher' },
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin lascannon', label: 'Twin lascannon' },
            { value: 'typhoon missile launcher', label: 'Typhoon missile launcher' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'wing_weapon', 'skyhammer missile launcher'), 1);
        add(ctx, q, 'twin assault cannon', 1);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Rhino': {
      sections: [{
        title: 'Optional weapon',
        description: 'This model can be equipped with 1 hunter-killer missile.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'storm bolter', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        return q;
      },
    },

    'Razorback': {
      sections: [{
        title: 'Turret weapon',
        description: 'This modelâ€™s twin heavy bolter can be replaced with 1 twin lascannon.',
        controls: [
          { type: 'select', key: 'turret_weapon', label: 'Turret weapon', value: 'twin heavy bolter', options: [
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin lascannon', label: 'Twin lascannon' },
          ] },
        ],
      }, {
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'turret_weapon', 'twin heavy bolter'), 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Predator Annihilator': {
      sections: [{
        title: 'Sponson weapons',
        description: 'This model can be equipped with one of the following: 2 heavy bolters; 2 lascannons.',
        controls: [
          { type: 'select', key: 'sponsons', label: 'Sponson weapons', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'heavy bolter', label: '2 heavy bolters' },
            { value: 'lascannon', label: '2 lascannons' },
          ] },
        ],
      }, {
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'predator twin lascannon', 1);
        add(ctx, q, 'armoured tracks', 1);
        const sponsons = select(ctx, 'sponsons', 'none');
        if (sponsons !== 'none') add(ctx, q, sponsons, 2);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Predator Destructor': {
      sections: [{
        title: 'Sponson weapons',
        description: 'This model can be equipped with one of the following: 2 heavy bolters; 2 lascannons.',
        controls: [
          { type: 'select', key: 'sponsons', label: 'Sponson weapons', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'heavy bolter', label: '2 heavy bolters' },
            { value: 'lascannon', label: '2 lascannons' },
          ] },
        ],
      }, {
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'predator autocannon', 1);
        add(ctx, q, 'armoured tracks', 1);
        const sponsons = select(ctx, 'sponsons', 'none');
        if (sponsons !== 'none') add(ctx, q, sponsons, 2);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Vindicator': {
      sections: [{
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'demolisher cannon', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Whirlwind': {
      sections: [{
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'whirlwind vengeance launcher', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Dreadnought': {
      sections: [{
        title: 'Main ranged weapon',
        description: 'This modelâ€™s assault cannon can be replaced with one of the following: 1 heavy plasma cannon; 1 multi-melta; 1 twin lascannon.',
        controls: [
          { type: 'select', key: 'main_weapon', label: 'Main weapon', value: 'assault cannon', options: [
            { value: 'assault cannon', label: 'Assault cannon' },
            { value: 'heavy plasma cannon', label: 'Heavy plasma cannon' },
            { value: 'multi-melta', label: 'Multi-melta' },
            { value: 'twin lascannon', label: 'Twin lascannon' },
          ] },
        ],
      }, {
        title: 'Secondary arm',
        description: 'This modelâ€™s Dreadnought combat weapon and storm bolter can be replaced with one of the following: 1 missile launcher and 1 close combat weapon; 1 heavy flamer and 1 Dreadnought combat weapon.',
        controls: [
          { type: 'select', key: 'secondary_arm', label: 'Secondary arm', value: 'storm-bolter-arm', options: [
            { value: 'storm-bolter-arm', label: 'Storm bolter and Dreadnought combat weapon' },
            { value: 'missile-launcher-arm', label: 'Missile launcher and close combat weapon' },
            { value: 'heavy-flamer-arm', label: 'Heavy flamer and Dreadnought combat weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_weapon', 'assault cannon'), 1);
        const secondaryArm = select(ctx, 'secondary_arm', 'storm-bolter-arm');
        if (secondaryArm === 'missile-launcher-arm') {
          add(ctx, q, 'missile launcher', 1);
          add(ctx, q, 'close combat weapon', 1);
        } else if (secondaryArm === 'heavy-flamer-arm') {
          add(ctx, q, 'heavy flamer', 1);
          add(ctx, q, 'dreadnought combat weapon', 1);
        } else {
          add(ctx, q, 'storm bolter', 1);
          add(ctx, q, 'dreadnought combat weapon', 1);
        }
        return q;
      },
    },

    'Company Heroes': {
      sections: [{
        title: 'Company Heroes loadout',
        description: 'The Ancient is equipped with: bolt pistol; bolt rifle; close combat weapon. The Company Champion is equipped with: bolt pistol; master-crafted power weapon. One Company Veteran is equipped with: bolt pistol; master-crafted heavy bolter; close combat weapon. One Company Veteran is equipped with: bolt pistol; master-crafted bolt rifle; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 4);
        add(ctx, q, 'bolt rifle', 1);
        add(ctx, q, 'close combat weapon', 3);
        add(ctx, q, 'master-crafted power weapon', 1);
        add(ctx, q, 'master-crafted heavy bolter', 1);
        add(ctx, q, 'master-crafted bolt rifle', 1);
        return q;
      },
    },

    'Ancient': {
      sections: [{
        title: 'Ancient loadout',
        description: 'This modelâ€™s bolt rifle and close combat weapon can be replaced with 1 power weapon.',
        controls: [
          { type: 'select', key: 'loadout', label: 'Ancient loadout', value: 'default', options: [
            { value: 'default', label: 'Bolt pistol, bolt rifle, close combat weapon' },
            { value: 'power-weapon', label: 'Bolt pistol and power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'default');
        add(ctx, q, 'bolt pistol', 1);
        if (loadout === 'power-weapon') {
          add(ctx, q, 'power weapon', 1);
        } else {
          add(ctx, q, 'bolt rifle', 1);
          add(ctx, q, 'close combat weapon', 1);
        }
        return q;
      },
    },

    'Ancient In Terminator Armour': {
      sections: [{
        title: 'Primary melee weapon',
        description: 'This modelâ€™s power fist can be replaced with one of the following: 1 chainfist; 1 close combat weapon; 1 power weapon; 1 thunder hammer.',
        controls: [
          { type: 'select', key: 'melee_weapon', label: 'Melee weapon', value: 'power fist', options: [
            { value: 'power fist', label: 'Power fist' },
            { value: 'chainfist', label: 'Chainfist' },
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }, {
        title: 'Full replacement',
        description: 'This modelâ€™s storm bolter and power fist can be replaced with one of the following: 1 twin lightning claws; 1 thunder hammer and 1 Terminator storm shield.',
        controls: [
          { type: 'select', key: 'full_replacement', label: 'Storm bolter / power fist replacement', value: 'none', options: [
            { value: 'none', label: 'No full replacement' },
            { value: 'twin lightning claws', label: 'Twin lightning claws' },
            { value: 'hammer-shield', label: 'Thunder hammer and Terminator storm shield' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const replacement = select(ctx, 'full_replacement', 'none');
        if (replacement === 'twin lightning claws') {
          add(ctx, q, 'twin lightning claws', 1);
        } else if (replacement === 'hammer-shield') {
          add(ctx, q, 'thunder hammer', 1);
          ctx.derived.push('Terminator storm shield equipped.');
        } else {
          add(ctx, q, 'storm bolter', 1);
          add(ctx, q, select(ctx, 'melee_weapon', 'power fist'), 1);
        }
        return q;
      },
    },

    'Apothecary': {
      sections: [{
        title: 'Apothecary loadout',
        description: 'This model is equipped with: absolvor bolt pistol; reductor pistol; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'reductor pistol', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Apothecary Biologis': {
      sections: [{
        title: 'Apothecary Biologis loadout',
        description: 'This model is equipped with: absolvor bolt pistol; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Captain In Gravis Armour': {
      sections: [{
        title: 'Captain in Gravis Armour',
        description: 'This modelâ€™s master-crafted heavy bolt rifle and master-crafted power weapon can be replaced with: 1 boltstorm gauntlet, 1 power fist and 1 relic chainsword; 1 boltstorm gauntlet, 1 power fist and 1 relic blade; 1 boltstorm gauntlet, 1 power fist and 1 relic fist.',
        controls: [
          { type: 'select', key: 'loadout', label: 'Loadout', value: 'default', options: [
            { value: 'default', label: 'Master-crafted heavy bolt rifle and master-crafted power weapon' },
            { value: 'relic-chainsword', label: 'Boltstorm gauntlet, power fist and relic chainsword' },
            { value: 'relic-blade', label: 'Boltstorm gauntlet, power fist and relic blade' },
            { value: 'relic-fist', label: 'Boltstorm gauntlet, power fist and relic fist' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'default');
        if (loadout === 'relic-chainsword') {
          add(ctx, q, 'boltstorm gauntlet', 1);
          add(ctx, q, 'power fist', 1);
          add(ctx, q, 'relic chainsword', 1);
        } else if (loadout === 'relic-blade') {
          add(ctx, q, 'boltstorm gauntlet', 1);
          add(ctx, q, 'power fist', 1);
          add(ctx, q, 'relic blade', 1);
        } else if (loadout === 'relic-fist') {
          add(ctx, q, 'boltstorm gauntlet', 1);
          add(ctx, q, 'power fist', 1);
          add(ctx, q, 'relic fist', 1);
        } else {
          add(ctx, q, 'master-crafted heavy bolt rifle', 1);
          add(ctx, q, 'master-crafted power weapon', 1);
        }
        return q;
      },
    },

    'Captain In Phobos Armour': {
      sections: [{
        title: 'Captain in Phobos Armour loadout',
        description: 'This model is equipped with: bolt pistol; instigator bolt carbine; combat knife.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'instigator bolt carbine', 1);
        add(ctx, q, 'combat knife', 1);
        return q;
      },
    },

    'Chaplain In Terminator Armour': {
      sections: [{
        title: 'Chaplain in Terminator Armour loadout',
        description: 'This model is equipped with: storm bolter; crozius arcanum.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'storm bolter', 1);
        add(ctx, q, 'crozius arcanum', 1);
        return q;
      },
    },

    'Chaplain On Bike': {
      sections: [{
        title: 'Chaplain on Bike loadout',
        description: 'This model is equipped with: absolvor bolt pistol; twin bolt rifle; crozius arcanum.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'twin bolt rifle', 1);
        add(ctx, q, 'crozius arcanum', 1);
        return q;
      },
    },

    'Chaplain With Jump Pack': {
      sections: [{
        title: 'Chaplain with Jump Pack',
        description: 'This modelâ€™s bolt pistol can be replaced with one of the following: 1 boltgun; 1 combi-weapon; 1 grav-pistol; 1 hand flamer; 1 inferno pistol; 1 plasma pistol; 1 storm bolter; 1 power fist.',
        controls: [
          { type: 'select', key: 'replacement', label: 'Bolt pistol replacement', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'grav-pistol', label: 'Grav-pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'power fist', label: 'Power fist' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const replacement = select(ctx, 'replacement', 'bolt pistol');
        if (replacement === 'power fist') {
          add(ctx, q, 'power fist', 1);
          add(ctx, q, 'crozius arcanum', 1);
        } else {
          add(ctx, q, replacement, 1);
          add(ctx, q, 'crozius arcanum', 1);
        }
        return q;
      },
    },

    'Astorath': {
      sections: [{
        title: 'Astorath loadout',
        description: 'This model is equipped with: the Executionerâ€™s Axe.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'the executionerâ€™s axe', 1);
        return q;
      },
    },

    'Baal Predator': {
      sections: [{
        title: 'Turret weapon',
        description: 'This modelâ€™s twin assault cannon can be replaced with 1 Baal flamestorm cannon.',
        controls: [
          { type: 'select', key: 'turret_weapon', label: 'Turret weapon', value: 'twin assault cannon', options: [
            { value: 'twin assault cannon', label: 'Twin assault cannon' },
            { value: 'baal flamestorm cannon', label: 'Baal flamestorm cannon' },
          ] },
        ],
      }, {
        title: 'Sponson weapons',
        description: 'This model can be equipped with one of the following: 2 heavy bolters; 2 heavy flamers.',
        controls: [
          { type: 'select', key: 'sponsons', label: 'Sponson weapons', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'heavy bolter', label: '2 heavy bolters' },
            { value: 'heavy flamer', label: '2 heavy flamers' },
          ] },
        ],
      }, {
        title: 'Optional weapons',
        description: 'This model can be equipped with 1 hunter-killer missile and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'turret_weapon', 'twin assault cannon'), 1);
        add(ctx, q, 'armoured tracks', 1);
        const sponsons = select(ctx, 'sponsons', 'none');
        if (sponsons !== 'none') add(ctx, q, sponsons, 2);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Blood Angels Captain': {
      sections: [{
        title: 'Blood Angels Captain',
        description: 'This modelâ€™s heavy bolt pistol can be replaced with 1 inferno pistol. This modelâ€™s master-crafted chainsword can be replaced with one of the following: 1 power fist; 1 relic weapon.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'master-crafted chainsword', options: [
            { value: 'master-crafted chainsword', label: 'Master-crafted chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'relic weapon', label: 'Relic weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'pistol', 'heavy bolt pistol'), 1);
        add(ctx, q, select(ctx, 'melee', 'master-crafted chainsword'), 1);
        return q;
      },
    },

    'Chief Librarian Mephiston': {
      sections: [{
        title: 'Mephiston loadout',
        description: 'This model is equipped with: plasma pistol; Fury of the Ancients; Vitarus.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'plasma pistol', 1);
        add(ctx, q, 'fury of the ancients', 1);
        add(ctx, q, 'vitarus', 1);
        return q;
      },
    },

    'Commander Dante': {
      sections: [{
        title: 'Commander Dante loadout',
        description: 'This model is equipped with: Perdition; the Axe Mortalis.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'perdition pistol', 1);
        add(ctx, q, 'the axe mortalis', 1);
        return q;
      },
    },

    'Death Company Captain': {
      sections: [{
        title: 'Death Company Captain',
        description: 'This modelâ€™s heavy bolt pistol can be replaced with 1 inferno pistol. This modelâ€™s master-crafted chainsword can be replaced with one of the following: 1 power fist; 1 relic weapon.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'master-crafted chainsword', options: [
            { value: 'master-crafted chainsword', label: 'Master-crafted chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'relic weapon', label: 'Relic weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'pistol', 'heavy bolt pistol'), 1);
        add(ctx, q, select(ctx, 'melee', 'master-crafted chainsword'), 1);
        return q;
      },
    },

    'Death Company Captain with Jump Pack': {
      sections: [{
        title: 'Death Company Captain with Jump Pack',
        description: 'This modelâ€™s heavy bolt pistol can be replaced with one of the following: 1 plasma pistol; 1 hand flamer. This modelâ€™s Astartes chainsword can be replaced with one of the following: 1 relic weapon; 1 power fist.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'astartes chainsword', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'relic weapon', label: 'Relic weapon' },
            { value: 'power fist', label: 'Power fist' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'pistol', 'heavy bolt pistol'), 1);
        add(ctx, q, select(ctx, 'melee', 'astartes chainsword'), 1);
        return q;
      },
    },

    'Death Company Dreadnought': {
      sections: [{
        title: 'Death Company Dreadnought',
        description: 'This modelâ€™s twin heavy bolter can be replaced with 1 twin multi-melta. This modelâ€™s blood fists and blood fist bolt rifles can be replaced with 1 blood talons.',
        controls: [
          { type: 'select', key: 'chest_weapon', label: 'Chest weapon', value: 'twin heavy bolter', options: [
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin multi-melta', label: 'Twin multi-melta' },
          ] },
          { type: 'select', key: 'melee_arms', label: 'Melee arms', value: 'blood fists', options: [
            { value: 'blood fists', label: 'Blood fists and blood fist bolt rifles' },
            { value: 'blood talons', label: 'Blood talons' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'twin icarus ironhail heavy stubber', 1);
        add(ctx, q, select(ctx, 'chest_weapon', 'twin heavy bolter'), 1);
        const arms = select(ctx, 'melee_arms', 'blood fists');
        if (arms === 'blood talons') {
          add(ctx, q, 'blood talons', 1);
        } else {
          add(ctx, q, 'blood fist bolt rifles', 1);
          add(ctx, q, 'blood fists', 1);
        }
        return q;
      },
    },

    'Death Company Marines': {
      sections: [{
        title: 'Pistol replacement',
        description: '1 modelâ€™s heavy bolt pistol can be replaced with one of the following: 1 hand flamer; 1 inferno pistol; 1 plasma pistol.',
        controls: [
          { type: 'select', key: 'special_pistol', label: 'Special pistol', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
        ],
      }, {
        title: 'Special melee weapons',
        description: 'For every 5 models in this unit, 1 modelâ€™s Astartes chainsword can be replaced with 1 eviscerator. 1 modelâ€™s Astartes chainsword can be replaced with one of the following: 1 power fist; 1 power weapon; 1 thunder hammer.',
        controls: [
          { key: 'eviscerator', label: '1 eviscerator', max: maxPerFive },
          { type: 'select', key: 'special_melee', label: 'Special melee weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const specialPistol = select(ctx, 'special_pistol', 'none');
        const eviscerators = number(ctx, 'eviscerator');
        const specialMelee = select(ctx, 'special_melee', 'none');
        const chainswordReplacements = eviscerators + (specialMelee !== 'none' ? 1 : 0);
        const pistolReplacements = specialPistol !== 'none' ? 1 : 0;
        if (eviscerators > maxPerFive(ctx.modelCount)) ctx.errors.push(`Eviscerators must total ${maxPerFive(ctx.modelCount)} or fewer; currently ${eviscerators}.`);
        if (chainswordReplacements > ctx.modelCount) ctx.errors.push(`Astartes chainsword replacements exceed unit size (${ctx.modelCount}); currently ${chainswordReplacements}.`);
        add(ctx, q, 'heavy bolt pistol', Math.max(0, ctx.modelCount - pistolReplacements));
        if (specialPistol !== 'none') add(ctx, q, specialPistol, 1);
        add(ctx, q, 'astartes chainsword', Math.max(0, ctx.modelCount - chainswordReplacements));
        add(ctx, q, 'eviscerator', eviscerators);
        if (specialMelee !== 'none') add(ctx, q, specialMelee, 1);
        return q;
      },
    },

    'Death Company Marines With Jump Packs': {
      sections: [{
        title: 'Per-five upgrades',
        description: 'For every 5 models in this unit, 1 modelâ€™s heavy bolt pistol can be replaced with 1 plasma pistol. For every 5 models in this unit, 1 modelâ€™s Astartes chainsword can be replaced with 1 eviscerator.',
        controls: [
          { key: 'plasma_pistol', label: '1 plasma pistol', max: maxPerFive },
          { key: 'eviscerator', label: '1 eviscerator', max: maxPerFive },
        ],
      }, {
        title: 'Special weapon model',
        description: '1 modelâ€™s Astartes chainsword can be replaced with 1 power fist or 1 power weapon. For every 5 models in this unit, 1 modelâ€™s heavy bolt pistol and Astartes chainsword can be replaced with one of the listed hand flamer / melee combinations.',
        controls: [
          { type: 'select', key: 'special_melee', label: 'Single special melee weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
          { key: 'combo_hand_chainsword', label: 'Hand flamer and Astartes chainsword', max: maxPerFive },
          { key: 'combo_hand_fist', label: 'Hand flamer and power fist', max: maxPerFive },
          { key: 'combo_hand_weapon', label: 'Hand flamer and power weapon', max: maxPerFive },
          { key: 'combo_bolt_fist', label: 'Heavy bolt pistol and power fist', max: maxPerFive },
          { key: 'combo_bolt_weapon', label: 'Heavy bolt pistol and power weapon', max: maxPerFive },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const plasmaPistols = number(ctx, 'plasma_pistol');
        const eviscerators = number(ctx, 'eviscerator');
        const specialMelee = select(ctx, 'special_melee', 'none');
        const comboHandChainsword = number(ctx, 'combo_hand_chainsword');
        const comboHandFist = number(ctx, 'combo_hand_fist');
        const comboHandWeapon = number(ctx, 'combo_hand_weapon');
        const comboBoltFist = number(ctx, 'combo_bolt_fist');
        const comboBoltWeapon = number(ctx, 'combo_bolt_weapon');
        const comboTotal = comboHandChainsword + comboHandFist + comboHandWeapon + comboBoltFist + comboBoltWeapon;
        const perFive = maxPerFive(ctx.modelCount);
        if (plasmaPistols > perFive) ctx.errors.push(`Plasma pistols must total ${perFive} or fewer; currently ${plasmaPistols}.`);
        if (eviscerators > perFive) ctx.errors.push(`Eviscerators must total ${perFive} or fewer; currently ${eviscerators}.`);
        if (comboTotal > perFive) ctx.errors.push(`Combined special hand-flamer/heavy-bolt-pistol swap packages must total ${perFive} or fewer; currently ${comboTotal}.`);
        const pistolReplacements = plasmaPistols + comboHandChainsword + comboHandFist + comboHandWeapon;
        const chainswordReplacements = eviscerators + comboHandFist + comboHandWeapon + comboBoltFist + comboBoltWeapon + comboTotal + (specialMelee !== 'none' ? 1 : 0) - comboTotal;
        add(ctx, q, 'heavy bolt pistol', Math.max(0, ctx.modelCount - pistolReplacements));
        add(ctx, q, 'plasma pistol', plasmaPistols);
        add(ctx, q, 'hand flamer', comboHandChainsword + comboHandFist + comboHandWeapon);
        add(ctx, q, 'astartes chainsword', Math.max(0, ctx.modelCount - (eviscerators + comboHandFist + comboHandWeapon + comboBoltFist + comboBoltWeapon + (specialMelee !== 'none' ? 1 : 0))));
        add(ctx, q, 'eviscerator', eviscerators);
        add(ctx, q, 'power fist', comboHandFist + comboBoltFist + (specialMelee === 'power fist' ? 1 : 0));
        add(ctx, q, 'power weapon', comboHandWeapon + comboBoltWeapon + (specialMelee === 'power weapon' ? 1 : 0));
        return q;
      },
    },

    'Death Company Marines with Bolt Rifles': {
      sections: [{
        title: 'Bolt rifle replacements',
        description: '1 modelâ€™s bolt rifle can be replaced with one of the following: 1 Astartes chainsword; 1 hand flamer; 1 inferno pistol; 1 plasma pistol. For every 5 models in this unit, 1 modelâ€™s bolt rifle and close combat weapon can be replaced with 1 eviscerator. For every 5 models in this unit, 1 model equipped with a bolt rifle can be equipped with 1 Astartes grenade launcher.',
        controls: [
          { type: 'select', key: 'rifle_swap', label: 'Single bolt rifle replacement', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { key: 'eviscerator', label: '1 eviscerator', max: maxPerFive },
          { key: 'grenade_launcher', label: '1 Astartes grenade launcher', max: maxPerFive },
        ],
      }, {
        title: 'Melee upgrade',
        description: '1 modelâ€™s close combat weapon can be replaced with one of the following: 1 Astartes chainsword; 1 power fist; 1 power weapon; 1 thunder hammer.',
        controls: [
          { type: 'select', key: 'melee_upgrade', label: 'Close combat weapon replacement', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const rifleSwap = select(ctx, 'rifle_swap', 'none');
        const eviscerators = number(ctx, 'eviscerator');
        const grenadeLaunchers = number(ctx, 'grenade_launcher');
        const meleeUpgrade = select(ctx, 'melee_upgrade', 'none');
        const perFive = maxPerFive(ctx.modelCount);
        if (eviscerators > perFive) ctx.errors.push(`Eviscerators must total ${perFive} or fewer; currently ${eviscerators}.`);
        if (grenadeLaunchers > perFive) ctx.errors.push(`Astartes grenade launchers must total ${perFive} or fewer; currently ${grenadeLaunchers}.`);
        const rifleRemovals = eviscerators + (rifleSwap !== 'none' ? 1 : 0);
        const ccwRemovals = eviscerators + (meleeUpgrade !== 'none' ? 1 : 0);
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'bolt rifle', Math.max(0, ctx.modelCount - rifleRemovals));
        add(ctx, q, 'close combat weapon', Math.max(0, ctx.modelCount - ccwRemovals));
        if (rifleSwap !== 'none') add(ctx, q, rifleSwap, 1);
        add(ctx, q, 'eviscerator', eviscerators);
        if (grenadeLaunchers) add(ctx, q, 'astartes grenade launcher', grenadeLaunchers);
        if (meleeUpgrade !== 'none') add(ctx, q, meleeUpgrade, 1);
        return q;
      },
    },

    'Lemartes': {
      sections: [{
        title: 'Lemartes loadout',
        description: 'This model is equipped with: absolvor bolt pistol; the Blood Crozius.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'the blood crozius', 1);
        return q;
      },
    },

    'Sanguinary Priest': {
      sections: [{
        title: 'Sanguinary Priest loadout',
        description: 'This model is equipped with: absolvor bolt pistol; Astartes chainsword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'astartes chainsword', 1);
        return q;
      },
    },

    'The Sanguinor': {
      sections: [{
        title: 'The Sanguinor loadout',
        description: 'This model is equipped with: encarmine broadsword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'encarmine broadsword', 1);
        return q;
      },
    },

    'Librarian In Phobos Armour': {
      sections: [{
        title: 'Librarian in Phobos Armour loadout',
        description: 'This model is equipped with: bolt pistol; Smite; force weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'smite', 1);
        add(ctx, q, 'force weapon', 1);
        return q;
      },
    },

    'Librarian In Terminator Armour': {
      sections: [{
        title: 'Librarian in Terminator Armour',
        description: 'This model can be equipped with one of the following: 1 combi-weapon; 1 storm bolter.',
        controls: [
          { type: 'select', key: 'ranged_weapon', label: 'Ranged weapon', value: 'storm bolter', options: [
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged_weapon', 'storm bolter'), 1);
        add(ctx, q, 'smite', 1);
        add(ctx, q, 'force weapon', 1);
        return q;
      },
    },

    'Lieutenant In Phobos Armour': {
      sections: [{
        title: 'Lieutenant in Phobos Armour loadout',
        description: 'This model is equipped with: bolt pistol; master-crafted scoped bolt carbine; paired combat blades.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'master-crafted scoped bolt carbine', 1);
        add(ctx, q, 'paired combat blades', 1);
        return q;
      },
    },

    'Lieutenant In Reiver Armour': {
      sections: [{
        title: 'Lieutenant in Reiver Armour loadout',
        description: 'This model is equipped with: master-crafted special issue bolt pistol; combat knife.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'master-crafted special issue bolt pistol', 1);
        add(ctx, q, 'combat knife', 1);
        return q;
      },
    },

    'Lieutenant With Combi-weapon': {
      sections: [{
        title: 'Lieutenant with Combi-weapon loadout',
        description: 'This model is equipped with: combi-weapon; paired combat blades.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'combi-weapon', 1);
        add(ctx, q, 'paired combat blades', 1);
        return q;
      },
    },

    'Sword Brethren Squad': {
      sections: [{
        title: 'Melee weapons',
        description: 'Any number of Sword Brothers can each have their Astartes chainsword replaced with 1 master-crafted power weapon. For every 5 models in this unit, 1 Sword Brotherâ€™s Astartes chainsword can be replaced with 1 thunder hammer. For every 5 models in this unit, 1 Sword Brotherâ€™s heavy bolt pistol and Astartes chainsword can be replaced with 1 twin lightning claws.',
        controls: [
          { key: 'mastercrafted_power_weapon', label: '1 master-crafted power weapon', max: models => Math.max(0, Number(models || 0)) },
          { key: 'thunder_hammer', label: '1 thunder hammer', max: maxPerFive },
          { key: 'twin_lightning_claws', label: '1 twin lightning claws', max: maxPerFive },
        ],
      }, {
        title: 'Pistol swaps',
        description: 'For every 5 models in this unit, 1 Sword Brotherâ€™s heavy bolt pistol can be replaced with 1 plasma pistol. For every 5 models in this unit, up to 2 Sword Brothers can each have their heavy bolt pistol replaced with 1 pyre pistol.',
        controls: [
          { key: 'plasma_pistol', label: '1 plasma pistol', max: maxPerFive },
          { key: 'pyre_pistol', label: '1 pyre pistol', max: models => maxPerFive(models) * 2 },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const powerWeapons = number(ctx, 'mastercrafted_power_weapon');
        const thunderHammers = number(ctx, 'thunder_hammer');
        const lightningClaws = number(ctx, 'twin_lightning_claws');
        const plasmaPistols = number(ctx, 'plasma_pistol');
        const pyrePistols = number(ctx, 'pyre_pistol');
        const fiveModelLimit = maxPerFive(ctx.modelCount);
        const chainswordReplacements = powerWeapons + thunderHammers + lightningClaws;
        const pistolReplacements = plasmaPistols + pyrePistols + lightningClaws;

        if (thunderHammers > fiveModelLimit) ctx.errors.push(`Thunder hammers must total ${fiveModelLimit} or fewer; currently ${thunderHammers}.`);
        if (lightningClaws > fiveModelLimit) ctx.errors.push(`Twin lightning claws must total ${fiveModelLimit} or fewer; currently ${lightningClaws}.`);
        if (plasmaPistols > fiveModelLimit) ctx.errors.push(`Plasma pistols must total ${fiveModelLimit} or fewer; currently ${plasmaPistols}.`);
        if (pyrePistols > fiveModelLimit * 2) ctx.errors.push(`Pyre pistols must total ${(fiveModelLimit * 2)} or fewer; currently ${pyrePistols}.`);
        if (chainswordReplacements > ctx.modelCount) {
          ctx.errors.push(`Astartes chainsword replacements exceed unit size (${ctx.modelCount}); currently ${chainswordReplacements}.`);
        }
        if (pistolReplacements > ctx.modelCount) {
          ctx.errors.push(`Heavy bolt pistol replacements exceed unit size (${ctx.modelCount}); currently ${pistolReplacements}.`);
        }

        add(ctx, q, 'heavy bolt pistol', Math.max(0, ctx.modelCount - pistolReplacements));
        add(ctx, q, 'astartes chainsword', Math.max(0, ctx.modelCount - chainswordReplacements));
        add(ctx, q, 'master-crafted power weapon', powerWeapons);
        add(ctx, q, 'thunder hammer', thunderHammers);
        add(ctx, q, 'twin lightning claws', lightningClaws);
        add(ctx, q, 'plasma pistol', plasmaPistols);
        add(ctx, q, 'pyre pistol', pyrePistols);
        return q;
      },
    },

    'Vanguard Veteran Squad With Jump Packs': {
      sections: [{
        title: 'Pistol replacements',
        description: 'Any number of models can each have their bolt pistol replaced one of the following: 1 storm shield; 1 grav-pistol; 1 hand flamer; 1 inferno pistol; 1 plasma pistol.',
        controls: [
          { key: 'storm_shield', label: '1 storm shield', max: models => Math.max(0, Number(models || 0)) },
          { key: 'grav_pistol', label: '1 grav-pistol', max: models => Math.max(0, Number(models || 0)) },
          { key: 'hand_flamer', label: '1 hand flamer', max: models => Math.max(0, Number(models || 0)) },
          { key: 'inferno_pistol', label: '1 inferno pistol', max: models => Math.max(0, Number(models || 0)) },
          { key: 'plasma_pistol', label: '1 plasma pistol', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const stormShields = number(ctx, 'storm_shield');
        const gravPistols = number(ctx, 'grav_pistol');
        const handFlamers = number(ctx, 'hand_flamer');
        const infernoPistols = number(ctx, 'inferno_pistol');
        const plasmaPistols = number(ctx, 'plasma_pistol');
        const replacements = stormShields + gravPistols + handFlamers + infernoPistols + plasmaPistols;

        if (replacements > ctx.modelCount) {
          ctx.errors.push(`Bolt pistol replacements exceed unit size (${ctx.modelCount}); currently ${replacements}.`);
        }

        add(ctx, q, 'bolt pistol', Math.max(0, ctx.modelCount - replacements));
        add(ctx, q, 'grav-pistol', gravPistols);
        add(ctx, q, 'hand flamer', handFlamers);
        add(ctx, q, 'inferno pistol', infernoPistols);
        add(ctx, q, 'plasma pistol', plasmaPistols);
        add(ctx, q, 'vanguard veteran weapon', ctx.modelCount);
        if (stormShields) ctx.derived.push(`Storm shields equipped: ${stormShields}.`);
        return q;
      },
    },

    'Sanguinary Guard': {
      sections: [{
        title: 'Encarmine weapons',
        description: 'Any number of models can each have their encarmine blade replaced with 1 encarmine spear.',
        controls: [
          { key: 'encarmine_spear', label: '1 encarmine spear', max: models => Math.max(0, Number(models || 0)) },
        ],
      }, {
        title: 'Pistol swaps and banner',
        description: 'For every 3 models in this unit, 1 modelâ€™s Angelus boltgun can be replaced with 1 inferno pistol. One model can be equipped with 1 Sanguinary banner.',
        controls: [
          { key: 'inferno_pistol', label: '1 inferno pistol', max: maxPerThree },
          { type: 'select', key: 'sanguinary_banner', label: 'Sanguinary banner', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const spears = number(ctx, 'encarmine_spear');
        const infernoPistols = number(ctx, 'inferno_pistol');
        const pistolLimit = maxPerThree(ctx.modelCount);

        if (spears > ctx.modelCount) ctx.errors.push(`Encarmine spears must total ${ctx.modelCount} or fewer; currently ${spears}.`);
        if (infernoPistols > pistolLimit) ctx.errors.push(`Inferno pistols must total ${pistolLimit} or fewer; currently ${infernoPistols}.`);

        add(ctx, q, 'angelus boltgun', Math.max(0, ctx.modelCount - infernoPistols));
        add(ctx, q, 'inferno pistol', infernoPistols);
        add(ctx, q, 'encarmine blade', Math.max(0, ctx.modelCount - spears));
        add(ctx, q, 'encarmine spear', spears);
        if (select(ctx, 'sanguinary_banner', 'no') === 'yes') ctx.derived.push('Sanguinary banner equipped.');
        return q;
      },
    },

    'Thunderwolf Cavalry': {
      sections: [{
        title: 'Pistol replacements',
        description: 'Any number of models can each have their bolt pistol replaced with one of the following: 1 boltgun; 1 storm shield. For every 3 models in this unit, one modelâ€™s bolt pistol can be replaced with 1 plasma pistol.',
        controls: [
          { key: 'boltgun', label: '1 boltgun', max: models => Math.max(0, Number(models || 0)) },
          { key: 'storm_shield', label: '1 storm shield', max: models => Math.max(0, Number(models || 0)) },
          { key: 'plasma_pistol', label: '1 plasma pistol', max: maxPerThree },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const boltguns = number(ctx, 'boltgun');
        const stormShields = number(ctx, 'storm_shield');
        const plasmaPistols = number(ctx, 'plasma_pistol');
        const replacements = boltguns + stormShields + plasmaPistols;
        const plasmaLimit = maxPerThree(ctx.modelCount);

        if (plasmaPistols > plasmaLimit) ctx.errors.push(`Plasma pistols must total ${plasmaLimit} or fewer; currently ${plasmaPistols}.`);
        if (replacements > ctx.modelCount) ctx.errors.push(`Bolt pistol replacements exceed unit size (${ctx.modelCount}); currently ${replacements}.`);

        add(ctx, q, 'bolt pistol', Math.max(0, ctx.modelCount - replacements));
        add(ctx, q, 'boltgun', boltguns);
        add(ctx, q, 'plasma pistol', plasmaPistols);
        add(ctx, q, 'teeth and claws', ctx.modelCount);
        add(ctx, q, 'wolf guard weapon', ctx.modelCount);
        if (stormShields) ctx.derived.push(`Storm shields equipped: ${stormShields}.`);
        return q;
      },
    },

    'Arjac Rockfist': {
      sections: [{
        title: 'Arjac Rockfist loadout',
        description: 'This model is equipped with: Foehammer.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'foehammer', 1);
        return q;
      },
    },

    'Bjorn The Fell-handed': {
      sections: [{
        title: 'Bjorn main gun',
        description: 'This modelâ€™s assault cannon can be replaced with one of the following: 1 helfrost cannon; 1 multi-melta.',
        controls: [
          { type: 'select', key: 'main_weapon', label: 'Main weapon', value: 'assault cannon', options: [
            { value: 'assault cannon', label: 'Assault cannon' },
            { value: 'helfrost cannon', label: 'Helfrost cannon' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_weapon', 'assault cannon'), 1);
        add(ctx, q, 'heavy flamer', 1);
        add(ctx, q, 'trueclaw', 1);
        return q;
      },
    },

    'Blood Claws': {
      sections: [{
        title: 'Blood Claw Pack Leader',
        description: 'The Blood Claw Pack Leaderâ€™s bolt pistol can be replaced with 1 plasma pistol. The Blood Claw Pack Leaderâ€™s Astartes chainsword can be replaced with 1 power weapon.',
        controls: [
          { type: 'select', key: 'leader_pistol', label: 'Pack Leader pistol', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'leader_melee', label: 'Pack Leader melee weapon', value: 'astartes chainsword', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const leaderPistol = select(ctx, 'leader_pistol', 'bolt pistol');
        const leaderMelee = select(ctx, 'leader_melee', 'astartes chainsword');
        add(ctx, q, 'bolt pistol', (ctx.modelCount - 1) + (leaderPistol === 'bolt pistol' ? 1 : 0));
        if (leaderPistol === 'plasma pistol') add(ctx, q, 'plasma pistol', 1);
        add(ctx, q, 'astartes chainsword', (ctx.modelCount - 1) + (leaderMelee === 'astartes chainsword' ? 1 : 0));
        if (leaderMelee === 'power weapon') add(ctx, q, 'power weapon', 1);
        return q;
      },
    },

    'Fenrisian Wolves': {
      sections: [{
        title: 'Fenrisian Wolves loadout',
        description: 'Every model is equipped with: teeth and claws.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'teeth and claws', ctx.modelCount);
        return q;
      },
    },

    'Grey Hunters': {
      sections: [{
        title: 'Grey Hunter Pack Leader',
        description: 'The Grey Hunter Pack Leaderâ€™s bolt carbine can be replaced with 1 plasma pistol. The Grey Hunter Pack Leaderâ€™s Astartes chainsword can be replaced with 1 power fist or 1 power weapon.',
        controls: [
          { type: 'select', key: 'leader_ranged', label: 'Pack Leader ranged weapon', value: 'bolt carbine', options: [
            { value: 'bolt carbine', label: 'Bolt carbine' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'leader_melee', label: 'Pack Leader melee weapon', value: 'astartes chainsword', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const leaderRanged = select(ctx, 'leader_ranged', 'bolt carbine');
        const leaderMelee = select(ctx, 'leader_melee', 'astartes chainsword');
        add(ctx, q, 'bolt carbine', (ctx.modelCount - 1) + (leaderRanged === 'bolt carbine' ? 1 : 0));
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'astartes chainsword', (ctx.modelCount - 1) + (leaderMelee === 'astartes chainsword' ? 1 : 0));
        if (leaderRanged === 'plasma pistol') add(ctx, q, 'plasma pistol', 1);
        if (leaderMelee !== 'astartes chainsword') add(ctx, q, leaderMelee, 1);
        return q;
      },
    },

    'Iron Priest': {
      sections: [{
        title: 'Iron Priest loadout',
        description: 'This model is equipped with: helfrost pistol; tempest hammer and servo-arm.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'helfrost pistol', 1);
        add(ctx, q, 'tempest hammer and servo-arm', 1);
        return q;
      },
    },

    'Logan Grimnar': {
      sections: [{
        title: 'Logan Grimnar loadout',
        description: 'This model is equipped with: storm bolter; Axe Morkai; Tyrnak and Fenrir.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'storm bolter', 1);
        add(ctx, q, 'axe morkai', 1);
        add(ctx, q, 'tyrnak and fenrir', 1);
        return q;
      },
    },

    'Murderfang': {
      sections: [{
        title: 'Murderfang loadout',
        description: 'This model is equipped with: heavy flamer; storm bolter; Murderclaws.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy flamer', 1);
        add(ctx, q, 'storm bolter', 1);
        add(ctx, q, 'murderclaws', 1);
        return q;
      },
    },

    'Njal Stormcaller': {
      sections: [{
        title: 'Njal Stormcaller loadout',
        description: 'This model is equipped with: bolt pistol; Living Lightning; Staff of the Stormcaller.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'living lightning', 1);
        add(ctx, q, 'staff of the stormcaller', 1);
        return q;
      },
    },

    'Ragnar Blackmane': {
      sections: [{
        title: 'Ragnar Blackmane loadout',
        description: 'This model is equipped with: bolt pistol; Frostfang.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'frostfang', 1);
        return q;
      },
    },

    'Ulrik The Slayer': {
      sections: [{
        title: 'Ulrik the Slayer loadout',
        description: 'This model is equipped with: plasma pistol; artificer crozius arcanum.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'plasma pistol', 1);
        add(ctx, q, 'artificer crozius arcanum', 1);
        return q;
      },
    },

    'Venerable Dreadnought': {
      sections: [{
        title: 'Main gun',
        description: 'This modelâ€™s assault cannon can be replaced with one of the following: 1 helfrost cannon; 1 multi-melta.',
        controls: [
          { type: 'select', key: 'main_weapon', label: 'Main weapon', value: 'assault cannon', options: [
            { value: 'assault cannon', label: 'Assault cannon' },
            { value: 'helfrost cannon', label: 'Helfrost cannon' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }, {
        title: 'Off-hand weapon',
        description: 'This modelâ€™s storm bolter can be replaced with 1 heavy flamer.',
        controls: [
          { type: 'select', key: 'offhand_weapon', label: 'Storm bolter replacement', value: 'storm bolter', options: [
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'heavy flamer', label: 'Heavy flamer' },
          ] },
        ],
      }, {
        title: 'Full arm replacement',
        description: 'This modelâ€™s assault cannon, storm bolter and Dreadnought combat weapon can be replaced with one of the following: 1 Fenrisian greataxe, 1 blizzard shield and 1 storm bolter; 1 Fenrisian greataxe, 1 blizzard shield and 1 heavy flamer.',
        controls: [
          { type: 'select', key: 'full_replacement', label: 'Full arm replacement', value: 'none', options: [
            { value: 'none', label: 'No full replacement' },
            { value: 'greataxe-stormbolter', label: 'Fenrisian greataxe, blizzard shield and storm bolter' },
            { value: 'greataxe-flamer', label: 'Fenrisian greataxe, blizzard shield and heavy flamer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const replacement = select(ctx, 'full_replacement', 'none');
        if (replacement === 'greataxe-stormbolter') {
          add(ctx, q, 'fenrisian greataxe', 1);
          add(ctx, q, 'storm bolter', 1);
          ctx.derived.push('Blizzard shield equipped.');
        } else if (replacement === 'greataxe-flamer') {
          add(ctx, q, 'fenrisian greataxe', 1);
          add(ctx, q, 'heavy flamer', 1);
          ctx.derived.push('Blizzard shield equipped.');
        } else {
          add(ctx, q, select(ctx, 'main_weapon', 'assault cannon'), 1);
          add(ctx, q, select(ctx, 'offhand_weapon', 'storm bolter'), 1);
          add(ctx, q, 'dreadnought combat weapon', 1);
        }
        return q;
      },
    },

    'Wolf Guard Battle Leader': {
      sections: [{
        title: 'Melee weapon',
        description: 'This modelâ€™s master-crafted power weapon can be replaced with 1 thunder hammer.',
        controls: [
          { type: 'select', key: 'melee_weapon', label: 'Melee weapon', value: 'master-crafted power weapon', options: [
            { value: 'master-crafted power weapon', label: 'Master-crafted power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }, {
        title: 'Storm shield replacement',
        description: 'This modelâ€™s storm shield can be replaced with one of the following: 1 master-crafted bolt carbine; 1 master-crafted heavy bolt pistol; 1 plasma pistol.',
        controls: [
          { type: 'select', key: 'shield_replacement', label: 'Storm shield replacement', value: 'storm shield', options: [
            { value: 'storm shield', label: 'Keep storm shield' },
            { value: 'master-crafted bolt carbine', label: 'Master-crafted bolt carbine' },
            { value: 'master-crafted heavy bolt pistol', label: 'Master-crafted heavy bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'melee_weapon', 'master-crafted power weapon'), 1);
        const shieldReplacement = select(ctx, 'shield_replacement', 'storm shield');
        if (shieldReplacement === 'storm shield') {
          ctx.derived.push('Storm shield equipped.');
        } else {
          add(ctx, q, shieldReplacement, 1);
        }
        return q;
      },
    },

    'Wolf Guard Headtakers': {
      sections: [{
        title: 'Headtaker weapon pattern',
        description: 'All Wolf Guard Headtakers can either keep their master-crafted power weapon and storm shield or replace them with paired master-crafted power weapons. Hunting Wolves are fixed loadout.',
        controls: [
          { type: 'select', key: 'weapon_pattern', label: 'Headtaker weapon pattern', value: 'storm-shield', options: [
            { value: 'storm-shield', label: 'Heavy bolt pistol, master-crafted power weapon and storm shield' },
            { value: 'paired', label: 'Heavy bolt pistol and paired master-crafted power weapons' },
          ] },
          { key: 'hunting_wolves', label: 'Hunting Wolves in unit', max: 6 },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const hunters = number(ctx, 'hunting_wolves');
        const headtakers = ctx.modelCount - hunters;
        if (hunters > 6) ctx.errors.push('Hunting Wolves must total 6 or fewer.');
        if (headtakers < 3 || headtakers > 6) ctx.errors.push('Wolf Guard Headtakers must total between 3 and 6 models.');
        add(ctx, q, 'heavy bolt pistol', Math.max(0, headtakers));
        if (select(ctx, 'weapon_pattern', 'storm-shield') === 'paired') {
          add(ctx, q, 'paired master-crafted power weapons', Math.max(0, headtakers));
        } else {
          add(ctx, q, 'master-crafted power weapon', Math.max(0, headtakers));
          if (headtakers > 0) ctx.derived.push(`Storm shields equipped: ${headtakers}.`);
        }
        add(ctx, q, 'teeth and claws', Math.max(0, hunters));
        return q;
      },
    },

    'Wolf Guard Terminators': {
      sections: [{
        title: 'Storm shields',
        description: 'Any number of models can each have their storm bolter replaced with 1 storm shield.',
        controls: [
          { key: 'storm_shield', label: '1 storm shield', max: models => Math.max(0, Number(models || 0)) },
        ],
      }, {
        title: 'Assault cannon',
        description: 'For every 5 models in this unit, 1 Wolf Guard Terminator can replace its storm bolter and master-crafted power weapon with 1 assault cannon and 1 power fist.',
        controls: [
          { key: 'assault_cannon', label: '1 assault cannon and 1 power fist', max: maxPerFive },
        ],
      }, {
        title: 'Pack Leader',
        description: 'The Wolf Guard Terminator Pack Leaderâ€™s storm bolter and master-crafted power weapon can be replaced with 1 relic greataxe or 1 twin lightning claws.',
        controls: [
          { type: 'select', key: 'leader_loadout', label: 'Pack Leader replacement', value: 'default', options: [
            { value: 'default', label: 'Storm bolter and master-crafted power weapon' },
            { value: 'relic greataxe', label: 'Relic greataxe' },
            { value: 'twin lightning claws', label: 'Twin lightning claws' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const shields = number(ctx, 'storm_shield');
        const assaultCannons = number(ctx, 'assault_cannon');
        const leader = select(ctx, 'leader_loadout', 'default');
        const limit = maxPerFive(ctx.modelCount);
        if (assaultCannons > limit) ctx.errors.push(`Assault cannons must total ${limit} or fewer; currently ${assaultCannons}.`);
        if (shields + assaultCannons + (leader !== 'default' ? 1 : 0) > ctx.modelCount) ctx.errors.push(`Storm bolter replacements exceed unit size (${ctx.modelCount}).`);
        const defaultLeaderBolter = leader === 'default' ? 1 : 0;
        const defaultLeaderWeapon = leader === 'default' ? 1 : 0;
        add(ctx, q, 'storm bolter', Math.max(0, (ctx.modelCount - 1 - shields - assaultCannons) + defaultLeaderBolter));
        add(ctx, q, 'master-crafted power weapon', Math.max(0, (ctx.modelCount - 1 - assaultCannons) + defaultLeaderWeapon));
        add(ctx, q, 'assault cannon', assaultCannons);
        add(ctx, q, 'power fist', assaultCannons);
        if (leader === 'relic greataxe') add(ctx, q, 'relic greataxe', 1);
        if (leader === 'twin lightning claws') add(ctx, q, 'twin lightning claws', 1);
        if (shields) ctx.derived.push(`Storm shields equipped: ${shields}.`);
        return q;
      },
    },

    'Wolf Priest': {
      sections: [{
        title: 'Wolf Priest loadout',
        description: 'This model is equipped with: absolvor bolt pistol; crozius arcanum.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'crozius arcanum', 1);
        return q;
      },
    },

    'Wolf Scouts': {
      sections: [{
        title: 'Wolf Scout weapon swaps',
        description: 'Any number of Wolf Scouts can each replace their boltgun with 1 Astartes shotgun or 1 combat knife. 1 Wolf Scout can replace its boltgun with 1 flamer, 1 grav-gun, 1 heavy bolter, 1 meltagun, 1 missile launcher or 1 plasma gun. 1 Wolf Scout can replace its boltgun and bolt pistol with 1 bolt pistol and 1 power weapon, or 1 boltgun and 1 plasma pistol.',
        controls: [
          { key: 'astartes_shotgun', label: '1 Astartes shotgun', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'combat_knife', label: '1 combat knife', max: models => Math.max(0, Number(models || 0) - 1) },
          { type: 'select', key: 'special_weapon', label: 'Single special weapon', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'flamer', label: 'Flamer' },
            { value: 'grav-gun', label: 'Grav-gun' },
            { value: 'heavy bolter', label: 'Heavy bolter' },
            { value: 'meltagun', label: 'Meltagun' },
            { value: 'missile launcher', label: 'Missile launcher' },
            { value: 'plasma gun', label: 'Plasma gun' },
          ] },
          { type: 'select', key: 'special_swap', label: 'Single boltgun/bolt pistol replacement', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'power-weapon', label: 'Bolt pistol and power weapon' },
            { value: 'plasma-pistol', label: 'Boltgun and plasma pistol' },
          ] },
        ],
      }, {
        title: 'Wolf Scout Pack Leader',
        description: 'The Wolf Scout Pack Leaderâ€™s boltgun and bolt pistol can be replaced with 1 twin lightning claws, or with two different weapons from the following list: 1 Astartes chainsword; 1 bolt pistol; 1 boltgun; 1 combi-weapon; 1 grav-pistol; 1 hand flamer; 1 inferno pistol; 1 plasma pistol; 1 power fist; 1 power weapon; 1 storm bolter; 1 thunder hammer. This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol).',
        controls: [
          { type: 'select', key: 'leader_loadout', label: 'Pack Leader full replacement', value: 'two-weapons', options: [
            { value: 'two-weapons', label: 'Choose two weapons' },
            { value: 'twin lightning claws', label: 'Twin lightning claws' },
          ] },
          { type: 'select', key: 'leader_weapon_a', label: 'Pack Leader weapon A', value: 'bolt pistol', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'grav-pistol', label: 'Grav-pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
          { type: 'select', key: 'leader_weapon_b', label: 'Pack Leader weapon B', value: 'boltgun', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'grav-pistol', label: 'Grav-pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const nonLeaderCount = Math.max(0, ctx.modelCount - 1);
        const shotguns = number(ctx, 'astartes_shotgun');
        const knives = number(ctx, 'combat_knife');
        const specialWeapon = select(ctx, 'special_weapon', 'none');
        const specialSwap = select(ctx, 'special_swap', 'none');
        const leaderLoadout = select(ctx, 'leader_loadout', 'two-weapons');
        const leaderWeaponA = select(ctx, 'leader_weapon_a', 'bolt pistol');
        const leaderWeaponB = select(ctx, 'leader_weapon_b', 'boltgun');
        const specialWeaponCount = specialWeapon === 'none' ? 0 : 1;
        const specialSwapCount = specialSwap === 'none' ? 0 : 1;
        const nonLeaderBoltgunReplacements = shotguns + knives + specialWeaponCount + specialSwapCount;

        if (nonLeaderBoltgunReplacements > nonLeaderCount) {
          ctx.errors.push(`Wolf Scout boltgun replacements exceed the ${nonLeaderCount} non-leader models in the unit.`);
        }

        if (leaderLoadout === 'two-weapons') {
          if (leaderWeaponA === leaderWeaponB) ctx.errors.push('Wolf Scout Pack Leader weapons A and B must be different choices.');
          const rangedOptions = ['bolt pistol', 'boltgun', 'combi-weapon', 'grav-pistol', 'hand flamer', 'inferno pistol', 'plasma pistol', 'storm bolter'];
          const pistolOptions = ['bolt pistol', 'grav-pistol', 'hand flamer', 'inferno pistol', 'plasma pistol'];
          const rangedCount = [leaderWeaponA, leaderWeaponB].filter(option => rangedOptions.includes(option)).length;
          const pistolCount = [leaderWeaponA, leaderWeaponB].filter(option => pistolOptions.includes(option)).length;
          if (rangedCount === 2 && pistolCount !== 1) ctx.errors.push('The Wolf Scout Pack Leader can only take two ranged weapons if exactly one of them is a Pistol.');
          if (pistolCount > 1) ctx.errors.push('The Wolf Scout Pack Leader can only have one Pistol.');
        }

        add(ctx, q, 'bolt pistol', nonLeaderCount + (specialSwap === 'power-weapon' ? 1 : 0));
        add(ctx, q, 'boltgun', Math.max(0, nonLeaderCount - nonLeaderBoltgunReplacements) + (specialSwap === 'plasma-pistol' ? 1 : 0));
        add(ctx, q, 'close combat weapon', nonLeaderCount);
        add(ctx, q, 'astartes shotgun', shotguns);
        add(ctx, q, 'combat knife', knives);
        if (specialWeapon === 'flamer') add(ctx, q, 'flamer', 1);
        if (specialWeapon === 'grav-gun') add(ctx, q, 'grav-gun', 1);
        if (specialWeapon === 'heavy bolter') add(ctx, q, 'heavy bolter', 1);
        if (specialWeapon === 'meltagun') add(ctx, q, 'meltagun', 1);
        if (specialWeapon === 'missile launcher') add(ctx, q, 'missile launcher', 1);
        if (specialWeapon === 'plasma gun') add(ctx, q, 'plasma gun', 1);
        if (specialSwap === 'power-weapon') add(ctx, q, 'power weapon', 1);
        if (specialSwap === 'plasma-pistol') add(ctx, q, 'plasma pistol', 1);

        if (leaderLoadout === 'twin lightning claws') {
          add(ctx, q, 'twin lightning claws', 1);
        } else {
          add(ctx, q, leaderWeaponA, 1);
          add(ctx, q, leaderWeaponB, 1);
        }
        return q;
      },
    },

    'Wulfen': {
      sections: [{
        title: 'Death totem replacement',
        description: 'Any number of models can each have their death totem replaced with 1 stormfrag auto-launcher.',
        controls: [
          { key: 'stormfrag_auto_launcher', label: '1 stormfrag auto-launcher', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const launchers = number(ctx, 'stormfrag_auto_launcher');
        if (launchers > ctx.modelCount) ctx.errors.push(`Stormfrag auto-launchers must total ${ctx.modelCount} or fewer; currently ${launchers}.`);
        add(ctx, q, 'wulfen weapons', ctx.modelCount);
        add(ctx, q, 'stormfrag auto-launcher', launchers);
        if (ctx.modelCount - launchers > 0) ctx.derived.push(`Death totems remaining: ${ctx.modelCount - launchers}.`);
        return q;
      },
    },

    'Wulfen Dreadnought': {
      sections: [{
        title: 'Shield replacement',
        description: 'This modelâ€™s Fenrisian greataxe or great wolf claw and storm bolter can be replaced with 1 blizzard shield and 1 heavy flamer.',
        controls: [
          { type: 'select', key: 'melee_weapon', label: 'Base melee weapon', value: 'fenrisian greataxe', options: [
            { value: 'fenrisian greataxe', label: 'Fenrisian greataxe' },
            { value: 'great wolf claw', label: 'Great wolf claw' },
          ] },
          { type: 'select', key: 'shield_swap', label: 'Replace melee weapon and storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes, take blizzard shield and heavy flamer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        if (select(ctx, 'shield_swap', 'no') === 'yes') {
          add(ctx, q, 'heavy flamer', 1);
          ctx.derived.push('Blizzard shield equipped.');
        } else {
          add(ctx, q, select(ctx, 'melee_weapon', 'fenrisian greataxe'), 1);
          add(ctx, q, 'storm bolter', 1);
        }
        return q;
      },
    },

    'Wulfen with Storm Shields': {
      sections: [{
        title: 'Death totem replacement',
        description: 'Any number of models can each have their death totem replaced with 1 stormfrag auto-launcher.',
        controls: [
          { key: 'stormfrag_auto_launcher', label: '1 stormfrag auto-launcher', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const launchers = number(ctx, 'stormfrag_auto_launcher');
        if (launchers > ctx.modelCount) ctx.errors.push(`Stormfrag auto-launchers must total ${ctx.modelCount} or fewer; currently ${launchers}.`);
        add(ctx, q, 'thunder hammer', ctx.modelCount);
        add(ctx, q, 'stormfrag auto-launcher', launchers);
        if (ctx.modelCount - launchers > 0) ctx.derived.push(`Death totems remaining: ${ctx.modelCount - launchers}.`);
        return q;
      },
    },

    'Asmodai': {
      sections: [{
        title: 'Asmodai loadout',
        description: 'This model is equipped with: heavy bolt pistol; crozius arcanum and power weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy bolt pistol', 1);
        add(ctx, q, 'crozius arcanum and power weapon', 1);
        return q;
      },
    },

    'Azrael': {
      sections: [{
        title: 'Azrael loadout',
        description: 'This model is equipped with: Lionâ€™s Wrath; the Sword of Secrets; the Lion Helm.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'lionâ€™s wrath', 1);
        add(ctx, q, 'the sword of secrets', 1);
        ctx.derived.push('The Lion Helm equipped.');
        return q;
      },
    },

    'Belial': {
      sections: [{
        title: 'Belial loadout',
        description: 'This model is equipped with: master-crafted storm bolter; the Sword of Silence.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'master-crafted storm bolter', 1);
        add(ctx, q, 'the sword of silence', 1);
        return q;
      },
    },

    'Deathwing Knights': {
      sections: [{
        title: 'Knight Master',
        description: 'The Knight Masterâ€™s great weapon of the Unforgiven can be replaced with 1 relic weapon.',
        controls: [
          { type: 'select', key: 'knight_master_weapon', label: 'Knight Master weapon', value: 'great weapon of the unforgiven', options: [
            { value: 'great weapon of the unforgiven', label: 'Great weapon of the Unforgiven' },
            { value: 'relic weapon', label: 'Relic weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'knight_master_weapon', 'great weapon of the unforgiven'), 1);
        add(ctx, q, 'mace of absolution', Math.max(0, ctx.modelCount - 1));
        ctx.derived.push('Watcher in the Dark and shields are part of the unit loadout.');
        return q;
      },
    },

    'Deathwing Terminator Squad': {
      sections: [{
        title: 'Chainfists',
        description: 'Any number of Deathwing Terminators can each have their power fist replaced with 1 chainfist.',
        controls: [
          { key: 'chainfist', label: '1 chainfist', max: models => Math.max(0, Number(models || 0) - 1) },
        ],
      }, {
        title: 'Heavy weapons',
        description: 'For every 5 models in this unit, 1 Deathwing Terminator can replace its storm bolter with one of the following: 1 assault cannon; 1 heavy flamer; 1 plasma cannon; 1 storm bolter and 1 cyclone missile launcher.',
        controls: [
          { key: 'assault_cannon', label: '1 assault cannon', max: maxPerFive },
          { key: 'heavy_flamer', label: '1 heavy flamer', max: maxPerFive },
          { key: 'plasma_cannon', label: '1 plasma cannon', max: maxPerFive },
          { key: 'cyclone_missile_launcher', label: '1 cyclone missile launcher', max: maxPerFive },
        ],
      }, {
        title: 'Unit wargear',
        description: 'This unit can be equipped with 1 Watcher in the Dark.',
        controls: [
          { type: 'select', key: 'watcher_in_the_dark', label: 'Watcher in the Dark', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const chainfists = number(ctx, 'chainfist');
        const assaultCannons = number(ctx, 'assault_cannon');
        const heavyFlamers = number(ctx, 'heavy_flamer');
        const plasmaCannons = number(ctx, 'plasma_cannon');
        const cycloneLaunchers = number(ctx, 'cyclone_missile_launcher');
        const heavyTotal = assaultCannons + heavyFlamers + plasmaCannons + cycloneLaunchers;
        const limit = maxPerFive(ctx.modelCount);
        const nonSergeant = Math.max(0, ctx.modelCount - 1);
        if (heavyTotal > limit) ctx.errors.push(`Heavy weapon swaps must total ${limit} or fewer; currently ${heavyTotal}.`);
        if (chainfists > nonSergeant) ctx.errors.push(`Chainfists must total ${nonSergeant} or fewer; currently ${chainfists}.`);

        add(ctx, q, 'storm bolter', 1 + Math.max(0, nonSergeant - heavyTotal) + cycloneLaunchers);
        add(ctx, q, 'power weapon', 1);
        add(ctx, q, 'power fist', Math.max(0, nonSergeant - chainfists));
        add(ctx, q, 'chainfist', chainfists);
        add(ctx, q, 'assault cannon', assaultCannons);
        add(ctx, q, 'heavy flamer', heavyFlamers);
        add(ctx, q, 'plasma cannon', plasmaCannons);
        add(ctx, q, 'cyclone missile launcher', cycloneLaunchers);
        if (select(ctx, 'watcher_in_the_dark', 'no') === 'yes') ctx.derived.push('Watcher in the Dark equipped.');
        return q;
      },
    },

    'Ezekiel': {
      sections: [{
        title: 'Ezekiel loadout',
        description: 'This model is equipped with: the Deliverer; Mind Wipe; Traitorâ€™s Bane; Book of Salvation.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'the deliverer', 1);
        add(ctx, q, 'mind wipe', 1);
        add(ctx, q, 'traitorâ€™s bane', 1);
        ctx.derived.push('Book of Salvation equipped.');
        return q;
      },
    },

    'Inner Circle Companions': {
      sections: [{
        title: 'Inner Circle Companions loadout',
        description: 'Every Inner Circle Companion is equipped with: heavy bolt pistol; Calibanite greatsword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy bolt pistol', ctx.modelCount);
        add(ctx, q, 'calibanite greatsword', ctx.modelCount);
        return q;
      },
    },

    'Land Speeder Vengeance': {
      sections: [{
        title: 'Secondary weapon',
        description: 'This modelâ€™s heavy bolter can be replaced with 1 assault cannon.',
        controls: [
          { type: 'select', key: 'secondary_weapon', label: 'Secondary weapon', value: 'heavy bolter', options: [
            { value: 'heavy bolter', label: 'Heavy bolter' },
            { value: 'assault cannon', label: 'Assault cannon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'secondary_weapon', 'heavy bolter'), 1);
        add(ctx, q, 'plasma storm battery', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Lazarus': {
      sections: [{
        title: 'Lazarus loadout',
        description: 'This model is equipped with: bolt pistol; Enmityâ€™s Edge.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'enmityâ€™s edge', 1);
        return q;
      },
    },

    'Lion El’jonson': {
      sections: [{
        title: 'Lion El’Jonson loadout',
        description: 'This model is equipped with: Arma Luminis; Fealty.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'arma luminis', 1);
        add(ctx, q, 'fealty', 1);
        return q;
      },
    },

    'Nephilim Jetfighter': {
      sections: [{
        title: 'Main gun',
        description: 'This modelâ€™s avenger mega bolter can be replaced with 1 Nephilim lascannons.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'avenger mega bolter', options: [
            { value: 'avenger mega bolter', label: 'Avenger mega bolter' },
            { value: 'nephilim lascannons', label: 'Nephilim lascannons' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'avenger mega bolter'), 1);
        add(ctx, q, 'blacksword missiles', 1);
        add(ctx, q, 'twin heavy bolter', 1);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Ravenwing Black Knights': {
      sections: [{
        title: 'Grenade launchers',
        description: 'For every 3 models in this unit, 1 model can replace its plasma talon with 1 Astartes grenade launcher.',
        controls: [
          { key: 'astartes_grenade_launcher', label: '1 Astartes grenade launcher', max: maxPerThree },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const grenadeLaunchers = number(ctx, 'astartes_grenade_launcher');
        const limit = maxPerThree(ctx.modelCount);
        if (grenadeLaunchers > limit) ctx.errors.push(`Astartes grenade launchers must total ${limit} or fewer; currently ${grenadeLaunchers}.`);
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'plasma talon', Math.max(0, ctx.modelCount - grenadeLaunchers));
        add(ctx, q, 'astartes grenade launcher', grenadeLaunchers);
        add(ctx, q, 'black knight combat weapon', ctx.modelCount);
        return q;
      },
    },

    'Ravenwing Command Squad': {
      sections: [{
        title: 'Grenade launchers',
        description: '1 modelâ€™s plasma talon can be replaced with 1 Astartes grenade launcher.',
        controls: [
          { key: 'astartes_grenade_launcher', label: '1 Astartes grenade launcher', max: 1 },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const grenadeLaunchers = number(ctx, 'astartes_grenade_launcher');
        if (grenadeLaunchers > 1) ctx.errors.push('Ravenwing Command Squad can take only 1 Astartes grenade launcher.');
        add(ctx, q, 'bolt pistol', 3);
        add(ctx, q, 'plasma talon', Math.max(0, 3 - grenadeLaunchers));
        add(ctx, q, 'astartes grenade launcher', grenadeLaunchers);
        add(ctx, q, 'master-crafted power weapon', 1);
        add(ctx, q, 'black knight combat weapon', 2);
        return q;
      },
    },

    'Ravenwing Dark Talon': {
      sections: [{
        title: 'Ravenwing Dark Talon loadout',
        description: 'This model is equipped with: rift cannon; 2 hurricane bolters; armoured hull.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'rift cannon', 1);
        add(ctx, q, 'hurricane bolter', 2);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Ravenwing Darkshroud': {
      sections: [{
        title: 'Secondary weapon',
        description: 'This modelâ€™s heavy bolter can be replaced with 1 assault cannon.',
        controls: [
          { type: 'select', key: 'secondary_weapon', label: 'Secondary weapon', value: 'heavy bolter', options: [
            { value: 'heavy bolter', label: 'Heavy bolter' },
            { value: 'assault cannon', label: 'Assault cannon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'secondary_weapon', 'heavy bolter'), 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Sammael': {
      sections: [{
        title: 'Sammael loadout',
        description: 'This model is equipped with: bolt pistol; master-crafted plasma cannon; twin storm bolter; the Raven Sword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'master-crafted plasma cannon', 1);
        add(ctx, q, 'twin storm bolter', 1);
        add(ctx, q, 'the raven sword', 1);
        return q;
      },
    },

    'Castellan': {
      sections: [{
        title: 'Castellan wargear',
        description: 'This modelâ€™s combi-weapon can be replaced with 1 heavy bolt pistol. This modelâ€™s master-crafted power weapon can be replaced with 1 Astartes chainsword.',
        controls: [
          { type: 'select', key: 'ranged_weapon', label: 'Ranged weapon', value: 'combi-weapon', options: [
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
          ] },
          { type: 'select', key: 'melee_weapon', label: 'Melee weapon', value: 'master-crafted power weapon', options: [
            { value: 'master-crafted power weapon', label: 'Master-crafted power weapon' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged_weapon', 'combi-weapon'), 1);
        add(ctx, q, select(ctx, 'melee_weapon', 'master-crafted power weapon'), 1);
        return q;
      },
    },

    'Chaplain Grimaldus': {
      sections: [{
        title: 'Chaplain Grimaldus loadout',
        description: 'Chaplain Grimaldus is equipped with: plasma pistol; artificer crozius. Every Cenobyte Servitor is equipped with: close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'plasma pistol', 1);
        add(ctx, q, 'artificer crozius', 1);
        add(ctx, q, 'close combat weapon', 3);
        return q;
      },
    },

    'Crusade Ancient': {
      sections: [{
        title: 'Crusade Ancient loadout',
        description: 'This model is equipped with: bolt pistol; master-crafted power weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'master-crafted power weapon', 1);
        return q;
      },
    },

    'Crusader Squad': {
      sections: [{
        title: 'Sword Brother',
        description: 'The Sword Brotherâ€™s heavy bolt pistol can be replaced with 1 pyre pistol.',
        controls: [
          { type: 'select', key: 'sword_brother_pistol', label: 'Sword Brother pistol', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'pyre pistol', label: 'Pyre pistol' },
          ] },
        ],
      }, {
        title: 'Neophytes',
        description: 'Any number of Neophytes can each have their bolt pistol and Astartes chainsword replaced with 1 Neophyte firearm and 1 close combat weapon.',
        controls: [
          { key: 'neophyte_firearm', label: '1 Neophyte firearm', max: models => Math.max(0, Number(models || 0) / 2) },
        ],
      }, {
        title: 'Initiates',
        description: 'Any number of Initiates can each have their bolt rifle replaced with 1 heavy bolt pistol and 1 Astartes chainsword. For every 10 models in this unit, up to 2 Initiates can each have their bolt rifle replaced with either 1 heavy bolt pistol and 1 power fist, or 1 pyreblaster.',
        controls: [
          { key: 'initiate_chainsword', label: '1 heavy bolt pistol and 1 Astartes chainsword', max: models => Math.max(0, Math.ceil(Number(models || 0) / 2) - 1) },
          { key: 'initiate_power_fist', label: '1 heavy bolt pistol and 1 power fist', max: models => Math.floor(Number(models || 0) / 10) * 2 },
          { key: 'pyreblaster', label: '1 pyreblaster', max: models => Math.floor(Number(models || 0) / 10) * 2 },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const modelCount = Number(ctx.modelCount || 0);
        const swordBrother = 1;
        const initiates = Math.floor((modelCount - 1) / 2);
        const neophytes = modelCount - swordBrother - initiates;
        const neophyteFirearms = number(ctx, 'neophyte_firearm');
        const initiateChainswords = number(ctx, 'initiate_chainsword');
        const initiatePowerFists = number(ctx, 'initiate_power_fist');
        const pyreblasters = number(ctx, 'pyreblaster');
        const initiateSpecialLimit = Math.floor(modelCount / 10) * 2;

        if (neophyteFirearms > neophytes) ctx.errors.push(`Neophyte firearms must total ${neophytes} or fewer; currently ${neophyteFirearms}.`);
        if (initiatePowerFists + pyreblasters > initiateSpecialLimit) ctx.errors.push(`Initiate power fists and pyreblasters must total ${initiateSpecialLimit} or fewer; currently ${initiatePowerFists + pyreblasters}.`);
        if (initiateChainswords + initiatePowerFists + pyreblasters > initiates) ctx.errors.push(`Initiate bolt rifle replacements exceed the ${initiates} Initiates in the unit.`);

        add(ctx, q, select(ctx, 'sword_brother_pistol', 'heavy bolt pistol'), 1);
        add(ctx, q, 'master-crafted power weapon', 1);

        add(ctx, q, 'bolt pistol', neophytes - neophyteFirearms);
        add(ctx, q, 'astartes chainsword', (neophytes - neophyteFirearms) + initiateChainswords);
        add(ctx, q, 'neophyte firearm', neophyteFirearms);
        add(ctx, q, 'close combat weapon', neophyteFirearms + Math.max(0, initiates - initiateChainswords - initiatePowerFists - pyreblasters));

        add(ctx, q, 'bolt rifle', Math.max(0, initiates - initiateChainswords - initiatePowerFists - pyreblasters));
        add(ctx, q, 'heavy bolt pistol', initiateChainswords + initiatePowerFists);
        add(ctx, q, 'power fist', initiatePowerFists);
        add(ctx, q, 'pyreblaster', pyreblasters);
        return q;
      },
    },

    'Emperor’s Champion': {
      sections: [{
        title: 'Emperor’s Champion loadout',
        description: 'This model is equipped with: bolt pistol; Black Sword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'black sword', 1);
        return q;
      },
    },

    'Execrator': {
      sections: [{
        title: 'Execrator wargear',
        description: 'This modelâ€™s absolvor bolt pistol can be replaced with 1 pyre pistol. If this model is equipped with an absolvor bolt pistol, it can be equipped with 1 master-crafted power weapon.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'absolvor bolt pistol', options: [
            { value: 'absolvor bolt pistol', label: 'Absolvor bolt pistol' },
            { value: 'pyre pistol', label: 'Pyre pistol' },
          ] },
          { type: 'select', key: 'extra_weapon', label: 'Extra master-crafted power weapon', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const pistol = select(ctx, 'pistol', 'absolvor bolt pistol');
        add(ctx, q, pistol, 1);
        add(ctx, q, 'crozius arcanum', 1);
        if (select(ctx, 'extra_weapon', 'no') === 'yes') {
          if (pistol !== 'absolvor bolt pistol') {
            ctx.errors.push('The extra master-crafted power weapon can only be taken if the absolvor bolt pistol is kept.');
          } else {
            add(ctx, q, 'master-crafted power weapon', 1);
          }
        }
        return q;
      },
    },

    'High Marshal Helbrecht': {
      sections: [{
        title: 'High Marshal Helbrecht loadout',
        description: 'This model is equipped with: Ferocity; Sword of the High Marshals.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'ferocity', 1);
        add(ctx, q, 'sword of the high marshals', 1);
        return q;
      },
    },

    'Marshal': {
      sections: [{
        title: 'Marshal wargear',
        description: 'This modelâ€™s plasma pistol can be replaced with one combi-weapon.',
        controls: [
          { type: 'select', key: 'ranged_weapon', label: 'Ranged weapon', value: 'plasma pistol', options: [
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged_weapon', 'plasma pistol'), 1);
        add(ctx, q, 'master-crafted power weapon', 1);
        return q;
      },
    },

    'Corvus Blackstar': {
      sections: [{
        title: 'Main gun',
        description: 'This model can field either a twin assault cannon or a twin lascannon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'twin assault cannon', options: [
            { value: 'twin assault cannon', label: 'Twin assault cannon' },
            { value: 'twin lascannon', label: 'Twin lascannon' },
          ] },
        ],
      }, {
        title: 'Secondary armament',
        description: 'Choose whether this aircraft keeps both Blackstar rocket launchers or swaps them for a hurricane bolter and a Stormstrike missile launcher.',
        controls: [
          { type: 'select', key: 'secondary_package', label: 'Secondary package', value: 'blackstar', options: [
            { value: 'blackstar', label: '2 Blackstar rocket launchers' },
            { value: 'mixed', label: '1 hurricane bolter and 1 Stormstrike missile launcher' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'twin assault cannon'), 1);
        if (select(ctx, 'secondary_package', 'blackstar') === 'mixed') {
          add(ctx, q, 'hurricane bolter', 1);
          add(ctx, q, 'stormstrike missile launcher', 1);
        } else {
          add(ctx, q, 'blackstar rocket launcher', 2);
        }
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Deathwatch Terminator Squad': {
      sections: [{
        title: 'Heavy weapons',
        description: 'For every 5 models in this unit, 1 Deathwatch Terminator can replace its storm bolter with 1 assault cannon, 1 heavy flamer, 1 plasma cannon or 1 cyclone missile launcher.',
        controls: [
          { key: 'assault_cannon', label: '1 assault cannon', max: maxPerFive },
          { key: 'heavy_flamer', label: '1 heavy flamer', max: maxPerFive },
          { key: 'plasma_cannon', label: '1 plasma cannon', max: maxPerFive },
          { key: 'cyclone_launcher', label: '1 cyclone missile launcher', max: maxPerFive },
        ],
      }, {
        title: 'Melee swaps',
        description: 'Deathwatch Terminators can swap power fists for alternate melee wargear.',
        controls: [
          { key: 'chainfist', label: '1 chainfist (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'thunder_hammer', label: '1 thunder hammer (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'twin_lightning_claws', label: '1 twin lightning claws (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { type: 'select', key: 'leader_melee', label: 'Squad Leader melee weapon', value: 'power fist', options: [
            { value: 'power fist', label: 'Power fist' },
            { value: 'chainfist', label: 'Chainfist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
            { value: 'twin lightning claws', label: 'Twin lightning claws' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const assaultCannons = number(ctx, 'assault_cannon');
        const heavyFlamers = number(ctx, 'heavy_flamer');
        const plasmaCannons = number(ctx, 'plasma_cannon');
        const cycloneLaunchers = number(ctx, 'cyclone_launcher');
        const heavyTotal = assaultCannons + heavyFlamers + plasmaCannons + cycloneLaunchers;
        const heavyMax = maxPerFive(ctx.modelCount);
        const chainfists = number(ctx, 'chainfist');
        const thunderHammers = number(ctx, 'thunder_hammer');
        const twinClaws = number(ctx, 'twin_lightning_claws');
        const nonLeaderCount = Math.max(0, ctx.modelCount - 1);
        const leaderMelee = select(ctx, 'leader_melee', 'power fist');
        const altNonLeaderMelee = chainfists + thunderHammers + twinClaws;

        if (heavyTotal > heavyMax) ctx.errors.push(`Deathwatch Terminator heavy weapons must total ${heavyMax} or fewer; currently ${heavyTotal}.`);
        if (altNonLeaderMelee > nonLeaderCount) ctx.errors.push(`Only ${nonLeaderCount} non-leader Terminators can swap melee weapons; currently ${altNonLeaderMelee}.`);

        const leaderHasBolter = leaderMelee !== 'twin lightning claws' && leaderMelee !== 'thunder hammer';
        add(ctx, q, 'storm bolter', Math.max(0, nonLeaderCount - heavyTotal - thunderHammers - twinClaws) + (leaderHasBolter ? 1 : 0));
        add(ctx, q, 'assault cannon', assaultCannons);
        add(ctx, q, 'heavy flamer', heavyFlamers);
        add(ctx, q, 'plasma cannon', plasmaCannons);
        add(ctx, q, 'cyclone missile launcher', cycloneLaunchers);
        add(ctx, q, 'power fist', Math.max(0, nonLeaderCount - chainfists - thunderHammers - twinClaws) + (leaderMelee === 'power fist' ? 1 : 0));
        add(ctx, q, 'chainfist', chainfists + (leaderMelee === 'chainfist' ? 1 : 0));
        add(ctx, q, 'thunder hammer', thunderHammers + (leaderMelee === 'thunder hammer' ? 1 : 0));
        add(ctx, q, 'twin lightning claws', twinClaws + (leaderMelee === 'twin lightning claws' ? 1 : 0));
        if (leaderMelee === 'power weapon') add(ctx, q, 'power weapon', 1);
        return q;
      },
    },

    'Deathwatch Veterans': {
      sections: [{
        title: 'Ranged replacements',
        description: 'Deathwatch Veterans can swap their boltguns for specialist ranged weapons.',
        controls: [
          { key: 'combi_weapon', label: '1 combi-weapon (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'shotgun', label: '1 Deathwatch shotgun (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'stalker_boltgun', label: '1 stalker-pattern boltgun (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'frag_cannon', label: '1 frag cannon (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'infernus_heavy_bolter', label: '1 infernus heavy bolter (non-leader)', max: models => Math.max(0, Number(models || 0) - 1) },
        ],
      }, {
        title: 'Melee replacements',
        description: 'Deathwatch Veterans can swap their power weapons for specialist melee weapons.',
        controls: [
          { key: 'thunder_hammer', label: '1 Deathwatch thunder hammer', max: models => Number(models || 0) },
          { key: 'xenophase_blade', label: '1 xenophase blade', max: models => Number(models || 0) },
          { key: 'black_shield_blades', label: '1 Black Shield blades', max: models => Number(models || 0) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const nonLeaderCount = Math.max(0, ctx.modelCount - 1);
        const combiWeapons = number(ctx, 'combi_weapon');
        const shotguns = number(ctx, 'shotgun');
        const stalkerBoltguns = number(ctx, 'stalker_boltgun');
        const fragCannons = number(ctx, 'frag_cannon');
        const infernusHeavyBolters = number(ctx, 'infernus_heavy_bolter');
        const rangedReplacements = combiWeapons + shotguns + stalkerBoltguns + fragCannons + infernusHeavyBolters;
        const thunderHammers = number(ctx, 'thunder_hammer');
        const xenophaseBlades = number(ctx, 'xenophase_blade');
        const blackShieldBlades = number(ctx, 'black_shield_blades');
        const meleeReplacements = thunderHammers + xenophaseBlades + blackShieldBlades;

        if (rangedReplacements > nonLeaderCount) ctx.errors.push(`Deathwatch Veterans have only ${nonLeaderCount} non-leader boltguns available to replace; currently ${rangedReplacements}.`);
        if (meleeReplacements > ctx.modelCount) ctx.errors.push(`Deathwatch Veteran melee swaps must total ${ctx.modelCount} or fewer; currently ${meleeReplacements}.`);

        add(ctx, q, 'boltgun', Math.max(0, ctx.modelCount - rangedReplacements));
        add(ctx, q, 'combi-weapon', combiWeapons);
        add(ctx, q, 'deathwatch shotgun', shotguns);
        add(ctx, q, 'stalker-pattern boltgun', stalkerBoltguns);
        add(ctx, q, 'frag cannon', fragCannons);
        add(ctx, q, 'infernus heavy bolter', infernusHeavyBolters);
        add(ctx, q, 'power weapon', Math.max(0, ctx.modelCount - meleeReplacements));
        add(ctx, q, 'deathwatch thunder hammer', thunderHammers);
        add(ctx, q, 'xenophase blade', xenophaseBlades);
        add(ctx, q, 'black shield blades', blackShieldBlades);
        return q;
      },
    },

    'Decimus Kill Team': {
      sections: [{
        title: 'Mixed specialists',
        description: 'Configure the Decimus Kill Team specialists shown on the datasheet. Unassigned models are treated as Hellstorm bolt rifle veterans.',
        controls: [
          { key: 'gravis_veteran', label: '1 Gravis Veteran with infernus heavy bolter', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'stalker_veteran', label: '1 Deathwatch Veteran with stalker bolt rifle', max: maxPerFive },
          { key: 'thunder_hammer_veteran', label: '1 Deathwatch Veteran with heavy thunder hammer', max: maxPerFive },
          { key: 'marksman_veteran', label: '1 Deathwatch Veteran with marksman bolt carbine', max: maxPerFive },
          { key: 'xenophase_veteran', label: '1 Deathwatch Veteran with xenophase blade', max: models => Number(models || 0) >= 10 ? 1 : 0 },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const modelCount = Number(ctx.modelCount || 0);
        const gravisVeterans = number(ctx, 'gravis_veteran');
        const stalkerVeterans = number(ctx, 'stalker_veteran');
        const thunderVeterans = number(ctx, 'thunder_hammer_veteran');
        const marksmanVeterans = number(ctx, 'marksman_veteran');
        const xenophaseVeterans = number(ctx, 'xenophase_veteran');
        const nonSergeantCount = Math.max(0, modelCount - 1);
        const specialists = gravisVeterans + stalkerVeterans + thunderVeterans + marksmanVeterans + xenophaseVeterans;

        if (specialists > nonSergeantCount) ctx.errors.push(`Decimus Kill Team has only ${nonSergeantCount} non-sergeant slots available; currently using ${specialists}.`);
        if (xenophaseVeterans > 0 && modelCount < 10) ctx.errors.push('A xenophase blade veteran can only be taken in a 10-model Decimus Kill Team.');

        add(ctx, q, 'plasma pistol', 1);
        add(ctx, q, 'power weapon', 1);
        add(ctx, q, 'infernus heavy bolter', gravisVeterans);
        add(ctx, q, 'bolt pistol', gravisVeterans + stalkerVeterans + thunderVeterans + Math.max(0, nonSergeantCount - specialists));
        add(ctx, q, 'close combat weapon', gravisVeterans + stalkerVeterans + marksmanVeterans + Math.max(0, nonSergeantCount - specialists));
        add(ctx, q, 'stalker bolt rifle', stalkerVeterans);
        add(ctx, q, 'heavy thunder hammer', thunderVeterans);
        add(ctx, q, 'deathwatch marksman bolt carbine', marksmanVeterans);
        add(ctx, q, 'special-issue bolt pistol', marksmanVeterans + xenophaseVeterans);
        add(ctx, q, 'xenophase blade', xenophaseVeterans);
        add(ctx, q, 'hellstorm bolt rifle', Math.max(0, nonSergeantCount - specialists));
        return q;
      },
    },

    'Fortis Kill Team': {
      sections: [{
        title: 'Kill Team specialists',
        description: 'Assign Fortis Kill Team specialists. Unassigned models remain standard bolt-rifle Intercessors.',
        controls: [
          { key: 'plasma_incinerator', label: '1 Kill Team Intercessor with plasma incinerator', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'assault_loadout', label: '1 Kill Team Intercessor with heavy bolt pistol and Astartes chainsword', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'pyreblaster', label: '1 Kill Team Intercessor with pyreblaster', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'rocket_launcher', label: '1 Kill Team Intercessor with superfrag rocket launcher', max: models => Math.max(0, Number(models || 0) - 1) },
        ],
      }, {
        title: 'Sergeant upgrades',
        description: 'Configure the Kill Team Sergeant.',
        controls: [
          { type: 'select', key: 'sergeant_pistol', label: 'Sergeant pistol', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
          ] },
          { type: 'select', key: 'sergeant_melee', label: 'Sergeant melee weapon', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'thunder hammer', label: 'Thunder hammer' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const modelCount = Number(ctx.modelCount || 0);
        const nonSergeantCount = Math.max(0, modelCount - 1);
        const plasmaIncinerators = number(ctx, 'plasma_incinerator');
        const assaultLoadouts = number(ctx, 'assault_loadout');
        const pyreblasters = number(ctx, 'pyreblaster');
        const rocketLaunchers = number(ctx, 'rocket_launcher');
        const specialists = plasmaIncinerators + assaultLoadouts + pyreblasters + rocketLaunchers;
        const sergeantPistol = select(ctx, 'sergeant_pistol', 'bolt pistol');
        const sergeantMelee = select(ctx, 'sergeant_melee', 'close combat weapon');

        if (specialists > nonSergeantCount) ctx.errors.push(`Fortis Kill Team has only ${nonSergeantCount} non-sergeant slots available; currently using ${specialists}.`);

        add(ctx, q, 'deathwatch bolt rifle', Math.max(0, nonSergeantCount - specialists) + 1);
        add(ctx, q, 'bolt pistol', Math.max(0, nonSergeantCount - specialists) + plasmaIncinerators + pyreblasters + rocketLaunchers + (sergeantPistol === 'bolt pistol' ? 1 : 0));
        add(ctx, q, 'close combat weapon', Math.max(0, nonSergeantCount - specialists) + plasmaIncinerators + pyreblasters + rocketLaunchers + (sergeantMelee === 'close combat weapon' ? 1 : 0));
        add(ctx, q, 'plasma incinerator', plasmaIncinerators);
        add(ctx, q, 'heavy bolt pistol', assaultLoadouts + (sergeantPistol === 'heavy bolt pistol' ? 1 : 0));
        add(ctx, q, 'astartes chainsword', assaultLoadouts + (sergeantMelee === 'astartes chainsword' ? 1 : 0));
        add(ctx, q, 'pyreblaster', pyreblasters);
        add(ctx, q, 'castellan launcher', rocketLaunchers);
        add(ctx, q, 'superfrag rocket launcher', rocketLaunchers);
        if (sergeantPistol === 'plasma pistol') add(ctx, q, 'plasma pistol', 1);
        if (sergeantPistol === 'hand flamer') add(ctx, q, 'hand flamer', 1);
        if (sergeantMelee === 'power fist') add(ctx, q, 'power fist', 1);
        if (sergeantMelee === 'power weapon') add(ctx, q, 'power weapon', 1);
        if (sergeantMelee === 'thunder hammer') add(ctx, q, 'thunder hammer', 1);
        return q;
      },
    },

    'Indomitor Kill Team': {
      sections: [{
        title: 'Kill Team specialists',
        description: 'Assign Indomitor specialists. Unassigned models remain standard heavy-bolt-rifle marines.',
        controls: [
          { key: 'deathwatch_heavy_bolter', label: '1 Kill Team Heavy Intercessor with Deathwatch heavy bolter', max: models => Math.max(0, Number(models || 0)) },
          { key: 'melta_rifle', label: '1 Kill Team Heavy Intercessor with melta rifle', max: models => Math.max(0, Number(models || 0)) },
          { key: 'flamestorm_power_fists', label: '1 Kill Team Heavy Intercessor with flamestorm gauntlets and twin power fists', max: models => Math.max(0, Number(models || 0)) },
          { key: 'auto_boltstorm_power_fists', label: '1 Kill Team Heavy Intercessor with auto boltstorm gauntlets and twin power fists', max: models => Math.max(0, Number(models || 0)) },
          { key: 'multi_melta', label: '1 Kill Team Heavy Intercessor with multi-melta', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const modelCount = Number(ctx.modelCount || 0);
        const heavyBolters = number(ctx, 'deathwatch_heavy_bolter');
        const meltaRifles = number(ctx, 'melta_rifle');
        const flamestormPowerFists = number(ctx, 'flamestorm_power_fists');
        const autoBoltstormPowerFists = number(ctx, 'auto_boltstorm_power_fists');
        const multiMeltas = number(ctx, 'multi_melta');
        const specialists = heavyBolters + meltaRifles + flamestormPowerFists + autoBoltstormPowerFists + multiMeltas;

        if (specialists > modelCount) ctx.errors.push(`Indomitor Kill Team has only ${modelCount} model slots available; currently using ${specialists}.`);

        add(ctx, q, 'bolt pistol', Math.max(0, modelCount - flamestormPowerFists - autoBoltstormPowerFists));
        add(ctx, q, 'close combat weapon', Math.max(0, modelCount - flamestormPowerFists - autoBoltstormPowerFists));
        add(ctx, q, 'deathwatch heavy bolt rifle', Math.max(0, modelCount - specialists));
        add(ctx, q, 'deathwatch heavy bolter', heavyBolters);
        add(ctx, q, 'melta rifle', meltaRifles);
        add(ctx, q, 'flamestorm gauntlets', flamestormPowerFists);
        add(ctx, q, 'auto boltstorm gauntlets', autoBoltstormPowerFists);
        add(ctx, q, 'fragstorm grenade launcher', autoBoltstormPowerFists);
        add(ctx, q, 'twin power fists', flamestormPowerFists + autoBoltstormPowerFists);
        add(ctx, q, 'multi-melta', multiMeltas);
        return q;
      },
    },

    'Spectrus Kill Team': {
      sections: [{
        title: 'Kill Team specialists',
        description: 'Assign Spectrus specialists. Unassigned models remain marksman-bolt-carbine infiltrators.',
        controls: [
          { key: 'bolt_sniper_rifle', label: '1 Kill Team Infiltrator with bolt sniper rifle', max: models => Math.max(0, Number(models || 0)) },
          { key: 'occulus_bolt_carbine', label: '1 Kill Team Infiltrator with Deathwatch occulus bolt carbine', max: models => Math.max(0, Number(models || 0)) },
          { key: 'combat_knife', label: '1 Kill Team Infiltrator with combat knife', max: models => Math.max(0, Number(models || 0)) },
          { key: 'las_fusil', label: '1 Kill Team Infiltrator with las fusil', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const modelCount = Number(ctx.modelCount || 0);
        const boltSniperRifles = number(ctx, 'bolt_sniper_rifle');
        const occulusBoltCarbines = number(ctx, 'occulus_bolt_carbine');
        const combatKnives = number(ctx, 'combat_knife');
        const lasFusils = number(ctx, 'las_fusil');
        const specialists = boltSniperRifles + occulusBoltCarbines + combatKnives + lasFusils;

        if (specialists > modelCount) ctx.errors.push(`Spectrus Kill Team has only ${modelCount} model slots available; currently using ${specialists}.`);

        add(ctx, q, 'bolt pistol', modelCount - combatKnives);
        add(ctx, q, 'deathwatch marksman bolt carbine', Math.max(0, modelCount - specialists));
        add(ctx, q, 'close combat weapon', Math.max(0, modelCount - specialists) + boltSniperRifles + lasFusils);
        add(ctx, q, 'bolt sniper rifle', boltSniperRifles);
        add(ctx, q, 'deathwatch occulus bolt carbine', occulusBoltCarbines);
        add(ctx, q, 'paired combat blades', occulusBoltCarbines);
        add(ctx, q, 'special-issue bolt pistol', combatKnives);
        add(ctx, q, 'combat knife', combatKnives);
        add(ctx, q, 'las fusil', lasFusils);
        return q;
      },
    },

    'Talonstrike Kill Team': {
      sections: [{
        title: 'Kill Team specialists',
        description: 'Assign Talonstrike specialists. Unassigned models remain standard jump-pack Intercessors.',
        controls: [
          { key: 'assault_bolters', label: '1 Kill Team Heavy Intercessor with Jump Pack and assault bolters', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'plasma_exterminators', label: '1 Kill Team Heavy Intercessor with Jump Pack and plasma exterminators', max: models => Math.max(0, Number(models || 0) - 1) },
        ],
      }, {
        title: 'Sergeant upgrades',
        description: 'Configure the Kill Team Sergeant with Jump Pack.',
        controls: [
          { type: 'select', key: 'sergeant_pistol', label: 'Sergeant pistol', value: 'heavy bolt pistol', options: [
            { value: 'heavy bolt pistol', label: 'Heavy bolt pistol' },
            { value: 'hand flamer', label: 'Hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'sergeant_melee', label: 'Sergeant melee weapon', value: 'astartes chainsword', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const modelCount = Number(ctx.modelCount || 0);
        const nonSergeantCount = Math.max(0, modelCount - 1);
        const assaultBolters = number(ctx, 'assault_bolters');
        const plasmaExterminators = number(ctx, 'plasma_exterminators');
        const specialists = assaultBolters + plasmaExterminators;
        const sergeantPistol = select(ctx, 'sergeant_pistol', 'heavy bolt pistol');
        const sergeantMelee = select(ctx, 'sergeant_melee', 'astartes chainsword');

        if (specialists > nonSergeantCount) ctx.errors.push(`Talonstrike Kill Team has only ${nonSergeantCount} non-sergeant slots available; currently using ${specialists}.`);

        add(ctx, q, 'heavy bolt pistol', Math.max(0, nonSergeantCount - specialists) + (sergeantPistol === 'heavy bolt pistol' ? 1 : 0));
        add(ctx, q, 'astartes chainsword', Math.max(0, nonSergeantCount - specialists) + (sergeantMelee === 'astartes chainsword' ? 1 : 0));
        add(ctx, q, 'assault bolters', assaultBolters);
        add(ctx, q, 'plasma exterminators', plasmaExterminators);
        add(ctx, q, 'close combat weapon', assaultBolters + plasmaExterminators);
        if (sergeantPistol === 'hand flamer') add(ctx, q, 'hand flamer', 1);
        if (sergeantPistol === 'plasma pistol') add(ctx, q, 'plasma pistol', 1);
        if (sergeantMelee === 'power fist') add(ctx, q, 'power fist', 1);
        if (sergeantMelee === 'power weapon') add(ctx, q, 'power weapon', 1);
        return q;
      },
    },

    'Watch Captain Artemis': {
      sections: [{
        title: 'Watch Captain Artemis loadout',
        description: 'This model is equipped with: Hellfire Extremis; master-crafted power weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'hellfire extremis', 1);
        add(ctx, q, 'master-crafted power weapon', 1);
        return q;
      },
    },

    'Watch Master': {
      sections: [{
        title: 'Watch Master loadout',
        description: 'This model is equipped with: vigil spear.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'vigil spear (1)', 1);
        return q;
      },
    },

    'Adrax Agatone': {
      sections: [{
        title: 'Adrax Agatone loadout',
        description: 'This model is equipped with: Drakkis; Malleus Noctum.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'drakkis', 1);
        add(ctx, q, 'malleus noctum', 1);
        return q;
      },
    },

    'Aethon Shaan': {
      sections: [{
        title: 'Aethon Shaan loadout',
        description: 'This model is equipped with: heavy bolt pistol; Claws of Severax.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy bolt pistol', 1);
        add(ctx, q, 'claws of severax', 1);
        return q;
      },
    },

    'Bladeguard Ancient': {
      sections: [{
        title: 'Bladeguard Ancient loadout',
        description: 'This model is equipped with: heavy bolt pistol; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy bolt pistol', 1);
        add(ctx, q, 'close combat weapon', 1);
        ctx.derived.push('Astartes Banner equipped.');
        return q;
      },
    },

    'Caanok Var': {
      sections: [{
        title: 'Caanok Var loadout',
        description: 'This model is equipped with: storm bolter; Axiom.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'storm bolter', 1);
        add(ctx, q, 'axiom – strike', 1);
        add(ctx, q, 'axiom – sweep', 1);
        return q;
      },
    },

    'Captain Sicarius': {
      sections: [{
        title: 'Captain Sicarius loadout',
        description: 'This model is equipped with: artisan plasma pistol; Talassarian Tempest Blade.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'artisan plasma pistol', 1);
        add(ctx, q, 'talassarian tempest blade', 1);
        return q;
      },
    },

    'Captain Titus': {
      sections: [{
        title: 'Captain Titus loadout',
        description: 'This model is equipped with: bolt pistol; master-crafted bolter; master-crafted chainsword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'master-crafted bolter', 1);
        add(ctx, q, 'master-crafted chainsword', 1);
        return q;
      },
    },

    'Cato Sicarius': {
      sections: [{
        title: 'Cato Sicarius loadout',
        description: 'This model is equipped with: artisan plasma pistol; Talassarian tempest blade.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'artisan plasma pistol', 1);
        add(ctx, q, 'talassarian tempest blade – coup de grace', 1);
        add(ctx, q, 'talassarian tempest blade – strike', 1);
        add(ctx, q, 'talassarian tempest blade – sweep', 1);
        return q;
      },
    },

    'Centurion Assault Squad': {
      sections: [{
        title: 'Chest weapons',
        description: 'Any number of models can each replace their twin flamer with 1 twin meltagun.',
        controls: [
          { key: 'twin_meltagun', label: '1 twin meltagun', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const twinMeltaguns = number(ctx, 'twin_meltagun');
        if (twinMeltaguns > ctx.modelCount) ctx.errors.push(`Twin meltaguns must total ${ctx.modelCount} or fewer; currently ${twinMeltaguns}.`);
        add(ctx, q, 'twin flamer', Math.max(0, ctx.modelCount - twinMeltaguns));
        add(ctx, q, 'twin meltagun', twinMeltaguns);
        add(ctx, q, 'siege drills', ctx.modelCount);
        add(ctx, q, 'centurion bolters', ctx.modelCount);
        return q;
      },
    },

    'Chief Librarian Tigurius': {
      sections: [{
        title: 'Chief Librarian Tigurius loadout',
        description: 'This model is equipped with: bolt pistol; Storm of the Emperor’s Wrath; Rod of Tigurius.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'storm of the emperor’s wrath – focused witchfire', 1);
        add(ctx, q, 'storm of the emperor’s wrath – witchfire', 1);
        add(ctx, q, 'rod of tigurius', 1);
        return q;
      },
    },

    'Darnath Lysander': {
      sections: [{
        title: 'Darnath Lysander loadout',
        description: 'This model is equipped with: Fist of Dorn.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'fist of dorn', 1);
        return q;
      },
    },

    'Firestrike Servo-turrets': {
      sections: [{
        title: 'Turret weapon',
        description: 'All models in this unit can field either twin Firestrike las-talons or twin Firestrike autocannons.',
        controls: [
          { type: 'select', key: 'turret_weapon', label: 'Turret weapon', value: 'twin firestrike las-talon', options: [
            { value: 'twin firestrike las-talon', label: 'Twin Firestrike las-talon' },
            { value: 'twin firestrike autocannon', label: 'Twin Firestrike autocannon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'turret_weapon', 'twin firestrike las-talon'), ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      },
    },

    'Iron Father Feirros': {
      sections: [{
        title: 'Iron Father Feirros loadout',
        description: 'This model is equipped with: bolt pistol; Gorgon’s Wrath; Harrowhand; Medusan manipuli.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'gorgon’s wrath', 1);
        add(ctx, q, 'harrowhand', 1);
        add(ctx, q, 'medusan manipuli', 1);
        return q;
      },
    },

    'Judiciar': {
      sections: [{
        title: 'Judiciar loadout',
        description: 'This model is equipped with: absolvor bolt pistol; executioner relic blade.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'executioner relic blade', 1);
        return q;
      },
    },

    'Kayvaan Shrike': {
      sections: [{
        title: 'Kayvaan Shrike loadout',
        description: 'This model is equipped with: Blackout; the Raven’s Talons.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'blackout', 1);
        add(ctx, q, 'the raven’s talons', 1);
        return q;
      },
    },

    'Kor’sarro Khan': {
      sections: [{
        title: 'Kor’sarro Khan loadout',
        description: 'This model is equipped with: bolt pistol; Moonfang.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'moonfang', 1);
        return q;
      },
    },

    'Marneus Calgar': {
      sections: [{
        title: 'Marneus Calgar loadout',
        description: 'Marneus Calgar is equipped with: Gauntlets of Ultramar. Every Victrix Honour Guard is equipped with: Victrix power sword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'gauntlets of ultramar (1)', 1);
        add(ctx, q, 'victrix power sword', 2);
        return q;
      },
    },

    'Marneus Calgar in Armour of Antilochus': {
      sections: [{
        title: 'Marneus Calgar in Armour of Antilochus loadout',
        description: 'This model is equipped with: Gauntlets of Ultramar.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'gauntlets of ultramar (1)', 1);
        return q;
      },
    },

    'Pedro Kantor': {
      sections: [{
        title: 'Pedro Kantor loadout',
        description: 'This model is equipped with: Dorn’s Arrow; Fist of Retribution.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'dorn’s arrow', 1);
        add(ctx, q, 'fist of retribution', 1);
        return q;
      },
    },

    'Roboute Guilliman': {
      sections: [{
        title: 'Roboute Guilliman loadout',
        description: 'This model is equipped with: Hand of Dominion; Emperor’s Sword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'hand of dominion (1)', 1);
        add(ctx, q, 'emperor’s sword', 1);
        return q;
      },
    },

    'Suboden Khan': {
      sections: [{
        title: 'Suboden Khan loadout',
        description: 'This model is equipped with: heavy bolt pistol; onslaught gatling cannon; Stormtooth; power sword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy bolt pistol', 1);
        add(ctx, q, 'onslaught gatling cannon', 1);
        add(ctx, q, 'stormtooth', 1);
        add(ctx, q, 'power sword', 1);
        return q;
      },
    },

    'Tor Garadon': {
      sections: [{
        title: 'Tor Garadon loadout',
        description: 'This model is equipped with: artificer grav-gun; Hand of Defiance.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'artificer grav-gun', 1);
        add(ctx, q, 'hand of defiance', 1);
        return q;
      },
    },

    'Uriel Ventris': {
      sections: [{
        title: 'Uriel Ventris loadout',
        description: 'This model is equipped with: bolt pistol; Invictus; Sword of Idaeus.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'invictus', 1);
        add(ctx, q, 'sword of idaeus', 1);
        return q;
      },
    },

    'Victrix Honour Guard': {
      sections: [{
        title: 'Victrix Honour Guard loadout',
        description: 'The Chapter Ancient is equipped with: master-crafted power weapon; banner of Macragge. The Chapter Champion is equipped with: blades of honour. Each Victrix Honour Guard model is equipped with: master-crafted bolt carbine; master-crafted power weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'master-crafted power weapon', 3);
        add(ctx, q, 'blades of honour', 1);
        add(ctx, q, 'master-crafted bolt carbine', 2);
        ctx.derived.push('Banner of Macragge equipped.');
        return q;
      },
    },

    'Vulkan He’stan': {
      sections: [{
        title: 'Vulkan He’stan loadout',
        description: 'This model is equipped with: bolt pistol; Gauntlet of the Forge; Spear of Vulkan.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'gauntlet of the forge', 1);
        add(ctx, q, 'spear of vulkan', 1);
        return q;
      },
    },

    'Wardens of Ultramar': {
      sections: [{
        title: 'Wardens of Ultramar loadout',
        description: 'Ancient Gadriel is equipped with: bolt rifle; close combat weapon. Veteran Sergeant Metaurus is equipped with: heavy bolt pistol; master-crafted power weapon; storm shield. Gaius Silva is equipped with: archeotech laspistol; power weapon; refractor field. Aemelia Minervas is equipped with: archeotech laspistol; power weapon. Dainal Kornelius is equipped with: Astropathic Blast; force stave. Lucia Vestha is equipped with: archeotech laspistol; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt rifle', 1);
        add(ctx, q, 'close combat weapon', 2);
        add(ctx, q, 'heavy bolt pistol', 1);
        add(ctx, q, 'master-crafted power weapon', 1);
        add(ctx, q, 'archeotech laspistol', 3);
        add(ctx, q, 'power weapon', 2);
        add(ctx, q, 'astropathic blast', 1);
        add(ctx, q, 'force stave', 1);
        ctx.derived.push('Storm shield equipped.');
        ctx.derived.push('Refractor field equipped.');
        return q;
      },
    },

    'Hammerfall Bunker': {
      sections: [{
        title: 'Defensive array',
        description: 'Choose whether the bunker mounts the heavy bolter array or the heavy flamer array.',
        controls: [
          { type: 'select', key: 'defensive_array', label: 'Defensive array', value: 'hammerfall heavy bolter array', options: [
            { value: 'hammerfall heavy bolter array', label: 'Hammerfall heavy bolter array' },
            { value: 'hammerfall heavy flamer array', label: 'Hammerfall heavy flamer array' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'defensive_array', 'hammerfall heavy bolter array'), 1);
        add(ctx, q, 'hammerfall missile launcher – superfrag', 1);
        add(ctx, q, 'hammerfall missile launcher – superkrak', 1);
        return q;
      },
    },

    'Stormraven Gunship': {
      sections: [{
        title: 'Main gun',
        description: 'This model’s twin assault cannon can be replaced with one of the following: 1 twin heavy bolter; 1 twin lascannon; 1 twin multi-melta; 1 twin heavy plasma cannon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'twin assault cannon', options: [
            { value: 'twin assault cannon', label: 'Twin assault cannon' },
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin lascannon', label: 'Twin lascannon' },
            { value: 'twin multi-melta', label: 'Twin multi-melta' },
            { value: 'twin heavy plasma cannon', label: 'Twin heavy plasma cannon' },
          ] },
        ],
      }, {
        title: 'Sponsons',
        description: 'This model’s hurricane bolters can be fielded as an alternate sponson package.',
        controls: [
          { type: 'select', key: 'sponsons', label: 'Sponson package', value: 'none', options: [
            { value: 'none', label: 'No sponsons' },
            { value: 'hurricane bolter', label: '2 hurricane bolters' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const mainGun = select(ctx, 'main_gun', 'twin assault cannon');
        if (mainGun === 'twin heavy plasma cannon') {
          add(ctx, q, 'twin heavy plasma cannon – standard', 1);
          add(ctx, q, 'twin heavy plasma cannon – supercharge', 1);
        } else {
          add(ctx, q, mainGun, 1);
        }
        add(ctx, q, 'stormstrike missile launcher', 2);
        add(ctx, q, 'typhoon missile launcher – frag', 1);
        add(ctx, q, 'typhoon missile launcher – krak', 1);
        if (select(ctx, 'sponsons', 'none') === 'hurricane bolter') add(ctx, q, 'hurricane bolter', 2);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Astraeus': {
      sections: [{
        title: 'Sponson weapons',
        description: 'Configure the Astraeus side batteries.',
        controls: [
          { type: 'select', key: 'side_weapon', label: 'Side battery', value: 'twin heavy bolter', options: [
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin lascannon', label: 'Twin lascannon' },
          ] },
        ],
      }, {
        title: 'Hull plasma weapon',
        description: 'This model’s storm bolter can be replaced with a plasma eradicator.',
        controls: [
          { type: 'select', key: 'hull_weapon', label: 'Hull weapon', value: 'storm bolter', options: [
            { value: 'storm bolter', label: 'Storm bolter' },
            { value: 'plasma eradicator', label: 'Plasma eradicator' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'astraeus las-ripper', 2);
        add(ctx, q, 'ironhail heavy stubber', 1);
        if (select(ctx, 'hull_weapon', 'storm bolter') === 'plasma eradicator') {
          add(ctx, q, 'plasma eradicator – standard', 1);
          add(ctx, q, 'plasma eradicator – supercharge', 1);
        } else {
          add(ctx, q, 'storm bolter', 1);
        }
        add(ctx, q, select(ctx, 'side_weapon', 'twin heavy bolter'), 1);
        add(ctx, q, 'twin macro-accelerator cannon', 1);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Thunderhawk Gunship': {
      sections: [{
        title: 'Main gun',
        description: 'This model’s Thunderhawk heavy cannon can be replaced with 1 turbo-laser destructor.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'thunderhawk heavy cannon', options: [
            { value: 'thunderhawk heavy cannon', label: 'Thunderhawk heavy cannon' },
            { value: 'turbo-laser destructor', label: 'Turbo-laser destructor' },
          ] },
        ],
      }, {
        title: 'Missile battery',
        description: 'This model can mount a Hellstrike missile battery.',
        controls: [
          { type: 'select', key: 'missile_battery', label: 'Missile battery', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'hellstrike missile battery', label: 'Hellstrike missile battery' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'lascannon', 2);
        add(ctx, q, select(ctx, 'main_gun', 'thunderhawk heavy cannon'), 1);
        add(ctx, q, 'twin heavy bolter', 4);
        add(ctx, q, 'armoured hull', 1);
        ctx.derived.push('Thunderhawk cluster bombs equipped.');
        if (select(ctx, 'missile_battery', 'none') === 'hellstrike missile battery') add(ctx, q, 'hellstrike missile battery', 1);
        return q;
      },
    },

    'Example Wargear': {
      sections: [{
        title: 'Example loadout',
        description: 'This placeholder entry is equipped with: bolt pistol; Astartes chainsword.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'astartes chainsword', 1);
        return q;
      },
    },

    'Chaplain Kastiel': {
      sections: [{
        title: 'Chaplain Kastiel loadout',
        description: 'This model is equipped with: absolvor bolt pistol; crozius arcanum.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'crozius arcanum', 1);
        return q;
      },
    },

    'Judiciar Xacharus': {
      sections: [{
        title: 'Judiciar Xacharus loadout',
        description: 'This model is equipped with: absolvor bolt pistol; executioner relic blade.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'absolvor bolt pistol', 1);
        add(ctx, q, 'executioner relic blade', 1);
        return q;
      },
    },

    'Hellblaster Squad': {
      sections: [{
        title: 'Hellblaster Sergeant',
        description: "The Hellblaster Sergeant's bolt pistol can be replaced with 1 plasma pistol.",
        controls: [
          { type: 'select', key: 'sergeant_pistol', label: 'Bolt pistol replacement', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const sergeantPistol = select(ctx, 'sergeant_pistol', 'bolt pistol');
        add(ctx, q, 'bolt pistol', (ctx.modelCount - 1) + (sergeantPistol === 'bolt pistol' ? 1 : 0));
        if (sergeantPistol !== 'bolt pistol') add(ctx, q, sergeantPistol, 1);
        add(ctx, q, 'plasma incinerator', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      },
    },

    'Eradicator Squad': {
      sections: [{
        title: 'Eradicator heavy weapons',
        description: "For every 3 models in this unit, 1 Eradicator's melta rifle can be replaced with 1 multi-melta.",
        controls: [
          { key: 'multi_melta', label: '1 multi-melta', max: maxPerThree },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const multiMeltas = number(ctx, 'multi_melta');
        const maxMultiMeltas = maxPerThree(ctx.modelCount);
        if (multiMeltas > maxMultiMeltas) ctx.errors.push(`Multi-meltas must total ${maxMultiMeltas} or fewer; currently ${multiMeltas}.`);
        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'melta rifle', Math.max(0, ctx.modelCount - multiMeltas));
        add(ctx, q, 'multi-melta', multiMeltas);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      },
    },
  };
})();

