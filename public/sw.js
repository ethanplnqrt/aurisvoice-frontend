// ===============================================
// 🎯 AURISVOICE PWA - SERVICE WORKER PRO
// ===============================================
// Version: 1.0.0
// Date: 2024-12-02
// Stratégie: Offline-First avec cache intelligent
// ===============================================

const CACHE_VERSION = 'aurisvoice-v1';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;
const CACHE_IMAGES = `${CACHE_VERSION}-images`;

// Assets essentiels à précacher (offline-first)
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico',
];

// Durées de vie du cache (en secondes)
const CACHE_TTL = {
  static: 7 * 24 * 60 * 60,      // 7 jours
  dynamic: 24 * 60 * 60,          // 1 jour  
  images: 30 * 24 * 60 * 60,      // 30 jours
};

// URLs à NE JAMAIS mettre en cache
const CACHE_BLACKLIST = [
  /\/api\/stripe\//,
  /\/api\/clerk\//,
  /clerk\.com/,
  /stripe\.com/,
  /accounts\.clerk\.com/,
  /vercel\.live/,
  /hot-update/,
  /_next\/webpack/,
];

// ===============================================
// 📦 INSTALL EVENT - Precache des assets
// ===============================================
self.addEventListener('install', (event) => {
  console.log(`[SW] Installing version ${CACHE_VERSION}...`);
  
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then((cache) => {
        console.log('[SW] Precaching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets precached ✓');
        // Force activation immédiate
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Precache failed:', error);
      })
  );
});

// ===============================================
// 🔄 ACTIVATE EVENT - Cleanup des anciens caches
// ===============================================
self.addEventListener('activate', (event) => {
  console.log(`[SW] Activating version ${CACHE_VERSION}...`);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Supprimer les anciens caches
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Garder seulement les caches de la version actuelle
              return cacheName.startsWith('aurisvoice-') && 
                     !cacheName.startsWith(CACHE_VERSION);
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Old caches cleaned ✓');
        // Prendre le contrôle immédiatement
        return self.clients.claim();
      })
      .then(() => {
        console.log('[SW] Service worker activated and claimed clients ✓');
        
        // Notifier tous les clients
        return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SW_UPDATED',
              version: CACHE_VERSION,
              message: 'Service worker mis à jour avec succès'
            });
          });
        });
      })
      .catch((error) => {
        console.error('[SW] Activation error:', error);
      })
  );
});

// ===============================================
// 🌐 FETCH EVENT - Stratégies de cache intelligentes
// ===============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Vérifier la blacklist (APIs sensibles)
  if (CACHE_BLACKLIST.some((pattern) => pattern.test(url.href))) {
    console.log('[SW] Bypassing cache for:', url.pathname);
    return; // Laisser passer sans cache
  }
  
  // Déterminer la stratégie selon le type de ressource
  if (url.origin === self.location.origin) {
    // Ressources du même domaine
    
    if (isHTMLRequest(request)) {
      // HTML → NetworkFirst (toujours à jour)
      event.respondWith(networkFirst(request));
    } else if (isImageRequest(request)) {
      // Images → CacheFirst (longue durée)
      event.respondWith(cacheFirst(request, CACHE_IMAGES));
    } else if (isStaticAsset(request)) {
      // JS/CSS/Fonts → StaleWhileRevalidate (rapide + à jour)
      event.respondWith(staleWhileRevalidate(request, CACHE_DYNAMIC));
    } else {
      // Autres ressources → NetworkFirst
      event.respondWith(networkFirst(request));
    }
  } else {
    // Ressources externes (CDN, etc.)
    event.respondWith(staleWhileRevalidate(request, CACHE_DYNAMIC));
  }
});

// ===============================================
// 📡 STRATÉGIE 1: NetworkFirst
// Réseau d'abord, cache en fallback
// ===============================================
async function networkFirst(request) {
  const cache = await caches.open(CACHE_DYNAMIC);
  
  try {
    // Essayer le réseau en premier
    const networkResponse = await fetch(request);
    
    // Mettre en cache si succès
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback sur le cache
    console.log('[SW] Network failed, using cache for:', request.url);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si HTML et pas en cache → page offline
    if (isHTMLRequest(request)) {
      console.log('[SW] Serving offline page');
      return cache.match('/offline.html');
    }
    
    // Sinon, retourner l'erreur
    throw error;
  }
}

// ===============================================
// 💾 STRATÉGIE 2: CacheFirst
// Cache d'abord, réseau en fallback
// ===============================================
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Vérifier l'expiration
    const cacheTime = await getCacheTimestamp(request);
    const now = Date.now();
    
    if (cacheTime && (now - cacheTime) < CACHE_TTL.images * 1000) {
      console.log('[SW] Serving from cache (fresh):', request.url);
      return cachedResponse;
    }
  }
  
  // Pas en cache ou expiré → fetch
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
      await setCacheTimestamp(request);
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback sur cache même expiré
    if (cachedResponse) {
      console.log('[SW] Network failed, using stale cache:', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// ===============================================
// 🔄 STRATÉGIE 3: StaleWhileRevalidate
// Cache immédiat + update en arrière-plan
// ===============================================
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Fetch en arrière-plan pour mise à jour
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.log('[SW] Background fetch failed:', error);
  });
  
  // Retourner cache immédiatement si disponible
  if (cachedResponse) {
    console.log('[SW] Serving from cache (revalidating):', request.url);
    return cachedResponse;
  }
  
  // Sinon attendre le réseau
  return fetchPromise;
}

// ===============================================
// 🛠️ HELPER FUNCTIONS
// ===============================================

function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

function isImageRequest(request) {
  const url = new URL(request.url);
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname);
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return /\.(js|css|woff|woff2|ttf|eot)$/i.test(url.pathname) || 
         url.pathname.startsWith('/_next/static/');
}

// Timestamp management pour cache TTL
async function setCacheTimestamp(request) {
  const cache = await caches.open(`${CACHE_VERSION}-timestamps`);
  await cache.put(
    request.url, 
    new Response(JSON.stringify({ timestamp: Date.now() }))
  );
}

async function getCacheTimestamp(request) {
  const cache = await caches.open(`${CACHE_VERSION}-timestamps`);
  const response = await cache.match(request.url);
  
  if (response) {
    const data = await response.json();
    return data.timestamp;
  }
  
  return null;
}

// ===============================================
// 💬 MESSAGE EVENT - Communication avec l'app
// ===============================================
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skipping waiting...');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[SW] Clearing all caches...');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// ===============================================
// 🔔 PUSH NOTIFICATIONS (optionnel pour futur)
// ===============================================
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Nouvelle notification AurisVoice',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('AurisVoice', options)
  );
});

// ===============================================
// ✅ Service Worker Ready
// ===============================================
console.log('[SW] AurisVoice PWA Service Worker loaded ✓');
console.log(`[SW] Version: ${CACHE_VERSION}`);
console.log('[SW] Strategies: NetworkFirst (HTML), CacheFirst (Images), StaleWhileRevalidate (Assets)');
