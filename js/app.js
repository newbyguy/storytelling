/* =========================================================================
   Toolbox Tales — app logic
   ========================================================================= */

/* ---------------- persistent state ---------------- */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem("tt_" + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("tt_" + key, JSON.stringify(value)); } catch {}
  },
};

const state = {
  favorites: store.get("favorites", []),
  told: store.get("told", {}),            // id -> ISO date told
  settings: store.get("settings", {
    aiKey: "", aiBaseUrl: "https://api.openai.com/v1", aiModel: "gpt-4o-mini",
    defaultAudience: "everyone",
  }),
  talk: store.get("talk", null),           // { storyId?, aiStory?, theme, audience }
  searchTheme: null,
  libraryTheme: null,
  practiceMode: "script",
  tipIndex: Math.floor(Math.random() * DELIVERY_TIPS.length),
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const storyById = (id) => STORIES.find((s) => s.id === id);

function talkStory(talk) {
  if (!talk) return null;
  return talk.aiStory ? talk.aiStory : storyById(talk.storyId);
}

/* ---------------- toast ---------------- */
let toastTimer = null;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------------- navigation ---------------- */
function showView(name) {
  $$(".view").forEach((v) => v.classList.remove("active"));
  const target = $("#view-" + name);
  if (target) target.classList.add("active");
  $$(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.nav === name));
  window.scrollTo({ top: 0 });
  if (name === "practice") renderPractice();
  if (name === "library") renderLibrary();
}

document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (nav) { e.preventDefault(); showView(nav.dataset.nav); }
  const openSettings = e.target.closest("[data-open-settings]");
  if (openSettings) { e.preventDefault(); openSettingsModal(); }
});

/* ---------------- weekly story + countdown ---------------- */
/* Weeks flip every Thursday, so the featured story holds steady through
   Wednesday's meeting and a fresh one appears the next morning. */
const WEEK_EPOCH = Date.UTC(2026, 0, 1); // Thu Jan 1, 2026
function weekIndex(now = new Date()) {
  const ms = now.getTime() - WEEK_EPOCH;
  return Math.max(0, Math.floor(ms / (7 * 24 * 3600 * 1000)));
}
function weeklyStory() {
  return storyById(WEEKLY_ORDER[weekIndex() % WEEKLY_ORDER.length]);
}
function countdownText() {
  const now = new Date();
  const day = now.getDay(); // 0 Sun … 3 Wed
  const until = (3 - day + 7) % 7;
  if (until === 0) return "It's Wednesday — meeting day. You've got this. 🎯";
  if (until === 1) return "Tomorrow is Wednesday — perfect night for one more run-through.";
  return `${until} days until your Wednesday meeting`;
}

/* ---------------- card rendering ---------------- */
function themeTagsHtml(story) {
  return Object.keys(story.bridges)
    .map((t) => `<span class="theme-tag">${THEMES[t].icon} ${THEMES[t].label}</span>`)
    .join("");
}

function storyCardHtml(story) {
  const fav = state.favorites.includes(story.id);
  const told = !!state.told[story.id];
  return `
  <div class="story-card" data-story="${story.id}">
    ${told ? '<span class="told-ribbon">TOLD ✓</span>' : ""}
    <div class="card-meta">
      <span class="pill">${story.region}</span>
      <span>${story.year}</span>
    </div>
    <h3>${story.title}</h3>
    <p class="hook">${story.hook}</p>
    <div class="card-themes">${themeTagsHtml(story)}</div>
    <div class="card-actions">
      <button class="btn btn-small btn-primary" data-build="${story.id}">Use this story</button>
      <button class="star-btn ${fav ? "on" : ""}" data-fav="${story.id}" title="Favorite">${fav ? "⭐" : "☆"}</button>
      <button class="told-btn ${told ? "on" : ""}" data-told="${story.id}" title="${told ? "Told on " + state.told[story.id] : "Mark as told"}">✓</button>
    </div>
  </div>`;
}

