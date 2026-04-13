window.WH40K_RULEBOOK_DATABASE = {
  source: {
    name: 'Wahapedia Core Rules',
    url: 'https://www.wahapedia.ru/wh40k10ed_cp/the-rules/core-rules/',
    verifiedAt: '2026-04-12'
  },
  editions: [
    {
      id: '10th',
      name: 'Warhammer 40,000 10th Edition',
      summary: 'Searchable quick-reference summaries for the 10th Edition core rules.',
      topics: [
        {
          id: 'core-concepts',
          label: 'Core Concepts',
          entries: [
            {
              id: 'battle-round',
              title: 'Battle Round',
              summary: 'Games progress through battle rounds, and each round contains both players’ turns with the standard phase sequence.',
              bullets: [
                'Turns cycle through Command, Movement, Shooting, Charge and Fight.',
                'Many effects last until the end of a phase, turn or battle round.',
                'If timing conflicts, sequencing and player turn order matter.'
              ],
              keywords: ['round', 'turn', 'phase', 'sequence', 'timing']
            },
            {
              id: 'datasheets-keywords',
              title: 'Datasheets and Keywords',
              summary: 'Units use datasheets for characteristics, weapons and abilities, while keywords determine what rules affect them.',
              bullets: [
                'A unit is one or more models from the same datasheet.',
                'Rules that name a keyword only affect units with that keyword.',
                'Faction keywords help define army construction, but rule checks still use keywords directly.'
              ],
              keywords: ['datasheet', 'keyword', 'unit', 'model', 'faction']
            },
            {
              id: 'engagement-range-coherency',
              title: 'Engagement Range and Coherency',
              summary: 'Engagement Range defines melee threat distance, while Unit Coherency controls how models must stay grouped.',
              bullets: [
                'Engagement Range is within 1 inch horizontally and 5 inches vertically.',
                'Models cannot be set up or end a Normal, Advance or Fall Back move in Engagement Range.',
                'Units of 2-6 models stay coherent to one other model; units of 7+ need two.'
              ],
              keywords: ['engagement range', 'coherency', 'melee', 'move', 'setup']
            },
            {
              id: 'measuring-visibility',
              title: 'Measuring and Visibility',
              summary: 'Distances are measured in inches and visibility uses true line of sight from the observing model.',
              bullets: [
                'Measure from the closest points of bases unless a model has no base.',
                'If any part of a model can be seen, that model is visible.',
                'A unit is visible if at least one model in it is visible.'
              ],
              keywords: ['measure', 'visibility', 'line of sight', 'fully visible', 'distance']
            }
          ]
        },
        {
          id: 'command-phase',
          label: 'Command Phase',
          entries: [
            {
              id: 'command-step',
              title: 'Command Step',
              summary: 'Start-of-turn command abilities, Orders and similar effects are typically handled here before the rest of the turn unfolds.',
              bullets: [
                'Resolve command-phase abilities and rule checks here.',
                'This is a common window for Orders, buff auras and command abilities.',
                'Persistent effects often start or refresh in this step.'
              ],
              keywords: ['command', 'orders', 'abilities', 'start of turn', 'buffs']
            },
            {
              id: 'battleshock-cp',
              title: 'Battle-shock and Command Points',
              summary: 'The Command phase also handles Battle-shock checks and the normal gain of Command Points.',
              bullets: [
                'Players gain 1CP in their Command phase under the normal core sequence.',
                'Units below Half-strength may need to test for Battle-shock.',
                'Battle-shocked units lose access to some actions, stratagem interactions and objective reliability.'
              ],
              keywords: ['battle-shock', 'cp', 'command points', 'below half-strength', 'leadership']
            },
            {
              id: 'starting-strength',
              title: 'Starting Strength and Destroyed Units',
              summary: 'Several core checks in the Command phase care about whether a unit is at Starting Strength, Below Half-strength or destroyed.',
              bullets: [
                'Starting Strength is the model count a unit began the battle with.',
                'Below Half-strength is checked against that original count or wound benchmark.',
                'Destroyed units are removed and can still matter for some scoring or resurrection effects.'
              ],
              keywords: ['starting strength', 'destroyed', 'below half-strength', 'unit status']
            }
          ]
        },
        {
          id: 'movement-phase',
          label: 'Movement Phase',
          entries: [
            {
              id: 'move-types',
              title: 'Move Types',
              summary: 'Units can Remain Stationary, make a Normal Move, Advance or Fall Back depending on their situation and rules.',
              bullets: [
                'A Normal Move uses the unit’s Move characteristic.',
                'Advance adds a roll to movement but usually restricts charges and shooting unless rules say otherwise.',
                'Fall Back leaves Engagement Range but also carries restrictions unless overridden.'
              ],
              keywords: ['movement', 'normal move', 'advance', 'fall back', 'remain stationary']
            },
            {
              id: 'terrain-flying',
              title: 'Terrain, Pivots and Flying',
              summary: 'Movement still follows positioning rules over terrain, and pivoting or Flying can matter for how a model clears the battlefield.',
              bullets: [
                'Models still need legal positions after moving.',
                'Terrain can change how far movement effectively reaches.',
                'Flying changes how movement is measured over obstacles, but not every restriction disappears.'
              ],
              keywords: ['terrain', 'flying', 'pivot', 'ruins', 'obstacles']
            },
            {
              id: 'straight-lines',
              title: 'Straight Lines and Positioning',
              summary: 'Movement is still measured precisely, and some movement instructions care about the path or final position, not just total distance.',
              bullets: [
                'Measure the actual move being made, including around terrain if required.',
                'Models must still end in legal positions and unit coherency.',
                'You cannot end Normal, Advance or Fall Back moves inside Engagement Range unless a rule explicitly permits it.'
              ],
              keywords: ['straight line', 'path', 'positioning', 'movement distance', 'coherency']
            },
            {
              id: 'reinforcements-transports',
              title: 'Reinforcements and Transports',
              summary: 'The Movement phase also contains Reinforcements placement plus Embark and Disembark interactions for transports.',
              bullets: [
                'Reinforcements arrive in the Reinforcements step, following their setup restrictions.',
                'Embarking and disembarking must respect transport capacity and positioning rules.',
                'Destroyed transports can force emergency consequences on passengers.'
              ],
              keywords: ['reinforcements', 'deep strike', 'transport', 'embark', 'disembark', 'strategic reserves']
            },
            {
              id: 'transport-capacity',
              title: 'Transport Capacity',
              summary: 'Transport rules care about how many models can fit and which keywords are permitted inside the vehicle.',
              bullets: [
                'A transport datasheet defines how many models it can carry.',
                'Keyword restrictions can stop certain units from embarking even if space remains.',
                'Attached characters and unusual bases still count according to the transport’s rules.'
              ],
              keywords: ['transport capacity', 'embark', 'models embarked', 'transport restrictions']
            },
            {
              id: 'destroyed-transports',
              title: 'Destroyed Transports',
              summary: 'When a transport is destroyed, embarked units do not simply vanish; they must disembark under the destroyed transport rules.',
              bullets: [
                'Passengers usually disembark before the transport is removed if they can be placed legally.',
                'If they cannot be set up legally, additional losses or destruction can occur.',
                'A destroyed transport can leave its passengers exposed and unable to act normally.'
              ],
              keywords: ['destroyed transport', 'passengers', 'emergency disembark', 'transport destruction']
            }
          ]
        },
        {
          id: 'shooting-phase',
          label: 'Shooting Phase',
          entries: [
            {
              id: 'select-targets',
              title: 'Selecting Targets',
              summary: 'Before attacks are made, the firing unit selects eligible targets based on visibility, range and engagement restrictions.',
              bullets: [
                'Targets must be visible and in range unless a rule says otherwise.',
                'Units in Engagement Range are restricted when making ranged attacks.',
                'Vehicles and Monsters interact differently through Big Guns Never Tire.'
              ],
              keywords: ['shooting', 'target', 'range', 'visibility', 'big guns never tire']
            },
            {
              id: 'attack-sequence',
              title: 'Attack Sequence',
              summary: 'Ranged attacks resolve by making Hit rolls, Wound rolls, allocating attacks, making saves and inflicting damage.',
              bullets: [
                'Hit rolls determine whether attacks connect.',
                'Wound rolls compare attack strength against target toughness.',
                'Saving throws, invulnerable saves and mortal wounds change how damage is applied.'
              ],
              keywords: ['hit roll', 'wound roll', 'save', 'invulnerable', 'mortal wounds', 'damage']
            },
            {
              id: 'weapon-abilities',
              title: 'Weapon Abilities and Cover',
              summary: 'Weapon abilities and cover rules modify how attacks behave once shooting begins.',
              bullets: [
                'Abilities like Heavy, Rapid Fire and Blast alter attack output or accuracy.',
                'Benefit of Cover changes how saving throws are improved when conditions are met.',
                'Special rules can override or ignore these modifiers.'
              ],
              keywords: ['weapon abilities', 'heavy', 'rapid fire', 'blast', 'cover']
            },
            {
              id: 'locked-in-combat',
              title: 'Locked in Combat and Big Guns Never Tire',
              summary: 'The Shooting phase has special restrictions for units in Engagement Range, with vehicles and monsters using different exceptions.',
              bullets: [
                'Most units cannot shoot while engaged and cannot target enemy units locked with them.',
                'Big Guns Never Tire lets certain units shoot differently while engaged.',
                'Even when exceptions apply, targeting restrictions and penalties still matter.'
              ],
              keywords: ['locked in combat', 'big guns never tire', 'vehicle shooting', 'monster shooting']
            },
            {
              id: 'mortal-wounds-damage',
              title: 'Mortal Wounds and Damage',
              summary: 'Mortal wounds bypass normal saving throws, while standard damage still follows allocation and save rules first.',
              bullets: [
                'Mortal wounds are applied directly unless another rule intervenes.',
                'Standard attacks still go through save and allocation before damage is inflicted.',
                'Damage overflow and model removal depend on the kind of unit and attack involved.'
              ],
              keywords: ['mortal wounds', 'damage', 'saving throw', 'allocate attack']
            }
          ]
        },
        {
          id: 'charge-phase',
          label: 'Charge Phase',
          entries: [
            {
              id: 'declaring-charges',
              title: 'Declaring and Making Charges',
              summary: 'Charge moves begin by declaring targets, then rolling to see whether the unit can legally end in Engagement Range.',
              bullets: [
                'A charge must end closer to at least one declared target and in Engagement Range.',
                'Charge rolls and terrain can limit which path is legal.',
                'Units that Advanced or Fell Back usually cannot charge unless a rule allows it.'
              ],
              keywords: ['charge', 'charge roll', 'declare charge', 'engagement range', 'terrain']
            },
            {
              id: 'charge-bonus',
              title: 'Charge Bonus and Terrain',
              summary: 'Charging brings positional advantages, but terrain and movement geometry still control whether the charge is successful.',
              bullets: [
                'Successful charges place units into melee position for the Fight phase.',
                'Charging over or around terrain can change the distance that must be rolled.',
                'Flying models have their own interaction notes when charging over terrain.'
              ],
              keywords: ['charge bonus', 'charging over terrain', 'flying charge', 'distance']
            }
          ]
        },
        {
          id: 'fight-phase',
          label: 'Fight Phase',
          entries: [
            {
              id: 'fight-order',
              title: 'Fight Order',
              summary: 'Fights First units resolve before the remaining combats, then eligible units alternate making their fights.',
              bullets: [
                'Fight sequencing matters when both sides have multiple melee threats.',
                'Pile In, melee attacks and Consolidate are each separate parts of a fight.',
                'Only eligible models can attack based on weapon range and positioning.'
              ],
              keywords: ['fight', 'fights first', 'pile in', 'consolidate', 'melee']
            },
            {
              id: 'which-models-fight',
              title: 'Which Models Fight',
              summary: 'Not every model in a unit automatically fights; attack eligibility depends on engagement and weapon reach.',
              bullets: [
                'Models in Engagement Range can fight.',
                'Other models may fight if they are close enough to friendly models that are already engaging, depending on melee rules.',
                'Weapon selection still matters before attacks are resolved.'
              ],
              keywords: ['eligible to fight', 'weapon range', 'engagement', 'melee attacks']
            },
            {
              id: 'pile-in-consolidate',
              title: 'Pile In and Consolidate',
              summary: 'Pile In and Consolidate are controlled movement steps during combat and are often where melee positioning is won or lost.',
              bullets: [
                'Pile In happens before melee attacks and must follow the fight rules.',
                'Consolidate happens after attacks and can reposition a unit around objectives or enemies.',
                'These moves do not ignore core engagement and coherency requirements.'
              ],
              keywords: ['pile in', 'consolidate', 'combat movement', 'fight positioning']
            }
          ]
        },
        {
          id: 'reserves-stratagems',
          label: 'Reserves and Stratagems',
          entries: [
            {
              id: 'strategic-reserves',
              title: 'Strategic Reserves',
              summary: 'Strategic Reserves use dedicated timing and battlefield-edge arrival restrictions rather than standard deployment placement.',
              bullets: [
                'Units enter later following the mission and reserve rules.',
                'Arrival locations depend on the battle round and board edges.',
                'Reserve rules stack with any extra limitations from a unit ability or mission.'
              ],
              keywords: ['strategic reserves', 'reserves', 'arrive', 'battlefield edge', 'reinforcements']
            },
            {
              id: 'stratagem-basics',
              title: 'Stratagem Basics',
              summary: 'Stratagems are tactical rules spent with CP and used only in the timing window written on the card or rule entry.',
              bullets: [
                'Check the timing and target requirements before spending CP.',
                'Core rules and army rules can both provide stratagem access.',
                'Restrictions such as once per phase or once per battle still apply.'
              ],
              keywords: ['stratagem', 'cp', 'command point', 'timing', 'usage limit']
            },
            {
              id: 'arriving-from-reserves',
              title: 'Arriving from Strategic Reserves',
              summary: 'Reserve arrivals follow round-based placement restrictions and cannot simply appear anywhere on the table.',
              bullets: [
                'Battle round and battlefield edge restrictions determine where a unit can enter.',
                'Mission rules can further restrict or expand reserve arrivals.',
                'Reserve setup still fails if the unit cannot be placed legally.'
              ],
              keywords: ['arriving from reserves', 'battlefield edge', 'reserve arrival', 'round restriction']
            }
          ]
        },
        {
          id: 'terrain-missions',
          label: 'Terrain and Missions',
          entries: [
            {
              id: 'benefit-of-cover',
              title: 'Benefit of Cover',
              summary: 'Cover is one of the most common terrain-driven modifiers and changes how durable a target is against incoming fire.',
              bullets: [
                'A unit must meet the terrain conditions to gain cover.',
                'Some attacks or abilities ignore cover entirely.',
                'Cover checks are still subject to other save modifiers and caps.'
              ],
              keywords: ['benefit of cover', 'terrain', 'save', 'ignore cover']
            },
            {
              id: 'missions-objectives',
              title: 'Missions and Objective Markers',
              summary: 'Missions define deployment, objectives and scoring, while objective markers control how units contest the battlefield.',
              bullets: [
                'Always follow the mission packet for setup and win conditions.',
                'Objective markers and terrain can interact with placement rules.',
                'Primary and secondary scoring comes from the mission structure, not the core turn sequence alone.'
              ],
              keywords: ['mission', 'objective marker', 'deployment', 'primary', 'secondary', 'scoring']
            },
            {
              id: 'objective-markers-terrain',
              title: 'Objective Markers and Terrain Features',
              summary: 'Objective markers and terrain pieces can overlap in practical play, so placement and control are not always as simple as open-ground measurement.',
              bullets: [
                'Use the mission packet and terrain guidance together when placing markers.',
                'Objective control still depends on eligible models and mission rules.',
                'Terrain can affect movement lines, visibility and how safely a unit can hold an objective.'
              ],
              keywords: ['objective markers', 'terrain features', 'control', 'placement']
            }
          ]
        },
        {
          id: 'datasheets-abilities',
          label: 'Datasheets and Abilities',
          entries: [
            {
              id: 'leadership-tests',
              title: 'Leadership Tests',
              summary: 'Leadership tests appear in several rule interactions, and they use the unit’s Leadership characteristic unless a rule says otherwise.',
              bullets: [
                'Battle-shock is the most common Leadership-related check in normal play.',
                'Modifiers and ignore-modifier rules can dramatically change reliability.',
                'Always check whether a test is a Battle-shock test or a more general Leadership test.'
              ],
              keywords: ['leadership test', 'battle-shock', 'leadership characteristic']
            },
            {
              id: 'random-characteristics',
              title: 'Random Characteristics',
              summary: 'Some weapons and abilities use random values for attacks, damage, movement or other characteristics, and those values are rolled when the relevant rule instructs.',
              bullets: [
                'A random characteristic is not locked in until the appropriate timing step.',
                'Re-roll permission only applies if a rule specifically allows it.',
                'The result becomes the characteristic used for that resolution window.'
              ],
              keywords: ['random characteristics', 'attacks characteristic', 'damage characteristic', 'dice']
            },
            {
              id: 'aura-abilities',
              title: 'Aura Abilities',
              summary: 'Aura abilities affect units within a stated range and are one of the most common passive rule structures in the game.',
              bullets: [
                'Always check the range, keywords and timing window of the aura.',
                'An aura typically stops applying once the source or recipient no longer qualifies.',
                'Stacking depends on the exact wording of the relevant abilities.'
              ],
              keywords: ['aura', 'range', 'passive ability', 'buff aura']
            },
            {
              id: 'psychic-weapons-abilities',
              title: 'Psychic Weapons and Abilities',
              summary: 'Psychic tags matter for interactions with anti-psychic rules even though psychic powers no longer function as their own separate phase.',
              bullets: [
                'Psychic weapons and psychic abilities are identified by their tags.',
                'Counters and bonuses that refer to Psychic still check those tags.',
                'They otherwise resolve in the phase and sequence described by their current rules.'
              ],
              keywords: ['psychic', 'psychic weapons', 'psychic abilities', 'tags']
            },
            {
              id: 'deployment-abilities',
              title: 'Deployment Abilities',
              summary: 'Abilities such as Scouts, Infiltrators and Deep Strike alter where or how a unit starts or enters the battle.',
              bullets: [
                'Deployment abilities are resolved at their specified setup timing.',
                'They still obey any mission or redeployment limitations.',
                'A redeployed unit uses the normal rules for that ability when it is set up again.'
              ],
              keywords: ['deployment abilities', 'scouts', 'infiltrators', 'deep strike', 'redeploy']
            }
          ]
        },
        {
          id: 'terrain-aircraft',
          label: 'Terrain and Aircraft',
          entries: [
            {
              id: 'terrain-features',
              title: 'Terrain Features',
              summary: 'Terrain features shape movement, visibility, charges and defensive play, and they are one of the biggest practical skill checks in the game.',
              bullets: [
                'Terrain is placed before the battle unless the mission says otherwise.',
                'Different terrain pieces can block, obscure or funnel movement.',
                'Players should agree on terrain traits before the game begins.'
              ],
              keywords: ['terrain', 'ruins', 'obstacles', 'battlefield', 'terrain traits']
            },
            {
              id: 'aircraft-rules',
              title: 'Aircraft',
              summary: 'Aircraft use a special movement framework and interact differently with deployment, movement and melee positioning.',
              bullets: [
                'Aircraft have dedicated deployment and movement guidance in the core rules.',
                'Other models also have special interaction limits when moving around aircraft.',
                'Aircraft behave differently in the Charge and Fight phases than standard units.'
              ],
              keywords: ['aircraft', 'flyer', 'aircraft movement', 'aircraft deployment']
            },
            {
              id: 'aircraft-movement',
              title: 'Aircraft in the Movement Phase',
              summary: 'Aircraft movement is not treated like a normal infantry or vehicle move and needs to be planned around its special requirements.',
              bullets: [
                'Aircraft positioning often matters a turn in advance because of movement constraints.',
                'Turning, minimum movement concepts and board position can all matter depending on the unit.',
                'Failing to satisfy aircraft movement rules can create serious positioning problems.'
              ],
              keywords: ['aircraft in movement phase', 'minimum move', 'turning', 'flyer positioning']
            }
          ]
        },
        {
          id: 'mission-sequencing',
          label: 'Mission and Sequencing',
          entries: [
            {
              id: 'sequencing',
              title: 'Sequencing',
              summary: 'When multiple rules need to resolve at the same time, the game uses sequencing rules rather than leaving the order undefined.',
              bullets: [
                'Player turn order often decides who resolves simultaneous effects first.',
                'Start-of-phase and end-of-phase timing conflicts are common places where sequencing matters.',
                'Clear sequencing avoids arguments over stacked buffs or reactions.'
              ],
              keywords: ['sequencing', 'simultaneous effects', 'timing conflict']
            },
            {
              id: 'persisting-effects',
              title: 'Persisting Effects and Out-of-Phase Rules',
              summary: 'Many effects last beyond the moment they are triggered, and out-of-phase actions still use the limits of the phase they imitate unless stated otherwise.',
              bullets: [
                'Always track whether an effect lasts until end of phase, end of turn or end of battle round.',
                'Out-of-phase rules do not automatically let units ignore phase-based restrictions.',
                'If a rule says to act as though it were another phase, use only the permissions actually granted.'
              ],
              keywords: ['persisting effects', 'out-of-phase', 'until end of phase', 'timing']
            },
            {
              id: 'muster-your-army',
              title: 'Muster Your Army and Missions',
              summary: 'Game setup starts before deployment with army construction, mission selection and battlefield setup instructions.',
              bullets: [
                'Mission selection tells players how to build and deploy for that battle.',
                'Army legality and mission rules should be settled before units are placed.',
                'A lot of in-game confusion comes from skipping the setup sequence.'
              ],
              keywords: ['muster your army', 'setup', 'mission sequence', 'deployment preparation']
            }
          ]
        }
      ]
    }
  ]
};
