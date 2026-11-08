// sw.js - Lector de notificaciones
self.addEventListener('push', function(event) {
  let data = { title: 'Monbá QR', body: '¡Tienes una nueva notificación!' };
  
  if (event.data) {
    try {
      // Intentamos leer el mensaje como JSON
      const parsedData = event.data.json();
      data.title = parsedData.title || data.title;
      data.body = parsedData.body || data.body;
    } catch (e) {
      // Si viene en texto plano, lo usamos como cuerpo
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: 'icon-192.png', 
    data: { url: 'https://ashchar-1.github.io/monba-qr/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
