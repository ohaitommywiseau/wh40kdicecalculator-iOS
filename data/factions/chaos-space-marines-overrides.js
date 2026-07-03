(function () {
  if (!window.WH40K_FACTION_DATABASES || !window.WH40K_FACTION_DATABASES['chaos-space-marines']) return;

  Object.assign(window.WH40K_FACTION_DATABASES['chaos-space-marines'].units, {
    'Kravek Morne': {
      source: {
        name: 'Chaos Space Marines',
        link: 'https://assets.warhammer-community.com/eng_04-03_warhammer40000_faction_pack_chaos_space_marines-ekqehcsuwl-qmyuudm97y.pdf',
        datasheet: 'https://wahapedia.ru/wh40k10ed/factions/chaos-space-marines/Kravek-Morne'
      },
      role: 'Characters',
      note: 'Deep Strike, Leader, Dark Pacts, Headlong Destruction, Architect of Ruin, This model is equipped with: baleflamer; combi-bolter; servo-harness; Last Argument and power fist.',
      statlines: [{
        label: 'Kravek Morne',
        stats: {
          move: '5"',
          toughness: '5',
          save: '2+',
          invulnerable: '4+',
          wounds: '6',
          leadership: '6+',
          oc: '1'
        }
      }],
      stats: {
        move: '5"',
        toughness: '5',
        save: '2+',
        invulnerable: '4+',
        wounds: '6',
        leadership: '6+',
        oc: '1'
      },
      weapons: {
        'Baleflamer': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: 'D6+3', skill: 0, skillType: 'N/A', strength: '6', ap: -1, damage: '2', abilities: ['ignores cover', 'torrent'] },
        'Combi-bolter': { phase: 'Shooting', type: 'Ranged', range: '24"', attacks: '2', skill: 2, skillType: 'BS', strength: '4', ap: 0, damage: '1', abilities: ['rapid fire 2'] },
        'Last Argument and power fist': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '7', skill: 2, skillType: 'WS', strength: '10', ap: -2, damage: '2', abilities: ['devastating wounds'] },
        'Servo-harness': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '3', skill: 2, skillType: 'WS', strength: '6', ap: -2, damage: '2', abilities: ['anti-vehicle 2+', 'extra attacks'] }
      },
      keywords: ['Heretic Astartes', 'Infantry', 'Character', 'Epic Hero', 'Chaos', 'Chaos Undivided', 'Terminator', 'Deep Strike', 'Leader', 'Dark Pacts'],
      factionKeywords: ['Heretic Astartes']
    },
    'Mutilators': {
      source: {
        name: 'Chaos Space Marines',
        link: 'https://assets.warhammer-community.com/eng_04-03_warhammer40000_faction_pack_chaos_space_marines-ekqehcsuwl-qmyuudm97y.pdf',
        datasheet: 'https://wahapedia.ru/wh40k10ed/factions/chaos-space-marines/Mutilators'
      },
      role: 'Other',
      note: 'Deep Strike, Dark Pacts, Crushing Charge, Every model is equipped with: fleshmetal weapons.',
      statlines: [{
        label: 'Mutilators',
        stats: {
          move: '5"',
          toughness: '7',
          save: '2+',
          invulnerable: '5+',
          wounds: '5',
          leadership: '6+',
          oc: '2'
        }
      }],
      stats: {
        move: '5"',
        toughness: '7',
        save: '2+',
        invulnerable: '5+',
        wounds: '5',
        leadership: '6+',
        oc: '2'
      },
      weapons: {
        'Fleshmetal weapons - clawed sweeps': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '6', skill: 3, skillType: 'WS', strength: '6', ap: -2, damage: '1', abilities: [] },
        'Fleshmetal weapons - rending strikes': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '4', skill: 3, skillType: 'WS', strength: '9', ap: -3, damage: '3', abilities: [] },
        'Fleshmetal weapons - thunderous blows': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '2', skill: 3, skillType: 'WS', strength: '12', ap: -4, damage: 'D6+2', abilities: [] }
      },
      keywords: ['Heretic Astartes', 'Infantry', 'Chaos', 'Daemon', 'Mutilators', 'Deep Strike', 'Dark Pacts'],
      factionKeywords: ['Heretic Astartes']
    }
  });
}());
