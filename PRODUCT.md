# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Hong Kong SME owners and operations leads in manufacturing, food production, and technology who need help improving operations, securing government funding, or adopting new technology/AI. A second client group is Greater Bay Area (GBA) manufacturers who use Hong Kong as a stepping stone for overseas expansion and promotion, and need both technical and advisory consultancy. Clients arrive both through direct outreach (searching for consulting help) and through referrals via government bodies and partner institutions (HKPC, InvestHK, HKSTP, and similar). Secondary audience: those institutional partners themselves, who need to see 3form Engineering Co presented as a credible, professional consulting entity worth referring business to.

## Product Purpose

3form Engineering Co is a Hong Kong-based engineering and management consulting firm. It exists to help HK businesses achieve measurable operational improvement across seven services: funding consulting (BUD Fund, NIAS and general funding applications), engineering & process enhancement (Six Sigma / Lean), AI & data digitalisation adoption, production site setup (licensing, HACCP, GMP, FIFO), a hosted warehouse management system, general maintenance & repair, and industrial agentic development. Success is a client that secures funding, passes compliance, or measurably improves a process/production metric as a result of the engagement.

## Positioning

The firm's differentiator is combining engineering execution with funding/grant expertise and regulatory know-how in one practice — most competitors specialise in only one of those lanes (a pure funding consultancy, or a pure engineering/Lean shop, or a compliance auditor). 3form Engineering Co positions itself to take a client from problem diagnosis through funded implementation to project delivery without handing off between separate vendors. Compliance support is offered where a project needs it; it is not a universal sign-off step. The site describes the engagement as Diagnose → Fund → Engineer → Deliver.

## Operating Context

- 3form Engineering Co is currently a **solo practice**: Edward Fong is the sole consultant, run alongside his full-time role as Senior Consultant — Smart Machinery and Equipment at the Hong Kong Productivity Council (HKPC).
- The firm operates in a bilingual market: the site serves English and Traditional Chinese (zh-HK) content side by side (`src/translations.ts`), and this must be preserved in any future work.
- Client engagements are grant-cycle and compliance-cycle driven (e.g. NIAS, NITTP, CRS, BUD Fund and other general funding application windows; HACCP/GMP audit timelines). Do not mention NIFS anywhere on the site (Edward's direction, 2026-09-23).

## Capabilities and Constraints

- Seven confirmed service lines: Funding Consulting; Engineering & Process Enhancement (Six Sigma/Lean); AI & Data Digitalisation Tech Adoption; Production Site Setup (licensing/HACCP/GMP/FIFO); Warehouse Management System (SaaS); General Maintenance & Repair; Industrial Agentic Development.
- Each service has its own indexable page under `/services/<slug>/` (plus `/services/facility-maintenance/`), with a `/tc/` twin. Service photos live on those pages; the Services overview cards show only the small round icons (`public/services/icon-NN.webp`).
- Contact form: with `CONFIG.contactFormEndpoint` empty (the current setting) it opens the visitor's email client via `mailto:` rather than posting to a backend. Setting a Formspree-style endpoint switches it to a server-side send.
- Office address is confirmed: Room C22, 12/F, Wong King Industrial Building, San Po Kong, Kowloon, Hong Kong (香港九龍新蒲崗旺景工業大廈12樓C22室). Hong Kong has no postcode.
- Legal name 3form Engineering Co Ltd, founded 2026.
- Social links: LinkedIn is live (https://www.linkedin.com/company/3form-engineering-hk/). Facebook and Instagram have no profiles yet and render muted and inert.
- Company logo is set (`public/logo.white.png` in the navbar; `public/logo.navy.png` for Google's structured data).
- Google Analytics 4 is on (`G-8XY75DG091`, set in `.figma/make/site.json`), and the privacy policy says so.

## Brand Commitments

- Firm name: **3form Engineering Co**; **3form Co** is the accepted short form (used for the navbar wordmark and casual in-copy mentions). Domain: `3formhk.com` (served over HTTPS from GitHub Pages; `public/CNAME` is the source of truth).
- Founder: **Edward Fong**, Founder & Principal Consultant. Credentials: IMechE Associate Member (HK Branch); BEng & MSc Mechanical Engineering (HKU, both completed); patent holder for a machine-vision inspection system for automotive parts.
- Existing visual identity: dark navy (#001A4A/#002D72) with blue accent (#0050CC), serif display type + sans body, McKinsey-style authoritative tone — established in `src/App.tsx`. This is incumbent visual truth to preserve or deliberately supersede, not to ignore.
- Contact: Edward Fong, phone 5744 9594, email edwardfong@3formhk.com.

## Evidence on Hand

- **Founder bio and credentials are real** (sourced from Edward's LinkedIn profile per code comment) — his HKPC role, patent, and academic credentials should be treated as factual and preserved.
- **Homepage stats ("10+ years experience, 50+ projects completed, 30+ clients served") represent Edward's personal professional track record** accumulated via his HKPC role — **not** 3form Engineering Co's own independent history as a firm, since 3form Engineering Co is a new solo practice. Future copy should not imply these are the firm's own multi-year numbers.
- **Of the 8 project case studies in `src/translations.ts`, 3 are marked `featured: true`** (production line overhaul, BUD Fund application, KPI dashboard) with full write-ups. **The other 5 (`featured: false`) are now labelled "Actual Example" per Edward's direction (2026-09-11)** rather than "Illustrative Example" — he indicated these are real engagements and the detailed write-ups (desc/result copy) will be supplied in a follow-up session. Until that copy arrives, treat the existing desc/result text on those 5 as provisional placeholder wording, not confirmed fact.
- Project 6 is titled "Funding Grant for Technology Upgrade" (科技升級資助).
- Each project (including the 5 above) now links to its own detail page (`/projects/<id>/`, `ProjectDetailPage` in `src/App.tsx`) for a fuller deliverables write-up; the detail page body is intentionally blank pending that content.
- Partner/affiliation logos all exist in `public/logos/`: HKPC, Cognex, HKSTP, HKU iDendron, Keyence, OPC Hub @ Cyberport, TÜV SÜD, InvestHK (list in `src/translations.ts`). Files are sized to 2× their 140×52 display box.
- No pricing, licensing, or additional testimonials exist beyond the above — do not invent any.

## Product Principles

1. Credibility over volume: with only 3 real case studies and a solo-practice team, the site should read as focused and substantive rather than papering over thinness with more placeholder content.
2. Bilingual parity is non-negotiable: every user-facing string ships in both English and Traditional Chinese; nothing English-only.
3. Engineering rigor as the throughline: the "engineering + funding + regulatory" combination is the pitch — visual and content decisions should reinforce precision and technical credibility, not generic corporate polish.
4. Dual-audience clarity: pages must work both for an SME owner evaluating a consultant and for an institutional partner (HKPC, InvestHK, etc.) sizing up a referral.
5. Don't overstate scale: language and design should not imply a larger team or longer independent track record than the firm actually has.

## Accessibility & Inclusion

Baseline is WCAG 2 AA, brought in line on 2026-09-27: text contrast ≥ 4.5:1 (including the grey "example" project cards and translucent white on navy), every form field tied to a visible label, 44px tap areas for small links, and no sideways scroll at 375px. Keep new work at that level. The partner logo strip keeps moving by Edward's choice.
