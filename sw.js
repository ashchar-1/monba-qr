/* =========================================
   SERVICE WORKER - MONBÁ QR
   ========================================= */

// 1. Evento de instalación (obligatorio para que sea un Service Worker válido)
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Fuerza la activación inmediata
});

// 2. Evento de activación
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Toma el control de las páginas abiertas
});

// 3. Evento para recibir notificaciones Push
self.addEventListener('push', function(event) {
  let data = { title: 'Monbá QR', body: '¡Hay novedades en la guía!', url: './' };
  
  if (event.data) {
    try { data = { ...data, ...event.data.json() }; } 
    catch (e) { data.body = event.data.text(); }
  }

  const options = {
    body: data.body,
    icon: './icon-192.png', // Asegúrate de que este icono exista en tu carpeta
    badge: './icon-192.png',
    data: { url: data.url }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 4. Evento al hacer clic en la notificación
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || './';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(urlToOpen) && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});
