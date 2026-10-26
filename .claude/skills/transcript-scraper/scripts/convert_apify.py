#!/usr/bin/env python3
"""
Convert Apify "YouTube Transcript Scraper" (devsef) JSON exports into one clean
.txt transcript per episode.

Reads every .json file in <dir>/apify_exports/, looks each video up in
<dir>/episode_index.json for its date, title and guests, and writes
"YYYY-MM-DD – Episode Title.txt" into <dir>. Makes no YouTube requests.

Each file has a 5-line header (Show, Date, Title, YouTube, Guests), then the
transcript with duplicate lines and [Music]-type cues removed and a [m:ss]
marker about every 2 minutes.

Safe to re-run: episodes that already have a .txt file are skipped, and when a
video appears in several exports the successful one wins.
Writes failures.txt (every failure + reason) and retry_links.txt (failures
worth another Apify run).

Usage:
    python convert_apify.py --dir "path/to/show folder"
"""

import argparse
import json
import re
from datetime import datetime
from pathlib import Path

MARKER_EVERY = 120          # seconds between [mm:ss] markers

CUE_RE = re.compile(r"\[[^\]]*\]|\([^)]*(music|applause|laugh|inaudible)[^)]*\)|[♪♫]", re.I)
LINK_RE = re.compile(r"^YouTube: https://www\.youtube\.com/watch\?v=([\w-]{11})", re.M)
ID_RE = re.compile(r"(?:v=|youtu\.be/|/shorts/|/embed/|/live/)([\w-]{11})")
# devsef statuses: ok, no_transcript, unavailable, blocked, error
STATUS_REASONS = {
    "no_transcript": "No captions available",
    "unavailable": "Video unavailable (private, deleted or region-locked)",
    "blocked": "Blocked by YouTube (retry it in Apify)",
    "error": "Apify error (retry it in Apify)",
}
RETRYABLE = {"blocked", "error"}


def already_saved(out_dir):
    """Video IDs found in the headers of existing transcript files."""
    ids = set()
    for f in out_dir.glob("*.txt"):
        m = LINK_RE.search(f.read_text(encoding="utf-8", errors="ignore")[:2000])
        if m:
            ids.add(m.group(1))
    return ids


def to_seconds(value):
    """Accept 83.4, "83.4", "1:23" or "00:01:23.400"."""
    if isinstance(value, (int, float)):
        return float(value)
    value = str(value).strip()
    if ":" in value:
        secs = 0.0
        for part in value.split(":"):
            secs = secs * 60 + float(part)
        return secs
    return float(value)


def parse_segments(raw):
    """Apify segments (dicts or [start, duration, text] lists) -> sorted (start, text)."""
    out = []
    for seg in raw or []:
        if isinstance(seg, dict):
            start = seg.get("start", seg.get("offset", seg.get("startTime", 0)))
            text = seg.get("text", "")
        elif isinstance(seg, (list, tuple)) and len(seg) >= 3:
            start, text = seg[0], seg[2]
        else:
            continue
        try:
            out.append((to_seconds(start), str(text)))
        except (TypeError, ValueError):
            continue
    return sorted(out, key=lambda s: s[0])


def fmt_time(seconds):
    seconds = int(seconds)
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"[{h}:{m:02d}:{s:02d}]" if h else f"[{m}:{s:02d}]"


def clean_line(text):
    text = CUE_RE.sub("", text.replace("\n", " "))
    text = re.sub(r"^\s*>>\s*", "", text)
    return re.sub(r"\s+", " ", text).strip()


