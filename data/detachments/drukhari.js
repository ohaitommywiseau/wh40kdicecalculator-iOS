(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['drukhari'] = [
    {
      slug: 'realspace-raiders',
      name: 'Realspace Raiders',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/drukhari/',
      rules: [
        {
          name: 'Alliance of Agony',
          text: 'At the start of the battle, you gain 2 Pain tokens for each of the following combinations your army contains (these do not need to be in the same Attached unit):\n\n* One or more ARCHON models and one or more KABALITE WARRIORS units.\n* One or more SUCCUBUS models and one or more WYCHES units.\n* One or more HAEMONCULUS models and one or more WRACKS units.\n\nDesigner\'s Note: These are all cumulative, so if your army contains at least one of all of the combinations listed above, you start the battle with 6 Pain tokens.'
        }
      ],
      enhancements: [
        {
          name: 'Dark Vitality',
          points: 25,
          text: "DRUKHARI model only. The bearer's unit is always Empowered - you do not need to spend any Pain tokens to activate that unit's Pain abilities."
        },
        {
          name: 'Labyrinthine Cunning',
          points: 25,
          text: "ARCHON model only. At the start of your Command phase, if the bearer is on the battlefield, you can do one of the following:\n\n* Spend 1 Pain token and gain 1CP.\n* Roll one D6: on a 4+, you gain 1CP."
        },
        {
          name: 'Eye of Spite',
          points: 15,
          text: "SUCCUBUS model only. Improve the Attacks and Armour Penetration characteristics of the bearer's melee weapons by 1. Each time the bearer's unit is selected to fight, you can spend 1 Pain token; if you do, until the end of the phase, improve the Attacks and Armour Penetration characteristics of the bearer's melee weapons by 2 instead."
        },
        {
          name: 'Crucible of Malediction',
          points: 20,
          text: 'HAEMONCULUS model only. Once per battle, in your Shooting phase, the bearer can use this Enhancement. If it does, you can spend 1 Pain token. Then, each enemy unit within 12" of the bearer must take a Battle-shock test, subtracting 1 from that test if you spent 1 Pain token. Each time a PSYKER unit fails that test, it suffers 3 mortal wounds.'
        }
      ],
      stratagems: [
        {
          id: 'realspace-raiders-insensible-to-pain',
          name: 'INSENSIBLE TO PAIN',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One HAEMONCULUS COVENS unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'realspace-raiders-fighting-shadows',
          name: 'FIGHTING SHADOWS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One DRUKHARI unit from your army (excluding HAEMONCULUS COVENS units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'realspace-raiders-instinctive-spite',
          name: 'INSTINCTIVE SPITE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Start of your Shooting phase or the start of the Fight phase.',
          target: 'Up to two DRUKHARI BATTLELINE units from your army, or one other DRUKHARI unit from your army.',
          effect: 'You can spend 1 Pain token. Until the end of the phase, each time a model in each of those units makes an attack that targets an enemy unit that is Below Half-strength, add 1 to the Hit roll. If you spent 1 Pain token, add 1 to the Wound roll as well.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'realspace-raiders-dark-harvest',
          name: 'DARK HARVEST',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Start of the Fight phase.',
          target: 'Up to two WRACKS units from your army, or one other DRUKHARI unit from your army.',
          effect: 'Until the end of the phase, melee weapons equipped by models in each of those units have the [LETHAL HITS] ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'realspace-raiders-eager-for-the-kill',
          name: 'EAGER FOR THE KILL',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Start of your Movement phase.',
          target: 'Up to two WYCHES units from your army, or one other DRUKHARI unit from your army, that have not been selected to move this phase.',
          effect: 'Until the end of the phase, each time one of those units Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6" to the Move characteristic of models in that unit (this is not cumulative with the REAVERS\' Matchless Swiftness ability).',
          phaseTags: ['Movement']
        },
        {
          id: 'realspace-raiders-raid-and-fade',
          name: 'RAID AND FADE',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'End of your Shooting phase.',
          target: 'Up to two KABALITE WARRIORS units from your army, or one other DRUKHARI unit from your army (excluding SCOURGES and AIRCRAFT).',
          effect: 'Each of those units can make a Normal move of up to 6".',
          restrictions: 'You cannot select units that are within Engagement Range of one or more enemy units. Until the end of the turn, those units are not eligible to declare a charge.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'skysplinter-assault',
      name: 'Skysplinter Assault',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/drukhari/',
      rules: [
        {
          name: 'Rain Of Cruelty',
          text: 'Each time a DRUKHARI unit from your army disembarks from a TRANSPORT, until the end of the turn:\n\n* Ranged weapons equipped by models in that disembarking unit have the [IGNORES COVER] ability.\n* Melee weapons equipped by models in that disembarking unit have the [LANCE] ability.'
        }
      ],
      enhancements: [
        {
          name: 'Phantasmal Smoke',
          points: 15,
          text: 'DRUKHARI model only. While the bearer\'s unit is wholly within 6" of a friendly DRUKHARI TRANSPORT:\n\n* Models in the bearer\'s unit have the Stealth ability.\n* Each time a ranged attack targets the bearer\'s unit, models in that unit have the Benefit of Cover against that attack.'
        },
        {
          name: 'Sadistic Fulcrum',
          points: 15,
          text: "DRUKHARI model only. Each time you spend 1 Pain token to Empower the bearer's unit in the Shooting phase, select one friendly DRUKHARI TRANSPORT within 6\" of the bearer's unit; until the end of the phase, each time that TRANSPORT makes an attack, you can re-roll the Hit roll."
        },
        {
          name: 'Spiteful Raider',
          points: 10,
          text: "DRUKHARI model only. Each time the bearer's unit destroys an enemy unit in the Fight phase, if that enemy unit was within range of one or more objective markers when the bearer's unit was selected to fight, you gain 1 additional Pain token."
        },
        {
          name: 'Nightmare Shroud',
          points: 20,
          text: "DRUKHARI model only. Each time the bearer's unit disembarks from a TRANSPORT, until the end of the turn, enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer's unit."
        }
      ],
      stratagems: [
        {
          id: 'skysplinter-assault-vicious-blades',
          name: 'VICIOUS BLADES',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after a DRUKHARI TRANSPORT from your army has selected its targets.',
          target: 'That TRANSPORT.',
          effect: 'After your TRANSPORT has fought, select one enemy unit that was the target of one or more of those attacks and roll one D6 for each model embarked within your TRANSPORT, adding 1 to the result if that embarked model is a WRACKS model: for each 5+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).',
          phaseTags: ['Fight']
        },
        {
          id: 'skysplinter-assault-wraithlike-retreat',
          name: 'WRAITHLIKE RETREAT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of the Fight phase.',
          target: 'One DRUKHARI INFANTRY unit from your army that fought this phase.',
          effect: 'Your unit can make a Normal or Fall Back move, but unless it is a WYCHES unit, it must end that move wholly within 3" horizontally and 5" vertically of a friendly DRUKHARI TRANSPORT and must embark within that TRANSPORT at the end of that move (otherwise, it cannot make that move).',
          phaseTags: ['Fight']
        },
        {
          id: 'skysplinter-assault-pounce-on-the-prey',
          name: 'POUNCE ON THE PREY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a DRUKHARI INFANTRY unit from your army disembarks from a TRANSPORT that made a Normal move this phase.',
          target: 'That INFANTRY unit.',
          effect: 'Until the end of the turn, your unit is eligible to declare a charge.',
          phaseTags: ['Movement']
        },
        {
          id: 'skysplinter-assault-skyborne-annihilation',
          name: 'SKYBORNE ANNIHILATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One DRUKHARI unit from your army that has not been selected to shoot this phase and that disembarked from a TRANSPORT this turn.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability, or the [SUSTAINED HITS 2] ability if your unit is a KABALITE WARRIORS or HAND OF THE ARCHON unit.',
          phaseTags: ['Shooting']
        },
        {
          id: 'skysplinter-assault-swooping-mockery',
          name: 'SWOOPING MOCKERY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One DRUKHARI TRANSPORT from your army that is within 9" of that enemy unit.',
          effect: 'Your TRANSPORT can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        },
        {
          id: 'skysplinter-assault-night-shield',
          name: 'NIGHT SHIELD',
          cp: 1,
          type: 'Wargear',
          timing: 'opponent',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One DRUKHARI VEHICLE unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 4+ invulnerable save.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'spectacle-of-spite',
      name: 'Spectacle of Spite',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/drukhari/',
      rules: [
        {
          name: 'Combat Drugs',
          text: 'At the start of your Command phase, select which Combat Drugs will be active for your army until the start of your next Command phase. To do so, either select one from the list below (you cannot select the same Combat Drug more than once per battle), or randomly select two by rolling two D6. When doing so randomly, Combat Drugs you have previously selected can become active again, but if you randomly select one that is already active for your army, it has no additional effect.\n\n1. Adrenalight\nAdd 1 to the Attacks characteristic of melee weapons equipped by WYCH CULT models from your army.\n\n2. Hypex\nAdd 2" to the Move characteristic of WYCH CULT models from your army.\n\n3. Serpentin\nImprove the Weapon Skill characteristic of melee weapons equipped by WYCH CULT models from your army by 1.\n\n4. Painbringer\nAdd 1 to the Toughness characteristic of WYCH CULT models from your army.\n\n5. Grave Lotus\nAdd 1 to the Strength characteristic of melee weapons equipped by WYCH CULT models from your army.\n\n6. Splintermind\nImprove the Leadership characteristic of WYCH CULT models from your army by 1, and improve the Ballistic Skill characteristic of ranged weapons equipped by WYCH CULT models from your army by 1.'
        }
      ],
      enhancements: [
        {
          name: 'Pharmacophex',
          points: 15,
          text: 'SUCCUBUS model only. At the start of your Command phase, after selecting which Combat Drugs will be active for your army, roll one D6 and consult the Combat Drugs list. The result rolled applies to the bearer\'s unit until the start of your next Command phase in addition to any other Combat Drugs that are active for your army. If you randomly select one that is already active for your army, it has no additional effect.'
        },
        {
          name: 'Chronoshard',
          points: 15,
          text: 'SUCCUBUS model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer\'s unit have the Fights First ability.'
        },
        {
          name: 'Periapt of Torments',
          points: 25,
          text: "SUCCUBUS model only. Enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer's unit."
        },
        {
          name: "Morghenna's Curse",
          points: 20,
          text: "SUCCUBUS model only. Improve the Armour Penetration and Damage characteristics of the bearer's melee weapons by 1."
        }
      ],
      stratagems: [
        {
          id: 'spectacle-of-spite-berserk-fugue',
          name: 'BERSERK FUGUE',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One WYCH CULT unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'spectacle-of-spite-deadly-debut',
          name: 'DEADLY DEBUT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One DRUKHARI unit from your army that made a Charge move this turn and has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [LETHAL HITS] ability. If your unit is a WYCHES unit, until the end of the phase, improve the Armour Penetration characteristic of melee weapons equipped by models in your unit by 1 as well.',
          phaseTags: ['Fight']
        },
        {
          id: 'spectacle-of-spite-feigned-weakness',
          name: 'FEIGNED WEAKNESS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a DRUKHARI unit from your army Falls Back.',
          target: 'That DRUKHARI unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in turn in which it Fell Back.',
          phaseTags: ['Movement']
        },
        {
          id: 'spectacle-of-spite-preternatural-agility',
          name: 'PRETERNATURAL AGILITY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Start of your Movement or Charge phase.',
          target: 'One WYCH CULT unit from your army.',
          effect: 'Until the end of the phase, each time your unit makes a Normal, Advance or Charge move, you can ignore any or all modifiers to its Move characteristic and to Advance and Charge rolls made for it and, until the end of the turn, each time a model in your unit makes such a move, it can move horizontally through models (when doing so, such a model can move within Engagement Range of such models but cannot end a Normal or Advance move within Engagement Range of them).',
          phaseTags: ['Movement', 'Charge']
        },
        {
          id: 'spectacle-of-spite-a-challenge-met',
          name: 'A CHALLENGE MET',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: "End of your opponent's Movement phase.",
          target: 'One WYCH CULT unit from your army that would be able to declare a charge if it were your Charge phase.',
          effect: 'Select one enemy unit within 9" of your unit that was set up on the battlefield this phase or that ended a Normal or Advance move this phase. Your unit now declares a charge that targets only that enemy unit, and you resolve that charge.',
          restrictions: 'Even if that charge is successful, your unit does not receive any Charge bonus this turn.',
          phaseTags: ['Movement']
        },
        {
          id: 'spectacle-of-spite-acrobatic-display',
          name: 'ACROBATIC DISPLAY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One WYCH CULT unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 5+ invulnerable save.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'covenite-coterie',
      name: 'Covenite Coterie',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/drukhari/',
      rules: [
        {
          name: 'Stitchflesh Abominations',
          text: 'Each time an attack targets a HAEMONCULUS COVENS unit from your army, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll.'
        }
      ],
      enhancements: [
        {
          name: 'Master Regenesist',
          points: 25,
          text: "HAEMONCULUS model only. Each time the bearer uses its Fleshcraft ability, you can return up to D3+3 destroyed Bodyguard models to the bearer's unit instead of D3+1."
        },
        {
          name: 'Master Nemesine',
          points: 5,
          text: "HAEMONCULUS model only. The bearer's weapons have the [ANTI-BEAST 2+] and [ANTI-MONSTER 4+] abilities."
        },
        {
          name: 'Master Artisan',
          points: 20,
          text: "HAEMONCULUS model only. Add 1 to the bearer's Wounds characteristic and add 1 to the Toughness characteristic of models in the bearer's unit."
        },
        {
          name: 'Master Repugnomancer',
          points: 15,
          text: "HAEMONCULUS model only. Add 3\" to the range of the bearer's Fear Incarnate ability, and each time a friendly DRUKHARI unit within 9\" of the bearer fails a Battle-shock test or is destroyed, roll one D6: on a 4+, you gain 1 Pain token."
        }
      ],
      stratagems: [
        {
          id: 'covenite-coterie-postmortality',
          name: 'POSTMORTALITY',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Any phase.',
          target: 'One HAEMONCULUS model from your army that was just destroyed. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'Spend 1-3 Pain tokens. At the end of the phase, set the destroyed model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with a number of wounds remaining equal to the number of Pain tokens you just spent.',
          restrictions: 'You cannot use this Stratagem if you have 0 Pain tokens, and you cannot target the same HAEMONCULUS model with this Stratagem more than once per battle.'
        },
        {
          id: 'covenite-coterie-symphony-of-suffering',
          name: 'SYMPHONY OF SUFFERING',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase, just after a DRUKHARI unit from your army destroys an enemy unit.',
          target: 'That DRUKHARI unit.',
          effect: 'Each enemy unit within 9" of and visible to your unit must take a Battle-shock test, subtracting 1 from that test if your unit is a HAEMONCULUS COVENS unit.',
          phaseTags: ['Fight']
        },
        {
          id: 'covenite-coterie-poisoners-art',
          name: "POISONER'S ART",
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase, just after a HAEMONCULUS COVENS unit from your army has fought.',
          target: 'That HAEMONCULUS COVENS unit.',
          effect: "Select one enemy unit (excluding VEHICLES) hit by one or more of your unit's attacks this phase. Until the end of the battle, that enemy unit is poisoned. At the start of each Command phase, roll one D6 for each poisoned unit on the battlefield: on a 4+, that unit suffers D3 mortal wounds.",
          phaseTags: ['Fight']
        },
        {
          id: 'covenite-coterie-distillers-of-fear',
          name: 'DISTILLERS OF FEAR',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One HAEMONCULUS COVENS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit that is Battle-shocked, that attack has the [DEVASTATING WOUNDS] ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'covenite-coterie-connoisseurs-of-pain',
          name: 'CONNOISSEURS OF PAIN',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One DRUKHARI unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Spend 1 Pain token. Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1. At the end of the phase, if your unit is still on the battlefield and it is a HAEMONCULUS COVENS unit, you gain 1 Pain token.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'covenite-coterie-enfolding-nightmare',
          name: 'ENFOLDING NIGHTMARE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One HAEMONCULUS COVENS unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Roll one D6: your unit can be moved a number of inches up to the result, but it must end that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, those models can be moved within Engagement Range of that enemy unit.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'kabalite-cartel',
      name: 'Kabalite Cartel',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/drukhari/',
      rules: [
        {
          name: 'Murderous Agenda',
          text: "At the start of the first battle round, select one of the Contracts below, then select one unit from your opponent's army that matches the 'Contract' description in that Contract. Until that Contract is completed, that unit is your Contract unit and KABAL and BLADES FOR HIRE units from your army have the ability stated in that Contract. At the start of your Command phase, if your Contract unit is destroyed, that Contract is completed and you gain 3 Pain tokens.\n\nTrophy Hunters\nContract: One CHARACTER unit.\nAbility: Each time a KABAL or BLADES FOR HIRE model in this unit makes an attack that targets the Contract unit, that attack has the [PRECISION] ability.\n\nSow Fear and Terror\nContract: One INFANTRY or MOUNTED unit (excluding units containing only CHARACTER models). At the start of your Command phase, this Contract is completed if all non-CHARACTER models in that unit are destroyed.\nAbility: Each time a KABAL or BLADES FOR HIRE model in this unit makes an attack that targets an INFANTRY or MOUNTED unit, that attack has the [SUSTAINED HITS 1] ability.\n\nShow of Strength\nContract: One MONSTER or VEHICLE unit.\nAbility: Each time a KABAL or BLADES FOR HIRE model in this unit makes an attack that targets a MONSTER or VEHICLE unit, that attack has the [LETHAL HITS] ability."
        }
      ],
      enhancements: [
        {
          name: 'Leechbite Plate',
          points: 5,
          text: "ARCHON model only. The bearer has a Save characteristic of 3+. At the start of either player's Command phase, you can spend 1 Pain token: if you do, the bearer regains all of its lost wounds."
        },
        {
          name: 'Webway Awl',
          points: 25,
          text: "ARCHON model only. Models in the bearer's unit have the Deep Strike ability, and you can target the bearer's unit with the Rapid Ingress Stratagem for 0CP."
        },
        {
          name: 'Informant Network',
          points: 30,
          text: 'ARCHON model only. At the start of the Declare Battle Formations step, select up to three KABALITE WARRIORS and/or HAND OF THE ARCHON units from your army; those units gain the Infiltrators ability.'
        },
        {
          name: 'Towering Arrogance',
          points: 20,
          text: 'ARCHON model only. While the bearer is leading a unit, improve the Leadership and Objective Control characteristics of models in that unit by 1.'
        }
      ],
      stratagems: [
        {
          id: 'kabalite-cartel-double-cross',
          name: 'DOUBLE-CROSS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One KABAL or BLADES FOR HIRE unit from your army that was selected as the target of one or more of the attacking unit's attacks, and one friendly DRUKHARI unit (excluding VEHICLES).",
          effect: 'Until the end of the phase, each time you would allocate an attack to a model in your KABAL or BLADES FOR HIRE unit, if your DRUKHARI unit is within Engagement Range of the attacking model, no saving throw is made for that attack; instead, your DRUKHARI unit suffers a number of mortal wounds equal to the Damage characteristic of that attack.',
          phaseTags: ['Fight']
        },
        {
          id: 'kabalite-cartel-taken-alive',
          name: 'TAKEN ALIVE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One DRUKHARI unit from your army that has not been selected to fight this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Hit roll. If your Contract unit is destroyed as a result of those attacks, every unit in your opponent's army must take a Battle-shock test. You cannot gain more than 3 Pain tokens as a result of failed Battle-shock tests caused by this Stratagem.",
          phaseTags: ['Fight']
        },
        {
          id: 'kabalite-cartel-enemies-without-number',
          name: 'ENEMIES WITHOUT NUMBER',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Command phase, just after you complete a Contract.',
          target: 'One ARCHON WARLORD from your army.',
          effect: "Select one new Contract (this can be one you have already completed), then select one unit from your opponent's army that is on the battlefield and matches the 'Contract' description in that Contract. Until that Contract is completed, that unit is your Contract unit and the Murderous Agenda Detachment rule applies as normal.",
          phaseTags: ['Command']
        },
        {
          id: 'kabalite-cartel-making-a-point',
          name: 'MAKING A POINT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One KABALITE WARRIORS or HAND OF THE ARCHON unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, improve the Ballistic Skill and Armour Penetration characteristics of ranged weapons equipped by models in your unit by 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'kabalite-cartel-deadly-deceivers',
          name: 'DEADLY DECEIVERS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One KABAL or BLADES FOR HIRE unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          phaseTags: ['Shooting']
        },
        {
          id: 'kabalite-cartel-tailored-toxins',
          name: 'TAILORED TOXINS',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One KABAL or BLADES FOR HIRE unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets your Contract unit, an unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: ['Shooting', 'Fight']
        }
      ]
    },
    {
      slug: 'reapers-wager',
      name: "Reaper's Wager",
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/drukhari/',
      rules: [
        {
          name: 'Callous Competition',
          text: 'At the start of the battle, DRUKHARI units from your army are winning the wager.\nEach time a DRUKHARI unit from your army destroys an enemy unit, DRUKHARI units from your army are winning the wager.\nEach time a HARLEQUINS unit from your army destroys an enemy unit, HARLEQUIN units from your army are winning the wager.'
        }
      ],
      enhancements: [
        {
          name: 'Archraider',
          points: 15,
          text: 'HARLEQUINS or DRUKHARI model only. In the Declare Battle Formations step, if the bearer starts the battle embarked within a DEDICATED TRANSPORT, that DEDICATED TRANSPORT has the Scouts 9" ability.'
        },
        {
          name: 'Webway Walker',
          points: 15,
          text: "HARLEQUINS or DRUKHARI model only. Models in the bearer's unit have the Deep Strike ability. Each time the bearer's unit is set up on the battlefield using the Deep Strike ability, if that unit is currently losing the wager, until the end of the turn, you can re-roll Charge rolls made for that unit."
        },
        {
          name: "Reaper's Cowl",
          points: 25,
          text: "HARLEQUINS model only. Models in the bearer's unit have the Stealth and Infiltrators abilities."
        },
        {
          name: 'Conductor of Torment',
          points: 20,
          text: 'DRUKHARI model only. In your Command phase, you can do one of the following:\n\n* If your DRUKHARI units are currently losing the wager, you can gain 1 Pain token. If you do, DRUKHARI units from your army are now winning the wager.\n* If your DRUKHARI units are currently winning the wager, you can discard 1 Pain token. If you do, HARLEQUINS units from your army are now winning the wager.'
        }
      ],
      stratagems: [
        {
          id: 'reapers-wager-malicious-frenzy',
          name: 'MALICIOUS FRENZY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One DRUKHARI or HARLEQUINS unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select [LETHAL HITS] or [SUSTAINED HITS 1]. Until the end of the phase, weapons equipped by models in your unit have the selected ability.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'reapers-wager-fateful-role',
          name: 'FATEFUL ROLE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One DRUKHARI or HARLEQUINS unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if that unit is losing the wager: on a 4+, do not remove it from play. That destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play.",
          phaseTags: ['Fight']
        },
        {
          id: 'reapers-wager-murderers-circus',
          name: "MURDERER'S CIRCUS",
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One DRUKHARI or HARLEQUINS unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'reapers-wager-shorten-the-odds',
          name: 'SHORTEN THE ODDS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after a DRUKHARI or HARLEQUINS unit from your army has Advanced.',
          target: 'That unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced.',
          phaseTags: ['Movement']
        },
        {
          id: 'reapers-wager-scintillating-tempo',
          name: 'SCINTILLATING TEMPO',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Your Movement phase or your Charge phase, just after a DRUKHARI or HARLEQUINS unit from your army is selected to make a Normal, Advance or Fall Back move, is set up on the battlefield, or declares a charge.',
          target: 'That unit.',
          effect: 'Until the end of the turn, enemy units cannot use the Fire Overwatch Stratagem to shoot at your unit.',
          phaseTags: ['Movement', 'Charge']
        },
        {
          id: 'reapers-wager-dance-macabre',
          name: 'DANCE MACABRE',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One DRUKHARI INFANTRY or HARLEQUINS INFANTRY unit from your army that is within 9" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to D6". If your unit is currently losing the wager, it can make a Normal move of up to 6" instead.',
          phaseTags: ['Movement']
        }
      ]
    }
  ];
}());
