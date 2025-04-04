importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);

const cacheName = "buldak-v1";
const contentToCache = [
    "./",
    "./icons/manifest-icon-192.maskable.png",
    "./icons/manifest-icon-512.maskable.png"
]

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(contentToCache);
        })(),
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(async function () {
        try {
            var res = await fetch(event.request);
            var cache = await caches.open('cache');
            cache.put(event.request.url, res.clone());
            return res;
        }
        catch (error) {
            return caches.match(event.request);
        }
    }());
});
