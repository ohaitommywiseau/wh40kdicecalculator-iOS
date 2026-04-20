(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'adeptus-titanicus';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/adeptus-titanicus/';

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
      id: 'TL',
      name: 'Adeptus Titanicus',
      slug: slug
    },
    units: {
      'Reaver Titan': single('Reaver-Titan', 'Reaver Titan', 'This model is equipped with: Reaver apocalypse launcher; Reaver gatling blaster; Reaver laser blaster; Reaver feet.'),
      'Warbringer Nemesis Titan': single('Warbringer-Nemesis-Titan', 'Warbringer Nemesis Titan', 'This model is equipped with: 2 anvillus defence batteries; 3 ardex-defensor maulers; Nemesis quake cannon; Reaver gatling blaster; Reaver laser blaster; Nemesis feet.'),
      'Warhound Titan': single('Warhound-Titan', 'Warhound Titan', 'This model is equipped with: Warhound plasma blastgun; Warhound vulcan mega-bolter; Warhound feet.'),
      'Warlord Titan': single('Warlord-Titan', 'Warlord Titan', 'This model is equipped with: 2 apocalypse launchers; 2 ardex-defensor lascannons; 2 ardex-defensor maulers; macro gatling blaster; arioch power claw; Warlord feet.')
    }
  };
}());
