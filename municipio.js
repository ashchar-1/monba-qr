/* =====================================================
   MONBÁ QR · municipio.js
   LÓGICA DE RENDERIZADO
   ===================================================== */

function cargarMunicipio() {
    const id = getParam("id");
    const m = municipiosDB[id];
    const contenedor = $("#contenido-municipio");
    const estado = $("#mensaje-estado");

    if (!m) {
        $("#header-titulo").textContent = "Error";
        estado.innerHTML = `<i class="fa-solid fa-triangle-exclamation fa-2x"></i><p>Municipio no encontrado.</p>`;
        return;
    }

    $("#header-titulo").textContent = m.nombre;
    $("#municipio-nombre").innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${m.nombre}`;
    $("#municipio-resena").textContent = m.resena;
    $("#mapa-iframe").src = m.mapaUrl;
    
    const btnLlegar = $("#btn-como-llegar");
    if (btnLlegar) btnLlegar.dataset.maps = m.mapsNavegacion;
    
    $("#link-google").href = `https://www.google.com/search?q=${encodeURIComponent(m.busquedaGoogle)}`;

    /* PLAYAS */
    if (m.playas && m.playas.length > 0) {
        $("#seccion-playas").style.display = "block";
        $("#contenedor-playas").innerHTML = m.playas.map(p => {
            const urlLimpia = p.comoLlegar.replace(/\s+/g, '');
            const favId = `playa-${id}-${p.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return `
            <div class="tarjeta-playa">
                <img src="${p.imagen}" alt="${p.nombre}" class="playa-img" loading="lazy">
                <div class="playa-contenido">
                    <div class="playa-header">
                        <h4><i class="fa-solid fa-umbrella-beach"></i> ${p.nombre}</h4>
                        <span class="badge-bandera b-${p.bandera}"><i class="fa-solid fa-flag"></i> Bandera ${p.bandera}</span>
                    </div>
                    <p class="playa-dato"><i class="fa-solid fa-water"></i> <span><strong>Oleaje:</strong> ${p.oleaje}</span></p>
                    <a href="${urlLimpia}" target="_blank" rel="noopener" class="btn-como-llegar-playa">
                        <i class="fa-solid fa-route"></i> Cómo llegar
                    </a>
                    <p class="playa-dato tip"><i class="fa-solid fa-lightbulb"></i> <span>${p.tip}</span></p>
                    <div class="playa-acciones">
                        <button class="btn-fav-mini" data-action="fav" data-fav-id="${favId}" data-fav-titulo="${p.nombre}" data-fav-url="municipio.html?id=${id}" title="Guardar en favoritos">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <button class="btn-accion-mini" data-action="compartir" data-titulo="${p.nombre}" data-texto="Mira esta playa en Monbá QR" title="Compartir">
                            <i class="fa-solid fa-share-nodes"></i>
                        </button>
                        <button class="btn-accion-mini" data-action="ver-qr-playa" data-nombre="${p.nombre}" data-imagen="${p.imagen}" data-tip="${p.tip}" title="Ver QR">
                            <i class="fa-solid fa-qrcode"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        }).join("");
    }

    /* RINCONES NATURALES */
    if (m.rincones && m.rincones.length > 0) {
        $("#seccion-rincones").style.display = "block";
        $("#contenedor-rincones").innerHTML = m.rincones.map(r => {
            const urlLimpia = r.comoLlegar.replace(/\s+/g, '');
            const favId = `rincon-${id}-${r.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return `
            <div class="tarjeta-rincon">
                <img src="${r.imagen}" alt="${r.nombre}" class="rincon-img" loading="lazy">
                <div class="rincon-contenido">
                    <div class="rincon-header">
                        <span class="badge-tipo t-${r.tipo.toLowerCase()}">
                            <i class="fa-solid ${iconoTipo(r.tipo)}"></i> ${r.tipo}
                        </span>
                        <h4>${r.nombre}</h4>
                    </div>
                    <p class="rincon-desc">${r.descripcion}</p>
                    <a href="${urlLimpia}" target="_blank" rel="noopener" class="btn-como-llegar-rincon">
                        <i class="fa-solid fa-route"></i> Cómo llegar
                    </a>
                    <div class="rincon-acciones">
                        <button class="btn-fav-mini" data-action="fav" data-fav-id="${favId}" data-fav-titulo="${r.nombre}" data-fav-url="municipio.html?id=${id}" title="Guardar en favoritos">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <button class="btn-accion-mini" data-action="compartir" data-titulo="${r.nombre}" data-texto="Mira este rincón natural en Monbá QR" title="Compartir">
                            <i class="fa-solid fa-share-nodes"></i>
                        </button>
                        <button class="btn-accion-mini" data-action="ver-qr-rincon" data-nombre="${r.nombre}" data-imagen="${r.imagen}" data-descripcion="${r.descripcion}" title="Ver QR">
                            <i class="fa-solid fa-qrcode"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        }).join("");
    }

    estado.style.display = "none";
    contenedor.style.display = "block";
    if (typeof sincronizarFavoritos === "function") sincronizarFavoritos();
}

function iconoTipo(tipo) {
    const iconos = {
        "cascada": "fa-water",
        "balneario": "fa-swimmer",
        "cueva": "fa-mountain",
        "poza": "fa-droplet",
        "sendero": "fa-person-hiking",
        "mirador": "fa-binoculars"
    };
    return iconos[tipo.toLowerCase()] || "fa-leaf";
}

document.addEventListener("DOMContentLoaded", cargarMunicipio);
