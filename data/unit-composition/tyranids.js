(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'tyranids';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/tyranids/';

  function entry(unitSlug, lines, text, allowed) {
    const sorted = allowed.slice().sort(function (a, b) { return a - b; });
    return {
      datasheet: baseUrl + unitSlug,
      text: text,
      lines: lines,
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
      id: 'TYR',
      name: 'Tyranids',
      slug: slug
    },
    units: {
      'Barbgaunts': entry('Barbgaunts', ['5 Barbgaunts', '10 Barbgaunts'], '5 Barbgaunts\nOR\n10 Barbgaunts\nEvery model is equipped with: barblauncher; chitinous claws and teeth.', [5, 10]),
      'Biovores': entry('Biovores', ['1 Biovore', '2 Biovores', '3 Biovores'], '1-3 Biovores\nEvery model is equipped with: Spore Mine launcher; chitin-barbed limbs.', [1, 2, 3]),
      'Broodlord': single('Broodlord', 'Broodlord', 'This model is equipped with: Broodlord claws and talons.'),
      'Carnifexes': entry('Carnifexes', ['1 Carnifex', '2 Carnifexes'], '1-2 Carnifexes\nEvery model is equipped with: Carnifex scything talons; Carnifex extra scything talons; chitinous claws and teeth.', [1, 2]),
      'Deathleaper': single('Deathleaper', 'Deathleaper', 'This model is equipped with: Lictor claws and talons.'),
      'Exocrine': single('Exocrine', 'Exocrine', 'This model is equipped with: bio-plasmic cannon; powerful limbs.'),
      'Gargoyles': entry('Gargoyles', ['10 Gargoyles', '20 Gargoyles'], '10 Gargoyles\nOR\n20 Gargoyles\nEvery model is equipped with: fleshborer; blinding venom.', [10, 20]),
      'Genestealers': entry('Genestealers', ['5 Genestealers', '10 Genestealers'], '5 Genestealers\nOR\n10 Genestealers\nEvery model is equipped with: Genestealer claws and talons.', [5, 10]),
      'Harpy': single('Harpy', 'Harpy', 'This model is equipped with: stinger salvoes; twin stranglethorn cannon; scything wings.'),
      'Harridan': single('Harridan', 'Harridan', 'This model is equipped with: 2 dire bio-cannons; gargantuan scything talons.'),
      'Haruspex': single('Haruspex', 'Haruspex', 'This model is equipped with: grasping tongue; ravenous maw; shovelling claws.'),
      'Hierophant': single('Hierophant', 'Hierophant', 'This model is equipped with: bio-plasma torrent; 2 dire bio-cannons; lashwhip pods; titanic scything talons.'),
      'Hive Crone': single('Hive-Crone', 'Hive Crone', 'This model is equipped with: drool cannon; stinger salvoes; tentaclids; scything wings; thorax spur.'),
      'Hive Guard': entry('Hive-Guard', ['3 Hive Guard', '6 Hive Guard'], '3 Hive Guard\nOR\n6 Hive Guard\nEvery model is equipped with: shockcannon; chitinous claws and teeth.', [3, 6]),
      'Hive Tyrant': single('Hive-Tyrant', 'Hive Tyrant', 'This model is equipped with: monstrous bonesword and lash whip; monstrous scything talons.'),
      'Hormagaunts': entry('Hormagaunts', ['10 Hormagaunts', '20 Hormagaunts'], '10 Hormagaunts\nOR\n20 Hormagaunts\nEvery model is equipped with: Hormagaunt talons.', [10, 20]),
      'Hyperadapted Raveners': entry('Hyperadapted-Raveners', ['1 Ravener Prime', '4 Raveners'], '1 Ravener Prime\n4 Raveners\nThe Ravener Prime is equipped with: Prime claws and talons. 3 Raveners are equipped with: Ravener heavy claws and talons. 1 Ravener is equipped with: venom bolt; Ravener heavy claws and talons.', [5]),
      'Lictor': single('Lictor', 'Lictor', 'This model is equipped with: Lictor claws and talons.'),
      'Maleceptor': single('Maleceptor', 'Maleceptor', 'This model is equipped with: massive scything talons; psychic overload.'),
      'Mawloc': single('Mawloc', 'Mawloc', 'This model is equipped with: distensible jaw; Mawloc scything talons.'),
      'Neurogaunts': entry('Neurogaunts', ['11 Neurogaunts', '22 Neurogaunts'], '1 Nodebeast and 10 Neurogaunts\nOR\n2 Nodebeasts and 20 Neurogaunts\nEvery model is equipped with: Xenos claws and teeth.', [11, 22]),
      'Neurolictor': single('Neurolictor', 'Neurolictor', 'This model is equipped with: piercing claws and talons.'),
      'Neurotyrant': single('Neurotyrant', 'Neurotyrant', 'This model is equipped with: neurotyrant claws and lashes; psychic scream.'),
      'Norn Assimilator': single('Norn-Assimilator', 'Norn Assimilator', 'This model is equipped with: assimilator talons; toxinjecter harpoon.'),
      'Norn Emissary': single('Norn-Emissary', 'Norn Emissary', 'This model is equipped with: monsterous rending claws; psychostatic torrent.'),
      'Old One Eye': single('Old-One-Eye', 'Old One Eye', 'This model is equipped with: Old One Eye\'s claws and talons.'),
      'Parasite Of Mortrex': single('Parasite-Of-Mortrex', 'Parasite Of Mortrex', 'This model is equipped with: barbed ovipositor; claws and talons.'),
      'Psychophage': single('Psychophage', 'Psychophage', 'This model is equipped with: psycholastic torrent; talons and betentacled maw.'),
      'Pyrovores': entry('Pyrovores', ['1 Pyrovore', '2 Pyrovores', '3 Pyrovores'], '1-3 Pyrovores\nEvery model is equipped with: flamespurt; chitin-barbed limbs.', [1, 2, 3]),
      'Raveners': entry('Raveners', ['3 Raveners', '6 Raveners'], '3 Raveners\nOR\n6 Raveners\nEvery model is equipped with: Ravener claws and talons; thoracic bio-weapon.', [3, 6]),
      'Ripper Swarms': entry('Ripper-Swarms', ['3 Ripper Swarms', '6 Ripper Swarms'], '3 Ripper Swarms\nOR\n6 Ripper Swarms\nEvery model is equipped with: Xenos claws and teeth.', [3, 6]),
      'Screamer-killer': single('Screamer-killer', 'Screamer-killer', 'This model is equipped with: bio-plasmic scream; Screamer-killer talons.'),
      'Sporocyst': single('Sporocyst', 'Sporocyst', 'This model is equipped with: Sporocyst bio-weapons; flensing whips.'),
      'Termagants': entry('Termagants', ['10 Termagants', '20 Termagants'], '10 Termagants\nOR\n20 Termagants\nEvery model is equipped with: fleshborer; chitinous claws and teeth.', [10, 20]),
      'Tervigon': single('Tervigon', 'Tervigon', 'This model is equipped with: stinger salvoes; massive scything talons.'),
      'The Swarmlord': single('The-Swarmlord', 'The Swarmlord', 'This model is equipped with: Synaptic pulse; bone sabres.'),
      'Toxicrene': single('Toxicrene', 'Toxicrene', 'This model is equipped with: massive toxic lashes.'),
      'Trygon': single('Trygon', 'Trygon', 'This model is equipped with: bio-electric pulse; Trygon scything talons.'),
      'Tyranid Prime with Lash Whip': single('Tyranid-Prime-with-Lash-Whip', 'Tyranid Prime with Lash Whip', 'This model is equipped with: 1 rending claw; 1 lash whip; 1 scything talons.'),
      'Tyranid Warriors With Melee Bio-weapons': entry('Tyranid-Warriors-With-Melee-Bio-weapons', ['3 Tyranid Warriors With Melee Bio-weapons', '6 Tyranid Warriors With Melee Bio-weapons'], '3 Tyranid Warriors With Melee Bio-weapons\nOR\n6 Tyranid Warriors With Melee Bio-weapons\nEvery model is equipped with: Tyranid Warrior claws and talons.', [3, 6]),
      'Tyranid Warriors With Ranged Bio-weapons': entry('Tyranid-Warriors-With-Ranged-Bio-weapons', ['3 Tyranid Warriors With Ranged Bio-weapons', '6 Tyranid Warriors With Ranged Bio-weapons'], '3 Tyranid Warriors With Ranged Bio-weapons\nOR\n6 Tyranid Warriors With Ranged Bio-weapons\nEvery model is equipped with: devourer; Tyranid Warrior claws and talons.', [3, 6]),
      'Tyrannocyte': single('Tyrannocyte', 'Tyrannocyte', 'This model is equipped with: Tyrannocyte bio-weapons; flensing whips.'),
      'Tyrannofex': single('Tyrannofex', 'Tyrannofex', 'This model is equipped with: fleshborer hive; stinger salvoes; powerful limbs.'),
      'Tyrant Guard': entry('Tyrant-Guard', ['3 Tyrant Guard', '6 Tyrant Guard'], '3 Tyrant Guard\nOR\n6 Tyrant Guard\nEvery model is equipped with: scything talons and rending claws.', [3, 6]),
      'Venomthropes': entry('Venomthropes', ['3 Venomthropes', '6 Venomthropes'], '3 Venomthropes\nOR\n6 Venomthropes\nEvery model is equipped with: toxic lashes.', [3, 6]),
      'Von Ryan\u2019s Leapers': entry('Von-Ryan-s-Leapers', ['3 Von Ryan\u2019s Leapers', '6 Von Ryan\u2019s Leapers'], '3 Von Ryan\u2019s Leapers\nOR\n6 Von Ryan\u2019s Leapers\nEvery model is equipped with: Leaper\u2019s talons.', [3, 6]),
      'Winged Hive Tyrant': single('Winged-Hive-Tyrant', 'Winged Hive Tyrant', 'This model is equipped with: monstrous bonesword and lash whip; Tyrant talons.'),
      'Winged Tyranid Prime': single('Winged-Tyranid-Prime', 'Winged Tyranid Prime', 'This model is equipped with: Prime talons.'),
      'Zoanthropes': entry('Zoanthropes', ['3 Zoanthropes', '6 Zoanthropes'], '3 Zoanthropes\nOR\n6 Zoanthropes\nEvery model is equipped with: Warp Blast; chitinous claws and teeth.', [3, 6])
    }
  };
}());
