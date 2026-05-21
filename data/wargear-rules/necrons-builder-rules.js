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

  registry['necrons'] = {
    'Canoptek Doomstalker': fixed('This model is equipped with: doomsday blaster; twin gauss flayer; Doomstalker limbs.', ctx => {
      const q = {};
      add(ctx, q, 'Doomsday blaster', 1);
      add(ctx, q, 'Twin gauss flayer', 1);
      add(ctx, q, 'Doomstalker limbs', 1);
      return q;
    }),

    'Canoptek Reanimator': fixed('This model is equipped with: 2 atomiser beams; Reanimator’s claws.', ctx => {
      const q = {};
      add(ctx, q, 'Atomiser beam', 2);
      add(ctx, q, 'Reanimator’s claws', 1);
      return q;
    }),

    'Canoptek Scarab Swarms': fixed('Every model is equipped with: feeder mandibles.', ctx => {
      const q = {};
      add(ctx, q, 'Feeder mandibles', ctx.modelCount);
      return q;
    }),

    'Canoptek Wraiths': {
      sections: [{
        title: 'Wraith armament',
        description: 'Assign melee and ranged upgrades per model. Any number of models can swap vicious claws for whip coils, and any number can each take a particle caster or transdimensional beamer.',
        controls: [
          { key: 'whip_coils', label: 'Whip coils', max: models => Number(models || 0) },
          { key: 'particle_caster', label: 'Particle caster', max: models => Number(models || 0) },
          { key: 'transdimensional_beamer', label: 'Transdimensional beamer', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const whipCoils = number(ctx, 'whip_coils');
        const particleCaster = number(ctx, 'particle_caster');
        const transdimensionalBeamer = number(ctx, 'transdimensional_beamer');
        if (whipCoils > ctx.modelCount) ctx.errors.push(`Canoptek Wraith whip coil upgrades must total ${ctx.modelCount} or fewer.`);
        if (particleCaster + transdimensionalBeamer > ctx.modelCount) ctx.errors.push(`Canoptek Wraith ranged upgrades must total ${ctx.modelCount} or fewer.`);
        add(ctx, q, 'Vicious claws', ctx.modelCount - whipCoils);
        add(ctx, q, 'Whip coils', whipCoils);
        add(ctx, q, 'Particle caster', particleCaster);
        add(ctx, q, 'Transdimensional beamer', transdimensionalBeamer);
        return q;
      }
    },

    'Chronomancer': fixed('This model is equipped with: aeonstave.', ctx => {
      const q = {};
      add(ctx, q, 'Aeonstave (1)', 1);
      return q;
    }),

    'Deathmarks': fixed('Every model is equipped with: synaptic disintegrator; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Synaptic disintegrator', ctx.modelCount);
      add(ctx, q, 'Close combat weapon', ctx.modelCount);
      return q;
    }),

    'Doomsday Ark': fixed('This model is equipped with: doomsday cannon; 2 gauss flayer arrays; armoured bulk.', ctx => {
      const q = {};
      add(ctx, q, 'Doomsday cannon', 1);
      add(ctx, q, 'Gauss flayer array', 2);
      add(ctx, q, 'Armoured bulk', 1);
      return q;
    }),

    'Ghost Ark': fixed('This model is equipped with: 2 gauss flayer arrays; armoured bulk.', ctx => {
      const q = {};
      add(ctx, q, 'Gauss flayer array', 2);
      add(ctx, q, 'Armoured bulk', 1);
      return q;
    }),

    'Hexmark Destroyer': fixed('This model is equipped with: enmitic disintegrator pistols; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Enmitic disintegrator pistols', 1);
      add(ctx, q, 'Close combat weapon', 1);
      return q;
    }),

    'Immortals': {
      sections: [{
        title: 'Immortal armament',
        description: 'Select the unit\'s ranged weapon.',
        controls: [
          { type: 'select', key: 'gun', label: 'Ranged weapon', value: 'Gauss blaster', options: [
            { value: 'Gauss blaster', label: 'Gauss blaster' },
            { value: 'Tesla carbine', label: 'Tesla carbine' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'gun', 'Gauss blaster'), ctx.modelCount);
        add(ctx, q, 'Close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Lokhust Destroyers': fixed('Every model is equipped with: gauss cannon; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Gauss cannon', ctx.modelCount);
      add(ctx, q, 'Close combat weapon', ctx.modelCount);
      return q;
    }),

    'Lokhust Heavy Destroyers': {
      sections: [{
        title: 'Heavy destroyer armament',
        description: 'Any number of models can each replace their gauss destructor with an enmitic exterminator.',
        controls: [
          { key: 'gauss_destructor', label: 'Gauss destructor', max: models => Number(models || 0) },
          { key: 'enmitic_exterminator', label: 'Enmitic exterminator', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gaussDestructor = number(ctx, 'gauss_destructor');
        const enmiticExterminator = number(ctx, 'enmitic_exterminator');
        if (gaussDestructor + enmiticExterminator !== ctx.modelCount) ctx.errors.push(`Lokhust Heavy Destroyer weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'Gauss destructor', gaussDestructor);
        add(ctx, q, 'Enmitic exterminator', enmiticExterminator);
        add(ctx, q, 'Close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Lychguard': {
      sections: [{
        title: 'Lychguard weapons',
        description: 'Select whether the unit carries warscythes or swords and dispersion shields.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'Warscythe', options: [
            { value: 'Warscythe', label: 'Warscythe' },
            { value: 'Hyperphase sword', label: 'Hyperphase sword and dispersion shield' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const melee = select(ctx, 'melee', 'Warscythe');
        add(ctx, q, melee, ctx.modelCount);
        if (melee === 'Hyperphase sword') {
          add(ctx, q, 'Dispersion shield', ctx.modelCount);
        }
        return q;
      }
    },

    'Monolith': {
      sections: [{
        title: 'Monolith main weapon',
        description: 'Select the Monolith\'s primary weapon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main weapon', value: 'Particle whip', options: [
            { value: 'Particle whip', label: 'Particle whip' },
            { value: 'Death ray', label: 'Death ray' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'Gauss flux arc', 4);
        add(ctx, q, select(ctx, 'main_gun', 'Particle whip'), 1);
        add(ctx, q, 'Portal of exile', 1);
        return q;
      }
    },

    'Necron Warriors': {
      sections: [{
        title: 'Warrior armament',
        description: 'Any number of models can each replace their gauss flayer with a gauss reaper.',
        controls: [
          { key: 'gauss_flayer', label: 'Gauss flayer', max: models => Number(models || 0) },
          { key: 'gauss_reaper', label: 'Gauss reaper', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gaussFlayer = number(ctx, 'gauss_flayer');
        const gaussReaper = number(ctx, 'gauss_reaper');
        if (gaussFlayer + gaussReaper !== ctx.modelCount) ctx.errors.push(`Necron Warrior gauss weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'Gauss flayer', gaussFlayer);
        add(ctx, q, 'Gauss reaper', gaussReaper);
        add(ctx, q, 'Close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Overlord': {
      sections: [{
        title: 'Overlord wargear',
        description: 'Select the Overlord\'s ranged and melee weapons.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'Tachyon arrow', options: [
            { value: 'Tachyon arrow', label: 'Tachyon arrow' },
            { value: 'Staff of light (1)', label: 'Staff of light' }
          ] },
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'Overlord’s blade', options: [
            { value: 'Overlord’s blade', label: 'Overlord’s blade' },
            { value: 'Voidscythe', label: 'Voidscythe' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged', 'Tachyon arrow'), 1);
        add(ctx, q, select(ctx, 'melee', 'Overlord’s blade'), 1);
        return q;
      }
    },

    'Overlord with translocation shroud': fixed('This model is equipped with: Overlord\'s blade; resurrection orb.', ctx => {
      const q = {};
      add(ctx, q, "Overlord's blade", 1);
      return q;
    }),

    'Plasmancer': fixed('This model is equipped with: plasmic lance.', ctx => {
      const q = {};
      add(ctx, q, 'Plasmic lance (1)', 1);
      return q;
    }),

    'Royal Warden': fixed('This model is equipped with: relic gauss blaster; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Relic gauss blaster', 1);
      add(ctx, q, 'Close combat weapon', 1);
      return q;
    }),

    'Skorpekh Destroyers': fixed('Every model is equipped with: Skorpekh hyperphase weapons.', ctx => {
      const q = {};
      add(ctx, q, 'Skorpekh hyperphase weapons', ctx.modelCount);
      return q;
    }),

    'Skorpekh Lord': fixed('This model is equipped with: enmitic annihilator; flensing claw; hyperphase harvester.', ctx => {
      const q = {};
      add(ctx, q, 'Enmitic annihilator', 1);
      add(ctx, q, 'Flensing claw', 1);
      add(ctx, q, 'Hyperphase harvester', 1);
      return q;
    }),

    'Technomancer': fixed('This model is equipped with: staff of light.', ctx => {
      const q = {};
      add(ctx, q, 'Staff of light (1)', 1);
      return q;
    }),

    'Annihilation Barge': {
      sections: [{
        title: 'Annihilation Barge wargear',
        description: 'Select the barge gun mounted alongside the twin tesla destructor.',
        controls: [
          { type: 'select', key: 'gun', label: 'Barge gun', value: 'Gauss cannon', options: [
            { value: 'Gauss cannon', label: 'Gauss cannon' },
            { value: 'Tesla cannon', label: 'Tesla cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'gun', 'Gauss cannon'), 1);
        add(ctx, q, 'Twin tesla destructor', 1);
        add(ctx, q, 'Armoured bulk', 1);
        return q;
      }
    },

    'Canoptek Macrocytes': {
      sections: [{
        title: 'Macrocyte armament',
        description: 'All models can each swap gauss scalpels for tesla casters. One model can instead take an atomiser beam with nanoscarab projector, and one model can instead take an accelerator mandible.',
        controls: [
          { key: 'gauss_scalpel', label: 'Gauss scalpel', max: models => Number(models || 0) },
          { key: 'tesla_caster', label: 'Tesla caster', max: models => Number(models || 0) },
          { key: 'atomiser_beam', label: 'Atomiser beam + nanoscarab projector', max: 1 },
          { key: 'accelerator_mandible', label: 'Accelerator mandible', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gaussScalpel = number(ctx, 'gauss_scalpel');
        const teslaCaster = number(ctx, 'tesla_caster');
        const atomiserBeam = number(ctx, 'atomiser_beam');
        const acceleratorMandible = number(ctx, 'accelerator_mandible');
        if (gaussScalpel + teslaCaster + atomiserBeam + acceleratorMandible !== ctx.modelCount) ctx.errors.push(`Canoptek Macrocyte ranged assignments must total ${ctx.modelCount}.`);
        add(ctx, q, 'Gauss scalpel', gaussScalpel);
        add(ctx, q, 'Tesla caster', teslaCaster);
        add(ctx, q, 'Atomiser beam', atomiserBeam);
        add(ctx, q, 'Nanoscarab projector', atomiserBeam);
        add(ctx, q, 'Accelerator mandible', acceleratorMandible);
        add(ctx, q, 'Claws', ctx.modelCount);
        return q;
      }
    },

    'Canoptek Spyders': {
      sections: [{
        title: 'Spyder wargear',
        description: 'Any number of models can each take two particle beamers, a fabricator claw array, and/or a gloom prism.',
        controls: [
          { key: 'particle_beamers', label: 'Models with 2 particle beamers', max: models => Number(models || 0) },
          { key: 'fabricator_claw_array', label: 'Models with fabricator claw array', max: models => Number(models || 0) },
          { key: 'gloom_prism', label: 'Models with gloom prism', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const particleBeamers = number(ctx, 'particle_beamers');
        const fabricatorClawArray = number(ctx, 'fabricator_claw_array');
        const gloomPrism = number(ctx, 'gloom_prism');
        add(ctx, q, 'Automaton claws', ctx.modelCount);
        add(ctx, q, 'Particle beamer', particleBeamers * 2);
        add(ctx, q, 'Fabricator claw array', fabricatorClawArray);
        add(ctx, q, 'Gloom prism', gloomPrism);
        return q;
      }
    },

    'Canoptek Tomb Crawlers': {
      sections: [{
        title: 'Tomb Crawler armament',
        description: 'One model can replace its twin gauss reaper with a transdimensional isolator.',
        controls: [
          { key: 'transdimensional_isolator', label: 'Transdimensional isolator', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const transdimensionalIsolator = number(ctx, 'transdimensional_isolator');
        add(ctx, q, 'Twin gauss reaper', ctx.modelCount - transdimensionalIsolator);
        add(ctx, q, 'Transdimensional isolator', transdimensionalIsolator);
        add(ctx, q, 'Claws', ctx.modelCount);
        return q;
      }
    },

    'Catacomb Command Barge': {
      sections: [{
        title: 'Command barge wargear',
        description: 'Select the barge gun and the rider weapon.',
        controls: [
          { type: 'select', key: 'gun', label: 'Barge gun', value: 'Gauss cannon', options: [
            { value: 'Gauss cannon', label: 'Gauss cannon' },
            { value: 'Tesla cannon', label: 'Tesla cannon' }
          ] },
          { type: 'select', key: 'rider', label: 'Rider weapon', value: 'Staff of light (1)', options: [
            { value: 'Staff of light (1)', label: 'Staff of light' },
            { value: 'Overlord’s blade', label: 'Overlord’s blade' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'gun', 'Gauss cannon'), 1);
        add(ctx, q, select(ctx, 'rider', 'Staff of light (1)'), 1);
        return q;
      }
    },

    'Convergence Of Dominion': fixed('Every model is equipped with: transdimensional abductor.', ctx => {
      const q = {};
      add(ctx, q, 'Transdimensional abductor', 3);
      return q;
    }),

    'Cryptothralls': fixed('Every model is equipped with: scouring eye; scythed limbs.', ctx => {
      const q = {};
      add(ctx, q, 'Scouring eye', ctx.modelCount);
      add(ctx, q, 'Scythed limbs', ctx.modelCount);
      return q;
    }),

    'C’tan Shard of the Deceiver': fixed('This model is equipped with: cosmic insanity; golden fists.', ctx => {
      const q = {};
      add(ctx, q, 'Cosmic insanity', 1);
      add(ctx, q, 'Golden fists', 1);
      return q;
    }),

    'C’tan Shard of the Nightbringer': fixed('This model is equipped with: gaze of death; scythe of the Nightbringer.', ctx => {
      const q = {};
      add(ctx, q, 'Gaze of death', 1);
      add(ctx, q, 'Scythe of the Nightbringer – strike', 1);
      add(ctx, q, 'Scythe of the Nightbringer – sweep', 1);
      return q;
    }),

    'C’tan Shard of the Void Dragon': fixed('This model is equipped with: spear of the Void Dragon; voltaic storm; canoptek tail blades.', ctx => {
      const q = {};
      add(ctx, q, 'Canoptek tail blades', 1);
      add(ctx, q, 'Spear of the Void Dragon', 1);
      add(ctx, q, 'Spear of the Void Dragon – strike', 1);
      add(ctx, q, 'Spear of the Void Dragon – sweep', 1);
      add(ctx, q, 'Voltaic storm', 1);
      return q;
    }),

    'Doom Scythe': fixed('This model is equipped with: heavy death ray; twin tesla destructor; armoured bulk.', ctx => {
      const q = {};
      add(ctx, q, 'Heavy death ray', 1);
      add(ctx, q, 'Twin tesla destructor', 1);
      add(ctx, q, 'Armoured bulk', 1);
      return q;
    }),

    'Flayed Ones': fixed('Every model is equipped with: flayer claws.', ctx => {
      const q = {};
      add(ctx, q, 'Flayer claws', ctx.modelCount);
      return q;
    }),

    'Geomancer': fixed('This model is equipped with: tremorglaive.', ctx => {
      const q = {};
      add(ctx, q, 'Tremorglaive', 1);
      add(ctx, q, 'Tremorglaive – reverberating beam', 1);
      add(ctx, q, 'Tremorglaive – shock wave pulse', 1);
      return q;
    }),

    'Illuminor Szeras': fixed('This model is equipped with: eldritch lance; impaling legs.', ctx => {
      const q = {};
      add(ctx, q, 'Eldritch lance (1)', 1);
      add(ctx, q, 'Impaling legs', 1);
      return q;
    }),

    'Imotekh The Stormlord': fixed('This model is equipped with: Gauntlet of Fire; Staff of the Destroyer.', ctx => {
      const q = {};
      add(ctx, q, 'Gauntlet of Fire', 1);
      add(ctx, q, 'Staff of the Destroyer (1)', 1);
      return q;
    }),

    'Lokhust Lord': {
      sections: [{
        title: 'Lokhust Lord wargear',
        description: 'Select the Lokhust Lord\'s weapon.',
        controls: [
          { type: 'select', key: 'weapon', label: 'Weapon', value: 'Staff of light (1)', options: [
            { value: 'Staff of light (1)', label: 'Staff of light' },
            { value: 'Lord’s blade', label: 'Lord’s blade' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'weapon', 'Staff of light (1)'), 1);
        return q;
      }
    },

    'Nekrosor Ammentar': fixed('This model is equipped with: enmitic disintegrators; Unmaker Gauntlet; blade tail and whip coils; nullstone field generator.', ctx => {
      const q = {};
      add(ctx, q, 'Enmitic disintegrators', 1);
      add(ctx, q, 'Unmaker Gauntlet', 1);
      add(ctx, q, 'Blade tail and whip coils', 1);
      return q;
    }),

    'Night Scythe': fixed('This model is equipped with: twin tesla destructor; armoured bulk.', ctx => {
      const q = {};
      add(ctx, q, 'Twin tesla destructor', 1);
      add(ctx, q, 'Armoured bulk', 1);
      return q;
    }),

    'Obelisk': fixed('This model is equipped with: 4 tesla spheres; armoured bulk.', ctx => {
      const q = {};
      add(ctx, q, 'Tesla sphere', 4);
      add(ctx, q, 'Armoured bulk', 1);
      return q;
    }),

    'Ophydian Destroyers': fixed('Every model is equipped with: Ophydian hyperphase weapons.', ctx => {
      const q = {};
      add(ctx, q, 'Ophydian hyperphase weapons', ctx.modelCount);
      return q;
    }),

    'Orikan The Diviner': fixed('This model is equipped with: Staff of Tomorrow.', ctx => {
      const q = {};
      add(ctx, q, 'Staff of Tomorrow', 1);
      return q;
    }),

    'Psychomancer': fixed('This model is equipped with: abyssal lance.', ctx => {
      const q = {};
      add(ctx, q, 'Abyssal lance (1)', 1);
      return q;
    }),

    'Seraptek Heavy Construct': {
      sections: [{
        title: 'Heavy construct armament',
        description: 'Select the paired arm weapon mounted on the construct.',
        controls: [
          { type: 'select', key: 'gun', label: 'Arm weapon', value: 'Singularity generator', options: [
            { value: 'Singularity generator', label: 'Singularity generator' },
            { value: 'Synaptic obliterator', label: 'Synaptic obliterator' },
            { value: 'Transdimensional projector', label: 'Transdimensional projector' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'gun', 'Singularity generator'), 2);
        add(ctx, q, 'Titanic forelimbs – strike', 1);
        add(ctx, q, 'Titanic forelimbs – sweep', 1);
        return q;
      }
    },

    'Tesseract Vault': fixed('This model is equipped with: 4 tesla spheres; armoured bulk.', ctx => {
      const q = {};
      add(ctx, q, 'Tesla spheres', 4);
      add(ctx, q, 'Armoured bulk', 1);
      add(ctx, q, 'Antimatter Meteor', 1);
      add(ctx, q, 'Cosmic Fire', 1);
      add(ctx, q, 'Time’s Arrow', 1);
      return q;
    }),

    'The Silent King': fixed('Szarekh is equipped with: Sceptre of Eternal Glory; Staff of Stars; Weapons of the Final Triarch. Every Triarchal Menhir is equipped with: annihilator beam; armoured bulk.', ctx => {
      const q = {};
      add(ctx, q, 'Sceptre of Eternal Glory', 1);
      add(ctx, q, 'Staff of Stars', 1);
      add(ctx, q, 'Weapons of the Final Triarch', 1);
      add(ctx, q, 'Annihilator beam', 2);
      add(ctx, q, 'Armoured bulk', 2);
      return q;
    }),

    'Transcendent C’tan': fixed('This model is equipped with: seismic assault; crackling tendrils.', ctx => {
      const q = {};
      add(ctx, q, 'Seismic assault', 1);
      add(ctx, q, 'Crackling tendrils', 1);
      return q;
    }),

    'Trazyn The Infinite': fixed('This model is equipped with: Empathic Obliterator.', ctx => {
      const q = {};
      add(ctx, q, 'Empathic Obliterator', 1);
      return q;
    }),

    'Triarch Praetorians': {
      sections: [{
        title: 'Praetorian wargear',
        description: 'Select whether the unit carries rods of covenant or particle casters and voidblades.',
        controls: [
          { type: 'select', key: 'loadout', label: 'Loadout', value: 'Rod of covenant (1)', options: [
            { value: 'Rod of covenant (1)', label: 'Rod of covenant' },
            { value: 'Particle caster', label: 'Particle caster and voidblade' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'Rod of covenant (1)');
        if (loadout === 'Rod of covenant (1)') {
          add(ctx, q, 'Rod of covenant (1)', ctx.modelCount);
        } else {
          add(ctx, q, 'Particle caster', ctx.modelCount);
          add(ctx, q, 'Voidblade', ctx.modelCount);
        }
        return q;
      }
    },

    'Tomb Blades': {
      sections: [{
        title: 'Tomb Blade armament',
        description: 'Any number of models can swap their twin gauss blasters, and any number can each take shieldvanes plus either a nebuloscope or shadowloom.',
        controls: [
          { key: 'gauss_blaster', label: 'Twin gauss blaster', max: models => Number(models || 0) },
          { key: 'tesla_carbine', label: 'Twin tesla carbine', max: models => Number(models || 0) },
          { key: 'particle_beamer', label: 'Particle beamer', max: models => Number(models || 0) },
          { key: 'shieldvanes', label: 'Shieldvanes', max: models => Number(models || 0) },
          { key: 'nebuloscope', label: 'Nebuloscope', max: models => Number(models || 0) },
          { key: 'shadowloom', label: 'Shadowloom', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gaussBlaster = number(ctx, 'gauss_blaster');
        const teslaCarbine = number(ctx, 'tesla_carbine');
        const particleBeamer = number(ctx, 'particle_beamer');
        const shieldvanes = number(ctx, 'shieldvanes');
        const nebuloscope = number(ctx, 'nebuloscope');
        const shadowloom = number(ctx, 'shadowloom');
        if (gaussBlaster + teslaCarbine + particleBeamer !== ctx.modelCount) ctx.errors.push(`Tomb Blade ranged weapons must total ${ctx.modelCount}.`);
        if (nebuloscope + shadowloom > ctx.modelCount) ctx.errors.push(`Tomb Blade targeting gear must total ${ctx.modelCount} or fewer.`);
        add(ctx, q, 'Twin gauss blaster', gaussBlaster);
        add(ctx, q, 'Twin tesla carbine', teslaCarbine);
        add(ctx, q, 'Particle beamer', particleBeamer);
        add(ctx, q, 'Shieldvanes', shieldvanes);
        add(ctx, q, 'Nebuloscope', nebuloscope);
        add(ctx, q, 'Shadowloom', shadowloom);
        add(ctx, q, 'Close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Triarch Stalker': {
      sections: [{
        title: 'Triarch Stalker armament',
        description: 'Select the Triarch Stalker\'s main weapon.',
        controls: [
          { type: 'select', key: 'gun', label: 'Main weapon', value: 'Heat ray', options: [
            { value: 'Heat ray', label: 'Heat ray' },
            { value: 'Heavy gauss cannon array', label: 'Heavy gauss cannon array' },
            { value: 'Particle shredder', label: 'Particle shredder' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gun = select(ctx, 'gun', 'Heat ray');
        if (gun === 'Heat ray') {
          add(ctx, q, 'Heat ray – dispersed', 1);
          add(ctx, q, 'Heat ray – focused', 1);
        } else {
          add(ctx, q, gun, 1);
        }
        add(ctx, q, 'Stalker’s forelimbs', 1);
        return q;
      }
    }
  };
}());
