const MONBA = { marca: "Monbá QR", correo: "tacai2753@gmail.com", claveFavoritos: "monba_favoritos", splashMs: 2200 };
window.$ = (s, c = document) => c.querySelector(s);
window.$$ = (s, c = document) => [...c.querySelectorAll(s)];
const getParam = n => new URLSearchParams(window.location.search).get(n);
const qrURL = (d, size = 420) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(d)}`;

function toast(msg) {
    let t = $("#monba-toast");
    if (!t) { t = document.createElement("div"); t.id = "monba-toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("visible");
    clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove("visible"), 3200);
}

function initSplash() {
    const s = $("#splash-screen"); if (!s) return;
    setTimeout(() => {
        s.style.opacity = "0"; s.style.visibility = "hidden";
        setTimeout(() => s.remove(), 600);
    }, MONBA.splashMs);
}

function abrirBandeja() { $("#bandeja")?.classList.add("abierta"); $("#overlay")?.classList.add("activo"); }
function cerrarBandeja() { $("#bandeja")?.classList.remove("abierta"); $("#overlay")?.classList.remove("activo"); }

function getFavoritos() {
    try {
        const raw = JSON.parse(localStorage.getItem(MONBA.claveFavoritos)) || [];
        return raw.map(f => typeof f === "string"
            ? { id: f, titulo: f, url: "directorio.html?id=" + encodeURIComponent(f) }
            : f);
    } catch { return []; }
}
function isFav(id) { return getFavoritos().some(f => f.id === id); }
function toggleFavorito(id, titulo, url) {
    if (!id) { toast("No hay nada seleccionado para guardar"); return; }
    let favs = getFavoritos();
    const ex = favs.some(f => f.id === id);
    favs = ex
        ? favs.filter(f => f.id !== id)
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
        const i = b.querySelector("i");
        if (i) i.className = act ? "fa-solid fa-heart" : "fa-regular fa-heart";
    });
}

function rr(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}
function ajustarTexto(ctx, texto, maxW, size, peso = "bold") {
    ctx.font = `${peso} ${size}px Segoe UI, sans-serif`;
    while (ctx.measureText(texto).width > maxW && size > 18) {
        size -= 2; ctx.font = `${peso} ${size}px Segoe UI, sans-serif`;
    }
    return size;
}
function animarPuntos(ctx, W, H) {
    return new Promise(res => {
        let f = 0; const max = 25;
        const it = setInterval(() => {
            ctx.fillStyle = "#fefae0"; ctx.fillRect(0, 0, W, H);
            for (let i = 0; i < 120; i++) {
                ctx.fillStyle = `rgba(0,119,182,${f / max})`;
                ctx.fillRect(Math.random() * W, Math.random() * H,
                             Math.random() * 5 + 2, Math.random() * 5 + 2);
            }
            f++; if (f >= max) { clearInterval(it); res(); }
        }, 30);
    });
}

function asegurarModalQR() {
    if ($("#modal-qr")) return;
    const modal = document.createElement("div");
    modal.className = "modal-qr"; modal.id = "modal-qr";
    modal.innerHTML = `
        <div class="contenido-qr">
            <h4>Cartel digital de esta sección</h4>
            <canvas id="qr-canvas" width="640" height="960"></canvas>
            <button class="btn-qr" id="btn-descargar-qr" style="margin:10px 0;">
                <i class="fa-solid fa-download"></i> Descargar cartel PNG
            </button><br>
            <button class="btn-cerrar-qr" data-action="cerrar-qr">Cerrar</button>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", e => { if (e.target === modal) cerrarQR(); });
    $("#btn-descargar-qr").addEventListener("click", descargarQR);
}
function cerrarQR() { $("#modal-qr")?.classList.remove("activo"); }

