// Prerender del SPA: genera un HTML estático por ruta tras el `vite build`.
// Sirve `dist/` con el preview de Vite, renderiza cada ruta con Chromium
// (el mismo navegador que producción) y guarda el DOM ya pintado. Así crawlers
// y LLMs reciben el contenido, el H1 y el canonical/meta por página SIN
// ejecutar JS. La app no se modifica.
//
// Dos cosas que antes no hacía:
//
//   1. Las rutas salen de src/routes.config.js, no de una lista propia. La
//      suya se había quedado corta (sin /bienvenida ni las confirmaciones), y
//      esas rutas no existían como fichero: Netlify las servía con el HTML de
//      la home por el rewrite catch-all. Un soft 404 con el canonical de la
//      home.
//   2. Escribe dist/<ruta>.html en vez de dist/<ruta>/index.html. Con la
//      carpeta, Netlify respondía 301 de /embarazo a /embarazo/ mientras el
//      canonical, el sitemap y todos los <Link> internos usaban la forma sin
//      barra: cada rastreo pagaba un redirect y recibía dos señales en
//      conflicto. Con el fichero plano, /embarazo responde 200 directo.

import { preview } from "vite";
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { routes } from "../src/routes.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = resolve(projectRoot, "dist");

// La home va ÚLTIMA a propósito. El preview sirve dist/index.html como fallback
// de cualquier ruta, así que si se prerenderizara primero, las demás se
// renderizarían encima del DOM ya horneado de la home en vez de sobre el shell
// limpio del build. Es lo que venía pasando: /legal y /empleo se quedaban con
// el title, la description y el canonical de la home.
const ROUTES = [
  ...routes.filter((route) => route.path !== "/").map((route) => route.path),
  "/",
];

if (ROUTES.length < 2) {
  console.error("prerender: routes.config.js no ha devuelto rutas. Se corta el build.");
  process.exit(1);
}

const PORT = 4188;

const server = await preview({
  root: projectRoot,
  preview: { port: PORT, strictPort: true },
});
const base = `http://localhost:${PORT}`;

const browser = await chromium.launch();
const page = await browser.newPage();

// Bloquea todo lo que no sea first-party (GTM, Usercentrics, Meta Pixel, fuentes,
// Google Maps, Viday...). El prerender queda determinista y rápido, y no hornea
// ruido de terceros en el HTML. El bundle y los assets se sirven desde localhost.
await page.route("**/*", (route) => {
  const host = new URL(route.request().url()).hostname;
  return host === "localhost" || host === "127.0.0.1" ? route.continue() : route.abort();
});

async function prerender(routePath) {
  await page.goto(base + routePath, { waitUntil: "domcontentloaded" });
  // Espera a que React monte el árbol.
  await page.waitForSelector("#root > *", { timeout: 15000 });

  // Recorre la página para disparar los IntersectionObserver (scroll-reveal y
  // typewriters con triggerOnScroll) y dejar el DOM en su estado final.
  await page.evaluate(
    () =>
      new Promise((done) => {
        let y = 0;
        const tick = () => {
          window.scrollTo(0, y);
          y += Math.round(window.innerHeight * 0.9);
          if (y < document.body.scrollHeight) setTimeout(tick, 40);
          else {
            window.scrollTo(0, 0);
            setTimeout(done, 250);
          }
        };
        tick();
      })
  );
  await page.waitForTimeout(300);

  let html = await page.content();
  if (!/^<!doctype/i.test(html)) html = "<!doctype html>\n" + html;

  // "/" → dist/index.html. "/embarazo" → dist/embarazo.html (URL sin barra
  // final, servida con 200 y sin redirect). "/404" → dist/404.html, que es el
  // fichero que Netlify usa como página de error una vez retirado el catch-all.
  const outPath = routePath === "/" ? join(distDir, "index.html") : join(distDir, `${routePath}.html`);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, "utf8");
  return outPath.replace(distDir, "dist");
}

try {
  for (const routePath of ROUTES) {
    const out = await prerender(routePath);
    const { size } = await stat(join(projectRoot, out));
    console.log(`  ✓ ${routePath.padEnd(32)} → ${out.padEnd(40)} ${(size / 1024).toFixed(1)} KB`);
  }
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}

console.log(`\nPrerender completo: ${ROUTES.length} rutas.`);
process.exit(0);
