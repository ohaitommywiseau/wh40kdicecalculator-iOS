(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['necrons'] = [
    {
      slug: 'awakened-dynasty',
      name: 'Awakened Dynasty',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Command Protocols',
          text: 'While a NECRONS CHARACTER model is leading this unit, each time a model in this unit makes an attack, add 1 to the Hit roll.'
        }
      ],
      enhancements: [
        {
          name: 'Veil of Darkness',
          points: 20,
          text: 'NECRONS model only. Once per battle, at the end of your opponent\'s turn, if the bearer\'s unit is not within Engagement Range of any enemy units, the bearer can use this Enhancement. If it does, remove that unit from the battlefield. Then, in the Reinforcements step of your next Movement phase, set up that unit anywhere on the battlefield that is more than 9" horizontally away from all enemy models.'
        },
        {
          name: 'Nether-realm Casket',
          points: 20,
          text: 'NECRONS model only. While the bearer is leading a unit, models in that unit have the Stealth ability.'
        },
        {
          name: 'Phasal Subjugator (Aura)',
          points: 35,
          text: 'NECRONS model only. While a friendly NECRONS unit (excluding CHARACTER units) is within 6" of the bearer, each time a model in that unit makes an attack, add 1 to the Hit roll.'
        },
        {
          name: 'Enaegic Dermal Bond',
          points: 30,
          text: 'NECRONS model only. The bearer has the Feel No Pain 4+ ability.'
        }
      ],
      stratagems: [
        {
          id: 'awakened-dynasty-protocol-of-the-eternal-revenant',
          name: 'PROTOCOL OF THE ETERNAL REVENANT',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Any phase.',
          target: 'One NECRONS INFANTRY CHARACTER model from your army that was just destroyed.',
          effect: 'At the end of the phase, set your model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with half of its starting number of wounds remaining.',
          restrictions: 'Each model can only be targeted with this Stratagem once per battle.',
          usageLimit: 'perBattle',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'awakened-dynasty-protocol-of-the-undying-legions',
          name: 'PROTOCOL OF THE UNDYING LEGIONS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has resolved its attacks.',
          target: 'One NECRONS unit from your army that had one or more of its models destroyed as a result of the attacking unit\'s attacks.',
          effect: 'Your unit activates its Reanimation Protocols and reanimates D3 wounds (or D3+1 wounds if a NECRONS CHARACTER is leading your unit).',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'awakened-dynasty-protocol-of-the-hungry-void',
          name: 'PROTOCOL OF THE HUNGRY VOID',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One NECRONS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, add 1 to the Strength characteristic of melee weapons equipped by models in your unit. In addition, if a NECRONS CHARACTER is leading your unit, until the end of the phase, improve the Armour Penetration characteristic of melee weapons equipped by models in your unit by 1.',
          phaseTags: ['Fight']
        },
        {
          id: 'awakened-dynasty-protocol-of-the-sudden-storm',
          name: 'PROTOCOL OF THE SUDDEN STORM',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One NECRONS unit from your army.',
          effect: 'Until the end of the turn, ranged weapons equipped by models in your unit have the [ASSAULT] ability. In addition, if a NECRONS CHARACTER is leading your unit, until the end of the phase, you can re-roll Advance rolls made for your unit.',
          phaseTags: ['Movement']
        },
        {
          id: 'awakened-dynasty-protocol-of-the-conquering-tyrant',
          name: 'PROTOCOL OF THE CONQUERING TYRANT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One NECRONS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a unit within half range, re-roll a Hit roll of 1. If a NECRONS CHARACTER is leading your unit, until the end of the phase, you can re-roll the Hit roll for that attack instead.',
          phaseTags: ['Shooting']
        },
        {
          id: 'awakened-dynasty-protocol-of-the-vengeful-stars',
          name: 'PROTOCOL OF THE VENGEFUL STARS',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit destroys a NECRONS unit from your army.',
          target: 'One NECRONS CHARACTER unit from your army that was within 6" of that NECRONS unit when it was destroyed.',
          effect: 'After the attacking unit has resolved its attacks, your unit can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'annihilation-legion',
      name: 'Annihilation Legion',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Annihilation Protocol',
          text: 'Each time a DESTROYER CULT or FLAYED ONES unit from your army declares a charge, you can re-roll the Charge roll. If one or more targets of that charge are Below Half-strength, add 1 to the Charge roll as well.\n\nEach time a DESTROYER CULT unit from your army makes a ranged attack that targets the closest eligible target, add 1 to the Armour Penetration characteristic of that attack.'
        }
      ],
      enhancements: [
        {
          name: 'Eternal Madness',
          points: 25,
          text: 'NECRONS model only. In the Fight phase, each time a model in the bearer\'s unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play; it can fight after the attacking model\'s unit has finished making its attacks, and is then removed from play.'
        },
        {
          name: 'Ingrained Superiority',
          points: 10,
          text: 'NECRONS model only. Each time a model in the bearer\'s unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.'
        },
        {
          name: 'Soulless Reaper',
          points: 20,
          text: 'DESTROYER CULT model only. Each time an enemy unit within Engagement Range of the bearer\'s unit is selected to Fall Back, roll one D6: on a 3+, that unit cannot Fall Back this phase and must Remain Stationary.'
        },
        {
          name: 'Eldritch Nightmare',
          points: 15,
          text: 'DESTROYER CULT model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer must take a Battle-shock test.'
        }
      ],
      stratagems: [
        {
          id: 'annihilation-legion-masks-of-death',
          name: 'MASKS OF DEATH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'annihilation-legion-the-spoor-of-frailty',
          name: 'THE SPOOR OF FRAILTY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model from your unit makes an attack that targets a unit Below Starting Strength, add 1 to the Hit roll. If the target is Below Half-strength, add 1 to the Wound roll as well.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'annihilation-legion-murderous-reanimation',
          name: 'MURDEROUS REANIMATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that has just destroyed an enemy unit, or just caused an enemy unit that was not Below Half-strength to become Below Half-strength.',
          effect: 'Your unit\'s Reanimation Protocols activate.',
          phaseTags: ['Fight']
        },
        {
          id: 'annihilation-legion-pitiless-hunters',
          name: 'PITILESS HUNTERS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".',
          phaseTags: ['Fight']
        },
        {
          id: 'annihilation-legion-blood-fuelled-cruelty',
          name: 'BLOOD-FUELLED CRUELTY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Fall Back move.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that started the phase within Engagement Range of that enemy unit.',
          effect: 'Roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers 3 mortal wounds. Your unit can then make a Normal move, but must end that move as close as possible to that enemy unit.',
          phaseTags: ['Movement']
        },
        {
          id: 'annihilation-legion-insanitys-ire',
          name: 'INSANITY\'S IRE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that had one or more of its models destroyed by the attacking unit\'s attacks.',
          effect: 'Your unit can make a Normal move, but must end that move as close as possible to that enemy unit.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'canoptek-court',
      name: 'Canoptek Court',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Power Matrix',
          text: 'Certain areas of the battlefield are considered to be within your army\'s Power Matrix, as follows:\n\nYour deployment zone is always within your army\'s Power Matrix.\nAt the start of any phase, if you control at least half of the objective markers within No Man\'s Land, until the end of that phase, No Man\'s Land is within your army\'s Power Matrix.\nAt the start of any phase, if you control at least half of the objective markers within your opponent\'s deployment zone, until the end of that phase, your opponent\'s deployment zone is within your army\'s Power Matrix.\n\nEach time a model in a CRYPTEK or CANOPTEK unit from your army makes an attack, re-roll a Hit roll of 1. If such a unit is wholly within your army\'s Power Matrix, you can re-roll the Hit roll instead.'
        }
      ],
      enhancements: [
        {
          name: 'Dimensional Sanctum',
          points: 20,
          text: 'CRYPTEK model only. Models in the bearer\'s unit have the Infiltrators ability.'
        },
        {
          name: 'Hyperphasic Fulcrum',
          points: 15,
          text: 'CRYPTEK model only. While the bearer is leading a unit, if that unit is wholly within your army\'s Power Matrix, each time a model in that unit makes an attack, re-roll a Wound roll of 1.'
        },
        {
          name: 'Autodivinator',
          points: 15,
          text: 'CRYPTEK model only. Each time your opponent gains a CP as the result of an ability, roll one D6: on a 2+, you also gain 1CP.'
        },
        {
          name: 'Metalodermal Tesla Weave',
          points: 10,
          text: 'CRYPTEK model only. Once per phase, when an enemy unit selects the bearer\'s unit as a target of a charge, roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers 3 mortal wounds.'
        }
      ],
      stratagems: [
        {
          id: 'canoptek-court-curse-of-the-cryptek',
          name: 'CURSE OF THE CRYPTEK',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has shot or fought.',
          target: 'One CRYPTEK model from your army that was destroyed by one of the attacking unit\'s attacks.',
          effect: 'Until the end of the battle, each time a friendly CANOPTEK model makes an attack that targets the attacking unit, add 1 to the Hit roll and add 1 to the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'canoptek-court-cynosure-of-eradication',
          name: 'CYNOSURE OF ERADICATION',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'The start of your Shooting phase or the start of the Fight phase.',
          target: 'One CRYPTEK or CANOPTEK unit from your army that is wholly within your army\'s Power Matrix.',
          effect: 'Until the end of the phase, weapons equipped by CRYPTEK or CANOPTEK models in your unit have the [DEVASTATING WOUNDS] ability.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'canoptek-court-solar-pulse',
          name: 'SOLAR PULSE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Start of your Shooting phase.',
          target: 'One CRYPTEK model from your army.',
          effect: 'Select one objective marker within 18" of your CRYPTEK model. Until the end of the phase, weapons equipped by friendly NECRONS models have the [IGNORES COVER] ability while targeting units within range of that objective marker.',
          phaseTags: ['Shooting']
        },
        {
          id: 'canoptek-court-reactive-subroutines',
          name: 'REACTIVE SUBROUTINES',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One CANOPTEK unit from your army that is within 9" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        },
        {
          id: 'canoptek-court-countertemporal-shift',
          name: 'COUNTERTEMPORAL SHIFT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One CANOPTEK unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          phaseTags: ['Shooting']
        },
        {
          id: 'canoptek-court-suboptimal-facade',
          name: 'SUBOPTIMAL FACADE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Charge phase, just after an enemy unit has declared a charge.',
          target: 'One CANOPTEK unit from your army that was selected as a target of that charge and is wholly within your army\'s Power Matrix.',
          effect: 'Your unit\'s Reanimation Protocols activate.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'obeisance-phalanx',
      name: 'Obeisance Phalanx',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Worthy Foes',
          text: 'In your Command phase, select one enemy unit. Until the start of your next Command phase, each time a NOBLE, LYCHGUARD or TRIARCH unit from your army makes an attack that targets that unit, add 1 to the Wound roll.'
        }
      ],
      enhancements: [
        {
          name: 'Honourable Combatant',
          points: 10,
          text: 'OVERLORD model only. Each time the bearer\'s unit destroys an enemy CHARACTER unit, your opponent loses 1CP if they have any.'
        },
        {
          name: 'Unflinching Will',
          points: 20,
          text: 'OVERLORD model only. The bearer\'s melee weapons have the [PRECISION] and [ANTI-INFANTRY 5+] abilities.'
        },
        {
          name: 'Warrior Noble',
          points: 15,
          text: 'OVERLORD model only. Each time a melee attack targets the bearer\'s unit, subtract 1 from the Hit roll.'
        },
        {
          name: 'Eternal Conqueror',
          points: 25,
          text: 'OVERLORD model only. Each time a model in the bearer\'s unit makes an attack that targets an enemy unit within range of an objective marker, you can re-roll the Hit roll.'
        }
      ],
      stratagems: [
        {
          id: 'obeisance-phalanx-your-time-is-nigh',
          name: 'YOUR TIME IS NIGH',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Any phase, just after your opponent\'s WARLORD is destroyed.',
          target: 'Your NECRONS WARLORD.',
          effect: 'Until the end of the battle, each time an enemy unit takes a Battle-shock or Leadership test, subtract 1 from the result.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'obeisance-phalanx-enslaved-artifice',
          name: 'ENSLAVED ARTIFICE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One NECRONS unit from your army (excluding TITANIC units) that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'obeisance-phalanx-nanoassembly-protocols',
          name: 'NANOASSEMBLY PROTOCOLS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One NECRONS VEHICLE unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'obeisance-phalanx-sentinels-of-eternity',
          name: 'SENTINELS OF ETERNITY',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One LYCHGUARD or TRIARCH PRAETORIANS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model\'s unit has finished making attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'obeisance-phalanx-suffer-no-rival',
          name: 'SUFFER NO RIVAL',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One LYCHGUARD or TRIARCH unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'obeisance-phalanx-territorial-obsession',
          name: 'TERRITORIAL OBSESSION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One LYCHGUARD or TRIARCH unit from your army.',
          effect: 'Until the start of your next Command phase, add 1 to the Objective Control characteristic of models in your unit. If your unit has the VEHICLE keyword, add 3 to the Objective Control characteristic instead.',
          phaseTags: ['Command']
        }
      ]
    },
    {
      slug: 'hypercrypt-legion',
      name: 'Hypercrypt Legion',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Hyperphasing',
          text: 'At the end of your opponent\'s turn, you can select a number of NECRONS units from your army (excluding AIRCRAFT) equal to the battle size, as follows: Incursion up to 1 unit; Strike Force up to 2 units; Onslaught up to 3 units. Remove those units from the battlefield and place them into Strategic Reserves. Units with the Deep Strike ability can be set up in your next Reinforcements step using that ability.'
        }
      ],
      enhancements: [
        {
          name: 'Arisen Tyrant',
          points: 25,
          text: 'NECRONS model only. While the bearer is leading a unit, each time a model in that unit makes an attack in a turn in which that unit was set up on the battlefield from Reserves, you can re-roll the Hit roll.'
        },
        {
          name: 'Hyperspatial Transfer Node',
          points: 15,
          text: 'NECRONS model only. Once per battle, at the end of your opponent\'s turn, the bearer can use this Enhancement. If it does, remove the bearer\'s unit from the battlefield and place it into Strategic Reserves.'
        },
        {
          name: 'Dimensional Overseer',
          points: 25,
          text: 'NECRONS model only. While the bearer is on the battlefield, add 1 to the number of units you can select for your Hyperphasing Detachment rule.'
        },
        {
          name: 'Osteoclave Fulcrum',
          points: 20,
          text: 'NECRONS model only. While the bearer is leading a unit, models in that unit have the Deep Strike ability.'
        }
      ],
      stratagems: [
        {
          id: 'hypercrypt-legion-cosmic-precision',
          name: 'COSMIC PRECISION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a NECRONS unit from your army with the Deep Strike ability is set up on the battlefield.',
          target: 'That NECRONS unit.',
          effect: 'Until the end of the phase, your unit can be set up anywhere on the battlefield that is more than 3" horizontally away from all enemy models.',
          restrictions: 'A unit targeted by this Stratagem is not eligible to declare a charge in the same turn.',
          phaseTags: ['Movement']
        },
        {
          id: 'hypercrypt-legion-osteoclave-fulcrum',
          name: 'OSTEOCLAVE FULCRUM',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One NECRONS unit from your army that was set up on the battlefield from Reserves this turn and has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'hypercrypt-legion-reality-falsehood',
          name: 'REALITY FALSEHOOD',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One NECRONS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'hypercrypt-legion-quantum-deflection',
          name: 'QUANTUM DEFLECTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One NECRONS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'hypercrypt-legion-entropic-damping',
          name: 'ENTROPIC DAMPING',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One NECRONS MONSTER or VEHICLE unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 4+ ability against mortal wounds and ranged attacks.',
          phaseTags: ['Shooting']
        },
        {
          id: 'hypercrypt-legion-soulless-obfuscation',
          name: 'SOULLESS OBFUSCATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Charge phase, just after an enemy unit has declared a charge.',
          target: 'One NECRONS unit from your army that was selected as a target of that charge.',
          effect: 'Until the end of the phase, subtract 2 from Charge rolls made for that enemy unit.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'starshatter-arsenal',
      name: 'Starshatter Arsenal',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Relentless Onslaught',
          text: 'At the start of the battle round, select one of the following abilities. Until the end of the battle round, that ability applies to all NECRONS models from your army.\n\nInescapable Accuracy: Each time a model in your army makes a ranged attack, re-roll a Hit roll of 1.\nUnerring Fury: Each time a model in your army makes a ranged attack that targets the closest eligible target, add 1 to the Wound roll.\nThe Eager Advance: Ranged weapons equipped by models in your army have the [ASSAULT] ability.'
        }
      ],
      enhancements: [
        {
          name: 'Miniaturised Nebuloscope',
          points: 15,
          text: 'NECRONS model only. Ranged weapons equipped by models in the bearer\'s unit have the [IGNORES COVER] ability.'
        },
        {
          name: 'Demanding Leader',
          points: 10,
          text: 'NECRONS model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [HEAVY] ability.'
        },
        {
          name: 'Chrono-impedance Fields',
          points: 25,
          text: 'NECRONS model only. Enemy units cannot be set up from Reserves within 12" of the bearer.'
        },
        {
          name: 'Benevolent Null Field',
          points: 20,
          text: 'NECRONS model only. While the bearer is leading a unit, models in that unit have a 5+ invulnerable save against ranged attacks.'
        }
      ],
      stratagems: [
        {
          id: 'starshatter-arsenal-supersonic-death',
          name: 'SUPERSONIC DEATH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One NECRONS AIRCRAFT unit from your army.',
          effect: 'Until the end of the turn, each time your unit is selected to move, it can make a Normal move of up to 90" and can move over enemy models as if they were not there.',
          phaseTags: ['Movement']
        },
        {
          id: 'starshatter-arsenal-target-oblit',
          name: 'TARGET OBLITERATED',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One NECRONS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a unit below its Starting Strength, re-roll the Wound roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'starshatter-arsenal-black-hole-eversion',
          name: 'BLACK HOLE EVERSION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One NECRONS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, improve the Armour Penetration characteristic of ranged weapons equipped by models in your unit by 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'starshatter-arsenal-contingency-programming',
          name: 'CONTINGENCY PROGRAMMING',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One NECRONS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'starshatter-arsenal-trial-by-combat',
          name: 'TRIAL BY COMBAT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Charge phase, just after an enemy unit has declared a charge.',
          target: 'One NECRONS unit from your army that was selected as a target of that charge.',
          effect: 'Until the end of the phase, each time a model in your unit fires Overwatch, an unmodified Hit roll of 5+ is required to score a hit, instead of 6.',
          phaseTags: ['Charge']
        },
        {
          id: 'starshatter-arsenal-systematic-destruction',
          name: 'SYSTEMATIC DESTRUCTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One NECRONS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets the closest eligible target, re-roll a Wound roll of 1.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'cryptek-conclave',
      name: 'Cryptek Conclave',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Technosorcerous Augmentations',
          text: 'At the end of your Movement phase, select one objective marker you control. That objective marker remains under your control until your opponent controls it at the end of a phase. In addition, at the start of the battle round, you can select one of the following augmentations. Until the end of the battle round, that augmentation applies to all CRYPTEK units from your army.\n\nTemporal Buffering: Add 1 to Advance and Charge rolls for this unit.\nEntropic Field: Models in this unit have a 5+ invulnerable save.\nEnergised Energies: Add 1 to the Strength characteristic of ranged weapons equipped by models in this unit.'
        }
      ],
      enhancements: [
        {
          name: 'Traveller of Aeons',
          points: 20,
          text: 'CRYPTEK model only. Once per battle round, one model in the bearer\'s unit can use a Stratagem on that unit for 0CP, even if another unit from your army has already been targeted with that Stratagem this phase.'
        },
        {
          name: 'Dimensional Emissary',
          points: 15,
          text: 'CRYPTEK model only. The bearer has the Deep Strike ability.'
        },
        {
          name: 'Crystalline Lenser',
          points: 15,
          text: 'CRYPTEK model only. Improve the Range characteristic of ranged weapons equipped by models in the bearer\'s unit by 6".'
        },
        {
          name: 'Metalic Transfusion',
          points: 25,
          text: 'CRYPTEK model only. At the end of your Command phase, one friendly NECRONS model within 6" of the bearer regains up to 3 lost wounds.'
        }
      ],
      stratagems: [
        {
          id: 'cryptek-conclave-reality-reshaped',
          name: 'REALITY RESHAPED',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One CRYPTEK unit from your army.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Movement']
        },
        {
          id: 'cryptek-conclave-hyperspatial-steal',
          name: 'HYPERSPATIAL STEAL',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One CRYPTEK unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'cryptek-conclave-arcane-tenacity',
          name: 'ARCANE TENACITY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One CRYPTEK unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'cryptek-conclave-techno-necrotic-overflow',
          name: 'TECHNO-NECROTIC OVERFLOW',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One CRYPTEK unit from your army.',
          effect: 'Your unit activates its Reanimation Protocols.',
          phaseTags: ['Command']
        },
        {
          id: 'cryptek-conclave-dimensional-dispersion',
          name: 'DIMENSIONAL DISPERSION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One CRYPTEK unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'cryptek-conclave-empathic-dampening',
          name: 'EMPATHIC DAMPENING',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Charge phase, just after an enemy unit has declared a charge.',
          target: 'One CRYPTEK unit from your army that was selected as a target of that charge.',
          effect: 'Until the end of the phase, subtract 2 from Charge rolls made for that enemy unit.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'cursed-legion',
      name: 'Cursed Legion',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Cold Fervour',
          text: 'At the start of the battle round, select one enemy objective marker. Until the end of the battle round, FLAYED ONES and DESTROYER CULT units from your army that are within range of that objective marker have the Feel No Pain 5+ ability, and each time a model in such a unit makes an attack, add 1 to the Hit roll.'
        }
      ],
      enhancements: [
        {
          name: 'Enslaved Hunger',
          points: 25,
          text: 'DESTROYER CULT or FLAYED ONES model only. While the bearer is leading a unit, add 1 to Charge rolls made for that unit.'
        },
        {
          name: 'Terrifying Madness',
          points: 20,
          text: 'DESTROYER CULT or FLAYED ONES model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer must take a Battle-shock test.'
        },
        {
          name: 'Murderous Fervour',
          points: 10,
          text: 'DESTROYER CULT or FLAYED ONES model only. Improve the Attacks characteristic of the bearer\'s melee weapons by 1.'
        },
        {
          name: 'Null Field',
          points: 15,
          text: 'DESTROYER CULT or FLAYED ONES model only. Models in the bearer\'s unit have the Stealth ability.'
        }
      ],
      stratagems: [
        {
          id: 'cursed-legion-horrifying-onslaught',
          name: 'HORRIFYING ONSLAUGHT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
          phaseTags: ['Charge']
        },
        {
          id: 'cursed-legion-death-howl',
          name: 'DEATH-HOWL',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase, just after a DESTROYER CULT or FLAYED ONES unit from your army destroys an enemy unit.',
          target: 'That DESTROYER CULT or FLAYED ONES unit.',
          effect: 'Each enemy unit within 6" of your unit must take a Battle-shock test.',
          phaseTags: ['Fight']
        },
        {
          id: 'cursed-legion-eldritch-nemeses',
          name: 'ELDRITCH NEMESES',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a CHARACTER, MONSTER or VEHICLE unit, add 1 to the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'cursed-legion-necrotic-surge',
          name: 'NECROTIC SURGE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Fight phase, just after an enemy unit has selected its targets.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'cursed-legion-skin-of-living-metal',
          name: 'SKIN OF LIVING METAL',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'cursed-legion-ravenous-reanimation',
          name: 'RAVENOUS REANIMATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One DESTROYER CULT or FLAYED ONES unit from your army.',
          effect: 'Your unit activates its Reanimation Protocols.',
          phaseTags: ['Command']
        }
      ]
    },
    {
      slug: 'pantheon-of-woe',
      name: 'Pantheon of Woe',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/necrons/',
      rules: [
        {
          name: 'Cosmic Distortion',
          text: 'C\'TAN SHARD units from your army have the Feel No Pain 4+ ability against mortal wounds. In addition, at the start of your Command phase, select one objective marker. Until the start of your next Command phase, that objective marker is warped. Each time a model in a C\'TAN SHARD unit from your army makes an attack that targets a unit within range of a warped objective marker, add 1 to the Wound roll.'
        }
      ],
      enhancements: [
        {
          name: 'Transdimensional Presence',
          points: 25,
          text: 'C\'TAN SHARD model only. The bearer has the Lone Operative ability while it is within 3" of one or more objective markers you control.'
        },
        {
          name: 'Eternal Conqueror of Worlds',
          points: 20,
          text: 'C\'TAN SHARD model only. Add 1 to the Objective Control characteristic of the bearer.'
        },
        {
          name: 'Shifting Hypermatter',
          points: 15,
          text: 'C\'TAN SHARD model only. The bearer has the Stealth ability.'
        },
        {
          name: 'Nexus of Entropy',
          points: 30,
          text: 'C\'TAN SHARD model only. While an enemy unit is within 6" of the bearer, subtract 1 from the Objective Control characteristic of models in that enemy unit.'
        }
      ],
      stratagems: [
        {
          id: 'pantheon-of-woe-disharmonisation',
          name: 'DISHARMONISATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One C\'TAN SHARD unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Hit roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'pantheon-of-woe-molecular-erosion',
          name: 'MOLECULAR EROSION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One C\'TAN SHARD unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, improve the Armour Penetration characteristic of weapons equipped by models in your unit by 1.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'pantheon-of-woe-mass-transmogrification',
          name: 'MASS TRANSMOGRIFICATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One C\'TAN SHARD unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'pantheon-of-woe-entrophasic-aura-targeting',
          name: 'ENTROPHASIC AURA TARGETING',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One C\'TAN SHARD unit from your army.',
          effect: 'Select one enemy unit within 18" of your unit. Until the start of your next Command phase, that enemy unit must take Battle-shock tests at -1.',
          phaseTags: ['Command']
        },
        {
          id: 'pantheon-of-woe-chronodistortion',
          name: 'CHRONODISTORTION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Charge phase, just after an enemy unit has declared a charge.',
          target: 'One C\'TAN SHARD unit from your army that was selected as a target of that charge.',
          effect: 'Until the end of the phase, subtract 2 from Charge rolls made for that enemy unit.',
          phaseTags: ['Charge']
        },
        {
          id: 'pantheon-of-woe-phase-melding',
          name: 'PHASE MELDING',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One C\'TAN SHARD unit from your army.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Movement']
        }
      ]
    }
  ];
}());
