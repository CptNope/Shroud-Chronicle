// Service Worker Version: v1.2.0
// Increment this version comment to trigger a browser update on the client side.

const CACHE_NAME = 'shroud-chronicle-v1-2';

// CRITICAL FIX: Only pre-cache local app shell files.
// External URLs (CDNs) caused CORS errors during the 'install' phase on GitHub Pages.
// These will now be cached dynamically at runtime (lazy caching) via the fetch listener below.
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  // skipWaiting ensures the new SW takes over immediately, fixing stuck caches
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

// Clean up old caches when a new SW is activated
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Immediately control all open clients
  );
});

// Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  // Handle cross-origin requests (CDNs) gracefully
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Check if we received a valid response
          // Note: Opaque responses (type 'opaque') from no-cors requests (like scripts) 
          // can still be cached, but we can't inspect their status code (it returns 0).
          if (networkResponse) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((err) => {
          // Network failed, nothing to do. Return undefined or fallback.
          console.log('Network fetch failed for:', event.request.url);
        });

        // Return cached response if available, otherwise wait for network
        return response || fetchPromise;
      });
    })
  );
});

// Listen for the "skipWaiting" message to activate new SW immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});