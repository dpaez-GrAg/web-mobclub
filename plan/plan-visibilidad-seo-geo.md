# Plan de visibilidad mobclub.es — Nivel 0 y Nivel 1

## Contexto

YAG Comunicación mandó una auditoría comercial (`ARREGLO_VISIBILIDAD/Informe-Mobclub-qui-n-gana-visibilidad-cuando-os.pdf`, 8 pág., agosto 2026): Mobclub tiene 5,0★ con 50 reseñas pero no sale en el top 10 orgánico para «centro de pilates en A Coruña», y El Centro Pilates, Omma y Sendo sí. Proponen quick wins de seguridad, páginas por servicio, `llms.txt` y SEO local.

He verificado cada afirmación técnica contra producción con `curl` y contra el repo. **El diagnóstico de fondo es correcto; el informe tiene un falso positivo grave y se le escapan cinco problemas mayores que los que enumera.**

**Y lo más importante:** este plan no inventa un método. Aplica a mobclub el mismo playbook que ya está ejecutado en `gridded.agency` (`GRIDDED AGENCY/internal/analisis-competencia/planes/`), porque ahí ya está resuelto —y verificado en producción— casi todo lo que el informe de YAG plantea. Primera versión de este plan iba por su cuenta; esta replica el estándar de la casa. Referencias:

| Pieza del estándar | Dónde está implementada |
|---|---|
| Fuente única de rutas | `V2_Gridded.Agency-web/src/routes.config.js` |
| `Seo.jsx` con props `noindex` / `breadcrumb` / `schema` | `V2_Gridded.Agency-web/src/components/Seo.jsx` |
| `sitemap.xml`, `llms.txt`, `feed.xml` generados en `prebuild` | `V2_Gridded.Agency-web/scripts/gen-*.mjs` |
| Sin catch-all, 404 real | `V2_Gridded.Agency-web/netlify.toml` (lleva el comentario explicando por qué) |
| Checklist de fundamentos | `planes/nivel-0-fundamentos-y-medicion.md` |
| Contenido por intención + plantilla de pieza | `planes/nivel-1-contenido-y-distribucion.md` §1.1, §5, §6 |
| Principios que mandan sobre todo | `planes/00-principios.md` |
| Método de medición GEO | `datos/geo-baseline-metodo.md` |

---

## 1. Veredicto del informe (verificado 11-09-2026 contra producción)

| Afirmación | Veredicto | Evidencia |
|---|---|---|
| **Carpeta `/.git/` expuesta — riesgo ALTA** | ❌ **Falso** | `curl https://mobclub.es/.git/config` → 200, pero el cuerpo son 45.684 B de `text/html` idénticos a la home. No hay repo servido: es el catch-all `/* → /index.html 200` respondiendo 200 a todo. Su escáner leyó el código y asumió exposición. |
| Cabeceras de seguridad 1/6 | ✅ Cierto | Solo `strict-transport-security`. Faltan CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. |
| Falta `llms.txt` | ✅ Cierto | `/llms.txt` → 200 con `content-type: text/html`. El fichero no existe: es el catch-all otra vez. |
| 0 páginas de servicio | ⚠️ Parcial | `/embarazo` y `/posparto` existen, prerenderizadas, con title y canonical propios. No existe página del servicio principal ni por problema. El fondo del argumento es válido. |
| 1.262 palabras · 1 H1 · meta OK · canonical/OG/sitemap correctos | ✅ Cierto (home) | 1.263 palabras, 1 H1, 11 imágenes todas con `alt`, OG y Twitter completos. |
| Datos estructurados «correcto (1)» | ⚠️ Incompleto | El `HealthClub` de `index.html` es bueno (NAP, geo, horarios, 7 ofertas con precio, ReserveAction). Es el único: ninguna página tiene `Service`, `BreadcrumbList`, `WebSite`, `Person` ni `FAQPage`. |
| Bots de IA permitidos · contenido citable | ✅ Cierto | `robots.txt: Allow: /` y contenido prerenderizado sin JS. |
| TTFB 0,03 s · 44 KB · gzip · HTTPS | ✅ Cierto | El rendimiento no es el cuello de botella. |
| Fuera del top 10 · #12 en Maps | ❓ No verificable aquí | Sin Search Console ni API de SERP. Plausible — y es precisamente lo que arregla el §N0.8. |
| «Alojamiento AMAZON / gestor a medida» | ⚠️ Impreciso | Es Netlify (`server: Netlify`, `x-nf-request-id`), CDN sobre AWS. |
| Puntuaciones 71/100, 47/100, 68/100 | — Escala propia | No auditable. Es el envoltorio comercial. |

