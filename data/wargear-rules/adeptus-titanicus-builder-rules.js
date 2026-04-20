(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);
  const number = (ctx, key) => ctx.number(key);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;

  registry['adeptus-titanicus'] = {
    'Warhound Titan': {
      sections: [{
        title: 'Warhound weapon mounts',
        description: 'Select exactly two Warhound arm weapons.',
        controls: [
          { key: 'plasma', label: 'Warhound plasma blastgun', max: 2 },
          { key: 'vulcan', label: 'Warhound vulcan mega-bolter', max: 2 },
          { key: 'inferno', label: 'Warhound inferno gun', max: 2 },
          { key: 'turbo_laser', label: 'Warhound turbo-laser destructor', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const plasma = number(ctx, 'plasma');
        const vulcan = number(ctx, 'vulcan');
        const inferno = number(ctx, 'inferno');
        const turbo = number(ctx, 'turbo_laser');
        const total = plasma + vulcan + inferno + turbo;
        if (total !== 2) ctx.errors.push(`Warhound Titan weapon selections must total 2; currently ${total}.`);
        add(ctx, q, 'warhound plasma blastgun – standard', plasma);
        add(ctx, q, 'warhound plasma blastgun – supercharge', plasma);
        add(ctx, q, 'warhound vulcan mega-bolter', vulcan);
        add(ctx, q, 'warhound inferno gun', inferno);
        add(ctx, q, 'warhound turbo-laser destructor', turbo);
        add(ctx, q, 'warhound feet', 1);
        return q;
      }
    },

    'Reaver Titan': {
      sections: [{
        title: 'Carapace mount',
        description: 'Select the Reaver Titan carapace weapon.',
        controls: [
          { type: 'select', key: 'carapace', label: 'Carapace weapon', value: 'reaver apocalypse launcher', options: [
            { value: 'reaver apocalypse launcher', label: 'Reaver apocalypse launcher' }
          ] }
        ]
      }, {
        title: 'Arm weapons',
        description: 'Select exactly two Reaver arm weapons.',
        controls: [
          { key: 'gatling', label: 'Reaver gatling blaster', max: 2 },
          { key: 'laser', label: 'Reaver laser blaster', max: 2 },
          { key: 'melta', label: 'Reaver melta cannon', max: 2 },
          { key: 'volcano', label: 'Reaver volcano cannon', max: 2 },
          { key: 'fist', label: 'Reaver power fist', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gatling = number(ctx, 'gatling');
        const laser = number(ctx, 'laser');
        const melta = number(ctx, 'melta');
        const volcano = number(ctx, 'volcano');
        const fist = number(ctx, 'fist');
        const total = gatling + laser + melta + volcano + fist;
        if (total !== 2) ctx.errors.push(`Reaver Titan arm weapon selections must total 2; currently ${total}.`);
        add(ctx, q, select(ctx, 'carapace', 'reaver apocalypse launcher'), 1);
        add(ctx, q, 'reaver gatling blaster', gatling);
        add(ctx, q, 'reaver laser blaster', laser);
        add(ctx, q, 'reaver melta cannon', melta);
        add(ctx, q, 'reaver volcano cannon', volcano);
        add(ctx, q, 'reaver power fist – strike', fist);
        add(ctx, q, 'reaver power fist – sweep', fist);
        add(ctx, q, 'reaver feet', 1);
        return q;
      }
    },

    'Warbringer Nemesis Titan': {
      sections: [{
        title: 'Nemesis carapace weapon',
        description: 'Select the Warbringer Nemesis Titan primary carapace weapon.',
        controls: [
          { type: 'select', key: 'carapace', label: 'Carapace weapon', value: 'nemesis quake cannon', options: [
            { value: 'nemesis quake cannon', label: 'Nemesis quake cannon' },
            { value: 'nemesis volcano cannon', label: 'Nemesis volcano cannon' }
          ] }
        ]
      }, {
        title: 'Arm weapons',
        description: 'Select exactly two Reaver-class arm weapons.',
        controls: [
          { key: 'gatling', label: 'Reaver gatling blaster', max: 2 },
          { key: 'laser', label: 'Reaver laser blaster', max: 2 },
          { key: 'melta', label: 'Reaver melta cannon', max: 2 },
          { key: 'volcano', label: 'Reaver volcano cannon', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gatling = number(ctx, 'gatling');
        const laser = number(ctx, 'laser');
        const melta = number(ctx, 'melta');
        const volcano = number(ctx, 'volcano');
        const total = gatling + laser + melta + volcano;
        if (total !== 2) ctx.errors.push(`Warbringer Nemesis Titan arm weapon selections must total 2; currently ${total}.`);
        add(ctx, q, 'anvillus defence battery', 2);
        add(ctx, q, 'ardex-defensor mauler', 3);
        add(ctx, q, select(ctx, 'carapace', 'nemesis quake cannon'), 1);
        add(ctx, q, 'reaver gatling blaster', gatling);
        add(ctx, q, 'reaver laser blaster', laser);
        add(ctx, q, 'reaver melta cannon', melta);
        add(ctx, q, 'reaver volcano cannon', volcano);
        add(ctx, q, 'nemesis feet', 1);
        return q;
      }
    },

    'Warlord Titan': {
      sections: [{
        title: 'Carapace batteries',
        description: 'The Warlord retains its paired apocalypse launchers, paired ardex-defensor lascannons, and paired ardex-defensor maulers from the seeded datasheet export.',
        controls: []
      }, {
        title: 'Arm weapons',
        description: 'Select exactly two Warlord arm weapons.',
        controls: [
          { key: 'macro_gatling', label: 'Macro gatling blaster', max: 2 },
          { key: 'power_claw', label: 'Arioch power claw', max: 2 },
          { key: 'belicosa', label: 'Belicosa volcano cannon', max: 2 },
          { key: 'laser_blaster', label: 'Laser blaster', max: 2 },
          { key: 'mori', label: 'Mori quake cannon', max: 2 },
          { key: 'sunfury', label: 'Sunfury plasma annihilator', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const macro = number(ctx, 'macro_gatling');
        const claw = number(ctx, 'power_claw');
        const belicosa = number(ctx, 'belicosa');
        const laser = number(ctx, 'laser_blaster');
        const mori = number(ctx, 'mori');
        const sunfury = number(ctx, 'sunfury');
        const total = macro + claw + belicosa + laser + mori + sunfury;
        if (total !== 2) ctx.errors.push(`Warlord Titan arm weapon selections must total 2; currently ${total}.`);
        add(ctx, q, 'apocalypse launcher', 2);
        add(ctx, q, 'ardex-defensor lascannon', 2);
        add(ctx, q, 'ardex-defensor mauler', 2);
        add(ctx, q, 'macro gatling blaster', macro);
        add(ctx, q, 'arioch power claw – strike', claw);
        add(ctx, q, 'arioch power claw – sweep', claw);
        add(ctx, q, 'belicosa volcano cannon', belicosa);
        add(ctx, q, 'laser blaster', laser);
        add(ctx, q, 'mori quake cannon', mori);
        add(ctx, q, 'sunfury plasma annihilator – standard', sunfury);
        add(ctx, q, 'sunfury plasma annihilator – supercharge', sunfury);
        add(ctx, q, 'warlord feet', 1);
        return q;
      }
    }
  };
}());
