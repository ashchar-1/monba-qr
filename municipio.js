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
            // Limpiar la URL (quitar espacios raros que rompen el link)
            const urlLimpia = p.comoLlegar.replace(/\s+/g, '');
            return `
            <div class="tarjeta-playa">
                <div class="playa-header">
                    <h4><i class="fa-solid fa-umbrella-beach"></i> ${p.nombre}</h4>
                    <span class="badge-bandera b-${p.bandera}"><i class="fa-solid fa-flag"></i> Bandera ${p.bandera}</span>
                </div>
                <p class="playa-dato"><i class="fa-solid fa-water"></i> <span><strong>Oleaje:</strong> ${p.oleaje}</span></p>
                <a href="${urlLimpia}" target="_blank" rel="noopener" class="btn-como-llegar-playa">
                    <i class="fa-solid fa-route"></i> Cómo llegar
                </a>
                <p class="playa-dato tip"><i class="fa-solid fa-lightbulb"></i> <span>${p.tip}</span></p>
            </div>`;
        }).join("");
    }

    /* RINCONES NATURALES */
    if (m.rincones && m.rincones.length > 0) {
        $("#seccion-rincones").style.display = "block";
        $("#contenedor-rincones").innerHTML = m.rincones.map(r => {
            const urlLimpia = r.comoLlegar.replace(/\s+/g, '');
            return `
            <div class="tarjeta-rincon">
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
