// ============================================
// Service Worker Version Management
// ============================================
// VERSION: 2.0.0
// UPDATED: 2026-01-15
// 
// To trigger client updates:
// 1. Increment the VERSION above
// 2. Update CACHE_VERSION below (match VERSION)
// 3. Deploy - clients will auto-update
// ============================================

const CACHE_VERSION = '2.0.0';
const CACHE_NAME = `shroud-chronicle-v${CACHE_VERSION}`;

// Precache local app shell files only
// External URLs (CDNs) are cached dynamically via fetch listener
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  // DO NOT call skipWaiting here - let the user decide when to update
  // The UpdateNotification component will send SKIP_WAITING message when user clicks refresh
  console.log(`[SW] Installing version ${CACHE_VERSION}`);
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`[SW] Caching app shell for version ${CACHE_VERSION}`);
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
          if (networkResponse) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((err) => {
          console.log('Network fetch failed for:', event.request.url);
        });
        return response || fetchPromise;
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});