// sw.js - Lector de notificaciones y enlaces dinámicos
self.addEventListener('push', function(event) {
  let data = { title: 'Monbá QR', body: '¡Tienes una nueva notificación!' };
  let urlDestino = 'https://ashchar-1.github.io/monba-qr/'; // URL por defecto
  
  if (event.data) {
    try {
      // Intentamos leer el mensaje como JSON
      const parsedData = event.data.json();
      data.title = parsedData.title || data.title;
      data.body = parsedData.body || data.body;
      
      // ⚠️ AQUÍ ESTÁ LA MAGIA: Capturamos la URL que envíes desde el panel
      if (parsedData.url) {
        urlDestino = parsedData.url;
      }
    } catch (e) {
      // Si viene en texto plano, lo usamos como cuerpo
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: 'icon-192.png', 
    // Guardamos la URL dinámica para usarla cuando el usuario haga clic
    data: { url: urlDestino }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Recuperamos la URL dinámica que guardamos arriba
  const urlToOpen = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        // Si la página ya está abierta, la enfocamos
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Si no está abierta, abrimos una nueva pestaña con la URL
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
