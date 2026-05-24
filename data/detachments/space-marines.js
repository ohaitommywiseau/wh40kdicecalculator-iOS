(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };
  window.WH40K_DETACHMENT_DATABASE.byFaction['space-marines'] = [
    {
      slug: 'gladius-task-force',
      name: 'Gladius Task Force',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Combat Doctrines',
          text: 'At the start of your Command phase , you can select one of the Combat Doctrines listed below. Until the start of your next Command phase, that Combat Doctrine is active and its effects apply to all ADEPTUS ASTARTES units from your army. You can only select each Combat Doctrine once per battle.\n\n Devastator Doctrine\n This unit is eligible to shoot in a turn in which it Advanced .\n\n Tactical Doctrine\n This unit is eligible to shoot and declare a charge in a turn in which it Fell Back .\n\n Assault Doctrine\n This unit is eligible to declare a charge in a turn in which it Advanced .'
        }
      ],
      enhancements: [
        {
          name: 'Artificer Armour',
          points: 10,
          text: 'ADEPTUS ASTARTES model only. The bearer has a Save characteristic of 2+ and the Feel No Pain 5+ ability.'
        },
        {
          name: 'The Honour Vehement',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. Add 1 to the Attacks and Strength characteristics of the bearer’s melee weapons. While the bearer is under the effects of the Assault Doctrine , add 2 to the Attacks and Strength characteristics of the bearers melee weapons instead.'
        },
        {
          name: 'Adept of the Codex',
          points: 20,
          text: 'CAPTAIN model only. At the start of your Command phase , if the bearer is on the battlefield, instead of selecting a Combat Doctrine to be active for your army, you can select the Tactical Doctrine . If you do, until the start of your next Command phase, that Combat Doctrine is active for the bearer’s unit only, even if you have already selected that Combat Doctrine to be active for your army this battle.'
        },
        {
          name: 'Fire Discipline',
          points: 25,
          text: 'ADEPTUS ASTARTES model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. In addition, while the bearer’s unit is under the effects of the Devastator Doctrine , you can reroll Advance rolls made for that unit.'
        }
      ],
      stratagems: [
        {
          id: 'gladius-task-force-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'gladius-task-force-only-in-death-does-duty-end',
          name: 'ONLY IN DEATH DOES DUTY END',
          cp: 2,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed , if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play.',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: 'gladius-task-force-honour-the-chapter',
          name: 'HONOUR THE CHAPTER',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] ability. If your unit is under the effects of the Assault Doctrine , until the end of the phase, improve the Armour Penetration characteristic of such weapons by 1 as well.',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: 'gladius-task-force-adaptive-strategy',
          name: 'ADAPTIVE STRATEGY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase .',
          target: 'One ADEPTUS ASTARTES unit from your army.',
          effect: 'Select the Devastator Doctrine , Tactical Doctrine or Assault Doctrine . Until the start of your next Command phase, that Combat Doctrine is active for that unit instead of any other Combat Doctrine that is active for your army, even if you have already selected that doctrine this battle.',
          phaseTags: [
            'Command'
          ]
        },
        {
          id: 'gladius-task-force-storm-of-fire',
          name: 'STORM OF FIRE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability. If your unit is under the effects of the Devastator Doctrine , until the end of the phase, improve the Armour Penetration characteristic of such weapons by 1 as well.',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'gladius-task-force-squad-tactics',
          name: 'SQUAD TACTICS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Movement phase , just after an enemy unit ends a Normal , Advance or Fall Back move .',
          target: 'One ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED unit from your army that is within 9" of the enemy unit that just ended that move.',
          effect: 'Your unit can make a Normal move of up to D6", or a Normal move of up to 6" instead if it is under the effects of the Tactical Doctrine .',
          phaseTags: [
            'Movement'
          ],
          restrictions: 'You cannot select a unit that is within Engagement Range of one or more enemy units.'
        }
      ]
    },
    {
      slug: 'anvil-siege-force',
      name: 'Anvil Siege Force',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Shield of the Imperium',
          text: 'Ranged weapons equipped by ADEPTUS ASTARTES models from your army have the [HEAVY] ability. If such a weapon already has this ability, each time an attack is made with that weapon, if the attacking model’s unit Remained Stationary this turn, add 1 to the Wound roll .'
        }
      ],
      enhancements: [
        {
          name: 'Indomitable Fury',
          points: 20,
          text: 'GRAVIS model only. The first time the bearer is destroyed , roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.'
        },
        {
          name: 'Fleet Commander',
          points: 15,
          text: 'CAPTAIN model only. Once per battle, at the start of your Shooting phase , you can select one point on the battlefield and place a marker on that point. At the start of your next Shooting phase, place another marker on the battlefield within 12" of the centre of the first marker, then draw a straight line between the centre of each of these markers. Roll one D6 for each unit that line passes over or through: on a 3+, that unit suffers D3 mortal wounds . Both markers are then removed.'
        },
        {
          name: 'Stoic Defender',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. While the bearer is leading a unit, models in that unit have the Feel No Pain 6+ ability while they are within range of an objective marker you control and, while that unit is Battle-shocked , halve the Objective Control characteristic of models in that unit instead of changing it to 0.'
        },
        {
          name: 'Architect of War',
          points: 25,
          text: 'ADEPTUS ASTARTES model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [IGNORES COVER] ability.'
        }
      ],
      stratagems: [
        {
          id: 'anvil-siege-force-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'anvil-siege-force-rigid-discipline',
          name: 'RIGID DISCIPLINE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of the Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that is within Engagement Range of one or more enemy units.',
          effect: 'Your unit can immediately make a Fall Back move of up to 6".',
          phaseTags: [
            'Fight'
          ],
          restrictions: 'When making that move, your unit must end that move either wholly within your deployment zone or within range of an objective marker .'
        },
        {
          id: 'anvil-siege-force-not-one-backwards-step',
          name: 'NOT ONE BACKWARDS STEP',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY unit from your army within range of an objective marker .',
          effect: 'Until the end of the turn, double the Objective Control characteristic of models in your unit, but it must Remain Stationary this turn.',
          phaseTags: [
            'Command'
          ]
        },
        {
          id: 'anvil-siege-force-no-threat-too-great',
          name: 'NO THREAT TOO GREAT',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack that targets a MONSTER or VEHICLE unit, you can re-roll the Wound roll .',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'anvil-siege-force-battle-drill-recall',
          name: 'BATTLE DRILL RECALL',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability. If your unit Remained Stationary this turn, then until the end of the phase, each time a model in your unit makes a ranged attack, a successful unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'anvil-siege-force-hail-of-vengeance',
          name: 'HAIL OF VENGEANCE',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase , just after an enemy unit has resolved its attacks.',
          target: 'One ADEPTUS ASTARTES unit from your army that had one or more of its models destroyed as a result of the attacking unit’s attacks.',
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: [
            'Shooting'
          ]
        }
      ]
    },
    {
      slug: 'ironstorm-spearhead',
      name: 'Ironstorm Spearhead',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Armoured Wrath',
          text: 'Once per phase for each ADEPTUS ASTARTES unit in your army, you can re-roll one Hit roll , one Wound roll or one Damage roll made for a model in that unit.'
        }
      ],
      enhancements: [
        {
          name: 'Target Augury Web',
          points: 30,
          text: 'TECHMARINE model only. In your Command phase , select one ADEPTUS ASTARTES VEHICLE model within 6" of the bearer. Until the start of your next Command phase, weapons equipped by that VEHICLE model have the [LETHAL HITS] ability.'
        },
        {
          name: 'The Flesh is Weak',
          points: 10,
          text: 'ADEPTUS ASTARTES model only. The bearer has the Feel No Pain 4+ ability.'
        },
        {
          name: 'Adept of the Omnissiah',
          points: 35,
          text: 'TECHMARINE model only. Once per battle round , when a saving throw is failed for a friendly ADEPTUS ASTARTES VEHICLE model within 6" of the bearer, you can change the Damage characteristic of that attack to 0.'
        },
        {
          name: 'Master of Machine War',
          points: 20,
          text: 'ADEPTUS ASTARTES model only. In your Command phase , select one ADEPTUS ASTARTES VEHICLE model within 6" of the bearer. Until the start of your next Command phase, that VEHICLE is eligible to shoot even if it Fell Back or Advanced this turn.'
        }
      ],
      stratagems: [
        {
          id: 'ironstorm-spearhead-unbowed-conviction',
          name: 'UNBOWED CONVICTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Command phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that is below its Starting Strength .',
          effect: 'Until the end of the turn, your unit can ignore any or all modifiers to its characteristics and/or to any roll or test made for it (excluding modifiers to saving throws ).',
          phaseTags: [
            'Command'
          ]
        },
        {
          id: 'ironstorm-spearhead-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'ironstorm-spearhead-mercy-is-weakness',
          name: 'MERCY IS WEAKNESS',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a unit that is below its Starting Strength , that attack has the [SUSTAINED HITS 1] ability, and when making such an attack, if the attacking model is a VEHICLE , a successful unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'ironstorm-spearhead-vengeful-animus',
          name: 'VENGEFUL ANIMUS',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Any phase, just after an ADEPTUS ASTARTES VEHICLE model from your army with the Deadly Demise ability is destroyed .',
          target: 'That ADEPTUS ASTARTES VEHICLE model. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'Do not roll one D6 to determine whether mortal wounds are inflicted by your model’s Deadly Demise ability. Instead, mortal wounds are automatically inflicted.',
          phaseTags: []
        },
        {
          id: 'ironstorm-spearhead-ancient-fury',
          name: 'ANCIENT FURY',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Command phase .',
          target: 'One ADEPTUS ASTARTES WALKER model from your army.',
          effect: 'Until the start of your next Command phase, improve your model’s Move, Toughness, Leadership and Objective Control characteristics by 1 and each time your model makes an attack, add 1 to the Hit roll .',
          phaseTags: [
            'Command'
          ]
        },
        {
          id: 'ironstorm-spearhead-power-of-the-machine-spirit',
          name: 'POWER OF THE MACHINE SPIRIT',
          cp: 1,
          type: 'Epic Deed',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase , just after an enemy unit has resolved its attacks.',
          target: 'One ADEPTUS ASTARTES VEHICLE unit from your army that was reduced to Below Half-strength as a result of the attacking unit’s attacks.',
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: [
            'Shooting'
          ]
        }
      ]
    },
    {
      slug: 'firestorm-assault-force',
      name: 'Firestorm Assault Force',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Close-range Eradication',
          text: 'Ranged weapons equipped by ADEPTUS ASTARTES models from your army have the [ASSAULT] ability, and each time an attack made with such a weapon targets a unit within 12", add 1 to the Strength characteristic of that attack.'
        }
      ],
      enhancements: [
        {
          name: 'Champion of Humanity',
          points: 10,
          text: 'TACTICUS model only. While the bearer is leading a unit, models in that unit can ignore any or all modifiers to their characteristics and/or to any roll or test made for them (excluding modifiers to saving throws ).'
        },
        {
          name: 'War-tempered Artifice',
          points: 25,
          text: 'ADEPTUS ASTARTES INFANTRY model only. Add 3 to the Strength characteristic of the bearer’s melee weapons.'
        },
        {
          name: 'Forged in Battle',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. While the bearer is leading a unit, once per turn, after making a Hit roll or a saving throw for a model in that unit, you can change the result of that roll to an unmodified 6.'
        },
        {
          name: 'Adamantine Mantle',
          points: 20,
          text: 'ADEPTUS ASTARTES model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack. If that attack was made with a Melta or Torrent weapon, change the Damage characteristic of that attack to 1 instead.'
        }
      ],
      stratagems: [
        {
          id: 'firestorm-assault-force-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'firestorm-assault-force-crucible-of-battle',
          name: 'CRUCIBLE OF BATTLE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets the closest eligible target within 6", add 1 to the Wound roll .',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'firestorm-assault-force-rapid-embarkation',
          name: 'RAPID EMBARKATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of the Fight phase .',
          target: 'One ADEPTUS ASTARTES TRANSPORT unit from your army that has no models embarked within it, and one ADEPTUS ASTARTES INFANTRY unit from your army wholly within 6" of that TRANSPORT .',
          effect: 'Your INFANTRY unit can embark within that TRANSPORT .',
          phaseTags: [
            'Fight'
          ],
          restrictions: 'You cannot target an INFANTRY unit that is within Engagement Range of one or more enemy units, that cannot normally embark within that TRANSPORT , or that disembarked from a TRANSPORT this turn.'
        },
        {
          id: 'firestorm-assault-force-immolation-protocols',
          name: 'IMMOLATION PROTOCOLS',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, Torrent weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'firestorm-assault-force-onslaught-of-fire',
          name: 'ONSLAUGHT OF FIRE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that disembarked from a TRANSPORT this turn and has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack that targets the closest eligible target within 12", add 1 to the Hit roll . If one or more enemy models are destroyed as the result of any of those attacks, select one of those destroyed models; that destroyed model’s unit must take a Battle-shock test .',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'firestorm-assault-force-burning-vengeance',
          name: 'BURNING VENGEANCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase , just after an enemy unit has resolved its attacks.',
          target: 'One ADEPTUS ASTARTES TRANSPORT unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'One unit embarked within that TRANSPORT can disembark as if it were your Movement phase , and can then shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: [
            'Shooting'
          ]
        }
      ]
    },
    {
      slug: 'stormlance-task-force',
      name: 'Stormlance Task Force',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Lightning Assault',
          text: 'ADEPTUS ASTARTES units from your army are eligible to declare a charge in a turn in which they Advanced or Fell Back .'
        }
      ],
      enhancements: [
        {
          name: 'Fury of the Storm',
          points: 25,
          text: 'ADEPTUS ASTARTES MOUNTED model only. Improve the Strength and Armour Penetration characteristics of the bearer’s melee weapons by 1. Each time the bearer ends a Charge move , until the end of the turn, improve the Strength and Armour Penetration characteristics of the bearers melee weapons by 2 instead.'
        },
        {
          name: 'Portents of Wisdom',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. While the bearer is leading a unit, you can re-roll Advance rolls made for that unit.'
        },
        {
          name: 'Feinting Withdrawal',
          points: 10,
          text: 'ADEPTUS ASTARTES model only. While the bearer is leading a unit, that unit is eligible to shoot in a turn in which it Fell Back .'
        },
        {
          name: 'Hunter’s Instincts',
          points: 25,
          text: 'ADEPTUS ASTARTES MOUNTED model only. If the bearer’s unit is in Strategic Reserves , for the purposes of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is.'
        }
      ],
      stratagems: [
        {
          id: 'stormlance-task-force-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'stormlance-task-force-blitzing-fusillade',
          name: 'BLITZING FUSILLADE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [ASSAULT] ability. If such a weapon already has this ability, until the end of the phase, that weapon has the [SUSTAINED HITS 1] ability as well.',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'stormlance-task-force-full-throttle',
          name: 'FULL THROTTLE',
          cp: 2,
          type: 'Wargear',
          timing: 'your',
          when: 'Your Movement phase .',
          target: 'One ADEPTUS ASTARTES MOUNTED or ADEPTUS ASTARTES VEHICLE unit (excluding WALKERS ) from your army.',
          effect: 'Until the end of the phase, if your unit Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6" to the Move characteristic of models in your unit, or 9" instead if your unit is MOUNTED .',
          phaseTags: [
            'Movement'
          ]
        },
        {
          id: 'stormlance-task-force-shock-assault',
          name: 'SHOCK ASSAULT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase .',
          target: 'One ADEPTUS ASTARTES MOUNTED unit from your army that has not declared a charge this phase.',
          effect: 'Until the end of the turn, you can re-roll Charge rolls made for your unit and melee weapons equipped by models in that unit have the [LANCE] ability.',
          phaseTags: [
            'Charge'
          ]
        },
        {
          id: 'stormlance-task-force-ride-hard-ride-fast',
          name: 'RIDE HARD, RIDE FAST',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES MOUNTED or ADEPTUS ASTARTES FLY VEHICLE unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll and subtract 1 from the Wound roll .',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'stormlance-task-force-wind-swift-evasion',
          name: 'WIND-SWIFT EVASION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Movement phase , just after an enemy unit ends a Normal , Advance or Fall Back move .',
          target: 'One ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED unit from your army that is within 9" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: [
            'Movement'
          ],
          restrictions: 'You cannot select a unit that is within Engagement Range of one or more enemy units.'
        }
      ]
    },
    {
      slug: 'vanguard-spearhead',
      name: 'Vanguard Spearhead',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Shadow Masters',
          text: 'Each time a ranged attack targets an ADEPTUS ASTARTES unit from your army, unless the attacking model is within 12", subtract 1 from the Hit roll and the target has the Benefit of Cover against that attack.'
        }
      ],
      enhancements: [
        {
          name: 'The Blade Driven Deep',
          points: 25,
          text: 'ADEPTUS ASTARTES INFANTRY model only. While the bearer is leading a unit, models in that unit have the Infiltrators ability.'
        },
        {
          name: 'Ghostweave Cloak',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. The bearer has the Stealth and Lone Operative abilities.'
        },
        {
          name: 'Execute and Redeploy',
          points: 20,
          text: 'PHOBOS model only. In your Shooting phase , after the bearer’s unit has shot, if that unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6". If it does, until the end of the turn, that unit is not eligible to declare a charge . This cannot allow the bearer’s unit to move more than once in your Shooting phase.'
        },
        {
          name: 'Shadow War Veteran',
          points: 30,
          text: 'PHOBOS model only. Gain following ability:\n Lord of Deceit (Aura): Each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12" of this model, increase the cost of that use of that Stratagem by 1CP.'
        }
      ],
      stratagems: [
        {
          id: 'vanguard-spearhead-a-deadly-prize',
          name: 'A DEADLY PRIZE',
          cp: 1,
          type: 'Wargear',
          timing: 'any',
          when: 'Start of the Command phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED unit from your army within range of an objective marker you control.',
          effect: 'That objective marker is said to be Sabotaged, and remains under your control even if you have no models within range of it, until your opponent controls it at the start or end of any turn. While an objective marker is Sabotaged and under your control, each time an enemy unit ends a Normal , Advance , Fall Back or Charge move within range of that objective marker, roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds .',
          phaseTags: [
            'Command'
          ]
        },
        {
          id: 'vanguard-spearhead-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'vanguard-spearhead-surgical-strikes',
          name: 'SURGICAL STRIKES',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: 'vanguard-spearhead-strike-from-the-shadows',
          name: 'STRIKE FROM THE SHADOWS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack that targets an enemy unit that is more than 12" away, improve the Ballistic Skill and Armour Penetration characteristics of that attack by 1. If one or more enemy models are destroyed as a result of those attacks, select one of those destroyed models; that destroyed model’s unit must take a Battle-shock test .',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'vanguard-spearhead-calculated-feint',
          name: 'CALCULATED FEINT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Charge phase , just after an enemy unit declares a charge .',
          target: 'One ADEPTUS ASTARTES INFANTRY unit from your army that was selected as a target of that charge.',
          effect: 'Your unit can make a Normal move of up to D6", or up to 6" instead if it is a PHOBOS or SCOUT SQUAD unit.',
          phaseTags: [
            'Charge'
          ],
          restrictions: 'You cannot select a unit that is within Engagement Range of one or more enemy units.'
        },
        {
          id: 'vanguard-spearhead-guerrilla-tactics',
          name: 'GUERRILLA TACTICS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase .',
          target: 'Up to two PHOBOS and/or SCOUT SQUAD units from your army, or one other ADEPTUS ASTARTES INFANTRY unit from your army.',
          effect: 'Remove those units from the battlefield and place them into Strategic Reserves .',
          phaseTags: [
            'Fight'
          ],
          restrictions: 'Each unit selected for this Stratagem must be more than 3" away from all enemy models.'
        }
      ]
    },
    {
      slug: '1st-company-task-force',
      name: '1st Company Task Force',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Extremis-level Threat',
          text: 'Once per battle, in your Command phase , you can use this ability. If you do, until the start of your next Command phase, each time a model from your army with the Oath of Moment ability makes an attack that targets your Oath of Moment target, you can re-roll the Wound roll as well.'
        }
      ],
      enhancements: [
        {
          name: 'The Imperium’s Sword',
          points: 25,
          text: 'ADEPTUS ASTARTES model only. Add 1 to the Attacks characteristic of the bearers melee weapons. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by all other models in the bearer’s unit as well.'
        },
        {
          name: 'Fear Made Manifest (Aura)',
          points: 30,
          text: 'ADEPTUS ASTARTES model only. While an enemy unit (excluding MONSTERS and VEHICLES ) is within 6" of the bearer, each time that unit fails a Battle-shock test , one model in that unit is destroyed (chosen by its controlling player). Once per battle, when such an enemy unit fails a Battle-shock test, you can choose for D3 models in that unit to be destroyed in this way instead.'
        },
        {
          name: 'Rites of War',
          points: 10,
          text: 'ADEPTUS ASTARTES TERMINATOR model only. Improve the Objective Control characteristic of the bearer by 1. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Objective Control characteristic of all other models in the bearer’s unit as well.'
        },
        {
          name: 'Iron Resolve',
          points: 15,
          text: 'ADEPTUS ASTARTES TERMINATOR model only. The bearer has the Feel No Pain 5+ ability. Once per battle, after the bearer’s unit is selected as the target of one or more attacks, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Feel No Pain 5+ ability.'
        }
      ],
      stratagems: [
        {
          id: '1st-company-task-force-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: '1st-company-task-force-heroes-of-the-chapter',
          name: 'HEROES OF THE CHAPTER',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES TERMINATOR , BLADEGUARD VETERAN SQUAD , STERNGUARD VETERAN SQUAD or VANGUARD VETERAN SQUAD unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Hit roll . If your unit is Below Half-strength , add 1 to the Wound roll as well.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: '1st-company-task-force-terrifying-proficiency',
          name: 'TERRIFYING PROFICIENCY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Fight phase .',
          target: 'One ADEPTUS ASTARTES TERMINATOR , BLADEGUARD VETERAN SQUAD , STERNGUARD VETERAN SQUAD or VANGUARD VETERAN SQUAD unit from your army that made a Charge move this turn and destroyed one or more enemy units this phase.',
          effect: 'In your opponent’s next Command phase , each enemy unit within 6" of your unit must take a Battle-shock test . If the unit taking that test is Below Half-strength , subtract 1 from that test. Enemy units affected by this Stratagem do not need to take any other Battle-shock tests in the same phase.',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: '1st-company-task-force-duty-and-honour',
          name: 'DUTY AND HONOUR',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase .',
          target: 'One ADEPTUS ASTARTES TERMINATOR , BLADEGUARD VETERAN SQUAD , STERNGUARD VETERAN SQUAD or VANGUARD VETERAN SQUAD unit from your army within range of an objective marker you control.',
          effect: 'That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: '1st-company-task-force-orbital-teleportarium',
          name: 'ORBITAL TELEPORTARIUM',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase .',
          target: 'One ADEPTUS ASTARTES TERMINATOR unit from your army.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves . It will arrive back on the battlefield in the Reinforcements step of your next Movement phase using the Deep Strike ability.',
          phaseTags: [
            'Fight'
          ],
          restrictions: 'You cannot select a unit that is within Engagement Range of one or more enemy units.'
        },
        {
          id: '1st-company-task-force-legendary-fortitude',
          name: 'LEGENDARY FORTITUDE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Charge phase , just after an enemy unit ends a Charge move .',
          target: 'One ADEPTUS ASTARTES TERMINATOR , BLADEGUARD VETERAN SQUAD , STERNGUARD VETERAN SQUAD or VANGUARD VETERAN SQUAD unit from your army within Engagement Range of that enemy unit.',
          effect: 'Until the end of the turn, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: [
            'Charge'
          ]
        }
      ]
    },
    {
      slug: 'librarius-conclave',
      name: 'Librarius Conclave',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Psychic Disciplines',
          text: 'At the start of the battle round , select one of the following Psychic Disciplines. Until the end of the battle round, that Psychic Discipline is active and its effects apply to all ADEPTUS ASTARTES PSYKER units from your army.\n\n Biomancy Discipline\nAdd 2" to the Move characteristic of models in this unit.\n\n Divination Discipline\nEach time a model in this unit makes an attack, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.\n\n Pyromancy Discipline\nEach time a ranged attack made by a model in this unit targets an enemy unit within 12", improve the Armour Penetration characteristic of that attack by 1.\n\n Telekinesis Discipline\nEach time a ranged attack targets this unit, subtract 1 from the Strength characteristic of that attack.\n\n Telepathy Discipline\nEach time a model in this unit makes an attack, you can ignore any or all modifiers to that attack’s Weapon Skill or Ballistic Skill characteristics and/or any or all modifiers to the Hit roll.'
        }
      ],
      enhancements: [
        {
          name: 'Prescience',
          points: 25,
          text: 'ADEPTUS ASTARTES PSYKER model only (excluding TERMINATOR models). Once per turn, when an enemy unit ends a Normal , Advance or Fall Back move within 9" of the bearer’s unit, the bearer’s unit can make a Normal move of up to D6", or up to 6" instead if the Divination Discipline is active for your army.'
        },
        {
          name: 'Celerity',
          points: 30,
          text: 'ADEPTUS ASTARTES PSYKER model only. The bearer’s unit is eligible to declare a charge in a turn in which it Advanced , and if the Biomancy Discipline is active for your army, it is eligible to declare a charge in a turn in which it Fell Back .'
        },
        {
          name: 'Obfuscation',
          points: 20,
          text: 'ADEPTUS ASTARTES PSYKER model only. Enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer’s unit, and if the Telepathy Discipline is active for your army, the bearer’s unit cannot be targeted by ranged attacks unless the attacking model is within 18".'
        },
        {
          name: 'Fusillade',
          points: 35,
          text: 'ADEPTUS ASTARTES PSYKER model only. Ranged weapons equipped by models in the bearer’s unit have the [ANTI-MONSTER 5+] and [ANTI-VEHICLE 5+] abilities, and:'
        }
      ],
      stratagems: [
        {
          id: 'librarius-conclave-sensory-assault',
          name: 'SENSORY ASSAULT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Command phase .',
          target: 'One ADEPTUS ASTARTES PSYKER unit from your army.',
          effect: 'Select one enemy unit that is within 18" of and visible to one PSYKER model in your unit. Until the start of your next turn, that enemy unit is pinned. While a unit is pinned, subtract 2 from that unit’s Move characteristic and subtract 2 from Charge rolls made for it. In addition, if the Telepathy Discipline is active for your army, that enemy unit must take a Battle-shock test , subtracting 1 from the result.',
          phaseTags: [
            'Command'
          ]
        },
        {
          id: 'librarius-conclave-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'librarius-conclave-fiery-shield',
          name: 'FIERY SHIELD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED unit from your army that is within 18" of one or more friendly ADEPTUS ASTARTES PSYKER models, and that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll , and if the Pyromancy Discipline is active for your army, weapons that target your unit have the [HAZARDOUS] ability.',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: 'librarius-conclave-iron-arm',
          name: 'IRON ARM',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY unit from your army that is within 18" of one or more ADEPTUS ASTARTES PSYKER models from your army and has not been selected to Fight this phase.',
          effect: 'Until the end of the phase, add 1 to the Strength characteristic of melee weapons equipped by models in your unit, or add 2 if the Biomancy Discipline is active for your army.',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: 'librarius-conclave-assail',
          name: 'ASSAIL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES PSYKER unit from your army that is eligible to shoot.',
          effect: 'Select one enemy unit within 18" of and visible to one or more PSYKER models in your unit (excluding units with the Lone Operative ability), and roll six D6, adding 1 to each result if the Telekinesis Discipline is active for your army: for each 4+, that enemy unit suffers 1 mortal wound .',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'librarius-conclave-prescient-precision',
          name: 'PRESCIENT PRECISION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES PSYKER unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, that attack has the [LETHAL HITS] ability, and the [IGNORES COVER] ability as well if the Divination Discipline is active for your army.',
          phaseTags: [
            'Shooting'
          ]
        }
      ]
    },
    {
      slug: 'bastion-task-force',
      name: 'Bastion Task Force',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Interlocking Tactics',
          text: 'ADEPTUS ASTARTES BATTLELINE units from your army:\n\nAre eligible to shoot and declare a charge in a turn in which they Advanced or Fell Back .\n\nAre eligible to start to perform an Action in a turn in which they Advanced or Fell Back.\n\nEach time an ADEPTUS ASTARTES BATTLELINE unit from your army is selected to attack, after resolving those attacks, select one enemy unit hit by one or more of those attacks. Until the end of the turn, that enemy unit is auspex scanned. Each time an ADEPTUS ASTARTES model from your army makes an attack that targets an auspex scanned unit, re-roll a Hit roll of 1.'
        }
      ],
      enhancements: [
        {
          name: 'Eye of the Primarch',
          points: 10,
          text: 'ADEPTUS ASTARTES model only. Ranged weapons equipped by the bearer and BATTLELINE models in the bearer’s unit have the [PRECISION] ability.'
        },
        {
          name: 'Hero of the Chapter',
          points: 20,
          text: 'ADEPTUS ASTARTES model only. While the bearer is leading a unit, the bearer has the BATTLELINE keyword.'
        },
        {
          name: 'Blades of Valour',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. Improve the Armour Penetration characteristic of melee weapons equipped by the bearer and BATTLELINE models in the bearer’s unit by 1.'
        },
        {
          name: 'Bombast Omnivox',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. Each time you select the bearer’s unit as the target of a Stratagem, roll one D6, adding 1 if the bearer’s unit has the BATTLELINE keyword: on a 4+, you gain 1CP.'
        }
      ],
      stratagems: [
        {
          id: 'bastion-task-force-codex-discipline',
          name: 'CODEX DISCIPLINE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit, re-roll a Hit roll of 1. If that target is auspex scanned , re-roll a Wound roll of 1 as well.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'bastion-task-force-guided-disruption',
          name: 'GUIDED DISRUPTION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase , just after an ADEPTUS ASTARTES BATTLELINE unit from your army has finished making its attacks.',
          target: 'That ADEPTUS ASTARTES BATTLELINE unit.',
          effect: 'When an enemy unit is auspex scanned as a result of those attacks this turn, if that enemy unit does not have the MONSTER or VEHICLE keywords, until the start of your next turn, it is pinned. While a unit is pinned, subtract 2 from that unit’s Move characteristic and subtract 2 from Charge rolls made for that unit.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'bastion-task-force-light-of-vengeance',
          name: 'LIGHT OF VENGEANCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have that ability while targeting an auspex scanned unit or if the bearer has the BATTLELINE keyword.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'bastion-task-force-shock-bombardment',
          name: 'SHOCK BOMBARDMENT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase , just after an ADEPTUS ASTARTES BATTLELINE unit from your army finished making its attacks.',
          target: 'That ADEPTUS ASTARTES BATTLELINE unit.',
          effect: 'When an enemy unit is auspex scanned as a result of those attacks this turn, until the start of your next turn, it is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll .',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'bastion-task-force-angels-defiant',
          name: 'ANGELS DEFIANT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES BATTLELINE unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll .',
          phaseTags: []
        },
        {
          id: 'bastion-task-force-heresy-undone',
          name: 'HERESY UNDONE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase or your Charge phase .',
          target: 'One ADEPTUS ASTARTES unit (excluding BATTLELINE units) from your army.',
          effect: 'Until the end of the phase, your unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back . If it does, every target of that charge and every target of those attacks must be an auspex scanned unit.',
          phaseTags: [
            'Shooting',
            'Charge'
          ]
        }
      ]
    },
    {
      slug: 'orbital-assault-force',
      name: 'Orbital Assault Force',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Rapid-drop Deployment',
          text: 'At the start of the Declare Battle Formations step, select a number of ADEPTUS ASTARTES units (excluding TITANIC units) from your army based on the battle size, as shown below. Models in those units have the Deep Strike ability.\n\n BATTLE SIZE\n NUMBER OF UNITS\n\n Incursion\n 2\n\n Strike Force\n 3\n\n Onslaught\n 4\n\nEach time an ADEPTUS ASTARTES model from your army makes an attack, if it was set up on the battlefield this turn, re-roll a Wound roll of 1. If it disembarked from a DROP POD this turn, re-roll a Hit roll of 1 as well.'
        }
      ],
      enhancements: [
        {
          name: 'Laurels of Thunder',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. You can re-roll Charge rolls made for the bearer’s unit in a turn in which it was set up on the battlefield.'
        },
        {
          name: 'Veteran of the Vanguard',
          points: 20,
          text: 'ADEPTUS ASTARTES model only. Models in the bearer’s unit have the Scouts 6" ability.'
        },
        {
          name: 'Orbital Uplink Reliquary',
          points: 25,
          text: 'ADEPTUS ASTARTES model only. After both players have deployed their armies, select up to three ADEPTUS ASTARTES units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.'
        },
        {
          name: 'Dedicated Gunship',
          points: 15,
          text: 'ADEPTUS ASTARTES TERMINATOR model only. Once per battle, at the end of your opponent’s Fight phase , if the bearer’s unit is not within Engagement Range of one or more enemy units, the bearer can use this Enhancement. If it does, remove the bearer’s unit from the battlefield and place it into Strategic Reserves .'
        }
      ],
      stratagems: [
        {
          id: 'orbital-assault-force-suppression-strafing',
          name: 'SUPPRESSION STRAFING',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Command phase .',
          target: 'One ADEPTUS ASTARTES unit from your army.',
          effect: 'Select one enemy unit visible to and within 18" of your unit. That enemy unit takes a Battle-shock test . When doing so, subtract 1 from that test and, if that test is failed, until the start of your next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll .',
          phaseTags: [
            'Command'
          ],
          restrictions: 'You cannot use this Stratagem more than once per battle round .',
          usageLimit: 'perBattle'
        },
        {
          id: 'orbital-assault-force-tactical-decapitation',
          name: 'TACTICAL DECAPITATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, weapons equipped by models in your unit have the [PRECISION] ability and each time a model in your unit makes an attack that targets a CHARACTER unit, add 1 to the Hit roll .',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'orbital-assault-force-shock-onslaught',
          name: 'SHOCK ONSLAUGHT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Pile-in or Consolidation move , it can move up to 6" instead of up to 3".',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: 'orbital-assault-force-auto-sense-coordination',
          name: 'AUTO‑SENSE COORDINATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have this ability in a turn in which they disembarked from a DROP POD or while targeting an enemy unit within 12".',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'orbital-assault-force-blind-screen',
          name: 'BLIND SCREEN',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit (excluding TITANIC units) from your army that was selected as the target of one or more of the attacking unit’s attacks and one friendly ADEPTUS ASTARTES SMOKE VEHICLE or DROP POD unit within 9" of it.',
          effect: 'Until the end of the phase, models in your units have the Stealth ability and each time a ranged attack targets one of your units, models in that unit have the Benefit of Cover against that attack.',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'orbital-assault-force-onward-for-the-emperor',
          name: 'ONWARD FOR THE EMPEROR',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY unit from your army that was not set up on the battlefield this turn and one friendly TRANSPORT it is able to embark within.',
          effect: 'If your ADEPTUS ASTARTES unit is wholly within 6" of that TRANSPORT , it can embark within it.',
          phaseTags: [
            'Fight'
          ]
        }
      ]
    },
    {
      slug: 'ceramite-sentinels',
      name: 'Ceramite Sentinels',
      source: 'https://wahapedia.ru/wh40k10ed/factions/space-marines/',
      rules: [
        {
          name: 'Adaptive Defence',
          text: 'Each time an ADEPTUS ASTARTES model from your army makes an attack, if that model’s unit is within a terrain feature , re-roll a Hit roll of 1 and re-roll a Wound roll of 1.\n\n ADEPTUS ASTARTES units from your army gain the ENTRENCHED keyword while all of the following are true:\n\nThat unit is within a terrain feature.\n\nThat unit was not set up on the battlefield this turn.\n\nNo model in that unit has moved more than 3" this turn.'
        }
      ],
      enhancements: [
        {
          name: 'Honour Indefatigable',
          points: 25,
          text: 'GRAVIS model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.'
        },
        {
          name: 'Castellum Omnivox',
          points: 20,
          text: 'ADEPTUS ASTARTES model only. Each time the bearer’s unit makes a Fall Back move , select one of the following to apply to that unit until the end of the turn:'
        },
        {
          name: 'Spy-skull Data Link',
          points: 15,
          text: 'ADEPTUS ASTARTES model only. Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability.'
        },
        {
          name: 'Defensive Mastery',
          points: 25,
          text: 'ADEPTUS ASTARTES model only. After both players have deployed their armies, select up to three ADEPTUS ASTARTES units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves , regardless of how many units are already in Strategic Reserves.'
        }
      ],
      stratagems: [
        {
          id: 'ceramite-sentinels-unyielding-might',
          name: 'UNYIELDING MIGHT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Command phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that is within Engagement Range of one or more enemy units.',
          effect: 'Until the start of your next Command phase, add 1 to the Objective Control characteristics of models in your unit.',
          phaseTags: [
            'Command'
          ]
        },
        {
          id: 'ceramite-sentinels-priority-strike',
          name: 'PRIORITY STRIKE',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase .',
          target: 'One ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a CHARACTER , MONSTER or VEHICLE unit, you can re-roll the Wound roll .',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'ceramite-sentinels-armour-of-contempt',
          name: 'ARMOUR OF CONTEMPT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: [
            'Shooting',
            'Fight'
          ]
        },
        {
          id: 'ceramite-sentinels-stand-to-the-end',
          name: 'STAND TO THE END',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase , just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if it is an ENTRENCHED unit: on a 4+, do not remove it from play. That destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: [
            'Fight'
          ]
        },
        {
          id: 'ceramite-sentinels-augmented-targeting',
          name: 'AUGMENTED TARGETING',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase .',
          target: 'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot this phase.',
          effect: 'Select either the [SUSTAINED HITS 1] or [LETHAL HITS] abilities. Until the end of the phase, ranged weapons equipped by models in your unit have the selected ability. If your unit is ENTRENCHED , until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] and [LETHAL HITS] abilities instead.',
          phaseTags: [
            'Shooting'
          ]
        },
        {
          id: 'ceramite-sentinels-evasive-repositioning',
          name: 'EVASIVE REPOSITIONING',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase , just after an enemy unit has shot.',
          target: 'One ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Your unit can make a Normal move of up to D6". If your unit is ENTRENCHED , you can re-roll the D6 to determine how far your unit can move.',
          phaseTags: [
            'Shooting'
          ]
        }
      ]
    }
  ];
}());
