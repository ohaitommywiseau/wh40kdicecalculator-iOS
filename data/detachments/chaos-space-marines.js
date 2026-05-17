(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['chaos-space-marines'] = [
    {
      slug: 'nightmare-hunt',
      name: 'Nightmare Hunt',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/chaos-space-marines/',
      rules: [
        {
          name: 'Terror Made Manifest',
          text: 'In the Battle-shock step of your opponent\'s Command phase, if an enemy unit that is below its Starting Strength is within 12" of one or more HERETIC ASTARTES units from your army, that enemy unit must take a Battle-shock test, subtracting 1 from the result. Enemy units affected by this Detachment rule do not need to take any other Battle-shock tests in the same phase.\n\nEach time a HERETIC ASTARTES model from your army makes an attack that targets a unit that is Below Half-strength, add 1 to the Hit roll.\n\nEach time an attack targets a HERETIC ASTARTES unit from your army, if the attacking model is Battle-shocked, subtract 1 from the Hit roll.\n\nEach time a HERETIC ASTARTES model from your army makes an attack that targets a Battle-shocked unit, add 1 to the Wound roll.'
        }
      ],
      enhancements: [
        {
          name: 'Greyveil Hex',
          points: 25,
          text: 'CHAOS LORD model only. Models in the bearer\'s unit have the Stealth ability. While the bearer\'s unit is within range of one or more objective markers you control, that unit can only be selected as the target of a ranged attack if the attacking model is within 18".'
        },
        {
          name: 'Warp-fuelled Thrusters',
          points: 20,
          text: 'CHAOS LORD JUMP PACK model only. At the end of your opponent\'s Fight phase, if the bearer\'s unit is not within Engagement Range of one or more enemy units, you can remove the bearer\'s unit from the battlefield and place it into Strategic Reserves.'
        },
        {
          name: 'Terrorglut Parasite',
          points: 20,
          text: 'HERETIC ASTARTES model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer must take a Battle-shock test, subtracting 1 from the result.'
        },
        {
          name: 'Sorrowscent Vulture',
          points: 35,
          text: 'CHAOS LORD JUMP PACK model only. Models in the bearer\'s unit have the Scouts 6" ability. In the Declare Battle Formations step, the bearer can be attached to a WARP TALONS unit.'
        }
      ],
      stratagems: [
        {
          id: 'nightmare-hunt-talons-sunk-deep',
          name: 'TALONS SUNK DEEP',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One HERETIC ASTARTES INFANTRY unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a unit that is Battle-shocked and/or Below Half-strength, improve the Armour Penetration characteristic of that attack by 1.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'nightmare-hunt-prey-on-the-weak',
          name: 'PREY ON THE WEAK',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One HERETIC ASTARTES INFANTRY unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a unit that is Battle-shocked and/or Below Half-strength, you can re-roll the Hit roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'nightmare-hunt-sadistic-display',
          name: 'SADISTIC DISPLAY',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase, just after a HERETIC ASTARTES unit from your army destroys an enemy unit.',
          target: 'That HERETIC ASTARTES unit.',
          effect: 'Each enemy unit within 6" of and visible to your unit (excluding MONSTER and VEHICLE units) must take a Battle-shock test.',
          phaseTags: ['Fight']
        },
        {
          id: 'nightmare-hunt-malicious-surge',
          name: 'MALICIOUS SURGE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One HERETIC ASTARTES INFANTRY unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
          phaseTags: ['Charge']
        },
        {
          id: 'nightmare-hunt-relentless-terror',
          name: 'RELENTLESS TERROR',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a HERETIC ASTARTES INFANTRY unit from your army Falls Back.',
          target: 'That HERETIC ASTARTES unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          phaseTags: ['Movement']
        },
        {
          id: 'nightmare-hunt-horrific-incursion',
          name: 'HORRIFIC INCURSION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One HERETIC ASTARTES unit from your army that arrived from Reserves this turn.',
          effect: 'Select one enemy unit (excluding MONSTER and VEHICLE units) within 12" of and visible to your unit: that unit must take a Battle-shock test, subtracting 1 from the result.',
          phaseTags: ['Movement']
        }
      ]
    },
    {
      slug: 'hurons-marauders',
      name: 'Huron\'s Marauders',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/chaos-space-marines/',
      rules: [
        {
          name: 'Tyrannical Motivation',
          text: 'In your Command phase, select one of the following abilities. Until the start of your next Command phase, each HERETIC ASTARTES INFANTRY unit from your army has that ability. At the start of each phase, if such a unit is visible to a friendly Huron Blackheart model, until the end of the phase, it has both of the following abilities.\n\nHuron\'s Elite: Each time a model in this unit makes an attack, add 1 to the Hit roll.\n\nMobile Marauders: This unit is eligible to shoot and declare a charge in a turn in which it Fell Back.'
        }
      ],
      enhancements: [
        {
          name: 'Voice of the Tyrant',
          points: 25,
          text: 'HERETIC ASTARTES model only (excluding DAMNED models). The bearer\'s unit has both abilities from the Tyrannical Motivation Detachment rule.'
        },
        {
          name: 'Raid Leader',
          points: 20,
          text: 'HERETIC ASTARTES model only (excluding DAMNED models). Each time the bearer\'s unit is set up after disembarking from a TRANSPORT that has made a Normal move this turn, the bearer\'s unit is still eligible to declare a charge.'
        },
        {
          name: 'Dread Reputation',
          points: 25,
          text: 'HERETIC ASTARTES model only (excluding DAMNED models). Each time the bearer\'s unit is set up on the battlefield, each enemy unit within 6" of the bearer\'s unit (or within 12" if the bearer\'s unit was set up using the Deep Strike ability) takes a Battle-shock test.'
        },
        {
          name: 'Eager for Bloodshed',
          points: 30,
          text: 'HERETIC ASTARTES model only. The bearer has the Infiltrators ability.'
        }
      ],
      stratagems: [
        {
          id: 'hurons-marauders-hardened-killers',
          name: 'HARDENED KILLERS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One DAMNED unit from your army.',
          effect: 'Select one of the following effects: improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1; improve the Attacks characteristic of Rapid Fire weapons equipped by models in this unit by 1; improve the Save characteristic of models in this unit by 1. Until the start of your next turn, your unit has the benefit of that effect.',
          phaseTags: ['Command']
        },
        {
          id: 'hurons-marauders-at-the-tyrants-command',
          name: 'AT THE TYRANT\'S COMMAND',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One HERETIC ASTARTES unit (excluding MONSTERS and VEHICLES) from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced.',
          phaseTags: ['Movement']
        },
        {
          id: 'hurons-marauders-seize-the-prize',
          name: 'SEIZE THE PRIZE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Movement phase, just after a HERETIC ASTARTES unit (excluding MONSTERS and VEHICLES) from your army has been selected to Advance.',
          target: 'That HERETIC ASTARTES unit.',
          effect: 'Do not make an Advance roll for your unit. Instead, until the end of the phase add 6" to the Move characteristic of models in your unit.',
          phaseTags: ['Movement']
        },
        {
          id: 'hurons-marauders-reavers-flurry',
          name: 'REAVERS\' FLURRY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Fight phase.',
          target: 'One HERETIC ASTARTES unit from your army that made a Charge move this turn.',
          effect: 'Until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in your unit.',
          phaseTags: ['Fight']
        },
        {
          id: 'hurons-marauders-to-the-favoured-the-spoils',
          name: 'TO THE FAVOURED THE SPOILS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One HERETIC ASTARTES unit from your army that lost one or more wounds as a result of those attacks.',
          effect: 'Your unit can make a Surge move. To do so, roll one D6: models in your unit move a number of inches up to the result, but your unit must end that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, those models can be moved within Engagement Range of that enemy unit.',
          phaseTags: ['Shooting']
        },
        {
          id: 'hurons-marauders-encircling-surge',
          name: 'ENCIRCLING SURGE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One HERETIC ASTARTES unit (excluding MONSTERS and VEHICLES) from your army that is within 6" of one or more battlefield edges and not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'renegade-warband',
      name: 'Renegade Warband',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/chaos-space-marines/',
      rules: [
        {
          name: 'Slaves to None',
          text: 'HERETIC ASTARTES models from your army lose the Dark Pacts ability.\n\nRanged weapons equipped by HERETIC ASTARTES models from your army have the [ASSAULT] ability.\n\nWhen mustering your army, you cannot use the Cults of the Dark Gods rule.'
        },
        {
          name: 'Vendetta',
          text: 'At the start of your Command phase, select one unit from your opponent\'s army. Until the start of your next Command phase, that enemy unit is your Vendetta target. Each time a HERETIC ASTARTES model from your army (excluding DAMNED models) makes an attack that targets your Vendetta target, you can re-roll the Hit roll.'
        },
        {
          name: 'Twisted Doctrine',
          text: 'In your Movement phase, each time you set up or select a HERETIC ASTARTES unit (excluding Battle-shocked units) from your army to move, it can choose to Default to Doctrine. If it does, it must first take a Battle-shock test. Then, select one of the following: until the end of the turn, this unit is eligible to shoot and declare a charge in a turn in which it Fell Back; or until the end of the turn, this unit is eligible to declare a charge in a turn in which it Advanced.'
        }
      ],
      enhancements: [
        {
          name: 'Weaponised Hatred',
          points: 35,
          text: 'HERETIC ASTARTES model only. Once per battle round, after your Vendetta target is destroyed, if the bearer is on the battlefield, you can select one enemy unit visible to the bearer. That enemy unit becomes your Vendetta target until you select a new one.'
        },
        {
          name: 'Eyes of the Hunter',
          points: 15,
          text: 'HERETIC ASTARTES model only. Ranged weapons equipped by models in the bearer\'s unit have the [IGNORES COVER] ability.'
        },
        {
          name: 'Fratricidal Trophies',
          points: 5,
          text: 'HERETIC ASTARTES TERMINATOR model only. In a turn in which the bearer\'s unit chose to Default to Doctrine, until the end of the turn, each time a model in this unit makes an attack, you can re-roll the Hit roll.'
        },
        {
          name: 'Empyric Symbiote',
          points: 15,
          text: 'HERETIC ASTARTES model only. Add 1 to Advance and Charge rolls made for the bearer\'s unit.'
        }
      ],
      stratagems: [
        {
          id: 'renegade-warband-never-outgunned',
          name: 'NEVER OUTGUNNED',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One HERETIC ASTARTES unit from your army that has just been selected to shoot or fight.',
          effect: 'Select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have the selected ability.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'renegade-warband-vengeful-destruction',
          name: 'VENGEFUL DESTRUCTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One HERETIC ASTARTES INFANTRY (excluding DAMNED units) or HERETIC ASTARTES MOUNTED unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time your unit makes an attack that targets your Vendetta target, add 1 to the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'renegade-warband-undying-hatred',
          name: 'UNDYING HATRED',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One HERETIC ASTARTES unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'renegade-warband-renegade-claim',
          name: 'RENEGADE CLAIM',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One HERETIC ASTARTES unit from your army within range of an objective marker you control.',
          effect: 'That objective marker remains under your control until your opponent\'s Level of Control over that objective marker is greater than yours at the end of a phase.',
          phaseTags: ['Movement']
        },
        {
          id: 'renegade-warband-corrupted-munitions',
          name: 'CORRUPTED MUNITIONS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One HERETIC ASTARTES unit in your army that has just been selected to shoot.',
          effect: 'Until the end of the phase, each time a model in this unit makes a ranged attack, improve the Armour Penetration characteristic of that attack by 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'renegade-warband-reavers-reaction',
          name: 'REAVERS\' REACTION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One HERETIC ASTARTES unit (excluding MONSTERS and VEHICLES) from your army that was hit by one or more of those attacks.',
          effect: 'Your unit can make a Normal move of up to D6".',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'warpstrike-champions',
      name: 'Warpstrike Champions',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/chaos-space-marines/',
      rules: [
        {
          name: 'Warp Portals',
          text: 'At the end of your opponent\'s turn, you can select a number of HERETIC ASTARTES TERMINATOR, OBLITERATORS and MUTILATORS units from your army (excluding units that are within Engagement Range of one or more enemy units). The maximum number of units you can select depends on the battle size, as follows: Incursion up to 1 unit; Strike Force up to 2 units; Onslaught up to 3 units. Once you have made your selections, remove those units from the battlefield and place them into Strategic Reserves.'
        }
      ],
      enhancements: [
        {
          name: 'Infernal Fulgurite',
          points: 20,
          text: 'HERETIC ASTARTES model only (excluding DAMNED models). Once per battle, you can target the bearer\'s unit with the Rapid Ingress Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.'
        },
        {
          name: 'Eye of the Warp',
          points: 15,
          text: 'HERETIC ASTARTES model with the Deep Strike ability only. Each time the bearer\'s unit is set up on the battlefield, until the end of the turn, you can re-roll Charge rolls made for that unit.'
        },
        {
          name: 'Akshur\'s Binding Runes',
          points: 20,
          text: 'HERETIC ASTARTES model with the Deep Strike ability only. The bearer\'s unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.'
        },
        {
          name: 'Tzagulla',
          points: 25,
          text: 'HERETIC ASTARTES model with the Deep Strike ability only. Improve the Attacks, Strength and Armour Penetration characteristics of the bearer\'s weapons by 1. In addition, each time the bearer\'s unit is set up on the battlefield from Reserves, until the end of the turn, improve the Damage characteristic of the bearer\'s weapons by 1.'
        }
      ],
      stratagems: [
        {
          id: 'warpstrike-champions-empyric-dislocation',
          name: 'EMPYRIC DISLOCATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One HERETIC ASTARTES unit from your army (excluding DAMNED units) that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          restrictions: 'You cannot target the same unit with the Empyric Dislocation and Armour of Corruption Stratagems in the same phase.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'warpstrike-champions-armour-of-corruption',
          name: 'ARMOUR OF CORRUPTION',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One HERETIC ASTARTES TERMINATOR, OBLITERATORS or MUTILATORS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the turn, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: 'You cannot target the same unit with the Armour of Corruption and Empyric Dislocation Stratagems in the same phase.',
          phaseTags: ['Fight']
        },
        {
          id: 'warpstrike-champions-warp-flicker',
          name: 'WARP FLICKER',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One HERETIC ASTARTES TERMINATOR, OBLITERATORS or MUTILATORS unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced.',
          phaseTags: ['Movement']
        },
        {
          id: 'warpstrike-champions-warp-tainted',
          name: 'WARP-TAINTED',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One HERETIC ASTARTES TERMINATOR, OBLITERATORS or MUTILATORS unit from your army, within range of an objective marker you control.',
          effect: 'That objective marker remains under your control until your opponent\'s Level of Control over that objective marker is greater than yours at the end of a phase.',
          phaseTags: ['Movement']
        },
        {
          id: 'warpstrike-champions-siegebreaker-strike',
          name: 'SIEGEBREAKER STRIKE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'Up to two HERETIC ASTARTES units from your army that were set up using the Deep Strike ability this turn and have not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your units have the [IGNORES COVER] ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'warpstrike-champions-portal-of-spite',
          name: 'PORTAL OF SPITE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One HERETIC ASTARTES unit from your army that was set up using the Deep Strike ability this turn and has not declared a charge this phase.',
          effect: 'Until the end of the phase, each time your unit declares a charge, if the closest eligible enemy unit is selected as one of the targets of that charge, add 2 to the Charge roll.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'cult-of-the-arkifane',
      name: 'Cult of the Arkifane',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/chaos-space-marines/',
      rules: [
        {
          name: 'Soul Forge Boons',
          text: 'HERETIC ASTARTES VEHICLE units from your army gain the DAEMON keyword.\n\nHERETIC ASTARTES VEHICLE, LORD DISCORDANT and VASHTORR THE ARKIFANE units from your army gain the SOUL FORGE keyword.\n\nSOUL FORGE units from your army have a 5+ invulnerable save.'
        }
      ],
      enhancements: [
        {
          name: 'Wyredjinn',
          points: 25,
          text: 'HERETIC ASTARTES model only (excluding DAMNED models). At the start of your Command phase, if the bearer is on the battlefield, roll one D6, adding 1 to the result if the bearer is within range of an objective marker you control: on a 4+, you gain 1CP.'
        },
        {
          name: 'Cybinfernal Font',
          points: 20,
          text: 'HERETIC ASTARTES model only (excluding DAMNED models). Models in the bearer\'s unit have the SOUL FORGE keyword.'
        },
        {
          name: 'Mark of the Soul Forges',
          points: 20,
          text: 'HERETIC ASTARTES model only (excluding DAMNED models). Each time the bearer makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.'
        },
        {
          name: 'Crown of Worms',
          points: 15,
          text: 'WARPSMITH model only. Add 3" to the range of the bearer\'s Warpsmith, Master of Mechanisms and Enrage Machine Spirits abilities.'
        }
      ],
      stratagems: [
        {
          id: 'cult-of-the-arkifane-touch-of-the-arkifane',
          name: 'TOUCH OF THE ARKIFANE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Any phase.',
          target: 'One HERETIC ASTARTES unit from your army (excluding DAMNED units) that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, if your unit is selected to make a Dark Pact, you can select both abilities for that unit\'s weapons to gain.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'cult-of-the-arkifane-balefire-boon',
          name: 'BALEFIRE BOON',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One SOUL FORGE unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, improve the Armour Penetration characteristic of that attack by 1.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'cult-of-the-arkifane-soul-tally-offering',
          name: 'SOUL-TALLY OFFERING',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One SOUL FORGE unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a CHARACTER, MONSTER or VEHICLE unit, you can re-roll the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'cult-of-the-arkifane-biomechanoid-regeneration',
          name: 'BIOMECHANOID REGENERATION',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One HERETIC ASTARTES unit from your army (excluding DAMNED units).',
          effect: 'One model in your unit regains up to D3 lost wounds. If your unit has the SOUL FORGE keyword, one model in your unit regains up to 3 lost wounds instead.',
          phaseTags: ['Command']
        },
        {
          id: 'cult-of-the-arkifane-forge-fire-surge',
          name: 'FORGE-FIRE SURGE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a HERETIC ASTARTES unit from your army Advances.',
          target: 'That HERETIC ASTARTES unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Advanced. If your unit has the SOUL FORGE keyword, until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced instead.',
          phaseTags: ['Movement']
        },
        {
          id: 'cult-of-the-arkifane-unholy-fortitude',
          name: 'UNHOLY FORTITUDE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One SOUL FORGE unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, add 1 to the Toughness characteristic of models in your unit.',
          phaseTags: ['Shooting']
        }
      ]
    }
  ];
}());
