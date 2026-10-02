/* =====================================================
   MONBÁ QR · index.js
   Carrusel de fondo + Feed dinámico de 5 publicaciones
   ===================================================== */

/* ---------- CARRUSEL HERO (cambia cada 3s) ---------- */
function iniciarCarrusel() {
    const slides = $$('.hero-slide');
    const dots = $$('.hero-dots .dot');
    if (!slides.length) return;

    let actual = 0;
    const total = slides.length;

    function cambiar(indice) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[indice].classList.add('active');
        if (dots[indice]) dots[indice].classList.add('active');
        actual = indice;
    }

    function siguiente() {
        cambiar((actual + 1) % total);
    }

    // Click en dots
    dots.forEach(d => {
        d.addEventListener('click', () => {
            cambiar(parseInt(d.dataset.index));
        });
    });

    // Auto-avance cada 3 segundos
    setInterval(siguiente, 3000);
}

/* ---------- FEED DINÁMICO (5 items, mezcla favoritos + random) ---------- */
function construirPoolItems() {
    const items = [];
    Object.keys(municipiosDB).forEach(idMun => {
        const m = municipiosDB[idMun];

        // Playas
        if (m.playas) {
            m.playas.forEach(p => {
                items.push({
                    id: `playa-${idMun}-${p.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                    titulo: p.nombre,
                    descripcion: p.tip,
                    categoria: 'Playa',
                    icono: 'fa-umbrella-beach',
                    color: '#0077b6',
                    url: `municipio.html?id=${idMun}`,
                    imagen: p.imagen || './img/playa-machurucuto.jpg'
                });
            });
        }

        // Rincones
        if (m.rincones) {
            m.rincones.forEach(r => {
                items.push({
                    id: `rincon-${idMun}-${r.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                    titulo: r.nombre,
                    descripcion: r.descripcion,
                    categoria: r.tipo,
                    icono: iconoTipoRincon(r.tipo),
                    color: '#2e7d32',
                    url: `municipio.html?id=${idMun}`,
                    imagen: r.imagen || './img/chorros-de-urba.jpg'
                });
            });
        }
    });
    return items;
}

function iconoTipoRincon(tipo) {
    const map = {
        'cascada': 'fa-water',
        'balneario': 'fa-swimmer',
        'cueva': 'fa-mountain',
        'poza': 'fa-droplet',
        'sendero': 'fa-person-hiking',
        'mirador': 'fa-binoculars'
    };
    return map[tipo.toLowerCase()] || 'fa-leaf';
}

function generarFeed() {
    const contenedor = $('#feed-dinamico');
    if (!contenedor) return;

    const pool = construirPoolItems();
    const favoritos = getFavoritos();

    // Separar items favoritos del resto
    const favIds = new Set(favoritos.map(f => f.id));
    const itemsFav = pool.filter(i => favIds.has(i.id));
    const itemsResto = pool.filter(i => !favIds.has(i.id));

    // Mezclar ambos grupos
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const mezclados = shuffle([...itemsFav, ...itemsResto]);

    // Tomar 5 (o los que haya)
    const seleccion = mezclados.slice(0, 5);

    contenedor.innerHTML = seleccion.map(item => `
        <a href="${item.url}" class="tarjeta-feed">
            <div class="feed-img" style="background-image: url('${item.imagen}');">
                <span class="feed-categoria" style="background:${item.color};">
                    <i class="fa-solid ${item.icono}"></i> ${item.categoria}
                </span>
            </div>
            <div class="feed-info">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
                <span class="feed-ver-mas">Ver más <i class="fa-solid fa-arrow-right"></i></span>
            </div>
        </a>
    `).join('');
}

/* ---------- ARRANQUE ---------- */
document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrusel();
    generarFeed();
});
