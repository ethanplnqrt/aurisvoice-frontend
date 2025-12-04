'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    // Only register in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.warn('[SW] Service Workers are not supported in this browser');
      return;
    }

    // Register service worker (works in both dev and prod)
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
        
        console.log('[SW] ✓ Service Worker registered successfully');
        console.log('[SW] Scope:', registration.scope);
        
        // Check for updates on load
        registration.update();
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('[SW] Update found, installing new version...');
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('[SW] ✓ New version installed');
                  console.log('[SW] The page will reload to activate the new version');
                  
                  // Auto-update: skip waiting and reload
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                } else {
                  // First install
                  console.log('[SW] ✓ Service Worker installed for the first time');
                }
              }
            });
          }
        });
        
        // Check for updates every 60 seconds when tab is active
        setInterval(() => {
          if (document.visibilityState === 'visible') {
            registration.update();
          }
        }, 60000);
        
      } catch (error) {
        console.error('[SW] ✗ Registration failed:', error);
      }
    };

    // Register on page load
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }

    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('[SW] Message received:', event.data);
      
      if (event.data && event.data.type === 'SW_UPDATED') {
        console.log('[SW] ✓ Service Worker updated to version:', event.data.version);
        // Optional: Show toast notification to user
      }
    });

    // Listen for controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] ✓ Controller changed - reloading page...');
      window.location.reload();
    });

    // Cleanup
    return () => {
      window.removeEventListener('load', registerSW);
    };
  }, []);

  return null; // This component doesn't render anything
}

