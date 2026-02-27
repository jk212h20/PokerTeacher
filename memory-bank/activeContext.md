# Active Context — PokerTeacher

## Current State (2026-02-26)
Checkpoint 1 complete and working. Full app renders, navigates, quizzes, and saves progress.

## Architecture
```
index.html             → SPA shell (4 screens: welcome/lesson/quiz/complete)
css/style.css          → All styles, mobile-first, dark green felt theme
css/cards.css          → CSS card rendering (xs/sm/md/lg sizes, red/black/back)
js/i18n.js             → English/Spanish translations, lang toggle, localStorage
js/cards.js            → buildDeck(), makeCard(), makeCardFromCode(), shuffle()
js/animations.js       → animateDeal(), buildMiniDeck()
js/quizzes.js          → Quiz registry (all quizIds), loadQuiz()
js/lessons-deck.js     → MODULE_DECK (5 lessons)
js/lessons-rankings.js → MODULE_RANKINGS (6 lessons)
js/lessons-holdem.js   → MODULE_HOLDEM (7 lessons)
js/lessons-tournament.js → MODULE_TOURNAMENT (7 lessons)
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

## Environment Variables
None — fully client-side, no backend.

## What's NOT Built Yet
- Module 5: Basic Strategy (checkpoint 2)
- Hand evaluator (for "what's my best hand?" interactive feature)
- PWA / offline support
- Backend / user accounts