def clean_transcript(segments):
    """Plain text with duplicate lines and cues removed, marker every ~2 min."""
    paragraphs, current, last_line, next_marker = [], [], None, 0
    for start, raw in segments:
        if start >= next_marker:
            if current:
                paragraphs.append(" ".join(current))
                current = []
            marker = int(start // MARKER_EVERY) * MARKER_EVERY
            paragraphs.append(fmt_time(marker))
            next_marker = marker + MARKER_EVERY
        text = clean_line(raw)
        if not text or text.lower() == (last_line or "").lower():
            continue
        current.append(text)
        last_line = text
    if current:
        paragraphs.append(" ".join(current))
    return "\n\n".join(paragraphs).strip()


def safe_filename(date, title):
    """Replace characters macOS/Windows don't allow in file names."""
    title = re.sub(r'[\\/:*?"<>|]', "-", title)
    title = re.sub(r"\s+", " ", title).strip(" .")[:150]
    return f"{date or '0000-00-00'} – {title}.txt"


def body_word_count(path):
    text = path.read_text(encoding="utf-8")
    body = text.split("\n" + "=" * 60 + "\n", 1)[-1]
    body = re.sub(r"\[\d+(?::\d{2}){1,2}\]", "", body)
    return len(body.split())


def load_items(exports):
    """All result items from every .json file in apify_exports/."""
    items = []
    for f in sorted(exports.glob("*.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            # JSONL export: one object per line
            data = [json.loads(line) for line in f.read_text(encoding="utf-8").splitlines()
                    if line.strip()]
        if isinstance(data, dict):
            data = data.get("items") or data.get("data") or [data]
        items.extend(d for d in data if isinstance(d, dict))
        print(f"Read {f.name}")
    return items


def video_id_of(item):
    vid = item.get("videoId") or item.get("video_id") or item.get("id")
    if vid and re.fullmatch(r"[\w-]{11}", str(vid)):
        return str(vid)
    m = ID_RE.search(str(item.get("url") or item.get("inputUrl") or ""))
    return m.group(1) if m else None


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--dir", type=Path, default=Path(__file__).resolve().parent,
                   help="show folder with episode_index.json and apify_exports/ (default: script's folder)")
    p.add_argument("--show", help="show name for headers (default: from episode_index.json)")
    args = p.parse_args()
    out_dir = args.dir.resolve()
    exports = out_dir / "apify_exports"
    failures_path = out_dir / "failures.txt"
    retry_path = out_dir / "retry_links.txt"

    index_data = json.loads((out_dir / "episode_index.json").read_text(encoding="utf-8"))
    if isinstance(index_data, dict):
        episodes, show = index_data["episodes"], index_data.get("show")
    else:
        episodes, show = index_data, None
    show = args.show or show or out_dir.name
    index = {e["id"]: e for e in episodes}

    items = load_items(exports) if exports.exists() else []
    if not items:
        # Leave failures.txt alone: an empty run shouldn't erase the last report
        print(f"No .json files in {exports} - nothing to convert.")
        return
    # A video retried in a later run: use its successful result, not the failed one
    items.sort(key=lambda i: str(i.get("status") or "ok").lower() != "ok")

    done = already_saved(out_dir)
    print(f"{len(items)} videos in Apify exports, {len(done)} episodes already saved.\n")

    created, skipped, failures, retry, seen = 0, 0, [], [], set()
    for item in items:
        vid = video_id_of(item)
        label = item.get("title") or item.get("url") or "(unknown video)"
        if not vid:
            failures.append(("?", label, "Could not find a video ID in the Apify item"))
            continue
        if vid in done or vid in seen:
            skipped += 1
            continue
        seen.add(vid)

        ep = index.get(vid)
        if not ep:
            failures.append((vid, label, "Not in episode_index.json (re-run build_index.py?)"))
            continue

        status = str(item.get("status") or "ok").lower()
        if status != "ok":
            reason = STATUS_REASONS.get(status, f"Apify status: {status}")
            if item.get("error"):
                reason += f" ({str(item['error'])[:150]})"
            failures.append((vid, ep["title"], reason))
            if status in RETRYABLE:
                retry.append(ep["url"])
            continue

        segments = parse_segments(item.get("segments"))
        body = clean_transcript(segments) if segments else clean_line(str(item.get("text") or ""))
        if not body:
            failures.append((vid, ep["title"], "No transcript text in Apify output"))
            continue

        header = "\n".join([
            f"Show: {show}",
            f"Date: {ep.get('date') or 'unknown'}",
            f"Title: {ep['title']}",
            f"YouTube: https://www.youtube.com/watch?v={vid}",
            f"Guests: {ep.get('guests') or 'Not listed'}",
        ])
        path = out_dir / safe_filename(ep.get("date"), ep["title"])
        path.write_text(f"{header}\n{'=' * 60}\n\n{body}\n", encoding="utf-8")
        created += 1
        note = "" if segments else "  (no timestamps: turn on 'Include timestamped segments' in Apify)"
        print(f"saved: {path.name}{note}")

    with failures_path.open("w", encoding="utf-8") as f:
        f.write(f"Failures from convert_apify.py run at {datetime.now():%Y-%m-%d %H:%M}\n\n")
        for vid, title, reason in failures:
            link = f"https://www.youtube.com/watch?v={vid}" if vid != "?" else "-"
            f.write(f"{link}\t{title}\t{reason}\n")
    if retry:
        retry_path.write_text("".join(u + "\n" for u in retry), encoding="utf-8")
    elif retry_path.exists():
        retry_path.unlink()

    files = [f for f in out_dir.glob("*.txt")
             if LINK_RE.search(f.read_text(encoding="utf-8", errors="ignore")[:2000])]
    reasons = {}
    for _, _, r in failures:
        reasons[r] = reasons.get(r, 0) + 1

    print("\n===== SUMMARY =====")
    print(f"Files created:           {created}")
    print(f"Skipped (already saved): {skipped}")
    print(f"Failed:                  {len(failures)}")
    for r, n in sorted(reasons.items(), key=lambda x: -x[1]):
        print(f"    {n:4d}  {r}")
    if retry:
        print(f"Worth retrying:          {len(retry)}  (links in retry_links.txt)")
    print(f"Transcripts in folder:   {len(files)} of {len(index)} episodes")
    print(f"Total transcript words:  {sum(body_word_count(f) for f in files):,}")


if __name__ == "__main__":
    main()
