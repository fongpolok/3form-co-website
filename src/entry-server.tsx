// ─────────────────────────────────────────────────────────────────────────────
// entry-server.tsx — the SSR entry Vite builds for the prerender step.
//
// `vite build --ssr src/entry-server.tsx` compiles this into a Node-loadable
// bundle; scripts/prerender/ then imports it, renders every route in
// ALL_ROUTES, and writes one static HTML file per route into dist/.
//
// It is also the only bridge between the TypeScript app and the plain-.mjs
// build script, so it re-exports the route table and metadata helpers rather
// than having the script duplicate any of them.
// ─────────────────────────────────────────────────────────────────────────────

import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { structuredDataFor } from "./structuredData";
import { ALL_ROUTES, routeMeta, routePath, routeUrl, sitemapPriority, SITE_ORIGIN, type Route } from "./routes";

/** Render one route to the HTML string that goes inside <div id="root">. */
export function renderRoute(route: Route): string {
  // StrictMode here mirrors src/main.tsx so the server and client trees match.
  return renderToString(
    <StrictMode>
      <App initialRoute={route} />
    </StrictMode>,
  );
}

export { ALL_ROUTES, routeMeta, routePath, routeUrl, sitemapPriority, structuredDataFor, SITE_ORIGIN };
