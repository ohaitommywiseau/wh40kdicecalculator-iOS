// Seed fallback datasheet data used before faction payloads are loaded.
const defaultData = {
  "units": {
        "Lord Marshal Dreir": {
              "note": "Leader, Feel No Pain 6+, Voice of Command, Tough to Kill, Leading the Charge",
              "stats": {
                    "move": "10\"",
                    "toughness": 4,
                    "save": 4,
                    "wounds": 6,
                    "leadership": "7+",
                    "oc": 2
              },
              "weapons": {
                    "Laspistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Sabre of Sacrifice": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "6",
                          "skill": 2,
                          "skillType": "WS",
                          "strength": 6,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Anti-Infantry 4+"
                          ]
                    },
                    "Savage claws": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Extra Attacks"
                          ]
                    }
              }
        },
        "Krieg Command Squad": {
              "note": "Leader, Voice of Command, Grim Determination",
              "stats": {
                    "move": "6\"",
                    "toughness": 3,
                    "save": 5,
                    "wounds": 3,
                    "leadership": "6+",
                    "oc": 1
              },
              "weapons": {
                    "Boltgun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Bolt pistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Grenade launcher - frag": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "D3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Grenade launcher - krak": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -2,
                          "damage": "D3",
                          "abilities": []
                    },
                    "Lasgun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Laspistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Meltagun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Melta 2"
                          ]
                    },
                    "Plasma gun - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Plasma gun - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Hazardous",
                                "Rapid Fire 1"
                          ]
                    },
                    "Plasma pistol - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Plasma pistol - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Hazardous",
                                "Pistol"
                          ]
                    },
                    "Chainsword": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "4",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Close combat weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Power fist": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 6,
                          "ap": -2,
                          "damage": "2",
                          "abilities": []
                    },
                    "Power weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "1",
                          "abilities": []
                    },
                    "Trench club": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              },
              "statlines": [
                    {
                          "label": "Lord Commissar",
                          "stats": {
                                "move": "6\"",
                                "toughness": 3,
                                "save": "5+",
                                "wounds": 3,
                                "leadership": "6+",
                                "oc": 1
                          }
                    },
                    {
                          "label": "Veteran Guardsman",
                          "stats": {
                                "move": "6\"",
                                "toughness": 3,
                                "save": "5+",
                                "wounds": 1,
                                "leadership": "7+",
                                "oc": 1
                          }
                    }
              ]
        },
        "Death Korps of Krieg": {
              "note": "Grim Demeanour",
              "stats": {
                    "move": "6\"",
                    "toughness": 3,
                    "save": 5,
                    "wounds": 1,
                    "leadership": "7+",
                    "oc": 2
              },
              "weapons": {
                    "Bolt pistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Boltgun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Grenade launcher - frag": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "D3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Grenade launcher - krak": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -2,
                          "damage": "D3",
                          "abilities": []
                    },
                    "Lasgun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Laspistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Long-las": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "2",
                          "abilities": [
                                "Heavy",
                                "Precision"
                          ]
                    },
                    "Meltagun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Melta 2"
                          ]
                    },
                    "Plasma gun - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Plasma gun - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Hazardous",
                                "Rapid Fire 1"
                          ]
                    },
                    "Plasma pistol - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Plasma pistol - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Hazardous",
                                "Pistol"
                          ]
                    },
                    "Chainsword": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Close combat weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Power weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Artillery Team": {
              "note": "Remorseless Barrage",
              "stats": {
                    "move": "3\"",
                    "toughness": 7,
                    "save": 3,
                    "wounds": 10,
                    "leadership": "7+",
                    "oc": 3
              },
              "weapons": {
                    "Heavy mortar": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "D6+3",
                          "skill": 5,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -1,
                          "damage": "2",
                          "abilities": [
                                "Blast",
                                "Heavy",
                                "Indirect Fire"
                          ]
                    },
                    "Heavy quad launcher": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "2D6",
                          "skill": 5,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Blast",
                                "Heavy",
                                "Indirect Fire",
                                "Twin-linked"
                          ]
                    },
                    "Lasgun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Multiple rocket launcher": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "D6+3",
                          "skill": 5,
                          "skillType": "BS",
                          "strength": 2,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Anti-Infantry 3+",
                                "Blast",
                                "Heavy",
                                "Indirect Fire"
                          ]
                    },
                    "Siege cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "D6",
                          "skill": 5,
                          "skillType": "BS",
                          "strength": 12,
                          "ap": -2,
                          "damage": "3",
                          "abilities": [
                                "Blast",
                                "Heavy",
                                "Indirect Fire"
                          ]
                    },
                    "Crew close combat weapons": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Krieg Combat Engineers": {
              "note": "Scouts 6', Grenadiers",
              "stats": {
                    "move": "6\"",
                    "toughness": 3,
                    "save": 4,
                    "wounds": 1,
                    "leadership": "7+",
                    "oc": 1
              },
              "weapons": {
                    "Autopistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Bolt pistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Combat shotgun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Assault"
                          ]
                    },
                    "Flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Hand flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Pistol",
                                "Torrent"
                          ]
                    },
                    "Plasma pistol - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Plasma pistol - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Hazardous",
                                "Pistol"
                          ]
                    },
                    "Chainsword": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "4",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Close combat weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Power weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "1",
                          "abilities": []
                    },
                    "Trench club": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Krieg Heavy Weapons Squad": {
              "note": "Final Duty",
              "stats": {
                    "move": "4\"",
                    "toughness": 3,
                    "save": 4,
                    "wounds": 2,
                    "leadership": "7+",
                    "oc": 1
              },
              "weapons": {
                    "Lascannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 5,
                          "skillType": "BS",
                          "strength": 12,
                          "ap": -3,
                          "damage": "D6+1",
                          "abilities": [
                                "Heavy"
                          ]
                    },
                    "Krieg heavy flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "18\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 5,
                          "ap": -1,
                          "damage": "2",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Twin Krieg heavy stubber": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "3",
                          "skill": 5,
                          "skillType": "BS",
                          "strength": 6,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Heavy",
                                "Rapid Fire 3",
                                "Twin-linked"
                          ]
                    },
                    "Laspistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Close combat weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              },
              "statlines": [
                    {
                          "label": "Heavy Weapons Gunner",
                          "stats": {
                                "move": "4\"",
                                "toughness": 3,
                                "save": "4+",
                                "wounds": 2,
                                "leadership": "7+",
                                "oc": 1
                          }
                    },
                    {
                          "label": "Fire Coordinator",
                          "stats": {
                                "move": "6\"",
                                "toughness": 3,
                                "save": "5+",
                                "wounds": 1,
                                "leadership": "7+",
                                "oc": 1
                          }
                    }
              ]
        },
        "Death Riders": {
              "note": "Screening Line",
              "stats": {
                    "move": "10\"",
                    "toughness": 4,
                    "save": 4,
                    "wounds": 2,
                    "leadership": "7+",
                    "oc": 1
              },
              "weapons": {
                    "Death Rider lascarbine": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "18\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Assault"
                          ]
                    },
                    "Frag lance": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "D6",
                          "skill": 3,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Lance"
                          ]
                    },
                    "Power sabre": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 3,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "1",
                          "abilities": []
                    },
                    "Steed's savage claws": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Extra Attacks"
                          ]
                    }
              }
        },
        "Leman Russ Battle Tank": {
              "note": "Deadly Demise D3, Armoured Spearhead",
              "stats": {
                    "move": "10\"",
                    "toughness": 11,
                    "save": 2,
                    "wounds": 13,
                    "leadership": "7+",
                    "oc": 3
              },
              "weapons": {
                    "Leman Russ battle cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "D6+3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 10,
                          "ap": -1,
                          "damage": "3",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Lascannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 12,
                          "ap": -3,
                          "damage": "D6+1",
                          "abilities": []
                    },
                    "Heavy bolter": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": -1,
                          "damage": "2",
                          "abilities": [
                                "Sustained Hits 1"
                          ]
                    },
                    "Heavy flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 5,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Multi-melta": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "18\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Melta 2"
                          ]
                    },
                    "Plasma cannon - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "D3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Plasma cannon - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "D3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Blast",
                                "Hazardous"
                          ]
                    },
                    "Heavy stubber": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 3"
                          ]
                    },
                    "Storm bolter": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 2"
                          ]
                    },
                    "Hunter-killer missile": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 14,
                          "ap": -3,
                          "damage": "D6",
                          "abilities": [
                                "One Shot"
                          ]
                    },
                    "Armoured tracks": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "6",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 7,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Hellhound": {
              "note": "Deadly Demise D6, Flush Them Out",
              "stats": {
                    "move": "10\"",
                    "toughness": 10,
                    "save": 2,
                    "wounds": 11,
                    "leadership": "7+",
                    "oc": 3
              },
              "weapons": {
                    "Inferno cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "18\"",
                          "attacks": "2D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 6,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Chem cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6+1",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 2,
                          "ap": -2,
                          "damage": "2",
                          "abilities": [
                                "Anti-Infantry 2+",
                                "Torrent"
                          ]
                    },
                    "Melta cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "18\"",
                          "attacks": "D3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Blast",
                                "Melta 4"
                          ]
                    },
                    "Heavy bolter": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": -1,
                          "damage": "2",
                          "abilities": [
                                "Sustained Hits 1"
                          ]
                    },
                    "Heavy flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 5,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Multi-melta": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "18\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Melta 2"
                          ]
                    },
                    "Heavy stubber": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 3"
                          ]
                    },
                    "Storm bolter": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 2"
                          ]
                    },
                    "Hunter-killer missile": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 14,
                          "ap": -3,
                          "damage": "D6",
                          "abilities": [
                                "One Shot"
                          ]
                    },
                    "Armoured tracks": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 6,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Chimera": {
              "note": "Deadly Demise D3, Firing Deck 2, Mobile Command Vehicle",
              "stats": {
                    "move": "10\"",
                    "toughness": 9,
                    "save": 3,
                    "wounds": 11,
                    "leadership": "7+",
                    "oc": 2
              },
              "weapons": {
                    "Multi-laser": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "4",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 6,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Heavy bolter": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": -1,
                          "damage": "2",
                          "abilities": [
                                "Sustained Hits 1"
                          ]
                    },
                    "Heavy flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 5,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Lasgun array": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "6",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 6"
                          ]
                    },
                    "Heavy stubber": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 3"
                          ]
                    },
                    "Storm bolter": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 2"
                          ]
                    },
                    "Hunter-killer missile": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 14,
                          "ap": -3,
                          "damage": "D6",
                          "abilities": [
                                "One Shot"
                          ]
                    },
                    "Armoured tracks": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 6,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Kasrkin": {
              "note": "Scout 6', Warrior Elite",
              "stats": {
                    "move": "6\"",
                    "toughness": 3,
                    "save": 4,
                    "wounds": 1,
                    "leadership": "7+",
                    "oc": 1
              },
              "weapons": {
                    "Bolt pistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Grenade launcher - frag": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "D3",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Grenade launcher - krak": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -2,
                          "damage": "D3",
                          "abilities": []
                    },
                    "Hot-shot lasgun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Hot-shot laspistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Hot-shot marksman rifle": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "3",
                          "abilities": [
                                "Heavy",
                                "Precision"
                          ]
                    },
                    "Hot-shot volley gun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "30\"",
                          "attacks": "2",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 2"
                          ]
                    },
                    "Meltagun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Melta 2"
                          ]
                    },
                    "Plasma gun - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 1"
                          ]
                    },
                    "Plasma gun - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Hazardous",
                                "Rapid Fire 1"
                          ]
                    },
                    "Plasma pistol - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Plasma pistol - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Hazardous",
                                "Pistol"
                          ]
                    },
                    "Chainsword": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "4",
                          "skill": 3,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Close combat weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 3,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Power weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 3,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Ursula Creed": {
              "note": "Leader, Voice of Command, Lord Castellan, Tactical Genius",
              "stats": {
                    "move": "6\"",
                    "toughness": 3,
                    "save": 4,
                    "wounds": 4,
                    "leadership": "7+",
                    "oc": 1,
                    "invulnerable": "5+"
              },
              "weapons": {
                    "Duty and Vengeance pistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "4",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": -2,
                          "damage": "1",
                          "abilities": []
                    },
                    "Power weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "4",
                          "skill": 3,
                          "skillType": "WS",
                          "strength": 4,
                          "ap": -2,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Gaunt's Ghosts": {
              "note": "Fights First, Infiltrators, Lone Operative, Stealth, Voice of Command, Tanith Camo-cloaks, Covert Stealth Team",
              "stats": {
                    "move": "6\"",
                    "toughness": 3,
                    "save": 4,
                    "wounds": 3,
                    "leadership": "6+",
                    "oc": 1,
                    "invulnerable": "5+"
              },
              "weapons": {
                    "Bolt pistol": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 2,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Pistol"
                          ]
                    },
                    "Bragg's autocannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "4",
                          "skill": 5,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -1,
                          "damage": "3",
                          "abilities": [
                                "Heavy"
                          ]
                    },
                    "Corbec's hot-shot lascarbine": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "3",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Assault"
                          ]
                    },
                    "Larkin's long-las": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "1",
                          "skill": 2,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": -2,
                          "damage": "4",
                          "abilities": [
                                "Heavy",
                                "Precision"
                          ]
                    },
                    "Lascarbine": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "3",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Assault"
                          ]
                    },
                    "Rawne's lascarbine": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "3",
                          "skill": 3,
                          "skillType": "BS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Assault",
                                "Sustained Hits 1"
                          ]
                    },
                    "Gaunt's chainsword": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "5",
                          "skill": 2,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": -1,
                          "damage": "1",
                          "abilities": []
                    },
                    "Straight silver knife": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 3,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Mkoll's straight silver knife": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "5",
                          "skill": 2,
                          "skillType": "WS",
                          "strength": 3,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Devastating Wounds",
                                "Precision"
                          ]
                    }
              },
              "statlines": [
                    {
                          "label": "Ibram Gaunt",
                          "stats": {
                                "move": "6\"",
                                "toughness": 3,
                                "save": "4+",
                                "wounds": 3,
                                "leadership": "6+",
                                "oc": 1
                          }
                    },
                    {
                          "label": "Tanith Ghost",
                          "stats": {
                                "move": "6\"",
                                "toughness": 3,
                                "save": "5+",
                                "wounds": 2,
                                "leadership": "7+",
                                "oc": 1
                          }
                    }
              ]
        },
        "Rogal Dorn Battle Tank": {
              "note": "Deadly Demise D6, Ablative Plating",
              "stats": {
                    "move": "10\"",
                    "toughness": 12,
                    "save": 2,
                    "wounds": 18,
                    "leadership": "7+",
                    "oc": 5
              },
              "weapons": {
                    "Castigator gatling cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "12",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Coaxial autocannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -1,
                          "damage": "3",
                          "abilities": []
                    },
                    "Heavy bolter": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 5,
                          "ap": -1,
                          "damage": "2",
                          "abilities": [
                                "Sustained Hits 1"
                          ]
                    },
                    "Heavy stubber": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Rapid Fire 3"
                          ]
                    },
                    "Meltagun": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Melta 2"
                          ]
                    },
                    "Multi-melta": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "18\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -4,
                          "damage": "D6",
                          "abilities": [
                                "Melta 2"
                          ]
                    },
                    "Oppressor cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "72\"",
                          "attacks": "D6+3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 12,
                          "ap": -2,
                          "damage": "3",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Pulveriser cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "24\"",
                          "attacks": "D6",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -3,
                          "damage": "3",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Twin battle cannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "D6+3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 10,
                          "ap": -1,
                          "damage": "3",
                          "abilities": [
                                "Blast",
                                "Twin-linked"
                          ]
                    },
                    "Armoured tracks": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "6",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 7,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    }
              }
        },
        "Scout Sentinel": {
              "note": "Deadly Demise 1, Scouts 9', Daring Recon.",
              "stats": {
                    "move": "10\"",
                    "toughness": 7,
                    "save": 3,
                    "wounds": 7,
                    "leadership": "7+",
                    "oc": 2
              },
              "weapons": {
                    "Multi-laser": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "4",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 6,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Autocannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -1,
                          "damage": "3",
                          "abilities": []
                    },
                    "Heavy flamer": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "12\"",
                          "attacks": "D6",
                          "skill": 0,
                          "skillType": "N/A",
                          "strength": 5,
                          "ap": -1,
                          "damage": "1",
                          "abilities": [
                                "Ignores Cover",
                                "Torrent"
                          ]
                    },
                    "Lascannon": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 12,
                          "ap": -3,
                          "damage": "D6+1",
                          "abilities": []
                    },
                    "Missile launcher - frag": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "D6",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 4,
                          "ap": 0,
                          "damage": "1",
                          "abilities": [
                                "Blast",
                                "Heavy"
                          ]
                    },
                    "Missile launcher - krak": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 9,
                          "ap": -2,
                          "damage": "D6",
                          "abilities": [
                                "Heavy"
                          ]
                    },
                    "Plasma cannon - standard": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "D3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 7,
                          "ap": -2,
                          "damage": "1",
                          "abilities": [
                                "Blast"
                          ]
                    },
                    "Plasma cannon - supercharge": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "36\"",
                          "attacks": "D3",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 8,
                          "ap": -3,
                          "damage": "2",
                          "abilities": [
                                "Blast",
                                "Hazardous"
                          ]
                    },
                    "Hunter-killer missile": {
                          "phase": "Shooting",
                          "type": "Ranged",
                          "range": "48\"",
                          "attacks": "1",
                          "skill": 4,
                          "skillType": "BS",
                          "strength": 14,
                          "ap": -3,
                          "damage": "D6",
                          "abilities": [
                                "One Shot"
                          ]
                    },
                    "Close combat weapon": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "2",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 6,
                          "ap": 0,
                          "damage": "1",
                          "abilities": []
                    },
                    "Sentinel chainsaw": {
                          "phase": "Fight",
                          "type": "Melee",
                          "range": "Melee",
                          "attacks": "3",
                          "skill": 4,
                          "skillType": "WS",
                          "strength": 6,
                          "ap": -1,
                          "damage": "1",
                          "abilities": []
                    }
              }
        }
  }
};


