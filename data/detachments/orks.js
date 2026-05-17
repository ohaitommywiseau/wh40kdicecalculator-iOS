(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['orks'] = [
    {
      slug: 'war-horde',
      name: 'War Horde',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Get Stuck In',
          text: 'Melee weapons equipped by ORKS models from your army have the [SUSTAINED HITS 1] ability.'
        }
      ],
      enhancements: [
        {
          name: 'Follow Me Ladz',
          points: 25,
          text: 'ORKS model only. While the bearer is leading a unit, add 2" to the Move characteristic of models in that unit.'
        },
        {
          name: 'Headwoppa\'s Killchoppa',
          points: 20,
          text: 'ORKS model only. Melee weapons equipped by the bearer (excluding Extra Attacks weapons) have the [DEVASTATING WOUNDS] ability.'
        },
        {
          name: 'Kunnin\' But Brutal',
          points: 15,
          text: 'ORKS model only. While the bearer is leading a unit, that unit is eligible to shoot and declare a charge in a turn in which it Fell Back.'
        },
        {
          name: 'Supa-Cybork Body',
          points: 15,
          text: 'ORKS model only. The bearer has the Feel No Pain 4+ ability.'
        }
      ],
      stratagems: [
        {
          id: 'war-horde-careen',
          name: 'CAREEN!',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Any phase, just after an ORKS VEHICLE unit from your army with the Deadly Demise ability is destroyed.',
          target: 'That destroyed ORKS VEHICLE unit, if you roll a 6 for its Deadly Demise ability.',
          effect: 'Your unit can make a Normal or Fall Back move before its Deadly Demise ability is resolved, and before any embarked units perform an Emergency Disembarkation. When making this move, your unit can move over enemy units (excluding MONSTERS and VEHICLES) as if they were not there.',
          restrictions: 'You can use this Stratagem on that unit even though it was just destroyed.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'war-horde-orks-is-never-beaten',
          name: 'ORKS IS NEVER BEATEN',
          cp: 2,
          type: 'Epic Deed',
          timing: 'opponent',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ORKS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking model\'s unit has finished making attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'war-horde-unbridled-carnage',
          name: 'UNBRIDLED CARNAGE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ORKS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a melee attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: ['Fight']
        },
        {
          id: 'war-horde-ard-as-nails',
          name: '\'ARD AS NAILS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ORKS unit from your army (excluding GROTS, MONSTER and VEHICLE units) that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'war-horde-mob-rule',
          name: 'MOB RULE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'End of your Command phase.',
          target: 'One MOB unit from your army that contains 10 or more models and is not Below Half-strength.',
          effect: 'Select one friendly Battle-shocked ORKS INFANTRY unit within 6" of that MOB unit. That ORKS INFANTRY unit is no longer Battle-shocked.',
          phaseTags: ['Command']
        },
        {
          id: 'war-horde-ere-we-go',
          name: 'ERE WE GO',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Start of your Movement phase.',
          target: 'One ORKS INFANTRY unit from your army.',
          effect: 'Until the end of the turn, add 2 to Advance and Charge rolls made for your unit.',
          phaseTags: ['Movement', 'Charge']
        }
      ]
    },
    {
      slug: 'da-big-hunt',
      name: 'Da Big Hunt',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Da Hunt Is On',
          text: 'At the start of your Command phase, select one MONSTER, VEHICLE or CHARACTER unit from your opponent\'s army. Until the start of your next Command phase, that enemy unit is your Prey.\n\nEach time a BEAST SNAGGA unit from your army declares a charge that includes your Prey as one of the targets, you can re-roll the Charge roll.\n\nEach time a BEAST SNAGGA model from your army makes an attack that targets your Prey, improve the Armour Penetration characteristic of that attack by 1.'
        }
      ],
      enhancements: [
        {
          name: 'Glory Hog',
          points: 30,
          text: 'BEASTBOSS ON SQUIGOSAUR model only. Models in the bearer\'s unit have the Scouts 9" ability.'
        },
        {
          name: 'Proper Killy',
          points: 15,
          text: 'BEAST SNAGGA model only. Add 1 to the Damage characteristic of melee weapons equipped by the bearer.'
        },
        {
          name: 'Skrag Every Stash!',
          points: 25,
          text: 'BEAST SNAGGA model only. At the end of your Command phase, if the bearer is within range of an objective marker you control, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.'
        },
        {
          name: 'Surly As A Squiggoth',
          points: 20,
          text: 'BEASTBOSS ON SQUIGOSAUR model only. While the bearer is leading a unit, each time an attack targets that unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll.'
        }
      ],
      stratagems: [
        {
          id: 'da-big-hunt-drag-it-down',
          name: 'DRAG IT DOWN',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One BEAST SNAGGA unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability. In addition, each time a model in your unit makes a melee attack that targets your Prey, a Critical Hit is scored on an unmodified Hit roll of 5+, instead of only a 6.',
          phaseTags: ['Fight']
        },
        {
          id: 'da-big-hunt-unstoppable-momentum',
          name: 'UNSTOPPABLE MOMENTUM',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Charge phase, just after a BEAST SNAGGA MOUNTED unit from your army ends a Charge move.',
          target: 'That BEAST SNAGGA unit.',
          effect: 'Select one enemy unit within Engagement Range of your unit and roll one D6 for each model in your unit: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds). If that enemy unit is your Prey, roll three additional D6.',
          phaseTags: ['Charge']
        },
        {
          id: 'da-big-hunt-dat-ones-even-bigga',
          name: 'DAT ONE\'S EVEN BIGGA!',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One BEAST SNAGGA unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to charge in a turn in which it Advanced or Fell Back. In addition, you can re-roll Charge rolls made for your unit, provided one of the targets of that charge is your Prey.',
          phaseTags: ['Charge']
        },
        {
          id: 'da-big-hunt-where-dya-fink-youre-going',
          name: 'WHERE D\'YA FINK YOU\'RE GOING?',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Fall Back move.',
          target: 'One BEAST SNAGGA INFANTRY or BEAST SNAGGA MOUNTED unit from your army that was within Engagement Range of that enemy unit at the start of the phase.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        },
        {
          id: 'da-big-hunt-stalkin-taktiks',
          name: 'STALKIN\' TAKTIKS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One BEAST SNAGGA INFANTRY or BEAST SNAGGA MOUNTED unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a ranged attack targets your unit, models in your unit have the Benefit of Cover against that attack. In addition, if your unit has the INFANTRY keyword, until the end of the phase, models in your unit have the Stealth ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'da-big-hunt-instinctive-hunters',
          name: 'INSTINCTIVE HUNTERS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One BEAST SNAGGA unit from your army that is not within Engagement Range of one or more enemy unit.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'kult-of-speed',
      name: 'Kult of Speed',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Adrenaline Junkies',
          text: 'SPEED FREEKS units from your army are eligible to shoot and declare a charge in a turn in which they Advanced or Fell Back.'
        }
      ],
      enhancements: [
        {
          name: 'Fasta Than Yooz',
          points: 35,
          text: 'ORKS INFANTRY model only. Each time the bearer\'s unit disembarks from a TRANSPORT after that TRANSPORT has made a Normal move, the bearer\'s unit is still eligible to declare a charge this turn.'
        },
        {
          name: 'Speed Makes Right',
          points: 25,
          text: 'ORKS model only. In your Command phase, if the bearer (or a TRANSPORT the bearer is embarked within) is within 9" of one or more enemy units, roll one D6: on a 3+, you gain 1CP.'
        },
        {
          name: 'Squig-hide Tyres',
          points: 15,
          text: 'DEFFKILLA WARTRIKE model only. Each time a model in the bearer\'s unit makes a Consolidation move, it can move up to 6" instead of up to 3".'
        },
        {
          name: 'Wazblasta',
          points: 10,
          text: 'DEFFKILLA WARTRIKE model only. In your Shooting phase, after the bearer\'s unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6". If it does, until the end of the turn, it is not eligible to declare a charge.'
        }
      ],
      stratagems: [
        {
          id: 'kult-of-speed-speediest-freeks',
          name: 'SPEEDIEST FREEKS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One SPEED FREEKS or TRUKK unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, models in your unit have a 5+ invulnerable save. If your unit is a VEHICLE unit with an unmodified Toughness characteristic of 8 or less, until the end of the phase, models in your unit have a 4+ invulnerable save instead.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'kult-of-speed-squig-flingin',
          name: 'SQUIG FLINGIN\'',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a SPEED FREEKS or TRUKK unit from your army ends a Normal, Advance or Fall Back move.',
          target: 'That SPEED FREEKS or TRUKK unit.',
          effect: 'Select one enemy unit within 9" of your unit. That enemy unit must take a Battle-shock test and, when doing so, subtract 1 from the result.',
          phaseTags: ['Movement']
        },
        {
          id: 'kult-of-speed-dakkastorm',
          name: 'DAKKASTORM',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One SPEED FREEKS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability. While targeting a unit within 9", they have the [SUSTAINED HITS 2] ability instead.',
          restrictions: 'A unit cannot be targeted by this and the Blitza Fire Stratagem in the same phase.',
          phaseTags: ['Shooting']
        },
        {
          id: 'kult-of-speed-blitza-fire',
          name: 'BLITZA FIRE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One SPEED FREEKS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [LETHAL HITS] ability and, each time a model in your unit makes an attack that targets a unit within 9", a Critical Hit is scored on an unmodified Hit roll of 5+, instead of only a 6.',
          restrictions: 'A unit cannot be targeted by this and the Dakkastorm Stratagem in the same phase.',
          phaseTags: ['Shooting']
        },
        {
          id: 'kult-of-speed-full-throttle',
          name: 'FULL THROTTLE!',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase, just after a SPEED FREEKS unit from your army ends a Charge move.',
          target: 'That SPEED FREEKS unit.',
          effect: 'Until the end of the turn, each time a model in your unit makes a melee attack, add 1 to the Wound roll.',
          phaseTags: ['Charge', 'Fight']
        },
        {
          id: 'kult-of-speed-more-gitz-over-ere',
          name: 'MORE GITZ OVER \'ERE!',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One SPEED FREEKS unit from your army that is within 9" of that enemy unit and is not within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        }
      ]
    },
    {
      slug: 'dread-mob',
      name: 'Dread Mob',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Try Dat Button!',
          text: 'Each time a MEK, ORKS WALKER or GROTS VEHICLE unit from your army is selected to shoot or fight, roll one D6. Until the end of the phase, weapons equipped by models in that unit have the corresponding ability shown in the table below.\n\n1-2: [SUSTAINED HITS 1]\n3-4: [LETHAL HITS]\n5-6: Each time an attack is made with this weapon, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 2.\n\nAlternatively, when such a unit is selected to shoot or fight, you can select one of the abilities above instead of rolling the D6. If you do, until the end of the phase, weapons equipped by models in that unit have the [HAZARDOUS] ability as well.\n\nIf a weapon equipped by a model from your army has the [HAZARDOUS] ability from multiple sources, each time you take a Hazardous test for that weapon, it is failed on a roll of a 1 or a 2.\n\nGRETCHIN units from your army gain the BATTLELINE keyword.'
        }
      ],
      enhancements: [
        {
          name: 'Gitfinder Googlez',
          points: 10,
          text: 'MEK model only. Ranged weapons equipped by models in the bearer\'s unit have the [IGNORES COVER] ability.'
        },
        {
          name: 'Press It Fasta!',
          points: 35,
          text: 'MEK model only. Each time the bearer\'s unit is selected to shoot, when rolling to determine which ability that unit\'s weapons gain from the Try Dat Button! Detachment rule, roll one additional D6: until the end of the phase, ranged weapons equipped by models in that unit gain both Button Effects generated by those rolls. If a duplicate Button Effect is rolled, it has no additional effect.'
        },
        {
          name: 'Smoky Gubbinz',
          points: 15,
          text: 'MEK model only. Models in the bearer\'s unit have the Stealth ability.'
        },
        {
          name: 'Supa-glowy Fing',
          points: 20,
          text: 'MEK model only. In your Command phase, select one enemy unit within 18" of and visible to the bearer, then roll one D6: on a 1-2, that enemy unit must take a Battle-shock test; on a 3-4, that enemy unit suffers D3 mortal wounds; on a 5-6, until the start of your next Command phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll.'
        }
      ],
      stratagems: [
        {
          id: 'dread-mob-klankin-klaws',
          name: 'KLANKIN\' KLAWS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ORKS WALKER unit from your army that has not been selected to fight this phase.',
          effect: 'Each time you use this Stratagem, you can choose to push it. Until the end of the phase, add 2 to the Strength characteristic of melee weapons equipped by models in your unit and, if you chose to push it, until the end of the phase, add 1 to the Damage characteristic of those weapons and they have the [HAZARDOUS] ability as well.',
          phaseTags: ['Fight']
        },
        {
          id: 'dread-mob-superfuelled-boiler',
          name: 'SUPERFUELLED BOILER',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an ORKS WALKER unit from your army has been selected to Advance.',
          target: 'That ORKS WALKER unit.',
          effect: 'Until the end of the turn, you can re-roll Advance rolls made for your unit and ranged weapons equipped by models in your unit have the [ASSAULT] ability.',
          phaseTags: ['Movement']
        },
        {
          id: 'dread-mob-bigger-shells-for-bigger-gitz',
          name: 'BIGGER SHELLS FOR BIGGER GITZ',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One MEK, ORKS WALKER or GROTS VEHICLE unit from your army that has not been selected to shoot this phase.',
          effect: 'Each time you use this Stratagem, you can choose to push it. Until the end of the phase, each time a model in your unit makes an attack that targets a MONSTER or VEHICLE, add 1 to the Wound roll. If you chose to push it, add 1 to the Damage characteristic of that attack and, until the end of the phase, ranged weapons equipped by models in your unit have the [HAZARDOUS] ability as well.',
          phaseTags: ['Shooting']
        },
        {
          id: 'dread-mob-dakka-dakka-dakka',
          name: 'DAKKA! DAKKA! DAKKA!',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ORKS WALKER or GROTS VEHICLE unit from your army that has not been selected to shoot this phase.',
          effect: 'Each time you use this Stratagem, you can choose to push it. Until the end of the phase, each time a model in your unit makes an attack, re-roll a Hit roll of 1. If you chose to push it, you can re-roll the Hit roll instead and, until the end of the phase, ranged weapons equipped by models in your unit have the [HAZARDOUS] ability as well.',
          phaseTags: ['Shooting']
        },
        {
          id: 'dread-mob-conniving-runts',
          name: 'CONNIVING RUNTS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One GRETCHIN unit from your army that is within 9" of that enemy unit and not within Engagement Range of any enemy units.',
          effect: 'Roll one D6: on a 4+, that enemy unit suffers D3+1 mortal wounds. Your unit can then make a Normal move.',
          phaseTags: ['Movement']
        },
        {
          id: 'dread-mob-extra-gubbinz',
          name: 'EXTRA GUBBINZ',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ORKS WALKER or GROTS VEHICLE unit from your army (excluding TITANIC units) that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'green-tide',
      name: 'Green Tide',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Mob Mentality',
          text: 'Each time an attack targets a BOYZ unit from your army, models in that unit have a 6+ invulnerable save against that attack. Each time an attack targets a BOYZ unit from your army that contains 10 or more models, models in that unit have a 5+ invulnerable save against that attack.'
        }
      ],
      enhancements: [
        {
          name: 'Bloodthirsty Belligerence',
          points: 15,
          text: 'ORKS INFANTRY model only. While the bearer is leading a unit, you can re-roll Advance rolls made for that unit. While that unit contains 10 or more models, you can re-roll Charge rolls made for that unit as well.'
        },
        {
          name: 'Brutal But Kunnin\'',
          points: 25,
          text: 'ORKS INFANTRY model only. In your Command phase, if the bearer is on the battlefield (or is embarked within a TRANSPORT that is on the battlefield), roll one D6, adding 2 to the result if the bearer\'s unit contains 10 or more models: on a 5+, you gain 1CP.'
        },
        {
          name: 'Ferocious Show Off',
          points: 10,
          text: 'ORKS INFANTRY model only. Each time the bearer fights, while resolving those attacks, add 1 to the Strength characteristic of the bearer\'s melee weapons. If the bearer\'s unit contains 10 or more models, while resolving those attacks, add 3 to the Strength characteristic instead.'
        },
        {
          name: 'Raucous Warcaller',
          points: 20,
          text: 'ORKS INFANTRY model only. While the bearer is leading a unit, that unit always counts as containing 10 or more models for the purposes of your Detachment rule and any Stratagems you use.'
        }
      ],
      stratagems: [
        {
          id: 'green-tide-competitive-streak',
          name: 'COMPETITIVE STREAK',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One BOYZ unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1. If your unit contains 10 or more models, re-roll the Wound roll instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'green-tide-bulldozer-brutality',
          name: 'BULLDOZER BRUTALITY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One BOYZ unit from your army that has not been selected to fight this phase and is within Engagement Range of one or more enemy units.',
          effect: 'Until the end of the phase, each time your unit is selected to fight, when determining which models in your unit are eligible to fight, any models in your unit that are within 3" of one or more enemy models are eligible to fight. When resolving those attacks, such models can target one of those enemy units that is within 3" of them and within Engagement Range of their unit.',
          phaseTags: ['Fight']
        },
        {
          id: 'green-tide-braggin-rights',
          name: 'BRAGGIN\' RIGHTS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'Two BOYZ units from your army that are within 6" of each other.',
          effect: 'Until the start of your next Command phase, while those two units are within 6" of each other, they both count as containing 10 or more models for the purposes of your Detachment rule, any Enhancements models from your army have and any Stratagems you use.',
          phaseTags: ['Command']
        },
        {
          id: 'green-tide-come-on-ladz',
          name: 'COME ON LADZ!',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One BOYZ unit from your army.',
          effect: 'Return up to D3+2 destroyed models to your unit (excluding CHARACTER models).',
          phaseTags: ['Command']
        },
        {
          id: 'green-tide-tide-of-muscle',
          name: 'TIDE OF MUSCLE',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One BOYZ unit from your army that has not declared a charge this phase.',
          effect: 'Until the end of the phase, each time your unit declares a charge, add 1 to the Charge roll and, if your unit contains 10 or more models, you can re-roll the Charge roll.',
          phaseTags: ['Charge']
        },
        {
          id: 'green-tide-go-get-em',
          name: 'GO GET \'EM!',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One BOYZ unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'After the attacking unit has shot, your unit can make a Go Get \'Em! move. To do so, roll one D6: each model in your unit can move a distance in inches up to the result, but your unit must end that move as close as possible to the closest enemy unit. When doing so, those models can be moved within Engagement Range of that enemy unit. If your unit contains 10 or more models, you can re-roll the D6 to determine how far your unit can move.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'bully-boyz',
      name: 'Bully Boyz',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Da Boss Is Watchin\'',
          text: 'The first time you call a Waaagh!, until the start of your next Command phase, the Waaagh! is active for WARBOSS, NOBZ and MEGANOBZ units from your army.\n\nAt the start of your Command phase, in a turn in which you have not called a Waaagh!, if you have one or more WARBOSS models on the battlefield (or embarked within a TRANSPORT that is on the battlefield), you can call a Waaagh! for a second time this battle. When doing so, that second Waaagh! only counts as having been called for WARBOSS, NOBZ and MEGANOBZ units from your army.'
        }
      ],
      enhancements: [
        {
          name: 'Big Gob',
          points: 20,
          text: 'INFANTRY WARBOSS model only. At the start of the Fight phase, select one enemy unit within Engagement Range of the bearer. That unit must take a Battle-shock test, and when doing so, subtract 1 from the result.'
        },
        {
          name: 'Da Biggest Boss',
          points: 15,
          text: 'INFANTRY WARBOSS model only. Add 2 to the bearer\'s Wounds characteristic.'
        },
        {
          name: '\'Eadstompa',
          points: 10,
          text: 'INFANTRY WARBOSS model only. Each time the bearer makes an attack that targets a unit that is below its Starting Strength, re-roll a Wound roll of 1. If that unit is Below Half-strength, you can re-roll the Wound roll instead.'
        },
        {
          name: 'Tellyporta',
          points: 25,
          text: 'WARBOSS IN MEGA ARMOUR model only. Models in the bearer\'s unit have the Deep Strike ability.'
        }
      ],
      stratagems: [
        {
          id: 'bully-boyz-armed-to-dateef',
          name: 'ARMED TO DATEEF',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One NOBZ or MEGANOBZ unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Hit roll of 1. If a Waaagh! is active for your unit, you can re-roll the Hit roll instead.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'bully-boyz-too-arrogant-to-die',
          name: 'TOO ARROGANT TO DIE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One NOBZ or MEGANOBZ unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not shot or fought this phase, roll one D6, adding 2 to the result if a Waaagh! is active for your unit. On a 5+, do not remove the destroyed model from play; it can shoot or fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'bully-boyz-always-lookin-fer-a-fight',
          name: 'ALWAYS LOOKIN\' FER A FIGHT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit is destroyed.',
          target: 'One NOBZ or MEGANOBZ unit from your army that destroyed that enemy unit.',
          effect: 'Until the end of the phase, each time your unit makes a Consolidation move, it can move up to D3+3" instead of up to 3". If a Waaagh! is active for your unit, it can move up to 6" instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'bully-boyz-crushing-impact',
          name: 'CRUSHING IMPACT',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Charge phase, just after a NOBZ or MEGANOBZ unit from your army ends a Charge move.',
          target: 'That NOBZ or MEGANOBZ unit.',
          effect: 'Select one enemy unit within Engagement Range of your unit, then roll one D6 for each model in your unit that is within Engagement Range of that enemy unit: for each 5+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds). If a Waaagh! is active for your unit, that enemy unit suffers 1 mortal wound for each 4+ instead.',
          phaseTags: ['Charge']
        },
        {
          id: 'bully-boyz-cut-em-down',
          name: 'CUT\'EM DOWN',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit is selected to Fall Back.',
          target: 'One NOBZ or MEGANOBZ unit from your army within Engagement Range of that enemy unit.',
          effect: 'When that enemy unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if a Waaagh! is active for your unit, subtract 1 from each of those tests.',
          phaseTags: ['Movement']
        },
        {
          id: 'bully-boyz-hulking-brutes',
          name: 'HULKING BRUTES',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One NOBZ or MEGANOBZ unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'taktikal-brigade',
      name: 'Taktikal Brigade',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Lissen \'Ere',
          text: 'Once per battle round, in your Command phase or after being set up on the battlefield in your Movement phase, each BOSS SNIKROT, MEK and WARBOSS model in your army can issue Taktiks abilities.\n\nTo do so, select one of the Taktiks abilities below and select one friendly ORKS unit within 6" of that model to issue them to. That model must take a Leadership test: if failed, the selected unit suffers 1 mortal wound. Until the start of your next Command phase, the selected unit is affected by the selected Taktik. A unit cannot have Taktiks issued to it in this way more than once per battle round.\n\nTaktiks abilities cannot be issued to Battle-shocked units, and if a unit affected by Taktiks becomes Battle-shocked, all Taktiks cease to affect that unit while it is Battle-shocked.\n\nGet Stuck In: You can re-roll Charge rolls made for this unit.\n\nGet On Wiv It: Add 1 to the Strength characteristic of melee weapons equipped by models in this unit.\n\nSneaky Stalkin\': INFANTRY and MOUNTED models (excluding MEGANOBZ) in this unit have the Stealth ability and each time a ranged attack targets this unit, those models have the Benefit of Cover against that attack.\n\nShoota Drills: Each time an INFANTRY or MOUNTED model in this unit makes a ranged attack, add 1 to the Hit roll.\n\nSTORMBOYZ units from your army gain the BATTLELINE keyword.'
        }
      ],
      enhancements: [
        {
          name: 'Skwad Leader',
          points: 15,
          text: 'WARBOSS INFANTRY model only. During the Declare Battle Formations step, the bearer can be attached to a KOMMANDOS unit. While leading a Kommandos unit, it has the Infiltrators and Stealth abilities.'
        },
        {
          name: 'Mek Kaptin',
          points: 45,
          text: 'BIG MEK, BIG MEK IN MEGA ARMOUR or BIG MEK WITH SHOKK ATTACK GUN model only. During the Declare Battle Formations step, the bearer can be attached to a FLASH GITZ unit. Each time a model in the bearer\'s unit makes a ranged attack, you can re-roll the Hit roll.'
        },
        {
          name: 'Mork\'s Kunnin\'',
          points: 15,
          text: 'ORKS model only. After both players have deployed their armies, select up to three ORKS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.'
        },
        {
          name: 'Gob Boomer',
          points: 10,
          text: 'WARBOSS or MEK model only. Each time the bearer issues Taktiks, it can do so to a friendly ORKS INFANTRY or ORKS MOUNTED unit within 18", instead of 6".'
        }
      ],
      stratagems: [
        {
          id: 'taktikal-brigade-dats-ours',
          name: 'DAT\'S OURS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Command phase.',
          target: 'One ORKS unit from your army that is within Engagement Range of one or more enemy units.',
          effect: 'Until the start of the next Command phase, add 1 to the Objective Control characteristic of models in your unit.',
          phaseTags: ['Command']
        },
        {
          id: 'taktikal-brigade-fight-proppa',
          name: 'FIGHT PROPPA',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ORKS INFANTRY or ORKS MOUNTED unit from your army that has not been selected to fight this phase.',
          effect: 'Select the [SUSTAINED HITS 1] or [LETHAL HITS] ability. Until the end of the phase, melee weapons equipped by models in your unit have the selected ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'taktikal-brigade-taktikal-retreat',
          name: 'TAKTIKAL RETREAT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an ORKS unit from your army Falls Back.',
          target: 'That ORKS unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          phaseTags: ['Movement', 'Shooting', 'Charge']
        },
        {
          id: 'taktikal-brigade-krunchin-descent',
          name: 'KRUNCHIN\' DESCENT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase, just after a STORMBOYZ unit from your army ends a Charge move.',
          target: 'That STORMBOYZ unit.',
          effect: 'Select one enemy unit within Engagement Range of your unit, then roll one D6 for each model in your unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).',
          phaseTags: ['Charge']
        },
        {
          id: 'taktikal-brigade-on-to-da-next',
          name: 'ON TO DA NEXT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit Falls Back.',
          target: 'One ORKS unit from your army that was within Engagement Range of that enemy unit at the start of the phase.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        },
        {
          id: 'taktikal-brigade-ded-sneaky',
          name: 'DED SNEAKY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One KOMMANDOS or STORMBOYZ unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'more-dakka',
      name: 'More Dakka!',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Dakka! Dakka! Dakka!',
          text: 'Ranged weapons equipped by ORKS INFANTRY and ORKS WALKER models from your army have the [ASSAULT] ability.\n\nWhile the Waaagh! is active for your army, during your Shooting phase, ranged weapons equipped by ORKS INFANTRY and ORKS WALKER models from your army have the [SUSTAINED HITS 1] ability.'
        }
      ],
      enhancements: [
        {
          name: 'Da Gobshot Thunderbuss',
          points: 15,
          text: 'ORKS model only. Ranged weapons equipped by the bearer have the [DEVASTATING WOUNDS] and [HAZARDOUS] abilities.'
        },
        {
          name: 'Dead Shiny Shootas',
          points: 35,
          text: 'ORKS model only. Ranged weapons equipped by models in the bearer\'s unit have the [RAPID FIRE 1] ability.'
        },
        {
          name: 'Targetin\' Squigs',
          points: 15,
          text: 'ORKS model only. Each time a model in the bearer\'s unit makes a ranged attack, add 1 to the Hit roll.'
        },
        {
          name: 'Zog Off And Eat Dakka!',
          points: 10,
          text: 'ORKS model only. The bearer\'s unit is eligible to shoot in a turn in which it Fell Back.'
        }
      ],
      stratagems: [
        {
          id: 'more-dakka-orks-is-still-orks',
          name: 'ORKS IS STILL ORKS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ORKS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit, re-roll a Wound roll of 1. If that enemy unit is within range of an objective marker, you can re-roll the Wound roll instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'more-dakka-get-stuck-in-ladz',
          name: 'GET STUCK IN, LADZ!',
          cp: 2,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One ORKS unit from your army (excluding GRETCHIN units).',
          effect: 'Until the start of your next Command phase, the Waaagh! is active for your unit, even if you have already called a Waaagh! this battle.',
          restrictions: 'This means any abilities that are in effect while the Waaagh! is active for your army will be in effect for your unit.',
          phaseTags: ['Command']
        },
        {
          id: 'more-dakka-huge-show-offs',
          name: 'HUGE SHOW-OFFS',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One ORKS WALKER unit (excluding KILLA KANS) from your army.',
          effect: 'Until the start of your next Command phase, improve your unit\'s Move, Leadership and Objective Control characteristics by 1, and each time a model in your unit makes an attack, add 1 to the Hit roll.',
          phaseTags: ['Command']
        },
        {
          id: 'more-dakka-long-uncontrolled-bursts',
          name: 'LONG, UNCONTROLLED BURSTS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ORKS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'more-dakka-speshul-shells',
          name: 'SPESHUL SHELLS',
          cp: 1,
          type: 'Wargear',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ORKS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack that targets the closest eligible target within 18", improve the Armour Penetration characteristic of ranged weapons equipped by models in your unit by 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'more-dakka-call-dat-dakka',
          name: 'CALL DAT DAKKA?',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One ORKS unit from your army that had one or more of its models destroyed as a result of the attacking unit\'s attacks.',
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'freebooter-krew',
      name: 'Freebooter Krew',
      source: 'https://wahapedia.ru/wh40k10ed/factions/orks/',
      rules: [
        {
          name: 'Here Be Loot',
          text: 'At the start of your Command phase, select one objective marker. Until the start of your next Command phase, that objective marker is your loot objective.\n\nEach time a model in an ORKS INFANTRY, ORKS MOUNTED or ORKS WALKER unit from your army makes an attack, that attack has the [SUSTAINED HITS 1] ability if either or both of the following are true:\n\n* That model\'s unit is within range of your loot objective.\n* That attack targets a unit within range of your loot objective.'
        }
      ],
      enhancements: [
        {
          name: 'Da Kaptin',
          points: 10,
          text: 'WARBOSS model only. Once per battle round, at the start of any phase, you can select one friendly ORKS unit that is Battle-shocked and within 12" of the bearer. That unit suffers D3 mortal wounds and it is no longer Battle-shocked.'
        },
        {
          name: 'Git-spotter Squig',
          points: 20,
          text: 'ORKS model only. Ranged weapons equipped by models in the bearer\'s unit have the [IGNORES COVER] ability.'
        },
        {
          name: 'Bionik Workshop',
          points: 15,
          text: 'BIG MEK or PAINBOY model only. At the start of the battle, roll one D3 and compare the result to the list below. Until the end of the battle, models in the bearer\'s unit have that bioniks ability.\n\n1. Bionik Legs: Add 2" to the Move characteristic of this model.\n2. Bionik Arms: Add 1 to the Strength characteristic of melee weapons equipped by this model.\n3. Bionik Bonce: Improve the Weapon Skill characteristic of melee weapons equipped by this model by 1.'
        },
        {
          name: 'Razgit\'s Magik Map',
          points: 25,
          text: 'ORKS model only. After both players have deployed their armies, select up to three ORKS INFANTRY units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.'
        }
      ],
      stratagems: [
        {
          id: 'freebooter-krew-bash-and-grab',
          name: 'BASH AND GRAB',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ORKS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit within range of the loot objective, you can re-roll the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'freebooter-krew-grab-and-bash',
          name: 'GRAB AND BASH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One ORKS unit from your army (excluding GRETCHIN units) that is within range of the loot objective.',
          effect: 'Until the start of your next Command phase, the Waaagh! is active for your unit, even if you have already called a Waaagh! this battle.',
          restrictions: 'This means any abilities that are in effect while the Waaagh! is active for your army will be in effect for your unit.',
          phaseTags: ['Command']
        },
        {
          id: 'freebooter-krew-boardin-rush',
          name: 'BOARDIN\' RUSH',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ORKS unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the phase, each time your unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6" to the Move characteristic of models in your unit.',
          phaseTags: ['Movement']
        },
        {
          id: 'freebooter-krew-deck-fraggers',
          name: 'DECK FRAGGERS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ORKS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit targets an INFANTRY unit with a ranged weapon, that weapon has the [BLAST] ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'freebooter-krew-rolling-loot-heap',
          name: 'ROLLING LOOT-HEAP',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One FLASH GITZ unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [ANTI-VEHICLE 4+] ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'freebooter-krew-krump-and-run',
          name: 'KRUMP AND RUN',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit Falls Back.',
          target: 'One ORKS unit from your army that was within Engagement Range of that enemy unit at the start of the phase and is not within range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        }
      ]
    }
  ];
})();
