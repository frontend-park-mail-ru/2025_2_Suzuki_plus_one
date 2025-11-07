const CACHE_NAME = 'popfilms-v1';
const STATIC_ASSETS = [
    '/',
    '/src/app/index.html',
    '/src/app/main.js',
    '/src/app/App.js',
    '/src/app/navigation/router.js',

    '/src/app/styles/auth.css',
    '/src/app/styles/base.css',
    '/src/app/styles/footer.css',
    '/src/app/styles/header.css',
    '/src/app/styles/index.css',
    '/src/app/styles/movies.css',

    '/src/pages/Home/Home.js',
    '/src/pages/Login/Login.js',
    '/src/pages/Signup/Signup.js',
    '/src/pages/FilmPage/FilmPage.js',
    '/src/pages/StarPage/StarPage.js',
    '/src/pages/Account/Account.js',
    '/src/pages/NotFound/NotFound.js',

    '/src/features/FilmCard/FilmCard.js',
    '/src/features/StarCard/StarCard.js',

    '/src/widgets/Player/Player.js',
    '/src/widgets/Player/js/player-controls.js',

    '/src/shared/components/Header/Header.js',
    '/src/shared/components/Footer/Footer.js',

    '/src/shared/utils/errorHandler.js',
    '/src/shared/utils/validation.js',
    '/src/shared/ui/passwordToggle.js',

    '/src/shared/api/checkAuth.js',
    '/src/shared/api/loginApi.js',
    '/src/shared/api/signupApi.js',
    '/src/shared/api/signOut.js',
    '/src/shared/api/moviesApi.js',

    '/src/shared/assets/images/poster.png',
    '/src/shared/assets/images/star_photo.png',
    '/src/shared/assets/images/film_card.png',
    '/src/shared/assets/images/film_card2.png',
    '/src/shared/assets/images/logo.svg',
    '/src/shared/assets/images/user-icon.svg',
    '/src/shared/assets/images/hero_bg.svg',
    '/src/shared/assets/images/bg_picture.svg',

    '/src/shared/assets/images/icons/play_icon.svg',
    '/src/shared/assets/images/icons/pause_icon.svg',
    '/src/shared/assets/images/icons/volume_icon.svg',
    '/src/shared/assets/images/icons/mute.svg',
    '/src/shared/assets/images/icons/full_screen.svg',
    '/src/shared/assets/images/icons/exit_full_screen.svg',
    '/src/shared/assets/images/icons/thumb_up.svg',
    '/src/shared/assets/images/icons/thumb_down.svg',
    '/src/shared/assets/images/icons/search.svg',
    '/src/shared/assets/images/icons/menu.svg',
    '/src/shared/assets/images/icons/chevron_down.svg',
    '/src/shared/assets/images/icons/generic_avatar.svg',
    '/src/shared/assets/images/icons/pencil-white.svg',
    '/src/shared/assets/images/icons/camera-white.svg',

    '/src/shared/assets/videos/trailer.mp4',

    '/src/shared/assets/fonts/Akshar-Bold.woff2',
    '/src/shared/assets/fonts/Akshar-Regular.woff2',

    '/src/shared/assets/favicon.ico',
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

    if (
        request.url.startsWith('chrome-extension://') ||
        request.url.startsWith('chrome-devtools://') ||
        request.url.startsWith('ws://') ||
        request.url.startsWith('wss://')
    ) {
        return;
    }

    // кэш апи Network First
    if (API_ENDPOINTS.some((endpoint) => url.pathname.startsWith(endpoint))) {
        event.respondWith(
            fetch(request).catch(() => {
                console.log('SW: API offline — using cache');
                return caches.match(request).then(
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
