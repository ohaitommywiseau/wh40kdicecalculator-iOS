(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['tyranids'] = [
    {
      slug: "invasion-fleet",
      name: "Invasion Fleet",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Hyper-adaptations",
          text: "Every warrior organism in the Tyranid race is fashioned by the ineffable alien will of the Hive Mind. Their flesh and chitin is endlessly mutable, honed into whatever form will prove most lethal to the prey.\n\nAt the start of the first battle round, select one of the following Hyper-adaptations to be active for TYRANIDS units from your army until the end of the battle:\n\nSwarming Instincts\n\nEach time a TYRANIDS model with this Hyper-adaptation makes an attack that targets an INFANTRY or SWARM unit, that attack has the [SUSTAINED HITS 1] ability.\n\nHyper-aggression\n\nEach time a TYRANIDS model with this Hyper-adaptation makes an attack that targets a MONSTER or VEHICLE unit, that attack has the [LETHAL HITS] ability.\n\nHive Predators\n\nEach time a TYRANIDS model with this Hyper-adaptation makes an attack that targets a CHARACTER unit, on a Critical Hit, that attack has the [PRECISION] ability."
        }
      ],
      enhancements: [
        {
          name: "Alien Cunning",
          points: 30,
          text: "This leader-beast possesses highly sophisticated neural pathways, allowing it to identify priority strategic assets and adapt the disposition of its warriors to seize them before the foe even recognise their value.\n\nTYRANIDS model only. After both players have deployed their armies, select up to three TYRANIDS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves."
        },
        {
          name: "Perfectly Adapted",
          points: 15,
          text: "This creature was created for one purpose: to completely eradicate the defenders of the target prey world.\n\nTYRANIDS model only. Once per turn, you can re-roll one Hit roll, one Wound roll, one Damage roll, one Advance roll, one Charge roll or one saving throw made for the bearer."
        },
        {
          name: "Synaptic Linchpin",
          points: 20,
          text: "With a neuro-cortex that pulsates with the irresistible power of the Hive Mind, this leader acts as a blazing synaptic beacon to the lesser creatures of the swarm, the better to direct their actions and react to the ever-changing state of battle.\n\nTYRANIDS model only. While a friendly TYRANIDS unit is within 9\" of the bearer, that unit is within Synapse Range of your army."
        },
        {
          name: "Adaptive Biology",
          points: 25,
          text: "The same weapon rarely works against this leader-beast twice, as its alien physiology adapts at an astonishing rate to counter the attacks of the foe.\n\nTYRANIDS model only. The bearer has the Feel No Pain 5+ ability. At the start of any turn, if the bearer has fewer than its starting number of wounds remaining, until the end of the battle, it has the Feel No Pain 4+ ability instead."
        }
      ],
      stratagems: [
        {
          id: "invasion-fleet-rapid-regeneration",
          name: "RAPID REGENERATION",
          cp: 1,
          type: "Battle Tactic",
          timing: "opponent",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One TYRANIDS unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, models in your unit have the Feel No Pain 6+ ability. If your unit is within Synapse Range of your army, models in your unit have the Feel No Pain 5+ ability instead.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "invasion-fleet-adrenal-surge",
          name: "ADRENAL SURGE",
          cp: 2,
          type: "Battle Tactic",
          timing: "any",
          when: "Fight phase.",
          target: "Up to two TYRANIDS units from your army that are within Synapse Range of your army and are eligible to fight, or one other TYRANIDS unit from your army that is eligible to fight.",
          effect: "Until the end of the phase, each time a model in any of those selected units makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.",
          phaseTags: ["Fight"]
        },
        {
          id: "invasion-fleet-death-frenzy",
          name: "DEATH FRENZY",
          cp: 1,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "Fight phase, just after an enemy unit has selected its targets.",
          target: "One TYRANIDS unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play.",
          phaseTags: ["Fight"]
        },
        {
          id: "invasion-fleet-overrun",
          name: "OVERRUN",
          cp: 1,
          type: "Strategic Ploy",
          timing: "any",
          when: "Fight phase, just before a TYRANIDS unit from your army Consolidates.",
          target: "That TYRANIDS unit.",
          effect: "Until the end of the phase, each time your unit Consolidates, models in it can move an additional 3\" as long as your unit can end that move within Engagement Range of one or more enemy units. If your unit is within Synapse Range of your army and not within Engagement Range of any enemy units, instead of making that Consolidation move, it can make a Normal move of up to 6\".",
          phaseTags: ["Fight"]
        },
        {
          id: "invasion-fleet-predatory-imperative",
          name: "PREDATORY IMPERATIVE",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Command phase.",
          target: "Up to two TYRANIDS units from your army that are within Synapse Range of your army, or one other TYRANIDS unit from your army.",
          effect: "Select one Hyper-adaptation. Until the start of your next Command phase, that Hyper-adaptation is active for those selected units in addition to any other that may be active for your army.",
          restrictions: "You cannot select the same Hyper-adaptation you selected at the start of the first battle round.",
          phaseTags: ["Command"]
        },
        {
          id: "invasion-fleet-endless-swarm",
          name: "ENDLESS SWARM",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Command phase.",
          target: "Up to two ENDLESS MULTITUDE units from your army that are within Synapse Range of your army, or one other ENDLESS MULTITUDE unit from your army.",
          effect: "You can return up to D3+3 destroyed models to each of the selected units.",
          phaseTags: ["Command"]
        }
      ]
    },
    {
      slug: "crusher-stampede",
      name: "Crusher Stampede",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Enraged Behemoths",
          text: "In their efforts to lay the monstrous beasts of a Crusher Stampede low, the prey only succeed in further enraging the rampaging monsters. The surviving beasts are driven to fight with greater fury the more of their number that fall.\n\nEach time a TYRANIDS MONSTER model from your army makes an attack, add 1 to the Hit roll if that model's unit is below its Starting Strength, and add 1 to the Wound roll as well if that model's unit is Below Half-strength. In addition, while a TYRANIDS MONSTER unit from your army (excluding Battle-shocked units) is at its Starting Strength, add 2 to the Objective Control characteristic of models in that unit."
        }
      ],
      enhancements: [
        {
          name: "Ominous Presence",
          points: 15,
          text: "The crushing menace of the Hive Mind rolls off this monstrous creature in waves, causing it to loom even larger in the minds of its quailing prey and lending it absolute dominance of the battlefield.\n\nTYRANIDS MONSTER model only. Add 3 to the bearer's Objective Control characteristic."
        },
        {
          name: "Enraged Reserves",
          points: 20,
          text: "Contained deep within this organism's body is a pulsating sac filled with a cocktail of adrenostimulant fluids linked to a ring of vascular-pneumatic sphincters, allowing them one last-ditch strike.\n\nTYRANIDS MONSTER model only. If the bearer is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 3+, do not remove it from play. It can fight after the attacking model's unit has finished making its attacks, and is then removed from play."
        },
        {
          name: "Null Nodules",
          points: 10,
          text: "A contraganglion knot in this creature's cranium channels and amplifies the smothering power of the Shadow in the Warp to nullify its prey's psychic abilities.\n\nTYRANIDS MONSTER model only. Once per battle, when a Psychic Attack is allocated to the bearer, it can use this ability. If it does, until the end of the phase, the bearer has the Feel No Pain 5+ ability against Psychic Attacks."
        },
        {
          name: "Monstrous Nemesis",
          points: 25,
          text: "With its basic logic centres and instinctive drivers augmented, this warrior organism is capable of singling out and hunting down valuable prey without direct synaptic oversight.\n\nTYRANIDS MONSTER model only. Each time the bearer makes a melee attack that targets a MONSTER or VEHICLE unit, add 1 to the Wound roll."
        }
      ],
      stratagems: [
        {
          id: "crusher-stampede-corrosive-viscera",
          name: "CORROSIVE VISCERA",
          cp: 1,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "Your opponent's Shooting phase or the Fight phase, just after a TYRANIDS MONSTER model from your army with the Deadly Demise ability that cannot FLY is destroyed.",
          target: "That TYRANIDS MONSTER model. You can use this Stratagem on that model even though it was just destroyed.",
          effect: "Do not roll one D6 to determine whether mortal wounds are inflicted by your model's Deadly Demise ability. Instead, mortal wounds are automatically inflicted.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "crusher-stampede-rampaging-monstrosities",
          name: "RAMPAGING MONSTROSITIES",
          cp: 1,
          type: "Battle Tactic",
          timing: "any",
          when: "Fight phase.",
          target: "One TYRANIDS MONSTER unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes an attack, you can re-roll the Hit roll.",
          phaseTags: ["Fight"]
        },
        {
          id: "crusher-stampede-savage-roar",
          name: "SAVAGE ROAR",
          cp: 1,
          type: "Battle Tactic",
          timing: "opponent",
          when: "Fight phase, just after an enemy unit has selected its targets.",
          target: "One TYRANIDS MONSTER unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "That enemy unit must take a Battle-shock test and, until the end of the phase, each time a model in that enemy unit makes an attack that targets your unit, subtract 1 from the Hit roll. If that Battle-shock test was failed, subtract 1 from the Wound roll as well.",
          phaseTags: ["Fight"]
        },
        {
          id: "crusher-stampede-untrammelled-ferocity",
          name: "UNTRAMMELLED FEROCITY",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Movement phase.",
          target: "One TYRANIDS MONSTER unit from your army that has not been selected to move this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes a Normal, Advance or Fall Back move, it can move through models (excluding TITANIC models) and sections of terrain features that are 4\" or less in height. When doing so:\n* It can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them.\n* It can also move through sections of terrain features that are more than 4\" in height, but if it does, after its unit has moved, roll one D6: on a 1, your unit is Battle-shocked.",
          phaseTags: ["Movement"]
        },
        {
          id: "crusher-stampede-swarm-guided-salvoes",
          name: "SWARM-GUIDED SALVOES",
          cp: 1,
          type: "Battle Tactic",
          timing: "your",
          when: "Your Shooting phase.",
          target: "One TYRANIDS MONSTER unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability, and until the end of the phase each time a model in your unit makes an attack, you can ignore any or all modifiers to that model's Ballistic Skill characteristic and any or all modifiers to the Hit roll.",
          phaseTags: ["Shooting"]
        },
        {
          id: "crusher-stampede-massive-impact",
          name: "MASSIVE IMPACT",
          cp: 1,
          type: "Epic Deed",
          timing: "your",
          when: "Your Charge phase, just after a TYRANIDS MONSTER model from your army ends a Charge move.",
          target: "That TYRANIDS MONSTER model.",
          effect: "Select one enemy unit within Engagement Range of your model and roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.",
          phaseTags: ["Charge"]
        }
      ]
    },
    {
      slug: "unending-swarm",
      name: "Unending Swarm",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Insurmountable Odds",
          text: "When Hormagaunts, Termagants and other such expendable warrior organisms attack en masse they make up for their comparative fragility with sheer numbers. Coupled with the speed and ferocity of their onslaught - which only seems to increase as the prey try to gun the creatures down or drive them back - the gathered broods soon overrun even the most determined defenders.\n\nEach time an enemy unit is selected to shoot, after that unit has finished making its attacks, if one or more models from one or more ENDLESS MULTITUDE units from your army were destroyed as a result of those attacks, each such unit can make a Surge move. To do so, roll one D6: that unit can be moved a distance in inches up to the result, but that unit must end that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, those models can be moved within Engagement Range of enemy units. A unit cannot make a Surge move while it is Battle-shocked."
        }
      ],
      enhancements: [
        {
          name: "Relentless Hunger",
          points: 20,
          text: "An overriding need to sink their fangs into the flesh of their prey drives these creatures toward the foe.\n\nTYRANIDS model only. Add 2\" to the Move characteristic of models in the bearer's unit."
        },
        {
          name: "Naturalised Camouflage",
          points: 30,
          text: "These warrior organisms possess limited chameleonic properties that conceal their advance. The benefits of such deceptions decrease as they approach their prey, but can be enough to bring them safely into range to strike.\n\nTYRANIDS model only. At the start of the first battle round, select up to three friendly ENDLESS MULTITUDE units within 9\" of the bearer. Until the end of the battle round, each time a ranged attack targets one of those units, models in that unit have the Benefit of Cover against that attack."
        },
        {
          name: "Piercing Talons",
          points: 25,
          text: "A simple but potent biomorphic enhancement of these warrior organisms sees some amongst their number boast diamond-sharp talon tips. Lashing suddenly from amidst the mass of thrashing weapon limbs these plunge through armour to pierce organs and rupture delicate systems.\n\nTYRANIDS model only. Each time a model in the bearer's unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1."
        },
        {
          name: "Adrenalised Onslaught",
          points: 15,
          text: "Biostimulants course through the bodies of these warrior organisms, combining with goading synaptic impulses to lend them an unholy turn of speed.\n\nTYRANIDS model only. Each time the bearer's unit Piles In or Consolidates, models in this unit can move an additional 3\"."
        }
      ],
      stratagems: [
        {
          id: "unending-swarm-synaptic-goading",
          name: "SYNAPTIC GOADING",
          cp: 1,
          type: "Strategic Ploy",
          timing: "any",
          when: "Any phase, just before an ENDLESS MULTITUDE unit from your army that is within Synapse Range of your army makes a Surge move.",
          target: "That ENDLESS MULTITUDE unit.",
          effect: "When making that Surge move, you can re-roll the D6 to determine how far your unit moves, and your unit can end that move as close as possible to the closest objective marker (instead of as close as possible to the closest enemy unit]. All other rules for making Surge moves still apply.",
          phaseTags: ["Command", "Movement", "Shooting", "Charge", "Fight"]
        },
        {
          id: "unending-swarm-unending-waves",
          name: "UNENDING WAVES",
          cp: 2,
          type: "Strategic Ploy",
          timing: "any",
          when: "Any phase.",
          target: "One ENDLESS MULTITUDE unit from your army that was just destroyed. You can use this Stratagem on that unit even though it was just destroyed.",
          effect: "Add a new unit to your army identical to your destroyed unit, in Strategic Reserves, at its Starting Strength.",
          restrictions: "Any destroyed CHARACTER units that were attached to your unit are not returned. You can only use this Stratagem once per battle.",
          phaseTags: ["Command", "Movement", "Shooting", "Charge", "Fight"]
        },
        {
          id: "unending-swarm-teeming-masses",
          name: "TEEMING MASSES",
          cp: 1,
          type: "Battle Tactic",
          timing: "opponent",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One ENDLESS MULTITUDE unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "unending-swarm-swarming-masses",
          name: "SWARMING MASSES",
          cp: 1,
          type: "Battle Tactic",
          timing: "your",
          when: "Your Shooting phase or the Fight phase.",
          target: "One ENDLESS MULTITUDE unit from your army that has not been selected to shoot or fight this phase.",
          effect: "Until the end of the phase, weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability, and If your unit contains 15 or more models, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "unending-swarm-bounding-advance",
          name: "BOUNDING ADVANCE",
          cp: 1,
          type: "Battle Tactic",
          timing: "your",
          when: "Your Movement phase.",
          target: "One ENDLESS MULTITUDE unit from your army.",
          effect: "Until the end of the phase, each time your unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6\" to the Move characteristic of models in your unit.",
          phaseTags: ["Movement"]
        },
        {
          id: "unending-swarm-preservation-imperative",
          name: "PRESERVATION IMPERATIVE",
          cp: 1,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One ENDLESS MULTITUDE unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, your unit is treated as containing fewer than five models for the purpose of the [BLAST] ability.",
          phaseTags: ["Shooting"]
        }
      ]
    },
    {
      slug: "assimilation-swarm",
      name: "Assimilation Swarm",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Feed the Swarm",
          text: "Even as the beasts of the Assimilation Swarm stalk across the battlefield they make use of the abundant biomass yielded up by the prey worlds slow demise. Warrior organisms heal even the most grievous wounds in moments, or stagger upright and return to the fight after they seemed slain. A strain of revolting vitality flows through the Tyranid broods as though leeched direct from their dismayed victims.\n\nIn your Command phase, each HARVESTER unit from your army can Regenerate one friendly TYRANIDS unit that is within 6\" of it. A unit can only be regenerated once per phase. Each time a unit regenerates, do one of the following:\n* One model in that unit regains up to D3+1 lost wounds.\n* One destroyed INFANTRY model (excluding CHARACTERS) is returned to that unit with its full wounds remaining. If that unit is an ENDLESS MULTITUDE unit, up to 3 destroyed models are returned instead."
        }
      ],
      enhancements: [
        {
          name: "Regenerating Monstrosity",
          points: 20,
          text: "This nightmarish creature seems virtually unkillable, its every hurt healing in moments as it guzzles down the hunks of bubbling biomatter that were once foes.\n\nTYRANIDS model only (excluding MONSTERS models). The bearer's unit can be regenerated up to twice per phase, instead of once."
        },
        {
          name: "Instinctive Defence",
          points: 15,
          text: "The swarm's warrior organisms fight with instinctive and single-minded ferocity to protect the all-devouring organisms in their midst.\n\nTYRANIDS model only. While the bearer is within 6\" of one or more friendly HARVESTER units, you can target the bearer's unit with the Heroic Intervention Stratagem for 0CP. In addition, while the bearer is within 6\" of one or more friendly HARVESTER units, models in the bearer's unit have the Fights First ability."
        },
        {
          name: "Biophagic Flow (Aura)",
          points: 10,
          text: "Parasitised biomass and revivifying fluids flow through the Assimilation Swarm like lifeblood.\n\nTYRANIDS model only. While a friendly HARVESTER model is within 12\" of the bearer, when using the Feed the Swarm ability, that HARVESTER model can Regenerate one friendly TYRANIDS unit that is within 9\" of it, instead of one within 6\"."
        },
        {
          name: "Parasitic Biomorphology",
          points: 25,
          text: "These warrior organisms boast additional fanged maws, jabbing probosci and haemophagic membranes that consume the fluids of their prey.\n\nTYRANIDS model only. Add 1 to the Strength characteristic of melee weapons equipped by models in the bearer's unit. The first time the bearer's unit destroys an enemy unit in the Fight phase while the bearer is within 6\" of one or more friendly HARVESTER units, until the end of the battle, add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer's unit."
        }
      ],
      stratagems: [
        {
          id: "assimilation-swarm-broodguard-impulse",
          name: "BROODGUARD IMPULSE",
          cp: 1,
          type: "Epic Deed",
          timing: "any",
          when: "Any phase.",
          target: "One HARVESTER unit from your army that was just destroyed. You can use this Stratagem on that unit even though it was just destroyed.",
          effect: "Until the end of the battle, each time a friendly TYRANIDS model makes an attack that targets the enemy unit that just destroyed your HARVESTER unit, add 1 to the Wound roll.",
          phaseTags: ["Command", "Movement", "Shooting", "Charge", "Fight"]
        },
        {
          id: "assimilation-swarm-reclaim-biomass",
          name: "RECLAIM BIOMASS",
          cp: 1,
          type: "Strategic Ploy",
          timing: "any",
          when: "Any phase, when a TYRANIDS unit from your army is destroyed, before the last model in it is removed from play.",
          target: "One HARVESTER unit from your army that is within 6\" of that destroyed unit.",
          effect: "Regenerate one friendly TYRANIDS unit within 6\" of your HARVESTER unit (See Feed the Swarm).",
          phaseTags: ["Command", "Movement", "Shooting", "Charge", "Fight"]
        },
        {
          id: "assimilation-swarm-tyrannoformed",
          name: "TYRANNOFORMED",
          cp: 1,
          type: "Strategic Ploy",
          timing: "any",
          when: "Command phase.",
          target: "One HARVESTER unit from your army that is within range of an objective marker you control.",
          effect: "That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
          phaseTags: ["Command"]
        },
        {
          id: "assimilation-swarm-ablative-carapace",
          name: "ABLATIVE CARAPACE",
          cp: 2,
          type: "Epic Deed",
          timing: "opponent",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One HARVESTER unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, models in your unit have the Feel No Pain 5+ ability. If your unit is within range of an objective marker you control, until the end of the phase models in your unit have the Feel No Pain 4+ ability instead.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "assimilation-swarm-secure-biomass",
          name: "SECURE BIOMASS",
          cp: 1,
          type: "Strategic Ploy",
          timing: "any",
          when: "Fight phase.",
          target: "One TYRANIDS unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, melee weapons equipped by models in your unit have the [LETHAL HITS] ability. If your unit is a HARVESTER unit, each time a model in that unit makes a melee attack, a successful unmodified Hit roll of 5+ scores a Critical Hit as well.",
          phaseTags: ["Fight"]
        },
        {
          id: "assimilation-swarm-rapacious-hunger",
          name: "RAPACIOUS HUNGER",
          cp: 1,
          type: "Battle Tactic",
          timing: "your",
          when: "Your Fight phase.",
          target: "One TYRANIDS unit from your army that just destroyed an enemy unit.",
          effect: "Your unit immediately Regenerates (See Feed the Swarm). When doing so, if your unit is a HARVESTER unit and you choose for one model to regain up to D3 lost wounds, that model regains up to 3 lost wounds instead.",
          phaseTags: ["Fight"]
        }
      ]
    },
    {
      slug: "vanguard-onslaught",
      name: "Vanguard Onslaught",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Questing Tendrils",
          text: "In the early stages of an invasion, the Hive Mind harries and unbalances its foes with lightning-fast flanking attacks, before encircling them for the final, bloody slaughter.\n\nTYRANIDS units with this ability are eligible to charge in a turn in which they Fell Back. VANGUARD INVADER units with this ability are eligible to charge in a turn in which they Advanced."
        },
        {
          name: "Vanguard Prime",
          text: "During the earliest stages of a Tyranid invasion, the rare bioform Imperial observers have named Deathleaper has been seen fulfilling a leadership and coordination role amongst the swarms. Employing pheromone trails and goading imperatives, the creature provides guidance to other warrior organisms that is the localised equivalent of synaptic control.\n\nDEATHLEAPER loses the Hunter Organism rule and can be your WARLORD."
        }
      ],
      enhancements: [
        {
          name: "Hunting Grounds",
          points: 20,
          text: "This warrior organism has identified installations and routes of communication and supply vital to the prey. As the Tyranid invasion commences so the beast orchestrates ambushes and terror raids against these priority targets, ensuring that those enemy reinforcements who do reach the battlefield do so in bloodied disarray.\n\nTYRANIDS model only. While the bearer is on the battlefield, each time your opponent sets up a Reserves unit on the battlefield, roll one D6: on a 2+, that unit must take a Battle-shock test."
        },
        {
          name: "Chameleonic",
          points: 15,
          text: "Subdermal crystals in this organisms carapace capture and redirect light, helping to conceal it.\n\nVANGUARD INVADER model only. The bearer has the Stealth ability and each time a ranged attack targets the bearer's unit, models in that unit have the Benefit of Cover against that attack."
        },
        {
          name: "Stalker",
          points: 10,
          text: "This hunter seeks vital priority prey that has been pheromonally marked for swift slaughter.\n\nVANGUARD INVADER model only. At the start of the battle, select one enemy unit. Each time the bearer makes an attack that targets that enemy unit, add 1 to the Hit roll and add 1 to the Wound roll."
        },
        {
          name: "Neuronode",
          points: 20,
          text: "While no true synapse beast, this bioform has been grafted with a limited synaptic symbiote, the influence of which increases its host's ability to formulate and enforce large-scale predatory strategies.\n\nTYRANIDS model only. After both players have deployed their armies, you can select up to three VANGUARD INVADER units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves."
        }
      ],
      stratagems: [
        {
          id: "vanguard-onslaught-surprise-assault",
          name: "SURPRISE ASSAULT",
          cp: 1,
          type: "Battle Tactic",
          timing: "your",
          when: "Your Shooting phase or the Fight phase, just after a VANGUARD INVADER unit from your army has selected its targets.",
          target: "That VANGUARD INVADER unit.",
          effect: "Select one enemy unit that was selected as the target of one or more of your unit's attacks. That enemy unit must take a Battle-shock test. Until the end of the phase, each time a model in your unit makes an attack that targets that enemy unit, add 1 to the Hit roll. If the Battle-shock test was failed, add 1 to the Wound roll as well.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "vanguard-onslaught-assassin-beasts",
          name: "ASSASSIN BEASTS",
          cp: 1,
          type: "Battle Tactic",
          timing: "any",
          when: "Fight phase.",
          target: "One VANGUARD INVADER INFANTRY unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.",
          phaseTags: ["Fight"]
        },
        {
          id: "vanguard-onslaught-seeded-broods",
          name: "SEEDED BROODS",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Movement phase.",
          target: "One TYRANIDS unit from your army that is in Reserves, or up to two VANGUARD INVADER units from your army that are in Reserves.",
          effect: "Until the end of the phase, for the purposes of setting up those selected units on the battlefield, treat the current battle round number as being one higher than it actually is.",
          phaseTags: ["Movement"]
        },
        {
          id: "vanguard-onslaught-hypersensory-scillia",
          name: "HYPERSENSORY SCILLIA",
          cp: 2,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: "Up to two VANGUARD INVADER units from your army that are within 9\" of that enemy unit, or one other TYRANIDS INFANTRY unit from your army that is within 9\" of that enemy unit.",
          effect: "Those selected units can each make a Normal move of up to 6\".",
          restrictions: "You cannot target units that are within Engagement Range of one or more enemy units.",
          phaseTags: ["Movement"]
        },
        {
          id: "vanguard-onslaught-unseen-lurkers",
          name: "UNSEEN LURKERS",
          cp: 1,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One VANGUARD INVADER unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18\" or, if your unit has the Lone Operative ability, if the attacking model is within 6\". Your opponent can select new targets for the attacking unit's attacks.",
          phaseTags: ["Shooting"]
        },
        {
          id: "vanguard-onslaught-invisible-hunter",
          name: "INVISIBLE HUNTER",
          cp: 1,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "End of your opponent's Fight phase.",
          target: "Up to two VANGUARD INVADER units from your army, or one TYRANIDS INFANTRY unit from your army.",
          effect: "Remove the targeted units from the battlefield and place them into Strategic Reserves.",
          restrictions: "The targeted units must be more than 3\" away from all enemy units.",
          phaseTags: ["Fight"]
        }
      ]
    },
    {
      slug: "synaptic-nexus",
      name: "Synaptic Nexus",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Synaptic Imperatives",
          text: "The leader-beasts of these swarms act as conduits to the will of the Hive Mind. Irresistible imperatives lash out from them like whips that drive lesser bioforms to hurl themselves at the prey, to fight on through fatal wounds or to attack with redoubled savagery.\n\nAt the start of the battle round, you can select one of the Synaptic Imperatives shown below. Until the end of the battle round, that Synaptic Imperative is active for your army and while a TYRANIDS unit from your army is within Synapse Range of your army, it will benefit from it. Each Synaptic Imperative can only be selected once per battle.\n* Synaptic Augmentation: While this unit is within Synapse Range of your army, models in this unit have a 5+ invulnerable save.\n* Surging Vitality: While this unit is within Synapse Range of your army, add 1 to Advance and Charge rolls made for this unit.\n* Goaded to Slaughter: While this unit is within Synapse Range of your army, each time a model in this unit makes a melee attack, add 1 to the Hit roll."
        }
      ],
      enhancements: [
        {
          name: "Power of the Hive Mind",
          points: 10,
          text: "The Hive Mind channels lethal energy through its synaptic bioforms.\n\nTYRANIDS PSYKER model only. Improve the Strength and Armour Penetration characteristics of psychic weapons equipped by the bearer by 1."
        },
        {
          name: "Psychostatic Disruption",
          points: 30,
          text: "A maelstrom of psychostatic disruption boils about this bioform. It degrades artificial and biological cognition alike, causing teleport signals to fluctuate, geopositioning cogitators to spew contradictory data, and onrushing enemy warriors to reel in confusion.\n\nTYRANIDS SYNAPSE model only. Enemy units that arrive on the battlefield from Reserves cannot be set up within 12\" of the bearer. In addition, once per battle, during the first or second battle round, when your opponent declares that a unit will arrive on the battlefield from Strategic Reserves, the bearer can use this Enhancement. If it does, roll one D6: on a 4+, that enemy unit cannot arrive on the battlefield this turn."
        },
        {
          name: "Synaptic Control",
          points: 20,
          text: "The Hive Mind's synaptic network is so strong that even the mangled remains of mortally wounded beasts can be compelled to fight on.\n\nTYRANIDS SYNAPSE model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack."
        },
        {
          name: "The Dirgeheart of Kharis (Aura)",
          points: 15,
          text: "This grotesque biomorphic symbiote buries itself in its hosts thorax and emits a droning psychic note. The longer prey are exposed to the sound, the worse their atavistic terror response becomes...\n\nTYRANIDS SYNAPSE model only. While an enemy unit is within 9\" of the bearer, worsen that units Leadership characteristic by 1."
        }
      ],
      stratagems: [
        {
          id: "synaptic-nexus-the-smothering-shadow",
          name: "THE SMOTHERING SHADOW",
          cp: 1,
          type: "Strategic Ploy",
          timing: "any",
          when: "Any phase, just after an enemy unit fails a Battle-shock test.",
          target: "One SYNAPSE unit from your army within 12\" of that enemy unit.",
          effect: "Roll six D6: for each 3+, that enemy unit suffers 1 mortal wound.",
          phaseTags: ["Command", "Movement", "Shooting", "Charge", "Fight"]
        },
        {
          id: "synaptic-nexus-synaptic-channelling",
          name: "SYNAPTIC CHANNELLING",
          cp: 1,
          type: "Battle Tactic",
          timing: "any",
          when: "Command phase.",
          target: "One SYNAPSE unit from your army.",
          effect: "Until the end of the turn, while a friendly TYRANIDS unit is within 9\" of the selected unit, that unit is within Synapse Range of your army.",
          phaseTags: ["Command"]
        },
        {
          id: "synaptic-nexus-irresistible-will",
          name: "IRRESISTIBLE WILL",
          cp: 1,
          type: "Battle Tactic",
          timing: "your",
          when: "Your Shooting phase or the Fight phase.",
          target: "One SYNAPSE unit from your army that has not been selected to shoot or fight this phase, and one enemy unit within 24\" of and visible to the SYNAPSE unit.",
          effect: "Until the end of the phase, each time a friendly TYRANIDS model makes an attack that targets that enemy unit, if the attacking model's unit is within 6\" of your SYNAPSE unit, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "synaptic-nexus-reinforced-hive-node",
          name: "REINFORCED HIVE NODE",
          cp: 1,
          type: "Battle Tactic",
          timing: "opponent",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One SYNAPSE unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "synaptic-nexus-imperative-dominance",
          name: "IMPERATIVE DOMINANCE",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Command phase.",
          target: "One TYRANIDS unit from your army that is within Synapse Range of your army.",
          effect: "Select one Synaptic Imperative, even if you have already selected that imperative this battle. Until the start of your next Command phase, that Synaptic Imperative is active for your unit instead of any other Synaptic Imperative that is active for your army.",
          phaseTags: ["Command"]
        },
        {
          id: "synaptic-nexus-override-instincts",
          name: "OVERRIDE INSTINCTS",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Movement phase.",
          target: "One TYRANIDS unit from your army that is within Synapse Range of your army and made a Fall Back move this phase.",
          effect: "Your unit is eligible to shoot and declare a charge this turn.",
          phaseTags: ["Movement"]
        }
      ]
    },
    {
      slug: "subterranean-assault",
      name: "Subterranean Assault",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Surprise Assault",
          text: "Burrowing Tyranid bioforms burst from the ground in all their horror.\n\nEach time a TYRANIDS model from your army makes an attack, re-roll a Hit roll of 1.\n\nEach time a BURROWER unit from your army is set up on the battlefield from Reserves, place a circular 40mm Tunnel Marker anywhere on the battlefield within 1\" of that unit and more than 3\" horizontally away from all enemy units.\n\nIn the Reinforcements step of your Movement phase, when you set up a unit on the battlefield from Reserves, you can set that unit up wholly within 9\" of one of your Tunnel Markers and more than 6\" horizontally away from any enemy units.\n\nIf an enemy model (excluding AIRCRAFT) ends any kind of move within 3\" of one of your Tunnel Markers, that Tunnel Marker is removed from the battlefield.\n\nKEYWORDS\nMAWLOC and TRYGON units from your army have the BURROWER keyword.\n\nIn the Muster Armies step, you can select up to 2 TRYGON models from your army. The selected units gain the CHARACTER keyword.\n\nDesigner's Note: This means that the selected models can be given Enhancements and one of them can be selected as your WARLORD."
        }
      ],
      enhancements: [
        {
          name: "Synaptic Strategy",
          points: 15,
          text: "Possessing an exceptionally acute connection to the hive mind, this creature benefits from a constant influx of sensory data, enabling it to traverse the battlefield and emerge at the place and time of maximum impact.\n\nTYRANIDS model only. Once per battle, you can target the bearer's unit with the Rapid Ingress stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase."
        },
        {
          name: "Tremor Senses",
          points: 20,
          text: "From its concealed position beneath the battlefield, this bioform picks up on subtle traces of movement from the enemy force, impelling its fellow organisms to reposition themselves in preparation for a coordinated assault.\n\nTYRANIDS model only. After both players have deployed their armies, select up to three friendly TYRANIDS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves."
        },
        {
          name: "Vanguard Intellect",
          points: 15,
          text: "This bioform uses its own keen senses and predatory intellect to burrow into position and strike before the enemy can react.\n\nTYRANIDS model with the Deep Strike ability only. The bearer's unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules."
        },
        {
          name: "Trygon Prime",
          points: 20,
          text: "Only rarely manifested by the hive fleets, the Trygon Prime possesses a greatly enhanced synaptic network within its neural cortex, enabling it to more precisely coordinate the assaults of burrowing Tyranid creatures.\n\nTRYGON model only. The bearer gains the SYNAPSE keyword. Improve the Strength and Weapon Skill characteristics of melee weapons equipped by the bearer by 1."
        }
      ],
      stratagems: [
        {
          id: "subterranean-assault-adaptive-optimisation",
          name: "ADAPTIVE OPTIMISATION",
          cp: 1,
          type: "Wargear",
          timing: "any",
          when: "Command phase.",
          target: "One MAWLOC or TRYGON unit from your army.",
          effect: "Until the start of your next Command phase, your unit has the SYNAPSE keyword.",
          phaseTags: ["Command"]
        },
        {
          id: "subterranean-assault-replenishing-swarms",
          name: "REPLENISHING SWARMS",
          cp: 1,
          type: "Wargear",
          timing: "your",
          when: "Your Movement phase.",
          target: "One TYRANIDS unit from your army, wholly within 9\" of one or more Tunnel Markers you placed.",
          effect: "One model in your unit regains up to D3+1 lost wounds, or you can return up to D3+1 destroyed models with a Wounds characteristic of 1 to your unit, with their full wounds remaining, instead.",
          phaseTags: ["Movement"]
        },
        {
          id: "subterranean-assault-enfilading-emergence",
          name: "ENFILADING EMERGENCE",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "End of your Movement phase.",
          target: "One TYRANIDS unit from your army that was set up as Reinforcements this turn.",
          effect: "Until the end of your next Fight phase, weapons equipped by models in your unit have the [SUSTAINED HITS 1] and [IGNORES COVER] abilities.",
          phaseTags: ["Movement"]
        },
        {
          id: "subterranean-assault-tunnel-network",
          name: "TUNNEL NETWORK",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "End of your Movement phase.",
          target: "One TYRANIDS unit from your army that is wholly within 9\" of one or more of your Tunnel Markers and not within Engagement Range of one or more enemy units.",
          effect: "Remove your unit from the battlefield and set it up again, wholly within 9\" of another Tunnel Marker you placed, and more than 6\" horizontally away from all enemy units.",
          phaseTags: ["Movement"]
        },
        {
          id: "subterranean-assault-swarming-assault",
          name: "SWARMING ASSAULT",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Charge phase.",
          target: "One TYRANIDS MONSTER unit from your army that was set up as Reinforcements this turn.",
          effect: "Until the end of the phase, friendly TYRANIDS units within 6\" of your unit can re-roll Charge rolls.",
          phaseTags: ["Charge"]
        },
        {
          id: "subterranean-assault-retreat-below",
          name: "RETREAT BELOW",
          cp: 1,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "End of your opponent's Fight phase.",
          target: "One TYRANIDS unit or up to two BURROWER units from your army that are not within Engagement Range of one or more enemy units.",
          effect: "Remove your unit from the battlefield and place it into Strategic Reserves.",
          phaseTags: ["Fight"]
        }
      ]
    },
    {
      slug: "warrior-bioform-onslaught",
      name: "Warrior Bioform Onslaught",
      source: "https://wahapedia.ru/wh40k10ed/factions/tyranids/",
      rules: [
        {
          name: "Leader-beasts",
          text: "Tyranid Warriors are adapted to shepherd the hive fleet's teeming swarms to war. Benefiting from heightened senses, hardened forms and great strength, they serve as ferocious beacons for and enforcers of the Hive Mind's indomitable will.\n\nTYRANID WARRIORS (see below), Tyranid Prime with Lash Whip and WINGED TYRANID PRIME units from your army have a 5+ invulnerable save.\n\nKEYWORDS\nTYRANID WARRIORS WITH RANGED BIO-WEAPONS and TYRANID WARRIORS WITH MELEE BIO-WEAPONS units from your army gain the TYRANID WARRIORS and BATTLELINE keywords, and while such a unit is not Battle-shocked, TYRANID WARRIORS models in that unit have an Objective Control characteristic of 3."
        }
      ],
      enhancements: [
        {
          name: "Synaptic Tyrant",
          points: 10,
          text: "This Neurotyrant has been integrated into the synaptic web, maximising its control over the lesser bioforms and providing an additional layer of protection.\n\nNeurotyrant model only. During the Declare Battle Formations step, the bearer can be attached to a TYRANID WARRIORS unit."
        },
        {
          name: "Ocular Adaptation",
          points: 20,
          text: "This node-beast's bio-adaptations allow it to perceive the minutest electrical impulse or heat signature. Few prey organisms escape its clutches.\n\nWINGED TYRANID PRIME or Tyranid Prime with Lash Whip model only. Each time a model in the bearer's unit makes an attack, add 1 to the Hit roll."
        },
        {
          name: "Sensory Assimilation",
          points: 20,
          text: "The Hive Mind feeds accumulated sensory data to this leader-beast, providing it with forewarning of incoming attacks long before the foe can land a blow.\n\nWINGED TYRANID PRIME or Tyranid Prime with Lash Whip model only. Each time an attack targets the bearer's unit, subtract 1 from the Hit roll."
        },
        {
          name: "Elevated Might",
          points: 30,
          text: "This bioform and its accompanying organisms possess muscular adaptations that give them incredible speed and endurance.\n\nTYRANIDS model only. The bearer's unit is eligible to declare a charge in a turn in which it Advanced."
        }
      ],
      stratagems: [
        {
          id: "warrior-bioform-onslaught-synaptic-amplification",
          name: "SYNAPTIC AMPLIFICATION",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Shooting phase or the Fight phase.",
          target: "One TYRANIDS unit from your army that has not been selected to shoot or fight this phase.",
          effect: "If that unit is a TYRANID WARRIORS unit, select up to one ENDLESS MULTITUDE unit from your army, that is not Battle-shocked, within 6\" of it. Until the end of the phase, each time a model in those units makes an attack, re-roll a Wound roll of 1, and, if it is a TYRANID WARRIORS unit, re-roll a Hit roll of 1 as well.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "warrior-bioform-onslaught-spontaneous-hypercorrosion",
          name: "SPONTANEOUS HYPERCORROSION",
          cp: 1,
          type: "Wargear",
          timing: "your",
          when: "Your Shooting phase or the Fight phase.",
          target: "One TYRANIDS unit from your army that has not been selected to shoot or fight this phase.",
          effect: "Until the end of the phase, add 2 to the Strength characteristic of ranged weapons equipped by models in your unit and add 1 to the Strength characteristic of melee weapons equipped by TYRANID WARRIORS and WINGED TYRANID PRIME models in your unit.",
          phaseTags: ["Shooting", "Fight"]
        },
        {
          id: "warrior-bioform-onslaught-restorative-impulse",
          name: "RESTORATIVE IMPULSE",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Command phase.",
          target: "One TYRANID WARRIORS unit from your army that is below its Starting Strength.",
          effect: "Return 1 destroyed model (excluding CHARACTER models) to your unit.",
          phaseTags: ["Command"]
        },
        {
          id: "warrior-bioform-onslaught-synaptic-micronodes",
          name: "SYNAPTIC MICRONODES",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Movement phase.",
          target: "One TYRANID WARRIORS unit from your army.",
          effect: "Select one objective marker you control that your unit is within range of. That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          phaseTags: ["Movement"]
        },
        {
          id: "warrior-bioform-onslaught-parasitic-payload",
          name: "PARASITIC PAYLOAD",
          cp: 1,
          type: "Strategic Ploy",
          timing: "your",
          when: "Your Shooting phase.",
          target: "One TYRANID WARRIORS WITH RANGED BIO-WEAPONS unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability. After your unit has resolved its shooting attacks this phase, select one enemy unit hit by one or more of those attacks. Until the end of the turn, models in that unit cannot have the Benefit of Cover.",
          phaseTags: ["Shooting"]
        },
        {
          id: "warrior-bioform-onslaught-synaptic-shield",
          name: "SYNAPTIC SHIELD",
          cp: 1,
          type: "Strategic Ploy",
          timing: "opponent",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One TYRANID WARRIORS unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "If that unit is a TYRANID WARRIORS unit, select up to one ENDLESS MULTITUDE unit from your army, that is not Battle-shocked, within 6\" of it. Until the end of the phase, each time a ranged attack targets one of those units, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll.",
          phaseTags: ["Shooting"]
        }
      ]
    }
  ];
}());
