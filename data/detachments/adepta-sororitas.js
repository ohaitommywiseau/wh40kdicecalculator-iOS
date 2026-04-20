(function () {
  window.WH40K_DETACHMENT_DATABASE = window.WH40K_DETACHMENT_DATABASE || { source: {}, byFaction: {} };

  window.WH40K_DETACHMENT_DATABASE.byFaction['adepta-sororitas'] = [
    {
      slug: 'hallowed-martyrs',
      name: 'Hallowed Martyrs',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adepta-sororitas/',
      rules: [
        {
          name: 'The Blood of Martyrs',
          text: 'Each time an ADEPTA SORORITAS model from your army makes an attack, add 1 to the Hit roll if that model\'s unit is below its Starting Strength, and add 1 to the Wound roll as well if that model\'s unit is Below Half-strength.'
        }
      ],
      enhancements: [
        {
          name: 'Saintly Example',
          points: 10,
          text: 'ADEPTA SORORITAS model only. When the bearer is destroyed, you gain an additional D3 Miracle dice.'
        },
        {
          name: 'Through Suffering, Strength',
          points: 25,
          text: 'ADEPTA SORORITAS model only. Add 1 to the Attacks, Strength and Damage characteristics of the bearer\'s melee weapons. If the bearer has lost one or more wounds, add 2 to the Attacks, Strength and Damage characteristics of the bearer\'s melee weapons instead.'
        },
        {
          name: 'Chaplet of Sacrifice',
          points: 25,
          text: 'ADEPTA SORORITAS model only. At the end of your Command phase, if the bearer is on the battlefield, you can re-roll 1 Miracle dice from your Miracle dice pool and return it to your Miracle dice pool showing the new result you rolled. When doing so, if the bearer\'s unit is below its Starting Strength, you can re-roll up to 3 Miracle dice in this way instead.'
        },
        {
          name: 'Mantle of Ophelia',
          points: 20,
          text: 'CANONESS or PALATINE model only. Each time an attack is allocated to the bearer, change the Damage characteristic of that attack to 1.'
        }
      ],
      stratagems: [
        {
          id: 'hallowed-martyrs-divine-intervention',
          name: 'DIVINE INTERVENTION',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Any phase.',
          target: 'One ADEPTA SORORITAS CHARACTER unit from your army that was just destroyed.',
          effect: 'You can discard 1-3 Miracle dice. At the end of the phase, set the last destroyed model from your unit back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy models. Roll one D3, adding 1 to the result for each Miracle dice you discarded. That model is set back up with that number of wounds remaining (up to its starting number of wounds).',
          restrictions: 'You cannot select SAINT CELESTINE as the target of this Stratagem. You cannot select the same CHARACTER as the target of this Stratagem more than once per battle.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'hallowed-martyrs-suffering-and-sacrifice',
          name: 'SUFFERING AND SACRIFICE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Start of the Fight phase.',
          target: 'One ADEPTA SORORITAS INFANTRY or ADEPTA SORORITAS WALKER unit from your army.',
          effect: 'Until the end of the phase, each time an enemy model within Engagement Range of your unit selects its targets, it must select your unit as the target of its attacks.',
          phaseTags: ['Fight']
        },
        {
          id: 'hallowed-martyrs-righteous-vengeance',
          name: 'RIGHTEOUS VENGEANCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a melee attack, you can re-roll the Hit roll and, if your unit is Below Half-strength, you can re-roll the Wound roll as well.',
          phaseTags: ['Fight']
        },
        {
          id: 'hallowed-martyrs-sanctified-immolation',
          name: 'SANCTIFIED IMMOLATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Any phase.',
          target: 'One ADEPTA SORORITAS VEHICLE model from your army with the Deadly Demise ability that was just destroyed.',
          effect: 'Do not roll one D6 to determine whether mortal wounds are inflicted by your model\'s Deadly Demise ability. Instead, mortal wounds are automatically inflicted.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'hallowed-martyrs-spirit-of-the-martyr',
          name: 'SPIRIT OF THE MARTYR',
          cp: 2,
          type: 'Strategic Ploy',
          timing: 'any',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTA SORORITAS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          phaseTags: ['Fight']
        },
        {
          id: 'hallowed-martyrs-praise-the-fallen',
          name: 'PRAISE THE FALLEN',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One ADEPTA SORORITAS unit from your army that had one or more of its models destroyed as a result of the attacking unit\'s attacks.',
          effect: 'Your unit can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'penitent-host',
      name: 'Penitent Host',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adepta-sororitas/',
      rules: [
        {
          name: 'Desperate for Redemption',
          text: 'At the start of the battle round, you can select one of the following Vows of Atonement to be active for your army until the start of the next battle round. You can only select each Vow of Atonement once per battle. The Path of the Penitent: add 3" to the Move characteristic of PENITENT models from your army. Absolution in Battle: each time a unit from your army is selected to fight, if that unit made a Charge move this turn, until the end of the phase add 1 to the Attacks and Strength characteristics of melee weapons equipped by PENITENT models in that unit. Death Before Disgrace: each time a PENITENT model from your army is destroyed by a melee attack, if that model has not fought this phase, roll one D6; on a 2+, do not remove it from play, the destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.'
        }
      ],
      enhancements: [
        {
          name: 'Psalm of Righteous Judgement',
          points: 30,
          text: 'ADEPTA SORORITAS model only. While the bearer is on the battlefield, each time an enemy unit is destroyed by a PENITENT unit from your army, you can discard 1 Miracle dice then gain 1 Miracle dice showing a value of 6.'
        },
        {
          name: 'Verse of Holy Piety',
          points: 15,
          text: 'PENITENT model only. Once per battle, at the start of the battle round, select one Vow of Atonement. Until the start of the next battle round, that Vow of Atonement is active for the bearer\'s unit in addition to any that is active for your army, even if you have already selected that Vow of Atonement this battle.'
        },
        {
          name: 'Refrain of Enduring Faith',
          points: 25,
          text: 'PENITENT model only. While the bearer is leading a unit, models in that unit have a 5+ invulnerable save.'
        },
        {
          name: 'Catechism of Divine Penitence',
          points: 20,
          text: 'CANONESS, PALATINE or MINISTORUM PRIEST model only. The bearer gains the PENITENT keyword and, during the Declare Battle Formations step, can be attached to a REPENTIA SQUAD unit.'
        }
      ],
      stratagems: [
        {
          id: 'penitent-host-final-redemption',
          name: 'FINAL REDEMPTION',
          cp: 1,
          type: 'Epic Deed',
          timing: 'any',
          when: 'Any phase.',
          target: 'One PENITENT unit from your army that was just destroyed while it was within range of an objective marker you controlled.',
          effect: 'That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'penitent-host-purity-of-suffering',
          name: 'PURITY OF SUFFERING',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One PENITENT unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, PENITENT models in your unit have the Feel No Pain 4+ ability.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'penitent-host-passion-of-the-penitent',
          name: 'PASSION OF THE PENITENT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One PENITENT unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a PENITENT model in your unit makes a melee attack, a successful unmodified Hit roll of 5+ scores a Critical Hit.',
          phaseTags: ['Fight']
        },
        {
          id: 'penitent-host-lash-of-guilt',
          name: 'LASH OF GUILT',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Movement phase, just before a PENITENT unit from your army Advances.',
          target: 'That PENITENT unit.',
          effect: 'Until the end of the turn, your unit is eligible to declare a charge in a turn in which it Advanced. If your unit has the PENITENT ENGINES keyword, do not make an Advance roll for it; instead, until the end of the phase, add 6" to the Move characteristic of models in your unit.',
          phaseTags: ['Movement', 'Charge']
        },
        {
          id: 'penitent-host-boundless-zeal',
          name: 'BOUNDLESS ZEAL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an ADEPTA SORORITAS unit from your army Falls Back.',
          target: 'That ADEPTA SORORITAS unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot or declare a charge in a turn in which it Fell Back. If your unit has the PENITENT keyword, it is eligible to shoot and declare a charge in a turn in which it Fell Back instead.',
          phaseTags: ['Movement', 'Shooting', 'Charge']
        },
        {
          id: 'penitent-host-devout-fanaticism',
          name: 'DEVOUT FANATICISM',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One PENITENT unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Roll one D6: your unit can be moved a distance in inches up to the result, but it must end that move as close as possible to the closest enemy unit, excluding AIRCRAFT. When doing so, models in your unit can be moved within Engagement Range of enemy units.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'bringers-of-flame',
      name: 'Bringers of Flame',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adepta-sororitas/',
      rules: [
        {
          name: 'Fervent Purgation',
          text: 'Ranged weapons equipped by ADEPTA SORORITAS models from your army have the ASSAULT ability, and each time an attack made with such a weapon targets a unit within 6", add 1 to the Strength characteristic of that attack.'
        }
      ],
      enhancements: [
        {
          name: 'Righteous Rage',
          points: 15,
          text: 'ADEPTA SORORITAS model only. Each time the bearer is selected to fight, you can first discard up to 3 Miracle dice. For each Miracle dice just discarded, until the end of the phase, add 1 to the Attacks and Strength characteristics of the bearer\'s melee weapons.'
        },
        {
          name: 'Manual of Saint Griselda',
          points: 20,
          text: 'ADEPTA SORORITAS model only. At the start of your Command phase, you can discard up to 2 Miracle dice. Then, add 1 Miracle dice to your Miracle Dice pool showing a value equal to the sum of the two Miracle dice you just discarded, to a maximum of 6.'
        },
        {
          name: 'Fire and Fury',
          points: 30,
          text: 'ADEPTA SORORITAS model only. While the bearer is leading a unit, add 1 to the Attacks characteristic of Torrent weapons equipped by models in that unit, and all other ranged weapons equipped by models in that unit have the SUSTAINED HITS 1 ability.'
        },
        {
          name: 'Iron Surplice of Saint Istalela',
          points: 10,
          text: 'CANONESS or PALATINE model only. The bearer has a Save characteristic of 2+ and the Feel No Pain 5+ ability.'
        }
      ],
      stratagems: [
        {
          id: 'bringers-of-flame-shield-of-aversion',
          name: 'SHIELD OF AVERSION',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTA SORORITAS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'bringers-of-flame-righteous-blows',
          name: 'RIGHTEOUS BLOWS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the LETHAL HITS ability. If one or more enemy models are destroyed as the result of attacks made by those weapons this phase, select one of those destroyed models; that destroyed model\'s unit must take a Battle-shock test.',
          phaseTags: ['Fight']
        },
        {
          id: 'bringers-of-flame-carry-forth-the-faithful',
          name: 'CARRY FORTH THE FAITHFUL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just before an ADEPTA SORORITAS TRANSPORT model from your army Advances.',
          target: 'That ADEPTA SORORITAS TRANSPORT model.',
          effect: 'Until the end of the turn, you can re-roll Advance rolls made for your TRANSPORT, and units can disembark from your TRANSPORT even though it Advanced. Units that do so count as having made a Normal move, and cannot declare a charge this turn.',
          phaseTags: ['Movement']
        },
        {
          id: 'bringers-of-flame-cleansing-flames',
          name: 'CLEANSING FLAMES',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ADEPTA SORORITAS unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, Torrent weapons equipped by models in your unit have the DEVASTATING WOUNDS ability.',
          phaseTags: ['Shooting']
        },
        {
          id: 'bringers-of-flame-rites-of-fire',
          name: 'RITES OF FIRE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase.',
          target: 'One ADEPTA SORORITAS unit from your army that disembarked from a TRANSPORT this turn and has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack that targets an enemy unit within 6" that is also within range of an objective marker, add 1 to the Wound roll. If one or more enemy models are destroyed as the result of those attacks, select one of those destroyed models; that destroyed model\'s unit must take a Battle-shock test.',
          phaseTags: ['Shooting']
        },
        {
          id: 'bringers-of-flame-blazing-ire',
          name: 'BLAZING IRE',
          cp: 2,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase, just after an enemy unit has shot.',
          target: 'One ADEPTA SORORITAS TRANSPORT unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'One unit embarked within your TRANSPORT can disembark as if it were your Movement phase, and can then shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          phaseTags: ['Shooting']
        }
      ]
    },
    {
      slug: 'army-of-faith',
      name: 'Army of Faith',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adepta-sororitas/',
      rules: [
        {
          name: 'Sacred Rites',
          text: 'Each ADEPTA SORORITAS unit from your army can perform up to two Acts of Faith per phase, instead of just one.'
        }
      ],
      enhancements: [
        {
          name: 'Litanies of Faith',
          points: 10,
          text: 'CANONESS or PALATINE model only. At the start of your Command phase, if the bearer is on the battlefield, take a Leadership test for the bearer. If that test is passed, you gain 1 Miracle dice.'
        },
        {
          name: 'Blade of Saint Ellynor',
          points: 15,
          text: 'ADEPTA SORORITAS model only. Improve the Strength and Armour Penetration characteristics of the bearer\'s melee weapons by 1, and those weapons have the PRECISION ability. In addition, each time the bearer fights, if one or more enemy models are destroyed by those attacks, you gain 1 Miracle dice.'
        },
        {
          name: 'Divine Aspect',
          points: 5,
          text: 'ADEPTA SORORITAS model only. In your Movement phase, you can select one enemy unit within 12" of the bearer; that unit must take a Battle-shock test. If that test is failed, you gain 1 Miracle dice.'
        },
        {
          name: 'Triptych of the Macharian Crusade',
          points: 20,
          text: 'ADEPTA SORORITAS model only. Each time the bearer uses an Act of Faith to substitute a saving throw, that saving throw is successful, irrespective of the value of the Miracle dice used.'
        }
      ],
      stratagems: [
        {
          id: 'army-of-faith-shield-of-faith',
          name: 'SHIELD OF FAITH',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Any phase, just after an ADEPTA SORORITAS unit from your army suffers a mortal wound.',
          target: 'That ADEPTA SORORITAS unit, or one friendly ADEPTA SORORITAS JUMP PACK unit within 3" of it.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 5+ ability against mortal wounds. If you targeted an ADEPTA SORORITAS JUMP PACK unit from your army with this Stratagem, then until the end of the phase, while a friendly ADEPTA SORORITAS unit is within 3" of your unit, models in that unit have the Feel No Pain 5+ ability against mortal wounds.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'army-of-faith-light-of-the-emperor',
          name: 'LIGHT OF THE EMPEROR',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Command phase.',
          target: 'One ADEPTA SORORITAS unit from your army.',
          effect: 'Until the end of the turn, your unit is blessed. While a unit is blessed, it can ignore any or all modifiers to the profile characteristics of its models, the Weapon Skill or Ballistic Skill characteristics of weapons equipped by its models, and any roll or test made for it, excluding modifiers to saving throws. If your unit has the JUMP PACK keyword, until the end of the turn, while a friendly ADEPTA SORORITAS unit is within 3" of your unit, that friendly unit is also blessed.',
          phaseTags: ['Command']
        },
        {
          id: 'army-of-faith-faith-and-fury',
          name: 'FAITH AND FURY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the LANCE ability. If one or more enemy models are destroyed as the result of your unit\'s attacks this phase, you gain 1 Miracle dice.',
          phaseTags: ['Fight']
        },
        {
          id: 'army-of-faith-blinding-radiance',
          name: 'BLINDING RADIANCE',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'Your opponent\'s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.',
          target: 'One ADEPTA SORORITAS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks, or one friendly ADEPTA SORORITAS JUMP PACK unit within 3" of such a unit.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll. If you targeted an ADEPTA SORORITAS JUMP PACK unit from your army with this Stratagem, then until the end of the phase, while a friendly ADEPTA SORORITAS unit is within 3" of your unit, each time an attack targets that unit, subtract 1 from the Hit roll.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'army-of-faith-divine-guidance',
          name: 'DIVINE GUIDANCE',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One ADEPTA SORORITAS unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, improve the Armour Penetration characteristic of that attack by 1. If one or more enemy models are destroyed as the result of any of those attacks, you gain 1 Miracle dice.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'army-of-faith-angelic-descent',
          name: 'ANGELIC DESCENT',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'opponent',
          when: 'End of your opponent\'s Fight phase.',
          target: 'One ADEPTA SORORITAS JUMP PACK unit from your army.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: 'You cannot select a unit that is within Engagement Range of one or more enemy units.',
          phaseTags: ['Fight']
        }
      ]
    },
    {
      slug: 'champions-of-faith',
      name: 'Champions of Faith',
      source: 'https://wahapedia.ru/wh40k10ed/factions/adepta-sororitas/',
      rules: [
        {
          name: 'Righteous Purpose',
          text: 'In your Command phase, you can select up to 3 ADEPTA SORORITAS units from your army, including units that are embarked within TRANSPORTS. Until the start of your next Command phase, those units are Righteous. While a unit is Righteous, add 1" to the Move characteristic of models in that unit, improve the Leadership characteristic of models in that unit by 1, and improve the Weapon Skill and Ballistic Skill characteristics of weapons equipped by BATTLE SISTERS SQUAD, CELESTIAN SACRESANTS and PARAGON WARSUITS models in that unit by 1. In addition, while a CELESTIAN SACRESANTS unit from your army is not Battle-shocked, add 1 to the Objective Control characteristic of Celestian Sacresants models in that unit.'
        }
      ],
      enhancements: [
        {
          name: 'Triptych of Judgement',
          points: 15,
          text: 'ADEPTA SORORITAS model only. Each time a model in the bearer\'s unit makes an attack, you can ignore any or all modifiers to that attack\'s Ballistic Skill or Weapon Skill characteristics and/or any or all modifiers to the Hit roll.'
        },
        {
          name: 'Mark of Devotion',
          points: 30,
          text: 'ADEPTA SORORITAS model only. Add 1 to the Attacks characteristic of the bearer\'s melee weapons. While the bearer\'s unit is Righteous, add 2 to the Attacks characteristic and add 1 to the Damage characteristic of the bearer\'s melee weapons instead.'
        },
        {
          name: 'Eyes of the Oracle',
          points: 10,
          text: 'ADEPTA SORORITAS model only. The bearer\'s weapons have the PRECISION ability. Each time the bearer\'s unit destroys an enemy CHARACTER model, you gain 1CP.'
        },
        {
          name: 'Sanctified Amulet',
          points: 25,
          text: 'ADEPTA SORORITAS model only. Enemy units that are set up on the battlefield from Reserves cannot be set up within 12" of the bearer.'
        }
      ],
      stratagems: [
        {
          id: 'champions-of-faith-shield-of-denial',
          name: 'SHIELD OF DENIAL',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'any',
          when: 'Any phase, just after a mortal wound is allocated to an ADEPTA SORORITAS unit from your army.',
          target: 'That ADEPTA SORORITAS unit.',
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 6+ ability against mortal wounds. If your unit is Righteous, until the end of the phase, models in your unit have the Feel No Pain 5+ ability against mortal wounds instead.',
          phaseTags: ['Command', 'Movement', 'Shooting', 'Charge', 'Fight']
        },
        {
          id: 'champions-of-faith-suffer-not-the-unfaithful',
          name: 'SUFFER NOT THE UNFAITHFUL',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One ADEPTA SORORITAS unit from your army that is Righteous and that has not been selected to shoot or fight this phase.',
          effect: 'Select either the LETHAL HITS or SUSTAINED HITS 1 ability. Until the end of the phase, weapons equipped by models in your unit have the selected ability.',
          phaseTags: ['Shooting', 'Fight']
        },
        {
          id: 'champions-of-faith-to-the-heart-of-heresy',
          name: 'TO THE HEART OF HERESY',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the turn, improve the Strength characteristic of melee weapons equipped by models in your unit by 1. If your unit is Righteous, until the end of the phase, improve the Armour Penetration characteristic of melee weapons equipped by models in your unit by 1 as well.',
          phaseTags: ['Fight']
        },
        {
          id: 'champions-of-faith-path-of-the-righteous',
          name: 'PATH OF THE RIGHTEOUS',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'your',
          when: 'Fight phase.',
          target: 'One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the turn, each time a model in your unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3". When doing so, if your unit is Righteous, it does not need to end that move closer to the closest enemy model, provided it ends that move as close as possible to the closest enemy unit.',
          phaseTags: ['Fight']
        },
        {
          id: 'champions-of-faith-bastion-of-faith',
          name: 'BASTION OF FAITH',
          cp: 1,
          type: 'Battle Tactic',
          timing: 'opponent',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One CELESTIAN SACRESANTS unit that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll. In addition, if your unit is Righteous, you can select one other CELESTIAN SACRESANTS unit from your army that is not Battle-shocked and is within 6" of your unit. Until the end of the phase, each time an attack targets that CELESTIAN SACRESANTS unit, subtract 1 from the Hit roll as well.',
          phaseTags: ['Fight']
        },
        {
          id: 'champions-of-faith-indefatigable-dedication',
          name: 'INDEFATIGABLE DEDICATION',
          cp: 1,
          type: 'Strategic Ploy',
          timing: 'your',
          when: 'Your Movement phase, just after an ADEPTA SORORITAS unit from your army Falls Back.',
          target: 'That ADEPTA SORORITAS unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back. If your unit is Righteous, until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back instead.',
          phaseTags: ['Movement', 'Shooting', 'Charge']
        }
      ]
    }
  ];
}());
