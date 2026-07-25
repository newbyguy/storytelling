# 🔧 Toolbox Tales

**History-powered storytelling for your Wednesday meeting.**

Toolbox Tales helps a service center leader open every weekly team meeting with a great story from history — heavy on Latin American history — and turn it into a message about **safety, efficiency, quality, teamwork, training, or resilience**. Built for real shop life: pick a story, shape it for your audience, practice it on a random weeknight, and own the room on Wednesday.

## What it does

### 📅 This Wednesday
A featured story rotates automatically every week (it flips each Thursday, so the story holds steady through your Wednesday meeting). A countdown reminds you how many days you have left to practice. One click builds the full talk, or hit **Surprise me** for a random practice story on any weeknight.

### 🔍 Find a Story
Search any topic — *"rescue"*, *"Inca"*, *"underdog"*, *"data"* — or filter by theme. Every story in the library is written to be **spoken**, not read, and comes with:

- **The Hook** — one gripping opening line (coaching notes vary story to story)
- **Set the Scene** — a spoken context line that connects the story to something the room already knows
- **The Story** — 2–3 minutes of history at a comfortable speaking pace
- **The Bridge** — pre-written tie-ins that turn the history into a concrete shop lesson for your chosen theme
- **The Challenge** — a hand-written, story-specific personal challenge, spoken to each individual in the room ("find your Hill", "drain your pond", "start your notebook") with one concrete action for the week — no two stories share one
- **The Send-off** — a short final word tailored to who's in the room: **technicians**, **office & support staff**, or the **whole team**
- **The Quote** — a real historical quote or phrase to write on the whiteboard and leave up as the theme until next Wednesday
- **A pocket fact** for hallway conversations after the meeting

### 📚 The Library
52 curated stories, told from the front of a shop rather than a lectern — every one selected because it bridges hard into **individual efficiency (hours estimated vs. hours on the job), industrial safety, or teamwork**:

- **Individual greatness & motivation** — Jerry Rice's Hill, Michael Jordan's varsity cut, Roger Bannister's four-minute mile, John Wooden's socks lesson, Vince Lombardi's "this is a football," Pelé's rag ball, Roberto Clemente, Ben Hogan's comeback, Tom Brady at pick 199, Muhammad Ali's training, Tiger Woods rebuilding his swing at #1, Fangio the mechanic-champion, the Miracle on Ice
- **Efficiency & process legends** — Henry Ford's 93-minute assembly line, McDonald's kitchen drawn in chalk, British Cycling's marginal gains, the two-second F1 pit stop, the Liberty ship built in 4½ days, the Empire State Building's 410 days, the Eiffel Tower's 18,000 perfect parts, Lindbergh cutting the margins off his maps, the Pony Express, ten miles of track in one day, Willow Run's bomber-an-hour, Edison's invention quota, Southwest's ten-minute turn, UPS's no-left-turns
- **Shop-bench icons** — WD-40's 40th formula, the lab tech who invented masking tape in a paint shop, the mother who invented duct tape with a letter to FDR, the Boeing crash that created the checklist, Toyota's andon cord
- **Grit, honesty & doing right** — Colonel Sanders' 1,009 rejections, Dyson's 5,127 prototypes, Domino's "cardboard crust" turnaround, Ford's red slide, Starbucks closing 7,100 stores to practice, the Tylenol recall, Shackleton, Apollo 13, the serum run to Nome, the Miracle on the Hudson
- **Latin American history** — the 2010 Chilean miners rescue, the Inca chasqui relay runners and quipu record-keepers, the Aztec chinampas, San Martín's Army of the Andes, the Panama Canal, and the Voladores of Veracruz

**Every story in the library has an efficiency bridge** written in hours-vs-estimate language — planning the job before the wrench, staging parts, clean handoffs, flagging early when a job fights back, honest hour logging — so you can push efficiency every single week no matter which story you tell. The weekly card includes a one-click **"Make it an efficiency talk"** button.

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
