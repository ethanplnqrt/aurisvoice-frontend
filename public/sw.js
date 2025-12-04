// ⚠️ TEMPORARY DISABLED SERVICE WORKER
// This service worker immediately unregisters itself and clears all caches.
// 
// Purpose: Clean debug step before final PWA deployment
// - Removes any previous service worker registrations
// - Clears all cached resources
// - Allows Chrome DevTools to properly detect manifest.json
//
// This is a TEMPORARY measure to resolve PWA detection issues.
// Once manifest detection works correctly, restore the full service worker.
//
// Author: AurisVoice Team
// Date: 2024-12-02

self.addEventListener("install", () => {
  console.log("[SW] Temporary disabled service worker installing...");
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
  console.log("[SW] Temporary disabled service worker activating...");
  
  event.waitUntil(
    (async () => {
      try {
        // Clean all caches
        const cacheKeys = await caches.keys();
        console.log(`[SW] Clearing ${cacheKeys.length} cache(s)...`);
        await Promise.all(cacheKeys.map(key => caches.delete(key)));
        console.log("[SW] All caches cleared ✓");
        
        // Unregister this service worker
        const registration = await self.registration;
        if (registration) {
          const unregistered = await registration.unregister();
          console.log(`[SW] Unregistered: ${unregistered ? 'YES' : 'NO'}`);
        }
        
        // Claim clients to take control immediately
        await self.clients.claim();
        console.log("[SW] Service worker cleanup complete. Page will reload.");
        
        // Notify clients to reload
        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_UNREGISTERED',
            message: 'Service worker has been unregistered. Please reload the page.'
          });
        });
      } catch (error) {
        console.error("[SW] Error during cleanup:", error);
      }
    })()
  );
});

// No fetch handler - let all requests pass through normally
self.addEventListener("fetch", (event) => {
  // Do nothing - let the browser handle the request naturally
  return;
});
