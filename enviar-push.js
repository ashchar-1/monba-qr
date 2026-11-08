const webpush = require('web-push');

// ⚠️ 1. AQUÍ PON TUS CLAVES (Las del bloc de notas)
const publicVapidKey = 'BJnCfTHoJlXebC-BVpKeg_GcsA1jyznonu9mekPsduktdOXfVwcTkb9lSuTmMPqfxZcJ77DctES_U7YNbcrR4Hg';
const privateVapidKey = 'HBkv5T7oF4c2Tg7YRl4LMi7zR9vOBIH3X9VV6GpqZFA';

webpush.setVapidDetails('mailto:luisalejandrohernandezrada123@gmail.com', publicVapidKey, privateVapidKey);

// ⚠️ 2. AQUÍ PEGA EL "PASE VIP" QUE COPIASTE DE LA CONSOLA
const subscription = {"endpoint":"https://wns2-ch1p.notify.windows.com/w/?token=BQYAAAAIOc%2bYQWQ2jZ9rMP7BI8JLBmF7B6YFuuB7saWKcArdwo2vKacz6POBxBZ2yC0rAy0fQL7NqUd1g9NPwOtoeAgH1oHlm6FhACrJZThpkf6z23BiEWDiwH09djTLYJpvPm%2fEzQNRMn9EkcxlayzbI6EaxvmVmGrNfCFQIxh9EP9QK34pljZoh8eVnJyboTIMOUDqAi4e%2bHvJbSHYR6HJquSXURt3A7N6Xm4IdB4JsetiyclD10SQ0mHmE49%2fPdOTpg3fg3f9hdMKMQeA09ZMpYDqWgmQ6NuUcA%2f5pfswW7AT5Nl6n47s4lZWCIxFz%2fmGg0E7PeAkLkYl69fT0lRWN7cD",
                      "expirationTime":null,
                      "keys":{
                        "p256dh":"BA8a2iIRSU5E5MDS_DrgHkgD8hR1Ot78Fth1euN57Xm4v_IPSkpM6LKph7s-jV9FsAmMc-mBKKbiukWKPX-nRsg",
                              "auth":"bGtzf3idIMnvBo3XWjEHgQ"
                      }
};

// ⚠️ 3. EL MENSAJE QUE QUIERES ENVIAR
const payload = JSON.stringify({
  title: '¡Hola desde Monbá QR!',
  body: 'Esta es tu primera notificación nativa. ¡Funciona!',
  url: 'https://ashchar-1.github.io/monba-qr/' // A donde irá al hacer clic
});

// 4. Enviar
webpush.sendNotification(subscription, payload)
  .then(res => console.log('✅ ¡Notificación enviada con éxito! Revisa tu pantalla.'))
  .catch(err => console.error('❌ Error:', err));
