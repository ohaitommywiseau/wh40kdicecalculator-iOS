(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;
  const number = (ctx, key) => ctx.number(key);

  function fixed(description, quantitiesFn) {
    return {
      sections: [{ title: 'Unit loadout', description: description, controls: [] }],
      quantities: quantitiesFn
    };
  }

  registry['adeptus-custodes'] = {
    'Agamatus Custodians': {
      sections: [{
        title: 'Agamatus ranged weapons',
        description: 'Each Agamatus Custodian can select one ranged weapon.',
        controls: [
          { key: 'lastrum', label: '1 lastrum bolt cannon', max: models => Number(models || 0) },
          { key: 'adrathic', label: '1 adrathic devastator', max: models => Number(models || 0) },
          { key: 'las_pulsar', label: '1 twin las-pulsar', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const lastrum = number(ctx, 'lastrum');
        const adrathic = number(ctx, 'adrathic');
        const lasPulsar = number(ctx, 'las_pulsar');
        const total = lastrum + adrathic + lasPulsar;
        if (total !== ctx.modelCount) ctx.errors.push(`Agamatus ranged selections must total ${ctx.modelCount}; currently ${total}.`);
        add(ctx, q, 'lastrum bolt cannon', lastrum);
        add(ctx, q, 'adrathic devastator', adrathic);
        add(ctx, q, 'twin las-pulsar', lasPulsar);
        add(ctx, q, 'interceptor lance', ctx.modelCount);
        return q;
      }
    },

    'Aleya': fixed('This model is equipped with: Somnus.', ctx => {
      const q = {};
      add(ctx, q, 'somnus', 1);
      return q;
    }),

    'Allarus Custodians': {
      sections: [{
        title: 'Allarus weapons',
        description: 'Any number of models can replace their guardian spear with 1 castellan axe.',
        controls: [
          { key: 'castellan_axe', label: '1 castellan axe', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const axes = number(ctx, 'castellan_axe');
        if (axes > ctx.modelCount) ctx.errors.push(`Castellan axes must total ${ctx.modelCount} or fewer; currently ${axes}.`);
        add(ctx, q, 'balistus grenade launcher', ctx.modelCount);
        add(ctx, q, 'guardian spear (1)', Math.max(0, ctx.modelCount - axes));
        add(ctx, q, 'castellan axe (1)', axes);
        add(ctx, q, 'misericordia', ctx.modelCount);
        ctx.derived.push('Vexilla option should be resolved on the printed datasheet if needed.');
        return q;
      }
    },

    'Anathema Psykana Rhino': {
      sections: [{
        title: 'Optional wargear',
        description: 'This model can be equipped with 1 hunter-killer missile.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'storm bolter', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        return q;
      }
    },

    'Aquilon Custodians': {
      sections: [{
        title: 'Aquilon ranged weapons',
        description: 'Each Aquilon Custodian can select one ranged weapon.',
        controls: [
          { key: 'storm_bolter', label: '1 lastrum storm bolter', max: models => Number(models || 0) },
          { key: 'firepike', label: '1 infernus firepike', max: models => Number(models || 0) },
          { key: 'adrathic', label: '1 twin adrathic destructor', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Aquilon melee weapons',
        description: 'Any number of models can replace their solerite power gauntlet with 1 solerite power talon.',
        controls: [
          { key: 'talon', label: '1 solerite power talon', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bolters = number(ctx, 'storm_bolter');
        const firepikes = number(ctx, 'firepike');
        const adrathics = number(ctx, 'adrathic');
        const talons = number(ctx, 'talon');
        const rangedTotal = bolters + firepikes + adrathics;
        if (rangedTotal !== ctx.modelCount) ctx.errors.push(`Aquilon ranged selections must total ${ctx.modelCount}; currently ${rangedTotal}.`);
        if (talons > ctx.modelCount) ctx.errors.push(`Solerite power talons must total ${ctx.modelCount} or fewer; currently ${talons}.`);
        add(ctx, q, 'lastrum storm bolter', bolters);
        add(ctx, q, 'infernus firepike', firepikes);
        add(ctx, q, 'twin adrathic destructor', adrathics);
        add(ctx, q, 'solerite power gauntlet', Math.max(0, ctx.modelCount - talons));
        add(ctx, q, 'solerite power talon', talons);
        return q;
      }
    },

    'Ares Gunship': fixed('This model is equipped with: 2 arachnus heavy blaze cannons; arachnus magna-blaze cannon; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'arachnus heavy blaze cannon', 2);
      add(ctx, q, 'arachnus magna-blaze cannon', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Blade Champion': fixed('This model is equipped with: vaultswords.', ctx => {
      const q = {};
      add(ctx, q, 'vaultswords – behemor', 1);
      add(ctx, q, 'vaultswords – hurricanus', 1);
      add(ctx, q, 'vaultswords – victus', 1);
      return q;
    }),

    'Caladius Grav-tank': {
      sections: [{
        title: 'Main weapon',
        description: 'This model can replace its twin iliastus accelerator cannon with 1 twin arachnus heavy blaze cannon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'twin iliastus accelerator cannon', options: [
            { value: 'twin iliastus accelerator cannon', label: 'Twin iliastus accelerator cannon' },
            { value: 'twin arachnus heavy blaze cannon', label: 'Twin arachnus heavy blaze cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'twin iliastus accelerator cannon'), 1);
        add(ctx, q, 'twin lastrum bolt cannon', 1);
        add(ctx, q, 'armoured hull', 1);
        return q;
      }
    },

    'Contemptor-achillus Dreadnought': {
      sections: [{
        title: 'Auxiliary weapon',
        description: 'Select the Achillus auxiliary weapon package.',
        controls: [
          { type: 'select', key: 'aux_weapon', label: 'Auxiliary weapon', value: 'lastrum storm bolter', options: [
            { value: 'lastrum storm bolter', label: '2 lastrum storm bolters' },
            { value: 'twin adrathic destructor', label: 'Twin adrathic destructor' },
            { value: 'infernus incinerator', label: 'Infernus incinerator' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'achillus dreadspear (1)', 1);
        const aux = select(ctx, 'aux_weapon', 'lastrum storm bolter');
        if (aux === 'lastrum storm bolter') add(ctx, q, 'lastrum storm bolter', 2);
        else add(ctx, q, aux, 1);
        return q;
      }
    },

    'Contemptor-galatus Dreadnought': fixed('This model is equipped with: Galatus warblade.', ctx => {
      const q = {};
      add(ctx, q, 'galatus warblade (1)', 1);
      return q;
    }),

    'Coronus Grav-carrier': fixed('This model is equipped with: twin arachnus blaze cannon; twin lastrum bolt cannon; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'twin arachnus blaze cannon', 1);
      add(ctx, q, 'twin lastrum bolt cannon', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Custodian Guard': {
      sections: [{
        title: 'Custodian Guard weapons',
        description: 'Any number of models can replace their guardian spear with 1 sentinel blade and misericordia.',
        controls: [
          { key: 'sentinel_blade', label: '1 sentinel blade bearer', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const blades = number(ctx, 'sentinel_blade');
        if (blades > ctx.modelCount) ctx.errors.push(`Sentinel blade bearers must total ${ctx.modelCount} or fewer; currently ${blades}.`);
        add(ctx, q, 'guardian spear (1)', Math.max(0, ctx.modelCount - blades));
        add(ctx, q, 'sentinel blade (1)', blades);
        add(ctx, q, 'misericordia', blades);
        ctx.derived.push('Praesidium Shield and Vexilla options should be checked on the printed datasheet if used.');
        return q;
      }
    },

    'Custodian Guard With Adrasite And Pyrithite Spears': {
      sections: [{
        title: 'Special spear types',
        description: 'Any number of models can replace their adrasite spear with 1 pyrithite spear.',
        controls: [
          { key: 'pyrithite', label: '1 pyrithite spear', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const pyrithite = number(ctx, 'pyrithite');
        if (pyrithite > ctx.modelCount) ctx.errors.push(`Pyrithite spears must total ${ctx.modelCount} or fewer; currently ${pyrithite}.`);
        add(ctx, q, 'adrasite spear (1)', Math.max(0, ctx.modelCount - pyrithite));
        add(ctx, q, 'pyrithite spear (1)', pyrithite);
        return q;
      }
    },

    'Custodian Wardens': {
      sections: [{
        title: 'Warden weapons',
        description: 'Any number of models can replace their guardian spear with 1 castellan axe.',
        controls: [
          { key: 'castellan_axe', label: '1 castellan axe', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const axes = number(ctx, 'castellan_axe');
        if (axes > ctx.modelCount) ctx.errors.push(`Castellan axes must total ${ctx.modelCount} or fewer; currently ${axes}.`);
        add(ctx, q, 'guardian spear (1)', Math.max(0, ctx.modelCount - axes));
        add(ctx, q, 'castellan axe (1)', axes);
        ctx.derived.push('Vexilla option should be resolved on the printed datasheet if needed.');
        return q;
      }
    },

    'Knight-centura': {
      sections: [{
        title: 'Knight-centura weapons',
        description: 'Select the Knight-centura weapon set.',
        controls: [
          { type: 'select', key: 'loadout', label: 'Loadout', value: 'executioner greatblade', options: [
            { value: 'executioner greatblade', label: 'Executioner greatblade' },
            { value: 'master-crafted boltgun', label: 'Master-crafted boltgun + close combat weapon' },
            { value: 'witchseeker flamer', label: 'Witchseeker flamer + close combat weapon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'executioner greatblade');
        if (loadout === 'executioner greatblade') add(ctx, q, 'executioner greatblade', 1);
        else {
          add(ctx, q, loadout, 1);
          add(ctx, q, 'close combat weapon', 1);
        }
        return q;
      }
    },

    'Orion Assault Dropship': fixed('This model is equipped with: 2 arachnus heavy blaze cannons; 2 twin lastrum bolt cannons; 2 spiculus heavy bolt launchers; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'arachnus heavy blaze cannon', 2);
      add(ctx, q, 'twin lastrum bolt cannon', 2);
      add(ctx, q, 'spiculus heavy bolt launcher', 2);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Pallas Grav-attack': fixed('This model is equipped with: twin arachnus blaze cannon; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'twin arachnus blaze cannon', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Prosecutors': fixed('Every model is equipped with: boltgun; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'boltgun', ctx.modelCount);
      add(ctx, q, 'close combat weapon', ctx.modelCount);
      return q;
    }),

    'Sagittarum Custodians': fixed('Every model is equipped with: adrastus bolt caliver; misericordia.', ctx => {
      const q = {};
      add(ctx, q, 'adrastus bolt caliver', ctx.modelCount);
      add(ctx, q, 'misericordia', ctx.modelCount);
      return q;
    }),

    'Shield-captain': {
      sections: [{
        title: 'Shield-captain weapon',
        description: 'Select the Shield-captain weapon.',
        controls: [
          { type: 'select', key: 'weapon', label: 'Weapon', value: 'guardian spear (1)', options: [
            { value: 'guardian spear (1)', label: 'Guardian spear' },
            { value: 'castellan axe (1)', label: 'Castellan axe' },
            { value: 'pyrithite spear (1)', label: 'Pyrithite spear' },
            { value: 'sentinel blade (1)', label: 'Sentinel blade' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'weapon', 'guardian spear (1)'), 1);
        return q;
      }
    },

    'Shield-captain In Allarus Terminator Armour': {
      sections: [{
        title: 'Allarus captain weapon',
        description: 'This model can replace its guardian spear with 1 castellan axe.',
        controls: [
          { type: 'select', key: 'weapon', label: 'Weapon', value: 'guardian spear (1)', options: [
            { value: 'guardian spear (1)', label: 'Guardian spear' },
            { value: 'castellan axe (1)', label: 'Castellan axe' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'balistus grenade launcher', 1);
        add(ctx, q, select(ctx, 'weapon', 'guardian spear (1)'), 1);
        return q;
      }
    },

    'Shield-captain On Dawneagle Jetbike': {
      sections: [{
        title: 'Jetbike ranged weapon',
        description: 'This model can replace its salvo launcher with 1 Vertus hurricane bolter.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'salvo launcher', options: [
            { value: 'salvo launcher', label: 'Salvo launcher' },
            { value: 'vertus hurricane bolter', label: 'Vertus hurricane bolter' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'interceptor lance', 1);
        add(ctx, q, select(ctx, 'ranged', 'salvo launcher'), 1);
        return q;
      }
    },

    'Telemon Heavy Dreadnought': {
      sections: [{
        title: 'Telemon arm weapons',
        description: 'Select the left and right Telemon arm weapons.',
        controls: [
          { type: 'select', key: 'left_arm', label: 'Left arm', value: 'iliastus accelerator culverin', options: [
            { value: 'iliastus accelerator culverin', label: 'Iliastus accelerator culverin' },
            { value: 'arachnus storm cannon', label: 'Arachnus storm cannon' },
            { value: 'telemon caestus', label: 'Telemon caestus' },
            { value: 'twin plasma projector', label: 'Twin plasma projector' }
          ] },
          { type: 'select', key: 'right_arm', label: 'Right arm', value: 'iliastus accelerator culverin', options: [
            { value: 'iliastus accelerator culverin', label: 'Iliastus accelerator culverin' },
            { value: 'arachnus storm cannon', label: 'Arachnus storm cannon' },
            { value: 'telemon caestus', label: 'Telemon caestus' },
            { value: 'twin plasma projector', label: 'Twin plasma projector' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'left_arm', 'iliastus accelerator culverin'), 1);
        add(ctx, q, select(ctx, 'right_arm', 'iliastus accelerator culverin'), 1);
        add(ctx, q, 'spiculus bolt launcher', 1);
        add(ctx, q, 'armoured feet', 1);
        return q;
      }
    },

    'Trajann Valoris': fixed('This model is equipped with: Eagle\'s Scream; Watcher\'s Axe.', ctx => {
      const q = {};
      add(ctx, q, "eagle's scream", 1);
      add(ctx, q, 'watcher’s axe', 1);
      return q;
    }),

    'Valerian': fixed('This model is equipped with: Gnosis.', ctx => {
      const q = {};
      add(ctx, q, 'gnosis (1)', 1);
      return q;
    }),

    'Venatari Custodians': {
      sections: [{
        title: 'Venatari weapon sets',
        description: 'Each Venatari Custodian can select either a Venatari lance or a kinetic destroyer and Tarsis buckler.',
        controls: [
          { key: 'buckler_loadout', label: '1 kinetic destroyer and Tarsis buckler', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bucklers = number(ctx, 'buckler_loadout');
        if (bucklers > ctx.modelCount) ctx.errors.push(`Kinetic destroyer/Tarsis buckler loadouts must total ${ctx.modelCount} or fewer; currently ${bucklers}.`);
        add(ctx, q, 'venatari lance (1)', Math.max(0, ctx.modelCount - bucklers));
        add(ctx, q, 'kinetic destroyer', bucklers);
        add(ctx, q, 'tarsis buckler', bucklers);
        return q;
      }
    },

    'Venerable Contemptor Dreadnought': {
      sections: [{
        title: 'Ranged weapon',
        description: 'This model can replace its multi-melta with 1 Kheres-pattern assault cannon.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'multi-melta', options: [
            { value: 'multi-melta', label: 'Multi-melta' },
            { value: 'kheres-pattern assault cannon', label: 'Kheres-pattern assault cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'combi-bolter', 1);
        add(ctx, q, select(ctx, 'ranged', 'multi-melta'), 1);
        add(ctx, q, 'contemptor combat weapon', 1);
        return q;
      }
    },

    'Venerable Land Raider': {
      sections: [{
        title: 'Optional wargear',
        description: 'This model can be equipped with 1 hunter-killer missile and 1 storm bolter.',
        controls: [
          { type: 'select', key: 'hunter_killer', label: 'Hunter-killer missile', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ] },
          { type: 'select', key: 'storm_bolter', label: 'Storm bolter', value: 'no', options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'godhammer lascannon', 2);
        add(ctx, q, 'twin heavy bolter', 1);
        add(ctx, q, 'armoured tracks', 1);
        if (select(ctx, 'hunter_killer', 'no') === 'yes') add(ctx, q, 'hunter-killer missile', 1);
        if (select(ctx, 'storm_bolter', 'no') === 'yes') add(ctx, q, 'storm bolter', 1);
        return q;
      }
    },

    'Vertus Praetors': {
      sections: [{
        title: 'Jetbike ranged weapons',
        description: 'Any number of models can replace their salvo launcher with 1 Vertus hurricane bolter.',
        controls: [
          { key: 'hurricane_bolter', label: '1 Vertus hurricane bolter', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const hurricanes = number(ctx, 'hurricane_bolter');
        if (hurricanes > ctx.modelCount) ctx.errors.push(`Vertus hurricane bolters must total ${ctx.modelCount} or fewer; currently ${hurricanes}.`);
        add(ctx, q, 'interceptor lance', ctx.modelCount);
        add(ctx, q, 'salvo launcher', Math.max(0, ctx.modelCount - hurricanes));
        add(ctx, q, 'vertus hurricane bolter', hurricanes);
        return q;
      }
    },

    'Vigilators': fixed('Every model is equipped with: executioner greatblade.', ctx => {
      const q = {};
      add(ctx, q, 'executioner greatblade', ctx.modelCount);
      return q;
    }),

    'Witchseekers': fixed('Every model is equipped with: Witchseeker flamer; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'witchseeker flamer', ctx.modelCount);
      add(ctx, q, 'close combat weapon', ctx.modelCount);
      return q;
    })
  };
}());
