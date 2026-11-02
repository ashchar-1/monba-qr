/* =====================================================
   MONBÁ QR · deep-link.js
   Deep-link + resaltado del sitio escaneado
   Archivo INDEPENDIENTE: no modifica app.js ni municipio.js
   Se carga DESPUÉS de municipio.js en municipio.html
   ===================================================== */
(function () {
    /* CSS inyectado (no toca styles.css) */
    const style = document.createElement('style');
    style.textContent = `
        .monba-resaltada {
            outline: 3px solid #00b4d8 !important;
            outline-offset: 3px;
            box-shadow: 0 0 0 6px rgba(0,180,216,.25), 0 8px 30px rgba(0,180,216,.35) !important;
            animation: monba-pulso 1.2s ease-in-out 3;
            scroll-margin: 90px;
        }
        @keyframes monba-pulso {
            0%,100% { transform: scale(1); }
            50%     { transform: scale(1.02); }
        }
    `;
    document.head.appendChild(style);

    /* Normaliza texto a slug (igual que municipio.js) */
    const slug = t => (t || '').toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    /* Lee el parámetro sitio= o qr= de la URL */
    function leerParam() {
        const p = new URLSearchParams(location.search);
        return p.get('sitio') || p.get('qr') || '';
    }

    /* Busca la tarjeta cuyo título coincida con el ID escaneado */
    function buscarTarjeta(qrId) {
        const idMun = new URLSearchParams(location.search).get('id') || '';
        const prefijos = [`playa-${idMun}-`, `rincon-${idMun}-`, 'playa-', 'rincon-'];
        let objetivo = qrId;
        for (const pref of prefijos) {
            if (qrId.startsWith(pref)) { objetivo = qrId.slice(pref.length); break; }
        }
        const tarjetas = document.querySelectorAll('.tarjeta-playa, .tarjeta-rincon');
        for (const t of tarjetas) {
            const h4 = t.querySelector('h4');
            if (h4 && slug(h4.textContent) === slug(objetivo)) return t;
        }
        return null;
    }

    /* Scroll + resaltado temporal */
    function resaltar(tarjeta) {
        tarjeta.classList.add('monba-resaltada');
        tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nombre = tarjeta.querySelector('h4')?.textContent.trim() || '';
        if (typeof toast === 'function') toast('📍 Estás viendo: ' + nombre);
        setTimeout(() => tarjeta.classList.remove('monba-resaltada'), 5000);
    }

    /* Espera a que municipio.js renderice las tarjetas (máx ~3s) */
    function esperarRender(cb, intentos = 30) {
        const check = () => {
            if (document.querySelectorAll('.tarjeta-playa, .tarjeta-rincon').length > 0) { cb(); return; }
            if (intentos-- > 0) setTimeout(check, 100);
        };
        check();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const qrId = leerParam();
        if (!qrId) return;
        esperarRender(() => {
            const tarjeta = buscarTarjeta(qrId);
            if (tarjeta) setTimeout(() => resaltar(tarjeta), 300);
        });
    });
})();
