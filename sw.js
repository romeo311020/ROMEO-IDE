const CACHE_NAME = 'romany-ide-v5';

const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/Gp5QYTPd/Picsart-26-05-03-04-30-32-110.jpg'
];

// تثبيت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل (مهم جدًا لتنظيف الكاش القديم)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// الفيتش (تشغيل أوفلاين)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});