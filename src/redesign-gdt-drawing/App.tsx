// ─────────────────────────────────────────────────────────────────────────────
// redesign-gdt-drawing/App.tsx — 3form Co, full redesign
// World: Engineering Drawing Title Block (drafting-ink line, GD&T tolerance
// frames, revision-table ruling, "APPROVED" / "NOT FOR CONSTRUCTION" stamps
// for the Evidence-Tint distinction). See redesign.html's opening comment
// for the direction contract. Product truth (copy, service lines, projects,
// demos, bilingual text) is imported straight from the shipping
// translations.ts — only the visual system changes here. English only for
// this exploration; bilingual parity would need to be added before this
// could ship, per PRODUCT.md's non-negotiable EN/TC requirement.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, type ReactNode } from "react";
import { t, type Lang } from "../translations";

const LANG: Lang = "en";
const en = <T,>(field: { en: T; tc: T }): T => field.en;

const INK = "#1B1B1B";
const PAPER = "#F4F4F2";
const PRINT_BLUE = "#0057B8";
const RULE = "#C9C9C4";
const APPROVED_GREEN = "#2E6B3E";

type Page = "home" | "about" | "services" | "projects" | "demos" | "contact";
const NAV_ITEMS: { key: Page; label: string }[] = [
  { key: "home", label: en(t.nav.home) },
  { key: "about", label: en(t.nav.about) },
  { key: "services", label: en(t.nav.services) },
  { key: "projects", label: en(t.nav.projects) },
  { key: "demos", label: en(t.nav.demos) },
  { key: "contact", label: en(t.nav.contact) },
];

// ── Shared drafting-sheet primitives ────────────────────────────────────────

function DimensionTick() {
  return (
    <svg width="100%" height="10" style={{ display: "block" }} preserveAspectRatio="none">
      <line x1="0" y1="5" x2="100%" y2="5" stroke={INK} strokeWidth="1" />
      <line x1="0" y1="0" x2="0" y2="10" stroke={INK} strokeWidth="1" />
      <line x1="100%" y1="0" x2="100%" y2="10" stroke={INK} strokeWidth="1" />
    </svg>
  );
}

function FigLabel({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ fontSize: "11px", letterSpacing: "0.08em", color: PRINT_BLUE, marginBottom: "8px", fontFamily: "'IBM Plex Mono', monospace" }}>
      FIG. {n} — {label}
    </div>
  );
}

