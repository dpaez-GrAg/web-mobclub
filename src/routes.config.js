// FUENTE ÚNICA DE RUTAS.
//
// Antes había dos listas escritas a mano: las <Route> de src/App.jsx y el
// ROUTES de scripts/prerender.mjs. Ya se habían desincronizado: el prerender
// no incluía /bienvenida ni las confirmaciones, así que esas rutas no existían
// como fichero y Netlify las servía con el HTML de la home (un soft 404 con el
// canonical de la home). Y el title/description vivía dentro de cada página,
// de modo que /legal y /empleo —que nunca montaron <SEO>— heredaban los de la
// home. Todo lo que sepa de rutas se declara aquí.
//
// Consumidores:
//   - src/App.jsx                → monta las <Route> y el <SEO> de cada una
//   - scripts/prerender.mjs      → qué rutas se prerenderizan
//   - scripts/gen-sitemap.mjs    → sitemap.xml
//   - scripts/gen-llms-txt.mjs   → llms.txt
//
// REGLA: este fichero es DATOS PUROS. Ni JSX, ni imports, ni React. Los scripts
// del build lo importan con node directamente, y node no sabe leer JSX. El
// componente de cada página se referencia por `id` y se resuelve en App.jsx.
//
// Para añadir una página: una entrada aquí + una en el registro de App.jsx. El
// prerender, el sitemap y llms.txt se actualizan solos.

export const SITE = "https://mobclub.es";

/**
 * Cada ruta declara:
 *   id          clave del componente en el registro de App.jsx
 *   path        ruta de react-router (y URL canónica)
 *   name        nombre corto y humano. Se usa en el breadcrumb y en llms.txt
 *   title       <title> y og:title (si no hay ogTitle)
 *   description meta description y og:description (si no hay ogDescription)
 *   ogTitle     título para redes, cuando el de marca difiere del de buscador
 *   summary     una línea para llms.txt. Omitir = no sale en llms.txt
 *   files       ficheros fuente de los que se saca el <lastmod> del sitemap
 *   indexable   false ⇒ noindex + fuera del sitemap y de llms.txt
 *   nav         false ⇒ se renderiza sin Nav (el Footer es global)
 *   schema      JSON-LD extra que inyecta <SEO>, aparte de WebSite/Breadcrumb
 *
 * El breadcrumb NO se declara: se deriva (Inicio › esta página) para toda ruta
 * indexable que no sea la home. Declararlo a mano era otra ocasión de que dos
 * sitios dijeran cosas distintas.
 *
 * Los title, description y ogTitle/ogDescription de las seis páginas que ya
 * tenían <SEO> se han traído literales desde sus componentes: no se ha
 * reescrito ni una palabra. Los de /legal y /empleo son nuevos porque no
 * existían, y los de las cuatro páginas post-conversión solo se ven en la
 * pestaña del navegador: llevan noindex.
 */
// ─────────────────────────────────────────────────────────────────────────────
// Datos de las páginas de servicio.
//
// Las FAQ viven aquí, no en el componente, porque las consumen dos sitios: el
// JSON-LD `FAQPage` y la propia página. Si estuvieran en dos ficheros acabarían
// divergiendo, y marcar una FAQ que el usuario no ve es justo lo que penaliza
// Google. Mismo motivo para la tabla de precios.
//
// OJO: los precios también están en el JSON-LD de index.html y en
// PricingSection.jsx. Si cambia una tarifa hay que tocar los tres sitios.
// ─────────────────────────────────────────────────────────────────────────────

export const PRECIOS = [
  { modalidad: "Primera sesión sin compromiso", precio: "50 €" },
  { modalidad: "Suscripción · 1 sesión a la semana", precio: "180 €/mes" },
  { modalidad: "Suscripción · 2 sesiones a la semana", precio: "340 €/mes" },
  { modalidad: "Suscripción · 3 sesiones a la semana", precio: "500 €/mes" },
  { modalidad: "Bono de 1 sesión", precio: "50 €" },
  { modalidad: "Bono de 5 sesiones", precio: "200 €" },
  { modalidad: "Bono de 10 sesiones", precio: "350 €" },
];