function renderWeeklyCard() {
  const story = weeklyStory();
  const told = !!state.told[story.id];
  $("#weeklyCard").innerHTML = `
  <div class="weekly-card">
    <div>
      <div class="card-meta">
        <span class="pill">${story.region}</span>
        <span class="pill">${story.year}</span>
        ${told ? '<span class="pill">Already told ✓</span>' : ""}
      </div>
      <h2>${story.title}</h2>
      <p class="hook">${story.hook}</p>
      <p class="weekly-preview">${story.story[0]}</p>
      ${story.quote ? `<blockquote class="weekly-quote"><p>“${story.quote.text}”</p><cite>— ${story.quote.by}</cite></blockquote>` : ""}
    </div>
    <div class="weekly-side">
      <button class="btn btn-primary" data-build="${story.id}">Build my talk →</button>
      ${story.bridges.efficiency ? `<button class="btn btn-accent" data-build-eff="${story.id}">⚙️ Make it an efficiency talk</button>` : ""}
      <button class="btn btn-ghost" data-practice-story="${story.id}">🎤 Practice it tonight</button>
      <div class="card-themes">${themeTagsHtml(story)}</div>
    </div>
  </div>`;
  $("#countdownLine").textContent = countdownText();
}

/* ---------------- favorites / told ---------------- */
document.addEventListener("click", (e) => {
  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) {
    const id = favBtn.dataset.fav;
    const i = state.favorites.indexOf(id);
    if (i >= 0) state.favorites.splice(i, 1); else state.favorites.push(id);
    store.set("favorites", state.favorites);
    rerenderStoryLists();
    return;
  }
  const toldBtn = e.target.closest("[data-told]");
  if (toldBtn) {
    const id = toldBtn.dataset.told;
    if (state.told[id]) delete state.told[id];
    else state.told[id] = new Date().toLocaleDateString();
    store.set("told", state.told);
    rerenderStoryLists();
    toast(state.told[id] ? "Marked as told — it won't sneak back on you." : "Unmarked.");
  }
});

function rerenderStoryLists() {
  renderWeeklyCard();
  renderLibrary();
  runSearch();
}

/* ---------------- search ---------------- */
function scoreStory(story, tokens) {
  let score = 0;
  const themeKeys = Object.keys(story.bridges);
  const themeLabels = themeKeys.map((t) => THEMES[t].label.toLowerCase()).join(" ");
  const hay = {
    title: story.title.toLowerCase(),
    tags: story.tags.join(" ").toLowerCase(),
    meta: (story.region + " " + story.era + " " + story.year).toLowerCase(),
    themes: (themeKeys.join(" ") + " " + themeLabels).toLowerCase(),
    body: (story.hook + " " + story.story.join(" ")).toLowerCase(),
  };
  for (const t of tokens) {
    if (hay.title.includes(t)) score += 5;
    if (hay.themes.includes(t)) score += 4;
    if (hay.tags.includes(t)) score += 3;
    if (hay.meta.includes(t)) score += 2;
    if (hay.body.includes(t)) score += 1;
  }
  return score;
}

