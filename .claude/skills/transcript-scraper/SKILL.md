---
name: transcript-scraper
description: Pull clean text transcripts for every episode or post of a podcast, YouTube channel, playlist, list of videos, or TikTok creator, and put them in the user's Google Drive, ready to use as context files in Claude. Walks a non-technical user through each step (finding the source, an Apify account, a small Python setup, converting, uploading) and is upfront about cost, time and limits. Use this whenever someone wants transcripts, captions or "the text" of podcast episodes, YouTube videos or TikToks in bulk, wants a creator's back catalogue as text, wants to build a knowledge base or Claude Project from a show or creator, or says things like "get me every episode of X as text", "scrape the transcripts from this channel", "transcribe this TikToker's videos from the last year", or "I want to feed this podcast into Claude", even if they don't mention Apify, captions or Google Drive.
---

# Transcript Scraper: podcasts, YouTube & TikTok → Google Drive

This skill turns a show or creator into one clean `.txt` file per episode or post. Example of a YouTube file:

```
Show: Example Show
Date: 2026-03-14
Title: How We Grew to 1M Subscribers
YouTube: https://www.youtube.com/watch?v=XXXXXXXXXXX
Guests: Jane Doe
============================================================

[0:00]

Welcome back to the show ...

[2:00]

...
```

Each file is named `YYYY-MM-DD – Title.txt`. Duplicate caption lines and cues like `[Music]` are removed. YouTube files get a timestamp marker about every 2 minutes. TikToks are short, so they get none, and their header has `TikTok:` and `Caption:` lines in place of `YouTube:` and `Guests:`. The files go in a local folder, then into the user's Google Drive.

The people using this skill are often not technical. Talk in plain language, give one step at a time, and do as much as you can for them. Never leave them guessing about what is happening, what it costs, or what needs their OK.

## How it works (and why)

1. **Make the episode list from metadata (YouTube).** A channel or playlist listing, plus the podcast's RSS feed when there is one, gives each episode's title, date, link and description. No captions are downloaded in this step. TikTok skips this step, because the TikTok tool takes a creator's handle directly.
2. **Get the captions through Apify.** Downloading captions straight from YouTube gets blocked after about a dozen videos from one home internet connection. That happened in testing. Apify runs ready-made tools that fetch the captions through their own proxies, for fractions of a cent per video. The user runs them in their own free Apify account and downloads the results as JSON.
   - YouTube: **YouTube Transcript Scraper** by devsef.
   - TikTok: **TikTok Transcript Scraper** by mu0i.
3. **Convert.** A local script turns Apify's JSON into the clean `.txt` files.
4. **Upload to Google Drive.** Copy the files into the Drive desktop app's folder if it's installed, or upload them in the browser.

Bundled scripts (in `scripts/`, plain Python, safe to re-run):
- `find_podcast.py`: looks up a podcast's RSS feed by name, using Apple's public podcast search.
- `build_index.py` (YouTube): builds `episode_index.json`, the Apify link files, and a list of episodes with no YouTube match.
- `convert_apify.py` (YouTube): converts the YouTube exports, skips ones already saved, logs failures and lists retryable ones.
- `convert_tiktok.py` (TikTok): converts the TikTok exports, filters by date, and lists posts with no captions.
- `split_export.py`: when one Apify run covered several YouTube shows, splits the download so each show's folder gets only its own videos.
- `copy_to_drive.py`: copies YouTube transcripts into the Google Drive desktop folder and checks that they synced.

Click-by-click guides live in `references/`. Read them when you reach that step:
- `references/apify_walkthrough.md`: account sign-up, test runs, full runs, exporting, and driving the browser for the user.
- `references/drive_upload.md`: the Drive options and sharing.
- `references/troubleshooting.md`: Python missing, blocks, no captions, TikTok quirks, sync problems.

## Step 0: Tell the user the whole plan first

Before installing, creating or running anything, show the user this overview, adapted to their request. Being transparent up front is the point of this skill. People should know what they're signing up for before any of it happens.

