self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', (event) => {
    // Cache strategy can be added here if needed
    event.respondWith(fetch(event.request));
  });