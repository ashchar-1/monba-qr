function cargarMunicipio() {
    let cargadoExitosamente = false;
    
    const estado = document.getElementById("mensaje-estado");
    const contenedor = document.getElementById("contenido-municipio");

    try {
        let id;
        if (typeof getParam === "function") {
            id = getParam("id");
        } else {
            const params = new URLSearchParams(window.location.search);
            id = params.get("id");
        }

        if (typeof municipiosDB === "undefined") {
            throw new Error("municipiosDB no está definido. Revisa que municipiosDB.js esté cargado antes que este script.");
        }

        const m = municipiosDB[id];

        if (!m) {
            const header = document.getElementById("header-titulo");
            if (header) header.textContent = "Error";
            if (estado) estado.innerHTML = `<i class="fa-solid fa-triangle-exclamation fa-2x"></i><p>Municipio no encontrado.</p>`;
            return; 
        }

        const header = document.getElementById("header-titulo");
        if (header) header.textContent = m.nombre;

        const munNombre = document.getElementById("municipio-nombre");
        if (munNombre) munNombre.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${m.nombre}`;

        const munResena = document.getElementById("municipio-resena");
        if (munResena) munResena.textContent = m.resena || "";

        const mapaIframe = document.getElementById("mapa-iframe");
        if (mapaIframe) mapaIframe.src = m.mapaUrl || "";

        const btnLlegar = document.getElementById("btn-como-llegar");
        if (btnLlegar) btnLlegar.dataset.maps = m.mapsNavegacion || "";

        const linkGoogle = document.getElementById("link-google");
        if (linkGoogle) linkGoogle.href = `https://www.google.com/search?q=${encodeURIComponent(m.busquedaGoogle || "")}`;

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

        const limpiarID = (texto) => {
            if (!texto) return "sin-nombre";
            let limpio = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            limpio = limpio.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            if (limpio.startsWith('playa-')) limpio = limpio.replace('playa-', '');
            if (limpio.startsWith('rincon-')) limpio = limpio.replace('rincon-', '');
            return limpio;
        };

        /* RENDERIZAR PLAYAS */
        const seccionPlayas = document.getElementById("seccion-playas");
        const contenedorPlayas = document.getElementById("contenedor-playas");
        if (m.playas && m.playas.length > 0 && seccionPlayas && contenedorPlayas) {
            seccionPlayas.style.display = "block";
            contenedorPlayas.innerHTML = m.playas.map(p => {
                const urlLimpia = (p.comoLlegar || "").replace(/\s+/g, '');
                const nombrePlaya = p.nombre || "Playa";
                
                const slugTarjeta = p.id || `playa-${limpiarID(nombrePlaya)}`;
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
                                <!-- ✅ AQUÍ ESTÁ EL data-lugar AÑADIDO -->
                                <button class="btn-mini-premium btn-share" data-action="compartir" data-titulo="${nombrePlaya}" data-texto="Mira esta playa en Monbá QR" data-lugar="${slugTarjeta}" title="Compartir">
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

        /* RENDERIZAR RINCONES */
        const seccionRincones = document.getElementById("seccion-rincones");
        const contenedorRincones = document.getElementById("contenedor-rincones");
        if (m.rincones && m.rincones.length > 0 && seccionRincones && contenedorRincones) {
            seccionRincones.style.display = "block";
            contenedorRincones.innerHTML = m.rincones.map(r => {
                const urlLimpia = (r.comoLlegar || "").replace(/\s+/g, '');
                const nombreRincon = r.nombre || "Rincón";
                const tipoRincon = r.tipo || "sendero";
                
                const slugTarjeta = r.id || `rincon-${limpiarID(nombreRincon)}`;
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
                                <!-- ✅ AQUÍ ESTÁ EL data-lugar AÑADIDO -->
                                <button class="btn-mini-premium btn-share" data-action="compartir" data-titulo="${nombreRincon}" data-texto="Mira este rincón natural en Monbá QR" data-lugar="${slugTarjeta}" title="Compartir">
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

        cargadoExitosamente = true;

    } catch (error) {
        console.error("Error crítico cargando el municipio:", error);
        if (estado) {
            estado.innerHTML = `<i class="fa-solid fa-triangle-exclamation fa-2x"></i><p>Error al cargar los datos. Revisa la consola.</p>`;
        }
    } finally {
        if (cargadoExitosamente) {
            if (estado) estado.style.display = "none";
            if (contenedor) contenedor.style.display = "block";
            
            if (typeof sincronizarFavoritos === "function") {
                try { sincronizarFavoritos(); } catch (e) {}
            }

            try {
                const urlParams = new URLSearchParams(window.location.search);
                let targetLugar = urlParams.get('lugar') || urlParams.get('qr') || urlParams.get('target');
                
                if (targetLugar) {
                    try { targetLugar = decodeURIComponent(targetLugar); } catch(e) {}
                    
                    setTimeout(() => {
                        const el = document.getElementById(targetLugar);
                        if (el) {
                            el.classList.add('monba-destacado');
                            setTimeout(() => el.classList.remove('monba-destacado'), 4000);
                        }
                    }, 1500);
                }
            } catch (error) {
                console.error("Error en resaltado:", error);
            }
        } else {
            if (estado) estado.style.display = "block";
        }
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
