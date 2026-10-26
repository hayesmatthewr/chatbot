#!/usr/bin/env python3
"""
Copy finished transcripts into the Google Drive desktop app's folder, then wait
until Drive has synced them.

Copies only transcript files (ones with the "YouTube:" header) plus
unmatched_episodes.txt, not scripts, exports or the Python environment.

Usage:
    python copy_to_drive.py --src "path/to/show folder" --dest "Podcast Transcripts/Show Name"
    python copy_to_drive.py --find     # just print where Google Drive is on this computer

If Google Drive for desktop isn't installed, it says so; upload through
drive.google.com instead (New -> Folder upload). Standard library only.
"""

import argparse
import platform
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

LINK_RE = re.compile(r"^YouTube: https://www\.youtube\.com/watch\?v=([\w-]{11})", re.M)


def find_my_drive():
    """Local 'My Drive' folders of Google Drive for desktop, if any."""
    found = []
    home = Path.home()
    if platform.system() == "Darwin":
        for acct in sorted((home / "Library" / "CloudStorage").glob("GoogleDrive-*")):
            if (acct / "My Drive").is_dir():
                found.append(acct / "My Drive")
    elif platform.system() == "Windows":
        for letter in "GHIJKLMNOPQRSTUVWXYZ":
            for name in ("My Drive", "Meine Ablage", "Mi unidad", "Mon Drive"):
                p = Path(f"{letter}:/{name}")
                if p.is_dir():
                    found.append(p)
    # Older Drive apps used a real ~/Google Drive folder; newer ones make it a shortcut
    legacy = home / "Google Drive"
    if legacy.is_dir() and not legacy.is_symlink():
        found.append(legacy / "My Drive" if (legacy / "My Drive").is_dir() else legacy)
    unique = {}
    for d in found:
        unique.setdefault(d.resolve(), d)
    return list(unique.values())


def is_synced(path):
    """macOS: Drive tags a file with its Drive ID once uploaded."""
    if platform.system() != "Darwin":
        return True  # no cheap check elsewhere; Drive's tray icon shows progress
    r = subprocess.run(["xattr", "-p", "com.google.drivefs.item-id#S", str(path)],
                       capture_output=True)
    return r.returncode == 0


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--src", type=Path, help="show folder containing the transcripts")
    p.add_argument("--dest", default="Podcast Transcripts", help="folder path inside My Drive")
    p.add_argument("--drive", type=Path, help="My Drive folder, if there's more than one account")
    p.add_argument("--find", action="store_true", help="only show where Google Drive is")
    args = p.parse_args()

    drives = [args.drive] if args.drive else find_my_drive()
    if args.find or not args.src:
        print("\n".join(str(d) for d in drives) or "Google Drive for desktop not found.")
        return
    if not drives:
        sys.exit("Google Drive for desktop isn't installed (or isn't signed in).\n"
                 "Upload instead at drive.google.com: New -> Folder upload -> choose "
                 f"{args.src.resolve()}")
    if len(drives) > 1 and not args.drive:
        sys.exit("More than one Google Drive account found; re-run with --drive <one of>:\n"
                 + "\n".join(str(d) for d in drives))

    src = args.src.resolve()
    files = [f for f in src.glob("*.txt")
             if LINK_RE.search(f.read_text(encoding="utf-8", errors="ignore")[:2000])]
    extra = src / "unmatched_episodes.txt"
    dest = drives[0] / args.dest
    dest.mkdir(parents=True, exist_ok=True)

    copied = 0
    for f in files + ([extra] if extra.exists() else []):
        target = dest / f.name
        if not target.exists() or target.stat().st_size != f.stat().st_size:
            shutil.copy2(f, target)
            copied += 1
    print(f"Copied {copied} new/changed files ({len(files)} transcripts total) to:\n  {dest}")

    targets = [dest / f.name for f in files]
    # Only Google Drive for desktop on a Mac tags synced files; elsewhere, don't wait
    if platform.system() != "Darwin" or "GoogleDrive-" not in str(dest.resolve()):
        print("Done. Google Drive will upload these in the background.")
        return
    for _ in range(100):                  # wait up to ~5 minutes for sync
        pending = [t for t in targets if not is_synced(t)]
        if not pending:
            break
        print(f"  waiting for Drive to sync... {len(targets) - len(pending)}/{len(targets)}")
        time.sleep(3)
    pending = [t for t in targets if not is_synced(t)]
    if pending:
        print(f"{len(pending)} files are still syncing; Drive will finish in the background.")
    else:
        print("All files synced to Google Drive.")


if __name__ == "__main__":
    main()
