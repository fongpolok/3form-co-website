---
name: 3form Engineering Co
description: Hong Kong engineering & management consulting firm — bilingual marketing site
colors:
  navy: "#002D72"
  navy-dark: "#001A4A"
  accent: "#0050CC"
  accent-hover: "#003FA3"
  accent-light: "#5B9BF0"
  accent-tint: "#E8F0FE"
  ink: "#1A1A1A"
  slate: "#6B7280"
  charcoal: "#4B5563"
  graphite: "#374151"
  pale-ash: "#9CA3AF"
  border-gray: "#D1D5DB"
  hairline: "#E5E7EB"
  frost-wash: "#F8FAFF"
  ice-wash: "#F0F4FF"
  mist-gray: "#F3F4F6"
  paper-gray: "#FAFAFA"
  paper-white: "#FFFFFF"
  alert-red: "#B91C1C"
typography:
  display:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "8px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section-y: "100px"
  section-x: "32px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.navy-dark}"
    rounded: "{rounded.none}"
    padding: "40px 32px"
  badge:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.accent}"
    rounded: "{rounded.xs}"
    padding: "4px 10px"
---

# Design System: 3form Engineering Co

## Overview

**Creative North Star: "The Boardroom Brief"**

3form Engineering Co's site reads like a document prepared for a client's executive committee, not a marketing page reaching for attention. Dark navy anchors authority at the top and bottom of every page (nav, hero, contact, footer); the interior is calm frost-white with a single restrained accent blue reserved for calls to action, active states, and evidence (stat blocks, result badges). Serif display type carries the weight of a considered argument; sans body type stays quiet and legible underneath it. Nothing in the system reaches for attention through saturation, motion, or ornament — credibility is built through restraint, precision, and legible hierarchy, the same register a consulting deliverable uses to be trusted by a reader who has seen a hundred slide decks.

Confirmed visual anti-references: no gradient text, no glassmorphism, no playful illustration, no bright multi-color palette. The one deliberate exception to "single accent" is the illustrative-vs-real project card distinction, where gray vs. blue is a functional signal (evidence status), not decoration.

**Key Characteristics:**
- Navy-anchored structure: dark navy nav/hero/contact/footer bracket a light interior
- One accent color (Confident Blue) carrying all interactive and evidentiary emphasis
- Serif display + sans body pairing, McKinsey-deliverable register
- Flat-by-default surfaces; shadows are soft, navy-tinted, and used only as a hover response
- Sharp-to-minimal corners everywhere except the founder's circular photo

## Colors

A restrained two-hue system — navy for authority and structure, one confident blue for action and evidence — set against near-white surfaces and a standard gray text ramp.

