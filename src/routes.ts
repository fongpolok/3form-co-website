// ─────────────────────────────────────────────────────────────────────────────
// routes.ts — the single source of truth for URLs and per-page SEO metadata.
//
// Why this file exists: the site used to route on the URL *hash* (`#services`),
// and a fragment is never sent to the server. Every crawler therefore saw one
// URL ("/") holding an empty <div id="root">, so no page had an indexable
// title, description, heading or body. Routing now happens on real paths, and
// `scripts/prerender/` renders one static HTML file per entry in ALL_ROUTES at
// build time, so view-source shows the real content.
//
// Three consumers read this module, which is why the metadata lives here and
// not in the components:
//   1. src/App.tsx          — client-side routing + <a href> targets
//   2. src/entry-server.tsx — the list of pages to prerender
//   3. scripts/prerender/   — <head> tags, canonicals, hreflang, sitemap.xml
// ─────────────────────────────────────────────────────────────────────────────

import { t, txt, type Lang } from "./translations";
import { facilityMaintenanceConfig } from "./facilityMaintenance/config";

/** Canonical origin. Used for <link rel="canonical">, og:url and sitemap.xml. */
export const SITE_ORIGIN = "https://3formhk.com";
export const SITE_NAME = "3form Engineering Co";

/**
 * The firm's official profiles elsewhere. Used by the footer icons and by the
 * Organization JSON-LD `sameAs`, which tells Google these profiles are the same
 * entity as this site. Add a URL here only once the profile is real and public.
 */
export const SOCIAL_PROFILES = {
  linkedin: "https://www.linkedin.com/company/3form-engineering-hk/",
} as const;

export const LANGS = ["en", "tc"] as const;

