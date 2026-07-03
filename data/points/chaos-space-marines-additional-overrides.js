window.WH40K_POINTS_DATABASE = window.WH40K_POINTS_DATABASE || { byFaction: {} };
window.WH40K_POINTS_DATABASE.byFaction = window.WH40K_POINTS_DATABASE.byFaction || {};
window.WH40K_POINTS_DATABASE.byFaction["chaos-space-marines"] =
  window.WH40K_POINTS_DATABASE.byFaction["chaos-space-marines"] || {
    faction: { id: "CSM", name: "Chaos Space Marines", slug: "chaos-space-marines" },
    units: {},
    missing: []
  };

Object.assign(window.WH40K_POINTS_DATABASE.byFaction["chaos-space-marines"].units, {
  "Kravek Morne": {
    "variants": [
      {
        "models": 1,
        "points": 120,
        "label": "1 model"
      }
    ]
  },
  "Mutilators": {
    "copyTiers": [
      {
        "copyMin": 1,
        "copyMax": 2,
        "variants": [
          {
            "models": 3,
            "points": 180,
            "label": "3 models"
          }
        ]
      },
      {
        "copyMin": 3,
        "copyMax": null,
        "variants": [
          {
            "models": 3,
            "points": 190,
            "label": "3 models"
          }
        ]
      }
    ]
  }
});