function runSearch() {
  const q = $("#searchInput").value.trim().toLowerCase();
  const tokens = q.split(/[\s,]+/).filter((t) => t.length > 1);
  let results = STORIES.slice();

  if (state.searchTheme) {
    results = results.filter((s) => s.bridges[state.searchTheme]);
  }
  if (tokens.length) {
    results = results
      .map((s) => ({ s, score: scoreStory(s, tokens) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.s);
  }

  const grid = $("#searchResults");
  if (!results.length) {
    grid.innerHTML = `<div class="no-results">
      <p><strong>No library story matches "${q}".</strong></p>
      <p>Try a broader word — or use the AI generator below to write a fresh one on exactly that topic.</p>
    </div>`;
  } else {
    grid.innerHTML = results.map(storyCardHtml).join("");
  }
}

/* ---------------- theme chips ---------------- */
function buildThemeChips(containerSel, current, onPick, includeAll = true) {
  const container = $(containerSel);
  const chips = [];
  if (includeAll) {
    chips.push(`<button class="chip ${current === null ? "active" : ""}" data-theme-pick="">All themes</button>`);
  }
  for (const [key, t] of Object.entries(THEMES)) {
    chips.push(`<button class="chip ${current === key ? "active" : ""}" data-theme-pick="${key}">${t.icon} ${t.label}</button>`);
  }
  container.innerHTML = chips.join("");
  container.onclick = (e) => {
    const chip = e.target.closest("[data-theme-pick]");
    if (!chip) return;
    onPick(chip.dataset.themePick || null);
  };
}

/* ---------------- library ---------------- */
function renderLibrary() {
  buildThemeChips("#libraryThemeChips", state.libraryTheme, (theme) => {
    state.libraryTheme = theme;
    renderLibrary();
  });
  let list = STORIES.slice();
  if (state.libraryTheme) list = list.filter((s) => s.bridges[state.libraryTheme]);
  if ($("#favoritesOnly").checked) list = list.filter((s) => state.favorites.includes(s.id));
  if ($("#hideTold").checked) list = list.filter((s) => !state.told[s.id]);
  $("#libraryGrid").innerHTML = list.length
    ? list.map(storyCardHtml).join("")
    : '<div class="no-results">Nothing matches those filters.</div>';
}

/* ---------------- talk builder ---------------- */
function openBuilder(storyOrId, opts = {}) {
  let talk;
  if (typeof storyOrId === "string") {
    const story = storyById(storyOrId);
    const themes = Object.keys(story.bridges);
    talk = {
      storyId: storyOrId,
      theme: opts.theme && story.bridges[opts.theme] ? opts.theme : themes[0],
      audience: opts.audience || state.settings.defaultAudience,
    };
  } else {
    // AI-generated story object
    talk = {
      aiStory: storyOrId,
      theme: opts.theme || Object.keys(storyOrId.bridges)[0],
      audience: opts.audience || state.settings.defaultAudience,
    };
  }
  state.talk = talk;
  store.set("talk", talk);
  renderBuilder();
  showView("builder");
}

function renderBuilder() {
  const talk = state.talk;
  const story = talkStory(talk);
  if (!story) return;

  // theme chips limited to what the story supports
  const themeContainer = $("#builderThemeChips");
  themeContainer.innerHTML = Object.keys(story.bridges)
    .map((key) => `<button class="chip ${talk.theme === key ? "active" : ""}" data-btheme="${key}">${THEMES[key].icon} ${THEMES[key].label}</button>`)
    .join("");
  themeContainer.onclick = (e) => {
    const chip = e.target.closest("[data-btheme]");
    if (!chip) return;
    talk.theme = chip.dataset.btheme;
    store.set("talk", talk);
    renderBuilder();
  };

  const audContainer = $("#builderAudienceChips");
  audContainer.innerHTML = Object.entries(AUDIENCES)
    .map(([key, a]) => `<button class="chip ${talk.audience === key ? "active" : ""}" data-baud="${key}" title="${a.blurb}">${a.label}</button>`)
    .join("");
  audContainer.onclick = (e) => {
    const chip = e.target.closest("[data-baud]");
    if (!chip) return;
    talk.audience = chip.dataset.baud;
    store.set("talk", talk);
    renderBuilder();
  };

  $("#scriptSheet").innerHTML = scriptHtml(talk);
}

function scriptSections(talk) {
  const story = talkStory(talk);
  const theme = THEMES[talk.theme];
  const audience = AUDIENCES[talk.audience];
  const bridge = story.bridges[talk.theme];
  const closer = (CLOSERS[talk.theme] && CLOSERS[talk.theme][talk.audience]) || "";
  return { story, theme, audience, bridge, closer };
}

function scriptHtml(talk) {
  const { story, theme, audience, bridge, closer } = scriptSections(talk);
  const words = scriptText(talk).split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 130));
  return `
    <p class="script-byline">${story.region} · ${story.year} · for ${audience.label} · theme: ${theme.icon} ${theme.label} · ~${minutes} min spoken</p>
    <h2 class="script-title">${story.title}</h2>

    <div class="script-kicker">The Hook</div>
    <div class="script-note">Say it, then pause for two beats. Let the room lean in.</div>
    <p class="script-par script-hook">${story.hook}</p>

    ${story.context ? `
    <div class="script-kicker">Set the Scene</div>
    <div class="script-note">Ground the room before the story starts — this is where they realize they already know pieces of it.</div>
    <p class="script-par">${story.context}</p>` : ""}

    <div class="script-kicker">The Story</div>
    ${story.story.map((p) => `<p class="script-par">${p}</p>`).join("")}

    <div class="script-kicker">The Bridge — ${theme.label}</div>
    <div class="script-note">Slow down here. This is the turn from history to your shop.</div>
    <p class="script-par">${bridge}</p>

    <div class="script-kicker">The Message — for ${audience.label.toLowerCase()}</div>
    <p class="script-par">${closer}</p>

    ${story.quote ? `
    <div class="script-kicker">The Quote — Leave It On the Board</div>
    <div class="script-note">Write it on the whiteboard before the meeting and leave it up — it's the shop's theme until next Wednesday.</div>
    <blockquote class="script-quote">
      <p>${story.quote.text}</p>
      <cite>— ${story.quote.by}</cite>
    </blockquote>` : ""}

    ${story.funFact ? `<div class="script-funfact">💬 <strong>Pocket fact</strong> (great for hallway conversations after): ${story.funFact}</div>` : ""}
  `;
}

