window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || { byFaction: {} };
window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction = window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction || {};
window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction["astra-militarum"] =
  window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction["astra-militarum"] || {
    faction: { id: "AM", name: "Astra Militarum", slug: "astra-militarum" },
    units: {},
    missing: []
  };

Object.assign(window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction["astra-militarum"].units, {
  "Aegis Defence Line": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Aegis-Defence-Line",
    text: "1 Aegis Defence Line",
    lines: ["1 Aegis Defence Line"],
    counts: {
      allowed: [1],
      min: 1,
      max: 1,
      sources: [{ min: 1, max: 1, source: "1 Aegis Defence Line" }]
    }
  },
  "Cadian Recon Squad": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Cadian-Recon-Squad",
    text: "1 Recon Sergeant model\n9 Recon Trooper models\nEach model is equipped with: lasgun; close combat weapon.",
    lines: ["1 Recon Sergeant model", "9 Recon Trooper models"],
    counts: {
      allowed: [10],
      min: 10,
      max: 10,
      sources: [{ min: 10, max: 10, source: "1 Recon Sergeant model + 9 Recon Trooper models" }]
    }
  },
  "Centaur RSV": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Centaur-RSV",
    text: "1 Centaur RSV\nThis model is equipped with: 1 pintle-mounted heavy stubber; 1 armoured hull.",
    lines: ["1 Centaur RSV"],
    counts: {
      allowed: [1],
      min: 1,
      max: 1,
      sources: [{ min: 1, max: 1, source: "1 Centaur RSV" }]
    }
  },
  "Commissar Graves": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Commissar-Graves",
    text: "1 Commissar Graves - EPIC HERO\nThis model is equipped with: 1 chiron gatling cannon; 2 Prefectus heavy stubbers; 1 power sword and Manus Mortis; 1 Enforcer crew; 1 armoured hull; 1 aquiline prow.",
    lines: ["1 Commissar Graves - EPIC HERO"],
    counts: {
      allowed: [1],
      min: 1,
      max: 1,
      sources: [{ min: 1, max: 1, source: "1 Commissar Graves - EPIC HERO" }]
    }
  },
  "Commissar Graves on Foot": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Commissar-Graves-on-Foot",
    text: "1 Commissar Graves on Foot - EPIC HERO\nThis model is equipped with: 1 bolt pistol; 1 power sword and Manus Mortis.",
    lines: ["1 Commissar Graves on Foot - EPIC HERO"],
    counts: {
      allowed: [1],
      min: 1,
      max: 1,
      sources: [{ min: 1, max: 1, source: "1 Commissar Graves on Foot - EPIC HERO" }]
    }
  },
  "Commissar Yarrick": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Commissar-Yarrick",
    text: "1 Commissar Yarrick - EPIC HERO\nThis model is equipped with: 1 storm bolter; 1 laspistol; 1 Bale Eye; 1 power klaw; 1 power sword.",
    lines: ["1 Commissar Yarrick - EPIC HERO"],
    counts: {
      allowed: [1],
      min: 1,
      max: 1,
      sources: [{ min: 1, max: 1, source: "1 Commissar Yarrick - EPIC HERO" }]
    }
  },
  "Cyclops Demolition Vehicle": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Cyclops-Demolition-Vehicle",
    text: "1 Cyclops Demolition Vehicle\nThis model is equipped with: nothing.",
    lines: ["1 Cyclops Demolition Vehicle"],
    counts: {
      allowed: [1],
      min: 1,
      max: 1,
      sources: [{ min: 1, max: 1, source: "1 Cyclops Demolition Vehicle" }]
    }
  },
  "Hippogriff AFV": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/astra-militarum/Hippogriff-AFV",
    text: "1-2 Hippogriff AFV\nEvery model is equipped with: 1 vigilator cannon; 1 heavy stubber; 1 armoured hull.",
    lines: ["1-2 Hippogriff AFV"],
    counts: {
      allowed: [1, 2],
      min: 1,
      max: 2,
      sources: [{ min: 1, max: 2, source: "1-2 Hippogriff AFV" }]
    }
  }
});
