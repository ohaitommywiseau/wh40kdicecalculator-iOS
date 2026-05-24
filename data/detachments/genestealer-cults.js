(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['genestealer-cults'] = [
    {
      slug: 'host-of-ascension',
      name: 'Host of Ascension',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/genestealer-cults/',
      rules: [
        {
          name: 'A Perfect Ambush',
          text: 'The insidious broodkin of the cult lurk hidden within the shadows, tirelessly tracking their enemies as predatory beasts stalk their prey. Only when their position is perfect do they strike. Worming into the fight from hidden tunnels, ducts and sewers, they rise to engulf their victims in a hail of unexpected firepower and a flurry of stabbing blades and raking talons.\n\nEach time a GENESTEALER CULTS unit from your army is set up on the battlefield as Reinforcements, until the end of your next Fight phase, weapons equipped by models in that unit have the [SUSTAINED HITS 1] and [IGNORES COVER] abilities.'
        }
      ],
      enhancements: [
        {
          name: 'Prowling Agitant',
          points: 15,
          text: 'GENESTEALER CULTS model only. Once per turn, when an enemy unit ends a Normal, Advance or Fall Back move within 9" of the bearer\'s unit, if the bearer\'s unit is not within Engagement Range of any enemy units, it can make a Normal move of up to D6".'
        },
        {
          name: 'A Chink in Their Armour',
          points: 20,
          text: 'GENESTEALER CULTS model only. Each time the bearer is set up on the battlefield as Reinforcements, until the end of your next Fight phase, ranged weapons equipped by models in the bearer\'s unit have the [LETHAL HITS] ability.'
        },
        {
          name: 'Our Time Is Nigh',
          points: 20,
          text: 'GENESTEALER CULTS model only. Once per battle, when the bearer\'s unit declares a charge, the bearer can use this Enhancement. If it does, until the end of the phase, add 2 to Charge rolls made for the bearer\'s unit.'
        },
        {
          name: 'Assassination Edict',
          points: 15,
          text: 'GENESTEALER CULTS model only. Each time a model in the bearer\'s unit makes an attack that targets a CHARACTER unit, add 1 to the Hit roll.'
        }
      ],
      stratagems: [
        {
          id: 'host-of-ascension-coordinated-trap',
          name: 'COORDINATED TRAP',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'The start of your Shooting phase or the start of the Fight phase.',
          target: 'Two GENESTEALER CULTS units from your army that have not been selected to shoot or fight this phase.',
          effect: 'Select one enemy unit (if this Stratagem is used in the Fight phase, that enemy unit must be within Engagement Range of both of your units). Until the end of the phase, each time a model in either of your units makes an attack, it can only target that enemy unit (and only if it is an eligible target for that attack), and when resolving that attack, add 1 to the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'host-of-ascension-primed-and-readied',
          name: 'PRIMED AND READIED',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One GENESTEALER CULTS unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, a Critical Hit is scored on an unmodified Hit roll of 5+, instead of only a 6.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'host-of-ascension-tunnel-crawlers',
          name: 'TUNNEL CRAWLERS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase.',
          target: 'One GENESTEALER CULTS unit from your army that is arriving using the Deep Strike ability this phase.',
          effect: 'Your unit can be set up anywhere on the battlefield that is more than 6" horizontally away from all enemy units.',
          restrictions: 'A unit targeted by this Stratagem is not eligible to declare a charge in the same turn.',
          phaseTags: ['Movement']
        },
        {
          id: 'host-of-ascension-lying-in-wait',
          name: 'LYING IN WAIT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase.',
          target: 'One GENESTEALER CULTS BATTLELINE unit from your army in Cult Ambush.',
          effect: 'Until the end of the phase, when setting your unit up using a Cult Ambush marker, set your unit up anywhere on the battlefield wholly within 6" of that Cult Ambush marker and not within Engagement Range of one or more enemy units.',
          phaseTags: ['Movement']
        },
        {
          id: 'host-of-ascension-return-to-the-shadows',
          name: 'RETURN TO THE SHADOWS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One GENESTEALER CULTS INFANTRY unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        },
        {
          id: 'host-of-ascension-a-deadly-snare',
          name: 'A DEADLY SNARE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Charge phase, just after an enemy unit declares a charge.',
          target: 'One GENESTEALER CULTS INFANTRY unit from your army that was selected as a target of that charge.',
          effect: 'Roll one D6: on a 2-4, that enemy unit suffers D3 mortal wounds; on a 5+, that enemy unit suffers 3 mortal wounds.',
          phaseTags: ['Charge']
        }
      ]
    },
    {
      slug: 'xenocreed-congregation',
      name: 'Xenocreed Congregation',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/genestealer-cults/',
      rules: [
        {
          name: 'Unquestioning Fanaticism',
          text: 'Downtrodden by the oppressors for so long, a cult\'s lowly broodkin are fanatically devoted to their leaders, for those hallowed individuals serve the Patriarch\'s will more directly. The masses draw upon energy reserves in their desire to heed their masters\' wishes, surging selflessly into the fray, ready to hurl themselves in harm\'s way for the Patriarch\'s chosen.\n\nFor each ACOLYTE HYBRIDS, HYBRID METAMORPHS and NEOPHYTE HYBRIDS unit from your army, while one or more CHARACTER models are leading that unit, you can re-roll Advance and Charge rolls made for it. If that CHARACTER model is a MAGUS, PRIMUS or ACOLYTE ICONWARD, that model has the Feel No Pain 3+ ability while leading that unit.'
        }
      ],
      enhancements: [
        {
          name: "Gene-sire's Reliquant",
          points: 5,
          text: 'MAGUS, PRIMUS or ACOLYTE ICONWARD model only. You can re-roll Battle-shock tests taken for the bearer\'s unit.'
        },
        {
          name: 'Denunciator of Tyrants',
          points: 25,
          text: 'MAGUS, PRIMUS or ACOLYTE ICONWARD model only. Each time a model in the bearer\'s unit makes an attack that targets a CHARACTER unit, add 1 to the Hit roll and add 1 to the Wound roll.'
        },
        {
          name: 'Deeds That Speak to the Masses',
          points: 25,
          text: 'MAGUS, PRIMUS or ACOLYTE ICONWARD model only. You start the battle with 2 additional Resurgence points.'
        },
        {
          name: 'Incendiary Inspiration',
          points: 15,
          text: 'MAGUS, PRIMUS or ACOLYTE ICONWARD model only. The bearer\'s unit is eligible to declare a charge in a turn in which it Advanced.'
        }
      ],
      stratagems: [
        {
          id: 'xenocreed-congregation-vengeance-for-the-martyr',
          name: 'VENGEANCE FOR THE MARTYR!',
          cp: 1,
          type: 'Epic Deed',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit destroys a GENESTEALER CULTS CHARACTER model from your army.',
          target: 'One other GENESTEALER CULTS CHARACTER model from your army.',
          effect: 'Until the end of the battle, each time a friendly ACOLYTE HYBRIDS, HYBRID METAMORPHS or NEOPHYTE HYBRIDS model makes an attack that targets that enemy unit, re-roll a Hit roll of 1. If the destroyed model was a MAGUS, PRIMUS or ACOLYTE ICONWARD, you can re-roll the Hit roll instead.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'xenocreed-congregation-frenzied-devotion',
          name: 'FRENZIED DEVOTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ACOLYTE HYBRIDS, HYBRID METAMORPHS or NEOPHYTE HYBRIDS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, improve the Attacks and Weapon Skill characteristics of melee weapons equipped by models (excluding CHARACTERS) in your unit by 1 and those weapons have the [HAZARDOUS] ability.',
          phaseTags: ['Fight']
        },
        {
          id: 'xenocreed-congregation-tireless-fervour',
          name: 'TIRELESS FERVOUR',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One ACOLYTE HYBRIDS, HYBRID METAMORPHS or NEOPHYTE HYBRIDS unit from your army that has not declared a charge this phase.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced or Fell Back. When doing so, if it targets an enemy unit within Engagement Range of one or more friendly CHARACTER units, you can re-roll the Charge roll.',
          phaseTags: ['Charge']
        },
        {
          id: 'xenocreed-congregation-transcendent-celerity',
          name: 'TRANSCENDENT CELERITY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ACOLYTE HYBRIDS, HYBRID METAMORPHS or NEOPHYTE HYBRIDS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [ASSAULT] ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'xenocreed-congregation-the-downtrodden-rise',
          name: 'THE DOWNTRODDEN RISE',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of the Reinforcements step of your opponent\'s Movement phase.',
          target: 'One ACOLYTE HYBRIDS, HYBRID METAMORPHS or NEOPHYTE HYBRIDS unit from your army in Cult Ambush.',
          effect: 'Until the end of the phase, you can set up your unit on the battlefield without using a Cult Ambush marker. When doing so, set up your unit anywhere on the battlefield that is more than 6" horizontally away from all enemy units.',
          phaseTags: ['Movement']
        },
        {
          id: 'xenocreed-congregation-the-path-of-anguish',
          name: 'THE PATH OF ANGUISH',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One ACOLYTE HYBRIDS or NEOPHYTE HYBRIDS unit from your army that had one or more of its models destroyed as a result of the attacking unit\'s attacks.',
          effect: 'Your unit can make a move of up to D6", but it must end that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, models in your unit can be moved within Engagement Range of that enemy unit.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'biosanctic-broodsurge',
      name: 'Biosanctic Broodsurge',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/genestealer-cults/',
      rules: [
        {
          name: 'Hypermorphic Fury',
          text: 'Little can assuage a Genestealer Cult\'s least Human instincts, behaviours made even more ferocious under provocation. Stimulated by psionic pulses of the Broodmind or fuelled by alchemical concoctions delivered from alien grafts, impulses drive the blessed to acts of increased savagery.\n\nAdd 1 to Charge rolls made for ABERRANTS, BIOPHAGUS and PURESTRAIN GENESTEALERS units from your army. In addition, each time such a unit is selected to fight, if it made a Charge move this turn, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit.'
        }
      ],
      enhancements: [
        {
          name: 'Predatory Instincts',
          points: 20,
          text: 'ABOMINANT, BIOPHAGUS or PATRIARCH model only. Models in the bearer\'s unit have the Infiltrators ability and, once per battle round, you can target the bearer\'s unit with the Heroic Intervention Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.'
        },
        {
          name: 'Biomorph Adaptation',
          points: 25,
          text: 'ABOMINANT or PATRIARCH model only. Improve the Armour Penetration and Damage characteristics of melee weapons equipped by the bearer by 1.'
        },
        {
          name: 'Mutagenic Regeneration',
          points: 10,
          text: 'ABOMINANT, BIOPHAGUS or PATRIARCH model only. In each Command phase, one model in the bearer\'s unit regains 1 lost wound.'
        },
        {
          name: 'Alien Majesty',
          points: 15,
          text: 'ABOMINANT, BIOPHAGUS or PATRIARCH model only. While an enemy unit is within Engagement Range of the bearer\'s unit, subtract 1 from the Objective Control characteristic of models in that enemy unit (to a minimum of 1).'
        }
      ],
      stratagems: [
        {
          id: 'biosanctic-broodsurge-evasive-vanguard',
          name: 'EVASIVE VANGUARD',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase, just after an enemy unit ends a move within 9" of one or more of your Cult Ambush markers, before removing those markers from the battlefield.',
          target: 'Select one of those Cult Ambush markers.',
          effect: 'You can set up that Cult Ambush marker anywhere on the battlefield that is more than 9" horizontally away from all enemy units.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'biosanctic-broodsurge-saintly-paroxysm',
          name: 'SAINTLY PAROXYSM',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit destroys a GENESTEALER CULTS CHARACTER model from your army.',
          target: 'That destroyed CHARACTER model. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'Roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds. If that Character model is an ABOMINANT or PATRIARCH, that enemy unit suffers 2D3 mortal wounds instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'biosanctic-broodsurge-gene-twisted-muscle',
          name: 'GENE-TWISTED MUSCLE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ABERRANTS, BIOPHAGUS or PURESTRAIN GENESTEALERS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a MONSTER or VEHICLE, add 1 to the Wound roll.',
          phaseTags: ['Fight']
        },
        {
          id: 'biosanctic-broodsurge-hyper-metabolic-vigour',
          name: 'HYPER-METABOLIC VIGOUR',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One ABERRANTS, BIOPHAGUS or PURESTRAIN GENESTEALERS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3". In addition, it does not need to end that move closer to the closest enemy model, provided it ends it as close as possible to the closest enemy unit.',
          phaseTags: ['Fight']
        },
        {
          id: 'biosanctic-broodsurge-stimulated-bio-surge',
          name: 'STIMULATED BIO-SURGE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One ABERRANTS, BIOPHAGUS or PURESTRAIN GENESTEALERS unit from your army that has not declared a charge this phase.',
          effect: 'Until the end of the phase, each time your unit declares a charge, if the closest eligible enemy unit is selected as one of the targets of that charge, add 1 to the Charge roll for each selected target of that charge (including the closest eligible enemy unit), to a maximum of +3.',
          phaseTags: ['Charge']
        },
        {
          id: 'biosanctic-broodsurge-bio-horror-revelation',
          name: 'BIO-HORROR REVELATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Start of your opponent\'s Shooting phase.',
          target: 'One ABERRANTS, BIOPHAGUS or PURESTRAIN GENESTEALERS unit from your army.',
          effect: 'Until the end of the phase, each time an enemy unit within 9" of your unit is selected to shoot, it must take a Leadership test, subtracting 1 from the result. If that test is failed, until the end of the phase, each time a model in that enemy unit makes an attack that targets your unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'outlander-claw',
      name: 'Outlander Claw',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/genestealer-cults/',
      rules: [
        {
          name: 'Rapid Takeover',
          text: 'Whether forming loose clans of wandering nomads or militarised rapid-reaction corps, the cultists of Outlander Claws use their experience to launch assaults on prominent targets. Swiftly exploiting or rigging them with proximity charges, they can deny resources to the enemy without yoking themselves to a static defence.\n\nWhile a GENESTEALER CULTS MOUNTED or GENESTEALER CULTS VEHICLE model from your army is not Battle-shocked, add 1 to its Objective Control characteristic. In addition, at the end of your Command phase, if one or more ATALAN JACKALS units from your army are within range of an objective marker you control, that objective marker remains under your control until your opponent\'s Level of Control over that objective marker is greater than yours at the end of a phase.'
        }
      ],
      enhancements: [
        {
          name: 'Serpentine Tactics',
          points: 10,
          text: 'GENESTEALER CULTS MOUNTED model only. The bearer\'s unit is eligible to shoot in a turn in which it Fell Back.'
        },
        {
          name: 'Cartographic Data-leech',
          points: 10,
          text: 'GENESTEALER CULTS model only. While the bearer is embarked within a TRANSPORT, each time that TRANSPORT is selected to shoot, until the end of the phase, improve the Ballistic Skill characteristic of ranged weapons equipped by that TRANSPORT as a result of the Firing Deck ability by 1.'
        },
        {
          name: 'Starfall Shells',
          points: 10,
          text: 'GENESTEALER CULTS MOUNTED model only. In your Shooting phase, after the bearer has shot, select one enemy unit hit by one or more of those attacks made with a cult sniper rifle. Until the start of your next Shooting phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll.'
        },
        {
          name: 'Assault Commando',
          points: 15,
          text: 'GENESTEALER CULTS model only. Each time a model in the bearer\'s unit makes a ranged attack, if it disembarked from a TRANSPORT this turn, you can re-roll the Hit roll.'
        }
      ],
      stratagems: [
        {
          id: 'outlander-claw-along-shadowed-trails',
          name: 'ALONG SHADOWED TRAILS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase, just after an enemy unit ends a move within 9" of one or more of your Cult Ambush markers.',
          target: 'Select one of those Cult Ambush markers.',
          effect: 'You can set up that Cult Ambush marker anywhere on the battlefield that is more than 9" horizontally away from all enemy units.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'outlander-claw-devoted-crew',
          name: 'DEVOTED CREW',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One GOLIATH ROCKGRINDER or GOLIATH TRUCK unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Damage characteristic of that attack.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'outlander-claw-close-range-shoot-out',
          name: 'CLOSE-RANGE SHOOT-OUT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One GENESTEALER CULTS MOUNTED or GENESTEALER CULTS VEHICLE unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [LETHAL HITS] ability while targeting an enemy unit within 18".',
          phaseTags: ['Shooting']
        },
        {
          id: 'outlander-claw-rapid-feint',
          name: 'RAPID FEINT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
          target: 'One ACHILLES RIDGERUNNERS or ATALAN JACKALS unit from your army that is within 9" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        },
        {
          id: 'outlander-claw-deft-manoeuvring',
          name: 'DEFT MANOEUVRING',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has selected its targets.',
          target: 'One ACHILLES RIDGERUNNERS or ATALAN JACKALS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, models in your unit have a 4+ invulnerable save.',
          phaseTags: ['Shooting']
        },
        {
          id: 'outlander-claw-encircling-the-prey',
          name: 'ENCIRCLING THE PREY',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One GENESTEALER CULTS MOUNTED or GENESTEALER CULTS VEHICLE unit from your army that is not within Engagement Range of one or more enemy units and is wholly within 9" of one or more battlefield edges.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'brood-brother-auxilia',
      name: 'Brood Brother Auxilia',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/genestealer-cults/',
      rules: [
        {
          name: 'Integrated Tactics',
          text: 'Coordinating with their militant allies via stolen vox equipment or signalling with cult icons, the insidious broodkin engulfs the hated foe in overlapping fields of fire.\n\nEach time an ASTRA MILITARUM unit from your army is selected to shoot, you can select one enemy unit within 18" of and visible to that unit. If you do, until the end of the phase, models in that ASTRA MILITARUM unit can only target that enemy unit (and only if it is an eligible target) and that enemy unit is caught in overlapping fire. While an enemy unit is caught in overlapping fire, each time a GENESTEALER CULTS model from your army targets that enemy unit with a ranged attack, add 1 to the Hit roll.'
        },
        {
          name: 'BROOD BROTHERS',
          text: 'You can include ASTRA MILITARUM units in your army, even though they do not have the GENESTEALER CULTS Faction keyword. The combined points cost of such units you can include in your army is:\n\n* Incursion: Up to 500 pts\n* Strike Force: Up to 1000 pts\n* Onslaught: Up to 1500 pts\n\nA GENESTEALER CULTS model must be your WARLORD, and ASTRA MILITARUM models from your army lose the Voice of Command ability if they have it. You cannot include units with any of the following keywords in your army using this rule: AIRCRAFT; COMMISSAR; EPIC HERO; MILITARUM TEMPESTUS; OGRYN; RATLING; TECH-PRIEST ENGINSEER; MINISTORUM PRIEST.'
        }
      ],
      enhancements: [
        {
          name: 'Martial Espionage',
          points: 25,
          text: 'GENESTEALER CULTS INFANTRY model only. Once per turn, when a friendly ASTRA MILITARUM INFANTRY or ASTRA MILITARUM MOUNTED unit within 9" of the bearer is selected to shoot, the bearer can use this Enhancement. If it does, until the end of the phase, improve the Armour Penetration characteristic of ranged weapons equipped by models in that unit by 1.'
        },
        {
          name: 'Adaptive Reprisal',
          points: 15,
          text: 'GENESTEALER CULTS INFANTRY model only. Once per turn, you can target a friendly GENESTEALER CULTS unit within 9" of the bearer with the Heroic Intervention Stratagem for 0CP.'
        },
        {
          name: 'The Hero Returned',
          points: 20,
          text: 'GENESTEALER CULTS INFANTRY model only. Improve the Leadership and Objective Control characteristics of models in the bearer\'s unit by 1.'
        },
        {
          name: 'Firepoint Commander',
          points: 10,
          text: 'GENESTEALER CULTS INFANTRY model only. Each time you target the bearer\'s unit with the Fire Overwatch Stratagem, while resolving that Stratagem, hits are scored on unmodified Hit rolls of 5+.'
        }
      ],
      stratagems: [
        {
          id: 'brood-brother-auxilia-in-the-shadow-of-iron',
          name: 'IN THE SHADOW OF IRON',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase, just after an enemy unit ends a move within 9" of one or more of your Cult Ambush markers.',
          target: 'One ASTRA MILITARUM VEHICLE unit from your army.',
          effect: 'Select one of those Cult Ambush markers. You can set up that Cult Ambush marker anywhere on the battlefield that is more than 9" horizontally away from all enemy units and wholly within 6" of your unit.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'brood-brother-auxilia-regimental-reinforcements',
          name: 'REGIMENTAL REINFORCEMENTS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an ASTRA MILITARUM INFANTRY REGIMENT unit from your army (excluding ARTILLERY and CHARACTER units) is destroyed.',
          target: 'That INFANTRY unit. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'Roll one D6: on a 3+, place one Cult Ambush marker anywhere on the battlefield that is more than 9" horizontally away from all enemy units (if this is not possible, no marker is placed) and add a new unit to your army identical to your destroyed unit, in Cult Ambush, at its Starting Strength, with all of its wounds remaining and any [ONE SHOT] weapons those models are equipped with considered as not having been shot.',
          restrictions: 'You can only use this Stratagem once per battle.',
          usageLimit: 'perBattle',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'brood-brother-auxilia-suppress-and-overwhelm',
          name: 'SUPPRESS AND OVERWHELM',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase, just after an ASTRA MILITARUM unit from your army has shot.',
          target: 'That ASTRA MILITARUM unit.',
          effect: 'Select one enemy unit hit by one or more of those attacks. Until the end of the turn, that enemy unit cannot be targeted with the Fire Overwatch Stratagem and each time a GENESTEALER CULTS unit from your army selects that enemy unit as a target of a charge, you can re-roll the Charge roll.',
          phaseTags: ['Shooting', 'Charge']
        },
        {
          id: 'brood-brother-auxilia-acceptable-losses',
          name: 'ACCEPTABLE LOSSES',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ASTRA MILITARUM unit from your army.',
          effect: 'Select one enemy unit within Engagement Range of one or more GENESTEALER CULTS units from your army. Until the end of the phase, your unit can make ranged attacks that target that enemy unit. If it does, after it has resolved those attacks, roll one D6 for each of those GENESTEALER CULTS units: on a 5+, the unit being rolled for suffers D3+1 mortal wounds.',
          phaseTags: ['Shooting']
        },
        {
          id: 'brood-brother-auxilia-symbiotic-destruction',
          name: 'SYMBIOTIC DESTRUCTION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ASTRA MILITARUM and one GENESTEALER CULTS unit from your army that have not been selected to shoot this phase.',
          effect: 'Select one enemy unit that is visible to both of those selected units and within range of at least one ranged weapon from each of those units. Until the end of the phase, models in those units can only make attacks that target that enemy unit (and only if it is an eligible target). When doing so, each time such a model makes an attack, re-roll a Wound roll of 1.',
          phaseTags: ['Shooting']
        },
        {
          id: 'brood-brother-auxilia-a-dark-network',
          name: 'A DARK NETWORK',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Reinforcements step of your opponent\'s Movement phase, just after an enemy unit is set up on the battlefield from Reserves.',
          target: 'One ASTRA MILITARUM or GENESTEALER CULTS unit from your army (excluding MONSTERS and VEHICLES) within 12" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          phaseTags: ['Movement']
        }
      ]
    },
    {
      slug: 'final-day',
      name: 'Final Day',
      source: 'https://www.wahapedia.ru/wh40k10ed/factions/genestealer-cults/',
      rules: [
        {
          name: 'Psionic Parasitism',
          text: 'With each tug on the synaptic leash, the Hive Mind drains more of its hapless worshippers.\n\nAt the end of your Movement phase, for each TYRANIDS SYNAPSE unit from your army, you can select one friendly GENESTEALER CULTS unit (excluding PURESTRAIN GENESTEALER and PATRIARCH units) and one friendly TYRANIDS unit each within 9" of and visible to that SYNAPSE unit.\n\nIf you do, that GENESTEALER CULTS unit from your army suffers D3+1 mortal wounds and one model in the selected TYRANIDS unit regains up to that many lost wounds and until the start of your next Movement phase, each time a model in the selected TYRANIDS unit makes an attack, add 1 to the Hit roll.\n\nTYRANIDS units from your army have the following ability:\n\nCatalyst (Aura): While an enemy unit is within 6" of this unit, each time a friendly GENESTEALER CULTS unit makes an attack that targets that enemy unit, add 1 to the Hit roll.'
        },
        {
          name: 'The Star Children\'s Blessings',
          text: 'You can include TYRANIDS VANGUARD INVADER units (excluding AIRCRAFT, BROODLORD and GENESTEALERS units) in your army. The combined points cost of such units depends on your battle size:\n\n* Incursion: Up to 500 pts\n* Strike Force: Up to 1000 pts\n* Onslaught: Up to 1500 pts\n\nNo TYRANIDS models from your army can be your WARLORD.'
        }
      ],
      enhancements: [
        {
          name: 'Synaptic Auger',
          points: 15,
          text: 'TYRANIDS model only. Each time the bearer would regain one or more lost wounds from the Psionic Parasitism Detachment rule, it regains up to twice that number of lost wounds instead.'
        },
        {
          name: 'Enraptured Damnation',
          points: 10,
          text: 'GENESTEALER CULTS model only. Enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer\'s unit.'
        },
        {
          name: 'Vanguard Tyrant',
          points: 25,
          text: 'WINGED HIVE TYRANT model only. Improve the Strength and Armour Penetration characteristics of melee weapons equipped by the bearer by 1.'
        },
        {
          name: 'Inhuman Integration',
          points: 20,
          text: 'GENESTEALER CULTS model only. Weapons equipped by models in the bearer\'s unit have the [SUSTAINED HITS 1] ability while targeting an enemy unit within 6" of one or more friendly TYRANIDS units.'
        }
      ],
      stratagems: [
        {
          id: 'final-day-hyperferocity',
          name: 'HYPERFEROCITY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Fight phase.',
          target: 'One GENESTEALER CULTS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit, re-roll a Wound roll of 1. If one or more friendly TYRANIDS units are within 6" of that enemy unit, you can re-roll the Wound roll instead.',
          phaseTags: ['Fight']
        },
        {
          id: 'final-day-psi-surge',
          name: 'PSI SURGE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Start of any phase.',
          target: 'One TYRANIDS unit from your army.',
          effect: 'Until the start of your next Command phase, increase the range of your unit\'s Catalyst ability by 3".',
          restrictions: 'Each time you use this Stratagem, until the end of your next Command phase, you cannot use this Stratagem again.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'final-day-avenge-the-star-children',
          name: 'AVENGE THE STAR CHILDREN',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has shot or fought.',
          target: 'One TYRANIDS CHARACTER unit from your army that was destroyed by that enemy unit this phase. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'Until the end of the battle, each time a GENESTEALER CULTS model from your army makes an attack that targets that enemy unit, add 1 to the Hit roll and add 1 to the Wound roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'final-day-divine-imperative',
          name: 'DIVINE IMPERATIVE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Charge phase.',
          target: 'One GENESTEALER CULTS unit from your army that has not declared a charge this phase.',
          effect: 'Select one enemy unit within Engagement Range of one or more TYRANIDS units from your army. Until the end of the phase, each time your GENESTEALER CULTS unit declares a charge, if that enemy unit is one of the targets of that charge, add 1 to Charge rolls made for your unit and you can re-roll the Charge roll.',
          phaseTags: ['Charge']
        },
        {
          id: 'final-day-darting-attacks',
          name: 'DARTING ATTACKS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase or your Charge phase.',
          target: 'One TYRANIDS unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          phaseTags: ['Shooting', 'Charge']
        },
        {
          id: 'final-day-resistance-tunnels',
          name: 'RESISTANCE TUNNELS',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One GENESTEALER CULTS or TYRANIDS unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          phaseTags: ['Fight']
        }
      ]
    }
  ];
}());
