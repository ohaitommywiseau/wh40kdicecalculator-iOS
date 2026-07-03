import json
import re
import sys
import zlib
from pathlib import Path


CHAPTERS = [
    {"id": "core-concepts", "number": "01", "label": "01. Core Concepts", "start_page": 8},
    {"id": "datasheets", "number": "02", "label": "02. Datasheets", "start_page": 10},
    {"id": "moving", "number": "03", "label": "03. Moving", "start_page": 12},
    {"id": "making-attacks", "number": "04", "label": "04. Making Attacks", "start_page": 16},
    {"id": "attack-sequence", "number": "05", "label": "05. Attack Sequence", "start_page": 18},
    {"id": "other-concepts", "number": "06", "label": "06. Other Concepts", "start_page": 24},
    {"id": "battle-round", "number": "07", "label": "07. The Battle Round", "start_page": 28},
    {"id": "command-phase", "number": "08", "label": "08. Command Phase", "start_page": 30},
    {"id": "movement-phase", "number": "09", "label": "09. Movement Phase", "start_page": 32},
    {"id": "shooting-phase", "number": "10", "label": "10. Shooting Phase", "start_page": 34},
    {"id": "charge-phase", "number": "11", "label": "11. Charge Phase", "start_page": 36},
    {"id": "fight-phase", "number": "12", "label": "12. Fight Phase", "start_page": 38},
    {"id": "terrain", "number": "13", "label": "13. Terrain", "start_page": 46},
    {"id": "objectives", "number": "14", "label": "14. Objectives", "start_page": 52},
    {"id": "stratagems", "number": "15", "label": "15. Stratagems", "start_page": 54},
    {"id": "actions", "number": "16", "label": "16. Actions", "start_page": 58},
    {"id": "monsters-and-vehicles", "number": "17", "label": "17. Monsters and Vehicles", "start_page": 62},
    {"id": "transports", "number": "18", "label": "18. Transports", "start_page": 64},
    {"id": "attached-units", "number": "19", "label": "19. Attached Units", "start_page": 66},
    {"id": "strategic-reserves", "number": "20", "label": "20. Strategic Reserves", "start_page": 68},
    {"id": "flying-and-surging", "number": "21", "label": "21. Flying and Surging", "start_page": 70},
    {"id": "other-rules-and-abilities", "number": "22", "label": "22. Other Rules and Abilities", "start_page": 72},
    {"id": "aircraft", "number": "23", "label": "23. Aircraft", "start_page": 74},
    {"id": "core-abilities", "number": "24", "label": "24. Core Abilities", "start_page": 78},
    {"id": "rules-appendix", "number": None, "label": "Rules Appendix", "start_page": 86},
]


def parse_all_objects(pdf_bytes):
    object_pattern = re.compile(rb"(\d+) (\d+) obj\r?(?:\n|\r)(.*?)\r?(?:\n|\r)endobj", re.S)
    direct_objects = {int(match.group(1)): match.group(3) for match in object_pattern.finditer(pdf_bytes)}
    all_objects = dict(direct_objects)

    for _, body in list(direct_objects.items()):
        if b"/Type/ObjStm" not in body:
            continue
        first_match = re.search(rb"/First\s+(\d+)", body)
        count_match = re.search(rb"/N\s+(\d+)", body)
        if not first_match or not count_match:
            continue
        first = int(first_match.group(1))
        object_count = int(count_match.group(1))
        stream = body.split(b"stream", 1)[1].split(b"endstream", 1)[0].lstrip(b"\r\n").rstrip(b"\r\n")
        decoded = zlib.decompress(stream)
        header_numbers = [int(value) for value in re.findall(r"\d+", decoded[:first].decode("latin1"))]
        pairs = list(zip(header_numbers[0::2], header_numbers[1::2]))[:object_count]
        starts = [first + offset for (_, offset) in pairs]
        for index, (object_number, offset) in enumerate(pairs):
            start = first + offset
            end = starts[index + 1] if index + 1 < len(starts) else len(decoded)
            all_objects[object_number] = decoded[start:end].strip()

    return all_objects


