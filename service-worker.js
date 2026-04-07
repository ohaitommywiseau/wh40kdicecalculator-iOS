const CACHE_NAME = 'wh40k-dice-calculator-v5';
const APP_SHELL = [
  './',
  './astra_militarum_dice_calculator_vFinal_themed_v2.html',
  './manifest.webmanifest',
  './service-worker.js',
  './servo.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './data/abilities/unit-abilities.js',
  './data/abilities/weapon-abilities.js',
  './data/factions/index.js',
  './data/points/points-v4.js',
  './data/unit-composition/unit-composition.js',
  './data/wargear/astra-militarum-wargear.js',
  './data/factions/adepta-sororitas.js',
  './data/factions/adeptus-custodes.js',
  './data/factions/adeptus-mechanicus.js',
  './data/factions/adeptus-titanicus.js',
  './data/factions/aeldari.js',
  './data/factions/astra-militarum.js',
  './data/factions/chaos-daemons.js',
  './data/factions/chaos-knights.js',
  './data/factions/chaos-space-marines.js',
  './data/factions/death-guard.js',
  './data/factions/drukhari.js',
  './data/factions/emperor-s-children.js',
  './data/factions/genestealer-cults.js',
  './data/factions/grey-knights.js',
  './data/factions/imperial-agents.js',
  './data/factions/imperial-knights.js',
  './data/factions/leagues-of-votann.js',
  './data/factions/necrons.js',
  './data/factions/orks.js',
  './data/factions/space-marines.js',
  './data/factions/t-au-empire.js',
  './data/factions/thousand-sons.js',
  './data/factions/tyranids.js',
  './data/factions/world-eaters.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./astra_militarum_dice_calculator_vFinal_themed_v2.html')),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
        return networkResponse;
      });
    }),
  );
});

