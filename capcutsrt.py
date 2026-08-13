import json
import re
import os


# ============================================================
# KONFIGURASI
# ============================================================

INPUT_JSON = "draft_content.json"
OUTPUT_SRT = "subtitle.srt"


# ============================================================
# KONVERSI WAKTU CAPCUT -> SRT
# CapCut menggunakan microsecond
# SRT menggunakan HH:MM:SS,mmm
# ============================================================

def capcut_time_to_srt(microseconds):
    milliseconds = round(microseconds / 1000)

    hours = milliseconds // 3_600_000
    milliseconds %= 3_600_000

    minutes = milliseconds // 60_000
    milliseconds %= 60_000

    seconds = milliseconds // 1_000
    milliseconds %= 1_000

    return (
        f"{hours:02d}:"
        f"{minutes:02d}:"
        f"{seconds:02d},"
        f"{milliseconds:03d}"
    )


# ============================================================
# MEMBERSIHKAN TEXT CAPCUT
# ============================================================

def clean_capcut_text(content):
    if not content:
        return ""

    # CapCut biasanya menyimpan text seperti:
    #
    # <font ...>
    # <color=...>
    # <size=...>
    # [isi subtitle]
    # </size></color></font>

    # Prioritas: ambil isi di dalam [ ... ]
    match = re.search(r"\[([^\]]*)\]", content)

    if match:
        text = match.group(1)
    else:
        text = content

    # Hapus tag XML/HTML jika masih ada
    text = re.sub(r"<[^>]+>", "", text)

    # Decode beberapa entity HTML umum
    text = (
        text.replace("&amp;", "&")
            .replace("&lt;", "<")
            .replace("&gt;", ">")
            .replace("&quot;", '"')
            .replace("&#39;", "'")
    )

    # Rapikan whitespace
    text = re.sub(r"\s+", " ", text).strip()

    return text


# ============================================================
# BACA JSON
# ============================================================

if not os.path.exists(INPUT_JSON):
    raise FileNotFoundError(
        f"File tidak ditemukan: {INPUT_JSON}"
    )

with open(INPUT_JSON, "r", encoding="utf-8") as f:
    data = json.load(f)


# ============================================================
# AMBIL MATERIAL TEXT
# ============================================================

materials = data.get("materials", {})

texts = materials.get("texts", [])

if not texts:
    raise ValueError(
        "Tidak ditemukan materials.texts di dalam JSON."
    )


# ============================================================
# BUAT MAP:
#
# ID MATERIAL -> TEXT
#
# Contoh:
# {
#     "ABC123": "Halo",
#     "DEF456": "Assalamualaikum"
# }
# ============================================================

text_map = {}

for item in texts:

    material_id = item.get("id")

    if not material_id:
        continue

    content = item.get("content", "")

    text = clean_capcut_text(content)

    if text:
        text_map[material_id] = text


# ============================================================
# CARI TRACK SUBTITLE
#
# CapCut menyimpan subtitle pada:
#
# tracks[]
#     type = "text"
#
# ============================================================

tracks = data.get("tracks", [])

text_tracks = [
    track
    for track in tracks
    if track.get("type") == "text"
]


if not text_tracks:
    raise ValueError(
        "Tidak ditemukan track subtitle dengan type='text'."
    )


# ============================================================
# EKSTRAK SEGMENT
# ============================================================

subtitles = []

for track in text_tracks:

    segments = track.get("segments", [])

    for segment in segments:

        material_id = segment.get("material_id")

        if not material_id:
            continue

        text = text_map.get(material_id, "")

        if not text:
            continue

        timerange = segment.get(
            "target_timerange",
            {}
        )

        start = timerange.get("start", 0)
        duration = timerange.get("duration", 0)

        if duration <= 0:
            continue

        end = start + duration

        subtitles.append({
            "start": start,
            "end": end,
            "text": text
        })


# ============================================================
# URUTKAN BERDASARKAN WAKTU
# ============================================================

subtitles.sort(
    key=lambda x: x["start"]
)


# ============================================================
# TULIS FILE SRT
# ============================================================

with open(
    OUTPUT_SRT,
    "w",
    encoding="utf-8-sig",
    newline="\n"
) as f:

    for index, subtitle in enumerate(
        subtitles,
        start=1
    ):

        start = capcut_time_to_srt(
            subtitle["start"]
        )

        end = capcut_time_to_srt(
            subtitle["end"]
        )

        text = subtitle["text"]

        f.write(
            f"{index}\n"
            f"{start} --> {end}\n"
            f"{text}\n\n"
        )


# ============================================================
# INFORMASI HASIL
# ============================================================

print("=" * 60)
print("EKSTRAK SUBTITLE SELESAI")
print("=" * 60)
print(f"Input  : {INPUT_JSON}")
print(f"Output : {OUTPUT_SRT}")
print(f"Jumlah subtitle : {len(subtitles)}")
print("=" * 60)