# Getting transcripts into Google Drive

The files are plain `.txt`. A large show is about 20 MB and a few hundred files, which is too big for most email attachments. Use a Drive folder.

## Option 1: Google Drive for desktop (best when it's installed)

Check with `python copy_to_drive.py --find`.
- **Mac:** the folder is `~/Library/CloudStorage/GoogleDrive-<email>/My Drive`.
- **Windows:** it's usually a `G:` drive, with `My Drive` inside.

If more than one account appears, ask the user which one to use.

```bash
python copy_to_drive.py --src "<show folder>" --dest "Podcast Transcripts/<Show Name>"
```

This copies only the transcripts and `unmatched_episodes.txt`. It leaves out scripts, exports and the `.venv` folder. On a Mac it waits until Drive has tagged every file as uploaded, so you can tell the user it's actually there, not just copied. Re-running it copies only new or changed files.

Then find the folder's web link:
- With a Drive connector: search for the folder by title.
- Otherwise: tell the user to open drive.google.com → My Drive → Podcast Transcripts.

## Option 2: A Drive connector or browser control

A connector that can upload files works, but it uploads one file at a time. That's fine for tens of files and slow for hundreds. In the browser, drive.google.com → **New** → **Folder upload** takes the whole folder at once. Choosing the folder needs a system file picker, so the user may have to click through it themselves.

## Option 3: The user uploads it (always works)

1. Open **drive.google.com** and sign in.
2. Click **New** (top left) → **Folder upload**.
3. Choose the show folder, for example `Documents/Podcast Transcripts/<Show Name>`, then click **Upload**.
4. The folder appears in My Drive once the upload finishes.

The local folder also contains `.venv`, `apify_exports` and the scripts. For a clean Drive folder, first copy only the transcripts into a new local folder. Running `copy_to_drive.py --drive "<new local folder>"` does this, or you can select the `.txt` files in Finder or Explorer and use **File upload**.

## Sharing (only when the user asks)

- **Default to Viewer.** The Drive share dialog often defaults to **Editor**, so change it.
- **Some Drive connectors can't share.** They return "The caller does not have permission". If that happens, share through the Drive website instead:
  1. Open the folder and click its name ▾ → **Share** → **Share**.
  2. Type the email address and pick the right person from the suggestions.
  3. Set the role to **Viewer**.
  4. Decide whether to leave **Notify people** on.
- **If the user will email the link themselves**, or you'll draft the email for them, turn off **Notify people** so the recipient doesn't get two messages.
- **Confirm the share afterwards.** Use the connector's permissions lookup if there is one, or reopen the Share dialog.

## Emailing the link

Draft the email, show it to the user, and send only after they say yes. A short template:

> Hey <name>,
>
> Here are the podcast transcripts for <Show A> (<N> episodes) and <Show B> (<N> episodes): <Drive folder link>
>
> Each episode is its own .txt file with a short header (show, date, title, YouTube link, guests) and a timestamp about every 2 minutes. You can use them as context files in Claude. A whole show is too big for one chat, so add it to a Claude Project's knowledge, or attach just the episodes you need.
