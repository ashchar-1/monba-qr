/* =====================================================
   MONBÁ QR · deep-link.js  (v2 robusto)
   Deep-link + resaltado del sitio escaneado
   ===================================================== */
(function () {
    const style = document.createElement('style');
    style.textContent = `
        .monba-resaltada {
            outline: 3px solid #00b4d8 !important;
            outline-offset: 3px;
            box-shadow: 0 0 0 6px rgba(0,180,216,.25), 0 8px 30px rgba(0,180,216,.35) !important;
            animation: monba-pulso 1.2s ease-in-out 3;
            scroll-margin: 90px;
        }
        @keyframes monba-pulso { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
    `;
    document.head.appendChild(style);

    /* Slug que SÍ normaliza acentos */
    const slug = t => (t || '').toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const SEL = '.tarjeta-playa, .tarjeta-rincon, .tarjeta-playa-premium, .tarjeta-rincon-premium';

    function leerParam() {
        const p = new URLSearchParams(location.search);
        return p.get('sitio') || p.get('qr') || '';
    }

    function buscarTarjeta(qrId) {
        const idMun = new URLSearchParams(location.search).get('id') || '';
        const limpio = slug(qrId);
        let objetivo = limpio;
        for (const pref of [`playa-${slug(idMun)}-`, `rincon-${slug(idMun)}-`, 'playa-', 'rincon-']) {
            if (limpio.startsWith(pref)) { objetivo = limpio.slice(pref.length); break; }
        }
        const tarjetas = document.querySelectorAll(SEL);
        // 1) match exacto por slug del título
        for (const t of tarjetas) {
            const h4 = t.querySelector('h4');
            if (h4 && slug(h4.textContent) === objetivo) return t;
        }
        // 2) match flexible (contiene / contenido-por)
        for (const t of tarjetas) {
            const h4 = t.querySelector('h4');
            if (!h4) continue;
            const s = slug(h4.textContent);
            if (s.includes(objetivo) || objetivo.includes(s)) return t;
        }
        return null;
    }

    function resaltar(tarjeta) {
        tarjeta.classList.add('monba-resaltada');
        tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nombre = tarjeta.querySelector('h4')?.textContent.trim() || '';
        if (typeof toast === 'function') toast('📍 Estás viendo: ' + nombre);
        setTimeout(() => tarjeta.classList.remove('monba-resaltada'), 5000);
    }

    function esperarRender(cb, intentos = 40) {
        const check = () => {
            if (document.querySelectorAll(SEL).length > 0) { cb(); return; }
            if (intentos-- > 0) setTimeout(check, 100);
            else console.warn('[deep-link] No se encontraron tarjetas tras 4s.');
        };
        check();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const qrId = leerParam();
        console.log('[deep-link] parámetro recibido:', qrId || '(ninguno)');
        if (!qrId) return;
        esperarRender(() => {
            const tarjeta = buscarTarjeta(qrId);
            console.log('[deep-link] tarjeta encontrada:', tarjeta ? 'SÍ' : 'NO');
            if (tarjeta) setTimeout(() => resaltar(tarjeta), 300);
        });
    });
})();