## 2. Lo que el informe no vio

1. **`/legal` y `/empleo` se prerenderizan con el title, la description y el canonical de la home.** No montan `SEO`, así que heredan lo de `index.html`: `canonical=https://mobclub.es/`. Google las ve como copias de la home.
2. **Soft-404 masivo.** Toda ruta no prerenderizada (`/bienvenida`, `/confirmacion*`, y cualquier URL inventada) devuelve **200** con el HTML de la home y `canonical=/`. Verificado: `/ruta-que-no-existe` → 200, 45.684 B, title de la home. Es también la causa del falso positivo de `/.git/`.
3. **Redirect en cadena con canonical contradictorio.** `/embarazo` → **301** → `/embarazo/`, y ese HTML declara `canonical=…/embarazo` (sin barra). El sitemap y **todos** los `<Link>` internos usan la forma sin barra: cada rastreo paga un 301 y recibe dos señales en conflicto. Igual en `/posparto`, `/reserva`, `/legal`, `/empleo` y los dos talleres.
4. **Páginas huérfanas y footer que no es mapa del sitio.** `Footer.jsx:24` envuelve el nav en `{isHome && …}`: en las páginas internas el footer solo tiene logo, copyright y `/legal`. Y en la home, los cuatro enlaces del footer son anclas (`#precios`), no páginas. Resultado: **`/talleralimentacionmenopausia` y `/guiatallermenopausia` no reciben ni un enlace interno entrante** — Google las conoce solo si están en el sitemap (no están), y un crawler de LLM no llega nunca. Es el mismo hallazgo nº1 que en gridded, en su versión mobclub.
5. **`sitemap.xml` cubre 4 de 8 URLs indexables y no tiene `lastmod`.** Faltan `/empleo`, `/legal` y los dos talleres.
6. **No hay frase de definición de entidad extraíble** en el HTML visible («Mobclub es un centro de pilates con máquinas en A Coruña que…»), ni `Person` de la instructora, ni `alternateName`. Es lo que un LLM copia literal cuando le preguntan qué es Mobclub.
7. **Ningún H1/H2 contiene la keyword** (H1 home: «Si tu cuerpo está bien, tu vida funciona mejor») y **no hay FAQ en toda la web** — el formato que más se cita en AI Overviews y LLMs.
8. **No hay bucle de medición.** Ni Search Console, ni Bing, ni línea base GEO. Sin esto, dentro de tres meses no se sabe qué funcionó — que es justo lo que YAG vende como «informe quincenal».

## 3. Principios (adaptados de `00-principios.md`)

Mandan sobre todo lo que sigue. Cualquier página que los incumpla está mal por bien que rankee.

- **La web no puede parecer generada por IA.** Se extiende el lenguaje visual que ya existe (`src/styles/global.css`, `SectionLayout`, `--color-mob-green`, Inter). Nada de retícula de tres tarjetas, emoji en encabezados, ni copy tipo «Transforma tu cuerpo».
- **Ninguna cifra sin fuente, ningún dato inventado.** Los precios salen de `PricingSection.jsx` y del JSON-LD, que deben coincidir. Las 50 reseñas son reales: se enlaza la ficha, no se maquetan testimonios nuevos.
- **`FAQPage` solo con FAQ visible en la página.** El desajuste marcado↔contenido se penaliza.
- **Sin promesas médicas.** «Puede ayudar», nunca «cura». Aplica de lleno a la página de espalda.
- **Un solo bloque de cierre** por página, no TL;DR + resumen + conclusión.
- **Anti-cloaking:** ningún enlace visible solo para crawlers. El footer-mapa del §N0.1 es visible para todos.
- **Excepción explícita al principio 3 de gridded.** Allí se prohíben las páginas `{servicio} × {ciudad}` porque el mercado es España y es el patrón que delata contenido generado a escala. Mobclub es lo contrario: **un negocio local con una sede**, así que «en A Coruña» **sí** va en title, H1 y schema. Lo que sigue prohibido es multiplicar la misma página por barrios o municipios (Oleiros, Culleredo, Arteixo…). Una ciudad, una página por servicio.

