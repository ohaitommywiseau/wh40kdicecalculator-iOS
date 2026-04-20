(function () {
  const root = window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || {
    source: {},
    byFaction: {}
  };

  const slug = 'adepta-sororitas';
  const baseUrl = 'https://wahapedia.ru/wh40k10ed/factions/adepta-sororitas/';

  function range(min, max) {
    const allowed = [];
    for (let value = min; value <= max; value += 1) {
      allowed.push(value);
    }
    return allowed;
  }

  function fixedCount(unitSlug, lines, text, count) {
    return {
      datasheet: baseUrl + unitSlug,
      text,
      lines,
      counts: {
        allowed: [count],
        min: count,
        max: count,
        sources: [{ min: count, max: count, source: lines.join(' + ') }]
      }
    };
  }

  function rangedCount(unitSlug, lines, text, min, max) {
    return {
      datasheet: baseUrl + unitSlug,
      text,
      lines,
      counts: {
        allowed: range(min, max),
        min,
        max,
        sources: [{ min, max, source: lines.join(' + ') }]
      }
    };
  }

  root.byFaction[slug] = {
    faction: {
      id: 'AS',
      name: 'Adepta Sororitas',
      slug
    },
    units: {
      'Aestred Thurga And Agathae Dolan': fixedCount(
        'Aestred-Thurga-And-Agathae-Dolan',
        ['1 Aestred Thurga', '1 Agathae Dolan'],
        '1 Aestred Thurga\n1 Agathae Dolan\nAestred Thurga is equipped with: bolt pistol; Blade of Vigil.\nAgathae Dolan is equipped with: bolt pistol; scribe\'s staff.',
        2
      ),
      'Arco-flagellants': rangedCount(
        'Arco-flagellants',
        ['3-10 Arco-flagellants'],
        '3-10 Arco-flagellants\nEvery model is equipped with: arco-flails.',
        3,
        10
      ),
      'Battle Sisters Squad': fixedCount(
        'Battle-Sisters-Squad',
        ['1 Sister Superior', '9 Battle Sisters'],
        '1 Sister Superior\n9 Battle Sisters\nEvery model is equipped with: bolt pistol; boltgun; close combat weapon.',
        10
      ),
      'Canoness': fixedCount(
        'Canoness',
        ['1 Canoness'],
        '1 Canoness\nThis model is equipped with: bolt pistol; hallowed chainsword.',
        1
      ),
      'Canoness with Jump Pack': fixedCount(
        'Canoness-with-Jump-Pack',
        ['1 Canoness with Jump Pack'],
        '1 Canoness with Jump Pack\nThis model is equipped with: blessed halberd.',
        1
      ),
      'Castigator': fixedCount(
        'Castigator',
        ['1 Castigator'],
        '1 Castigator\nThis model is equipped with: Castigator autocannons; 3 heavy bolters; armoured tracks.',
        1
      ),
      'Celestian Insidiants': fixedCount(
        'Celestian-Insidiants',
        ['1 Celestian Insidiant Superior', '9 Celestian Insidiants'],
        '1 Celestian Insidiant Superior\n9 Celestian Insidiants\nEach model is equipped with: condemnor bolt pistol; null mace.',
        10
      ),
      'Celestian Sacresants': rangedCount(
        'Celestian-Sacresants',
        ['1 Sacresant Superior', '4-9 Celestian Sacresants'],
        '1 Sacresant Superior\n4-9 Celestian Sacresants\nEvery model is equipped with: bolt pistol; hallowed mace.',
        5,
        10
      ),
      'Daemonifuge': fixedCount(
        'Daemonifuge',
        ['1 Ephrael Stern', '1 Kyganil of the Bloody Tears'],
        '1 Ephrael Stern\n1 Kyganil of the Bloody Tears\nEphrael Stern is equipped with: bolt pistol; Sanctity.\nKyganil of the Bloody Tears is equipped with: the Outcast\'s Weapons.',
        2
      ),
      'Dialogus': fixedCount(
        'Dialogus',
        ['1 Dialogus'],
        '1 Dialogus\nThis model is equipped with: bolt pistol; Dialogus staff.',
        1
      ),
      'Dogmata': fixedCount(
        'Dogmata',
        ['1 Dogmata'],
        '1 Dogmata\nThis model is equipped with: bolt pistol; mace of the righteous.',
        1
      ),
      'Dominion Squad': fixedCount(
        'Dominion-Squad',
        ['1 Dominion Superior', '9 Dominions'],
        '1 Dominion Superior\n9 Dominions\nEvery model is equipped with: bolt pistol; boltgun; close combat weapon.',
        10
      ),
      'Exorcist': fixedCount(
        'Exorcist',
        ['1 Exorcist'],
        '1 Exorcist\nThis model is equipped with: Exorcist missile launcher; heavy bolter; armoured tracks.',
        1
      ),
      'Hospitaller': fixedCount(
        'Hospitaller',
        ['1 Hospitaller'],
        '1 Hospitaller\nThis model is equipped with: bolt pistol; chirurgeon\'s tools.',
        1
      ),
      'Imagifier': fixedCount(
        'Imagifier',
        ['1 Imagifier'],
        '1 Imagifier\nThis model is equipped with: bolt pistol; boltgun; close combat weapon.',
        1
      ),
      'Immolator': fixedCount(
        'Immolator',
        ['1 Immolator'],
        '1 Immolator\nThis model is equipped with: immolation flamers; heavy bolter; armoured tracks.',
        1
      ),
      'Junith Eruita': fixedCount(
        'Junith-Eruita',
        ['1 Junith Eruita - EPIC HERO'],
        '1 Junith Eruita - EPIC HERO\nThis model is equipped with: Mace of Castigation; twin Ministorum heavy flamer.',
        1
      ),
      'Ministorum Priest': fixedCount(
        'Ministorum-Priest',
        ['1 Ministorum Priest'],
        '1 Ministorum Priest\nThis model is equipped with: Zealot\'s vindictor.',
        1
      ),
      'Mortifiers': rangedCount(
        'Mortifiers',
        ['1-2 Mortifiers'],
        '1-2 Mortifiers\nEvery model is equipped with: 2 heavy bolters; twin penitent buzz-blades.',
        1,
        2
      ),
      'Morvenn Vahl': fixedCount(
        'Morvenn-Vahl',
        ['1 Morvenn Vahl - EPIC HERO'],
        '1 Morvenn Vahl - EPIC HERO\nThis model is equipped with: Fidelis; Paragon missile launcher; Lance of Illumination.',
        1
      ),
      'Palatine': fixedCount(
        'Palatine',
        ['1 Palatine'],
        '1 Palatine\nThis model is equipped with: bolt pistol; Palatine blade.',
        1
      ),
      'Paragon Warsuits': fixedCount(
        'Paragon-Warsuits',
        ['1 Paragon Superior', '2 Paragons'],
        '1 Paragon Superior\n2 Paragons\nEvery model is equipped with: bolt pistol; heavy bolter; Paragon storm bolters; Paragon war blade.',
        3
      ),
      'Penitent Engines': rangedCount(
        'Penitent-Engines',
        ['1-2 Penitent Engines'],
        '1-2 Penitent Engines\nEvery model is equipped with: penitent flamers; twin penitent buzz-blades.',
        1,
        2
      ),
      'Repentia Squad': rangedCount(
        'Repentia-Squad',
        ['1 Repentia Superior', '4-9 Sisters Repentia'],
        '1 Repentia Superior\n4-9 Sisters Repentia\nThe Repentia Superior is equipped with: bolt pistol; neural whips.\nEach Sister Repentia is equipped with: penitent eviscerator.',
        5,
        10
      ),
      'Retributor Squad': fixedCount(
        'Retributor-Squad',
        ['1 Retributor Superior', '4 Retributors'],
        '1 Retributor Superior\n4 Retributors\nThe Retributor Superior is equipped with: bolt pistol; boltgun; close combat weapon.\nEach Retributor is equipped with: bolt pistol; heavy bolter; close combat weapon.',
        5
      ),
      'Saint Celestine': fixedCount(
        'Saint-Celestine',
        ['1 Saint Celestine - EPIC HERO', '2 Geminae Superia'],
        '1 Saint Celestine - EPIC HERO\n2 Geminae Superia\nSaint Celestine is equipped with: the Ardent Blade.\nEach Geminae Superia is equipped with: bolt pistol; power weapon.',
        3
      ),
      'Sanctifiers': fixedCount(
        'Sanctifiers',
        ['1 Miraculist', '1 Salvationist', '1 Death Cult Assassin', '2 Missionaries', '4 Sanctifiers'],
        '1 Miraculist\n1 Salvationist\n1 Death Cult Assassin\n2 Missionaries\n4 Sanctifiers\nThe Miraculist is equipped with: holy fire; burning hands.\nThe Salvationist is equipped with: close combat weapon; Salvationist medikit.\nThe Death Cult Assassin is equipped with: Death Cult blades.\n1 Missionary is equipped with: plasma gun; Sanctifier melee weapon.\n1 Missionary is equipped with: Ministorum flamer; Sanctifier melee weapon.\nEvery Sanctifier is equipped with: Ministorum hand flamer; Sanctifier melee weapon.',
        9
      ),
      'Seraphim Squad': rangedCount(
        'Seraphim-Squad',
        ['1 Seraphim Superior', '4-9 Seraphim'],
        '1 Seraphim Superior\n4-9 Seraphim\nEvery model is equipped with: 2 bolt pistols; close combat weapon.',
        5,
        10
      ),
      'Sisters Novitiate Squad': fixedCount(
        'Sisters-Novitiate-Squad',
        ['1 Novitiate Superior', '9 Sisters Novitiate'],
        '1 Novitiate Superior\n9 Sisters Novitiate\nThe Novitiate Superior is equipped with: bolt pistol; boltgun; close combat weapon.\nEach Sister Novitiate is equipped with: autopistol; autogun; close combat weapon.',
        10
      ),
      'Sororitas Rhino': fixedCount(
        'Sororitas-Rhino',
        ['1 Sororitas Rhino'],
        '1 Sororitas Rhino\nThis model is equipped with: storm bolter; armoured tracks.',
        1
      ),
      'Triumph Of Saint Katherine': fixedCount(
        'Triumph-Of-Saint-Katherine',
        ['1 Triumph Of Saint Katherine - EPIC HERO'],
        '1 Triumph Of Saint Katherine - EPIC HERO\nThis model is equipped with: bolt pistols; relic weapons.',
        1
      ),
      'Zephyrim Squad': rangedCount(
        'Zephyrim-Squad',
        ['1 Zephyrim Superior', '4-9 Zephyrim'],
        '1 Zephyrim Superior\n4-9 Zephyrim\nEvery model is equipped with: bolt pistol; power weapon.',
        5,
        10
      )
    }
  };
}());
