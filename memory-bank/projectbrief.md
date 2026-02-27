# PokerTeacher — Project Brief

## What We're Building
A mobile-first, web-based interactive poker tutorial for absolute beginners. Teaches everything needed to confidently sit down at a first real-world Texas Hold'em tournament.

## Goals (Checkpoint 1)
1. Complete understanding of the deck
2. All 10 hand rankings memorized
3. Full Texas Hold'em rules and betting rounds understood
4. Tournament-specific knowledge (blinds, etiquette, terminology)

**NOT in Checkpoint 1:** Strategy, odds, advanced concepts

## Tech Stack
- Vanilla HTML/CSS/JS — no build step, no framework
- Static files only — open `index.html` in browser
- All data in JS files — no backend, no DB
- localStorage for progress persistence

## Features
- Mobile-first responsive design
- English/Spanish language toggle (localStorage-persisted)
- CSS-rendered playing cards (no image assets)
- Interactive card explorer, hand comparator, deal simulator
- Quizzes between sections — must pass to proceed
- Progress tracking via progress bar

## Deployment
- Local: open `index.html`
- No server required

## File Structure
```
PokerTeacher/
├── index.html
├── css/
│   ├── style.css       # Main styles, mobile-first
│   └── cards.css       # Card rendering
├── js/
│   ├── app.js          # Navigation, progress tracking
│   ├── cards.js        # Card rendering utilities
│   ├── i18n.js         # EN/ES translations
│   ├── lessons.js      # Lesson content & structure
│   ├── quizzes.js      # Quiz logic
│   └── animations.js   # Card animations
└── memory-bank/
```
