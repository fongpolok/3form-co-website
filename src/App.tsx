// ─────────────────────────────────────────────────────────────────────────────
// App.tsx — 3form Co website
// McKinsey-style: dark navy, clean, professional, bilingual EN/TC
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, Fragment, type CSSProperties, type ReactNode } from "react";
import { t, txt, type Lang } from "./translations";
import { FacilityMaintenanceBlock, facilityMaintenanceConfig } from "./facilityMaintenance";
import {
  HOME_ROUTE,
  navKeyFor,
  parsePath,
  routeFromLegacyHash,
  routeHref,
  routeMeta,
  SERVICE_LANDINGS,
  SOCIAL_PROFILES,
  type Page,
  type ServiceLandingContent,
  type Route,
} from "./routes";

// Resolves a root-relative path (e.g. "/logo.white.png") against the app's
// actual base URL. Needed because this deploys under a subpath on GitHub
// Pages (/3form-co-website/) — a bare "/logo.white.png" resolves against the
// domain root instead and 404s there, even though the same path works fine
// in local dev where the base is "/".
function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

// Standard clip-based sr-only pattern — present in the a11y tree for heading
// hierarchy/navigation, invisible and taking no layout space. Used where a
// section already communicates its heading visually via SectionLabel (a
// styled <span>, not a real heading), so screen readers would otherwise see
// the document outline skip a level.
const visuallyHidden = {
  position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px",
  overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0,
} as const;

// ── Tunable visual parameters — change colours/sizes here ────────────────────
const CONFIG = {
  navHeight: "72px",
  navBg:        "#002D72",
  navText:      "#FFFFFF",
  accent:       "#0050CC",
  accentHover:  "#003FA3",
  heroOverlay:  "rgba(0, 29, 72, 0.78)",
  // Overall strength of the hero's blueprint grid. The canvas paints on top of
  // heroOverlay (painting it underneath meant the overlay ate ~78% of it), so
  // this single dial is what actually governs how present the effect reads.
  heroGridOpacity: 0.85,
  sectionBg: {
    hero:     "#001A4A",
    about:    "#F8FAFF",
    founder:  "#FFFFFF",
    services: "#FFFFFF",
    projects: "#F0F4FF",
    allProjects: "#F8FAFF",
    contact:  "#002D72",
    footer:   "#001A4A",
  },
  heroImageUrl:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&auto=format",
  // Set this to a Formspree (or similar) endpoint to deliver contact-form submissions
  // server-side. Leave empty and the form falls back to opening the visitor's email
  // client via mailto: — that path works with zero setup.
  contactFormEndpoint: "",
};

// ── Routing ───────────────────────────────────────────────────────────────────
// The page + language a URL maps to lives in src/routes.ts, shared with the
// build-time prerenderer. Nothing here reads the URL hash any more: pages are
// real paths (/services/facility-maintenance/, /tc/contact/) so each one is a
// separate, crawlable, prerendered document.

/** The route for the current browser URL. Falls back to home during SSR. */
function currentRoute(): Route {
  if (typeof window === "undefined") return HOME_ROUTE;
  return parsePath(window.location.pathname);
}

/** Upsert a <meta name|property="..." content="..."> tag in the document head. */
function setHeadMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Upsert a <link rel="..." href="..."> tag in the document head. */
function setHeadLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// ── Logger (open browser Console tab to see app events) ──────────────────────
const log = {
  info:  (...a: unknown[]) => console.log("[3form]",        ...a),
  event: (...a: unknown[]) => console.log("[3form][event]", ...a),
};

// ─────────────────────────────────────────────────────────────────────────────
// Reusable small components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * An internal link that is a real `<a href>` in the HTML but navigates
 * client-side when clicked.
 *
 * The href matters as much as the click handler: a crawler only follows real
 * anchors, so every nav item, card and CTA that used to be a `<button>` with an
 * onClick is one of these now. That is what connects the prerendered pages into
 * a link graph instead of leaving them as orphans only reachable via sitemap.
 */
function RouteLink({ to, onNavigate, style, className, children, ariaCurrent, onMouseEnter, onMouseLeave }: {
  to: Route;
  onNavigate: () => void;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
  ariaCurrent?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={routeHref(to)}
      className={className}
      aria-current={ariaCurrent ? "page" : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        // Leave modified clicks alone so "open in new tab" and middle-click
        // still hit the real URL — the whole point of having one.
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate();
      }}
      style={{ textDecoration: "none", ...style }}
    >
      {children}
    </a>
  );
}

function SectionLabel({ lang, en, tc, light = false }: { lang: Lang; en: string; tc: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "32px", height: "2px", background: light ? "#5B9BF0" : CONFIG.accent }} />
      <span style={{
        fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em",
        textTransform: "uppercase", color: light ? "#5B9BF0" : CONFIG.accent,
      }}>
        {lang === "en" ? en : tc}
      </span>
    </div>
  );
}

function ContactDetail({ icon, label, value }: {
  icon: ReactNode; label: string; value: string;
}) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <span style={{ color: "#5B9BF0", marginTop: "2px", flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "4px" }}>
          {label}
        </div>
        <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.9)" }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// ── Social media icon SVGs ────────────────────────────────────────────────────
