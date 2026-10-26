# Troubleshooting

## Python isn't installed

- **Mac:** `python3 --version` triggers Apple's **Install Command Line Developer Tools** pop-up.
  - Tell the user to click **Install** and then **Agree**. It takes 5–10 minutes.
  - If they can't see it, it's often hidden behind other windows. Bring it forward with `open "/System/Library/CoreServices/Install Command Line Developer Tools.app"`.
  - You can wait for it with a background loop that checks for `/Library/Developer/CommandLineTools/usr/bin/python3`.
  - It installs Python 3.9. yt-dlp prints a "Python 3.9 deprecated" warning, which is harmless; hide it with `grep -v Deprecated`.
  - If a future yt-dlp release drops 3.9 support, install Python from python.org instead.
- **Windows:** install Python from https://www.python.org/downloads/ and tick **Add python.exe to PATH**. Then use `py` or `python` in place of `python3`. The venv's interpreter is `.venv\Scripts\python.exe`.
- **Linux:** `sudo apt install python3 python3-venv`. The user types their own password; never type it for them.

## "urllib3 v2 only supports OpenSSL 1.1.1+" warning

This happens with macOS's built-in Python. It's harmless; run Python with `-W ignore` to hide it.

## The channel has far more videos than the podcast has episodes

The Videos tab mixes full episodes with clips, trailers and other videos.
- **If the show has an RSS feed:** use `--rss`. It keeps only real episodes.
- **If not:** suggest a date cutoff with `--since`, or a playlist that holds only full episodes. Check the channel's Podcasts and Playlists tabs.

Very short transcripts (under about 1,000 words) after conversion are usually clips.

## Episodes in the RSS feed but not on YouTube

These go in `unmatched_episodes.txt`. Possible causes:
- The episode is audio-only.
- The YouTube title is very different from the feed title.
- Two feed episodes share one video.

If the user knows the right video for an episode, add its link to a file and run `build_index.py --videos-file` with that file, using the same `--out` folder. That adds the video to the index. Then run it through Apify.

Transcribing audio-only episodes would need a speech-to-text tool such as Whisper. That's outside this skill, so offer it as a separate idea rather than doing it unasked.

## "Request blocked" / "YouTube is refusing requests"

- **Caption downloads straight from YouTube** get blocked quickly from one home connection, which is why this skill uses Apify for captions.
- **Metadata requests from `build_index.py`** (titles, dates, descriptions) went through fine in testing at 3–8 second pacing. If they're ever refused, wait an hour or more and re-run. Progress is saved, so it continues where it stopped.
- **Don't add proxies or other workarounds** unless the user asks.

## Apify statuses

| Status | Meaning | What to do |
|---|---|---|
| `ok` | Transcript fetched | Nothing |
| `no_transcript` | The video has no captions | Nothing; list it for the user |
| `unavailable` | Private, deleted or region-locked | Nothing |
| `blocked` / `error` | Temporary failure | Retry once with `retry_links.txt` |

## TikTok problems

- **Wrong account.** Handles are easy to mix up (`@name2` vs `@name21`). Confirm the exact handle with the user and check the profile's name and bio before running.
- **Many posts without captions.** TikTok only has captions where auto-captions were generated or the creator added them. In testing, about 80–99% of a creator's posts had captions, varying by creator. The rest are listed in `no_captions.txt`. Getting them would need speech-to-text, which is outside this skill.
- **"The oldest post is still inside the range."** Apify stopped at the **Videos per creator** limit before reaching the cutoff. Raise the limit and run again; saved posts are skipped.
- **Paid for posts outside the date range.** The TikTok tool doesn't filter by date, so every post it returns is charged. Next time, set **Videos per creator** closer to the creator's posting rate.
- **Filtering by views.** The transcript tool has no view counts. Use a TikTok post-listing actor first to get views, choose the videos, then pass their URLs to the transcript tool.
- **`@_` in a link.** A row was missing its username. Re-run `convert_tiktok.py` with `--handle`, or fix the line in `no_captions.txt`.

## Several YouTube shows in one Apify run

Run `split_export.py` so each folder gets only its own videos. If you skip it and copy the whole export into every folder, each converter logs the other shows' videos as "Not in episode_index.json" failures.

## Transcripts have no timestamp markers

**Include timestamped segments** was switched off in Apify. Re-run those videos with it on. You'll find them in the converter's "(no timestamps…)" lines.

## The converter says "Not in episode_index.json"

The export has videos that the index doesn't, for example because a different link list was pasted. Re-run `build_index.py` with a source that includes them, or with `--videos-file`. Then convert again.

## Drive files don't appear

- Check that Google Drive for desktop is signed in and not paused.
- On a Mac, `copy_to_drive.py` reports when it's still waiting for sync.
- Big folders can take a few minutes.
