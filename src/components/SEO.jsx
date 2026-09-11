import { useEffect } from "react";
import { SITE, urlFor } from "../routes.config";

const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function removeMeta(attr, key) {
  document.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Los JSON-LD de página se marcan con data-seo-page para poder retirarlos en el
// siguiente cambio de ruta. Sin esto el schema se acumularía al navegar por la
// SPA y una página acabaría declarando el Service de la anterior. El HealthClub
// de index.html NO lleva la marca: es global y se queda siempre.
function setPageJsonLd(objetos) {
  document.querySelectorAll("script[data-seo-page]").forEach((el) => el.remove());
  objetos.forEach((objeto, i) => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-page", String(i));
    el.textContent = JSON.stringify(objeto);
    document.head.appendChild(el);
  });
}

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  path = "/",
  noindex = false,
  breadcrumb,
  schema,
}) {
  useEffect(() => {
    const canonicalUrl = urlFor(path);

    document.title = title;
    if (description) setMeta("name", "description", description);

    if (noindex) {
      // Página que no debe indexarse (post-conversión, 404): ni canonical ni
      // señales para redes. El canonical se retira de forma explícita porque
      // index.html trae el de la home horneado y, al navegar dentro de la SPA,
      // quedaría el de la ruta anterior.
      setMeta("name", "robots", "noindex, nofollow");
      document.querySelector('link[rel="canonical"]')?.remove();
      removeMeta("property", "og:url");
      setPageJsonLd([]);
      return;
    }

    setMeta("name", "robots", "index, follow");
    setCanonical(canonicalUrl);

    setMeta("property", "og:title", ogTitle || title);
    setMeta("property", "og:description", ogDescription || description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Mobclub");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", ogTitle || title);
    setMeta("name", "twitter:description", ogDescription || description);
    setMeta("name", "twitter:image", ogImage);

    // WebSite va en todas las rutas indexables: consolida la entidad junto al
    // HealthClub global de index.html, que es quien lleva el NAP y los precios.
    const webSite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Mobclub",
      alternateName: ["Mob Club", "Mobclub Pilates"],
      url: `${SITE}/`,
      inLanguage: "es-ES",
      publisher: { "@id": `${SITE}/#business` },
    };

    const breadcrumbList = breadcrumb?.length && {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: urlFor(item.path),
      })),
    };

    const extra = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

    setPageJsonLd([webSite, ...(breadcrumbList ? [breadcrumbList] : []), ...extra]);
  }, [title, description, ogTitle, ogDescription, ogImage, path, noindex, breadcrumb, schema]);

  return null;
}