export const FAQ_REFORMER = [
  {
    pregunta: "¿Necesito experiencia previa o estar en forma?",
    respuesta:
      "No. Las clases se diseñan para tu nivel. La primera sesión es precisamente una valoración para saber cuál es.",
  },
  {
    pregunta: "¿En qué se diferencia de una clase colectiva de pilates?",
    respuesta:
      "En que nadie va a un ritmo que no es el tuyo. En grupo, el ejercicio lo marca la media de la sala; en una sesión individual lo marca tu cuerpo, y la profesora corrige cada repetición en lugar de vigilar a diez personas a la vez.",
  },
  {
    pregunta: "¿Cuántas clases a la semana necesito?",
    respuesta:
      "Una clase semanal es el mínimo para sostener el trabajo. Dos permiten avanzar más rápido y repartir mejor el estímulo. Tres es para quien entrena con objetivos concretos. En la valoración te decimos cuál tiene sentido en tu caso.",
  },
  {
    pregunta: "¿Por qué se entrena descalza?",
    respuesta:
      "Porque el método tiene como eje el trabajo de la musculatura del pie, y con calzado esa musculatura no se activa. Además mejora la pisada y la sensibilidad de una zona con muchísimas terminaciones nerviosas.",
  },
  {
    pregunta: "¿El pilates me sirve como único ejercicio?",
    respuesta:
      "No podemos pedirle todo al pilates: cada cosa es para lo que es. El pilates alinea, corrige postura y libera tensiones, y eso es lo que te permite hacer después entrenamiento de fuerza con seguridad. Si solo vas a hacer una cosa a la semana, que sea la clase de pilates.",
  },
];

export const FAQ_SUELO_PELVICO = [
  {
    pregunta: "¿Hay que haber sido madre para necesitar trabajar el suelo pélvico?",
    respuesta:
      "No. Muchas de las señales tempranas —pérdidas al saltar, al correr o al reír— aparecen en mujeres que no han tenido hijos. El embarazo y el parto son un factor más, no el único.",
  },
  {
    pregunta: "¿Los ejercicios de suelo pélvico consisten en apretar?",
    respuesta:
      "No: en contener. Un suelo pélvico permanentemente apretado da tantos problemas como uno débil, porque lo sano es el equilibrio entre fuerza y relajación.",
  },
  {
    pregunta: "¿Interrumpir el pis sirve para entrenarlo?",
    respuesta:
      "No, y hacerlo a menudo puede provocarte una infección de orina por no vaciar la vejiga. Solo sirve, una vez, para identificar qué músculos tienes que activar.",
  },
  {
    pregunta: "¿Esto es lo mismo que la fisioterapia de suelo pélvico?",
    respuesta:
      "No. Damos clases individuales de pilates con máquinas: no hacemos tratamiento clínico ni valoración interna. Tampoco impartimos un trabajo específico de suelo pélvico, trabajamos el cuerpo entero. Pero nuestro método parte del centro, y en el centro está el suelo pélvico. Si vemos que tu caso no se puede abordar con nuestro método, te recomendamos una especialista: no somos personal sanitario y tenemos nuestras limitaciones.",
  },
  {
    pregunta: "¿En cuánto tiempo se nota?",
    respuesta:
      "No te lo puedo decir, no tengo una bola de cristal. Depende de ti, de tu estado, de tus circunstancias y sobre todo de lo constante que seas. Puedes tardar cuatro semanas o cuatro meses en recuperar un suelo pélvico estable. No esperes milagros con una sesión a la semana.",
  },
];

/** FAQPage a partir de la misma lista que pinta la página. */
function faqSchema(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pregunta,
      acceptedAnswer: { "@type": "Answer", text: item.respuesta },
    })),
  };
}

/** Service de una página de servicio. Los precios NO se repiten aquí: ya van en
 *  el OfferCatalog del HealthClub de index.html, que se sirve en todas las
 *  páginas. Dos juegos de Offer sobre la misma URL solo añaden riesgo de que se
 *  contradigan. */
function servicioSchema({ path, name, serviceType, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${SITE}${path}`,
    provider: { "@id": `${SITE}/#business` },
    areaServed: { "@type": "City", name: "A Coruña" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceLocation: { "@id": `${SITE}/#business` },
      serviceUrl: `${SITE}/reserva`,
    },
  };
}

