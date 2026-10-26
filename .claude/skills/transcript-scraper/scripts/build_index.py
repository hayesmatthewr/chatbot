#!/usr/bin/env python3
"""
Build the episode list for a podcast or YouTube source. Metadata only: no
captions, video or audio are downloaded.

Writes into --out:
  episode_index.json      {"show": ..., "episodes": [{id, title, date, url, description, guests}]}
  links_part1.txt, ...    YouTube links still needing a transcript, 200 per file (Apify's max per run)
  unmatched_episodes.txt  RSS mode only: episodes with no matching YouTube video

Sources (pick one; --rss is optional alongside --youtube):
  --youtube URL       channel (https://www.youtube.com/@handle), a channel tab, or a playlist URL
  --rss URL           podcast RSS feed: episode list, dates and descriptions come from here,
                      and each episode is matched to a YouTube video by title
  --videos-file FILE  text file with one YouTube link per line

Without --rss, each video's date and description is fetched from YouTube one at a
time with random 3-8 second pauses. Progress is saved after every video, so re-running
continues where it stopped.

Examples:
  python build_index.py --out "Example Show" --show "Example Show" --youtube https://www.youtube.com/@channelname --years 1
  python build_index.py --out "Example Podcast" --show "Example Podcast" --youtube https://www.youtube.com/@channelname \\
      --rss https://example.com/podcast/feed.xml --years 2
  python build_index.py --youtube https://www.youtube.com/@channelname --count-only

Requires: yt-dlp (pip install yt-dlp)
"""

import argparse
import difflib
import email.utils
import html
import json
import random
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

try:
    import yt_dlp
except ImportError:
    sys.exit("yt-dlp is not installed. Run: python -m pip install yt-dlp")

PART_SIZE = 200             # Apify's YouTube Transcript Scraper takes at most 200 per run
PAUSE_RANGE = (3, 8)        # seconds between per-video metadata requests
MAX_ERRORS_IN_A_ROW = 3
LINK_RE = re.compile(r"^YouTube: https://www\.youtube\.com/watch\?v=([\w-]{11})", re.M)
ID_RE = re.compile(r"(?:v=|youtu\.be/|/shorts/|/embed/|/live/)([\w-]{11})")

# --- guest detection (best effort) -------------------------------------------------

NAME = r"[A-Z][\w'’.-]+(?: (?:[A-Z][\w'’.-]+|de|van|von|da|del|la)){1,3}"
ROLE_WORDS = {"Co-Founder", "Founder", "CEO", "CMO", "COO", "CFO", "CTO", "President",
              "Chief", "Officer", "Head", "VP", "Of", "And", "&", "Former", "Partner",
              "Strategy", "Manager", "Director", "Senior", "Lead", "Growth", "Marketing",
              "Media", "Buyer", "Analyst", "Creative", "Strategist"}
NOT_PEOPLE = {"Co", "Inc", "Brands", "Person", "Clients", "Team", "Agency", "Podcast",
              "Show", "Episode", "Channel"}


def _strip_roles(name):
    """'Skullcandy CEO Brian Garofalow' -> 'Brian Garofalow'."""
    words = re.split(r"\s+", name.strip(" ,"))
    last_role = max((i for i, w in enumerate(words) if w.strip(",") in ROLE_WORDS), default=-1)
    words = words[last_role + 1:]
    if len(words) > 1 and words[0] == words[1]:
        words = words[1:]
    return " ".join(words).strip(" ,")


def find_guests(description, title, hosts):
    guests = []
    for line in (description or "").splitlines():
        m = re.match(r"\s*(?:guests?|featuring|feat\.?|ft\.?|special guests?)\s*[:\-–]\s*(.+)",
                     line, re.I)
        if m:
            guests.extend(g.strip() for g in re.split(r",| and | & ", m.group(1)))
    for m in re.finditer(rf"\b(?:ft\.?|feat\.?|featuring|with) (?:[A-Z]+ )?({NAME})", title or ""):
        guests.append(m.group(1))
    first_para = (description or "")[:600]
    for m in re.finditer(rf"({NAME})(?:,[^.]{{0,80}},)? (?:joins|joined) ", first_para):
        guests.append(m.group(1))
    for m in re.finditer(rf"(?:joined by|sit down with|sits down with|welcome) ({NAME})",
                         first_para):
        guests.append(m.group(1))
    seen, out = set(), []
    for g in guests:
        g = _strip_roles(g)
        words = g.split()
        if (2 <= len(words) <= 4 and not set(words) & NOT_PEOPLE
                and g.lower() not in hosts and g.lower() not in seen):
            seen.add(g.lower())
            out.append(g)
    return "; ".join(out) if out else "Not listed"


# --- helpers --------------------------------------------------------------------------

def norm(s):
    return re.sub(r"[^a-z0-9 ]", "", (s or "").lower().replace("’", "'")).strip()


