# Facility Maintenance / 場地保養 (Services page block)

A bilingual (EN / 繁中) block on the Services page for **premises** maintenance:

| Category | 類別 | Covers |
| --- | --- | --- |
| HVAC | 冷氣及通風 | upkeep |
| Electrical systems | 電力系統 | upkeep |
| Office equipment | 辦公室設備 | support |
| Production line layout with first-in-first-out (FIFO) concern | 生產線佈局（須考慮先進先出 FIFO） | design |

Category ids: `hvac`, `electrical`, `office_equipment`, `production_line_fifo`.

The exact scope is confirmed after a series of site walkthroughs, followed by a detailed quotation.

Audiences: offices & commercial buildings (寫字樓及商業大廈), factories & warehouses (工廠及倉庫).

This is **separate** from the existing service card "General Maintenance & Repair / 一般維修及保養服務", which covers repair of **production equipment** itself. The block says so in a short note under the categories.

**No prices on the page.** Scope and quotes are agreed per site. The validator rejects anything that looks like a price.

## Files

| Path | Role |
| --- | --- |
| `src/facilityMaintenance/content.json` | **All editable copy** + on/off switches (single source of truth) |
| `src/facilityMaintenance/config.ts` | Types over the JSON, env override, filters disabled categories |
| `src/facilityMaintenance/FacilityMaintenanceBlock.tsx` | The block (default export) |
| `src/facilityMaintenance/logger.ts` | Console logger, prefix `[3form][facility-maintenance]` |
| `src/facilityMaintenance/index.ts` | Module exports |
| `src/App.tsx` (`ServicesSection`) | Renders the block below the service cards, above the Services CTA |
| `scripts/facility_maintenance/validate_config.py` | Content validator (Python, stdlib only) |
| `environment.facility-maintenance.yml` | Conda env `3form-facility-maintenance` |

## Configure

In `src/facilityMaintenance/content.json`:

- `enabled`: show or hide the whole block.
- `categories[].enabled`: show or hide a single category. The grid adjusts to fit.
- All copy is `{ "en": ..., "tc": ... }` pairs: label, heading, sub, distinctionNote, audiences, category titles/points, CTA.

Build-time override (no file edit): `VITE_FACILITY_MAINTENANCE_ENABLED=false pnpm dev` hides the block. If the variable isn't set, the block follows `content.json`.

The CTA reuses the site's contact details from `t.contact` in `src/translations.ts` (5744 9594, edwardfong@3formhk.com), so they are not duplicated in this module. The button goes to the Contact page with the app's existing `setPage("contact")`. The phone number and email are shown as `tel:` and `mailto:` links.

## Logging

Open the browser console and look for `[3form][facility-maintenance]` messages:

- `block rendered` (with lang and category ids) or `block disabled via config`
- a warning if the block is enabled but every category is disabled
- `[event] CTA → contact`, `[event] phone link`, `[event] email link`

## Validate (conda helper)

```bash
conda env create -f environment.facility-maintenance.yml   # first time only
conda activate 3form-facility-maintenance
python scripts/facility_maintenance/validate_config.py      # add -v for debug logging
```

Run this after editing `content.json`. It exits with code 1 and logs the problems if a required category or audience is missing, if `production_line_fifo` no longer covers design or its title drops "FIFO", if any EN/TC string is empty, if any copy looks like a price, or if the site contact details have changed.

## Preview

```bash
pnpm install
pnpm dev
```

Open the Services page (nav → Services, or `#services`). Use the language switch to check both EN and 繁中.

Do **not** publish or deploy until Edward has reviewed it.
