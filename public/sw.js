// Basic placeholder Service Worker for AurisVoice.
// This avoids 404 errors until full PWA caching logic is added.

self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated");
});

