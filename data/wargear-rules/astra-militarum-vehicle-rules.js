(function () {
  const configs = window.ASTRA_MILITARUM_INFANTRY_RULE_CONFIGS = window.ASTRA_MILITARUM_INFANTRY_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount = 1) => ctx.add(q, key, amount);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;

  const hullWeaponOptions = [
    { value: 'heavy bolter', label: 'Heavy bolter' },
    { value: 'heavy flamer', label: 'Heavy flamer' },
  ];

  const hunterKillerOptions = [
    { value: '', label: 'None' },
    { value: 'hunter-killer missile', label: 'Hunter-killer missile' },
  ];

  function artilleryChassis(mainWeapon, mainLabel) {
    return {
      sections: [{
        title: 'Main weapon',
        description: `Fixed loadout: ${mainLabel}. No available wargear options.`,
      }, {
        title: 'Hull weapon',
        description: "This model's heavy bolter can be replaced with 1 heavy flamer.",
        controls: [{ type: 'select', key: 'hull', label: 'Hull weapon', value: 'heavy bolter', options: hullWeaponOptions }],
      }, {
        title: 'One-shot missile',
        description: 'This model can be equipped with 1 hunter-killer missile.',
        controls: [{ type: 'select', key: 'hunter', label: 'Hunter-killer missile', value: '', options: hunterKillerOptions }],
      }, {
        title: 'Chassis',
        description: 'Fixed loadout: armoured tracks. No available wargear options.',
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, mainWeapon, 1);
        add(ctx, q, select(ctx, 'hull', 'heavy bolter'), 1);
        add(ctx, q, 'armoured tracks', 1);
        add(ctx, q, select(ctx, 'hunter', ''), 1);
        return q;
      },
    };
  }

  Object.assign(configs, {
    'Chimera': {
      sections: [{
        title: 'Turret weapon',
        description: "This model's multi-laser can be replaced with one of the following: 1 heavy bolter; 1 heavy flamer. This weapon cannot be replaced.",
        controls: [{ type: 'select', key: 'turret', label: 'Turret weapon', value: 'multi-laser', options: [
          { value: 'multi-laser', label: 'Multi-laser' },
          { value: 'heavy bolter', label: 'Heavy bolter' },
          { value: 'heavy flamer', label: 'Heavy flamer' },
        ] }],
      }, {
        title: 'Hull weapon',
        description: "This model's heavy bolter can be replaced with 1 heavy flamer.",
        controls: [{ type: 'select', key: 'hull', label: 'Hull weapon', value: 'heavy bolter', options: hullWeaponOptions }],
      }, {
        title: 'Pintle weapon',
        description: 'This model can be equipped with one of the following: 1 heavy stubber; 1 storm bolter.',
        controls: [{ type: 'select', key: 'pintle', label: 'Pintle weapon', value: '', options: [
          { value: '', label: 'None' },
          { value: 'heavy stubber', label: 'Heavy stubber' },
          { value: 'storm bolter', label: 'Storm bolter' },
        ] }],
      }, {
        title: 'One-shot missile',
        description: 'This model can be equipped with 1 hunter-killer missile.',
        controls: [{ type: 'select', key: 'hunter', label: 'Hunter-killer missile', value: '', options: hunterKillerOptions }],
      }, {
        title: 'Transport weapons',
        description: 'Fixed loadout: lasgun array and armoured tracks. No available wargear options.',
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'turret', 'multi-laser'), 1);
        add(ctx, q, select(ctx, 'hull', 'heavy bolter'), 1);
        add(ctx, q, 'lasgun array', 1);
        add(ctx, q, 'armoured tracks', 1);
        add(ctx, q, select(ctx, 'pintle', ''), 1);
        add(ctx, q, select(ctx, 'hunter', ''), 1);
        return q;
      },
    },

    'Basilisk': artilleryChassis('earthshaker cannon', 'earthshaker cannon'),
    'Wyvern': artilleryChassis('wyvern quad stormshard mortar', 'Wyvern quad stormshard mortar'),
    'Hydra': artilleryChassis('hydra autocannon', 'Hydra autocannon'),
    'Manticore': artilleryChassis('storm eagle rockets', 'storm eagle rockets'),
    'Deathstrike': artilleryChassis('deathstrike missile', 'Deathstrike missile'),

    'Hellhound': {
      sections: [{
        title: 'Main weapon',
        description: "This model's inferno cannon can be replaced with one of the following: 1 chem cannon; 1 melta cannon.",
        controls: [{ type: 'select', key: 'main', label: 'Main weapon', value: 'inferno cannon', options: [
          { value: 'inferno cannon', label: 'Inferno cannon' },
          { value: 'chem cannon', label: 'Chem cannon' },
          { value: 'melta cannon', label: 'Melta cannon' },
        ] }],
      }, {
        title: 'Hull weapon',
        description: "This model's heavy flamer can be replaced with one of the following: 1 heavy bolter; 1 multi-melta.",
        controls: [{ type: 'select', key: 'hull', label: 'Hull weapon', value: 'heavy flamer', options: [
          { value: 'heavy flamer', label: 'Heavy flamer' },
          { value: 'heavy bolter', label: 'Heavy bolter' },
          { value: 'multi-melta', label: 'Multi-melta' },
        ] }],
      }, {
        title: 'One-shot missile',
        description: 'This model can be equipped with 1 hunter-killer missile.',
        controls: [{ type: 'select', key: 'hunter', label: 'Hunter-killer missile', value: '', options: hunterKillerOptions }],
      }, {
        title: 'Chassis',
        description: 'Fixed loadout: armoured tracks. No available wargear options.',
      }],
      quantities: ctx => { const q = {}; add(ctx, q, select(ctx, 'main', 'inferno cannon'), 1); add(ctx, q, select(ctx, 'hull', 'heavy flamer'), 1); add(ctx, q, 'armoured tracks', 1); add(ctx, q, select(ctx, 'hunter', ''), 1); return q; },
    },

    'Taurox': {
      sections: [{ title: 'Main weapon', description: 'Fixed loadout: twin autocannon. No available wargear options.' }, {
        title: 'Optional weapon',
        description: 'This model can be equipped with 1 storm bolter.',
        controls: [{ type: 'select', key: 'storm', label: 'Storm bolter', value: '', options: [{ value: '', label: 'None' }, { value: 'storm bolter', label: 'Storm bolter' }] }],
      }, { title: 'Chassis', description: 'Fixed loadout: armoured tracks. No available wargear options.' }],
      quantities: ctx => { const q = {}; add(ctx, q, 'twin autocannon', 1); add(ctx, q, 'armoured tracks', 1); add(ctx, q, select(ctx, 'storm', ''), 1); return q; },
    },

    'Taurox Prime': {
      sections: [{
        title: 'Primary weapon',
        description: "This model's Taurox battle cannon can be replaced with one of the following: 1 Taurox gatling cannon; 1 Taurox missile launcher.",
        controls: [{ type: 'select', key: 'primary', label: 'Primary weapon', value: 'taurox battle cannon', options: [
          { value: 'taurox battle cannon', label: 'Taurox battle cannon' },
          { value: 'taurox gatling cannon', label: 'Taurox gatling cannon' },
          { value: 'taurox missile launcher', label: 'Taurox missile launcher' },
        ] }],
      }, {
        title: 'Secondary weapon',
        description: "This model's twin Taurox hot-shot volley gun can be replaced with 1 twin autocannon.",
        controls: [{ type: 'select', key: 'secondary', label: 'Secondary weapon', value: 'twin taurox hot-shot volley gun', options: [
          { value: 'twin taurox hot-shot volley gun', label: 'Twin Taurox hot-shot volley gun' },
          { value: 'twin autocannon', label: 'Twin autocannon' },
        ] }],
      }, {
        title: 'Optional weapon',
        description: 'This model can be equipped with 1 storm bolter.',
        controls: [{ type: 'select', key: 'storm', label: 'Storm bolter', value: '', options: [{ value: '', label: 'None' }, { value: 'storm bolter', label: 'Storm bolter' }] }],
      }, { title: 'Chassis', description: 'Fixed loadout: armoured tracks. No available wargear options.' }],
      quantities: ctx => { const q = {}; add(ctx, q, select(ctx, 'primary', 'taurox battle cannon'), 1); add(ctx, q, select(ctx, 'secondary', 'twin taurox hot-shot volley gun'), 1); add(ctx, q, 'armoured tracks', 1); add(ctx, q, select(ctx, 'storm', ''), 1); return q; },
    },

    'Rogal Dorn Commander': {
      sections: [{
        title: 'Primary turret weapon',
        description: "This model's twin battle cannon can be replaced with 1 oppressor cannon and 1 coaxial autocannon.",
        controls: [{ type: 'select', key: 'dorn_primary', label: 'Primary turret', value: 'twin battle cannon', options: [
          { value: 'twin battle cannon', label: 'Twin battle cannon' },
          { value: 'oppressor cannon', label: 'Oppressor cannon and coaxial autocannon' },
        ] }],
      }, {
        title: 'Secondary turret weapon',
        description: "This model's castigator gatling cannon can be replaced with 1 pulveriser cannon.",
        controls: [{ type: 'select', key: 'dorn_secondary', label: 'Secondary turret', value: 'castigator gatling cannon', options: [
          { value: 'castigator gatling cannon', label: 'Castigator gatling cannon' },
          { value: 'pulveriser cannon', label: 'Pulveriser cannon' },
        ] }],
      }, {
        title: 'Forward mount weapons',
        description: 'This model can be equipped with one of the following: 2 meltaguns; 2 additional heavy stubbers.',
        controls: [{ type: 'select', key: 'dorn_forward', label: 'Forward mounts', value: '', options: [
          { value: '', label: 'None' },
          { value: 'meltagun', label: '2 meltaguns' },
          { value: 'heavy stubber', label: '2 additional heavy stubbers' },
        ] }],
      }, {
        title: 'Side weapons',
        description: 'This model can be equipped with one of the following: 2 heavy bolters; 2 multi-meltas.',
        controls: [{ type: 'select', key: 'dorn_side', label: 'Side weapons', value: '', options: [
          { value: '', label: 'None' },
          { value: 'heavy bolter', label: '2 heavy bolters' },
          { value: 'multi-melta', label: '2 multi-meltas' },
        ] }],
      }, {
        title: 'Pintle and chassis',
        description: 'Fixed loadout: heavy stubber and armoured tracks. No available wargear options.',
      }],
      quantities: ctx => {
        const q = {};
        const primary = select(ctx, 'dorn_primary', 'twin battle cannon');
        add(ctx, q, primary, 1);
        if (primary === 'oppressor cannon') add(ctx, q, 'coaxial autocannon', 1);
        add(ctx, q, select(ctx, 'dorn_secondary', 'castigator gatling cannon'), 1);
        add(ctx, q, 'heavy stubber', 1);
        add(ctx, q, 'armoured tracks', 1);
        add(ctx, q, select(ctx, 'dorn_forward', ''), 2);
        add(ctx, q, select(ctx, 'dorn_side', ''), 2);
        return q;
      },
    },

    ...(() => {
      const superHeavy = (fixedTitle, fixedWeapons) => ({
        sections: [{
          title: 'Fixed weapons',
          description: `Fixed loadout: ${fixedTitle}.`,
        }, {
          title: 'Base sponson weapons',
          description: "This model's 2 twin heavy flamers can be replaced with 2 twin heavy bolters.",
          controls: [{ type: 'select', key: 'sh_base_sponsons', label: 'Base flamers', value: '', options: [
            { value: '', label: 'Keep 2 twin heavy flamers' },
            { value: 'bolters', label: 'Replace with 2 twin heavy bolters' },
          ] }],
        }, {
          title: 'Additional sponson package',
          description: 'This model can be equipped with one of the following: 2 lascannons and 2 twin heavy bolters; 2 lascannons and 2 twin heavy flamers.',
          controls: [{ type: 'select', key: 'sh_extra_package', label: 'Extra package', value: '', options: [
            { value: '', label: 'None' },
            { value: 'bolters', label: '2 lascannons and 2 twin heavy bolters' },
            { value: 'flamers', label: '2 lascannons and 2 twin heavy flamers' },
          ] }],
        }, {
          title: 'Chassis',
          description: 'Fixed loadout: armoured tracks. No available wargear options.',
        }],
        quantities: ctx => {
          const q = {};
          Object.entries(fixedWeapons).forEach(([key, value]) => add(ctx, q, key, value));
          add(ctx, q, 'armoured tracks', 1);
          add(ctx, q, 'lascannon', 2);
          add(ctx, q, 'twin heavy bolter', select(ctx, 'sh_base_sponsons', '') === 'bolters' ? 3 : 1);
          add(ctx, q, 'twin heavy flamer', select(ctx, 'sh_base_sponsons', '') === 'bolters' ? 0 : 2);
          const extra = select(ctx, 'sh_extra_package', '');
          if (extra) {
            add(ctx, q, 'lascannon', 2);
            add(ctx, q, extra === 'bolters' ? 'twin heavy bolter' : 'twin heavy flamer', 2);
          }
          return q;
        },
      });

      return {
        'Baneblade': superHeavy('Baneblade cannon; coaxial autocannon; demolisher cannon; heavy stubber', { 'baneblade cannon': 1, 'coaxial autocannon': 1, 'demolisher cannon': 1, 'heavy stubber': 1 }),
        'Banehammer': superHeavy('tremor cannon', { 'tremor cannon': 1 }),
        'Banesword': superHeavy('quake cannon', { 'quake cannon': 1 }),
        'Doomhammer': superHeavy('magma cannon', { 'magma cannon': 1 }),
        'Hellhammer': superHeavy('Hellhammer cannon; coaxial autocannon; demolisher cannon; heavy stubber', { 'hellhammer cannon': 1, 'coaxial autocannon': 1, 'demolisher cannon': 1, 'heavy stubber': 1 }),
        'Shadowsword': superHeavy('volcano cannon', { 'volcano cannon': 1 }),
        'Stormlord': superHeavy('vulcan mega-bolter; 2 heavy stubbers', { 'vulcan mega-bolter': 1, 'heavy stubber': 2 }),
        'Stormsword': superHeavy('Stormsword siege cannon', { 'stormsword siege cannon': 1 }),
      };
    })(),
    'Valkyrie': {
      sections: [{
        title: 'Nose weapon',
        description: "This model's multi-laser can be replaced with 1 lascannon.",
        controls: [{ type: 'select', key: 'valkyrie_nose', label: 'Nose weapon', value: 'multi-laser', options: [
          { value: 'multi-laser', label: 'Multi-laser' },
          { value: 'lascannon', label: 'Lascannon' },
        ] }],
      }, {
        title: 'Missile pods',
        description: "This model's hellstrike missiles can be replaced with 2 multiple rocket pods.",
        controls: [{ type: 'select', key: 'valkyrie_missiles', label: 'Missile weapons', value: 'hellstrike missiles', options: [
          { value: 'hellstrike missiles', label: 'Hellstrike missiles' },
          { value: 'multiple rocket pod', label: '2 multiple rocket pods' },
        ] }],
      }, {
        title: 'Door weapons',
        description: 'This model can be equipped with 2 heavy bolters.',
        controls: [{ type: 'select', key: 'valkyrie_heavy_bolters', label: 'Door weapons', value: '', options: [
          { value: '', label: 'None' },
          { value: 'heavy bolter', label: '2 heavy bolters' },
        ] }],
      }, {
        title: 'Hull',
        description: 'Fixed loadout: armoured hull. No available wargear options.',
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'valkyrie_nose', 'multi-laser'), 1);
        const missiles = select(ctx, 'valkyrie_missiles', 'hellstrike missiles');
        add(ctx, q, missiles, missiles === 'multiple rocket pod' ? 2 : 1);
        add(ctx, q, select(ctx, 'valkyrie_heavy_bolters', ''), 2);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },

    'Avenger Strike Fighter': {
      sections: [{
        title: 'Fixed weapons',
        description: 'Fixed loadout: Avenger bolt cannon; heavy stubber; 2 lascannons; armoured hull. No available wargear options.',
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'avenger bolt cannon', 1);
        add(ctx, q, 'heavy stubber', 1);
        add(ctx, q, 'lascannon', 2);
        add(ctx, q, 'armoured hull', 1);
        return q;
      },
    },  });
}());


