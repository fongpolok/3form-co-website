// ─────────────────────────────────────────────────────────────────────────────
// analytics.ts — one SSR-safe entry point for GA4 events.
//
// The gtag loader is already injected into every page by the
// figmaSiteConfiguration plugin in vite.config.ts, from the
// `analytics.googleAnalyticsId` (G-8XY75DG091) in .figma/make/site.json — so
// this module adds no loader of its own. It never assumes it loaded: during SSR
// and prerender there is no `window` at all, and a visitor with an ad blocker
// has a `window` but no `gtag`. Both cases are no-ops here rather than a crash
// in the middle of a render.
//
// Every event also lands in window.dataLayer as a deterministic object, so a
// Tag Manager container (or a debug console) sees the same payload gtag does.
// ─────────────────────────────────────────────────────────────────────────────

/** The only event names this site sends. Keep this list closed — GA4 reports key off it. */
export type TrackEvent =
  | "email_click"
  | "whatsapp_click"
  | "wechat_click"
  | "tel_click";

export type TrackParams = {
  /** The href the visitor activated (mailto:, tel:, wa.me, …). */
  link_url?: string;
  /** Where on the site the action was: "contact_page", "footer", "floating", … */
  placement: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Send one GA4 event. Contact-detail interactions only — never form contents:
 * names, email addresses and message bodies stay between the visitor and us.
 */
export function track(event: TrackEvent, params: TrackParams): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...params };

  // dataLayer is a plain array until gtag.js adopts it, so pushing is always safe.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

/**
 * Copy text to the clipboard. Returns whether it worked, so the caller can show
 * bilingual feedback either way. The async Clipboard API needs a secure context
 * and is missing in older in-app browsers, hence the execCommand fallback.
 */
export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path below.
    }
  }
  if (typeof document === "undefined") return false;
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}
