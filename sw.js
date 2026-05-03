const CACHE_NAME = 'romeo-codepad-v3';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://i.postimg.cc/Gp5QYTPd/Picsart-26-05-03-04-30-32-110.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
