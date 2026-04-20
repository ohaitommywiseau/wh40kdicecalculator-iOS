(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['adeptus-mechanicus'] = [
    {
      slug: 'rad-zone-corps',
      name: 'Rad-Zone Corps',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/',
      rules: [
        {
          name: 'Rad-bombardment',
          text: 'BATTLE ROUND 1\nBOMBARDMENT\nAt the start of the first battle round, for each enemy unit within your opponent\'s deployment zone, your opponent must decide whether that unit will take cover or stand firm. You then roll one D6 for each of those enemy units and apply the relevant result below:\n\n• Unit Standing Firm: On a 3+, that unit suffers D3 mortal wounds.\n• Unit Taking Cover: Until the end of the battle round, that unit is Battle-shocked and, on a 5+, that unit suffers D3 mortal wounds.\n\nBATTLE ROUND 2 ONWARDS\nFALLOUT\nAt the start of your Command phase during the second, third, fourth and fifth battle rounds, roll one D6 for each enemy unit within your opponent\'s deployment zone. On a 3+, that unit suffers 1 mortal wound and must take a Battle-shock test.'
        }
      ],
      enhancements: [
        {
          name: 'Radial Suffusion',
          points: 25,
          text: 'ADEPTUS MECHANICUS model only. From the second battle round onwards, when resolving the Fallout effect of the Rad-bombardment Detachment rule, if the bearer is on the battlefield, roll one D6 for each enemy unit within 6" of your opponent\'s deployment zone, in addition to those that are within your opponent\'s deployment zone.'
        },
        {
          name: 'Malphonic Susurrus',
          points: 20,
          text: 'ADEPTUS MECHANICUS model only. While the bearer is leading a unit, models in that unit have the Stealth ability.'
        },
        {
          name: 'Peerless Eradicator',
          points: 20,
          text: 'ADEPTUS MECHANICUS model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.'
        },
        {
          name: 'Autoclavic Denunciation',
          points: 15,
          text: 'ADEPTUS MECHANICUS model only. Ranged weapons equipped by the bearer have the [ANTI-INFANTRY 2+] and [ANTI-MONSTER 4+] abilities.'
        }
      ],
      stratagems: [
        {
          id: 'rad-zone-corps-baleful-halo',
          name: 'BALEFUL HALO',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS MECHANICUS unit from your army (excluding VEHICLE units) that was selected as the target of one or more of that enemy unit’s attacks. If that unit is BATTLELINE, you can also target one friendly SKITARII unit (excluding BATTLELINE units) within 6" of it.',
          effect: 'Until the end of the turn, each time an attack is made that targets your unit, subtract 1 from the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'rad-zone-corps-extinction-order',
          name: 'EXTINCTION ORDER',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One TECH-PRIEST model from your army and one objective marker within 24" of that model.',
          effect: 'Roll one D6 for each enemy unit within range of that objective marker. On a 4+, that unit suffers 1 mortal wound and it must take a Battle-shock test.',
          phaseTags: ['Command']
        },
        {
          id: 'rad-zone-corps-aggressor-imperative',
          name: 'AGGRESSOR IMPERATIVE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One SKITARII unit from your army that has not been selected to move this phase. If that unit is BATTLELINE, you can also target one friendly SKITARII unit (excluding BATTLELINE units) within 6" of it.',
          effect: 'Until the end of the phase, each time one of those units Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6" to the Move characteristic of models in that unit.',
          phaseTags: ['Movement']
        },
        {
          id: 'rad-zone-corps-pre-calibrated-purge-solution',
          name: 'PRE-CALIBRATED PURGE SOLUTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army that has not been selected to shoot this phase. If that unit is BATTLELINE, you can also target one friendly SKITARII unit (excluding BATTLELINE units) within 6" of it.',
          effect: 'Until the end of the phase, each time a model in one of those units makes a ranged attack, if the target of that attack is within your opponent’s deployment zone, you can re-roll the Hit roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'rad-zone-corps-lethal-dosage',
          name: 'LETHAL DOSAGE',
          cp: 1,
          type: 'Wargear',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [LETHAL HITS] ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'rad-zone-corps-bulwark-imperative',
          name: 'BULWARK IMPERATIVE',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One SKITARII unit from your army that was selected as the target of one or more of the attacking unit’s attacks. If that unit is BATTLELINE, you can also target one friendly SKITARII unit (excluding BATTLELINE units) within 6" of it.',
          effect: 'Until the end of the phase, models in those units from your army have a 4+ invulnerable save.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'skitarii-hunter-cohort',
      name: 'Skitarii Hunter Cohort',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/',
      rules: [
        {
          name: 'Stealth Optimisation',
          text: 'SKITARII INFANTRY, SKITARII MOUNTED and IRONSTRIDER BALLISTARII units from your army have the Stealth ability, and each time a ranged attack targets a SICARIAN unit from your army, unless the attacking model is within 12", the target has the Benefit of Cover against that attack.'
        }
      ],
      enhancements: [
        {
          name: 'Cantic Thrallnet',
          points: 25,
          text: 'SKITARII MARSHAL model only. At the start of the battle round, you can select one friendly SKITARII unit within 12" of the bearer. Until the start of the next battle round, the Protector Imperative and the Conqueror Imperative are both active for that unit.'
        },
        {
          name: 'Clandestine Infiltrator',
          points: 20,
          text: 'SKITARII model only. The bearer, and models in any unit they are leading, have the Infiltrators and Scouts 6" abilities.'
        },
        {
          name: 'Veiled Hunter',
          points: 10,
          text: 'SKITARII MARSHAL model only. After both players have deployed their armies, you can select up to three SKITARII INFANTRY units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.'
        },
        {
          name: 'Battle-sphere Uplink',
          points: 30,
          text: 'SKITARII model only. In your Shooting phase, after the bearer’s unit has shot, if it is not within Engagement Range of one or more enemy units, that unit can make a Normal move of up to 6". If it does, until the end of the turn, that unit is not eligible to declare a charge.'
        }
      ],
      stratagems: [
        {
          id: 'skitarii-hunter-cohort-bionic-endurance',
          name: 'BIONIC ENDURANCE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One SICARIAN, PTERAXII or SYDONIAN unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 5+ ability.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'skitarii-hunter-cohort-binharic-offence',
          name: 'BINHARIC OFFENCE',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'The start of your Shooting phase or the start of the Fight phase.',
          target: 'Two SKITARII units from your army that have not been selected to shoot or fight this phase, and one enemy unit.',
          effect: 'Until the end of the phase, improve the Armour Penetration characteristic of weapons equipped by models in both of your units by 1.',
          restrictions: 'Until the end of the phase, each time a model in either of your units makes an attack, it can only target that enemy unit (and only if it is an eligible target).',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'skitarii-hunter-cohort-expedited-purge-protocol',
          name: 'EXPEDITED PURGE PROTOCOL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One SKITARII unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
          phaseTags: ['Charge']
        },
        {
          id: 'skitarii-hunter-cohort-isolate-and-destroy',
          name: 'ISOLATE AND DESTROY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One SICARIAN, PTERAXII, SYDONIAN, IRONSTRIDER BALLISTARII or SKITARII MOUNTED unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, if there are no other enemy units within 6" of the unit targeted by that attack, add 1 to the Wound roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'skitarii-hunter-cohort-shroud-protocols',
          name: 'SHROUD PROTOCOLS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One SKITARII INFANTRY unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          phaseTags: ['Shooting']
        },
        {
          id: 'skitarii-hunter-cohort-programmed-withdrawal',
          name: 'PROGRAMMED WITHDRAWAL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent’s Fight phase.',
          target: 'Up to two SICARIAN units from your army, or one SKITARII INFANTRY or SKITARII MOUNTED unit from your army.',
          effect: 'Remove those units from the battlefield and place them into Strategic Reserves.',
          restrictions: 'Each unit targeted with this Stratagem must be more than 3" away from all enemy units.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'data-psalm-conclave',
      name: 'Data-Psalm Conclave',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/',
      rules: [
        {
          name: 'Benedictions Of The Omnissiah',
          text: 'At the start of the first battle round, select one of the following Benedictions of the Omnissiah to be active for CULT MECHANICUS units from your army until the end of the battle:\n\nPanegyric Procession\nEach time a CULT MECHANICUS model from your army makes a ranged attack that targets a unit within half range, improve the Armour Penetration characteristic of that attack by 1.\n\nCitation in Savagery\nEach time a CULT MECHANICUS unit from your army is selected to fight, if that unit made a Charge move this turn, until the end of the phase, add 1 to the Strength and Attacks characteristics of melee weapons equipped by models in that unit.'
        }
      ],
      enhancements: [
        {
          name: 'Mechanicus Locum',
          points: 10,
          text: 'TECH-PRIEST model only. The bearer has a Leadership characteristic of 6+ and, once per battle, at the start of any phase, you can select one friendly CULT MECHANICUS unit that is Battle-shocked and within 12" of the bearer. That unit is no longer Battle-shocked.'
        },
        {
          name: 'Mantle of the Gnosticarch',
          points: 15,
          text: 'TECH-PRIEST model only. Each time an attack is allocated to the bearer, change the Damage characteristic of that attack to 1.'
        },
        {
          name: 'Data-blessed Autosermon',
          points: 20,
          text: 'TECH-PRIEST model only. Once per battle, at the start of your Command phase, you can select the Benediction of the Omnissiah you did not select at the start of the first battle round. Until the start of your next Command phase, that Benediction of the Omnissiah is active for the bearer’s unit in addition to the one that is currently active for your army.'
        },
        {
          name: 'Temporcopia',
          points: 25,
          text: 'TECH-PRIEST model only. The bearer’s unit has the Fights First ability.'
        }
      ],
      stratagems: [
        {
          id: 'data-psalm-conclave-incantation-of-the-iron-soul',
          name: 'INCANTATION OF THE IRON SOUL',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Any phase, just after you allocate a mortal wound to a CULT MECHANICUS model from your army.',
          target: 'That CULT MECHANICUS model’s unit.',
          effect: 'Until the end of the phase, CULT MECHANICUS models in your unit have the Feel No Pain 4+ ability against mortal wounds.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'data-psalm-conclave-chant-of-the-remorseless-fist',
          name: 'CHANT OF THE REMORSELESS FIST',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One CULT MECHANICUS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a CULT MECHANICUS model in your unit makes a melee attack, add 1 to the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'data-psalm-conclave-verse-of-vengeance',
          name: 'VERSE OF VENGEANCE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One CULT MECHANICUS unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, each time a CULT MECHANICUS model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'data-psalm-conclave-tribute-of-emphatic-veneration',
          name: 'TRIBUTE OF EMPHATIC VENERATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Start of your Movement phase.',
          target: 'One CULT MECHANICUS unit from your army and one enemy unit within 18" of it.',
          effect: 'That enemy unit must take a Battle-shock test. If that test is failed, until the start of your next Command phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll.',
          phaseTags: ['Movement']
        },
        {
          id: 'data-psalm-conclave-litany-of-the-electromancer',
          name: 'LITANY OF THE ELECTROMANCER',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One CULT MECHANICUS unit from your army.',
          effect: 'Roll one D6 for each enemy unit within 6" of one or more CULT MECHANICUS models in your unit, adding 1 to the result if that model is an ELECTRO-PRIEST. On a 5+, that enemy unit suffers D3 mortal wounds.',
          phaseTags: ['Shooting']
        },
        {
          id: 'data-psalm-conclave-luminescent-blessing',
          name: 'LUMINESCENT BLESSING',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One CULT MECHANICUS unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
          effect: 'Until the end of the phase, CULT MECHANICUS models in your unit have a 4+ invulnerable save.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'explorator-maniple',
      name: 'Explorator Maniple',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/',
      rules: [
        {
          name: 'Acquisition At Any Cost',
          text: 'At the start of your Command phase, select one objective marker. Until the start of your next Command phase, that objective marker is your Acquisition objective marker. Each time an ADEPTUS MECHANICUS model from your army makes an attack, if that model’s unit is within range of your Acquisition objective marker, or if the target of that attack is within range of your Acquisition objective marker, re-roll a Wound roll of 1.'
        }
      ],
      enhancements: [
        {
          name: 'Magos',
          points: 15,
          text: 'TECH-PRIEST model only. At the end of your Command phase, if the bearer is within range of your Acquisition objective marker, roll one D6: on a 4+, you gain 1CP.'
        },
        {
          name: 'Genetor',
          points: 25,
          text: 'TECH-PRIEST model only. While the bearer is leading a unit that is within range of your Acquisition objective marker, models in that unit have a 4+ invulnerable save.'
        },
        {
          name: 'Logis',
          points: 20,
          text: 'TECH-PRIEST model only. While the bearer is leading a unit, each time a model in that unit makes an attack that targets a unit within range of your Acquisition objective marker, add 1 to the Hit roll.'
        },
        {
          name: 'Artisan',
          points: 15,
          text: 'TECH-PRIEST model only. While the bearer is leading a unit that is within range of your Acquisition objective marker, once per phase, you can change the result of one Hit roll, one Wound roll or one saving throw made for that unit to an unmodified 6.'
        }
      ],
      stratagems: [
        {
          id: 'explorator-maniple-cached-acquisition',
          name: 'CACHED ACQUISITION',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Any phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army that was just destroyed while it was within range of an objective marker you controlled. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'explorator-maniple-priority-reclamation',
          name: 'PRIORITY RECLAMATION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase, just before an ADEPTUS MECHANICUS unit from your army Consolidates.',
          target: 'That ADEPTUS MECHANICUS unit.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Consolidation move, it can move up to 6" instead of up to 3", provided your unit ends that Consolidation move within range of your Acquisition objective marker.',
          restrictions: 'You cannot target a unit with this Stratagem if it is within 3" of one or more enemy units.',
          phaseTags: ['Fight']
        },
        {
          id: 'explorator-maniple-infoslave-skull',
          name: 'INFOSLAVE SKULL',
          cp: 1,
          type: 'Wargear',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One TECH-PRIEST model from your army and one objective marker within 24" of that model (excluding your Acquisition objective marker).',
          effect: 'Until the start of your next Command phase, that objective marker is also considered to be one of your Acquisition objective markers for all rules purposes.',
          phaseTags: ['Command']
        },
        {
          id: 'explorator-maniple-auto-oracular-retrieval',
          name: 'AUTO-ORACULAR RETRIEVAL',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army that disembarked from a TRANSPORT this turn.',
          effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack that targets an enemy unit within range of your Acquisition objective marker, add 1 to the Wound roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'explorator-maniple-incense-exhausts',
          name: 'INCENSE EXHAUSTS',
          cp: 1,
          type: 'Wargear',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTUS MECHANICUS INFANTRY unit from your army that was selected as the target of one or more of the attacking unit’s attacks, and one friendly ADEPTUS MECHANICUS SMOKE unit within 6" of it.',
          effect: 'Until the end of the phase, both of those units have the Stealth ability and the Benefit of Cover.',
          phaseTags: ['Shooting']
        },
        {
          id: 'explorator-maniple-reactive-safeguard',
          name: 'REACTIVE SAFEGUARD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Charge phase, just after an enemy unit has declared a charge.',
          target: 'One ADEPTUS MECHANICUS INFANTRY unit from your army within range of your Acquisition objective marker that was selected as a target of that charge, and one friendly ADEPTUS MECHANICUS TRANSPORT.',
          effect: 'Your unit can embark within that TRANSPORT.',
          restrictions: 'Every model in your unit must be within 3" of that TRANSPORT and there must be sufficient transport capacity to embark the entire unit.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'cohort-cybernetica',
      name: 'Cohort Cybernetica',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/',
      rules: [
        {
          name: 'Cyber-Psalm Programming',
          text: 'Add 2" to the Move characteristic of models in LEGIO CYBERNETICA units from your army. In addition, unless that unit is Battle-shocked, add 1 to the Objective Control characteristic of models in that unit.'
        }
      ],
      enhancements: [
        {
          name: 'Necromechanic',
          points: 25,
          text: 'TECH-PRIEST model only. Once per battle round, when a saving throw made for a friendly LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE model within 12" of the bearer is failed, the bearer can use this Enhancement. If they do, change the Damage characteristic of that attack to 0.'
        },
        {
          name: 'Lord of Machines',
          points: 20,
          text: 'TECH-PRIEST model only. Once per turn, at the start of your opponent’s Shooting phase, select one enemy VEHICLE unit within 12" of and visible to the bearer. That unit must take a Leadership test: if that test is passed, until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll; if that test is failed, that unit is not eligible to shoot this phase.'
        },
        {
          name: 'Emotionless Clarity',
          points: 15,
          text: 'TECH-PRIEST model only. Once per turn, when a friendly LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE model with the Deadly Demise ability that is within 12" of the bearer is destroyed, the bearer can use this Enhancement. If it does, do not roll to determine whether any mortal wounds are inflicted as a result of that model’s Deadly Demise ability. Instead, mortal wounds are automatically inflicted.'
        },
        {
          name: 'Arch-negator',
          points: 10,
          text: 'TECH-PRIEST model only. Ranged weapons equipped by the bearer have the [ANTI-VEHICLE 4+] ability.'
        }
      ],
      stratagems: [
        {
          id: 'cohort-cybernetica-motive-imperative',
          name: 'MOTIVE IMPERATIVE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One ADEPTUS MECHANICUS VEHICLE unit from your army.',
          effect: 'Until the start of your next Command phase, add 3" to the Move characteristic of models in your unit and add 1 to Advance and Charge rolls made for it.',
          phaseTags: ['Command']
        },
        {
          id: 'cohort-cybernetica-auto-divinatory-targeting',
          name: 'AUTO-DIVINATORY TARGETING',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE unit from your army, and one objective marker.',
          effect: 'Until the start of your next Command phase, ranged weapons equipped by models in your unit have a Ballistic Skill characteristic of 3+ and the [IGNORES COVER] ability, but they can only target units within range of the selected objective marker.',
          phaseTags: ['Command']
        },
        {
          id: 'cohort-cybernetica-machine-spirit-resurgent',
          name: 'MACHINE SPIRIT RESURGENT',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE unit from your army that is below its Starting Strength.',
          effect: 'Until the start of your next Command phase, each time a model in your unit makes an attack, you can re-roll the Hit roll. If your unit is Below Half-strength, you can re-roll the Wound roll as well.',
          phaseTags: ['Command']
        },
        {
          id: 'cohort-cybernetica-machine-superiority',
          name: 'MACHINE SUPERIORITY',
          cp: 1,
          type: 'Epic Deed',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back and you can ignore any or all modifiers to its characteristics and/or to any roll or test made for it (excluding modifiers to saving throws).',
          phaseTags: ['Command', 'Shooting']
        },
        {
          id: 'cohort-cybernetica-transcendent-cogitation',
          name: 'TRANSCENDENT COGITATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE unit from your army.',
          effect: 'Until the start of your next Command phase, the Conqueror Imperative and Protector Imperative are both active for your unit.',
          phaseTags: ['Command']
        },
        {
          id: 'cohort-cybernetica-benevolence-of-the-omnissiah',
          name: 'BENEVOLENCE OF THE OMNISSIAH',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Command phase.',
          target: 'One LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE unit from your army.',
          effect: 'Until the start of your next Command phase, models in your unit have the Feel No Pain 6+ ability, which is improved to Feel No Pain 5+ against mortal wounds.',
          phaseTags: ['Command']
        }
      ]
    },
    {
      slug: 'eradication-cohort',
      name: 'Eradication Cohort',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/',
      rules: [
        {
          name: 'Murderous Imperative',
          text: 'Each time a model in a SKITARII unit from your army makes an attack:\n• If the Protector Imperative is active for that unit, re-roll a Hit roll of 1.\n• If the Conqueror Imperative is active for that unit, re-roll a Wound roll of 1.'
        }
      ],
      enhancements: [
        {
          name: 'Belicosa‑Class Capacitor Vanes',
          points: 30,
          text: 'SKITARII MARSHAL model only. The Conqueror Imperative and Protector Imperative are both active for the bearer’s unit.'
        },
        {
          name: 'Martial Signatum Amplificator',
          points: 15,
          text: 'TECH-PRIEST model only. Models in the bearer’s unit have the SKITARII keyword.'
        },
        {
          name: 'Omnicogitator',
          points: 25,
          text: 'ADEPTUS MECHANICUS model only. Add 6" to the Range characteristic of ranged weapons equipped by models in the bearer’s unit, and add 1 to the Strength characteristic of those weapons.'
        },
        {
          name: 'Omnissiah’s Fury',
          points: 10,
          text: 'SKITARII MARSHAL model only. Add 2 to the Attacks characteristic of melee weapons equipped by the bearer, and improve the Armour Penetration and Damage characteristics of those weapons by 1.'
        }
      ],
      stratagems: [
        {
          id: 'eradication-cohort-servo-driven-charge',
          name: 'SERVO‑DRIVEN CHARGE',
          cp: 1,
          type: 'Wargear',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'eradication-cohort-unrelenting-aggression',
          name: 'UNRELENTING AGGRESSION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an ADEPTUS MECHANICUS unit from your army Falls Back.',
          target: 'That ADEPTUS MECHANICUS unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back. If your unit has the SKITARII keyword, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back instead.',
          phaseTags: ['Movement', 'Shooting', 'Charge']
        },
        {
          id: 'eradication-cohort-unshackled-wrath',
          name: 'UNSHACKLED WRATH',
          cp: 1,
          type: 'Wargear',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One SKITARII unit from your army that has not been selected to shoot this phase.',
          effect: 'Select the [SUSTAINED HITS 1] or [LETHAL HITS] ability. Until the end of the phase, ranged weapons equipped by models in your unit have the selected ability. You can instead select the [SUSTAINED HITS 1], [LETHAL HITS] and [HAZARDOUS] abilities to apply to those weapons until the end of the phase.',
          phaseTags: ['Shooting']
        },
        {
          id: 'eradication-cohort-threat-cogitation-targeters',
          name: 'THREAT‑COGITATION TARGETERS',
          cp: 1,
          type: 'Wargear',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One SKITARII VEHICLE unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a ranged attack made by a model in your unit is allocated to a MONSTER or VEHICLE model, you can re-roll the Damage roll.',
          phaseTags: ['Shooting']
        },
        {
          id: 'eradication-cohort-precision-onslaught',
          name: 'PRECISION ONSLAUGHT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase, just after a SICARIAN unit from your army declares a charge.',
          target: 'That SICARIAN unit.',
          effect: 'Until the end of the phase, when your unit ends a Charge move, select one enemy unit within Engagement Range of it, then roll one D6 for each model in your unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound.',
          phaseTags: ['Charge']
        },
        {
          id: 'eradication-cohort-analytic-reprisals',
          name: 'ANALYTIC REPRISALS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Shooting phase, just after an enemy unit has shot.',
          target: 'One SKITARII INFANTRY unit from your army that lost one or more models as a result of the attacking unit’s attacks.',
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'haloscreed-battle-clade',
      name: 'Haloscreed Battle Clade',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adeptus-mechanicus/',
      rules: [
        {
          name: 'Noospheric Transference',
          text: 'In your Command phase, select one or more ADEPTUS MECHANICUS units from your army (including units that are embarked within TRANSPORTS). The maximum number of units you can select depends on the battle size, as follows:\nINCURSION: 1 UNIT\nSTRIKE FORCE: 2 UNITS\nONSLAUGHT: 3 UNITS\n\nUntil the start of your next Command phase, those units gain the HALO OVERRIDE keyword. Then, select one of the Override abilities below. Until the start of your next Command phase, units from your army with the HALO OVERRIDE keyword have the selected Override ability:\n\nElectromotive Energisation\nAdd 2" to the Move characteristic of models in this unit.\n\nMicroactuator Bracing\nAdd 1 to the Toughness characteristic of models in this unit.\n\nPredation Protocols\nThis unit is eligible to declare a charge in a turn in which it Advanced.\n\nMuted Servomotors\nModels in this unit have the Stealth ability.'
        }
      ],
      enhancements: [
        {
          name: 'Transoracular Dyad Wafers',
          points: 15,
          text: 'CYBERNETICA DATASMITH model only. When the bearer is attached to a KASTELAN ROBOTS unit, until the end of the battle, models in that unit gain the HALO OVERRIDE keyword. That unit cannot be selected when selecting units as part of the Noospheric Transference Detachment rule.'
        },
        {
          name: 'Cognitive Reinforcement',
          points: 35,
          text: 'ADEPTUS MECHANICUS model only (excluding CYBERNETICA DATASMITH models). The Conqueror Imperative and Protector Imperative are both active for the bearer’s unit.'
        },
        {
          name: 'Sanctified Ordnance',
          points: 10,
          text: 'ADEPTUS MECHANICUS model only. Add 6" to the range characteristic of ranged weapons equipped by models in the bearer’s unit and, each time a Hazardous test is taken for that unit, you can re-roll the result.'
        },
        {
          name: 'Inloaded Lethality',
          points: 15,
          text: 'TECH-PRIEST DOMINUS or TECH-PRIEST MANIPULUS model only. Add 3 to the Attacks characteristic of the bearer’s melee weapons and add 1 to the Damage characteristic of the bearer’s melee weapons.'
        }
      ],
      stratagems: [
        {
          id: 'haloscreed-battle-clade-eradication-protocols',
          name: 'ERADICATION PROTOCOLS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1, and, if it is a HALO OVERRIDE unit, re-roll a Hit roll of 1.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'haloscreed-battle-clade-targeting-override',
          name: 'TARGETING OVERRIDE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'haloscreed-battle-clade-neural-overload',
          name: 'NEURAL OVERLOAD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One ADEPTUS MECHANICUS unit from your army.',
          effect: 'If your unit is a HALO OVERRIDE unit, it suffers D3 mortal wounds. Select one Override ability. Until the start of your next Command phase, that ability is active for your unit.',
          restrictions: 'If the targeted unit already has the HALO OVERRIDE keyword, it can be affected by multiple Override abilities at the same time, but suffers mortal wounds to do so. Alternatively, if your unit does not have the HALO OVERRIDE keyword, it instead has the chosen Override ability until the start of your next Command phase, but does not benefit from any other Override abilities that are active.',
          phaseTags: ['Movement']
        },
        {
          id: 'haloscreed-battle-clade-aggressive-impulse',
          name: 'AGGRESSIVE IMPULSE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One SKORPIUS DUNERIDER model from your army that has not been selected to move this phase.',
          effect: 'Until the end of the turn, each time an ADEPTUS MECHANICUS unit disembarks from that model after it has made a Normal move, that unit is still eligible to declare a charge this turn.',
          phaseTags: ['Movement', 'Charge']
        },
        {
          id: 'haloscreed-battle-clade-guided-retreat',
          name: 'GUIDED RETREAT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an ADEPTUS MECHANICUS unit from your army makes a Fall Back move.',
          target: 'That ADEPTUS MECHANICUS unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back, and, if it is a HALO OVERRIDE unit, you can re-roll Desperate Escape tests taken for it.',
          phaseTags: ['Movement', 'Shooting', 'Charge']
        },
        {
          id: 'haloscreed-battle-clade-analytical-divination',
          name: 'ANALYTICAL DIVINATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent’s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One ADEPTUS MECHANICUS INFANTRY unit (excluding KATAPHRON units) from your army that is within 9" of that enemy unit and not within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to D6", or up to 6" instead if it is a HALO OVERRIDE unit.',
          phaseTags: ['Movement']
        }
      ]
    }
  ];
})();