> **Here's exactly what will happen:**
>
> 1. **Find the source.** I'll find the official YouTube channel, podcast feed or TikTok account and show you the link and how many episodes or posts there are. Nothing is downloaded until you confirm.
> 2. **Small setup on your computer.** I'll create a folder for the transcripts. For YouTube, I'll also install one free tool, **yt-dlp**, which reads YouTube's episode list. It goes into a private folder, so nothing else on your computer changes. If your computer has no Python yet, I'll help you install it first. On a Mac that's a one-click Apple installer.
> 3. **Free Apify account (you sign up).** Apify is the service that collects the captions. YouTube and TikTok block people who download lots of captions directly, and Apify avoids that. Sign-up is free, with no card needed for the free plan, which includes a monthly credit, about $5 at the time of writing.
> 4. **Cost.** Roughly **$0.003–$0.005 per YouTube video** and **$0.004 per TikTok**. Videos with no captions are free. That's about **$0.30–$0.50 per 100**, usually within the free credit. I'll check with you before every run.
> 5. **Time.** About 10 minutes per 200 videos in Apify, plus a few minutes to convert and upload. For YouTube without a podcast feed, building the episode list takes about 6 seconds per video.
> 6. **Google Drive.** I'll put the finished files in a Drive folder for you. Nothing is shared with anyone unless you ask.
>
> **Limits to know about:**
> - Transcripts come from the platform's captions. These are usually auto-generated: good, but not perfect, and there are no speaker names.
> - Videos with no captions, and podcast episodes that only exist as audio, can't be transcribed this way. I'll list them so you know what's missing. On TikTok, roughly 1 in 5 videos may have no captions, though it varies by creator.
> - These are transcripts of other people's content. They're fine for your own research and notes, but don't republish them. TikTok's terms in particular prohibit automated scraping.
>
> **I'll ask before I:** install anything, start a paid Apify run, download files, or share anything.
>
> Ready to start? What show, channel or creator do you want, and how far back should I go (everything, the last year, the last 50 videos…)?

Also collect these, using sensible defaults if they don't say:
- **Source.** A podcast name, YouTube channel, playlist, list of video links, or TikTok handle.
- **Range.** Everything, a date cutoff, or a number of recent videos. A cutoff avoids paying for years of back catalogue nobody asked for.
- **Local folder.** Default: `~/Documents/Podcast Transcripts/<Name>/`. Use one folder per show or creator. If the user already has a folder for this, use it.
- **Drive folder name.** Default: `Podcast Transcripts/<Name>` in My Drive.

## Step 1: Find and confirm the source

- **YouTube channel.**
  - Find it: search the web or YouTube for "<name> YouTube channel" and check that the hosts or description match.
  - Count it: show the user the link, then run `build_index.py --youtube <url> --count-only`. It lists the channel's Videos tab (full uploads, not Shorts) and makes no other requests.
  - Look before going further: many channels mix full episodes with short clips.
- **Podcast RSS feed.** Run `find_podcast.py "<show name>"`. If the show has a feed, using it together with YouTube is better:
  - It lists only real episodes, so clips get filtered out.
  - It gives exact podcast release dates and full descriptions without per-video YouTube requests.
  - It tells you which episodes have no YouTube video.
- **Playlist, or a hand-picked list of videos.** Use those directly. Put a list of links in a text file, one per line, and pass it with `--videos-file`.
- **TikTok creator.**
  - Get the exact handle. Confirm the `@handle` with the user, and open the profile to check the name and bio match. Similar handles are common (`@name2` vs `@name21`).
  - Expect to learn the post count from the run itself. TikTok hides it from logged-out visitors.

Show what you found, for example: "The channel has 741 videos, but the podcast feed has 205 episodes in the last 2 years, and 183 of them are on YouTube." Wait for the user to confirm before moving on. Picking the wrong source wastes their money.

## Step 2: Setup (with permission)

1. Check for Python 3.9 or newer with `python3 --version`. On a Mac with no developer tools, that command opens Apple's "Install Command Line Developer Tools" pop-up. Tell the user to click **Install**. The pop-up sometimes hides behind other windows; `open "/System/Library/CoreServices/Install Command Line Developer Tools.app"` brings it to the front. On Windows, point them to python.org and the "Add Python to PATH" checkbox. More detail is in `references/troubleshooting.md`.
2. **YouTube only:** create a private environment for yt-dlp in a hidden subfolder of the output folder:
   ```bash
   python3 -m venv "<out>/.venv"
   "<out>/.venv/bin/python" -m pip install -q yt-dlp
   ```
   On Windows the interpreter is `<out>\.venv\Scripts\python.exe`. One environment can serve several show folders. Only `build_index.py` needs yt-dlp; the other scripts use only the standard library.
