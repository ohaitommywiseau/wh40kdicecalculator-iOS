(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'genestealer-cults';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/genestealer-cults/';

  function entry(unitSlug, lines, text, allowed) {
    const sorted = allowed.slice().sort(function (a, b) { return a - b; });
    return {
      datasheet: baseUrl + unitSlug,
      text,
      lines,
      counts: {
        allowed: sorted,
        min: sorted[0],
        max: sorted[sorted.length - 1],
        sources: [{ min: sorted[0], max: sorted[sorted.length - 1], source: lines.join(' + ') }]
      }
    };
  }

  function single(unitSlug, name, loadout) {
    return entry(unitSlug, ['1 ' + name], '1 ' + name + '\n' + loadout, [1]);
  }

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

  root.byFaction[slug] = {
    faction: {
      id: 'GC',
      name: 'Genestealer Cults',
      slug: slug
    },
    units: {
      'Aberrants': entry('Aberrants', ['5 Aberrants', '10 Aberrants'], '5 Aberrants\nOR\n10 Aberrants\nEvery Aberrant is equipped with: Aberrant weapons.', [5, 10]),
      'Abominant': single('Abominant', 'Abominant', 'This model is equipped with: power sledgehammer.'),
      'Achilles Ridgerunners': entry('Achilles-Ridgerunners', ['1 Achilles Ridgerunner', '2 Achilles Ridgerunners', '3 Achilles Ridgerunners'], '1-3 Achilles Ridgerunners\nEvery model is equipped with: heavy mining laser; twin heavy stubbers; armoured hull; flare launcher.', [1, 2, 3]),
      'Acolyte Hybrids With Autopistols': entry('Acolyte-Hybrids-With-Autopistols', ['5 Acolyte Hybrids', '10 Acolyte Hybrids'], '5 Acolyte Hybrids\nOR\n10 Acolyte Hybrids\nEvery model is equipped with: autopistol; cult claws and knife.', [5, 10]),
      'Acolyte Hybrids With Hand Flamers': entry('Acolyte-Hybrids-With-Hand-Flamers', ['5 Acolyte Hybrids With Hand Flamers', '10 Acolyte Hybrids With Hand Flamers'], '5 Acolyte Hybrids With Hand Flamers\nOR\n10 Acolyte Hybrids With Hand Flamers\nEvery model is equipped with: hand flamer; cult claws and knife.', [5, 10]),
      'Acolyte Iconward': single('Acolyte-Iconward', 'Acolyte Iconward', 'This model is equipped with: autopistol; cult claws.'),
      'Atalan Jackals': entry('Atalan-Jackals', ['4 Atalan Jackals', '1 Atalan Wolfquad', '8 Atalan Jackals', '2 Atalan Wolfquads'], '4 Atalan Jackals\n1 Atalan Wolfquad\nOR\n8 Atalan Jackals\n2 Atalan Wolfquads\nEvery Atalan Jackal is equipped with: Atalan small arms; close combat weapon. Every Atalan Wolfquad is equipped with: Atalan small arms; heavy stubber; close combat weapon.', [5, 10]),
      'Benefictus': single('Benefictus', 'Benefictus', 'This model is equipped with: Psionic Cascade; close combat weapon.'),
      'Biophagus': single('Biophagus', 'Biophagus', 'This model is equipped with: autopistol; chemical vials; injector goad.'),
      'Clamavus': single('Clamavus', 'Clamavus', 'This model is equipped with: autopistol; close combat weapon.'),
      'Goliath Rockgrinder': single('Goliath-Rockgrinder', 'Goliath Rockgrinder', 'This model is equipped with: heavy mining laser; heavy stubber; drilldozer blade; demolition charge cache.'),
      'Goliath Truck': single('Goliath-Truck', 'Goliath Truck', 'This model is equipped with: heavy stubber; twin autocannon; demolition charge cache; armoured hull.'),
      'Hybrid Metamorphs': entry('Hybrid-Metamorphs', ['1 Metamorph Leader', '4 Hybrid Metamorphs', '9 Hybrid Metamorphs'], '1 Metamorph Leader\n4 Hybrid Metamorphs\nOR\n1 Metamorph Leader\n9 Hybrid Metamorphs\nThe Metamorph Leader is equipped with: autopistol; Leader\'s bio-weapons. Every Hybrid Metamorph is equipped with: autopistol; Metamorph mutations.', [5, 10]),
      'Jackal Alphus': single('Jackal-Alphus', 'Jackal Alphus', 'This model is equipped with: autopistol; cult sniper rifle; close combat weapon.'),
      'Kelermorph': single('Kelermorph', 'Kelermorph', 'This model is equipped with: liberator autostubs; close combat weapon.'),
      'Locus': single('Locus', 'Locus', 'This model is equipped with: Locus blades.'),
      'Magus': single('Magus', 'Magus', 'This model is equipped with: autopistol; Magus stave.'),
      'Neophyte Hybrids': entry('Neophyte-Hybrids', ['10 Neophyte Hybrids', '20 Neophyte Hybrids'], '10 Neophyte Hybrids\nOR\n20 Neophyte Hybrids\nEvery model is equipped with: autopistol; Hybrid firearm; close combat weapon.', [10, 20]),
      'Nexos': single('Nexos', 'Nexos', 'This model is equipped with: autopistol; close combat weapon.'),
      'Patriarch': single('Patriarch', 'Patriarch', 'This model is equipped with: Patriarch\'s claws.'),
      'Primus': single('Primus', 'Primus', 'This model is equipped with: scoped needle pistol; cult bonesword; toxin injector claw.'),
      'Purestrain Genestealers': entry('Purestrain-Genestealers', ['5 Purestrain Genestealers', '10 Purestrain Genestealers'], '5 Purestrain Genestealers\nOR\n10 Purestrain Genestealers\nEvery model is equipped with: cult claws and talons.', [5, 10]),
      'Reductus Saboteur': single('Reductus-Saboteur', 'Reductus Saboteur', 'This model is equipped with: autopistol; demolition charges; remote explosives; close combat weapon.'),
      'Sanctus': single('Sanctus', 'Sanctus', 'This model is equipped with: Sanctus bio-dagger.')
    }
  };

  const sharedAstra = root.byFaction['astra-militarum'] && root.byFaction['astra-militarum'].units;
  if (sharedAstra) {
    broodBrothersUnits.forEach(name => {
      if (sharedAstra[name] && !root.byFaction[slug].units[name]) root.byFaction[slug].units[name] = sharedAstra[name];
    });
  }

  const sharedTyranids = root.byFaction.tyranids && root.byFaction.tyranids.units;
  if (sharedTyranids) {
    tyranidCarryOverUnits.forEach(name => {
      if (sharedTyranids[name] && !root.byFaction[slug].units[name]) root.byFaction[slug].units[name] = sharedTyranids[name];
    });
  }
}());
