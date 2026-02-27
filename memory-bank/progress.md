# Progress — PokerTeacher

## ✅ What Works (Checkpoint 1)

### Infrastructure
- [x] SPA shell (index.html) — 4 screens: welcome, lesson, quiz, complete
- [x] CSS card rendering — xs/sm/md/lg sizes, red/black/back, suit symbols
- [x] English/Spanish i18n with toggle button (persisted to localStorage)
- [x] Progress bar — fills as lessons are completed, persisted
- [x] Resume from last uncompleted lesson on return visit
- [x] Back button navigation
- [x] Completion screen with restart

### Module 1: The Deck (5 lessons)
- [x] deck-intro — 52 cards, 4 suits with symbols
- [x] deck-ranks — 13 ranks animation deal-in
- [x] deck-ace — Ace high/low with card examples + quiz
- [x] deck-explorer — Interactive suit filter (All/♠/♥/♦/♣)
- [x] deck-total-quiz — Recap + quiz

### Module 2: Hand Rankings (6 lessons)
- [x] rank-intro — Overview table of all 10 hands
- [x] rank-top3 — Royal Flush, Straight Flush, Four of a Kind with cards
- [x] rank-middle3 — Full House, Flush, Straight + quiz
- [x] rank-bottom4 — Three of a Kind, Two Pair, One Pair, High Card + quiz
- [x] rank-kicker — Kicker / tiebreaker explanation + quiz
- [x] rank-royalflush-quiz — Recap glossary + quiz

### Module 3: Texas Hold'em (7 lessons)
- [x] holdem-intro — Concept: 2 hole cards + 5 community
- [x] holdem-table — Dealer button, SB, BB diagram
- [x] holdem-deal — Deal simulator (tap to reveal hole cards) + quiz
- [x] holdem-actions — All 6 betting options (Check/Bet/Call/Raise/Fold/All-in) + quiz
- [x] holdem-flop — Flop/Turn/River deal simulator (step-by-step)
- [x] holdem-turn-river — Round summary + quiz
- [x] holdem-best-hand — Best 5 from 7 example + quiz

### Module 4: Tournament Rules (7 lessons)
- [x] tourn-blinds — Blind levels and escalation
- [x] tourn-chips — Tournament chips ≠ cash + quiz
- [x] tourn-antes — Antes explained, BB Ante variant
- [x] tourn-etiquette — 6 table etiquette rules + quiz
- [x] tourn-act-in-turn — Acting in turn, consequences + quiz
- [x] tourn-terms — 10 tournament glossary terms
- [x] tourn-firsttime — Practical first-tournament advice

**Total: 25 lessons, ~15 quizzes**

## ❌ Not Built Yet

### Checkpoint 2: Basic Strategy
- [ ] Module 5: Starting hand selection (premium hands, position)
- [ ] Module 6: Pre-flop play (when to raise, when to fold)
- [ ] Module 7: Post-flop basics (continuation betting, draws)
- [ ] Module 8: Tournament survival (stack management, ICM intro)

### Future Enhancements
- [ ] Hand evaluator — "What's my best hand?" from 7 cards
- [ ] PWA manifest + service worker (offline study)
- [ ] Share progress / completion certificate
- [ ] Backend for leaderboard or study tracking

## Known Issues
- None currently — all core functionality tested and working

## API Routes
None — client-side only

## DB Schema
None — localStorage only
