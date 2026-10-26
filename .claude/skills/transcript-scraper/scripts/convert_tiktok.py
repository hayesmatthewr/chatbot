#!/usr/bin/env python3
"""
Convert Apify "TikTok Transcript Scraper" (mu0i) JSON exports into one clean
.txt transcript per TikTok.

Reads every .json file in <dir>/apify_exports/, keeps posts on or after --since
(or from the last --years), and writes "YYYY-MM-DD – <caption start>.txt" into
<dir>. Each file has a 5-line header (Show, Date, Title, TikTok, Caption), then
the spoken transcript with duplicate lines and [Music]-type cues removed.

Safe to re-run: videos that already have a .txt file are skipped.
Writes no_captions.txt (in-range videos TikTok has no caption track for).

Posts whose username is missing in the export get --handle in their link.

Usage:
    python convert_tiktok.py --dir "path/to/creator folder" --show "Name (TikTok)" --handle creatorhandle --years 1
"""

import argparse
import json
import re
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

CUE_RE = re.compile(r"\[[^\]]*\]|\([^)]*(music|applause|laugh|inaudible)[^)]*\)|[♪♫]", re.I)
LINK_RE = re.compile(r"^TikTok: (https://www\.tiktok\.com/\S+/(\d+))", re.M)
SEP = "=" * 60


def post_date(item):
    """createdAt, or the post time TikTok encodes in the video ID when it's missing."""
    if item.get("createdAt"):
        return item["createdAt"][:10]
    seconds = int(item["videoId"]) >> 32
    return datetime.fromtimestamp(seconds, timezone.utc).date().isoformat()


def already_saved(out_dir):
    ids = set()
    for f in out_dir.glob("*.txt"):
        m = LINK_RE.search(f.read_text(encoding="utf-8", errors="ignore")[:4000])
        if m:
            ids.add(m.group(2))
    return ids


def clean_transcript(item):
    """Join caption cues into plain text, dropping cues and repeated lines."""
    lines = [s.get("text", "") for s in item.get("segments") or [] if isinstance(s, dict)]
    if not lines:
        lines = [str(item.get("text") or "")]
    out, last = [], None
    for raw in lines:
        text = CUE_RE.sub("", raw.replace("\n", " "))
        text = re.sub(r"\s+", " ", text).strip()
        if not text or text.lower() == (last or "").lower():
            continue
        out.append(text)
        last = text
    return " ".join(out).strip()


def short_title(description, vid):
    """First line of the caption without hashtags, trimmed to ~80 chars."""
    first = (description or "").strip().splitlines()[0] if (description or "").strip() else ""
    first = re.sub(r"#\S+", "", first)
    first = re.sub(r"\s+", " ", first).strip(" -–|")
    if not first:
        return f"TikTok {vid}"
    return first if len(first) <= 80 else first[:77].rsplit(" ", 1)[0] + "…"


def safe_filename(day, title):
    title = re.sub(r'[\\/:*?"<>|]', "-", title)
    title = re.sub(r"\s+", " ", title).strip(" .")[:150]
    return f"{day} – {title}.txt"


def body_word_count(path):
    return len(path.read_text(encoding="utf-8").split("\n" + SEP + "\n", 1)[-1].split())


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--dir", type=Path, default=Path(__file__).resolve().parent)
    p.add_argument("--show", help="show name for headers (default: folder name + ' (TikTok)')")
    p.add_argument("--since", help="keep posts on or after YYYY-MM-DD")
    p.add_argument("--years", type=float, help="keep posts from the last N years")
    p.add_argument("--handle", help="creator's TikTok handle, used when a row has no username")
    args = p.parse_args()
    out_dir = args.dir.resolve()
    show = args.show or f"{out_dir.name} (TikTok)"
    cutoff = args.since or ((date.today() - timedelta(days=round(365.25 * args.years))).isoformat()
                            if args.years else "0000-00-00")

    items = {}
    for f in sorted((out_dir / "apify_exports").glob("*.json")):
        print(f"Read {f.name}")
        for it in json.loads(f.read_text(encoding="utf-8")):
            vid = str(it.get("videoId") or "")
            # Prefer a row that has a transcript if the same video appears twice
            if vid and (vid not in items or (it.get("hasTranscript") and not items[vid].get("hasTranscript"))):
                items[vid] = it
    if not items:
        print("No .json files in apify_exports/ - nothing to convert.")
        return

    done = already_saved(out_dir)
    in_range = [it for it in items.values() if post_date(it) >= cutoff]
    older = len(items) - len(in_range)
    in_range.sort(key=post_date)
    print(f"{len(items)} videos in exports: {len(in_range)} since {cutoff}, {older} older (skipped).\n")

    created, skipped, no_caps, used_names = 0, 0, [], set()
    for it in in_range:
        vid, day = str(it["videoId"]), post_date(it)
        author = it.get('authorUsername') or (args.handle or '').lstrip('@') or '_'
        url = it.get("url") or f"https://www.tiktok.com/@{author}/video/{vid}"
        if vid in done:
            skipped += 1
            continue
        body = clean_transcript(it) if it.get("hasTranscript") else ""
        if not body:
            no_caps.append((day, url, it.get("note") or "No caption track"))
            continue
        title = short_title(it.get("description"), vid)
        name = safe_filename(day, title)
        if name in used_names or (out_dir / name).exists():
            name = safe_filename(day, f"{title} ({vid[-6:]})")
        used_names.add(name)
        caption = re.sub(r"\s+", " ", it.get("description") or "").strip() or "(none)"
        header = "\n".join([f"Show: {show}", f"Date: {day}", f"Title: {title}",
                            f"TikTok: {url}", f"Caption: {caption}"])
        (out_dir / name).write_text(f"{header}\n{SEP}\n\n{body}\n", encoding="utf-8")
        created += 1

    with (out_dir / "no_captions.txt").open("w", encoding="utf-8") as f:
        f.write(f"{show}: posts since {cutoff} with no TikTok caption track, so no transcript.\n\n")
        for day, url, note in no_caps:
            f.write(f"{day}\t{url}\t{note}\n")

    files = [f for f in out_dir.glob("*.txt") if LINK_RE.search(
        f.read_text(encoding="utf-8", errors="ignore")[:4000])]
    dates = sorted(post_date(it) for it in items.values())
    print("===== SUMMARY =====")
    print(f"Oldest video returned:   {dates[0] if dates else '-'}  (cutoff {cutoff})")
    if dates and dates[0] >= cutoff:
        print("  Note: the oldest post is still inside the range, so older in-range posts may be missing.\n"
              "  If Apify returned exactly your 'Videos per creator' limit, raise it and run again.")
    print(f"Files created:           {created}")
    print(f"Skipped (already saved): {skipped}")
    print(f"No captions:             {len(no_caps)}  (see no_captions.txt)")
    print(f"Transcripts in folder:   {len(files)}")
    print(f"Total transcript words:  {sum(body_word_count(f) for f in files):,}")


if __name__ == "__main__":
    main()
