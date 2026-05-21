import csv
import html
import json
import re
import urllib.request
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "factions"
BASE_URL = "https://www.wahapedia.ru/wh40k10ed/"

CSV_FILES = {
    "factions": "Factions.csv",
    "sources": "Source.csv",
    "datasheets": "Datasheets.csv",
    "abilities": "Abilities.csv",
    "datasheets_abilities": "Datasheets_abilities.csv",
    "datasheets_models": "Datasheets_models.csv",
    "datasheets_wargear": "Datasheets_wargear.csv",
}


def fetch_csv(name: str) -> list[dict[str, str]]:
    url = BASE_URL + name
    with urllib.request.urlopen(url) as response:
        text = response.read().decode("utf-8-sig")
    rows = [row for row in csv.DictReader(text.splitlines(), delimiter="|") if any(row.values())]
    return rows


def slugify(value: str) -> str:
    value = html.unescape(value).strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def fix_mojibake(value: str) -> str:
    if not value:
        return ""
    if "â" not in value and "Ã" not in value:
        return value
    try:
        return value.encode("cp1252").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return value


def strip_markup(value: str) -> str:
    if not value:
        return ""
    value = html.unescape(value)
    value = fix_mojibake(value)
    value = re.sub(r"<br\s*/?>", " ", value, flags=re.IGNORECASE)
    value = re.sub(r"<[^>]+>", "", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def clean_weapon_abilities(value: str) -> list[str]:
    text = strip_markup(value)
    if not text:
        return []
    return [part.strip() for part in text.split(",") if part.strip()]


def normalize_weapon_row(row: dict[str, str]) -> dict[str, object]:
    range_value = strip_markup(row["range"])
    weapon_type = strip_markup(row["type"])
    is_melee = weapon_type.lower() == "melee" or range_value.lower() == "melee"
    if range_value.isdigit():
        range_value = f'{range_value}"'
    skill_key = "BS" if not is_melee else "WS"
    skill_value = strip_markup(row["BS_WS"])
    if skill_value.upper() == "N/A":
        skill = 0
        skill_type = "N/A"
    else:
        skill = int(skill_value.replace("+", "")) if skill_value else 0
        skill_type = skill_key

    return {
        "phase": "Fight" if is_melee else "Shooting",
        "type": "Melee" if is_melee else "Ranged",
        "range": range_value or ("Melee" if is_melee else "-"),
        "attacks": strip_markup(row["A"]) or "-",
        "skill": skill,
        "skillType": skill_type,
        "strength": strip_markup(row["S"]) or "-",
        "ap": int(strip_markup(row["AP"])) if strip_markup(row["AP"]) else 0,
        "damage": strip_markup(row["D"]) or "-",
        "abilities": clean_weapon_abilities(row["description"]),
    }


def resolve_ability_name(row: dict[str, str], ability_index: dict[tuple[str, str], str], faction_id: str) -> str:
    inline_name = strip_markup(row["name"])
    if inline_name:
        name = inline_name
    else:
        key = (row["ability_id"], faction_id)
        fallback_key = (row["ability_id"], "")
        name = ability_index.get(key) or ability_index.get(fallback_key) or ""

    parameter = strip_markup(row["parameter"])
    if parameter and name and parameter not in name:
        if name.lower() in {"feel no pain", "deadly demise", "scouts", "firing deck"}:
            name = f"{name} {parameter}"
    return name.strip()


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    factions = fetch_csv(CSV_FILES["factions"])
    sources = fetch_csv(CSV_FILES["sources"])
    datasheets = fetch_csv(CSV_FILES["datasheets"])
    abilities = fetch_csv(CSV_FILES["abilities"])
    datasheets_abilities = fetch_csv(CSV_FILES["datasheets_abilities"])
    datasheets_models = fetch_csv(CSV_FILES["datasheets_models"])
    datasheets_wargear = fetch_csv(CSV_FILES["datasheets_wargear"])

    source_index = {row["id"]: row for row in sources}
    faction_index = {row["id"]: row for row in factions}

    ability_index: dict[tuple[str, str], str] = {}
    for row in abilities:
        ability_index[(row["id"], row["faction_id"])] = strip_markup(row["name"])

    models_by_datasheet: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in datasheets_models:
        models_by_datasheet[row["datasheet_id"]].append(row)

    abilities_by_datasheet: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in datasheets_abilities:
        abilities_by_datasheet[row["datasheet_id"]].append(row)

    wargear_by_datasheet: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in datasheets_wargear:
        wargear_by_datasheet[row["datasheet_id"]].append(row)

    unit_buckets: dict[str, dict[str, object]] = {}
    manifest: list[dict[str, object]] = []

    for faction in factions:
        faction_id = faction["id"]
        faction_name = strip_markup(faction["name"])
        slug = slugify(faction_name)
        unit_buckets[faction_id] = {
            "faction": {
                "id": faction_id,
                "name": faction_name,
                "slug": slug,
                "link": faction["link"],
            },
            "units": {},
        }

    for datasheet in datasheets:
        faction_id = datasheet["faction_id"]
        if faction_id not in unit_buckets:
            continue

        source = source_index.get(datasheet["source_id"], {})
        source_name = strip_markup(source.get("name", ""))
        if "legends" in source_name.lower():
            continue

        unit_name = strip_markup(datasheet["name"])
        if not unit_name:
            continue

        statlines = []
        for model_row in sorted(models_by_datasheet[datasheet["id"]], key=lambda row: int(row["line"] or 0)):
            stats = {
                "move": strip_markup(model_row["M"]) or "-",
                "toughness": strip_markup(model_row["T"]) or "-",
                "save": strip_markup(model_row["Sv"]) or "-",
                "wounds": strip_markup(model_row["W"]) or "-",
                "leadership": strip_markup(model_row["Ld"]) or "-",
                "oc": strip_markup(model_row["OC"]) or "-",
            }
            statlines.append(
                {
                    "label": strip_markup(model_row["name"]),
                    "stats": stats,
                }
            )

        weapon_profiles: dict[str, dict[str, object]] = {}
        grouped_weapons: dict[str, list[dict[str, str]]] = defaultdict(list)
        for weapon_row in wargear_by_datasheet[datasheet["id"]]:
            grouped_weapons[strip_markup(weapon_row["name"])].append(weapon_row)

        for weapon_name, rows in grouped_weapons.items():
            if not weapon_name:
                continue
            rows = sorted(rows, key=lambda row: (int(row["line"] or 0), int(row["line_in_wargear"] or 0)))
            for row in rows:
                profile = normalize_weapon_row(row)
                key = weapon_name
                if len(rows) > 1:
                    suffix = strip_markup(row.get("dice", "")) or str(row.get("line_in_wargear", ""))
                    if " - " not in weapon_name and suffix:
                        key = f"{weapon_name} ({suffix})"
                weapon_profiles[key] = profile

        note_parts: list[str] = []
        for ability_row in sorted(abilities_by_datasheet[datasheet["id"]], key=lambda row: int(row["line"] or 0)):
            ability_name = resolve_ability_name(ability_row, ability_index, faction_id)
            if ability_name and ability_name not in note_parts:
                note_parts.append(ability_name)

        loadout = strip_markup(datasheet.get("loadout", ""))
        if loadout and loadout not in note_parts:
            note_parts.append(loadout)

        transport = strip_markup(datasheet.get("transport", ""))
        if transport and transport not in note_parts:
            note_parts.append(transport)

        if not weapon_profiles:
            continue

        unit_entry: dict[str, object] = {
            "source": {
                "name": source_name,
                "link": strip_markup(source.get("errata_link", "")),
                "datasheet": datasheet["link"],
            },
            "role": strip_markup(datasheet.get("role", "")),
            "note": ", ".join(note_parts),
            "statlines": statlines,
            "stats": statlines[0]["stats"] if statlines else {},
            "weapons": dict(sorted(weapon_profiles.items())),
        }
        unit_buckets[faction_id]["units"][unit_name] = unit_entry

    for faction_id, bucket in unit_buckets.items():
        units = dict(sorted(bucket["units"].items()))
        if not units:
            continue

        faction_meta = bucket["faction"]
        payload = {
            "faction": faction_meta,
            "generatedFrom": "Wahapedia 10th edition export",
            "units": units,
        }

        output_path = DATA_DIR / f"{faction_meta['slug']}.js"
        js_payload = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        output_path.write_text(
            "window.WH40K_FACTION_DATABASES = window.WH40K_FACTION_DATABASES || {};\n"
            f"window.WH40K_FACTION_DATABASES[{json.dumps(faction_meta['slug'])}] = {js_payload};\n",
            encoding="utf-8",
        )

        manifest.append(
            {
                "id": faction_meta["id"],
                "name": faction_meta["name"],
                "slug": faction_meta["slug"],
                "script": f"./data/factions/{faction_meta['slug']}.js",
                "unitCount": len(units),
            }
        )

    manifest.sort(key=lambda entry: entry["name"])
    manifest_path = DATA_DIR / "index.js"
    manifest_path.write_text(
        "window.WH40K_FACTION_MANIFEST = "
        + json.dumps(manifest, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )

    print(f"Generated {len(manifest)} faction databases in {DATA_DIR}")


if __name__ == "__main__":
    main()