function idAuto() {
    const pag = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
    const ref = getParam("id") || getParam("municipio") || getParam("categoria") || "";
    return (pag + (ref ? "-" + ref : "")).toLowerCase().slice(0, 48);
}
function rutaRelativa() {
    return (location.pathname.split("/").pop() || "index.html") + location.search;
}
function urlPuerta() {
    return new URL(
        "qr.html?qr=" + encodeURIComponent(idAuto()) +
        "&to=" + encodeURIComponent(rutaRelativa()),
        location.href
    ).href;
}

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
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fefae0"; ctx.fillRect(0, 0, W, H);

    const g = ctx.createLinearGradient(0, 0, W, 200);
    g.addColorStop(0, "#0077b6"); g.addColorStop(1, "#00b4d8");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 200);

    if (logoImg) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.25)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4;
        ctx.fillStyle = "#ffffff"; rr(ctx, 40, 45, 110, 110, 26); ctx.fill();
        ctx.restore();
        ctx.save(); rr(ctx, 48, 53, 94, 94, 20); ctx.clip();
        ctx.drawImage(logoImg, 48, 53, 94, 94); ctx.restore();
    } else {
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(95, 100, 55, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#0077b6"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = "bold 42px Segoe UI, sans-serif"; ctx.fillText("QR", 95, 102);
    }

    ctx.fillStyle = "#ffffff"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.font = "bold 46px Segoe UI, sans-serif"; ctx.fillText("Monbá QR", 170, 88);
    ctx.font = "24px Segoe UI, sans-serif"; ctx.fillStyle = "#fefae0";
    ctx.fillText("La Guía de Barlovento", 170, 132);

    ctx.textAlign = "center"; ctx.fillStyle = "#0077b6";
    ajustarTexto(ctx, seccion, W - 80, 36); ctx.fillText(seccion, W / 2, 265);

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.18)"; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#ffffff"; rr(ctx, 90, 310, 460, 460, 24); ctx.fill();
    ctx.restore();
    ctx.drawImage(qrImg, 110, 330, 420, 420);

    ctx.fillStyle = "#333333"; ctx.font = "bold 34px Segoe UI, sans-serif";
    ctx.fillText("¡Escanea y descubre!", W / 2, 830);
    ctx.fillStyle = "#666666"; ctx.font = "24px Segoe UI, sans-serif";
    ctx.fillText("Apunta la cámara de tu celular al código", W / 2, 872);

    ctx.fillStyle = "#0077b6"; ctx.fillRect(0, H - 60, W, 60);
    ctx.fillStyle = "#ffffff"; ctx.font = "22px Segoe UI, sans-serif";
    ctx.fillText("Monbá QR · Directorio Turístico de Barlovento", W / 2, H - 30);
    ctx.restore();
}

async function mostrarQR(url = null, seccion = null) {
    asegurarModalQR();
    const nombre = seccion
        || $("#header-titulo")?.textContent
        || document.querySelector("header h1")?.textContent
        || MONBA.marca;
    const destinoQR = url || urlPuerta();
    const canvas = $("#qr-canvas"); const ctx = canvas.getContext("2d");

    const logoPromise = cargarLogo();
    await animarPuntos(ctx, canvas.width, canvas.height);

    const img = new Image(); img.crossOrigin = "anonymous";
    img.src = qrURL(destinoQR, 420);
    await new Promise(res => { img.onload = () => res(); img.onerror = res; });

    const logoImg = await logoPromise;
    dibujarPlantilla(ctx, img, nombre, logoImg);
    $("#modal-qr").classList.add("activo");
    sincronizarFavoritos();
}

