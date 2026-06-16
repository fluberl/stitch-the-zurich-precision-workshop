#!/usr/bin/env node
/**
 * Apply centralized SEO metadata to HTML pages.
 * Run: node scripts/apply-seo.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pages, site } from "../seo/config.js";
import { absoluteUrl, renderFaviconHead, renderSeoHead } from "../seo/render.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SEO_START = "<!-- ff-seo:start -->";
const SEO_END = "<!-- ff-seo:end -->";
const FAVICON_START = "<!-- ff-favicon:start -->";
const FAVICON_END = "<!-- ff-favicon:end -->";

/** Strip legacy and generated SEO tags from head */
function stripSeoBlock(html) {
  let next = html;

  if (next.includes(SEO_START) && next.includes(SEO_END)) {
    const start = next.indexOf(SEO_START);
    const end = next.indexOf(SEO_END) + SEO_END.length;
    next = next.slice(0, start) + next.slice(end);
  }

  const patterns = [
    /<title>[\s\S]*?<\/title>\s*/gi,
    /<meta\s+(?:name="description"[^>]*|content="[^"]*"[^>]*name="description"[^>]*)\/?>\s*/gi,
    /<link\s+(?:rel="canonical"[^>]*|href="[^"]*"[^>]*rel="canonical"[^>]*)\/?>\s*/gi,
    /<meta\s+name="robots"[^>]*\/?>\s*/gi,
    /<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*\/?>\s*/gi,
    /<meta\s+(?:property="og:[^"]*"[^>]*|content="[^"]*"[^>]*property="og:[^"]*"[^>]*)\/?>\s*/gi,
    /<meta\s+(?:name="twitter:[^"]*"[^>]*|content="[^"]*"[^>]*name="twitter:[^"]*"[^>]*)\/?>\s*/gi,
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
  ];

  for (const pattern of patterns) {
    next = next.replace(pattern, "");
  }

  return next;
}

/** Strip generated and legacy favicon tags from head */
function stripFaviconBlock(html) {
  let next = html;

  if (next.includes(FAVICON_START) && next.includes(FAVICON_END)) {
    const start = next.indexOf(FAVICON_START);
    const end = next.indexOf(FAVICON_END) + FAVICON_END.length;
    next = next.slice(0, start) + next.slice(end);
  }

  next = next.replace(
    /<link\s+rel="(?:icon|apple-touch-icon|manifest)"[^>]*\/?>\s*/gi,
    ""
  );

  return next;
}

function insertSeoBlock(html, block) {
  const viewport =
    /<meta\s+content="width=device-width, initial-scale=1\.0"\s+name="viewport"\s*\/>/i;
  const match = html.match(viewport);
  if (!match || match.index === undefined) {
    throw new Error("viewport meta tag not found");
  }
  const insertAt = match.index + match[0].length;
  return `${html.slice(0, insertAt)}\n${block}\n${html.slice(insertAt)}`;
}

function sitemapLoc(page) {
  if (page.canonicalPath.includes("#")) {
    const dir = path.dirname(page.file);
    const segment = dir === "." ? "" : `/${dir}`;
    return absoluteUrl(`${segment}/`);
  }
  return absoluteUrl(page.canonicalPath);
}

function generateSitemap(pageList) {
  const urls = pageList
    .filter((page) => page.sitemap !== false)
    .map((page) => sitemapLoc(page))
    .sort((a, b) => a.localeCompare(b));

  const body = urls
    .map(
      (loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function generateRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`;
}

let updated = 0;

for (const page of Object.values(pages)) {
  const filePath = path.join(root, page.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skip missing file: ${page.file}`);
    continue;
  }

  const original = fs.readFileSync(filePath, "utf8");
  const stripped = stripFaviconBlock(stripSeoBlock(original));
  const block = `${renderSeoHead(page)}\n${renderFaviconHead()}`;
  const next = insertSeoBlock(stripped, block);

  if (next !== original) {
    fs.writeFileSync(filePath, next);
    updated += 1;
    console.log(`Updated ${page.file}`);
  }
}

const sitemap = generateSitemap(Object.values(pages));
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
console.log("Wrote sitemap.xml");

const robots = generateRobots();
fs.writeFileSync(path.join(root, "robots.txt"), robots);
console.log("Wrote robots.txt");

console.log(`Done. ${updated} HTML file(s) updated.`);
