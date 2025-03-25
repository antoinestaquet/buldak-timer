importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
        new workbox.strategies.CacheFirst()
);

const cacheName = "buldak-v1";
const contentToCache = [
    "/buldak-timer/index.html",
    "/buldak-timer/icons/manifest-icon-192.maskable.png",
    "/buldak-timer/icons/manifest-icon-512.maskable.png"
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
  