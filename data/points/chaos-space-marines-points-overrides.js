window.WH40K_POINTS_DATABASE = window.WH40K_POINTS_DATABASE || { byFaction: {} };
window.WH40K_POINTS_DATABASE.byFaction = window.WH40K_POINTS_DATABASE.byFaction || {};
window.WH40K_POINTS_DATABASE.byFaction["chaos-space-marines"] =
  window.WH40K_POINTS_DATABASE.byFaction["chaos-space-marines"] || {
    faction: { id: "CSM", name: "Chaos Space Marines", slug: "chaos-space-marines" },
    units: {},
    missing: []
  };

Object.assign(window.WH40K_POINTS_DATABASE.byFaction["chaos-space-marines"].units,
{
    "Abaddon The Despoiler":  {
                                  "variants":  [
                                                   {
                                                       "models":  1,
                                                       "points":  285,
                                                       "label":  "1 model"
                                                   }
                                               ]
                              },
    "Accursed Cultists":  {
                              "copyTiers":  [
                                                {
                                                    "copyMin":  1,
                                                    "copyMax":  1,
                                                    "variants":  [
                                                                     {
                                                                         "models":  8,
                                                                         "points":  90,
                                                                         "label":  "8 models"
                                                                     },
                                                                     {
                                                                         "models":  16,
                                                                         "points":  195,
                                                                         "label":  "16 models"
                                                                     }
                                                                 ]
                                                },
                                                {
                                                    "copyMin":  2,
                                                    "copyMax":  null,
                                                    "variants":  [
                                                                     {
                                                                         "models":  8,
                                                                         "points":  110,
                                                                         "label":  "8 models"
                                                                     },
                                                                     {
                                                                         "models":  16,
                                                                         "points":  215,
                                                                         "label":  "16 models"
                                                                     }
                                                                 ]
                                                }
                                            ]
                          },
    "Chaos Bikers":  {
                         "variants":  [
                                          {
                                              "models":  3,
                                              "points":  70,
                                              "label":  "3 models"
                                          },
                                          {
                                              "models":  6,
                                              "points":  130,
                                              "label":  "6 models"
                                          }
                                      ]
                     },
    "Chaos Land Raider":  {
                              "copyTiers":  [
                                                {
                                                    "copyMin":  1,
                                                    "copyMax":  2,
                                                    "variants":  [
                                                                     {
                                                                         "models":  1,
                                                                         "points":  220,
                                                                         "label":  "1 model"
                                                                     }
                                                                 ]
                                                },
                                                {
                                                    "copyMin":  3,
                                                    "copyMax":  null,
                                                    "variants":  [
                                                                     {
                                                                         "models":  1,
                                                                         "points":  240,
                                                                         "label":  "1 model"
                                                                     }
                                                                 ]
                                                }
                                            ]
                          },
    "Chaos Lord":  {
                       "variants":  [
                                        {
                                            "models":  1,
                                            "points":  90,
                                            "label":  "1 model"
                                        }
                                    ]
                   },
    "Chaos Lord In Terminator Armour":  {
                                            "variants":  [
                                                             {
                                                                 "models":  1,
                                                                 "points":  85,
                                                                 "label":  "1 model"
                                                             }
                                                         ]
                                        },
    "Chaos Lord with Jump Pack":  {
                                      "variants":  [
                                                       {
                                                           "models":  1,
                                                           "points":  90,
                                                           "label":  "1 model"
                                                       }
                                                   ]
                                  },
    "Chaos Predator Annihilator":  {
                                       "copyTiers":  [
                                                         {
                                                             "copyMin":  1,
                                                             "copyMax":  2,
                                                             "variants":  [
                                                                              {
                                                                                  "models":  1,
                                                                                  "points":  135,
                                                                                  "label":  "1 model"
                                                                              }
                                                                          ]
                                                         },
                                                         {
                                                             "copyMin":  3,
                                                             "copyMax":  null,
                                                             "variants":  [
                                                                              {
                                                                                  "models":  1,
                                                                                  "points":  145,
                                                                                  "label":  "1 model"
                                                                              }
                                                                          ]
                                                         }
                                                     ]
                                   },
    "Chaos Predator Destructor":  {
                                      "copyTiers":  [
                                                        {
                                                            "copyMin":  1,
                                                            "copyMax":  2,
                                                            "variants":  [
                                                                             {
                                                                                 "models":  1,
                                                                                 "points":  140,
                                                                                 "label":  "1 model"
                                                                             }
                                                                         ]
                                                        },
                                                        {
                                                            "copyMin":  3,
                                                            "copyMax":  null,
                                                            "variants":  [
                                                                             {
                                                                                 "models":  1,
                                                                                 "points":  150,
                                                                                 "label":  "1 model"
                                                                             }
                                                                         ]
                                                        }
                                                    ]
                                  },
    "Chaos Rhino":  {
                        "variants":  [
                                         {
                                             "models":  1,
                                             "points":  75,
                                             "label":  "1 model"
                                         }
                                     ]
                    },
    "Chaos Spawn":  {
                        "variants":  [
                                         {
                                             "models":  2,
                                             "points":  60,
                                             "label":  "2 models"
                                         }
                                     ]
                    },
    "Chaos Terminator Squad":  {
                                   "variants":  [
                                                    {
                                                        "models":  5,
                                                        "points":  180,
                                                        "label":  "5 models"
                                                    },
                                                    {
                                                        "models":  10,
                                                        "points":  360,
                                                        "label":  "10 models"
                                                    }
                                                ]
                               },
    "Chaos Vindicator":  {
                             "copyTiers":  [
                                               {
                                                   "copyMin":  1,
                                                   "copyMax":  2,
                                                   "variants":  [
                                                                    {
                                                                        "models":  1,
                                                                        "points":  185,
                                                                        "label":  "1 model"
                                                                    }
                                                                ]
                                               },
                                               {
                                                   "copyMin":  3,
                                                   "copyMax":  null,
                                                   "variants":  [
                                                                    {
                                                                        "models":  1,
                                                                        "points":  195,
                                                                        "label":  "1 model"
                                                                    }
                                                                ]
                                               }
                                           ]
                         },
    "Chosen":  {
                   "copyTiers":  [
                                     {
                                         "copyMin":  1,
                                         "copyMax":  1,
                                         "variants":  [
                                                          {
                                                              "models":  5,
                                                              "points":  125,
                                                              "label":  "5 models"
                                                          },
                                                          {
                                                              "models":  10,
                                                              "points":  250,
                                                              "label":  "10 models"
                                                          }
                                                      ]
                                     },
                                     {
                                         "copyMin":  2,
                                         "copyMax":  null,
                                         "variants":  [
                                                          {
                                                              "models":  5,
                                                              "points":  135,
                                                              "label":  "5 models"
                                                          },
                                                          {
                                                              "models":  10,
                                                              "points":  260,
                                                              "label":  "10 models"
                                                          }
                                                      ]
                                     }
                                 ]
               },
    "Cultist Firebrand":  {
                              "copyTiers":  [
                                                {
                                                    "copyMin":  1,
                                                    "copyMax":  2,
                                                    "variants":  [
                                                                     {
                                                                         "models":  1,
                                                                         "points":  45,
                                                                         "label":  "1 model"
                                                                     }
                                                                 ]
                                                },
                                                {
                                                    "copyMin":  3,
                                                    "copyMax":  null,
                                                    "variants":  [
                                                                     {
                                                                         "models":  1,
                                                                         "points":  50,
                                                                         "label":  "1 model"
                                                                     }
                                                                 ]
                                                }
                                            ]
                          },
    "Cultist Mob":  {
                        "variants":  [
                                         {
                                             "models":  10,
                                             "points":  50,
                                             "label":  "10 models"
                                         },
                                         {
                                             "models":  20,
                                             "points":  90,
                                             "label":  "20 models"
                                         }
                                     ]
                    },
    "Cypher":  {
                   "variants":  [
                                    {
                                        "models":  1,
                                        "points":  90,
                                        "label":  "1 model"
                                    }
                                ]
               },
    "Dark Apostle":  {
                          "variants":  [
                                           {
                                               "models":  3,
                                               "points":  65,
                                               "label":  "3 models"
                                           }
                                       ]
                      },
    "Dark Commune":  {
                         "copyTiers":  [
                                           {
                                               "copyMin":  1,
                                               "copyMax":  1,
                                               "variants":  [
                                                                {
                                                                    "models":  5,
                                                                    "points":  90,
                                                                    "label":  "5 models"
                                                                }
                                                            ]
                                           },
                                           {
                                               "copyMin":  2,
                                               "copyMax":  null,
                                               "variants":  [
                                                                {
                                                                    "models":  5,
                                                                    "points":  100,
                                                                    "label":  "5 models"
                                                                }
                                                            ]
                                           }
                                       ]
                     },
    "Defiler":  {
                    "copyTiers":  [
                                      {
                                          "copyMin":  1,
                                          "copyMax":  1,
                                          "variants":  [
                                                           {
                                                               "models":  1,
                                                               "points":  300,
                                                               "label":  "1 model"
                                                           }
                                                       ]
                                      },
                                      {
                                          "copyMin":  2,
                                          "copyMax":  null,
                                          "variants":  [
                                                           {
                                                               "models":  1,
                                                               "points":  330,
                                                               "label":  "1 model"
                                                           }
                                                       ]
                                      }
                                  ],
                    "wargearSurcharges":  {
                                             "reaper autocannon":  {
                                                                       "label":  "Heavy reaper autocannon",
                                                                       "perItem":  10
                                                                   },
                                             "twin lascannon":  {
                                                                    "label":  "Hades lascannon",
                                                                    "perItem":  10
                                                                }
                                         }
                },
    "Fabius Bile":  {
                        "variants":  [
                                         {
                                             "models":  2,
                                             "points":  100,
                                             "label":  "2 models"
                                         }
                                     ]
                    },
    "Fellgor Beastmen":  {
                             "variants":  [
                                              {
                                                  "models":  10,
                                                  "points":  60,
                                                  "label":  "10 models"
                                              }
                                          ]
                         },
    "Forgefiend":  {
                       "copyTiers":  [
                                         {
                                             "copyMin":  1,
                                             "copyMax":  2,
                                             "variants":  [
                                                              {
                                                                  "models":  1,
                                                                  "points":  160,
                                                                  "label":  "1 model"
                                                              }
                                                          ]
                                         },
                                         {
                                             "copyMin":  3,
                                             "copyMax":  null,
                                             "variants":  [
                                                              {
                                                                  "models":  1,
                                                                  "points":  170,
                                                                  "label":  "1 model"
                                                              }
                                                          ]
                                         }
                                     ],
                       "wargearSurcharges":  {
                                                "ectoplasma cannon":  {
                                                                          "label":  "Ectoplasma cannon",
                                                                          "perItem":  5
                                                                      }
                                            }
                   },
    "Haarken Worldclaimer":  {
                                 "variants":  [
                                                  {
                                                      "models":  1,
                                                      "points":  100,
                                                      "label":  "1 model"
                                                  }
                                              ]
                             },
    "Havocs":  {
                   "variants":  [
                                    {
                                        "models":  5,
                                        "points":  90,
                                        "label":  "5 models"
                                    }
                                ]
               },
    "Helbrute":  {
                     "copyTiers":  [
                                       {
                                           "copyMin":  1,
                                           "copyMax":  2,
                                           "variants":  [
                                                            {
                                                                "models":  1,
                                                                "points":  125,
                                                                "label":  "1 model"
                                                            }
                                                        ]
                                       },
                                       {
                                           "copyMin":  3,
                                           "copyMax":  null,
                                           "variants":  [
                                                            {
                                                                "models":  1,
                                                                "points":  135,
                                                                "label":  "1 model"
                                                            }
                                                        ]
                                       }
                                   ]
                 },
    "Heldrake":  {
                     "variants":  [
                                      {
                                          "models":  1,
                                          "points":  130,
                                          "label":  "1 model"
                                      }
                                  ]
                 },
    "Heretic Astartes Daemon Prince":  {
                                           "variants":  [
                                                            {
                                                                "models":  1,
                                                                "points":  175,
                                                                "label":  "1 model"
                                                            }
                                                        ]
                                       },
    "Heretic Astartes Daemon Prince With Wings":  {
                                                      "variants":  [
                                                                       {
                                                                           "models":  1,
                                                                           "points":  165,
                                                                           "label":  "1 model"
                                                                       }
                                                                   ]
                                                  },
    "Huron Blackheart":  {
                             "variants":  [
                                              {
                                                  "models":  1,
                                                  "points":  180,
                                                  "label":  "1 model"
                                              }
                                          ]
                         },
    "Khorne Lord Of Skulls":  {
                                  "copyTiers":  [
                                                    {
                                                        "copyMin":  1,
                                                        "copyMax":  1,
                                                        "variants":  [
                                                                         {
                                                                             "models":  1,
                                                                             "points":  450,
                                                                             "label":  "1 model"
                                                                         }
                                                                     ]
                                                    },
                                                    {
                                                        "copyMin":  2,
                                                        "copyMax":  null,
                                                        "variants":  [
                                                                         {
                                                                             "models":  1,
                                                                             "points":  475,
                                                                             "label":  "1 model"
                                                                         }
                                                                     ]
                                                    }
                                                ]
                              },
    "Legionaries":  {
                        "variants":  [
                                         {
                                             "models":  5,
                                             "points":  90,
                                             "label":  "5 models"
                                         },
                                         {
                                             "models":  10,
                                             "points":  170,
                                             "label":  "10 models"
                                         }
                                     ]
                    },
    "Lord Discordant On Helstalker":  {
                                          "variants":  [
                                                           {
                                                               "models":  1,
                                                               "points":  160,
                                                               "label":  "1 model"
                                                           }
                                                       ]
                                      },
    "Master Of Executions":  {
                                 "variants":  [
                                                  {
                                                      "models":  1,
                                                      "points":  70,
                                                      "label":  "1 model"
                                                  }
                                              ]
                             },
    "Master Of Possession":  {
                                 "variants":  [
                                                  {
                                                      "models":  1,
                                                      "points":  60,
                                                      "label":  "1 model"
                                                  }
                                              ]
                             },
    "Masters of the Maelstrom":  {
                                     "variants":  [
                                                      {
                                                          "models":  5,
                                                          "points":  135,
                                                          "label":  "5 models"
                                                      }
                                                  ]
                                 },
    "Maulerfiend":  {
                        "variants":  [
                                         {
                                             "models":  1,
                                             "points":  130,
                                             "label":  "1 model"
                                         }
                                     ]
                    },
    "Nemesis Claw":  {
                         "variants":  [
                                          {
                                              "models":  5,
                                              "points":  110,
                                              "label":  "5 models"
                                          },
                                          {
                                              "models":  10,
                                              "points":  190,
                                              "label":  "10 models"
                                          }
                                      ]
                     },
    "Noctilith Crown":  {
                            "variants":  [
                                             {
                                                 "models":  1,
                                                 "points":  125,
                                                 "label":  "1 model"
                                             }
                                         ]
                        },
    "Obliterators":  {
                         "copyTiers":  [
                                           {
                                               "copyMin":  1,
                                               "copyMax":  2,
                                               "variants":  [
                                                                {
                                                                    "models":  2,
                                                                    "points":  160,
                                                                    "label":  "2 models"
                                                                }
                                                            ]
                                           },
                                           {
                                               "copyMin":  3,
                                               "copyMax":  null,
                                               "variants":  [
                                                                {
                                                                    "models":  2,
                                                                    "points":  170,
                                                                    "label":  "2 models"
                                                                }
                                                            ]
                                           }
                                       ]
                     },
    "Possessed":  {
                      "copyTiers":  [
                                        {
                                            "copyMin":  1,
                                            "copyMax":  2,
                                            "variants":  [
                                                             {
                                                                 "models":  5,
                                                                 "points":  120,
                                                                 "label":  "5 models"
                                                             },
                                                             {
                                                                 "models":  10,
                                                                 "points":  250,
                                                                 "label":  "10 models"
                                                             }
                                                         ]
                                        },
                                        {
                                            "copyMin":  3,
                                            "copyMax":  null,
                                            "variants":  [
                                                             {
                                                                 "models":  5,
                                                                 "points":  130,
                                                                 "label":  "5 models"
                                                             },
                                                             {
                                                                 "models":  10,
                                                                 "points":  260,
                                                                 "label":  "10 models"
                                                             }
                                                         ]
                                        }
                                    ]
                  },
    "Raptors":  {
                    "copyTiers":  [
                                      {
                                          "copyMin":  1,
                                          "copyMax":  2,
                                          "variants":  [
                                                           {
                                                               "models":  5,
                                                               "points":  110,
                                                               "label":  "5 models"
                                                           },
                                                           {
                                                               "models":  10,
                                                               "points":  210,
                                                               "label":  "10 models"
                                                           }
                                                       ]
                                      },
                                      {
                                          "copyMin":  3,
                                          "copyMax":  null,
                                          "variants":  [
                                                           {
                                                               "models":  5,
                                                               "points":  120,
                                                               "label":  "5 models"
                                                           },
                                                           {
                                                               "models":  10,
                                                               "points":  220,
                                                               "label":  "10 models"
                                                           }
                                                       ]
                                      }
                                  ]
                },
    "Red Corsairs Raiders":  {
                                 "copyTiers":  [
                                                   {
                                                       "copyMin":  1,
                                                       "copyMax":  2,
                                                       "variants":  [
                                                                        {
                                                                            "models":  5,
                                                                            "points":  110,
                                                                            "label":  "5 models"
                                                                        },
                                                                        {
                                                                            "models":  10,
                                                                            "points":  210,
                                                                            "label":  "10 models"
                                                                        }
                                                                    ]
                                                   },
                                                   {
                                                       "copyMin":  3,
                                                       "copyMax":  null,
                                                       "variants":  [
                                                                        {
                                                                            "models":  5,
                                                                            "points":  120,
                                                                            "label":  "5 models"
                                                                        },
                                                                        {
                                                                            "models":  10,
                                                                            "points":  220,
                                                                            "label":  "10 models"
                                                                        }
                                                                    ]
                                                   }
                                               ]
                             },
    "Red Corsairs Reave-Captain":  {
                                      "variants":  [
                                                       {
                                                           "models":  1,
                                                           "points":  70,
                                                           "label":  "1 model"
                                                       }
                                                   ]
                                  },
    "Sorcerer":  {
                     "variants":  [
                                      {
                                          "models":  1,
                                          "points":  60,
                                          "label":  "1 model"
                                      }
                                  ]
                 },
    "Sorcerer In Terminator Armour":  {
                                          "variants":  [
                                                           {
                                                               "models":  1,
                                                               "points":  80,
                                                               "label":  "1 model"
                                                           }
                                                       ]
                                      },
    "Traitor Enforcer":  {
                             "variants":  [
                                              {
                                                  "models":  2,
                                                  "points":  70,
                                                  "label":  "2 models"
                                              }
                                          ]
                         },
    "Traitor Guardsmen Squad":  {
                                    "variants":  [
                                                     {
                                                         "models":  10,
                                                         "points":  70,
                                                         "label":  "10 models"
                                                     }
                                                 ]
                                },
    "Vashtorr The Arkifane":  {
                                  "variants":  [
                                                   {
                                                       "models":  1,
                                                       "points":  205,
                                                       "label":  "1 model"
                                                   }
                                               ]
                              },
    "Venomcrawler":  {
                         "copyTiers":  [
                                           {
                                               "copyMin":  1,
                                               "copyMax":  2,
                                               "variants":  [
                                                                {
                                                                    "models":  1,
                                                                    "points":  110,
                                                                    "label":  "1 model"
                                                                }
                                                            ]
                                           },
                                           {
                                               "copyMin":  3,
                                               "copyMax":  null,
                                               "variants":  [
                                                                {
                                                                    "models":  1,
                                                                    "points":  120,
                                                                    "label":  "1 model"
                                                                }
                                                            ]
                                           }
                                       ]
                     },
    "Warpsmith":  {
                      "variants":  [
                                       {
                                           "models":  1,
                                           "points":  60,
                                           "label":  "1 model"
                                       }
                                   ]
                  },
    "Warp Talons":  {
                        "copyTiers":  [
                                          {
                                              "copyMin":  1,
                                              "copyMax":  2,
                                              "variants":  [
                                                               {
                                                                   "models":  5,
                                                                   "points":  125,
                                                                   "label":  "5 models"
                                                               },
                                                               {
                                                                   "models":  10,
                                                                   "points":  280,
                                                                   "label":  "10 models"
                                                               }
                                                           ]
                                          },
                                          {
                                              "copyMin":  3,
                                              "copyMax":  null,
                                              "variants":  [
                                                               {
                                                                   "models":  5,
                                                                   "points":  135,
                                                                   "label":  "5 models"
                                                               },
                                                               {
                                                                   "models":  10,
                                                                   "points":  290,
                                                                   "label":  "10 models"
                                                               }
                                                           ]
                                          }
                                      ]
                    }
}
);

// Official 11th-edition CSM page currently omits some older cross-faction units still present in the app.
// Supplemental overrides for newly supported units and any future cult-data alignment live in
// `data/points/chaos-space-marines-additional-overrides.js`.