---

# Nivel 0 — Fundamentos técnicos y medición

> **Estado a 2026-09-11.** Ejecutado en local y verificado contra el `dist/` del build.
> Falta desplegar para confirmar los puntos que dependen de Netlify (códigos 200/404,
> cabeceras, ausencia de 301). Decisiones de esta tanda: **sin tocar estética**, el copy
> solo se añade si es imprescindible, y **N0.8 (bucle de medición) queda descartado** por
> decisión de Diego.
>
> | Punto | Estado |
> |---|---|
> | N0.1 Enlaces rastreables y footer | ✅ hecho (con matiz: 3 páginas siguen sin enlace entrante, ver nota) |
> | N0.2 404 real | ✅ hecho, pendiente de confirmar contra Netlify |
> | N0.3 Fuente única de rutas | ✅ hecho (`src/routes.config.js`, 15 rutas) |
> | N0.4 `SEO` con noindex/breadcrumb/schema | ✅ hecho |
> | N0.5 Consolidación de entidad | ✅ hecho (`Person` descartado por decisión de Diego) |
> | N0.6 Cabeceras de seguridad | ✅ hecho (CSP en Report-Only), pendiente de desplegar |
> | N0.7 Sin 301 + sitemap y llms.txt generados | ✅ hecho |
> | N0.8 Bucle de medición | ❌ descartado |

No depende de tener contenido. Hasta que esto esté hecho, cualquier página nueva rinde por debajo.

### N0.1 · Footer como mapa del sitio — el mejor ratio esfuerzo/impacto

`src/components/Footer.jsx`: quitar el `{isHome && …}` y convertir el footer en mapa del sitio con `<Link>` reales a **todas** las páginas indexables (Embarazo, Posparto, Reserva, los dos talleres, Empleo, Legal), manteniendo las anclas de la home como bloque aparte. Cero cambio de aspecto más allá de las filas añadidas; respeta el nav simple (el nav **no** se toca).

Criterio: cada página indexable recibe ≥ 1 enlace interno entrante desde cualquier página del sitio; las dos de taller dejan de ser huérfanas.

**Actualización 11-09-2026.** Las dos páginas nuevas se enlazan desde el footer de todas las
páginas (15 enlaces entrantes cada una), y de paso `/embarazo` y `/posparto` pasan de 1 a 3
entrantes porque las nuevas les enlazan. `.footer-nav` pasa a `flex-wrap: wrap` para que los seis
enlaces salten de línea en vez de desbordar; en escritorio el footer queda en dos líneas.
`/empleo` y los dos talleres siguen sin enlace entrante **por decisión de Diego**: son páginas de
venta obsoletas.

**Nota sobre las huérfanas (N0.1).** Tras el cambio, el grafo de enlaces internos del
`dist/` queda así: `/` y `/legal` con 13 entrantes, `/reserva` con 12, `/embarazo` y
`/posparto` con 1 (desde la home). Siguen **sin ningún enlace interno entrante**
`/empleo`, `/talleralimentacionmenopausia` y `/guiatallermenopausia`: solo se descubren
por el `sitemap.xml`, donde ahora sí están. Darles un enlace real exige una fila más en
el footer, y eso es un cambio visible — queda a decisión de Diego.

### N0.2 · 404 real en vez de soft-404

