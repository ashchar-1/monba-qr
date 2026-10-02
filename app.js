/* =====================================================
   MONBÁ QR · app.js (LÓGICA GENÉRICA COMPLETA)
   Splash · Bandeja · Favoritos · QR con logo real y
   plantilla descargable · Feed · PWA · Acciones globales
   ===================================================== */
const MONBA = { marca: "Monbá QR", correo: "tacai2753@gmail.com", claveFavoritos: "monba_favoritos", splashMs: 2200 };
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const getParam = n => new URLSearchParams(window.location.search).get(n);
const qrURL = (d, size = 420) => `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(d)}`;

/* ---------- TOAST ---------- */
function toast(msg) {
    let t = $("#monba-toast");
    if (!t) { t = document.createElement("div"); t.id = "monba-toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("visible");
    clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove("visible"), 3200);
}

/* ---------- SPLASH ---------- */
function initSplash() {
    const s = $("#splash-screen"); if (!s) return;
    setTimeout(() => { s.style.opacity = "0"; s.style.visibility = "hidden"; setTimeout(() => s.remove(), 600); }, MONBA.splashMs);
}

/* ---------- BANDEJA ---------- */
function abrirBandeja() { $("#bandeja")?.classList.add("abierta"); $("#overlay")?.classList.add("activo"); }
function cerrarBandeja() { $("#bandeja")?.classList.remove("abierta"); $("#overlay")?.classList.remove("activo"); }

/* ---------- FAVORITOS (objetos: id, titulo, url) ---------- */
function getFavoritos() {
    try {
        const raw = JSON.parse(localStorage.getItem(MONBA.claveFavoritos)) || [];
        return raw.map(f => typeof f === "string" ? { id: f, titulo: f, url: "directorio.html?id=" + encodeURIComponent(f) } : f);
    } catch { return []; }
}
function isFav(id) { return getFavoritos().some(f => f.id === id); }
function toggleFavorito(id, titulo, url) {
    if (!id) { toast("No hay nada seleccionado para guardar"); return; }
    let favs = getFavoritos();
    const ex = favs.some(f => f.id === id);
    favs = ex ? favs.filter(f => f.id !== id)
              : [...favs, { id, titulo: titulo || id, url: url || rutaRelativa() }];
    localStorage.setItem(MONBA.claveFavoritos, JSON.stringify(favs));
    sincronizarFavoritos();
    toast(ex ? "Quitado de favoritos" : "Guardado en favoritos ❤");
}
function sincronizarFavoritos() {
    $$("[data-action='fav']").forEach(b => {
        const id = b.dataset.favId || getParam("id");
        const act = id && isFav(id);
        b.classList.toggle("favorito-activo", !!act);
        const i = b.querySelector("i"); if (i) i.className = act ? "fa-solid fa-heart" : "fa-regular fa-heart";
    });
}

