/* =====================================================
   MONBÁ QR · municipiosDB.js
   BASE DE DATOS DE MUNICIPIOS CON IDs PARA AUTO-SCROLL
   ===================================================== */
const municipiosDB = {
    "pedro-gual": {
        nombre: "Municipio Pedro Gual",
        mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125586.32626649774!2d-65.77663245!3d10.15583565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2c77df93b8909f%3A0xc39cb709b114d642!2sCupira%2C%20Miranda!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
        mapsNavegacion: "https://www.google.com/maps/dir/?api=1&destination=10.1558,-65.7766",
        busquedaGoogle: "Cupira Pedro Gual turismo casabe Playa Machurucuto",
        resena: "Pedro Gual es la puerta de entrada a Barlovento: el pueblo que te recibe con olor a casabe recién hecho y cochino frito en la carretera nacional. En Cúpira la vida transcurre al ritmo de los viajeros que van hacia oriente, y a un paso del pueblo se abre Machurucuto, donde el río abraza al mar y los pescadores aún sacan la cena del día. Es un municipio de gente sencilla y trabajadora que convirtió la parada de carretera en todo un arte.",
        playas: [
            { id: "playa-machurucuto", nombre: "Playa Machurucuto", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Machurucuto+Miranda", tip: "El principal centro poblado costero del municipio, con amplia tradición pesquera y gran extensión de arena.", imagen: "./img/machurucuto.jpg" },
            { id: "playa-dorada", nombre: "Playa Dorada", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Dorada+Pedro+Gual", tip: "Una de las playas más concurridas de la zona, ideal para pasar el día y disfrutar de la brisa.", imagen: "./img/dorada.jpg" },
            { id: "playa-pintada", nombre: "Playa Pintada", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Pintada+Miranda", tip: "Ubicada en el límite entre Miranda y Anzoátegui (cerca de Boca de Uchire), de acceso sencillo desde la Troncal 9.", imagen: "./img/pintada.jpg" },
            { id: "playa-cocomar", nombre: "Playa Cocomar", oleaje: "Moderado a continuo", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Cocomar+Pedro+Gual", tip: "Sector tranquilo y espacioso, excelente para caminatas a la orilla del mar.", imagen: "./img/cocomar.jpg" },
            { id: "playa-managua", nombre: "Playa Managua", oleaje: "Fuerte / Mar abierto", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Managua+Pedro+Gual", tip: "Costa abierta con oleaje constante; tomar precauciones al ingresar al agua.", imagen: "./img/managua.jpg" },
            { id: "playa-guacuco", nombre: "Playa Guacuco", oleaje: "Fuerte", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Guacuco+Pedro+Gual", tip: "Zona virgen y poco intervenida, ideal para desconectarse y observar el paisaje.", imagen: "./img/guacuco.jpg" },
            { id: "playa-bosque-mar", nombre: "Playa Bosque Mar", oleaje: "Fuerte y continuo", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Bosque+Mar+Pedro+Gual", tip: "Franja de playa contigua a áreas residenciales/vacacionales, con viento y resaca constante.", imagen: "./img/bosque-mar.jpg" }
        ]
    },
    "brion": {
        nombre: "Municipio Brión",
        mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125547.88785802187!2d-66.195037!3d10.4907954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2b740523030ba3%3A0xc3fa5a73e35a1a0c!2sHiguerote%2C%20Miranda!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
        mapsNavegacion: "https://www.google.com/maps/dir/?api=1&destination=10.4908,-66.1950",
        busquedaGoogle: "Higuerote Brión playas Curiepe tambor turismo",
        resena: "Si Barlovento tuviera una postal, sería Higuerote: su malecón, sus toldos de coco y ese mar tranquilo como una piscina, hecho a la medida de los niños. Pero Brión también es el tambor que despierta en Curiepe cada San Juan, el oleaje bravo de Chirimena que reta a los surfistas y la fe de sus pescadores. Es el municipio donde el turismo se volvió casa, cocina y fiesta a la vez.",
        playas: [
            { id: "playa-los-totumos", nombre: "Playa Los Totumos", oleaje: "Manso con pozas poco profundas", bandera: "verde", comoLlegar: "/img/totumos.jpg", tip: "Ideal para niños pequeños por sus aguas tranquilas.", imagen: "./img/totumos.jpg" },
            { id: "playa-de-buche", nombre: "Playa de Buche", oleaje: "Súper manso, piscina natural", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Embarcadero+Carenero+Higuerote", tip: "Se llega en peñero/lancha desde el embarcadero de Carenero o La Pérgola.", imagen: "./img/buche.jpg" },
            { id: "valle-seco", nombre: "Valle Seco", oleaje: "Piscina natural muy serena", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Valle+Seco+Higuerote", tip: "Perfecta para relajarse sin olas y tomar fotos increíbles.", imagen: "./img/seco.jpg" },
            { id: "playa-cuchivano", nombre: "Playa Cuchivano", oleaje: "Suave a moderado", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Cuchivano+Higuerote", tip: "Muy cercana al pueblo de Higuerote, de fácil acceso terrestre.", imagen: "./img/cuchivano.png" },
            { id: "playa-yaguarita", nombre: "Playa Yaguarita", oleaje: "Tranquilo y de aguas cristalinas", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Yaguarita+Miranda", tip: "Excelente opción para snorkel suave cerca de la orilla.", imagen: "./img/yaguarita.jpg" },
            { id: "playa-majagua", nombre: "Playa Majagua", oleaje: "Manso y agua cristalina", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Majagua+Miranda", tip: "Acceso principal por vía marítima desde muelles locales.", imagen: "./img/majagua.jpg" },
            { id: "playa-majaguita", nombre: "Playa Majaguita", oleaje: "Sereno y cristalino", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Majaguita+Miranda", tip: "Una caleta íntima y poco concurrida, ideal para desconectarse.", imagen: "./img/majaguita.jpg" },
            { id: "playa-caracolito", nombre: "Playa Caracolito", oleaje: "Muy tranquilo", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Caracolito+Miranda", tip: "Normalmente se accede en lancha desde Puerto Francés.", imagen: "./img/caracolito.jpg" },
            { id: "san-francisquito", nombre: "San Francisquito", oleaje: "Calmo y poco profundo", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+San+Francisquito+Higuerote", tip: "Ambiente muy acogedor cerca de Los Totumos.", imagen: "./img/francisquito.webp" },
            { id: "playa-escondida", nombre: "Playa Escondida", oleaje: "Manso y recogido", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Escondida+Los+Totumos", tip: "Un rincón tranquilo muy cerca del sector Los Totumos.", imagen: "./img/escondida.png" },
            { id: "mono-manso", nombre: "Mono Manso", oleaje: "Manso", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Mono+Manso+Miranda", tip: "Ensenada natural muy serena rodeada de vegetación.", imagen: "./img/mono.jpg" },
            { id: "playa-el-indio", nombre: " Playa El Indio", oleaje: "Suave", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Indios+Miranda", tip: "Aguas pacíficas en el tramo costero hacia la zona este.", imagen: "./img/indio.jpg" },
            { id: "carenero", nombre: "Carenero", oleaje: "Muy suave (zona de puerto/bahía)", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Carenero+Higuerote", tip: "Punto principal de partida de peñeros hacia otras playas.", imagen: "./img/carenero.jpg" },
            { id: "puerto-frances", nombre: "Puerto Francés", oleaje: "Moderado / Variable", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Puerto+Frances+Higuerote", tip: "Cuenta con gran variedad de servicios, estacionamiento y salida de peñeros.", imagen: "./img/frances.jpg" },
            { id: "playa-caribe", nombre: "Playa Caribe", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Caribe+Miranda", tip: "Paisaje hermoso en el límite costero, tomar precauciones con el viento.", imagen: "./img/caribe.jpg" },
            { id: "playa-esmeralda", nombre: "Playa Esmeralda", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Esmeralda+Miranda", tip: "Agua de hermoso color verde esmeralda pero con movimiento.", imagen: "./img/esmeralda.jpg" },
            { id: "banquito", nombre: "Banquito", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Banquito+Miranda", tip: "Buen punto de parada si vas explorando la costa este.", imagen: "./img/banquito.jpg" },
            { id: "playa-chirimena", nombre: "Playa Chirimena", oleaje: "Fuerte, zona de surfistas", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Chirimena+Miranda", tip: "Si no surfeas, mira desde la arena: el espectáculo está garantizado.", imagen: "./img/chirimena.jpg" },
            { id: "playa-chirere", nombre: "Playa Chirere", oleaje: "Muy fuerte, mar abierto", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Chirere+Miranda", tip: "Epicentro del surf regional y acampada con mucha precaución.", imagen: "./img/chirere.jpg" },
            { id: "playa-corrales", nombre: "Playa Corrales", oleaje: "Fuerte con resaca", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Corrales+Miranda", tip: "Al lado de Chirimena; gran paisaje pero mar de cuidado.", imagen: "./img/playa-corrales-miranda.jpg" },
            { id: "cangrejera", nombre: "Cangrejera", oleaje: "Fuerte y constante", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Cangrejera+Miranda", tip: "Costa virgen de mar abierto; ideal para caminar, no tanto para nadar.", imagen: "./img/cangrejera.jpg" },
            { id: "playa-caiman", nombre: "Playa Caimán", oleaje: "Fuerte", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Caiman+Miranda", tip: "Zona expuesta al oleaje del Atlántico, extremar precauciones.", imagen: "./img/caiman.jpg" }
        ]
    },
    "acevedo": {
        nombre: "Municipio Acevedo",
        mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125586.32626649774!2d-66.3667!3d10.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2c731a22222223%3A0x1111111111111111!2sCaucagua%2C%20Miranda!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
        mapsNavegacion: "https://www.google.com/maps/dir/?api=1&destination=10.2833,-66.3667",
        busquedaGoogle: "Caucagua Acevedo ruta del cacao haciendas turismo",
        resena: "Caucagua huele a cacao: aquí se cosecha, se seca y se tuesta el 'oro marrón' que le dio fama mundial a Barlovento. Entre haciendas centenarias y esquinas de aire colonial, el municipio Acevedo guarda la memoria de las antiguas tierras cacaoteras y la calidez de un pueblo que saluda con un 'buenos días' que suena a abrazo. Es el corazón verde y montañoso de la región.",
        playas: [],
        rincones: [
            { id: "rincon-chorros-de-urba-panaquire", nombre: "Chorros de Urba (Panaquire)", tipo: "Cascada", descripcion: "Caídas de agua cristalina rodeadas de vegetación tropical, uno de los balnearios naturales más queridos de Barlovento.", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Chorros+de+Urba+Panaquire+Miranda", imagen: "./img/urba.jpg" },
            { id: "rincon-balneario-turistico-de-capaya", nombre: "Balneario turístico de Capaya", tipo: "Balneario", descripcion: "Pozo natural de aguas frías y transparentes, ideal para refrescarse entre la montaña cacaotera.", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Balneario+Capaya+Caucagua+Miranda", imagen: "./img/capaya.jpg" },
            { id: "rincon-cueva-walter-dupuy", nombre: "Cueva Walter Dupuy", tipo: "Cueva", descripcion: "Formación geológica de gran valor espeleológico, refugio de fauna local y sitio de interés para los amantes del turismo de aventura.", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Cueva+Walter+Dupuy+Caucagua+Miranda", imagen: "./img/depuy.jpg" },
            { id: "rincon-cascadas-del-rio-marasmita", nombre: "Cascadas del río Marasmita", tipo: "Cascada", descripcion: "Serie de saltos de agua en medio del bosque húmedo, uno de los tesoros menos conocidos de Acevedo.", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Cascadas+Rio+Marasmita+Miranda", imagen: "./img/marasmita.jpg" }
        ]
    },
    "andres-bello": {
        nombre: "Municipio Andrés Bello",
        mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125547.88785802187!2d-65.9833!3d10.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2c731a22222223%3A0x2222222222222222!2sSan%20Jos%C3%A9%20de%20Barlovento%2C%20Miranda!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
        mapsNavegacion: "https://www.google.com/maps/dir/?api=1&destination=10.2833,-65.9833",
        busquedaGoogle: "San José de Barlovento ríos tambores artesanos turismo",
        resena: "San José de Barlovento es un pueblo de ríos y tamboreros: entre montañas y cacaotales aún resuena el golpe del mazo de los artesanos que tallan la madera que después sonará en las fiestas. Aquí el tiempo baja la velocidad entre baños de pozo cristalino y conversaciones de plaza al atardecer. Es el destino perfecto para quien busca un Barlovento auténtico, sin multitudes.",
        playas: []
    },
    "buroz": {
        nombre: "Municipio Buroz",
        mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125586.32626649774!2d-66.1333!3d10.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2c731a22222223%3A0x3333333333333333!2sMamporal%2C%20Miranda!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
        mapsNavegacion: "https://www.google.com/maps/dir/?api=1&destination=10.3667,-66.1333",
        busquedaGoogle: "Mamporal Buroz Boca de Uchire cacao playas turismo",
        resena: "Mamporal vive entre dos mundos: el cacao que perfuma sus haciendas y el mar que se abre en Boca de Uchire, donde el atardecer convierte el agua en oro. Buroz es tradición afrodescendiente, cocinas dulces y pescadores que todavía cuentan historias de la costa. Un municipio que se descubre despacio, como se saborea un buen chocolate.",
        playas: []
    },
    "paez": {
        nombre: "Municipio Páez",
        mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125547.88785802187!2d-65.9833!3d10.3167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2c731a22222223%3A0x4444444444444444!2sR%C3%ADo%20Chico%2C%20Miranda!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
        mapsNavegacion: "https://www.google.com/maps/dir/?api=1&destination=10.3167,-65.9833",
        busquedaGoogle: "Río Chico Páez Tacarigua de la Laguna turismo manglares",
        resena: "Río Chico vive de cara a la laguna: entre canales, garzas y botes que salen de madrugada a la faena. Páez es un municipio de agua —la laguna de Tacarigua, el río Tuy, sus manglares— y de una cocina que sabe a mar y a campo al mismo tiempo. Su gente conserva la calma de quien conoce los horarios de la marea de memoria.",
        playas: [
            { id: "playa-paparo", nombre: "Playa Paparo", oleaje: "Suave / Calmo", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Paparo+Rio+Chico", tip: "Ubicada cerca de la desembocadura, de aguas muy mansas pero con sedimento natural.", imagen: "./img/paparo.jpg" },
            { id: "playa-tacarigua-la-laguna-sector-mar", nombre: "Playa Tacarigua La Laguna (Sector Mar)", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Tacarigua+La+Laguna+Rio+Chico", tip: "Sector abierto al mar con oleaje moderado, ideal para quienes buscan aguas más movidas que el canal interior.", imagen: "./img/tacarigua-laguna-mar.jpg" },
            { id: "playa-de-tacarigua", nombre: "Playa de Tacarigua", oleaje: "Suave", bandera: "verde", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+de+Tacarigua+Rio+Chico", tip: "Playa principal del pueblo pesquero, aguas tranquilas perfectas para familias y para disfrutar la gastronomía local de mariscos.", imagen: "./img/tacarigua.jpg" },
            { id: "playa-boca-de-entrada", nombre: "Playa Boca de Entrada", oleaje: "Moderado a fuerte", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Boca+de+Entrada+Tacarigua+Rio+Chico", tip: "Ubicada al otro lado de la Playa de Tacarigua, en la desembocadura de la laguna. Paisaje único donde se encuentra el río con el mar.", imagen: "./img/boca.jpg" },  
            { id: "redoma-de-rio-chico", nombre: "Redoma de Río Chico", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Redoma+de+Rio+Chico+Miranda", tip: "Punto de entrada principal a la franja playera de los canales de Río Chico.", imagen: "./img/redoma-rio-chico.jpg" },
            { id: "playa-daiquiri", nombre: "Playa Daiquirí", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Daiquiri+Rio+Chico", tip: "Una de las más concurridas y familiares de la zona con alquiler de toldos.", imagen: "./img/daiquiri.jpg" },
            { id: "cano-copey", nombre: "Caño Copey", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Cano+Copey+Rio+Chico", tip: "Ubicada cerca del paso de los canales, zona muy tranquila y amplia.", imagen: "./img/copey.jpg" },            
            { id: "playa-limpia", nombre: "Playa Limpia", oleaje: "Moderado", bandera: "amarilla", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+Limpia+Rio+Chico", tip: "Extensión de arena dorada muy abierta y tranquila.", imagen: "./img/limpia.jpg" },          
            { id: "playa-la-colada", nombre: "Playa La Colada", oleaje: "Fuerte / Mar abierto", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+La+Colada+Rio+Chico", tip: "Una de las playas más famosas de la zona, pero requiere cuidado por el oleaje.", imagen: "./img/colada|1.jpg" },            
            { id: "puerto-tuy", nombre: "Puerto Tuy", oleaje: "Fuerte y continuo", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Puerto+Tuy+Rio+Chico", tip: "Zona de mar abierto expuesta al viento en la franja costera de Río Chico.", imagen: "./img/puerto-tuy.jpg" },            
            { id: "playa-el-raizal", nombre: "Playa El Raizal", oleaje: "Fuerte con resaca", bandera: "roja", comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Playa+El+Raizal+Rio+Chico", tip: "Costa virgen muy expuesta; excelente para relajarse en la arena.", imagen: "./img/raizal.jpg" }  
        ]    
    }
};
