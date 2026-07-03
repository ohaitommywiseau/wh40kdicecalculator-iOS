window.WH40K_UNIT_COMPOSITION_DATABASE = window.WH40K_UNIT_COMPOSITION_DATABASE || { byFaction: {} };
window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction = window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction || {};
window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction["chaos-space-marines"] =
  window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction["chaos-space-marines"] || {
    faction: { id: "CSM", name: "Chaos Space Marines", slug: "chaos-space-marines" },
    units: {},
    missing: []
  };

Object.assign(window.WH40K_UNIT_COMPOSITION_DATABASE.byFaction["chaos-space-marines"].units, {
  "Kravek Morne": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/chaos-space-marines/Kravek-Morne",
    text: "1 Kravek Morne - EPIC HERO\nThis model is equipped with: baleflamer; combi-bolter; servo-harness; Last Argument and power fist.",
    lines: ["1 Kravek Morne - EPIC HERO"],
    counts: {
      allowed: [1],
      min: 1,
      max: 1,
      sources: [{ min: 1, max: 1, source: "1 Kravek Morne - EPIC HERO" }]
    }
  },
  "Mutilators": {
    datasheet: "https://wahapedia.ru/wh40k10ed/factions/chaos-space-marines/Mutilators",
    text: "3 Mutilators\nEvery model is equipped with: fleshmetal weapons.",
    lines: ["3 Mutilators"],
    counts: {
      allowed: [3],
      min: 3,
      max: 3,
      sources: [{ min: 3, max: 3, source: "3 Mutilators" }]
    }
  }
});
