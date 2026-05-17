(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};
  const sharedAeldari = registry['aeldari'] || {};

  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);
  const number = (ctx, key) => ctx.number(key);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;

  function fixed(description, quantitiesFn) {
    return {
      sections: [{ title: 'Unit loadout', description: description, controls: [] }],
      quantities: quantitiesFn
    };
  }

  registry['drukhari'] = {
    'Archon': {
      sections: [{
        title: 'Pistol',
        description: 'Select the Archon pistol.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'splinter pistol', options: [
            { value: 'splinter pistol', label: 'Splinter pistol' },
            { value: 'blast pistol', label: 'Blast pistol' },
            { value: 'soul_trap', label: 'Soul trap' }
          ] }
        ]
      }, {
        title: 'Melee weapon',
        description: 'Select the Archon melee weapon.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'huskblade', options: [
            { value: 'huskblade', label: 'Huskblade' },
            { value: 'agoniser', label: 'Agoniser' },
            { value: 'master-crafted power weapon', label: 'Master-crafted power weapon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const pistol = select(ctx, 'pistol', 'splinter pistol');
        if (pistol !== 'soul_trap') add(ctx, q, pistol, 1);
        add(ctx, q, select(ctx, 'melee', 'huskblade'), 1);
        return q;
      }
    },

    'Cronos': {
      sections: [{
        title: 'Spirit weapon',
        description: 'Each Cronos can replace its spirit syphon with a spirit vortex.',
        controls: [
          { key: 'spirit_vortex', label: 'Spirit vortex', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const vortex = number(ctx, 'spirit_vortex');
        if (vortex > ctx.modelCount) ctx.errors.push('Spirit vortex selections exceed unit size.');
        add(ctx, q, 'spirit vortex', vortex);
        add(ctx, q, 'spirit syphon', Math.max(0, ctx.modelCount - vortex));
        add(ctx, q, 'spirit-leech tentacles', ctx.modelCount);
        return q;
      }
    },

    'Corsair Skyreavers': sharedAeldari['Corsair Skyreavers'],
    'Corsair Voidreavers': sharedAeldari['Corsair Voidreavers'],
    'Corsair Voidscarred': sharedAeldari['Corsair Voidscarred'],

    'Drazhar': fixed('This model is equipped with: Executioner’s demiklaives.', ctx => {
      const q = {};
      add(ctx, q, 'executioner’s demiklaives – dual blades', 1);
      add(ctx, q, 'executioner’s demiklaives – single blade', 1);
      return q;
    }),

    'Death Jester': sharedAeldari['Death Jester'],

    'Haemonculus': fixed('This model is equipped with: stinger pistol; Haemonculus tools and scissorhands.', ctx => {
      const q = {};
      add(ctx, q, 'stinger pistol', 1);
      add(ctx, q, 'haemonculus tools and scissorhands', 1);
      return q;
    }),

    'Hand of the Archon': {
      sections: [{
        title: 'Archsybarite wargear',
        description: 'Select the Kabalite Archsybarite weapon swaps and equipment.',
        controls: [
          { type: 'select', key: 'archsybarite_ranged', label: 'Archsybarite ranged weapon', value: 'splinter_rifle', options: [
            { value: 'splinter_rifle', label: 'Splinter rifle' },
            { value: 'splinter_pistol', label: 'Splinter pistol' },
            { value: 'blast_pistol', label: 'Blast pistol' }
          ] },
          { key: 'power_weapon', label: 'Archsybarite power weapon', max: 1 },
          { key: 'kabalite_icon', label: 'Kabalite icon', max: 1 },
          { key: 'phantasm_grenade_launcher', label: 'Phantasm grenade launcher', max: 1 }
        ]
      }, {
        title: 'Kabalite Agent swaps',
        description: 'Assign the Kabalite Agent ranged and specialist swaps. Remaining Agents keep splinter rifles.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: 1 },
          { key: 'shredder', label: 'Shredder', max: 1 },
          { key: 'dark_lance', label: 'Dark lance', max: 1 },
          { key: 'splinter_cannon', label: 'Splinter cannon', max: 1 },
          { key: 'shardcarbine', label: 'Shardcarbine', max: 1 },
          { key: 'stinger_pistol', label: 'Stinger pistol', max: 1 },
          { key: 'pain_sculptors', label: 'Pain sculptors', max: 1 },
          { key: 'razorflail', label: 'Razorflail', max: 1 },
          { key: 'stimm_needler', label: 'Stimm-needler', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const archsybariteRanged = select(ctx, 'archsybarite_ranged', 'splinter_rifle');
        const ranged = number(ctx, 'blaster') + number(ctx, 'shredder') + number(ctx, 'dark_lance') + number(ctx, 'splinter_cannon') + number(ctx, 'shardcarbine') + number(ctx, 'stinger_pistol') + number(ctx, 'pain_sculptors') + number(ctx, 'razorflail');
        if (ranged > 9) ctx.errors.push('Hand of the Archon Agent assignments exceed the available 9 Kabalite Agents.');
        if (archsybariteRanged === 'blast_pistol') add(ctx, q, 'blast pistol', 1);
        else if (archsybariteRanged === 'splinter_pistol') add(ctx, q, 'splinter pistol', 1);
        add(ctx, q, 'blaster', number(ctx, 'blaster'));
        add(ctx, q, 'shredder', number(ctx, 'shredder'));
        add(ctx, q, 'dark lance', number(ctx, 'dark_lance'));
        add(ctx, q, 'splinter cannon', number(ctx, 'splinter_cannon'));
        add(ctx, q, 'shardcarbine', number(ctx, 'shardcarbine'));
        add(ctx, q, 'stinger pistol', number(ctx, 'stinger_pistol'));
        add(ctx, q, 'splinter rifle', Math.max(0, 10 - (archsybariteRanged === 'splinter_rifle' ? 0 : 1) - ranged));
        add(ctx, q, 'pain sculptors', number(ctx, 'pain_sculptors'));
        add(ctx, q, 'razorflail', number(ctx, 'razorflail'));
        add(ctx, q, 'power weapon', number(ctx, 'power_weapon'));
        add(ctx, q, 'close combat weapon', 10 - number(ctx, 'power_weapon'));
        return q;
      }
    },

    'Hellions': {
      sections: [{
        title: 'Helliarch weapons',
        description: 'Assign the Helliarch weapon replacements if taken.',
        controls: [
          { key: 'stunclaw', label: 'Stunclaw', max: 1 },
          { key: 'power_weapon', label: 'Power weapon', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const stunclaw = number(ctx, 'stunclaw');
        const powerWeapon = number(ctx, 'power_weapon');
        add(ctx, q, 'stunclaw', stunclaw);
        add(ctx, q, 'power weapon', powerWeapon);
        add(ctx, q, 'splinter pods', ctx.modelCount);
        add(ctx, q, 'hellglaive', Math.max(0, ctx.modelCount - stunclaw - powerWeapon));
        return q;
      }
    },

    'Incubi': {
      sections: [{
        title: 'Klaivex weapon',
        description: 'Select the Klaivex weapon set.',
        controls: [
          { type: 'select', key: 'klaivex', label: 'Klaivex weapon', value: 'klaive', options: [
            { value: 'klaive', label: 'Klaive' },
            { value: 'demiklaives', label: 'Demiklaives' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'klaive', Math.max(0, ctx.modelCount - 1));
        if (select(ctx, 'klaivex', 'klaive') === 'klaive') add(ctx, q, 'klaive', 1);
        else {
          add(ctx, q, 'demiklaives – dual blades', 1);
          add(ctx, q, 'demiklaives – single blade', 1);
        }
        return q;
      }
    },

    'Kharseth': sharedAeldari['Kharseth'],

    'Kabalite Warriors': {
      sections: [{
        title: 'Sybarite wargear',
        description: 'Select the Sybarite weapon swaps and equipment.',
        controls: [
          { type: 'select', key: 'sybarite_ranged', label: 'Sybarite ranged weapon', value: 'splinter_rifle', options: [
            { value: 'splinter_rifle', label: 'Splinter rifle' },
            { value: 'splinter_pistol', label: 'Splinter pistol' },
            { value: 'blast_pistol', label: 'Blast pistol' }
          ] },
          { key: 'power_weapon', label: 'Sybarite power weapon', max: 1 },
          { key: 'kabalite_icon', label: 'Kabalite icon', max: 1 },
          { key: 'phantasm_grenade_launcher', label: 'Phantasm grenade launcher', max: 1 }
        ]
      }, {
        title: 'Special weapons',
        description: 'Assign the Kabalite special weapons. Remaining Kabalites keep splinter rifles.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: 1 },
          { key: 'shredder', label: 'Shredder', max: 1 },
          { key: 'dark_lance', label: 'Dark lance', max: 1 },
          { key: 'splinter_cannon', label: 'Splinter cannon', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specials = number(ctx, 'blaster') + number(ctx, 'shredder') + number(ctx, 'dark_lance') + number(ctx, 'splinter_cannon');
        const sybariteRanged = select(ctx, 'sybarite_ranged', 'splinter_rifle');
        if (sybariteRanged === 'splinter_pistol') add(ctx, q, 'splinter pistol', 1);
        else if (sybariteRanged === 'blast_pistol') add(ctx, q, 'blast pistol', 1);
        add(ctx, q, 'power weapon', number(ctx, 'power_weapon'));
        add(ctx, q, 'blaster', number(ctx, 'blaster'));
        add(ctx, q, 'shredder', number(ctx, 'shredder'));
        add(ctx, q, 'dark lance', number(ctx, 'dark_lance'));
        add(ctx, q, 'splinter cannon', number(ctx, 'splinter_cannon'));
        add(ctx, q, 'splinter rifle', Math.max(0, 10 - specials - (sybariteRanged === 'splinter_rifle' ? 0 : 1)));
        add(ctx, q, 'close combat weapon', 10 - number(ctx, 'power_weapon'));
        return q;
      }
    },

    'Lady Malys': fixed('This model is equipped with: Lady’s Blade; razor fan.', ctx => {
      const q = {};
      add(ctx, q, 'lady’s blade', 1);
      add(ctx, q, 'razor fan', 1);
      return q;
    }),

    'Lelith Hesperax': fixed('This model is equipped with: Lelith’s blades.', ctx => {
      const q = {};
      add(ctx, q, 'lelith’s blades', 1);
      return q;
    }),

    'Mandrakes': fixed('Every model is equipped with: baleblast; glimmersteel blade.', ctx => {
      const q = {};
      add(ctx, q, 'baleblast', ctx.modelCount);
      add(ctx, q, 'glimmersteel blade', ctx.modelCount);
      return q;
    }),

    'Prince Yriel': sharedAeldari['Prince Yriel'],

    'Raider': {
      sections: [{
        title: 'Main gun',
        description: 'Select the Raider main gun.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'dark lance', options: [
            { value: 'dark lance', label: 'Dark lance' },
            { value: 'disintegrator cannon', label: 'Disintegrator cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'dark lance'), 1);
        add(ctx, q, 'bladevanes and chainsnares', 1);
        return q;
      }
    },

    'Ravager': {
      sections: [{
        title: 'Main battery',
        description: 'Select the Ravager main battery.',
        controls: [
          { type: 'select', key: 'battery', label: 'Main battery', value: 'dark lance', options: [
            { value: 'dark lance', label: '3 Dark lances' },
            { value: 'disintegrator cannon', label: '3 Disintegrator cannons' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'battery', 'dark lance'), 3);
        add(ctx, q, 'bladevanes', 1);
        return q;
      }
    },

    'Razorwing Jetfighter': {
      sections: [{
        title: 'Lance battery',
        description: 'Select the Razorwing main guns.',
        controls: [
          { type: 'select', key: 'lances', label: 'Main guns', value: 'dark lance', options: [
            { value: 'dark lance', label: '2 Dark lances' },
            { value: 'disintegrator cannon', label: '2 Disintegrator cannons' }
          ] }
        ]
      }, {
        title: 'Underslung gun',
        description: 'Select the underslung anti-infantry weapon.',
        controls: [
          { type: 'select', key: 'underslung', label: 'Underslung gun', value: 'twin splinter rifle', options: [
            { value: 'twin splinter rifle', label: 'Twin splinter rifle' },
            { value: 'splinter cannon', label: 'Splinter cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'lances', 'dark lance'), 2);
        add(ctx, q, 'razorwing missiles – monoscythe missiles', 1);
        add(ctx, q, 'razorwing missiles – neurotoxin missiles', 1);
        add(ctx, q, 'razorwing missiles – shatterfield missiles', 1);
        add(ctx, q, select(ctx, 'underslung', 'twin splinter rifle'), 1);
        add(ctx, q, 'bladed wings', 1);
        return q;
      }
    },

    'Reavers': {
      sections: [{
        title: 'Special weapons',
        description: 'Assign Reaver special weapons. Remaining models keep splinter rifle and splinter pistol.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: models => Math.floor(Number(models || 0) / 3) },
          { key: 'heat_lance', label: 'Heat lance', max: models => Math.floor(Number(models || 0) / 3) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const blaster = number(ctx, 'blaster');
        const heat = number(ctx, 'heat_lance');
        const specialCap = Math.floor(ctx.modelCount / 3);
        if (blaster + heat > specialCap) ctx.errors.push(`Reavers can replace at most ${specialCap} splinter rifles with blasters or heat lances.`);
        add(ctx, q, 'blaster', blaster);
        add(ctx, q, 'heat lance', heat);
        add(ctx, q, 'splinter pistol', ctx.modelCount);
        add(ctx, q, 'splinter rifle', Math.max(0, ctx.modelCount - blaster - heat));
        add(ctx, q, 'bladevanes', ctx.modelCount);
        return q;
      }
    },

    'Scourges with Heavy Weapons': {
      sections: [{
        title: 'Solarite loadout',
        description: 'Select the Solarite weapon package.',
        controls: [
          { type: 'select', key: 'solarite_loadout', label: 'Solarite loadout', value: 'shardcarbine', options: [
            { value: 'shardcarbine', label: 'Shardcarbine + close combat weapon' },
            { value: 'blast_pistol', label: 'Blast pistol + power weapon' },
            { value: 'splinter_pistol', label: 'Splinter pistol + power weapon' }
          ] }
        ]
      }, {
        title: 'Heavy weapons',
        description: 'Assign the 4 Scourge heavy weapons.',
        controls: [
          { key: 'splinter_cannon', label: 'Splinter cannon', max: 4 },
          { key: 'dark_lance', label: 'Dark lance', max: 4 },
          { key: 'haywire_blaster', label: 'Haywire blaster', max: 4 },
          { key: 'heat_lance', label: 'Heat lance', max: 4 },
          { key: 'blaster', label: 'Blaster', max: 4 },
          { key: 'shredder', label: 'Shredder', max: 4 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const totalHeavy = number(ctx, 'splinter_cannon') + number(ctx, 'dark_lance') + number(ctx, 'haywire_blaster') + number(ctx, 'heat_lance') + number(ctx, 'blaster') + number(ctx, 'shredder');
        if (totalHeavy !== 4) ctx.errors.push(`Scourges with Heavy Weapons must assign exactly 4 heavy weapons; currently ${totalHeavy}.`);
        const solarite = select(ctx, 'solarite_loadout', 'shardcarbine');
        if (solarite === 'shardcarbine') {
          add(ctx, q, 'shardcarbine', 1);
          add(ctx, q, 'close combat weapon', 1);
        } else {
          add(ctx, q, solarite, 1);
          add(ctx, q, 'power weapon', 1);
        }
        add(ctx, q, 'splinter cannon', number(ctx, 'splinter_cannon'));
        add(ctx, q, 'dark lance', number(ctx, 'dark_lance'));
        add(ctx, q, 'haywire blaster', number(ctx, 'haywire_blaster'));
        add(ctx, q, 'heat lance', number(ctx, 'heat_lance'));
        add(ctx, q, 'blaster', number(ctx, 'blaster'));
        add(ctx, q, 'shredder', number(ctx, 'shredder'));
        add(ctx, q, 'close combat weapon', 4);
        return q;
      }
    },

    'Scourges with Shardcarbines': {
      sections: [{
        title: 'Solarite loadout',
        description: 'Select the Solarite weapon package.',
        controls: [
          { type: 'select', key: 'solarite_loadout', label: 'Solarite loadout', value: 'shardcarbine', options: [
            { value: 'shardcarbine', label: 'Shardcarbine + close combat weapon' },
            { value: 'blast_pistol', label: 'Blast pistol + power weapon' },
            { value: 'splinter_pistol', label: 'Splinter pistol + power weapon' }
          ] }
        ]
      }, {
        title: 'Special weapons',
        description: 'Assign the Scourge special weapons. Up to one of each special weapon per 5 models.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: models => Math.floor(Number(models || 0) / 5) },
          { key: 'shredder', label: 'Shredder', max: models => Math.floor(Number(models || 0) / 5) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const blaster = number(ctx, 'blaster');
        const shredder = number(ctx, 'shredder');
        const solarite = select(ctx, 'solarite_loadout', 'shardcarbine');
        if (solarite === 'shardcarbine') {
          add(ctx, q, 'shardcarbine', 1);
          add(ctx, q, 'close combat weapon', 1);
        } else {
          add(ctx, q, solarite, 1);
          add(ctx, q, 'power weapon', 1);
        }
        add(ctx, q, 'blaster', blaster);
        add(ctx, q, 'shredder', shredder);
        add(ctx, q, 'shardcarbine', Math.max(0, 5 - blaster - shredder - (solarite === 'shardcarbine' ? 1 : 0)));
        add(ctx, q, 'close combat weapon', 4);
        return q;
      }
    },

    'Shadowseer': sharedAeldari['Shadowseer'],
    'Skyweavers': sharedAeldari['Skyweavers'],
    'Solitaire': sharedAeldari['Solitaire'],
    'Starfangs': sharedAeldari['Starfangs'],
    'Starweaver': sharedAeldari['Starweaver'],

    'Succubus': fixed('This model is equipped with: Archite glaive and agoniser.', ctx => {
      const q = {};
      add(ctx, q, 'archite glaive and agoniser', 1);
      return q;
    }),

    'Talos': {
      sections: [{
        title: 'Twin gun',
        description: 'Each Talos can replace its twin splinter cannon with a twin haywire blaster or twin heat lance.',
        controls: [
          { key: 'twin_splinter_cannon', label: 'Twin splinter cannon', max: models => Number(models || 0) },
          { key: 'twin_haywire_blaster', label: 'Twin haywire blaster', max: models => Number(models || 0) },
          { key: 'twin_heat_lance', label: 'Twin heat lance', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Weapon and arm replacements',
        description: 'Each Talos can replace one macro-scalpel with a twin liquifier gun, chain-flails or talos gauntlet.',
        controls: [
          { key: 'twin_liquifier_gun', label: 'Twin liquifier gun', max: models => Number(models || 0) },
          { key: 'chain_flails', label: 'Chain-flails', max: models => Number(models || 0) },
          { key: 'talos_gauntlet', label: 'Talos gauntlet', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Tail weapon',
        description: 'Optional Talos tail weapons.',
        controls: [
          { key: 'stinger_pod', label: 'Stinger pod', max: models => Number(models || 0) },
          { key: 'talos_ichor_injector', label: 'Talos ichor injector', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const twinSplinter = number(ctx, 'twin_splinter_cannon');
        const twinHaywire = number(ctx, 'twin_haywire_blaster');
        const twinHeat = number(ctx, 'twin_heat_lance');
        const rangedTotal = twinSplinter + twinHaywire + twinHeat;
        const liquifier = number(ctx, 'twin_liquifier_gun');
        const flails = number(ctx, 'chain_flails');
        const gauntlet = number(ctx, 'talos_gauntlet');
        const replacementTotal = liquifier + flails + gauntlet;
        const tailTotal = number(ctx, 'stinger_pod') + number(ctx, 'talos_ichor_injector');
        if (rangedTotal !== ctx.modelCount) ctx.errors.push(`Talos twin gun selections must total ${ctx.modelCount}; currently ${rangedTotal}.`);
        if (replacementTotal > ctx.modelCount) ctx.errors.push('Talos can replace at most one macro-scalpel per model.');
        if (tailTotal > ctx.modelCount) ctx.errors.push('Talos tail weapon selections exceed unit size.');
        add(ctx, q, 'twin splinter cannon', twinSplinter);
        add(ctx, q, 'twin haywire blaster', twinHaywire);
        add(ctx, q, 'twin heat lance', twinHeat);
        add(ctx, q, 'twin liquifier gun', liquifier);
        add(ctx, q, 'chain-flails', flails);
        add(ctx, q, 'talos gauntlet', gauntlet);
        add(ctx, q, 'macro-scalpel', (ctx.modelCount * 2) - replacementTotal);
        add(ctx, q, 'stinger pod', number(ctx, 'stinger_pod'));
        add(ctx, q, 'talos ichor injector', number(ctx, 'talos_ichor_injector'));
        return q;
      }
    },

    'Troupe': sharedAeldari['Troupe'],
    'Troupe Master': sharedAeldari['Troupe Master'],

    'Venom': {
      sections: [{
        title: 'Secondary gun',
        description: 'Select whether the twin splinter rifle is kept or replaced with a splinter cannon.',
        controls: [
          { type: 'select', key: 'secondary_gun', label: 'Secondary gun', value: 'twin splinter rifle', options: [
            { value: 'twin splinter rifle', label: 'Twin splinter rifle' },
            { value: 'splinter cannon', label: 'Splinter cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'splinter cannon', 1);
        add(ctx, q, select(ctx, 'secondary_gun', 'twin splinter rifle'), 1);
        add(ctx, q, 'bladevanes', 1);
        return q;
      }
    },

    'Voidraven Bomber': {
      sections: [{
        title: 'Void weapons',
        description: 'Select the Voidraven main guns and missile rack.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main guns', value: 'void lance', options: [
            { value: 'void lance', label: '2 Void lances' },
            { value: 'dark scythe', label: '2 Dark scythes' }
          ] },
          { type: 'select', key: 'missiles', label: 'Missile rack', value: 'voidraven missiles – implosion missiles', options: [
            { value: 'voidraven missiles – implosion missiles', label: 'Implosion missiles' },
            { value: 'voidraven missiles – shatterfield missiles', label: 'Shatterfield missiles' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'void lance'), 2);
        add(ctx, q, select(ctx, 'missiles', 'voidraven missiles – implosion missiles'), 1);
        add(ctx, q, 'bladed wings', 1);
        return q;
      }
    },

    'Voidweaver': sharedAeldari['Voidweaver'],

    'Wracks': {
      sections: [{
        title: 'Acothyst loadout',
        description: 'Select the Acothyst melee loadout.',
        controls: [
          { type: 'select', key: 'acothyst_loadout', label: 'Acothyst loadout', value: 'twin_tools', options: [
            { value: 'twin_tools', label: 'Twin torturerâ€™s tools' },
            { value: 'power_weapon_and_tool', label: 'Power weapon + torturerâ€™s tool' },
            { value: 'twin_power_weapons', label: '2 Power weapons' }
          ] }
        ]
      }, {
        title: 'Special weapons',
        description: 'Assign the Wrack special weapons. Up to one of each special weapon per 5 models.',
        controls: [
          { key: 'hexrifle', label: 'Hexrifle', max: models => Math.floor(Number(models || 0) / 5) },
          { key: 'liquifier_gun', label: 'Liquifier gun', max: models => Math.floor(Number(models || 0) / 5) },
          { key: 'ossefactor', label: 'Ossefactor', max: models => Math.floor(Number(models || 0) / 5) },
          { key: 'torturers_tools', label: 'Torturer’s tools', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specials = number(ctx, 'hexrifle') + number(ctx, 'liquifier_gun') + number(ctx, 'ossefactor');
        const acothystSwap = Math.max(number(ctx, 'stinger_pistol'), number(ctx, 'power_weapon'), number(ctx, 'torturers_tools'));
        add(ctx, q, 'stinger pistol', number(ctx, 'stinger_pistol'));
        add(ctx, q, 'power weapon', number(ctx, 'power_weapon'));
        add(ctx, q, 'hexrifle', number(ctx, 'hexrifle'));
        add(ctx, q, 'liquifier gun', number(ctx, 'liquifier_gun'));
        add(ctx, q, 'ossefactor', number(ctx, 'ossefactor'));
        add(ctx, q, 'torturer’s tools', number(ctx, 'torturers_tools'));
        add(ctx, q, 'twin torturer’s tools', Math.max(0, ctx.modelCount - specials - acothystSwap));
        return q;
      }
    },

    'Wyches': {
      sections: [{
        title: 'Hekatrix pistol',
        description: 'Assign the Hekatrix blast pistol if taken.',
        controls: [
          { key: 'blast_pistol', label: 'Blast pistol', max: 1 }
        ]
      }, {
        title: 'Wych weapons',
        description: 'Assign the special Wych melee weapons.',
        controls: [
          { key: 'gladiatorial_weapons', label: 'Gladiatorial weapons', max: 3 },
          { key: 'power_weapon', label: 'Power weapon', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const blast = number(ctx, 'blast_pistol');
        const gladiatorial = number(ctx, 'gladiatorial_weapons');
        const power = number(ctx, 'power_weapon');
        add(ctx, q, 'blast pistol', blast);
        add(ctx, q, 'splinter pistol', Math.max(0, ctx.modelCount - blast - gladiatorial));
        add(ctx, q, 'gladiatorial weapons', gladiatorial);
        add(ctx, q, 'power weapon', power);
        add(ctx, q, 'hekatarii blade', Math.max(0, ctx.modelCount - gladiatorial - power));
        return q;
      }
    }
  };

  registry['drukhari']['Wracks'] = {
    sections: [{
      title: 'Acothyst loadout',
      description: 'Select the Acothyst melee loadout.',
      controls: [
        { type: 'select', key: 'acothyst_loadout', label: 'Acothyst loadout', value: 'twin_tools', options: [
          { value: 'twin_tools', label: 'Twin torturerâ€™s tools' },
          { value: 'power_weapon_and_tool', label: 'Power weapon + torturerâ€™s tool' },
          { value: 'twin_power_weapons', label: '2 Power weapons' }
        ] }
      ]
    }, {
      title: 'Special weapons',
      description: 'Assign the Wrack special weapons. Up to one of each special weapon per 5 models.',
      controls: [
        { key: 'hexrifle', label: 'Hexrifle', max: models => Math.floor(Number(models || 0) / 5) },
        { key: 'liquifier_gun', label: 'Liquifier gun', max: models => Math.floor(Number(models || 0) / 5) },
        { key: 'ossefactor', label: 'Ossefactor', max: models => Math.floor(Number(models || 0) / 5) },
        { key: 'stinger_pistol', label: 'Stinger pistol', max: models => Math.floor(Number(models || 0) / 5) }
      ]
    }],
    quantities: ctx => {
      const q = {};
      const specials = number(ctx, 'hexrifle') + number(ctx, 'liquifier_gun') + number(ctx, 'ossefactor') + number(ctx, 'stinger_pistol');
      const acothystLoadout = select(ctx, 'acothyst_loadout', 'twin_tools');
      add(ctx, q, 'stinger pistol', number(ctx, 'stinger_pistol'));
      add(ctx, q, 'hexrifle', number(ctx, 'hexrifle'));
      add(ctx, q, 'liquifier gun', number(ctx, 'liquifier_gun'));
      add(ctx, q, 'ossefactor', number(ctx, 'ossefactor'));
      add(ctx, q, 'torturerâ€™s tools', specials);
      if (acothystLoadout === 'power_weapon_and_tool') {
        add(ctx, q, 'power weapon', 1);
        add(ctx, q, 'torturerâ€™s tools', 1);
      } else if (acothystLoadout === 'twin_power_weapons') {
        add(ctx, q, 'power weapon', 2);
      } else {
        add(ctx, q, 'twin torturerâ€™s tools', 1);
      }
      add(ctx, q, 'twin torturerâ€™s tools', Math.max(0, ctx.modelCount - 1 - specials));
      return q;
    }
  };
}());
