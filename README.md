# 🔧 Toolbox Tales

**History-powered storytelling for your Wednesday meeting.**

Toolbox Tales helps a service center leader open every weekly team meeting with a great story from history — heavy on Latin American history — and turn it into a message about **safety, efficiency, quality, teamwork, training, or resilience**. Built for real shop life: pick a story, shape it for your audience, practice it on a random weeknight, and own the room on Wednesday.

## What it does

### 📅 This Wednesday
A featured story rotates automatically every week (it flips each Thursday, so the story holds steady through your Wednesday meeting). A countdown reminds you how many days you have left to practice. One click builds the full talk, or hit **Surprise me** for a random practice story on any weeknight.

### 🔍 Find a Story
Search any topic — *"rescue"*, *"Inca"*, *"underdog"*, *"data"* — or filter by theme. Every story in the library is written to be **spoken**, not read, and comes with:

- **The Hook** — one gripping opening line (with a reminder to pause after it)
- **The Story** — 2–3 minutes of history at a comfortable speaking pace
- **The Bridge** — pre-written tie-ins that turn the history into a shop lesson for your chosen theme
- **The Message** — a closing call-to-action tailored to who's in the room: **technicians**, **office & support staff**, or the **whole team**
- **A pocket fact** for hallway conversations after the meeting

### 📚 The Library
21 curated stories, told from the front of a shop rather than a lectern — including the 2010 Chilean miners rescue, the Golden Gate Bridge safety net, the Inca chasqui relay runners, the Aztec chinampas, Bolívar and San Martín crossing the Andes, the Battle of Puebla, Maya astronomers, the quipu record-keepers, Juana Azurduy, the Voladores of Veracruz, plus Shackleton, Apollo 13, the Wright brothers, Florence Nightingale, Toyota's andon cord, and more.

⭐ favorite the ones you love, and ✓ mark stories as **told** so you never repeat one with the team.

### 🎤 Practice Room
- **Teleprompter** with adjustable text size and auto-scroll speed
- **Cue-card mode** — just the beats, so you learn to talk between them instead of reciting
- **Timer** plus a target time estimated from the script's word count
- **Record yourself** with your microphone and listen back to takes (nothing leaves your browser)
- **Listen** — have the browser read the script aloud to you
- Rotating delivery tips from public-speaking craft

### ✨ Optional: AI story generator
The library works with zero setup. If you also want brand-new stories on *any* topic, open **Settings (⚙️)** and paste an API key for an OpenAI-compatible service (e.g. an [OpenAI API key](https://platform.openai.com/)). Then any search can generate a fresh, historically grounded story shaped for your theme and audience. The key is stored only in your browser's local storage. Always double-check facts in AI-generated stories before telling them.

## Running it

It's a fully static site — no build step, no server, no dependencies.

- **Simplest:** double-click `index.html` (recording/AI features work best over http).
- **Local server:** `python3 -m http.server 8000` in this folder, then open [http://localhost:8000](http://localhost:8000).
- **Free hosting:** enable **GitHub Pages** on this repo (Settings → Pages → deploy from branch), and the site will be live at your Pages URL. Netlify/Vercel drag-and-drop also works.

Your favorites, told-history, and settings are saved in the browser you use, via local storage.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure: the four views, talk builder, settings dialog |
| `css/styles.css` | Warm "parchment & workshop" design, teleprompter, print styles |
| `js/data.js` | The story library, themes, audience closers, delivery tips |
| `js/app.js` | Weekly rotation, search, talk builder, practice room, optional AI |

## Adding your own stories

Open `js/data.js` and copy any entry in the `STORIES` array. Each story needs a unique `id`, a `hook`, story paragraphs, and at least one entry in `bridges` (keyed by theme: `safety`, `efficiency`, `quality`, `teamwork`, `growth`, or `resilience`). Add the id to `WEEKLY_ORDER` to put it in the weekly rotation.

---

*Stories are history — check any detail you plan to state as fact, and make every story your own when you tell it.*
