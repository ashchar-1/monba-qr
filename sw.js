// sw.js - Recibe las notificaciones y las muestra
self.addEventListener('push', function(event) {
  let data = { title: 'Monbá QR', body: '¡Hay novedades!', url: '/' };
  
  if (event.data) {
    try { data = { ...data, ...event.data.json() }; } 
    catch (e) { data.body = event.data.text(); }
  }

  const options = {
    body: data.body,
    icon: './icon-192.png', // Asegúrate de tener este icono
    badge: './icon-192.png',
    data: { url: data.url }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Abre la URL cuando haces clic en la notificación
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
