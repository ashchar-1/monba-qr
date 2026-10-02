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
            <div class="tarjeta-playa-premium">
                <div class="playa-img-wrapper">
                    <img src="${p.imagen}" alt="${p.nombre}" class="playa-img" loading="lazy">
                    <div class="playa-img-overlay"></div>
                    <span class="badge-bandera-premium b-${p.bandera}">
                        <i class="fa-solid fa-flag"></i> Bandera ${p.bandera}
                    </span>
                </div>
                <div class="playa-content-premium">
                    <div class="playa-title-row">
                        <h4><i class="fa-solid fa-umbrella-beach"></i> ${p.nombre}</h4>
                    </div>
                    <div class="playa-info-row">
                        <span class="info-item"><i class="fa-solid fa-water"></i> <strong>Oleaje:</strong> ${p.oleaje}</span>
                    </div>
                    <p class="playa-tip-premium"><i class="fa-solid fa-lightbulb"></i> ${p.tip}</p>
                    <div class="playa-actions-premium">
                        <a href="${urlLimpia}" target="_blank" rel="noopener" class="btn-llegar-premium">
                            <i class="fa-solid fa-route"></i> Cómo llegar
                        </a>
                        <div class="playa-mini-actions">
                            <button class="btn-mini-premium btn-fav" data-action="fav" data-fav-id="${favId}" data-fav-titulo="${p.nombre}" data-fav-url="municipio.html?id=${id}" title="Guardar en favoritos">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                            <button class="btn-mini-premium btn-share" data-action="compartir" data-titulo="${p.nombre}" data-texto="Mira esta playa en Monbá QR" title="Compartir">
                                <i class="fa-solid fa-share-nodes"></i>
                            </button>
                            <button class="btn-mini-premium btn-qr" data-action="ver-qr-playa" data-nombre="${p.nombre}" data-imagen="${p.imagen}" data-tip="${p.tip}" title="Ver QR">
                                <i class="fa-solid fa-qrcode"></i>
                            </button>
                        </div>
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
            <div class="tarjeta-rincon-premium">
                <div class="rincon-img-wrapper">
                    <img src="${r.imagen}" alt="${r.nombre}" class="rincon-img" loading="lazy">
                    <div class="rincon-img-overlay"></div>
                    <span class="badge-tipo-premium t-${r.tipo.toLowerCase()}">
                        <i class="fa-solid ${iconoTipo(r.tipo)}"></i> ${r.tipo}
                    </span>
                </div>
                <div class="rincon-content-premium">
                    <div class="rincon-title-row">
                        <h4>${r.nombre}</h4>
                    </div>
                    <p class="rincon-desc-premium">${r.descripcion}</p>
                    <div class="rincon-actions-premium">
                        <a href="${urlLimpia}" target="_blank" rel="noopener" class="btn-llegar-premium">
                            <i class="fa-solid fa-route"></i> Cómo llegar
                        </a>
                        <div class="rincon-mini-actions">
                            <button class="btn-mini-premium btn-fav" data-action="fav" data-fav-id="${favId}" data-fav-titulo="${r.nombre}" data-fav-url="municipio.html?id=${id}" title="Guardar en favoritos">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                            <button class="btn-mini-premium btn-share" data-action="compartir" data-titulo="${r.nombre}" data-texto="Mira este rincón natural en Monbá QR" title="Compartir">
                                <i class="fa-solid fa-share-nodes"></i>
                            </button>
                            <button class="btn-mini-premium btn-qr" data-action="ver-qr-rincon" data-nombre="${r.nombre}" data-imagen="${r.imagen}" data-descripcion="${r.descripcion}" title="Ver QR">
                                <i class="fa-solid fa-qrcode"></i>
                            </button>
                        </div>
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
