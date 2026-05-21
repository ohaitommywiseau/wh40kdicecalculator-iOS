(function () {
  const registry = window.WH40K_BUILDER_RULE_CONFIGS = window.WH40K_BUILDER_RULE_CONFIGS || {};

  const add = (ctx, q, key, amount) => ctx.add(q, key, amount == null ? 1 : amount);
  const number = (ctx, key) => Number(ctx.number(key) || 0);
  const select = (ctx, key, fallback) => ctx.select(key) || fallback;

  function fixed(description, quantitiesFn) {
    return {
      sections: [{ title: 'Unit loadout', description: description, controls: [] }],
      quantities: quantitiesFn
    };
  }

  registry['orks'] = {
    'Battlewagon': fixed('This model is equipped with: tracks and wheels.', ctx => {
      const q = {};
      add(ctx, q, 'Tracks and wheels', 1);
      return q;
    }),

    'Beast Snagga Boyz': {
      sections: [{
        title: 'Beast Snagga Boy replacements',
        description: 'For every 10 models in this unit, 1 Beast Snagga Boy\'s slugga and choppa can be replaced with 1 thump gun and 1 close combat weapon.',
        controls: [
          { key: 'thump_gun', label: '1 thump gun and 1 close combat weapon', max: models => Math.floor(Number(models || 0) / 10) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const boyCount = Math.max(0, ctx.modelCount - 1);
        const thumpGun = number(ctx, 'thump_gun');
        const maxThumpGun = Math.floor(Number(ctx.modelCount || 0) / 10);
        if (thumpGun > maxThumpGun) ctx.errors.push(`Thump guns must be ${maxThumpGun} or fewer; currently ${thumpGun}.`);
        if (thumpGun > boyCount) ctx.errors.push(`Thump gun upgrades exceed available Beast Snagga Boyz by ${thumpGun - boyCount}.`);
        const basicBoyz = Math.max(0, boyCount - thumpGun);
        add(ctx, q, 'Slugga', basicBoyz + 1);
        add(ctx, q, 'Power snappa', 1);
        add(ctx, q, 'Choppa', basicBoyz);
        add(ctx, q, 'Thump gun', thumpGun);
        add(ctx, q, 'Close combat weapon', thumpGun);
        ctx.derived.push(`Basic Beast Snagga Boyz: ${basicBoyz}. Thump guns: ${thumpGun}/${maxThumpGun}.`);
        return q;
      }
    },

    'Beastboss': fixed('This model is equipped with: shoota; beastchoppa; Beast Snagga klaw.', ctx => {
      const q = {};
      add(ctx, q, 'Shoota', 1);
      add(ctx, q, 'Beastchoppa', 1);
      add(ctx, q, 'Beast Snagga klaw', 1);
      return q;
    }),

    'Beastboss On Squigosaur': fixed('This model is equipped with: slugga; beastchoppa; Squigosaur’s jaws.', ctx => {
      const q = {};
      add(ctx, q, 'Slugga', 1);
      add(ctx, q, 'Beastchoppa', 1);
      add(ctx, q, 'Squigosaur’s jaws', 1);
      return q;
    }),

    'Big Mek': {
      sections: [{
        title: 'Big Mek ranged weapon',
        description: 'This model’s kustom mega-blasta can be replaced with 1 traktor blasta.',
        controls: [{
          type: 'select',
          key: 'ranged_weapon',
          label: 'Ranged weapon',
          value: 'kustom_mega_blasta',
          options: [
            { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' },
            { value: 'traktor_blasta', label: 'Traktor blasta' }
          ]
        }]
      }, {
        title: 'Big Mek melee weapon',
        description: 'This model’s power klaw can be replaced with 1 drilla.',
        controls: [{
          type: 'select',
          key: 'melee_weapon',
          label: 'Melee weapon',
          value: 'power_klaw',
          options: [
            { value: 'power_klaw', label: 'Power klaw' },
            { value: 'drilla', label: 'Drilla' }
          ]
        }]
      }],
      quantities: ctx => {
        const q = {};
        const rangedWeapon = select(ctx, 'ranged_weapon', 'kustom_mega_blasta');
        const meleeWeapon = select(ctx, 'melee_weapon', 'power_klaw');
        add(ctx, q, rangedWeapon === 'traktor_blasta' ? 'Traktor blasta' : 'Kustom mega-blasta', 1);
        add(ctx, q, meleeWeapon === 'drilla' ? 'Drilla' : 'Power klaw', 1);
        ctx.derived.push(`Big Mek loadout: ${rangedWeapon.replace(/_/g, ' ')} and ${meleeWeapon.replace(/_/g, ' ')}.`);
        return q;
      }
    },

    'Big Mek In Mega Armour': {
      sections: [{
        title: 'Primary weapon',
        description: 'This model’s kustom-mega blasta can be replaced with one of the following: 1 killsaw; 1 kombi-weapon; 1 kustom shoota.',
        controls: [{
          type: 'select',
          key: 'primary_weapon',
          label: 'Primary weapon',
          value: 'kustom_mega_blasta',
          options: [
            { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' },
            { value: 'killsaw', label: 'Killsaw' },
            { value: 'kombi_weapon', label: 'Kombi-weapon' },
            { value: 'kustom_shoota', label: 'Kustom shoota' }
          ]
        }]
      }, {
        title: 'Additional gear',
        description: 'This model can be equipped with one of the following: 1 tellyport blasta; 1 kustom force field. This model can be equipped with 1 grot oiler.',
        controls: [{
          type: 'select',
          key: 'additional_gear',
          label: 'Additional gear',
          value: 'none',
          options: [
            { value: 'none', label: 'None' },
            { value: 'tellyport_blasta', label: 'Tellyport blasta' },
            { value: 'kustom_force_field', label: 'Kustom force field' }
          ]
        }, {
          key: 'grot_oiler',
          label: '1 grot oiler',
          max: 1
        }]
      }],
      quantities: ctx => {
        const q = {};
        const primaryWeapon = select(ctx, 'primary_weapon', 'kustom_mega_blasta');
        const additionalGear = select(ctx, 'additional_gear', 'none');
        const grotOiler = Math.min(1, number(ctx, 'grot_oiler'));
        add(ctx, q, primaryWeapon === 'killsaw'
          ? 'Killsaw'
          : primaryWeapon === 'kombi_weapon'
            ? 'Kombi-weapon'
            : primaryWeapon === 'kustom_shoota'
              ? 'Kustom shoota'
              : 'Kustom mega-blasta', 1);
        add(ctx, q, 'Power klaw', 1);
        if (additionalGear === 'tellyport_blasta') add(ctx, q, 'Tellyport blasta', 1);
        if (additionalGear === 'kustom_force_field') add(ctx, q, 'Kustom force field', 1);
        add(ctx, q, 'Grot oiler', grotOiler);
        ctx.derived.push(`Big Mek in Mega Armour: ${primaryWeapon.replace(/_/g, ' ')}${additionalGear !== 'none' ? `, ${additionalGear.replace(/_/g, ' ')}` : ''}${grotOiler ? ', grot oiler' : ''}.`);
        return q;
      }
    },

    'Big Mek With Shokk Attack Gun': fixed('This model is equipped with: close combat weapon; shokk attack gun.', ctx => {
      const q = {};
      add(ctx, q, 'Close combat weapon', 1);
      add(ctx, q, 'Shokk attack gun', 1);
      return q;
    }),

    'Boyz': {
      sections: [{
        title: 'Boss Nob',
        description: 'The Boss Nob\'s big choppa can be replaced with 1 power klaw. The Boss Nob\'s big choppa and slugga can be replaced with 1 kombi-weapon and 1 close combat weapon.',
        controls: [
          {
            type: 'select',
            key: 'boss_nob_loadout',
            label: 'Boss Nob loadout',
            value: 'big_choppa',
            options: [
              { value: 'big_choppa', label: 'Slugga and big choppa' },
              { value: 'power_klaw', label: 'Slugga and power klaw' },
              { value: 'kombi_weapon', label: 'Kombi-weapon and close combat weapon' }
            ]
          }
        ]
      }, {
        title: 'Boyz',
        description: 'Any number of Boyz can each have their slugga and choppa replaced with 1 shoota and 1 close combat weapon. For every 10 models in this unit, 1 Boy\'s choppa and slugga can be replaced with 1 big shoota and 1 close combat weapon or 1 rokkit launcha and 1 close combat weapon.',
        controls: [
          { key: 'shoota_boy', label: '1 shoota and 1 close combat weapon', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'big_shoota', label: '1 big shoota and 1 close combat weapon', max: models => Math.floor(Number(models || 0) / 10) },
          { key: 'rokkit_launcha', label: '1 rokkit launcha and 1 close combat weapon', max: models => Math.floor(Number(models || 0) / 10) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const boyCount = Math.max(0, ctx.modelCount - 1);
        const maxHeavy = Math.floor(Number(ctx.modelCount || 0) / 10);
        const shootaBoyz = number(ctx, 'shoota_boy');
        const bigShootas = number(ctx, 'big_shoota');
        const rokkitLaunchas = number(ctx, 'rokkit_launcha');
        const bossNobLoadout = select(ctx, 'boss_nob_loadout', 'big_choppa');
        const specialBoyz = bigShootas + rokkitLaunchas;
        if (specialBoyz > maxHeavy) ctx.errors.push(`Big shoota and rokkit launcha upgrades must total ${maxHeavy} or fewer; currently ${specialBoyz}.`);
        if (shootaBoyz + specialBoyz > boyCount) ctx.errors.push(`Boy weapon swaps exceed available Boyz by ${shootaBoyz + specialBoyz - boyCount}.`);
        const sluggaChoppaBoyz = Math.max(0, boyCount - shootaBoyz - specialBoyz);

        add(ctx, q, 'Slugga', sluggaChoppaBoyz + (bossNobLoadout === 'kombi_weapon' ? 0 : 1));
        add(ctx, q, 'Choppa', sluggaChoppaBoyz);
        add(ctx, q, 'Shoota', shootaBoyz);
        add(ctx, q, 'Big shoota', bigShootas);
        add(ctx, q, 'Rokkit launcha', rokkitLaunchas);
        add(ctx, q, 'Close combat weapon', shootaBoyz + specialBoyz + (bossNobLoadout === 'kombi_weapon' ? 1 : 0));
        if (bossNobLoadout === 'power_klaw') add(ctx, q, 'Power klaw', 1);
        else if (bossNobLoadout === 'kombi_weapon') add(ctx, q, 'Kombi-weapon', 1);
        else add(ctx, q, 'Big choppa', 1);

        ctx.derived.push(`Slugga/choppa Boyz: ${sluggaChoppaBoyz}. Shoota Boyz: ${shootaBoyz}. Heavy weapon Boyz: ${specialBoyz}/${maxHeavy}.`);
        return q;
      }
    },

    'Burna Boyz': fixed('Every Spanner is equipped with: close combat weapon; big shoota. Every Burna Boy is equipped with: burna; cuttin’ flames.', ctx => {
      const q = {};
      const spanners = ctx.modelCount === 11 ? 2 : 1;
      const burnas = ctx.modelCount - spanners;
      add(ctx, q, 'Close combat weapon', spanners);
      add(ctx, q, 'Big shoota', spanners);
      add(ctx, q, 'Burna', burnas);
      add(ctx, q, 'Cuttin’ flames', burnas);
      return q;
    }),

    'Deff Dread': fixed('This model is equipped with: 2 big shootas; 2 dread klaws; stompy feet.', ctx => {
      const q = {};
      add(ctx, q, 'Big shoota', 2);
      add(ctx, q, 'Dread klaw', 2);
      add(ctx, q, 'Stompy feet', 1);
      return q;
    }),

    'Deffkoptas': fixed('Every model is equipped with: kopta rokkits; slugga; spinnin’ blades.', ctx => {
      const q = {};
      add(ctx, q, 'Kopta rokkits', ctx.modelCount);
      add(ctx, q, 'Slugga', ctx.modelCount);
      add(ctx, q, 'Spinnin’ blades', ctx.modelCount);
      return q;
    }),

    'Flash Gitz': fixed('Every model is equipped with: snazzgun; choppa.', ctx => {
      const q = {};
      add(ctx, q, 'Snazzgun', ctx.modelCount);
      add(ctx, q, 'Choppa', ctx.modelCount);
      return q;
    }),

    'Gretchin': fixed('Every Runtherd is equipped with: slugga; Runtherd tools. Every Gretchin is equipped with: grot blasta; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Slugga', 1);
      add(ctx, q, 'Runtherd tools', 1);
      add(ctx, q, 'Grot blasta', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'Close combat weapon', Math.max(0, ctx.modelCount - 1));
      return q;
    }),

    'Killa Kans': fixed('Every model is equipped with: Kan shoota; Kan klaw.', ctx => {
      const q = {};
      add(ctx, q, 'Kan shoota', ctx.modelCount);
      add(ctx, q, 'Kan klaw', ctx.modelCount);
      return q;
    }),

    'Kommandos': fixed('Every model is equipped with: slugga; choppa.', ctx => {
      const q = {};
      add(ctx, q, 'Slugga', ctx.modelCount);
      add(ctx, q, 'Choppa', ctx.modelCount);
      return q;
    }),

    'Lootas': fixed('Every Spanner is equipped with: big shoota; close combat weapon. Every Loota is equipped with: deffgun; close combat weapon.', ctx => {
      const q = {};
      const spanners = ctx.modelCount === 10 ? 2 : 1;
      const lootas = ctx.modelCount - spanners;
      add(ctx, q, 'Big shoota', spanners);
      add(ctx, q, 'Close combat weapon', ctx.modelCount);
      add(ctx, q, 'Deffgun', lootas);
      return q;
    }),

    'Meganobz': fixed('Every model is equipped with: kustom shoota; power klaw.', ctx => {
      const q = {};
      add(ctx, q, 'Kustom shoota', ctx.modelCount);
      add(ctx, q, 'Power klaw', ctx.modelCount);
      return q;
    }),

    'Nobz': {
      sections: [{
        title: 'Nob weapon swaps',
        description: 'Any number of models can each have their big choppa replaced with 1 power klaw. Any number of models can each have their slugga and big choppa replaced with 1 kombi-weapon and 1 close combat weapon.',
        controls: [
          { key: 'power_klaw', label: '1 power klaw', max: models => Number(models || 0) },
          { key: 'kombi_weapon', label: '1 kombi-weapon and 1 close combat weapon', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Ammo runt',
        description: 'For every 5 models in this unit, this unit can be equipped with 1 ammo runt.',
        controls: [
          { key: 'ammo_runt', label: '1 ammo runt', max: models => Math.floor(Number(models || 0) / 5) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const powerKlaws = number(ctx, 'power_klaw');
        const kombiWeapons = number(ctx, 'kombi_weapon');
        const ammoRunts = number(ctx, 'ammo_runt');
        const maxAmmoRunts = Math.floor(Number(ctx.modelCount || 0) / 5);
        if (powerKlaws + kombiWeapons > ctx.modelCount) {
          ctx.errors.push(`Nob weapon swaps exceed available models by ${powerKlaws + kombiWeapons - ctx.modelCount}.`);
        }
        if (ammoRunts > maxAmmoRunts) {
          ctx.errors.push(`Ammo runts must be ${maxAmmoRunts} or fewer; currently ${ammoRunts}.`);
        }
        const basicNobz = Math.max(0, ctx.modelCount - powerKlaws - kombiWeapons);
        add(ctx, q, 'Slugga', basicNobz + powerKlaws);
        add(ctx, q, 'Big choppa', basicNobz);
        add(ctx, q, 'Power klaw', powerKlaws);
        add(ctx, q, 'Kombi-weapon', kombiWeapons);
        add(ctx, q, 'Close combat weapon', kombiWeapons);
        add(ctx, q, 'Ammo runt', ammoRunts);
        ctx.derived.push(`Basic Nobz: ${basicNobz}. Power klaws: ${powerKlaws}. Kombi-weapons: ${kombiWeapons}. Ammo runts: ${ammoRunts}/${maxAmmoRunts}.`);
        return q;
      }
    },

    'Painboy': fixed('This model is equipped with: power klaw; ’urty syringe.', ctx => {
      const q = {};
      add(ctx, q, 'Power klaw', 1);
      add(ctx, q, '’Urty syringe', 1);
      return q;
    }),

    'Stormboyz': {
      sections: [{
        title: 'Boss Nob',
        description: 'The Boss Nob\'s choppa can be replaced with 1 power klaw.',
        controls: [
          {
            type: 'select',
            key: 'boss_nob_melee',
            label: 'Boss Nob melee weapon',
            value: 'choppa',
            options: [
              { value: 'choppa', label: 'Choppa' },
              { value: 'power klaw', label: 'Power klaw' }
            ]
          }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bossNobMelee = select(ctx, 'boss_nob_melee', 'choppa');
        const stormboyz = Math.max(0, ctx.modelCount - 1);
        add(ctx, q, 'Slugga', ctx.modelCount);
        add(ctx, q, 'Choppa', stormboyz + (bossNobMelee === 'choppa' ? 1 : 0));
        if (bossNobMelee === 'power klaw') add(ctx, q, 'Power klaw', 1);
        ctx.derived.push(`Stormboyz: ${stormboyz}. Boss Nob weapon: ${bossNobMelee}.`);
        return q;
      }
    },

    'Trukk': fixed('This model is equipped with: big shoota; spiked wheels.', ctx => {
      const q = {};
      add(ctx, q, 'Big shoota', 1);
      add(ctx, q, 'Spiked wheels', 1);
      return q;
    }),

    'Warbikers': fixed('Every model is equipped with: twin dakkagun; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Twin dakkagun', ctx.modelCount);
      add(ctx, q, 'Close combat weapon', ctx.modelCount);
      return q;
    }),

    'Warboss': {
      sections: [{
        title: 'Warboss melee weapon',
        description: 'This model\'s big choppa can be replaced with 1 power klaw.',
        controls: [
          {
            type: 'select',
            key: 'melee',
            label: 'Melee weapon',
            value: 'big choppa',
            options: [
              { value: 'big choppa', label: 'Big choppa' },
              { value: 'power klaw', label: 'Power klaw' }
            ]
          }
        ]
      }, {
        title: 'Attack squig',
        description: 'This model can be equipped with 1 attack squig.',
        controls: [
          { key: 'attack_squig', label: '1 attack squig', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const melee = select(ctx, 'melee', 'big choppa');
        const attackSquig = number(ctx, 'attack_squig');
        if (attackSquig > 1) ctx.errors.push(`Attack squigs must be 1 or fewer; currently ${attackSquig}.`);
        add(ctx, q, 'Kombi-weapon', 1);
        add(ctx, q, 'Twin slugga', 1);
        add(ctx, q, melee === 'power klaw' ? 'Power klaw' : 'Big choppa', 1);
        add(ctx, q, 'Attack squig', Math.min(attackSquig, 1));
        ctx.derived.push(`Warboss melee weapon: ${melee}. Attack squig: ${Math.min(attackSquig, 1)}.`);
        return q;
      }
    },

    'Warboss In Mega Armour': fixed('This model is equipped with: big shoota; ’uge choppa.', ctx => {
      const q = {};
      add(ctx, q, 'Big shoota', 1);
      add(ctx, q, '’Uge choppa', 1);
      return q;
    }),

    'Weirdboy': fixed('This model is equipped with: ’Eadbanger; weirdboy staff.', ctx => {
      const q = {};
      add(ctx, q, '’Eadbanger', 1);
      add(ctx, q, 'Weirdboy staff', 1);
      return q;
    }),

    'Big’ed Bossbunka': fixed('This model is equipped with: 4 big shootas; 2 supa-rokkits; supa-kannon; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'Big shoota', 4);
      add(ctx, q, 'Supa-rokkits', 2);
      add(ctx, q, 'Supa-kannon', 1);
      add(ctx, q, 'Armoured hull', 1);
      return q;
    }),

    'Blitza-bommer': fixed('This model is equipped with: big shoota; twin supa-shoota; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'Big shoota', 1);
      add(ctx, q, 'Twin supa-shoota', 1);
      add(ctx, q, 'Armoured hull', 1);
      return q;
    }),

    'Boomdakka Snazzwagon': fixed('This model is equipped with: big shoota; grot blasta; Mek speshul; spiked wheels.', ctx => {
      const q = {};
      add(ctx, q, 'Big shoota', 1);
      add(ctx, q, 'Grot blasta', 1);
      add(ctx, q, 'Mek speshul', 1);
      add(ctx, q, 'Spiked wheels', 1);
      return q;
    }),

    'Boss Snikrot': fixed('This model is equipped with: slugga; Mork’s Teeth.', ctx => {
      const q = {};
      add(ctx, q, 'Slugga', 1);
      add(ctx, q, 'Mork’s Teeth', 1);
      return q;
    }),

    'Breaka Boyz': fixed('The Boss Nob is equipped with: rokkit pistol; smash hammer; choppa. Each Breaka Boy is equipped with: smash hammer.', ctx => {
      const q = {};
      add(ctx, q, 'Rokkit pistol', 1);
      add(ctx, q, 'Choppa', 1);
      add(ctx, q, 'Smash hammer', ctx.modelCount);
      return q;
    }),

    'Burna-bommer': fixed('This model is equipped with: twin big shoota; twin supa-shoota; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'Twin big shoota', 1);
      add(ctx, q, 'Twin supa-shoota', 1);
      add(ctx, q, 'Armoured hull', 1);
      add(ctx, q, 'Skorcha missile rack', 1);
      return q;
    }),

    'Dakkajet': fixed('This model is equipped with: 2 twin supa-shootas; armoured hull.', ctx => {
      const q = {};
      add(ctx, q, 'Twin supa-shoota', 2);
      add(ctx, q, 'Armoured hull', 1);
      return q;
    }),

    'Deffkilla Wartrike': fixed('This model is equipped with: defkilla boomsticks; killajet; snagga klaw.', ctx => {
      const q = {};
      add(ctx, q, 'Boomstikks', 1);
      add(ctx, q, 'Killa jet – burna', 1);
      add(ctx, q, 'Killa jet – cutta', 1);
      add(ctx, q, 'Snagga klaw', 1);
      return q;
    }),

    'Gargantuan Squiggoth': {
      sections: [{
        title: 'Squiggoth gun',
        description: 'Select the mounted gun.',
        controls: [
          { type: 'select', key: 'gun', label: 'Mounted gun', value: 'Kannon', options: [
            { value: 'Kannon', label: 'Kannon' },
            { value: 'Supa-kannon', label: 'Supa-kannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'Huge tusks – strike', 1);
        add(ctx, q, 'Huge tusks – sweep', 1);
        if (select(ctx, 'gun', 'Kannon') === 'Kannon') {
          add(ctx, q, 'Kannon – frag', 1);
          add(ctx, q, 'Kannon – shell', 1);
        } else {
          add(ctx, q, 'Supa-kannon', 1);
        }
        return q;
      }
    },

    'Ghazghkull Thraka': fixed('Ghazghkull Thraka is equipped with: Mork’s Roar; Gork’s Klaw. Makari is equipped with: Makari’s stabba.', ctx => {
      const q = {};
      add(ctx, q, 'Mork’s Roar', 1);
      add(ctx, q, 'Gork’s Klaw - strike', 1);
      add(ctx, q, 'Gork’s Klaw - sweep', 1);
      add(ctx, q, 'Makari’s stabba', 1);
      return q;
    }),

    'Gorkanaut': fixed('This model is equipped with: deffstorm mega-shoota; 2 rokkit launchas; skorcha; 2 twin big shootas; klaw of Gork.', ctx => {
      const q = {};
      add(ctx, q, 'Deffstorm mega-shoota', 1);
      add(ctx, q, 'Rokkit launcha', 2);
      add(ctx, q, 'Skorcha', 1);
      add(ctx, q, 'Twin big shoota', 2);
      add(ctx, q, 'Klaw of Gork – strike', 1);
      add(ctx, q, 'Klaw of Gork – sweep', 1);
      return q;
    }),

    'Hunta Rig': fixed('This model is equipped with: ’eavy lobba; stikka kannon; butcha boyz; savage horns and hooves; saw blades.', ctx => {
      const q = {};
      add(ctx, q, '’Eavy lobba', 1);
      add(ctx, q, 'Stikka kannon', 1);
      add(ctx, q, 'Butcha boyz', 1);
      add(ctx, q, 'Savage horns and hooves', 1);
      add(ctx, q, 'Saw blades', 1);
      return q;
    }),

    'Kill Rig': fixed('This model is equipped with: ’eavy lobba; stikka kannon; wurrtower; butcha boyz; savage horns and hooves; saw blades.', ctx => {
      const q = {};
      add(ctx, q, '’Eavy lobba', 1);
      add(ctx, q, 'Stikka kannon', 1);
      add(ctx, q, 'Wurrtower', 1);
      add(ctx, q, 'Butcha boyz', 1);
      add(ctx, q, 'Savage horns and hooves', 1);
      add(ctx, q, 'Saw blades', 1);
      return q;
    }),

    'Kustom Boosta-blasta': fixed('This model is equipped with: burna exhausts; grot blasta; rivet kannon; spiked ram.', ctx => {
      const q = {};
      add(ctx, q, 'Burna exhausts', 1);
      add(ctx, q, 'Grot blasta', 1);
      add(ctx, q, 'Rivet kannon', 1);
      add(ctx, q, 'Spiked ram', 1);
      return q;
    }),

    'Megatrakk Scrapjet': fixed('This model is equipped with: rokkit kannon; 2 twin big shootas; wing missiles; nose drill.', ctx => {
      const q = {};
      add(ctx, q, 'Rokkit kannon', 1);
      add(ctx, q, 'Twin big shoota', 2);
      add(ctx, q, 'Wing missiles', 1);
      add(ctx, q, 'Nose drill', 1);
      return q;
    }),

    'Mek': fixed('This model is equipped with: kustom mega-slugga; wrench.', ctx => {
      const q = {};
      add(ctx, q, 'Kustom mega-slugga', 1);
      add(ctx, q, 'Wrench', 1);
      return q;
    }),

    'Mek Gunz': {
      sections: [{
        title: 'Mek Gun armament',
        description: 'Select the gun mounted on each Mek Gun.',
        controls: [
          { type: 'select', key: 'gun', label: 'Gun', value: 'Smasha gun', options: [
            { value: 'Smasha gun', label: 'Smasha gun' },
            { value: 'Bubblechukka', label: 'Bubblechukka' },
            { value: 'Kustom mega-kannon', label: 'Kustom mega-kannon' },
            { value: 'Traktor kannon', label: 'Traktor kannon' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const gun = select(ctx, 'gun', 'Smasha gun');
        if (gun === 'Bubblechukka') {
          add(ctx, q, 'Bubblechukka – big bubble', ctx.modelCount);
          add(ctx, q, 'Bubblechukka – dense bubble', ctx.modelCount);
          add(ctx, q, 'Bubblechukka – wobbly bubble', ctx.modelCount);
        } else {
          add(ctx, q, gun, ctx.modelCount);
        }
        add(ctx, q, 'Grot crew', ctx.modelCount);
        return q;
      }
    },

    'Morkanaut': fixed('This model is equipped with: kustom mega-blasta; kustom mega-zappa; 2 rokkit launchas; 2 twin big shootas; klaw of Mork.', ctx => {
      const q = {};
      add(ctx, q, 'Kustom mega-blasta', 1);
      add(ctx, q, 'Kustom mega-zappa', 1);
      add(ctx, q, 'Rokkit launcha', 2);
      add(ctx, q, 'Twin big shoota', 2);
      add(ctx, q, 'Klaw of Mork – strike', 1);
      add(ctx, q, 'Klaw of Mork – sweep', 1);
      return q;
    }),

    'Mozrog Skragbad': fixed('This model is equipped with: thump gun; Big Chompa’s jaws; gutrippa.', ctx => {
      const q = {};
      add(ctx, q, 'Thump gun', 1);
      add(ctx, q, 'Big Chompa’s jaws', 1);
      add(ctx, q, 'Gutrippa', 1);
      return q;
    }),

    'Painboss': fixed('This model is equipped with: Beast Snagga klaw.', ctx => {
      const q = {};
      add(ctx, q, 'Beast Snagga klaw', 1);
      return q;
    }),

    'Rukkatrukk Squigbuggy': fixed('This model is equipped with: sawn-off shotgun; squig-launchas; saw blades.', ctx => {
      const q = {};
      add(ctx, q, 'Sawn-off shotgun', 1);
      add(ctx, q, 'Squig launchas', 1);
      add(ctx, q, 'Saw blades', 1);
      return q;
    }),

    'Shokkjump Dragsta': fixed('This model is equipped with: kustom shokk rifle; rokkit launcha; saw blades.', ctx => {
      const q = {};
      add(ctx, q, 'Kustom shokk rifle', 1);
      add(ctx, q, 'Rokkit launcha', 1);
      add(ctx, q, 'Saw blades', 1);
      return q;
    }),

    'Squighog Boyz': fixed('Every Nob on Smasha Squig is equipped with: slugga; big choppa; squig jaws. Every Squighog Boy is equipped with: saddlegit weapons; stikka; squig jaws.', ctx => {
      const q = {};
      add(ctx, q, 'Slugga', 1);
      add(ctx, q, 'Big Choppa', 1);
      add(ctx, q, 'Saddlegit weapons', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'Stikka (1)', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'Squig jaws', ctx.modelCount);
      return q;
    }),

    'Stompa': fixed('This model is equipped with: 3 big shootas; deffkannon; skorcha; supa-gatler; supa-rokkits; twin big shoota; mega-choppa.', ctx => {
      const q = {};
      add(ctx, q, 'Big shoota', 3);
      add(ctx, q, 'Deffkannon', 1);
      add(ctx, q, 'Skorcha', 1);
      add(ctx, q, 'Supa-gatler', 1);
      add(ctx, q, 'Supa-rokkits', 1);
      add(ctx, q, 'Twin big shoota', 1);
      add(ctx, q, 'Mega-choppa – strike', 1);
      add(ctx, q, 'Mega-choppa – sweep', 1);
      return q;
    }),

    'Tankbustas': fixed('The Boss Nob is equipped with: 2 rokkit pistols; choppa. Each Tankbusta is equipped with: rokkit launcha; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Rokkit pistol', 2);
      add(ctx, q, 'Choppa', 1);
      add(ctx, q, 'Rokkit launcha', Math.max(0, ctx.modelCount - 1));
      add(ctx, q, 'Close combat weapon', Math.max(0, ctx.modelCount - 1));
      return q;
    }),

    'Wazbom Blastajet': {
      sections: [{
        title: 'Blastajet extra gun',
        description: 'Select the secondary gun system.',
        controls: [
          { type: 'select', key: 'extra', label: 'Secondary gun', value: 'Twin wazbom mega-kannon', options: [
            { value: 'Twin wazbom mega-kannon', label: 'Twin wazbom mega-kannon' },
            { value: 'Twin supa-shoota', label: 'Twin supa-shoota' },
            { value: 'Twin tellyport mega-blasta', label: 'Twin tellyport mega-blasta' }
          ] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'Smasha gun', 1);
        add(ctx, q, select(ctx, 'extra', 'Twin wazbom mega-kannon'), 1);
        add(ctx, q, 'Armoured hull', 1);
        return q;
      }
    },

    'Wurrboy': fixed('This model is equipped with: Eyez of Mork; close combat weapon.', ctx => {
      const q = {};
      add(ctx, q, 'Eyez of Mork', 1);
      add(ctx, q, 'Close combat weapon', 1);
      return q;
    }),

    'Zodgrod Wortsnagga': fixed('This model is equipped with: Da Grabzappa; slugga.', ctx => {
      const q = {};
      add(ctx, q, 'Da Grabzappa', 1);
      add(ctx, q, 'Slugga', 1);
      return q;
    })
  };

  Object.assign(registry['orks'], {
    'Big Mek': {
      sections: [{
        title: 'Big Mek ranged weapon',
        description: 'This model’s kustom mega-blasta can be replaced with 1 traktor blasta.',
        controls: [{
          type: 'select',
          key: 'ranged_weapon',
          label: 'Ranged weapon',
          value: 'kustom_mega_blasta',
          options: [
            { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' },
            { value: 'traktor_blasta', label: 'Traktor blasta' }
          ]
        }]
      }, {
        title: 'Big Mek melee weapon',
        description: 'This model’s power klaw can be replaced with 1 drilla.',
        controls: [{
          type: 'select',
          key: 'melee_weapon',
          label: 'Melee weapon',
          value: 'power_klaw',
          options: [
            { value: 'power_klaw', label: 'Power klaw' },
            { value: 'drilla', label: 'Drilla' }
          ]
        }]
      }],
      quantities: ctx => {
        const q = {};
        const rangedWeapon = select(ctx, 'ranged_weapon', 'kustom_mega_blasta');
        const meleeWeapon = select(ctx, 'melee_weapon', 'power_klaw');
        add(ctx, q, rangedWeapon === 'traktor_blasta' ? 'Traktor blasta' : 'Kustom mega-blasta', 1);
        add(ctx, q, meleeWeapon === 'drilla' ? 'Drilla' : 'Power klaw', 1);
        return q;
      }
    },

    'Big Mek In Mega Armour': {
      sections: [{
        title: 'Primary weapon',
        description: 'This model’s kustom-mega blasta can be replaced with one of the following: 1 killsaw; 1 kombi-weapon; 1 kustom shoota.',
        controls: [{
          type: 'select',
          key: 'primary_weapon',
          label: 'Primary weapon',
          value: 'kustom_mega_blasta',
          options: [
            { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' },
            { value: 'killsaw', label: 'Killsaw' },
            { value: 'kombi_weapon', label: 'Kombi-weapon' },
            { value: 'kustom_shoota', label: 'Kustom shoota' }
          ]
        }]
      }, {
        title: 'Additional gear',
        description: 'This model can be equipped with one of the following: 1 tellyport blasta; 1 kustom force field. This model can be equipped with 1 grot oiler.',
        controls: [{
          type: 'select',
          key: 'additional_gear',
          label: 'Additional gear',
          value: 'none',
          options: [
            { value: 'none', label: 'None' },
            { value: 'tellyport_blasta', label: 'Tellyport blasta' },
            { value: 'kustom_force_field', label: 'Kustom force field' }
          ]
        }, {
          key: 'grot_oiler',
          label: '1 grot oiler',
          max: 1
        }]
      }],
      quantities: ctx => {
        const q = {};
        const primaryWeapon = select(ctx, 'primary_weapon', 'kustom_mega_blasta');
        const additionalGear = select(ctx, 'additional_gear', 'none');
        const grotOiler = Math.min(1, number(ctx, 'grot_oiler'));
        add(ctx, q, primaryWeapon === 'killsaw'
          ? 'Killsaw'
          : primaryWeapon === 'kombi_weapon'
            ? 'Kombi-weapon'
            : primaryWeapon === 'kustom_shoota'
              ? 'Kustom shoota'
              : 'Kustom mega-blasta', 1);
        add(ctx, q, 'Power klaw', 1);
        if (additionalGear === 'tellyport_blasta') add(ctx, q, 'Tellyport blasta', 1);
        if (additionalGear === 'kustom_force_field') add(ctx, q, 'Kustom force field', 1);
        add(ctx, q, 'Grot oiler', grotOiler);
        return q;
      }
    },

    'Burna Boyz': {
      sections: [{
        title: 'Spanner weapon swaps',
        description: 'Any number of Spanners can each have their big shoota replaced with one of the following: 1 kustom mega-blasta; 1 rokkit launcha.',
        controls: [
          { key: 'kustom_mega_blasta', label: '1 kustom mega-blasta', max: models => (Number(models || 0) === 11 ? 2 : 1) },
          { key: 'rokkit_launcha', label: '1 rokkit launcha', max: models => (Number(models || 0) === 11 ? 2 : 1) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const spanners = ctx.modelCount === 11 ? 2 : 1;
        const burnas = ctx.modelCount - spanners;
        const kustomMegaBlastas = number(ctx, 'kustom_mega_blasta');
        const rokkitLaunchas = number(ctx, 'rokkit_launcha');
        if (kustomMegaBlastas + rokkitLaunchas > spanners) {
          ctx.errors.push(`Spanner weapon swaps exceed available Spanners by ${kustomMegaBlastas + rokkitLaunchas - spanners}.`);
        }
        const bigShootas = Math.max(0, spanners - kustomMegaBlastas - rokkitLaunchas);
        add(ctx, q, 'Close combat weapon', spanners);
        add(ctx, q, 'Big shoota', bigShootas);
        add(ctx, q, 'Kustom mega-blasta', kustomMegaBlastas);
        add(ctx, q, 'Rokkit launcha', rokkitLaunchas);
        add(ctx, q, 'Burna', burnas);
        add(ctx, q, 'Cuttinâ€™ flames', burnas);
        return q;
      }
    },

    'Deff Dread': {
      sections: [{
        title: 'Arm weapons',
        description: 'This model’s big shootas can each be replaced with one of the following: 1 dread klaw; 1 kustom-mega blasta; 1 rokkit launcha; 1 skorcha. This model’s dread klaws can each be replaced with one of the following: 1 big shoota; 1 kustom-mega blasta; 1 rokkit launcha; 1 skorcha.',
        controls: [
          { type: 'select', key: 'arm_1', label: 'Arm 1', value: 'big_shoota', options: [{ value: 'big_shoota', label: 'Big shoota' }, { value: 'dread_klaw', label: 'Dread klaw' }, { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' }, { value: 'rokkit_launcha', label: 'Rokkit launcha' }, { value: 'skorcha', label: 'Skorcha' }] },
          { type: 'select', key: 'arm_2', label: 'Arm 2', value: 'big_shoota', options: [{ value: 'big_shoota', label: 'Big shoota' }, { value: 'dread_klaw', label: 'Dread klaw' }, { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' }, { value: 'rokkit_launcha', label: 'Rokkit launcha' }, { value: 'skorcha', label: 'Skorcha' }] },
          { type: 'select', key: 'arm_3', label: 'Arm 3', value: 'dread_klaw', options: [{ value: 'big_shoota', label: 'Big shoota' }, { value: 'dread_klaw', label: 'Dread klaw' }, { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' }, { value: 'rokkit_launcha', label: 'Rokkit launcha' }, { value: 'skorcha', label: 'Skorcha' }] },
          { type: 'select', key: 'arm_4', label: 'Arm 4', value: 'dread_klaw', options: [{ value: 'big_shoota', label: 'Big shoota' }, { value: 'dread_klaw', label: 'Dread klaw' }, { value: 'kustom_mega_blasta', label: 'Kustom mega-blasta' }, { value: 'rokkit_launcha', label: 'Rokkit launcha' }, { value: 'skorcha', label: 'Skorcha' }] }
        ]
      }],
      quantities: ctx => {
        const q = {};
        ['arm_1', 'arm_2', 'arm_3', 'arm_4'].forEach((key, index) => {
          const choice = select(ctx, key, index < 2 ? 'big_shoota' : 'dread_klaw');
          add(ctx, q, choice === 'big_shoota'
            ? 'Big shoota'
            : choice === 'dread_klaw'
              ? 'Dread klaw'
              : choice === 'kustom_mega_blasta'
                ? 'Kustom mega-blasta'
                : choice === 'rokkit_launcha'
                  ? 'Rokkit launcha'
                  : 'Skorcha', 1);
        });
        add(ctx, q, 'Stompy feet', 1);
        return q;
      }
    },

    'Killa Kans': {
      sections: [{
        title: 'Kan shoota replacements',
        description: 'Each Killa Kan’s Kan shoota can be replaced with one of the following: 1 grotzooka; 1 rokkit launcha; 1 skorcha.',
        controls: [
          { key: 'grotzooka', label: '1 grotzooka', max: models => Number(models || 0) },
          { key: 'rokkit_launcha', label: '1 rokkit launcha', max: models => Number(models || 0) },
          { key: 'skorcha', label: '1 skorcha', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const grotzookas = number(ctx, 'grotzooka');
        const rokkitLaunchas = number(ctx, 'rokkit_launcha');
        const skorchas = number(ctx, 'skorcha');
        if (grotzookas + rokkitLaunchas + skorchas > ctx.modelCount) {
          ctx.errors.push(`Killa Kan gun swaps exceed available models by ${grotzookas + rokkitLaunchas + skorchas - ctx.modelCount}.`);
        }
        const kanShootas = Math.max(0, ctx.modelCount - grotzookas - rokkitLaunchas - skorchas);
        add(ctx, q, 'Kan shoota', kanShootas);
        add(ctx, q, 'Grotzooka', grotzookas);
        add(ctx, q, 'Rokkit launcha', rokkitLaunchas);
        add(ctx, q, 'Skorcha', skorchas);
        add(ctx, q, 'Kan klaw', ctx.modelCount);
        return q;
      }
    },

    'Lootas': {
      sections: [{
        title: 'Spanner weapon swaps',
        description: 'Any number of Spanners can each have their big shoota replaced with one of the following: 1 kustom mega-blasta; 1 rokkit launcha.',
        controls: [
          { key: 'kustom_mega_blasta', label: '1 kustom mega-blasta', max: models => (Number(models || 0) === 10 ? 2 : 1) },
          { key: 'rokkit_launcha', label: '1 rokkit launcha', max: models => (Number(models || 0) === 10 ? 2 : 1) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const spanners = ctx.modelCount === 10 ? 2 : 1;
        const lootas = ctx.modelCount - spanners;
        const kustomMegaBlastas = number(ctx, 'kustom_mega_blasta');
        const rokkitLaunchas = number(ctx, 'rokkit_launcha');
        if (kustomMegaBlastas + rokkitLaunchas > spanners) {
          ctx.errors.push(`Spanner weapon swaps exceed available Spanners by ${kustomMegaBlastas + rokkitLaunchas - spanners}.`);
        }
        const bigShootas = Math.max(0, spanners - kustomMegaBlastas - rokkitLaunchas);
        add(ctx, q, 'Big shoota', bigShootas);
        add(ctx, q, 'Kustom mega-blasta', kustomMegaBlastas);
        add(ctx, q, 'Rokkit launcha', rokkitLaunchas);
        add(ctx, q, 'Deffgun', lootas);
        add(ctx, q, 'Close combat weapon', ctx.modelCount);
        return q;
      }
    },

    'Kommandos': {
      sections: [{
        title: 'Boss Nob',
        description: 'The Boss Nob\'s choppa can be replaced with 1 big choppa or 1 power klaw.',
        controls: [{
          type: 'select',
          key: 'boss_nob_melee',
          label: 'Boss Nob melee weapon',
          value: 'choppa',
          options: [
            { value: 'choppa', label: 'Choppa' },
            { value: 'big_choppa', label: 'Big choppa' },
            { value: 'power_klaw', label: 'Power klaw' }
          ]
        }]
      }, {
        title: 'Kommandos',
        description: 'Up to 2 Kommandos can each have their slugga and choppa replaced with 1 speshul Kommando shoota and 1 close combat weapon. 1 Kommando\'s slugga and choppa can be replaced with 1 breacha ram. 1 Kommando\'s slugga and choppa can be replaced with 1 burna and 1 close combat weapon. 1 Kommando\'s slugga and choppa can be replaced with 1 rokkit launcha and 1 close combat weapon.',
        controls: [
          { key: 'speshul_kommando_shoota', label: '1 speshul Kommando shoota and 1 close combat weapon', max: 2 },
          { key: 'breacha_ram', label: '1 breacha ram', max: 1 },
          { key: 'burna', label: '1 burna and 1 close combat weapon', max: 1 },
          { key: 'rokkit_launcha', label: '1 rokkit launcha and 1 close combat weapon', max: 1 }
        ]
      }, {
        title: 'Unit gear',
        description: 'This unit can be equipped with 1 bomb squig and 1 distraction grot.',
        controls: [
          { key: 'bomb_squig', label: '1 bomb squig', max: 1 },
          { key: 'distraction_grot', label: '1 distraction grot', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bossNobMelee = select(ctx, 'boss_nob_melee', 'choppa');
        const speshulShootas = number(ctx, 'speshul_kommando_shoota');
        const breachaRam = number(ctx, 'breacha_ram');
        const burna = number(ctx, 'burna');
        const rokkitLauncha = number(ctx, 'rokkit_launcha');
        const bombSquig = Math.min(1, number(ctx, 'bomb_squig'));
        const distractionGrot = Math.min(1, number(ctx, 'distraction_grot'));
        const specialKommandos = speshulShootas + breachaRam + burna + rokkitLauncha;
        const basicKommandos = Math.max(0, 9 - specialKommandos);
        if (speshulShootas > 2) ctx.errors.push(`Speshul Kommando shootas must be 2 or fewer; currently ${speshulShootas}.`);
        if (specialKommandos > 9) ctx.errors.push(`Kommando swaps exceed available Kommandos by ${specialKommandos - 9}.`);
        add(ctx, q, 'Slugga', basicKommandos + 1);
        add(ctx, q, 'Choppa', basicKommandos + (bossNobMelee === 'choppa' ? 1 : 0));
        add(ctx, q, 'Big choppa', bossNobMelee === 'big_choppa' ? 1 : 0);
        add(ctx, q, 'Power klaw', bossNobMelee === 'power_klaw' ? 1 : 0);
        add(ctx, q, 'Speshul Kommando shoota', speshulShootas);
        add(ctx, q, 'Breacha ram', breachaRam);
        add(ctx, q, 'Burna', burna);
        add(ctx, q, 'Rokkit launcha', rokkitLauncha);
        add(ctx, q, 'Close combat weapon', speshulShootas + burna + rokkitLauncha);
        add(ctx, q, 'Bomb squig', bombSquig);
        add(ctx, q, 'Distraction grot', distractionGrot);
        return q;
      }
    },

    'Meganobz': {
      sections: [{
        title: 'Meganob ranged weapon swaps',
        description: 'Any number of models can each have their kustom shoota replaced with 1 kombi-weapon.',
        controls: [
          { key: 'kombi_weapon', label: '1 kombi-weapon', max: models => Number(models || 0) }
        ]
      }, {
        title: 'Meganob melee weapon swaps',
        description: 'Any number of models can each have their power klaw replaced with 1 killsaw. Any number of models can each have their kustom shoota and power klaw replaced with 1 twin killsaw.',
        controls: [
          { key: 'killsaw', label: '1 killsaw', max: models => Number(models || 0) },
          { key: 'twin_killsaw', label: '1 twin killsaw', max: models => Number(models || 0) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const kombiWeapons = number(ctx, 'kombi_weapon');
        const killsaws = number(ctx, 'killsaw');
        const twinKillsaws = number(ctx, 'twin_killsaw');
        if (kombiWeapons + twinKillsaws > ctx.modelCount) {
          ctx.errors.push(`Kombi-weapon swaps exceed available Meganobz by ${kombiWeapons + twinKillsaws - ctx.modelCount}.`);
        }
        if (killsaws + twinKillsaws > ctx.modelCount) {
          ctx.errors.push(`Killsaw swaps exceed available Meganobz by ${killsaws + twinKillsaws - ctx.modelCount}.`);
        }
        const defaultMeganobz = Math.max(0, ctx.modelCount - kombiWeapons - killsaws - twinKillsaws);
        add(ctx, q, 'Kustom shoota', defaultMeganobz + killsaws);
        add(ctx, q, 'Kombi-weapon', kombiWeapons);
        add(ctx, q, 'Power klaw', defaultMeganobz + kombiWeapons);
        add(ctx, q, 'Killsaw', killsaws);
        add(ctx, q, 'Twin killsaw', twinKillsaws);
        return q;
      }
    },

    'Warbikers': {
      sections: [{
        title: 'Warbiker gear',
        description: 'Each Warbiker can be equipped with 1 slugga or 1 choppa. The Boss Nob on Warbike can be equipped with 1 slugga, 1 big choppa or 1 power klaw.',
        controls: [
          { key: 'warbiker_slugga', label: '1 slugga', max: models => Math.max(0, Number(models || 0) - 1) },
          { key: 'warbiker_choppa', label: '1 choppa', max: models => Math.max(0, Number(models || 0) - 1) },
          {
            type: 'select',
            key: 'boss_nob_gear',
            label: 'Boss Nob on Warbike',
            value: 'none',
            options: [
              { value: 'none', label: 'No extra gear' },
              { value: 'slugga', label: 'Slugga' },
              { value: 'big_choppa', label: 'Big choppa' },
              { value: 'power_klaw', label: 'Power klaw' }
            ]
          }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const warbikerCount = Math.max(0, ctx.modelCount - 1);
        const warbikerSlugga = number(ctx, 'warbiker_slugga');
        const warbikerChoppa = number(ctx, 'warbiker_choppa');
        const bossNobGear = select(ctx, 'boss_nob_gear', 'none');
        if (warbikerSlugga + warbikerChoppa > warbikerCount) {
          ctx.errors.push(`Warbiker optional gear exceeds available Warbikers by ${warbikerSlugga + warbikerChoppa - warbikerCount}.`);
        }
        add(ctx, q, 'Twin dakkagun', ctx.modelCount);
        add(ctx, q, 'Close combat weapon', ctx.modelCount);
        add(ctx, q, 'Slugga', warbikerSlugga + (bossNobGear === 'slugga' ? 1 : 0));
        add(ctx, q, 'Choppa', warbikerChoppa);
        add(ctx, q, 'Big choppa', bossNobGear === 'big_choppa' ? 1 : 0);
        add(ctx, q, 'Power klaw', bossNobGear === 'power_klaw' ? 1 : 0);
        return q;
      }
    },

    'Battlewagon': {
      sections: [{
        title: 'Primary gun',
        description: 'This model can be equipped with one of the following: 1 kannon; 1 killkannon; 1 zzap gun.',
        controls: [{
          type: 'select',
          key: 'primary_gun',
          label: 'Primary gun',
          value: 'none',
          options: [
            { value: 'none', label: 'None' },
            { value: 'kannon', label: 'Kannon' },
            { value: 'killkannon', label: 'Killkannon' },
            { value: 'zzap_gun', label: 'Zzap gun' }
          ]
        }]
      }, {
        title: 'Additional guns',
        description: 'This model can be equipped with 1 lobba. This model can be equipped with up to 4 big shootas.',
        controls: [
          { key: 'lobba', label: '1 lobba', max: 1 },
          { key: 'big_shoota', label: '1 big shoota', max: 4 }
        ]
      }, {
        title: 'Hull upgrades',
        description: 'This model’s tracks and wheels can be replaced with 1 deff rolla. This model can be equipped with any of the following: 1 ’ard case; 1 grabbin’ klaw; 1 wreckin’ ball.',
        controls: [
          { key: 'deff_rolla', label: '1 deff rolla', max: 1 },
          { key: 'ard_case', label: '1 ’ard case', max: 1 },
          { key: 'grabbin_klaw', label: '1 grabbin’ klaw', max: 1 },
          { key: 'wreckin_ball', label: '1 wreckin’ ball', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const primaryGun = select(ctx, 'primary_gun', 'none');
        const lobba = Math.min(1, number(ctx, 'lobba'));
        const bigShootas = Math.min(4, number(ctx, 'big_shoota'));
        const deffRolla = Math.min(1, number(ctx, 'deff_rolla'));
        const ardCase = Math.min(1, number(ctx, 'ard_case'));
        const grabbinKlaw = Math.min(1, number(ctx, 'grabbin_klaw'));
        const wreckinBall = Math.min(1, number(ctx, 'wreckin_ball'));
        if (number(ctx, 'big_shoota') > 4) ctx.errors.push(`Battlewagon big shootas must be 4 or fewer; currently ${number(ctx, 'big_shoota')}.`);
        add(ctx, q, 'Tracks and wheels', deffRolla ? 0 : 1);
        add(ctx, q, 'Deff rolla', deffRolla);
        add(ctx, q, 'Big shoota', bigShootas);
        add(ctx, q, 'Lobba', lobba);
        if (primaryGun === 'kannon') add(ctx, q, 'Kannon – frag', 1);
        if (primaryGun === 'kannon') add(ctx, q, 'Kannon – shell', 1);
        if (primaryGun === 'killkannon') add(ctx, q, 'Killkannon', 1);
        if (primaryGun === 'zzap_gun') add(ctx, q, 'Zzap gun', 1);
        add(ctx, q, 'Grabbin’ klaw', grabbinKlaw);
        add(ctx, q, 'Wreckin’ ball', wreckinBall);
        if (ardCase) ctx.derived.push('Battlewagon equipped with ’ard case.');
        return q;
      }
    },

    'Big’ed Bossbunka': {
      sections: [{
        title: 'Additional guns',
        description: 'This model can be equipped with up to 3 additional big shootas.',
        controls: [
          { key: 'big_shoota', label: '1 additional big shoota', max: 3 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bigShootas = Math.min(3, number(ctx, 'big_shoota'));
        if (number(ctx, 'big_shoota') > 3) ctx.errors.push(`Big’ed Bossbunka additional big shootas must be 3 or fewer; currently ${number(ctx, 'big_shoota')}.`);
        add(ctx, q, 'Big shoota', 1 + bigShootas);
        add(ctx, q, 'Gaze of Gork – glare', 1);
        add(ctx, q, 'Gaze of Gork – squint', 1);
        return q;
      }
    },

    'Deffkoptas': {
      sections: [{
        title: 'Kopta rokkit replacements',
        description: 'For every 3 models in this unit, 1 Deffkopta can have its kopta rokkits replaced with 1 kustom mega-blasta.',
        controls: [
          { key: 'kustom_mega_blasta', label: '1 kustom mega-blasta', max: models => Math.floor(Number(models || 0) / 3) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const kustomMegaBlastas = number(ctx, 'kustom_mega_blasta');
        const maxKmb = Math.floor(Number(ctx.modelCount || 0) / 3);
        if (kustomMegaBlastas > maxKmb) ctx.errors.push(`Deffkopta kustom mega-blastas must be ${maxKmb} or fewer; currently ${kustomMegaBlastas}.`);
        const koptaRokkits = Math.max(0, ctx.modelCount - kustomMegaBlastas);
        add(ctx, q, 'Kopta rokkits', koptaRokkits);
        add(ctx, q, 'Kustom mega-blasta', kustomMegaBlastas);
        add(ctx, q, 'Slugga', ctx.modelCount);
        add(ctx, q, 'Spinnin’ blades', ctx.modelCount);
        return q;
      }
    },

    'Dakkajet': {
      sections: [{
        title: 'Additional gun',
        description: 'This model can be equipped with 1 additional twin supa-shoota.',
        controls: [
          { key: 'twin_supa_shoota', label: '1 additional twin supa-shoota', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'Twin supa-shoota', 2 + Math.min(1, number(ctx, 'twin_supa_shoota')));
        add(ctx, q, 'Armoured hull', 1);
        return q;
      }
    },

    'Flash Gitz': {
      sections: [{
        title: 'Ammo runt',
        description: 'This unit can be equipped with 1 ammo runt.',
        controls: [
          { key: 'ammo_runt', label: '1 ammo runt', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const ammoRunt = Math.min(1, number(ctx, 'ammo_runt'));
        add(ctx, q, 'Snazzgun', ctx.modelCount);
        add(ctx, q, 'Choppa', ctx.modelCount);
        add(ctx, q, 'Ammo runt', ammoRunt);
        return q;
      }
    },

    'Burna-bommer': {
      sections: [{
        title: 'Additional missiles',
        description: 'This model can be equipped with 1 skorcha missile rack.',
        controls: [
          { key: 'skorcha_missile_rack', label: '1 skorcha missile rack', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'Twin big shoota', 1);
        add(ctx, q, 'Twin supa-shoota', 1);
        add(ctx, q, 'Armoured hull', 1);
        add(ctx, q, 'Skorcha missile rack', Math.min(1, number(ctx, 'skorcha_missile_rack')));
        return q;
      }
    },

    'Trukk': {
      sections: [{
        title: 'Additional wargear',
        description: 'This model can be equipped with 1 wreckin’ ball.',
        controls: [
          { key: 'wreckin_ball', label: '1 wreckin’ ball', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'Big shoota', 1);
        add(ctx, q, 'Spiked wheels', 1);
        add(ctx, q, 'Wreckin’ ball', Math.min(1, number(ctx, 'wreckin_ball')));
        return q;
      }
    }
  });

  Object.assign(registry['orks'], {
    'Breaka Boyz': {
      sections: [{
        title: 'Boss Nob',
        description: 'The Boss Nobâ€™s smash hammer can be replaced with 1 rokkit pistol.',
        controls: [{
          key: 'boss_nob_extra_rokkit_pistol',
          label: '1 rokkit pistol',
          max: 1
        }]
      }, {
        title: 'Breaka Boy weapons',
        description: 'One Breaka Boyâ€™s smash hammer can be replaced with 1 knucklebustas. One Breaka Boyâ€™s smash hammer can be replaced with 1 tankhammer.',
        controls: [
          { key: 'knucklebustas', label: '1 knucklebustas', max: 1 },
          { key: 'tankhammer', label: '1 tankhammer', max: 1 }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const bossNobExtraRokkitPistol = Math.min(1, number(ctx, 'boss_nob_extra_rokkit_pistol'));
        const knucklebustas = Math.min(1, number(ctx, 'knucklebustas'));
        const tankhammer = Math.min(1, number(ctx, 'tankhammer'));
        if (knucklebustas + tankhammer > 1) ctx.errors.push(`Breaka Boy special weapon swaps must total 1 or fewer; currently ${knucklebustas + tankhammer}.`);
        const smashHammers = Math.max(0, ctx.modelCount - knucklebustas - tankhammer);
        add(ctx, q, 'Rokkit pistol', 1 + bossNobExtraRokkitPistol);
        add(ctx, q, 'Choppa', 1);
        add(ctx, q, 'Smash hammer', smashHammers);
        add(ctx, q, 'Knucklebustas', knucklebustas);
        add(ctx, q, 'Tankhammer', tankhammer);
        return q;
      }
    },

    'Beastboss On Squigosaur': {
      sections: [{
        title: 'Additional wargear',
        description: 'This model can be equipped with 1 thump gun.',
        controls: [{
          key: 'thump_gun',
          label: '1 thump gun',
          max: 1
        }]
      }],
      quantities: ctx => {
        const q = {};
        add(ctx, q, 'Slugga', 1);
        add(ctx, q, 'Beastchoppa', 1);
        add(ctx, q, 'Squigosaur’s jaws', 1);
        add(ctx, q, 'Thump gun', Math.min(1, number(ctx, 'thump_gun')));
        return q;
      }
    },

    'Mek': {
      sections: [{
        title: 'Melee weapon',
        description: 'This modelâ€™s wrench can be replaced with 1 killsaw.',
        controls: [{
          type: 'select',
          key: 'melee_weapon',
          label: 'Melee weapon',
          value: 'wrench',
          options: [
            { value: 'wrench', label: 'Wrench' },
            { value: 'killsaw', label: 'Killsaw' }
          ]
        }]
      }],
      quantities: ctx => {
        const q = {};
        const meleeWeapon = select(ctx, 'melee_weapon', 'wrench');
        add(ctx, q, 'Kustom mega-slugga', 1);
        add(ctx, q, meleeWeapon === 'killsaw' ? 'Killsaw' : 'Wrench', 1);
        return q;
      }
    },

    'Squighog Boyz': {
      sections: [{
        title: 'Bomb squigs',
        description: 'For every 3 models in this unit, this unit can be equipped with 1 bomb squig.',
        controls: [
          { key: 'bomb_squig', label: '1 bomb squig', max: models => Math.floor(Number(models || 0) / 3) }
        ]
      }],
      quantities: ctx => {
        const q = {};
        const totalModels = Number(ctx.modelCount || 0);
        const maxBombSquigs = Math.floor(totalModels / 3);
        const bombSquigs = number(ctx, 'bomb_squig');
        const nobs = totalModels >= 8 ? 2 : 1;
        const squighogBoyz = Math.max(0, totalModels - nobs);
        if (bombSquigs > maxBombSquigs) ctx.errors.push(`Bomb squigs must be ${maxBombSquigs} or fewer; currently ${bombSquigs}.`);
        add(ctx, q, 'Slugga', nobs);
        add(ctx, q, 'Big Choppa', nobs);
        add(ctx, q, 'Saddlegit weapons', squighogBoyz);
        add(ctx, q, 'Stikka (1)', squighogBoyz);
        add(ctx, q, 'Squig jaws', totalModels);
        add(ctx, q, 'Bomb squig', Math.min(bombSquigs, maxBombSquigs));
        return q;
      }
    },

    'Tankbustas': {
      sections: [{
        title: 'Boss Nob',
        description: '1 of the Boss Nobâ€™s rokkit pistols can be replaced with 1 smash hammer.',
        controls: [{
          key: 'boss_nob_smash_hammer',
          label: '1 smash hammer',
          max: 1
        }]
      }, {
        title: 'Tankbusta gear',
        description: 'One Tankbusta can be equipped with one of the following: 1 pulsa rokkit; 1 additional rokkit launcha.',
        controls: [{
          type: 'select',
          key: 'tankbusta_upgrade',
          label: 'Tankbusta upgrade',
          value: 'none',
          options: [
            { value: 'none', label: 'None' },
            { value: 'pulsa_rokkit', label: 'Pulsa rokkit' },
            { value: 'additional_rokkit_launcha', label: '1 additional rokkit launcha' }
          ]
        }]
      }],
      quantities: ctx => {
        const q = {};
        const bossNobSmashHammer = Math.min(1, number(ctx, 'boss_nob_smash_hammer'));
        const tankbustaUpgrade = select(ctx, 'tankbusta_upgrade', 'none');
        add(ctx, q, 'Rokkit pistol', 2 - bossNobSmashHammer);
        add(ctx, q, 'Smash hammer', bossNobSmashHammer);
        add(ctx, q, 'Choppa', 1);
        add(ctx, q, 'Rokkit launcha', 5 + (tankbustaUpgrade === 'additional_rokkit_launcha' ? 1 : 0));
        add(ctx, q, 'Close combat weapon', 5);
        add(ctx, q, 'Pulsa rokkit', tankbustaUpgrade === 'pulsa_rokkit' ? 1 : 0);
        return q;
      }
    }
  });
}());
