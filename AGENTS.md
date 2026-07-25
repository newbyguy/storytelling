# AGENTS.md

## Cursor Cloud specific instructions

Toolbox Tales is a fully static, client-side web app (plain `index.html` + `css/` + `js/`). There is no build step, no package manager, and no backend/database — all state (favorites, "told" history, settings, optional AI API key) lives in the browser's `localStorage`.

- Run it by serving the repo root over HTTP: `python3 -m http.server 8000`, then open `http://localhost:8000/`. Serving over HTTP (not `file://`) matters because the microphone recording and text-to-speech features need a proper origin.
- There are no dependencies to install, no lint config, and no automated test suite in this repo; the update script is effectively a runtime check only.
- The featured "This Wednesday" story is chosen by a date-based weekly rotation (flips each Thursday) in `js/app.js` — the specific featured story will differ depending on the current date.
- The AI story generator is optional and only activates if the user pastes an OpenAI-compatible API key in the in-app Settings (⚙️); the story library works fully without it.
