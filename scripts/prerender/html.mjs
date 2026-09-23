// ─────────────────────────────────────────────────────────────────────────────
// html.mjs — turns the Vite-built dist/index.html shell plus one rendered route
// into a finished, indexable document.
//
// The shell arrives with a single site-wide <title> and description injected by
// the figma-site-configuration plugin in vite.config.ts. Those are stripped and
// replaced per route, because "one title for the whole site" is exactly the
// problem this build step exists to fix.
// ─────────────────────────────────────────────────────────────────────────────

const ROOT_PLACEHOLDER = '<div id="root"></div>';

/** Escape a value for use inside a double-quoted HTML attribute. */
function attr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape text content for a <title> or other element body. */
function text(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * JSON-LD sits in a <script> block, where the only sequence that can break out
 * of the element is a literal "</". Escaping "<" keeps the JSON valid (<
 * parses back to "<") while making that impossible.
 */
function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Remove the site-wide tags the shell carries so per-route ones can replace them. */
function stripSharedHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:(?:title|description|url|locale|type|site_name|image(?::\w+)?)"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:(?:card|image)"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");
}

/** The per-route <head> block, as a single indented HTML string. */
function headTags({ meta, structuredData, siteName }) {
  const tags = [
    `<title>${text(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
    `<link rel="canonical" href="${attr(meta.canonical)}" />`,
    ...meta.alternates.map(
      (alt) => `<link rel="alternate" hreflang="${attr(alt.hreflang)}" href="${attr(alt.href)}" />`,
    ),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${attr(siteName)}" />`,
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    `<meta property="og:url" content="${attr(meta.canonical)}" />`,
    `<meta property="og:locale" content="${attr(meta.ogLocale)}" />`,
    `<meta property="og:image" content="${attr(meta.ogImage.url)}" />`,
    `<meta property="og:image:width" content="${meta.ogImage.width}" />`,
    `<meta property="og:image:height" content="${meta.ogImage.height}" />`,
    `<meta property="og:image:alt" content="${attr(meta.ogImage.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${attr(meta.ogImage.url)}" />`,
    `<script type="application/ld+json">${jsonLd(structuredData)}</script>`,
  ];
  return tags.map((tag) => `    ${tag}`).join("\n");
}

/**
 * Build the final HTML for one route.
 *
 * @param shell     dist/index.html as Vite emitted it
 * @param appHtml   the route rendered by react-dom/server
 * @param meta      routeMeta() for the route
 * @param structuredData  structuredDataFor() for the route
 */
export function renderDocument({ shell, appHtml, meta, structuredData, siteName }) {
  let html = stripSharedHeadTags(shell);

  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${attr(meta.htmlLang)}"`);
  html = html.replace(/<\/head>/i, `${headTags({ meta, structuredData, siteName })}\n  </head>`);

  if (!html.includes(ROOT_PLACEHOLDER)) {
    throw new Error(
      `Could not find ${ROOT_PLACEHOLDER} in dist/index.html — the app shell changed and the prerenderer needs updating.`,
    );
  }
  html = html.replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`);

  return html;
}

/** sitemap.xml over the prerendered routes, with hreflang alternates per URL. */
export function renderSitemap(entries) {
  const urls = entries
    .map(({ loc, priority, alternates }) => {
      const links = alternates
        .filter((alt) => alt.hreflang !== "x-default")
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${attr(alt.hreflang)}" href="${attr(alt.href)}" />`)
        .join("\n");
      return [
        "  <url>",
        `    <loc>${attr(loc)}</loc>`,
        links,
        `    <changefreq>monthly</changefreq>`,
        `    <priority>${attr(priority)}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/**
 * A real 404 page: noindex, and a hand-written list of links so a visitor who
 * hits a dead URL can still get somewhere. Deliberately *not* a copy of the
 * home page — that would be a soft 404, which search engines penalise.
 */
export function render404({ shell, links, siteName }) {
  const items = links
    .map(
      ({ href, label }) =>
        `<li style="margin:0 0 12px"><a href="${attr(href)}" style="color:#5B9BF0;font-size:16px">${text(label)}</a></li>`,
    )
    .join("\n            ");

  const body = `
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#001A4A;color:#fff;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;padding:32px">
          <div style="max-width:560px">
            <p style="font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#5B9BF0;margin:0 0 16px">404</p>
            <h1 style="font-size:36px;line-height:1.2;margin:0 0 16px">Page not found / 找不到頁面</h1>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7;margin:0 0 32px">
              The page you asked for does not exist on ${text(siteName)}. Try one of these instead.
            </p>
            <ul style="list-style:none;padding:0;margin:0">
            ${items}
            </ul>
          </div>
        </div>`;

  let html = stripSharedHeadTags(shell);
  html = html.replace(/<html\s+lang="[^"]*"/i, '<html lang="en"');
  html = html.replace(
    /<\/head>/i,
    `    <title>Page not found (404) | ${text(siteName)}</title>\n` +
      `    <meta name="robots" content="noindex, follow" />\n  </head>`,
  );
  // Drop the app bundle: React would try to hydrate this markup, fail to match,
  // and client-render the home page over it — turning a real 404 into a soft one.
  html = html.replace(/<script\s+type="module"[^>]*>\s*<\/script>\s*/gi, "");
  html = html.replace(ROOT_PLACEHOLDER, `<div id="root">${body}\n      </div>`);
  return html;
}
