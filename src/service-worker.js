console.log('Service worker registred !');

const version = 'v1';

const excludeFromCache = [
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(version)
      .then(function(cache) {
        return cache.addAll([
        ])
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('message', function(event) {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  if (event.request.method === 'GET' && !excludeFromCache.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request)
            .then(function(response) {
              const responseClone = response.clone();
              caches.open(version)
                .then(function(cache) {
                  cache.put(event.request, responseClone);
                })

                return response;
            })
        })
        .catch(function() {
          return caches.match('index.html');
        })
    )
  }
});