function scriptText(talk) {
  const { story, bridge, closer } = scriptSections(talk);
  const parts = [story.hook];
  if (story.context) parts.push(story.context);
  parts.push(...story.story, bridge, closer);
  if (story.quote) parts.push(`"${story.quote.text}" — ${story.quote.by}`);
  return parts.join("\n\n");
}

/* builder actions */
$("#builderBack").addEventListener("click", () => showView("find"));
$("#copyScriptBtn").addEventListener("click", async () => {
  const talk = state.talk;
  const { story, theme, audience } = scriptSections(talk);
  const text = `${story.title}\n(${story.region}, ${story.year}) — ${theme.label} · for ${audience.label}\n\n${scriptText(talk)}`;
  try {
    await navigator.clipboard.writeText(text);
    toast("Script copied — paste it anywhere.");
  } catch {
    toast("Couldn't copy automatically. Use Print instead.");
  }
});
$("#printScriptBtn").addEventListener("click", () => window.print());
$("#markToldBtn").addEventListener("click", () => {
  const talk = state.talk;
  if (talk && talk.storyId) {
    state.told[talk.storyId] = new Date().toLocaleDateString();
    store.set("told", state.told);
    rerenderStoryLists();
    toast("Marked as told. On to the next one.");
  } else {
    toast("AI stories aren't tracked — tell it proud!");
  }
});
$("#practiceThisBtn").addEventListener("click", () => showView("practice"));

/* ---------------- practice room ---------------- */
let timerInterval = null, timerSeconds = 0;
let scrollAnim = null;
let mediaRecorder = null, recordedChunks = [], takeCount = 0;

function renderPractice() {
  const talk = state.talk;
  const hasTalk = !!talkStory(talk);
  $("#practiceEmpty").style.display = hasTalk ? "none" : "";
  $("#practiceRoom").hidden = !hasTalk;
  if (!hasTalk) return;

  const { story, theme, audience } = scriptSections(talk);
  const words = scriptText(talk).split(/\s+/).length;
  const minutes = (words / 130);
  const mm = Math.floor(minutes), ss = Math.round((minutes - mm) * 60);
  $("#practiceTitle").textContent = story.title;
  $("#practiceStats").textContent =
    `${theme.icon} ${theme.label} · for ${audience.label} · ${words} words · target ≈ ${mm}:${String(ss).padStart(2, "0")} at a calm pace`;
  $("#practiceSubtitle").textContent = "Stand up. Say it out loud. Twice through and you'll own it.";
  renderTeleprompter();
  renderTip();
}

