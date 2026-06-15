import { event, site } from "./config.js";

/** @param {string} value */
function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** @param {string} path */
function absoluteUrl(path) {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.origin}${normalized}`;
}

/** @param {import('./types.js').PageSeoConfig} page */
function resolveOgImage(page) {
  const imagePath = page.ogImage ?? site.defaultOgImage;
  return absoluteUrl(imagePath);
}

/** @param {'de'|'en'} locale */
function buildEventSchema(locale) {
  const name = locale === "de" ? event.nameDe : event.nameEn;
  const description =
    locale === "de"
      ? pagesDescriptionDe()
      : pagesDescriptionEn();

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.addressLocality,
        addressCountry: event.addressCountry,
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.organizerName,
      url: event.organizerUrl,
    },
  };
}

function pagesDescriptionDe() {
  return "Ein dreitägiger Workshop in Zürich: wie wir uns orientieren, koordinieren und mit anderen umgehen, wenn es schwieriger wird.";
}

function pagesDescriptionEn() {
  return "A three-day workshop in Zurich exploring how we orient and act with others when conditions shift.";
}

/** @param {import('./types.js').PageSeoConfig} page */
export function renderSeoHead(page) {
  const canonical = absoluteUrl(page.canonicalPath);
  const ogTitle = page.ogTitle ?? page.title;
  const ogDescription = page.ogDescription ?? page.description;
  const ogImage = resolveOgImage(page);
  const robots = page.robots ?? site.defaultRobots;

  const lines = [
    "<!-- ff-seo:start -->",
    `<title>${escapeAttr(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}">`,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    `<meta name="robots" content="${escapeAttr(robots)}">`,
  ];

  if (page.alternates.de) {
    lines.push(
      `<link rel="alternate" hreflang="de" href="${escapeAttr(absoluteUrl(page.alternates.de))}">`
    );
  }
  if (page.alternates.en) {
    lines.push(
      `<link rel="alternate" hreflang="en" href="${escapeAttr(absoluteUrl(page.alternates.en))}">`
    );
  }
  if (page.xDefault) {
    lines.push(
      `<link rel="alternate" hreflang="x-default" href="${escapeAttr(absoluteUrl(page.xDefault))}">`
    );
  }

  lines.push(
    `<meta property="og:type" content="${escapeAttr(site.defaultOgType)}">`,
    `<meta property="og:site_name" content="${escapeAttr(site.siteName)}">`,
    `<meta property="og:title" content="${escapeAttr(ogTitle)}">`,
    `<meta property="og:description" content="${escapeAttr(ogDescription)}">`,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    `<meta property="og:image" content="${escapeAttr(ogImage)}">`,
    `<meta property="og:locale" content="${page.lang === "de" ? "de_CH" : "en_US"}">`,
    `<meta name="twitter:card" content="${escapeAttr(site.twitterCard)}">`,
    `<meta name="twitter:title" content="${escapeAttr(ogTitle)}">`,
    `<meta name="twitter:description" content="${escapeAttr(ogDescription)}">`,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}">`
  );

  if (page.eventSchema) {
    const schema = buildEventSchema(page.eventSchema);
    lines.push(
      `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    );
  }

  lines.push("<!-- ff-seo:end -->");
  return lines.join("\n");
}

/** @param {import('./types.js').PageSeoConfig} page */
export function sitemapEntry(page) {
  return {
    loc: absoluteUrl(page.canonicalPath),
    file: page.file,
  };
}

export { absoluteUrl };