- Quitar el catch-all `/* → /index.html 200` de `netlify.toml` y **borrar `public/_redirects`** (hoy duplica la misma regla: dos fuentes para lo mismo).
- Prerenderizar también las rutas post-conversión (`/bienvenida`, `/confirmacion`, `/confirmaciontaller`, `/confirmacionguiataller`) con `noindex`, para que existan como fichero y no necesiten rewrite.
- Generar `dist/404.html` prerenderizando una ruta inexistente (React Router ya monta `NotFound` en `path="*"`). Sin el rewrite, Netlify sirve ese fichero con status 404 automáticamente.
- **Regresión obligatoria:** las 8 rutas reales siguen devolviendo 200; el formulario sigue llegando a `/confirmacion`.

### N0.3 · Fuente única de rutas · `src/routes.config.js`

Replicar el patrón de `V2_Gridded.Agency-web/src/routes.config.js`: **datos puros, sin JSX ni imports de React**, para que lo pueda importar node directamente. Por ruta: `path`, `title`, `description`, `noindex`, `sourceFile` (para el `lastmod`) y `schema`.

Consumidores: `src/App.jsx` (monta las `<Route>` resolviendo el componente por `id`), `scripts/prerender.mjs` (hoy tiene su propia lista literal en las líneas 21-30, ya desincronizada: no incluye `/bienvenida` ni las confirmaciones), `scripts/gen-sitemap.mjs` y `scripts/gen-llms-txt.mjs`. Ninguno vuelve a tener lista propia.

Esto es lo que arregla de raíz el hallazgo 1 del §2: el title y la description de `/legal` y `/empleo` pasan a estar declarados en un sitio, no olvidados en un componente que no existe.

### N0.4 · `SEO.jsx` con `noindex`, `breadcrumb` y `schema`

Portar la API de `V2_Gridded.Agency-web/src/components/Seo.jsx` a `src/components/SEO.jsx`, que ya tiene `setMeta` y `setCanonical` reutilizables. Diferencia de implementación: gridded usa `<Head>` de vite-react-ssg; aquí se inyecta por DOM en el `useEffect` existente y lo recoge el prerender de Chromium.

- `noindex` → `<meta name="robots" content="noindex, nofollow">` y sin canonical ni OG.
- `breadcrumb` → `BreadcrumbList` en secundarias, nunca en la home.
- `schema` → acepta objeto o array; **cada JSON-LD en su propio `<script>`**, con `id` estable y **eliminando los de la ruta anterior** en cada cambio (si no, el schema se acumula al navegar en el SPA).
- `WebSite` en todas las rutas indexables, para consolidar entidad junto al `HealthClub` global.

Montar `SEO` donde falta: `Legal.jsx`, `Empleo.jsx`, `NotFound.jsx`, y las cuatro post-conversión con `noindex`.

### N0.5 · Consolidación de entidad

El `HealthClub` de `index.html` ya es bueno. Le faltan los campos que consolidan identidad y el trozo que de verdad citan los LLMs:

- `alternateName`: «Mob Club», «Mobclub Pilates».
- ~~`Person` de la instructora/propietaria con `hasCredential`~~ — **descartado el 11-09-2026 por
  decisión de Diego**: no se guía por titulaciones sino por criterio propio y calidad comprobable,
  así que marcar diplomas sería marcar algo en lo que el negocio no cree. El checklist de la skill
  lo pedía; se documenta la excepción y no se vuelve sobre ello.
- `sameAs`: añadir la ficha de Google Business Profile (hoy solo Instagram + enlace de Maps).
- **Frase de definición literal y visible en la home** — ✅ hecha el 11-09-2026, redactada por Diego:
  «Mobclub es el centro de pilates con máquinas de A Coruña que imparte únicamente sesiones
  individuales de pilates clásico.» Va como primer párrafo tras el H1 en `Hero.jsx` (sin tocar el
  H1 ni una línea del copy existente), y **la misma frase, palabra por palabra**, abre la
  `description` del `HealthClub` de `index.html` y el `llms.txt`. Tres sitios, una sola frase.
- NAP idéntico en web, schema, ficha de Google e Instagram.

