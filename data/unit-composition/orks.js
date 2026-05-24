(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'orks';

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
    return entry('https://wahapedia.ru/wh40k10ed/factions/orks/' + unitSlug, ['1 ' + name], '1 ' + name + '\n' + loadout, [1]);
  }

  root.byFaction[slug] = {
    faction: {
      id: 'ORK',
      name: 'Orks',
      slug: slug
    },
    units: {
      'Battlewagon': single('Battlewagon', 'Battlewagon', 'This model is equipped with: tracks and wheels.'),
      'Beast Snagga Boyz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Beast-Snagga-Boyz', ['1 Beast Snagga Nob', '9 Beast Snagga Boyz', '19 Beast Snagga Boyz'], '1 Beast Snagga Nob\n9 Beast Snagga Boyz\nOR\n1 Beast Snagga Nob\n19 Beast Snagga Boyz\nThe Beast Snagga Nob is equipped with: slugga; power snappa. Every Beast Snagga Boy is equipped with: slugga; choppa.', [10, 20]),
      'Beastboss': single('Beastboss', 'Beastboss', 'This model is equipped with: shoota; beastchoppa; Beast Snagga klaw.'),
      'Beastboss On Squigosaur': single('Beastboss-On-Squigosaur', 'Beastboss On Squigosaur', 'This model is equipped with: slugga; beastchoppa; Squigosaur’s jaws.'),
      'Big Mek': single('Big-Mek', 'Big Mek', 'This model is equipped with: kustom-mega blaster; power klaw.'),
      'Big Mek In Mega Armour': single('Big-Mek-In-Mega-Armour', 'Big Mek In Mega Armour', 'This model is equipped with: kustom-mega blaster; power klaw.'),
      'Big Mek With Shokk Attack Gun': single('Big-Mek-With-Shokk-Attack-Gun', 'Big Mek With Shokk Attack Gun', 'This model is equipped with: close combat weapon; shokk attack gun.'),
      'Big’ed Bossbunka': single('Big-ed-Bossbunka', 'Big’ed Bossbunka', 'This model is equipped with: 4 big shootas; 2 supa-rokkits; supa-kannon; armoured hull.'),
      'Blitza-bommer': single('Blitza-bommer', 'Blitza-bommer', 'This model is equipped with: big shoota; twin supa-shoota; armoured hull.'),
      'Boomdakka Snazzwagon': single('Boomdakka-Snazzwagon', 'Boomdakka Snazzwagon', 'This model is equipped with: big shoota; grot blasta; Mek speshul; spiked wheels.'),
      'Boss Snikrot': single('Boss-Snikrot', 'Boss Snikrot', 'This model is equipped with: slugga; Mork’s Teeth.'),
      'Boyz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Boyz', ['1 Boss Nob', '9 Boyz', '19 Boyz'], '1 Boss Nob\n9 Boyz\nOR\n1 Boss Nob\n19 Boyz\nThe Boss Nob is equipped with: slugga; big choppa. Every Boy is equipped with: slugga; choppa.', [10, 20]),
      'Breaka Boyz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Breaka-Boyz', ['1 Boss Nob', '4 Breaka Boyz'], '1 Boss Nob\n4 Breaka Boyz\nThe Boss Nob is equipped with: rokkit pistol; smash hammer; choppa. Each Breaka Boy is equipped with: smash hammer.', [5]),
      'Burna Boyz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Burna-Boyz', ['4 Burna Boyz', '1 Spanner', '9 Burna Boyz', '2 Spanners'], '4 Burna Boyz\n1 Spanner\nOR\n9 Burna Boyz\n2 Spanners\nEvery Spanner is equipped with: close combat weapon; big shoota. Every Burna Boy is equipped with: burna; cuttin’ flames.', [5, 11]),
      'Burna-bommer': single('Burna-bommer', 'Burna-bommer', 'This model is equipped with: twin big shoota; twin supa-shoota; armoured hull.'),
      'Dakkajet': single('Dakkajet', 'Dakkajet', 'This model is equipped with: 2 twin supa-shootas; armoured hull.'),
      'Deff Dread': single('Deff-Dread', 'Deff Dread', 'This model is equipped with: 2 big shootas; 2 dread klaws; stompy feet.'),
      'Deffkilla Wartrike': single('Deffkilla-Wartrike', 'Deffkilla Wartrike', 'This model is equipped with: defkilla boomsticks; killajet; snagga klaw.'),
      'Deffkoptas': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Deffkoptas', ['3 Deffkoptas', '6 Deffkoptas'], '3 Deffkoptas\nOR\n6 Deffkoptas\nEvery model is equipped with: kopta rokkits; slugga; spinnin’ blades.', [3, 6]),
      'Flash Gitz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Flash-Gitz', ['5 Flash Gitz', '10 Flash Gitz'], '5 Flash Gitz\nOR\n10 Flash Gitz\nEvery model is equipped with: snazzgun; choppa.', [5, 10]),
      'Gargantuan Squiggoth': single('Gargantuan-Squiggoth', 'Gargantuan Squiggoth', 'This model is equipped with: huge tusks.'),
      'Ghazghkull Thraka': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Ghazghkull-Thraka', ['1 Ghazghkull Thraka', '1 Makari'], '1 Ghazghkull Thraka\n1 Makari\nGhazghkull Thraka is equipped with: Mork’s Roar; Gork’s Klaw. Makari is equipped with: Makari’s stabba.', [2]),
      'Gorkanaut': single('Gorkanaut', 'Gorkanaut', 'This model is equipped with: deffstorm mega-shoota; 2 rokkit launchas; skorcha; 2 twin big shootas; klaw of Gork.'),
      'Gretchin': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Gretchin', ['1 Runtherd', '10 Gretchin', '20 Gretchin'], '1 Runtherd\n10 Gretchin\nOR\n1 Runtherd\n20 Gretchin\nEvery Runtherd is equipped with: slugga; Runtherd tools. Every Gretchin is equipped with: grot blasta; close combat weapon.', [11, 21]),
      'Hunta Rig': single('Hunta-Rig', 'Hunta Rig', 'This model is equipped with: ’eavy lobba; stikka kannon; butcha boyz; savage horns and hooves; saw blades.'),
      'Kill Rig': single('Kill-Rig', 'Kill Rig', 'This model is equipped with: ’eavy lobba; stikka kannon; wurrtower; butcha boyz; savage horns and hooves; saw blades.'),
      'Killa Kans': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Killa-Kans', ['3 Killa Kans', '6 Killa Kans'], '3 Killa Kans\nOR\n6 Killa Kans\nEvery model is equipped with: Kan shoota; Kan klaw.', [3, 6]),
      'Kommandos': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Kommandos', ['10 Kommandos'], '10 Kommandos\nEvery model is equipped with: slugga; choppa.', [10]),
      'Kustom Boosta-blasta': single('Kustom-Boosta-blasta', 'Kustom Boosta-blasta', 'This model is equipped with: burna exhausts; grot blasta; rivet kannon; spiked ram.'),
      'Lootas': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Lootas', ['4 Lootas', '1 Spanner', '8 Lootas', '2 Spanners'], '4 Lootas\n1 Spanner\nOR\n8 Lootas\n2 Spanners\nEvery Spanner is equipped with: big shoota; close combat weapon. Every Loota is equipped with: deffgun; close combat weapon.', [5, 10]),
      'Meganobz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Meganobz', ['2 Meganobz', '3 Meganobz', '4 Meganobz', '5 Meganobz', '6 Meganobz'], '2-6 Meganobz\nEvery model is equipped with: kustom shoota; power klaw.', [2, 3, 4, 5, 6]),
      'Megatrakk Scrapjet': single('Megatrakk-Scrapjet', 'Megatrakk Scrapjet', 'This model is equipped with: rokkit kannon; 2 twin big shootas; wing missiles; nose drill.'),
      'Mek': single('Mek', 'Mek', 'This model is equipped with: kustom mega-slugga; wrench.'),
      'Mek Gunz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Mek-Gunz', ['1 Mek Gun', '2 Mek Gunz', '3 Mek Gunz'], '1-3 Mek Gunz\nEvery model is equipped with: smasha gun; grot crew.', [1, 2, 3]),
      'Morkanaut': single('Morkanaut', 'Morkanaut', 'This model is equipped with: kustom mega-blasta; kustom mega-zappa; 2 rokkit launchas; 2 twin big shootas; klaw of Mork.'),
      'Mozrog Skragbad': single('Mozrog-Skragbad', 'Mozrog Skragbad', 'This model is equipped with: thump gun; Big Chompa’s jaws; gutrippa.'),
      'Nobz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Nobz', ['5 Nobz', '10 Nobz'], '5 Nobz\nOR\n10 Nobz\nEvery model is equipped with: slugga; big choppa.', [5, 10]),
      'Painboss': single('Painboss', 'Painboss', 'This model is equipped with: Beast Snagga klaw.'),
      'Painboy': single('Painboy', 'Painboy', 'This model is equipped with: power klaw; ’urty syringe.'),
      'Rukkatrukk Squigbuggy': single('Rukkatrukk-Squigbuggy', 'Rukkatrukk Squigbuggy', 'This model is equipped with: sawn-off shotgun; squig-launchas; saw blades.'),
      'Shokkjump Dragsta': single('Shokkjump-Dragsta', 'Shokkjump Dragsta', 'This model is equipped with: kustom shokk rifle; rokkit launcha; saw blades.'),
      'Squighog Boyz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Squighog-Boyz', ['1 Nob on Smasha Squig', '3 Squighog Boyz', '5 Squighog Boyz'], '1 Nob on Smasha Squig\n3 Squighog Boyz\nOR\n1 Nob on Smasha Squig\n5 Squighog Boyz\nEvery Nob on Smasha Squig is equipped with: slugga; big choppa; squig jaws. Every Squighog Boy is equipped with: saddlegit weapons; stikka; squig jaws.', [4, 6]),
      'Stompa': single('Stompa', 'Stompa', 'This model is equipped with: 3 big shootas; deffkannon; skorcha; supa-gatler; supa-rokkits; twin big shoota; mega-choppa.'),
      'Stormboyz': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Stormboyz', ['5 Stormboyz', '10 Stormboyz'], '5 Stormboyz\nOR\n10 Stormboyz\nEvery model is equipped with: slugga; choppa.', [5, 10]),
      'Tankbustas': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Tankbustas', ['1 Boss Nob', '4 Tankbustas'], '1 Boss Nob\n4 Tankbustas\nThe Boss Nob is equipped with: 2 rokkit pistols; choppa. Each Tankbusta is equipped with: rokkit launcha; close combat weapon.', [5]),
      'Trukk': single('Trukk', 'Trukk', 'This model is equipped with: big shoota; spiked wheels.'),
      'Warbikers': entry('https://wahapedia.ru/wh40k10ed/factions/orks/Warbikers', ['3 Warbikers', '6 Warbikers'], '3 Warbikers\nOR\n6 Warbikers\nEvery model is equipped with: twin dakkagun; close combat weapon.', [3, 6]),
      'Warboss': single('Warboss', 'Warboss', 'This model is equipped with: kombi-weapon; twin slugga; big choppa.'),
      'Warboss In Mega Armour': single('Warboss-In-Mega-Armour', 'Warboss In Mega Armour', 'This model is equipped with: big shoota; ’uge choppa.'),
      'Wazbom Blastajet': single('Wazbom-Blastajet', 'Wazbom Blastajet', 'This model is equipped with: smasha gun; twin wazbom mega-kannon; armoured hull.'),
      'Weirdboy': single('Weirdboy', 'Weirdboy', 'This model is equipped with: ’Eadbanger; weirdboy staff.'),
      'Wurrboy': single('Wurrboy', 'Wurrboy', 'This model is equipped with: Eyez of Mork; close combat weapon.'),
      'Zodgrod Wortsnagga': single('Zodgrod-Wortsnagga', 'Zodgrod Wortsnagga', 'This model is equipped with: Da Grabzappa; slugga.')
    }
  };
}());