def clean_html(text):
    text = re.sub(r"<br\s*/?>|</p>", "\n", text or "", flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    return re.sub(r"\n{3,}", "\n\n", html.unescape(text)).strip()


def youtube_list_url(url):
    """A bare channel URL lists its Videos tab (full uploads, not Shorts)."""
    if "list=" in url or re.search(r"/(videos|streams|podcasts|shorts|playlists)/?$", url):
        return url
    if re.search(r"youtube\.com/(@[^/]+|channel/[^/]+|c/[^/]+|user/[^/]+)/?$", url):
        return url.rstrip("/") + "/videos"
    return url


def list_youtube(url):
    """[(id, title)] in the order YouTube lists them (newest first for channel tabs)."""
    opts = {"extract_flat": "in_playlist", "quiet": True, "no_warnings": True}
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(youtube_list_url(url), download=False)
    out = []
    for e in info.get("entries") or []:
        if e and e.get("id") and len(e["id"]) == 11:
            out.append((e["id"], e.get("title") or ""))
    return out


def read_rss(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 transcript-scraper"})
    with urllib.request.urlopen(req, timeout=60) as r:
        root = ET.fromstring(r.read())
    episodes = []
    for item in root.iter("item"):
        raw_date = item.findtext("pubDate")
        if not raw_date:
            continue
        published = email.utils.parsedate_to_datetime(raw_date)
        if published.tzinfo is None:
            published = published.replace(tzinfo=timezone.utc)
        episodes.append({"title": (item.findtext("title") or "").strip(),
                         "date": published.date().isoformat(),
                         "description": clean_html(item.findtext("description"))})
    return episodes


def saved_ids(out_dir):
    ids = set()
    for f in out_dir.glob("*.txt"):
        m = LINK_RE.search(f.read_text(encoding="utf-8", errors="ignore")[:2000])
        if m:
            ids.add(m.group(1))
    return ids


def load_index(path):
    if not path.exists():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    episodes = data["episodes"] if isinstance(data, dict) else data
    return {e["id"]: e for e in episodes}


def save_index(path, show, episodes):
    path.write_text(json.dumps({"show": show, "episodes": episodes}, indent=2,
                               ensure_ascii=False), encoding="utf-8")


def write_link_parts(out_dir, episodes, done):
    for old in out_dir.glob("links_part*.txt"):
        old.unlink()
    remaining = [e["url"] for e in episodes if e["id"] not in done]
    parts = [remaining[i:i + PART_SIZE] for i in range(0, len(remaining), PART_SIZE)]
    for n, chunk in enumerate(parts, 1):
        (out_dir / f"links_part{n}.txt").write_text("".join(u + "\n" for u in chunk),
                                                    encoding="utf-8")
    return [len(c) for c in parts]


# --- modes --------------------------------------------------------------------------

def rss_mode(args, cutoff, hosts):
    print(f"Reading RSS feed {args.rss} ...")
    feed = [e for e in read_rss(args.rss) if not cutoff or e["date"] >= cutoff]
    if args.limit:
        feed = feed[:args.limit]
    print(f"{len(feed)} feed episodes in range.")
    print(f"Listing YouTube videos from {youtube_list_url(args.youtube)} ...")
    videos = list_youtube(args.youtube)
    by_title = {norm(t): vid for vid, t in videos}
    print(f"{len(videos)} YouTube videos found.")

    episodes, unmatched, used = [], [], set()
    for ep in feed:
        key = norm(ep["title"])
        vid = by_title.get(key)
        if not vid:
            close = difflib.get_close_matches(key, by_title.keys(), n=1, cutoff=0.85)
            vid = by_title[close[0]] if close else None
        if not vid or vid in used:
            unmatched.append(ep)
            continue
        used.add(vid)
        episodes.append({"id": vid, "title": ep["title"], "date": ep["date"],
                         "url": f"https://www.youtube.com/watch?v={vid}",
                         "description": ep["description"],
                         "guests": find_guests(ep["description"], ep["title"], hosts)})

    with (args.out / "unmatched_episodes.txt").open("w", encoding="utf-8") as f:
        f.write(f"{args.show}: episodes in the feed with no matching YouTube video\n"
                "(probably audio-only), so they can't be transcribed from YouTube captions.\n\n")
        for ep in unmatched:
            f.write(f"{ep['date']}\t{ep['title']}\n")
    return episodes, len(unmatched)


def youtube_mode(args, cutoff, hosts, video_ids):
    """Fetch each video's date/description from YouTube, slowly and resumably."""
    index_path = args.out / "episode_index.json"
    existing = load_index(index_path)
    episodes, errors_in_a_row, requests = [], 0, 0
    opts = {"quiet": True, "no_warnings": True, "skip_download": True,
            "ignore_no_formats_error": True}
    with yt_dlp.YoutubeDL(opts) as ydl:
        for n, (vid, title) in enumerate(video_ids, 1):
            if args.limit and len(episodes) >= args.limit:
                break
            ep = existing.get(vid)
            if not (ep and ep.get("date")):
                if requests:
                    time.sleep(random.uniform(*PAUSE_RANGE))
                requests += 1
                print(f"[{n}/{len(video_ids)}] {title[:80]}")
                try:
                    meta = ydl.extract_info(f"https://www.youtube.com/watch?v={vid}", download=False)
                    d = meta.get("upload_date") or ""
                    desc = meta.get("description") or ""
                    ep = {"id": vid, "title": meta.get("title") or title,
                          "date": f"{d[:4]}-{d[4:6]}-{d[6:]}" if len(d) == 8 else "",
                          "url": f"https://www.youtube.com/watch?v={vid}",
                          "description": desc,
                          "guests": find_guests(desc, meta.get("title") or title, hosts)}
                    existing[vid] = ep
                    errors_in_a_row = 0
                except Exception as e:  # noqa: BLE001 - note it and keep going
                    print(f"    FAILED: {str(e).splitlines()[0][:150]}")
                    errors_in_a_row += 1
                    if errors_in_a_row >= MAX_ERRORS_IN_A_ROW:
                        print("\nYouTube is refusing requests. Saved progress; wait an hour and re-run.")
                        break
                    continue
                save_index(index_path, args.show, list(existing.values()))
            if cutoff and ep["date"] and ep["date"] < cutoff:
                if args.stop_at_cutoff:
                    print(f"Reached {ep['date']}, before {cutoff}; stopping.")
                    break
                continue
            episodes.append(ep)
    return episodes


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--out", type=Path, default=Path("."), help="output folder (default: current)")
    p.add_argument("--show", default="", help="show name for the transcript headers")
    p.add_argument("--youtube", help="YouTube channel, channel tab or playlist URL")
    p.add_argument("--rss", help="podcast RSS feed URL (optional, with --youtube)")
    p.add_argument("--videos-file", type=Path, help="file with one YouTube link per line")
    p.add_argument("--since", help="only episodes on or after this date (YYYY-MM-DD)")
    p.add_argument("--years", type=float, help="only episodes from the last N years")
    p.add_argument("--limit", type=int, help="at most this many (most recent) episodes")
    p.add_argument("--hosts", default="", help="comma-separated host names to exclude from guests")
    p.add_argument("--count-only", action="store_true", help="just print how many videos the source has")
    args = p.parse_args()

    if not (args.youtube or args.videos_file):
        p.error("give --youtube or --videos-file")
    if args.count_only:
        vids = list_youtube(args.youtube)
        print(f"{len(vids)} videos at {youtube_list_url(args.youtube)}")
        for vid, t in vids[:5]:
            print(f"  newest: {t[:90]}")
        return

    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / "apify_exports").mkdir(exist_ok=True)
    if not args.show:
        args.show = args.out.resolve().name
    cutoff = args.since or ((date.today() - timedelta(days=round(365.25 * args.years))).isoformat()
                            if args.years else None)
    hosts = {h.strip().lower() for h in args.hosts.split(",") if h.strip()}
    hosts |= {args.show.lower()}
    unmatched = None

    if args.rss:
        if not args.youtube:
            p.error("--rss needs --youtube too (the RSS feed lists episodes; YouTube has the captions)")
        episodes, unmatched = rss_mode(args, cutoff, hosts)
    else:
        if args.videos_file:
            links = args.videos_file.read_text(encoding="utf-8").split()
            ids = [m.group(1) for m in map(ID_RE.search, links) if m]
            video_ids = [(v, "") for v in dict.fromkeys(ids)]
        else:
            print(f"Listing YouTube videos from {youtube_list_url(args.youtube)} ...")
            video_ids = list_youtube(args.youtube)
            print(f"{len(video_ids)} videos found.")
        # Channel tabs are newest-first, so we can stop at the date cutoff
        args.stop_at_cutoff = bool(args.youtube and "list=" not in args.youtube)
        episodes = youtube_mode(args, cutoff, hosts, video_ids)

    save_index(args.out / "episode_index.json", args.show, episodes)
    done = saved_ids(args.out)
    parts = write_link_parts(args.out, episodes, done)

    print("\n===== SUMMARY =====")
    print(f"Show:                    {args.show}")
    print(f"Episodes in index:       {len(episodes)}"
          + (f" ({min(e['date'] for e in episodes)} to {max(e['date'] for e in episodes)})"
             if episodes and all(e['date'] for e in episodes) else ""))
    if unmatched is not None:
        print(f"No YouTube match:        {unmatched}  (see unmatched_episodes.txt)")
    print(f"Already transcribed:     {len(done & {e['id'] for e in episodes})}")
    for n, size in enumerate(parts, 1):
        print(f"links_part{n}.txt:         {size} links")
    if not parts:
        print("Nothing left to transcribe.")
    print(f"Episodes with guests:    {sum(e['guests'] != 'Not listed' for e in episodes)}")


if __name__ == "__main__":
    main()