### N0.6 · Cabeceras de seguridad · `netlify.toml`

5 cabeceras en enforce y **CSP en `Report-Only`** (decisión tomada: GTM, Usercentrics, Meta Pixel, Maps y el iframe de Viday pueden romperse si falta un dominio).

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    Content-Security-Policy-Report-Only = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.usercentrics.eu https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://n8n.gridded.agency https://*.usercentrics.eu https://*.google-analytics.com https://*.googletagmanager.com https://connect.facebook.net; frame-src https://www.google.com https://reservaweb.viday.es https://www.googletagmanager.com; frame-ancestors 'self'; base-uri 'self'; object-src 'none'"
```

Segundo commit, tras revisar violaciones reales en consola: pasar a `Content-Security-Policy`.

### N0.7 · Quitar el 301 de cada página + sitemap y llms.txt generados

- `scripts/prerender.mjs`: escribir `dist/<ruta>.html` en vez de `dist/<ruta>/index.html`. Netlify sirve `/embarazo` con 200 desde `embarazo.html` y redirige `/embarazo/` → `/embarazo`, que es la forma que ya usan el canonical, el sitemap y todos los `<Link>`. **Verificar en deploy preview antes de main.**
- `scripts/gen-sitemap.mjs` (nombre igual que en gridded): una `<url>` por ruta indexable de `routes.config.js`, con `lastmod` = fecha del último commit de su `sourceFile` (`git log -1 --format=%cI -- <fichero>`). Si git no está disponible (clone superficial en Netlify), **omitir `lastmod`** en lugar de poner la fecha de build en todas: una fecha falsa repetida es peor que ninguna.
- `scripts/gen-llms-txt.mjs`: qué es Mobclub, NAP, horarios, precios leídos del `HealthClub` de `index.html` (una sola fuente de cifras) y la lista de páginas desde `routes.config.js`. Solo datos verificables.
- Borrar `public/sitemap.xml` (pasa a generarse).
- `package.json`: `"prebuild": "node scripts/gen-sitemap.mjs && node scripts/gen-llms-txt.mjs"`, igual que en gridded.

Expectativa honesta sobre `llms.txt`, tal cual la fija el playbook: ningún proveedor grande ha declarado consumirlo y Google lo ha comparado con `meta keywords`. Cuesta una hora, no hace daño, y va **al final** de la lista, no al principio. Lo que sí mueve GEO es el §N0.8.

### N0.8 · Bucle de medición — ❌ DESCARTADO (2026-09-11, decisión de Diego)

> Se deja escrito porque sigue siendo cierto que sin esto no hay forma de demostrar
> la mejora, y porque es lo que YAG vende como «informe quincenal». No se ejecuta.

Esto no estaba en mi primera versión del plan y es el fallo que el propio `nivel-0` califica de más grave.

- **Google Search Console**: verificar dominio, enviar sitemap, capturar línea base de hoy aunque sea cero. Es lo que convierte «fuera del top 10» de afirmación de YAG en dato propio.
- **Bing Webmaster Tools**: igual. **No es opcional**: alimenta buena parte de la búsqueda de ChatGPT y Perplexity, así que para GEO pesa más que `llms.txt`.
- **Línea base GEO**: `ARREGLO_VISIBILIDAD/datos/geo-baseline.csv` con **15 prompts × 4 motores** (ChatGPT, Perplexity, Gemini, AI Overview), siguiendo el método de `datos/geo-baseline-metodo.md` (sesión limpia, prompt literal, una pregunta por hilo, tandas nuevas debajo sin sobrescribir). Reparto de los 15: 4 de servicio (uno por página publicada), 3 de coste y horario («cuánto cuesta el pilates con máquinas en A Coruña»), 2 de entidad («qué es Mobclub»), 3 locales («centro de pilates en A Coruña» — el prompt del informe de YAG), 3 por problema (embarazo, posparto, espalda). Cadencia **mensual**.
- Core Web Vitals una vez con PageSpeed sobre producción, dejar constancia y olvidarse (riesgo bajo: 44 KB, TTFB 0,03 s).

---

# Nivel 1 — Contenido (requiere copy de Diego)

> **Estado a 2026-09-11.** Los dos borradores están **escritos enteros**, no son esqueletos: el copy
> se ha redactado a partir de las 39 newsletters enviadas desde MailerLite (cuenta 2008748),
> tomando de ahí voz, vocabulario, metáforas y hechos. Cada fichero lleva una tabla de qué frase
> sale de qué newsletter. Falta el montaje en JSX y tres datos de negocio.
>
> | Punto | Estado |
> |---|---|
> | N1.1 Borrador página reformer | ✅ `ARREGLO_VISIBILIDAD/copy/pilates-reformer-a-coruna.md` |
> | N1.1 Borrador página suelo pélvico | ✅ `ARREGLO_VISIBILIDAD/copy/pilates-suelo-pelvico-a-coruna.md` |
> | N1.2 Montaje en `src/pages/` + rutas | ✅ hecho (11-09-2026), copy validado por Diego |
> | N1.3 H2 con keyword en la home · precios en tabla de la home | ⏳ pendiente |
>
> **N1.2 — lo que se ha construido.** `src/pages/PilatesReformer.jsx` y
> `src/pages/PilatesSueloPelvico.jsx`, con `src/pages/Servicio.css` compartido (mismas medidas
> que `.embarazo-intro`, misma escala tipográfica de `global.css`, ningún elemento visual nuevo
> salvo la tabla de precios y el listado, resueltos con el gris de línea del footer). Las dos
> rutas, sus `title`/`description`, el `Service` y el `FAQPage` viven en `routes.config.js`.
> Las FAQ y los precios son **una sola constante** (`FAQ_REFORMER`, `FAQ_SUELO_PELVICO`,
> `PRECIOS`) que alimenta a la vez el JSON-LD y lo que se ve: no pueden divergir.
> Verificado sobre `dist/`: 1 H1, 6 y 7 H2, 1.081 y 1.170 palabras, las 5 FAQ marcadas son las 5
> visibles, `HealthClub + WebSite + BreadcrumbList + Service + FAQPage` en ambas, sitemap de 10
> URLs, `llms.txt` con las dos, y 0 px de scroll horizontal a 1440 y a 390.
>
> **El `Service` no lleva `offers` a propósito:** el `OfferCatalog` del `HealthClub` de
> `index.html` ya va en todas las páginas con las 7 tarifas. Dos juegos de `Offer` sobre la misma
> URL solo añaden riesgo de contradecirse.
>
> **Decisiones tomadas el 11-09-2026:**
> - **Las máquinas son reformers.** «Pilates reformer en A Coruña» pasa a title, H1, meta
>   description y primer H2 de la página 1: es volumen de búsqueda que hoy no se captura.
> - **El dolor de espalda se queda dentro de la página de suelo pélvico**, vía la metáfora de la
>   casa (cimientos = suelo pélvico, paredes = abdomen y lumbar, tejado = diafragma). En 39
>   newsletters solo hay una mención de pasada al dolor lumbar, así que una página propia habría
>   sido inventarse un programa que no consta que exista.
> - **`/empleo` y las dos páginas de taller son páginas de venta obsoletas** (decisión de Diego).
>   No se les busca enlace interno. Quedan indexables y en el sitemap; si se confirman obsoletas,
>   lo coherente sería pasarlas a `indexable: false` en `routes.config.js`, que las saca del
>   sitemap y les pone noindex en una línea.

### N1.1 · Dos páginas redactadas

- `ARREGLO_VISIBILIDAD/copy/pilates-reformer-a-coruna.md` (~1.450 palabras)
- `ARREGLO_VISIBILIDAD/copy/pilates-suelo-pelvico-a-coruna.md` (~1.630 palabras)

Cada uno con el esqueleto de `nivel-1` §5 (**corta y densa: 1.200-1.800 palabras con dato extraíble, no 4.000 de relleno**):

```
H1  {El problema, en lenguaje de clienta}
    Respuesta directa autocontenida, 2-3 frases