function renderTeleprompter() {
  const talk = state.talk;
  const { story, theme, audience, bridge, closer } = scriptSections(talk);
  const tp = $("#teleprompter");
  tp.style.fontSize = $("#fontSize").value + "px";

  if (state.practiceMode === "cues") {
    const cues = [
      { label: "Hook — then PAUSE", text: story.hook },
      ...(story.context ? [{ label: "Set the scene", text: firstSentence(story.context) }] : []),
      ...story.story.map((p, i) => ({
        label: "Beat " + (i + 1),
        text: firstSentence(p),
      })),
      { label: "Bridge → " + theme.label, text: firstSentence(bridge) },
      { label: "Close — " + audience.short, text: firstSentence(closer) },
      ...(story.quote ? [{ label: "Quote — last words", text: `“${story.quote.text}”` }] : []),
    ];
    tp.innerHTML = `<ul class="tp-cues">${cues.map((c) =>
      `<li><span class="cue-label">${c.label}</span>${c.text}</li>`).join("")}</ul>
      <p class="tp-end">— TALK YOUR WAY BETWEEN THE BEATS —</p>`;
  } else {
    tp.innerHTML = `
      <p class="tp-kicker">Hook — say it, then pause</p>
      <p class="tp-hook">${story.hook}</p>
      ${story.context ? `<p class="tp-kicker">Set the scene</p><p>${story.context}</p>` : ""}
      <p class="tp-kicker">Story</p>
      ${story.story.map((p) => `<p>${p}</p>`).join("")}
      <p class="tp-kicker">Bridge — ${theme.label} — slow down</p>
      <p>${bridge}</p>
      <p class="tp-kicker">Message for ${audience.label}</p>
      <p>${closer}</p>
      ${story.quote ? `<p class="tp-kicker">The quote — slow, then stop</p><p class="tp-hook">“${story.quote.text}”<br>— ${story.quote.by}</p>` : ""}
      <p class="tp-end">— HOLD ONE BEAT, THEN INTO THE AGENDA —</p>`;
  }
  tp.scrollTop = 0;
}

function firstSentence(text) {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return m ? m[0].trim() : text;
}

/* mode toggle */
$$(".mode-btn").forEach((btn) => btn.addEventListener("click", () => {
  state.practiceMode = btn.dataset.pmode;
  $$(".mode-btn").forEach((b) => b.classList.toggle("active", b === btn));
  renderTeleprompter();
}));

/* timer */
function fmtTime(total) {
  const m = Math.floor(total / 60), s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
$("#timerToggle").addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval); timerInterval = null;
    $("#timerToggle").textContent = "▶ Start";
  } else {
    timerInterval = setInterval(() => {
      timerSeconds++;
      $("#timerDisplay").textContent = fmtTime(timerSeconds);
    }, 1000);
    $("#timerToggle").textContent = "⏸ Pause";
  }
});
$("#timerReset").addEventListener("click", () => {
  clearInterval(timerInterval); timerInterval = null; timerSeconds = 0;
  $("#timerDisplay").textContent = "0:00";
  $("#timerToggle").textContent = "▶ Start";
});

/* auto-scroll */
$("#scrollToggle").addEventListener("click", () => {
  if (scrollAnim) { stopScroll(); return; }
  const tp = $("#teleprompter");
  let carry = 0;
  const step = () => {
    const speed = Number($("#scrollSpeed").value) * 0.22;
    carry += speed;
    if (carry >= 1) {
      const px = Math.floor(carry);
      tp.scrollTop += px;
      carry -= px;
    }
    if (tp.scrollTop + tp.clientHeight >= tp.scrollHeight - 2) { stopScroll(); return; }
    scrollAnim = requestAnimationFrame(step);
  };
  scrollAnim = requestAnimationFrame(step);
  $("#scrollToggle").textContent = "⏸ Stop";
});
function stopScroll() {
  cancelAnimationFrame(scrollAnim); scrollAnim = null;
  $("#scrollToggle").textContent = "▶ Roll";
}
$("#fontSize").addEventListener("input", () => {
  $("#teleprompter").style.fontSize = $("#fontSize").value + "px";
});

/* listen (text-to-speech) */
let speaking = false;
$("#listenBtn").addEventListener("click", () => {
  if (!("speechSynthesis" in window)) { toast("This browser can't read aloud."); return; }
  if (speaking) {
    speechSynthesis.cancel(); speaking = false;
    $("#listenBtn").textContent = "🔊 Listen";
    return;
  }
  const u = new SpeechSynthesisUtterance(scriptText(state.talk));
  u.rate = 0.95;
  u.onend = u.onerror = () => { speaking = false; $("#listenBtn").textContent = "🔊 Listen"; };
  speechSynthesis.speak(u);
  speaking = true;
  $("#listenBtn").textContent = "⏹ Stop";
});

/* record yourself */
$("#recordBtn").addEventListener("click", async () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    return;
  }
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    toast("Recording isn't supported in this browser.");
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => { if (e.data.size) recordedChunks.push(e.data); };
    mediaRecorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || "audio/webm" });
      addTake(URL.createObjectURL(blob));
      $("#recordBtn").textContent = "● Record";
      $("#recordBtn").classList.remove("recording");
    };
    mediaRecorder.start();
    $("#recordBtn").textContent = "■ Stop take";
    $("#recordBtn").classList.add("recording");
    toast("Recording… speak like it's Wednesday.");
  } catch {
    toast("Microphone access was blocked. Allow it in the browser bar and try again.");
  }
});