/* ---------- QR CON LOGO REAL + PLANTILLA DESCARGABLE + CONTEO ---------- */
function asegurarModalQR() {
    if ($("#modal-qr")) return;
    const modal = document.createElement("div");
    modal.className = "modal-qr"; modal.id = "modal-qr";
    modal.innerHTML = `
        <div class="contenido-qr">
            <h4>Cartel digital de esta sección</h4>
            <canvas id="qr-canvas" width="640" height="960"></canvas>
            <button class="btn-qr" id="btn-descargar-qr" style="margin:10px 0;"><i class="fa-solid fa-download"></i> Descargar cartel PNG</button><br>
            <button class="btn-cerrar-qr" data-action="cerrar-qr">Cerrar</button>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", e => { if (e.target === modal) cerrarQR(); });
    $("#btn-descargar-qr").addEventListener("click", descargarQR);
}
function idAuto() {
    const pag = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
    const ref = getParam("id") || getParam("municipio") || getParam("categoria") || "";
    return (pag + (ref ? "-" + ref : "")).toLowerCase().slice(0, 48);
}
function rutaRelativa() {
    return (location.pathname.split("/").pop() || "index.html") + location.search;
}
function urlPuerta() {
    return new URL("qr.html?qr=" + encodeURIComponent(idAuto()) + "&to=" + encodeURIComponent(rutaRelativa()), location.href).href;
}
function rr(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function ajustarTexto(ctx, texto, maxW, size, peso = "bold") {
    ctx.font = `${peso} ${size}px Segoe UI, sans-serif`;
    while (ctx.measureText(texto).width > maxW && size > 18) { size -= 2; ctx.font = `${peso} ${size}px Segoe UI, sans-serif`; }
}
function animarPuntos(ctx, W, H) {
    return new Promise(res => {
        let f = 0; const max = 25;
        const it = setInterval(() => {
            ctx.fillStyle = "#fefae0"; ctx.fillRect(0, 0, W, H);
            for (let i = 0; i < 120; i++) {
                ctx.fillStyle = `rgba(0,119,182,${f / max})`;
                ctx.fillRect(Math.random() * W, Math.random() * H, Math.random() * 5 + 2, Math.random() * 5 + 2);
            }
            f++; if (f >= max) { clearInterval(it); res(); }
        }, 30);
    });
}

/* --- Carga el logo real (mismo origen: no mancha el canvas) --- */
async function cargarLogo() {
    const fuentes = ["icon-192.png", "favicon.svg"];
    for (const f of fuentes) {
        const img = await new Promise(res => {
            const i = new Image();
            i.onload = () => res(i);
            i.onerror = () => res(null);
            i.src = new URL(f, location.href).href;
        });
        if (img) return img;
    }
    return null;
}

function dibujarPlantilla(ctx, qrImg, seccion, logoImg) {
    const W = 640, H = 960;
    ctx.fillStyle = "#fefae0"; ctx.fillRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, W, 200);
    g.addColorStop(0, "#0077b6"); g.addColorStop(1, "#00b4d8");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 200);

    /* ===== LOGO: tu arte real sobre base blanca redondeada ===== */
    if (logoImg) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.25)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4;
        ctx.fillStyle = "#ffffff"; rr(ctx, 40, 45, 110, 110, 26); ctx.fill();
        ctx.restore();
        ctx.save();
        rr(ctx, 48, 53, 94, 94, 20); ctx.clip();
        ctx.drawImage(logoImg, 48, 53, 94, 94);
        ctx.restore();
    } else {
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(95, 100, 55, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#0077b6"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 42px Segoe UI, sans-serif"; ctx.fillText("QR", 95, 102);
    }

    /* Marca */
    ctx.fillStyle = "#ffffff"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.font = "bold 46px Segoe UI, sans-serif"; ctx.fillText("Monbá QR", 170, 88);
    ctx.font = "24px Segoe UI, sans-serif"; ctx.fillStyle = "#fefae0"; ctx.fillText("La Guía de Barlovento", 170, 132);

    /* Nombre de la sección */
    ctx.textAlign = "center"; ctx.fillStyle = "#0077b6";
    ajustarTexto(ctx, seccion, W - 80, 36); ctx.fillText(seccion, W / 2, 265);

    /* Tarjeta blanca + QR */
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.18)"; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#ffffff"; rr(ctx, 90, 310, 460, 460, 24); ctx.fill();
    ctx.restore();
    ctx.drawImage(qrImg, 110, 330, 420, 420);

    /* Llamado a la acción */
    ctx.fillStyle = "#333333"; ctx.font = "bold 34px Segoe UI, sans-serif";
    ctx.fillText("¡Escanea y descubre!", W / 2, 830);
    ctx.fillStyle = "#666666"; ctx.font = "24px Segoe UI, sans-serif";
    ctx.fillText("Apunta la cámara de tu celular al código", W / 2, 872);

    /* Franja inferior */
    ctx.fillStyle = "#0077b6"; ctx.fillRect(0, H - 60, W, 60);
    ctx.fillStyle = "#ffffff"; ctx.font = "22px Segoe UI, sans-serif";
    ctx.fillText("Monbá QR · Directorio Turístico de Barlovento", W / 2, H - 30);
}

async function mostrarQR(url = null, seccion = null) {
    asegurarModalQR();
    const nombre = seccion || $("#header-titulo")?.textContent || document.querySelector("header h1")?.textContent || MONBA.marca;
    const destinoQR = url || urlPuerta();
    const canvas = $("#qr-canvas"); const ctx = canvas.getContext("2d");
    const logoPromise = cargarLogo();
    await animarPuntos(ctx, canvas.width, canvas.height);
    const img = new Image(); img.crossOrigin = "anonymous"; img.src = qrURL(destinoQR, 420);
    await new Promise(res => { img.onload = () => res(); img.onerror = res; });
    const logoImg = await logoPromise;
    dibujarPlantilla(ctx, img, nombre, logoImg);
    $("#modal-qr").classList.add("activo");
}

function descargarQR() {
    const canvas = $("#qr-canvas"); if (!canvas) return;
    try {
        const link = document.createElement("a");
        link.download = `MonbaQR-${idAuto()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click(); toast("Cartel QR descargado 🎉");
    } catch { toast("No se pudo exportar. Mantén presionado el cartel para guardarlo."); }
}
function cerrarQR() { $("#modal-qr")?.classList.remove("activo"); }

