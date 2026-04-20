(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'adeptus-mechanicus';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/';

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
      id: 'AdM',
      name: 'Adeptus Mechanicus',
      slug: slug
    },
    units: {
      'Archaeopter Fusilave': single('Archaeopter-Fusilave', 'Archaeopter Fusilave', 'This model is equipped with: cognis heavy stubber array; armoured hull; command uplink.'),
      'Archaeopter Stratoraptor': single('Archaeopter-Stratoraptor', 'Archaeopter Stratoraptor', 'This model is equipped with: 2 cognis heavy stubbers; 2 heavy phosphor blasters; twin cognis lascannon; armoured hull; command uplink.'),
      'Archaeopter Transvector': single('Archaeopter-Transvector', 'Archaeopter Transvector', 'This model is equipped with: cognis heavy stubber array; armoured hull; command uplink.'),
      'Belisarius Cawl': single('Belisarius-Cawl', 'Belisarius Cawl - EPIC HERO', 'This model is equipped with: solar atomiser; arc scourge; Cawl\'s Omnissian axe; mechadendrite hive.'),
      'Corpuscarii Electro-priests': entry('Corpuscarii-Electro-priests', ['5 Corpuscarii Electro-priests', '10 Corpuscarii Electro-priests'], '5 Corpuscarii Electro-priests\nOR\n10 Corpuscarii Electro-priests\nEvery model is equipped with: electrostatic gauntlets.', [5, 10]),
      'Cybernetica Datasmith': single('Cybernetica-Datasmith', 'Cybernetica Datasmith', 'This model is equipped with: Mechanicus pistol; power fist.'),
      'Fulgurite Electro-priests': entry('Fulgurite-Electro-priests', ['5 Fulgurite Electro-priests', '10 Fulgurite Electro-priests'], '5 Fulgurite Electro-priests\nOR\n10 Fulgurite Electro-priests\nEvery model is equipped with: electroleech stave.', [5, 10]),
      'Ironstrider Ballistarii': entry('Ironstrider-Ballistarii', ['1-3 Ironstrider Ballistarii'], '1-3 Ironstrider Ballistarii\nEvery model is equipped with: twin cognis autocannon; Ironstrider feet.', [1, 2, 3]),
      'Kastelan Robots': entry('Kastelan-Robots', ['2 Kastelan Robots', '4 Kastelan Robots'], '2 Kastelan Robots\nOR\n4 Kastelan Robots\nEvery model is equipped with: incendine combustor; twin Kastelan fist.', [2, 4]),
      'Kataphron Breachers': entry('Kataphron-Breachers', ['3 Kataphron Breachers', '6 Kataphron Breachers'], '3 Kataphron Breachers\nOR\n6 Kataphron Breachers\nEvery model is equipped with: heavy arc rifle; arc claw.', [3, 6]),
      'Kataphron Destroyers': entry('Kataphron-Destroyers', ['3 Kataphron Destroyers', '6 Kataphron Destroyers'], '3 Kataphron Destroyers\nOR\n6 Kataphron Destroyers\nEvery model is equipped with: heavy grav-cannon; phosphor blaster; close combat weapon.', [3, 6]),
      'Onager Dunecrawler': single('Onager-Dunecrawler', 'Onager Dunecrawler', 'This model is equipped with: eradication beamer; Dunecrawler legs.'),
      'Pteraxii Skystalkers': entry('Pteraxii-Skystalkers', ['1 Pteraxii Skystalker Alpha', '4 Pteraxii Skystalkers', '9 Pteraxii Skystalkers'], '1 Pteraxii Skystalker Alpha\n4 Pteraxii Skystalkers\nOR\n1 Pteraxii Skystalker Alpha\n9 Pteraxii Skystalkers\nThe Pteraxii Skystalker Alpha model is equipped with: flechette blaster; taser goad.\nEvery Pteraxii Skystalker model is equipped with: flechette carbine; close combat weapon.', [5, 10]),
      'Pteraxii Sterylizors': entry('Pteraxii-Sterylizors', ['1 Pteraxii Sterylizor Alpha', '4 Pteraxii Sterylizors', '9 Pteraxii Sterylizors'], '1 Pteraxii Sterylizor Alpha\n4 Pteraxii Sterylizors\nOR\n1 Pteraxii Sterylizor Alpha\n9 Pteraxii Sterylizors\nThe Pteraxii Sterylizor Alpha model is equipped with: flechette blaster; taser goad.\nEvery Pteraxii Sterylizor model is equipped with: phosphor torch; Pteraxii talons.', [5, 10]),
      'Serberys Raiders': entry('Serberys-Raiders', ['1 Serberys Raider Alpha', '2 Serberys Raiders', '5 Serberys Raiders'], '1 Serberys Raider Alpha\n2 Serberys Raiders\nOR\n1 Serberys Raider Alpha\n5 Serberys Raiders\nThe Serberys Raider Alpha model is equipped with: Mechanicus pistol; galvanic carbine; cavalry sabre and clawed limbs.\nEvery Serberys Raider model is equipped with: galvanic carbine; cavalry sabre and clawed limbs.', [3, 6]),
      'Serberys Sulphurhounds': entry('Serberys-Sulphurhounds', ['1 Serberys Sulphurhound Alpha', '2 Serberys Sulphurhounds', '5 Serberys Sulphurhounds'], '1 Serberys Sulphurhound Alpha\n2 Serberys Sulphurhounds\nOR\n1 Serberys Sulphurhound Alpha\n5 Serberys Sulphurhounds\nThe Serberys Sulphurhound Alpha model is equipped with: Mechanicus pistol; phosphor blast carbine; cavalry arc maul; clawed limbs.\nEvery Serberys Sulphurhound model is equipped with: phosphor pistol; sulphur breath; clawed limbs.', [3, 6]),
      'Servitor Battleclade': entry('Servitor-Battleclade', ['1 Servitor Underseer', '2 Gun Servitors', '6 Combat Servitors'], '1 Servitor Underseer\n2 Gun Servitors\n6 Combat Servitors\nThe Servitor Underseer is equipped with: Mechanicus pistol; dataspikes.\n1 Gun Servitor is equipped with: heavy arc rifle; servo-claw.\n1 Gun Servitor is equipped with: heavy bolter; servo-claw.\nEvery Combat Servitor is equipped with: phosphor blaster; servo-claw.', [9]),
      'Sicarian Infiltrators': entry('Sicarian-Infiltrators', ['1 Sicarian Infiltrator Princeps', '4 Sicarian Infiltrators', '9 Sicarian Infiltrators'], '1 Sicarian Infiltrator Princeps\n4 Sicarian Infiltrators\nOR\n1 Sicarian Infiltrator Princeps\n9 Sicarian Infiltrators\nEvery model is equipped with: stubcarbine; power weapon.', [5, 10]),
      'Sicarian Ruststalkers': entry('Sicarian-Ruststalkers', ['1 Sicarian Ruststalker Princeps', '4 Sicarian Ruststalkers', '9 Sicarian Ruststalkers'], '1 Sicarian Ruststalker Princeps\n4 Sicarian Ruststalkers\nOR\n1 Sicarian Ruststalker Princeps\n9 Sicarian Ruststalkers\nEvery model is equipped with: transonic blades.', [5, 10]),
      'Skitarii Marshal': single('Skitarii-Marshal', 'Skitarii Marshal', 'This model is equipped with: Mechanicus pistol; control stave.'),
      'Skitarii Rangers': entry('Skitarii-Rangers', ['1 Skitarii Ranger Alpha', '9 Skitarii Rangers'], '1 Skitarii Ranger Alpha\n9 Skitarii Rangers\nThe Skitarii Ranger Alpha is equipped with: Mechanicus pistol; Alpha combat weapon.\nEvery Skitarii Ranger is equipped with: galvanic rifle; close combat weapon.', [10]),
      'Skitarii Vanguard': entry('Skitarii-Vanguard', ['1 Skitarii Vanguard Alpha', '9 Skitarii Vanguard'], '1 Skitarii Vanguard Alpha\n9 Skitarii Vanguard\nThe Skitarii Vanguard Alpha is equipped with: Mechanicus pistol; Alpha combat weapon.\nEvery Skitarii Vanguard is equipped with: radium carbine; close combat weapon.', [10]),
      'Skorpius Disintegrator': single('Skorpius-Disintegrator', 'Skorpius Disintegrator', 'This model is equipped with: belleros energy cannon; 3 cognis heavy stubbers; disruptor missile launcher; armoured hull.'),
      'Skorpius Dunerider': single('Skorpius-Dunerider', 'Skorpius Dunerider', 'This model is equipped with: cognis heavy stubber array; armoured hull.'),
      'Sydonian Dragoons With Radium Jezzails': entry('Sydonian-Dragoons-With-Radium-Jezzails', ['1-3 Sydonian Dragoons'], '1-3 Sydonian Dragoons\nEvery model is equipped with: phosphor serpenta; radium jezzail; Ironstrider feet.', [1, 2, 3]),
      'Sydonian Dragoons With Taser Lances': entry('Sydonian-Dragoons-With-Taser-Lances', ['1-3 Sydonian Dragoons'], '1-3 Sydonian Dragoons\nEvery model is equipped with: phosphor serpenta; taser lance.', [1, 2, 3]),
      'Sydonian Skatros': single('Sydonian-Skatros', 'Sydonian Skatros', 'This model is equipped with: Mechanicus pistol; radium jezzail; Sydonian feet.'),
      'Tech-priest Dominus': single('Tech-priest-Dominus', 'Tech-priest Dominus', 'This model is equipped with: macrostubber; volkite blaster; Omnissian axe.'),
      'Tech-priest Enginseer': single('Tech-priest-Enginseer', 'Tech-priest Enginseer', 'This model is equipped with: Mechanicus pistol; Omnissian axe; servo-arm.'),
      'Tech-priest Manipulus': single('Tech-priest-Manipulus', 'Tech-priest Manipulus', 'This model is equipped with: magnarail lance; Omnissian staff.'),
      'Technoarcheologist': single('Technoarcheologist', 'Technoarcheologist', 'This model is equipped with: Mechanicus pistol; servo-arc claw.')
    }
  };
}());
