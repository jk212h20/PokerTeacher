# Active Context — PokerTeacher

## Current State (2026-03-02)
Checkpoint 2 complete and working. Module 5 (Starting Hands) added — 6 lessons, 3 quizzes, full interactive components. Total: 31 lessons across 5 modules.

Recent changes:
- **Practice modes i18n (2026-03-02):** Added full English/Spanish translation infrastructure to all 8 practice modes. Created `practice/js/i18n.js` with `pt()` function, `pSetLang()`, `pApplyTranslations()`, and `data-pt` attribute support. Updated all game mode JS files (whichwins, outs, namehand, pick5, findnuts, readboard, handstrength, app/ranking) to use `pt()` for all user-facing strings. Translated hand names, descriptions, rank names, 23 board-reading questions, combo counting UI, and all result messages. Language toggle button added to practice header (shares `pt_lang` localStorage key with lesson side).
- **Fixed practice card rendering (2026-03-02):** Cards were showing centered suit-only (no rank). Fixed `practice/js/cards.js` `createCardElement()` to use `.card-corner` + `.rank` classes matching the card-design reference. Replaced CSS `container-type: inline-size` / `cqi` units in `practice/css/styles.css` with fixed `rem`/`px` values (matching `practice/card-design/cards.css`). Cards now show: small suit upper-left, large rank bottom-right.
- Progress bar hidden on welcome/home screen (shown only during lessons/quizzes)
- Four-color deck implemented on lesson side: ♥ red, ♦ blue, ♣ green, ♠ black
- Practice drills (AnnaPoker) merged into `/practice/` subdirectory
- Project moved from `/tmp/PokerTeacher` to `/Users/nick/ActiveProjects/PokerTeacher`

## Architecture
```
index.html             → SPA shell (4 screens: welcome/lesson/quiz/complete)
css/style.css          → All styles, mobile-first, dark green felt theme
css/cards.css          → CSS card rendering (xs/sm/md/lg sizes, 4-color deck, back)
js/i18n.js             → English/Spanish translations, lang toggle, localStorage
js/cards.js            → buildDeck(), makeCard(), makeCardFromCode(), shuffle()
js/animations.js       → animateDeal(), buildMiniDeck()
js/quizzes.js          → Quiz registry (all quizIds), loadQuiz()
js/lessons-deck.js     → MODULE_DECK (5 lessons)
js/lessons-rankings.js → MODULE_RANKINGS (6 lessons)
js/lessons-holdem.js   → MODULE_HOLDEM (7 lessons)
js/lessons-tournament.js → MODULE_TOURNAMENT (7 lessons)
js/lessons-starts.js   → MODULE_STARTS (6 lessons) ← NEW
js/lessons.js          → Assembles ALL_MODULES → ALL_LESSONS flat array
js/app.js              → loadLesson(), advanceFromLesson(), progress tracking
memory-bank/           → This documentation
```

## Key Patterns
- Lessons: `{ id, render(lang), afterRender?(lang), quizId? }`
- Quizzes fire after the lesson's Next button, then return to next lesson
- Progress saved to localStorage as `pt_progress` (array of completed lesson IDs)
- Language saved to localStorage as `pt_lang`
- `App.rerenderCurrent()` called on lang switch to re-render active screen

## Module 5 — Starting Hands (starts at index 25)
| Lesson | ID | Content |
|--------|-----|---------|
| 1 | starts-intro | 4 hand attributes: PAIR / HIGH / CONNECTED / SUITED |
| 2 | starts-premium | Premium hands with "Why?" expand toggles |
| 3 | starts-playable | Playable / draws / trash with attribute badges |
| 4 | starts-board | 3 interactive boards: "What does the board enable?" |
| 5 | starts-relative | 3 scenarios: relative strength to board |
| 6 | starts-practice | 4 hands: Strong/Okay/Danger verdict interaction |

Quizzes: `starts-attributes-quiz` (after L2), `starts-relative-quiz` (after L5), `starts-board-quiz` (after L6)

## New CSS Classes (Module 5)
- `.attr-badge` — attribute pill (gold border when active, strikethrough when inactive)
- `.hand-card-row` — hand + attribute badges container
- `.why-toggle` / `.why-reveal` — expandable explanation section
- `.board-scenario` / `.board-reveal-btn` / `.board-answer` — board interactive
- `.scenario-block` / `.danger-row` / `.scenario-verdict` — relative strength display
- `.strength-hand` / `.verdict-btn` / `.verdict-reveal` — practice verdict interaction

## Deployment
- **Live URL:** https://pokerteacher-production.up.railway.app
- **GitHub:** https://github.com/jk212h20/PokerTeacher
- **Railway project:** b97bd5f2-e42c-491d-99b5-f7ee4d4de6e3
- **Railway service:** 9b47fe02-1af7-4f30-ac23-83e01080e43e
- **Railway env:** b491cfbf-8d79-4282-a68d-1c52b5f83dd3
- **Server:** `server.js` — plain Node http, no dependencies, serves static files
- **Deploy:** `git push` → Railway auto-deploys from GitHub

## Environment Variables
None — fully client-side, no backend.

## What's NOT Built Yet
- Hand evaluator (for "what's my best hand?" interactive feature)
- PWA / offline support
- Backend / user accounts
- Any future modules (position play, bet sizing, etc.)
