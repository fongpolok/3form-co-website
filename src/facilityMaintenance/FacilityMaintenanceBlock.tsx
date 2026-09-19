import { useEffect, type ReactNode } from "react";
import { t, txt, type Lang } from "../translations";
import { facilityMaintenanceConfig as cfg } from "./config";
import { facilityLog } from "./logger";

type Props = {
  lang: Lang;
  accent: string;
  accentHover: string;
  /** Navigates to the Contact page (App's setPage("contact")). */
  onContact: () => void;
  /**
   * Skip the label/heading/intro paragraph. Set on the dedicated
   * /services/facility-maintenance/ page, which renders that copy itself as
   * the page <h1> — repeating it here would duplicate the heading in the
   * document outline and in the indexed text.
   */
  omitIntro?: boolean;
  /** Extra link rendered beside the CTA (Services page → the full landing page). */
  secondaryAction?: ReactNode;
};

// "5744 9594" → "tel:+85257449594" (Hong Kong numbers are 8 digits, no area code)
const telHref = `tel:+852${t.contact.phone.replace(/\D/g, "")}`;

/**
 * Facility Maintenance / 場地保養 block on the Services page.
 * Premises (HVAC, electrical, office equipment, FIFO production line layout) — not the production-equipment
 * "General Maintenance & Repair" card. Copy lives in content.json.
 */
export default function FacilityMaintenanceBlock({ lang, accent, accentHover, onContact, omitIntro = false, secondaryAction }: Props) {
  // Keep the document outline contiguous in both placements: on the Services
  // page the block's own heading is an <h2> under that page's <h1>, so its
  // subheadings are <h3>; on its own page the page supplies the <h1> and the
  // block starts at <h2>.
  const CategoryHeading = omitIntro ? "h2" : "h3";
  const CtaHeading = omitIntro ? "h2" : "h3";

  useEffect(() => {
    if (!cfg.enabled) {
      facilityLog.info("block disabled via config");
      return;
    }
    if (cfg.categories.length === 0) facilityLog.warn("block enabled but every category is disabled");
    facilityLog.info("block rendered", { lang, categories: cfg.categories.map((c) => c.id) });
  }, [lang]);

  if (!cfg.enabled || cfg.categories.length === 0) return null;

  return (
    <div id={cfg.sectionId} style={{ margin: "48px 0", borderTop: `3px solid ${accent}`, background: "#F8FAFF" }}>
      <style>{`
        @media (max-width: 900px) {
          .fm-cat-grid { grid-template-columns: 1fr !important; }
          .fm-pad { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>

      <div className="fm-pad" style={{ padding: "48px 40px 40px" }}>
        {!omitIntro && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "2px", background: accent }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent }}>
                {txt(cfg.label, lang)}
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: "#001A4A", lineHeight: 1.3, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              {txt(cfg.heading, lang)}
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#4B5563", margin: "0 0 20px", maxWidth: "68ch" }}>
              {txt(cfg.sub, lang)}
            </p>
          </>
        )}

        {/* Who it is for */}
        <ul aria-label={lang === "en" ? "Suitable for" : "適用場地"} style={{ display: "flex", flexWrap: "wrap", gap: "8px", listStyle: "none", padding: 0, margin: "0 0 32px" }}>
          {cfg.audiences.map((a) => (
            <li key={a.id} style={{ fontSize: "12px", fontWeight: 600, color: accent, background: "#E8F0FE", padding: "5px 12px", borderRadius: "2px" }}>
              {txt(a.label, lang)}
            </li>
          ))}
        </ul>

        <div className="fm-cat-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${cfg.categories.length === 4 ? 2 : Math.min(cfg.categories.length, 3)}, 1fr)`, gap: "2px", background: "#E5E7EB" }}>
          {cfg.categories.map((cat, i) => (
            <div key={cat.id} style={{ background: "#fff", padding: "28px 24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: accent, letterSpacing: "0.1em", marginBottom: "10px" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <CategoryHeading style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 700, color: "#001A4A", lineHeight: 1.3, margin: "0 0 14px" }}>
                {txt(cat.title, lang)}
              </CategoryHeading>
              <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {cat.points.map((p, j) => (
                  <li key={j} style={{ fontSize: "14px", lineHeight: 1.7, color: "#4B5563" }}>
                    {txt(p, lang)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#6B7280", margin: "20px 0 0", maxWidth: "68ch" }}>
          {txt(cfg.distinctionNote, lang)}
        </p>
      </div>

      {/* Block-level CTA — kept light so it doesn't stack against the navy Services CTA below */}
      <div className="fm-pad" style={{ borderTop: "1px solid #E5E7EB", padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ maxWidth: "560px" }}>
          <CtaHeading style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 700, color: "#001A4A", margin: "0 0 6px" }}>
            {txt(cfg.cta.heading, lang)}
          </CtaHeading>
          <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.65, margin: "0 0 6px" }}>
            {txt(cfg.cta.sub, lang)}
          </p>
          <p style={{ fontSize: "14px", color: "#374151", margin: 0 }}>
            <a href={telHref} onClick={() => facilityLog.event("phone link")} style={{ color: accent, fontWeight: 600, textDecoration: "none" }}>
              {t.contact.phone}
            </a>
            <span aria-hidden="true" style={{ color: "#9CA3AF", margin: "0 10px" }}>·</span>
            <a href={`mailto:${t.contact.email}`} onClick={() => facilityLog.event("email link")} style={{ color: accent, fontWeight: 600, textDecoration: "none" }}>
              {t.contact.email}
            </a>
          </p>
        </div>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          {secondaryAction}
          <button type="button"
            onClick={() => { facilityLog.event("CTA → contact"); onContact(); }}
            style={{ background: accent, color: "#fff", border: "none", padding: "14px 28px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", borderRadius: "3px", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = accentHover)}
            onMouseLeave={e => (e.currentTarget.style.background = accent)}>
            {txt(cfg.cta.button, lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
