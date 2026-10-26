#!/usr/bin/env python3
"""
Split one Apify YouTube Transcript Scraper export that covered several shows
into each show's own apify_exports/ folder.

Each show folder must already have its episode_index.json (from
build_index.py). Every video goes to the folder whose index lists it, so each
converter only sees its own videos and doesn't log the others as failures.

Usage:
    python split_export.py --export ~/Downloads/dataset_youtube-transcript-scraper_<date>.json \\
        --folders "path/to/Show A" "path/to/Show B"

The original download is left where it is; move it to the Trash afterwards if
you don't need it. Standard library only.
"""

import argparse
import json
from pathlib import Path


def index_ids(folder):
    data = json.loads((folder / "episode_index.json").read_text(encoding="utf-8"))
    episodes = data["episodes"] if isinstance(data, dict) else data
    return {e["id"] for e in episodes}


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--export", type=Path, required=True, help="the downloaded Apify JSON file")
    p.add_argument("--folders", type=Path, nargs="+", required=True, help="show folders")
    args = p.parse_args()

    items = json.loads(args.export.read_text(encoding="utf-8"))
    placed = set()
    for folder in args.folders:
        ids = index_ids(folder)
        mine = [it for it in items if it.get("videoId") in ids]
        placed |= {it["videoId"] for it in mine}
        out = folder / "apify_exports" / args.export.name
        out.parent.mkdir(exist_ok=True)
        out.write_text(json.dumps(mine, ensure_ascii=False), encoding="utf-8")
        print(f"{folder.name}: {len(mine)} videos (index has {len(ids)})  ->  {out}")

    leftover = [it.get("url") or it.get("videoId") for it in items if it.get("videoId") not in placed]
    if leftover:
        print(f"\n{len(leftover)} videos didn't match any folder's index:")
        for link in leftover[:20]:
            print(f"  {link}")
    else:
        print("\nEvery video was placed in a folder.")


if __name__ == "__main__":
    main()
