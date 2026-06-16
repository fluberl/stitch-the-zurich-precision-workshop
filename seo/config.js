/**
 * Central SEO configuration for fuehrenundfolgen.ch
 * Lightweight, technical metadata — no scoring or keyword tooling.
 */

export const site = {
  origin: "https://fuehrenundfolgen.ch",
  siteName: "Führen & Folgen",
  defaultRobots: "index,follow",
  defaultOgType: "website",
  defaultOgImage: "/images/workshopraum.png",
  twitterCard: "summary_large_image",
};

/** Site-wide favicon assets (root-relative paths). */
export const favicon = {
  ico: "/favicon.ico",
  png512: "/images/ff-favicon.png",
  png32: "/icon.png",
  apple: "/apple-touch-icon.png",
  manifest: "/site.webmanifest",
};

export const event = {
  nameDe: "Führen & Folgen Workshop",
  nameEn: "Leading & Following Workshop",
  startDate: "2026-10-16",
  endDate: "2026-10-18",
  locationName: "Zürich",
  addressLocality: "Zürich",
  addressCountry: "CH",
  organizerName: "Führen & Folgen",
  organizerUrl: "https://fuehrenundfolgen.ch/",
};

/** @type {Record<string, import('./types.js').PageSeoConfig>} */
export const pages = {
  "home-de": {
    file: "index.html",
    lang: "de",
    title: "Führen & Folgen | Workshop Zürich",
    description:
      "Ein dreitägiger Workshop in Zürich: wie wir uns orientieren, koordinieren und mit anderen umgehen, wenn es schwieriger wird. 16.–18. Oktober 2026.",
    canonicalPath: "/",
    alternates: { de: "/", en: "/en/" },
    xDefault: "/",
    eventSchema: "de",
  },
  "home-en": {
    file: "en/index.html",
    lang: "en",
    title: "Leading & Following | Workshop Zurich",
    description:
      "A three-day workshop in Zurich exploring how we orient and act with others when conditions shift. 16–18 October 2026.",
    canonicalPath: "/en/",
    alternates: { de: "/", en: "/en/" },
    xDefault: "/",
    eventSchema: "en",
  },
  "room-de": {
    file: "raum/index.html",
    lang: "de",
    title: "Der Workshopraum | Führen & Folgen",
    description:
      "Der Raum für den Workshop Führen & Folgen in Zürich: offener Boden, natürliches Licht und eine ruhige Umgebung für Bewegung, Partnerarbeit und präzises Feedback.",
    canonicalPath: "/raum/",
    alternates: { de: "/raum/", en: "/en/room/" },
    xDefault: "/raum/",
    ogImage: "/images/workshopraum.png",
  },
  "room-en": {
    file: "en/room/index.html",
    lang: "en",
    title: "The Workshop Room | Leading & Following",
    description:
      "The room for the Leading & Following workshop in Zurich: open floor, natural light, and a calm setting for movement, partner work, and precise feedback.",
    canonicalPath: "/en/room/",
    alternates: { de: "/raum/", en: "/en/room/" },
    xDefault: "/raum/",
    ogImage: "/images/workshopraum.png",
  },
  "details-de": {
    file: "details/index.html",
    lang: "de",
    title: "Praktische Details | Führen & Folgen",
    description:
      "Praktische Informationen zum dreitägigen Workshop Führen & Folgen in Zürich.",
    canonicalPath: "/#details",
    alternates: { de: "/#details", en: "/en/#details" },
    xDefault: "/#details",
  },
  "details-en": {
    file: "en/details/index.html",
    lang: "en",
    title: "Practical Details | Leading & Following",
    description:
      "Practical information for the three-day Leading & Following workshop in Zurich.",
    canonicalPath: "/en/#details",
    alternates: { de: "/#details", en: "/en/#details" },
    xDefault: "/#details",
  },
  "application-de": {
    file: "application/index.html",
    lang: "de",
    title: "Teilnahmeanfrage | Führen & Folgen",
    description:
      "Bewirb dich für den Workshop Führen & Folgen in Zürich. 16.–18. Oktober 2026.",
    canonicalPath: "/application/",
    alternates: { de: "/application/", en: "/en/application/" },
    xDefault: "/application/",
  },
  "application-en": {
    file: "en/application/index.html",
    lang: "en",
    title: "Application | Leading & Following",
    description:
      "Apply for the Leading & Following workshop in Zurich. 16–18 October 2026.",
    canonicalPath: "/en/application/",
    alternates: { de: "/application/", en: "/en/application/" },
    xDefault: "/application/",
  },
  "info-de": {
    file: "info/index.html",
    lang: "de",
    title: "Workshop-Informationen | Führen & Folgen",
    description:
      "Fordere Informationen zum Workshop Führen & Folgen in Zürich an.",
    canonicalPath: "/info/",
    alternates: { de: "/info/", en: "/en/info/" },
    xDefault: "/info/",
  },
  "info-en": {
    file: "en/info/index.html",
    lang: "en",
    title: "Workshop Information | Leading & Following",
    description:
      "Request information about the Leading & Following workshop in Zurich.",
    canonicalPath: "/en/info/",
    alternates: { de: "/info/", en: "/en/info/" },
    xDefault: "/info/",
  },
  "contact-de": {
    file: "contact/index.html",
    lang: "de",
    title: "Kontakt | Führen & Folgen",
    description:
      "Nimm Kontakt zum Team von Führen & Folgen auf — Fragen zur Teilnahme am Workshop in Zürich.",
    canonicalPath: "/contact/",
    alternates: { de: "/contact/", en: "/en/contact/" },
    xDefault: "/contact/",
  },
  "contact-en": {
    file: "en/contact/index.html",
    lang: "en",
    title: "Contact | Leading & Following",
    description:
      "Contact the Leading & Following team with questions about the workshop in Zurich.",
    canonicalPath: "/en/contact/",
    alternates: { de: "/contact/", en: "/en/contact/" },
    xDefault: "/contact/",
  },
  "welcome-de": {
    file: "welcome/index.html",
    lang: "de",
    title: "Deine Teilnahme ist bestätigt | Führen & Folgen",
    description:
      "Deine Teilnahme am Workshop Führen & Folgen in Zürich ist bestätigt. 16.–18. Oktober 2026.",
    canonicalPath: "/welcome/",
    alternates: { de: "/welcome/" },
    xDefault: "/welcome/",
    robots: "noindex,follow",
    sitemap: false,
  },
  "confirm-de": {
    file: "confirm/index.html",
    lang: "de",
    title: "Bewerbung angenommen | Führen & Folgen",
    description:
      "Deine Bewerbung für den Workshop Führen & Folgen wurde angenommen. Sichere deinen Platz für den 16.–18. Oktober 2026 in Zürich.",
    canonicalPath: "/confirm/",
    alternates: { de: "/confirm/" },
    xDefault: "/confirm/",
    robots: "noindex,follow",
    sitemap: false,
  },
  "impressum-de": {
    file: "impressum/index.html",
    lang: "de",
    title: "Impressum | Führen & Folgen",
    description:
      "Impressum und verantwortliche Personen für Führen & Folgen, Workshop Zürich.",
    canonicalPath: "/impressum/",
    alternates: { de: "/impressum/", en: "/en/legal-notice/" },
    xDefault: "/impressum/",
  },
  "legal-notice-en": {
    file: "en/legal-notice/index.html",
    lang: "en",
    title: "Legal Notice | Leading & Following",
    description:
      "Legal notice and responsible persons for Leading & Following, Zurich workshop.",
    canonicalPath: "/en/legal-notice/",
    alternates: { de: "/impressum/", en: "/en/legal-notice/" },
    xDefault: "/impressum/",
  },
  "privacy-de": {
    file: "datenschutz/index.html",
    lang: "de",
    title: "Datenschutz | Führen & Folgen",
    description:
      "Datenschutzerklärung für die Website und den Workshop Führen & Folgen.",
    canonicalPath: "/datenschutz/",
    alternates: { de: "/datenschutz/", en: "/en/privacy-policy/" },
    xDefault: "/datenschutz/",
  },
  "privacy-en": {
    file: "en/privacy-policy/index.html",
    lang: "en",
    title: "Privacy Policy | Leading & Following",
    description:
      "Privacy policy for the Leading & Following website and workshop.",
    canonicalPath: "/en/privacy-policy/",
    alternates: { de: "/datenschutz/", en: "/en/privacy-policy/" },
    xDefault: "/datenschutz/",
  },
  "terms-de": {
    file: "agb/index.html",
    lang: "de",
    title: "Allgemeine Geschäftsbedingungen | Führen & Folgen",
    description:
      "Allgemeine Geschäftsbedingungen für den Workshop Führen & Folgen.",
    canonicalPath: "/agb/",
    alternates: { de: "/agb/", en: "/en/terms/" },
    xDefault: "/agb/",
  },
  "terms-en": {
    file: "en/terms/index.html",
    lang: "en",
    title: "Terms & Conditions | Leading & Following",
    description:
      "Terms and conditions for the Leading & Following workshop.",
    canonicalPath: "/en/terms/",
    alternates: { de: "/agb/", en: "/en/terms/" },
    xDefault: "/agb/",
  },
};