/** BCP 47 tags for <html lang>, hreflang and og:locale. "tc" is our internal key. */
export const HTML_LANG: Record<Lang, string> = { en: "en", tc: "zh-HK" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_HK", tc: "zh_HK" };

/** English is served at the root; Traditional Chinese lives under /tc/. */
export const LANG_PREFIX: Record<Lang, string> = { en: "", tc: "tc" };

// ── Pages ─────────────────────────────────────────────────────────────────────
// "facilityMaintenance" is a standalone landing page rather than a nav item —
// it is the highest-intent search target on the site (場地保養 / facility
// maintenance Hong Kong), so it needs its own indexable URL, title and H1
// instead of only existing as a block partway down the Services page.
export type Page =
  | "home"
  | "about"
  | "services"
  | "facilityMaintenance"
  | "fundingConsulting"
  | "processEnhancement"
  | "aiDataAdoption"
  | "productionSetup"
  | "warehouseSystem"
  | "equipmentMaintenance"
  | "industrialAgents"
  | "projects"
  | "demos"
  | "contact";

/** Path segment for each page, relative to the language root. "" is the home page. */
const PAGE_SEGMENT: Record<Page, string> = {
  home: "",
  about: "about",
  services: "services",
  facilityMaintenance: "services/facility-maintenance",
  fundingConsulting: "services/funding-consulting",
  processEnhancement: "services/lean-six-sigma",
  aiDataAdoption: "services/ai-data-adoption",
  productionSetup: "services/production-site-setup",
  warehouseSystem: "services/warehouse-management-system",
  equipmentMaintenance: "services/equipment-maintenance-repair",
  industrialAgents: "services/industrial-ai-agents",
  projects: "projects",
  demos: "demos",
  contact: "contact",
};

/** Per-service landing pages. They live under /services/ and highlight that nav item. */
export const SERVICE_PAGES: readonly Page[] = [
  "facilityMaintenance",
  "fundingConsulting",
  "processEnhancement",
  "aiDataAdoption",
  "productionSetup",
  "warehouseSystem",
  "equipmentMaintenance",
  "industrialAgents",
];

/** Copy for a templated service landing page (see ServiceLandingPage in App.tsx). */
export type ServiceLandingContent = typeof t.services.fundingPage;

/**
 * Service landing pages built from the shared template, keyed by page, with the
 * Services-page card (`t.services.items[].id`) that links to each. Facility
 * Maintenance is not here: it has its own component and content.json.
 */
export const SERVICE_LANDINGS: Partial<Record<Page, { content: ServiceLandingContent; cardId: number }>> = {
  fundingConsulting: { content: t.services.fundingPage, cardId: 1 },
  processEnhancement: { content: t.services.processPage, cardId: 2 },
  aiDataAdoption: { content: t.services.aiDataPage, cardId: 3 },
  productionSetup: { content: t.services.productionSetupPage, cardId: 4 },
  warehouseSystem: { content: t.services.warehouseSystemPage, cardId: 5 },
  equipmentMaintenance: { content: t.services.equipmentMaintenancePage, cardId: 6 },
  industrialAgents: { content: t.services.industrialAgentsPage, cardId: 7 },
};

/** Which nav item highlights for a given page (service landings sit under Services). */
export function navKeyFor(page: Page): Page {
  return SERVICE_PAGES.includes(page) ? "services" : page;
}

export type Route = {
  page: Page;
  lang: Lang;
  /** Set only for a project *detail* page (/projects/3/); null is the list itself. */
  projectId: number | null;
};

export const HOME_ROUTE: Route = { page: "home", lang: "en", projectId: null };

// ── Base path ─────────────────────────────────────────────────────────────────
// Vite's base can be "/", a subpath ("/3form-co-website/" on a bare GitHub
// Pages URL) or a full origin (FIGMA_PUBLIC_URL). Routing only ever cares about
// the pathname part, so normalise it once here.
function computeBasePath(): string {
  const raw = import.meta.env.BASE_URL || "/";
  try {
    const pathname = new URL(raw, "http://localhost").pathname;
    return pathname.endsWith("/") ? pathname : `${pathname}/`;
  } catch {
    return "/";
  }
}

export const BASE_PATH = computeBasePath();

// ── Path <-> Route ────────────────────────────────────────────────────────────

/** Site-relative path for a route, e.g. `/tc/services/facility-maintenance/`. */
export function routePath(route: Route): string {
  const segments = [LANG_PREFIX[route.lang]];

  if (route.page === "projects" && route.projectId !== null) {
    segments.push(`${PAGE_SEGMENT.projects}/${route.projectId}`);
  } else {
    segments.push(PAGE_SEGMENT[route.page]);
  }

  const joined = segments.filter(Boolean).join("/");
  return joined ? `/${joined}/` : "/";
}

/** Full href including Vite's base — what belongs in an `<a href>`. */
export function routeHref(route: Route): string {
  return `${BASE_PATH}${routePath(route).replace(/^\//, "")}`;
}

/** Absolute URL for canonicals, og:url and sitemap entries. */
export function routeUrl(route: Route): string {
  return `${SITE_ORIGIN}${routePath(route)}`;
}

/**
 * Resolve a browser pathname to a route. Unknown paths fall back to the home
 * page so a stale link still renders the site rather than a blank screen.
 */
export function parsePath(pathname: string): Route {
  let rest = pathname;
  if (BASE_PATH !== "/" && rest.startsWith(BASE_PATH)) rest = rest.slice(BASE_PATH.length - 1);

  const parts = rest.split("/").filter(Boolean);

  let lang: Lang = "en";
  if (parts[0] === LANG_PREFIX.tc) {
    lang = "tc";
    parts.shift();
  }

  if (parts.length === 0) return { page: "home", lang, projectId: null };

  // /projects/<id>/ — a detail page, still the "projects" page for nav purposes.
  if (parts[0] === PAGE_SEGMENT.projects && parts.length > 1) {
    const id = Number(parts[1]);
    const known = t.projects.items.some((p) => p.id === id);
    return { page: "projects", lang, projectId: known ? id : null };
  }

  const joined = parts.join("/");
  const page = (Object.keys(PAGE_SEGMENT) as Page[]).find(
    (p) => PAGE_SEGMENT[p] !== "" && PAGE_SEGMENT[p] === joined,
  );

  return { page: page ?? "home", lang, projectId: null };
}

/**
 * Map a legacy hash URL onto its replacement path. The site shipped
 * `#services`, `#contact` and `#projects/3` links for months (and they may sit
 * in third-party directories or someone's bookmarks), so App.tsx redirects
 * them on load instead of dropping the visitor on the home page.
 */
export function routeFromLegacyHash(hash: string, lang: Lang): Route | null {
  const raw = hash.replace(/^#/, "");
  if (!raw) return null;

  const [base, second] = raw.split("/");

  if (base === "projects" && second !== undefined) {
    const id = Number(second);
    if (t.projects.items.some((p) => p.id === id)) return { page: "projects", lang, projectId: id };
  }
  if (base === facilityMaintenanceConfig.sectionId) {
    return { page: "facilityMaintenance", lang, projectId: null };
  }

  const page = (Object.keys(PAGE_SEGMENT) as Page[]).find((p) => PAGE_SEGMENT[p] === base);
  return page ? { page, lang, projectId: null } : null;
}

// ── Per-page SEO metadata ─────────────────────────────────────────────────────
// Titles stay under ~60 characters before the brand suffix and descriptions
// under ~160 so neither is truncated in the search result.

type BiString = { en: string; tc: string };

const PAGE_TITLE: Record<Page, BiString> = {
  home: {
    en: "Engineering & Management Consulting in Hong Kong",
    tc: "香港工程及管理顧問公司",
  },
  about: {
    en: "About Us — Hong Kong Engineering Consultancy",
    tc: "關於我們 — 香港工程顧問公司",
  },
  services: {
    en: "Services — Funding, Lean & 6 Sigma, AI Adoption, Maintenance",
    tc: "服務範疇 — 資助顧問、精益六西格瑪、人工智能、場地保養",
  },
  facilityMaintenance: {
    en: "Facility Maintenance Hong Kong — HVAC, Electrical & FIFO Layout",
    tc: "場地保養服務（香港）— 冷氣通風、電力系統、FIFO 生產線佈局",
  },
  fundingConsulting: {
    en: "Engineering Consulting & Funding Applications for Manufacturers",
    tc: "製造業工程顧問及資助申請 — 香港",
  },
  processEnhancement: {
    en: "Lean & Six Sigma Consulting for Manufacturers in Hong Kong",
    tc: "精益及六西格瑪顧問 — 香港製造業流程優化",
  },
  aiDataAdoption: {
    en: "AI & Data Digitalisation Consulting in Hong Kong",
    tc: "人工智能及數據數碼化顧問 — 香港製造業",
  },
  productionSetup: {
    en: "Production Site Setup in Hong Kong — Licensing, HACCP, GMP",
    tc: "香港生產場地設立 — 牌照、HACCP、GMP",
  },
  warehouseSystem: {
    en: "Warehouse Management System (WMS) — Lot & FEFO Tracking",
    tc: "倉庫管理系統（WMS）— 批次及效期追蹤",
  },
  equipmentMaintenance: {
    en: "Production Equipment Maintenance & Repair in Hong Kong",
    tc: "生產設備維修及保養 — 香港",
  },
  industrialAgents: {
    en: "Industrial AI Agent Development in Hong Kong",
    tc: "工業人工智能代理開發 — 香港",
  },
  projects: {
    en: "Projects & Case Studies",
    tc: "項目及個案研究",
  },
  demos: {
    en: "Live Demos — Warehouse Management & ESG Tools",
    tc: "現場示範 — 倉庫管理及 ESG 工具",
  },
  contact: {
    en: "Contact Us — Hong Kong Engineering Consultants",
    tc: "聯絡我們 — 香港工程顧問",
  },
};

const PAGE_DESCRIPTION: Record<Page, BiString> = {
  home: {
    en: "3form Engineering Co is a Hong Kong engineering and management consultancy: government funding applications, Lean and Six Sigma process improvement, AI and data adoption, production site setup and facility maintenance.",
    tc: "3form Engineering Co 是香港工程及管理顧問公司，提供政府資助申請、精益及六西格瑪流程優化、人工智能及數據應用、生產場地設立，以及場地保養服務。",
  },
  about: {
    en: "A Hong Kong–based engineering and management consulting firm helping manufacturers, food producers and technology businesses improve operations, adopt new technology and meet regulatory requirements.",
    tc: "3form Engineering Co 總部設於香港，協助製造業、食品生產及科技企業改善營運、採用新技術並符合監管要求。了解我們的團隊、工作方式及往績。",
  },
  services: {
    en: "Funding consulting (BUD, NIAS and general funding applications), Six Sigma and Lean process enhancement, AI and data digitalisation, production site setup, warehouse management SaaS, equipment repair and facility maintenance.",
    tc: "3form 提供資助顧問（BUD、NIAS 及一般資助申請）、六西格瑪及精益流程優化、人工智能及數據數碼化、生產場地設立、倉庫管理系統、設備維修及場地保養服務。",
  },
  facilityMaintenance: {
    en: "Facility maintenance in Hong Kong for offices, commercial buildings, factories and warehouses: HVAC, electrical systems, office equipment and FIFO production line layout. Scope confirmed by site walkthrough, then a detailed quotation.",
    tc: "3form 為香港寫字樓、商業大廈、工廠及倉庫提供場地保養服務：冷氣及通風（HVAC）、電力系統、辦公室設備，以及先進先出（FIFO）生產線佈局。經實地視察釐清範圍後提供詳細報價。",
  },
  fundingConsulting: {
    en: "On-site assessment, a Lean and Six Sigma solution and the funding application, for Hong Kong manufacturers and Mainland firms setting up production in Hong Kong.",
    tc: "3form 為香港製造商及來港設廠的內地企業提供實地評估、精益及六西格瑪改善方案，以及資助申請服務。",
  },
  processEnhancement: {
    en: "Lean and Six Sigma consulting in Hong Kong: site evaluation, production and cost studies, and technical or advisory support for Greater Bay Area manufacturers.",
    tc: "3form 為大灣區製造商提供精益及六西格瑪顧問服務：實地評估、生產營運及成本研究，以及技術或顧問支援。",
  },
  aiDataAdoption: {
    en: "AI tool selection, data pipeline setup and digital transformation for Greater Bay Area manufacturers, turning raw production data into business intelligence.",
    tc: "3form 為大灣區製造商提供人工智能工具選擇、數據流程建立及數碼轉型服務，將原始生產數據轉化為商業洞察。",
  },
  productionSetup: {
    en: "Support for setting up compliant production facilities in Hong Kong: licensing, HACCP food safety systems, GMP standards and FIFO inventory management.",
    tc: "3form 支援製造商在香港設立合規生產設施：牌照申請、HACCP食品安全系統、GMP標準及先進先出存貨管理。",
  },
  warehouseSystem: {
    en: "A hosted warehouse management system for Hong Kong operations: lot and expiry (FEFO) tracking, low-stock and expiry alerts, and full audit trails.",
    tc: "3form 託管式倉庫管理系統：批次及效期（FEFO）追蹤、低庫存及到期預警，以及完整審計軌跡，按您的存貨流轉方式設定。",
  },
  equipmentMaintenance: {
    en: "Preventive maintenance planning, breakdown diagnosis and repair support for production equipment in Hong Kong, with downtime measured rather than guessed at.",
    tc: "3form 為香港生產設備提供預防性保養規劃、故障診斷及維修支援，停機時間有數據可依，而非憑估算。",
  },
  industrialAgents: {
    en: "AI agents built on real plant data: reading sensor streams, documents and inspection results to automate the routine decisions your operations team repeats.",
    tc: "3form 為大灣區製造商開發以真實廠房數據運作的人工智能代理，讀取感測器數據、文件及檢測結果，自動化例行營運決策。",
  },
  projects: {
    en: "Completed engagements and representative examples of our work across Lean and Six Sigma, government funding applications, AI inspection, warehouse systems and GMP/HACCP compliance.",
    tc: "3form 已完成項目及代表性案例，涵蓋精益及六西格瑪、政府資助申請、人工智能檢測、倉庫系統，以及 GMP／HACCP 合規工作。",
  },
  demos: {
    en: "Try the tools we build — a warehouse management platform with lot and expiry tracking, and ESG reporting support for Hong Kong SMEs.",
    tc: "試用我們開發的工具：具備批次及效期追蹤的倉庫管理平台，以及為香港中小企而設的 ESG 報告支援。",
  },
  contact: {
    en: `Contact 3form Engineering Co in Hong Kong. Phone ${t.contact.phone}, email ${t.contact.email}. Tell us about your project and we will reply within one business day.`,
    tc: `聯絡 3form Engineering Co（香港）。電話 ${t.contact.phone}，電郵 ${t.contact.email}。告訴我們您的項目需要，我們將於一個工作天內回覆。`,
  },
};

export type RouteMeta = {
  /** Full <title>, brand suffix already applied. */
  title: string;
  description: string;
  /** BCP 47 tag for <html lang>. */
  htmlLang: string;
  ogLocale: string;
  canonical: string;
  /** hreflang alternates — the same page in every language, plus x-default. */
  alternates: { hreflang: string; href: string }[];
  /** Social preview card shown when a link is shared (og:image / twitter:image). */
  ogImage: { url: string; width: number; height: number; alt: string };
};

/**
 * One bilingual card for every page. Source: scripts/og-image/card.html —
 * regenerate the PNG from there if the wording changes.
 */
const OG_IMAGE = {
  url: `${SITE_ORIGIN}/og-image.png`,
  width: 1200,
  height: 630,
  alt: {
    en: `${SITE_NAME} — engineering and management consulting in Hong Kong`,
    tc: `${SITE_NAME} — 香港工程及管理顧問`,
  },
};

export function routeMeta(route: Route): RouteMeta {
  const project =
    route.projectId !== null ? t.projects.items.find((p) => p.id === route.projectId) : undefined;

  const title = project
    ? `${txt(project.title, route.lang)} | ${txt(t.nav.projects, route.lang)} | ${SITE_NAME}`
    : `${txt(PAGE_TITLE[route.page], route.lang)} | ${SITE_NAME}`;

  const description = project
    ? txt(project.desc, route.lang)
    : txt(PAGE_DESCRIPTION[route.page], route.lang);

  return {
    title,
    description,
    htmlLang: HTML_LANG[route.lang],
    ogLocale: OG_LOCALE[route.lang],
    canonical: routeUrl(route),
    alternates: [
      ...LANGS.map((lang) => ({
        hreflang: HTML_LANG[lang],
        href: routeUrl({ ...route, lang }),
      })),
      { hreflang: "x-default", href: routeUrl({ ...route, lang: "en" }) },
    ],
    ogImage: {
      url: OG_IMAGE.url,
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      alt: txt(OG_IMAGE.alt, route.lang),
    },
  };
}

// ── The prerender manifest ────────────────────────────────────────────────────

/** Pages that get a static HTML file, in sitemap order. */
const PRERENDERED_PAGES: Page[] = [
  "home",
  "services",
  "facilityMaintenance",
  "fundingConsulting",
  "processEnhancement",
  "aiDataAdoption",
  "productionSetup",
  "warehouseSystem",
  "equipmentMaintenance",
  "industrialAgents",
  "contact",
  "about",
  "projects",
  "demos",
];

/**
 * Every route the build writes to disk: each page in each language, plus one
 * detail page per project. Keep additions here — the prerender script, the
 * sitemap and the crawlable link graph all read from this one list.
 */
export const ALL_ROUTES: Route[] = LANGS.flatMap((lang) => [
  ...PRERENDERED_PAGES.map((page): Route => ({ page, lang, projectId: null })),
  ...t.projects.items.map((p): Route => ({ page: "projects", lang, projectId: p.id })),
]);

/**
 * Relative crawl priority for sitemap.xml. Facility maintenance and Contact are
 * the pages this SEO work is aimed at, so they rank alongside the home page.
 */
export function sitemapPriority(route: Route): string {
  if (route.projectId !== null) return "0.5";
  switch (route.page) {
    case "home":
      return "1.0";
    case "facilityMaintenance":
    case "fundingConsulting":
    case "processEnhancement":
    case "aiDataAdoption":
    case "productionSetup":
    case "warehouseSystem":
    case "equipmentMaintenance":
    case "industrialAgents":
    case "services":
    case "contact":
      return "0.9";
    default:
      return "0.7";
  }
}
