window.WH40K_SECONDARY_OBJECTIVES = {
  source: {
    name: 'Wahapedia - Chapter Approved 2025-26',
    url: 'https://wahapedia.ru/wh40k10ed/the-rules/chapter-approved-2025-26/',
    verifiedAt: '2026-04-12',
    notes: 'Card text and scoring options are transcribed from Wahapedia.',
    deckAssignmentNote: 'Attacker and Defender deck membership follows Wahapedia’s Chapter Approved 2025-26 secondary-deck ordering on the page because the full official public deck list is not exposed in Games Workshop’s free public documents.'
  },
  attacker: [
    {
      id: 'behind-enemy-lines',
      name: 'Behind Enemy Lines',
      summary: 'Break through the enemy and cut off their escape routes.',
      whenDrawn: 'If it is the first battle round, you can draw a new Secondary Mission card and shuffle this card back into your Secondary Mission deck.',
      scoringOptions: [
        { vp: 3, label: 'One unit wholly within opponent deployment zone' },
        { vp: 4, label: 'Two or more units wholly within opponent deployment zone' }
      ]
    },
    {
      id: 'storm-hostile-objective',
      name: 'Storm Hostile Objective',
      summary: 'Seize an objective marker you did not begin the turn holding.',
      whenDrawn: 'If it is the first battle round, you can draw a new Secondary Mission card and shuffle this card back into your Secondary Mission deck.',
      scoringOptions: [
        { vp: 4, label: 'Took an objective your opponent controlled' },
        { vp: 4, label: 'Took an objective you did not control after opponent began with none' }
      ]
    },
    {
      id: 'engage-on-all-fronts',
      name: 'Engage on All Fronts',
      summary: 'Establish a battlefield presence across multiple table quarters.',
      whenDrawn: 'Presence is one or more non-Battle-shocked, non-AIRCRAFT units wholly within a table quarter and more than 6" from the battlefield centre.',
      scoringOptions: [
        { vp: 1, label: 'Presence in two table quarters' },
        { vp: 2, label: 'Presence in three table quarters' },
        { vp: 4, label: 'Presence in four table quarters' }
      ]
    },
    {
      id: 'establish-locus',
      name: 'Establish Locus',
      summary: 'Complete the action near the centre or inside the enemy deployment zone.',
      whenDrawn: 'Action starts in your Shooting phase with one unit and completes at end of turn if the unit is within 6" of the centre or within the opponent deployment zone.',
      scoringOptions: [
        { vp: 2, label: 'Action completed within 6" of battlefield centre' },
        { vp: 4, label: 'Action completed within opponent deployment zone' }
      ]
    },
    {
      id: 'cleanse',
      name: 'Cleanse',
      summary: 'Purify objective markers outside your deployment zone.',
      whenDrawn: 'Action starts in your Shooting phase with one or more units on objective markers outside your deployment zone and completes at end of turn if those objectives remain controlled.',
      scoringOptions: [
        { vp: 2, label: 'Fixed: one objective marker cleansed' },
        { vp: 4, label: 'Fixed: two or more objective markers cleansed' },
        { vp: 5, label: 'Tactical: two or more objective markers cleansed' }
      ]
    },
    {
      id: 'assassination',
      name: 'Assassination',
      summary: 'Eliminate enemy Character models.',
      scoringOptions: [
        { vp: 3, label: 'Fixed: destroyed Character with Wounds less than 4' },
        { vp: 4, label: 'Fixed: destroyed Character with Wounds 4 or higher' },
        { vp: 5, label: 'Tactical: one or more enemy Characters destroyed this turn' }
      ]
    },
    {
      id: 'no-prisoners',
      name: 'No Prisoners',
      summary: 'Destroy enemy units for steady attrition points.',
      notes: 'This card cannot be selected as a Fixed Mission in tournament play.',
      scoringOptions: [
        { vp: 2, label: 'Scored 2VP toward the up-to-5VP turn cap' },
        { vp: 4, label: 'Scored 4VP toward the up-to-5VP turn cap' },
        { vp: 5, label: 'Reached the 5VP turn cap' }
      ]
    },
    {
      id: 'cull-the-horde',
      name: 'Cull the Horde',
      summary: 'Destroy enemy INFANTRY units with Starting Strength 13+.',
      whenDrawn: 'If no enemy units satisfy the condition, you can discard this card and draw a new Secondary Mission card.',
      scoringOptions: [
        { vp: 5, label: 'Destroyed qualifying INFANTRY unit this turn' }
      ]
    },
    {
      id: 'bring-it-down',
      name: 'Bring It Down',
      summary: 'Destroy enemy MONSTER or VEHICLE units.',
      whenDrawn: 'If there are no enemy MONSTER or VEHICLE units on the battlefield, you can discard this card and draw a new Secondary Mission card.',
      scoringOptions: [
        { vp: 2, label: 'Fixed: destroyed MONSTER or VEHICLE unit' },
        { vp: 4, label: 'Fixed: destroyed unit had 15+ starting wounds total' },
        { vp: 6, label: 'Fixed: destroyed unit had 20+ starting wounds total' },
        { vp: 4, label: 'Tactical: one or more MONSTER or VEHICLE units destroyed this turn' }
      ]
    }
  ],
  defender: [
    {
      id: 'defend-stronghold',
      name: 'Defend Stronghold',
      summary: 'Keep control of an objective marker in your deployment zone.',
      whenDrawn: 'If it is the first battle round, draw a new Secondary Mission card and shuffle this card back into your Secondary Mission deck.',
      scoringOptions: [
        { vp: 3, label: 'Controlled one or more objectives in your deployment zone' }
      ]
    },
    {
      id: 'marked-for-death',
      name: 'Marked for Death',
      summary: 'Destroy your Alpha or Gamma target units.',
      whenDrawn: 'Your opponent selects three Alpha Target units, then you select one Gamma Target unit from their army on the battlefield.',
      scoringOptions: [
        { vp: 5, label: 'One or more Alpha Target units destroyed or removed this turn' },
        { vp: 2, label: 'Gamma Target destroyed or removed this turn' }
      ]
    },
    {
      id: 'secure-no-mans-land',
      name: 'Secure No Man’s Land',
      summary: 'Seize and hold No Man’s Land objectives.',
      scoringOptions: [
        { vp: 2, label: 'Controlled one No Man’s Land objective' },
        { vp: 5, label: 'Controlled two or more No Man’s Land objectives' }
      ]
    },
    {
      id: 'sabotage',
      name: 'Sabotage',
      summary: 'Complete the sabotage action in a terrain feature outside your deployment zone.',
      whenDrawn: 'Action starts in your Shooting phase with one unit within a terrain feature and completes at end of your opponent’s next turn if that unit is still on the battlefield.',
      scoringOptions: [
        { vp: 3, label: 'Sabotage completed outside opponent deployment zone' },
        { vp: 6, label: 'Sabotage completed within opponent deployment zone' }
      ]
    },
    {
      id: 'area-denial',
      name: 'Area Denial',
      summary: 'Dominate the battlefield centre while clearing enemies out.',
      scoringOptions: [
        { vp: 2, label: 'Friendly unit within 3" of centre and no enemies within 3"' },
        { vp: 5, label: 'Friendly unit within 3" of centre and no enemies within 6"' }
      ]
    },
    {
      id: 'recover-assets',
      name: 'Recover Assets',
      summary: 'Complete the action with units across different battlefield regions.',
      whenDrawn: 'If you are playing Incursion, or have fewer than three units on the battlefield, you can discard this card and draw a new Secondary Mission card.',
      scoringOptions: [
        { vp: 3, label: 'Two units recovered assets' },
        { vp: 5, label: 'Three or more units recovered assets' }
      ]
    },
    {
      id: 'a-tempting-target',
      name: 'A Tempting Target',
      summary: 'Control the No Man’s Land objective your opponent marked as the tempting target.',
      whenDrawn: 'Your opponent selects one No Man’s Land objective to be your Tempting Target objective marker.',
      scoringOptions: [
        { vp: 5, label: 'Controlled your Tempting Target objective marker' }
      ]
    },
    {
      id: 'extend-battle-lines',
      name: 'Extend Battle Lines',
      summary: 'Hold territory in No Man’s Land and, ideally, your own deployment zone too.',
      scoringOptions: [
        { vp: 4, label: 'Controlled objectives in both your deployment zone and No Man’s Land' },
        { vp: 2, label: 'Controlled one or more objectives in No Man’s Land' }
      ]
    },
    {
      id: 'overwhelming-force',
      name: 'Overwhelming Force',
      summary: 'Destroy enemy units that started the turn on objectives.',
      notes: 'Scores up to 5VP while active.',
      scoringOptions: [
        { vp: 3, label: 'Scored 3VP from qualifying destroys this turn' },
        { vp: 5, label: 'Reached the 5VP turn cap' }
      ]
    },
    {
      id: 'display-of-might',
      name: 'Display of Might',
      summary: 'End your turn with more units wholly within No Man’s Land than your opponent.',
      whenDrawn: 'If it is the first battle round, draw a new Secondary Mission card and shuffle this card back into your Secondary Mission deck.',
      scoringOptions: [
        { vp: 4, label: 'Ended turn with more units wholly within No Man’s Land' }
      ]
    }
  ]
};
