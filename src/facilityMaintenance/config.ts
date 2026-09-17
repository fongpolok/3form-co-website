/**
 * Facility Maintenance / 場地保養 — typed view over content.json.
 *
 * All editable copy lives in content.json so the Python validator
 * (scripts/facility_maintenance/validate_config.py) checks exactly what the
 * site renders. No prices by design — the validator rejects price-like text.
 *
 * Contact details are not duplicated here; the block reads t.contact.
 */
import content from "./content.json";

export type BiString = { en: string; tc: string };

export type FacilityCategory = {
  id: string;
  enabled: boolean;
  /** "upkeep", "support" and/or "design" — production_line_fifo must cover design. */
  covers: string[];
  title: BiString;
  points: BiString[];
};

export type FacilityMaintenanceConfig = {
  enabled: boolean;
  sectionId: string;
  label: BiString;
  heading: BiString;
  sub: BiString;
  /** Separates this from the production-equipment "General Maintenance & Repair" card. */
  distinctionNote: BiString;
  audiences: { id: string; label: BiString }[];
  categories: FacilityCategory[];
  cta: { heading: BiString; sub: BiString; button: BiString };
};

const base: FacilityMaintenanceConfig = content;

// Build-time kill switch: VITE_FACILITY_MAINTENANCE_ENABLED=false hides the
// block without touching content.json. Unset = follow content.json.
const envFlag = import.meta.env.VITE_FACILITY_MAINTENANCE_ENABLED as string | undefined;

export const facilityMaintenanceConfig: FacilityMaintenanceConfig = {
  ...base,
  enabled: envFlag === undefined ? base.enabled : envFlag !== "false",
  categories: base.categories.filter((c) => c.enabled),
};
