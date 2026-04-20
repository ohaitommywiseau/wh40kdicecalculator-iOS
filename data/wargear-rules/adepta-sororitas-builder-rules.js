(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount = 1) => ctx.add(q, key, amount);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;
  const number = (ctx, key) => ctx.number(key);
  const maxPerFive = models => Math.floor(Number(models || 0) / 5);
  const maxTwoPerFive = models => Math.floor(Number(models || 0) / 5) * 2;

  const addPlasmaPistol = (ctx, q, amount = 1) => {
    add(ctx, q, 'plasma pistol – standard', amount);
    add(ctx, q, 'plasma pistol – supercharge', amount);
  };

  const addPlasmaGun = (ctx, q, amount = 1) => {
    add(ctx, q, 'plasma gun – standard', amount);
    add(ctx, q, 'plasma gun – supercharge', amount);
  };

  registry['adepta-sororitas'] = {
    'Aestred Thurga And Agathae Dolan': {
      sections: [{
        title: 'Aestred Thurga And Agathae Dolan loadout',
        description: 'Aestred Thurga is equipped with: bolt pistol; Blade of Vigil. Agathae Dolan is equipped with: bolt pistol; scribe’s staff.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 2);
        add(ctx, q, 'blade of vigil', 1);
        add(ctx, q, 'scribe’s staff', 1);
        return q;
      },
    },

    'Arco-flagellants': {
      sections: [{
        title: 'Arco-flagellants loadout',
        description: 'Every model is equipped with: arco-flails.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'arco-flails', ctx.modelCount);
        return q;
      },
    },

    'Battle Sisters Squad': {
      sections: [{
        title: 'Battle Sister special weapon',
        description: 'One Battle Sister can replace its boltgun with one special weapon.',
        controls: [
          { type: 'select', key: 'special_weapon', label: 'Special weapon', value: '', options: [
            { value: '', label: 'None' },
            { value: 'artificer-crafted storm bolter', label: 'Artificer-crafted storm bolter' },
            { value: 'condemnor boltgun', label: 'Condemnor boltgun' },
            { value: 'meltagun', label: 'Meltagun' },
            { value: 'ministorum flamer', label: 'Ministorum flamer' },
          ] },
        ],
      }, {
        title: 'Battle Sister heavy weapon',
        description: 'One Battle Sister can replace its boltgun with one heavy weapon.',
        controls: [
          { type: 'select', key: 'heavy_weapon', label: 'Heavy weapon', value: '', options: [
            { value: '', label: 'None' },
            { value: 'heavy bolter', label: 'Heavy bolter' },
            { value: 'ministorum heavy flamer', label: 'Ministorum heavy flamer' },
            { value: 'multi-melta', label: 'Multi-melta' },
          ] },
        ],
      }, {
        title: 'Sister Superior',
        description: 'Configure the Sister Superior ranged and melee swaps.',
        controls: [
          { type: 'select', key: 'superior_ranged', label: 'Superior ranged weapon', value: 'boltgun', options: [
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'condemnor boltgun', label: 'Condemnor boltgun' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'ministorum hand flamer', label: 'Ministorum hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'superior_melee', label: 'Superior melee weapon', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'chainsword', label: 'Chainsword' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
          { type: 'select', key: 'simulacrum', label: 'Simulacrum Imperialis', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const nonSuperiorCount = Math.max(0, ctx.modelCount - 1);
        const specialWeapon = select(ctx, 'special_weapon', '');
        const heavyWeapon = select(ctx, 'heavy_weapon', '');
        const superiorRanged = select(ctx, 'superior_ranged', 'boltgun');
        const superiorMelee = select(ctx, 'superior_melee', 'close combat weapon');
        const replacedBoltguns = (specialWeapon ? 1 : 0) + (heavyWeapon ? 1 : 0);

        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'boltgun', Math.max(0, nonSuperiorCount - replacedBoltguns) + (superiorRanged === 'boltgun' ? 1 : 0));
        add(ctx, q, 'close combat weapon', nonSuperiorCount + (superiorMelee === 'close combat weapon' ? 1 : 0));
        if (specialWeapon) add(ctx, q, specialWeapon, 1);
        if (heavyWeapon) add(ctx, q, heavyWeapon, 1);
        if (superiorRanged === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else if (superiorRanged !== 'boltgun') add(ctx, q, superiorRanged, 1);
        if (superiorMelee !== 'close combat weapon') add(ctx, q, superiorMelee, 1);
        if (select(ctx, 'simulacrum', 'no') === 'yes') ctx.derived.push('Simulacrum Imperialis equipped.');
        return q;
      },
    },

    'Canoness': {
      sections: [{
        title: 'Canoness wargear',
        description: 'Configure the Canoness ranged and melee loadout.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'condemnor boltgun', label: 'Condemnor boltgun' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
            { value: 'brazier of holy fire', label: 'Brazier of holy fire' },
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'hallowed chainsword', options: [
            { value: 'hallowed chainsword', label: 'Hallowed chainsword' },
            { value: 'blessed blade', label: 'Blessed blade' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const ranged = select(ctx, 'ranged', 'bolt pistol');
        if (ranged === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else add(ctx, q, ranged, 1);
        add(ctx, q, select(ctx, 'melee', 'hallowed chainsword'), 1);
        ctx.derived.push('Null Rod / Rod of Office abilities active as printed on the datasheet.');
        return q;
      },
    },

    'Canoness with Jump Pack': {
      sections: [{
        title: 'Canoness with Jump Pack wargear',
        description: 'Configure the Canoness with Jump Pack loadout.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'none', options: [
            { value: 'none', label: 'No ranged weapon' },
            { value: 'ministorum hand flamer', label: 'Ministorum hand flamer' },
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'blessed halberd', options: [
            { value: 'blessed halberd', label: 'Blessed halberd' },
            { value: 'holy eviscerator', label: 'Holy Eviscerator' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const ranged = select(ctx, 'ranged', 'none');
        if (ranged !== 'none') add(ctx, q, ranged, 1);
        add(ctx, q, select(ctx, 'melee', 'blessed halberd'), 1);
        return q;
      },
    },

    'Castigator': {
      sections: [{
        title: 'Turret weapon',
        description: 'This model’s Castigator autocannons can be replaced with 1 Castigator battle cannon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'castigator autocannons', options: [
            { value: 'castigator autocannons', label: 'Castigator autocannons' },
            { value: 'castigator battle cannon', label: 'Castigator battle cannon' },
          ] },
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
        add(ctx, q, select(ctx, 'main_gun', 'castigator autocannons'), 1);
        add(ctx, q, 'heavy bolter', 3);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      },
    },

    'Celestian Insidiants': {
      sections: [{
        title: 'Celestian Insidiants loadout',
        description: 'Each model is equipped with: condemnor bolt pistol; null mace.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'condemnor bolt pistol', ctx.modelCount);
        add(ctx, q, 'null mace', ctx.modelCount);
        return q;
      },
    },

    'Celestian Sacresants': {
      sections: [{
        title: 'Sacresant weapons',
        description: 'Any number of Celestian Sacresants can replace their hallowed mace with 1 anointed halberd.',
        controls: [
          { key: 'halberd', label: '1 anointed halberd', max: models => Math.max(0, Number(models || 0) - 1) },
        ],
      }, {
        title: 'Sacresant Superior',
        description: 'Configure the Sacresant Superior.',
        controls: [
          { type: 'select', key: 'superior_ranged', label: 'Superior ranged weapon', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'ministorum hand flamer', label: 'Ministorum hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'superior_melee', label: 'Superior melee weapon', value: 'hallowed mace', options: [
            { value: 'hallowed mace', label: 'Hallowed mace' },
            { value: 'anointed halberd', label: 'Anointed halberd' },
            { value: 'spear of the faithful', label: 'Spear of the faithful' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const halberds = number(ctx, 'halberd');
        const nonSuperior = Math.max(0, ctx.modelCount - 1);
        const superiorRanged = select(ctx, 'superior_ranged', 'bolt pistol');
        const superiorMelee = select(ctx, 'superior_melee', 'hallowed mace');
        if (halberds > nonSuperior) ctx.errors.push(`Anointed halberds must total ${nonSuperior} or fewer; currently ${halberds}.`);

        add(ctx, q, 'bolt pistol', nonSuperior + (superiorRanged === 'bolt pistol' ? 1 : 0));
        add(ctx, q, 'hallowed mace', Math.max(0, nonSuperior - halberds) + (superiorMelee === 'hallowed mace' ? 1 : 0));
        add(ctx, q, 'anointed halberd', halberds + (superiorMelee === 'anointed halberd' ? 1 : 0));
        if (superiorRanged === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else if (superiorRanged !== 'bolt pistol') add(ctx, q, superiorRanged, 1);
        if (superiorMelee === 'spear of the faithful') add(ctx, q, 'spear of the faithful', 1);
        return q;
      },
    },

    'Daemonifuge': {
      sections: [{
        title: 'Daemonifuge loadout',
        description: 'Ephrael Stern is equipped with: bolt pistol; Sanctity. Kyganil of the Bloody Tears is equipped with: the Outcast’s Weapons.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'sanctity', 1);
        add(ctx, q, 'the outcast’s weapons', 1);
        return q;
      },
    },

    'Dialogus': {
      sections: [{
        title: 'Dialogus loadout',
        description: 'This model is equipped with: bolt pistol; Dialogus staff.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'dialogus staff', 1);
        return q;
      },
    },

    'Dogmata': {
      sections: [{
        title: 'Dogmata loadout',
        description: 'This model is equipped with: bolt pistol; mace of the righteous.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'mace of the righteous', 1);
        return q;
      },
    },

    'Dominion Squad': {
      sections: [{
        title: 'Dominion weapons',
        description: 'Up to four Dominions can replace their boltguns with specialist weapons.',
        controls: [
          { key: 'artificer_storm_bolter', label: '1 artificer-crafted storm bolter', max: 4 },
          { key: 'condemnor_boltgun', label: '1 condemnor boltgun', max: 4 },
          { key: 'meltagun', label: '1 meltagun', max: 4 },
          { key: 'ministorum_flamer', label: '1 Ministorum flamer', max: 4 },
        ],
      }, {
        title: 'Dominion Superior',
        description: 'Configure the Dominion Superior.',
        controls: [
          { type: 'select', key: 'superior_ranged', label: 'Superior ranged weapon', value: 'boltgun', options: [
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'condemnor boltgun', label: 'Condemnor boltgun' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'ministorum hand flamer', label: 'Ministorum hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'superior_melee', label: 'Superior melee weapon', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'chainsword', label: 'Chainsword' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
          { type: 'select', key: 'simulacrum', label: 'Simulacrum Imperialis', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const artificerStormBolters = number(ctx, 'artificer_storm_bolter');
        const condemnorBoltguns = number(ctx, 'condemnor_boltgun');
        const meltaguns = number(ctx, 'meltagun');
        const flamers = number(ctx, 'ministorum_flamer');
        const specialistTotal = artificerStormBolters + condemnorBoltguns + meltaguns + flamers;
        const nonSuperiorCount = Math.max(0, ctx.modelCount - 1);
        const superiorRanged = select(ctx, 'superior_ranged', 'boltgun');
        const superiorMelee = select(ctx, 'superior_melee', 'close combat weapon');
        if (specialistTotal > 4) ctx.errors.push(`Dominion specialist weapons must total 4 or fewer; currently ${specialistTotal}.`);
        if (specialistTotal > nonSuperiorCount) ctx.errors.push(`Only ${nonSuperiorCount} non-superior Dominions can replace boltguns; currently ${specialistTotal}.`);

        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'boltgun', Math.max(0, nonSuperiorCount - specialistTotal) + (superiorRanged === 'boltgun' ? 1 : 0));
        add(ctx, q, 'close combat weapon', nonSuperiorCount + (superiorMelee === 'close combat weapon' ? 1 : 0));
        add(ctx, q, 'artificer-crafted storm bolter', artificerStormBolters);
        add(ctx, q, 'condemnor boltgun', condemnorBoltguns + (superiorRanged === 'condemnor boltgun' ? 1 : 0));
        add(ctx, q, 'meltagun', meltaguns);
        add(ctx, q, 'ministorum flamer', flamers);
        if (superiorRanged === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else if (superiorRanged !== 'boltgun' && superiorRanged !== 'condemnor boltgun') add(ctx, q, superiorRanged, 1);
        if (superiorMelee !== 'close combat weapon') add(ctx, q, superiorMelee, 1);
        if (select(ctx, 'simulacrum', 'no') === 'yes') ctx.derived.push('Simulacrum Imperialis equipped.');
        return q;
      },
    },

    'Exorcist': {
      sections: [{
        title: 'Exorcist launcher',
        description: 'This model’s Exorcist missile launcher can be replaced with 1 Exorcist conflagration rockets.',
        controls: [
          { type: 'select', key: 'launcher', label: 'Launcher', value: 'exorcist missile launcher', options: [
            { value: 'exorcist missile launcher', label: 'Exorcist missile launcher' },
            { value: 'exorcist conflagration rockets', label: 'Exorcist conflagration rockets' },
          ] },
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'launcher', 'exorcist missile launcher'), 1);
        add(ctx, q, 'heavy bolter', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        return q;
      },
    },

    'Hospitaller': {
      sections: [{
        title: 'Hospitaller loadout',
        description: 'This model is equipped with: bolt pistol; chirurgeon’s tools.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'chirurgeon’s tools', 1);
        return q;
      },
    },

    'Imagifier': {
      sections: [{
        title: 'Imagifier loadout',
        description: 'This model is equipped with: bolt pistol; boltgun; close combat weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'boltgun', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      },
    },

    'Immolator': {
      sections: [{
        title: 'Immolator turret',
        description: 'This model’s immolation flamers can be replaced with 1 twin heavy bolter or 1 twin multi-melta.',
        controls: [
          { type: 'select', key: 'turret', label: 'Turret weapon', value: 'immolation flamers', options: [
            { value: 'immolation flamers', label: 'Immolation flamers' },
            { value: 'twin heavy bolter', label: 'Twin heavy bolter' },
            { value: 'twin multi-melta', label: 'Twin multi-melta' },
          ] },
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'heavy bolter', 1);
        add(ctx, q, select(ctx, 'turret', 'immolation flamers'), 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        return q;
      },
    },

    'Junith Eruita': {
      sections: [{
        title: 'Junith Eruita loadout',
        description: 'This model is equipped with: twin Ministorum heavy flamer; Mace of Castigation.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'twin ministorum heavy flamer', 1);
        add(ctx, q, 'mace of castigation', 1);
        return q;
      },
    },

    'Ministorum Priest': {
      sections: [{
        title: 'Ministorum Priest loadout',
        description: 'This model is equipped with: zealot’s vindictor.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'zealot’s vindictor (1)', 1);
        return q;
      },
    },

    'Mortifiers': {
      sections: [{
        title: 'Ranged armament',
        description: 'Each Mortifier can replace its heavy bolters with Mortifier flamers.',
        controls: [
          { key: 'flamer_model', label: '1 Mortifier with Mortifier flamers', max: models => Math.max(0, Number(models || 0)) },
        ],
      }, {
        title: 'Melee armament',
        description: 'Each Mortifier can replace its twin penitent buzz-blades with twin penitent flails.',
        controls: [
          { key: 'flail_model', label: '1 Mortifier with twin penitent flails', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const flamerModels = number(ctx, 'flamer_model');
        const flailModels = number(ctx, 'flail_model');
        if (flamerModels > ctx.modelCount) ctx.errors.push(`Mortifier flamers must total ${ctx.modelCount} or fewer; currently ${flamerModels}.`);
        if (flailModels > ctx.modelCount) ctx.errors.push(`Twin penitent flails must total ${ctx.modelCount} or fewer; currently ${flailModels}.`);
        add(ctx, q, 'heavy bolter', Math.max(0, (ctx.modelCount - flamerModels) * 2));
        add(ctx, q, 'mortifier flamer', flamerModels * 2);
        add(ctx, q, 'twin penitent buzz-blades', Math.max(0, ctx.modelCount - flailModels));
        add(ctx, q, 'twin penitent flails', flailModels);
        return q;
      },
    },

    'Morvenn Vahl': {
      sections: [{
        title: 'Morvenn Vahl loadout',
        description: 'This model is equipped with: Fidelis; Paragon missile launcher; Lance of Illumination.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'fidelis', 1);
        add(ctx, q, 'paragon missile launcher – prioris', 1);
        add(ctx, q, 'paragon missile launcher – sanctorum', 1);
        add(ctx, q, 'lance of illumination – strike', 1);
        add(ctx, q, 'lance of illumination – sweep', 1);
        return q;
      },
    },

    'Palatine': {
      sections: [{
        title: 'Palatine wargear',
        description: 'This model is equipped with: bolt pistol; Palatine blade.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Ranged weapon', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        if (select(ctx, 'pistol', 'bolt pistol') === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'palatine blade', 1);
        return q;
      },
    },

    'Paragon Warsuits': {
      sections: [{
        title: 'Heavy weapons',
        description: 'Each Paragon Warsuit can choose its heavy weapon.',
        controls: [
          { key: 'heavy_bolter', label: '1 heavy bolter', max: models => Math.max(0, Number(models || 0)) },
          { key: 'ministorum_heavy_flamer', label: '1 Ministorum heavy flamer', max: models => Math.max(0, Number(models || 0)) },
          { key: 'multi_melta', label: '1 multi-melta', max: models => Math.max(0, Number(models || 0)) },
        ],
      }, {
        title: 'Melee weapons',
        description: 'Each Paragon Warsuit can choose its melee weapon.',
        controls: [
          { key: 'war_mace', label: '1 Paragon war mace', max: models => Math.max(0, Number(models || 0)) },
        ],
      }, {
        title: 'Auxiliary launchers',
        description: 'Any number of models can be equipped with Paragon grenade launchers.',
        controls: [
          { key: 'grenade_launcher', label: '1 Paragon grenade launchers', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const heavyBolters = number(ctx, 'heavy_bolter');
        const heavyFlamers = number(ctx, 'ministorum_heavy_flamer');
        const multiMeltas = number(ctx, 'multi_melta');
        const heavyTotal = heavyBolters + heavyFlamers + multiMeltas;
        const warMaces = number(ctx, 'war_mace');
        const grenadeLaunchers = number(ctx, 'grenade_launcher');
        if (heavyTotal > ctx.modelCount) ctx.errors.push(`Paragon heavy weapons must total ${ctx.modelCount} or fewer; currently ${heavyTotal}.`);
        if (warMaces > ctx.modelCount) ctx.errors.push(`Paragon war maces must total ${ctx.modelCount} or fewer; currently ${warMaces}.`);
        if (grenadeLaunchers > ctx.modelCount) ctx.errors.push(`Paragon grenade launchers must total ${ctx.modelCount} or fewer; currently ${grenadeLaunchers}.`);

        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'heavy bolter', heavyBolters);
        add(ctx, q, 'ministorum heavy flamer', heavyFlamers);
        add(ctx, q, 'multi-melta', multiMeltas);
        add(ctx, q, 'paragon storm bolters', ctx.modelCount);
        add(ctx, q, 'paragon war blade', Math.max(0, ctx.modelCount - warMaces));
        add(ctx, q, 'paragon war mace', warMaces);
        add(ctx, q, 'paragon grenade launchers', grenadeLaunchers);
        return q;
      },
    },

    'Penitent Engines': {
      sections: [{
        title: 'Penitent Engine melee arms',
        description: 'Each Penitent Engine can replace its twin penitent buzz-blades with twin penitent flails.',
        controls: [
          { key: 'flail_model', label: '1 Penitent Engine with twin penitent flails', max: models => Math.max(0, Number(models || 0)) },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const flailModels = number(ctx, 'flail_model');
        if (flailModels > ctx.modelCount) ctx.errors.push(`Twin penitent flails must total ${ctx.modelCount} or fewer; currently ${flailModels}.`);
        add(ctx, q, 'penitent flamers', ctx.modelCount);
        add(ctx, q, 'twin penitent buzz-blades', Math.max(0, ctx.modelCount - flailModels));
        add(ctx, q, 'twin penitent flails', flailModels);
        return q;
      },
    },

    'Repentia Squad': {
      sections: [{
        title: 'Repentia Squad loadout',
        description: 'The Repentia Superior is equipped with: bolt pistol; neural whips. Each Sister Repentia is equipped with: penitent eviscerator.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        const repentiaCount = Math.max(0, ctx.modelCount - 1);
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'neural whips', 1);
        add(ctx, q, 'penitent eviscerator', repentiaCount);
        return q;
      },
    },

    'Retributor Squad': {
      sections: [{
        title: 'Retributor heavy weapons',
        description: 'Each Retributor can choose its heavy weapon.',
        controls: [
          { key: 'heavy_bolter', label: '1 heavy bolter', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'ministorum_heavy_flamer', label: '1 Ministorum heavy flamer', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'multi_melta', label: '1 multi-melta', max: models => Math.max(0, Number(models || 0) - 1) },
        ],
      }, {
        title: 'Retributor Superior',
        description: 'Configure the Retributor Superior.',
        controls: [
          { type: 'select', key: 'superior_ranged', label: 'Superior ranged weapon', value: 'boltgun', options: [
            { value: 'boltgun', label: 'Boltgun' },
            { value: 'combi-weapon', label: 'Combi-weapon' },
            { value: 'condemnor boltgun', label: 'Condemnor boltgun' },
            { value: 'inferno pistol', label: 'Inferno pistol' },
            { value: 'ministorum hand flamer', label: 'Ministorum hand flamer' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'superior_melee', label: 'Superior melee weapon', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'chainsword', label: 'Chainsword' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const nonSuperiorCount = Math.max(0, ctx.modelCount - 1);
        const heavyBolters = number(ctx, 'heavy_bolter');
        const heavyFlamers = number(ctx, 'ministorum_heavy_flamer');
        const multiMeltas = number(ctx, 'multi_melta');
        const heavyTotal = heavyBolters + heavyFlamers + multiMeltas;
        const superiorRanged = select(ctx, 'superior_ranged', 'boltgun');
        const superiorMelee = select(ctx, 'superior_melee', 'close combat weapon');
        if (heavyTotal > nonSuperiorCount) ctx.errors.push(`Retributor heavy weapons must total ${nonSuperiorCount} or fewer; currently ${heavyTotal}.`);

        add(ctx, q, 'bolt pistol', ctx.modelCount);
        add(ctx, q, 'boltgun', superiorRanged === 'boltgun' ? 1 : 0);
        add(ctx, q, 'close combat weapon', nonSuperiorCount + (superiorMelee === 'close combat weapon' ? 1 : 0));
        add(ctx, q, 'heavy bolter', heavyBolters);
        add(ctx, q, 'ministorum heavy flamer', heavyFlamers);
        add(ctx, q, 'multi-melta', multiMeltas);
        if (superiorRanged === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        else if (superiorRanged !== 'boltgun') add(ctx, q, superiorRanged, 1);
        if (superiorMelee !== 'close combat weapon') add(ctx, q, superiorMelee, 1);
        return q;
      },
    },

    'Saint Celestine': {
      sections: [{
        title: 'Saint Celestine loadout',
        description: 'Saint Celestine is equipped with: the Ardent Blade. Each Geminae Superia is equipped with: bolt pistol; power weapon.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'the ardent blade (1)', 1);
        add(ctx, q, 'bolt pistol', 2);
        add(ctx, q, 'power weapon', 2);
        return q;
      },
    },

    'Sanctifiers': {
      sections: [{
        title: 'Sanctifiers loadout',
        description: 'Builds the printed datasheet composition for the Sanctifiers unit.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        const baseSpecialists = 5;
        const sanctifiers = Math.max(0, ctx.modelCount - baseSpecialists);
        if (ctx.modelCount < 5) ctx.errors.push('Sanctifiers require at least 5 models to represent the printed specialist lineup.');
        add(ctx, q, 'holy fire', 1);
        add(ctx, q, 'burning hands', 1);
        add(ctx, q, 'close combat weapon', 1);
        add(ctx, q, 'death cult blades', 1);
        addPlasmaGun(ctx, q, 1);
        add(ctx, q, 'ministorum flamer', 1);
        add(ctx, q, 'sanctifier melee weapon', 2 + sanctifiers);
        add(ctx, q, 'ministorum hand flamer', sanctifiers);
        ctx.derived.push('Salvationist medikit equipped.');
        ctx.derived.push('Simulacrum Imperialis equipped.');
        return q;
      },
    },

    'Seraphim Squad': {
      sections: [{
        title: 'Seraphim special pistols',
        description: 'For every 5 models in this unit, up to 2 Seraphim can each replace both bolt pistols with two inferno pistols or two Ministorum hand flamers.',
        controls: [
          { key: 'inferno_pairs', label: '1 Seraphim with two inferno pistols', max: maxTwoPerFive },
          { key: 'hand_flamer_pairs', label: '1 Seraphim with two Ministorum hand flamers', max: maxTwoPerFive },
        ],
      }, {
        title: 'Seraphim Superior',
        description: 'Configure the Seraphim Superior.',
        controls: [
          { type: 'select', key: 'superior_pistol', label: 'Superior special pistol', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'superior_melee', label: 'Superior melee weapon', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'chainsword', label: 'Chainsword' },
            { value: 'power weapon', label: 'Power weapon' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const infernoPairs = number(ctx, 'inferno_pairs');
        const handFlamerPairs = number(ctx, 'hand_flamer_pairs');
        const pairTotal = infernoPairs + handFlamerPairs;
        const pairMax = maxTwoPerFive(ctx.modelCount);
        const superiorPistol = select(ctx, 'superior_pistol', 'none');
        const superiorMelee = select(ctx, 'superior_melee', 'close combat weapon');
        if (pairTotal > pairMax) ctx.errors.push(`Seraphim special pistol pairs must total ${pairMax} or fewer; currently ${pairTotal}.`);

        add(ctx, q, 'bolt pistol', Math.max(0, (ctx.modelCount * 2) - (pairTotal * 2) - (superiorPistol === 'plasma pistol' ? 1 : 0)));
        add(ctx, q, 'close combat weapon', ctx.modelCount - (superiorMelee !== 'close combat weapon' ? 1 : 0));
        add(ctx, q, 'inferno pistol', infernoPairs * 2);
        add(ctx, q, 'ministorum hand flamer', handFlamerPairs * 2);
        if (superiorPistol === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        if (superiorMelee !== 'close combat weapon') add(ctx, q, superiorMelee, 1);
        return q;
      },
    },

    'Sisters Novitiate Squad': {
      sections: [{
        title: 'Sister Novitiate special weapon',
        description: 'One Sister Novitiate can replace its autogun with 1 Ministorum flamer.',
        controls: [
          { type: 'select', key: 'flamer', label: 'Ministorum flamer', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }, {
        title: 'Novitiate Superior',
        description: 'Configure the Novitiate Superior.',
        controls: [
          { type: 'select', key: 'superior_pistol', label: 'Superior special pistol', value: 'none', options: [
            { value: 'none', label: 'None' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'superior_melee', label: 'Superior melee weapon', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'power weapon', label: 'Power weapon' },
            { value: 'novitiate melee weapons', label: 'Novitiate melee weapons' },
          ] },
          { type: 'select', key: 'banner', label: 'Sacred Banner / Simulacrum package', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const nonSuperiorCount = Math.max(0, ctx.modelCount - 1);
        const flamer = select(ctx, 'flamer', 'no') === 'yes' ? 1 : 0;
        const superiorPistol = select(ctx, 'superior_pistol', 'none');
        const superiorMelee = select(ctx, 'superior_melee', 'close combat weapon');

        add(ctx, q, 'autopistol', nonSuperiorCount);
        add(ctx, q, 'autogun', Math.max(0, nonSuperiorCount - flamer));
        add(ctx, q, 'close combat weapon', nonSuperiorCount + (superiorMelee === 'close combat weapon' ? 1 : 0));
        add(ctx, q, 'ministorum flamer', flamer);
        add(ctx, q, 'bolt pistol', 1);
        add(ctx, q, 'boltgun', 1);
        if (superiorPistol === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        if (superiorMelee !== 'close combat weapon') add(ctx, q, superiorMelee, 1);
        if (select(ctx, 'banner', 'no') === 'yes') ctx.derived.push('Sacred Banner / Simulacrum Imperialis equipped.');
        return q;
      },
    },

    'Sororitas Rhino': {
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

    'Triumph Of Saint Katherine': {
      sections: [{
        title: 'Triumph Of Saint Katherine loadout',
        description: 'This model is equipped with: bolt pistols; relic weapons.',
        controls: [],
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'bolt pistols', 1);
        add(ctx, q, 'relic weapons', 1);
        return q;
      },
    },

    'Zephyrim Squad': {
      sections: [{
        title: 'Zephyrim Superior',
        description: 'Configure the Zephyrim Superior.',
        controls: [
          { type: 'select', key: 'superior_pistol', label: 'Superior pistol', value: 'bolt pistol', options: [
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' },
          ] },
          { type: 'select', key: 'banner', label: 'Sacred Banner', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ] },
        ],
      }],
      quantities: ctx => {
        const q = {};
        const superiorPistol = select(ctx, 'superior_pistol', 'bolt pistol');
        add(ctx, q, 'bolt pistol', (ctx.modelCount - 1) + (superiorPistol === 'bolt pistol' ? 1 : 0));
        add(ctx, q, 'power weapon', ctx.modelCount);
        if (superiorPistol === 'plasma pistol') addPlasmaPistol(ctx, q, 1);
        if (select(ctx, 'banner', 'no') === 'yes') ctx.derived.push('Sacred Banner equipped.');
        return q;
      },
    },
  };
})();
