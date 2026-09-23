# SEO: real HTML for every page (static prerender)

## The problem this fixes

The site routed on the URL **hash** (`#services`, `#contact`, `#projects/3`). A
fragment is never sent to the server, so every crawler — Google, Bing, LinkedIn's
link preview, an AI crawler — requested exactly one URL, `https://3formhk.com/`,
and got back:

```html
<title>3form Co — Engineering & Management Consulting</title>
<div id="root"></div>
```

One title and one description for the entire site, no H1, no body copy, and no
separate URL that Facility Maintenance or Contact could ever rank on.

Two things changed:

1. **Routing moved from the hash to real paths.** `#services` → `/services/`.
2. **The build prerenders each path to a static HTML file** containing the real
   title, meta description, H1 and body text. React then hydrates that markup
   in the browser, so the site still behaves as a single-page app.

## Routes

English is served at the root; Traditional Chinese (`zh-HK`) under `/tc/`. Each
one is a real file in `dist/`, so it works on GitHub Pages with no redirect
rules or server config.

| URL | zh-HK | File | Priority |
| --- | --- | --- | --- |
| `/` | `/tc/` | `dist/index.html` | 1.0 |
| `/services/` | `/tc/services/` | `dist/services/index.html` | 0.9 |
| **`/services/facility-maintenance/`** | **`/tc/services/facility-maintenance/`** | `dist/services/facility-maintenance/index.html` | 0.9 |
| **`/services/funding-consulting/`** | **`/tc/services/funding-consulting/`** | `dist/services/funding-consulting/index.html` | 0.9 |
| **`/contact/`** | **`/tc/contact/`** | `dist/contact/index.html` | 0.9 |
| `/about/` | `/tc/about/` | `dist/about/index.html` | 0.7 |
| `/projects/` | `/tc/projects/` | `dist/projects/index.html` | 0.7 |
| `/projects/1/` … `/projects/8/` | `/tc/projects/<id>/` | `dist/projects/<id>/index.html` | 0.5 |
| `/demos/` | `/tc/demos/` | `dist/demos/index.html` | 0.7 |

**32 pages** in total, plus `sitemap.xml`, a `Sitemap:` line in `robots.txt`,
and a genuine `404.html` (noindex, no app bundle — so it can't turn into a soft
404 by silently client-rendering the home page).

Old hash links still work: `App.tsx` rewrites `#services`, `#contact`,
`#facility-maintenance` and `#projects/<id>` to their new paths on load, so
existing bookmarks and third-party links land on the right page.

## Facility maintenance now has its own page

It was a block partway down the Services page, with an `<h3>` — not something
that could rank for "facility maintenance Hong Kong" or 場地保養. It now also has
a standalone URL with its own `<title>`, `<h1>`, meta description and
`schema.org/Service` markup listing all four categories.

Nothing was duplicated: the page reads the same
`src/facilityMaintenance/content.json` as the Services-page block, and passes
`omitIntro` so the heading isn't printed twice. Editing `content.json` still
changes both places, and setting `"enabled": false` still removes the block,
the landing page link, and the home-page card together.

## Files changed

| Path | What it does |
| --- | --- |
| `src/routes.ts` | **New.** The route table: path ↔ page ↔ language, per-page titles and descriptions (EN + zh-HK), canonicals, hreflang, and `ALL_ROUTES` — the list of pages the build writes. Add a page here. |
| `src/structuredData.ts` | **New.** JSON-LD (`Organization`, `Service`, `ContactPage`, `BreadcrumbList`) built from the same translations the page renders, so the markup can't drift from the visible text. |
| `src/entry-server.tsx` | **New.** SSR entry. Renders one route to an HTML string; also the only bridge between the TypeScript app and the plain-JS build script. |
| `scripts/prerender/index.mjs` | **New.** Renders every route, writes `dist/**/index.html`, `sitemap.xml`, `robots.txt`, `404.html`. |
| `scripts/prerender/html.mjs` | **New.** Head-tag assembly, sitemap XML, the 404 page. |
| `scripts/prerender/logger.mjs` | **New.** `[3form][prerender]` logger, matching the app's runtime logging style. |
| `src/main.tsx` | Hydrates the prerendered markup instead of discarding it. Falls back to a plain client render under `vite dev`, where `#root` is empty. |
| `src/App.tsx` | Path routing (`pushState` / `popstate`) instead of hash routing; new `RouteLink` component; new `FacilityMaintenancePage`; per-page `<h1>`s; head tags kept in sync on client-side navigation. |
| `src/facilityMaintenance/FacilityMaintenanceBlock.tsx` | New `omitIntro` and `secondaryAction` props; heading levels adapt to where the block sits. |
| `package.json` | `build` is now three logged stages: `build:client` → `build:ssr` → `build:prerender`. |
| `.gitignore` | Ignores `.ssr-build/`, the intermediate SSR bundle. |

### Nav links are real `<a href>` now

Buttons with `onClick` handlers are invisible to a crawler — it has no link to
follow. Every internal navigation (nav bar, logo, home cards, project cards,
hero CTAs, Services CTA, language switch) is a `RouteLink`: a real anchor with a
real `href` that intercepts plain left-clicks for client-side navigation and
leaves ⌘-click / middle-click to the browser. That is what connects the 30
prerendered pages into a crawlable graph rather than 30 orphans.

