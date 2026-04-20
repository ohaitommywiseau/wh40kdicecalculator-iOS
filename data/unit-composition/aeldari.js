(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'aeldari';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/aeldari/';

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
      id: 'AE',
      name: 'Aeldari',
      slug: slug
    },
    units: {
      'Asurmen': single('Asurmen', 'Asurmen - EPIC HERO', 'This model is equipped with: Bloody Twins; Sword of Asur.'),
      'Autarch': single('Autarch', 'Autarch', 'This model is equipped with: shuriken pistol; star glaive.'),
      'Autarch Wayleaper': single('Autarch-Wayleaper', 'Autarch Wayleaper', 'This model is equipped with: shuriken pistol; star glaive.'),
      'Avatar of Khaine': single('Avatar-of-Khaine', 'Avatar of Khaine - EPIC HERO', 'This model is equipped with: the Wailing Doom.'),
      'Baharroth': single('Baharroth', 'Baharroth - EPIC HERO', 'This model is equipped with: Fury of the Tempest; Shining Blade.'),
      'Corsair Skyreavers': entry('Corsair-Skyreavers', ['5 Corsair Skyreavers', '10 Corsair Skyreavers'], '5 Corsair Skyreavers\nOR\n10 Corsair Skyreavers\nEvery model is equipped with: shuriken pistol; Corsair blade.', [5, 10]),
      'Corsair Voidreavers': entry('Corsair-Voidreavers', ['5 Corsair Voidreavers', '10 Corsair Voidreavers'], '5 Corsair Voidreavers\nOR\n10 Corsair Voidreavers\nEvery model is equipped with: shuriken pistol; power sword; close combat weapon.', [5, 10]),
      'Corsair Voidscarred': entry('Corsair-Voidscarred', ['1 Voidscarred Felarch', '4 Corsair Voidscarred', '9 Corsair Voidscarred'], '1 Voidscarred Felarch\n4 Corsair Voidscarred\nOR\n1 Voidscarred Felarch\n9 Corsair Voidscarred\nEvery Corsair Voidscarred and Voidscarred Felarch is equipped with: shuriken pistol; power sword; close combat weapon. A Shade Runner is equipped with: shuriken pistol; paired Hekatarii blades. A Soul Weaver is equipped with: shuriken pistol; power sword; channeller stones. A Way Seeker is equipped with: shuriken pistol; Executioner; witch staff.', [5, 10]),
      'Crimson Hunter': single('Crimson-Hunter', 'Crimson Hunter', 'This model is equipped with: 2 starcannons; pulse laser; wraithbone hull.'),
      'Dark Reapers': entry('Dark-Reapers', ['1 Dark Reaper Exarch', '4 Dark Reapers', '9 Dark Reapers'], '1 Dark Reaper Exarch\n4 Dark Reapers\nOR\n1 Dark Reaper Exarch\n9 Dark Reapers\nEvery model is equipped with: reaper launcher; close combat weapon.', [5, 10]),
      'Death Jester': single('Death-Jester', 'Death Jester', 'This model is equipped with: shrieker cannon; Jester\'s blade.'),
      'D-cannon Platform': single('D-cannon-Platform', 'D-cannon Platform', 'This model is equipped with: D-cannon; shuriken catapult; close combat weapon.'),
      'Dire Avengers': entry('Dire-Avengers', ['1 Dire Avenger Exarch', '4 Dire Avengers', '9 Dire Avengers'], '1 Dire Avenger Exarch\n4 Dire Avengers\nOR\n1 Dire Avenger Exarch\n9 Dire Avengers\nEvery model is equipped with: Avenger shuriken catapult; close combat weapon.', [5, 10]),
      'Eldrad Ulthran': single('Eldrad-Ulthran', 'Eldrad Ulthran - EPIC HERO', 'This model is equipped with: Mind War; shuriken pistol; Staff of Ulthamar and witchblade.'),
      'Falcon': single('Falcon', 'Falcon', 'This model is equipped with: pulse laser; scatter laser; twin shuriken catapult; wraithbone hull.'),
      'Farseer': single('Farseer', 'Farseer', 'This model is equipped with: Eldritch Storm; shuriken pistol; witchblade.'),
      'Farseer Skyrunner': single('Farseer-Skyrunner', 'Farseer Skyrunner', 'This model is equipped with: Eldritch Storm; shuriken pistol; twin shuriken catapult; witchblade.'),
      'Fire Dragons': entry('Fire-Dragons', ['1 Fire Dragon Exarch', '4 Fire Dragons', '9 Fire Dragons'], '1 Fire Dragon Exarch\n4 Fire Dragons\nOR\n1 Fire Dragon Exarch\n9 Fire Dragons\nThe Fire Dragon Exarch is equipped with: Exarch\'s Dragon fusion gun; close combat weapon.\nEvery Fire Dragon is equipped with: Dragon fusion gun; close combat weapon.', [5, 10]),
      'Fire Prism': single('Fire-Prism', 'Fire Prism', 'This model is equipped with: prism cannon; twin shuriken catapult; wraithbone hull.'),
      'Fuegan': single('Fuegan', 'Fuegan - EPIC HERO', 'This model is equipped with: Searsong; Fire Axe.'),
      'Guardian Defenders': entry('Guardian-Defenders', ['10 Guardian Defenders', '1 Heavy Weapon Platform'], '10 Guardian Defenders\n1 Heavy Weapon Platform\nEvery Guardian Defender is equipped with: shuriken catapult; close combat weapon.\nThe Heavy Weapon Platform is equipped with: shuriken cannon; close combat weapon.', [11]),
      'Hemlock Wraithfighter': single('Hemlock-Wraithfighter', 'Hemlock Wraithfighter', 'This model is equipped with: 2 heavy D-scythes; wraithbone hull.'),
      'Howling Banshees': entry('Howling-Banshees', ['1 Howling Banshee Exarch', '4 Howling Banshees', '9 Howling Banshees'], '1 Howling Banshee Exarch\n4 Howling Banshees\nOR\n1 Howling Banshee Exarch\n9 Howling Banshees\nEvery model is equipped with: shuriken pistol; Banshee blade.', [5, 10]),
      'Jain Zar': single('Jain-Zar', 'Jain Zar - EPIC HERO', 'This model is equipped with: Silent Death; Blade of Destruction.'),
      'Maugan Ra': single('Maugan-Ra', 'Maugan Ra - EPIC HERO', 'This model is equipped with: Maugetar.'),
      'Night Spinner': single('Night-Spinner', 'Night Spinner', 'This model is equipped with: doomweaver; twin shuriken catapult; wraithbone hull.'),
      'Phantom Titan': single('Phantom-Titan', 'Phantom Titan', 'This model is equipped with: D-bombard; Phantom pulsar; Phantom starcannon; voidstorm missile launcher; Phantom feet.'),
      'Rangers': entry('Rangers', ['5 Rangers', '10 Rangers'], '5 Rangers\nOR\n10 Rangers\nEvery model is equipped with: long rifle; shuriken pistol; close combat weapon.', [5, 10]),
      'Revenant Titan': single('Revenant-Titan', 'Revenant Titan', 'This model is equipped with: cloudburst missile launcher; Revenant pulsar; sonic lance; Revenant feet.', [1]),
      'Shadow Weaver Platform': single('Shadow-Weaver-Platform', 'Shadow Weaver Platform', 'This model is equipped with: shadow weaver; shuriken catapult; close combat weapon.'),
      'Shadowseer': single('Shadowseer', 'Shadowseer', 'This model is equipped with: shuriken pistol; miststave.'),
      'Shining Spears': entry('Shining-Spears', ['1 Shining Spear Exarch', '2 Shining Spears', '5 Shining Spears'], '1 Shining Spear Exarch\n2 Shining Spears\nOR\n1 Shining Spear Exarch\n5 Shining Spears\nEvery model is equipped with: laser lance; twin shuriken catapult.', [3, 6]),
      'Shroud Runners': entry('Shroud-Runners', ['3 Shroud Runners', '6 Shroud Runners'], '3 Shroud Runners\nOR\n6 Shroud Runners\nEvery model is equipped with: long rifle; scatter laser; shuriken pistol; close combat weapon.', [3, 6]),
      'Skyweavers': entry('Skyweavers', ['2 Skyweavers', '4 Skyweavers'], '2 Skyweavers\nOR\n4 Skyweavers\nEvery model is equipped with: shuriken cannon; star bolas; close combat weapon.', [2, 4]),
      'Solitaire': single('Solitaire', 'Solitaire', 'This model is equipped with: Solitaire weapons.'),
      'Spiritseer': single('Spiritseer', 'Spiritseer', 'This model is equipped with: shuriken pistol; witch staff.'),
      'Starfangs': entry('Starfangs', ['1 Starfangs', '2 Starfangs'], '1 Starfangs\nOR\n2 Starfangs\nEvery model is equipped with: disintegrator cannon; Starfang grenade launcher; wraithbone hull.', [1, 2]),
      'Starweaver': single('Starweaver', 'Starweaver', 'This model is equipped with: 2 shuriken cannons; close combat weapon.'),
      'Storm Guardians': entry('Storm-Guardians', ['10 Storm Guardians', '1 Serpent’s Scale Platform'], '10 Storm Guardians\n1 Serpent’s Scale Platform\nEvery Storm Guardian is equipped with: shuriken pistol; close combat weapon.\nThe Serpent’s Scale Platform is equipped with: close combat weapon; Serpent shield.', [11]),
      'Striking Scorpions': entry('Striking-Scorpions', ['1 Striking Scorpion Exarch', '4 Striking Scorpions', '9 Striking Scorpions'], '1 Striking Scorpion Exarch\n4 Striking Scorpions\nOR\n1 Striking Scorpion Exarch\n9 Striking Scorpions\nThe Striking Scorpion Exarch is equipped with: shuriken pistol; Scorpion chainsword; Scorpion’s claw.\nEvery Striking Scorpion is equipped with: shuriken pistol; Scorpion chainsword.', [5, 10]),
      'Swooping Hawks': entry('Swooping-Hawks', ['1 Swooping Hawk Exarch', '4 Swooping Hawks', '9 Swooping Hawks'], '1 Swooping Hawk Exarch\n4 Swooping Hawks\nOR\n1 Swooping Hawk Exarch\n9 Swooping Hawks\nThe Swooping Hawk Exarch is equipped with: Hawk\'s talon; close combat weapon.\nEvery Swooping Hawk is equipped with: lasblaster; close combat weapon.', [5, 10]),
      'The Visarch': single('The-Visarch', 'The Visarch - EPIC HERO', 'This model is equipped with: Asu-var.'),
      'The Yncarne': single('The-Yncarne', 'The Yncarne - EPIC HERO', 'This model is equipped with: swirling soul energy; Vilith-zhar.'),
      'Troupe': entry('Troupe', ['5 Troupe Players', '11 Troupe Players'], '5 Troupe Players\nOR\n11 Troupe Players\nEvery model is equipped with: shuriken pistol; Harlequin\'s blade.', [5, 11]),
      'Troupe Master': single('Troupe-Master', 'Troupe Master', 'This model is equipped with: shuriken pistol; Troupe Master\'s blade.'),
      'Vibro Cannon Platform': single('Vibro-Cannon-Platform', 'Vibro Cannon Platform', 'This model is equipped with: vibro cannon; shuriken catapult; close combat weapon.'),
      'Voidweaver': single('Voidweaver', 'Voidweaver', 'This model is equipped with: 2 shuriken cannons; Voidweaver haywire cannon; close combat weapon.'),
      'Vypers': entry('Vypers', ['1-3 Vypers'], '1-3 Vypers\nEvery model is equipped with: shuriken cannon; bright lance; wraithbone hull.', [1, 2, 3]),
      'War Walkers': entry('War-Walkers', ['1-3 War Walkers'], '1-3 War Walkers\nEvery model is equipped with: 2 shuriken cannons; War Walker feet.', [1, 2, 3]),
      'Warlock': single('Warlock', 'Warlock', 'This model is equipped with: Destructor; shuriken pistol; witchblade.'),
      'Warlock Conclave': entry('Warlock-Conclave', ['2 Warlocks', '4 Warlocks'], '2 Warlocks\nOR\n4 Warlocks\nEvery model is equipped with: Destructor; shuriken pistol; witchblade.', [2, 4]),
      'Warlock Skyrunners': entry('Warlock-Skyrunners', ['1 Warlock Skyrunner', '2 Warlock Skyrunners'], '1 Warlock Skyrunner\nOR\n2 Warlock Skyrunners\nEvery model is equipped with: Destructor; shuriken pistol; twin shuriken catapult; witchblade.', [1, 2]),
      'Warp Spiders': entry('Warp-Spiders', ['1 Warp Spider Exarch', '4 Warp Spiders', '9 Warp Spiders'], '1 Warp Spider Exarch\n4 Warp Spiders\nOR\n1 Warp Spider Exarch\n9 Warp Spiders\nThe Warp Spider Exarch is equipped with: Exarch\'s death spinner; close combat weapon.\nEvery Warp Spider is equipped with: death spinner; close combat weapon.', [5, 10]),
      'Wave Serpent': single('Wave-Serpent', 'Wave Serpent', 'This model is equipped with: twin shuriken cannon; twin shuriken catapult; wraithbone hull.'),
      'Windriders': entry('Windriders', ['3 Windriders', '6 Windriders'], '3 Windriders\nOR\n6 Windriders\nEvery model is equipped with: twin shuriken catapult; close combat weapon.', [3, 6]),
      'Wraithblades': entry('Wraithblades', ['5 Wraithblades', '10 Wraithblades'], '5 Wraithblades\nOR\n10 Wraithblades\nEvery model is equipped with: ghostswords.', [5, 10]),
      'Wraithguard': entry('Wraithguard', ['5 Wraithguard', '10 Wraithguard'], '5 Wraithguard\nOR\n10 Wraithguard\nEvery model is equipped with: wraithcannon; close combat weapon.', [5, 10]),
      'Wraithknight': single('Wraithknight', 'Wraithknight', 'This model is equipped with: suncannon; titanic feet; scattershield.'),
      'Wraithknight with Ghostglaive': single('Wraithknight-with-Ghostglaive', 'Wraithknight with Ghostglaive', 'This model is equipped with: titanic ghostglaive; scattershield.'),
      'Wraithlord': single('Wraithlord', 'Wraithlord', 'This model is equipped with: 2 shuriken catapults; wraithbone fists.'),
      'Ynnari Archon': single('Ynnari-Archon', 'Ynnari Archon', 'This model is equipped with: splinter pistol; huskblade.'),
      'Ynnari Incubi': entry('Ynnari-Incubi', ['1 Klaivex', '4 Incubi', '9 Incubi'], '1 Klaivex\n4 Incubi\nOR\n1 Klaivex\n9 Incubi\nEvery model is equipped with: klaive.', [5, 10]),
      'Ynnari Kabalite Warriors': entry('Ynnari-Kabalite-Warriors', ['10 Ynnari Kabalite Warriors'], '10 Ynnari Kabalite Warriors\nEvery model is equipped with: splinter rifle; close combat weapon.', [10]),
      'Ynnari Raider': single('Ynnari-Raider', 'Ynnari Raider', 'This model is equipped with: dark lance; bladevanes.'),
      'Ynnari Reavers': entry('Ynnari-Reavers', ['3 Ynnari Reavers', '6 Ynnari Reavers'], '3 Ynnari Reavers\nOR\n6 Ynnari Reavers\nEvery model is equipped with: splinter pistol; splinter rifle; bladevanes.', [3, 6]),
      'Ynnari Succubus': single('Ynnari-Succubus', 'Ynnari Succubus', 'This model is equipped with: Succubus weapons.'),
      'Ynnari Venom': single('Ynnari-Venom', 'Ynnari Venom', 'This model is equipped with: splinter cannon; twin splinter rifle; bladevanes.'),
      'Ynnari Wyches': entry('Ynnari-Wyches', ['10 Ynnari Wyches'], '10 Ynnari Wyches\nEvery model is equipped with: splinter pistol; Hekatarii blade.', [10]),
      'Yvraine': single('Yvraine', 'Yvraine - EPIC HERO', 'This model is equipped with: Storm of Whispers; Kha-vir.'),
      'Prince Yriel': single('Prince-Yriel', 'Prince Yriel - EPIC HERO', 'This model is equipped with: Eye of Wrath; shuriken pistol; Spear of Twilight.'),
      'Kharseth': single('Kharseth', 'Kharseth - EPIC HERO', 'This model is equipped with: Dread of the Deep Void; Waystave.'),
      'Lhykhis': single('Lhykhis', 'Lhykhis - EPIC HERO', 'This model is equipped with: Brood Twain; Spider\'s Fangs; Weaverender.')
    }
  };
}());
