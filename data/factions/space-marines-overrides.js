(function () {
  if (!window.WH40K_FACTION_DATABASES || !window.WH40K_FACTION_DATABASES['space-marines']) return;
  if (!window.WH40K_UNIT_COMPOSITION_DATABASE || !window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction || !window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction['space-marines']) return;

  window.WH40K_FACTION_DATABASES['space-marines'].units['Wolf Scouts'] = {
    source: {
      name: 'Space Wolves',
      link: 'https://assets.warhammer-community.com/eng_10-12_wh40k_faction_pack_space_wolves-a4cmfwecry-2pqnq2mppi.pdf',
      datasheet: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/Wolf-Scouts',
    },
    role: 'Other',
    note: 'Infiltrators, Scouts 6", Oath of Moment, Guerrilla Tactics, The Wolf Scout Pack Leader model is equipped with: bolt pistol; boltgun; close combat weapon. Every Wolf Scout model is equipped with: bolt pistol; boltgun; close combat weapon.',
    statlines: [{
      label: 'Wolf Scouts',
      stats: {
        move: '6"',
        toughness: '4',
        save: '4+',
        wounds: '2',
        leadership: '6+',
        oc: '1',
      },
    }],
    stats: {
      move: '6"',
      toughness: '4',
      save: '4+',
      wounds: '2',
      leadership: '6+',
      oc: '1',
    },
    weapons: {
      'Astartes chainsword': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '4', skill: 3, skillType: 'WS', strength: '4', ap: -1, damage: '1', abilities: [] },
      'Astartes shotgun': { phase: 'Shooting', type: 'Ranged', range: '18"', attacks: '2', skill: 3, skillType: 'BS', strength: '4', ap: 0, damage: '1', abilities: ['assault'] },
      'Bolt pistol': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: '1', skill: 3, skillType: 'BS', strength: '4', ap: 0, damage: '1', abilities: ['pistol'] },
      'Boltgun': { phase: 'Shooting', type: 'Ranged', range: '24"', attacks: '2', skill: 3, skillType: 'BS', strength: '4', ap: 0, damage: '1', abilities: [] },
      'Close combat weapon': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '2', skill: 3, skillType: 'WS', strength: '4', ap: 0, damage: '1', abilities: [] },
      'Combat knife': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '3', skill: 3, skillType: 'WS', strength: '5', ap: -1, damage: '1', abilities: [] },
      'Combi-weapon': { phase: 'Shooting', type: 'Ranged', range: '24"', attacks: '1', skill: 4, skillType: 'BS', strength: '4', ap: 0, damage: '1', abilities: ['anti-infantry 4+', 'devastating wounds', 'rapid fire 1'] },
      'Flamer': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: 'D6', skill: 0, skillType: 'N/A', strength: '4', ap: 0, damage: '1', abilities: ['ignores cover', 'torrent'] },
      'Grav-gun': { phase: 'Shooting', type: 'Ranged', range: '18"', attacks: '2', skill: 3, skillType: 'BS', strength: '5', ap: -1, damage: '2', abilities: ['anti-vehicle 2+'] },
      'Grav-pistol': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: '1', skill: 3, skillType: 'BS', strength: '4', ap: -1, damage: '2', abilities: ['anti-vehicle 2+', 'pistol'] },
      'Hand flamer': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: 'D6', skill: 0, skillType: 'N/A', strength: '3', ap: 0, damage: '1', abilities: ['ignores cover', 'pistol', 'torrent'] },
      'Heavy bolter': { phase: 'Shooting', type: 'Ranged', range: '36"', attacks: '3', skill: 4, skillType: 'BS', strength: '5', ap: -1, damage: '2', abilities: ['heavy', 'sustained hits 1'] },
      'Inferno pistol': { phase: 'Shooting', type: 'Ranged', range: '6"', attacks: '1', skill: 2, skillType: 'BS', strength: '8', ap: -4, damage: 'D3', abilities: ['melta 2', 'pistol'] },
      'Meltagun': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: '1', skill: 3, skillType: 'BS', strength: '9', ap: -4, damage: 'D6', abilities: ['melta 2'] },
      'Missile launcher - frag': { phase: 'Shooting', type: 'Ranged', range: '48"', attacks: 'D6', skill: 4, skillType: 'BS', strength: '4', ap: 0, damage: '1', abilities: ['blast', 'heavy'] },
      'Missile launcher - krak': { phase: 'Shooting', type: 'Ranged', range: '48"', attacks: '1', skill: 4, skillType: 'BS', strength: '9', ap: -2, damage: 'D6', abilities: ['heavy'] },
      'Plasma gun - standard': { phase: 'Shooting', type: 'Ranged', range: '24"', attacks: '1', skill: 3, skillType: 'BS', strength: '7', ap: -2, damage: '1', abilities: ['rapid fire 1'] },
      'Plasma gun - supercharge': { phase: 'Shooting', type: 'Ranged', range: '24"', attacks: '1', skill: 3, skillType: 'BS', strength: '8', ap: -3, damage: '2', abilities: ['hazardous', 'rapid fire 1'] },
      'Plasma pistol - standard': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: '1', skill: 3, skillType: 'BS', strength: '7', ap: -2, damage: '1', abilities: ['pistol'] },
      'Plasma pistol - supercharge': { phase: 'Shooting', type: 'Ranged', range: '12"', attacks: '1', skill: 3, skillType: 'BS', strength: '8', ap: -3, damage: '2', abilities: ['hazardous', 'pistol'] },
      'Power fist': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '2', skill: 4, skillType: 'WS', strength: '8', ap: -2, damage: '2', abilities: [] },
      'Power weapon': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '3', skill: 3, skillType: 'WS', strength: '5', ap: -2, damage: '1', abilities: [] },
      'Storm bolter': { phase: 'Shooting', type: 'Ranged', range: '24"', attacks: '2', skill: 4, skillType: 'BS', strength: '4', ap: 0, damage: '1', abilities: ['rapid fire 2'] },
      'Thunder hammer': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '2', skill: 4, skillType: 'WS', strength: '8', ap: -2, damage: '2', abilities: ['devastating wounds'] },
      'Twin lightning claws': { phase: 'Fight', type: 'Melee', range: 'Melee', attacks: '4', skill: 3, skillType: 'WS', strength: '5', ap: -2, damage: '1', abilities: ['twin-linked'] },
    },
  };

  window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction['space-marines'].units['Wolf Scouts'] = {
    datasheet: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/Wolf-Scouts',
    text: '1 Wolf Scout Pack Leader\n4-9 Wolf Scouts\nThe Wolf Scout Pack Leader model is equipped with: bolt pistol; boltgun; close combat weapon.\nEvery Wolf Scout model is equipped with: bolt pistol; boltgun; close combat weapon.',
    lines: [
      '1 Wolf Scout Pack Leader',
      '4-9 Wolf Scouts',
    ],
    counts: {
      allowed: [5, 6, 7, 8, 9, 10],
      min: 5,
      max: 10,
      sources: [{
        min: 5,
        max: 10,
        source: '1 Wolf Scout Pack Leader + 4-9 Wolf Scouts',
      }],
    },
  };
})();
