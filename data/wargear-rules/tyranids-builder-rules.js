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

  registry['tyranids'] = {
    'Barbgaunts': fixed('Every model is equipped with: barblauncher; chitinous claws and teeth.', ctx => {
      const q = {};
      add(ctx, q, 'barblauncher', ctx.modelCount);
      add(ctx, q, 'chitinous claws and teeth', ctx.modelCount);
      return q;
    }),

    'Biovores': fixed('Every model is equipped with: Spore Mine launcher; chitin-barbed limbs.', ctx => {
      const q = {};
      add(ctx, q, 'spore mine launcher', ctx.modelCount);
      add(ctx, q, 'chitin-barbed limbs', ctx.modelCount);
      return q;
    }),

    'Broodlord': fixed('This model is equipped with: Broodlord claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'broodlord claws and talons', 1);
      return q;
    }),

    'Carnifexes': {
      sections: [{
        title: 'Main ranged weapon',
        description: 'Each Carnifex chooses one main ranged loadout or keeps its extra talons.',
        controls: [
          { key: 'talons', label: 'Keep extra scything talons', max: models => Number(models || 0) },
          { key: 'deathspitters', label: 'Deathspitters with slimer maggots', max: models => Number(models || 0) },
          { key: 'devourers', label: 'Devourers with brainleech worms', max: models => Number(models || 0) },
          { key: 'heavy_venom_cannon', label: 'Heavy venom cannon', max: models => Number(models || 0) },
          { key: 'stranglethorn_cannon', label: 'Stranglethorn cannon', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Secondary upgrades',
        description: 'Assign optional close-combat and bio-plasma upgrades.',
        controls: [
          { key: 'crushing_claws', label: 'Carnifex crushing claws', max: models => Number(models || 0) },
          { key: 'bio_plasma', label: 'Bio-plasma', max: models => Number(models || 0) },
          { key: 'spine_banks', label: 'Spine banks', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const talons = number(ctx, 'talons');
        const deathspitters = number(ctx, 'deathspitters');
        const devourers = number(ctx, 'devourers');
        const venom = number(ctx, 'heavy_venom_cannon');
        const stranglethorn = number(ctx, 'stranglethorn_cannon');
        const crushingClaws = number(ctx, 'crushing_claws');
        const totalMain = talons + deathspitters + devourers + venom + stranglethorn;
        if (totalMain !== ctx.modelCount) ctx.errors.push(`Carnifex main loadouts must total ${ctx.modelCount}.`);
        if (crushingClaws > ctx.modelCount) ctx.errors.push(`Carnifex crushing claws cannot exceed ${ctx.modelCount}.`);
        add(ctx, q, 'carnifex scything talons', Math.max(0, ctx.modelCount - crushingClaws));
        add(ctx, q, 'carnifex extra scything talons', talons);
        add(ctx, q, 'deathspitters with slimer maggots', deathspitters);
        add(ctx, q, 'devourers with brainleech worms', devourers);
        add(ctx, q, 'heavy venom cannon', venom);
        add(ctx, q, 'stranglethorn cannon', stranglethorn);
        add(ctx, q, 'carnifex crushing claws', crushingClaws);
        add(ctx, q, 'bio-plasma', number(ctx, 'bio_plasma'));
        add(ctx, q, 'spine banks', number(ctx, 'spine_banks'));
        add(ctx, q, 'chitinous claws and teeth', ctx.modelCount);
        return q;
      }
    },

    'Deathleaper': fixed('This model is equipped with: Lictor claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'lictor claws and talons', 1);
      return q;
    }),

    'Exocrine': fixed('This model is equipped with: bio-plasmic cannon; powerful limbs.', ctx => {
      const q = {};
      add(ctx, q, 'bio-plasmic cannon', 1);
      add(ctx, q, 'powerful limbs', 1);
      return q;
    }),

    'Gargoyles': fixed('Every model is equipped with: fleshborer; blinding venom.', ctx => {
      const q = {};
      add(ctx, q, 'fleshborer', ctx.modelCount);
      add(ctx, q, 'blinding venom', ctx.modelCount);
      return q;
    }),

    'Genestealers': fixed('Every model is equipped with: Genestealer claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'genestealer claws and talons', ctx.modelCount);
      return q;
    }),

    'Harpy': {
      sections: [{
        title: 'Primary bio-cannon',
        description: 'Select one Harpy twin bio-cannon.',
        controls: [{ type: 'select', key: 'gun', label: 'Twin bio-cannon', value: 'twin stranglethorn cannon', options: [
          { value: 'twin stranglethorn cannon', label: 'Twin stranglethorn cannon' },
          { value: 'twin heavy venom cannon', label: 'Twin heavy venom cannon' }
        ] }]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'stinger salvoes', 1);
        add(ctx, q, select(ctx, 'gun', 'twin stranglethorn cannon'), 1);
        add(ctx, q, 'scything wings', 1);
        return q;
      }
    },

    'Harridan': fixed('This model is equipped with: 2 dire bio-cannons; gargantuan scything talons.', ctx => {
      const q = {};
      add(ctx, q, 'dire bio-cannon', 2);
      add(ctx, q, 'gargantuan scything talons', 1);
      return q;
    }),

    'Haruspex': fixed('This model is equipped with: grasping tongue; ravenous maw; shovelling claws.', ctx => {
      const q = {};
      add(ctx, q, 'grasping tongue', 1);
      add(ctx, q, 'ravenous maw', 1);
      add(ctx, q, 'shovelling claws', 1);
      return q;
    }),

    'Hierophant': fixed('This model is equipped with: bio-plasma torrent; 2 dire bio-cannons; lashwhip pods; titanic scything talons.', ctx => {
      const q = {};
      add(ctx, q, 'bio-plasma torrent', 1);
      add(ctx, q, 'dire bio-cannon', 2);
      add(ctx, q, 'lashwhip pods', 1);
      add(ctx, q, 'titanic scything talons', 1);
      return q;
    }),

    'Hive Crone': fixed('This model is equipped with: drool cannon; stinger salvoes; tentaclids; scything wings; thorax spur.', ctx => {
      const q = {};
      add(ctx, q, 'drool cannon', 1);
      add(ctx, q, 'stinger salvoes', 1);
      add(ctx, q, 'tentaclids', 1);
      add(ctx, q, 'scything wings', 1);
      add(ctx, q, 'thorax spur', 1);
      return q;
    }),

    'Hive Guard': {
      sections: [{
        title: 'Main bio-cannon',
        description: 'Each Hive Guard chooses one main bio-cannon.',
        controls: [
          { key: 'shockcannon', label: 'Shockcannon', max: models => Number(models || 0) },
          { key: 'impaler_cannon', label: 'Impaler cannon', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const shock = number(ctx, 'shockcannon');
        const impaler = number(ctx, 'impaler_cannon');
        if (shock + impaler !== ctx.modelCount) ctx.errors.push(`Hive Guard weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'shockcannon', shock);
        add(ctx, q, 'impaler cannon', impaler);
        add(ctx, q, 'chitinous claws and teeth', ctx.modelCount);
        return q;
      }
    },

    'Hive Tyrant': {
      sections: [{
        title: 'Primary weapon set',
        description: 'Replace the monstrous bonesword and lash whip with a ranged cannon or another set of monstrous scything talons.',
        controls: [{ type: 'select', key: 'loadout', label: 'Weapon set', value: 'bonesword', options: [
          { value: 'bonesword', label: 'Keep monstrous bonesword and lash whip' },
          { value: 'heavy venom cannon', label: 'Heavy venom cannon' },
          { value: 'stranglethorn cannon', label: 'Stranglethorn cannon' },
          { value: 'monstrous scything talons', label: 'Replace with monstrous scything talons' }
        ] }]
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'bonesword');
        if (loadout === 'heavy venom cannon' || loadout === 'stranglethorn cannon') {
          add(ctx, q, loadout, 1);
          add(ctx, q, 'monstrous scything talons', 1);
        } else if (loadout === 'monstrous scything talons') {
          add(ctx, q, 'monstrous scything talons', 1);
          add(ctx, q, 'monstrous scything talons', 1);
        } else {
          add(ctx, q, 'monstrous bonesword and lash whip', 1);
          add(ctx, q, 'monstrous scything talons', 1);
        }
        return q;
      }
    },

    'Hormagaunts': fixed('Every model is equipped with: Hormagaunt talons.', ctx => {
      const q = {};
      add(ctx, q, 'hormagaunt talons', ctx.modelCount);
      return q;
    }),

    'Hyperadapted Raveners': fixed('The Ravener Prime is equipped with: Prime claws and talons. 3 Raveners are equipped with: Ravener heavy claws and talons. 1 Ravener is equipped with: venom bolt; Ravener heavy claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'prime claws and talons', 1);
      add(ctx, q, 'ravener heavy claws and talons', 4);
      add(ctx, q, 'venom bolt', 1);
      return q;
    }),

    'Lictor': fixed('This model is equipped with: Lictor claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'lictor claws and talons', 1);
      return q;
    }),

    'Maleceptor': fixed('This model is equipped with: massive scything talons; psychic overload.', ctx => {
      const q = {};
      add(ctx, q, 'massive scything talons', 1);
      add(ctx, q, 'psychic overload', 1);
      return q;
    }),

    'Mawloc': fixed('This model is equipped with: distensible jaw; Mawloc scything talons.', ctx => {
      const q = {};
      add(ctx, q, 'distensible jaw', 1);
      add(ctx, q, 'mawloc scything talons', 1);
      return q;
    }),

    'Neurogaunts': fixed('Every model is equipped with: Xenos claws and teeth.', ctx => {
      const q = {};
      add(ctx, q, 'xenos claws and teeth', ctx.modelCount);
      return q;
    }),

    'Neurolictor': fixed('This model is equipped with: piercing claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'piercing claws and talons', 1);
      return q;
    }),

    'Neurotyrant': fixed('This model is equipped with: neurotyrant claws and lashes; psychic scream.', ctx => {
      const q = {};
      add(ctx, q, 'neurotyrant claws and lashes', 1);
      add(ctx, q, 'psychic scream', 1);
      return q;
    }),

    'Norn Assimilator': fixed('This model is equipped with: monstrous scything talons; toxinjector harpoon.', ctx => {
      const q = {};
      add(ctx, q, 'monstrous scything talons', 1);
      add(ctx, q, 'toxinjector harpoon', 1);
      return q;
    }),

    'Norn Emissary': fixed('This model is equipped with: monstrous rending claws; monstrous scything talons; psychic tendril bio-weapons.', ctx => {
      const q = {};
      add(ctx, q, 'monstrous rending claws', 1);
      add(ctx, q, 'monstrous scything talons', 1);
      add(ctx, q, 'psychic tendril â€“ neuroblast', 1);
      add(ctx, q, 'psychic tendril â€“ neurolance', 1);
      add(ctx, q, 'psychic tendril â€“ neuroparasite', 1);
      return q;
    }),

    'Old One Eye': fixed('This model is equipped with: Old One Eye\'s claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'old one eye\'s claws and talons', 1);
      return q;
    }),

    'Parasite Of Mortrex': fixed('This model is equipped with: barbed ovipositor; claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'barbed ovipositor', 1);
      add(ctx, q, 'claws and talons', 1);
      return q;
    }),

    'Psychophage': fixed('This model is equipped with: psycholastic torrent; talons and betentacled maw.', ctx => {
      const q = {};
      add(ctx, q, 'psycholastic torrent', 1);
      add(ctx, q, 'talons and betentacled maw', 1);
      return q;
    }),

    'Pyrovores': fixed('Every model is equipped with: flamespurt; chitin-barbed limbs.', ctx => {
      const q = {};
      add(ctx, q, 'flamespurt', ctx.modelCount);
      add(ctx, q, 'chitin-barbed limbs', ctx.modelCount);
      return q;
    }),

    'Raveners': {
      sections: [{
        title: 'Thoracic bio-weapon',
        description: 'Any number of Raveners can each take one thoracic bio-weapon.',
        controls: [
          { key: 'deathspitter', label: 'Deathspitter', max: models => Number(models || 0) },
          { key: 'devourer', label: 'Devourer', max: models => Number(models || 0) },
          { key: 'spinefists', label: 'Spinefists', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const deathspitter = number(ctx, 'deathspitter');
        const devourer = number(ctx, 'devourer');
        const spinefists = number(ctx, 'spinefists');
        const totalBioWeapons = deathspitter + devourer + spinefists;
        if (totalBioWeapons > ctx.modelCount) ctx.errors.push(`Ravener bio-weapons cannot exceed ${ctx.modelCount}.`);
        add(ctx, q, 'deathspitter', deathspitter);
        add(ctx, q, 'devourer', devourer);
        add(ctx, q, 'spinefists', spinefists);
        add(ctx, q, 'ravener claws and talons', ctx.modelCount);
        return q;
      }
    },

    'Ripper Swarms': fixed('Every model is equipped with: Xenos claws and teeth.', ctx => {
      const q = {};
      add(ctx, q, 'xenos claws and teeth', ctx.modelCount);
      return q;
    }),

    'Screamer-killer': fixed('This model is equipped with: bio-plasmic scream; Screamer-killer talons.', ctx => {
      const q = {};
      add(ctx, q, 'bio-plasmic scream', 1);
      add(ctx, q, 'screamer-killer talons', 1);
      return q;
    }),

    'Sporocyst': fixed('This model is equipped with: Sporocyst bio-weapons; flensing whips.', ctx => {
      const q = {};
      add(ctx, q, 'sporocyst bio-weapons', 1);
      add(ctx, q, 'flensing whips', 1);
      return q;
    }),

    'Termagants': {
      sections: [{
        title: 'Termagant bio-weapon',
        description: 'Each Termagant chooses one ranged bio-weapon.',
        controls: [
          { key: 'fleshborer', label: 'Fleshborer', max: models => Number(models || 0) },
          { key: 'devourer', label: 'Termagant devourer', max: models => Number(models || 0) },
          { key: 'spinefists', label: 'Termagant spinefists', max: models => Number(models || 0) },
          { key: 'spike_rifle', label: 'Spike rifle', max: models => Math.floor(Number(models || 0) / 10) * 2 },
          { key: 'shardlauncher', label: 'Shardlauncher', max: models => Math.floor(Number(models || 0) / 10) * 2 },
          { key: 'strangleweb', label: 'Strangleweb', max: models => Math.floor(Number(models || 0) / 10) * 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const fleshborer = number(ctx, 'fleshborer');
        const devourer = number(ctx, 'devourer');
        const spinefists = number(ctx, 'spinefists');
        const spike = number(ctx, 'spike_rifle');
        const shard = number(ctx, 'shardlauncher');
        const web = number(ctx, 'strangleweb');
        const total = fleshborer + devourer + spinefists + spike + shard + web;
        if (total !== ctx.modelCount) ctx.errors.push(`Termagant bio-weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'fleshborer', fleshborer);
        add(ctx, q, 'termagant devourer', devourer);
        add(ctx, q, 'termagant spinefists', spinefists);
        add(ctx, q, 'spike rifle', spike);
        add(ctx, q, 'shardlauncher', shard);
        add(ctx, q, 'strangleweb', web);
        add(ctx, q, 'chitinous claws and teeth', ctx.modelCount);
        return q;
      }
    },

    'Tervigon': {
      sections: [{
        title: 'Tervigon melee profile',
        description: 'Select one Tervigon melee configuration.',
        controls: [{ type: 'select', key: 'melee', label: 'Melee profile', value: 'massive scything talons', options: [
          { value: 'massive scything talons', label: 'Massive scything talons' },
          { value: 'massive crushing claws', label: 'Massive crushing claws' }
        ] }]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'stinger salvoes', 1);
        if (select(ctx, 'melee', 'massive scything talons') === 'massive crushing claws') {
          add(ctx, q, 'massive crushing claws', 1);
        } else {
          add(ctx, q, 'massive scything talons – strike', 1);
          add(ctx, q, 'massive scything talons – sweep', 1);
        }
        return q;
      }
    },

    'The Swarmlord': fixed('This model is equipped with: Synaptic pulse; bone sabres.', ctx => {
      const q = {};
      add(ctx, q, 'synaptic pulse', 1);
      add(ctx, q, 'bone sabres', 1);
      return q;
    }),

    'Toxicrene': fixed('This model is equipped with: massive toxic lashes.', ctx => {
      const q = {};
      add(ctx, q, 'massive toxic lashes (1)', 1);
      return q;
    }),

    'Trygon': fixed('This model is equipped with: bio-electric pulse; Trygon scything talons.', ctx => {
      const q = {};
      add(ctx, q, 'bio-electric pulse', 1);
      add(ctx, q, 'trygon scything talons', 1);
      return q;
    }),

    'Tyranid Prime with Lash Whip': fixed('This model is equipped with: 1 rending claw; 1 lash whip; 1 scything talons.', ctx => {
      const q = {};
      add(ctx, q, 'rending claw', 1);
      add(ctx, q, 'lash whip', 1);
      add(ctx, q, 'scything talons', 1);
      return q;
    }),

    'Tyranid Warriors With Melee Bio-weapons': fixed('Every model is equipped with: Tyranid Warrior claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'tyranid warrior claws and talons', ctx.modelCount);
      return q;
    }),

    'Tyranid Warriors With Ranged Bio-weapons': {
      sections: [{
        title: 'Ranged bio-weapons',
        description: 'Assign one ranged bio-weapon to each Tyranid Warrior.',
        controls: [
          { key: 'devourer', label: 'Devourer', max: models => Number(models || 0) },
          { key: 'deathspitter', label: 'Deathspitter', max: models => Number(models || 0) },
          { key: 'spinefists', label: 'Spinefists', max: models => Number(models || 0) },
          { key: 'barbed_strangler', label: 'Barbed strangler', max: models => Math.floor(Number(models || 0) / 3) },
          { key: 'venom_cannon', label: 'Venom cannon', max: models => Math.floor(Number(models || 0) / 3) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const devourer = number(ctx, 'devourer');
        const deathspitter = number(ctx, 'deathspitter');
        const spinefists = number(ctx, 'spinefists');
        const strangler = number(ctx, 'barbed_strangler');
        const venom = number(ctx, 'venom_cannon');
        const total = devourer + deathspitter + spinefists + strangler + venom;
        if (total !== ctx.modelCount) ctx.errors.push(`Tyranid Warrior ranged bio-weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'devourer', devourer);
        add(ctx, q, 'deathspitter', deathspitter);
        add(ctx, q, 'spinefists', spinefists);
        add(ctx, q, 'barbed strangler', strangler);
        add(ctx, q, 'venom cannon', venom);
        add(ctx, q, 'tyranid warrior claws and talons', ctx.modelCount);
        return q;
      }
    },

    'Tyrannocyte': fixed('This model is equipped with: Tyrannocyte bio-weapons; flensing whips.', ctx => {
      const q = {};
      add(ctx, q, 'tyrannocyte bio-weapons', 1);
      add(ctx, q, 'flensing whips', 1);
      return q;
    }),

    'Tyrannofex': {
      sections: [{
        title: 'Main bio-cannon',
        description: 'Select one Tyrannofex main ranged weapon.',
        controls: [{ type: 'select', key: 'main', label: 'Main weapon', value: 'fleshborer hive', options: [
          { value: 'fleshborer hive', label: 'Fleshborer hive' },
          { value: 'acid spray', label: 'Acid spray' },
          { value: 'rupture cannon', label: 'Rupture cannon' }
        ] }]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main', 'fleshborer hive'), 1);
        add(ctx, q, 'stinger salvoes', 1);
        add(ctx, q, 'powerful limbs', 1);
        return q;
      }
    },

    'Tyrant Guard': {
      sections: [{
        title: 'Guard bio-weapons',
        description: 'Each Tyrant Guard chooses one melee loadout.',
        controls: [
          { key: 'scything', label: 'Scything talons and rending claws', max: models => Number(models || 0) },
          { key: 'bonecleaver', label: 'Bone cleaver, lash whip and rending claws', max: models => Number(models || 0) },
          { key: 'crushing', label: 'Crushing claws and rending claws', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const scything = number(ctx, 'scything');
        const bonecleaver = number(ctx, 'bonecleaver');
        const crushing = number(ctx, 'crushing');
        if (scything + bonecleaver + crushing !== ctx.modelCount) ctx.errors.push(`Tyrant Guard loadouts must total ${ctx.modelCount}.`);
        add(ctx, q, 'scything talons and rending claws', scything);
        add(ctx, q, 'bone cleaver, lash whip and rending claws', bonecleaver);
        add(ctx, q, 'crushing claws and rending claws', crushing);
        return q;
      }
    },

    'Venomthropes': fixed('Every model is equipped with: toxic lashes.', ctx => {
      const q = {};
      add(ctx, q, 'toxic lashes', ctx.modelCount);
      return q;
    }),

    'Von Ryan\u2019s Leapers': fixed('Every model is equipped with: Leaper\u2019s talons.', ctx => {
      const q = {};
      add(ctx, q, 'leaper\u2019s talons', ctx.modelCount);
      return q;
    }),

    'Winged Hive Tyrant': {
      sections: [{
        title: 'Primary weapon set',
        description: 'Replace the monstrous bonesword and lash whip with a ranged cannon or another set of monstrous scything talons.',
        controls: [{ type: 'select', key: 'loadout', label: 'Weapon set', value: 'bonesword', options: [
          { value: 'bonesword', label: 'Keep monstrous bonesword and lash whip' },
          { value: 'heavy venom cannon', label: 'Heavy venom cannon' },
          { value: 'stranglethorn cannon', label: 'Stranglethorn cannon' },
          { value: 'monstrous scything talons', label: 'Replace with monstrous scything talons' }
        ] }]
      }],
      quantities: ctx => {
        const q = {};
        const loadout = select(ctx, 'loadout', 'bonesword');
        if (loadout === 'heavy venom cannon' || loadout === 'stranglethorn cannon') {
          add(ctx, q, loadout, 1);
          add(ctx, q, 'tyrant talons', 1);
        } else if (loadout === 'monstrous scything talons') {
          add(ctx, q, 'monstrous scything talons', 1);
          add(ctx, q, 'tyrant talons', 1);
        } else {
          add(ctx, q, 'monstrous bonesword and lash whip', 1);
          add(ctx, q, 'tyrant talons', 1);
        }
        return q;
      }
    },

    'Winged Tyranid Prime': fixed('This model is equipped with: Prime talons.', ctx => {
      const q = {};
      add(ctx, q, 'prime talons', 1);
      return q;
    }),

    'Zoanthropes': fixed('Every model is equipped with: Warp Blast; chitinous claws and teeth.', ctx => {
      const q = {};
      add(ctx, q, 'warp blast – focused witchfire', ctx.modelCount);
      add(ctx, q, 'warp blast – witchfire', ctx.modelCount);
      add(ctx, q, 'chitinous claws and teeth', ctx.modelCount);
      return q;
    })
  };
}());
