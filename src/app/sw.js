const CACHE_NAME = 'popfilms-v1';
const STATIC_ASSETS = [
    '/',
    '/assets/images/poster.png',
    '/assets/images/star_photo.png',
    '/assets/images/film_card.png',
    '/assets/videos/trailer.mp4',
];

const API_ENDPOINTS = [
    '/api/v1/auth/signin',
    '/api/v1/auth/signup',
    '/api/v1/auth/check',
    '/api/movies',
];

self.addEventListener('install', (event) => {
    console.log('SW: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('SW: Activating...');
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                )
            )
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // кэш апи Network First
    if (API_ENDPOINTS.some((endpoint) => url.pathname.startsWith(endpoint))) {
        event.respondWith(
            fetch(request).catch(() => {
                console.log('SW: API offline — using cache');
                return caches
                    .match(request)
                    .then(
                        (response) =>
                            response ||
                            new Response('Offline — no cached data', {
                                status: 503,
                            })
                    );
            })
        );
        return;
    }

    // кэш firstt
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                console.log('SW: Serving from cache:', request.url);
                return cachedResponse;
            }

            return fetch(request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    console.log('SW: Network error — offline mode');
                    if (request.destination === 'document') {
                        return caches.match('/');
                    }
                    return new Response('Offline — resource not found', {
                        status: 404,
                    });
                });
        })
    );
});
