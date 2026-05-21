(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'necrons';

  function entry(datasheet, lines, text, allowed) {
    const sorted = allowed.slice().sort(function (a, b) { return a - b; });
    return {
      datasheet: datasheet,
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
    return entry('https://wahapedia.ru/wh40k10ed/factions/necrons/' + unitSlug, ['1 ' + name], '1 ' + name + '\n' + loadout, [1]);
  }

  root.byFaction[slug] = {
    faction: {
      id: 'NEC',
      name: 'Necrons',
      slug: slug
    },
    units: {
      'Annihilation Barge': single('Annihilation-Barge', 'Annihilation Barge', 'This model is equipped with: gauss cannon; twin tesla destructor; armoured bulk.'),
      'Canoptek Doomstalker': single('Canoptek-Doomstalker', 'Canoptek Doomstalker', 'This model is equipped with: doomsday blaster; twin gauss flayer; Doomstalker limbs.'),
      'Canoptek Macrocytes': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Canoptek-Macrocytes', ['3 Canoptek Macrocytes', '6 Canoptek Macrocytes'], '3 Canoptek Macrocytes\nOR\n6 Canoptek Macrocytes\nEvery model is equipped with: gauss scalpel; claws.', [3, 6]),
      'Canoptek Reanimator': single('Canoptek-Reanimator', 'Canoptek Reanimator', 'This model is equipped with: 2 atomiser beams; Reanimator’s claws.'),
      'Canoptek Scarab Swarms': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Canoptek-Scarab-Swarms', ['3 Canoptek Scarab Swarms', '6 Canoptek Scarab Swarms'], '3 Canoptek Scarab Swarms\nOR\n6 Canoptek Scarab Swarms\nEvery model is equipped with: feeder mandibles.', [3, 6]),
      'Canoptek Spyders': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Canoptek-Spyders', ['1 Canoptek Spyder', '2 Canoptek Spyders', '3 Canoptek Spyders'], '1-3 Canoptek Spyders\nEvery model is equipped with: automaton claws.', [1, 2, 3]),
      'Canoptek Tomb Crawlers': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Canoptek-Tomb-Crawlers', ['3 Canoptek Tomb Crawlers', '6 Canoptek Tomb Crawlers'], '3 Canoptek Tomb Crawlers\nOR\n6 Canoptek Tomb Crawlers\nEvery model is equipped with: twin gauss reaper; claws.', [3, 6]),
      'Canoptek Wraiths': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Canoptek-Wraiths', ['3 Canoptek Wraiths', '6 Canoptek Wraiths'], '3 Canoptek Wraiths\nOR\n6 Canoptek Wraiths\nEvery model is equipped with: vicious claws.', [3, 6]),
      'Catacomb Command Barge': single('Catacomb-Command-Barge', 'Catacomb Command Barge', 'This model is equipped with: gauss cannon; staff of light.'),
      'Chronomancer': single('Chronomancer', 'Chronomancer', 'This model is equipped with: aeonstave.'),
      'Convergence Of Dominion': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Convergence-Of-Dominion', ['3 Starstele'], '3 Starstele\nEvery model is equipped with: transdimensional abductor.', [3]),
      'Cryptothralls': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Cryptothralls', ['2 Cryptothralls'], '2 Cryptothralls\nEvery model is equipped with: scouring eye; scythed limbs.', [2]),
      'C’tan Shard of the Deceiver': single('C-tan-Shard-of-the-Deceiver', 'C’tan Shard of the Deceiver', 'This model is equipped with: cosmic insanity; golden fists.'),
      'C’tan Shard of the Nightbringer': single('C-tan-Shard-of-the-Nightbringer', 'C’tan Shard of the Nightbringer', 'This model is equipped with: gaze of death; scythe of the Nightbringer.'),
      'C’tan Shard of the Void Dragon': single('C-tan-Shard-of-the-Void-Dragon', 'C’tan Shard of the Void Dragon', 'This model is equipped with: spear of the Void Dragon; voltaic storm; canoptek tail blades.'),
      'Deathmarks': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Deathmarks', ['5 Deathmarks', '10 Deathmarks'], '5 Deathmarks\nOR\n10 Deathmarks\nEvery model is equipped with: synaptic disintegrator; close combat weapon.', [5, 10]),
      'Doom Scythe': single('Doom-Scythe', 'Doom Scythe', 'This model is equipped with: heavy death ray; twin tesla destructor; armoured bulk.'),
      'Doomsday Ark': single('Doomsday-Ark', 'Doomsday Ark', 'This model is equipped with: doomsday cannon; 2 gauss flayer arrays; armoured bulk.'),
      'Flayed Ones': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Flayed-Ones', ['5 Flayed Ones', '10 Flayed Ones'], '5 Flayed Ones\nOR\n10 Flayed Ones\nEvery model is equipped with: flayer claws.', [5, 10]),
      'Geomancer': single('Geomancer', 'Geomancer', 'This model is equipped with: tremorglaive.'),
      'Ghost Ark': single('Ghost-Ark', 'Ghost Ark', 'This model is equipped with: 2 gauss flayer arrays; armoured bulk.'),
      'Hexmark Destroyer': single('Hexmark-Destroyer', 'Hexmark Destroyer', 'This model is equipped with: enmitic disintegrator pistols; close combat weapon.'),
      'Illuminor Szeras': single('Illuminor-Szeras', 'Illuminor Szeras', 'This model is equipped with: eldritch lance; impaling legs.'),
      'Immortals': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Immortals', ['5 Immortals', '10 Immortals'], '5 Immortals\nOR\n10 Immortals\nEvery model is equipped with: gauss blaster; close combat weapon.', [5, 10]),
      'Imotekh The Stormlord': single('Imotekh-The-Stormlord', 'Imotekh The Stormlord', 'This model is equipped with: Gauntlet of Fire; Staff of the Destroyer.'),
      'Lokhust Destroyers': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Lokhust-Destroyers', ['2-6 Lokhust Destroyers'], '2-6 Lokhust Destroyers\nEvery model is equipped with: gauss cannon; close combat weapon.', [2, 3, 4, 5, 6]),
      'Lokhust Heavy Destroyers': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Lokhust-Heavy-Destroyers', ['1-3 Lokhust Heavy Destroyers'], '1-3 Lokhust Heavy Destroyers\nEvery model is equipped with: gauss destructor; close combat weapon.', [1, 2, 3]),
      'Lokhust Lord': single('Lokhust-Lord', 'Lokhust Lord', 'This model is equipped with: staff of light.'),
      'Lychguard': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Lychguard', ['5 Lychguard', '10 Lychguard'], '5 Lychguard\nOR\n10 Lychguard\nEvery model is equipped with: warscythe.', [5, 10]),
      'Monolith': single('Monolith', 'Monolith', 'This model is equipped with: 4 gauss flux arcs; particle whip; portal of exile.'),
      'Nekrosor Ammentar': single('Nekrosor-Ammentar', 'Nekrosor Ammentar', 'This model is equipped with: enmitic disintegrators; Unmaker Gauntlet; blade tail and whip coils; nullstone field generator.'),
      'Necron Warriors': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Necron-Warriors', ['10 Necron Warriors', '20 Necron Warriors'], '10 Necron Warriors\nOR\n20 Necron Warriors\nEvery model is equipped with: gauss flayer; close combat weapon.', [10, 20]),
      'Night Scythe': single('Night-Scythe', 'Night Scythe', 'This model is equipped with: twin tesla destructor; armoured bulk.'),
      'Obelisk': single('Obelisk', 'Obelisk', 'This model is equipped with: 4 tesla spheres; armoured bulk.'),
      'Ophydian Destroyers': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Ophydian-Destroyers', ['3 Ophydian Destroyers', '6 Ophydian Destroyers'], '3 Ophydian Destroyers\nOR\n6 Ophydian Destroyers\nEvery model is equipped with: Ophydian hyperphase weapons.', [3, 6]),
      'Orikan The Diviner': single('Orikan-The-Diviner', 'Orikan The Diviner', 'This model is equipped with: Staff of Tomorrow.'),
      'Overlord': single('Overlord', 'Overlord', 'This model is equipped with: tachyon arrow; Overlord’s blade.'),
      'Overlord with translocation shroud': single('Overlord-with-translocation-shroud', 'Overlord with translocation shroud', 'This model is equipped with: Overlord\'s blade; resurrection orb.'),
      'Plasmancer': single('Plasmancer', 'Plasmancer', 'This model is equipped with: plasmic lance.'),
      'Psychomancer': single('Psychomancer', 'Psychomancer', 'This model is equipped with: abyssal lance.'),
      'Royal Warden': single('Royal-Warden', 'Royal Warden', 'This model is equipped with: relic gauss blaster; close combat weapon.'),
      'Seraptek Heavy Construct': single('Seraptek-Heavy-Construct', 'Seraptek Heavy Construct', 'This model is equipped with: 2 singularity generators; titanic forelimbs.'),
      'Skorpekh Destroyers': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Skorpekh-Destroyers', ['3 Skorpekh Destroyers', '6 Skorpekh Destroyers'], '3 Skorpekh Destroyers\nOR\n6 Skorpekh Destroyers\nEvery model is equipped with: Skorpekh hyperphase weapons.', [3, 6]),
      'Skorpekh Lord': single('Skorpekh-Lord', 'Skorpekh Lord', 'This model is equipped with: enmitic annihilator; flensing claw; hyperphase harvester.'),
      'Technomancer': single('Technomancer', 'Technomancer', 'This model is equipped with: staff of light.'),
      'Tesseract Vault': single('Tesseract-Vault', 'Tesseract Vault', 'This model is equipped with: 4 tesla spheres; armoured bulk.'),
      'The Silent King': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/The-Silent-King', ['1 Szarekh', '2 Triarchal Menhirs'], '1 Szarekh\n2 Triarchal Menhirs\nSzarekh is equipped with: Sceptre of Eternal Glory; Staff of Stars; Weapons of the Final Triarch. Every Triarchal Menhir is equipped with: annihilator beam; armoured bulk.', [3]),
      'Tomb Blades': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Tomb-Blades', ['3 Tomb Blades', '6 Tomb Blades'], '3 Tomb Blades\nOR\n6 Tomb Blades\nEvery model is equipped with: twin gauss blaster; close combat weapon.', [3, 6]),
      'Transcendent C’tan': single('Transcendent-C-tan', 'Transcendent C’tan', 'This model is equipped with: seismic assault; crackling tendrils.'),
      'Trazyn The Infinite': single('Trazyn-The-Infinite', 'Trazyn The Infinite', 'This model is equipped with: Empathic Obliterator.'),
      'Triarch Praetorians': entry('https://wahapedia.ru/wh40k10ed/factions/necrons/Triarch-Praetorians', ['5 Triarch Praetorians', '10 Triarch Praetorians'], '5 Triarch Praetorians\nOR\n10 Triarch Praetorians\nEvery model is equipped with: rod of covenant.', [5, 10]),
      'Triarch Stalker': single('Triarch-Stalker', 'Triarch Stalker', 'This model is equipped with: heat ray; Stalker’s forelimbs.')
    }
  };
}());
