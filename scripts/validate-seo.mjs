#!/usr/bin/env node
/**
 * Validate SEO metadata across the site.
 * Run: node scripts/validate-seo.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pages, site, favicon } from "../seo/config.js";
import { absoluteUrl } from "../seo/render.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const errors = [];
const warnings = [];
const titles = new Map();
const canonicals = new Map();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function expectInHead(html, pattern, message, pageId) {
  if (!pattern.test(html)) {
    errors.push(`[${pageId}] ${message}`);
  }
}

for (const [pageId, page] of Object.entries(pages)) {
  const html = read(page.file);
  const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? html;

  if (!head.includes("<!-- ff-seo:start -->")) {
    errors.push(`[${pageId}] Missing ff-seo marker block — run apply-seo.mjs`);
    continue;
  }

  expectInHead(head, /<title>[^<]+<\/title>/, "Missing title", pageId);
  expectInHead(
    head,
    /<meta name="description" content="[^"]+">/,
    "Missing meta description",
    pageId
  );
  expectInHead(
    head,
    new RegExp(
      `<link rel="canonical" href="${absoluteUrl(page.canonicalPath).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`
    ),
    "Missing or incorrect canonical",
    pageId
  );
  expectInHead(
    head,
    new RegExp(
      `<meta name="robots" content="${(page.robots ?? site.defaultRobots).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`
    ),
    "Missing or incorrect robots meta",
    pageId
  );
  expectInHead(
    head,
    /<meta property="og:title" content="[^"]+">/,
    "Missing og:title",
    pageId
  );
  expectInHead(
    head,
    /<meta property="og:description" content="[^"]+">/,
    "Missing og:description",
    pageId
  );
  expectInHead(
    head,
    /<meta property="og:image" content="[^"]+">/,
    "Missing og:image",
    pageId
  );
  expectInHead(
    head,
    /<meta name="twitter:card" content="summary_large_image">/,
    "Missing twitter:card",
    pageId
  );
  expectInHead(
    head,
    /<meta name="twitter:title" content="[^"]+">/,
    "Missing twitter:title",
    pageId
  );
  expectInHead(
    head,
    /<meta name="twitter:image" content="[^"]+">/,
    "Missing twitter:image",
    pageId
  );

  if (page.alternates.de) {
    expectInHead(
      head,
      new RegExp(
        `<link rel="alternate" hreflang="de" href="${absoluteUrl(page.alternates.de).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`
      ),
      "Missing hreflang de",
      pageId
    );
  }
  if (page.alternates.en) {
    expectInHead(
      head,
      new RegExp(
        `<link rel="alternate" hreflang="en" href="${absoluteUrl(page.alternates.en).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`
      ),
      "Missing hreflang en",
      pageId
    );
  }
  if (page.xDefault) {
    expectInHead(
      head,
      new RegExp(
        `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(page.xDefault).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`
      ),
      "Missing hreflang x-default",
      pageId
    );
  }

  if (page.eventSchema) {
    expectInHead(
      head,
      /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"Event"/,
      "Missing Event JSON-LD",
      pageId
    );
  }

  if (!head.includes("<!-- ff-favicon:start -->")) {
    errors.push(`[${pageId}] Missing ff-favicon marker block — run apply-seo.mjs`);
  }
  expectInHead(
    head,
    new RegExp(`<link rel="icon" href="${favicon.ico.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}" sizes="any">`),
    "Missing favicon.ico link",
    pageId
  );
  expectInHead(
    head,
    new RegExp(`<link rel="apple-touch-icon" href="${favicon.apple.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`),
    "Missing apple-touch-icon link",
    pageId
  );

  const titleMatch = head.match(/<title>([^<]*)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1];
    if (titles.has(title)) {
      errors.push(
        `[${pageId}] Duplicate title "${title}" (also on ${titles.get(title)})`
      );
    } else {
      titles.set(title, pageId);
    }
  }

  const canonicalMatch = head.match(/<link rel="canonical" href="([^"]+)">/);
  if (canonicalMatch) {
    const canonical = canonicalMatch[1];
    if (canonicals.has(canonical)) {
      errors.push(
        `[${pageId}] Duplicate canonical "${canonical}" (also on ${canonicals.get(canonical)})`
      );
    } else {
      canonicals.set(canonical, pageId);
    }
  }
}

for (const [pageId, page] of Object.entries(pages)) {
  if (!page.alternates.de || !page.alternates.en) continue;
  const dePage = Object.entries(pages).find(
    ([, p]) => p.alternates?.de === page.alternates.de && p.lang === "de"
  );
  const enPage = Object.entries(pages).find(
    ([, p]) => p.alternates?.en === page.alternates.en && p.lang === "en"
  );
  if (dePage && enPage) {
    const deHtml = read(dePage[1].file);
    const enHtml = read(enPage[1].file);
    const deHref = absoluteUrl(page.alternates.en);
    const enHref = absoluteUrl(page.alternates.de);
    if (!deHtml.includes(`hreflang="en" href="${deHref}"`)) {
      warnings.push(`[${dePage[0]}] hreflang en may not match pair ${enPage[0]}`);
    }
    if (!enHtml.includes(`hreflang="de" href="${enHref}"`)) {
      warnings.push(`[${enPage[0]}] hreflang de may not match pair ${dePage[0]}`);
    }
  }
}

for (const file of ["sitemap.xml", "robots.txt", "favicon.ico", "icon.png", "apple-touch-icon.png", "site.webmanifest", "images/ff-favicon.png"]) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing ${file}`);
  }
}

if (fs.existsSync(path.join(root, "sitemap.xml"))) {
  const sitemap = read("sitemap.xml");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expectedSitemapCount = Object.values(pages).filter(
    (page) => page.sitemap !== false
  ).length;

  if (locs.length !== expectedSitemapCount) {
    errors.push(
      `Sitemap has ${locs.length} URLs, expected ${expectedSitemapCount}`
    );
  }

  for (const loc of locs) {
    if (/\/welcome\/|\/confirm\//.test(loc)) {
      errors.push(`Sitemap includes workflow URL: ${loc}`);
    }
  }

  for (const [pageId, page] of Object.entries(pages)) {
    if (page.sitemap === false) {
      const loc = absoluteUrl(page.canonicalPath);
      if (locs.includes(loc)) {
        errors.push(`[${pageId}] excluded page still in sitemap: ${loc}`);
      }
    }
  }
}

for (const [pageId, page] of Object.entries(pages)) {
  const html = read(page.file);
  const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? html;
  const robotsMatch = head.match(/<meta name="robots" content="([^"]+)">/);
  const robots = robotsMatch?.[1] ?? "";
  const expected = page.robots ?? site.defaultRobots;

  if (robots !== expected) {
    errors.push(`[${pageId}] robots is "${robots}", expected "${expected}"`);
  }

  if (robots === "noindex,follow" && page.sitemap !== false) {
    errors.push(`[${pageId}] noindex page must have sitemap: false`);
  }
}

console.log(`Validated ${Object.keys(pages).length} pages.`);

if (warnings.length) {
  console.log("\nWarnings:");
  warnings.forEach((w) => console.log(`  - ${w}`));
}

if (errors.length) {
  console.log("\nErrors:");
  errors.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
}

console.log("\nAll SEO checks passed.");
