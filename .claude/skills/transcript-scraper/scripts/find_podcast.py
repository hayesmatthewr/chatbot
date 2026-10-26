#!/usr/bin/env python3
"""
Find a podcast's RSS feed by name using Apple's public podcast search.

Usage:
    python find_podcast.py "Example Podcast"
    python find_podcast.py "Example Show Host Name" --limit 10

Prints each match's name, publisher, episode count and RSS feed URL.
Pass the feed URL to build_index.py --rss. Standard library only.
"""

import argparse
import json
import urllib.parse
import urllib.request


def main():
    p = argparse.ArgumentParser()
    p.add_argument("name", help="podcast name, optionally with a host's name")
    p.add_argument("--limit", type=int, default=5)
    args = p.parse_args()

    url = ("https://itunes.apple.com/search?" + urllib.parse.urlencode(
        {"term": args.name, "entity": "podcast", "limit": args.limit}))
    with urllib.request.urlopen(url, timeout=30) as r:
        results = json.load(r).get("results", [])

    if not results:
        print("No podcasts found. Try a shorter name, or add a host's name.")
        return
    for i, r in enumerate(results, 1):
        print(f"{i}. {r.get('collectionName')}")
        print(f"   by {r.get('artistName')}  |  {r.get('trackCount', '?')} episodes")
        print(f"   RSS: {r.get('feedUrl') or '(no public feed)'}")


if __name__ == "__main__":
    main()
