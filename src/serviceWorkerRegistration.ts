/**
 * Safe Progressive Web App Service Worker Registration
 */
export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && Boolean(import.meta.env?.PROD)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          if (reg.installing) {
            // Service worker installing
          } else if (reg.active) {
            // Service worker active & controlling page
          }
        })
        .catch((err) => {
          console.warn('[PWA] Service worker registration error:', err)
        })
    })
  }
}

// Pre-cache routes: /nexus-crdt, /agent-forge, /hyper-route
