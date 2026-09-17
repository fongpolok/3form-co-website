#!/usr/bin/env python3
"""Validate the Facility Maintenance / 場地保養 block content.

Checks src/facilityMaintenance/content.json (the same file the site renders):
  - every required category (hvac, electrical, office_equipment, production_line_fifo)
    is present and enabled
  - production_line_fifo covers "design" (production line layout with FIFO concern)
  - both audiences (offices/commercial, factories/warehouses) are present
  - every bilingual string has non-empty en + tc
  - no price-like text anywhere (the page must not show fixed prices)
  - site contact in src/translations.ts is still 5744 9594 / edwardfong@3formhk.com

Conda env: 3form-facility-maintenance (stdlib only).
Usage:  python scripts/facility_maintenance/validate_config.py [-v]
Exit code 0 = ok, 1 = problems found (each logged as ERROR).
"""
from __future__ import annotations

import argparse
import json
import logging
import re
import sys
from pathlib import Path
from typing import Any, Iterator

log = logging.getLogger("facility-maintenance")

ROOT = Path(__file__).resolve().parents[2]
CONTENT = ROOT / "src" / "facilityMaintenance" / "content.json"
TRANSLATIONS = ROOT / "src" / "translations.ts"

REQUIRED_CATEGORIES = {"hvac", "electrical", "office_equipment", "production_line_fifo"}
REQUIRED_AUDIENCES = {"offices_commercial", "factories_warehouses"}
FIFO_LAYOUT_ID = "production_line_fifo"
FIFO_LAYOUT_COVERS = {"design"}
EXPECTED_PHONE = "5744 9594"
EXPECTED_EMAIL = "edwardfong@3formhk.com"

PRICE_PATTERN = re.compile(
    r"(HK\$|US\$|\$\s*\d|\bHKD\b|港幣|港元|\d[\d,]*\s*(元|蚊)|\bfrom\s+\d|\bper\s+(hour|month|visit)\b|每(小時|月|次)\s*\d)",
    re.IGNORECASE,
)


def iter_bistrings(node: Any, path: str = "") -> Iterator[tuple[str, dict]]:
    """Yield (json-path, {en, tc}) for every bilingual string in the tree."""
    if isinstance(node, dict):
        if set(node) == {"en", "tc"}:
            yield path, node
            return
        for k, v in node.items():
            yield from iter_bistrings(v, f"{path}.{k}" if path else k)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from iter_bistrings(v, f"{path}[{i}]")


def validate(data: dict) -> list[str]:
    errors: list[str] = []

    if not data.get("enabled", False):
        log.warning("block is disabled (enabled=false) - it will not render")

    cats = {c.get("id"): c for c in data.get("categories", [])}
    missing = REQUIRED_CATEGORIES - cats.keys()
    if missing:
        errors.append(f"missing categories: {sorted(missing)}")
    for cid in sorted(REQUIRED_CATEGORIES & cats.keys()):
        if not cats[cid].get("enabled", False):
            errors.append(f"category '{cid}' is disabled")
        if not cats[cid].get("points"):
            errors.append(f"category '{cid}' has no points")
    if FIFO_LAYOUT_ID in cats:
        lacking = FIFO_LAYOUT_COVERS - set(cats[FIFO_LAYOUT_ID].get("covers", []))
        if lacking:
            errors.append(f"{FIFO_LAYOUT_ID} must cover design; missing {sorted(lacking)}")
        title_en = cats[FIFO_LAYOUT_ID].get("title", {}).get("en", "")
        if "FIFO" not in title_en:
            errors.append(f"{FIFO_LAYOUT_ID} title must mention FIFO: {title_en!r}")

    audiences = {a.get("id") for a in data.get("audiences", [])}
    if REQUIRED_AUDIENCES - audiences:
        errors.append(f"missing audiences: {sorted(REQUIRED_AUDIENCES - audiences)}")

    count = 0
    for path, bi in iter_bistrings(data):
        count += 1
        for lang in ("en", "tc"):
            text = (bi.get(lang) or "").strip()
            if not text:
                errors.append(f"{path}.{lang} is empty")
            elif PRICE_PATTERN.search(text):
                errors.append(f"{path}.{lang} looks like a price: {text!r}")
    log.debug("checked %d bilingual strings", count)

    return errors


def check_contact() -> list[str]:
    if not TRANSLATIONS.is_file():
        return [f"missing {TRANSLATIONS}"]
    src = TRANSLATIONS.read_text(encoding="utf-8")
    errors = []
    if f'"{EXPECTED_PHONE}"' not in src:
        errors.append(f"t.contact.phone is no longer {EXPECTED_PHONE}")
    if f'"{EXPECTED_EMAIL}"' not in src:
        errors.append(f"t.contact.email is no longer {EXPECTED_EMAIL}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("-v", "--verbose", action="store_true", help="debug logging")
    args = parser.parse_args()
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s %(levelname)s [facility-maintenance] %(message)s",
    )

    log.info("reading %s", CONTENT.relative_to(ROOT))
    try:
        data = json.loads(CONTENT.read_text(encoding="utf-8"))
    except FileNotFoundError:
        log.error("missing %s", CONTENT)
        return 1
    except json.JSONDecodeError as exc:
        log.error("invalid JSON in %s: %s", CONTENT.name, exc)
        return 1

    errors = validate(data) + check_contact()
    for e in errors:
        log.error(e)
    if errors:
        log.error("FAILED with %d problem(s)", len(errors))
        return 1

    log.info(
        "ok - categories=%s audiences=%s contact=%s / %s",
        [c["id"] for c in data["categories"]],
        [a["id"] for a in data["audiences"]],
        EXPECTED_PHONE,
        EXPECTED_EMAIL,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
