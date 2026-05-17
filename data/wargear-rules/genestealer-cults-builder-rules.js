(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};
  const legacyAstra = window.ASTRA_MILITARUM_INFANTRY_RULE_CONFIGS || {};
  if (!registry['astra-militarum']) registry['astra-militarum'] = legacyAstra;

  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);
  const number = (ctx, key) => ctx.number(key);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;
  const sharedAstra = registry['astra-militarum'] || legacyAstra;
  const sharedTyranids = registry.tyranids || {};
  const broodBrothersUnits = [
    'Armoured Sentinels',
    'Artillery Team',
    'Attilan Rough Riders',
    'Baneblade',
    'Banehammer',
    'Banesword',
    'Basilisk',
    'Cadian Castellan',
    'Cadian Command Squad',
    'Cadian Heavy Weapons Squad',
    'Cadian Shock Troops',
    'Catachan Command Squad',
    'Catachan Heavy Weapons Squad',
    'Catachan Jungle Fighters',
    'Chimera',
    'Death Korps Of Krieg',
    'Death Riders',
    'Deathstrike',
    'Doomhammer',
    'Field Ordnance Battery',
    'Hellhammer',
    'Hellhound',
    'Hydra',
    'Kasrkin',
    'Krieg Combat Engineers',
    'Krieg Command Squad',
    'Krieg Heavy Weapons Squad',
    'Leman Russ Battle Tank',
    'Leman Russ Commander',
    'Leman Russ Demolisher',
    'Leman Russ Eradicator',
    'Leman Russ Executioner',
    'Leman Russ Exterminator',
    'Leman Russ Punisher',
    'Leman Russ Vanquisher',
    'Manticore',
    'Primaris Psyker',
    'Rogal Dorn Battle Tank',
    'Rogal Dorn Commander',
    'Scout Sentinels',
    'Shadowsword',
    'Stormlord',
    'Stormsword',
    'Taurox',
    'Taurox Prime',
    'Wyvern'
  ];

  const tyranidCarryOverUnits = [
    'Deathleaper',
    'Gargoyles',
    'Hyperadapted Raveners',
    'Lictor',
    'Mawloc',
    'Neurolictor',
    'Parasite Of Mortrex',
    'Raveners',
    'Trygon',
    'Tyrannocyte',
    'Von Ryan\u2019s Leapers',
    'Winged Hive Tyrant',
    'Winged Tyranid Prime'
  ];

  function fixed(description, quantitiesFn) {
    return {
      sections: [{ title: 'Unit loadout', description: description, controls: [] }],
      quantities: quantitiesFn
    };
  }

  function sentinelConfig() {
    return {
      sections: [{
        title: 'Main weapon',
        description: 'Each Sentinel selects one main weapon.',
        controls: [
          { key: 'multi_laser', label: 'Multi-laser', max: models => Number(models || 0) },
          { key: 'autocannon', label: 'Autocannon', max: models => Number(models || 0) },
          { key: 'heavy_flamer', label: 'Heavy flamer', max: models => Number(models || 0) },
          { key: 'lascannon', label: 'Lascannon', max: models => Number(models || 0) },
          { key: 'missile_launcher', label: 'Missile launcher', max: models => Number(models || 0) },
          { key: 'plasma_cannon', label: 'Plasma cannon', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Optional wargear',
        description: 'Each Sentinel can be equipped with one hunter-killer missile and one Sentinel chainsaw.',
        controls: [
          { key: 'hunter_killer', label: 'Hunter-killer missile', max: models => Number(models || 0) },
          { key: 'chainsaw', label: 'Sentinel chainsaw', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const multiLaser = number(ctx, 'multi_laser');
        const autocannon = number(ctx, 'autocannon');
        const heavyFlamer = number(ctx, 'heavy_flamer');
        const lascannon = number(ctx, 'lascannon');
        const missileLauncher = number(ctx, 'missile_launcher');
        const plasmaCannon = number(ctx, 'plasma_cannon');
        const mainWeapons = multiLaser + autocannon + heavyFlamer + lascannon + missileLauncher + plasmaCannon;
        if (mainWeapons !== ctx.modelCount) ctx.errors.push(`Sentinel main weapons must total ${ctx.modelCount}.`);
        add(ctx, q, 'multi-laser', multiLaser);
        add(ctx, q, 'autocannon', autocannon);
        add(ctx, q, 'heavy flamer', heavyFlamer);
        add(ctx, q, 'lascannon', lascannon);
        add(ctx, q, 'missile launcher – frag', missileLauncher);
        add(ctx, q, 'missile launcher – krak', missileLauncher);
        add(ctx, q, 'plasma cannon – standard', plasmaCannon);
        add(ctx, q, 'plasma cannon – supercharge', plasmaCannon);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        add(ctx, q, 'hunter-killer missile', number(ctx, 'hunter_killer'));
        add(ctx, q, 'sentinel chainsaw', number(ctx, 'chainsaw'));
        return q;
      }
    };
  }

  function lemanRussConfig(turretWeapon) {
    return {
      sections: [{
        title: 'Turret weapon',
        description: `Fixed loadout: ${turretWeapon}.`,
        controls: []
      }, {
        title: 'Hull weapon',
        description: 'Select one hull-mounted weapon.',
        controls: [{ type: 'select', key: 'hull', label: 'Hull weapon', value: 'lascannon', options: [
          { value: 'lascannon', label: 'Lascannon' },
          { value: 'heavy bolter', label: 'Heavy bolter' },
          { value: 'heavy flamer', label: 'Heavy flamer' }
        ] }]
      }, {
        title: 'Sponsons',
        description: 'Select an optional pair of sponson weapons.',
        controls: [{ type: 'select', key: 'sponsons', label: 'Sponson package', value: '', options: [
          { value: '', label: 'None' },
          { value: 'heavy bolter', label: '2 heavy bolters' },
          { value: 'heavy flamer', label: '2 heavy flamers' },
          { value: 'multi-melta', label: '2 multi-meltas' }
        ] }]
      }, {
        title: 'Pintle and missile',
        description: 'Select optional pintle and hunter-killer upgrades.',
        controls: [
          { type: 'select', key: 'pintle', label: 'Pintle weapon', value: '', options: [
            { value: '', label: 'None' },
            { value: 'heavy stubber', label: 'Heavy stubber' },
            { value: 'storm bolter', label: 'Storm bolter' }
          ] },
          { type: 'select', key: 'hunter', label: 'Hunter-killer missile', value: '', options: [
            { value: '', label: 'None' },
            { value: 'hunter-killer missile', label: 'Hunter-killer missile' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, turretWeapon, 1);
        add(ctx, q, select(ctx, 'hull', 'lascannon'), 1);
        add(ctx, q, 'armoured tracks', 1);
        const sponsons = select(ctx, 'sponsons', '');
        if (sponsons) add(ctx, q, sponsons, 2);
        add(ctx, q, select(ctx, 'pintle', ''), 1);
        add(ctx, q, select(ctx, 'hunter', ''), 1);
        return q;
      }
    };
  }

  function shockTroopsConfig() {
    return {
      sections: [{
        title: 'Sergeant wargear',
        description: 'All Sergeants use the same sidearm and melee selection in this builder.',
        controls: [
          { type: 'select', key: 'sergeant_pistol', label: 'Sergeant pistol', value: 'laspistol', options: [
            { value: 'laspistol', label: 'Laspistol' },
            { value: 'bolt pistol', label: 'Bolt pistol' },
            { value: 'plasma pistol', label: 'Plasma pistol' }
          ] },
          { type: 'select', key: 'sergeant_melee', label: 'Sergeant melee', value: 'chainsword', options: [
            { value: 'chainsword', label: 'Chainsword' },
            { value: 'power weapon', label: 'Power weapon' }
          ] }
        ]
      }, {
        title: 'Trooper upgrades',
        description: 'Assign vox-casters and special weapons.',
        controls: [
          { key: 'vox', label: 'Vox-caster', max: models => Math.floor(Number(models || 0) / 10) },
          { key: 'flamer', label: 'Flamer', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'grenade_launcher', label: 'Grenade launcher', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'meltagun', label: 'Meltagun', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'plasma_gun', label: 'Plasma gun', max: models => Number(models || 0) >= 20 ? 4 : 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const sergeants = Math.max(1, Math.floor(ctx.modelCount / 10));
        const troopers = Math.max(0, ctx.modelCount - sergeants);
        const specialWeapons = number(ctx, 'flamer') + number(ctx, 'grenade_launcher') + number(ctx, 'meltagun') + number(ctx, 'plasma_gun');
        add(ctx, q, select(ctx, 'sergeant_pistol', 'laspistol'), sergeants);
        add(ctx, q, select(ctx, 'sergeant_melee', 'chainsword'), sergeants);
        add(ctx, q, 'close combat weapon', troopers);
        add(ctx, q, 'vox-caster', number(ctx, 'vox'));
        add(ctx, q, 'flamer', number(ctx, 'flamer'));
        add(ctx, q, 'grenade launcher – frag', number(ctx, 'grenade_launcher'));
        add(ctx, q, 'grenade launcher – krak', number(ctx, 'grenade_launcher'));
        add(ctx, q, 'meltagun', number(ctx, 'meltagun'));
        add(ctx, q, 'plasma gun – standard', number(ctx, 'plasma_gun'));
        add(ctx, q, 'plasma gun – supercharge', number(ctx, 'plasma_gun'));
        add(ctx, q, 'lasgun', Math.max(0, troopers - specialWeapons));
        return q;
      }
    };
  }

  registry['genestealer-cults'] = {
    'Aberrants': fixed('Every Aberrant is equipped with: Aberrant weapons.', ctx => {
      const q = {};
      add(ctx, q, 'aberrant weapons', ctx.modelCount);
      return q;
    }),

    'Abominant': fixed('This model is equipped with: power sledgehammer.', ctx => {
      const q = {};
      add(ctx, q, 'power sledgehammer', 1);
      return q;
    }),

    'Achilles Ridgerunners': {
      sections: [{
        title: 'Main gun',
        description: 'Each Ridgerunner selects one main gun.',
        controls: [
          { key: 'mining_laser', label: 'Heavy mining laser', max: models => Number(models || 0) },
          { key: 'heavy_mortar', label: 'Heavy mortar', max: models => Number(models || 0) },
          { key: 'missile_launcher', label: 'Achilles missile launcher', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const laser = number(ctx, 'mining_laser');
        const mortar = number(ctx, 'heavy_mortar');
        const missile = number(ctx, 'missile_launcher');
        if (laser + mortar + missile !== ctx.modelCount) ctx.errors.push(`Ridgerunner main guns must total ${ctx.modelCount}.`);
        add(ctx, q, 'heavy mining laser', laser);
        add(ctx, q, 'heavy mortar', mortar);
        add(ctx, q, 'achilles missile launcher', missile);
        add(ctx, q, 'twin heavy stubber', ctx.modelCount);
        add(ctx, q, 'armoured hull', ctx.modelCount);
        return q;
      }
    },

    'Acolyte Hybrids With Autopistols': {
      sections: [{
        title: 'Heavy mining tools',
        description: 'Assign heavy mining tools and the leader melee profile.',
        controls: [
          { key: 'heavy_mining_tool', label: 'Heavy mining tool', max: models => Math.floor(Number(models || 0) / 5) * 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const tools = number(ctx, 'heavy_mining_tool');
        if (tools > Math.max(0, ctx.modelCount - 1)) ctx.errors.push('Too many heavy mining tools for this Acolyte unit.');
        add(ctx, q, 'autopistol', ctx.modelCount);
        add(ctx, q, 'leader’s bio-weapons', 1);
        add(ctx, q, 'heavy mining tool', tools);
        add(ctx, q, 'cult claws and knife', Math.max(0, ctx.modelCount - 1 - tools));
        return q;
      }
    },

    'Acolyte Hybrids With Hand Flamers': {
      sections: [{
        title: 'Demolition charges',
        description: 'Assign demolition charges in the squad.',
        controls: [
          { key: 'demolition_charges', label: 'Demolition charges', max: models => Math.floor(Number(models || 0) / 5) * 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const demos = number(ctx, 'demolition_charges');
        if (demos > Math.max(0, ctx.modelCount - 1)) ctx.errors.push('Too many demolition charge carriers for this Acolyte unit.');
        add(ctx, q, 'hand flamer', ctx.modelCount);
        add(ctx, q, 'leader’s bio-weapons', 1);
        add(ctx, q, 'demolition charges', demos);
        add(ctx, q, 'cult claws and knife', Math.max(0, ctx.modelCount - 1));
        return q;
      }
    },

    'Acolyte Iconward': fixed('This model is equipped with: autopistol; cult claws.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 1);
      add(ctx, q, 'cult claws', 1);
      return q;
    }),

    'Atalan Jackals': {
      sections: [{
        title: 'Jackal specials',
        description: 'Assign Jackal special weapons and Wolfquad heavy weapons.',
        controls: [
          { key: 'grenade_launcher', label: 'Grenade launcher', max: 2 },
          { key: 'atalan_incinerator', label: 'Atalan incinerator', max: 2 },
          { key: 'power_weapon', label: 'Atalan power weapon', max: 1 },
          { key: 'mining_laser', label: 'Mining laser (Wolfquad)', max: models => Number(models || 0) >= 10 ? 2 : 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const wolfquads = ctx.modelCount >= 10 ? 2 : 1;
        const grenade = number(ctx, 'grenade_launcher');
        const incinerator = number(ctx, 'atalan_incinerator');
        const power = number(ctx, 'power_weapon');
        const laser = number(ctx, 'mining_laser');
        if (grenade + incinerator > Math.max(0, ctx.modelCount - wolfquads)) ctx.errors.push('Too many Jackal special weapon upgrades for the number of bikers.');
        add(ctx, q, 'grenade launcher – frag', grenade);
        add(ctx, q, 'grenade launcher – krak', grenade);
        add(ctx, q, 'atalan incinerator', incinerator);
        add(ctx, q, 'atalan power weapon', power);
        add(ctx, q, 'mining laser', laser);
        add(ctx, q, 'heavy stubber', Math.max(0, wolfquads - laser));
        add(ctx, q, 'atalan small arms', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount - power);
        return q;
      }
    },

    'Benefictus': fixed('This model is equipped with: Psionic Cascade; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'psionic cascade - focused witchfire', 1);
      add(ctx, q, 'psionic cascade - witchfire', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Biophagus': fixed('This model is equipped with: autopistol; chemical vials; injector goad.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 1);
      add(ctx, q, 'chemical vials', 1);
      add(ctx, q, 'injector goad', 1);
      return q;
    }),

    'Clamavus': fixed('This model is equipped with: autopistol; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Goliath Rockgrinder': {
      sections: [{
        title: 'Main weapon',
        description: 'Select the Rockgrinder main weapon.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main weapon', value: 'heavy mining laser', options: [
            { value: 'heavy mining laser', label: 'Heavy mining laser' },
            { value: 'heavy seismic cannon', label: 'Heavy seismic cannon' },
            { value: 'clearance incinerator', label: 'Clearance incinerator' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'heavy mining laser'), 1);
        add(ctx, q, 'heavy stubber', 1);
        add(ctx, q, 'drilldozer blade', 1);
        add(ctx, q, 'demolition charge cache', 1);
        return q;
      }
    },

    'Goliath Truck': fixed('This model is equipped with: heavy stubber; twin autocannon; demolition charge cache; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'heavy stubber', 1);
      add(ctx, q, 'twin autocannon', 1);
      add(ctx, q, 'demolition charge cache', 1);
      add(ctx, q, 'armoured hull', 1);
      return q;
    }),

    'Hybrid Metamorphs': {
      sections: [{
        title: 'Leader pistol',
        description: 'Assign the Metamorph Leader hand flamer if taken.',
        controls: [
          { key: 'leader_hand_flamer', label: 'Leader hand flamer', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const leaderFlamer = number(ctx, 'leader_hand_flamer');
        add(ctx, q, 'hand flamer', leaderFlamer);
        add(ctx, q, 'autopistol', Math.max(0, ctx.modelCount - leaderFlamer));
        add(ctx, q, 'leader’s bio-weapons', 1);
        add(ctx, q, 'metamorph mutations – strike', ctx.modelCount - 1);
        add(ctx, q, 'metamorph mutations – sweep', ctx.modelCount - 1);
        return q;
      }
    },

    'Jackal Alphus': fixed('This model is equipped with: autopistol; cult sniper rifle; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 1);
      add(ctx, q, 'cult sniper rifle', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Kelermorph': fixed('This model is equipped with: liberator autostubs; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'liberator autostubs', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Locus': fixed('This model is equipped with: Locus blades.', ctx => {
      const q = {};
      add(ctx, q, 'locus blades', 1);
      return q;
    }),

    'Magus': fixed('This model is equipped with: autopistol; Magus stave.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 1);
      add(ctx, q, 'magus stave', 1);
      return q;
    }),

    'Neophyte Hybrids': {
      sections: [{
        title: 'Leader wargear',
        description: 'Select the leader sidearm and melee weapon.',
        controls: [
          { type: 'select', key: 'leader_pistol', label: 'Leader pistol', value: 'autopistol', options: [
            { value: 'autopistol', label: 'Autopistol' },
            { value: 'anointed_pistol', label: 'Anointed pistol' }
          ] },
          { type: 'select', key: 'leader_melee', label: 'Leader melee', value: 'close combat weapon', options: [
            { value: 'close combat weapon', label: 'Close combat weapon' },
            { value: 'chainsword', label: 'Chainsword' },
            { value: 'power weapon', label: 'Power weapon' }
          ] }
        ]
      }, {
        title: 'Special weapons',
        description: 'Assign special and heavy weapons among the Neophytes.',
        controls: [
          { key: 'flamer', label: 'Flamer', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'webber', label: 'Webber', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'grenade_launcher', label: 'Grenade launcher', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'heavy_stubber', label: 'Heavy stubber', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'mining_laser', label: 'Mining laser', max: models => Number(models || 0) >= 20 ? 4 : 2 },
          { key: 'seismic_cannon', label: 'Seismic cannon', max: models => Number(models || 0) >= 20 ? 4 : 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specialWeapons = number(ctx, 'flamer') + number(ctx, 'webber') + number(ctx, 'grenade_launcher');
        const heavyWeapons = number(ctx, 'heavy_stubber') + number(ctx, 'mining_laser') + number(ctx, 'seismic_cannon');
        const specialLimit = ctx.modelCount >= 20 ? 4 : 2;
        const heavyLimit = ctx.modelCount >= 20 ? 4 : 2;
        if (specialWeapons > specialLimit) ctx.errors.push(`Neophyte special weapons cannot exceed ${specialLimit} for this unit size.`);
        if (heavyWeapons > heavyLimit) ctx.errors.push(`Neophyte heavy weapons cannot exceed ${heavyLimit} for this unit size.`);
        add(ctx, q, select(ctx, 'leader_pistol', 'autopistol') === 'anointed_pistol' ? 'anointed pistol' : 'autopistol', 1);
        add(ctx, q, select(ctx, 'leader_melee', 'close combat weapon'), 1);
        add(ctx, q, 'flamer', number(ctx, 'flamer'));
        add(ctx, q, 'webber', number(ctx, 'webber'));
        add(ctx, q, 'grenade launcher – frag', number(ctx, 'grenade_launcher'));
        add(ctx, q, 'grenade launcher – krak', number(ctx, 'grenade_launcher'));
        add(ctx, q, 'heavy stubber', number(ctx, 'heavy_stubber'));
        add(ctx, q, 'mining laser', number(ctx, 'mining_laser'));
        add(ctx, q, 'seismic cannon', number(ctx, 'seismic_cannon'));
        add(ctx, q, 'hybrid firearm', Math.max(0, ctx.modelCount - 1 - specialWeapons - heavyWeapons));
        add(ctx, q, 'close combat weapon', Math.max(0, ctx.modelCount - 1));
        return q;
      }
    },

    'Nexos': fixed('This model is equipped with: autopistol; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Patriarch': fixed('This model is equipped with: Patriarch’s claws.', ctx => {
      const q = {};
      add(ctx, q, 'patriarch’s claws', 1);
      return q;
    }),

    'Primus': fixed('This model is equipped with: scoped needle pistol; cult bonesword; toxin injector claw.', ctx => {
      const q = {};
      add(ctx, q, 'scoped needle pistol', 1);
      add(ctx, q, 'cult bonesword', 1);
      add(ctx, q, 'toxin injector claw', 1);
      return q;
    }),

    'Purestrain Genestealers': fixed('Every model is equipped with: cult claws and talons.', ctx => {
      const q = {};
      add(ctx, q, 'cult claws and talons', ctx.modelCount);
      return q;
    }),

    'Reductus Saboteur': fixed('This model is equipped with: autopistol; demolition charges; remote explosives; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'autopistol', 1);
      add(ctx, q, 'demolition charges', 1);
      add(ctx, q, 'remote explosives', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Sanctus': {
      sections: [{
        title: 'Assassination profile',
        description: 'Select whether the Sanctus is armed for ranged or melee assassination.',
        controls: [
          { type: 'select', key: 'profile', label: 'Profile', value: 'bio-dagger', options: [
            { value: 'bio-dagger', label: 'Sanctus bio-dagger' },
            { value: 'sniper', label: 'Cult sniper rifle' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const profile = select(ctx, 'profile', 'bio-dagger');
        if (profile === 'sniper') {
          add(ctx, q, 'cult sniper rifle', 1);
          add(ctx, q, 'close combat weapon', 1);
        } else add(ctx, q, 'sanctus bio-dagger', 1);
        return q;
      }
    }
  };

  const broodBrothersConfigs = {
    'Armoured Sentinels': sentinelConfig(),
    'Scout Sentinels': sentinelConfig(),
    'Leman Russ Battle Tank': lemanRussConfig('leman russ battle cannon'),
    'Leman Russ Commander': lemanRussConfig('leman russ battle cannon'),
    'Leman Russ Demolisher': lemanRussConfig('demolisher battle cannon'),
    'Leman Russ Eradicator': lemanRussConfig('eradicator nova cannon'),
    'Leman Russ Executioner': lemanRussConfig('executioner plasma cannon'),
    'Leman Russ Exterminator': lemanRussConfig('exterminator autocannon'),
    'Leman Russ Punisher': lemanRussConfig('punisher gatling cannon'),
    'Leman Russ Vanquisher': lemanRussConfig('vanquisher battle cannon'),
    'Rogal Dorn Battle Tank': sharedAstra['Rogal Dorn Commander'],
    'Cadian Shock Troops': shockTroopsConfig(),
    'Death Korps Of Krieg': shockTroopsConfig(),
    'Krieg Command Squad': fixed('Fixed loadout: Lord Commissar with laspistol and power weapon; 1 Veteran Guardsman with laspistol and chainsword; 1 Veteran Guardsman with laspistol, close combat weapon, alchemyk counteragents, and servo-scribes; 1 Veteran Guardsman with lasgun, close combat weapon, and master vox; 1 Veteran Guardsman with lasgun, close combat weapon, and regimental standard; 1 Veteran Guardsman with boltgun and close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'laspistol', 3);
      add(ctx, q, 'power weapon', 1);
      add(ctx, q, 'chainsword', 1);
      add(ctx, q, 'alchemyk counteragents', 1);
      add(ctx, q, 'servo-scribes', 1);
      add(ctx, q, 'lasgun', 2);
      add(ctx, q, 'master vox', 1);
      add(ctx, q, 'regimental standard', 1);
      add(ctx, q, 'boltgun', 1);
      add(ctx, q, 'close combat weapon', 5);
      return q;
    })
  };

  Object.keys(broodBrothersConfigs).forEach(name => {
    if (broodBrothersConfigs[name] && !sharedAstra[name]) sharedAstra[name] = broodBrothersConfigs[name];
  });

  broodBrothersUnits.forEach(name => {
    if (sharedAstra[name] && !registry['genestealer-cults'][name]) registry['genestealer-cults'][name] = sharedAstra[name];
  });

  tyranidCarryOverUnits.forEach(name => {
    if (sharedTyranids[name] && !registry['genestealer-cults'][name]) registry['genestealer-cults'][name] = sharedTyranids[name];
  });

  registry['genestealer-cults']['Acolyte Hybrids With Autopistols'] = {
    sections: [{
      title: 'Squad options',
      description: 'Assign heavy mining tools, cult icon, and the Leader melee profile.',
      controls: [
        { key: 'cult_icon', label: 'Cult icon', max: 1 },
        { key: 'heavy_mining_tool', label: 'Heavy mining tool', max: models => Math.floor(Number(models || 0) / 5) * 3 },
        { key: 'leader_bio_weapons', label: 'Leaderâ€™s bio-weapons', max: 1 }
      ]
    }],
    quantities: ctx => {
      const q = {};
      const tools = number(ctx, 'heavy_mining_tool');
      const leaderBio = number(ctx, 'leader_bio_weapons');
      const icon = number(ctx, 'cult_icon');
      if (tools > Math.max(0, ctx.modelCount - 1)) ctx.errors.push('Too many heavy mining tools for this Acolyte unit.');
      add(ctx, q, 'cult icon', icon);
      add(ctx, q, 'autopistol', ctx.modelCount - tools - icon);
      add(ctx, q, 'leaderâ€™s bio-weapons', leaderBio);
      add(ctx, q, 'heavy mining tool', tools);
      add(ctx, q, 'cult claws and knife', Math.max(0, ctx.modelCount - tools - leaderBio));
      return q;
    }
  };

  registry['genestealer-cults']['Acolyte Hybrids With Hand Flamers'] = {
    sections: [{
      title: 'Squad options',
      description: 'Assign demolition charges, cult icon, and the Leader melee profile.',
      controls: [
        { key: 'cult_icon', label: 'Cult icon', max: 1 },
        { key: 'demolition_charges', label: 'Demolition charges', max: models => Math.floor(Number(models || 0) / 5) * 2 },
        { key: 'leader_bio_weapons', label: 'Leaderâ€™s bio-weapons', max: 1 }
      ]
    }],
    quantities: ctx => {
      const q = {};
      const demos = number(ctx, 'demolition_charges');
      const leaderBio = number(ctx, 'leader_bio_weapons');
      const icon = number(ctx, 'cult_icon');
      if (demos > Math.max(0, ctx.modelCount - 1)) ctx.errors.push('Too many demolition charge carriers for this Acolyte unit.');
      add(ctx, q, 'cult icon', icon);
      add(ctx, q, 'hand flamer', ctx.modelCount - demos - icon);
      add(ctx, q, 'leaderâ€™s bio-weapons', leaderBio);
      add(ctx, q, 'demolition charges', demos);
      add(ctx, q, 'cult claws and knife', Math.max(0, ctx.modelCount - leaderBio));
      return q;
    }
  };

  registry['genestealer-cults']['Atalan Jackals'] = {
    sections: [{
      title: 'Jackal specials',
      description: 'Assign Jackal special weapons and Wolfquad heavy weapons.',
      controls: [
        { key: 'grenade_launcher', label: 'Grenade launcher', max: models => Math.floor((Number(models || 0) - (Number(models || 0) >= 10 ? 2 : 1)) / 4) },
        { key: 'atalan_incinerator', label: 'Atalan incinerator', max: 2 },
        { key: 'power_weapon', label: 'Atalan power weapon', max: models => Math.floor((Number(models || 0) - (Number(models || 0) >= 10 ? 2 : 1)) / 4) * 2 },
        { key: 'mining_laser', label: 'Mining laser (Wolfquad)', max: models => Number(models || 0) >= 10 ? 2 : 1 }
      ]
    }],
    quantities: ctx => {
      const q = {};
      const wolfquads = ctx.modelCount >= 10 ? 2 : 1;
      const grenade = number(ctx, 'grenade_launcher');
      const incinerator = number(ctx, 'atalan_incinerator');
      const power = number(ctx, 'power_weapon');
      const laser = number(ctx, 'mining_laser');
      if (grenade + incinerator > Math.max(0, ctx.modelCount - wolfquads)) ctx.errors.push('Too many Jackal special weapon upgrades for the number of bikers.');
      add(ctx, q, 'grenade launcher â€“ frag', grenade);
      add(ctx, q, 'grenade launcher â€“ krak', grenade);
      add(ctx, q, 'atalan incinerator', incinerator);
      add(ctx, q, 'atalan power weapon', power);
      add(ctx, q, 'mining laser', laser);
      add(ctx, q, 'heavy stubber', Math.max(0, wolfquads - laser - incinerator));
      add(ctx, q, 'atalan small arms', ctx.modelCount);
      add(ctx, q, 'close combat weapon', ctx.modelCount - power);
      return q;
    }
  };

  registry['genestealer-cults']['Hybrid Metamorphs'] = {
    sections: [{
      title: 'Squad options',
      description: 'Assign hand flamers and a cult icon.',
      controls: [
        { key: 'hand_flamer', label: 'Hand flamer', max: models => Number(models || 0) },
        { key: 'cult_icon', label: 'Cult icon', max: 1 }
      ]
    }],
    quantities: ctx => {
      const q = {};
      const flamers = number(ctx, 'hand_flamer');
      const icon = number(ctx, 'cult_icon');
      add(ctx, q, 'cult icon', icon);
      add(ctx, q, 'hand flamer', flamers);
      add(ctx, q, 'autopistol', Math.max(0, ctx.modelCount - flamers - icon));
      add(ctx, q, 'leaderâ€™s bio-weapons', 1);
      add(ctx, q, 'metamorph mutations â€“ strike', ctx.modelCount - 1);
      add(ctx, q, 'metamorph mutations â€“ sweep', ctx.modelCount - 1);
      return q;
    }
  };

  registry['genestealer-cults']['Neophyte Hybrids'] = {
    sections: [{
      title: 'Leader wargear',
      description: 'Select the leader loadout and cult icon.',
      controls: [
        { type: 'select', key: 'leader_melee', label: 'Leader loadout', value: 'close combat weapon', options: [
          { value: 'close combat weapon', label: 'Hybrid firearm + close combat weapon' },
          { value: 'chainsword', label: 'Anointed pistol + chainsword' },
          { value: 'power weapon', label: 'Anointed pistol + power weapon' }
        ] },
        { key: 'cult_icon', label: 'Cult icon', max: 1 }
      ]
    }, {
      title: 'Special weapons',
      description: 'Assign special and heavy weapons among the Neophytes.',
      controls: [
        { key: 'flamer', label: 'Flamer', max: models => Number(models || 0) >= 20 ? 4 : 2 },
        { key: 'webber', label: 'Webber', max: models => Number(models || 0) >= 20 ? 4 : 2 },
        { key: 'grenade_launcher', label: 'Grenade launcher', max: models => Number(models || 0) >= 20 ? 4 : 2 },
        { key: 'heavy_stubber', label: 'Heavy stubber', max: models => Number(models || 0) >= 20 ? 4 : 2 },
        { key: 'mining_laser', label: 'Mining laser', max: models => Number(models || 0) >= 20 ? 4 : 2 },
        { key: 'seismic_cannon', label: 'Seismic cannon', max: models => Number(models || 0) >= 20 ? 4 : 2 }
      ]
    }],
    quantities: ctx => {
      const q = {};
      const specialWeapons = number(ctx, 'flamer') + number(ctx, 'webber') + number(ctx, 'grenade_launcher');
      const heavyWeapons = number(ctx, 'heavy_stubber') + number(ctx, 'mining_laser') + number(ctx, 'seismic_cannon');
      const specialLimit = ctx.modelCount >= 20 ? 4 : 2;
      const heavyLimit = ctx.modelCount >= 20 ? 4 : 2;
      const leaderMelee = select(ctx, 'leader_melee', 'close combat weapon');
      const icon = number(ctx, 'cult_icon');
      if (specialWeapons > specialLimit) ctx.errors.push(`Neophyte special weapons cannot exceed ${specialLimit} for this unit size.`);
      if (heavyWeapons > heavyLimit) ctx.errors.push(`Neophyte heavy weapons cannot exceed ${heavyLimit} for this unit size.`);
      if (leaderMelee !== 'close combat weapon') add(ctx, q, 'anointed pistol', 1);
      add(ctx, q, leaderMelee, 1);
      add(ctx, q, 'cult icon', icon);
      add(ctx, q, 'flamer', number(ctx, 'flamer'));
      add(ctx, q, 'webber', number(ctx, 'webber'));
      add(ctx, q, 'grenade launcher â€“ frag', number(ctx, 'grenade_launcher'));
      add(ctx, q, 'grenade launcher â€“ krak', number(ctx, 'grenade_launcher'));
      add(ctx, q, 'heavy stubber', number(ctx, 'heavy_stubber'));
      add(ctx, q, 'mining laser', number(ctx, 'mining_laser'));
      add(ctx, q, 'seismic cannon', number(ctx, 'seismic_cannon'));
      add(ctx, q, 'hybrid firearm', Math.max(0, ctx.modelCount - 1 - specialWeapons - heavyWeapons - (leaderMelee === 'close combat weapon' ? 0 : 1) - icon));
      add(ctx, q, 'close combat weapon', Math.max(0, ctx.modelCount - 1));
      return q;
    }
  };
}());
