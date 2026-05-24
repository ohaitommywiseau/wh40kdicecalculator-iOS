(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'drukhari';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/drukhari/';

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
      id: 'DRU',
      name: 'Drukhari',
      slug: slug
    },
    units: {
      'Archon': single('Archon', 'Archon', 'This model is equipped with: splinter pistol; huskblade; shadowfield.'),
      'Corsair Skyreavers': entry('Corsair-Skyreavers', ['5 Corsair Skyreavers', '10 Corsair Skyreavers'], '5 Corsair Skyreavers\nOR\n10 Corsair Skyreavers\nEvery model is equipped with: shuriken pistol; Corsair blade.', [5, 10]),
      'Corsair Voidreavers': entry('Corsair-Voidreavers', ['5 Corsair Voidreavers', '10 Corsair Voidreavers'], '5 Corsair Voidreavers\nOR\n10 Corsair Voidreavers\nEvery model is equipped with: shuriken pistol; power sword; close combat weapon.', [5, 10]),
      'Corsair Voidscarred': entry('Corsair-Voidscarred', ['1 Voidscarred Felarch', '4 Corsair Voidscarred', '9 Corsair Voidscarred'], '1 Voidscarred Felarch\n4 Corsair Voidscarred\nOR\n1 Voidscarred Felarch\n9 Corsair Voidscarred\nEvery Corsair Voidscarred and Voidscarred Felarch is equipped with: shuriken pistol; power sword; close combat weapon. A Shade Runner is equipped with: shuriken pistol; paired Hekatarii blades. A Soul Weaver is equipped with: shuriken pistol; power sword; channeller stones. A Way Seeker is equipped with: shuriken pistol; Executioner; witch staff.', [5, 10]),
      'Cronos': entry('Cronos', ['1 Cronos', '2 Cronos'], '1 Cronos\nOR\n2 Cronos\nEvery Cronos is equipped with: spirit syphon; spirit-leech tentacles.', [1, 2]),
      'Death Jester': single('Death-Jester', 'Death Jester', 'This model is equipped with: shrieker cannon; Jester\'s blade.'),
      'Drazhar': single('Drazhar', 'Drazhar - EPIC HERO', 'This model is equipped with: Executioner\'s demiklaives.'),
      'Haemonculus': single('Haemonculus', 'Haemonculus', 'This model is equipped with: stinger pistol; Haemonculus tools and scissorhands.'),
      'Hand of the Archon': entry('Hand-of-the-Archon', ['10 Hand of the Archon'], '10 Hand of the Archon\nEvery model is equipped with: splinter rifle; close combat weapon.', [10]),
      'Hellions': entry('Hellions', ['5 Hellions', '10 Hellions'], '5 Hellions\nOR\n10 Hellions\nEvery model is equipped with: splinter pods; hellglaive.', [5, 10]),
      'Incubi': entry('Incubi', ['1 Klaivex', '4 Incubi', '9 Incubi'], '1 Klaivex\n4 Incubi\nOR\n1 Klaivex\n9 Incubi\nEvery model is equipped with: klaive.', [5, 10]),
      'Kharseth': single('Kharseth', 'Kharseth - EPIC HERO', 'This model is equipped with: Dread of the Deep Void; Waystave.'),
      'Kabalite Warriors': entry('Kabalite-Warriors', ['10 Kabalite Warriors'], '10 Kabalite Warriors\nEvery model is equipped with: splinter rifle; close combat weapon.', [10]),
      'Lady Malys': single('Lady-Malys', 'Lady Malys - EPIC HERO', 'This model is equipped with: Lady\'s Blade; razor fan.'),
      'Lelith Hesperax': single('Lelith-Hesperax', 'Lelith Hesperax - EPIC HERO', 'This model is equipped with: Lelith\'s blades.'),
      'Mandrakes': entry('Mandrakes', ['5 Mandrakes', '10 Mandrakes'], '5 Mandrakes\nOR\n10 Mandrakes\nEvery model is equipped with: baleblast; glimmersteel blade.', [5, 10]),
      'Prince Yriel': single('Prince-Yriel', 'Prince Yriel - EPIC HERO', 'This model is equipped with: Eye of Wrath; shuriken pistol; Spear of Twilight.'),
      'Raider': single('Raider', 'Raider', 'This model is equipped with: dark lance; bladevanes and chainsnares.'),
      'Ravager': single('Ravager', 'Ravager', 'This model is equipped with: 3 dark lances; bladevanes.'),
      'Razorwing Jetfighter': single('Razorwing-Jetfighter', 'Razorwing Jetfighter', 'This model is equipped with: 2 dark lances; Razorwing missiles; twin splinter rifle; bladed wings.'),
      'Reavers': entry('Reavers', ['3 Reavers', '6 Reavers'], '3 Reavers\nOR\n6 Reavers\nEvery model is equipped with: splinter pistol; splinter rifle; bladevanes.', [3, 6]),
      'Scourges with Heavy Weapons': entry('Scourges-with-Heavy-Weapons', ['1 Solarite', '4 Scourges'], '1 Solarite\n4 Scourges\nThe Solarite is equipped with: shardcarbine; close combat weapon.\nEvery Scourge is equipped with: splinter cannon; close combat weapon.', [5]),
      'Scourges with Shardcarbines': entry('Scourges-with-Shardcarbines', ['1 Solarite', '4 Scourges', '9 Scourges'], '1 Solarite\n4 Scourges\nOR\n1 Solarite\n9 Scourges\nThe Solarite is equipped with: shardcarbine; close combat weapon.\nEvery Scourge is equipped with: shardcarbine; close combat weapon.', [5, 10]),
      'Shadowseer': single('Shadowseer', 'Shadowseer', 'This model is equipped with: shuriken pistol; miststave.'),
      'Skyweavers': entry('Skyweavers', ['2 Skyweavers', '4 Skyweavers'], '2 Skyweavers\nOR\n4 Skyweavers\nEvery model is equipped with: shuriken cannon; star bolas; close combat weapon.', [2, 4]),
      'Solitaire': single('Solitaire', 'Solitaire', 'This model is equipped with: Solitaire weapons.'),
      'Starfangs': entry('Starfangs', ['1 Starfangs', '2 Starfangs'], '1 Starfangs\nOR\n2 Starfangs\nEvery model is equipped with: disintegrator cannon; Starfang grenade launcher; wraithbone hull.', [1, 2]),
      'Starweaver': single('Starweaver', 'Starweaver', 'This model is equipped with: 2 shuriken cannons; close combat weapon.'),
      'Succubus': single('Succubus', 'Succubus', 'This model is equipped with: Archite glaive and agoniser.'),
      'Talos': entry('Talos', ['1 Talos', '2 Talos'], '1 Talos\nOR\n2 Talos\nEvery model is equipped with: twin splinter cannon; 2 macro-scalpels.', [1, 2]),
      'Troupe': entry('Troupe', ['5 Troupe Players', '11 Troupe Players'], '5 Troupe Players\nOR\n11 Troupe Players\nEvery model is equipped with: shuriken pistol; Harlequin\'s blade.', [5, 11]),
      'Troupe Master': single('Troupe-Master', 'Troupe Master', 'This model is equipped with: shuriken pistol; Troupe Master\'s blade.'),
      'Venom': single('Venom', 'Venom', 'This model is equipped with: splinter cannon; twin splinter rifle; bladevanes.'),
      'Voidraven Bomber': single('Voidraven-Bomber', 'Voidraven Bomber', 'This model is equipped with: 2 void lances; bladed wings.'),
      'Voidweaver': single('Voidweaver', 'Voidweaver', 'This model is equipped with: 2 shuriken cannons; Voidweaver haywire cannon; close combat weapon.'),
      'Wracks': entry('Wracks', ['5 Wracks', '10 Wracks'], '5 Wracks\nOR\n10 Wracks\nEvery model is equipped with: twin torturer\'s tools.', [5, 10]),
      'Wyches': entry('Wyches', ['10 Wyches'], '10 Wyches\nEvery model is equipped with: splinter pistol; Hekatarii blade.', [10])
    }
  };
}());
