(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'adeptus-custodes';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/';

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
      id: 'AC',
      name: 'Adeptus Custodes',
      slug: slug
    },
    units: {
      'Agamatus Custodians': entry('Agamatus-Custodians', ['3 Agamatus Custodians', '6 Agamatus Custodians'], '3 Agamatus Custodians\nOR\n6 Agamatus Custodians\nEvery model is equipped with: lastrum bolt cannon; interceptor lance.', [3, 6]),
      'Aleya': single('Aleya', 'Aleya - EPIC HERO', 'This model is equipped with: Somnus.'),
      'Allarus Custodians': entry('Allarus-Custodians', ['2 Allarus Custodians', '3 Allarus Custodians', '5 Allarus Custodians', '6 Allarus Custodians'], '2 Allarus Custodians\nOR\n3 Allarus Custodians\nOR\n5 Allarus Custodians\nOR\n6 Allarus Custodians\nEvery model is equipped with: balistus grenade launcher; guardian spear.', [2, 3, 5, 6]),
      'Anathema Psykana Rhino': single('Anathema-Psykana-Rhino', 'Anathema Psykana Rhino', 'This model is equipped with: storm bolter; armoured tracks.'),
      'Aquilon Custodians': entry('Aquilon-Custodians', ['3 Aquilon Custodians', '6 Aquilon Custodians'], '3 Aquilon Custodians\nOR\n6 Aquilon Custodians\nEvery model is equipped with: lastrum storm bolter; solerite power gauntlet.', [3, 6]),
      'Ares Gunship': single('Ares-Gunship', 'Ares Gunship', 'This model is equipped with: 2 arachnus heavy blaze cannons; arachnus magna-blaze cannon; armoured hull.'),
      'Blade Champion': single('Blade-Champion', 'Blade Champion', 'This model is equipped with: vaultswords.'),
      'Caladius Grav-tank': single('Caladius-Grav-tank', 'Caladius Grav-tank', 'This model is equipped with: twin iliastus accelerator cannon; twin lastrum bolt cannon; armoured hull.'),
      'Contemptor-achillus Dreadnought': single('Contemptor-achillus-Dreadnought', 'Contemptor-achillus Dreadnought', 'This model is equipped with: 2 lastrum storm bolters; Achillus dreadspear.'),
      'Contemptor-galatus Dreadnought': single('Contemptor-galatus-Dreadnought', 'Contemptor-galatus Dreadnought', 'This model is equipped with: Galatus warblade.'),
      'Coronus Grav-carrier': single('Coronus-Grav-carrier', 'Coronus Grav-carrier', 'This model is equipped with: twin arachnus blaze cannon; twin lastrum bolt cannon; armoured hull.'),
      'Custodian Guard': entry('Custodian-Guard', ['4 Custodian Guard', '5 Custodian Guard'], '4 Custodian Guard\nOR\n5 Custodian Guard\nEvery model is equipped with: guardian spear.', [4, 5]),
      'Custodian Guard With Adrasite And Pyrithite Spears': entry('Custodian-Guard-With-Adrasite-And-Pyrithite-Spears', ['5 Custodian Guard'], '5 Custodian Guard\nEvery model is equipped with: adrasite spear.', [5]),
      'Custodian Wardens': entry('Custodian-Wardens', ['4 Custodian Wardens', '5 Custodian Wardens'], '4 Custodian Wardens\nOR\n5 Custodian Wardens\nEvery model is equipped with: guardian spear.', [4, 5]),
      'Knight-centura': single('Knight-centura', 'Knight-centura', 'This model is equipped with: executioner greatblade.'),
      'Orion Assault Dropship': single('Orion-Assault-Dropship', 'Orion Assault Dropship', 'This model is equipped with: 2 arachnus heavy blaze cannons; 2 twin lastrum bolt cannons; 2 spiculus heavy bolt launchers; armoured hull.'),
      'Pallas Grav-attack': single('Pallas-Grav-attack', 'Pallas Grav-attack', 'This model is equipped with: twin arachnus blaze cannon; armoured hull.'),
      'Prosecutors': entry('Prosecutors', ['4 Prosecutors', '5 Prosecutors', '9 Prosecutors', '10 Prosecutors'], '4 Prosecutors\nOR\n5 Prosecutors\nOR\n9 Prosecutors\nOR\n10 Prosecutors\nEvery model is equipped with: boltgun; close combat weapon.', [4, 5, 9, 10]),
      'Sagittarum Custodians': entry('Sagittarum-Custodians', ['5 Sagittarum Custodians'], '5 Sagittarum Custodians\nEvery model is equipped with: adrastus bolt caliver; misericordia.', [5]),
      'Shield-captain': single('Shield-captain', 'Shield-captain', 'This model is equipped with: guardian spear.'),
      'Shield-captain In Allarus Terminator Armour': single('Shield-captain-In-Allarus-Terminator-Armour', 'Shield-captain In Allarus Terminator Armour', 'This model is equipped with: balistus grenade launcher; guardian spear.'),
      'Shield-captain On Dawneagle Jetbike': single('Shield-captain-On-Dawneagle-Jetbike', 'Shield-captain On Dawneagle Jetbike', 'This model is equipped with: salvo launcher; interceptor lance.'),
      'Telemon Heavy Dreadnought': single('Telemon-Heavy-Dreadnought', 'Telemon Heavy Dreadnought', 'This model is equipped with: 2 iliastus accelerator culverins; spiculus bolt launcher; armoured feet.'),
      'Trajann Valoris': single('Trajann-Valoris', 'Trajann Valoris - EPIC HERO', 'This model is equipped with: Eagle\'s Scream; Watcher\'s Axe.'),
      'Valerian': single('Valerian', 'Valerian - EPIC HERO', 'This model is equipped with: Gnosis.'),
      'Venatari Custodians': entry('Venatari-Custodians', ['3 Venatari Custodians', '6 Venatari Custodians'], '3 Venatari Custodians\nOR\n6 Venatari Custodians\nEvery model is equipped with: Venatari lance.', [3, 6]),
      'Venerable Contemptor Dreadnought': single('Venerable-Contemptor-Dreadnought', 'Venerable Contemptor Dreadnought', 'This model is equipped with: combi-bolter; multi-melta; Contemptor combat weapon.'),
      'Venerable Land Raider': single('Venerable-Land-Raider', 'Venerable Land Raider', 'This model is equipped with: 2 godhammer lascannons; twin heavy bolter; armoured tracks.'),
      'Vertus Praetors': entry('Vertus-Praetors', ['2 Vertus Praetors', '3 Vertus Praetors'], '2 Vertus Praetors\nOR\n3 Vertus Praetors\nEvery model is equipped with: salvo launcher; interceptor lance.', [2, 3]),
      'Vigilators': entry('Vigilators', ['4 Vigilators', '5 Vigilators', '9 Vigilators', '10 Vigilators'], '4 Vigilators\nOR\n5 Vigilators\nOR\n9 Vigilators\nOR\n10 Vigilators\nEvery model is equipped with: executioner greatblade.', [4, 5, 9, 10]),
      'Witchseekers': entry('Witchseekers', ['4 Witchseekers', '5 Witchseekers', '9 Witchseekers', '10 Witchseekers'], '4 Witchseekers\nOR\n5 Witchseekers\nOR\n9 Witchseekers\nOR\n10 Witchseekers\nEvery model is equipped with: Witchseeker flamer; close combat weapon.', [4, 5, 9, 10])
    }
  };
}());