function PageHeading({ fig, label, title, sub }: { fig: number; label: string; title: string; sub?: string }) {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 32px 40px" }}>
      <FigLabel n={fig} label={label} />
      {DimensionTick()}
      <h1
        style={{
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(30px, 3.6vw, 44px)",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          margin: "20px 0 12px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h1>
      {sub && (
        <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#3A3A38", maxWidth: "64ch", margin: 0 }}>{sub}</p>
      )}
    </div>
  );
}

// A real engineering-drawing convention: an approval stamp for finished work,
// a diagonal "NOT FOR CONSTRUCTION" watermark for preliminary/draft sheets —
// this project's own evidence-tint distinction, expressed in the world's own
// vocabulary rather than borrowed badge styling.
function EvidenceStamp({ real }: { real: boolean }) {
  if (real) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          border: `1.5px solid ${APPROVED_GREEN}`,
          color: APPROVED_GREEN,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          padding: "3px 8px",
        }}
      >
        ✓ APPROVED
      </div>
    );
  }
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1.5px dashed ${RULE}`,
        color: "#8A8A85",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        padding: "3px 8px",
      }}
    >
      NOT FOR CONSTRUCTION
    </div>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <div style={{ borderBottom: `2px solid ${INK}`, background: PAPER, position: "sticky", top: 0, zIndex: 10 }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "stretch",
        }}
        className="gdt-nav"
      >
        <button
          onClick={() => setPage("home")}
          style={{
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "none",
            border: "none",
            borderRight: `1.5px solid ${INK}`,
            cursor: "pointer",
          }}
        >
          <span style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 800, fontSize: "22px", letterSpacing: "0.02em", color: INK }}>
            3FORM CO
          </span>
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{
                padding: "16px 20px",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: page === item.key ? PRINT_BLUE : INK,
                background: "none",
                border: "none",
                borderRight: i < NAV_ITEMS.length - 1 ? `1px solid ${RULE}` : "none",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          style={{
            padding: "16px 24px",
            borderLeft: `1.5px solid ${INK}`,
            display: "flex",
            alignItems: "center",
            fontSize: "11px",
            letterSpacing: "0.06em",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          EN&nbsp;/&nbsp;TC
        </div>
      </div>
    </div>
  );
}

// ── Home ─────────────────────────────────────────────────────────────────────

const SERVICE_REVISIONS = [
  { rev: "A", title: en(t.services.items[0].title) },
  { rev: "B", title: en(t.services.items[1].title) },
  { rev: "C", title: en(t.services.items[2].title) },
  { rev: "D", title: en(t.services.items[3].title) },
];

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 32px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: "48px", alignItems: "start" }} className="gdt-grid">
          <div>
            <FigLabel n={1} label="SCOPE OF WORK" />
            <DimensionTick />
            <div style={{ border: `1.5px solid ${INK}`, borderTop: "none", borderBottom: "none", padding: "40px 36px" }}>
              <h1
                style={{
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(34px, 4.6vw, 58px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  margin: "0 0 24px",
                  textTransform: "uppercase",
                }}
              >
                {en(t.hero.tagline)}
              </h1>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#3A3A38", maxWidth: "56ch", margin: "0 0 32px" }}>
                {en(t.hero.sub)}
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                <button
                  onClick={() => setPage("services")}
                  style={{
                    background: INK,
                    color: PAPER,
                    border: "none",
                    padding: "14px 26px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  → {en(t.hero.cta)}
                </button>
                <button
                  onClick={() => setPage("contact")}
                  style={{
                    background: "transparent",
                    color: INK,
                    border: `1.5px solid ${INK}`,
                    padding: "14px 26px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  {en(t.hero.cta2)}
                </button>
              </div>
            </div>
            <div style={{ transform: "scaleY(-1)" }}>
              <DimensionTick />
            </div>
          </div>

          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.08em", color: PRINT_BLUE, marginBottom: "8px", fontFamily: "'IBM Plex Mono', monospace" }}>
              REVISION TABLE
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px" }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: "44px" }}>REV</th>
                  <th style={thStyle}>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_REVISIONS.map(s => (
                  <tr key={s.rev}>
                    <td style={{ ...tdStyle, color: PRINT_BLUE, fontWeight: 700 }}>{s.rev}</td>
                    <td style={tdStyle}>{s.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "28px", display: "inline-flex", border: `1.5px solid ${INK}`, fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
              <div style={{ padding: "8px 12px", borderRight: `1.5px solid ${INK}` }}>⌖</div>
              <div style={{ padding: "8px 12px", borderRight: `1.5px solid ${INK}` }}>0.05</div>
              <div style={{ padding: "8px 12px" }}>A</div>
            </div>
            <div style={{ fontSize: "10.5px", color: "#6B6B66", marginTop: "6px", letterSpacing: "0.02em" }}>
              POSITION TOLERANCE, RELATIVE TO DATUM A — EVERY CLAIM ON THIS SHEET HOLDS TO IT
            </div>
          </div>
        </div>
      </div>

      {/* Quick links, styled as a drawing index / sheet list */}
      <div style={{ borderTop: `1.5px solid ${INK}`, background: "#EFEEE9" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px" }}>
          <FigLabel n={2} label="SHEET INDEX" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5px", background: INK, border: `1.5px solid ${INK}` }} className="gdt-index">
            {NAV_ITEMS.filter(i => i.key !== "home").map((item, i) => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                style={{
                  background: PAPER,
                  border: "none",
                  padding: "24px 20px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                <div style={{ fontSize: "11px", color: PRINT_BLUE, marginBottom: "8px" }}>SHEET {String(i + 2).padStart(2, "0")}</div>
                <div style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "20px", textTransform: "uppercase", color: INK }}>
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ApprovedSuppliers />
    </div>
  );
}

function ApprovedSuppliers() {
  return (
    <div style={{ borderTop: `1.5px solid ${INK}`, padding: "56px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <FigLabel n={3} label="APPROVED SUPPLIER LIST" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5px", background: RULE, border: `1px solid ${RULE}` }}>
          {t.partners.items.map(p => (
            <div key={p.id} style={{ background: PAPER, padding: "16px 20px", minWidth: "160px", flex: "1 0 160px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 600, color: INK }}>{p.shortName}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#8A8A85", marginTop: "4px" }}>{en(p.desc)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── About ────────────────────────────────────────────────────────────────────

function AboutPage() {
  const stats = [
    { num: t.about.stat1_num, label: en(t.about.stat1_label) },
    { num: t.about.stat2_num, label: en(t.about.stat2_label) },
    { num: t.about.stat3_num, label: en(t.about.stat3_label) },
  ];
  return (
    <div>
      <PageHeading fig={1} label="COMPANY OVERVIEW" title={en(t.about.heading)} sub={en(t.about.company_body)} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5px", background: INK, border: `1.5px solid ${INK}` }} className="gdt-grid-3">
          {stats.map(s => (
            <div key={s.label} style={{ background: PAPER, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 800, fontSize: "36px", color: PRINT_BLUE }}>{s.num}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#6B6B66", marginTop: "6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap as a revision sequence */}
      <div style={{ borderTop: `1.5px solid ${INK}`, background: "#EFEEE9", padding: "56px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <FigLabel n={2} label={en(t.about.roadmap.heading).toUpperCase()} />
          <p style={{ fontSize: "14px", color: "#3A3A38", maxWidth: "60ch", marginBottom: "32px" }}>{en(t.about.roadmap.sub)}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5px", background: INK, border: `1.5px solid ${INK}` }} className="gdt-grid-4">
            {t.about.roadmap.steps.map((step, i) => (
              <div key={en(step.title)} style={{ background: PAPER, padding: "24px 20px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: PRINT_BLUE, marginBottom: "10px" }}>
                  REV {String.fromCharCode(65 + i)}
                </div>
                <div style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "19px", textTransform: "uppercase", marginBottom: "10px" }}>
                  {en(step.title)}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#3A3A38", lineHeight: 1.6 }}>
                  {en(step.desc)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder — engineer's stamp block */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 32px" }}>
        <FigLabel n={3} label="CERTIFYING ENGINEER" />
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "40px", alignItems: "start" }} className="gdt-grid">
          <div style={{ border: `1.5px solid ${INK}`, padding: "16px" }}>
            <img
              src={`${import.meta.env.BASE_URL}team/edward-fong.png`}
              alt={t.about.founder.name}
              style={{ width: "100%", aspectRatio: "1", objectFit: "cover", filter: "grayscale(1)", marginBottom: "12px" }}
            />
            <div style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "18px", textTransform: "uppercase" }}>
              {t.about.founder.name}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: PRINT_BLUE, marginTop: "4px" }}>
              {en(t.about.founder.title)}
            </div>
            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {t.about.founder.credentials.map(c => (
                <div key={en(c)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10.5px", color: "#3A3A38", lineHeight: 1.4 }}>
                  · {en(c)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "14.5px", lineHeight: 1.75, color: "#3A3A38", marginBottom: "18px", maxWidth: "62ch" }}>
              {en(t.about.founder.bio_p1)}
            </p>
            <p style={{ fontSize: "14.5px", lineHeight: 1.75, color: "#3A3A38", maxWidth: "62ch" }}>{en(t.about.founder.bio_p2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Services ─────────────────────────────────────────────────────────────────

function ServicesPage() {
  return (
    <div>
      <PageHeading fig={1} label="SPECIFICATION" title={en(t.services.heading)} sub={en(t.services.sub)} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5px", background: INK, border: `1.5px solid ${INK}` }}>
          {t.services.items.map((s, i) => (
            <div key={s.id} style={{ background: PAPER, padding: "28px 32px", display: "grid", gridTemplateColumns: "120px 1fr", gap: "24px", alignItems: "start" }} className="gdt-service-row">
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: PRINT_BLUE }}>
                PART {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "21px", textTransform: "uppercase", marginBottom: "10px" }}>
                  {en(s.title)}
                </div>
                <div style={{ fontSize: "14px", lineHeight: 1.7, color: "#3A3A38", maxWidth: "68ch" }}>{en(s.detail)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────

function ProjectsPage() {
  return (
    <div>
      <PageHeading fig={1} label="RECORD OF WORK" title={en(t.projects.all_heading)} sub={en(t.projects.all_sub)} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5px", background: INK, border: `1.5px solid ${INK}` }} className="gdt-grid-2">
          {t.projects.items.map(p => (
            <div key={p.id} style={{ background: PAPER, padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: PRINT_BLUE, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {en(p.tag)}
                </div>
                <EvidenceStamp real={p.featured} />
              </div>
              <div style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "18px", textTransform: "uppercase", marginBottom: "10px", lineHeight: 1.15 }}>
                {en(p.title)}
              </div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.65, color: "#3A3A38", marginBottom: "14px" }}>{en(p.desc)}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 600, color: p.featured ? APPROVED_GREEN : "#8A8A85" }}>
                {en(p.result)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Demos ────────────────────────────────────────────────────────────────────

function DemosPage() {
  return (
    <div>
      <PageHeading fig={1} label="FIELD TEST RECORD" title={en(t.demos.heading)} sub={en(t.demos.sub)} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5px", background: INK, border: `1.5px solid ${INK}` }} className="gdt-grid-2">
          {t.demos.items.map(d => (
            <div key={d.id} style={{ background: PAPER, padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: PRINT_BLUE, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {en(d.tag)}
                </div>
                <EvidenceStamp real={d.real} />
              </div>
              <div style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "18px", textTransform: "uppercase", marginBottom: "10px", lineHeight: 1.15 }}>
                {en(d.title)}
              </div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.65, color: "#3A3A38", marginBottom: "14px" }}>{en(d.desc)}</div>
              {d.real && d.note && en(d.note) && (
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#6B6B66", marginBottom: "14px", lineHeight: 1.5 }}>
                  NOTE: {en(d.note)}
                </div>
              )}
              {d.demoUrl && (
                <a
                  href={d.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: PRINT_BLUE,
                    textDecoration: "none",
                    borderBottom: `1.5px solid ${PRINT_BLUE}`,
                  }}
                >
                  → VIEW LIVE DEMO
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Contact ──────────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "sending" | "mailto" | "error";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const subject = encodeURIComponent(`New enquiry from ${form.name || "3form Co website"}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <PageHeading fig={1} label="REQUEST FOR QUOTATION" title={en(t.contact.heading)} sub={en(t.contact.sub)} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5px", background: INK, border: `1.5px solid ${INK}` }} className="gdt-grid">
          <div style={{ background: PAPER, padding: "32px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: PRINT_BLUE, marginBottom: "18px", letterSpacing: "0.04em" }}>
              CONTACT BLOCK
            </div>
            {[
              ["PHONE", t.contact.phone],
              ["EMAIL", t.contact.email],
              ["WEBSITE", t.contact.website],
            ].map(([label, value]) => (
              <div key={label} style={{ borderBottom: `1px solid ${RULE}`, padding: "12px 0", display: "grid", gridTemplateColumns: "120px 1fr", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>
                <div style={{ color: "#6B6B66" }}>{label}</div>
                <div style={{ color: INK, fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: PAPER, padding: "32px" }}>
            {status === "mailto" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <EvidenceStamp real />
                <p style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700, fontSize: "20px", textTransform: "uppercase", marginTop: "16px" }}>
                  {en(t.contact.sent_mailto_heading)}
                </p>
                <p style={{ fontSize: "13px", color: "#6B6B66", maxWidth: "40ch", margin: "0 auto" }}>{en(t.contact.sent_mailto_body)}</p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{ marginTop: "20px", background: INK, color: PAPER, border: "none", padding: "10px 22px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  {en(t.contact.send_another)}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormField label={en(t.contact.form_name)}>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </FormField>
                <FormField label={en(t.contact.form_email)}>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                </FormField>
                <FormField label={en(t.contact.form_message)}>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
                </FormField>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background: INK,
                    color: PAPER,
                    border: "none",
                    padding: "14px 26px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.6 : 1,
                  }}
                >
                  {status === "sending" ? en(t.contact.form_sending) : `→ ${en(t.contact.form_send)}`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={{ display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#6B6B66", marginBottom: "6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: `1.5px solid ${INK}`,
  background: PAPER,
  padding: "10px 12px",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "13px",
  color: INK,
};

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <div style={{ borderTop: `2px solid ${INK}`, padding: "20px 32px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#6B6B66" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
        <div>© 2026 3FORM CO — SHEET REV. A</div>
        <div>{t.contact.website}</div>
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  let content: ReactNode;
  switch (page) {
    case "about": content = <AboutPage />; break;
    case "services": content = <ServicesPage />; break;
    case "projects": content = <ProjectsPage />; break;
    case "demos": content = <DemosPage />; break;
    case "contact": content = <ContactPage />; break;
    default: content = <HomePage setPage={setPage} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: PAPER, color: INK }}>
      <Nav page={page} setPage={setPage} />
      {content}
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .gdt-grid, .gdt-grid-2, .gdt-grid-3, .gdt-grid-4, .gdt-index { grid-template-columns: 1fr !important; }
          .gdt-service-row { grid-template-columns: 1fr !important; }
          .gdt-nav { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "8px 10px",
  borderBottom: `1.5px solid ${INK}`,
  fontWeight: 600,
  letterSpacing: "0.04em",
};

const tdStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 10px",
  borderBottom: `1px solid ${RULE}`,
};
