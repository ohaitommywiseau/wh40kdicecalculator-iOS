(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);
  const number = (ctx, key) => ctx.number(key);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;
  const maxPerFive = models => Math.floor(Number(models || 0) / 5);
  const addPlasmaPistol = (ctx, q, amount) => {
    add(ctx, q, 'plasma pistol – standard', amount);
    add(ctx, q, 'plasma pistol – supercharge', amount);
  };
  const addPlasmaGun = (ctx, q, amount) => {
    add(ctx, q, 'plasma gun – standard', amount);
    add(ctx, q, 'plasma gun – supercharge', amount);
  };
  const addMissileLauncher = (ctx, q, amount) => {
    add(ctx, q, 'missile launcher – frag', amount);
    add(ctx, q, 'missile launcher – krak', amount);
  };
function fixed(description, quantitiesFn) {
    return {
      sections: [{ title: 'Unit loadout', description: description, controls: [] }],
      quantities: quantitiesFn
    };
  }

  function predatorConfig(mainGun) {
    return {
      sections: [{
        title: 'Sponsons and pintle weapon',
        description: 'Select the side sponsons and optional pintle weapon.',
        controls: [
          { key: 'heavy_bolter_sponsons', label: 'Pair of heavy bolters', max: 1 },
          { key: 'lascannon_sponsons', label: 'Pair of lascannons', max: 1 },
          { type: 'select', key: 'pintle', label: 'Pintle weapon', value: 'combi-bolter', options: [
            { value: 'combi-bolter', label: 'Combi-bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' }
          ] },
          { key: 'havoc_launcher', label: 'Havoc launcher', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bolterSponsons = number(ctx, 'heavy_bolter_sponsons');
        const lascannonSponsons = number(ctx, 'lascannon_sponsons');
        if (bolterSponsons + lascannonSponsons > 1) ctx.errors.push('Select only one Predator sponson pair.');
        add(ctx, q, mainGun, 1);
        add(ctx, q, 'armoured tracks', 1);
        add(ctx, q, 'heavy bolter', bolterSponsons ? 2 : 0);
        add(ctx, q, 'lascannon', lascannonSponsons ? 2 : 0);
        add(ctx, q, select(ctx, 'pintle', 'combi-bolter'), 1);
        add(ctx, q, 'havoc launcher', number(ctx, 'havoc_launcher'));
        return q;
      }
    };
  }

  registry['chaos-space-marines'] = {
    'Abaddon The Despoiler': fixed('This model is equipped with: Talon of Horus; Drach\'nyen.', ctx => {
      const q = {};
      add(ctx, q, 'talon of horus (1)', 1);
      add(ctx, q, 'drach’nyen', 1);
      return q;
    }),

    'Accursed Cultists': fixed('Every Torment is equipped with: hideous mutations. Every Mutant is equipped with: blasphemous appendages.', ctx => {
      const q = {};
      const tormentCount = ctx.modelCount === 16 ? 6 : 3;
      const mutantCount = ctx.modelCount - tormentCount;
      add(ctx, q, 'hideous mutations', tormentCount);
      add(ctx, q, 'blasphemous appendages', mutantCount);
      return q;
    }),

    'Chaos Bikers': {
      sections: [{
        title: 'Champion wargear',
        description: 'Select the Champion melee weapon and pistol.',
        controls: [
          { type: 'select', key: 'champion_melee', label: 'Champion melee', value: 'accursed weapon', options: [
            { value: 'accursed weapon', label: 'Accursed weapon' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'power fist', label: 'Power fist' }
          ] },
          { type: 'select', key: 'champion_pistol', label: 'Champion pistol', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' }
          ] }
        ]
      }, {
        title: 'Special weapons',
        description: 'For every 3 models, 1 Chaos Biker can replace its combi-bolter with a special weapon.',
        controls: [
          { key: 'flamer', label: 'Flamer', max: maxPerFive },
          { key: 'meltagun', label: 'Meltagun', max: maxPerFive },
          { key: 'plasma_gun', label: 'Plasma gun', max: maxPerFive }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specialTotal = number(ctx, 'flamer') + number(ctx, 'meltagun') + number(ctx, 'plasma_gun');
        const specialMax = Math.floor(Number(ctx.modelCount || 0) / 3);
        if (specialTotal > specialMax) ctx.errors.push(`Chaos Biker special weapons must total ${specialMax} or fewer; currently ${specialTotal}.`);
        add(ctx, q, select(ctx, 'champion_pistol', 'bolt pistol'), 1);
        add(ctx, q, select(ctx, 'champion_melee', 'accursed weapon'), 1);
        add(ctx, q, 'bolt pistol', Math.max(0, ctx.modelCount - 1));
        add(ctx, q, 'close combat weapon', Math.max(0, ctx.modelCount - 1));
        add(ctx, q, 'combi-bolter', Math.max(0, ctx.modelCount - specialTotal));
        add(ctx, q, 'flamer', number(ctx, 'flamer'));
        add(ctx, q, 'meltagun', number(ctx, 'meltagun'));
        add(ctx, q, 'plasma gun – standard', number(ctx, 'plasma_gun'));
        add(ctx, q, 'plasma gun – supercharge', number(ctx, 'plasma_gun'));
        return q;
      }
    },

    'Chaos Land Raider': {
      sections: [{
        title: 'Hull weapons',
        description: 'Select the hull combi weapon and optional havoc launcher.',
        controls: [
          { type: 'select', key: 'hull_weapon', label: 'Hull weapon', value: 'combi-bolter', options: [
            { value: 'combi-bolter', label: 'Combi-bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' }
          ] },
          { key: 'havoc_launcher', label: 'Havoc launcher', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'soulshatter lascannon', 2);
        add(ctx, q, 'twin heavy bolter', 1);
        add(ctx, q, 'armoured tracks', 1);
        add(ctx, q, select(ctx, 'hull_weapon', 'combi-bolter'), 1);
        add(ctx, q, 'havoc launcher', number(ctx, 'havoc_launcher'));
        return q;
      }
    },

    'Chaos Lord': {
      sections: [{
        title: 'Chaos Lord wargear',
        description: 'Select the Chaos Lord pistol and melee weapon.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'plasma pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' }
          ] },
          { type: 'select', key: 'melee', label: 'Melee', value: 'daemon hammer', options: [
            { value: 'accursed weapon', label: 'Accursed weapon' },
            { value: 'astartes chainblade', label: 'Astartes chainblade' },
            { value: 'daemon hammer', label: 'Daemon hammer' },
            { value: 'power fist', label: 'Power fist' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const pistol = select(ctx, 'pistol', 'plasma pistol');
        const melee = select(ctx, 'melee', 'daemon hammer');
        if (pistol === 'plasma pistol') {
          add(ctx, q, 'plasma pistol – standard', 1);
          add(ctx, q, 'plasma pistol – supercharge', 1);
        } else add(ctx, q, pistol, 1);
        add(ctx, q, melee, 1);
        return q;
      }
    },

    'Chaos Lord In Terminator Armour': {
      sections: [{
        title: 'Chaos Lord in Terminator Armour',
        description: 'Select the ranged weapon and melee weapon.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'combi-bolter', options: [
            { value: 'combi-bolter', label: 'Combi-bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' }
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'exalted weapon', options: [
            { value: 'exalted weapon', label: 'Exalted weapon' },
            { value: 'paired accursed weapons', label: 'Paired accursed weapons' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'chainfist', label: 'Chainfist' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged', 'combi-bolter'), 1);
        add(ctx, q, select(ctx, 'melee', 'exalted weapon'), 1);
        return q;
      }
    },

    'Chaos Lord with Jump Pack': {
      sections: [{
        title: 'Chaos Lord with Jump Pack',
        description: 'Select the pistol and melee weapon.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' }
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'accursed weapon', options: [
            { value: 'accursed weapon', label: 'Accursed weapon' },
            { value: 'power fist', label: 'Power fist' },
            { value: 'twin lightning claws', label: 'Twin lightning claws' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const pistol = select(ctx, 'pistol', 'bolt pistol');
        if (pistol === 'plasma pistol') {
          add(ctx, q, 'plasma pistol – standard', 1);
          add(ctx, q, 'plasma pistol – supercharge', 1);
        } else add(ctx, q, pistol, 1);
        add(ctx, q, select(ctx, 'melee', 'accursed weapon'), 1);
        return q;
      }
    },

    'Chaos Predator Annihilator': predatorConfig('predator twin lascannon'),
    'Chaos Predator Destructor': predatorConfig('predator autocannon'),

    'Chaos Rhino': {
      sections: [{
        title: 'Hull weapons',
        description: 'Select the hull combi weapon and optional havoc launcher.',
        controls: [
          { type: 'select', key: 'hull_weapon', label: 'Hull weapon', value: 'combi-bolter', options: [
            { value: 'combi-bolter', label: 'Combi-bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' }
          ] },
          { key: 'havoc_launcher', label: 'Havoc launcher', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'armoured tracks', 1);
        add(ctx, q, select(ctx, 'hull_weapon', 'combi-bolter'), 1);
        add(ctx, q, 'havoc launcher', number(ctx, 'havoc_launcher'));
        return q;
      }
    },

    'Chaos Spawn': fixed('Every model is equipped with: hideous mutations.', ctx => {
      const q = {};
      add(ctx, q, 'mutations', ctx.modelCount);
      return q;
    }),

    'Chaos Terminator Squad': {
      sections: [{
        title: 'Heavy and special weapons',
        description: 'For every 5 models, one Terminator can take a heavy flamer or reaper autocannon, and any number can swap combi-bolters for combi-weapons.',
        controls: [
          { key: 'heavy_flamer', label: 'Heavy flamer', max: maxPerFive },
          { key: 'reaper_autocannon', label: 'Reaper autocannon', max: maxPerFive },
          { key: 'combi_weapon', label: 'Combi-weapon', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Melee swaps',
        description: 'Any number of models can replace their accursed weapon with a power fist or chainfist.',
        controls: [
          { key: 'power_fist', label: 'Power fist', max: models => Number(models || 0) },
          { key: 'chainfist', label: 'Chainfist', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const heavyTotal = number(ctx, 'heavy_flamer') + number(ctx, 'reaper_autocannon');
        const heavyMax = maxPerFive(ctx.modelCount);
        const combiWeapons = number(ctx, 'combi_weapon');
        const powerFists = number(ctx, 'power_fist');
        const chainfists = number(ctx, 'chainfist');
        if (heavyTotal > heavyMax) ctx.errors.push(`Chaos Terminator heavy weapons must total ${heavyMax} or fewer; currently ${heavyTotal}.`);
        if (powerFists + chainfists > ctx.modelCount) ctx.errors.push('Chaos Terminator melee replacements cannot exceed the number of models in the unit.');
        add(ctx, q, 'combi-bolter', Math.max(0, ctx.modelCount - combiWeapons - heavyTotal));
        add(ctx, q, 'combi-weapon', combiWeapons);
        add(ctx, q, 'heavy flamer', number(ctx, 'heavy_flamer'));
        add(ctx, q, 'reaper autocannon', number(ctx, 'reaper_autocannon'));
        add(ctx, q, 'accursed weapon', Math.max(0, ctx.modelCount - powerFists - chainfists));
        add(ctx, q, 'power fist', powerFists);
        add(ctx, q, 'chainfist', chainfists);
        return q;
      }
    },

    'Chosen': {
      sections: [{
        title: 'Chosen upgrades',
        description: 'For every 5 models, up to 2 can replace their bolt pistols with plasma pistols and up to 2 can replace their boltguns with combi-weapons.',
        controls: [
          { key: 'plasma_pistol', label: 'Plasma pistol', max: models => maxPerFive(models) * 2 },
          { key: 'combi_weapon', label: 'Combi-weapon', max: models => maxPerFive(models) * 2 }
        ]
      }, {
        title: 'Melee replacements',
        description: 'For every 5 models, 1 can replace its boltgun and accursed weapon with paired accursed weapons, and 1 can replace its accursed weapon with a power fist.',
        controls: [
          { key: 'paired_accursed_weapons', label: 'Paired accursed weapons', max: maxPerFive },
          { key: 'power_fist', label: 'Power fist', max: maxPerFive }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const perFive = maxPerFive(models);
        const plasmaPistols = number(ctx, 'plasma_pistol');
        const combiWeapons = number(ctx, 'combi_weapon');
        const pairedWeapons = number(ctx, 'paired_accursed_weapons');
        const powerFists = number(ctx, 'power_fist');
        if (plasmaPistols > perFive * 2) ctx.errors.push(`Chosen can include up to ${perFive * 2} plasma pistols; currently ${plasmaPistols}.`);
        if (combiWeapons > perFive * 2) ctx.errors.push(`Chosen can include up to ${perFive * 2} combi-weapons; currently ${combiWeapons}.`);
        if (pairedWeapons > perFive) ctx.errors.push(`Chosen can include up to ${perFive} paired accursed weapons; currently ${pairedWeapons}.`);
        if (powerFists > perFive) ctx.errors.push(`Chosen can include up to ${perFive} power fists; currently ${powerFists}.`);
        if (combiWeapons + pairedWeapons > models) ctx.errors.push('Chosen boltgun replacements cannot exceed the number of models in the unit.');
        if (pairedWeapons + powerFists > models) ctx.errors.push('Chosen accursed-weapon replacements cannot exceed the number of models in the unit.');
        add(ctx, q, 'bolt pistol', Math.max(0, models - plasmaPistols));
        addPlasmaPistol(ctx, q, plasmaPistols);
        add(ctx, q, 'boltgun', Math.max(0, models - combiWeapons - pairedWeapons));
        add(ctx, q, 'combi-weapon', combiWeapons);
        add(ctx, q, 'accursed weapon', Math.max(0, models - pairedWeapons - powerFists));
        add(ctx, q, 'paired accursed weapons', pairedWeapons);
        add(ctx, q, 'power fist', powerFists);
        return q;
      }
    },

    'Cultist Mob': {
      sections: [{
        title: 'Cultist specials',
        description: 'For every 10 models, one Cultist can take a flamer or heavy stubber.',
        controls: [
          { key: 'flamer', label: 'Flamer', max: maxPerFive },
          { key: 'heavy_stubber', label: 'Heavy stubber', max: maxPerFive }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specials = number(ctx, 'flamer') + number(ctx, 'heavy_stubber');
        const maxSpecials = Math.floor(Number(ctx.modelCount || 0) / 10);
        if (specials > maxSpecials) ctx.errors.push(`Cultist Mob special weapons must total ${maxSpecials} or fewer; currently ${specials}.`);
        add(ctx, q, 'autopistol', ctx.modelCount);
        add(ctx, q, 'brutal assault weapon', ctx.modelCount);
        add(ctx, q, 'flamer', number(ctx, 'flamer'));
        add(ctx, q, 'heavy stubber', number(ctx, 'heavy_stubber'));
        return q;
      }
    },

    'Chaos Vindicator': {
      sections: [{
        title: 'Pintle weapon',
        description: 'Select the hull weapon and optional havoc launcher.',
        controls: [
          { type: 'select', key: 'pintle', label: 'Pintle weapon', value: 'combi-bolter', options: [
            { value: 'combi-bolter', label: 'Combi-bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' }
          ] },
          { key: 'havoc_launcher', label: 'Havoc launcher', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'demolisher cannon', 1);
        add(ctx, q, 'armoured tracks', 1);
        add(ctx, q, select(ctx, 'pintle', 'combi-bolter'), 1);
        add(ctx, q, 'havoc launcher', number(ctx, 'havoc_launcher'));
        return q;
      }
    },

    'Cultist Firebrand': fixed('This model is equipped with: balefire pike; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'balefire pike', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Cypher': fixed('This model is equipped with: Cypher\'s bolt pistols; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'cypher’s bolt pistol (1)', 1);
      add(ctx, q, 'cypher’s plasma pistol (1)', 1);
      return q;
    }),

    'Dark Commune': fixed('The Cult Demagogue is equipped with: autopistol; commune stave. The Blessed Blade is equipped with: Commune blade. The Iconarch is equipped with: autopistol; close combat weapon. The Mindwitch is equipped with: autopistol; warp curse; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 3);
      add(ctx, q, 'commune stave', 1);
      add(ctx, q, 'commune blade', 1);
      add(ctx, q, 'close combat weapon', 2);
      add(ctx, q, 'warp curse – focused witchfire', 1);
      add(ctx, q, 'warp curse – witchfire', 1);
      return q;
    }),

    'Defiler': {
      sections: [{
        title: 'Hull weapons',
        description: 'Select the pintle weapon and turret weapon.',
        controls: [
          { type: 'select', key: 'pintle', label: 'Pintle weapon', value: 'combi-bolter', options: [
            { value: 'combi-bolter', label: 'Combi-bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' }
          ] },
          { type: 'select', key: 'turret', label: 'Turret weapon', value: 'reaper autocannon', options: [
            { value: 'reaper autocannon', label: 'Reaper autocannon' },
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin heavy flamer', label: 'Twin heavy flamer' },
            { value: 'twin lascannon', label: 'Twin lascannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'defiler cannon', 1);
        add(ctx, q, 'defiler claws', 1);
        add(ctx, q, 'defiler scourge', 1);
        add(ctx, q, select(ctx, 'pintle', 'combi-bolter'), 1);
        add(ctx, q, select(ctx, 'turret', 'reaper autocannon'), 1);
        return q;
      }
    },

    'Fabius Bile': fixed('Fabius Bile is equipped with: Xyclos needler; Rod of Torment; The Chirurgeon\'s tools. The Chirurgeon is equipped with: close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'xyclos needler', 1);
      add(ctx, q, 'rod of torment', 1);
      add(ctx, q, 'surgeon acolyte’s tools', 1);
      add(ctx, q, 'chirurgeon', 1);
      return q;
    }),

    'Fellgor Beastmen': {
      sections: [{
        title: 'Fellgor upgrades',
        description: 'One Fellgor Beastman can replace its close combat weapon with a great weapon, one can replace its autopistol with a plasma pistol and one can replace its close combat weapon with a corrupted stave.',
        controls: [
          { key: 'great_weapon', label: 'Great weapon', max: 1 },
          { key: 'plasma_pistol', label: 'Plasma pistol', max: 1 },
          { key: 'corrupted_stave', label: 'Corrupted stave', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 10);
        const greatWeapon = number(ctx, 'great_weapon');
        const plasmaPistol = number(ctx, 'plasma_pistol');
        const corruptedStave = number(ctx, 'corrupted_stave');
        if (greatWeapon > 1 || plasmaPistol > 1 || corruptedStave > 1) ctx.errors.push('Fellgor Beastmen upgrades are each limited to 1.');
        if (greatWeapon + corruptedStave > Math.max(models - 1, 0)) ctx.errors.push('Fellgor Beastmen melee replacements cannot exceed the non-champion models in the unit.');
        add(ctx, q, 'autopistol', Math.max(0, models - plasmaPistol));
        addPlasmaPistol(ctx, q, plasmaPistol);
        add(ctx, q, 'great weapon', 1 + greatWeapon);
        add(ctx, q, 'close combat weapon', Math.max(0, models - 1 - greatWeapon - corruptedStave));
        add(ctx, q, 'corrupted stave', corruptedStave);
        return q;
      }
    },

    'Dark Apostle': fixed('The Dark Apostle is equipped with: accursed crozius; bolt pistol. Every Dark Disciple is equipped with: close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'accursed crozius', 1);
      add(ctx, q, 'bolt pistol', 1);
      add(ctx, q, 'close combat weapon', 2);
      return q;
    }),

    'Forgefiend': {
      sections: [{
        title: 'Forgefiend weapons',
        description: 'Select the arm weapons and muzzle configuration.',
        controls: [
          { type: 'select', key: 'arm_weapons', label: 'Arm weapons', value: 'hades autocannon', options: [
            { value: 'hades autocannon', label: '2 Hades autocannons' },
            { value: 'ectoplasma cannon', label: '2 Ectoplasma cannons' }
          ] },
          { type: 'select', key: 'muzzle', label: 'Muzzle configuration', value: 'forgefiend jaws', options: [
            { value: 'forgefiend jaws', label: 'Forgefiend jaws' },
            { value: 'ectoplasma cannon', label: 'Ectoplasma cannon and armoured limbs' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const armWeapons = select(ctx, 'arm_weapons', 'hades autocannon');
        const muzzle = select(ctx, 'muzzle', 'forgefiend jaws');
        add(ctx, q, armWeapons, 2);
        if (muzzle === 'ectoplasma cannon') {
          add(ctx, q, 'ectoplasma cannon', 1);
          add(ctx, q, 'armoured limbs', 1);
        } else {
          add(ctx, q, 'forgefiend jaws', 1);
        }
        return q;
      }
    },

    'Haarken Worldclaimer': fixed('This model is equipped with: Helspear; Herald\'s Talon.', ctx => {
      const q = {};
      add(ctx, q, 'helspear (1)', 1);
      add(ctx, q, 'herald’s talon', 1);
      return q;
    }),

    'Havocs': {
      sections: [{
        title: 'Havoc heavy weapons',
        description: 'Each Havoc can keep a Havoc autocannon or replace it with another heavy weapon.',
        controls: [
          { key: 'havoc_autocannon', label: 'Havoc autocannon', max: 4 },
          { key: 'heavy_bolter', label: 'Heavy bolter', max: 4 },
          { key: 'lascannon', label: 'Lascannon', max: 4 },
          { key: 'missile_launcher', label: 'Missile launcher', max: 4 },
          { key: 'reaper_chaincannon', label: 'Reaper chaincannon', max: 4 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const heavyTotal = number(ctx, 'havoc_autocannon') + number(ctx, 'heavy_bolter') + number(ctx, 'lascannon') + number(ctx, 'missile_launcher') + number(ctx, 'reaper_chaincannon');
        if (heavyTotal !== 4) ctx.errors.push(`Havocs need exactly 4 heavy weapons selected; currently ${heavyTotal}.`);
        add(ctx, q, 'accursed weapon', 1);
        add(ctx, q, 'plasma gun – standard', 1);
        add(ctx, q, 'plasma gun – supercharge', 1);
        add(ctx, q, 'close combat weapon', 4);
        add(ctx, q, 'havoc autocannon', number(ctx, 'havoc_autocannon'));
        add(ctx, q, 'heavy bolter', number(ctx, 'heavy_bolter'));
        add(ctx, q, 'lascannon', number(ctx, 'lascannon'));
        add(ctx, q, 'missile launcher – frag', number(ctx, 'missile_launcher'));
        add(ctx, q, 'missile launcher – krak', number(ctx, 'missile_launcher'));
        add(ctx, q, 'reaper chaincannon', number(ctx, 'reaper_chaincannon'));
        return q;
      }
    },

    'Helbrute': {
      sections: [{
        title: 'Helbrute arm weapons',
        description: 'Select the Helbrute ranged arm and close-combat arm.',
        controls: [
          { type: 'select', key: 'ranged_arm', label: 'Ranged arm', value: 'multi-melta', options: [
            { value: 'multi-melta', label: 'Multi-melta' },
            { value: 'heavy flamer', label: 'Heavy flamer' },
            { value: 'helbrute fist', label: 'Helbrute fist with combi-bolter' },
            { value: 'helbrute plasma cannon', label: 'Helbrute plasma cannon' },
            { value: 'missile_launcher', label: 'Missile launcher' },
            { value: 'twin autocannon', label: 'Twin autocannon' },
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin lascannon', label: 'Twin lascannon' }
          ] },
          { type: 'select', key: 'melee_arm', label: 'Close-combat arm', value: 'helbrute fist', options: [
            { value: 'helbrute fist', label: 'Helbrute fist with combi-bolter' },
            { value: 'power scourge', label: 'Power scourge' },
            { value: 'helbrute hammer', label: 'Helbrute hammer' }
          ] },
          { key: 'fist_heavy_flamer', label: 'Replace one combi-bolter with a heavy flamer', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const rangedArm = select(ctx, 'ranged_arm', 'multi-melta');
        const meleeArm = select(ctx, 'melee_arm', 'helbrute fist');
        const heavyFlamerUpgrade = number(ctx, 'fist_heavy_flamer');
        let fistCount = 0;
        let combiBolters = 0;
        if (rangedArm === 'missile_launcher') addMissileLauncher(ctx, q, 1);
        else add(ctx, q, rangedArm, 1);
        if (rangedArm === 'helbrute fist') {
          fistCount += 1;
          combiBolters += 1;
        }
        if (meleeArm === 'helbrute fist') {
          fistCount += 1;
          combiBolters += 1;
        } else {
          add(ctx, q, meleeArm, 1);
        }
        add(ctx, q, 'helbrute fist', fistCount);
        if (heavyFlamerUpgrade > Math.min(1, fistCount)) ctx.errors.push('Helbrute can replace only one combi-bolter with a heavy flamer.');
        add(ctx, q, 'combi-bolter', Math.max(0, combiBolters - heavyFlamerUpgrade));
        add(ctx, q, 'heavy flamer', (rangedArm === 'heavy flamer' ? 1 : 0) + heavyFlamerUpgrade);
        return q;
      }
    },

    'Heldrake': {
      sections: [{
        title: 'Heldrake head weapon',
        description: 'Select the head-mounted weapon.',
        controls: [
          { type: 'select', key: 'head_weapon', label: 'Head weapon', value: 'baleflamer', options: [
            { value: 'baleflamer', label: 'Baleflamer' },
            { value: 'hades autocannon', label: 'Hades autocannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'head_weapon', 'baleflamer'), 1);
        add(ctx, q, 'heldrake claws', 1);
        return q;
      }
    },

    'Heretic Astartes Daemon Prince': {
      sections: [{
        title: 'Daemon Prince ranged weapon',
        description: 'Select whether this model takes an infernal cannon.',
        controls: [
          { key: 'infernal_cannon', label: 'Infernal cannon', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'hellforged weapons – strike', 1);
        add(ctx, q, 'hellforged weapons – sweep', 1);
        add(ctx, q, 'infernal cannon', number(ctx, 'infernal_cannon'));
        return q;
      }
    },

    'Heretic Astartes Daemon Prince With Wings': {
      sections: [{
        title: 'Daemon Prince ranged weapon',
        description: 'Select whether this model takes an infernal cannon.',
        controls: [
          { key: 'infernal_cannon', label: 'Infernal cannon', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'hellforged weapons – strike', 1);
        add(ctx, q, 'hellforged weapons – sweep', 1);
        add(ctx, q, 'infernal cannon', number(ctx, 'infernal_cannon'));
        return q;
      }
    },

    'Huron Blackheart': fixed('This model is equipped with: Tyrant\'s Claw; Exalted weapon.', ctx => {
      const q = {};
      add(ctx, q, 'tyrant’s claw and exalted power weapon', 1);
      add(ctx, q, 'tyrant’s claw heavy flamer', 1);
      return q;
    }),

    'Khorne Berzerkers': {
      sections: [{
        title: 'Champion wargear',
        description: 'The Khorne Berzerker Champion can replace its bolt pistol with a plasma pistol.',
        controls: [
          { key: 'champion_plasma_pistol', label: 'Champion plasma pistol', max: 1 }
        ]
      }, {
        title: 'Khorne Berzerker upgrades',
        description: 'For every 5 models, 1 Khorne Berzerker can replace its bolt pistol with a plasma pistol and 1 can replace its Berzerker chainblade with a khornate eviscerator.',
        controls: [
          { key: 'plasma_pistol', label: 'Plasma pistol', max: maxPerFive },
          { key: 'khornate_eviscerator', label: 'Khornate eviscerator', max: maxPerFive }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const regulars = Math.max(0, models - 1);
        const perFive = maxPerFive(models);
        const championPlasma = number(ctx, 'champion_plasma_pistol');
        const plasmaPistols = number(ctx, 'plasma_pistol');
        const eviscerators = number(ctx, 'khornate_eviscerator');
        if (championPlasma > 1) ctx.errors.push('Khorne Berzerker Champion can only take 1 plasma pistol.');
        if (plasmaPistols > perFive) ctx.errors.push(`Khorne Berzerkers can include up to ${perFive} plasma pistols; currently ${plasmaPistols}.`);
        if (eviscerators > perFive) ctx.errors.push(`Khorne Berzerkers can include up to ${perFive} khornate eviscerators; currently ${eviscerators}.`);
        add(ctx, q, 'bolt pistol', Math.max(0, regulars - plasmaPistols) + (championPlasma ? 0 : 1));
        addPlasmaPistol(ctx, q, championPlasma + plasmaPistols);
        add(ctx, q, 'chainblade', Math.max(0, models - eviscerators));
        add(ctx, q, 'khornate eviscerator', eviscerators);
        return q;
      }
    },

    'Khorne Lord Of Skulls': {
      sections: [{
        title: 'Lord of Skulls guns',
        description: 'Select the primary cannon and secondary gun.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Primary cannon', value: 'gorestorm cannon', options: [
            { value: 'gorestorm cannon', label: 'Gorestorm cannon' },
            { value: 'daemongore cannon', label: 'Daemongore cannon' }
          ] },
          { type: 'select', key: 'secondary_gun', label: 'Secondary gun', value: 'hades gatling cannon', options: [
            { value: 'hades gatling cannon', label: 'Hades gatling cannon' },
            { value: 'ichor cannon', label: 'Ichor cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'gorestorm cannon'), 1);
        add(ctx, q, select(ctx, 'secondary_gun', 'hades gatling cannon'), 1);
        add(ctx, q, 'skullhurler', 1);
        add(ctx, q, 'great cleaver of khorne – strike', 1);
        add(ctx, q, 'great cleaver of khorne – sweep', 1);
        return q;
      }
    },

    'Lord Discordant On Helstalker': {
      sections: [{
        title: 'Mounted weapons',
        description: 'Select the mounted gun and sidearm.',
        controls: [
          { type: 'select', key: 'mounted_weapon', label: 'Mounted gun', value: 'helstalker autocannon', options: [
            { value: 'helstalker autocannon', label: 'Helstalker autocannon' },
            { value: 'baleflamer', label: 'Baleflamer' }
          ] },
          { type: 'select', key: 'sidearm', label: 'Sidearm', value: 'magma cutter', options: [
            { value: 'magma cutter', label: 'Magma cutter' },
            { value: 'bolt pistol', label: 'Bolt pistol' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'mounted_weapon', 'helstalker autocannon'), 1);
        add(ctx, q, 'bladed limbs', 1);
        add(ctx, q, 'impaler chainglaive', 1);
        add(ctx, q, select(ctx, 'sidearm', 'magma cutter'), 1);
        add(ctx, q, 'techno-virus injector', 1);
        return q;
      }
    },

    'Legionaries': {
      sections: [{
        title: 'Aspiring Champion',
        description: 'Select the Aspiring Champion boltgun-slot and bolt-pistol-slot replacements.',
        controls: [
          { type: 'select', key: 'champion_boltgun_slot', label: 'Champion boltgun slot', value: 'boltgun', options: [
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'accursed weapon', label: 'Accursed weapon' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'heavy melee weapon', label: 'Heavy melee weapon' }
          ] },
          { type: 'select', key: 'champion_pistol_slot', label: 'Champion bolt pistol slot', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'accursed weapon', label: 'Accursed weapon' },
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'heavy melee weapon', label: 'Heavy melee weapon' }
          ] }
        ]
      }, {
        title: 'Legionary replacements',
        description: 'Any number can replace their boltguns with Astartes chainswords. One Legionary can take a heavy melee weapon, one can take a balefire tome, and for every 5 models one can take a special or heavy weapon package.',
        controls: [
          { key: 'regular_chainsword', label: 'Astartes chainsword', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'heavy_melee_weapon', label: 'Heavy melee weapon', max: 1 },
          { key: 'balefire_tome', label: 'Balefire tome', max: 1 },
          { key: 'special_plasma_pistol_chainblade', label: 'Plasma pistol and Astartes chainsword', max: 1 },
          { key: 'flamer', label: 'Flamer', max: 1 },
          { key: 'havoc_autocannon', label: 'Havoc autocannon', max: 1 },
          { key: 'heavy_bolter', label: 'Heavy bolter', max: 1 },
          { key: 'lascannon', label: 'Lascannon', max: 1 },
          { key: 'meltagun', label: 'Meltagun', max: 1 },
          { key: 'missile_launcher', label: 'Missile launcher', max: 1 },
          { key: 'plasma_gun', label: 'Plasma gun', max: 1 },
          { key: 'reaper_chaincannon', label: 'Reaper chaincannon', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const regulars = Math.max(0, models - 1);
        const championBoltgunSlot = select(ctx, 'champion_boltgun_slot', 'boltgun');
        const championPistolSlot = select(ctx, 'champion_pistol_slot', 'bolt pistol');
        const regularChainswords = number(ctx, 'regular_chainsword');
        const heavyMelee = number(ctx, 'heavy_melee_weapon');
        const balefireTome = number(ctx, 'balefire_tome');
        const specialPlasmaChain = number(ctx, 'special_plasma_pistol_chainblade');
        const specialFlamer = number(ctx, 'flamer');
        const specialAutocannon = number(ctx, 'havoc_autocannon');
        const specialHeavyBolter = number(ctx, 'heavy_bolter');
        const specialLascannon = number(ctx, 'lascannon');
        const specialMeltagun = number(ctx, 'meltagun');
        const specialMissile = number(ctx, 'missile_launcher');
        const specialPlasmaGun = number(ctx, 'plasma_gun');
        const specialReaper = number(ctx, 'reaper_chaincannon');
        const specialTotal = specialPlasmaChain + specialFlamer + specialAutocannon + specialHeavyBolter + specialLascannon + specialMeltagun + specialMissile + specialPlasmaGun + specialReaper;
        const specialMax = maxPerFive(models);
        const regularBoltgunReplacements = regularChainswords + heavyMelee + balefireTome + specialTotal;
        if (championBoltgunSlot === 'plasma pistol' && championPistolSlot === 'plasma pistol') ctx.errors.push('Aspiring Champion can only have one plasma pistol.');
        if (specialTotal > specialMax) ctx.errors.push(`Legionaries can include up to ${specialMax} special or heavy weapon packages; currently ${specialTotal}.`);
        if (regularBoltgunReplacements > regulars) ctx.errors.push('Legionary boltgun replacements cannot exceed the number of non-champion models in the unit.');
        add(ctx, q, 'bolt pistol', regulars + (championPistolSlot === 'bolt pistol' ? 1 : 0));
        if (championPistolSlot === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else if (championPistolSlot !== 'bolt pistol') add(ctx, q, championPistolSlot, 1);
        add(ctx, q, 'boltgun', Math.max(0, regulars - regularBoltgunReplacements) + (championBoltgunSlot === 'boltgun' ? 1 : 0));
        if (championBoltgunSlot === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else if (championBoltgunSlot !== 'boltgun') add(ctx, q, championBoltgunSlot, 1);
        add(ctx, q, 'accursed weapon', 1 + (championBoltgunSlot === 'accursed weapon' ? 1 : 0) + (championPistolSlot === 'accursed weapon' ? 1 : 0));
        add(ctx, q, 'close combat weapon', regulars);
        add(ctx, q, 'astartes chainsword', regularChainswords + specialPlasmaChain + (championBoltgunSlot === 'astartes chainsword' ? 1 : 0) + (championPistolSlot === 'astartes chainsword' ? 1 : 0));
        add(ctx, q, 'heavy melee weapon', heavyMelee + (championBoltgunSlot === 'heavy melee weapon' ? 1 : 0) + (championPistolSlot === 'heavy melee weapon' ? 1 : 0));
        add(ctx, q, 'balefire tome', balefireTome);
        add(ctx, q, 'flamer', specialFlamer);
        add(ctx, q, 'havoc autocannon', specialAutocannon);
        add(ctx, q, 'heavy bolter', specialHeavyBolter);
        add(ctx, q, 'lascannon', specialLascannon);
        add(ctx, q, 'meltagun', specialMeltagun);
        addMissileLauncher(ctx, q, specialMissile);
        addPlasmaGun(ctx, q, specialPlasmaGun);
        add(ctx, q, 'reaper chaincannon', specialReaper);
        addPlasmaPistol(ctx, q, specialPlasmaChain);
        return q;
      }
    },

    'Master Of Executions': fixed('This model is equipped with: axe of dismemberment; bolt pistol.', ctx => {
      const q = {};
      add(ctx, q, 'axe of dismemberment', 1);
      add(ctx, q, 'bolt pistol', 1);
      return q;
    }),

    'Master Of Possession': fixed('This model is equipped with: bolt pistol; Rite of Possession; staff of possession.', ctx => {
      const q = {};
      add(ctx, q, 'bolt pistol', 1);
      add(ctx, q, 'rite of possession – focused witchfire', 1);
      add(ctx, q, 'rite of possession – witchfire', 1);
      add(ctx, q, 'staff of possession', 1);
      return q;
    }),

    'Masters of the Maelstrom': fixed('The Master of the Maelstrom is equipped with a full bespoke loadout.', ctx => {
      const q = {};
      add(ctx, q, 'absolvor bolt pistol', 1);
      add(ctx, q, 'axe of ending', 1);
      add(ctx, q, 'bionic gauntlet', 1);
      add(ctx, q, 'bolt pistol', 1);
      add(ctx, q, 'force stave', 1);
      add(ctx, q, 'laspistol', 1);
      add(ctx, q, 'londaxi maimer', 1);
      add(ctx, q, 'mind wrench', 1);
      add(ctx, q, 'power sabre', 1);
      add(ctx, q, 'reductor array', 1);
      return q;
    }),

    'Maulerfiend': {
      sections: [{
        title: 'Maulerfiend upgrades',
        description: 'This model can replace its lasher tendrils with 2 magma cutters.',
        controls: [
          { key: 'magma_cutters', label: '2 magma cutters', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'maulerfiend fists', 1);
        if (number(ctx, 'magma_cutters')) add(ctx, q, 'magma cutters', 2);
        else add(ctx, q, 'lasher tendrils', 1);
        return q;
      }
    },

    'Nemesis Claw': {
      sections: [{
        title: 'Visionary wargear',
        description: 'The Visionary can replace its bolt pistol with a plasma pistol and replace its Nostraman chainblade with an accursed weapon or power fist.',
        controls: [
          { type: 'select', key: 'visionary_pistol', label: 'Visionary pistol', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' }
          ] },
          { type: 'select', key: 'visionary_melee', label: 'Visionary melee', value: 'nostraman chainblade', options: [
            { value: 'nostraman chainblade', label: 'Nostraman chainblade' },
            { value: 'accursed weapon', label: 'Accursed weapon' },
            { value: 'power fist', label: 'Power fist' }
          ] }
        ]
      }, {
        title: 'Legionary boltgun replacements',
        description: 'Track all regular Legionary boltgun replacements here. Voice Eater is a wargear ability rather than a profile in the local export, so its option keeps the Astartes chainsword count correct but does not add a separate weapon profile.',
        controls: [
          { key: 'regular_chainsword', label: 'Astartes chainsword', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'flamer', label: 'Flamer', max: 1 },
          { key: 'meltagun', label: 'Meltagun', max: 1 },
          { key: 'plasma_gun', label: 'Plasma gun', max: 1 },
          { key: 'heavy_bolter', label: 'Heavy bolter (10-model unit only)', max: 1 },
          { key: 'missile_launcher', label: 'Missile launcher (10-model unit only)', max: 1 },
          { key: 'accursed_weapon', label: 'Accursed weapon', max: 1 },
          { key: 'nostraman_chainglaive', label: 'Nostraman chainglaive', max: 1 },
          { key: 'paired_accursed_weapons', label: 'Paired accursed weapons', max: 1 },
          { key: 'voice_eater', label: 'Voice Eater and Astartes chainsword', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const regulars = Math.max(0, models - 1);
        const regularChainsword = number(ctx, 'regular_chainsword');
        const flamer = number(ctx, 'flamer');
        const meltagun = number(ctx, 'meltagun');
        const plasmaGun = number(ctx, 'plasma_gun');
        const heavyBolter = number(ctx, 'heavy_bolter');
        const missileLauncher = number(ctx, 'missile_launcher');
        const accursedWeapon = number(ctx, 'accursed_weapon');
        const nostramanChainglaive = number(ctx, 'nostraman_chainglaive');
        const pairedAccursedWeapons = number(ctx, 'paired_accursed_weapons');
        const voiceEater = number(ctx, 'voice_eater');
        const specialTotal = flamer + meltagun + plasmaGun;
        const heavyTotal = heavyBolter + missileLauncher;
        const uniqueMeleeTotal = accursedWeapon + nostramanChainglaive + pairedAccursedWeapons + voiceEater;
        const boltgunReplacements = regularChainsword + specialTotal + heavyTotal + uniqueMeleeTotal;
        if (specialTotal > 1) ctx.errors.push('Nemesis Claw can include only 1 flamer, meltagun, or plasma gun replacement in total.');
        if (heavyTotal > 1) ctx.errors.push('Nemesis Claw can include only 1 heavy bolter or missile launcher replacement in total.');
        if (models !== 10 && heavyTotal > 0) ctx.errors.push('Nemesis Claw heavy bolter and missile launcher options require a 10-model unit.');
        if (uniqueMeleeTotal > 4) ctx.errors.push('Nemesis Claw unique melee replacements can total at most 4.');
        if (boltgunReplacements > regulars) ctx.errors.push('Nemesis Claw boltgun replacements cannot exceed the number of non-Visionary models in the unit.');
        const visionaryPistol = select(ctx, 'visionary_pistol', 'bolt pistol');
        const visionaryMelee = select(ctx, 'visionary_melee', 'nostraman chainblade');
        add(ctx, q, 'bolt pistol', regulars + (visionaryPistol === 'bolt pistol' ? 1 : 0));
        if (visionaryPistol === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        add(ctx, q, 'boltgun', Math.max(0, regulars - boltgunReplacements));
        add(ctx, q, 'close combat weapon', regulars);
        add(ctx, q, visionaryMelee, 1);
        add(ctx, q, 'astartes chainsword', regularChainsword + voiceEater);
        add(ctx, q, 'flamer', flamer);
        add(ctx, q, 'meltagun', meltagun);
        addPlasmaGun(ctx, q, plasmaGun);
        add(ctx, q, 'heavy bolter', heavyBolter);
        addMissileLauncher(ctx, q, missileLauncher);
        add(ctx, q, 'accursed weapon', accursedWeapon);
        add(ctx, q, 'nostraman chainglaive', nostramanChainglaive);
        add(ctx, q, 'paired accursed weapons', pairedAccursedWeapons);
        return q;
      }
    },

    'Noctilith Crown': fixed('This model is equipped with: lashing warp energies.', ctx => {
      const q = {};
      add(ctx, q, 'lashing warp energies', 1);
      return q;
    }),

    'Obliterators': fixed('Every model is equipped with: fleshmetal guns; crushing fists.', ctx => {
      const q = {};
      add(ctx, q, 'fleshmetal guns', ctx.modelCount);
      add(ctx, q, 'crushing fists', ctx.modelCount);
      return q;
    }),

    'Possessed': fixed('Every model is equipped with: hideous mutations.', ctx => {
      const q = {};
      add(ctx, q, 'hideous mutations', ctx.modelCount);
      return q;
    }),

    'Raptors': {
      sections: [{
        title: 'Champion wargear',
        description: 'Select the Raptor Champion pistol and melee weapon.',
        controls: [
          { type: 'select', key: 'champion_pistol', label: 'Champion pistol', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' }
          ] },
          { type: 'select', key: 'champion_melee', label: 'Champion melee', value: 'astartes chainsword', options: [
            { value: 'astartes chainsword', label: 'Astartes chainsword' },
            { value: 'accursed weapon', label: 'Accursed weapon' },
            { value: 'heavy melee weapon', label: 'Heavy melee weapon' }
          ] }
        ]
      }, {
        title: 'Special weapons',
        description: 'For every 5 models, up to 2 Raptors can replace their bolt pistols and Astartes chainswords with one of the listed weapon packages.',
        controls: [
          { key: 'flamer', label: 'Flamer', max: models => maxPerFive(models) * 2 },
          { key: 'meltagun', label: 'Meltagun', max: models => maxPerFive(models) * 2 },
          { key: 'plasma_gun', label: 'Plasma gun', max: models => maxPerFive(models) * 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const regulars = Math.max(0, models - 1);
        const specialMax = maxPerFive(models) * 2;
        const flamers = number(ctx, 'flamer');
        const meltaguns = number(ctx, 'meltagun');
        const plasmaGuns = number(ctx, 'plasma_gun');
        const specialTotal = flamers + meltaguns + plasmaGuns;
        if (specialTotal > specialMax) ctx.errors.push(`Raptors can include up to ${specialMax} special weapon packages; currently ${specialTotal}.`);
        if (specialTotal > regulars) ctx.errors.push('Raptor special weapon packages cannot exceed the number of non-champion models in the unit.');
        const championPistol = select(ctx, 'champion_pistol', 'bolt pistol');
        const championMelee = select(ctx, 'champion_melee', 'astartes chainsword');
        add(ctx, q, 'bolt pistol', Math.max(0, regulars - specialTotal) + (championPistol === 'bolt pistol' ? 1 : 0));
        if (championPistol === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        add(ctx, q, 'astartes chainsword', Math.max(0, regulars - specialTotal) + (championMelee === 'astartes chainsword' ? 1 : 0));
        if (championMelee !== 'astartes chainsword') add(ctx, q, championMelee, 1);
        add(ctx, q, 'close combat weapon', specialTotal);
        add(ctx, q, 'mutations', specialTotal);
        add(ctx, q, 'flamer', flamers);
        add(ctx, q, 'meltagun', meltaguns);
        addPlasmaGun(ctx, q, plasmaGuns);
        return q;
      }
    },

    'Noise Marines': {
      sections: [{
        title: 'Champion wargear',
        description: 'The Noise Champion can replace its sonic blaster with 1 screamer pistol and 1 power sword.',
        controls: [
          { key: 'champion_screamer_pistol', label: 'Screamer pistol and power sword', max: 1 }
        ]
      }, {
        title: 'Blastmasters',
        description: 'For every 5 models, 1 Noise Marine can replace its sonic blaster with 1 blastmaster.',
        controls: [
          { key: 'blastmaster', label: 'Blastmaster', max: maxPerFive }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const regulars = Math.max(0, models - 1);
        const championSwap = number(ctx, 'champion_screamer_pistol');
        const blastmasters = number(ctx, 'blastmaster');
        const blastmasterMax = maxPerFive(models);
        if (blastmasters > blastmasterMax) ctx.errors.push(`Noise Marines can include up to ${blastmasterMax} blastmasters; currently ${blastmasters}.`);
        if (blastmasters > regulars) ctx.errors.push('Noise Marine blastmasters cannot exceed the number of non-champion models in the unit.');
        add(ctx, q, 'bolt pistol', models);
        add(ctx, q, 'close combat weapon', models);
        add(ctx, q, 'sonic blaster', Math.max(0, regulars - blastmasters) + (championSwap ? 0 : 1));
        add(ctx, q, 'blastmaster single frequency', blastmasters);
        add(ctx, q, 'blastmaster varied frequency', blastmasters);
        add(ctx, q, 'screamer pistol', championSwap);
        add(ctx, q, 'power sword', championSwap);
        return q;
      }
    },

    'Plague Marines': {
      sections: [{
        title: 'Plague Champion',
        description: 'Select the Plague Champion ranged replacement and melee replacement.',
        controls: [
          { type: 'select', key: 'champion_ranged', label: 'Champion boltgun replacement', value: 'boltgun', options: [
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma gun', label: 'Plasma gun' },
            { value: 'plasma pistol', label: 'Plasma pistol' }
          ] },
          { type: 'select', key: 'champion_melee', label: 'Champion plague knives replacement', value: 'plague knives', options: [
            { value: 'plague knives', label: 'Plague knives' },
            { value: 'bubotic weapons', label: 'Bubotic weapons' },
            { value: 'power fist', label: 'Power fist' }
          ] }
        ]
      }, {
        title: 'Plague Marine replacements',
        description: 'Apply the datasheet boltgun replacements for the unit. Count each replacement against the non-champion Plague Marines in the squad.',
        controls: [
          { key: 'blight_launcher', label: 'Blight launcher', max: maxPerFive },
          { key: 'plague_spewer', label: 'Plague spewer', max: maxPerFive },
          { key: 'meltagun', label: 'Meltagun', max: maxPerFive },
          { key: 'plague_belcher', label: 'Plague belcher', max: maxPerFive },
          { key: 'plasma_gun', label: 'Plasma gun', max: maxPerFive },
          { key: 'bubotic_weapons', label: 'Bubotic weapons', max: models => maxPerFive(models) * 2 },
          { key: 'heavy_plague_weapon', label: 'Heavy plague weapon', max: models => maxPerFive(models) * 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const regulars = Math.max(0, models - 1);
        const perFive = maxPerFive(models);
        const blightLauncher = number(ctx, 'blight_launcher');
        const plagueSpewer = number(ctx, 'plague_spewer');
        const meltagun = number(ctx, 'meltagun');
        const plagueBelcher = number(ctx, 'plague_belcher');
        const plasmaGun = number(ctx, 'plasma_gun');
        const buboticWeapons = number(ctx, 'bubotic_weapons');
        const heavyPlagueWeapon = number(ctx, 'heavy_plague_weapon');
        const regularReplacements = blightLauncher + plagueSpewer + meltagun + plagueBelcher + plasmaGun + buboticWeapons + heavyPlagueWeapon;
        if (blightLauncher > perFive || plagueSpewer > perFive) ctx.errors.push(`Plague Marines can include up to ${perFive} blight launchers and plague spewers each.`);
        if (meltagun + plagueBelcher + plasmaGun > perFive) ctx.errors.push(`Plague Marines can include up to ${perFive} combined meltagun/plague belcher/plasma gun replacements; currently ${meltagun + plagueBelcher + plasmaGun}.`);
        if (buboticWeapons > perFive * 2) ctx.errors.push(`Plague Marines can include up to ${perFive * 2} bubotic weapons; currently ${buboticWeapons}.`);
        if (heavyPlagueWeapon > perFive * 2) ctx.errors.push(`Plague Marines can include up to ${perFive * 2} heavy plague weapons; currently ${heavyPlagueWeapon}.`);
        if (regularReplacements > regulars) ctx.errors.push('Plague Marine boltgun replacements cannot exceed the number of non-champion models in the unit.');
        const championRanged = select(ctx, 'champion_ranged', 'boltgun');
        const championMelee = select(ctx, 'champion_melee', 'plague knives');
        add(ctx, q, 'bolt pistol', 1 + (championRanged === 'bolt pistol' ? 1 : 0));
        if (championRanged === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else if (championRanged === 'plasma gun') addPlasmaGun(ctx, q, 1);
        add(ctx, q, 'boltgun', Math.max(0, regulars - regularReplacements) + (championRanged === 'boltgun' ? 1 : 0));
        add(ctx, q, 'plague knives', regulars + (championMelee === 'plague knives' ? 1 : 0));
        if (championMelee !== 'plague knives') add(ctx, q, championMelee, 1);
        add(ctx, q, 'blight launcher', blightLauncher);
        add(ctx, q, 'plague spewer', plagueSpewer);
        add(ctx, q, 'meltagun', meltagun);
        add(ctx, q, 'plague belcher', plagueBelcher);
        addPlasmaGun(ctx, q, plasmaGun);
        add(ctx, q, 'bubotic weapons', buboticWeapons);
        add(ctx, q, 'heavy plague weapon', heavyPlagueWeapon);
        return q;
      }
    },

    'Red Corsairs Raiders': {
      sections: [{
        title: 'Red Corsairs Raider upgrades',
        description: 'One model can replace its bolt pistol with a hand flamer, one can replace its boltgun with a meltagun and one can replace its reaver\'s blade with a power fist.',
        controls: [
          { key: 'hand_flamer', label: 'Hand flamer', max: 1 },
          { key: 'meltagun', label: 'Meltagun', max: 1 },
          { key: 'power_fist', label: 'Power fist', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        add(ctx, q, 'bolt pistol', Math.max(0, models - number(ctx, 'hand_flamer')));
        add(ctx, q, 'hand flamer', number(ctx, 'hand_flamer'));
        add(ctx, q, 'boltgun', Math.max(0, models - number(ctx, 'meltagun')));
        add(ctx, q, 'meltagun', number(ctx, 'meltagun'));
        add(ctx, q, 'reaver’s blade', Math.max(0, models - number(ctx, 'power_fist')));
        add(ctx, q, 'power fist', number(ctx, 'power_fist'));
        return q;
      }
    },

    'Red Corsairs Reave-Captain': {
      sections: [{
        title: 'Reave-Captain wargear',
        description: 'The Red Corsairs Reave-Captain can replace its bolt pistol with a plasma pistol and/or replace its power sword with a power maul.',
        controls: [
          { key: 'plasma_pistol', label: 'Plasma pistol', max: 1 },
          { key: 'power_maul', label: 'Power maul', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        if (number(ctx, 'plasma_pistol')) addPlasmaPistol(ctx, q, 1);
        else add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, number(ctx, 'power_maul') ? 'power maul' : 'power sword', 1);
        return q;
      }
    },

    'Rubric Marines': {
      sections: [{
        title: 'Aspiring Sorcerer',
        description: 'The Aspiring Sorcerer can replace its inferno bolt pistol with a warpflame pistol.',
        controls: [
          { key: 'warpflame_pistol', label: 'Warpflame pistol', max: 1 }
        ]
      }, {
        title: 'Rubric Marine upgrades',
        description: 'One Rubric Marine can take a soulreaper cannon, and any number can replace their inferno boltguns with warpflamers.',
        controls: [
          { key: 'soulreaper_cannon', label: 'Soulreaper cannon', max: 1 },
          { key: 'warpflamer', label: 'Warpflamer', max: models => Math.max(0, Number(models || 0) - 1) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const models = Number(ctx.modelCount || 5);
        const regulars = Math.max(0, models - 1);
        const soulreaper = number(ctx, 'soulreaper_cannon');
        const warpflamers = number(ctx, 'warpflamer');
        if (soulreaper > 1) ctx.errors.push('Rubric Marines can include only 1 soulreaper cannon.');
        if (warpflamers + soulreaper > regulars) ctx.errors.push('Rubric Marine inferno-boltgun replacements cannot exceed the number of non-champion models in the unit.');
        add(ctx, q, number(ctx, 'warpflame_pistol') ? 'warpflame pistol' : 'inferno bolt pistol', 1);
        add(ctx, q, 'malefic curse', 1);
        add(ctx, q, 'force weapon', 1);
        add(ctx, q, 'inferno boltgun', Math.max(0, regulars - soulreaper - warpflamers));
        add(ctx, q, 'warpflamer', warpflamers);
        add(ctx, q, 'soulreaper cannon', soulreaper);
        add(ctx, q, 'close combat weapon', regulars);
        return q;
      }
    },

    'Sorcerer': fixed('This model is equipped with: bolt pistol; Infernal Gaze; force weapon.', ctx => {
      const q = {};
      add(ctx, q, 'bolt pistol', 1);
      add(ctx, q, 'infernal gaze – focused witchfire', 1);
      add(ctx, q, 'infernal gaze – witchfire', 1);
      add(ctx, q, 'force weapon', 1);
      return q;
    }),

    'Sorcerer In Terminator Armour': {
      sections: [{
        title: 'Sorcerer in Terminator Armour',
        description: 'Select the ranged weapon. The Chaos familiar option is shown for reference but does not change the weapon profile list.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'combi-bolter', options: [
            { value: 'combi-bolter', label: 'Combi-bolter' },
            { value: 'combi-weapon', label: 'Combi-weapon' }
          ] },
          { key: 'chaos_familiar', label: 'Chaos familiar', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged', 'combi-bolter'), 1);
        add(ctx, q, 'infernal gaze – focused witchfire', 1);
        add(ctx, q, 'infernal gaze – witchfire', 1);
        add(ctx, q, 'force weapon', 1);
        return q;
      }
    },

    'Traitor Enforcer': fixed('The Traitor Enforcer is equipped with: bolt pistol; power fist. The Traitor Ogryn is equipped with: Ogryn weapons.', ctx => {
      const q = {};
      add(ctx, q, 'bolt pistol', 1);
      add(ctx, q, 'power fist', 1);
      add(ctx, q, 'ogryn weapons', 1);
      return q;
    }),

    'Traitor Guardsmen Squad': {
      sections: [{
        title: 'Special weapons',
        description: 'Select the special weapon troopers.',
        controls: [
          { key: 'flamer', label: 'Flamer', max: 2 },
          { key: 'meltagun', label: 'Meltagun', max: 2 },
          { key: 'plasma_gun', label: 'Plasma gun', max: 2 },
          { key: 'grenade_launcher', label: 'Cultist grenade launcher', max: 2 },
          { key: 'sniper_rifle', label: 'Cultist sniper rifle', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specials = number(ctx, 'flamer') + number(ctx, 'meltagun') + number(ctx, 'plasma_gun') + number(ctx, 'grenade_launcher') + number(ctx, 'sniper_rifle');
        if (specials > 3) ctx.errors.push('Traitor Guardsmen Squad phase-one support allows up to 3 special weapon troopers.');
        add(ctx, q, 'corrupted pistol', 1);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        add(ctx, q, 'lasgun', Math.max(0, ctx.modelCount - 1 - specials));
        add(ctx, q, 'flamer', number(ctx, 'flamer'));
        add(ctx, q, 'meltagun', number(ctx, 'meltagun'));
        add(ctx, q, 'plasma gun – standard', number(ctx, 'plasma_gun'));
        add(ctx, q, 'plasma gun – supercharge', number(ctx, 'plasma_gun'));
        add(ctx, q, 'cultist grenade launcher – frag', number(ctx, 'grenade_launcher'));
        add(ctx, q, 'cultist grenade launcher – krak', number(ctx, 'grenade_launcher'));
        add(ctx, q, 'cultist sniper rifle', number(ctx, 'sniper_rifle'));
        return q;
      }
    },

    'Venomcrawler': fixed('This model is equipped with: 2 excruciator cannons; soulflayer tendrils and claws.', ctx => {
      const q = {};
      add(ctx, q, 'excruciator cannon', 2);
      add(ctx, q, 'soulflayer tendrils and claws', 1);
      return q;
    }),

    'Vashtorr The Arkifane': fixed('This model is equipped with: Vashtorr\'s claw; Vashtorr\'s hammer.', ctx => {
      const q = {};
      add(ctx, q, 'vashtorrâ€™s claw', 1);
      add(ctx, q, 'vashtorrâ€™s hammer â€“ strike', 1);
      add(ctx, q, 'vashtorrâ€™s hammer â€“ sweep', 1);
      return q;
    }),

    'Warp Talons': fixed('Every model is equipped with: warp claws.', ctx => {
      const q = {};
      add(ctx, q, 'warp claws', ctx.modelCount);
      return q;
    }),

    'Warpsmith': fixed('This model is equipped with: flamer tendril; melta tendril; plasma pistol; forge weapon.', ctx => {
      const q = {};
      add(ctx, q, 'flamer tendril', 1);
      add(ctx, q, 'melta tendril', 1);
      add(ctx, q, 'plasma pistol – standard', 1);
      add(ctx, q, 'plasma pistol – supercharge', 1);
      add(ctx, q, 'forge weapon', 1);
      return q;
    })
  };
}());