H2  {Pregunta real}        → respuesta en la primera frase
H2  Cómo es una sesión     → lo que se hace de verdad, no diagrama genérico
H2  Cuánto cuesta          → tabla con las cifras de PricingSection
H2  Para quién no es       → descalificación honesta
H2  Preguntas frecuentes   → 5 preguntas + FAQPage (solo si es visible)
    Un único bloque de cierre
```

Más: `title` ≤ 60 car. con keyword al inicio, `meta description` 110-160, enlaces internos de entrada y salida, campos del `Service`, placeholders `[[…]]` marcados, y «Última actualización: {fecha}» visible + `dateModified` real.

Dos avisos escritos dentro de los briefs:

- **Canibalización.** La home ya ataca «pilates máquinas en A Coruña» desde su `<title>`. La página pilar no puede ser un clon: se enfoca en «pilates reformer en A Coruña» (qué es, cómo es una sesión, para quién, precios, FAQ) y la home conserva marca + oferta global.
- **No inventar catálogo** (principio 6). Si Mobclub no trabaja de forma diferenciada el dolor de espalda, la página describe lo que sí hace —trabajo postural y de core en máquina— sin prometer un programa que no existe. El suelo pélvico posparto se queda en `/posparto`, con enlace cruzado, para no solapar.

### N1.2 · Montaje tras el copy

`src/pages/*.jsx` + CSS colocado usando `SectionLayout`; entrada en `routes.config.js` (el prerender, el sitemap y `llms.txt` la recogen solos); `src/components/FaqSection.jsx` montado en `Home.jsx` con `FAQPage`; enlaces entrantes desde `MethodSection.jsx` y `PricingSection.jsx`. Slugs con guiones (`/pilates-reformer-a-coruna`); las rutas sin guiones que ya existen se quedan para no generar 301 inútiles.

### N1.3 · Dos ajustes menores, para tu revisión porque tocan copy

- Meter la keyword en un **H2** de la home (p. ej. el de `MethodSection`). El H1 no se toca.
- `PricingSection.jsx:87` pinta los precios en `<ul>`: pasarlos a **tabla**. Un dato en tabla se cita; el mismo dato en una lista, menos.

---

## Off-site — fuera del alcance del código

Se emite, no se ejecuta. Es donde se gana la mayor parte de lo que el informe mide:

- **Ficha de Google Business Profile**: categorías, servicios, fotos, horarios, posts, Q&A. Es lo que mueve el puesto en Maps (su #12), no la web.
- **Reseñas**: ya hay 5,0★/50. El margen está en que mencionen servicio y zona, no en tener más.
- **Citaciones NAP** coherentes en directorios locales.
- **Menciones en listas que ya rankean** («mejores centros de pilates en A Coruña»): es de donde los motores generativos copian casi literal. Mobclub no se autoevalúa ni rankea a competidores — eso es el principio 2.

---

## Decisiones técnicas tomadas

1. **Se mantiene el prerender de Chromium; no se migra a `vite-react-ssg`.** Gridded usa SSG, pero mobclub depende de `IntersectionObserver` (`useScrollReveal`, `TypewriterText`) y el prerender actual recorre la página para dejar el DOM en su estado final (`scripts/prerender.mjs:57-74`). Un SSG en node no dispara esos observers. Se alinea la arquitectura de rutas/SEO/scripts, no el motor de render. Migrar queda como opción futura, con ese caveat por delante.
2. **CSP en Report-Only primero.** Decidido contigo.
3. **No se marca `AggregateRating`** con las 50 reseñas: Google no muestra estrellas para marcado autodeclarado de `LocalBusiness` y es riesgo de acción manual. Las reseñas se aprovechan enlazando la ficha desde `llms.txt` y la home.
4. **«A Coruña» sí va en los titles** (excepción al principio 3, justificada en §3).

## Verificación — criterio de terminado, contra producción

Local, tras `npm run build`:

```bash
ls dist/*.html dist/404.html dist/sitemap.xml dist/llms.txt
for f in dist/*.html; do printf '%s | ' "$f"; grep -o '<title>[^<]*' "$f" | head -1; \
  grep -o 'rel="canonical" href="[^"]*"' "$f"; grep -o 'name="robots" content="[^"]*"' "$f"; done
```

Contra producción (branch deploy, o `npx netlify-cli deploy --build`):

1. Una URL inventada devuelve **404** y las 8 rutas reales **200**, sin `location:` intermedio.
2. `curl -sSI $U/.git/config` → **404** (muere el hallazgo estrella de YAG).
3. `curl -sSI $U/ | grep -iE 'x-frame|x-content|referrer|permissions|content-security'` → las 6.
4. `curl -sSI $U/llms.txt | grep -i content-type` → `text/plain`.
5. Cada HTML con title y canonical propios; `noindex` en las cuatro post-conversión y en 404.
6. `sitemap.xml` con las 8+ URLs indexables y `lastmod` reales (o sin `lastmod`, nunca todos iguales).
7. Cada página indexable con ≥ 1 enlace interno entrante; ninguna huérfana.
8. `WebSite` en todas las rutas, `BreadcrumbList` en secundarias; validado con el Rich Results Test.
9. Search Console y Bing verificados, sitemap enviado, línea base capturada; `geo-baseline.csv` con la tanda cero.
10. CSP sin violaciones en consola (navegando `/` → aceptar cookies → `/reserva` con el iframe de Viday → home con el mapa) antes de pasar a enforce.
11. **El aspecto de la web no ha cambiado en nada** salvo las filas nuevas del footer. Si algo se ve distinto, se ha incumplido un principio.

---

## Lo que queda abierto (actualizado 11-09-2026, tras montar N1.2)

**Resuelto en la revisión del copy que hizo Diego** — ya está dentro de las páginas:

- ~~¿En cuánto tiempo notan mejoría?~~ → «Puedes tardar cuatro semanas o cuatro meses». Es una FAQ.
- ~~¿Derivas a fisioterapeuta?~~ → sí, y está en «Para quién no es esto» y en la FAQ.
- ~~¿Valoración específica o general?~~ → general, y así lo dice el cierre de la página.
- ~~¿Qué máquinas?~~ → set completo de pilates clásico, en la página 1.

**Ya no hay nada bloqueado por datos de negocio.** El 11-09-2026 se cerraron los dos últimos:
el `Person` queda descartado a propósito, y la frase de definición ya está publicada en los tres
sitios.

**Pendiente de ejecución, sin bloqueos:**

- **Desplegar.** Nada de esto está en producción todavía: ni el Nivel 0 ni las dos páginas.
- Verificar contra producción los 11 puntos del criterio de terminado (200/404 reales, cabeceras,
  ausencia de 301, `/.git/config` → 404, `llms.txt` como `text/plain`).
- Revisar las violaciones de la CSP en producción y pasar de `Report-Only` a enforce.
- **N1.3**: la keyword ya entra en la home por la frase de definición («centro de pilates con
  máquinas de A Coruña»), en texto visible y sin tocar ningún encabezado. Queda solo pasar los
  precios de la home a tabla, que cambia el aspecto de esa sección: decisión de Diego.
- **Commitear.** Nada está commiteado.

**Decisión pendiente:** `/empleo` y los dos talleres están confirmados como páginas de venta
obsoletas. Si se quieren fuera del índice, es cambiar `indexable: false` en `routes.config.js` y
salen del sitemap y de `llms.txt` con noindex. No se ha hecho porque desindexar es una decisión de
negocio, no técnica.

**Estado del repo:** Nivel 0 y N1.2 están en el árbol de trabajo **sin commitear**. Ficheros
nuevos: `src/routes.config.js`, `src/pages/PilatesReformer.jsx`, `src/pages/PilatesSueloPelvico.jsx`,
`src/pages/Servicio.css`, `scripts/gen-sitemap.mjs`, `scripts/gen-llms-txt.mjs`, `plan/`
(con `plan/capturas/`), `ARREGLO_VISIBILIDAD/`.