3. Create `<out>/apify_exports/`, and copy the scripts the user will need from this skill's `scripts/` folder into `<out>`. The user then has everything in one place and can re-run it later without the skill.

## Step 3 (YouTube): Build the episode list

Run `build_index.py` with the venv's Python. Common forms:

```bash
# YouTube channel plus podcast RSS feed (best when a feed exists)
python build_index.py --out "<out>" --show "Show Name" \
  --youtube "https://www.youtube.com/@handle" --rss "<feed url>" --years 2

# YouTube channel or playlist only (fetches each video's date and description, slowly)
python build_index.py --out "<out>" --show "Show Name" \
  --youtube "https://www.youtube.com/@handle/videos" --years 1 --hosts "Host One, Host Two"

# A hand-picked list of videos
python build_index.py --out "<out>" --show "Show Name" --videos-file my_links.txt
```

The script writes:
- `episode_index.json`: every episode with its ID, title, date, link, description and guests.
- `links_part1.txt`, `links_part2.txt` and so on: up to 200 links each, which is Apify's limit per run. Episodes that already have a transcript are left out.
- `unmatched_episodes.txt`, in RSS mode only: episodes with no matching YouTube video.

Without RSS, the script fetches each video's details one at a time with random 3–8 second pauses, about 6 seconds per video. Run it in the background if there are more than about 50 videos.
- **Resumable:** it saves progress as it goes, so re-running continues where it stopped.
- **Stops at the cutoff:** on a channel, it stops at the first video older than the date limit.
- **Rarely blocked:** these metadata requests have not been blocked in testing; only caption downloads have. If it does stop with "YouTube is refusing requests", wait an hour and run it again.

`--hosts` keeps the hosts' own names out of the Guests line.

Tell the user how many videos fall in range and what got left out. A date cutoff can surprise people: a creator may have paused for months, so "the last year" might be fewer videos than they expect. Say so plainly.

## Step 4: Apify (the user's account)

Follow `references/apify_walkthrough.md`. In short:
1. The user signs up at apify.com.
2. Open the right tool and click **Try for free**:
   - YouTube: https://apify.com/devsef/youtube-transcript-scraper
   - TikTok: https://apify.com/mu0i/tiktok-transcripts
3. **Test run first, with 3 videos.** Check the output before spending money on the rest.
   - YouTube: 3 links from `links_part1.txt`, with **Include timestamped segments** on.
   - TikTok: the 3 newest posts. Either paste 3 video links, or use the creator's handle with videos per creator set to 3.
4. **Full runs.**
   - YouTube: one run per `links_partN.txt`. Several shows' links can share one run, up to 200 links in total.
   - TikTok: the handle, with **Videos per creator** set high enough to reach the cutoff. A creator posting every other day needs about 200 for a year. Set **Run options → Maximum cost per run** to the agreed cap.
5. **Export each run** as **JSON with All fields**, into `<out>/apify_exports/`.

You can do these steps for the user if you have browser control and they're signed in. That's either Claude in Chrome, their real browser, or a built-in browser where they've signed in. Even so:
- **Before clicking Start, confirm with the user.** State the number of videos and the estimated cost. A clear OK with a cost cap ("go ahead, up to $2") counts.
- **Before downloading the export, confirm with the user.** It saves a file to their computer.
- **If a data-sharing pop-up appears**, such as one about sharing runs with the developer, choose **Dismiss**, the privacy-preserving option. Tell the user you did.
- **Fill link lists in directly; don't rely on the user's clipboard.** People copy other things while they wait. `references/apify_walkthrough.md` shows how, and how to check the count before applying.
- **Never enter the user's password or payment details.**

Without browser control, walk the user through it one step at a time. Put the links on their clipboard (`pbcopy < links_part1.txt` on Mac, `clip < links_part1.txt` on Windows) right before they paste, and say so.

## Step 5: Convert

