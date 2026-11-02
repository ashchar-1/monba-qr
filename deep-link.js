document.addEventListener('DOMContentLoaded', () => {
    // === Inyectar estilos (una sola vez) ===
    if (!document.getElementById('monba-resaltar-estilos')) {
        const style = document.createElement('style');
        style.id = 'monba-resaltar-estilos';
        style.textContent = `
            .monba-resaltar-lugar {
                border: 3px solid #0077b6 !important;
                background-color: #e6f0fa !important;
                box-shadow: 0 0 20px rgba(0, 119, 182, 0.7);
                transform: scale(1.02);
                transition: all 0.5s ease-in-out;
                z-index: 10;
                position: relative;
            }
        `;
        document.head.appendChild(style);
    }

    // === Lógica de scroll y resaltado ===
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('lugar') || urlParams.get('scrollTo');
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.classList.add('monba-resaltar-lugar');
        setTimeout(() => targetElement.classList.remove('monba-resaltar-lugar'), 3500);
    }, 500);
});
