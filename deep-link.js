/**
 * Script definitivo para Monbá QR
 * Detecta automáticamente el parámetro de la URL (lugar, id, sitio, qr, etc.)
 * hace scroll centrado y aplica el resaltado visual.
 */
(function () {
    // 1. Inyectar estilos CSS (autocontenido)
    if (!document.getElementById('monba-estilos-resaltado')) {
        const style = document.createElement('style');
        style.id = 'monba-estilos-resaltado';
        style.textContent = `
            .monba-resaltar-lugar {
                border: 3px solid #0077b6 !important;
                background-color: #e6f0fa !important;
                box-shadow: 0 0 20px rgba(0,119,182,.7) !important;
                transform: scale(1.02);
                transition: all .5s ease-in-out;
                z-index: 10;
                position: relative;
            }
        `;
        document.head.appendChild(style);
    }

    function ejecutar() {
        const params = new URLSearchParams(window.location.search);
        
        // 2. Leer CUALQUIER parámetro que pueda venir en el QR
        const targetId = params.get('lugar') || 
                         params.get('scrollTo') || 
                         params.get('id') || 
                         params.get('sitio') || 
                         params.get('qr');

        // Si no hay ningún parámetro, no hacer nada
        if (!targetId) return;

        // 3. Buscar el elemento
        const el = document.getElementById(targetId);
        if (!el) {
            console.warn('[Monbá] No se encontró el ID: ' + targetId);
            return;
        }

        // 4. Scroll y Resaltado
        setTimeout(() => {
            // Scroll centrado (con fallback para móviles viejos)
            if ('scrollBehavior' in document.documentElement.style) {
                try {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } catch (e) {
                    el.scrollIntoView(true);
                }
            } else {
                const rect = el.getBoundingClientRect();
                const offset = rect.top + window.pageYOffset - (window.innerHeight / 2) + (rect.height / 2);
                window.scrollTo(0, offset);
            }

            // Resaltar
            el.classList.add('monba-resaltar-lugar');
            setTimeout(() => el.classList.remove('monba-resaltar-lugar'), 3500);
        }, 500);
    }

    // Ejecutar al cargar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ejecutar);
    } else {
        ejecutar();
    }
})();
