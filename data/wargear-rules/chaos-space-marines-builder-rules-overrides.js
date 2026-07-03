(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};
  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);

  registry['chaos-space-marines'] = registry['chaos-space-marines'] || {};

  Object.assign(registry['chaos-space-marines'], {
    'Kravek Morne': {
      sections: [{ title: 'Unit loadout', description: 'Kravek Morne has a fixed loadout.', controls: [] }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'baleflamer', 1);
        add(ctx, q, 'combi-bolter', 1);
        add(ctx, q, 'last argument and power fist', 1);
        add(ctx, q, 'servo-harness', 1);
        return q;
      }
    },
    'Mutilators': {
      sections: [{ title: 'Unit loadout', description: 'Every Mutilator is equipped with fleshmetal weapons.', controls: [] }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'fleshmetal weapons - clawed sweeps', ctx.modelCount);
        add(ctx, q, 'fleshmetal weapons - rending strikes', ctx.modelCount);
        add(ctx, q, 'fleshmetal weapons - thunderous blows', ctx.modelCount);
        return q;
      }
    }
  });
}());