function descargarQR() {
    const canvas = $("#qr-canvas"); if (!canvas) return;
    try {
        const link = document.createElement("a");
        link.download = `MonbaQR-${idAuto()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        toast("Cartel QR descargado 🎉");
    } catch (err) {
        console.warn("Export canvas falló:", err);
        toast("No se pudo exportar (imagen bloqueada). Mantén presionado el cartel para guardarlo.");
    }
}

function limpiarIDParaQR(texto) {
    if (!texto) return "sin-nombre";
    let limpio = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    limpio = limpio.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (limpio.startsWith('playa-')) limpio = limpio.replace('playa-', '');
    if (limpio.startsWith('rincon-')) limpio = limpio.replace('rincon-', '');
    return limpio;
}

function wrapText(ctx, texto, maxW) {
    const palabras = texto.split(' ');
    const lineas = [];
    let lineaActual = '';
    for (const palabra of palabras) {
        const prueba = lineaActual ? lineaActual + ' ' + palabra : palabra;
        if (ctx.measureText(prueba).width <= maxW) {
            lineaActual = prueba;
        } else {
            if (lineaActual) lineas.push(lineaActual);
            lineaActual = palabra;
        }
    }
    if (lineaActual) lineas.push(lineaActual);
    return lineas;
}

async function mostrarQRPlayaRincon(nombre, imagen, descripcion, tipo = 'playa') {
    asegurarModalQR();
    const canvas = $("#qr-canvas");
    const ctx = canvas.getContext("2d");
    const W = 640, H = 960;

    const logoPromise = cargarLogo();

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagen;
    await new Promise(res => { img.onload = () => res(); img.onerror = res(); });

    ctx.drawImage(img, 0, 0, W, H);
    ctx.fillStyle = "rgba(0, 20, 40, 0.65)";
    ctx.fillRect(0, 0, W, H);

    const g = ctx.createLinearGradient(0, 0, W, 160);
    g.addColorStop(0, "#0077b6");
    g.addColorStop(1, "#00b4d8");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, 160);

    const logoImg = await logoPromise;
    if (logoImg) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = "#fff";
        rr(ctx, 30, 30, 100, 100, 22);
        ctx.fill();
        ctx.restore();
        ctx.save();
        rr(ctx, 38, 38, 84, 84, 18);
        ctx.clip();
        ctx.drawImage(logoImg, 38, 38, 84, 84);
        ctx.restore();
    }

    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "bold 42px Segoe UI, sans-serif";
    ctx.fillText("Monbá QR", 150, 70);
    ctx.font = "22px Segoe UI, sans-serif";
    ctx.fillStyle = "#fefae0";
    ctx.fillText("La Guía de Barlovento", 150, 115);

    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 36px Segoe UI, sans-serif";
    ajustarTexto(ctx, nombre, W - 100, 36);
    ctx.fillText(nombre, W / 2, 215);

    const cardId = `${tipo}-${limpiarIDParaQR(nombre)}`;
    const urlObj = new URL(window.location.href);
    urlObj.searchParams.set('lugar', cardId);
    urlObj.searchParams.set('qr', cardId);
    urlObj.searchParams.set('src', 'qr');
    
    const toStr = urlObj.pathname.split('/').pop() + urlObj.search;
    const urlPuertaConPlaya = new URL(
        "qr.html?qr=" + encodeURIComponent(cardId) + 
        "&to=" + encodeURIComponent(toStr),
        location.href
    ).href;

    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = qrURL(urlPuertaConPlaya, 380);
    await new Promise(res => { qrImg.onload = () => res(); qrImg.onerror = res; });

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = "#fff";
    rr(ctx, 110, 250, 420, 420, 24);
    ctx.fill();
    ctx.restore();
    ctx.drawImage(qrImg, 130, 270, 380, 380);

    ctx.font = "22px Segoe UI, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const maxW = W - 100;
    const lineas = wrapText(ctx, descripcion, maxW);
    const lineHeight = 30;

    let yInicio = 720;
    if (lineas.length > 3) yInicio = 690;

    lineas.forEach((linea, i) => {
        ctx.fillText(linea, W / 2, yInicio + i * lineHeight);
    });

    ctx.fillStyle = "#0077b6";
    ctx.fillRect(0, H - 70, W, 70);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Monbá QR · Directorio Turístico de Barlovento", W / 2, H - 35);

    $("#modal-qr").classList.add("activo");
}

async function compartir(titulo, texto) {
    const d = {
        title: titulo || MONBA.marca,
        text: texto || "¡Descubre Barlovento con Monbá QR!",
        url: window.location.href
    };
    try {
        if (navigator.share) { await navigator.share(d); return; }
        await navigator.clipboard.writeText(d.url);
        toast("Enlace copiado al portapapeles");
    } catch { toast("Copia el enlace desde la barra del navegador"); }
}

function generarFeedRandom(sel, items, cant = 3) {
    const c = $(sel); if (!c) return;
    const favs = getFavoritos();
    let lista = [];
    const favItems = items.filter(i => favs.some(f => f.id === i.id));
    lista = favItems.length ? favItems.slice(0, cant)
                            : [...items].sort(() => Math.random() - 0.5).slice(0, cant);

    c.innerHTML = lista.map(i => `
        <div class="tarjeta-lugar" style="cursor:pointer;"
             onclick="window.location.href='${i.url}'">
            <h4>${i.titulo}</h4>
            <p>${i.descripcion || ""}</p>
            <div class="servicios-tags">
                ${(i.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
        </div>`).join("");
}

let deferredPrompt = null;
const yaInstalada =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); deferredPrompt = e; mostrarBannerPWA();
});
window.addEventListener("appinstalled", () => {
    $("#pwa-banner")?.remove(); toast("¡Monbá QR instalado! 🎉");
});

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

function initAcciones() {
    document.addEventListener("click", e => {
        const el = e.target.closest("[data-action]"); if (!el) return;
        const a = el.dataset.action;
        if (a !== "wa") e.preventDefault();

        switch (a) {
            case "abrir-bandeja":   abrirBandeja(); break;
            case "cerrar-bandeja":  cerrarBandeja(); break;
            case "volver":          history.back(); break;
            case "compartir":       compartir(el.dataset.titulo, el.dataset.texto); break;
            case "ver-qr":          mostrarQR(el.dataset.qr || null, el.dataset.seccion); break;
            case "cerrar-qr":       cerrarQR(); break;
            case "fav":
                toggleFavorito(
                    el.dataset.favId || getParam("id"),
                    el.dataset.favTitulo,
                    el.dataset.favUrl
                );
                break;
            case "ruta":
                if (el.dataset.maps) window.open(el.dataset.maps, "_blank");
                break;
            case "instalar":        instalarApp(); break;
            case "proximamente":
                toast("🚧 Vitrina de proyectos: PRÓXIMAMENTE. ¿Tienes un proyecto académico o personal? Escríbenos a " + MONBA.correo + " y sé de los primeros en exhibirlo.");
                break;
            case "ver-qr-playa":
                mostrarQRPlayaRincon(el.dataset.nombre, el.dataset.imagen, el.dataset.tip, 'playa');
                break;
            case "ver-qr-rincon":
                mostrarQRPlayaRincon(el.dataset.nombre, el.dataset.imagen, el.dataset.descripcion, 'rincon');
                break;
            case "wa":
                break;
        }
    });
}

// --- LÓGICA MEJORADA DE AUTO-SCROLL ---
function autoScrollLugar() {
    const lugar = getParam("lugar");
    if (!lugar) return;

    // Limpiamos el ID para quitarle el "playa-" o "rincon-" si lo tiene
    const idLimpio = lugar.replace(/^(playa-|rincon-)/, '');
    let intentos = 0;
    const maxIntentos = 30; // Intentará por 3 segundos (30 * 100ms)

    const intervalo = setInterval(() => {
        intentos++;

        // 1. Buscamos por el ID exacto (ej: "playa-caracolito")
        // 2. O por el ID sin el prefijo (ej: "caracolito")
        let el = document.getElementById(lugar) || document.getElementById(idLimpio);

        // 3. Fallback extremo: buscar en las tarjetas si el texto coincide
        if (!el) {
            const tarjetas = document.querySelectorAll('.tarjeta-lugar, .card-playa, .card-lugar, [class*="tarjeta"]');
            for (const tarjeta of tarjetas) {
                const textoLimpio = idLimpio.replace(/-/g, ' ').toLowerCase();
                if (tarjeta.textContent.toLowerCase().includes(textoLimpio)) {
                    el = tarjeta;
                    break;
                }
            }
        }

        if (el) {
            clearInterval(intervalo);
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                // Efecto visual de iluminación
                el.style.transition = "box-shadow 0.5s, transform 0.5s, background-color 0.5s";
                el.style.boxShadow = "0 0 25px #00A6C0";
                el.style.transform = "scale(1.03)";
                el.style.backgroundColor = "rgba(0, 166, 192, 0.1)";
                
                setTimeout(() => {
                    el.style.boxShadow = "none";
                    el.style.transform = "scale(1)";
                    el.style.backgroundColor = "";
                }, 3000);
            }, 300); // Pausa para asegurar que el navegador terminó de dibujar la página
        } else if (intentos > maxIntentos) {
            clearInterval(intervalo);
            console.warn("No se encontró el elemento para auto-scroll:", lugar);
        }
    }, 100);
}

const VAPID_PUBLIC_KEY = 'BJnCfTHoJlXebC-BVpKeg_GcsA1jyznonu9mekPsduktdOXfVwcTkb9lSuTmMPqfxZcJ77DctES_U7YNbcrR4Hg';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function activarNotificacionesPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Tu navegador no soporta notificaciones push.');
    return;
  }

  if (Notification.permission === 'denied') {
    alert('⚠️ Has bloqueado las notificaciones. Para activarlas:\n\n1. Toca el candado (o la "i") en la barra de direcciones.\n2. Ve a Permisos > Notificaciones.\n3. Selecciona "Permitir".\n4. Recarga la página e intenta de nuevo.');
    return; 
  }

  try {
    const permiso = await Notification.requestPermission();
    if (permiso !== 'granted') {
      alert('Permiso de notificaciones denegado.');
      return;
    }

    const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
    await navigator.serviceWorker.ready;

    const existingSubscription = await reg.pushManager.getSubscription();
    if (existingSubscription) {
      await existingSubscription.unsubscribe();
    }

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    await fetch('https://monba-push-server.onrender.com/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });

    alert('¡Notificaciones activadas con éxito! 🎉');
  } catch (error) {
    console.error('Error al activar notificaciones:', error);
    alert('Hubo un error al activar. Revisa la consola (F12).');
  }
}

document.addEventListener("DOMContentLoaded", () => {
    initSplash();
    initAcciones();
    sincronizarFavoritos();
    
    // Le damos un pequeño respiro al navegador para que cargue el HTML antes de hacer scroll
    setTimeout(autoScrollLugar, 500);

    $("#modal-qr")?.addEventListener("click", function (e) {
        if (e.target === this) cerrarQR();
    });
    $$("[data-anio]").forEach(el => el.textContent = new Date().getFullYear());
});
