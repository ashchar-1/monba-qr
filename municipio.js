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

    // --- Inyectar estilos ---
    if (!document.getElementById('monba-estilos-resaltado')) {
        const style = document.createElement('style');
        style.id = 'monba-estilos-resaltado';
        style.textContent = `
            .monba-destacado {
                border: 3px solid #0077b6 !important;
                background-color: #e6f0fa !important;
                box-shadow: 0 0 25px rgba(0,119,182,.6) !important;
                transform: scale(1.02);
                transition: all .5s ease-in-out;
                position: relative;
                z-index: 10;
            }
        `;
        document.head.appendChild(style);
    }

    $("#header-titulo").textContent = m.nombre;
    $("#municipio-nombre").innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${m.nombre}`;
    $("#municipio-resena").textContent = m.resena;
    $("#mapa-iframe").src = m.mapaUrl;
    
    const btnLlegar = $("#btn-como-llegar");
    if (btnLlegar) btnLlegar.dataset.maps = m.mapsNavegacion;
    
    $("#link-google").href = `https://www.google.com/search?q=${encodeURIComponent(m.busquedaGoogle)}`;

    // Función auxiliar para limpiar nombres
    const limpiarID = (texto) => {
        if (!texto) return "sin-nombre";
        return texto.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // --- BLOQUE DE RENDERIZADO PROTEGIDO ---
    try {
        /* PLAYAS */
        if (m.playas && m.playas.length > 0) {
            $("#seccion-playas").style.display = "block";
            $("#contenedor-playas").innerHTML = m.playas.map(p => {
                // PROTECCIÓN: Si p.comoLlegar no existe, usamos ""
                const urlLimpia = (p.comoLlegar || "").replace(/\s+/g, '');
                const nombrePlaya = p.nombre || "Playa";
                const slugTarjeta = `playa-${limpiarID(nombrePlaya)}`;
                const favId = `playa-${id}-${limpiarID(nombrePlaya)}`;

                return `
                <div class="tarjeta-playa-premium" id="${slugTarjeta}">
                    <div class="playa-img-wrapper">
                        <img src="${p.imagen || ''}" alt="${nombrePlaya}" class="playa-img" loading="lazy">
                        <div class="playa-img-overlay"></div>
                        <span class="badge-bandera-premium b-${p.bandera || 'verde'}">
                            <i class="fa-solid fa-flag"></i> Bandera ${p.bandera || 'N/A'}
                        </span>
                    </div>
                    <div class="playa-content-premium">
                        <div class="playa-title-row">
                            <h4><i class="fa-solid fa-umbrella-beach"></i> ${nombrePlaya}</h4>
                        </div>
                        <div class="playa-info-row">
                            <span class="info-item"><i class="fa-solid fa-water"></i> <strong>Oleaje:</strong> ${p.oleaje || 'No especificado'}</span>
                        </div>
                        <p class="playa-tip-premium"><i class="fa-solid fa-lightbulb"></i> ${p.tip || ''}</p>
                        <div class="playa-actions-premium">
                            <a href="${urlLimpia}" target="_blank" rel="noopener" class="btn-llegar-premium">
                                <i class="fa-solid fa-route"></i> Cómo llegar
                            </a>
                            <div class="playa-mini-actions">
                                <button class="btn-mini-premium btn-fav" data-action="fav" data-fav-id="${favId}" data-fav-titulo="${nombrePlaya}" data-fav-url="municipio.html?id=${id}" title="Guardar en favoritos">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                                <button class="btn-mini-premium btn-share" data-action="compartir" data-titulo="${nombrePlaya}" data-texto="Mira esta playa en Monbá QR" title="Compartir">
                                    <i class="fa-solid fa-share-nodes"></i>
                                </button>
                                <button class="btn-mini-premium btn-qr" data-action="ver-qr-playa" data-nombre="${nombrePlaya}" data-imagen="${p.imagen || ''}" data-tip="${p.tip || ''}" title="Ver QR">
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
                // PROTECCIÓN: Si r.comoLlegar o r.tipo no existen, evitamos errores
                const urlLimpia = (r.comoLlegar || "").replace(/\s+/g, '');
                const nombreRincon = r.nombre || "Rincón";
                const tipoRincon = r.tipo || "sendero";
                const slugTarjeta = `rincon-${limpiarID(nombreRincon)}`;
                const favId = `rincon-${id}-${limpiarID(nombreRincon)}`;

                return `
                <div class="tarjeta-rincon-premium" id="${slugTarjeta}">
                    <div class="rincon-img-wrapper">
                        <img src="${r.imagen || ''}" alt="${nombreRincon}" class="rincon-img" loading="lazy">
                        <div class="rincon-img-overlay"></div>
                        <span class="badge-tipo-premium t-${tipoRincon.toLowerCase()}">
                            <i class="fa-solid ${iconoTipo(tipoRincon)}"></i> ${tipoRincon}
                        </span>
                    </div>
                    <div class="rincon-content-premium">
                        <div class="rincon-title-row">
                            <h4>${nombreRincon}</h4>
                        </div>
                        <p class="rincon-desc-premium">${r.descripcion || ''}</p>
                        <div class="rincon-actions-premium">
                            <a href="${urlLimpia}" target="_blank" rel="noopener" class="btn-llegar-premium">
                                <i class="fa-solid fa-route"></i> Cómo llegar
                            </a>
                            <div class="rincon-mini-actions">
                                <button class="btn-mini-premium btn-fav" data-action="fav" data-fav-id="${favId}" data-fav-titulo="${nombreRincon}" data-fav-url="municipio.html?id=${id}" title="Guardar en favoritos">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                                <button class="btn-mini-premium btn-share" data-action="compartir" data-titulo="${nombreRincon}" data-texto="Mira este rincón natural en Monbá QR" title="Compartir">
                                    <i class="fa-solid fa-share-nodes"></i>
                                </button>
                                <button class="btn-mini-premium btn-qr" data-action="ver-qr-rincon" data-nombre="${nombreRincon}" data-imagen="${r.imagen || ''}" data-descripcion="${r.descripcion || ''}" title="Ver QR">
                                    <i class="fa-solid fa-qrcode"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join("");
        }
    } catch (error) {
        console.error("Error al renderizar contenido:", error);
    } finally {
        // ¡ESTO ES VITAL! Pase lo que pase en el try, el cargando se quita y se muestra el contenido
        estado.style.display = "none";
        contenedor.style.display = "block";
        
        if (typeof sincronizarFavoritos === "function") {
            try { sincronizarFavoritos(); } catch (e) {}
        }
    }

    // --- LÓGICA DE SCROLL (Solo para el que escanea el QR) ---
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const targetLugar = urlParams.get('lugar') || urlParams.get('target');
        
        if (targetLugar) {
            setTimeout(() => {
                const el = document.getElementById(targetLugar);
                if (el) {
                    if ('scrollBehavior' in document.documentElement.style) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        const rect = el.getBoundingClientRect();
                        const offset = rect.top + window.pageYOffset - (window.innerHeight / 2) + (rect.height / 2);
                        window.scrollTo(0, offset);
                    }
                    el.classList.add('monba-destacado');
                    setTimeout(() => el.classList.remove('monba-destacado'), 4000);
                }
            }, 800); 
        }
    } catch (error) {
        console.error("Error en el scroll del QR:", error);
    }
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
    return iconos[tipo?.toLowerCase()] || "fa-leaf";
}

document.addEventListener("DOMContentLoaded", cargarMunicipio);
