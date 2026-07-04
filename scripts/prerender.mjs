// Prerender del SPA: genera un HTML estático por ruta tras el `vite build`.
// Sirve `dist/` con el preview de Vite, renderiza cada ruta con Chromium
// (el mismo navegador que producción) y guarda el DOM ya pintado en
// dist/<ruta>/index.html. Así crawlers y LLMs reciben el contenido, el H1 y
// el canonical/meta por página SIN ejecutar JS. La app no se modifica.

import { preview } from "vite";
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = resolve(projectRoot, "dist");

// Rutas indexables. Se excluyen las páginas post-conversión (confirmaciones,
// bienvenida), que no deben indexarse.
const ROUTES = [
  "/",
  "/embarazo",
  "/posparto",
  "/reserva",
  "/empleo",
  "/legal",
  "/talleralimentacionmenopausia",
  "/guiatallermenopausia",
];

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

  const outPath =
    routePath === "/" ? join(distDir, "index.html") : join(distDir, routePath, "index.html");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, "utf8");
  return outPath.replace(distDir, "dist");
}

try {
  for (const routePath of ROUTES) {
    const out = await prerender(routePath);
    console.log(`  ✓ prerendered ${routePath.padEnd(30)} → ${out}`);
  }
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}

console.log(`\nPrerender completo: ${ROUTES.length} rutas.`);
process.exit(0);
