(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);
  const number = (ctx, key) => ctx.number(key);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;

  function fixed(description, quantitiesFn) {
    return {
      sections: [{ title: 'Unit loadout', description: description, controls: [] }],
      quantities: quantitiesFn
    };
  }

  registry['aeldari'] = {
    'Asurmen': fixed('This model is equipped with: Bloody Twins; Sword of Asur.', ctx => {
      const q = {};
      add(ctx, q, 'bloody twins', 1);
      add(ctx, q, 'sword of asur', 1);
      return q;
    }),

    'Autarch': {
      sections: [{
        title: 'Ranged weapon',
        description: 'Select the Autarch ranged weapon.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'shuriken pistol', options: [
            { value: 'shuriken pistol', label: 'Shuriken pistol' },
            { value: 'dragon fusion gun', label: 'Dragon fusion gun' },
            { value: 'dragon fusion pistol', label: 'Dragon fusion pistol' },
            { value: 'death spinner', label: 'Death spinner' },
            { value: 'reaper_launcher', label: 'Reaper launcher' }
          ] }
        ]
      }, {
        title: 'Melee weapon',
        description: 'Select the Autarch melee weapon.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'star glaive', options: [
            { value: 'star glaive', label: 'Star glaive' },
            { value: 'banshee blade', label: 'Banshee blade' },
            { value: 'scorpion chainsword', label: 'Scorpion chainsword' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const ranged = select(ctx, 'ranged', 'shuriken pistol');
        if (ranged === 'reaper_launcher') {
          add(ctx, q, 'reaper launcher – starshot', 1);
          add(ctx, q, 'reaper launcher – starswarm', 1);
        } else add(ctx, q, ranged, 1);
        add(ctx, q, select(ctx, 'melee', 'star glaive'), 1);
        return q;
      }
    },

    'Autarch Wayleaper': {
      sections: [{
        title: 'Ranged weapon',
        description: 'Select the Wayleaper ranged weapon.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'shuriken pistol', options: [
            { value: 'shuriken pistol', label: 'Shuriken pistol' },
            { value: 'dragon fusion gun', label: 'Dragon fusion gun' },
            { value: 'dragon fusion pistol', label: 'Dragon fusion pistol' },
            { value: 'death spinner', label: 'Death spinner' },
            { value: 'reaper_launcher', label: 'Reaper launcher' }
          ] }
        ]
      }, {
        title: 'Melee weapon',
        description: 'Select the Wayleaper melee weapon.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'star glaive', options: [
            { value: 'star glaive', label: 'Star glaive' },
            { value: 'banshee blade', label: 'Banshee blade' },
            { value: 'scorpion chainsword', label: 'Scorpion chainsword' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const ranged = select(ctx, 'ranged', 'shuriken pistol');
        if (ranged === 'reaper_launcher') {
          add(ctx, q, 'reaper launcher – starshot', 1);
          add(ctx, q, 'reaper launcher – starswarm', 1);
        } else add(ctx, q, ranged, 1);
        add(ctx, q, select(ctx, 'melee', 'star glaive'), 1);
        return q;
      }
    },

    'Avatar of Khaine': fixed('This model is equipped with: the Wailing Doom.', ctx => {
      const q = {};
      add(ctx, q, 'the wailing doom', 1);
      add(ctx, q, 'the wailing doom – strike', 1);
      add(ctx, q, 'the wailing doom – sweep', 1);
      return q;
    }),

    'Baharroth': fixed('This model is equipped with: Fury of the Tempest; Shining Blade.', ctx => {
      const q = {};
      add(ctx, q, 'fury of the tempest', 1);
      add(ctx, q, 'shining blade', 1);
      return q;
    }),

    'Corsair Skyreavers': {
      sections: [{
        title: 'Special weapons',
        description: 'Assign the Corsair Skyreaver special weapons. Remaining models keep shuriken pistols and Corsair blades.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: 1 },
          { key: 'shredder', label: 'Shredder', max: 1 },
          { key: 'fusion', label: 'Fusion gun', max: 1 },
          { key: 'flamer', label: 'Flamer', max: 1 },
          { key: 'neuro', label: 'Neuro disruptor', max: 1 },
          { key: 'blast_pistol', label: 'Blast pistol', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const replaced = number(ctx, 'blaster') + number(ctx, 'shredder') + number(ctx, 'fusion') + number(ctx, 'flamer') + number(ctx, 'neuro') + number(ctx, 'blast_pistol');
        if (replaced > ctx.modelCount) ctx.errors.push('Corsair Skyreaver special weapons exceed unit size.');
        add(ctx, q, 'blaster', number(ctx, 'blaster'));
        add(ctx, q, 'shredder', number(ctx, 'shredder'));
        add(ctx, q, 'fusion gun', number(ctx, 'fusion'));
        add(ctx, q, 'flamer', number(ctx, 'flamer'));
        add(ctx, q, 'neuro disruptor', number(ctx, 'neuro'));
        add(ctx, q, 'blast pistol', number(ctx, 'blast_pistol'));
        add(ctx, q, 'shuriken pistol', Math.max(0, ctx.modelCount - replaced));
        add(ctx, q, 'corsair blade', ctx.modelCount);
        return q;
      }
    },

    'Corsair Voidreavers': {
      sections: [{
        title: 'Ranged weapon swaps',
        description: 'Assign the Corsair Voidreaver ranged weapon swaps. Remaining models keep shuriken pistols and power swords.',
        controls: [
          { key: 'shuriken_rifle', label: 'Shuriken rifle', max: models => Number(models || 0) },
          { key: 'blaster', label: 'Blaster', max: 1 },
          { key: 'shredder', label: 'Shredder', max: 1 },
          { key: 'wraithcannon', label: 'Wraithcannon', max: 1 },
          { key: 'shuriken_cannon', label: 'Shuriken cannon', max: 1 },
          { key: 'neuro', label: 'Neuro disruptor', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const rifle = number(ctx, 'shuriken_rifle');
        const specials = number(ctx, 'blaster') + number(ctx, 'shredder') + number(ctx, 'wraithcannon') + number(ctx, 'shuriken_cannon') + number(ctx, 'neuro');
        if (rifle + specials > ctx.modelCount) ctx.errors.push('Corsair Voidreaver ranged assignments exceed unit size.');
        add(ctx, q, 'shuriken rifle', rifle);
        add(ctx, q, 'blaster', number(ctx, 'blaster'));
        add(ctx, q, 'shredder', number(ctx, 'shredder'));
        add(ctx, q, 'wraithcannon', number(ctx, 'wraithcannon'));
        add(ctx, q, 'shuriken cannon', number(ctx, 'shuriken_cannon'));
        add(ctx, q, 'neuro disruptor', number(ctx, 'neuro'));
        add(ctx, q, 'shuriken pistol', Math.max(0, ctx.modelCount - rifle - specials));
        add(ctx, q, 'power sword', ctx.modelCount);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Corsair Voidscarred': {
      sections: [{
        title: 'Voidscarred specialists',
        description: 'Assign specialist operatives and heavy/special weapon swaps. Remaining models keep the default pistol, power sword, and close combat weapon profile.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: 1 },
          { key: 'shredder', label: 'Shredder', max: 1 },
          { key: 'wraithcannon', label: 'Wraithcannon', max: 1 },
          { key: 'shuriken_cannon', label: 'Shuriken cannon', max: 1 },
          { key: 'neuro', label: 'Neuro disruptor', max: 1 },
          { key: 'fusion_pistol', label: 'Fusion pistol', max: 1 },
          { key: 'long_rifle', label: 'Long rifle', max: 1 },
          { key: 'shade_runner', label: 'Shade Runner', max: 1 },
          { key: 'way_seeker', label: 'Way Seeker', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specialists = number(ctx, 'blaster') + number(ctx, 'shredder') + number(ctx, 'wraithcannon') + number(ctx, 'shuriken_cannon') + number(ctx, 'neuro') + number(ctx, 'fusion_pistol') + number(ctx, 'long_rifle') + number(ctx, 'shade_runner') + number(ctx, 'way_seeker');
        if (specialists > ctx.modelCount) ctx.errors.push('Corsair Voidscarred specialist assignments exceed unit size.');
        add(ctx, q, 'blaster', number(ctx, 'blaster'));
        add(ctx, q, 'shredder', number(ctx, 'shredder'));
        add(ctx, q, 'wraithcannon', number(ctx, 'wraithcannon'));
        add(ctx, q, 'shuriken cannon', number(ctx, 'shuriken_cannon'));
        add(ctx, q, 'neuro disruptor', number(ctx, 'neuro'));
        add(ctx, q, 'fusion pistol', number(ctx, 'fusion_pistol'));
        add(ctx, q, 'long rifle', number(ctx, 'long_rifle'));
        add(ctx, q, 'paired hekatarii blades', number(ctx, 'shade_runner'));
        add(ctx, q, 'executioner', number(ctx, 'way_seeker'));
        add(ctx, q, 'witch staff', number(ctx, 'way_seeker'));
        add(ctx, q, 'shuriken pistol', ctx.modelCount);
        add(ctx, q, 'power sword', Math.max(0, ctx.modelCount - number(ctx, 'shade_runner') - number(ctx, 'way_seeker')));
        add(ctx, q, 'close combat weapon', Math.max(0, ctx.modelCount - number(ctx, 'shade_runner')));
        return q;
      }
    },

    'Crimson Hunter': {
      sections: [{
        title: 'Wing guns',
        description: 'Choose the paired wing guns.',
        controls: [
          { type: 'select', key: 'wing_guns', label: 'Wing guns', value: 'starcannon', options: [
            { value: 'starcannon', label: '2 Starcannons' },
            { value: 'bright_lance', label: '2 Bright lances' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'wing_guns', 'starcannon'), 2);
        add(ctx, q, 'pulse laser', 1);
        add(ctx, q, 'wraithbone hull', 1);
        return q;
      }
    },

    'Dark Reapers': {
      sections: [{
        title: 'Exarch weapon',
        description: 'Select the Dark Reaper Exarch weapon.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch weapon', value: 'reaper_launcher', options: [
            { value: 'reaper_launcher', label: 'Reaper launcher' },
            { value: 'tempest_launcher', label: 'Tempest launcher' },
            { value: 'shuriken_cannon', label: 'Shuriken cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const exarch = select(ctx, 'exarch', 'reaper_launcher');
        if (exarch === 'reaper_launcher') {
          add(ctx, q, 'reaper launcher – starshot', ctx.modelCount);
          add(ctx, q, 'reaper launcher – starswarm', ctx.modelCount);
        } else if (exarch === 'tempest_launcher') {
          add(ctx, q, 'tempest launcher', 1);
          add(ctx, q, 'reaper launcher – starshot', Math.max(0, ctx.modelCount - 1));
          add(ctx, q, 'reaper launcher – starswarm', Math.max(0, ctx.modelCount - 1));
        } else {
          add(ctx, q, 'shuriken cannon', 1);
          add(ctx, q, 'reaper launcher – starshot', Math.max(0, ctx.modelCount - 1));
          add(ctx, q, 'reaper launcher – starswarm', Math.max(0, ctx.modelCount - 1));
        }
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Dire Avengers': {
      sections: [{
        title: 'Exarch options',
        description: 'Select the Dire Avenger Exarch loadout.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch loadout', value: 'catapult', options: [
            { value: 'catapult', label: 'Avenger shuriken catapult' },
            { value: 'diresword', label: 'Diresword + shuriken pistol' },
            { value: 'power_glaive', label: 'Power glaive + shuriken pistol' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const exarch = select(ctx, 'exarch', 'catapult');
        add(ctx, q, 'avenger shuriken catapult', Math.max(0, ctx.modelCount - 1));
        if (exarch === 'catapult') add(ctx, q, 'avenger shuriken catapult', 1);
        else {
          add(ctx, q, exarch, 1);
          add(ctx, q, 'shuriken pistol', 1);
        }
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Falcon': {
      sections: [{
        title: 'Turret weapon',
        description: 'Select the Falcon turret weapon.',
        controls: [
          { type: 'select', key: 'turret', label: 'Turret weapon', value: 'scatter laser', options: [
            { value: 'scatter laser', label: 'Scatter laser' },
            { value: 'bright lance', label: 'Bright lance' },
            { value: 'starcannon', label: 'Starcannon' },
            { value: 'missile_launcher', label: 'Missile launcher' },
            { value: 'shuriken_cannon', label: 'Shuriken cannon' }
          ] }
        ]
      }, {
        title: 'Underslung weapon',
        description: 'Select the Falcon underslung weapon.',
        controls: [
          { type: 'select', key: 'underslung', label: 'Underslung weapon', value: 'twin shuriken catapult', options: [
            { value: 'twin shuriken catapult', label: 'Twin shuriken catapult' },
            { value: 'shuriken cannon', label: 'Shuriken cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'pulse laser', 1);
        const turret = select(ctx, 'turret', 'scatter laser');
        if (turret === 'missile_launcher') {
          add(ctx, q, 'missile launcher – starshot', 1);
          add(ctx, q, 'missile launcher – sunburst', 1);
        } else add(ctx, q, turret, 1);
        add(ctx, q, select(ctx, 'underslung', 'twin shuriken catapult'), 1);
        add(ctx, q, 'wraithbone hull', 1);
        return q;
      }
    },

    'Farseer': {
      sections: [{
        title: 'Melee weapon',
        description: 'Select the Farseer melee weapon.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'witchblade', options: [
            { value: 'witchblade', label: 'Witchblade' },
            { value: 'singing spear (1)', label: 'Singing spear' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'eldritch storm', 1);
        add(ctx, q, 'shuriken pistol', 1);
        add(ctx, q, select(ctx, 'melee', 'witchblade'), 1);
        return q;
      }
    },

    'Farseer Skyrunner': {
      sections: [{
        title: 'Melee weapon',
        description: 'Select the Farseer Skyrunner melee weapon.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'witchblade', options: [
            { value: 'witchblade', label: 'Witchblade' },
            { value: 'singing spear (1)', label: 'Singing spear' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'eldritch storm', 1);
        add(ctx, q, 'shuriken pistol', 1);
        add(ctx, q, 'twin shuriken catapult', 1);
        add(ctx, q, select(ctx, 'melee', 'witchblade'), 1);
        return q;
      }
    },

    'Fire Dragons': {
      sections: [{
        title: 'Exarch weapon',
        description: 'Select the Fire Dragon Exarch weapon.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch weapon', value: 'exarch_fusion', options: [
            { value: 'exarch_fusion', label: 'Exarch’s Dragon fusion gun' },
            { value: 'firepike', label: 'Firepike' },
            { value: 'dragon_flamer', label: 'Dragon’s breath flamer + Dragon fusion pistol + Dragon axe' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const exarch = select(ctx, 'exarch', 'exarch_fusion');
        add(ctx, q, 'dragon fusion gun', Math.max(0, ctx.modelCount - 1));
        if (exarch === 'exarch_fusion') add(ctx, q, 'exarch’s dragon fusion gun', 1);
        else if (exarch === 'firepike') add(ctx, q, 'firepike', 1);
        else {
          add(ctx, q, 'dragon’s breath flamer', 1);
          add(ctx, q, 'dragon fusion pistol', 1);
          add(ctx, q, 'dragon axe', 1);
        }
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Fire Prism': {
      sections: [{
        title: 'Hull weapon',
        description: 'Select the Fire Prism hull weapon.',
        controls: [
          { type: 'select', key: 'hull', label: 'Hull weapon', value: 'twin shuriken catapult', options: [
            { value: 'twin shuriken catapult', label: 'Twin shuriken catapult' },
            { value: 'shuriken cannon', label: 'Shuriken cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'prism cannon – dispersed pulse', 1);
        add(ctx, q, 'prism cannon – focused lances', 1);
        add(ctx, q, select(ctx, 'hull', 'twin shuriken catapult'), 1);
        add(ctx, q, 'wraithbone hull', 1);
        return q;
      }
    },

    'Guardian Defenders': {
      sections: [{
        title: 'Heavy Weapon Platform',
        description: 'Select the Heavy Weapon Platform weapon.',
        controls: [
          { type: 'select', key: 'platform', label: 'Platform weapon', value: 'shuriken cannon', options: [
            { value: 'shuriken cannon', label: 'Shuriken cannon' },
            { value: 'bright lance', label: 'Bright lance' },
            { value: 'starcannon', label: 'Starcannon' },
            { value: 'scatter laser', label: 'Scatter laser' },
            { value: 'missile_launcher', label: 'Missile launcher' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'shuriken catapult', 10);
        add(ctx, q, 'close combat weapon', 11);
        const platform = select(ctx, 'platform', 'shuriken cannon');
        if (platform === 'missile_launcher') {
          add(ctx, q, 'missile launcher – starshot', 1);
          add(ctx, q, 'missile launcher – sunburst', 1);
        } else add(ctx, q, platform, 1);
        return q;
      }
    },

    'Howling Banshees': {
      sections: [{
        title: 'Exarch weapon',
        description: 'Select the Howling Banshee Exarch weapon.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch weapon', value: 'banshee_blade', options: [
            { value: 'banshee_blade', label: 'Banshee blade' },
            { value: 'executioner', label: 'Executioner' },
            { value: 'mirrorswords', label: 'Mirrorswords' },
            { value: 'triskele', label: 'Triskele' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'shuriken pistol', ctx.modelCount);
        add(ctx, q, 'banshee blade', Math.max(0, ctx.modelCount - 1));
        add(ctx, q, select(ctx, 'exarch', 'banshee_blade'), 1);
        return q;
      }
    },

    'Night Spinner': {
      sections: [{
        title: 'Hull weapon',
        description: 'Select the Night Spinner hull weapon.',
        controls: [
          { type: 'select', key: 'hull', label: 'Hull weapon', value: 'twin shuriken catapult', options: [
            { value: 'twin shuriken catapult', label: 'Twin shuriken catapult' },
            { value: 'shuriken cannon', label: 'Shuriken cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'doomweaver', 1);
        add(ctx, q, select(ctx, 'hull', 'twin shuriken catapult'), 1);
        add(ctx, q, 'wraithbone hull', 1);
        return q;
      }
    },

    'Rangers': fixed('Every model is equipped with: long rifle; shuriken pistol; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'long rifle', ctx.modelCount);
      add(ctx, q, 'shuriken pistol', ctx.modelCount);
      add(ctx, q, 'close combat weapon', ctx.modelCount);
      return q;
    }),

    'Death Jester': fixed('This model is equipped with: shrieker cannon; Jester’s blade.', ctx => {
      const q = {};
      add(ctx, q, 'shrieker cannon', 1);
      add(ctx, q, 'jester’s blade', 1);
      return q;
    }),

    'Shadowseer': {
      sections: [{
        title: 'Ranged weapon',
        description: 'Select the Shadowseer ranged weapon.',
        controls: [
          { type: 'select', key: 'ranged', label: 'Ranged weapon', value: 'shuriken pistol', options: [
            { value: 'shuriken pistol', label: 'Shuriken pistol' },
            { value: 'neuro disruptor', label: 'Neuro disruptor' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'ranged', 'shuriken pistol'), 1);
        add(ctx, q, 'miststave', 1);
        return q;
      }
    },

    'Shining Spears': {
      sections: [{
        title: 'Exarch weapon',
        description: 'Select the Shining Spear Exarch weapon.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch weapon', value: 'star_lance', options: [
            { value: 'star_lance', label: 'Star lance' },
            { value: 'paragon_sabre', label: 'Paragon sabre' }
          ] }
        ]
      }, {
        title: 'Shuriken cannon upgrade',
        description: 'Select how many riders replace their twin shuriken catapult with a shuriken cannon.',
        controls: [
          { key: 'cannon', label: 'Shuriken cannon upgrades', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const cannon = number(ctx, 'cannon');
        add(ctx, q, 'laser lance (1)', Math.max(0, ctx.modelCount - 1));
        add(ctx, q, select(ctx, 'exarch', 'star_lance') === 'star_lance' ? 'star lance (1)' : 'paragon sabre', 1);
        add(ctx, q, 'twin shuriken catapult', Math.max(0, ctx.modelCount - cannon));
        add(ctx, q, 'shuriken cannon', cannon);
        return q;
      }
    },

    'Shroud Runners': fixed('Every model is equipped with: long rifle; scatter laser; shuriken pistol; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'long rifle', ctx.modelCount);
      add(ctx, q, 'scatter laser', ctx.modelCount);
      add(ctx, q, 'shuriken pistol', ctx.modelCount);
      add(ctx, q, 'close combat weapon', ctx.modelCount);
      return q;
    }),

    'Skyweavers': {
      sections: [{
        title: 'Main gun',
        description: 'Each Skyweaver selects one main gun.',
        controls: [
          { key: 'shuriken', label: 'Shuriken cannon', max: models => Number(models || 0) },
          { key: 'haywire', label: 'Skyweaver haywire cannon', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Melee weapon',
        description: 'Any number of Skyweavers can replace their close combat weapon with a zephyrglaive.',
        controls: [
          { key: 'zephyr', label: 'Zephyrglaive', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const shuriken = number(ctx, 'shuriken');
        const haywire = number(ctx, 'haywire');
        const zephyr = number(ctx, 'zephyr');
        if (shuriken + haywire !== ctx.modelCount) ctx.errors.push(`Skyweaver guns must total ${ctx.modelCount}; currently ${shuriken + haywire}.`);
        if (zephyr > ctx.modelCount) ctx.errors.push('Too many zephyrglaive selections for Skyweavers.');
        add(ctx, q, 'shuriken cannon', shuriken);
        add(ctx, q, 'skyweaver haywire cannon', haywire);
        add(ctx, q, 'star bolas', ctx.modelCount);
        add(ctx, q, 'zephyrglaive', zephyr);
        add(ctx, q, 'close combat weapon', Math.max(0, ctx.modelCount - zephyr));
        return q;
      }
    },

    'Solitaire': fixed('This model is equipped with: Solitaire weapons.', ctx => {
      const q = {};
      add(ctx, q, 'solitaire weapons', 1);
      return q;
    }),

    'Starweaver': fixed('This model is equipped with: 2 shuriken cannons; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'shuriken cannon', 2);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Swooping Hawks': {
      sections: [{
        title: 'Exarch weapon',
        description: 'Select the Swooping Hawk Exarch weapon.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch weapon', value: 'hawk_talon', options: [
            { value: 'hawk_talon', label: 'Hawk’s talon' },
            { value: 'sunpistol', label: 'Sunpistol + power sword' },
            { value: 'scatter_laser', label: 'Scatter laser' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const exarch = select(ctx, 'exarch', 'hawk_talon');
        add(ctx, q, 'lasblaster', Math.max(0, ctx.modelCount - 1));
        if (exarch === 'hawk_talon') add(ctx, q, 'hawk’s talon', 1);
        else if (exarch === 'sunpistol') {
          add(ctx, q, 'sunpistol', 1);
          add(ctx, q, 'power sword', 1);
        } else add(ctx, q, 'scatter laser', 1);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Vypers': {
      sections: [{
        title: 'Turret weapon',
        description: 'Select the Vyper turret weapon.',
        controls: [
          { type: 'select', key: 'turret', label: 'Turret weapon', value: 'bright lance', options: [
            { value: 'bright lance', label: 'Bright lance' },
            { value: 'starcannon', label: 'Starcannon' },
            { value: 'scatter laser', label: 'Scatter laser' },
            { value: 'shuriken cannon', label: 'Shuriken cannon' },
            { value: 'missile_launcher', label: 'Missile launcher' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'shuriken cannon', ctx.modelCount);
        const turret = select(ctx, 'turret', 'bright lance');
        if (turret === 'missile_launcher') {
          add(ctx, q, 'missile launcher – starshot', ctx.modelCount);
          add(ctx, q, 'missile launcher – sunburst', ctx.modelCount);
        } else add(ctx, q, turret, ctx.modelCount);
        add(ctx, q, 'wraithbone hull', ctx.modelCount);
        return q;
      }
    },

    'War Walkers': {
      sections: [{
        title: 'Walker heavy weapons',
        description: 'Each War Walker selects two heavy weapons.',
        controls: [
          { key: 'bright_lance', label: 'Bright lance', max: models => Number(models || 0) * 2 },
          { key: 'starcannon', label: 'Starcannon', max: models => Number(models || 0) * 2 },
          { key: 'scatter_laser', label: 'Scatter laser', max: models => Number(models || 0) * 2 },
          { key: 'shuriken_cannon', label: 'Shuriken cannon', max: models => Number(models || 0) * 2 },
          { key: 'missile_launcher', label: 'Missile launcher', max: models => Number(models || 0) * 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bright = number(ctx, 'bright_lance');
        const star = number(ctx, 'starcannon');
        const scatter = number(ctx, 'scatter_laser');
        const shuriken = number(ctx, 'shuriken_cannon');
        const missile = number(ctx, 'missile_launcher');
        const total = bright + star + scatter + shuriken + missile;
        if (total !== ctx.modelCount * 2) ctx.errors.push(`War Walker heavy weapons must total ${ctx.modelCount * 2}; currently ${total}.`);
        add(ctx, q, 'bright lance', bright);
        add(ctx, q, 'starcannon', star);
        add(ctx, q, 'scatter laser', scatter);
        add(ctx, q, 'shuriken cannon', shuriken);
        add(ctx, q, 'missile launcher – starshot', missile);
        add(ctx, q, 'missile launcher – sunburst', missile);
        add(ctx, q, 'war walker feet', ctx.modelCount);
        return q;
      }
    },

    'Warp Spiders': {
      sections: [{
        title: 'Exarch weapon',
        description: 'Select the Warp Spider Exarch weapon.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch weapon', value: 'exarch_spinner', options: [
            { value: 'exarch_spinner', label: 'Exarch’s death spinner' },
            { value: 'spinneret_rifle', label: 'Spinneret rifle' },
            { value: 'powerblades', label: 'Powerblade array' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const exarch = select(ctx, 'exarch', 'exarch_spinner');
        add(ctx, q, 'death spinner', Math.max(0, ctx.modelCount - 1));
        if (exarch === 'exarch_spinner') add(ctx, q, 'exarch’s death spinner', 1);
        else if (exarch === 'spinneret_rifle') add(ctx, q, 'spinneret rifle', 1);
        else add(ctx, q, 'powerblade array', 1);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Wave Serpent': {
      sections: [{
        title: 'Turret weapon',
        description: 'Select the Wave Serpent turret weapon.',
        controls: [
          { type: 'select', key: 'turret', label: 'Turret weapon', value: 'twin shuriken cannon', options: [
            { value: 'twin shuriken cannon', label: 'Twin shuriken cannon' },
            { value: 'twin bright lance', label: 'Twin bright lance' },
            { value: 'twin scatter laser', label: 'Twin scatter laser' },
            { value: 'twin starcannon', label: 'Twin starcannon' },
            { value: 'twin_missile_launcher', label: 'Twin missile launcher' }
          ] }
        ]
      }, {
        title: 'Hull weapon',
        description: 'Select the Wave Serpent hull weapon.',
        controls: [
          { type: 'select', key: 'hull', label: 'Hull weapon', value: 'twin shuriken catapult', options: [
            { value: 'twin shuriken catapult', label: 'Twin shuriken catapult' },
            { value: 'shuriken cannon', label: 'Shuriken cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const turret = select(ctx, 'turret', 'twin shuriken cannon');
        if (turret === 'twin_missile_launcher') {
          add(ctx, q, 'twin missile launcher – starshot', 1);
          add(ctx, q, 'twin missile launcher – sunburst', 1);
        } else add(ctx, q, turret, 1);
        add(ctx, q, select(ctx, 'hull', 'twin shuriken catapult'), 1);
        add(ctx, q, 'wraithbone hull', 1);
        return q;
      }
    },

    'Windriders': {
      sections: [{
        title: 'Jetbike guns',
        description: 'Any number of Windriders can replace their twin shuriken catapult.',
        controls: [
          { key: 'catapult', label: 'Twin shuriken catapult', max: models => Number(models || 0) },
          { key: 'scatter', label: 'Scatter laser', max: models => Number(models || 0) },
          { key: 'shuriken', label: 'Shuriken cannon', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const catapult = number(ctx, 'catapult');
        const scatter = number(ctx, 'scatter');
        const shuriken = number(ctx, 'shuriken');
        const total = catapult + scatter + shuriken;
        if (total !== ctx.modelCount) ctx.errors.push(`Windrider gun selections must total ${ctx.modelCount}; currently ${total}.`);
        add(ctx, q, 'twin shuriken catapult', catapult);
        add(ctx, q, 'scatter laser', scatter);
        add(ctx, q, 'shuriken cannon', shuriken);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Wraithblades': {
      sections: [{
        title: 'Wraithblade weapon sets',
        description: 'Choose the number of Wraithblades equipped with each weapon set.',
        controls: [
          { key: 'ghostswords', label: 'Ghostswords', max: models => Number(models || 0) },
          { key: 'ghostaxe', label: 'Ghostaxe', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const ghostswords = number(ctx, 'ghostswords');
        const ghostaxe = number(ctx, 'ghostaxe');
        if (ghostswords + ghostaxe !== ctx.modelCount) ctx.errors.push(`Wraithblade weapon sets must total ${ctx.modelCount}; currently ${ghostswords + ghostaxe}.`);
        add(ctx, q, 'ghostswords', ghostswords);
        add(ctx, q, 'ghostaxe', ghostaxe);
        return q;
      }
    },

    'Wraithguard': {
      sections: [{
        title: 'Wraithguard guns',
        description: 'Choose the number of Wraithguard equipped with each ranged weapon.',
        controls: [
          { key: 'wraithcannon', label: 'Wraithcannon', max: models => Number(models || 0) },
          { key: 'dscythe', label: 'D-scythe', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const wraithcannon = number(ctx, 'wraithcannon');
        const dscythe = number(ctx, 'dscythe');
        if (wraithcannon + dscythe !== ctx.modelCount) ctx.errors.push(`Wraithguard guns must total ${ctx.modelCount}; currently ${wraithcannon + dscythe}.`);
        add(ctx, q, 'wraithcannon', wraithcannon);
        add(ctx, q, 'd-scythe', dscythe);
        add(ctx, q, 'close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Wraithknight': {
      sections: [{
        title: 'Main weapons',
        description: 'Choose the Wraithknight’s main arm weapons.',
        controls: [
          { key: 'suncannon', label: 'Suncannon', max: 1 },
          { key: 'heavy_wraithcannon', label: 'Heavy wraithcannon', max: 2 }
        ]
      }, {
        title: 'Shoulder weapons',
        description: 'Select up to two shoulder weapons.',
        controls: [
          { key: 'scatter', label: 'Scatter laser', max: 2 },
          { key: 'shuriken', label: 'Shuriken cannon', max: 2 },
          { key: 'starcannon', label: 'Starcannon', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const suncannon = number(ctx, 'suncannon');
        const heavy = number(ctx, 'heavy_wraithcannon');
        const shoulders = number(ctx, 'scatter') + number(ctx, 'shuriken') + number(ctx, 'starcannon');
        if (suncannon + heavy !== 2) ctx.errors.push(`Wraithknight main weapons must total 2; currently ${suncannon + heavy}.`);
        if (shoulders > 2) ctx.errors.push('Wraithknight can take at most 2 shoulder weapons.');
        add(ctx, q, 'suncannon', suncannon);
        add(ctx, q, 'heavy wraithcannon', heavy);
        add(ctx, q, 'scatter laser', number(ctx, 'scatter'));
        add(ctx, q, 'shuriken cannon', number(ctx, 'shuriken'));
        add(ctx, q, 'starcannon', number(ctx, 'starcannon'));
        add(ctx, q, 'titanic feet', 1);
        return q;
      }
    },

    'Wraithknight with Ghostglaive': {
      sections: [{
        title: 'Shoulder weapons',
        description: 'Select up to two shoulder weapons.',
        controls: [
          { key: 'heavy_wraithcannon', label: 'Heavy wraithcannon', max: 2 },
          { key: 'scatter', label: 'Scatter laser', max: 2 },
          { key: 'shuriken', label: 'Shuriken cannon', max: 2 },
          { key: 'starcannon', label: 'Starcannon', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const total = number(ctx, 'heavy_wraithcannon') + number(ctx, 'scatter') + number(ctx, 'shuriken') + number(ctx, 'starcannon');
        if (total > 2) ctx.errors.push('Wraithknight with Ghostglaive can take at most 2 shoulder weapons.');
        add(ctx, q, 'heavy wraithcannon', number(ctx, 'heavy_wraithcannon'));
        add(ctx, q, 'scatter laser', number(ctx, 'scatter'));
        add(ctx, q, 'shuriken cannon', number(ctx, 'shuriken'));
        add(ctx, q, 'starcannon', number(ctx, 'starcannon'));
        add(ctx, q, 'titanic ghostglaive – strike', 1);
        add(ctx, q, 'titanic ghostglaive – sweep', 1);
        return q;
      }
    },

    'Wraithlord': {
      sections: [{
        title: 'Heavy weapons',
        description: 'Choose up to two heavy weapons.',
        controls: [
          { key: 'bright_lance', label: 'Bright lance', max: 2 },
          { key: 'starcannon', label: 'Starcannon', max: 2 },
          { key: 'scatter_laser', label: 'Scatter laser', max: 2 },
          { key: 'shuriken_cannon', label: 'Shuriken cannon', max: 2 },
          { key: 'missile_launcher', label: 'Missile launcher', max: 2 }
        ]
      }, {
        title: 'Shoulder mounts',
        description: 'Choose the two shoulder mounts.',
        controls: [
          { key: 'catapult', label: 'Shuriken catapult', max: 2 },
          { key: 'flamer', label: 'Flamer', max: 2 }
        ]
      }, {
        title: 'Melee weapon',
        description: 'Select the Wraithlord melee weapon.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'wraithbone fists', options: [
            { value: 'wraithbone fists', label: 'Wraithbone fists' },
            { value: 'ghostglaive', label: 'Ghostglaive' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const heavyTotal = number(ctx, 'bright_lance') + number(ctx, 'starcannon') + number(ctx, 'scatter_laser') + number(ctx, 'shuriken_cannon') + number(ctx, 'missile_launcher');
        const shoulderTotal = number(ctx, 'catapult') + number(ctx, 'flamer');
        if (heavyTotal > 2) ctx.errors.push('Wraithlord can take at most 2 heavy weapons.');
        if (shoulderTotal !== 2) ctx.errors.push(`Wraithlord shoulder mounts must total 2; currently ${shoulderTotal}.`);
        add(ctx, q, 'bright lance', number(ctx, 'bright_lance'));
        add(ctx, q, 'starcannon', number(ctx, 'starcannon'));
        add(ctx, q, 'scatter laser', number(ctx, 'scatter_laser'));
        add(ctx, q, 'shuriken cannon', number(ctx, 'shuriken_cannon'));
        add(ctx, q, 'missile launcher – starshot', number(ctx, 'missile_launcher'));
        add(ctx, q, 'missile launcher – sunburst', number(ctx, 'missile_launcher'));
        add(ctx, q, 'shuriken catapult', number(ctx, 'catapult'));
        add(ctx, q, 'flamer', number(ctx, 'flamer'));
        if (select(ctx, 'melee', 'wraithbone fists') === 'ghostglaive') {
          add(ctx, q, 'ghostglaive – strike', 1);
          add(ctx, q, 'ghostglaive – sweep', 1);
        } else add(ctx, q, 'wraithbone fists', 1);
        return q;
      }
    },
    'The Visarch': fixed('This model is equipped with: Asu-var.', ctx => {
      const q = {};
      add(ctx, q, 'asu-var – duellist stance', 1);
      add(ctx, q, 'asu-var – mythic stance', 1);
      add(ctx, q, 'asu-var – quicksilver stance', 1);
      return q;
    }),

    'Troupe': {
      sections: [{
        title: 'Troupe pistols',
        description: 'Assign pistol upgrades across the Troupe.',
        controls: [
          { key: 'shuriken_pistol', label: 'Shuriken pistol', max: models => Number(models || 0) },
          { key: 'fusion_pistol', label: 'Fusion pistol', max: models => Number(models || 0) },
          { key: 'neuro_disruptor', label: 'Neuro disruptor', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Troupe melee weapons',
        description: 'Assign melee weapons across the Troupe.',
        controls: [
          { key: 'harlequin_blade', label: 'Harlequin’s blade', max: models => Number(models || 0) },
          { key: 'power_sword', label: 'Power sword', max: models => Number(models || 0) },
          { key: 'special_weapon', label: 'Harlequin’s special weapon', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const pistolTotal = number(ctx, 'shuriken_pistol') + number(ctx, 'fusion_pistol') + number(ctx, 'neuro_disruptor');
        const meleeTotal = number(ctx, 'harlequin_blade') + number(ctx, 'power_sword') + number(ctx, 'special_weapon');
        if (pistolTotal !== ctx.modelCount) ctx.errors.push(`Troupe pistol selections must total ${ctx.modelCount}; currently ${pistolTotal}.`);
        if (meleeTotal !== ctx.modelCount) ctx.errors.push(`Troupe melee selections must total ${ctx.modelCount}; currently ${meleeTotal}.`);
        add(ctx, q, 'shuriken pistol', number(ctx, 'shuriken_pistol'));
        add(ctx, q, 'fusion pistol', number(ctx, 'fusion_pistol'));
        add(ctx, q, 'neuro disruptor', number(ctx, 'neuro_disruptor'));
        add(ctx, q, 'harlequin’s blade', number(ctx, 'harlequin_blade'));
        add(ctx, q, 'power sword', number(ctx, 'power_sword'));
        add(ctx, q, 'harlequin’s special weapon', number(ctx, 'special_weapon'));
        return q;
      }
    },

    'Troupe Master': {
      sections: [{
        title: 'Pistol',
        description: 'Select the Troupe Master pistol.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'shuriken pistol', options: [
            { value: 'shuriken pistol', label: 'Shuriken pistol' },
            { value: 'fusion pistol', label: 'Fusion pistol' },
            { value: 'neuro disruptor', label: 'Neuro disruptor' }
          ] }
        ]
      }, {
        title: 'Melee weapon',
        description: 'Select the Troupe Master melee weapon.',
        controls: [
          { type: 'select', key: 'melee', label: 'Melee weapon', value: 'troupe master’s blade', options: [
            { value: 'troupe master’s blade', label: 'Troupe Master’s blade' },
            { value: 'harlequin’s special weapon', label: 'Harlequin’s special weapon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'pistol', 'shuriken pistol'), 1);
        add(ctx, q, select(ctx, 'melee', 'troupe master’s blade'), 1);
        return q;
      }
    },

    'Voidweaver': {
      sections: [{
        title: 'Main gun',
        description: 'Select the Voidweaver main gun.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'voidweaver haywire cannon', options: [
            { value: 'voidweaver haywire cannon', label: 'Voidweaver haywire cannon' },
            { value: 'prismatic_cannon', label: 'Prismatic cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'shuriken cannon', 2);
        if (select(ctx, 'main_gun', 'voidweaver haywire cannon') === 'prismatic_cannon') {
          add(ctx, q, 'prismatic cannon – dispersed pulse', 1);
          add(ctx, q, 'prismatic cannon – focused lances', 1);
        } else add(ctx, q, 'voidweaver haywire cannon', 1);
        add(ctx, q, 'close combat weapon', 1);
        return q;
      }
    },
    'Ynnari Archon': {
      sections: [{
        title: 'Pistol',
        description: 'Select the Ynnari Archon pistol.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'splinter pistol', options: [
            { value: 'splinter pistol', label: 'Splinter pistol' },
            { value: 'blast pistol', label: 'Blast pistol' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'pistol', 'splinter pistol'), 1);
        add(ctx, q, 'huskblade', 1);
        return q;
      }
    },

    'Ynnari Incubi': {
      sections: [{
        title: 'Klaivex weapon',
        description: 'Select the Klaivex weapon set.',
        controls: [
          { type: 'select', key: 'klaivex', label: 'Klaivex weapon', value: 'klaive', options: [
            { value: 'klaive', label: 'Klaive' },
            { value: 'demiklaives', label: 'Demiklaives' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'klaive', Math.max(0, ctx.modelCount - 1));
        if (select(ctx, 'klaivex', 'klaive') === 'klaive') add(ctx, q, 'klaive', 1);
        else {
          add(ctx, q, 'demiklaives – dual blades', 1);
          add(ctx, q, 'demiklaives – single blade', 1);
        }
        return q;
      }
    },

    'Ynnari Kabalite Warriors': {
      sections: [{
        title: 'Kabalite special weapons',
        description: 'Assign the Kabalite special weapons. Remaining models keep splinter rifles.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: 1 },
          { key: 'shredder', label: 'Shredder', max: 1 },
          { key: 'dark_lance', label: 'Dark lance', max: 1 },
          { key: 'splinter_cannon', label: 'Splinter cannon', max: 1 },
          { key: 'blast_pistol', label: 'Blast pistol', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const specials = number(ctx, 'blaster') + number(ctx, 'shredder') + number(ctx, 'dark_lance') + number(ctx, 'splinter_cannon');
        add(ctx, q, 'blast pistol', number(ctx, 'blast_pistol'));
        add(ctx, q, 'sybarite weapon', 1);
        add(ctx, q, 'blaster', number(ctx, 'blaster'));
        add(ctx, q, 'shredder', number(ctx, 'shredder'));
        add(ctx, q, 'dark lance', number(ctx, 'dark_lance'));
        add(ctx, q, 'splinter cannon', number(ctx, 'splinter_cannon'));
        add(ctx, q, 'splinter rifle', Math.max(0, 9 - specials));
        add(ctx, q, 'close combat weapon', 10);
        return q;
      }
    },

    'Ynnari Raider': {
      sections: [{
        title: 'Main gun',
        description: 'Select the Raider main gun.',
        controls: [
          { type: 'select', key: 'main_gun', label: 'Main gun', value: 'dark lance', options: [
            { value: 'dark lance', label: 'Dark lance' },
            { value: 'disintegrator cannon', label: 'Disintegrator cannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'main_gun', 'dark lance'), 1);
        add(ctx, q, 'bladevanes', 1);
        return q;
      }
    },

    'Ynnari Reavers': {
      sections: [{
        title: 'Special weapons',
        description: 'Assign Reaver special weapons. Remaining models keep splinter rifle and splinter pistol.',
        controls: [
          { key: 'blaster', label: 'Blaster', max: 1 },
          { key: 'heat_lance', label: 'Heat lance', max: 1 },
          { key: 'agoniser', label: 'Agoniser', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const blaster = number(ctx, 'blaster');
        const heat = number(ctx, 'heat_lance');
        const agoniser = number(ctx, 'agoniser');
        add(ctx, q, 'blaster', blaster);
        add(ctx, q, 'heat lance', heat);
        add(ctx, q, 'agoniser', agoniser);
        add(ctx, q, 'splinter pistol', Math.max(0, ctx.modelCount - blaster - heat));
        add(ctx, q, 'splinter rifle', Math.max(0, ctx.modelCount - blaster - heat));
        add(ctx, q, 'bladevanes', ctx.modelCount);
        return q;
      }
    },

    'Ynnari Succubus': {
      sections: [{
        title: 'Pistol',
        description: 'Select the Ynnari Succubus pistol.',
        controls: [
          { type: 'select', key: 'pistol', label: 'Pistol', value: 'splinter pistol', options: [
            { value: 'splinter pistol', label: 'Splinter pistol' },
            { value: 'blast pistol', label: 'Blast pistol' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, select(ctx, 'pistol', 'splinter pistol'), 1);
        add(ctx, q, 'succubus weapons', 1);
        return q;
      }
    },

    'Ynnari Venom': fixed('This model is equipped with: splinter cannon; twin splinter rifle; bladevanes.', ctx => {
      const q = {};
      add(ctx, q, 'splinter cannon', 1);
      add(ctx, q, 'twin splinter rifle', 1);
      add(ctx, q, 'bladevanes', 1);
      return q;
    }),

    'Ynnari Wyches': {
      sections: [{
        title: 'Wych special pistol',
        description: 'Assign the Wych blast pistol if taken.',
        controls: [
          { key: 'blast_pistol', label: 'Blast pistol', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'blast pistol', number(ctx, 'blast_pistol'));
        add(ctx, q, 'splinter pistol', Math.max(0, ctx.modelCount - number(ctx, 'blast_pistol')));
        add(ctx, q, 'hekatarii blade', ctx.modelCount);
        return q;
      }
    },

    'Yvraine': fixed('This model is equipped with: Storm of Whispers; Kha-vir.', ctx => {
      const q = {};
      add(ctx, q, 'storm of whispers', 1);
      add(ctx, q, 'kha-vir', 1);
      return q;
    }),

    'Prince Yriel': fixed('This model is equipped with: Eye of Wrath; shuriken pistol; Spear of Twilight.', ctx => {
      const q = {};
      add(ctx, q, 'eye of wrath', 1);
      add(ctx, q, 'shuriken pistol', 1);
      add(ctx, q, 'spear of twilight', 1);
      return q;
    }),

    'Kharseth': fixed('This model is equipped with: Dread of the Deep Void; Waystave.', ctx => {
      const q = {};
      add(ctx, q, 'dread of the deep void', 1);
      add(ctx, q, 'waystave', 1);
      return q;
    }),

    'Lhykhis': fixed('This model is equipped with: Brood Twain; Spider’s Fangs; Weaverender.', ctx => {
      const q = {};
      add(ctx, q, 'brood twain', 1);
      add(ctx, q, 'spider’s fangs', 1);
      add(ctx, q, 'weaverender', 1);
      return q;
    }),
    'D-cannon Platform': fixed('This model is equipped with: D-cannon; shuriken catapult; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'd-cannon', 1);
      add(ctx, q, 'shuriken catapult', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Eldrad Ulthran': fixed('This model is equipped with: Mind War; shuriken pistol; Staff of Ulthamar and witchblade.', ctx => {
      const q = {};
      add(ctx, q, 'mind war', 1);
      add(ctx, q, 'shuriken pistol', 1);
      add(ctx, q, 'staff of ulthamar and witchblade', 1);
      return q;
    }),

    'Fuegan': fixed('This model is equipped with: Searsong; Fire Axe.', ctx => {
      const q = {};
      add(ctx, q, 'searsong â€“ beam', 1);
      add(ctx, q, 'searsong â€“ lance', 1);
      add(ctx, q, 'fire axe', 1);
      return q;
    }),

    'Hemlock Wraithfighter': fixed('This model is equipped with: 2 heavy D-scythes; wraithbone hull.', ctx => {
      const q = {};
      add(ctx, q, 'heavy d-scythe', 2);
      add(ctx, q, 'wraithbone hull', 1);
      return q;
    }),

    'Jain Zar': fixed('This model is equipped with: Silent Death; Blade of Destruction.', ctx => {
      const q = {};
      add(ctx, q, 'silent death', 1);
      add(ctx, q, 'blade of destruction', 1);
      return q;
    }),

    'Maugan Ra': fixed('This model is equipped with: Maugetar.', ctx => {
      const q = {};
      add(ctx, q, 'maugetar (1)', 1);
      return q;
    }),

    'Phantom Titan': {
      sections: [{
        title: 'D-bombard hardpoint',
        description: 'Select the replacement for the D-bombard hardpoint.',
        controls: [
          { type: 'select', key: 'dbombard_slot', label: 'D-bombard hardpoint', value: 'd_bombard', options: [
            { value: 'd_bombard', label: 'D-bombard' },
            { value: 'phantom_pulsar', label: 'Phantom pulsar' },
            { value: 'starcannons_glaive', label: '2 Phantom starcannons + wraith glaive' },
            { value: 'pulse_glaive', label: 'Phantom starcannon + pulse laser + wraith glaive' },
            { value: 'double_pulse_glaive', label: '2 pulse lasers + wraith glaive' }
          ] }
        ]
      }, {
        title: 'Phantom pulsar hardpoint',
        description: 'Select the replacement for the Phantom pulsar hardpoint.',
        controls: [
          { type: 'select', key: 'pulsar_slot', label: 'Phantom pulsar hardpoint', value: 'phantom_pulsar', options: [
            { value: 'phantom_pulsar', label: 'Phantom pulsar' },
            { value: 'd_bombard', label: 'D-bombard' },
            { value: 'starcannons_glaive', label: '2 Phantom starcannons + wraith glaive' },
            { value: 'pulse_glaive', label: 'Phantom starcannon + pulse laser + wraith glaive' },
            { value: 'double_pulse_glaive', label: '2 pulse lasers + wraith glaive' }
          ] }
        ]
      }, {
        title: 'Auxiliary heavy weapon',
        description: 'Select whether the Phantom starcannon is retained or replaced with a pulse laser.',
        controls: [
          { type: 'select', key: 'aux_weapon', label: 'Auxiliary heavy weapon', value: 'phantom_starcannon', options: [
            { value: 'phantom_starcannon', label: 'Phantom starcannon' },
            { value: 'pulse_laser', label: 'Pulse laser' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const addPhantomPackage = mode => {
          if (mode === 'd_bombard') add(ctx, q, 'd-bombard', 1);
          else if (mode === 'phantom_pulsar') add(ctx, q, 'phantom pulsar', 1);
          else if (mode === 'starcannons_glaive') {
            add(ctx, q, 'phantom starcannon', 2);
            add(ctx, q, 'wraith glaive â€“ strike', 1);
            add(ctx, q, 'wraith glaive â€“ sweep', 1);
          } else if (mode === 'pulse_glaive') {
            add(ctx, q, 'phantom starcannon', 1);
            add(ctx, q, 'pulse laser', 1);
            add(ctx, q, 'wraith glaive â€“ strike', 1);
            add(ctx, q, 'wraith glaive â€“ sweep', 1);
          } else if (mode === 'double_pulse_glaive') {
            add(ctx, q, 'pulse laser', 2);
            add(ctx, q, 'wraith glaive â€“ strike', 1);
            add(ctx, q, 'wraith glaive â€“ sweep', 1);
          }
        };
        addPhantomPackage(select(ctx, 'dbombard_slot', 'd_bombard'));
        addPhantomPackage(select(ctx, 'pulsar_slot', 'phantom_pulsar'));
        add(ctx, q, select(ctx, 'aux_weapon', 'phantom_starcannon') === 'pulse_laser' ? 'pulse laser' : 'phantom starcannon', 1);
        add(ctx, q, 'voidstorm missile launcher', 1);
        add(ctx, q, 'phantom feet', 1);
        return q;
      }
    },

    'Revenant Titan': {
      sections: [{
        title: 'Titan arm weapons',
        description: 'Choose the number of Revenant pulsars and sonic lances.',
        controls: [
          { key: 'pulsar', label: 'Revenant pulsar', max: 2 },
          { key: 'sonic_lance', label: 'Sonic lance', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const pulsar = number(ctx, 'pulsar');
        const sonic = number(ctx, 'sonic_lance');
        if (pulsar + sonic !== 2) ctx.errors.push(`Revenant Titan arm weapons must total 2; currently ${pulsar + sonic}.`);
        add(ctx, q, 'revenant pulsar', pulsar);
        add(ctx, q, 'sonic lance', sonic);
        add(ctx, q, 'cloudburst missile launcher', 1);
        add(ctx, q, 'revenant feet', 1);
        return q;
      }
    },

    'Shadow Weaver Platform': fixed('This model is equipped with: shadow weaver; shuriken catapult; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'shadow weaver', 1);
      add(ctx, q, 'shuriken catapult', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Spiritseer': fixed('This model is equipped with: shuriken pistol; witch staff.', ctx => {
      const q = {};
      add(ctx, q, 'shuriken pistol', 1);
      add(ctx, q, 'witch staff', 1);
      return q;
    }),

    'Starfangs': fixed('Every model is equipped with: disintegrator cannon; Starfang grenade launcher; wraithbone hull.', ctx => {
      const q = {};
      add(ctx, q, 'disintegrator cannon', ctx.modelCount);
      add(ctx, q, 'starfang grenade launcher', ctx.modelCount);
      add(ctx, q, 'wraithbone hull', ctx.modelCount);
      return q;
    }),

    'Storm Guardians': {
      sections: [{
        title: 'Special weapons',
        description: 'Assign special weapons among the Storm Guardians.',
        controls: [
          { key: 'flamer', label: 'Flamer', max: 2 },
          { key: 'fusion_gun', label: 'Fusion gun', max: 2 },
          { key: 'power_sword', label: 'Power sword', max: 2 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const flamer = number(ctx, 'flamer');
        const fusion = number(ctx, 'fusion_gun');
        const sword = number(ctx, 'power_sword');
        if (flamer > 2 || fusion > 2 || sword > 2) ctx.errors.push('Storm Guardian special weapons exceed the datasheet limits.');
        add(ctx, q, 'shuriken pistol', 10);
        add(ctx, q, 'flamer', flamer);
        add(ctx, q, 'fusion gun', fusion);
        add(ctx, q, 'power sword', sword);
        add(ctx, q, 'close combat weapon', 11 - sword);
        add(ctx, q, 'serpent shield', 1);
        return q;
      }
    },

    'Striking Scorpions': {
      sections: [{
        title: 'Exarch weapon',
        description: 'Select the Striking Scorpion Exarch weapon set.',
        controls: [
          { type: 'select', key: 'exarch', label: 'Exarch weapon', value: 'claw', options: [
            { value: 'claw', label: 'Scorpionâ€™s claw' },
            { value: 'biting_blade', label: 'Biting blade' },
            { value: 'chainsabres', label: 'Chainsabres' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'shuriken pistol', ctx.modelCount);
        add(ctx, q, 'scorpion chainsword', Math.max(0, ctx.modelCount - 1));
        const exarch = select(ctx, 'exarch', 'claw');
        add(ctx, q, 'scorpion chainsword', exarch === 'claw' ? 1 : 0);
        if (exarch === 'claw') add(ctx, q, 'scorpionâ€™s claw', 1);
        else if (exarch === 'biting_blade') add(ctx, q, 'biting blade', 1);
        else add(ctx, q, 'chainsabres (1)', 1);
        return q;
      }
    },

    'The Yncarne': fixed('This model is equipped with: swirling soul energy; Vilith-zhar.', ctx => {
      const q = {};
      add(ctx, q, 'swirling soul energy', 1);
      add(ctx, q, 'vilith-zhar â€“ strike', 1);
      add(ctx, q, 'vilith-zhar â€“ sweep', 1);
      return q;
    }),

    'Vibro Cannon Platform': fixed('This model is equipped with: vibro cannon; shuriken catapult; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'vibro cannon', 1);
      add(ctx, q, 'shuriken catapult', 1);
      add(ctx, q, 'close combat weapon', 1);
      return q;
    }),

    'Warlock': {
      sections: [{
        title: 'Warlock weapon',
        description: 'Select the Warlock melee/ranged weapon set.',
        controls: [
          { type: 'select', key: 'weapon', label: 'Weapon set', value: 'witchblade', options: [
            { value: 'witchblade', label: 'Witchblade' },
            { value: 'singing_spear', label: 'Singing spear' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'destructor', 1);
        add(ctx, q, 'shuriken pistol', 1);
        if (select(ctx, 'weapon', 'witchblade') === 'singing_spear') add(ctx, q, 'singing spear (1)', 1);
        else add(ctx, q, 'witchblade', 1);
        return q;
      }
    },

    'Warlock Conclave': {
      sections: [{
        title: 'Conclave weapons',
        description: 'Choose how many Warlocks replace their witchblade with a singing spear.',
        controls: [
          { key: 'witchblade', label: 'Witchblade', max: models => Number(models || 0) },
          { key: 'singing_spear', label: 'Singing spear', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const witchblade = number(ctx, 'witchblade');
        const singing = number(ctx, 'singing_spear');
        if (witchblade + singing !== ctx.modelCount) ctx.errors.push(`Warlock Conclave weapon selections must total ${ctx.modelCount}; currently ${witchblade + singing}.`);
        add(ctx, q, 'destructor', ctx.modelCount);
        add(ctx, q, 'shuriken pistol', ctx.modelCount);
        add(ctx, q, 'witchblade', witchblade);
        add(ctx, q, 'singing spear (1)', singing);
        return q;
      }
    },

    'Warlock Skyrunners': {
      sections: [{
        title: 'Skyrunner weapons',
        description: 'Choose how many Warlock Skyrunners replace their witchblade with a singing spear.',
        controls: [
          { key: 'witchblade', label: 'Witchblade', max: models => Number(models || 0) },
          { key: 'singing_spear', label: 'Singing spear', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const witchblade = number(ctx, 'witchblade');
        const singing = number(ctx, 'singing_spear');
        if (witchblade + singing !== ctx.modelCount) ctx.errors.push(`Warlock Skyrunner weapon selections must total ${ctx.modelCount}; currently ${witchblade + singing}.`);
        add(ctx, q, 'destructor', ctx.modelCount);
        add(ctx, q, 'shuriken pistol', ctx.modelCount);
        add(ctx, q, 'twin shuriken catapult', ctx.modelCount);
        add(ctx, q, 'witchblade', witchblade);
        add(ctx, q, 'singing spear (1)', singing);
        return q;
      }
    },
  };
}());
