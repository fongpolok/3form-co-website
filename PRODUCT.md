# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Hong Kong SME owners and operations leads in manufacturing, food production, and technology who need help improving operations, securing government funding, or adopting new technology/AI. Clients arrive both through direct outreach (searching for consulting help) and through referrals via government bodies and partner institutions (HKPC, InvestHK, HKSTP, and similar). Secondary audience: those institutional partners themselves, who need to see 3form Engineering Co presented as a credible, professional consulting entity worth referring business to.

## Product Purpose

3form Engineering Co is a Hong Kong-based engineering and management consulting firm. It exists to help HK businesses achieve measurable operational improvement across seven services: funding consulting (government grants/schemes such as BUD Fund, NIFS, NIAS), engineering & process enhancement (Six Sigma / Lean), AI & data digitalisation adoption, production site setup (licensing, HACCP, GMP, FIFO), a hosted warehouse management system, general maintenance & repair, and industrial agentic development. Success is a client that secures funding, passes compliance, or measurably improves a process/production metric as a result of the engagement.

## Positioning

The firm's differentiator is combining engineering execution with funding/grant expertise and regulatory know-how in one practice — most competitors specialise in only one of those lanes (a pure funding consultancy, or a pure engineering/Lean shop, or a compliance auditor). 3form Engineering Co positions itself to take a client from problem diagnosis through funded implementation to compliance sign-off without handing off between separate vendors.

## Operating Context

- 3form Engineering Co is currently a **solo practice**: Edward Fong is the sole consultant, run alongside his full-time role as Senior Consultant — Smart Machinery and Equipment at the Hong Kong Productivity Council (HKPC).
- The firm operates in a bilingual market: the site serves English and Traditional Chinese (zh-HK) content side by side (`src/translations.ts`), and this must be preserved in any future work.
- Client engagements are grant-cycle and compliance-cycle driven (e.g. NIFS, NIAS, NITTP, CRS, BUD Fund application windows; HACCP/GMP audit timelines).

## Capabilities and Constraints

- Seven confirmed service lines: Funding Consulting; Engineering & Process Enhancement (Six Sigma/Lean); AI & Data Digitalisation Tech Adoption; Production Site Setup (licensing/HACCP/GMP/FIFO); Warehouse Management System (SaaS); General Maintenance & Repair; Industrial Agentic Development.
- Contact form currently only logs to console and shows a local "sent" confirmation (`src/App.tsx` `ContactSection`) — it does not actually send email or hit a backend. This is a known gap, not a design decision.
- Office address is explicitly unconfirmed ("[Office Address — To Be Confirmed]" in both languages).
- Social links (LinkedIn, Facebook, Instagram) are placeholder `#` hrefs — no real profiles wired up yet.
- Company logo is unset (dashed "LOGO" placeholder box in the navbar).

## Brand Commitments

- Firm name: **3form Engineering Co**; **3form Co** is the accepted short form (used for the navbar wordmark and casual in-copy mentions). Domain: `www.3formco.com.hk`.
- Founder: **Edward Fong**, Founder & Principal Consultant. Credentials: IMechE Associate Member (HK Branch); BEng & MSc Mechanical Engineering (HKU, both completed); patent holder for a machine-vision inspection system for automotive parts.
- Existing visual identity: dark navy (#001A4A/#002D72) with blue accent (#0050CC), serif display type + sans body, McKinsey-style authoritative tone — established in `src/App.tsx`. This is incumbent visual truth to preserve or deliberately supersede, not to ignore.
- Contact: Edward Fong, phone 5744 9594, email edwardfongpolok@gmail.com.

## Evidence on Hand

- **Founder bio and credentials are real** (sourced from Edward's LinkedIn profile per code comment) — his HKPC role, patent, and academic credentials should be treated as factual and preserved.
- **Homepage stats ("10+ years experience, 50+ projects completed, 30+ clients served") represent Edward's personal professional track record** accumulated via his HKPC role — **not** 3form Engineering Co's own independent history as a firm, since 3form Engineering Co is a new solo practice. Future copy should not imply these are the firm's own multi-year numbers.
- **Of the 8 project case studies in `src/translations.ts`, 3 are marked `featured: true`** (production line overhaul, BUD Fund application, KPI dashboard) with full write-ups. **The other 5 (`featured: false`) are now labelled "Actual Example" per Edward's direction (2026-09-11)** rather than "Illustrative Example" — he indicated these are real engagements and the detailed write-ups (desc/result copy) will be supplied in a follow-up session. Until that copy arrives, treat the existing desc/result text on those 5 as provisional placeholder wording, not confirmed fact.
- Each project (including the 5 above) now links to its own detail page (`#projects/<id>`, `ProjectDetailPage` in `src/App.tsx`) for a fuller deliverables write-up; the detail page body is intentionally blank pending that content.
- Partner/affiliation logos (HKPC, Cognex, HKSTP, HKQAA, SGS, Bureau Veritas, TÜV SÜD, InvestHK) are referenced by path but logo image files are not confirmed to exist in `public/logos/`.
- No pricing, licensing, or additional testimonials exist beyond the above — do not invent any.

## Product Principles

1. Credibility over volume: with only 3 real case studies and a solo-practice team, the site should read as focused and substantive rather than papering over thinness with more placeholder content.
2. Bilingual parity is non-negotiable: every user-facing string ships in both English and Traditional Chinese; nothing English-only.
3. Engineering rigor as the throughline: the "engineering + funding + regulatory" combination is the pitch — visual and content decisions should reinforce precision and technical credibility, not generic corporate polish.
4. Dual-audience clarity: pages must work both for an SME owner evaluating a consultant and for an institutional partner (HKPC, InvestHK, etc.) sizing up a referral.
5. Don't overstate scale: language and design should not imply a larger team or longer independent track record than the firm actually has.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established yet.
