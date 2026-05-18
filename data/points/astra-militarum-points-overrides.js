window.WH40K_POINTS_DATABASE = window.WH40K_POINTS_DATABASE || { byFaction: {} };
window.WH40K_POINTS_DATABASE.byFaction = window.WH40K_POINTS_DATABASE.byFaction || {};
window.WH40K_POINTS_DATABASE.byFaction["astra-militarum"] =
  window.WH40K_POINTS_DATABASE.byFaction["astra-militarum"] || {
    faction: { id: "AM", name: "Astra Militarum", slug: "astra-militarum" },
    units: {},
    missing: []
  };

Object.assign(window.WH40K_POINTS_DATABASE.byFaction["astra-militarum"].units, {
  "Aegis Defence Line": {
    sourceName: "Aegis Defence Line",
    variants: [{ models: 1, points: 145, label: "1 model" }]
  },
  "Cadian Recon Squad": {
    sourceName: "Cadian Recon Squad",
    variants: [{ models: 10, points: 80, label: "10 models" }]
  },
  "Centaur RSV": {
    sourceName: "Centaur RSV",
    variants: [{ models: 1, points: 85, label: "1 model" }]
  },
  "Commissar Graves": {
    sourceName: "Commissar Graves",
    variants: [{ models: 1, points: 110, label: "1 model" }]
  },
  "Commissar Graves on Foot": {
    sourceName: "Commissar Graves on Foot",
    variants: [{ models: 1, points: 65, label: "1 model" }]
  },
  "Commissar Yarrick": {
    sourceName: "Commissar Yarrick",
    variants: [{ models: 1, points: 150, label: "1 model" }]
  },
  "Cyclops Demolition Vehicle": {
    sourceName: "Cyclops Demolition Vehicle",
    variants: [{ models: 1, points: 25, label: "1 model" }]
  },
  "Hippogriff AFV": {
    sourceName: "Hippogriff AFV",
    variants: [
      { models: 1, points: 70, label: "1 model" },
      { models: 2, points: 140, label: "2 models" }
    ]
  }
});
