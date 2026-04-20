(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['aeldari'] = [
    {
      slug: 'warhost',
      name: 'Warhost',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Martial Grace',
          text: 'Every element of a Warhost operates with speed and efficiency, units swirling around one another in an agile storm of blades and tightly controlled ferocity. The Aeldari know precisely where they must be at any given stage of the battle plan and move with inhuman elegance that leaves their enemies reeling in their wake.\n\n• At the start of the battle round, you receive 1 additional Battle Focus token.\n• Each time a unit from your army performs the Swift as the Wind Agile Manoeuvre, until the end of the phase, add an additional 1" to the Move characteristic of models in that unit.\n• Each time a unit from your army performs an Agile Manoeuvre that involves rolling a D6, add 1 to the result.'
        }
      ],
      enhancements: [
        {
          name: 'Phoenix Gem',
          points: 35,
          text: 'ASURYANI model only. The first time the bearer is destroyed, remove it from play, then, at the end of the phase, roll one D6: on a 2+, set the bearer back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with its full wounds remaining.'
        },
        {
          name: 'Timeless Strategist',
          points: 15,
          text: 'ASURYANI model only. At the start of the battle round, if the bearer is on the battlefield (or any TRANSPORT it is embarked within is on the battlefield), you receive 1 additional Battle Focus token.'
        },
        {
          name: 'Gift of Foresight',
          points: 15,
          text: 'ASURYANI model only. Once per battle round, you can target the bearer’s unit with the Command Re-roll Stratagem for 0CP.'
        },
        {
          name: 'Psychic Destroyer',
          points: 30,
          text: 'ASURYANI PSYKER model only. Add 1 to the Damage characteristic of ranged Psychic weapons equipped by the bearer.'
        }
      ],
      stratagems: [
        {
          id: 'warhost-lightning-fast-reactions',
          name: 'LIGHTNING-FAST REACTIONS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ASURYANI unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'warhost-skyborne-sanctuary',
          name: 'SKYBORNE SANCTUARY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of the Fight phase.',
          target: 'One ASURYANI unit from your army that was eligible to fight this phase and one friendly TRANSPORT it is able to embark within.',
          effect: 'If your ASURYANI unit is not within Engagement Range of one or more enemy units and is wholly within 6" of that TRANSPORT, it can embark within it.',
          phaseTags: ['Fight']
        },
        {
          id: 'warhost-feigned-retreat',
          name: 'FEIGNED RETREAT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an ASURYANI unit from your army Falls Back.',
          target: 'That ASURYANI unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          phaseTags: ['Movement']
        },
        {
          id: 'warhost-blitzing-firepower',
          name: 'BLITZING FIREPOWER',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ASURYANI unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability while targeting an enemy unit within 12". If such a weapon already has that ability, until the end of the phase, each time an attack is made with that weapon, an unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: ['Shooting']
        },
        {
          id: 'warhost-fire-and-fade',
          name: 'FIRE AND FADE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase, just after an ASURYANI INFANTRY unit from your army (excluding AIRCRAFT, ASURMEN and WRAITH CONSTRUCT units) has shot.',
          target: 'That ASURYANI unit.',
          effect: 'Your unit can make a Normal move of up to D6+1".',
          restrictions: 'Until the end of the turn, your unit is not eligible to declare a charge or embark within a TRANSPORT.',
          phaseTags: ['Shooting']
        },
        {
          id: 'warhost-webway-tunnel',
          name: 'WEBWAY TUNNEL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase.',
          target: 'One ASURYANI INFANTRY unit from your army that is wholly within 9" of one or more battlefield edges.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, remove it from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'windrider-host',
      name: 'Windrider Host',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Ride the Wind',
          text: 'These hosts strike from many quarters, employing their incredible speed and agility to evade and ambush the foe at every turn.\n\nIn the Declare Battle Formations step you can set up ASURYANI MOUNTED and VYPER units from your army in Reserves. During the battle, such units can be set up on the battlefield as if they were arriving from Strategic Reserves. For the purposes of setting up ASURYANI MOUNTED or VYPER units from your army on the battlefield, treat the current battle round number as being one higher than it actually is.\n\nIn addition, at the end of your opponent’s turn, you can select a number of ASURYANI MOUNTED or VYPER units from your army (excluding units within Engagement Range of one or more enemy units), then remove those units from the battlefield and place them into Strategic Reserves. The maximum number of units you can select depends on the battle size, as shown below.\n\nBATTLE SIZE NUMBER OF UNITS\nIncursion 1\nStrike Force 2\nOnslaught 3'
        },
        {
          name: 'Keywords',
          text: 'WINDRIDERS units from your army gain the BATTLELINE keyword.'
        }
      ],
      enhancements: [
        {
          name: 'Firstdrawn Blade',
          points: 10,
          text: 'ASURYANI MOUNTED model only. Models in the bearer’s unit have the Scouts 9" ability.'
        },
        {
          name: 'Mirage Field',
          points: 25,
          text: 'ASURYANI MOUNTED model only. Each time an attack targets the bearer’s unit, subtract 1 from the Hit roll.'
        },
        {
          name: 'Seersight Strike',
          points: 15,
          text: 'ASURYANI MOUNTED PSYKER model only. Psychic weapons equipped by the bearer have the [ANTI-MONSTER 2+] and [ANTI-VEHICLE 2+] abilities.'
        },
        {
          name: 'Echoes of Ulthanesh',
          points: 20,
          text: 'ASURYANI MOUNTED model only. In your Command phase, roll one D6, adding 1 to the result if the bearer is not within your deployment zone, and adding an additional 1 to the result if the bearer is within your opponent’s deployment zone: on a 5+, you gain 1CP.'
        }
      ],
      stratagems: [
        {
          id: 'windrider-host-death-from-on-high',
          name: 'DEATH FROM ON HIGH',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One ASURYANI MOUNTED or VYPER unit from your army that was set upon the battlefield from Reserves this turn and has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, you can re-roll the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'windrider-host-overflight',
          name: 'OVERFLIGHT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of your Shooting phase or the end of the Fight phase.',
          target: 'One ASURYANI MOUNTED unit from your army that destroyed one or more enemy units this phase.',
          effect: 'Your unit can make a Normal move of up to 7".',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'windrider-host-wind-of-blades',
          name: 'WIND OF BLADES',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ASURYANI MOUNTED or VYPER unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back.',
          phaseTags: ['Movement']
        },
        {
          id: 'windrider-host-daring-riders',
          name: 'DARING RIDERS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'The Reinforcements step of your Movement phase.',
          target: 'One ASURYANI MOUNTED or VYPER unit from your army in Reserves.',
          effect: 'Until the end of the phase, when setting up your unit on the battlefield from Reserves, it can be set up anywhere on the battlefield that is more than 6" horizontally away from all enemy units. When doing so, if your unit is set up within 9" horizontally of one or more enemy units, until the end of the turn, it is not eligible to declare a charge.',
          phaseTags: ['Movement']
        },
        {
          id: 'windrider-host-focused-firepower',
          name: 'FOCUSED FIREPOWER',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ASURYANI MOUNTED or VYPER unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, improve the Armour Penetration characteristic of that attack by 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'windrider-host-spiralling-evasion',
          name: 'SPIRALLING EVASION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ASURYANI MOUNTED or VYPER unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, models in your unit have a 4+ invulnerable save.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'spirit-conclave',
      name: 'Spirit Conclave',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Shepherds of the Dead',
          text: 'When guided by a Spirit Conclave, the ghost warriors gain a clarity and prowess they would otherwise lack. Moreover, should the foe slay any of their precious spirit guides, the dead will surely have their vengeance.\n\nEach time an ASURYANI PSYKER model from your army is destroyed by an enemy unit, that enemy unit gains a Vengeful Dead token. Each time a WRAITH CONSTRUCT model from your army makes an attack that targets a unit with one or more Vengeful Dead tokens, add 1 to the Hit roll and add 1 to the Wound roll.\n\nASURYANI PSYKER models from your army have the following ability:\nSpirit Guides (Aura): While a WRAITHBLADES, WRAITHGUARD or WRAITHLORD unit from your army is within 12" of this model, that unit has the Battle Focus ability.'
        },
        {
          name: 'Keywords',
          text: 'WRAITHBLADES and WRAITHGUARD units from your army gain the BATTLELINE keyword.'
        }
      ],
      enhancements: [
        {
          name: 'Light of Clarity',
          points: 30,
          text: 'SPIRITSEER model only. In your Command phase, select one friendly WRAITH CONSTRUCT unit within 12" of the bearer. Until the start of your next Command phase, add 1 to the Objective Control characteristic of INFANTRY models in that unit and add 3 to the Objective Control characteristic of MONSTER models in that unit.'
        },
        {
          name: 'Stave of Kurnous',
          points: 15,
          text: 'SPIRITSEER model only. In your Command phase, select one friendly WRAITH CONSTRUCT unit within 12" of the bearer (excluding TITANIC units). Until the start of your next Command phase, each time a model in that unit makes an attack, on a Critical Wound, that attack has the [PRECISION] ability.'
        },
        {
          name: 'Rune of Mists',
          points: 10,
          text: 'SPIRITSEER model only. In your Command phase, select one friendly WRAITH CONSTRUCT unit within 12" of the bearer. Until the start of your next Command phase, each time a ranged attack targets that unit, unless the attacking model is within 18", models in that unit have the Benefit of Cover against that attack.'
        },
        {
          name: 'Higher Duty',
          points: 25,
          text: 'SPIRITSEER model only. Once per turn, when an enemy unit ends a Normal, Advance or Fall Back move within 9" of the bearer, the bearer’s unit can make a Normal move of up to 6".'
        }
      ],
      stratagems: [
        {
          id: 'spirit-conclave-seers-eye',
          name: 'SEER’S EYE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One AELDARI PSYKER model from your army and one friendly WRAITH CONSTRUCT unit within 12" of it that has not been selected to shoot or fight this phase.',
          effect: 'Select one enemy unit visible to your PSYKER model. Until the end of the phase, each time a model in your WRAITH CONSTRUCT unit makes an attack that targets that enemy unit, you can ignore any or all modifiers to the Armour Penetration and/or Damage characteristics of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'spirit-conclave-wraithbone-armour',
          name: 'WRAITHBONE ARMOUR',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One WRAITH CONSTRUCT unit from your army (excluding TITANIC units) that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'spirit-conclave-blades-from-beyond',
          name: 'BLADES FROM BEYOND',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One WRAITHBLADES, WRAITHLORD or WRAITHKNIGHT unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [DEVASTATING WOUNDS] ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'spirit-conclave-soul-bridge',
          name: 'SOUL BRIDGE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One WRAITHBLADES, WRAITHGUARD or WRAITHLORD unit from your army and one ASURYANI PSYKER model from your army.',
          effect: 'Until the start of your next Command phase, your WRAITHBLADES, WRAITHGUARD or WRAITHLORD unit is considered to be within 12" of your PSYKER model for the purposes of the Psychic Guidance and Spirit Guides abilities.',
          phaseTags: ['Command']
        },
        {
          id: 'spirit-conclave-spirit-token',
          name: 'SPIRIT TOKEN',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Start of your Movement phase.',
          target: 'One WRAITHBLADES or WRAITHGUARD unit from your army.',
          effect: 'Select one objective marker you control that your unit is within range of. That objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase.',
          phaseTags: ['Movement']
        },
        {
          id: 'spirit-conclave-crushing-strides',
          name: 'CRUSHING STRIDES',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase, just after a WRAITHBLADES, WRAITHLORD or WRAITHKNIGHT unit from your army ends a Charge move.',
          target: 'That WRAITHBLADES, WRAITHLORD or WRAITHKNIGHT unit.',
          effect: 'Select one enemy unit within Engagement Range of your unit and roll one D6 for each WRAITHBLADES model in your unit, or roll four D6 if your unit has the WRAITHLORD keyword, or roll six D6 if your unit has the WRAITHKNIGHT keyword: for each 3+, that enemy unit suffers 1 mortal wound.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'guardian-battlehost',
      name: 'Guardian Battlehost',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Defend at All Costs',
          text: 'Battlehosts often deploy to protect arterial Webway gates, the world shrines of vulnerable Exodite worlds or the domes and galleries of their home craft world; this lends their warriors an especially keen determination to protect their holdings from foes.\n\nEach time a DIRE AVENGER, GUARDIAN, SUPPORT WEAPON or WAR WALKER model from your army makes an attack, if that model’s unit and/or the target unit are within range of one or more objective markers, add 1 to the Hit roll.'
        }
      ],
      enhancements: [
        {
          name: 'Craftworld’s Champion',
          points: 25,
          text: 'ASURYANI model only. The bearer has an Objective Control characteristic of 5.'
        },
        {
          name: 'Ethereal Pathway',
          points: 30,
          text: 'ASURYANI model only. In the Deploy Armies step, select up to two GUARDIANS units from your army. Models in the selected units have the Infiltrators ability.'
        },
        {
          name: 'Protector of the Paths',
          points: 20,
          text: 'ASURYANI model only. While the bearer is leading a DIRE AVENGERS or GUARDIANS unit, once per battle round, you can target the bearer’s unit with the Fire Overwatch Stratagem for 0CP, and while resolving that Stratagem, hits are scored on unmodified Hit rolls of 5+, or unmodified Hit rolls of 4+ instead if the bearer’s unit is within range of an objective marker you control.'
        },
        {
          name: 'Breath of Vaul',
          points: 10,
          text: 'ASURYANI model only. While the bearer is leading a STORM GUARDIANS unit, each time you roll to determine the number of attacks made with a flamer equipped by a model in that unit, you can re-roll the result, and each time you make a Damage roll for a model equipped with a fusion gun in that unit, you can re-roll the result.'
        }
      ],
      stratagems: [
        {
          id: 'guardian-battlehost-warding-salvoes',
          name: 'WARDING SALVOES',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One DIRE AVENGERS or GUARDIANS unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit within range of one or more objective markers, you can re-roll the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'guardian-battlehost-shield-nodes',
          name: 'SHIELD NODES',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One DIRE AVENGERS or GUARDIANS unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'If your unit is within range of one or more objective markers, until the end of the phase, each time an attack targets your unit, subtract 1 from the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'guardian-battlehost-vauls-vengeance',
          name: 'VAUL’S VENGEANCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase, just after an enemy unit destroys a DIRE AVENGERS or GUARDIANS unit from your army.',
          target: 'One WAR WALKERS unit from your army.',
          effect: 'After that enemy unit has finished making its attacks, your unit can shoot as if it were your Shooting phase, but when resolving those attacks, it can only target that enemy unit (and only if it is an eligible target).',
          restrictions: 'You can only use this Stratagem once per battle round.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'guardian-battlehost-time-to-strike',
          name: 'TIME TO STRIKE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One STORM GUARDIANS unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the phase, each time your unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6" to the Move characteristic of models in your unit. Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced.',
          phaseTags: ['Movement']
        },
        {
          id: 'guardian-battlehost-blades-of-asuryan',
          name: 'BLADES OF ASURYAN',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One DIRE AVENGERS or GUARDIANS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [PISTOL] ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'guardian-battlehost-cost-of-victory',
          name: 'COST OF VICTORY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase.',
          target: 'One GUARDIANS unit from your army.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, remove it from the battlefield and place it into Strategic Reserves. When doing so, return every destroyed GUARDIANS model to your unit.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'ghosts-of-the-webway',
      name: 'Ghosts of the Webway',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Acrobatic Onslaught',
          text: 'Each time a HARLEQUINS model from your army makes a Charge move, it can move through enemy models.'
        },
        {
          name: 'Travelling Players',
          text: 'TROUPE units from your army gain the BATTLELINE keyword and TROUPE models in those units have an Objective Control characteristic of 2. You can include up to three of each of the following models in your army: DEATH JESTER, SHADOWSEER, TROUPE MASTER.'
        }
      ],
      enhancements: [
        {
          name: 'Cegorachâ€™s Coil',
          points: 25,
          text: 'TROUPE MASTER model only. Each time the bearerâ€™s unit ends a Charge move, select one enemy unit within Engagement Range of the bearerâ€™s unit, then roll one D6 for each model in the bearerâ€™s unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).'
        },
        {
          name: 'Mask of Secrets',
          points: 15,
          text: 'HARLEQUINS model only. Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of the bearerâ€™s unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests.'
        },
        {
          name: 'Murderâ€™s Jest',
          points: 20,
          text: 'DEATH JESTER model only. Each time the bearer makes an attack that targets a unit that is Below Half-strength, each successful Hit roll scores a Critical Hit.'
        },
        {
          name: 'Mistweave',
          points: 15,
          text: 'SHADOWSEER model only. While the bearer is leading a unit, models in that unit have the Infiltrators ability.'
        }
      ],
      stratagems: [
        {
          id: 'ghosts-of-the-webway-staged-death',
          name: 'STAGED DEATH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase.',
          target: 'One HARLEQUINS CHARACTER model from your army that was just destroyed. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'At the end of the phase, set your model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with half of its starting number of wounds remaining.',
          restrictions: 'Each model can only be targeted with this Stratagem once per battle.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'ghosts-of-the-webway-heroes-fall',
          name: 'HEROESâ€™ FALL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One HARLEQUINS unit from your army that was selected as the target of one or more of the attacking unitâ€™s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6. On a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'ghosts-of-the-webway-mocking-flight',
          name: 'MOCKING FLIGHT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a HARLEQUINS unit from your army Falls Back.',
          target: 'That HARLEQUINS unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          phaseTags: ['Movement']
        },
        {
          id: 'ghosts-of-the-webway-tricksters-retort',
          name: 'TRICKSTERSâ€™ RETORT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponentâ€™s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One TROUPE unit from your army that is within 9" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        },
        {
          id: 'ghosts-of-the-webway-bloody-dance',
          name: 'BLOODY DANCE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponentâ€™s Charge phase.',
          target: 'One HARLEQUINS INFANTRY or HARLEQUINS MOUNTED unit from your army that is within 6" of one or more enemy units and would be eligible to declare a charge against one or more of those enemy units if it were your Charge phase.',
          effect: 'Your unit now declares a charge that only targets one or more of those enemy units, and you resolve that charge.',
          restrictions: 'Note that even if this charge is successful, your unit does not receive any Charge bonus this turn.',
          phaseTags: ['Charge']
        },
        {
          id: 'ghosts-of-the-webway-exit-the-stage',
          name: 'EXIT THE STAGE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponentâ€™s Fight phase.',
          target: 'One HARLEQUINS unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'devoted-of-ynnead',
      name: 'Devoted of Ynnead',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Strength from Death',
          text: 'You can use the following rules:\n\nLethal Intent\nAt the end of your opponentâ€™s Shooting phase, if one or more YNNARI units from your army were destroyed this phase, select one YNNARI INFANTRY or YNNARI MOUNTED unit from your army that was within 6" of your destroyed unit. That unit can make a Normal move of up to D6+1".\n\nLethal Surge\nOnce per turn, when a YNNARI unit from your army performs the Fade Back Agile Manoeuvre, it can make a Lethal Surge move instead of a Normal move. If it does, roll one D6 and add 1 to the result: that unit can be moved a number of inches up to the total. When doing so, those models can be moved within Engagement Range of the enemy unit that just triggered that Agile Manoeuvre.\n\nLethal Reprisal\nAt the start of the Fight phase, select one YNNARI unit from your army (excluding TITANIC units) that is below its Starting Strength. Until the end of the phase, that unit has the Fights First ability.'
        },
        {
          name: 'Servants of the Whispering God',
          text: 'You can include YNNARI units in your army, even though they do not have the ASURYANI Faction keyword. ASURYANI units (excluding EPIC HEROES) from your army gain the YNNARI keyword. You must include YVRAINE and/or THE YNCARNE in your army, and one of those models must be your WARLORD.'
        }
      ],
      enhancements: [
        {
          name: 'Gaze of Ynnead',
          points: 15,
          text: 'FARSEER model only. The bearerâ€™s Eldritch Storm weapon has the [devastating wounds] ability.'
        },
        {
          name: 'Storm of Whispers',
          points: 10,
          text: 'WARLOCK model only. In your Shooting phase, after the bearer has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test.'
        },
        {
          name: 'Borrowed Vigour',
          points: 10,
          text: 'ARCHON model only. Add 2 to the Attacks characteristic of the bearerâ€™s melee weapons.'
        },
        {
          name: 'Morbid Might',
          points: 15,
          text: 'SUCCUBUS model only. Each time the bearer makes a melee attack, you can re-roll the Wound roll.'
        }
      ],
      stratagems: [
        {
          id: 'devoted-of-ynnead-pall-of-dread',
          name: 'PALL OF DREAD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase.',
          target: 'One YNNARI unit from your army that was just destroyed while it was within range of one or more objective markers you controlled at the end of the previous phase. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'Select one of those objective markers. That objective marker remains under your control until your opponentâ€™s Level of Control over that objective marker is greater than yours at the end of a phase.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'devoted-of-ynnead-macabre-resilience',
          name: 'MACABRE RESILIENCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponentâ€™s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One YNNARI INFANTRY or YNNARI MOUNTED unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unitâ€™s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'devoted-of-ynnead-emissaries-of-ynnead',
          name: 'EMISSARIES OF YNNEAD',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase, just after a YNNARI INFANTRY unit from your army has selected its targets.',
          target: 'That YNNARI INFANTRY unit.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Hit roll of 1. If your unit is below its Starting Strength, you can re-roll the Hit roll instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'devoted-of-ynnead-parting-the-veil',
          name: 'PARTING THE VEIL',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One YNNARI unit from your army that was selected as the target of one or more of the attacking unitâ€™s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'devoted-of-ynnead-soulsight',
          name: 'SOULSIGHT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One YNNARI unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [LETHAL HITS] and [IGNORES COVER] abilities.',
          phaseTags: ['Shooting']
        },
        {
          id: 'devoted-of-ynnead-death-answers-death',
          name: 'DEATH ANSWERS DEATH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponentâ€™s Shooting phase.',
          target: 'One YNNARI unit from your army (excluding WRAITH CONSTRUCT units), if one or more models in that unit were destroyed this phase.',
          effect: 'Your unit can shoot as if it were your Shooting phase.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'seer-council',
      name: 'Seer Council',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Strands of Fate',
          text: 'At the start of the first battle round, you generate Fate dice by rolling a number of D6 based on the battle size, as shown below. Keep your Fate dice to one side - this is your Fate dice pool.\n\nBATTLE SIZE NUMBER OF D6\nIncursion 3\nStrike Force 6\nOnslaught 9\n\nEach time you use one of the Stratagems below, if your Fate dice pool contains one or more Fate dice showing the corresponding value in the table below, you can discard one of those corresponding Fate dice. If you do, reduce the CP cost of that usage of that Stratagem by 1CP.\n\nSTRATAGEM FATE DICE VALUE\nPresentiment of Dread 1\nForewarned 2\nUnshrouded Truth 3\nFate Inescapable 4\nIshaâ€™s Fury 5\nPsychic Shield 6'
        }
      ],
      enhancements: [
        {
          name: 'Lucid Eye',
          points: 30,
          text: 'ASURYANI PSYKER model only. In your Command phase, you can add 1 to or subtract 1 from the value of one Fate dice in your Fate dice pool.'
        },
        {
          name: 'Runes of Warding',
          points: 25,
          text: 'ASURYANI PSYKER model only. Models in the bearerâ€™s unit have the Feel No Pain 4+ ability against mortal wounds, Psychic Attacks and Critical Wounds caused by attacks with the [devastating wounds] ability.'
        },
        {
          name: 'Stone of Eldritch Fury',
          points: 15,
          text: 'ASURYANI PSYKER model only. Add 12" to the Range characteristic of ranged Psychic weapons equipped by the bearer.'
        },
        {
          name: 'Torc of Morai-Heg',
          points: 20,
          text: 'ASURYANI PSYKER model only. Once per turn, when your opponent targets a unit from their army within 12" of the bearer with a Stratagem, the bearer can use this Enhancement. If it does, increase the CP cost of that usage of that Stratagem by 1CP.'
        }
      ],
      stratagems: [
        {
          id: 'seer-council-presentiment-of-dread',
          name: 'PRESENTIMENT OF DREAD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Command phase.',
          target: 'One ASURYANI PSYKER model from your army.',
          effect: 'Select one enemy unit within 18" of and visible to your model. That enemy unit must take a Battle-shock test, subtracting 1 from that test.',
          phaseTags: ['Command']
        },
        {
          id: 'seer-council-forewarned',
          name: 'FOREWARNED',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ASURYANI INFANTRY unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unitâ€™s attacks and is within 9" of one or more friendly ASURYANI PSYKER models.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll and subtract 1 from the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'seer-council-unshrouded-truth',
          name: 'UNSHROUDED TRUTH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ASURYANI INFANTRY unit from your army (excluding WRAITH CONSTRUCT units) that has not been selected to move this phase, was not set up on the battlefield this phase, and is within 9" of one or more friendly ASURYANI PSYKER models.',
          effect: 'Remove your unit from the battlefield and set it up again anywhere on the battlefield that is more than 9" horizontally away from all enemy models.',
          restrictions: 'Until the end of the phase, your unit is not eligible to be selected to move.',
          phaseTags: ['Movement']
        },
        {
          id: 'seer-council-fate-inescapable',
          name: 'FATE INESCAPABLE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ASURYANI INFANTRY unit from your army (excluding WRAITH CONSTRUCT units) that has not been selected to shoot this phase and is within 9" of one or more friendly ASURYANI PSYKER models.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability and each time a model in your unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'seer-council-ishas-fury',
          name: 'ISHAâ€™S FURY',
          cp: 1,
          type: 'Epic Deed',
          timing: 'opponent',
          when: 'Your opponentâ€™s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One ASURYANI PSYKER model from your army within 9" of that enemy unit.',
          effect: 'Roll six D6: for each 3+, that enemy unit suffers 1 mortal wound.',
          phaseTags: ['Movement']
        },
        {
          id: 'seer-council-psychic-shield',
          name: 'PSYCHIC SHIELD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponentâ€™s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ASURYANI INFANTRY unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unitâ€™s attacks and is within 9" of one or more friendly ASURYANI PSYKER models.',
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'aspect-host',
      name: 'Aspect Host',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Path of the Warrior',
          text: 'Each time an ASPECT WARRIORS or AVATAR OF KHAINE unit from your army is selected to shoot or fight, select one of the following abilities for it to gain until the end of the phase:\n\n• Each time a model in this unit makes an attack, re-roll a Hit roll of 1.\n• Each time a model in this unit makes an attack, re-roll a Wound roll of 1.'
        }
      ],
      enhancements: [
        {
          name: 'Aspect of Murder',
          points: 25,
          text: 'AUTARCH or AUTARCH WAYLEAPER model only. Add 1 to the Damage characteristic of melee weapons equipped by the bearer, and those weapons have the [precision] ability.'
        },
        {
          name: 'Mantle of Wisdom',
          points: 30,
          text: 'AUTARCH or AUTARCH WAYLEAPER model only. While the bearer is leading an ASPECT WARRIORS unit, each time that unit is selected to shoot or fight, until the end of the phase, models in that unit gain both of the abilities from the Path of the Warrior Detachment rule.'
        },
        {
          name: 'Shimmerstone',
          points: 15,
          text: 'AUTARCH or AUTARCH WAYLEAPER model only. While the bearer is leading an ASPECT WARRIORS unit, each time a ranged attack targets that unit, subtract 1 from the Wound roll.'
        },
        {
          name: 'Strategic Savant',
          points: 15,
          text: 'AUTARCH or AUTARCH WAYLEAPER model only. While the bearer is leading an ASPECT WARRIORS unit, add 1 to the Objective Control characteristic of models in that unit.'
        }
      ],
      stratagems: [
        {
          id: 'aspect-host-warrior-focus',
          name: 'WARRIOR FOCUS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One ASPECT WARRIORS or AVATAR OF KHAINE unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, you can ignore any or all modifiers to that attackâ€™s Ballistic Skill, Weapon skill, Strength, Armour Penetration and Damage characteristics and/or any or all modifiers to the Hit roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'aspect-host-to-their-final-breath',
          name: 'TO THEIR FINAL BREATH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ASPECT WARRIORS or AVATAR OF KHAINE unit from your army that was selected as the target of one or more of the attacking unitâ€™s attacks.',
          effect: 'Each time you use this Stratagem, you can remove one Aspect Shrine token your unit has (see datasheets). Then, until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if you removed an Aspect Shrine token during this usage of this Stratagem. On a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'aspect-host-skyborne-sanctuary',
          name: 'SKYBORNE SANCTUARY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of the Fight phase.',
          target: 'One ASURYANI unit from your army that was eligible to fight this phase and one friendly TRANSPORT it is able to embark within.',
          effect: 'If your ASURYANI unit is not within Engagement Range of one or more enemy units and is wholly within 6" of that TRANSPORT, it can embark within it.',
          phaseTags: ['Fight']
        },
        {
          id: 'aspect-host-doom-inescapable',
          name: 'DOOM INESCAPABLE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One AVATAR OF KHAINE model from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, your modelâ€™s Wailing Doom ranged weapon has a Range characteristic of 18" and a Damage characteristic of 8.',
          phaseTags: ['Shooting']
        },
        {
          id: 'aspect-host-preternatural-precision',
          name: 'PRETERNATURAL PRECISION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ASPECT WARRIORS unit from your army that has not been selected to shoot this phase.',
          effect: 'Each time you use this Stratagem, you can remove one Aspect Shrine token your unit has (see datasheets). Then, select one of the following abilities, or select two of the following abilities if you removed an Aspect Shrine token during this usage of this Stratagem: [IGNORES COVER], [LETHAL HITS], [SUSTAINED HITS 1]. Until the end of the phase, ranged weapons equipped by models in your unit have the selected abilities.',
          phaseTags: ['Shooting']
        },
        {
          id: 'aspect-host-khaines-vengeance',
          name: 'KHAINEâ€™S VENGEANCE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponentâ€™s Movement phase, just after an enemy unit (excluding MONSTERS and VEHICLES) is selected to Fall Back.',
          target: 'One ASPECT WARRIORS or AVATAR OF KHAINE unit from your army that is within Engagement Range of that enemy unit.',
          effect: 'All models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests.',
          phaseTags: ['Movement']
        }
      ]
    },
    {
      slug: 'armoured-warhost',
      name: 'Armoured Warhost',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Skilled Crews',
          text: 'Ranged weapons equipped by AELDARI VEHICLE models from your army have the [ASSAULT] ability and you can re-roll Advance rolls made for AELDARI VEHICLE FLY units from your army.'
        }
      ],
      enhancements: [
        {
          name: 'Guiding Presence',
          points: 25,
          text: 'AELDARI PSYKER model only. At the start of your Shooting phase, select one friendly AELDARI VEHICLE model within 9" of the bearer. Until the end of the phase, each time that model makes an attack, add 1 to the Hit roll.'
        },
        {
          name: 'Harmonisation Matrix',
          points: 30,
          text: 'AELDARI model only. In your Command phase, if the bearer (or any TRANSPORT it is embarked within) is within range of an objective marker you control, roll one D6: on a 3+, you gain 1CP.'
        },
        {
          name: 'Spirit Stone of Raelyth',
          points: 20,
          text: 'AELDARI PSYKER model only. While the bearer is within 3" of one or more friendly AELDARI VEHICLE units, the bearer has the Lone Operative ability. In your Command phase, you can select one friendly AELDARI VEHICLE model within 3" of the bearer. That model regains up to D3 lost wounds.'
        },
        {
          name: 'Guileful Strategist',
          points: 15,
          text: 'AELDARI model only. If your army includes the bearer, after both players have deployed their armies, select up to three AELDARI VEHICLE units from your army and redeploy them. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.'
        }
      ],
      stratagems: [
        {
          id: 'armoured-warhost-layered-wards',
          name: 'LAYERED WARDS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase, just after a mortal wound is allocated to an AELDARI VEHICLE unit from your army.',
          target: 'That AELDARI VEHICLE unit.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 5+ ability against mortal wounds.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'armoured-warhost-swift-deployment',
          name: 'SWIFT DEPLOYMENT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One AELDARI TRANSPORT unit from your army.',
          effect: 'Until the end of the phase, units can disembark from your TRANSPORT after it has Advanced. Units that do so count as having made a Normal move that phase, and cannot declare a charge in the same turn, but can otherwise act normally.',
          phaseTags: ['Movement']
        },
        {
          id: 'armoured-warhost-vectored-engines',
          name: 'VECTORED ENGINES',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an AELDARI VEHICLE unit from your army that can FLY Falls Back.',
          target: 'That AELDARI FLY VEHICLE unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back.',
          phaseTags: ['Movement']
        },
        {
          id: 'armoured-warhost-cloudstrike',
          name: 'CLOUDSTRIKE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Start of the Reinforcements step of your Movement phase.',
          target: 'One AELDARI VEHICLE unit from your army that can FLY and is in Strategic Reserves.',
          effect: 'Until the end of the phase, your unit has the Deep Strike ability. When your unit is set up on the battlefield using the Deep Strike ability, it can be set up anywhere on the battlefield that is more than 6" horizontally away from all enemy units, but if it does, until the end of the turn, it is not eligible to declare a charge. In addition, if your unit is a TRANSPORT, each unit that disembarks from it this turn must be set up more than 6" horizontally from all enemy units and until the end of the turn, is not eligible to declare a charge.',
          phaseTags: ['Movement']
        },
        {
          id: 'armoured-warhost-soulsight',
          name: 'SOULSIGHT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One AELDARI VEHICLE unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time your unit is selected to shoot, you can re-roll one Hit roll, one Wound roll and one Damage roll made for a model in your unit. If you are using fast dice rolling, you can select one of those rolls to re-roll before moving onto the next step of the attack sequence.',
          phaseTags: ['Shooting']
        },
        {
          id: 'armoured-warhost-anti-grav-repulsion',
          name: 'ANTI-GRAV REPULSION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Charge phase, just after an enemy unit has declared a charge.',
          target: 'One AELDARI VEHICLE unit from your army that can FLY and was selected as a target of that charge.',
          effect: 'Until the end of the phase, subtract 2 from Charge rolls made for that enemy unit.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'serpents-brood',
      name: 'Serpent’s Brood',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Boons of the Brood',
          text: 'Weapons equipped by HARLEQUINS MOUNTED and HARLEQUINS VEHICLE models from your army have the [SUSTAINED HITS 1] ability. Each time a HARLEQUINS unit from your army disembarks from a TRANSPORT, until the end of the turn, that unit’s weapons have the [SUSTAINED HITS 1] ability.'
        },
        {
          name: 'Travelling Players',
          text: 'TROUPE units from your army gain the BATTLELINE keyword, and TROUPE models in those units have an Objective Control characteristic of 2. You can include up to three of each of the following models in your army: DEATH JESTER, SHADOWSEER, TROUPE MASTER.'
        }
      ],
      enhancements: [
        {
          name: 'Key of Ghosts',
          points: 20,
          text: 'HARLEQUINS model only (excluding SOLITAIRE models). Models in the bearer’s unit have the Scouts 6" ability.'
        },
        {
          name: 'Weavers’ Wail',
          points: 20,
          text: 'TROUPE MASTER model only. Add 3 to the Strength and add 1 to the Attacks characteristics of the bearer’s melee weapons.'
        },
        {
          name: 'Fanged Leer',
          points: 10,
          text: 'DEATH JESTER model only. When using the bearer’s Cruel Amusement ability, you can select two of the abilities for its shrieker cannon to gain, instead of one.'
        },
        {
          name: 'Shedskin Raiment',
          points: 25,
          text: 'SHADOWSEER model only. After both players have deployed their armies, select up to three HARLEQUINS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.'
        }
      ],
      stratagems: [
        {
          id: 'serpents-brood-fangs-of-the-brood',
          name: 'FANGS OF THE BROOD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Start of the Fight phase.',
          target: 'One TROUPE unit from your army.',
          effect: 'Until the end of the phase, when using your unit’s Dance of Death ability, you can select three of the abilities for your unit to gain, instead of one.',
          phaseTags: ['Fight']
        },
        {
          id: 'serpents-brood-venomous-wrath',
          name: 'VENOMOUS WRATH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One HARLEQUINS VEHICLE unit from your army that has not been selected to shoot this phase.',
          effect: 'After your unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6". Until the end of the turn, your unit is not eligible to declare a charge.',
          phaseTags: ['Shooting']
        },
        {
          id: 'serpents-brood-striking-stride',
          name: 'STRIKING STRIDE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One HARLEQUINS unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
          phaseTags: ['Charge']
        },
        {
          id: 'serpents-brood-weavers-coils',
          name: 'WEAVERS’ COILS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of your Fight phase.',
          target: 'One HARLEQUINS MOUNTED unit from your army that was eligible to fight this phase.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, it can make a Normal move. Otherwise, your unit can make a Fall Back move of up to 6".',
          phaseTags: ['Fight']
        },
        {
          id: 'serpents-brood-weaving-stride',
          name: 'WEAVING STRIDE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One HARLEQUINS INFANTRY unit from your army that is within 9" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        },
        {
          id: 'serpents-brood-skyward-lunge',
          name: 'SKYWARD LUNGE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase.',
          target: 'One HARLEQUINS VEHICLE or HARLEQUINS MOUNTED unit from your army.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'eldritch-raiders',
      name: 'Eldritch Raiders',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Yriel’s Own',
          text: 'AELDARI units in your army are eligible to declare a charge in a turn in which they Advanced. In addition, each time an ANHRATHE, RANGERS or SHROUD RUNNERS unit from your army Advances, you can re-roll the Advance roll.'
        },
        {
          name: 'Veterans of the Void',
          text: 'Each time you add an ANHRATHE unit to your army, it can be given up to one Corsair Enhancement. Each Corsair Enhancement included in your army must be unique. If a unit is given a Corsair Enhancement, you must increase the points cost of that unit by the amount shown. If this causes your army to exceed the points limit for the battle you are playing, you cannot include that unit in your army.'
        }
      ],
      enhancements: [
        {
          name: 'Pirate Prince',
          points: 15,
          text: 'PRINCE YRIEL unit only. Each time you spend a Battle Focus token to enable this unit to perform an Agile Manoeuvre, roll one D6: on a 3+, you gain 1 Battle Focus token.'
        },
        {
          name: 'Alacritous Assault',
          points: 20,
          text: 'ANHRATHE unit only. Melee weapons equipped by models in this unit have the [LANCE] ability.'
        },
        {
          name: 'Exotic Munitions',
          points: 15,
          text: 'ANHRATHE unit only. Ranged weapons equipped by models in this unit have the [ANTI-MONSTER 5+] and [ANTI-VEHICLE 5+] abilities.'
        },
        {
          name: 'Adrenal Infusions',
          points: 20,
          text: 'ANHRATHE INFANTRY unit only. This unit can perform the Fade Back Agile Manoeuvre without spending a Battle Focus token to do so. It can do so even if other units have done so in the same phase, and doing so does not prevent other units from performing the same Agile Manoeuvre in the same phase.'
        }
      ],
      stratagems: [
        {
          id: 'eldritch-raiders-raiders-spoils',
          name: 'RAIDERS’ SPOILS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Command phase.',
          target: 'One ANHRATHE unit from your army that is within Engagement Range of one or more enemy units.',
          effect: 'Until the start of the next Command phase, add 1 to the Objective Control characteristic of models in your unit.',
          phaseTags: ['Command']
        },
        {
          id: 'eldritch-raiders-ruthless-killers',
          name: 'RUTHLESS KILLERS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One CORSAIR VOIDSCARRED unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Damage characteristic of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'eldritch-raiders-yriels-example',
          name: 'YRIEL’S EXAMPLE',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One AELDARI INFANTRY unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 5+ ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'eldritch-raiders-no-prey-too-big',
          name: 'NO PREY TOO BIG',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ANHRATHE, RANGERS or SHROUD RUNNERS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, if the Strength characteristic of that attack is less than the highest Toughness characteristic of models in the target unit, add 1 to the Wound roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'eldritch-raiders-impeding-fire',
          name: 'IMPEDING FIRE',
          cp: 1,
          type: 'Wargear',
          timing: 'opponent',
          when: 'Start of your opponent’s Charge phase.',
          target: 'One RANGERS, SHROUD RUNNERS or STARFANG unit from your army.',
          effect: 'Select one enemy unit (excluding TITANIC units) visible to and within 36" of your unit. Until the end of the phase, each time that enemy unit declares a charge, subtract 2 from the Charge roll.',
          restrictions: 'This is not cumulative with any other negative modifiers to that Charge roll.',
          phaseTags: ['Charge']
        },
        {
          id: 'eldritch-raiders-withdraw-and-reinforce',
          name: 'WITHDRAW AND REINFORCE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase.',
          target: 'One ANHRATHE unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves. If that unit is below Starting Strength, return all destroyed models (excluding CHARACTER models) to that unit.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'corsair-coterie',
      name: 'Corsair Coterie',
      source: 'https://wahapedia.ru/wh40k10ed/factions/aeldari/harlequins',
      rules: [
        {
          name: 'Relentless Raiders',
          text: 'While an objective marker is under your control, each time an enemy unit ends a Normal, Advance, Fall Back or Charge move within range of that objective marker, roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds.'
        },
        {
          name: 'Void Thieves',
          text: 'ANHRATHE units from your army have the following ability: Void Thieves: At the end of a phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase.'
        },
        {
          name: 'Veterans of the Void',
          text: 'Each time you add an ANHRATHE unit to your army, it can be given up to one Corsair Enhancement. Each Corsair Enhancement included in your army must be unique. If a unit is given a Corsair Enhancement, you must increase the points cost of that unit by the amount shown. If this causes your army to exceed the points limit for the battle you are playing, you cannot include that unit in your army.'
        }
      ],
      enhancements: [
        {
          name: 'Infamy (Aura)',
          points: 25,
          text: 'ANHRATHE unit only. While an enemy unit is within 3" of this unit, subtract 1 from the Objective Control characteristic of models in that unit (to a minimum of 1).'
        },
        {
          name: 'Webway Pathstone',
          points: 25,
          text: 'ANHRATHE unit only. Models in this unit have the Deep Strike ability. In addition, once per battle, at the end of your opponent’s turn, if this unit is not within Engagement Range of one or more enemy units, it can use this ability. If it does, remove this unit from the battlefield and place it into Strategic Reserves.'
        },
        {
          name: 'Archraider',
          points: 35,
          text: 'ANHRATHE CHARACTER unit only. At the start of the battle, select one CHARACTER model in this unit. That model has the following ability: Lord of Deceit (Aura): Each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12" of this model, increase the cost of that use of that Stratagem by 1CP.'
        },
        {
          name: 'Voidstone',
          points: 15,
          text: 'ANHRATHE INFANTRY unit only. Models in this unit have a 5+ invulnerable save.'
        }
      ],
      stratagems: [
        {
          id: 'corsair-coterie-pirates-due',
          name: 'PIRATES’ DUE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'The Fight phase.',
          target: 'One AELDARI unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1. If your unit has the ANHRATHE keyword, then until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit within range of an objective marker, you can re-roll the Wound roll instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'corsair-coterie-lethal-ruse',
          name: 'LETHAL RUSE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an AELDARI unit from your army Falls Back.',
          target: 'That AELDARI unit.',
          effect: 'Until the end of the turn, your unit is eligible to declare a charge in a turn in which it Fell Back. If it is an ANHRATHE unit, also select one enemy unit your unit was within Engagement Range of at the start of the phase, and roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.',
          phaseTags: ['Movement']
        },
        {
          id: 'corsair-coterie-outcast-ambush',
          name: 'OUTCAST AMBUSH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One RANGERS or SHROUD RUNNERS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] and [RAPID FIRE 1] abilities, and until the end of the phase, improve the Armour Penetration characteristic of those weapons by 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'corsair-coterie-into-the-breach',
          name: 'INTO THE BREACH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase, just after an ANHRATHE unit from your army destroyed one or more enemy units.',
          target: 'That ANHRATHE unit.',
          effect: 'After your unit has resolved all of its shooting attacks, it can make a Normal move of up to D6+1".',
          phaseTags: ['Shooting']
        },
        {
          id: 'corsair-coterie-cloak-and-shadow',
          name: 'CLOAK AND SHADOW',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One AELDARI INFANTRY unit from your army that is within range of an objective marker that you control and that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, models in your unit have the Stealth ability and your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          phaseTags: ['Shooting']
        },
        {
          id: 'corsair-coterie-vengeful-sorrow',
          name: 'VENGEFUL SORROW',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has shot.',
          target: 'One AELDARI INFANTRY unit from your army, if one or more models in that unit were destroyed as a result of those attacks, and if that AELDARI unit is neither Battle-shocked nor within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Surge move. To do so, roll one D6 and add 1 to the roll: models in your unit move a number of inches up to this result, but your unit must end that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, those models can be moved within Engagement Range of that enemy unit.',
          phaseTags: ['Shooting']
        }
      ]
    }
  ];
}());