def get_stream(body):
    if body is None or b"stream" not in body:
        return None
    stream = body.split(b"stream", 1)[1].split(b"endstream", 1)[0].lstrip(b"\r\n").rstrip(b"\r\n")
    if b"/FlateDecode" not in body:
        return stream
    try:
        return zlib.decompress(stream)
    except Exception:
        return None


def parse_cmap(stream_bytes):
    cmap = {}
    text = stream_bytes.decode("latin1", errors="ignore")
    for source_hex, target_hex in re.findall(r"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", text):
        source = bytes.fromhex(source_hex)
        target_bytes = bytes.fromhex(target_hex)
        try:
            target = target_bytes.decode("utf-16-be")
        except Exception:
            target = target_bytes.decode("latin1", errors="ignore")
        cmap[source] = target
    return cmap


def decode_pdf_literal(payload):
    result = bytearray()
    index = 0
    while index < len(payload):
        char = payload[index]
        if char == 92:
            index += 1
            if index >= len(payload):
                break
            char = payload[index]
            if char in (110, 114, 116, 98, 102):
                result.extend({110: b"\n", 114: b"\r", 116: b"\t", 98: b"\b", 102: b"\f"}[char])
            elif char in (40, 41, 92):
                result.append(char)
            elif 48 <= char <= 55:
                octal = bytes([char])
                for _ in range(2):
                    if index + 1 < len(payload) and 48 <= payload[index + 1] <= 55:
                        index += 1
                        octal += bytes([payload[index]])
                    else:
                        break
                result.append(int(octal, 8))
            else:
                result.append(char)
        else:
            result.append(char)
        index += 1
    return bytes(result)


def decode_font_bytes(raw_bytes, cmap):
    sizes = sorted({len(key) for key in cmap}, reverse=True) if cmap else [1]
    text = []
    index = 0
    while index < len(raw_bytes):
        matched = False
        for size in sizes:
            chunk = raw_bytes[index:index + size]
            if cmap and chunk in cmap:
                text.append(cmap[chunk])
                index += size
                matched = True
                break
        if not matched:
            text.append(chr(raw_bytes[index]))
            index += 1
    return "".join(text)


def extract_text_fragments(segment):
    fragments = []
    index = 0
    while index < len(segment):
        if segment[index] == 40:
            depth = 1
            index += 1
            literal = bytearray()
            while index < len(segment) and depth > 0:
                char = segment[index]
                if char == 92:
                    literal.append(char)
                    index += 1
                    if index < len(segment):
                        literal.append(segment[index])
                elif char == 40:
                    depth += 1
                    literal.append(char)
                elif char == 41:
                    depth -= 1
                    if depth > 0:
                        literal.append(char)
                else:
                    literal.append(char)
                index += 1
            fragments.append(decode_pdf_literal(bytes(literal)))
        elif segment[index] == 60 and index + 1 < len(segment) and segment[index + 1] != 60:
            end = segment.find(b">", index + 1)
            if end == -1:
                break
            hex_text = segment[index + 1:end].decode("ascii", errors="ignore").replace(" ", "")
            try:
                fragments.append(bytes.fromhex(hex_text))
            except Exception:
                pass
            index = end + 1
        else:
            index += 1
    return fragments


def page_order(objects, page_tree_number):
    body = objects[page_tree_number]
    if b"/Type/Pages" not in body:
        return [page_tree_number]
    kids_match = re.search(rb"/Kids\[(.*?)\]", body, re.S)
    if not kids_match:
        return [page_tree_number]
    ordered_pages = []
    for child_number in [int(value) for value in re.findall(rb"(\d+)\s+0\s+R", kids_match.group(1))]:
        ordered_pages.extend(page_order(objects, child_number))
    return ordered_pages


