import { useEffect } from "react";

const SITE_URL = "https://mobclub.es";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
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

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  path = "/",
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = title;

    setMeta("name", "description", description);
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

    return () => {};
  }, [title, description, ogTitle, ogDescription, ogImage, path]);

  return null;
}