**YouTube:**
```bash
python3 convert_apify.py --dir "<out>"
```
- **Several shows in one run:** if one Apify run covered several shows, first run `python3 split_export.py --export <downloaded file> --folders "<show A folder>" "<show B folder>"`. That puts each show's own videos into its `apify_exports/`.
- **What it does:** matches each video to `episode_index.json` and writes the transcripts, skipping any already saved. When a video appears more than once, it uses the successful result.
- **Failure lists:** it writes `failures.txt`, plus `retry_links.txt` for failures worth another small Apify run (`blocked` or `error`). Videos with `no_transcript` aren't worth retrying.

**TikTok:**
```bash
python3 convert_tiktok.py --dir "<out>" --show "Creator Name (TikTok)" --handle creatorhandle --years 1
```
- **Date filter:** keeps only posts on or after the cutoff (`--since YYYY-MM-DD` or `--years N`). If a post has no `createdAt`, it reads the post time from the video ID.
- **Missing usernames:** `--handle` fills in posts where the username is missing, so links work.
- **No-caption list:** writes `no_captions.txt` for posts TikTok has no captions for.
- **Coverage check:** it prints the oldest post Apify returned. If that's still inside the range and Apify returned exactly the maximum you set, the year isn't fully covered. Raise **Videos per creator** and run again; already-saved posts are skipped.

Then do a quick structural check without reading the transcripts. Count the files and check that each starts with the 5-line header (and, for YouTube, a `[0:00]` marker). Point out unusually short YouTube files (under about 1,000 words), which are usually clips.

## Step 6: Upload to Google Drive

Follow `references/drive_upload.md`. In order of preference:
1. **Drive desktop app installed.** Check for `~/Library/CloudStorage/GoogleDrive-*` on a Mac, or a `G:` drive on Windows.
   - **YouTube:** run `python3 copy_to_drive.py --src "<out>" --dest "Podcast Transcripts/<Name>"`. It copies only the transcripts, plus the unmatched list, and waits until Drive confirms each file has synced.
   - **TikTok:** copy the `.txt` transcripts and `no_captions.txt` into the Drive folder directly. The copy script only recognizes the YouTube header.
2. **A Google Drive connector, or browser control.** Create the folder and upload through that. This is slow for hundreds of files.
3. **Manual upload.** Walk the user through drive.google.com: **New** → **Folder upload**.

Only share when the user asks. When they do, default to **Viewer**. The Drive share dialog defaults to Editor, so check it. Some Drive connectors aren't allowed to change sharing; if so, use the Drive website. If the user also wants to email the link, draft the email, show it to them, and send only after they approve.

## Step 7: Summary

Finish with this structure:

> **Done: <Name>**
> - **Transcripts saved:** N of M (date range)
> - **Failed:** N (reason for each kind), listed in `failures.txt`
> - **No YouTube video / no captions:** N, listed in `unmatched_episodes.txt` / `no_captions.txt`
> - **Total words:** N
> - **Apify cost:** $X for this run (read it off the run page), about $Y of the monthly credit left
> - **Where:** local folder path, plus the Drive folder path
> - **Using them in Claude:** upload the files to a Claude Project's knowledge, or attach a few to a chat. A big back catalogue is far more than one chat can hold. Projects can search across all the files.

Don't summarize or quote the transcripts unless the user asks. The job is to deliver the files. If they later ask what their transcripts say about a topic, search across the folders and point them to specific videos and timestamps.

## Adding new episodes later

Everything is safe to re-run:
- **YouTube:**
  1. Run `build_index.py` again. It keeps the existing index, and its link files contain only videos without a transcript.
  2. Run Apify on the new links and export into `apify_exports/`.
  3. Run `convert_apify.py`, then `copy_to_drive.py`.
- **TikTok:**
  1. Run Apify on the handle with a small **Videos per creator** that covers the new posts.
  2. Export into `apify_exports/`.
  3. Run `convert_tiktok.py`, then copy the new files to Drive.

## Optional cleanup

Once the transcripts are in Drive, the raw Apify exports (often tens of MB) can be zipped. Ask first, check the zip with `unzip -t` before removing anything, and move the originals to the Trash rather than deleting them. Recreate an empty `apify_exports/` folder for future runs. Keep the `.venv` folder if the user may add YouTube episodes later. Don't run a converter while `apify_exports/` is empty; the converters stop safely, but there's nothing to gain.