function IconLinkedIn({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function IconFacebook({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function IconInstagram({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

// ── Functional UI icons — stroke-based, one weight, distinct from the filled
// brand glyphs above (LinkedIn/Facebook/Instagram keep their conventional
// filled marks; everything the interface itself draws uses this outline set) ─
function IconMenu({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function IconPhone({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h3.2l1.3 4.4-2.1 1.6a12.5 12.5 0 0 0 6.6 6.6l1.6-2.1L20 15.8V19c0 1.1-.9 2-2 2C9.6 21 3 14.4 3 6c0-1.1.9-2 2-2z" />
    </svg>
  );
}

function IconMail({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

function IconGlobe({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z" />
    </svg>
  );
}

function IconMapPin({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function IconCheckCircle({ size = 48, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path d="m7.5 12.5 3 3 6-6.5" />
    </svg>
  );
}

function IconSend({ size = 48, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12 20.5 4 15 20l-3.5-6.5L4 12z" />
      <path d="M11.5 13.5 20.5 4" />
    </svg>
  );
}

function IconAlertTriangle({ size = 48, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5 22 20.5H2L12 3.5z" />
      <line x1="12" y1="10" x2="12" y2="14.5" />
      <circle cx="12" cy="17.5" r="0.25" fill={color} stroke="none" />
    </svg>
  );
}

function IconChevronDown({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 8.5 7 7 7-7" />
    </svg>
  );
}

const LANG_OPTIONS: { value: Lang; short: string; label: string }[] = [
  { value: "en", short: "EN",  label: "English" },
  { value: "tc", short: "繁中", label: "繁體中文" },
];

function LangToggle({ route, setLang, inline = false }: { route: Route; setLang: (l: Lang) => void; inline?: boolean }) {
  const lang = route.lang;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = LANG_OPTIONS.find(o => o.value === lang) ?? LANG_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    // Close on resize rather than trying to reposition mid-drag — the panel is
    // plain position:absolute so it already tracks the button on any reflow;
    // this just avoids it sitting open across a layout change large enough to
    // move its trigger somewhere else entirely (e.g. the mobile/desktop nav swap).
    const onResize = () => setOpen(false);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true" aria-expanded={open}
        aria-label={lang === "en" ? "Select language" : "選擇語言"}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          border: "1.5px solid rgba(255,255,255,0.6)", color: "#fff",
          background: open ? "rgba(255,255,255,0.12)" : "transparent",
          padding: "6px 12px 6px 16px", borderRadius: "4px", fontFamily: "var(--font-sans)",
          fontSize: "13px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.04em", transition: "background 0.2s",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "transparent"; }}
      >
        {current.short}
        <span style={{ display: "flex", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
          <IconChevronDown size={13} />
        </span>
      </button>

      {open && (
        <div aria-label={lang === "en" ? "Language" : "語言"}
          style={inline ? {
            // Rendered in normal flow so the mobile menu's navy background
            // (which only auto-sizes to in-flow content) actually grows to
            // contain it — an absolutely-positioned flyout here would hang
            // off the panel's bottom edge with page content showing behind it.
            marginTop: "8px", minWidth: "150px", maxWidth: "220px",
            background: "#fff", borderRadius: "3px", boxShadow: "0 8px 32px rgba(0,45,114,0.18)",
            overflow: "hidden",
          } : {
            position: "absolute", top: "calc(100% + 8px)", right: 0, minWidth: "150px",
            background: "#fff", borderRadius: "3px", boxShadow: "0 8px 32px rgba(0,45,114,0.18)",
            overflow: "hidden", zIndex: 10,
          }}>
          {/* Real links to the same page in the other language, so a crawler
              (and a visitor sharing the URL) lands on the translated document
              rather than an identical URL that switches language in JS only. */}
          {LANG_OPTIONS.map(opt => {
            const active = opt.value === lang;
            return (
              <RouteLink key={opt.value} to={{ ...route, lang: opt.value }}
                onNavigate={() => { log.event("Language →", opt.value); setLang(opt.value); setOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left", padding: "12px 16px",
                  background: active ? "#E8F0FE" : "transparent",
                  color: active ? CONFIG.accent : "#374151", fontSize: "14px",
                  fontWeight: active ? 700 : 500, cursor: "pointer", fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#F3F4F6"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {opt.label}
              </RouteLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation bar
// ─────────────────────────────────────────────────────────────────────────────
function Navbar({ route, setLang, setPage }: {
  route: Route; setLang: (l: Lang) => void; setPage: (p: Page) => void;
}) {
  const lang = route.lang;
  // The Facility Maintenance landing page highlights "Services" in the nav.
  const activeKey = navKeyFor(route.page);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu (and the language dropdown inside it) is plain React state,
  // not tied to the CSS breakpoint — without this, resizing past 900px back to
  // desktop leaves it mounted in its mobile position while the row around it
  // has already switched layouts, which reads as the dropdown "not following."
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  const navLinks: { key: Page; label: { en: string; tc: string } }[] = [
    { key: "home",     label: t.nav.home },
    { key: "about",    label: t.nav.about },
    { key: "projects", label: t.nav.projects },
    { key: "services", label: t.nav.services },
    { key: "demos",    label: t.nav.demos },
    { key: "contact",  label: t.nav.contact },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, height: CONFIG.navHeight,
      background: CONFIG.sectionBg.footer, zIndex: 1000,
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none", transition: "box-shadow 0.3s",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", height: "100%", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <RouteLink to={{ page: "home", lang, projectId: null }}
          onNavigate={() => { setPage("home"); window.scrollTo({ top: 0 }); }}
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <img src={asset("/logo.white.png")} alt="" style={{ width: "40px", height: "auto", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-serif)", color: "#FFFFFF", letterSpacing: "-0.015em", fontSize: "25px" }}>
            <span style={{ fontWeight: 700 }}>3form</span>{" "}
            <span style={{ fontWeight: 400 }}>Co</span>
          </span>
        </RouteLink>
        <div style={{
          display: "flex", alignItems: "center", gap: "36px",
          borderLeft: "1px solid rgba(255,255,255,0.15)",
          paddingLeft: "28px",
        }} className="hidden-mobile">
          {navLinks.map(link => (
            <RouteLink key={link.key} to={{ page: link.key, lang, projectId: null }}
              ariaCurrent={activeKey === link.key}
              onNavigate={() => { log.event("Nav:", link.key); setPage(link.key); setMenuOpen(false); }}
              style={{ color: activeKey === link.key ? "#FFFFFF" : "rgba(255,255,255,0.85)", fontSize: "14px", fontWeight: activeKey === link.key ? 700 : 500, letterSpacing: "0.02em", cursor: "pointer", transition: "color 0.2s", fontFamily: "var(--font-sans)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={e => (e.currentTarget.style.color = activeKey === link.key ? "#FFFFFF" : "rgba(255,255,255,0.85)")}>
              {txt(link.label, lang)}
            </RouteLink>
          ))}
          <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.15)" }} />
          <LangToggle route={route} setLang={setLang} />
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? (lang === "en" ? "Close menu" : "關閉選單") : (lang === "en" ? "Open menu" : "開啟選單")}
          style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, lineHeight: 0 }} className="show-mobile">
          {menuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: CONFIG.sectionBg.footer, padding: "16px 32px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {navLinks.map(link => (
            <RouteLink key={link.key} to={{ page: link.key, lang, projectId: null }}
              ariaCurrent={activeKey === link.key}
              onNavigate={() => { log.event("Nav:", link.key); setPage(link.key); setMenuOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", color: activeKey === link.key ? "#FFFFFF" : "rgba(255,255,255,0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "15px", fontWeight: activeKey === link.key ? 700 : 500, padding: "10px 0", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              {txt(link.label, lang)}
            </RouteLink>
          ))}
          <div style={{ marginTop: "16px" }}><LangToggle route={route} setLang={setLang} inline /></div>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PageShell — thin navy "back to home" strip shared by every non-Home page
// ─────────────────────────────────────────────────────────────────────────────
function PageShell({ lang, onBack, children }: { lang: Lang; onBack: () => void; children: ReactNode }) {
  return (
    <div>
      <div style={{ background: CONFIG.navBg, padding: "24px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <button onClick={() => { log.event("Back to home"); onBack(); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500, cursor: "pointer", padding: 0, fontFamily: "var(--font-sans)" }}>
            {txt(t.nav.back, lang)}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE sections
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero background: a transparent, mouse-reactive blueprint grid ────────────
// Nodes sit on a fixed grid over the hero photo; the ones near the cursor glow
// and wire themselves to their neighbours, reading as a live engineering
// schematic rather than a decorative particle effect. Canvas has no fill, so
// the photo and navy tint beneath it always show through.
function BlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPACING = 64;
    const REACH = 190;

    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: { x: number; y: number }[] = [];
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const layout = () => {
      const rect = section.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push({ x: c * SPACING, y: r * SPACING });
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const pulse = reduceMotion ? 0 : Math.sin(t / 2600) * 0.12 + 0.88;

      for (const p of points) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = Math.max(0, 1 - d / REACH);
        const alpha = (0.3 + near * 0.65) * pulse;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 + near * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91, 155, 240, ${alpha})`;
        ctx.fill();

        if (near > 0.02) {
          const right = { x: p.x + SPACING, y: p.y };
          const down = { x: p.x, y: p.y + SPACING };
          for (const neighbour of [right, down]) {
            const nd = Math.hypot(neighbour.x - mouse.x, neighbour.y - mouse.y);
            const nNear = Math.max(0, 1 - nd / REACH);
            const lineAlpha = Math.min(near, nNear) * 0.9 * pulse;
            if (lineAlpha < 0.02) continue;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(neighbour.x, neighbour.y);
            ctx.strokeStyle = `rgba(91, 155, 240, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 }; };

    layout();
    draw(0);
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    const resizeObserver = new ResizeObserver(() => { layout(); if (reduceMotion) draw(0); });
    resizeObserver.observe(section);
    if (!reduceMotion) raf = requestAnimationFrame(draw);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: CONFIG.heroGridOpacity }} />
  );
}

function HeroSection({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: CONFIG.sectionBg.hero }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${CONFIG.heroImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />

      <div style={{ position: "absolute", inset: 0, background: CONFIG.heroOverlay, pointerEvents: "none" }} />

      {/* Above the overlay, not below it — see CONFIG.heroGridOpacity. */}
      <BlueprintGrid />

      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "120px 32px 80px", width: "100%" }}>
        <div style={{ maxWidth: "700px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "40px", height: "2px", background: "#5B9BF0" }} />
            <span style={{ color: "#5B9BF0", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {lang === "en" ? "Engineering Consulting · Hong Kong" : "工程顧問 · 香港"}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", color: "#FFFFFF", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            {txt(t.hero.tagline, lang)}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "18px", lineHeight: 1.7, margin: "0 0 44px", fontWeight: 300 }}>
            {txt(t.hero.sub, lang)}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <RouteLink to={{ page: "services", lang, projectId: null }} onNavigate={() => { log.event("Hero CTA → services"); setPage("services"); }}
              style={{ display: "inline-block", background: CONFIG.accent, color: "#fff", padding: "14px 32px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", borderRadius: "3px", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = CONFIG.accentHover)}
              onMouseLeave={e => (e.currentTarget.style.background = CONFIG.accent)}>
              {txt(t.hero.cta, lang)}
            </RouteLink>
            <RouteLink to={{ page: "contact", lang, projectId: null }} onNavigate={() => { log.event("Hero CTA → contact"); setPage("contact"); }}
              style={{ display: "inline-block", border: "1.5px solid rgba(255,255,255,0.6)", color: "#fff", padding: "14px 32px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", borderRadius: "3px", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              {txt(t.hero.cta2, lang)}
            </RouteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Home: quick-link cards out to About / Services / Projects / Contact ──────
function QuickLinksSection({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  const cards: { key: Page; heading: { en: string; tc: string }; teaser: { en: string; tc: string }; cta: { en: string; tc: string } }[] = [
    { key: "about",    heading: t.nav.about,    teaser: t.home.links.about,    cta: { en: "Learn more",     tc: "了解更多" } },
    { key: "services", heading: t.nav.services, teaser: t.home.links.services, cta: { en: "View services",  tc: "查看服務" } },
    { key: "projects", heading: t.nav.projects, teaser: t.home.links.projects, cta: { en: "View projects",  tc: "查看項目" } },
    { key: "contact",  heading: t.nav.contact,  teaser: t.home.links.contact,  cta: { en: "Contact us",     tc: "聯絡我們" } },
    // Facility Maintenance is not a nav item, so the home page is where a
    // crawler first picks up its URL. Hidden when the block is switched off in
    // content.json, which is also when the landing page stops being built.
    ...(facilityMaintenanceConfig.enabled
      ? [{
          key: "facilityMaintenance" as Page,
          heading: facilityMaintenanceConfig.label,
          teaser: { en: "HVAC, electrical, office equipment and FIFO line layout for your premises.", tc: "冷氣通風、電力系統、辦公室設備及先進先出生產線佈局。" },
          cta: { en: "View facility maintenance", tc: "查看場地保養" },
        }]
      : []),
  ];
  return (
    <section style={{ background: CONFIG.sectionBg.about, padding: "100px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel lang={lang} en="Explore" tc="探索更多" />
        <h2 style={visuallyHidden}>{lang === "en" ? "Explore" : "探索更多"}</h2>
        <p style={{ fontSize: "16px", color: "#6B7280", margin: "16px 0 48px", maxWidth: "560px" }}>
          {txt(t.home.intro, lang)}
        </p>
        {/* auto-fit rather than a fixed 4 columns — the Facility Maintenance
            card is conditional, so the count varies with content.json. */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(228px, 1fr))", gap: "24px" }} className="grid-responsive">
          {cards.map(c => (
            <RouteLink key={c.key} to={{ page: c.key, lang, projectId: null }}
              onNavigate={() => { log.event("Home quicklink →", c.key); setPage(c.key); }}
              style={{ display: "block", textAlign: "left", background: "#fff", border: "1px solid #E5E7EB", borderTop: `5px solid ${CONFIG.accent}`, padding: "40px 28px", cursor: "pointer", boxShadow: "0 2px 16px rgba(0,45,114,0.06)", transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "23px", fontWeight: 700, color: "#001A4A", margin: "0 0 12px" }}>
                {txt(c.heading, lang)}
              </h3>
              <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6, margin: "0 0 18px" }}>
                {txt(c.teaser, lang)}
              </p>
              <span style={{ fontSize: "14px", color: CONFIG.accent, fontWeight: 700 }}>{txt(c.cta, lang)} →</span>
            </RouteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Home: Live Demos — engineering builds behind the advisory work. Real
// items (real: true) carry the Evidence-Tint blue treatment plus a
// provenance note; announced-but-unbuilt items use the same gray
// illustrative treatment as unbuilt project cards, per the Evidence-Tint Rule.
function LiveDemoSection({ lang }: { lang: Lang }) {
  return (
    <section style={{ background: CONFIG.sectionBg.projects, padding: "100px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel lang={lang} en="Live Demos" tc="現場示範" />
        {/* <h1>, not <h2>: this section is the whole Demos page, and every
            prerendered page needs exactly one top-level heading. */}
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.2, margin: "16px 0 12px", letterSpacing: "-0.02em" }}>
          {txt(t.demos.heading, lang)}
        </h1>
        <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "56px", maxWidth: "620px" }}>
          {txt(t.demos.sub, lang)}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }} className="grid-responsive">
          {t.demos.items.map(demo => (
            <div key={demo.id} style={{
              background: demo.real ? "#fff" : "#FAFAFA",
              padding: "36px 32px",
              borderTop: `3px solid ${demo.real ? CONFIG.accent : "#D1D5DB"}`,
              boxShadow: demo.real ? "0 2px 16px rgba(0,45,114,0.06)" : "none",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "20px" }}>
                <span style={{ display: "inline-block", background: demo.real ? "#E8F0FE" : "#F3F4F6", color: demo.real ? CONFIG.accent : "#6B7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px" }}>
                  {txt(demo.tag, lang)}
                </span>
                {!demo.real && (
                  <span style={{ display: "inline-block", background: "#fff", color: "#9CA3AF", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px", border: "1px solid #D1D5DB", whiteSpace: "nowrap" }}>
                    {txt(t.demos.illustrative_badge, lang)}
                  </span>
                )}
              </div>
              {/* <h2> under the page <h1> — each demo is a top-level topic of
                  the Demos page, which is the whole of this section. */}
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 600, color: demo.real ? "#001A4A" : "#4B5563", lineHeight: 1.35, margin: "0 0 12px" }}>
                {txt(demo.title, lang)}
              </h2>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#6B7280", margin: 0, flex: 1 }}>
                {txt(demo.desc, lang)}
              </p>
              {demo.real && txt(demo.note, lang) && (
                <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "16px 0 0", fontStyle: "italic" }}>
                  {txt(demo.note, lang)}
                </p>
              )}
              {demo.demoUrl && (
                <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "14px", color: CONFIG.accent, fontWeight: 700, marginTop: "20px", textDecoration: "none" }}>
                  {txt(t.demos.launch_demo, lang)} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About: company overview + stats ──────────────────────────────────────────
function AboutCompanySection({ lang }: { lang: Lang }) {
  const stats = [
    { num: t.about.stat1_num, label: t.about.stat1_label },
    { num: t.about.stat2_num, label: t.about.stat2_label },
    { num: t.about.stat3_num, label: t.about.stat3_label },
  ];
  return (
    <section id="about" style={{ background: CONFIG.sectionBg.about, padding: "100px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="grid-responsive">
          <div>
            <SectionLabel lang={lang} en="Who We Are" tc="關於我們" />
            {/* The About page's top-level heading — see the note on the Demos <h1>. */}
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.2, margin: "16px 0 24px", letterSpacing: "-0.02em" }}>
              {txt(t.about.heading, lang)}
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#4B5563", margin: 0 }}>
              {txt(t.about.company_body, lang)}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ minWidth: 0, textAlign: "center", padding: "32px 12px", background: "#fff", borderTop: `3px solid ${CONFIG.accent}`, boxShadow: "0 2px 16px rgba(0,45,114,0.07)" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 700, color: CONFIG.navBg, lineHeight: 1, marginBottom: "8px" }}>{s.num}</div>
                <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>{txt(s.label, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About: engagement roadmap — Diagnose → Fund → Engineer → Deliver ────────
function RoadmapSection({ lang }: { lang: Lang }) {
  const steps = t.about.roadmap.steps;
  return (
    <section style={{ background: CONFIG.sectionBg.about, padding: "100px 32px", borderTop: "1px solid #E5E7EB" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel lang={lang} en="How We Work" tc="我們的工作方式" />
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.2, margin: "16px 0 12px", letterSpacing: "-0.02em" }}>
          {txt(t.about.roadmap.heading, lang)}
        </h2>
        <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "56px", maxWidth: "620px" }}>
          {txt(t.about.roadmap.sub, lang)}
        </p>
        <div className="roadmap-track" style={{ display: "flex", alignItems: "flex-start" }}>
          {steps.map((step, i) => (
            <Fragment key={i}>
              <div className="roadmap-step" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, padding: "0 16px", minWidth: 0 }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: CONFIG.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 700, flexShrink: 0, marginBottom: "24px" }}>
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 600, color: "#001A4A", margin: "0 0 10px" }}>
                  {txt(step.title, lang)}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#6B7280", margin: 0 }}>
                  {txt(step.desc, lang)}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="roadmap-connector" style={{ flex: 1, height: "2px", marginTop: "22px", background: "rgba(0,80,204,0.25)" }} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About: Edward Fong founder bio ───────────────────────────────────────────
function FounderSection({ lang }: { lang: Lang }) {
  const f = t.about.founder;
  return (
    <section style={{ background: CONFIG.sectionBg.founder, padding: "100px 32px", borderTop: "1px solid #E5E7EB" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel lang={lang} en="Meet Our Founder" tc="認識我們的創辦人" />
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "72px", alignItems: "start", marginTop: "48px" }} className="grid-responsive">

          {/* Left: photo + name */}
          <div style={{ textAlign: "center" }}>
            <img src={asset(f.photoUrl)} alt={f.name} style={{
              width: "200px", height: "200px", borderRadius: "50%", margin: "0 auto 24px",
              objectFit: "cover", boxShadow: "0 4px 20px rgba(0,45,114,0.15)",
            }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 700, color: "#001A4A", margin: "0 0 6px" }}>
              {f.name}
            </h3>
            <p style={{ fontSize: "14px", color: CONFIG.accent, fontWeight: 600, margin: "0 0 20px", letterSpacing: "0.02em" }}>
              {txt(f.title, lang)}
            </p>
            {/* Credential pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
              {f.credentials.map((c, i) => (
                <span key={i} style={{ display: "inline-block", background: "#E8F0FE", color: CONFIG.accent, fontSize: "11px", fontWeight: 600, padding: "5px 12px", borderRadius: "2px", textAlign: "center" }}>
                  {txt(c, lang)}
                </span>
              ))}
            </div>
          </div>

          {/* Right: bio */}
          <div>
            <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#374151", marginBottom: "20px", maxWidth: "62ch" }}>
              {txt(f.bio_p1, lang)}
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#374151", margin: 0, maxWidth: "62ch" }}>
              {txt(f.bio_p2, lang)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function ServicesSection({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  return (
    <section id="services" style={{ background: CONFIG.sectionBg.services, padding: "100px 32px" }}>
      <style>{`
        .sv-sweep-card { position: relative; overflow: hidden; }
        .sv-sweep-photo { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .sv-sweep-card:hover .sv-sweep-photo, .sv-sweep-card:focus-within .sv-sweep-photo { transform: scale(1.06); }
        .sv-sweep-bar { position: absolute; top: 0; left: 0; height: 5px; width: 100%; background: #0050CC; transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .sv-sweep-card:hover .sv-sweep-bar, .sv-sweep-card:focus-within .sv-sweep-bar { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .sv-sweep-photo { transition-duration: 0.01ms !important; transform: none !important; }
          .sv-sweep-bar { transition-duration: 0.01ms !important; transform: scaleX(1) !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel lang={lang} en="What We Do" tc="我們的服務範疇" />
        {/* The Services page's top-level heading — see the note on the Demos <h1>. */}
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.2, margin: "16px 0 12px", letterSpacing: "-0.02em" }}>
          {txt(t.services.heading, lang)}
        </h1>
        <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "56px", maxWidth: "560px" }}>
          {txt(t.services.sub, lang)}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", background: "#E5E7EB" }} className="services-grid">
          {t.services.items.map((svc, i) => {
            // An odd number of services would otherwise leave the last row
            // half-empty, exposing the grid's gray seam background as a blank
            // cell — the final card spans both columns instead. Spanning it
            // also doubles its text measure, so that card alone caps its own.
            const isWide = i === t.services.items.length - 1 && t.services.items.length % 2 === 1;
            return (
            <div key={svc.id} className="sv-sweep-card" style={{
              background: "#fff", padding: "48px 40px",
              gridColumn: isWide ? "1 / -1" : undefined,
            }}>
              <div className="sv-sweep-bar" />
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                {/* One icon per service, keyed to svc.id — these used to be
                    four rotating crops of the hero skyline photo, which meant
                    the mark never matched the service it sat above. */}
                <div className="sv-sweep-photo" style={{
                  width: "64px", height: "64px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${CONFIG.accent}`, flexShrink: 0,
                  backgroundImage: `url(${asset(`/services/service-${String(svc.id).padStart(2, "0")}.webp`)})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                }} />
                <div style={{ fontSize: "13px", fontWeight: 600, color: CONFIG.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {String(svc.id).padStart(2, "0")}
                </div>
              </div>
              {/* <h2> under the page <h1> — each service card is a top-level
                  topic of the Services page, not a subsection of one. */}
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 700, color: "#001A4A", lineHeight: 1.3, margin: "0 0 16px" }}>
                {txt(svc.title, lang)}
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#4B5563", margin: 0, maxWidth: isWide ? "58ch" : undefined }}>
                {txt(svc.detail, lang)}
              </p>
              {/* Services with their own landing page link to it — a real <a>
                  so crawlers can follow it. Wired from SERVICE_LANDINGS. */}
              {(() => {
                const entry = (Object.entries(SERVICE_LANDINGS) as [Page, { content: ServiceLandingContent; cardId: number }][])
                  .find(([, l]) => l.cardId === svc.id);
                if (!entry) return null;
                const [landingPage, landing] = entry;
                return (
                  <RouteLink to={{ page: landingPage, lang, projectId: null }}
                    onNavigate={() => { log.event("Services → landing page", landingPage); setPage(landingPage); }}
                    style={{ display: "inline-block", marginTop: "20px", color: CONFIG.accent, fontSize: "14px", fontWeight: 600 }}>
                    {txt(landing.content.cardLink, lang)}
                  </RouteLink>
                );
              })()}
            </div>
            );
          })}
        </div>

        {/* Facility Maintenance / 場地保養 — premises upkeep, distinct from the
            production-equipment card above. Toggle/edit in src/facilityMaintenance/content.json. */}
        <FacilityMaintenanceBlock
          lang={lang}
          accent={CONFIG.accent}
          accentHover={CONFIG.accentHover}
          onContact={() => setPage("contact")}
          secondaryAction={
            <RouteLink to={{ page: "facilityMaintenance", lang, projectId: null }}
              onNavigate={() => { log.event("Services → facility maintenance page"); setPage("facilityMaintenance"); }}
              style={{ color: CONFIG.accent, fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
              {lang === "en" ? "Full facility maintenance details →" : "查看場地保養詳情 →"}
            </RouteLink>
          }
        />

        {/* CTA — request a demo or a quotation */}
        <div style={{ marginTop: "2px", background: CONFIG.navBg, padding: "56px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <div style={{ maxWidth: "480px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.01em" }}>
              {txt(t.services.cta.heading, lang)}
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>
              {txt(t.services.cta.sub, lang)}
            </p>
          </div>
          <RouteLink to={{ page: "contact", lang, projectId: null }}
            onNavigate={() => { log.event("Services CTA → contact"); setPage("contact"); }}
            style={{ flexShrink: 0, display: "inline-block", background: CONFIG.accent, color: "#fff", padding: "14px 32px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", borderRadius: "3px", cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => (e.currentTarget.style.background = CONFIG.accentHover)}
            onMouseLeave={e => (e.currentTarget.style.background = CONFIG.accent)}>
            {txt(t.services.cta.button, lang)}
          </RouteLink>
        </div>
      </div>
    </section>
  );
}

// ── Reusable project card ─────────────────────────────────────────────────────
// Real, completed engagements (`featured: true`) and illustrative examples of the
// kind of work we take on (`featured: false`) are visually distinct so neither is
// mistaken for the other — see PRODUCT.md "Evidence on Hand".
function ProjectCard({ p, lang, onOpen }: { p: typeof t.projects.items[0]; lang: Lang; onOpen: () => void }) {
  const real = p.featured;
  return (
    // A real <a href>, not a click-handled <div>: keyboard reachable, announced
    // as a link, and — since each project detail is its own prerendered page —
    // the anchor a crawler follows to reach it.
    <RouteLink to={{ page: "projects", lang, projectId: p.id }} onNavigate={onOpen} style={{
      display: "block",
      width: "100%",
      textAlign: "left",
      font: "inherit",
      cursor: "pointer",
      background: real ? "#fff" : "#FAFAFA",
      padding: "40px 32px",
      borderTop: `3px solid ${real ? CONFIG.accent : "#D1D5DB"}`,
      boxShadow: real ? "0 2px 16px rgba(0,45,114,0.06)" : "none",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; if (real) e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,45,114,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = real ? "0 2px 16px rgba(0,45,114,0.06)" : "none"; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "20px" }}>
        <span style={{ display: "inline-block", background: real ? "#E8F0FE" : "#F3F4F6", color: real ? CONFIG.accent : "#6B7280", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px" }}>
          {txt(p.tag, lang)}
        </span>
        {!real && (
          <span style={{ display: "inline-block", background: "#fff", color: "#9CA3AF", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px", border: "1px solid #D1D5DB", whiteSpace: "nowrap" }}>
            {txt(t.projects.illustrative_badge, lang)}
          </span>
        )}
      </div>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 600, color: real ? "#001A4A" : "#4B5563", lineHeight: 1.35, margin: "0 0 14px" }}>
        {txt(p.title, lang)}
      </h3>
      <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#6B7280", margin: "0 0 20px" }}>
        {txt(p.desc, lang)}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: real ? CONFIG.accent : "#9CA3AF", background: real ? "#E8F0FE" : "#F3F4F6", display: "inline-block", padding: "4px 10px", borderRadius: "2px" }}>
          {real ? "✓ " : ""}{txt(p.result, lang)}
        </div>
        <span style={{ fontSize: "13px", fontWeight: 600, color: CONFIG.accent, whiteSpace: "nowrap" }}>
          {txt(t.projects.view_details, lang)} →
        </span>
      </div>
    </RouteLink>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
// Submission status: idle → sending → ("sent" via a real endpoint, "mailto" via
// the zero-setup fallback, or "error"). "sent"/"mailto" are only ever reached
// after a real send actually happened — see CONFIG.contactFormEndpoint above.
type SubmitStatus = "idle" | "sending" | "sent" | "mailto" | "error";

function ContactSection({ lang }: { lang: Lang }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      if (CONFIG.contactFormEndpoint) {
        const res = await fetch(CONFIG.contactFormEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
        log.event("Contact form sent via endpoint:", form);
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        const subject = encodeURIComponent(`New enquiry from ${form.name || "3form Co website"}`);
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
        log.event("Contact form handed off via mailto:", form);
        setStatus("mailto");
      }
    } catch (err) {
      log.event("Contact form failed:", err);
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section id="contact" style={{ background: CONFIG.sectionBg.contact, padding: "100px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="grid-responsive">
          <div>
            <SectionLabel lang={lang} en="Get In Touch" tc="聯絡我們" light />
            {/* The Contact page's top-level heading — see the note on the Demos <h1>. */}
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, margin: "16px 0 24px", letterSpacing: "-0.02em" }}>
              {txt(t.contact.heading, lang)}
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "48px" }}>
              {txt(t.contact.sub, lang)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <ContactDetail icon={<IconPhone size={18} />} label={lang === "en" ? "Phone" : "電話"} value={t.contact.phone} />
              <ContactDetail icon={<IconMail size={18} />} label={lang === "en" ? "Email" : "電郵"} value={t.contact.email} />
              <ContactDetail icon={<IconGlobe size={18} />} label={lang === "en" ? "Website" : "網站"} value={t.contact.website} />
              <ContactDetail icon={<IconMapPin size={18} />} label={lang === "en" ? "Office" : "辦公室"} value={txt(t.contact.address.display, lang)} />
            </div>
          </div>
          <div style={{ background: "#fff", padding: "48px 40px", borderRadius: "4px" }}>
            {(status === "sent" || status === "mailto") && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ color: CONFIG.accent, marginBottom: "16px", display: "flex", justifyContent: "center" }}>
                  {status === "sent" ? <IconCheckCircle size={48} /> : <IconSend size={48} />}
                </div>
                <p style={{ color: CONFIG.navBg, fontWeight: 600, fontSize: "18px" }}>
                  {txt(status === "sent" ? t.contact.sent_endpoint_heading : t.contact.sent_mailto_heading, lang)}
                </p>
                <p style={{ color: "#6B7280", fontSize: "14px" }}>
                  {txt(status === "sent" ? t.contact.sent_endpoint_body : t.contact.sent_mailto_body, lang)}
                </p>
                <button onClick={() => setStatus("idle")} style={{ marginTop: "20px", background: CONFIG.accent, color: "#fff", border: "none", padding: "10px 24px", borderRadius: "3px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                  {txt(t.contact.send_another, lang)}
                </button>
              </div>
            )}
            {status === "error" && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ color: "#B91C1C", marginBottom: "16px", display: "flex", justifyContent: "center" }}>
                  <IconAlertTriangle size={48} />
                </div>
                <p style={{ color: "#B91C1C", fontWeight: 600, fontSize: "18px" }}>{txt(t.contact.error_heading, lang)}</p>
                <p style={{ color: "#6B7280", fontSize: "14px" }}>{txt(t.contact.error_body, lang)}</p>
                <button onClick={() => setStatus("idle")} style={{ marginTop: "20px", background: CONFIG.accent, color: "#fff", border: "none", padding: "10px 24px", borderRadius: "3px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                  {txt(t.contact.try_again, lang)}
                </button>
              </div>
            )}
            {(status === "idle" || status === "sending") && (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {(["name", "email"] as const).map(field => (
                  <div key={field}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
                      {txt(t.contact[`form_${field}` as "form_name" | "form_email"], lang)}
                    </label>
                    <input type={field === "email" ? "email" : "text"} required disabled={sending} value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #D1D5DB", borderRadius: "3px", fontSize: "15px", outline: "none", fontFamily: "var(--font-sans)", transition: "border-color 0.2s, box-shadow 0.2s", opacity: sending ? 0.6 : 1 }}
                      onFocus={e => { e.currentTarget.style.borderColor = CONFIG.accent; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,80,204,0.15)`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
                    {txt(t.contact.form_message, lang)}
                  </label>
                  <textarea required rows={5} disabled={sending} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #D1D5DB", borderRadius: "3px", fontSize: "15px", outline: "none", fontFamily: "var(--font-sans)", resize: "vertical", transition: "border-color 0.2s, box-shadow 0.2s", opacity: sending ? 0.6 : 1 }}
                    onFocus={e => { e.currentTarget.style.borderColor = CONFIG.accent; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,80,204,0.15)`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <button type="submit" disabled={sending} aria-busy={sending} style={{ background: CONFIG.accent, color: "#fff", border: "none", padding: "14px 32px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", borderRadius: "3px", cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1, transition: "background 0.2s, opacity 0.2s", alignSelf: "flex-start" }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.background = CONFIG.accentHover; }}
                  onMouseLeave={e => { if (!sending) e.currentTarget.style.background = CONFIG.accent; }}>
                  {sending ? txt(t.contact.form_sending, lang) : txt(t.contact.form_send, lang)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page wrappers — one per nav item
// ─────────────────────────────────────────────────────────────────────────────
function HomePage({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  return (
    <>
      <HeroSection lang={lang} setPage={setPage} />
      <QuickLinksSection lang={lang} setPage={setPage} />
      <PartnersSection lang={lang} />
    </>
  );
}

function AboutPage({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  return (
    <PageShell lang={lang} onBack={onBack}>
      <AboutCompanySection lang={lang} />
      <RoadmapSection lang={lang} />
      <FounderSection lang={lang} />
    </PageShell>
  );
}

function ServicesPage({ lang, onBack, setPage }: { lang: Lang; onBack: () => void; setPage: (p: Page) => void }) {
  return (
    <PageShell lang={lang} onBack={onBack}>
      <ServicesSection lang={lang} setPage={setPage} />
    </PageShell>
  );
}

// ── Facility Maintenance / 場地保養 — its own indexable page ──────────────────
// Same block as the one on the Services page, but promoted to a standalone URL
// with its own <h1> and <title> so the phrase people actually search for has a
// document to rank. Copy still comes from facilityMaintenance/content.json —
// nothing is duplicated here.
function FacilityMaintenancePage({ lang, onBack, setPage }: { lang: Lang; onBack: () => void; setPage: (p: Page) => void }) {
  const cfg = facilityMaintenanceConfig;
  return (
    <PageShell lang={lang} onBack={onBack}>
      <section style={{ background: CONFIG.sectionBg.services, padding: "80px 32px 100px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <nav aria-label={lang === "en" ? "Breadcrumb" : "頁面路徑"} style={{ fontSize: "13px", color: "#6B7280", marginBottom: "24px" }}>
            <RouteLink to={{ page: "services", lang, projectId: null }}
              onNavigate={() => { log.event("Breadcrumb → services"); setPage("services"); }}
              style={{ color: CONFIG.accent, fontWeight: 600 }}>
              {txt(t.nav.services, lang)}
            </RouteLink>
            <span aria-hidden="true" style={{ margin: "0 8px", color: "#9CA3AF" }}>/</span>
            <span>{txt(cfg.label, lang)}</span>
          </nav>

          {/* Headline role, sized to match the All-Projects page <h1> — the
              other standalone page heading in DESIGN.md's hierarchy. */}
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.2, margin: "0 0 20px", letterSpacing: "-0.02em", maxWidth: "20ch" }}>
            {txt(cfg.heading, lang)}
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#4B5563", margin: 0, maxWidth: "68ch" }}>
            {txt(cfg.sub, lang)}
          </p>

          <FacilityMaintenanceBlock
            lang={lang}
            accent={CONFIG.accent}
            accentHover={CONFIG.accentHover}
            onContact={() => setPage("contact")}
            omitIntro
          />
        </div>
      </section>
    </PageShell>
  );
}

// ── Service landing page template — one indexable page per service ───────────
// Used by every entry in SERVICE_LANDINGS (src/routes.ts): Funding Consulting,
// Engineering & Process Enhancement, and any service added later. Copy lives in
// t.services.<name>Page; the matching Services-page card links here.
function ServiceLandingPage({ lang, content: fp, onBack, setPage }: { lang: Lang; content: ServiceLandingContent; onBack: () => void; setPage: (p: Page) => void }) {
  const h2Style: CSSProperties = { fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.25, margin: "0 0 28px", letterSpacing: "-0.01em" };
  const h3Style: CSSProperties = { fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 600, color: "#001A4A", lineHeight: 1.3, margin: "0 0 12px" };
  const bodyStyle: CSSProperties = { fontSize: "15px", lineHeight: 1.75, color: "#4B5563", margin: 0 };
  return (
    <PageShell lang={lang} onBack={onBack}>
      <section style={{ background: CONFIG.sectionBg.services, padding: "80px 32px 100px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <nav aria-label={lang === "en" ? "Breadcrumb" : "頁面路徑"} style={{ fontSize: "13px", color: "#6B7280", marginBottom: "24px" }}>
            <RouteLink to={{ page: "services", lang, projectId: null }}
              onNavigate={() => { log.event("Breadcrumb → services"); setPage("services"); }}
              style={{ color: CONFIG.accent, fontWeight: 600 }}>
              {txt(t.nav.services, lang)}
            </RouteLink>
            <span aria-hidden="true" style={{ margin: "0 8px", color: "#9CA3AF" }}>/</span>
            <span>{txt(fp.label, lang)}</span>
          </nav>

          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.2, margin: "0 0 20px", letterSpacing: "-0.02em", maxWidth: "22ch" }}>
            {txt(fp.heading, lang)}
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#4B5563", margin: "0 0 72px", maxWidth: "68ch" }}>
            {txt(fp.intro, lang)}
          </p>

          <h2 style={h2Style}>{txt(fp.audienceHeading, lang)}</h2>
          <div style={{ display: "grid", gridTemplateColumns: fp.audiences.length > 1 ? "repeat(2, 1fr)" : "minmax(0, 720px)", gap: "24px", marginBottom: "72px" }} className="grid-responsive">
            {fp.audiences.map((a, i) => (
              <div key={i} style={{ background: CONFIG.sectionBg.about, borderTop: `3px solid ${CONFIG.accent}`, padding: "32px" }}>
                <h3 style={h3Style}>{txt(a.title, lang)}</h3>
                <p style={bodyStyle}>{txt(a.body, lang)}</p>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>{txt(fp.stepsHeading, lang)}</h2>
          <ol style={{ listStyle: "none", padding: 0, margin: "0 0 72px", display: "grid", gridTemplateColumns: `repeat(${fp.steps.length === 3 ? 3 : 2}, 1fr)`, gap: "40px 48px" }} className="grid-responsive">
            {fp.steps.map((step, i) => (
              <li key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span aria-hidden="true" style={{ fontSize: "13px", fontWeight: 600, color: CONFIG.accent, letterSpacing: "0.1em", paddingTop: "5px", minWidth: "24px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 style={h3Style}>{txt(step.title, lang)}</h3>
                  <p style={bodyStyle}>{txt(step.body, lang)}</p>
                </div>
              </li>
            ))}
          </ol>

          <div style={{ background: CONFIG.navBg, padding: "48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ maxWidth: "520px" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 700, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                {txt(fp.ctaHeading, lang)}
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>
                {txt(fp.ctaBody, lang)}
              </p>
            </div>
            <RouteLink to={{ page: "contact", lang, projectId: null }}
              onNavigate={() => { log.event("Service landing → contact"); setPage("contact"); }}
              style={{ background: CONFIG.accent, color: "#fff", padding: "14px 32px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", borderRadius: "3px", whiteSpace: "nowrap" }}>
              {txt(fp.ctaButton, lang)}
            </RouteLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function DemosPage({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  return (
    <PageShell lang={lang} onBack={onBack}>
      <LiveDemoSection lang={lang} />
    </PageShell>
  );
}

function ContactPage({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  return (
    <PageShell lang={lang} onBack={onBack}>
      <ContactSection lang={lang} />
    </PageShell>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ lang, onOpenLegal }: { lang: Lang; onOpenLegal: (type: LegalType) => void }) {
  // Social links — no real profiles are wired up yet (see PRODUCT.md). Set a
  // real href to activate a link; until then it renders muted and inert
  // rather than looking clickable.
  const socials = [
    { label: "LinkedIn",  href: SOCIAL_PROFILES.linkedin,  icon: <IconLinkedIn  size={18} /> },
    { label: "Facebook",  href: "",  icon: <IconFacebook  size={18} /> },
    { label: "Instagram", href: "",  icon: <IconInstagram size={18} /> },
  ];

  return (
    <footer style={{ background: CONFIG.sectionBg.footer, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", marginBottom: "24px" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", margin: "0 0 4px" }}>
              {txt(t.footer.rights, lang)}
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>
              {t.footer.domain}
            </p>
          </div>
          {/* Social icons — muted and inert until a real profile URL is set above */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {socials.map(s => s.href ? (
              <a key={s.label} href={s.href} title={s.label} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.6)", transition: "opacity 0.2s", opacity: 1 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                {s.icon}
              </a>
            ) : (
              <span key={s.label} aria-disabled="true" title={lang === "en" ? `${s.label} — coming soon` : `${s.label} — 即將推出`}
                style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.6)", opacity: 0.35, cursor: "not-allowed" }}>
                {s.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row — legal links */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <button onClick={() => { log.event("Legal modal: terms"); onOpenLegal("terms"); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-sans)", padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            {txt(t.legal.terms_link, lang)}
          </button>
          <button onClick={() => { log.event("Legal modal: privacy"); onOpenLegal("privacy"); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-sans)", padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            {txt(t.legal.privacy_link, lang)}
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS PAGE — full list of all projects
// ─────────────────────────────────────────────────────────────────────────────
function AllProjectsPage({ lang, onBack, onOpenProject }: { lang: Lang; onBack: () => void; onOpenProject: (id: number) => void }) {
  const [filterTag, setFilterTag] = useState<string>("all");

  // Collect unique tags, keeping both languages so the filter tabs stay bilingual
  const uniqueTags = Array.from(new Map(t.projects.items.map(p => [p.tag.en, p.tag])).values());

  const filtered = filterTag === "all"
    ? t.projects.items
    : t.projects.items.filter(p => p.tag.en === filterTag);

  return (
    <div>
      {/* Page header */}
      <div style={{ background: CONFIG.navBg, padding: "40px 32px 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <button onClick={() => { log.event("Back to home from Projects"); onBack(); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginBottom: "32px", padding: 0, fontFamily: "var(--font-sans)" }}>
            {txt(t.nav.back, lang)}
          </button>
          <SectionLabel lang={lang} en="Our Work" tc="我們的工作" light />
          <h1 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, margin: "16px 0 16px", letterSpacing: "-0.02em" }}>
            {txt(t.projects.all_heading, lang)}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            {txt(t.projects.all_sub, lang)}
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 32px 4px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", gap: "0", overflowX: "auto" }}>
          <button key="all" onClick={() => { log.event("Projects filter:", "all"); setFilterTag("all"); }}
            style={{
              background: "none", border: "none", padding: "16px 20px", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font-sans)",
              color: filterTag === "all" ? CONFIG.accent : "#6B7280",
              borderBottom: filterTag === "all" ? `2px solid ${CONFIG.accent}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>
            {lang === "en" ? "All" : "全部"}
          </button>
          {uniqueTags.map(tag => (
            <button key={tag.en} onClick={() => { log.event("Projects filter:", tag.en); setFilterTag(tag.en); }}
              style={{
                background: "none", border: "none", padding: "16px 20px", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font-sans)",
                color: filterTag === tag.en ? CONFIG.accent : "#6B7280",
                borderBottom: filterTag === tag.en ? `2px solid ${CONFIG.accent}` : "2px solid transparent",
                transition: "all 0.2s",
              }}>
              {txt(tag, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div style={{ background: CONFIG.sectionBg.allProjects, padding: "60px 32px 100px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2 style={visuallyHidden}>{lang === "en" ? "Project list" : "項目列表"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="grid-responsive">
            {filtered.map(p => <ProjectCard key={p.id} p={p} lang={lang} onOpen={() => onOpenProject(p.id)} />)}
          </div>
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#9CA3AF", padding: "60px 0" }}>
              {lang === "en" ? "No projects found." : "找不到項目。"}
            </p>
          )}
        </div>
      </div>

      <PartnersSection lang={lang} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DETAIL PAGE — one project's deliverables.
// The header is real data off the same record as the card; the body is left
// deliberately blank until the per-project write-ups are supplied.
// ─────────────────────────────────────────────────────────────────────────────
function ProjectDetailPage({ lang, projectId, onBack }: { lang: Lang; projectId: number; onBack: () => void }) {
  const p = t.projects.items.find(item => item.id === projectId);

  if (!p) {
    return (
      <div style={{ background: CONFIG.sectionBg.allProjects, padding: "100px 32px", textAlign: "center" }}>
        <p style={{ color: "#6B7280", margin: "0 0 24px" }}>
          {lang === "en" ? "Project not found." : "找不到此項目。"}
        </p>
        <button onClick={onBack}
          style={{ background: "none", border: "none", color: CONFIG.accent, fontSize: "14px", fontWeight: 600, cursor: "pointer", padding: 0, fontFamily: "var(--font-sans)" }}>
          {txt(t.projects.back_to_projects, lang)}
        </button>
      </div>
    );
  }

  const real = p.featured;

  return (
    <div>
      {/* Page header */}
      <div style={{ background: CONFIG.navBg, padding: "40px 32px 60px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <button onClick={() => { log.event("Back to Projects from detail:", p.id); onBack(); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginBottom: "32px", padding: 0, fontFamily: "var(--font-sans)" }}>
            {txt(t.projects.back_to_projects, lang)}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
            <span style={{ display: "inline-block", background: "rgba(0,80,204,0.22)", color: "#fff", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px" }}>
              {txt(p.tag, lang)}
            </span>
            {!real && (
              <span style={{ display: "inline-block", color: "rgba(255,255,255,0.55)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.25)" }}>
                {txt(t.projects.illustrative_badge, lang)}
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 700, margin: "0 0 18px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {txt(p.title, lang)}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "16px", lineHeight: 1.7, margin: "0 0 24px", maxWidth: "62ch" }}>
            {txt(p.desc, lang)}
          </p>
          <div style={{ display: "inline-block", fontSize: "13px", fontWeight: 700, color: "#fff", background: "rgba(0,80,204,0.35)", padding: "6px 12px", borderRadius: "2px" }}>
            {real ? "\u2713 " : ""}{txt(p.result, lang)}
          </div>
        </div>
      </div>

      {/* Deliverables — awaiting the real write-up */}
      <div style={{ background: CONFIG.sectionBg.allProjects, padding: "72px 32px 100px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <SectionLabel lang={lang} en="Deliverables" tc="交付成果" />
          <div style={{ background: "#fff", border: "1px dashed #D1D5DB", padding: "56px 40px", marginTop: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#6B7280", margin: "0 auto", maxWidth: "56ch" }}>
              {txt(t.projects.detail_pending, lang)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Partners scrolling strip
// ─────────────────────────────────────────────────────────────────────────────

// Fallback text plate uses the same gray tint as illustrative project cards —
// per the Evidence-Tint Rule, an unconfirmed logo file reads as "not yet
// verified," not as a per-partner brand color.
const PARTNER_FALLBACK = { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };

function PartnersSection({ lang }: { lang: Lang }) {
  // Duplicate the list so the CSS scroll loop appears seamless
  const items = [...t.partners.items, ...t.partners.items];

  return (
    <section style={{ background: "#fff", padding: "80px 0", borderTop: "1px solid #E5E7EB" }}>
      {/* Inject keyframe animation once */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
          display: flex;
          gap: 20px;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", marginBottom: "40px", textAlign: "center" }}>
        <SectionLabel lang={lang} en="Our Partners & Affiliations" tc="合作夥伴及聯繫機構" />
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#001A4A", margin: "16px auto 8px", letterSpacing: "-0.02em" }}>
          {txt(t.partners.heading, lang)}
        </h2>
        <p style={{ fontSize: "15px", color: "#6B7280", margin: "0 auto", maxWidth: "560px" }}>
          {txt(t.partners.sub, lang)}
        </p>
      </div>

      {/* Scrolling strip — overflow hidden on the outer div creates the "window" */}
      <div style={{ overflow: "hidden", padding: "8px 0" }}>
        <div className="marquee-track">
          {items.map((partner, i) => {
            const colors = PARTNER_FALLBACK;
            // Check if a logo file path is set — use image if yes, styled text plate if no
            const hasLogo = partner.imgUrl && partner.imgUrl.length > 0;
            return (
              <div key={`${partner.id}-${i}`}
                style={{
                  flexShrink: 0,
                  width: "200px",
                  height: "100px",
                  padding: "16px 20px",
                  background: hasLogo ? "#ffffff" : colors.bg,
                  border: `1.5px solid ${hasLogo ? "#E5E7EB" : colors.border}`,
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "default",
                }}>
                {hasLogo ? (
                  // Real logo image — loads from /logos/ folder in public/
                  <img
                    src={asset(partner.imgUrl)}
                    alt={partner.name}
                    style={{ maxWidth: "140px", maxHeight: "52px", objectFit: "contain" }}
                    onError={e => {
                      // If the image fails to load, hide it and show the text fallback
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      const fallback = el.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "block";
                    }}
                  />
                ) : null}
                {/* Fallback text plate — visible when no imgUrl or image fails */}
                <div style={{ display: hasLogo ? "none" : "block", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: colors.text, letterSpacing: "-0.01em", marginBottom: "4px", fontFamily: "var(--font-sans)" }}>
                    {partner.shortName}
                  </div>
                  <div style={{ fontSize: "10px", color: "#9CA3AF", lineHeight: 1.4 }}>
                    {txt(partner.desc, lang)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Affiliation disclaimer — sits under the logos it qualifies, quiet
          enough not to compete with them but legible on its own. */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 32px 0" }}>
        <p style={{
          fontSize: "12px", fontStyle: "italic", color: "#6B7280",
          lineHeight: 1.65, margin: "0 auto", maxWidth: "760px", textAlign: "center",
        }}>
          {txt(t.partners.disclaimer, lang)}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Legal modal (Terms of Use / Privacy Policy)
// ─────────────────────────────────────────────────────────────────────────────
type LegalType = "terms" | "privacy" | null;

function LegalModal({ type, lang, onClose }: { type: LegalType; lang: Lang; onClose: () => void }) {
  useEffect(() => {
    if (type) {
      log.event("Legal modal opened:", type);
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [type]);

  if (!type) return null;
  const data = type === "terms" ? t.legal.terms : t.legal.privacy;

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "40px 16px" }}>
      {/* Modal panel — stop click bubbling so clicking the panel doesn't close it */}
      <div onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: "4px", maxWidth: "720px", width: "100%", padding: "56px 48px", position: "relative" }}>
        {/* Close button */}
        <button onClick={onClose} aria-label={lang === "en" ? "Close" : "關閉"}
          style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", lineHeight: 0, padding: "4px" }}>
          <IconClose size={22} />
        </button>

        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "30px", fontWeight: 700, color: "#001A4A", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          {txt(data.heading, lang)}
        </h2>
        <p style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "36px" }}>
          {txt(data.updated, lang)}
        </p>

        {data.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: "28px" }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "#374151", margin: "0 0 8px", letterSpacing: "0.01em" }}>
              {txt(s.title, lang)}
            </h3>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4B5563", margin: 0 }}>
              {txt(s.body, lang)}
            </p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "24px", marginTop: "8px" }}>
          <button onClick={onClose}
            style={{ background: CONFIG.accent, color: "#fff", border: "none", padding: "12px 28px", borderRadius: "3px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
            {lang === "en" ? "Close" : "關閉"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root App
// ─────────────────────────────────────────────────────────────────────────────
/**
 * `initialRoute` is supplied by src/entry-server.tsx when the build prerenders
 * a page; in the browser it is omitted and the route comes from the URL. Both
 * paths resolve to the same route for the same URL, which is what lets
 * hydration match the prerendered markup.
 */
export default function App({ initialRoute }: { initialRoute?: Route } = {}) {
  const [route, setRoute] = useState<Route>(() => initialRoute ?? currentRoute());
  const [legalOpen, setLegalOpen] = useState<LegalType>(null);

  const { lang, page, projectId } = route;

  // The path is the source of truth: every page is a real, bookmarkable,
  // shareable URL that the server answers with prerendered HTML. Navigation
  // pushes history and swaps the rendered page without a reload.
  const navigate = (next: Route, { replace = false } = {}) => {
    const href = routeHref(next);
    if (typeof window !== "undefined" && window.location.pathname !== href) {
      window.history[replace ? "replaceState" : "pushState"](null, "", href);
    }
    setRoute(next);
  };

  useEffect(() => {
    const onPopState = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Legacy hash links (#services, #projects/3) were the only URLs this site had
  // before paths existed, so they may still be in bookmarks and other people's
  // pages. Rewrite them to the real path once, on load, rather than silently
  // dropping the visitor on the home page.
  useEffect(() => {
    const legacy = routeFromLegacyHash(window.location.hash, route.lang);
    if (!legacy) return;
    log.info("Redirecting legacy hash URL →", routeHref(legacy));
    navigate(legacy, { replace: true });
  }, []);

  const setPage  = (p: Page)  => navigate({ page: p, lang, projectId: null });
  const setLang  = (l: Lang)  => navigate({ ...route, lang: l });
  const openProject = (id: number) => {
    log.event("Open project detail:", id);
    navigate({ page: "projects", lang, projectId: id });
  };

  useEffect(() => { log.info("3form Co website initialised. Language:", lang); }, []);

  // Keep the document head in step with client-side navigation. The prerendered
  // HTML already carries the right tags for the first page a visitor lands on;
  // this is what keeps them correct after an in-app navigation, for renderers
  // that execute JS and for the browser tab / share sheet.
  useEffect(() => {
    const meta = routeMeta(route);
    document.title = meta.title;
    document.documentElement.lang = meta.htmlLang;
    setHeadMeta("name", "description", meta.description);
    setHeadMeta("property", "og:title", meta.title);
    setHeadMeta("property", "og:description", meta.description);
    setHeadMeta("property", "og:url", meta.canonical);
    setHeadLink("canonical", meta.canonical);
  }, [route]);

  useEffect(() => { log.info("Page →", page); window.scrollTo({ top: 0 }); }, [page, projectId]);

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile   { display: none !important; }
          .show-mobile     { display: block !important; }
          .grid-responsive { grid-template-columns: 1fr !important; gap: 40px !important; }
          .services-grid   { grid-template-columns: 1fr !important; }
          .roadmap-track     { flex-direction: column !important; gap: 40px !important; }
          .roadmap-step      { align-items: flex-start !important; text-align: left !important; padding: 0 !important; }
          .roadmap-connector { display: none !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      <Navbar route={route} setLang={setLang} setPage={setPage} />

      <main style={{ paddingTop: CONFIG.navHeight }}>
        {page === "home"     && <HomePage     lang={lang} setPage={setPage} />}
        {page === "about"    && <AboutPage    lang={lang} onBack={() => setPage("home")} />}
        {page === "services" && <ServicesPage lang={lang} onBack={() => setPage("home")} setPage={setPage} />}
        {page === "facilityMaintenance" && <FacilityMaintenancePage lang={lang} onBack={() => setPage("home")} setPage={setPage} />}
        {SERVICE_LANDINGS[page] && <ServiceLandingPage lang={lang} content={SERVICE_LANDINGS[page]!.content} onBack={() => setPage("home")} setPage={setPage} />}
        {page === "projects" && (projectId !== null
          ? <ProjectDetailPage  lang={lang} projectId={projectId} onBack={() => setPage("projects")} />
          : <AllProjectsPage    lang={lang} onBack={() => setPage("home")} onOpenProject={openProject} />
        )}
        {page === "demos"    && <DemosPage    lang={lang} onBack={() => setPage("home")} />}
        {page === "contact"  && <ContactPage  lang={lang} onBack={() => setPage("home")} />}
      </main>

      <Footer lang={lang} onOpenLegal={setLegalOpen} />

      {/* Legal modals — rendered above everything */}
      <LegalModal type={legalOpen} lang={lang} onClose={() => setLegalOpen(null)} />
    </>
  );
}
