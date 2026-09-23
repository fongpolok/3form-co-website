// ─────────────────────────────────────────────────────────────────────────────
// structuredData.ts — JSON-LD emitted into each prerendered page's <head>.
//
// Plain HTML tells a search engine what the page says; schema.org tells it what
// the page *is*. That is what makes a Contact page eligible to surface a phone
// number and a Service page eligible to surface as a local service rather than
// as generic prose. Built from the same translations and content.json the page
// renders, so the markup can never drift from the visible text.
// ─────────────────────────────────────────────────────────────────────────────

import { t, txt } from "./translations";
import { facilityMaintenanceConfig } from "./facilityMaintenance/config";
import { HTML_LANG, SITE_NAME, SITE_ORIGIN, SOCIAL_PROFILES, routeUrl, type Route } from "./routes";

/** "5744 9594" → "+85257449594" — Hong Kong numbers are 8 digits, no area code. */
const TEL = `+852${t.contact.phone.replace(/\D/g, "")}`;

function organization(route: Route): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    alternateName: "3form Co",
    url: SITE_ORIGIN,
    description: txt(t.about.company_body, route.lang),
    // Google shows this logo on a white background, so it must not be the
    // white-on-transparent mark the navy site header uses (logo.white.png).
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/logo.navy.png`,
      width: 512,
      height: 512,
    },
    sameAs: Object.values(SOCIAL_PROFILES),
    email: t.contact.email,
    telephone: TEL,
    areaServed: { "@type": "Place", name: "Hong Kong" },
    address: { "@type": "PostalAddress", addressCountry: "HK", addressLocality: "Hong Kong" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: TEL,
      email: t.contact.email,
      areaServed: "HK",
      availableLanguage: ["en", "zh-HK"],
    },
  };
}

function breadcrumbs(route: Route): Record<string, unknown> | null {
  if (route.page === "home") return null;

  const trail: { name: string; route: Route }[] = [
    { name: txt(t.nav.home, route.lang), route: { page: "home", lang: route.lang, projectId: null } },
  ];

  if (route.page === "facilityMaintenance") {
    trail.push({ name: txt(t.nav.services, route.lang), route: { page: "services", lang: route.lang, projectId: null } });
    trail.push({ name: txt(facilityMaintenanceConfig.label, route.lang), route });
  } else if (route.projectId !== null) {
    const project = t.projects.items.find((p) => p.id === route.projectId);
    trail.push({ name: txt(t.nav.projects, route.lang), route: { page: "projects", lang: route.lang, projectId: null } });
    if (project) trail.push({ name: txt(project.title, route.lang), route });
  } else {
    const label = t.nav[route.page as keyof typeof t.nav] as { en: string; tc: string } | undefined;
    if (!label) return null;
    trail.push({ name: txt(label, route.lang), route });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: routeUrl(step.route),
    })),
  };
}

/** The Facility Maintenance landing page — the page this SEO work targets. */
function facilityMaintenanceService(route: Route): Record<string, unknown> {
  const cfg = facilityMaintenanceConfig;
  return {
    "@type": "Service",
    "@id": `${routeUrl(route)}#service`,
    serviceType: txt(cfg.label, route.lang),
    name: txt(cfg.heading, route.lang),
    description: txt(cfg.sub, route.lang),
    provider: { "@id": `${SITE_ORIGIN}/#organization` },
    areaServed: { "@type": "Place", name: "Hong Kong" },
    audience: cfg.audiences.map((a) => ({ "@type": "Audience", audienceType: txt(a.label, route.lang) })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: txt(cfg.label, route.lang),
      itemListElement: cfg.categories.map((cat) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: txt(cat.title, route.lang),
          description: cat.points.map((p) => txt(p, route.lang)).join(" "),
        },
      })),
    },
  };
}

/** Every service card on the Services page, as a catalogue. */
function servicesCatalog(route: Route): Record<string, unknown> {
  return {
    "@type": "OfferCatalog",
    name: txt(t.services.heading, route.lang),
    itemListElement: t.services.items.map((svc) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: txt(svc.title, route.lang),
        description: txt(svc.detail, route.lang),
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
      },
    })),
  };
}

/**
 * The full `@graph` for a route, ready to be serialised into a single
 * <script type="application/ld+json"> tag.
 */
export function structuredDataFor(route: Route): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [organization(route)];

  if (route.page === "home") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: SITE_NAME,
      inLanguage: HTML_LANG[route.lang],
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    });
  }

  if (route.page === "facilityMaintenance") graph.push(facilityMaintenanceService(route));
  if (route.page === "services") graph.push(servicesCatalog(route));

  if (route.page === "contact") {
    graph.push({
      "@type": "ContactPage",
      "@id": `${routeUrl(route)}#contactpage`,
      url: routeUrl(route),
      name: txt(t.contact.heading, route.lang),
      inLanguage: HTML_LANG[route.lang],
      about: { "@id": `${SITE_ORIGIN}/#organization` },
    });
  }

  const crumbs = breadcrumbs(route);
  if (crumbs) graph.push(crumbs);

  return { "@context": "https://schema.org", "@graph": graph };
}