def extract_page_text(objects, page_number, font_cmaps):
    page = objects[page_number]
    font_map = {}
    fonts_match = re.search(rb"/Font<<(.+?)>>", page, re.S)
    if fonts_match:
        font_map = {
            name.decode("latin1"): int(object_number)
            for name, object_number in re.findall(rb"/([A-Za-z0-9_]+)\s+(\d+)\s+0\s+R", fonts_match.group(1))
        }

    contents_match = re.search(rb"/Contents\s*\[(.*?)\]", page, re.S)
    if contents_match:
        content_numbers = [int(value) for value in re.findall(rb"(\d+)\s+0\s+R", contents_match.group(1))]
    else:
        single_match = re.search(rb"/Contents\s+(\d+)\s+0\s+R", page)
        content_numbers = [int(single_match.group(1))] if single_match else []

    token_pattern = re.compile(
        rb"/([A-Za-z0-9_]+)\s+[\d\.]+\s+Tf|\[(.*?)\]\s*TJ|(\(.*?[^\\]\)|<[^>]+>)\s*Tj",
        re.S,
    )
    current_font = None
    text_parts = []

    for content_number in content_numbers:
        stream = get_stream(objects.get(content_number))
        if not stream:
            continue
        for match in token_pattern.finditer(stream):
            if match.group(1):
                current_font = font_map.get(match.group(1).decode("latin1"))
            elif match.group(2):
                for raw_fragment in extract_text_fragments(match.group(2)):
                    text_parts.append(decode_font_bytes(raw_fragment, font_cmaps.get(current_font, {})))
                text_parts.append("\n")
            elif match.group(3):
                fragments = extract_text_fragments(match.group(3))
                if fragments:
                    text_parts.append(decode_font_bytes(fragments[0], font_cmaps.get(current_font, {})))
                    text_parts.append("\n")

    return "".join(text_parts)


def clean_page_text(text):
    cleaned = text.replace("\x08", " ").replace("\x00", " ")
    cleaned = re.sub(r"[\x01-\x1f]", " ", cleaned)
    cleaned = cleaned.replace("\u2019", "'").replace("\u2018", "'")
    cleaned = cleaned.replace("\u2013", "-").replace("\u2014", "-")
    cleaned = cleaned.replace("\u2212", "-")
    cleaned = cleaned.replace("??", " ")
    cleaned = cleaned.replace(" ? ", " ")
    cleaned = re.sub(r"[^\x20-\x7e\n]", " ", cleaned)
    cleaned = re.sub(r"\s+\n", "\n", cleaned)
    cleaned = re.sub(r"\n\s+", "\n", cleaned)
    cleaned = re.sub(r" {2,}", " ", cleaned)
    return cleaned.strip()


def clean_heading(text):
    heading = re.sub(r"[^A-Z0-9/&'\- ]+", " ", text.upper())
    heading = re.sub(r" {2,}", " ", heading).strip(" -")
    return heading


def title_case_heading(heading):
    small_words = {"and", "of", "the", "in", "at", "to", "or", "for", "on", "with"}
    words = []
    for index, part in enumerate(heading.split()):
        if "/" in part:
            slash_parts = []
            for slash_index, slash_part in enumerate(part.split("/")):
                lower = slash_part.lower()
                if (index == 0 and slash_index == 0) or lower not in small_words:
                    slash_parts.append(lower[:1].upper() + lower[1:])
                else:
                    slash_parts.append(lower)
            words.append("/".join(slash_parts))
            continue
        lower = part.lower()
        if index == 0 or lower not in small_words:
            words.append(lower[:1].upper() + lower[1:])
        else:
            words.append(lower)
    return " ".join(words)


def clean_rule_body(text):
    body = re.sub(r"\bSEE ALSO\b.*$", "", text, flags=re.S)
    body = re.sub(r"\b\d+\s*$", "", body)
    body = re.sub(r"\s+", " ", body)
    body = body.replace(" . ", ". ").replace(" ,", ",")
    body = body.replace(" ? ", " ")
    body = re.sub(r" {2,}", " ", body)
    return body.strip()


def build_keywords(code, title, topic_label):
    keywords = [code]
    for source in (title, topic_label):
        for token in re.split(r"[^A-Za-z0-9]+", source.lower()):
            if len(token) >= 3 and token not in keywords:
                keywords.append(token)
    return keywords


