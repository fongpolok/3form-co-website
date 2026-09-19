#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// scripts/prerender/index.mjs — static site generation for 3formhk.com.
//
// Runs as the last stage of `pnpm build`, after the client build (dist/) and
// the SSR build (.ssr-build/). For every route in src/routes.ts it renders the
// React tree to HTML and writes dist/<path>/index.html, so the page a crawler
// (or a visitor with JS blocked) receives already contains the title, meta
// description, H1 and body text. Also emits sitemap.xml, a Sitemap line in
// robots.txt, and a real 404 page.
//
//   node scripts/prerender/index.mjs                  # normal
//   PRERENDER_VERBOSE=1 node scripts/prerender/index.mjs   # one line per file
// ─────────────────────────────────────────────────────────────────────────────

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { log, step } from "./logger.mjs";
import { render404, renderDocument, renderSitemap } from "./html.mjs";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const SSR_ENTRY = path.join(PROJECT_ROOT, ".ssr-build", "entry-server.js");
const SHELL_PATH = path.join(DIST_DIR, "index.html");

/** dist-relative file path for a route: "/" → index.html, "/tc/contact/" → tc/contact/index.html */
function outputPathFor(routePathname) {
  const trimmed = routePathname.replace(/^\/|\/$/g, "");
  return trimmed ? path.join(DIST_DIR, trimmed, "index.html") : path.join(DIST_DIR, "index.html");
}

async function writeFileEnsuringDir(filePath, contents) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, contents, "utf8");
}

/** Append a Sitemap: line to the built robots.txt if it isn't already there. */
async function updateRobotsTxt(sitemapUrl) {
  const robotsPath = path.join(DIST_DIR, "robots.txt");
  let robots;
  try {
    robots = await readFile(robotsPath, "utf8");
  } catch {
    log.warn("no dist/robots.txt found — writing a permissive one");
    robots = "User-agent: *\nAllow: /\n";
  }

  if (robots.includes("Sitemap:")) {
    log.debug("robots.txt already advertises a sitemap — leaving it alone");
    return;
  }

  const updated = `${robots.trimEnd()}\n\nSitemap: ${sitemapUrl}\n`;
  await writeFile(robotsPath, updated, "utf8");
  log.debug(`robots.txt → Sitemap: ${sitemapUrl}`);
}

async function main() {
  const shell = await readFile(SHELL_PATH, "utf8").catch(() => {
    throw new Error(`Missing ${SHELL_PATH}. Run \`vite build\` before the prerender step.`);
  });

  const server = await import(pathToFileURL(SSR_ENTRY).href).catch((err) => {
    throw new Error(
      `Could not load the SSR bundle at ${SSR_ENTRY} (${err.message}). ` +
        "Run `vite build --ssr src/entry-server.tsx --outDir .ssr-build` first.",
    );
  });

  const {
    ALL_ROUTES,
    renderRoute,
    routeMeta,
    routePath,
    routeUrl,
    sitemapPriority,
    structuredDataFor,
    SITE_ORIGIN,
  } = server;

  const siteName = "3form Engineering Co";
  const sitemapEntries = [];

  await step(`Prerendering ${ALL_ROUTES.length} routes`, async () => {
    for (const route of ALL_ROUTES) {
      const pathname = routePath(route);
      const meta = routeMeta(route);

      let appHtml;
      try {
        appHtml = renderRoute(route);
      } catch (err) {
        log.error(`failed to render ${pathname}`);
        throw err;
      }

      const html = renderDocument({
        shell,
        appHtml,
        meta,
        structuredData: structuredDataFor(route),
        siteName,
      });

      const outputPath = outputPathFor(pathname);
      await writeFileEnsuringDir(outputPath, html);

      sitemapEntries.push({
        loc: routeUrl(route),
        priority: sitemapPriority(route),
        alternates: meta.alternates,
      });

      log.debug(
        `${pathname} → ${path.relative(PROJECT_ROOT, outputPath)} ` +
          `(${(html.length / 1024).toFixed(1)} kB, "${meta.title}")`,
      );
    }
  });

  await step("Writing sitemap.xml", async () => {
    await writeFileEnsuringDir(path.join(DIST_DIR, "sitemap.xml"), renderSitemap(sitemapEntries));
  });

  await step("Updating robots.txt", () => updateRobotsTxt(`${SITE_ORIGIN}/sitemap.xml`));

  await step("Writing 404.html", async () => {
    // Hand-picked, not derived from ALL_ROUTES: a dead-end page wants a handful
    // of obvious destinations, not all 30 URLs on the site.
    const links = [
      { href: "/", label: "Home / 主頁" },
      { href: "/services/", label: "Services / 服務" },
      { href: "/services/facility-maintenance/", label: "Facility maintenance / 場地保養" },
      { href: "/projects/", label: "Projects / 項目" },
      { href: "/contact/", label: "Contact / 聯絡我們" },
    ];
    await writeFileEnsuringDir(path.join(DIST_DIR, "404.html"), render404({ shell, links, siteName }));
  });

  log.info(`Done. ${sitemapEntries.length} pages now ship real HTML.`);
}

main().catch((err) => {
  log.error(err.message);
  if (process.env.PRERENDER_VERBOSE === "1") console.error(err);
  process.exit(1);
});
