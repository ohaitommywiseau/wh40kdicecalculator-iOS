(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'chaos-space-marines';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/chaos-space-marines/';

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

  root.byFaction[slug] = {
    faction: {
      id: 'CSM',
      name: 'Chaos Space Marines',
      slug: slug
    },
    units: {
      'Abaddon The Despoiler': single('Abaddon-The-Despoiler', 'Abaddon The Despoiler', 'This model is equipped with: Talon of Horus; Drach\'nyen.'),
      'Accursed Cultists': entry('Accursed-Cultists', ['5 Mutants', '3 Torments', '10 Mutants', '6 Torments'], '5 Mutants\n3 Torments\nOR\n10 Mutants\n6 Torments\nEvery Torment is equipped with: hideous mutations. Every Mutant is equipped with: blasphemous appendages.', [8, 16]),
      'Chaos Bikers': entry('Chaos-Bikers', ['3 Chaos Bikers', '6 Chaos Bikers'], '3 Chaos Bikers\nOR\n6 Chaos Bikers\nEvery model is equipped with: bolt pistol; combi-bolter; close combat weapon.', [3, 6]),
      'Chaos Land Raider': single('Chaos-Land-Raider', 'Chaos Land Raider', 'This model is equipped with: 2 soulshatter lascannons; twin heavy bolter; armoured tracks.'),
      'Chaos Lord': single('Chaos-Lord', 'Chaos Lord', 'This model is equipped with: plasma pistol; daemon hammer.'),
      'Chaos Lord In Terminator Armour': single('Chaos-Lord-In-Terminator-Armour', 'Chaos Lord In Terminator Armour', 'This model is equipped with: combi-bolter; exalted weapon.'),
      'Chaos Lord with Jump Pack': single('Chaos-Lord-with-Jump-Pack', 'Chaos Lord with Jump Pack', 'This model is equipped with: bolt pistol; accursed weapon.'),
      'Chaos Predator Annihilator': single('Chaos-Predator-Annihilator', 'Chaos Predator Annihilator', 'This model is equipped with: Predator twin lascannon; armoured tracks.'),
      'Chaos Predator Destructor': single('Chaos-Predator-Destructor', 'Chaos Predator Destructor', 'This model is equipped with: Predator autocannon; armoured tracks.'),
      'Chaos Rhino': single('Chaos-Rhino', 'Chaos Rhino', 'This model is equipped with: combi-bolter; armoured tracks.'),
      'Chaos Spawn': entry('Chaos-Spawn', ['2 Chaos Spawn', '4 Chaos Spawn'], '2 Chaos Spawn\nOR\n4 Chaos Spawn\nEvery model is equipped with: hideous mutations.', [2, 4]),
      'Chaos Vindicator': single('Chaos-Vindicator', 'Chaos Vindicator', 'This model is equipped with: demolisher cannon; armoured tracks.'),
      'Chaos Terminator Squad': entry('Chaos-Terminator-Squad', ['5 Chaos Terminators', '10 Chaos Terminators'], '5 Chaos Terminators\nOR\n10 Chaos Terminators\nEvery model is equipped with: combi-bolter; accursed weapon.', [5, 10]),
      'Chosen': entry('Chosen', ['5 Chosen', '10 Chosen'], '5 Chosen\nOR\n10 Chosen\nEvery model is equipped with: bolt pistol; boltgun; accursed weapon.', [5, 10]),
      'Cultist Firebrand': single('Cultist-Firebrand', 'Cultist Firebrand', 'This model is equipped with: balefire pike; close combat weapon.'),
      'Cultist Mob': entry('Cultist-Mob', ['10 Cultists', '20 Cultists'], '10 Cultists\nOR\n20 Cultists\nThe Cultist Champion is equipped with: autopistol; brutal assault weapon. Every Cultist is equipped with: autopistol; brutal assault weapon.', [10, 20]),
      'Cypher': single('Cypher', 'Cypher', 'This model is equipped with: Cypher\'s bolt pistols; close combat weapon.'),
      'Dark Apostle': entry('Dark-Apostle', ['1 Dark Apostle', '2 Dark Disciples'], '1 Dark Apostle\n2 Dark Disciples\nThe Dark Apostle is equipped with: accursed crozius; bolt pistol. Every Dark Disciple is equipped with: close combat weapon.', [3]),
      'Dark Commune': entry('Dark-Commune', ['1 Cult Demagogue', '1 Blessed Blade', '1 Iconarch', '1 Mindwitch'], '1 Cult Demagogue\n1 Blessed Blade\n1 Iconarch\n1 Mindwitch\nThe Cult Demagogue is equipped with: autopistol; commune stave. The Blessed Blade is equipped with: Commune blade. The Iconarch is equipped with: autopistol; close combat weapon. The Mindwitch is equipped with: autopistol; warp curse; close combat weapon.', [4]),
      'Defiler': single('Defiler', 'Defiler', 'This model is equipped with: battle cannon; defiler claws; defiler scourge; reaper autocannon; twin heavy flamer.'),
      'Fabius Bile': entry('Fabius-Bile', ['1 Fabius Bile', '1 Chirurgeon'], '1 Fabius Bile\n1 Chirurgeon\nFabius Bile is equipped with: Xyclos needler; Rod of Torment; The Chirurgeon\'s tools. The Chirurgeon is equipped with: close combat weapon.', [2]),
      'Fellgor Beastmen': entry('Fellgor-Beastmen', ['10 Fellgor Beastmen'], '10 Fellgor Beastmen\nThe Fellgor Champion is equipped with: autopistol; great weapon. Every Fellgor Beastman is equipped with: autopistol; close combat weapon.', [10]),
      'Forgefiend': single('Forgefiend', 'Forgefiend', 'This model is equipped with: ectoplasma cannon; 2 ectoplasma cannons; armoured limbs.'),
      'Haarken Worldclaimer': single('Haarken-Worldclaimer', 'Haarken Worldclaimer', 'This model is equipped with: Helspear; Herald\'s Talon.'),
      'Havocs': entry('Havocs', ['1 Havoc Champion', '4 Havocs'], '1 Havoc Champion\n4 Havocs\nThe Havoc Champion is equipped with: accursed weapon; plasma gun. Every Havoc is equipped with: close combat weapon; Havoc autocannon.', [5]),
      'Helbrute': single('Helbrute', 'Helbrute', 'This model is equipped with: multi-melta; Helbrute fist.'),
      'Heldrake': single('Heldrake', 'Heldrake', 'This model is equipped with: baleflamer; Heldrake claws.'),
      'Heretic Astartes Daemon Prince': single('Heretic-Astartes-Daemon-Prince', 'Heretic Astartes Daemon Prince', 'This model is equipped with: hellforged weapons.'),
      'Heretic Astartes Daemon Prince With Wings': single('Heretic-Astartes-Daemon-Prince-With-Wings', 'Heretic Astartes Daemon Prince With Wings', 'This model is equipped with: hellforged weapons.'),
      'Huron Blackheart': single('Huron-Blackheart', 'Huron Blackheart', 'This model is equipped with: Tyrant\'s Claw; Exalted weapon.'),
      'Khorne Berzerkers': entry('Khorne-Berzerkers', ['1 Khorne Berzerker Champion', '4 Khorne Berzerkers', '9 Khorne Berzerkers'], '1 Khorne Berzerker Champion\n4 Khorne Berzerkers\nOR\n1 Khorne Berzerker Champion\n9 Khorne Berzerkers\nThe Khorne Berzerker Champion is equipped with: bolt pistol; Berzerker chainblade. Every Khorne Berzerker is equipped with: bolt pistol; Berzerker chainblade.', [5, 10]),
      'Khorne Lord Of Skulls': single('Khorne-Lord-Of-Skulls', 'Khorne Lord Of Skulls', 'This model is equipped with: gorestorm cannon; Hades gatling cannon; skullhurler; great cleaver of Khorne; slaughter bladed limbs.'),
      'Legionaries': entry('Legionaries', ['1 Aspiring Champion', '4 Legionaries', '9 Legionaries'], '1 Aspiring Champion\n4 Legionaries\nOR\n1 Aspiring Champion\n9 Legionaries\nThe Aspiring Champion is equipped with: bolt pistol; boltgun; accursed weapon. Every Legionary is equipped with: bolt pistol; boltgun; close combat weapon.', [5, 10]),
      'Lord Discordant On Helstalker': single('Lord-Discordant-On-Helstalker', 'Lord Discordant On Helstalker', 'This model is equipped with: autocannon; bladed limbs; impaler chainglaive; mechatendrils; techno-virus injector.'),
      'Master Of Executions': single('Master-Of-Executions', 'Master Of Executions', 'This model is equipped with: axe of dismemberment; bolt pistol.'),
      'Master Of Possession': single('Master-Of-Possession', 'Master Of Possession', 'This model is equipped with: bolt pistol; Rite of Possession; staff of possession.'),
      'Masters of the Maelstrom': entry('Masters-of-the-Maelstrom', ['1 Master of the Maelstrom', '4 Terminator Bodyguards'], '1 Master of the Maelstrom\n4 Terminator Bodyguards\nThe Master of the Maelstrom is equipped with: combi-bolter; exalted weapon. Every Terminator Bodyguard is equipped with: combi-bolter; accursed weapon.', [5]),
      'Maulerfiend': single('Maulerfiend', 'Maulerfiend', 'This model is equipped with: lasher tendrils; maulerfiend fists.'),
      'Nemesis Claw': entry('Nemesis-Claw', ['1 Visionary', '4 Nemesis Claw'], '1 Visionary\n4 Nemesis Claw\nThe Visionary is equipped with: bolt pistol; Nostraman chainglaive. Every Nemesis Claw model is equipped with: bolt pistol; Astartes chainsword.', [5]),
      'Noctilith Crown': single('Noctilith-Crown', 'Noctilith Crown', 'This model is equipped with: lashing warp energies.'),
      'Obliterators': entry('Obliterators', ['2 Obliterators', '4 Obliterators'], '2 Obliterators\nOR\n4 Obliterators\nEvery model is equipped with: fleshmetal guns; crushing fists.', [2, 4]),
      'Noise Marines': entry('Noise-Marines', ['1 Noise Champion', '4 Noise Marines', '9 Noise Marines'], '1 Noise Champion\n4 Noise Marines\nOR\n1 Noise Champion\n9 Noise Marines\nThe Noise Champion is equipped with: bolt pistol; close combat weapon; sonic blaster. Every Noise Marine is equipped with: bolt pistol; close combat weapon; sonic blaster.', [5, 10]),
      'Plague Marines': entry('Plague-Marines', ['1 Plague Champion', '4 Plague Marines', '9 Plague Marines'], '1 Plague Champion\n4 Plague Marines\nOR\n1 Plague Champion\n9 Plague Marines\nThe Plague Champion is equipped with: bolt pistol; plague knives; boltgun. Every Plague Marine is equipped with: plague knives; boltgun.', [5, 10]),
      'Possessed': entry('Possessed', ['5 Possessed', '10 Possessed'], '5 Possessed\nOR\n10 Possessed\nEvery model is equipped with: hideous mutations.', [5, 10]),
      'Raptors': entry('Raptors', ['1 Raptor Champion', '4 Raptors', '9 Raptors'], '1 Raptor Champion\n4 Raptors\nOR\n1 Raptor Champion\n9 Raptors\nThe Raptor Champion is equipped with: bolt pistol; Astartes chainsword. Every Raptor is equipped with: bolt pistol; Astartes chainsword.', [5, 10]),
      'Red Corsairs Raiders': entry('Red-Corsairs-Raiders', ['5 Red Corsairs Raiders'], '5 Red Corsairs Raiders\nEach model is equipped with: boltgun; bolt pistol; reaver\'s blade.', [5]),
      'Red Corsairs Reave-Captain': single('Red-Corsairs-Reave-Captain', 'Red Corsairs Reave-Captain', 'This model is equipped with: bolt pistol; power sword.'),
      'Rubric Marines': entry('Rubric-Marines', ['1 Aspiring Sorcerer', '4 Rubric Marines', '9 Rubric Marines'], '1 Aspiring Sorcerer\n4 Rubric Marines\nOR\n1 Aspiring Sorcerer\n9 Rubric Marines\nThe Aspiring Sorcerer is equipped with: inferno bolt pistol; Malefic Curse; force weapon. Every Rubric Marine is equipped with: inferno boltgun; close combat weapon.', [5, 10]),
      'Sorcerer': single('Sorcerer', 'Sorcerer', 'This model is equipped with: bolt pistol; Infernal Gaze; force weapon.'),
      'Sorcerer In Terminator Armour': single('Sorcerer-In-Terminator-Armour', 'Sorcerer In Terminator Armour', 'This model is equipped with: combi-bolter; Infernal Gaze; force weapon.'),
      'Traitor Enforcer': entry('Traitor-Enforcer', ['1 Traitor Enforcer', '1 Traitor Ogryn'], '1 Traitor Enforcer\n1 Traitor Ogryn\nThe Traitor Enforcer is equipped with: bolt pistol; power fist. The Traitor Ogryn is equipped with: Ogryn weapons.', [2]),
      'Traitor Guardsmen Squad': entry('Traitor-Guardsmen-Squad', ['1 Traitor Sergeant', '9 Traitor Guardsmen'], '1 Traitor Sergeant\n9 Traitor Guardsmen\nThe Traitor Sergeant is equipped with: corrupted pistol; close combat weapon. Every Traitor Guardsman is equipped with: lasgun; close combat weapon.', [10]),
      'Vashtorr The Arkifane': single('Vashtorr-The-Arkifane', 'Vashtorr The Arkifane', 'This model is equipped with: Vashtorr\'s claw; Vashtorr\'s hammer.'),
      'Venomcrawler': single('Venomcrawler', 'Venomcrawler', 'This model is equipped with: 2 excruciator cannons; soulflayer tendrils and claws.'),
      'Warp Talons': entry('Warp-Talons', ['5 Warp Talons', '10 Warp Talons'], '5 Warp Talons\nOR\n10 Warp Talons\nEvery model is equipped with: warp claws.', [5, 10]),
      'Warpsmith': single('Warpsmith', 'Warpsmith', 'This model is equipped with: flamer tendril; melta tendril; plasma pistol; forge weapon.')
    }
  };
}());
