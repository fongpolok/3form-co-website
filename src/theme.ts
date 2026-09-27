// ─────────────────────────────────────────────────────────────────────────────
// theme.ts — the colour palette, in one place.
//
// Names match DESIGN.md's `colors:` list. Components use COLORS.<name> instead
// of typing hex values, so changing a brand colour is a one-line edit here.
// Translucent white on navy (rgba(255,255,255,x)) stays inline: it is an
// opacity step of `white`, not a separate palette entry.
// ─────────────────────────────────────────────────────────────────────────────

export const COLORS = {
  navy:        "#002D72",
  navyDark:    "#001A4A",
  accent:      "#0050CC",
  accentHover: "#003FA3",
  accentLight: "#5B9BF0",
  accentTint:  "#E8F0FE",
  ink:         "#1A1A1A",
  slate:       "#6B7280",
  charcoal:    "#4B5563",
  graphite:    "#374151",
  paleAsh:     "#9CA3AF",
  borderGray:  "#D1D5DB",
  hairline:    "#E5E7EB",
  frostWash:   "#F8FAFF",
  iceWash:     "#F0F4FF",
  mistGray:    "#F3F4F6",
  paperGray:   "#FAFAFA",
  white:       "#FFFFFF",
  alertRed:    "#B91C1C",
} as const;