/* ---------- COMPARTIR ---------- */
async function compartir(titulo, texto) {
    const d = { title: titulo || MONBA.marca, text: texto || "¡Descubre Barlovento con Monbá QR!", url: window.location.href };
    try { if (navigator.share) { await navigator.share(d); return; } await navigator.clipboard.writeText(d.url); toast("Enlace copiado al portapapeles"); }
    catch { toast("Copia el enlace desde la barra del navegador"); }
}

/* ---------- FEED DINÁMICO ---------- */
function generarFeedRandom(sel, items, cant = 3) {
    const c = $(sel); if (!c) return;
    const favs = getFavoritos(); let lista = [];
    if (favs.length && items.some(i => favs.some(f => f.id === i.id))) lista = items.filter(i => favs.some(f => f.id === i.id)).slice(0, cant);
    else lista = [...items].sort(() => Math.random() - 0.5).slice(0, cant);
    c.innerHTML = lista.map(i => `
        <div class="tarjeta-lugar" style="cursor:pointer;" onclick="window.location.href='${i.url}'">
            <h4>${i.titulo}</h4><p>${i.descripcion}</p>
            <div class="servicios-tags">${(i.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div>
        </div>`).join("");
}

/* ---------- PWA NATIVA ---------- */
let deferredPrompt = null;
const yaInstalada = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; mostrarBannerPWA(); });
window.addEventListener("appinstalled", () => { $("#pwa-banner")?.remove(); toast("¡Monbá QR instalado! 🎉"); });
function mostrarBannerPWA() {
    if ($("#pwa-banner") || yaInstalada || !deferredPrompt) return;
    const b = document.createElement("div"); b.id = "pwa-banner";
    b.innerHTML = `
        <div style="flex:1;">
            <strong>Instala Monbá QR</strong>
            <p>Tenla como app en tu dispositivo con un solo toque.</p>
        </div>
        <button id="btn-instalar-pwa">Instalar</button>
        <button id="btn-cerrar-pwa">&times;</button>`;
    document.body.appendChild(b);
    $("#btn-instalar-pwa").addEventListener("click", instalarApp);
    $("#btn-cerrar-pwa").addEventListener("click", () => b.remove());
}
async function instalarApp() {
    if (!deferredPrompt) {
        toast("Chrome aún no valida el manifest. Revisa iconos (404), recarga sin caché o navega ~1 min.");
        return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") { $("#pwa-banner")?.remove(); toast("¡Monbá QR instalado! 🎉"); }
    else toast("Instalación cancelada");
    deferredPrompt = null;
}

/* ---------- ACCIONES GLOBALES ---------- */
function initAcciones() {
    document.addEventListener("click", e => {
        const el = e.target.closest("[data-action]"); if (!el) return;
        const a = el.dataset.action;
        if (a !== "wa") e.preventDefault();
        switch (a) {
            case "abrir-bandeja": abrirBandeja(); break;
            case "cerrar-bandeja": cerrarBandeja(); break;
            case "volver": history.back(); break;
            case "compartir": compartir(el.dataset.titulo, el.dataset.texto); break;
            case "ver-qr": mostrarQR(el.dataset.qr || null, el.dataset.seccion); break;
            case "cerrar-qr": cerrarQR(); break;
            case "fav": toggleFavorito(el.dataset.favId || getParam("id"), el.dataset.favTitulo, el.dataset.favUrl); break;
            case "ruta": if (el.dataset.maps) window.open(el.dataset.maps, "_blank"); break;
            case "instalar": instalarApp(); break;
            case "proximamente": toast("🚧 Vitrina de proyectos: PRÓXIMAMENTE. ¿Tienes un proyecto académico o personal? Escríbenos a " + MONBA.correo + " y sé de los primeros en exhibirlo."); break;
        }
    });
}

/* ---------- ARRANQUE GLOBAL ---------- */
document.addEventListener("DOMContentLoaded", () => {
    initSplash(); initAcciones(); sincronizarFavoritos();
    $("#modal-qr")?.addEventListener("click", function (e) { if (e.target === this) cerrarQR(); });
    $$("[data-anio]").forEach(el => el.textContent = new Date().getFullYear());
});
/* ---------- QR PERSONALIZADO PARA PLAYAS/RINCONES ---------- */
async function mostrarQRPlayaRincon(nombre, imagen, descripcion) {
    asegurarModalQR();
    const canvas = $("#qr-canvas");
    const ctx = canvas.getContext("2d");
    const W = 640, H = 960;
    
    // Cargar logo y QR en paralelo
    const logoPromise = cargarLogo();
    
    // Fondo con imagen
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagen;
    await new Promise(res => { img.onload = () => res(); img.onerror = res; });
    
    // Dibujar imagen de fondo (con overlay oscuro para legibilidad)
    ctx.drawImage(img, 0, 0, W, H);
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, W, H);
    
    // Franja superior
    const g = ctx.createLinearGradient(0, 0, W, 150);
    g.addColorStop(0, "#0077b6");
    g.addColorStop(1, "#00b4d8");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, 150);
    
    // Logo
    const logoImg = await logoPromise;
    if (logoImg) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.25)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = "#fff";
        rr(ctx, 40, 35, 80, 80, 20);
        ctx.fill();
        ctx.restore();
        ctx.save();
        rr(ctx, 46, 41, 68, 68, 16);
        ctx.clip();
        ctx.drawImage(logoImg, 46, 41, 68, 68);
        ctx.restore();
    }
    
    // Marca
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "bold 38px Segoe UI, sans-serif";
    ctx.fillText("Monbá QR", 140, 65);
    ctx.font = "20px Segoe UI, sans-serif";
    ctx.fillStyle = "#fefae0";
    ctx.fillText("La Guía de Barlovento", 140, 105);
    
    // Nombre del lugar
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 32px Segoe UI, sans-serif";
    ajustarTexto(ctx, nombre, W - 80, 32);
    ctx.fillText(nombre, W / 2, 200);
    
    // QR en el centro
    const urlPuerta = new URL("qr.html?qr=" + encodeURIComponent(idAuto()) + "&to=" + encodeURIComponent(rutaRelativa()), location.href).href;
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = qrURL(urlPuerta, 380);
    await new Promise(res => { qrImg.onload = () => res(); qrImg.onerror = res; });
    
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#fff";
    rr(ctx, 110, 240, 420, 420, 24);
    ctx.fill();
    ctx.restore();
    ctx.drawImage(qrImg, 130, 260, 380, 380);
    
    // Descripción abajo
    ctx.fillStyle = "#fff";
    ctx.font = "22px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ajustarTexto(ctx, descripcion, W - 80, 22, "normal");
    ctx.fillText(descripcion, W / 2, 720);
    
    // Franja inferior
    ctx.fillStyle = "#0077b6";
    ctx.fillRect(0, H - 70, W, 70);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Segoe UI, sans-serif";
    ctx.fillText("Monbá QR · Directorio Turístico de Barlovento", W / 2, H - 35);
    
    $("#modal-qr").classList.add("activo");
}

// Agregar al switch de initAcciones:
case "ver-qr-playa": mostrarQRPlayaRincon(el.dataset.nombre, el.dataset.imagen, el.dataset.tip); break;
case "ver-qr-rincon": mostrarQRPlayaRincon(el.dataset.nombre, el.dataset.imagen, el.dataset.descripcion); break;