def split_rules(chapter_text, chapter):
    if chapter["number"]:
        code_prefix = chapter["number"] + r"\.\d{2}"
    else:
        code_prefix = r"(?:24\.\d{2}|25\.\d{2})"
    pattern = re.compile(
        r"(?:^|\s)(?:\d{1,2}\s*(?:\.\s*)?)?([A-Z][A-Z0-9/&'\- ]+?)\s+(" + code_prefix + r")(?=\s)",
        re.S,
    )

    entries = []
    matches = list(pattern.finditer(chapter_text))
    for index, match in enumerate(matches):
        title_text = clean_heading(match.group(1))
        if not title_text:
            continue
        code = match.group(2)
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(chapter_text)
        body = clean_rule_body(chapter_text[start:end])
        if not body:
            continue
        title = title_case_heading(title_text)
        entries.append(
            {
                "id": code.lower().replace(".", "-") + "-" + re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-"),
                "title": code + " " + title,
                "summary": "",
                "bodySegments": [body],
                "keywords": build_keywords(code, title, chapter["label"]),
            }
        )
    return entries


def build_rulebook_database(pdf_path):
    objects = parse_all_objects(pdf_path.read_bytes())
    font_cmaps = {}
    for object_number, body in objects.items():
        if b"/Type/Font" not in body or b"/ToUnicode" not in body:
            continue
        match = re.search(rb"/ToUnicode\s+(\d+)\s+0\s+R", body)
        if not match:
            continue
        stream = get_stream(objects.get(int(match.group(1))))
        if stream:
            font_cmaps[object_number] = parse_cmap(stream)

    page_numbers = page_order(objects, 1242)
    chapters = []
    for index, chapter in enumerate(CHAPTERS):
        start_page = chapter["start_page"]
        end_page = CHAPTERS[index + 1]["start_page"] - 1 if index + 1 < len(CHAPTERS) else len(page_numbers)
        extracted_pages = []
        for page_index in range(start_page - 1, min(end_page, len(page_numbers))):
            extracted_pages.append(clean_page_text(extract_page_text(objects, page_numbers[page_index], font_cmaps)))
        chapter_text = " ".join(segment for segment in extracted_pages if segment)
        entries = split_rules(chapter_text, chapter)
        if not entries:
            continue
        chapters.append(
            {
                "id": chapter["id"],
                "label": chapter["label"],
                "entries": entries,
            }
        )

    return {
        "id": "11th",
        "name": "Warhammer 40,000 11th Edition",
        "summary": "Searchable chapter-and-rule reference parsed from the official 11th Edition Core Rules PDF.",
        "topics": chapters,
    }


def render_javascript(edition_record, source_name):
    payload = {
        "source": {
            "name": source_name,
            "verifiedAt": "2026-07-03",
        },
        "edition": edition_record,
    }
    json_text = json.dumps(payload, indent=2, ensure_ascii=True)
    return (
        "(function () {\n"
        "  const payload = " + json_text.replace("\n", "\n  ") + ";\n"
        "  const database = window.WH40K_RULEBOOK_DATABASE || { source: {}, editions: [] };\n"
        "  database.source = Object.assign({}, database.source || {}, payload.source || {});\n"
        "  database.editions = Array.isArray(database.editions) ? database.editions.filter(function (edition) {\n"
        "    return edition && edition.id !== payload.edition.id;\n"
        "  }) : [];\n"
        "  database.editions.push(payload.edition);\n"
        "  database.editions.sort(function (left, right) {\n"
        "    return String(left.id || '').localeCompare(String(right.id || ''));\n"
        "  });\n"
        "  window.WH40K_RULEBOOK_DATABASE = database;\n"
        "}());\n"
    )


def main():
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python tools/generate_rulebook_11th.py <input-pdf> <output-js>")

    input_pdf = Path(sys.argv[1])
    output_js = Path(sys.argv[2])

    edition_record = build_rulebook_database(input_pdf)
    output_js.write_text(render_javascript(edition_record, input_pdf.name), encoding="utf-8")


if __name__ == "__main__":
    main()
