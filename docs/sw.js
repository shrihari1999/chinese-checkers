// Network-only service worker — no caching, so updates are instant
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  // Clear any old caches from previous versions
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.map(name => caches.delete(name)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
