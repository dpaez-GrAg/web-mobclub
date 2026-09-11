// Genera public/sitemap.xml antes de cada build (hook "prebuild" en package.json).
// El <lastmod> de cada URL se toma de la última fecha de commit que tocó los
// ficheros de esa ruta (fecha real, no todas iguales). Si git no está disponible
// (o el clon es superficial y no hay historial), cae a la fecha de build.
//
// Las rutas NO se listan aquí: salen de src/routes.config.js, la misma fuente
// que usa la app. El sitemap anterior estaba escrito a mano en public/ y se
// había quedado con 4 de las 8 URLs indexables, sin lastmod.
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { indexableRoutes, urlFor } from "../src/routes.config.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

function lastmodFor(files = []) {
  if (!files.length) return today;
  try {
    const out = execSync(`git log -1 --format=%cs -- ${files.map((f) => `"${f}"`).join(" ")}`, {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : today;
  } catch {
    return today;
  }
}

const urls = indexableRoutes
  .map(({ path, files }) => `  <url>\n    <loc>${urlFor(path)}</loc>\n    <lastmod>${lastmodFor(files)}</lastmod>\n  </url>`)
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

mkdirSync(resolve(ROOT, "public"), { recursive: true });
writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml);
console.log(`[gen-sitemap] public/sitemap.xml escrito con ${indexableRoutes.length} URLs`);
