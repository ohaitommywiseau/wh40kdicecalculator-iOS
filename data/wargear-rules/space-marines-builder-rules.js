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
