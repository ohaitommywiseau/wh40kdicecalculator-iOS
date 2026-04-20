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

  registry['adeptus-mechanicus'] = {
    'Archaeopter Fusilave': fixed('This model is equipped with: cognis heavy stubber array; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'cognis heavy stubber array', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Archaeopter Stratoraptor': fixed('This model is equipped with: 2 cognis heavy stubbers; 2 heavy phosphor blasters; twin cognis lascannon; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'cognis heavy stubber', 2);
      add(ctx, q, 'heavy phosphor blaster', 2);
      add(ctx, q, 'twin cognis lascannon', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Archaeopter Transvector': fixed('This model is equipped with: cognis heavy stubber array; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'cognis heavy stubber array', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Belisarius Cawl': fixed('This model is equipped with: solar atomiser; arc scourge; Cawl\'s Omnissian axe; mechadendrite hive.', ctx => {
      const q = {};
      add(ctx, q, 'solar atomiser', 1);
      add(ctx, q, 'arc scourge', 1);
      add(ctx, q, 'cawl\'s omnissian axe', 1);
      add(ctx, q, 'mechadendrite hive', 1);
      return q;
    }),

    'Corpuscarii Electro-priests': fixed('Every model is equipped with: electrostatic gauntlets.', ctx => {
      const q = {};
      add(ctx, q, 'electrostatic gauntlets (1)', ctx.modelCount);
      return q;
    }),

    'Cybernetica Datasmith': fixed('This model is equipped with: Mechanicus pistol; power fist.', ctx => {
      const q = {};
      add(ctx, q, 'mechanicus pistol', 1);
      add(ctx, q, 'power fist', 1);
      return q;
    }),

    'Fulgurite Electro-priests': fixed('Every model is equipped with: electroleech stave.', ctx => {
      const q = {};
      add(ctx, q, 'electroleech stave', ctx.modelCount);
      return q;
    }),

    'Ironstrider Ballistarii': {
      sections: [{
        title: 'Ballistarii main weapon',
        description: 'Each Ironstrider Ballistarius selects one twin cognis main weapon.',
        controls: [
          { key: 'autocannon', label: 'Twin cognis autocannon', max: models => Number(models || 0) },
          { key: 'lascannon', label: 'Twin cognis lascannon', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const autocannon = number(ctx, 'autocannon');
        const lascannon = number(ctx, 'lascannon');
        const total = autocannon + lascannon;
        if (total !== ctx.modelCount) ctx.errors.push(`Ironstrider main weapons must total ${ctx.modelCount}; currently ${total}.`);
        add(ctx, q, 'twin cognis autocannon', autocannon);
        add(ctx, q, 'twin cognis lascannon', lascannon);
        add(ctx, q, 'ironstrider feet', ctx.modelCount);
        return q;
      }
    },

    'Kastelan Robots': {
      sections: [{
        title: 'Kastelan melee arms',
        description: 'Each model chooses one melee arm set.',
        controls: [
          { key: 'twin_fist', label: 'Twin Kastelan fist', max: models => Number(models || 0) },
          { key: 'single_fist', label: 'Kastelan fist + ranged arm', max: models => Number(models || 0) },
          { key: 'phosphor_arm', label: 'Twin Kastelan phosphor blaster', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Kastelan shoulder weapon',
        description: 'Each Kastelan Robot selects one shoulder weapon.',
        controls: [
          { key: 'combustor', label: 'Incendine combustor', max: models => Number(models || 0) },
          { key: 'heavy_phosphor', label: 'Heavy phosphor blaster', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const twinFist = number(ctx, 'twin_fist');
        const singleFist = number(ctx, 'single_fist');
        const phosphorArm = number(ctx, 'phosphor_arm');
        const combustor = number(ctx, 'combustor');
        const heavyPhosphor = number(ctx, 'heavy_phosphor');
        if (twinFist + singleFist + phosphorArm !== ctx.modelCount) ctx.errors.push(`Kastelan arm selections must total ${ctx.modelCount}.`);
        if (combustor + heavyPhosphor !== ctx.modelCount) ctx.errors.push(`Kastelan shoulder weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'twin kastelan fist', twinFist);
        add(ctx, q, 'kastelan fist', singleFist);
        add(ctx, q, 'twin kastelan phosphor blaster', phosphorArm);
        add(ctx, q, 'kastelan phosphor blaster', singleFist);
        add(ctx, q, 'incendine combustor', combustor);
        add(ctx, q, 'heavy phosphor blaster', heavyPhosphor);
        return q;
      }
    },

    'Kataphron Breachers': {
      sections: [{
        title: 'Primary ranged weapon',
        description: 'Each Kataphron Breacher selects one primary ranged weapon.',
        controls: [
          { key: 'arc_rifle', label: 'Heavy arc rifle', max: models => Number(models || 0) },
          { key: 'torsion_cannon', label: 'Torsion cannon', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Melee arm',
        description: 'Each Kataphron Breacher selects one melee arm.',
        controls: [
          { key: 'arc_claw', label: 'Arc claw', max: models => Number(models || 0) },
          { key: 'hydraulic_claw', label: 'Hydraulic claw', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const arcRifle = number(ctx, 'arc_rifle');
        const torsion = number(ctx, 'torsion_cannon');
        const arcClaw = number(ctx, 'arc_claw');
        const hydraulic = number(ctx, 'hydraulic_claw');
        if (arcRifle + torsion !== ctx.modelCount) ctx.errors.push(`Kataphron ranged selections must total ${ctx.modelCount}.`);
        if (arcClaw + hydraulic !== ctx.modelCount) ctx.errors.push(`Kataphron melee selections must total ${ctx.modelCount}.`);
        add(ctx, q, 'heavy arc rifle', arcRifle);
        add(ctx, q, 'torsion cannon', torsion);
        add(ctx, q, 'arc claw', arcClaw);
        add(ctx, q, 'hydraulic claw', hydraulic);
        return q;
      }
    },

    'Kataphron Destroyers': {
      sections: [{
        title: 'Primary ranged weapon',
        description: 'Each Kataphron Destroyer selects one primary ranged weapon.',
        controls: [
          { key: 'grav', label: 'Heavy grav-cannon', max: models => Number(models || 0) },
          { key: 'plasma', label: 'Kataphron plasma culverin', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Secondary ranged weapon',
        description: 'Each Kataphron Destroyer selects one secondary ranged weapon.',
        controls: [
          { key: 'phosphor', label: 'Phosphor blaster', max: models => Number(models || 0) },
          { key: 'flamer', label: 'Cognis flamer', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const grav = number(ctx, 'grav');
        const plasma = number(ctx, 'plasma');
        const phosphor = number(ctx, 'phosphor');
        const flamer = number(ctx, 'flamer');
        if (grav + plasma !== ctx.modelCount) ctx.errors.push(`Kataphron primary weapons must total ${ctx.modelCount}.`);
        if (phosphor + flamer !== ctx.modelCount) ctx.errors.push(`Kataphron secondary weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'heavy grav-cannon', grav);
        add(ctx, q, 'kataphron plasma culverin – standard', plasma);
        add(ctx, q, 'kataphron plasma culverin – supercharge', plasma);
        add(ctx, q, 'phosphor blaster', phosphor);
        add(ctx, q, 'cognis flamer', flamer);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Onager Dunecrawler': {
      sections: [{
        title: 'Main weapon',
        description: 'Select the Onager main weapon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'eradication_beamer', options: [
            { value: 'eradication_beamer', label: 'Eradication beamer' },
            { value: 'icarus_array', label: 'Icarus array' },
            { value: 'neutron_laser', label: 'Neutron laser' },
            { value: 'twin_phosphor', label: 'Twin Onager heavy phosphor blaster' }
          ] }
        ]
      }, {
        title: 'Optional carapace weapons',
        description: 'Toggle the optional cognis heavy stubber and Daedalus missile launcher if equipped.',
        controls: [
          { type: 'select', key: 'stubber', label: 'Cognis heavy stubber', value: 'no', options: [{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }] },
          { type: 'select', key: 'missile', label: 'Daedalus missile launcher', value: 'no', options: [{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const main = select(ctx, 'main_gun', 'eradication_beamer');
        if (main === 'eradication_beamer') {
          add(ctx, q, 'eradication beamer – dissipated', 1);
          add(ctx, q, 'eradication beamer – focused', 1);
        } else if (main === 'icarus_array') add(ctx, q, 'icarus array', 1);
        else if (main === 'neutron_laser') add(ctx, q, 'neutron laser', 1);
        else add(ctx, q, 'twin onager heavy phosphor blaster', 1);
        if (select(ctx, 'stubber', 'no') === 'yes') add(ctx, q, 'cognis heavy stubber', 1);
        if (select(ctx, 'missile', 'no') === 'yes') add(ctx, q, 'daedalus missile launcher', 1);
        add(ctx, q, 'dunecrawler legs', 1);
        return q;
      }
    },

    'Pteraxii Skystalkers': fixed('The Alpha is equipped with: flechette blaster; taser goad. Every other model is equipped with: flechette carbine; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'flechette blaster', 1);
      add(ctx, q, 'taser goad', 1);
      add(ctx, q, 'flechette carbine', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'close combat weapon', Math.max(0, ctx.modelCount - 1));
      return q;
    }),

    'Pteraxii Sterylizors': fixed('The Alpha is equipped with: flechette blaster; taser goad. Every other model is equipped with: phosphor torch; Pteraxii talons.', ctx => {
      const q = {};
      add(ctx, q, 'flechette blaster', 1);
      add(ctx, q, 'taser goad', 1);
      add(ctx, q, 'phosphor torch', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'pteraxii talons', Math.max(0, ctx.modelCount - 1));
      return q;
    }),

    'Serberys Raiders': fixed('The Alpha is equipped with: Mechanicus pistol; galvanic carbine; cavalry sabre and clawed limbs. Every other model is equipped with: galvanic carbine; cavalry sabre and clawed limbs.', ctx => {
      const q = {};
      add(ctx, q, 'mechanicus pistol', 1);
      add(ctx, q, 'galvanic carbine', ctx.modelCount);
      add(ctx, q, 'cavalry sabre and clawed limbs', ctx.modelCount);
      return q;
    }),

    'Serberys Sulphurhounds': fixed('The Alpha is equipped with: Mechanicus pistol; phosphor blast carbine; cavalry arc maul; clawed limbs. Every other model is equipped with: phosphor pistol; sulphur breath; clawed limbs.', ctx => {
      const q = {};
      add(ctx, q, 'mechanicus pistol', 1);
      add(ctx, q, 'phosphor blast carbine', 1);
      add(ctx, q, 'cavalry arc maul', 1);
      add(ctx, q, 'phosphor pistol', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'sulphur breath', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'clawed limbs', ctx.modelCount);
      return q;
    }),

    'Servitor Battleclade': {
      sections: [{
        title: 'Combat Servitor specials',
        description: 'Replace phosphor blasters on Combat Servitors as needed.',
        controls: [
          { key: 'meltagun', label: 'Meltagun', max: 1 },
          { key: 'incendine', label: 'Incendine igniter', max: 3 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const meltagun = number(ctx, 'meltagun');
        const incendine = number(ctx, 'incendine');
        const replaced = meltagun + incendine;
        if (replaced > 6) ctx.errors.push('Servitor Battleclade cannot replace more than 6 Combat Servitor phosphor blasters.');
        add(ctx, q, 'mechanicus pistol', 1);
        add(ctx, q, 'dataspikes', 1);
        add(ctx, q, 'heavy arc rifle', 1);
        add(ctx, q, 'heavy bolter', 1);
        add(ctx, q, 'servo-claw', 8);
        add(ctx, q, 'phosphor blaster', Math.max(0, 6 - replaced));
        add(ctx, q, 'meltagun', meltagun);
        add(ctx, q, 'incendine igniter', incendine);
        return q;
      }
    },

    'Sicarian Infiltrators': {
      sections: [{
        title: 'Sicarian loadouts',
        description: 'Each model chooses either the stubcarbine/power weapon loadout or the flechette blaster/taser goad loadout.',
        controls: [
          { key: 'stub_power', label: 'Stubcarbine + power weapon', max: models => Number(models || 0) },
          { key: 'flechette_taser', label: 'Flechette blaster + taser goad', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const stubPower = number(ctx, 'stub_power');
        const flechette = number(ctx, 'flechette_taser');
        if (stubPower + flechette !== ctx.modelCount) ctx.errors.push(`Sicarian loadouts must total ${ctx.modelCount}.`);
        add(ctx, q, 'stubcarbine', stubPower);
        add(ctx, q, 'power weapon', stubPower);
        add(ctx, q, 'flechette blaster', flechette);
        add(ctx, q, 'taser goad', flechette);
        return q;
      }
    },

    'Sicarian Ruststalkers': {
      sections: [{
        title: 'Ruststalker weapon sets',
        description: 'Choose the number of Princeps-style blade/chordclaw loadouts and razor/chordclaw loadouts. Remaining models keep transonic blades.',
        controls: [
          { key: 'blade_chord', label: 'Transonic blades and chordclaw', max: 1 },
          { key: 'razor_chord', label: 'Transonic razor and chordclaw', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bladeChord = number(ctx, 'blade_chord');
        const razorChord = number(ctx, 'razor_chord');
        const plainBlades = ctx.modelCount - bladeChord - razorChord;
        if (plainBlades < 0) ctx.errors.push(`Ruststalker loadouts exceed ${ctx.modelCount} models.`);
        add(ctx, q, 'transonic blades', Math.max(0, plainBlades));
        add(ctx, q, 'transonic blades and chordclaw', bladeChord);
        add(ctx, q, 'transonic razor and chordclaw', razorChord);
        return q;
      }
    },

    'Skitarii Marshal': fixed('This model is equipped with: Mechanicus pistol; control stave.', ctx => {
      const q = {};
      add(ctx, q, 'mechanicus pistol', 1);
      add(ctx, q, 'control stave', 1);
      return q;
    }),

    'Skitarii Rangers': {
      sections: [{
        title: 'Special weapons',
        description: 'Select up to one of each special weapon. Remaining Rangers keep galvanic rifles.',
        controls: [
          { key: 'arc', label: 'Arc rifle', max: 1 },
          { key: 'plasma', label: 'Plasma caliver', max: 1 },
          { key: 'arquebus', label: 'Transuranic arquebus', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const arc = number(ctx, 'arc');
        const plasma = number(ctx, 'plasma');
        const arquebus = number(ctx, 'arquebus');
        const specials = arc + plasma + arquebus;
        if (specials > 3) ctx.errors.push('Skitarii Rangers can take at most three special weapons total.');
        add(ctx, q, 'mechanicus pistol', 1);
        add(ctx, q, 'alpha combat weapon', 1);
        add(ctx, q, 'arc rifle', arc);
        add(ctx, q, 'plasma caliver – standard', plasma);
        add(ctx, q, 'plasma caliver – supercharge', plasma);
        add(ctx, q, 'transuranic arquebus', arquebus);
        add(ctx, q, 'galvanic rifle', Math.max(0, 9 - specials));
        add(ctx, q, 'close combat weapon', 9);
        ctx.derived.push('Omnispex and data-tether upgrades are not tracked as weapons here.');
        return q;
      }
    },

    'Skitarii Vanguard': {
      sections: [{
        title: 'Special weapons',
        description: 'Select up to one of each special weapon. Remaining Vanguard keep radium carbines.',
        controls: [
          { key: 'arc', label: 'Arc rifle', max: 1 },
          { key: 'plasma', label: 'Plasma caliver', max: 1 },
          { key: 'arquebus', label: 'Transuranic arquebus', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const arc = number(ctx, 'arc');
        const plasma = number(ctx, 'plasma');
        const arquebus = number(ctx, 'arquebus');
        const specials = arc + plasma + arquebus;
        if (specials > 3) ctx.errors.push('Skitarii Vanguard can take at most three special weapons total.');
        add(ctx, q, 'mechanicus pistol', 1);
        add(ctx, q, 'alpha combat weapon', 1);
        add(ctx, q, 'arc rifle', arc);
        add(ctx, q, 'plasma caliver – standard', plasma);
        add(ctx, q, 'plasma caliver – supercharge', plasma);
        add(ctx, q, 'transuranic arquebus', arquebus);
        add(ctx, q, 'radium carbine', Math.max(0, 9 - specials));
        add(ctx, q, 'close combat weapon', 9);
        ctx.derived.push('Omnispex and data-tether upgrades are not tracked as weapons here.');
        return q;
      }
    },

    'Skorpius Disintegrator': {
      sections: [{
        title: 'Main gun',
        description: 'Select the Skorpius turret weapon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'belleros', options: [
            { value: 'belleros', label: 'Belleros energy cannon' },
            { value: 'ferrumite', label: 'Ferrumite cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'belleros') === 'belleros' ? 'belleros energy cannon' : 'ferrumite cannon', 1);
        add(ctx, q, 'cognis heavy stubber', 3);
        add(ctx, q, 'disruptor missile launcher', 1);
        add(ctx, q, 'armoured hull', 1);
        return q;
      }
    },

    'Skorpius Dunerider': fixed('This model is equipped with: cognis heavy stubber array; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'cognis heavy stubber array', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Sydonian Dragoons With Radium Jezzails': fixed('Every model is equipped with: phosphor serpenta; radium jezzail; Ironstrider feet.', ctx => {
      const q = {};
      add(ctx, q, 'phosphor serpenta', ctx.modelCount);
      add(ctx, q, 'radium jezzail', ctx.modelCount);
      add(ctx, q, 'ironstrider feet', ctx.modelCount);
      return q;
    }),

    'Sydonian Dragoons With Taser Lances': fixed('Every model is equipped with: phosphor serpenta; taser lance.', ctx => {
      const q = {};
      add(ctx, q, 'phosphor serpenta', ctx.modelCount);
      add(ctx, q, 'taser lance', ctx.modelCount);
      return q;
    }),

    'Sydonian Skatros': {
      sections: [{
        title: 'Sniper weapon',
        description: 'Select the Sydonian Skatros rifle.',
        controls: [
          { type: 'select', key: 'rifle', label: 'Rifle', value: 'radium jezzail', options: [
            { value: 'radium jezzail', label: 'Radium jezzail' },
            { value: 'skatros transuranic arquebus', label: 'Skatros transuranic arquebus' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'mechanicus pistol', 1);
        add(ctx, q, select(ctx, 'rifle', 'radium jezzail'), 1);
        add(ctx, q, 'sydonian feet', 1);
        return q;
      }
    },

    'Tech-priest Dominus': {
      sections: [{
        title: 'Secondary pistol',
        description: 'Select the Dominus sidearm.',
        controls: [
          { type: 'select', key: 'sidearm', label: 'Sidearm', value: 'macrostubber', options: [
            { value: 'macrostubber', label: 'Macrostubber' },
            { value: 'phosphor serpenta', label: 'Phosphor serpenta' }
          ] }
        ]
      }, {
        title: 'Primary ranged weapon',
        description: 'Select the Dominus main ranged weapon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'volkite blaster', options: [
            { value: 'volkite blaster', label: 'Volkite blaster' },
            { value: 'eradication ray', label: 'Eradication ray' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'sidearm', 'macrostubber'), 1);
        if (select(ctx, 'main_gun', 'volkite blaster') === 'volkite blaster') add(ctx, q, 'volkite blaster', 1);
        else {
          add(ctx, q, 'eradication ray – dissipated', 1);
          add(ctx, q, 'eradication ray – focused', 1);
        }
        add(ctx, q, 'omnissian axe', 1);
        return q;
      }
    },

    'Tech-priest Enginseer': fixed('This model is equipped with: Mechanicus pistol; Omnissian axe; servo-arm.', ctx => {
      const q = {};
      add(ctx, q, 'mechanicus pistol', 1);
      add(ctx, q, 'omnissian axe', 1);
      add(ctx, q, 'servo-arm', 1);
      return q;
    }),

    'Tech-priest Manipulus': {
      sections: [{
        title: 'Primary ranged weapon',
        description: 'Select the Manipulus main ranged weapon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'magnarail lance', options: [
            { value: 'magnarail lance', label: 'Magnarail lance' },
            { value: 'transonic cannon', label: 'Transonic cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'magnarail lance'), 1);
        add(ctx, q, 'omnissian staff', 1);
        return q;
      }
    },

    'Technoarcheologist': fixed('This model is equipped with: Mechanicus pistol; servo-arc claw.', ctx => {
      const q = {};
      add(ctx, q, 'mechanicus pistol', 1);
      add(ctx, q, 'servo-arc claw', 1);
      return q;
    })
  };
}());