function addTake(url) {
  takeCount++;
  $("#takesPanel").hidden = false;
  const row = document.createElement("div");
  row.className = "take-row";
  row.innerHTML = `<strong>Take ${takeCount}</strong>
    <span>${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
    <audio controls src="${url}"></audio>`;
  $("#takesList").prepend(row);
  toast("Take saved below — give it a listen.");
}

/* tips */
function renderTip() {
  $("#tipText").textContent = DELIVERY_TIPS[state.tipIndex % DELIVERY_TIPS.length];
}
$("#nextTipBtn").addEventListener("click", () => {
  state.tipIndex++;
  renderTip();
});

/* practice-empty helpers */
$("#practiceWeeklyBtn").addEventListener("click", () => {
  openBuilder(weeklyStory().id);
  showView("practice");
});
$("#practiceRandomBtn").addEventListener("click", () => {
  const pick = STORIES[Math.floor(Math.random() * STORIES.length)];
  openBuilder(pick.id);
  showView("practice");
});

/* ---------------- global card buttons ---------------- */
document.addEventListener("click", (e) => {
  const buildEff = e.target.closest("[data-build-eff]");
  if (buildEff) { openBuilder(buildEff.dataset.buildEff, { theme: "efficiency" }); return; }
  const build = e.target.closest("[data-build]");
  if (build) { openBuilder(build.dataset.build); return; }
  const prac = e.target.closest("[data-practice-story]");
  if (prac) {
    openBuilder(prac.dataset.practiceStory);
    showView("practice");
  }
});

/* ---------------- home hero ---------------- */
$("#heroBuildBtn").addEventListener("click", () => openBuilder(weeklyStory().id));
$("#heroShuffleBtn").addEventListener("click", () => {
  const notTold = STORIES.filter((s) => !state.told[s.id]);
  const pool = notTold.length ? notTold : STORIES;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  openBuilder(pick.id);
  toast(`Tonight's practice story: ${pick.title}`);
});

/* ---------------- search wiring ---------------- */
$("#searchBtn").addEventListener("click", runSearch);
$("#searchInput").addEventListener("input", runSearch);
$("#searchInput").addEventListener("keydown", (e) => { if (e.key === "Enter") runSearch(); });

/* ---------------- settings modal ---------------- */
function openSettingsModal() {
  $("#aiKey").value = state.settings.aiKey || "";
  $("#aiBaseUrl").value = state.settings.aiBaseUrl || "https://api.openai.com/v1";
  $("#aiModel").value = state.settings.aiModel || "gpt-4o-mini";
  $("#defaultAudience").value = state.settings.defaultAudience || "everyone";
  $("#settingsModal").showModal();
}
$("#openSettings").addEventListener("click", openSettingsModal);
$("#saveSettings").addEventListener("click", () => {
  state.settings = {
    aiKey: $("#aiKey").value.trim(),
    aiBaseUrl: ($("#aiBaseUrl").value.trim() || "https://api.openai.com/v1").replace(/\/+$/, ""),
    aiModel: $("#aiModel").value.trim() || "gpt-4o-mini",
    defaultAudience: $("#defaultAudience").value,
  };
  store.set("settings", state.settings);
  updateAiCallout();
  toast("Settings saved.");
});

/* ---------------- AI story generation ---------------- */
function aiConfigured() { return !!state.settings.aiKey; }

function updateAiCallout() {
  $("#aiCalloutBlurb").innerHTML = aiConfigured()
    ? "AI is connected. Type any topic above — Roman roads, a machine, a value like patience — pick a theme, and generate a brand-new story shaped for your shop."
    : 'Connect an AI key in <button class="linklike" data-open-settings>Settings</button> and Toolbox Tales can write a fresh, historically-grounded story on whatever topic you type — shaped for your theme and audience.';
}

