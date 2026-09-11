// Genera public/llms.txt antes de cada build (hook "prebuild" en package.json),
// junto a gen-sitemap.mjs, para que no se quede desactualizado a mano.
//
// Aviso de expectativas: ningún proveedor grande ha declarado que consuma
// llms.txt, y Google lo ha comparado públicamente con el meta keywords. Se
// mantiene porque cuesta poco y no hace daño, NO como palanca principal. Lo que
// los sistemas sí consumen es la entidad: el JSON-LD de HealthClub de
// index.html y el NAP coherente con la ficha de Google.
//
// Regla: aquí solo van datos verificables. Ninguna cifra inventada. Por eso los
// precios, la dirección, el teléfono y los horarios NO se escriben aquí: se
// leen del JSON-LD de index.html, que es la única fuente de esos datos. Si
// cambia un precio ahí, cambia en llms.txt en el siguiente build.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { indexableRoutes, urlFor } from "../src/routes.config.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
const bloque = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!bloque) {
  console.error("[gen-llms-txt] no se ha encontrado el JSON-LD en index.html. Se corta el build.");
  process.exit(1);
}
const negocio = JSON.parse(bloque[1]);

const DIAS = {
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sunday: "domingo",
};

const horarios = (negocio.openingHoursSpecification ?? [])
  .map((tramo) => {
    const dias = [].concat(tramo.dayOfWeek).map((d) => DIAS[d] ?? d);
    const rango = dias.length > 1 ? `${dias[0]} a ${dias[dias.length - 1]}` : dias[0];
    return `- ${rango}: ${tramo.opens} a ${tramo.closes}`;
  })
  .join("\n");

const ofertas = (negocio.hasOfferCatalog?.itemListElement ?? [])
  .map((oferta) => `- ${oferta.name}: ${Number(oferta.price).toLocaleString("es-ES")} €`)
  .join("\n");

const paginas = indexableRoutes
  .filter((route) => route.summary)
  .map((route) => `- [${route.name}](${urlFor(route.path)}): ${route.summary}`)
  .join("\n");

const { address: dir } = negocio;

const content = `# ${negocio.name}

> Mobclub es el centro de pilates con máquinas de ${dir.addressLocality} que imparte
> únicamente sesiones individuales de pilates clásico. Clases de unos 50 minutos, con
> entrenamiento personalizado y planificación por objetivos. No son clases colectivas.

## Datos del negocio

- Nombre: ${negocio.name} (${negocio.legalName})
- Nombres equivalentes: Mob Club, Mobclub Pilates
- Dirección: ${dir.streetAddress}, ${dir.postalCode} ${dir.addressLocality}, España
- Teléfono: ${negocio.telephone}
- Email: ${negocio.email}
- Web: ${negocio.url}
- Ámbito: ${negocio.areaServed?.name ?? dir.addressLocality}

## Horario

${horarios}

## Qué ofrece

${negocio.hasOfferCatalog?.name ?? "Clases de pilates con máquinas"}. Dos modalidades:
suscripción mensual con reserva habitual, y bonos de clases de uso flexible.
Las clases se pueden modificar hasta una hora antes del inicio.

${ofertas}

Precios en euros, IVA incluido. La primera sesión es una valoración individual
sin compromiso.

## Páginas

${paginas}

## Reseñas

Las reseñas públicas están en la ficha de Google del negocio:
${negocio.hasMap}

## Contacto y reserva

- Teléfono y WhatsApp: ${negocio.telephone}
- Email: ${negocio.email}
- Reserva online: ${negocio.potentialAction?.target?.urlTemplate ?? `${negocio.url}reserva`}
`;

mkdirSync(resolve(ROOT, "public"), { recursive: true });
writeFileSync(resolve(ROOT, "public/llms.txt"), content);
console.log(`[gen-llms-txt] public/llms.txt escrito (${ofertas.split("\n").length} ofertas, ${paginas.split("\n").length} páginas)`);
