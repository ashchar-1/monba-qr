// ===== DIAGNÓSTICO TEMPORAL =====
(function () {
    function aviso(msg) { alert('MONBÁ DEBUG: ' + msg); }

    // Inyectar CSS
    const style = document.createElement('style');
    style.textContent = `
        .monba-resaltar-lugar {
            border: 3px solid #0077b6 !important;
            background-color: #e6f0fa !important;
            box-shadow: 0 0 20px rgba(0,119,182,.7);
            transform: scale(1.02);
            transition: all .5s ease-in-out;
            z-index: 10;
            position: relative;
        }
    `;
    document.head.appendChild(style);

    function ejecutar() {
        aviso('1) Script cargado. URL actual: ' + location.href);

        const params = new URLSearchParams(location.search);
        const targetId = params.get('lugar') || params.get('scrollTo');
        aviso('2) Parámetro leído: ' + (targetId || '(VACÍO - no llegó ?lugar=)'));

        if (!targetId) return;

        const el = document.getElementById(targetId);
        aviso('3) ¿Existe id="' + targetId + '"? → ' + (el ? 'SÍ' : 'NO'));

        if (!el) {
            // Listar IDs disponibles para comparar
            const ids = Array.from(document.querySelectorAll('[id]'))
                .map(x => x.id).filter(x => x.length < 40).slice(0, 15);
            aviso('IDs disponibles en la página:\n' + ids.join('\n'));
            return;
        }

        setTimeout(() => {
            try {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                aviso('4) scrollIntoView OK (con smooth+center)');
            } catch (e) {
                el.scrollIntoView(true);
                aviso('4) Fallback scrollIntoView(true) usado. Error: ' + e.message);
            }
            el.classList.add('monba-resaltar-lugar');
            setTimeout(() => el.classList.remove('monba-resaltar-lugar'), 3500);
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ejecutar);
    } else {
        ejecutar(); // por si el script se cargó tarde
    }
})();