$("#aiGenerateBtn").addEventListener("click", async () => {
  if (!aiConfigured()) { openSettingsModal(); return; }
  const topic = $("#searchInput").value.trim();
  if (!topic) { toast("Type a topic in the search box first."); $("#searchInput").focus(); return; }
  const theme = state.searchTheme || "teamwork";
  const audience = state.settings.defaultAudience;

  const out = $("#aiResult");
  out.innerHTML = `<div class="ai-loading">Digging through history for a story about “${topic}”…</div>`;

  try {
    const story = await generateAiStory(topic, theme, audience);
    out.innerHTML = "";
    openBuilder(story, { theme, audience });
    toast("Fresh story generated — shape it and practice it.");
  } catch (err) {
    out.innerHTML = `<div class="ai-error"><strong>Couldn't generate a story.</strong> ${escapeHtml(err.message)}<br>
      Check your key, base URL, and model in Settings — or grab a library story instead.</div>`;
  }
});

async function generateAiStory(topic, themeKey, audienceKey) {
  const theme = THEMES[themeKey];
  const audience = AUDIENCES[audienceKey];
  const sys = `You are a master storyteller and speechwriter helping a service center leader at Altec (a company that services utility trucks, aerial devices, and equipment) open their weekly Wednesday team meeting with a story from history. You favor true, verifiable stories, and love Latin American history when it fits the topic. You write to be SPOKEN aloud: short sentences, plain words, vivid concrete details, real names, numbers and dates. Never invent fake historical facts; choose a real event that fits.

Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{
  "title": "string",
  "region": "string",
  "year": "string",
  "hook": "one gripping opening line",
  "context": "one spoken scene-setting line that connects the story to something the audience already knows",
  "story": ["paragraph 1", "paragraph 2", "paragraph 3", "paragraph 4"],
  "bridge": "one paragraph that turns the history into a lesson about the theme, landing on a concrete behavior in a vehicle-service shop (bays, work orders, inspections, parts, handoffs)",
  "quote": { "text": "a real, verifiable historical quote or traditional phrase that fits the story — never invent one", "by": "who said it or where it comes from" },
  "funFact": "one short surprising fact"
}`;
  const user = `Topic: ${topic}
Theme to land: ${theme.label} (${theme.blurb})
Audience: ${audience.label} (${audience.blurb})
Length: the four story paragraphs together should take about 2 minutes to say aloud (roughly 260 words total).`;

  const res = await fetch(state.settings.aiBaseUrl + "/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + state.settings.aiKey,
    },
    body: JSON.stringify({
      model: state.settings.aiModel,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user },
      ],
      temperature: 0.8,
    }),
  });
  if (!res.ok) {
    let detail = res.status + " " + res.statusText;
    try {
      const errBody = await res.json();
      if (errBody.error && errBody.error.message) detail = errBody.error.message;
    } catch {}
    throw new Error(detail);
  }
  const data = await res.json();
  const raw = data.choices && data.choices[0] && data.choices[0].message
    ? data.choices[0].message.content : "";
  const parsed = parseJsonLoose(raw);
  if (!parsed || !parsed.title || !parsed.story) {
    throw new Error("The model's answer wasn't in the expected format. Try again.");
  }
  return {
    id: "ai-" + Date.now(),
    title: parsed.title,
    region: parsed.region || "History",
    year: parsed.year || "",
    era: "AI-generated — double-check facts before you tell it",
    tags: [topic],
    hook: parsed.hook || "",
    context: parsed.context || "",
    story: Array.isArray(parsed.story) ? parsed.story : [String(parsed.story)],
    bridges: { [themeKey]: parsed.bridge || "" },
    quote: parsed.quote && parsed.quote.text ? { text: parsed.quote.text, by: parsed.quote.by || "" } : null,
    funFact: parsed.funFact || "",
  };
}

function parseJsonLoose(text) {
  try { return JSON.parse(text); } catch {}
  const m = text.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- library filter toggles ---------------- */
$("#favoritesOnly").addEventListener("change", renderLibrary);
$("#hideTold").addEventListener("change", renderLibrary);

/* ---------------- boot ---------------- */
function init() {
  renderWeeklyCard();
  const wireSearchChips = () => buildThemeChips("#themeChips", state.searchTheme, (theme) => {
    state.searchTheme = theme;
    wireSearchChips();
    runSearch();
  });
  wireSearchChips();
  runSearch();
  renderLibrary();
  updateAiCallout();
  if (state.talk && talkStory(state.talk)) renderBuilder();
}

init();
