(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['adeptus-custodes'] = [
    {
      slug: 'talons-of-the-emperor',
      name: 'Talons Of The Emperor',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/',
      rules: [
        {
          name: 'Revered Companions',
          text: 'ANATHEMA PSYKANA units from your army gain the following ability:\n\nNull Aegis (Aura): While an ADEPTUS CUSTODES unit is within 6" of this unit, models in that unit have the Feel No Pain 5+ ability against Psychic Attacks and mortal wounds.\n\nAll other ADEPTUS CUSTODES units from your army gain the following ability:\n\nDeadly Unity (Aura): While an ANATHEMA PSYKANA unit is within 6" of this unit, each time a model in that ANATHEMA PSYKANA unit makes an attack, add 1 to the Hit roll.'
        }
      ],
      enhancements: [
        {
          name: 'Aegis Projector',
          points: 20,
          text: 'ADEPTUS CUSTODES model only. Once per turn, the first time a saving throw is failed for the bearer\'s unit, change the Damage characteristic of that attack to 0.'
        },
        {
          name: 'Champion of the Imperium',
          points: 25,
          text: 'ADEPTUS CUSTODES model only. The range of the bearer\'s Null Aegis or Deadly Unity ability is increased to 9".'
        },
        {
          name: 'Gift of Terran Artifice',
          points: 15,
          text: 'ADEPTUS CUSTODES model only. Each time the bearer makes a melee attack, add 1 to the Wound roll.'
        },
        {
          name: 'Radiant Mantle',
          points: 30,
          text: 'ADEPTUS CUSTODES model only. Each time an attack targets the bearer\'s unit, if the attacking model is within 12", subtract 1 from the Hit roll.'
        }
      ],
      stratagems: [
        {
          id: 'talons-of-the-emperor-hunt-as-one',
          name: 'HUNT AS ONE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Start of your Movement phase.',
          target: 'Up to two ADEPTUS CUSTODES units from your army.',
          effect: 'Until the end of the turn, your units are eligible to shoot and/or declare a charge in a turn in which they Fell Back.',
          restrictions: 'You can only select two units if one (and only one) of them is an ANATHEMA PSYKANA unit and both are within 6" of each other.',
          phaseTags: ['Movement', 'Shooting', 'Charge']
        },
        {
          id: 'talons-of-the-emperor-talons-interlocked',
          name: 'TALONS INTERLOCKED',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'Up to two ADEPTUS CUSTODES INFANTRY units from your army, and one enemy unit that is an eligible target for all of those units.',
          effect: 'Until the end of the phase, your units can only target that enemy unit, but each time a model in one of your units makes a ranged attack, improve the Strength and Armour Penetration characteristics of that attack by 1.',
          restrictions: 'You can only select two units if one (and only one) of them is an ANATHEMA PSYKANA unit and both are within 6" of each other.',
          phaseTags: ['Shooting']
        },
        {
          id: 'talons-of-the-emperor-empyric-severance',
          name: 'EMPYRIC SEVERANCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS CUSTODES unit from your army that was selected as the target of one or more of the attacking unit\'s attacks, and one friendly ANATHEMA PSYKANA unit within 6" of that ADEPTUS CUSTODES unit.',
          effect: 'Until the end of the phase, your unit has the Feel No Pain 4+ ability against Psychic attacks and mortal wounds.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'talons-of-the-emperor-emperors-executioners',
          name: 'EMPEROR\'S EXECUTIONERS',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Start of the Fight phase.',
          target: 'Up to two ADEPTUS CUSTODES units from your army.',
          effect: 'Until the end of the phase, each time a model in one of your units targets an enemy unit that is below its Starting Strength, add 1 to the Wound roll.',
          restrictions: 'You can only select two units if one (and only one) of them is an ANATHEMA PSYKANA unit and both are within 6" of each other.',
          phaseTags: ['Fight']
        },
        {
          id: 'talons-of-the-emperor-taloned-pincer',
          name: 'TALONED PINCER',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'Up to two ADEPTUS CUSTODES units from your army that are within 9" of that enemy unit.',
          effect: 'Your units can make a Normal move of up to 6".',
          restrictions: 'You cannot select units that are within Engagement Range of one or more enemy units. You can only select two units if one (and only one) of them is an ANATHEMA PSYKANA unit and both are within 6" of each other.',
          phaseTags: ['Movement']
        },
        {
          id: 'talons-of-the-emperor-shield-of-honour',
          name: 'SHIELD OF HONOUR',
          cp: 1,
          type: 'Epic Deed',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ANATHEMA PSYKANA INFANTRY unit from your army that was selected as the target of one or more of the attacking unit\'s attacks, and one other friendly ADEPTUS CUSTODES INFANTRY unit (excluding ANATHEMA PSYKANA units) within 6" of that ANATHEMA PSYKANA INFANTRY unit.',
          effect: 'Until the end of the phase, any attack that targets your ANATHEMA PSYKANA unit must instead target your other ADEPTUS CUSTODES unit (unless it is not an eligible target).',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'shield-host',
      name: 'Shield Host',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/',
      rules: [
        {
          name: 'Martial Mastery',
          text: 'At the start of the battle round, you can select one of the bullet points below. If you do, until the start of the next battle round, that bullet point\'s effects apply.\n\n• Each time an ADEPTUS CUSTODES model from your army with the Martial Ka\'tah ability makes a melee attack, a successful unmodified Hit roll of 5+ scores a Critical Hit.\n• Improve the Armour Penetration characteristic of melee weapons equipped by ADEPTUS CUSTODES models from your army with the Martial Ka\'tah ability by 1.'
        }
      ],
      enhancements: [
        {
          name: 'Auric Mantle',
          points: 15,
          text: 'SHIELD-CAPTAIN or BLADE CHAMPION model only. Add 2 to the bearer\'s Wounds characteristic.'
        },
        {
          name: 'Castellan\'s Mark',
          points: 20,
          text: 'SHIELD-CAPTAIN model only. After both players have deployed their armies, you can select up to two ADEPTUS CUSTODES units from your army (excluding ANATHEMA PSYKANA units) and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.'
        },
        {
          name: 'From the Hall of Armouries',
          points: 25,
          text: 'SHIELD-CAPTAIN model only. Add 1 to the Strength and Damage characteristics of the bearer\'s melee weapons.'
        },
        {
          name: 'Panoptispex',
          points: 5,
          text: 'SHIELD-CAPTAIN or BLADE CHAMPION model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [IGNORES COVER] ability.'
        }
      ],
      stratagems: [
        {
          id: 'shield-host-arcane-genetic-alchemy',
          name: 'ARCANE GENETIC ALCHEMY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Any phase, just after a mortal wound has been allocated to an ADEPTUS CUSTODES model from your army (excluding ANATHEMA PSYKANA models).',
          target: 'That ADEPTUS CUSTODES model\'s unit.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 4+ ability against mortal wounds.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'shield-host-avenge-the-fallen',
          name: 'AVENGE THE FALLEN',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Start of the Fight phase.',
          target: 'One ADEPTUS CUSTODES unit from your army (excluding ANATHEMA PSYKANA units) that is below its Starting Strength.',
          effect: 'Until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit. If your unit is Below Half-strength, until the end of the phase, add 2 to the Attacks characteristic of those melee weapons instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'shield-host-unwavering-sentinels',
          name: 'UNWAVERING SENTINELS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS CUSTODES INFANTRY unit from your army (excluding ANATHEMA PSYKANA units) that is within range of an objective marker you control and that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a melee attack targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'shield-host-multipotentiality',
          name: 'MULTIPOTENTIALITY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ADEPTUS CUSTODES unit from your army that Fell Back this phase.',
          effect: 'Until the end of your turn, that unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          phaseTags: ['Movement', 'Shooting', 'Charge']
        },
        {
          id: 'shield-host-vigilance-eternal',
          name: 'VIGILANCE ETERNAL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ADEPTUS CUSTODES BATTLELINE unit from your army (excluding ANATHEMA PSYKANA units) within range of an objective marker you control.',
          effect: 'That objective marker remains under your control even if you have no models within range of it, until your opponent controls it at the start or end of any turn.',
          phaseTags: ['Movement']
        },
        {
          id: 'shield-host-archeotech-munitions',
          name: 'ARCHEOTECH MUNITIONS',
          cp: 1,
          type: 'Wargear',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ADEPTUS CUSTODES unit from your army (excluding ANATHEMA PSYKANA units) that has not been selected to shoot this phase.',
          effect: 'Select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, ranged weapons equipped by models in your unit have the selected ability.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'null-maiden-vigil',
      name: 'Null Maiden Vigil',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/',
      rules: [
        {
          name: 'Creeping Dread (Aura)',
          text: 'In the Battle-shock step of your opponent\'s Command phase, if an enemy unit that is either a PSYKER unit or below its Starting Strength is within 12" of one or more ANATHEMA PSYKANA models from your army, that enemy unit must take a Battle-shock test. If that unit is Below Half-strength, it must subtract 1 from its Battle-shock test this phase instead.'
        },
        {
          name: 'Keywords',
          text: 'If you select this Detachment, PROSECUTORS units from your army have the BATTLELINE keyword.'
        }
      ],
      enhancements: [
        {
          name: 'Enhanced Voidsheen Cloak',
          points: 10,
          text: 'ANATHEMA PSYKANA model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack. If that attack was made by a PSYKER or Battle-shocked model, change the Damage characteristic of that attack to 1 instead.'
        },
        {
          name: 'Huntress\' Eye',
          points: 15,
          text: 'ANATHEMA PSYKANA model only. In your Command phase, select one enemy unit within 12" of the bearer. That unit must take a Battle-shock test.'
        },
        {
          name: 'Oblivion Knight',
          points: 25,
          text: 'ANATHEMA PSYKANA model only. While the bearer is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll. If that attack targeted an enemy PSYKER unit, add 1 to the Wound roll as well.'
        },
        {
          name: 'Raptor Blade',
          points: 5,
          text: 'ANATHEMA PSYKANA model only. Add 1 to the Attacks, Strength and Damage characteristics of the bearer\'s melee weapons. While the bearer is within Engagement Range of one or more enemy PSYKER units that are Battle-shocked, add 2 to the Attacks, Strength and Damage characteristics of the bearer\'s melee weapons instead.'
        }
      ],
      stratagems: [
        {
          id: 'null-maiden-vigil-desperations-price',
          name: 'DESPERATION\'S PRICE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase, just after an enemy PSYKER unit has either finished using a Psychic ability that targets a unit, or finished making Psychic Attacks.',
          target: 'One ANATHEMA PSYKANA unit from your army within 18" of that enemy PSYKER unit.',
          effect: 'That enemy PSYKER unit must take a Leadership test. If the test is passed, that PSYKER unit is Battle-shocked; if the test is failed, that PSYKER unit suffers 3 mortal wounds and is Battle-shocked.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'null-maiden-vigil-witch-hunters',
          name: 'WITCH HUNTERS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One ANATHEMA PSYKANA unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have the selected ability, but models in your unit can only target PSYKER units with their attacks.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'null-maiden-vigil-anathema-blademastery',
          name: 'ANATHEMA BLADEMASTERY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One VIGILATORS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a melee attack, you can re-roll the Hit roll. If the target of that attack is Battle-shocked or a PSYKER, you can re-roll the Wound roll as well.',
          phaseTags: ['Fight']
        },
        {
          id: 'null-maiden-vigil-psy-chaff-volley',
          name: 'PSY-CHAFF VOLLEY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One PROSECUTORS unit from your army that has just shot.',
          effect: 'Select one enemy unit hit by one or more of those attacks. Until the start of your next turn, while your unit is on the battlefield, that enemy unit is prosecuted. While a unit is prosecuted, each time an ANATHEMA PSYKANA model makes an attack against that unit, improve the Armour Penetration characteristic of that attack by 1. While a PSYKER or Battle-shocked unit is prosecuted, each time a model in that unit makes an attack, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'null-maiden-vigil-purgation-sweep',
          name: 'PURGATION SWEEP',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One WITCHSEEKERS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, add 1 to the Attacks characteristic of Torrent weapons equipped by models in your unit. If such a weapon targets a PSYKER or Battle-shocked unit this phase, add 2 to its Attacks characteristic instead.',
          phaseTags: ['Shooting']
        },
        {
          id: 'null-maiden-vigil-psychic-abominations',
          name: 'PSYCHIC ABOMINATIONS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ANATHEMA PSYKANA INFANTRY unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, your unit has the Stealth ability, and Battle-shocked and PSYKER models can only select your unit as a target of a ranged attack if they are within 12".',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'auric-champions',
      name: 'Auric Champions',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/',
      rules: [
        {
          name: 'Assemblage of Might',
          text: 'Each time an ADEPTUS CUSTODES CHARACTER model from your army with the Martial Ka\'tah ability makes a melee attack, if that model\'s unit contains no other CHARACTER models, add 1 to the Wound roll.'
        }
      ],
      enhancements: [
        {
          name: 'Blade Imperator',
          points: 25,
          text: 'ADEPTUS CUSTODES model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, improve the Strength, Armour Penetration and Damage characteristics of the bearer\'s melee weapons by 1.'
        },
        {
          name: 'Inspirational Exemplar',
          points: 10,
          text: 'ADEPTUS CUSTODES model only. Once per battle round, when the bearer\'s unit is selected as the target of a Stratagem, if that Stratagem can target another unit from your army, you can select another ADEPTUS CUSTODES CHARACTER unit from your army as the target of that Stratagem as well.'
        },
        {
          name: 'Martial Philosopher',
          points: 30,
          text: 'ADEPTUS CUSTODES model only. At the start of the battle round, if the bearer is on the battlefield, you gain 1CP.'
        },
        {
          name: 'Veiled Blade',
          points: 25,
          text: 'ADEPTUS CUSTODES model only. Improve the Strength and Armour Penetration characteristics of the bearer\'s melee weapons by 2.'
        }
      ],
      stratagems: [
        {
          id: 'auric-champions-slayer-of-champions',
          name: 'SLAYER OF CHAMPIONS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTUS CUSTODES CHARACTER unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a CHARACTER, MONSTER or VEHICLE unit, add 1 to the Hit roll and add 1 to the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'auric-champions-superhuman-reserves',
          name: 'SUPERHUMAN RESERVES',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS CUSTODES CHARACTER unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Fight']
        },
        {
          id: 'auric-champions-the-emperors-auspice',
          name: 'THE EMPEROR\'S AUSPICE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS CUSTODES CHARACTER unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 4+ ability against mortal wounds.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'auric-champions-earning-of-a-name',
          name: 'EARNING OF A NAME',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Fight phase, just after an ADEPTUS CUSTODES CHARACTER unit from your army destroys an enemy CHARACTER unit.',
          target: 'That ADEPTUS CUSTODES CHARACTER unit.',
          effect: 'One model in your unit regains up to D3 lost wounds and, if your unit is Battle-shocked, your unit is no longer Battle-shocked.',
          phaseTags: ['Fight']
        },
        {
          id: 'auric-champions-vigil-unending',
          name: 'VIGIL UNENDING',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One ADEPTUS CUSTODES CHARACTER unit from your army that had one or more of its models destroyed as a result of the attacking unit\'s attacks.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, it can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: ['Shooting']
        },
        {
          id: 'auric-champions-shoulder-the-mantle',
          name: 'SHOULDER THE MANTLE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase, just after an ADEPTUS CUSTODES CHARACTER model from your army is destroyed.',
          target: 'One other ADEPTUS CUSTODES CHARACTER model from your army.',
          effect: 'Until the end of the battle, add 1 to the Attacks, Toughness and Wounds characteristics of that model.',
          restrictions: 'You cannot use this Stratagem more than once per battle.',
          usageLimit: 'perBattle',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        }
      ]
    },
    {
      slug: 'solar-spearhead',
      name: 'Solar Spearhead',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/',
      rules: [
        {
          name: 'Auric Armour',
          text: 'Each time a ranged attack is allocated to an ADEPTUS CUSTODES VEHICLE model from your army, halve the Damage characteristic of that attack.'
        },
        {
          name: 'Moritoi Ancients',
          text: 'If an ADEPTUS CUSTODES WALKER model from your army destroys one or more enemy units, until the end of the battle, that model has the Feel No Pain 5+ ability.'
        }
      ],
      enhancements: [
        {
          name: 'Adamantine Talisman',
          points: 25,
          text: 'ADEPTUS CUSTODES model only. While the bearer is leading a unit, models in that unit have the Feel No Pain 6+ ability. Each time an enemy model is destroyed by an attack made by the bearer\'s unit, until the start of your next Command phase, models in the bearer\'s unit have the Feel No Pain 5+ ability instead.'
        },
        {
          name: 'Augury Uplink',
          points: 35,
          text: 'VEHICLE model only. In your Shooting phase, after the bearer has shot, select one enemy unit hit by one or more of those attacks. Until the start of your next turn, each time another ADEPTUS CUSTODES model from your army makes an attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1.'
        },
        {
          name: 'Honoured Fallen (Aura)',
          points: 15,
          text: 'WALKER model only. While a friendly ADEPTUS CUSTODES INFANTRY unit is within 6" of the bearer, models in that unit have the Feel No Pain 6+ ability.'
        },
        {
          name: 'Veteran of the Kataphraktoi',
          points: 10,
          text: 'VEHICLE model only. Improve the Save characteristic of the bearer by 1.'
        }
      ],
      stratagems: [
        {
          id: 'solar-spearhead-flawless-construction',
          name: 'FLAWLESS CONSTRUCTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS CUSTODES VEHICLE unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, subtract 1 from the Wound roll for attacks that target your unit.',
          phaseTags: ['Shooting']
        },
        {
          id: 'solar-spearhead-emperors-vengeance',
          name: 'EMPEROR\'S VENGEANCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ADEPTUS CUSTODES WALKER or VEHICLE unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets the closest eligible target, you can re-roll the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'solar-spearhead-wrathful-advance',
          name: 'WRATHFUL ADVANCE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ADEPTUS CUSTODES WALKER or VEHICLE unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Advanced.',
          phaseTags: ['Movement', 'Shooting']
        },
        {
          id: 'solar-spearhead-unstoppable',
          name: 'UNSTOPPABLE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One ADEPTUS CUSTODES WALKER or VEHICLE unit from your army that has not declared a charge this phase.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
          phaseTags: ['Charge']
        },
        {
          id: 'solar-spearhead-relentless-persecution',
          name: 'RELENTLESS PERSECUTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTUS CUSTODES WALKER or VEHICLE unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a melee attack, if your unit made a Charge move this turn, add 1 to the Hit roll and add 1 to the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'solar-spearhead-punishment-inescapable',
          name: 'PUNISHMENT INESCAPABLE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One ADEPTUS CUSTODES WALKER or VEHICLE unit from your army that is within 9" of that enemy unit.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, it can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: ['Movement', 'Shooting']
        }
      ]
    },
    {
      slug: 'lions-of-the-emperor',
      name: 'Lions of the Emperor',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/',
      rules: [
        {
          name: 'Against All Odds',
          text: 'Each time an ADEPTUS CUSTODES unit from your army is selected to shoot or fight, if it is not within 6" of one or more friendly ADEPTUS CUSTODES units (excluding ANATHEMA PSYKANA units), until the end of the phase, improve the Strength and Armour Penetration characteristics of weapons equipped by models in that unit by 1.'
        }
      ],
      enhancements: [
        {
          name: 'Superior Creation',
          points: 25,
          text: 'ADEPTUS CUSTODES model only. The bearer has the Feel No Pain 5+ ability.'
        },
        {
          name: 'Praesidius',
          points: 25,
          text: 'SHIELD-CAPTAIN model only. While the bearer is leading a unit, each time a ranged attack targets that unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of the bearer, subtract 1 from the Wound roll.'
        },
        {
          name: 'Fierce Conqueror',
          points: 15,
          text: 'ADEPTUS CUSTODES model only. The bearer\'s unit is eligible to declare a charge in a turn in which it Advanced or Fell Back.'
        },
        {
          name: 'Admonimortis',
          points: 10,
          text: 'ADEPTUS CUSTODES model only. Improve the Damage characteristic of the bearer\'s melee weapons by 1.'
        }
      ],
      stratagems: [
        {
          id: 'lions-of-the-emperor-gilded-champion',
          name: 'GILDED CHAMPION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTUS CUSTODES CHARACTER unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, improve the Armour Penetration characteristic of melee weapons equipped by models in your unit by 1, and each time a model in your unit makes an attack that targets a CHARACTER unit, improve the Armour Penetration characteristic of that attack by 1 as well.',
          phaseTags: ['Fight']
        },
        {
          id: 'lions-of-the-emperor-defiant-to-the-last',
          name: 'DEFIANT TO THE LAST',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS CUSTODES unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, if your unit is not within 6" of one or more friendly ADEPTUS CUSTODES units (excluding ANATHEMA PSYKANA units), each time a model in your unit would lose a wound, roll one D6: on a 5+, that wound is not lost.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'lions-of-the-emperor-peerless-warrior',
          name: 'PEERLESS WARRIOR',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTUS CUSTODES unit from your army that is not within 6" of one or more friendly ADEPTUS CUSTODES units (excluding ANATHEMA PSYKANA units) and has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a melee attack that targets a MONSTER or VEHICLE unit, add 1 to the Hit roll and add 1 to the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'lions-of-the-emperor-unleash-the-lions',
          name: 'UNLEASH THE LIONS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One ADEPTUS CUSTODES unit from your army that is not within 6" of one or more friendly ADEPTUS CUSTODES units (excluding ANATHEMA PSYKANA units) and is within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Fall Back move of up to D6".',
          phaseTags: ['Fight']
        },
        {
          id: 'lions-of-the-emperor-manoeuvre-and-fire',
          name: 'MANOEUVRE AND FIRE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ADEPTUS CUSTODES unit from your army that is not within 6" of one or more friendly ADEPTUS CUSTODES units (excluding ANATHEMA PSYKANA units).',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Advanced or Fell Back.',
          phaseTags: ['Movement', 'Shooting']
        },
        {
          id: 'lions-of-the-emperor-swift-as-the-eagle',
          name: 'SWIFT AS THE EAGLE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One ADEPTUS CUSTODES INFANTRY unit from your army that is not within 6" of one or more friendly ADEPTUS CUSTODES units (excluding ANATHEMA PSYKANA units) and is within 9" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: 'You cannot select a unit that is within Engagement Range of one or more enemy units.',
          phaseTags: ['Movement']
        }
      ]
    }
  ];
})();