export const routes = [
  {
    id: "home",
    path: "/",
    name: "Inicio",
    title: "Mobclub | Pilates máquinas en A Coruña",
    description:
      "Clases individuales de pilates con máquinas para mejorar tu cuerpo con planificación, respeto y atención personalizada. Centro premium en A Coruña.",
    ogTitle: "Si tu cuerpo está bien, tu vida funciona mejor",
    ogDescription:
      "Clases individuales de pilates con máquinas. Criterio, planificación y atención personal para cuidar tu cuerpo de verdad.",
    summary:
      "qué es Mobclub, el método, los precios, los horarios y cómo reservar la primera sesión.",
    files: ["src/pages/Home.jsx"],
    indexable: true,
    nav: true,
  },
  {
    id: "pilatesReformer",
    path: "/pilates-reformer-a-coruna",
    name: "Pilates reformer",
    title: "Pilates reformer en A Coruña, clases con máquinas | Mobclub",
    description:
      "Clases individuales de pilates reformer en A Coruña. 50 minutos, una profesora para ti y un plan a tu medida. Primera sesión sin compromiso, 50 €.",
    ogTitle: "Pilates reformer, uno a uno, en A Coruña",
    summary:
      "qué es el pilates reformer, cómo es una sesión individual, precios y horarios.",
    files: ["src/pages/PilatesReformer.jsx", "src/routes.config.js"],
    indexable: true,
    nav: true,
    schema: [
      servicioSchema({
        path: "/pilates-reformer-a-coruna",
        name: "Clases individuales de pilates reformer",
        serviceType: "Pilates reformer · pilates con máquinas",
        description:
          "Clases individuales de pilates sobre el set completo de máquinas de pilates clásico, de 50 minutos, con una profesora por alumna y un plan adaptado a cada caso.",
      }),
      faqSchema(FAQ_REFORMER),
    ],
  },
  {
    id: "pilatesSueloPelvico",
    path: "/pilates-suelo-pelvico-a-coruna",
    name: "Suelo pélvico",
    title: "Pilates para el suelo pélvico en A Coruña | Mobclub",
    description:
      "Pérdidas, sensación de peso o presión: el suelo pélvico se trabaja antes de que sea un problema. Sesiones individuales en A Coruña, con valoración previa.",
    ogTitle: "El suelo pélvico se trabaja antes de que sea un problema",
    summary:
      "señales tempranas del suelo pélvico, mitos, y cómo se trabaja en clase.",
    files: ["src/pages/PilatesSueloPelvico.jsx", "src/routes.config.js"],
    indexable: true,
    nav: true,
    schema: [
      servicioSchema({
        path: "/pilates-suelo-pelvico-a-coruna",
        name: "Pilates individual con trabajo del centro y del suelo pélvico",
        serviceType: "Pilates con máquinas · trabajo del centro y suelo pélvico",
        description:
          "Clases individuales de pilates con máquinas cuyo método parte del centro del cuerpo, donde está el suelo pélvico. No es tratamiento clínico ni fisioterapia.",
      }),
      faqSchema(FAQ_SUELO_PELVICO),
    ],
  },
  {
    id: "embarazo",
    path: "/embarazo",
    name: "Embarazo",
    title: "Ejercicio seguro durante el embarazo | Mobclub A Coruña",
    description:
      "Movimiento adaptado y pilates individual para embarazadas. Aprende qué ejercicio es seguro durante el embarazo con criterio y acompañamiento profesional.",
    ogTitle: "Ejercicio en el embarazo, sin miedo y con criterio",
    ogDescription:
      "Descubre qué movimiento es seguro durante el embarazo y cómo cuidarte en cada etapa con acompañamiento profesional.",
    summary: "qué ejercicio es seguro durante el embarazo y cómo se adapta cada sesión.",
    files: ["src/pages/Embarazo.jsx"],
    indexable: true,
    nav: true,
  },
  {
    id: "posparto",
    path: "/posparto",
    name: "Posparto",
    title: "Recuperación posparto Pilates | Mobclub A Coruña",
    description:
      "Rehabilitación posparto individual para recuperar abdomen, suelo pélvico y confianza corporal con un plan adaptado a tu cuerpo.",
    ogTitle: "Tu cuerpo no vuelve solo después de ser madre",
    ogDescription:
      "Recuperación posparto individual para volver a sentir control, seguridad y confianza en tu cuerpo, aunque hayan pasado años.",
    summary: "recuperación posparto: abdomen, suelo pélvico y vuelta al movimiento.",
    files: ["src/pages/Posparto.jsx"],
    indexable: true,
    nav: true,
  },
  {
    id: "reserva",
    path: "/reserva",
    name: "Reserva",
    title: "Reserva tu primera sesión | Mobclub A Coruña",
    description:
      "Primera sesión de valoración individual para entender tu cuerpo y decidir cómo continuar. Reserva tu cita en Mobclub, A Coruña.",
    ogTitle: "Empieza por una primera sesión",
    ogDescription:
      "No es una clase genérica. Es una valoración individual para entender tu cuerpo y empezar con criterio.",
    summary: "reserva online de la primera sesión de valoración.",
    files: ["src/pages/Reserva.jsx"],
    indexable: true,
    nav: true,
  },
  {
    id: "tallerAlimentacionMenopausia",
    path: "/talleralimentacionmenopausia",
    name: "Taller de alimentación y menopausia",
    title: "Taller Alimentación Menopausia | Mobclub A Coruña",
    description:
      "Taller presencial el domingo 17 de mayo. Aprende a adelantarte a la menopausia con nutrición, pilates adaptado y un espacio para compartir con otras mujeres.",
    ogTitle: "No puedes esquivar la menopausia, pero sí adelantarte a ella",
    ogDescription:
      "Un taller de tres horas en Mobclub para entender y afrontar la peri y menopausia con criterio. Nutrición, pilates y comunidad.",
    summary: "taller presencial de nutrición y pilates para la peri y menopausia.",
    files: ["src/pages/TallerAlimentacionMenopausia.jsx"],
    indexable: true,
    nav: true,
  },
  {
    id: "guiaTallerMenopausia",
    path: "/guiatallermenopausia",
    name: "Guía de la menopausia",
    title: "Guía Taller Menopausia | Mobclub A Coruña",
    description:
      "Entiende el cambio en tu cuerpo, no luches contra él. Guía de 21 páginas con todo lo que necesitas saber sobre la menopausia y cómo afrontarla.",
    ogTitle: "Entiende el cambio en tu cuerpo, no luches contra él",
    ogDescription:
      "Un manual de 21 páginas donde entenderás exactamente qué está pasando en tu cuerpo y qué hacer al respecto. Herramientas y soluciones reales respaldadas por profesionales.",
    summary: "guía de 21 páginas sobre la menopausia y cómo afrontarla.",
    files: ["src/pages/GuiaTallerMenopausia.jsx"],
    indexable: true,
    nav: true,
  },
  {
    id: "empleo",
    path: "/empleo",
    name: "Trabaja con nosotros",
    // Metadata nueva: la página existe desde hace meses sirviendo el title y el
    // canonical de la home, así que para Google era un duplicado de /.
    title: "Trabaja con nosotros | Mobclub A Coruña",
    description:
      "Buscamos instructoras de pilates para trabajar en Mobclub, A Coruña: jornada continua, condiciones claras y formación dentro del método de la casa.",
    summary: "ofertas de trabajo para instructoras de pilates en Mobclub.",
    files: ["src/pages/Empleo.jsx"],
    indexable: true,
    nav: true,
  },
  {
    id: "legal",
    path: "/legal",
    name: "Aviso legal",
    title: "Aviso legal y privacidad | Mobclub A Coruña",
    description:
      "Aviso legal, titularidad del sitio, política de privacidad y tratamiento de datos de Mobclub S.L. (A Coruña).",
    summary: "aviso legal, titularidad y política de privacidad.",
    files: ["src/pages/Legal.jsx"],
    indexable: true,
    nav: true,
  },
  // Páginas post-conversión: existen para quien acaba de dejar su email, no
  // para buscadores. Se prerenderizan (así son ficheros reales y no necesitan
  // el rewrite que provocaba el soft 404) pero van con noindex y fuera del
  // sitemap y de llms.txt.
  {
    id: "confirmacion",
    path: "/confirmacion",
    name: "Confirma tu suscripción",
    title: "Confirma tu suscripción | Mobclub",
    indexable: false,
    nav: true,
  },
  {
    id: "bienvenida",
    path: "/bienvenida",
    name: "Bienvenida",
    title: "Bienvenida | Mobclub",
    indexable: false,
    nav: true,
  },
  {
    id: "confirmacionTaller",
    path: "/confirmaciontaller",
    name: "Confirmación del taller",
    title: "Confirma tu plaza en el taller | Mobclub",
    indexable: false,
    nav: true,
  },
  {
    id: "confirmacionGuiaTaller",
    path: "/confirmacionguiataller",
    name: "Compra finalizada",
    title: "Compra finalizada | Mobclub",
    indexable: false,
    nav: true,
  },
  // Ruta /404 explícita. No es una URL que se anuncie: existe para que el
  // prerender emita dist/404.html, que es el fichero que Netlify sirve con
  // status 404 de verdad una vez retirado el catch-all. Sin Nav, igual que
  // hacía antes cualquier URL inexistente.
  {
    id: "notFound",
    path: "/404",
    name: "Página no encontrada",
    title: "Página no encontrada | Mobclub",
    indexable: false,
    nav: false,
  },
];

/** Rutas que van al sitemap y a llms.txt. */
export const indexableRoutes = routes.filter((route) => route.indexable);

/** Breadcrumb derivado: Inicio › esta página. La home no lleva. */
export function breadcrumbFor(route) {
  if (!route.indexable || route.path === "/") return undefined;
  const home = routes.find((r) => r.path === "/");
  return [
    { name: home.name, path: home.path },
    { name: route.name, path: route.path },
  ];
}

/** URL absoluta y canónica de una ruta. */
export function urlFor(path) {
  return path === "/" ? `${SITE}/` : `${SITE}${path}`;
}