### Primary
- **Boardroom Navy** (#002D72): The nav bar and the Contact section background. The brand's "we are speaking to you" register.
- **Confident Blue** (#0050CC): The single accent. Every CTA, active nav state, link, badge text, stat-block border, and "this is real" signal (see project-card Named Rule below) uses this exact hue and no other.
- **Deep Confident Blue** (#003FA3): Hover state for Confident Blue buttons/links. Never used at rest.

### Secondary
- **Midnight Navy** (#001A4A): The darkest surface — hero background, footer background, and all navy/dark-serif heading text on light surfaces. Reads as "navy, one step darker" rather than a separate hue.
- **Sky Signal Blue** (#5B9BF0): The light-mode-on-dark equivalent of Confident Blue — used only for section-label accents and rules sitting on a navy background (hero, contact), where Confident Blue itself would lack contrast.
- **Pale Blue Wash** (#E8F0FE): The tint behind every badge/tag/credential pill — background for small evidentiary chips, always paired with Confident Blue text.

### Neutral
- **Near-Black Ink** (#1A1A1A): Root body text color (`body` in index.css); rarely seen directly since most body copy uses Charcoal or Graphite for softer contrast.
- **Charcoal** (#4B5563): Primary paragraph body copy color across About, Services, and Project descriptions.
- **Graphite** (#374151): Form labels, founder bio paragraphs — a touch darker/denser than Charcoal for reading-weight text.
- **Slate** (#6B7280): Secondary/supporting text — teasers, stat labels, muted captions.
- **Pale Ash** (#9CA3AF): The lightest text tone — placeholder-adjacent captions, illustrative-card metadata, disabled-feeling text.
- **Cool Border Gray** (#D1D5DB): Input borders at rest, scrollbar thumb, illustrative-card border-top.
- **Hairline Gray** (#E5E7EB): Section dividers, card borders, table/grid seams.
- **Frost Wash** (#F8FAFF): About and All-Projects section backgrounds — the lightest "interior" tone.
- **Ice Wash** (#F0F4FF): Featured-Projects section background — one step cooler/bluer than Frost Wash.
- **Mist Gray** (#F3F4F6) / **Paper Gray** (#FAFAFA): Illustrative (non-real) project card surfaces — deliberately desaturated, no blue cast, so they read as "not evidence" at a glance.
- **Paper White** (#FFFFFF): Card and form surfaces, founder/services section backgrounds.

### Named Rules
**The One Accent Rule.** Confident Blue is the only saturated color in the system. If a new element needs emphasis, it earns Confident Blue or it earns weight/size — never a second hue.

**The Evidence-Tint Rule.** Blue-tinted surfaces (Ice Wash, Pale Blue Wash, Confident Blue borders) mark real, verifiable content — completed projects, actual stats, live CTAs. Gray-tinted surfaces (Mist Gray, Paper Gray, Cool Border Gray) mark illustrative or placeholder content. Never blue-tint something unverified; never gray-tint something real.

## Typography

**Display Font:** Source Serif 4 (with Georgia, serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)

**Character:** A confident editorial serif for anything that argues a point (headlines, section titles, the founder's name) over a quiet, highly legible grotesque for everything read at length or interacted with (body copy, labels, buttons, nav). The pairing reads as "the report" (serif) versus "the interface around the report" (sans).

### Hierarchy
- **Display** (700, `clamp(36px, 5vw, 60px)`, 1.15 line-height, -0.02em tracking): Hero `<h1>` only.
- **Headline** (700, `clamp(24px, 3vw, 52px)` band, 1.2 line-height, -0.02em tracking): Section `<h2>`s and standalone page headings (About/Services/Projects/Contact section headings run `clamp(28px,3.5vw,44px)`; the All-Projects page `<h1>` runs larger at `clamp(32px,4vw,52px)`; the Partners section runs smaller at `clamp(24px,3vw,36px)` since it's a lighter-weight moment). Same role, same voice, clamp band sized to the heading's weight in the page.
- **Metric** (700, `clamp(28px, 6vw, 42px)`, 1 line-height): The large serif numbers in stat blocks only (10+, 50+, 30+) — a distinct display-weight role for evidence, not prose.
- **Title** (600–700, 18–30px, 1.2–1.35 line-height): Card and subsection `<h3>`s, sized to the component's weight in the page — quick-link/project/service card titles run 18–19px, the founder's name and navbar wordmark run 20–25px, the legal modal heading (the one place a title stands alone on a page) runs 30px. Same role throughout; the exact size follows how much authority that instance of the role needs to carry.
- **Body** (400, 14–16px, 1.6–1.85 line-height): Paragraph copy; hero subhead uses 300 weight at 18px as the one deliberately lighter body variant.
- **Label** (500–700, 10–13px, uppercase where used, 0.02–0.15em tracking): Section eyebrows, nav links, badges, form field labels, stat captions, and the smallest supporting captions (partner-plate descriptions run down to 10px, the floor for this role).

### Icon glyph sizes (not part of the type scale)
Emoji and symbol glyphs used as icons — contact-detail icons (18px), the mobile hamburger (24px), the legal modal's close mark (22px), the contact form's success/error emoji (48px) — are sized for their role as icons, not as text, and are exempt from the Hierarchy scale above. Don't fold a new icon into a text role's size just because it happens to share a pixel value.

### Named Rules
**The Serif-Argues, Sans-Assists Rule.** Serif is reserved for headings and the founder's name — anything making a claim. Sans handles everything functional: body copy, labels, controls, navigation. Never swap the pairing's roles.

## Layout

A single centered container (max-width 1280px, 32px horizontal padding) holds every section; sections stack full-bleed with their own background color and 100px vertical padding (60–100px on mobile via the `.grid-responsive` collapse). The fixed nav (72px) sits above everything at `z-index: 1000`; page content is pushed down by an equal `padding-top`. Internal composition is grid-based and mostly symmetric two-column (`1fr 1fr`) on desktop, collapsing to a single stacked column under 900px. Card grids (quick links, services, projects) run 2–4 columns desktop, 1 column mobile. Spacing rhythm steps through roughly 8 / 16 / 24 / 32 / 48px internal gaps and 80–100px between major sections — generous separation between sections, tighter grouping within a card or form.

## Elevation & Depth

Flat by default. Surfaces sit at the same visual plane until a hover or focus interaction earns depth: cards lift with a soft, navy-tinted shadow (never pure black) and a small `translateY` on hover; form fields gain a blue focus ring instead of a shadow. Illustrative (non-real) project cards deliberately carry no shadow at rest or on hover, reinforcing that they are visually "lighter weight" than real evidence.

### Shadow Vocabulary
- **Card resting** (`box-shadow: 0 2px 16px rgba(0,45,114,0.06)`): Default shadow on quick-link cards, stat blocks, real project cards, the founder photo.
- **Card hover** (`box-shadow: 0 8px 32px rgba(0,45,114,0.12)`): Same cards on hover — larger blur, same navy tint, roughly double opacity.
- **Modal/scrim** (`box-shadow` implicit via `rgba(0,0,0,0.6)` backdrop): The one place true black is used — the legal modal's full-screen backdrop, since it sits above the entire color system rather than within it.

### Named Rules
**The Navy-Tint Rule.** Every shadow in the system is tinted from navy (`rgba(0,45,114,…)`), never neutral black, except the modal backdrop. A shadow that reads gray or black instead of navy-tinted has drifted from the system.

## Shapes

Sharp-to-minimal corners throughout: buttons and inputs use a 3px radius (barely-there, not "rounded"), badges/tags use 2px, and most cards and section blocks use 0 (hard right angles) — the system's default posture is rectilinear, consistent with a document/ledger feel. The one deliberate exception is the founder's photo, which is a full circle (50% radius) — the single "soft" shape in the system, reserved for the one place a human face appears. The signature structural motif is a 3px solid Confident-Blue border-top on cards that represent real evidence (stat blocks, real project cards, quick-link cards); illustrative project cards use the same border-top position in Cool Border Gray instead, keeping the geometry identical while the color carries the evidence signal.

## Components

### Buttons
- **Shape:** 3px radius (`rounded.sm`) — barely rounded, reads as "structured," not soft.
- **Primary:** Confident Blue background, white text, 14px/32px padding, 600 weight, 0.04em tracking.
- **Hover:** Background steps to Deep Confident Blue; no scale or shadow change.
- **Secondary / Ghost:** Transparent background, 1.5px white/60%-opacity border, used only on dark (navy) surfaces — hero secondary CTA. Hover fills with 10% white.
- **Disabled/Loading (contact form):** 0.7 opacity, `cursor: not-allowed`, label swaps to a sending-state string; no spinner icon in the current system.

### Badges / Tags
- **Style:** Pale Blue Wash background, Confident Blue text, 2px radius, uppercase 11px label type — used for service/project category tags and founder credential pills.
- **Illustrative variant:** White background, Pale Ash text, 1px Cool Border Gray border — the gray-tinted counterpart per the Evidence-Tint Rule.

### Cards / Containers
- **Corner Style:** 0 radius (hard edges) on quick-link cards, service tiles, and project cards.
- **Background:** Paper White at rest; Mist Gray / Paper Gray for illustrative project cards.
- **Shadow Strategy:** See Elevation & Depth — resting/hover pair, navy-tinted, absent entirely on illustrative cards.
- **Border:** 3px solid top border in Confident Blue (real) or Cool Border Gray (illustrative); services grid uses 1px Hairline Gray seams between tiles instead.
- **Internal Padding:** 32–48px depending on card size (quick-link cards tighter, project/service cards more generous).

### Inputs / Fields
- **Style:** 1.5px Cool Border Gray stroke, white background, 3px radius, 12px/16px padding.
- **Focus:** Border shifts to Confident Blue plus a soft `0 0 0 3px rgba(0,80,204,0.15)` glow ring — the system's only focus treatment; no outline-based focus elsewhere in the current implementation.
- **Disabled:** 0.6 opacity while the contact form is submitting.

### Navigation
- **Style:** Fixed Boardroom Navy bar, 72px tall, white text at 85% opacity for inactive links, 100% opacity + 700 weight for the active page. Logo mark is a solid Confident Blue 40×40 rounded-square with a serif "3", paired with the "3form Co" wordmark in serif white. Mobile collapses to a hamburger-triggered dropdown sharing the same nav background and link styling; desktop has no hover-underline, only an opacity/weight shift.

## Do's and Don'ts

### Do:
- **Do** keep Confident Blue as the only saturated accent color across the entire site (The One Accent Rule).
- **Do** tint real-evidence surfaces blue and illustrative/placeholder surfaces gray (The Evidence-Tint Rule) — this distinction is load-bearing for the site's credibility, not a style choice.
- **Do** pair serif for headlines/claims with sans for body/interface (The Serif-Argues, Sans-Assists Rule).
- **Do** tint shadows from navy, never neutral gray or black (The Navy-Tint Rule).
- **Do** keep corners sharp-to-minimal (0–3px) except the founder photo's full circle.

### Don't:
- **Don't** introduce a second saturated hue for emphasis — reach for weight, size, or Confident Blue instead.
- **Don't** apply the real-evidence blue treatment (Confident Blue border, Pale Blue Wash badge) to any placeholder, sample, or unconfirmed content.
- **Don't** add drop shadows in neutral black/gray; every shadow in this system carries a navy tint.
- **Don't** round corners beyond 8px anywhere except the circular founder photo — large radii read off-brand for this system.
- **Don't** use gradient text, glassmorphism, or decorative illustration; the system's authority comes from restraint, not visual flourish.