## Verify locally

```bash
pnpm install
pnpm run build            # add PRERENDER_VERBOSE=1 to log every file written
npx vite preview --port 4599
```

Then **view source** (not DevTools' Elements panel, which shows the hydrated
DOM) on:

- <http://localhost:4599/services/facility-maintenance/>
- <http://localhost:4599/contact/>
- <http://localhost:4599/tc/services/facility-maintenance/>

You should see, in the raw HTML before any JavaScript runs: a page-specific
`<title>`, `<meta name="description">`, `<link rel="canonical">`, `hreflang`
alternates, a JSON-LD block, and the full rendered page inside
`<div id="root">` — including the `<h1>`.

From the command line:

```bash
# Title, description and H1 straight out of the file
grep -o '<title>[^<]*' dist/services/facility-maintenance/index.html
grep -o '<meta name="description"[^>]*' dist/contact/index.html
grep -o '<h1[^>]*>[^<]*' dist/services/facility-maintenance/index.html

# Every page that got built
find dist -name index.html | sort
```

What was checked on this branch, in headless Chrome against the built output:

- No React hydration errors on `/`, `/contact/`,
  `/services/facility-maintenance/` or the zh-HK equivalent — the prerendered
  HTML is kept, not thrown away and re-rendered.
- Every page has exactly one `<h1>` and no skipped heading levels.
- `/#services`, `/#contact`, `/#facility-maintenance` and `/#projects/3`
  redirect to their new paths.
- Clicking an internal link navigates without a reload and updates the
  `<title>`, description and canonical; the Back button works.
- `pnpm dev` still serves every path (Vite's SPA fallback), client-rendered.

## Deployment

`.github/workflows/deploy-pages.yml` runs `pnpm run build` and uploads `dist/`.
It picks up all three stages with **no workflow change**. Nothing here has been
deployed — this is ready for review.

After the first deploy, worth doing once. **All three are done:**

1. ✅ Submit `https://3formhk.com/sitemap.xml` in Google Search Console. The
   property is verified with the HTML file in `public/`.
2. ✅ Request indexing for `/services/facility-maintenance/` and `/contact/`,
   EN and zh-HK.
3. ✅ Run the two priority pages through the Rich Results Test. Breadcrumbs
   and Organization parse, with non-critical warnings only.

Indexing takes days to weeks to show up in Search Console. Check the Pages
report there before assuming anything is wrong.

### Organization `sameAs`

The Organization JSON-LD lists the firm's LinkedIn company page under `sameAs`,
which links the site and the profile as one entity for Google. The URL lives in
`SOCIAL_PROFILES` in `src/routes.ts` and the footer icon reads the same value.
Add another profile there only once it is real and public.

## Follow-ups (not in this change)

- ✅ **Contact page copy.** Done. The intro (`t.contact.sub`) is now a
  paragraph Edward approved on 2026-09-23: who 3form works with, the
  one-business-day reply, and walkthrough-then-quotation for site work.
- **Per-service landing pages.** In progress, one service at a time from an
  interview with Edward. Live pattern: add the page to `Page`, `PAGE_SEGMENT`,
  `SERVICE_PAGES`, `PAGE_TITLE`, `PAGE_DESCRIPTION` and `PRERENDERED_PAGES` in
  `src/routes.ts`; a component in `App.tsx`; a `Service` node in
  `src/structuredData.ts`; and a card link on the Services page. Never publish
  one without real copy: thin duplicates of the Services page hurt rankings.
  - ✅ Facility Maintenance: `/services/facility-maintenance/`
  - ✅ Funding Consulting: `/services/funding-consulting/`. Copy lives in
    `t.services.fundingPage`. A results section is still pending Edward's
    publishable example.
  - Still to interview: Engineering & Process Enhancement, AI & Data,
    Production Site Setup, Warehouse Management System, General Maintenance &
    Repair, Industrial Agentic Development.
- ✅ **`og:image`.** Done. Every page ships `og:image` (1200×630, with alt
  text in the page's language) and `twitter:card=summary_large_image`. The
  card is `public/og-image.png`; its source is `scripts/og-image/card.html`,
  which has the one-line command to regenerate it. The URL and alt text live
  in `OG_IMAGE` in `src/routes.ts`.
- ✅ **Organization logo and description.** The schema logo is
  `public/logo.navy.png`, a navy mark on white. Google shows it on a white
  background, where the site header's white-on-transparent mark would be
  invisible. `description` reuses the About page's company text.
- **Organization fields that need Edward's facts:** `streetAddress`,
  `foundingDate` and `legalName`. Google's Rich Results Test lists these as
  optional. A "missing postalCode" warning can be ignored: Hong Kong has no
  postcodes.
- ✅ **Analytics.** Done. GA4 `G-8XY75DG091` is set in
  `.figma/make/site.json`, and `vite.config.ts` injects the tag into every
  page. In-app navigation is counted by GA4's enhanced measurement (browser
  history events, on by default), so there is no manual `page_view` call.
  Adding one would double-count. The Privacy Policy names Google Analytics
  and links Google's opt-out add-on.
