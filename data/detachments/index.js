window.WH40K_DETACHMENT_DATABASE = {
  source: {
    name: 'Wahapedia faction pages',
    verifiedAt: '2026-04-12'
  },
  byFaction: {
    'astra-militarum': [
      {
        slug: 'combined-arms',
        name: 'Combined Arms',
        source: 'https://wahapedia.ru/wh40k10ed/factions/astra-militarum/',
        rules: [
          {
            name: 'Born Soldiers',
            text: 'Each time an ASTRA MILITARUM unit from your army is selected to shoot, if that unit Remained Stationary this turn, ranged weapons equipped by models in that unit have the LETHAL HITS ability until the end of the phase.'
          }
        ],
        enhancements: [
          {
            name: 'Grand Strategist',
            points: 15,
            text: 'OFFICER model only. Add 1 to the number of Orders the bearer can issue each battle round.'
          },
          {
            name: 'Death Mask of Ollanius',
            points: 10,
            text: 'OFFICER model only. The bearer has the Feel No Pain 4+ ability against mortal wounds.'
          },
          {
            name: 'Drill Commander',
            points: 20,
            text: 'OFFICER model only. While the bearer is leading a unit, if that unit Remained Stationary this turn, improve the Ballistic Skill of ranged weapons equipped by models in that unit by 1.'
          },
          {
            name: 'Kurov’s Aquila',
            points: 15,
            text: 'OFFICER model only. While the bearer is on the battlefield, each time your opponent uses a Stratagem, roll one D6: on a 5+, you gain 1CP.'
          }
        ],
        stratagems: [
          {
            id: 'combined-arms-coordinated-action',
            name: 'Coordinated Action',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'any',
            when: 'Start of any phase.',
            target: 'One REGIMENT unit and one SQUADRON unit from your army within 6" of and visible to that REGIMENT unit.',
            effect: 'Until end of phase, Orders affecting one target also affect the other, and vice versa.',
            phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
          },
          {
            id: 'combined-arms-reinforcements',
            name: 'Reinforcements!',
            cp: 2,
            type: 'Strategic Ploy',
            timing: 'any',
            when: 'Any phase.',
            target: 'One INFANTRY REGIMENT unit from your army that was just destroyed.',
            effect: 'Add a new unit identical to the destroyed one to your army in Strategic Reserves at Starting Strength with full wounds remaining.',
            restrictions: 'Cannot return destroyed CHARACTER units to Attached units. Once per battle.',
            usageLimit: 'perBattle',
            phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
          },
          {
            id: 'combined-arms-flexible-command',
            name: 'Flexible Command',
            cp: 2,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Command phase.',
            target: 'Any number of ASTRA MILITARUM OFFICER units from your army.',
            effect: 'Until end of phase, your Officers can issue Orders to REGIMENT units and SQUADRON units.',
            phaseTags: ['Command']
          },
          {
            id: 'combined-arms-fields-of-fire',
            name: 'Fields of Fire',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One REGIMENT unit and one SQUADRON unit from your army that have not been selected to shoot this phase.',
            effect: 'Select one enemy unit. Until end of phase, attacks made by those selected units against that enemy improve Armour Penetration by 1.',
            phaseTags: ['Shooting']
          },
          {
            id: 'combined-arms-inspired-command',
            name: 'Inspired Command',
            cp: 1,
            type: 'Epic Deed',
            timing: 'opponent',
            when: 'Your opponent’s Command phase.',
            target: 'One ASTRA MILITARUM OFFICER unit from your army.',
            effect: 'That OFFICER can issue one Order as if it were your Command phase.',
            phaseTags: ['Command']
          },
          {
            id: 'combined-arms-stalwart-protector',
            name: 'Stalwart Protector',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'opponent',
            when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
            target: 'One ASTRA MILITARUM VEHICLE unit from your army.',
            effect: 'Until end of phase, INFANTRY models from your army screened by that VEHICLE gain Benefit of Cover against those attacks.',
            phaseTags: ['Shooting']
          }
        ]
      },
      {
        slug: 'siege-regiment',
        name: 'Siege Regiment',
        source: 'https://wahapedia.ru/wh40k10ed/factions/astra-militarum/',
        rules: [
          {
            name: 'Artillery Support',
            text: 'At the start of the battle round, choose one artillery support type for your army: Creeping Barrage lets your ranged weapons ignore Benefit of Cover against targets within 12" of objective markers; Smoke Strike gives enemy units hit by your ranged attacks -2 to Charge rolls against your units; Shatter Their Fortitude forces Battle-shock tests on enemy units hit by your ranged attacks that are Below Half-strength.'
          }
        ],
        enhancements: [
          {
            name: 'Siegebreaker',
            points: 10,
            text: 'OFFICER model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the IGNORES COVER ability.'
          },
          {
            name: 'Master of Ballistics',
            points: 15,
            text: 'OFFICER model only. In your Command phase, select one friendly ASTRA MILITARUM ARTILLERY unit within 12" of the bearer; until your next Command phase, improve the Ballistic Skill of ranged weapons equipped by models in that unit by 1.'
          },
          {
            name: 'Indomitable Resolve',
            points: 15,
            text: 'OFFICER model only. While the bearer is leading a unit, that unit can ignore any or all modifiers to its Leadership characteristic and to any Battle-shock or Leadership tests it takes.'
          },
          {
            name: 'Bombast-class Vox-array',
            points: 15,
            text: 'OFFICER model only. Each time the bearer issues an Order to an ARTILLERY unit, that unit can be anywhere on the battlefield if it is visible to one or more friendly ASTRA MILITARUM units.'
          }
        ],
        stratagems: [
          {
            id: 'siege-regiment-trench-fighters',
            name: 'Trench Fighters',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'any',
            when: 'Fight phase, just after an enemy unit has selected its targets.',
            target: 'One ASTRA MILITARUM INFANTRY unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
            effect: 'Until end of phase, destroyed models in your unit can fight on a 4+ before being removed. Add 2 to that roll for REGIMENT models.',
            phaseTags: ['Fight']
          },
          {
            id: 'siege-regiment-over-the-top',
            name: 'Over the Top',
            cp: 2,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Start of your Command phase.',
            target: 'One INFANTRY OFFICER model from your army.',
            effect: 'Until end of phase, when that model issues Move! Move! Move!, it can issue that Order to any number of eligible friendly INFANTRY REGIMENT units regardless of range.',
            phaseTags: ['Command']
          },
          {
            id: 'siege-regiment-flare-burst',
            name: 'Flare Burst',
            cp: 1,
            type: 'Wargear',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One ASTRA MILITARUM CHARACTER unit from your army that has not been selected to shoot this phase.',
            effect: 'Until end of phase, attacks made by your unit against visible enemy units within 12" can re-roll the Hit roll.',
            phaseTags: ['Shooting']
          },
          {
            id: 'siege-regiment-callous-sacrifice',
            name: 'Callous Sacrifice',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One PLATOON unit from your army that is within Engagement Range of one or more enemy units.',
            effect: 'Until end of phase, enemy units are not considered within Engagement Range of your unit for ranged targeting. Each time an enemy model within Engagement Range loses a wound, one of your models is destroyed on a 4+ after those attacks are resolved.',
            phaseTags: ['Shooting']
          },
          {
            id: 'siege-regiment-furious-fusillade',
            name: 'Furious Fusillade',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One PLATOON unit from your army that has not been selected to shoot this phase.',
            effect: 'Until end of phase, add 1 to the Attacks characteristic of ranged weapons equipped by models in your unit while targeting an enemy unit within half range.',
            phaseTags: ['Shooting']
          },
          {
            id: 'siege-regiment-minefield',
            name: 'Minefield',
            cp: 1,
            type: 'Wargear',
            timing: 'opponent',
            when: 'Start of your opponent’s Charge phase.',
            target: 'One PLATOON unit from your army.',
            effect: 'Until end of phase, each enemy unit that ends a Charge move within Engagement Range of your unit suffers mortal wounds on 5+ per model in that unit, to a maximum of 6 mortal wounds.',
            phaseTags: ['Charge']
          }
        ]
      },
      {
        slug: 'mechanised-assault',
        name: 'Mechanised Assault',
        source: 'https://wahapedia.ru/wh40k10ed/factions/astra-militarum/',
        rules: [
          {
            name: 'Armoured Fist',
            text: 'Each time an ASTRA MILITARUM model from your army makes a ranged attack in a turn in which it disembarked from a TRANSPORT, add 1 to the Wound roll.'
          }
        ],
        enhancements: [
          {
            name: 'Bold Leadership',
            points: 25,
            text: 'INFANTRY OFFICER model only. If you control an objective marker at the end of your Command phase, and the bearer’s unit or any TRANSPORT it is embarked within is within range of it, that objective remains under your control until your opponent controls it.'
          },
          {
            name: 'Mechanised Commander',
            points: 15,
            text: 'OFFICER model only. The bearer’s unit can disembark from a TRANSPORT after that TRANSPORT Advances.'
          },
          {
            name: 'Mounted Strategist',
            points: 10,
            text: 'OFFICER model only. While the bearer is embarked within a TRANSPORT, it can still issue Orders as if it were on the battlefield.'
          },
          {
            name: 'Steel Frontier',
            points: 20,
            text: 'OFFICER model only. While the bearer is leading a unit, models in that unit have a 5+ invulnerable save while they are embarked within a TRANSPORT.'
          }
        ],
        stratagems: [
          {
            id: 'mechanised-assault-vox-relay',
            name: 'Vox-relay',
            cp: 1,
            type: 'Wargear',
            timing: 'your',
            when: 'Your Command phase.',
            target: 'One INFANTRY OFFICER unit from your army embarked within a TRANSPORT.',
            effect: 'Until end of phase, your unit can issue Orders while embarked and can issue Orders to ASTRA MILITARUM TRANSPORT units regardless of the distance to and from that TRANSPORT.',
            phaseTags: ['Command']
          },
          {
            id: 'mechanised-assault-rapid-dispersal',
            name: 'Rapid Dispersal',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Movement phase.',
            target: 'One ASTRA MILITARUM INFANTRY unit from your army that disembarked from a TRANSPORT this phase.',
            effect: 'Your INFANTRY unit can make a Normal move of up to D6".',
            phaseTags: ['Movement']
          },
          {
            id: 'mechanised-assault-clear-and-secure',
            name: 'Clear and Secure',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One ASTRA MILITARUM unit from your army that disembarked from a TRANSPORT this turn and has not been selected to shoot this phase.',
            effect: 'Until end of phase, attacks made by your unit against targets within range of an objective marker can re-roll the Hit roll and the Wound roll.',
            phaseTags: ['Shooting']
          },
          {
            id: 'mechanised-assault-swift-interception',
            name: 'Swift Interception',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'opponent',
            when: 'Your opponent’s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
            target: 'One TRANSPORT unit from your army, excluding AIRCRAFT and TITANIC units, that is within 9" of that enemy unit and not within Engagement Range.',
            effect: 'Your TRANSPORT can make a Normal move of up to 6".',
            phaseTags: ['Movement']
          },
          {
            id: 'mechanised-assault-hasty-extraction',
            name: 'Hasty Extraction',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'opponent',
            when: 'Your opponent’s Charge phase, after an enemy unit has selected targets for its charge but before it makes a Charge move.',
            target: 'One ASTRA MILITARUM INFANTRY unit from your army that was selected as a target of that charge.',
            effect: 'If your unit is not within Engagement Range and every model is within 3" of an ASTRA MILITARUM TRANSPORT from your army, it can embark within that TRANSPORT.',
            phaseTags: ['Charge']
          },
          {
            id: 'mechanised-assault-move-out',
            name: 'Move Out',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'opponent',
            when: 'End of your opponent’s turn.',
            target: 'One ASTRA MILITARUM unit from your army.',
            effect: 'If your unit is not within Engagement Range and every model is within 3" of an ASTRA MILITARUM TRANSPORT from your army, it can embark within that TRANSPORT.',
            phaseTags: ['End']
          }
        ]
      },
      {
        slug: 'hammer-of-the-emperor',
        name: 'Hammer of the Emperor',
        source: 'https://wahapedia.ru/wh40k10ed/factions/astra-militarum/',
        rules: [
          {
            name: 'Iron Tread',
            text: 'Each time a SQUADRON unit from your army Advances, do not make an Advance roll; instead add 6" to its Move characteristic until the end of the phase, and it can move within Engagement Range during that Advance move so long as it does not end there.'
          }
        ],
        enhancements: [
          {
            name: 'Calm Under Fire',
            points: 15,
            text: 'VEHICLE OFFICER model only. Once per turn, after the bearer issues an Order to a SQUADRON unit, it can issue the same Order to another SQUADRON unit.'
          },
          {
            name: 'Indomitable Steed',
            points: 15,
            text: 'VEHICLE OFFICER model only. The bearer has the Feel No Pain 6+ ability.'
          },
          {
            name: 'Regimental Banner',
            points: 20,
            text: 'VEHICLE OFFICER model only. Add 3 to the bearer’s Objective Control characteristic.'
          },
          {
            name: 'Veteran Crew',
            points: 20,
            text: 'VEHICLE OFFICER model only. Each time a model in the bearer’s unit makes a ranged attack, re-roll a Hit roll of 1.'
          }
        ],
        stratagems: [
          {
            id: 'hammer-of-the-emperor-final-hour',
            name: 'Final Hour',
            cp: 1,
            type: 'Epic Deed',
            timing: 'your',
            when: 'Your Command phase.',
            target: 'One SQUADRON unit from your army that is Below Half-strength, excluding OFFICER units.',
            effect: 'Until end of the battle round, your unit’s ranged weapons, excluding ONE SHOT weapons, gain Hazardous and can ignore modifiers to Ballistic Skill and Hit rolls.',
            phaseTags: ['Command']
          },
          {
            id: 'hammer-of-the-emperor-blazing-advance',
            name: 'Blazing Advance',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Movement phase, just after a SQUADRON unit from your army Advances.',
            target: 'That SQUADRON unit.',
            effect: 'Until end of turn, your unit is eligible to shoot in a turn in which it Advanced.',
            phaseTags: ['Movement']
          },
          {
            id: 'hammer-of-the-emperor-tactical-withdrawal',
            name: 'Tactical Withdrawal',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Movement phase, just after a SQUADRON unit from your army Falls Back.',
            target: 'That SQUADRON unit.',
            effect: 'Until end of turn, your unit is eligible to shoot in a turn in which it Fell Back.',
            phaseTags: ['Movement']
          },
          {
            id: 'hammer-of-the-emperor-crash-through',
            name: 'Crash Through',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Movement phase or your Charge phase.',
            target: 'One ASTRA MILITARUM VEHICLE unit from your army that has not been selected to move or charge this phase.',
            effect: 'Until end of phase, your unit can move horizontally through terrain features as if they were not there when making Normal, Advance or Charge moves.',
            phaseTags: ['Movement', 'Charge']
          },
          {
            id: 'hammer-of-the-emperor-furious-cannonade',
            name: 'Furious Cannonade',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One SQUADRON unit from your army that has not been selected to shoot this phase.',
            effect: 'Until end of phase, attacks made by models in your unit against targets within 12" improve Armour Penetration by 1.',
            phaseTags: ['Shooting']
          },
          {
            id: 'hammer-of-the-emperor-ablative-plating',
            name: 'Ablative Plating',
            cp: 2,
            type: 'Wargear',
            timing: 'opponent',
            when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
            target: 'One ASTRA MILITARUM VEHICLE unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
            effect: 'Until end of phase, subtract 1 from the Damage characteristic of attacks allocated to your unit.',
            phaseTags: ['Shooting']
          },
          {
            id: 'hammer-of-the-emperor-scouting-outriders',
            name: 'Scouting Outriders',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'opponent',
            when: 'End of your opponent’s turn.',
            target: 'One ASTRA MILITARUM MOUNTED or ASTRA MILITARUM WALKER unit from your army that is wholly within 10" of one or more battlefield edges and not within Engagement Range.',
            effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
            phaseTags: ['End']
          }
        ]
      },
      {
        slug: 'recon-element',
        name: 'Recon Element',
        source: 'https://wahapedia.ru/wh40k10ed/factions/astra-militarum/',
        rules: [
          {
            name: 'Masters of Camouflage',
            text: 'Ranged attacks can only target ASTRA MILITARUM units from your army if the attacker is within 18", unless your unit is an AIRCRAFT, an ARTILLERY unit, or the closest eligible target. If your unit has the SCOUTS ability, it can be targeted regardless.'
          }
        ],
        enhancements: [
          {
            name: 'Master Infiltrator',
            points: 15,
            text: 'INFANTRY OFFICER model only. The bearer’s unit has the INFILTRATORS ability.'
          },
          {
            name: 'One Man Army',
            points: 20,
            text: 'SLY MARBO model only. Add 1 to the Attacks characteristic of the bearer’s melee weapons and it can use Heroic Intervention for 0CP once per turn.'
          },
          {
            name: 'Ghost',
            points: 15,
            text: 'OFFICER model only. While the bearer is leading a unit, that unit has the STEALTH ability.'
          },
          {
            name: 'Cameleoline Cloak',
            points: 10,
            text: 'OFFICER model only. The bearer has the Lone Operative ability while it is within 3" of one or more friendly ASTRA MILITARUM INFANTRY units.'
          }
        ],
        stratagems: [
          {
            id: 'recon-element-crack-shots',
            name: 'Crack Shots',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One PLATOON unit from your army that has not been selected to shoot this phase.',
            effect: 'Until end of phase, ranged weapons equipped by models in your unit have Precision.',
            phaseTags: ['Shooting']
          },
          {
            id: 'recon-element-draw-them-out',
            name: 'Draw Them Out',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'opponent',
            when: 'Your opponent’s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.',
            target: 'One PLATOON unit from your army that is within 9" of that enemy unit, and is not within Engagement Range of one or more enemy units.',
            effect: 'Your unit can make a Normal move of up to 6".',
            phaseTags: ['Movement']
          },
          {
            id: 'recon-element-scramble-field',
            name: 'Scramble Field',
            cp: 1,
            type: 'Wargear',
            timing: 'opponent',
            when: 'Start of your opponent’s Reinforcements step.',
            target: 'One ASTRA MILITARUM INFANTRY unit from your army.',
            effect: 'Until end of phase, enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12" of your unit.',
            phaseTags: ['Movement']
          },
          {
            id: 'recon-element-courageous-diversion',
            name: 'Courageous Diversion',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'opponent',
            when: 'Your opponent’s Charge phase, just after an enemy unit has selected targets for its charge.',
            target: 'One ASTRA MILITARUM MOUNTED unit from your army that was selected as one of those targets.',
            effect: 'Your unit can make a Normal move of up to 6".',
            restrictions: 'When doing so, it must end that move as close as possible to the charging unit and can end within Engagement Range of that enemy unit.',
            phaseTags: ['Charge']
          },
          {
            id: 'recon-element-tanglefoot',
            name: 'Tanglefoot',
            cp: 1,
            type: 'Wargear',
            timing: 'opponent',
            when: 'Your opponent’s Charge phase, just after an enemy unit has selected targets for its charge.',
            target: 'One ASTRA MILITARUM INFANTRY unit from your army that was selected as one of those targets.',
            effect: 'Subtract 2 from Charge rolls made for that enemy unit this phase.',
            phaseTags: ['Charge']
          }
        ]
      },
      {
        slug: 'bridgehead-strike',
        name: 'Bridgehead Strike',
        source: 'https://wahapedia.ru/wh40k10ed/factions/astra-militarum/',
        rules: [
          {
            name: 'Only the Best',
            text: 'MILITARUM TEMPESTUS units from your army gain the BATTLELINE keyword.'
          },
          {
            name: 'Fire Zone Purge',
            text: 'In your Shooting phase, after an enemy unit loses one or more wounds from your MILITARUM TEMPESTUS unit’s ranged attacks, until end of phase your other MILITARUM TEMPESTUS units improve the AP of attacks against that enemy by 1.'
          },
          {
            name: 'Keywords',
            text: 'TEMPESTUS SCIONS Command Squads, Tempestor Primes, Tempestus Aquilons, Taurox Prime and Tempestus Scions are part of this detachment package.'
          }
        ],
        enhancements: [
          {
            name: 'Bomb Drop Cache',
            points: 10,
            text: 'MILITARUM TEMPESTUS model only. Once per battle, after the bearer’s unit is set up from Deep Strike, pick one enemy unit within 6" and roll six D6; for each 4+, that enemy suffers 1 mortal wound.'
          },
          {
            name: 'Relic of Lost Cadia',
            points: 15,
            text: 'MILITARUM TEMPESTUS OFFICER model only. While the bearer is leading a unit, add 1 to the Objective Control characteristic of models in that unit and improve the Leadership characteristic of that unit by 1.'
          },
          {
            name: 'Master Vox Operative',
            points: 15,
            text: 'MILITARUM TEMPESTUS OFFICER model only. Each time the bearer issues an Order, units can be selected anywhere on the battlefield if they have a vox-caster or are within 6" of a friendly vox-caster unit.'
          },
          {
            name: 'Precision Drop Planner',
            points: 20,
            text: 'MILITARUM TEMPESTUS OFFICER model only. The bearer’s unit can re-roll Charge rolls made in a turn in which it was set up on the battlefield from Reserves.'
          }
        ],
        stratagems: [
          {
            id: 'bridgehead-strike-bellicosa-drop',
            name: 'Bellicosa Drop',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'The Reinforcements step of your Movement phase.',
            target: 'One ASTRA MILITARUM INFANTRY unit from your army that is in Reserves and has the Deep Strike ability.',
            effect: 'Until end of phase, when your unit is set up using Deep Strike it can be set up anywhere on the battlefield more than 6" horizontally away from all enemy units.',
            restrictions: 'Until the end of the turn, your unit is not eligible to declare a charge.',
            phaseTags: ['Movement']
          },
          {
            id: 'bridgehead-strike-firing-hot',
            name: 'Firing Hot',
            cp: 2,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One MILITARUM TEMPESTUS or KASRKIN unit from your army that has not been selected to shoot this phase.',
            effect: 'Until end of phase, hot-shot lascarbines, hot-shot lasguns, hot-shot laspistols, hot-shot marksman rifles, hot-shot volley guns and sentry hot-shot volley guns improve Strength and Armour Penetration by 1 against targets within 12".',
            phaseTags: ['Shooting']
          },
          {
            id: 'bridgehead-strike-fire-and-relocate',
            name: 'Fire and Relocate',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One ASTRA MILITARUM unit, excluding TITANIC units, from your army.',
            effect: 'Until end of phase, your unit is eligible to shoot in a turn in which it Advanced.',
            phaseTags: ['Shooting']
          },
          {
            id: 'bridgehead-strike-servo-designators',
            name: 'Servo-designators',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Shooting phase, just after an ASTRA MILITARUM INFANTRY unit from your army has shot.',
            target: 'That ASTRA MILITARUM INFANTRY unit.',
            effect: 'Select one visible enemy unit hit by one or more of those attacks. Until end of phase, that enemy unit cannot have the Benefit of Cover.',
            phaseTags: ['Shooting']
          },
          {
            id: 'bridgehead-strike-aerial-extraction',
            name: 'Aerial Extraction',
            cp: 1,
            type: 'Epic Deed',
            timing: 'opponent',
            when: 'End of your opponent’s Fight phase.',
            target: 'One ASTRA MILITARUM unit from your army that is not within Engagement Range if all of its models have the Deep Strike ability, or one VALKYRIE unit from your army that is not within Engagement Range.',
            effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
            phaseTags: ['Fight', 'End']
          },
          {
            id: 'bridgehead-strike-on-my-position',
            name: 'On My Position',
            cp: 1,
            type: 'Epic Deed',
            timing: 'opponent',
            when: 'End of your opponent’s Fight phase.',
            target: 'One REGIMENT INFANTRY unit from your army that is within Engagement Range of one or more enemy units.',
            effect: 'Roll one D6 for each enemy unit within Engagement Range of your unit; on a 2+ that enemy unit suffers D6 mortal wounds. Then your unit suffers 3D3 mortal wounds.',
            phaseTags: ['Fight', 'End']
          }
        ]
      },
      {
        slug: 'grizzled-company',
        name: 'Grizzled Company',
        source: 'https://wahapedia.ru/wh40k10ed/factions/astra-militarum/',
        rules: [
          {
            name: 'Ruthless Discipline',
            text: 'Add 1 to the number of Orders each ASTRA MILITARUM OFFICER model from your army can issue. While an ASTRA MILITARUM unit from your army is affected by an Order, each time a model in that unit makes an attack, re-roll a Hit roll of 1.'
          }
        ],
        enhancements: [
          {
            name: 'Abhuman Detail',
            points: 20,
            text: 'COMMISSAR model only. Add the OGRYN keyword to the list of units this model can issue Orders to, and in Declare Battle Formations the bearer can attach to Ogryn Squad or Bullgryn Squad units.'
          },
          {
            name: 'Aquilan Eye',
            points: 20,
            text: 'ASTRA MILITARUM OFFICER model only. The bearer can issue the Target Weak Spot Order: improve AP by 1 for ranged attacks made by the ordered unit against enemies within 12".'
          },
          {
            name: 'Spec Ops Veteran',
            points: 15,
            text: 'ASTRA MILITARUM INFANTRY OFFICER model only. The bearer can issue the Move to the Shadows Order: until ranged attacks are resolved, models in the ordered unit have the Stealth ability.'
          },
          {
            name: 'Laud Hailer',
            points: 10,
            text: 'ASTRA MILITARUM OFFICER model only. Units selected for this bearer’s Orders can be within 12" instead of 6".'
          }
        ],
        stratagems: [
          {
            id: 'grizzled-company-snap-to-it',
            name: 'Snap to It',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'any',
            when: 'Start of any phase.',
            target: 'One ASTRA MILITARUM OFFICER unit from your army.',
            effect: 'Your unit’s OFFICER model can issue 1 Order as if it were your Command phase.',
            phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
          },
          {
            id: 'grizzled-company-no-retreat',
            name: 'No Retreat!',
            cp: 1,
            type: 'Strategic Ploy',
            timing: 'your',
            when: 'Your Command phase.',
            target: 'One ASTRA MILITARUM unit from your army affected by the Duty and Honour! Order.',
            effect: 'If your unit is within range of an objective marker you control, that objective remains under your control until your opponent controls it at the start or end of a phase.',
            phaseTags: ['Command']
          },
          {
            id: 'grizzled-company-veteran-sharpshooters',
            name: 'Veteran Sharpshooters',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One ASTRA MILITARUM unit from your army that has not been selected to shoot this phase.',
            effect: 'Until end of phase, ranged weapons equipped by models in your unit have Ignores Cover.',
            phaseTags: ['Shooting']
          },
          {
            id: 'grizzled-company-purging-fire',
            name: 'Purging Fire',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One ASTRA MILITARUM unit from your army affected by an Order that has not been selected to shoot this phase.',
            effect: 'If your unit is within range of an objective marker, its ranged weapons gain Lethal Hits until end of phase.',
            phaseTags: ['Shooting']
          },
          {
            id: 'grizzled-company-mordian-minute',
            name: 'Mordian Minute',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'your',
            when: 'Your Shooting phase.',
            target: 'One ASTRA MILITARUM INFANTRY unit from your army affected by the First Rank, Fire! Second Rank, Fire! Order.',
            effect: 'Until end of phase, each time a model in your unit makes an attack, improve the Strength characteristic of that attack by 1.',
            phaseTags: ['Shooting']
          },
          {
            id: 'grizzled-company-additional-armour',
            name: 'Additional Armour',
            cp: 1,
            type: 'Battle Tactic',
            timing: 'opponent',
            when: 'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',
            target: 'One ASTRA MILITARUM unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',
            effect: 'Until the attacking unit has finished making its attacks, worsen the Armour Penetration characteristic of those attacks by 1.',
            phaseTags: ['Shooting']
          }
        ]
      }
    ]
  }
};
