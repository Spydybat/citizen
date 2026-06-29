/*
 * Minimal service worker — app-shell + navigation caching for offline
 * resilience. Deliberately simple for the MVP. Richer strategies (Workbox,
 * background sync for reports queued while offline) can be layered in later.
 */

const CACHE = 'citizen-shell-v1'
const PRECACHE = ['/', '/offline']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  // Network-first for page navigations; fall back to cache, then offline page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/offline'))),
    )
    return
  }

  // Cache-first for same-origin static assets.
  if (new URL(request.url).origin === self.location.origin) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request)))
  }
})
