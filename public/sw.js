// ============================================
// Service Worker Version Management
// ============================================
// VERSION: 2.5.0
// UPDATED: 2026-01-16
// 
// To trigger client updates:
// 1. Increment the VERSION above
// 2. Update CACHE_VERSION below (match VERSION)
// 3. Deploy - clients will auto-update
// ============================================

const CACHE_VERSION = '2.5.0';
const CACHE_NAME = `shroud-chronicle-v${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `shroud-images-v${CACHE_VERSION}`;
const PDF_CACHE_NAME = `shroud-pdfs-v${CACHE_VERSION}`;

// Precache local app shell files
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png',
  './icons/maskable-192x192.png',
  './icons/maskable-512x512.png'
];

// Critical external images to precache for offline use
const CRITICAL_IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/e/ec/Secundo_Pia_Turinske_platno_1898.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/7/75/Turin_face_positive.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/23/Turin_shroud_positive_and_negative_displaying_original_color_information_708_x_465_pixels_94_KB.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9d/Shroudofturin.jpg'
];

// Helper to check if request is for an image
function isImageRequest(request) {
  const url = request.url;
  return url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)(\?.*)?$/i) ||
         url.includes('wikimedia.org') ||
         url.includes('wikipedia.org') ||
         url.includes('picsum.photos') ||
         request.destination === 'image';
}

// Helper to check if request is for a PDF (STURP papers)
function isPdfRequest(request) {
  const url = request.url;
  return url.match(/\.pdf(\?.*)?$/i) || 
         url.includes('shroud.com/pdfs');
}

self.addEventListener('install', (event) => {
  // DO NOT call skipWaiting here - let the user decide when to update
  console.log(`[SW] Installing version ${CACHE_VERSION}`);
  
  event.waitUntil(
    Promise.all([
      // Cache app shell
      caches.open(CACHE_NAME).then((cache) => {
        console.log(`[SW] Caching app shell for version ${CACHE_VERSION}`);
        return cache.addAll(PRECACHE_URLS);
      }),
      // Cache critical images for offline use
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        console.log(`[SW] Precaching ${CRITICAL_IMAGES.length} critical images`);
        return Promise.all(
          CRITICAL_IMAGES.map((url) => 
            fetch(url, { mode: 'cors' })
              .then((response) => {
                if (response.ok) {
                  cache.put(url, response);
                  console.log(`[SW] Cached: ${url.split('/').pop()}`);
                }
              })
              .catch((err) => console.log(`[SW] Failed to cache: ${url}`, err))
          )
        );
      })
    ])
  );
});

// Clean up old caches when a new SW is activated
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, IMAGE_CACHE_NAME, PDF_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete caches that aren't in our current set
          if (!currentCaches.includes(cacheName)) {
            console.log(`[SW] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch handler with special image caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Images: Cache-first, then network (for offline support)
  if (isImageRequest(request)) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached image immediately, update in background
            fetch(request, { mode: 'cors' })
              .then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                  cache.put(request, networkResponse.clone());
                }
              })
              .catch(() => {}); // Silently fail background update
            return cachedResponse;
          }
          
          // Not in cache - fetch and cache for next time
          return fetch(request, { mode: 'cors' })
            .then((networkResponse) => {
              if (networkResponse && networkResponse.ok) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch((err) => {
              console.log('[SW] Image fetch failed:', request.url);
              // Return a placeholder or nothing for failed images
              return new Response('', { status: 404, statusText: 'Image not available offline' });
            });
        });
      })
    );
    return;
  }
  
  // PDFs: Cache-first for offline access (lazy loading - only cache when viewed)
  if (isPdfRequest(request)) {
    event.respondWith(
      caches.open(PDF_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] Serving cached PDF:', request.url.split('/').pop());
            return cachedResponse;
          }
          
          // Not in cache - fetch and cache for offline access
          return fetch(request, { mode: 'cors' })
            .then((networkResponse) => {
              if (networkResponse && networkResponse.ok) {
                cache.put(request, networkResponse.clone());
                console.log('[SW] Cached PDF for offline:', request.url.split('/').pop());
              }
              return networkResponse;
            })
            .catch((err) => {
              console.log('[SW] PDF fetch failed:', request.url);
              return new Response('PDF not available offline. Please view it online first to cache it.', { 
                status: 404, 
                statusText: 'PDF not cached',
                headers: { 'Content-Type': 'text/plain' }
              });
            });
        });
      })
    );
    return;
  }
  
  // Non-images/PDFs: Stale-While-Revalidate strategy
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((response) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((err) => {
          console.log('[SW] Network fetch failed:', request.url);
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