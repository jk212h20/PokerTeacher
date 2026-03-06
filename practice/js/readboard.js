// Read the Board Mode - Answer YES/NO questions about board texture

// Game state
let rbBoard = [];
let rbBoardSize = 5;
let rbQuestions = [];
let rbUserAnswers = {};
let rbStreak = 0;
let rbCorrectCount = 0;
let rbTotalCount = 0;
let rbGameEnded = false;

// DOM elements
let rbBoardEl, rbQuestionsEl, rbResultEl, rbResultMessageEl;
let rbCheckBtn, nextRbBtn;
let rbStreakEl, rbCorrectEl, rbTotalEl;
let rbBoardSizeBtns;

// ============================================
// HELPER: format card for explanations
// ============================================
// SUIT_SYMBOLS is defined in cards.js (global)
const RB_SUIT_NAMES_EN = { hearts: 'hearts', diamonds: 'diamonds', spades: 'spades', clubs: 'clubs' };
const RB_SUIT_NAMES_ES = { hearts: 'corazones', diamonds: 'diamantes', spades: 'picas', clubs: 'tréboles' };

function suitName(suit) {
    const names = (typeof pCurrentLang !== 'undefined' && pCurrentLang === 'es') ? RB_SUIT_NAMES_ES : RB_SUIT_NAMES_EN;
    return names[suit] || suit;
}

function cardStr(card) {
    return card.rank + SUIT_SYMBOLS[card.suit];
}

function boardCardsStr(cards) {
    return cards.map(cardStr).join(', ');
}

// ============================================
// QUESTION DEFINITIONS
// ============================================

const ALL_QUESTIONS = [
    // Made Hand Questions
    {
        id: 'flush_possible',
        text: 'Is a flush possible?',
        check: (board) => {
            const suitCounts = {};
            board.forEach(c => suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1);
            return Math.max(...Object.values(suitCounts)) >= 3;
        },
        explain: (board, answer) => {
            const suitCounts = {};
            board.forEach(c => suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1);
            if (answer) {
                const flushSuit = Object.entries(suitCounts).find(([s, c]) => c >= 3)[0];
                const suited = board.filter(c => c.suit === flushSuit);
                return pt('rb.e.flush_possible_yes', suited.length, SUIT_SYMBOLS[flushSuit], suitName(flushSuit));
            } else {
                const maxCount = Math.max(...Object.values(suitCounts));
                return pt('rb.e.flush_possible_no', maxCount);
            }
        },
        minCards: 3
    },
    {
        id: 'straight_possible',
        text: 'Is a straight possible?',
        check: (board) => {
            const values = board.map(c => c.value);
            if (values.includes(14)) values.push(1);
            const unique = [...new Set(values)].sort((a,b) => a-b);
            
            for (let start = 1; start <= 10; start++) {
                let count = 0;
                for (let v = start; v < start + 5; v++) {
                    if (unique.includes(v)) count++;
                }
                if (count >= 3) return true;
            }
            return false;
        },
        explain: (board, answer) => {
            if (answer) {
                const values = board.map(c => c.value);
                if (values.includes(14)) values.push(1);
                const unique = [...new Set(values)].sort((a,b) => a-b);
                
                // Find the best window
                let bestStart = 1, bestCount = 0;
                for (let start = 1; start <= 10; start++) {
                    let count = 0;
                    for (let v = start; v < start + 5; v++) {
                        if (unique.includes(v)) count++;
                    }
                    if (count > bestCount) { bestCount = count; bestStart = start; }
                }
                const windowCards = [];
                for (let v = bestStart; v < bestStart + 5; v++) {
                    const card = board.find(c => c.value === v || (v === 1 && c.value === 14));
                    if (card) windowCards.push(cardStr(card));
                }
                return pt('rb.e.straight_possible_yes', windowCards.join(', '), 5 - bestCount);
            } else {
                return pt('rb.e.straight_possible_no');
            }
        },
        minCards: 3
    },
    {
        id: 'board_paired',
        text: 'Is the board paired?',
        check: (board) => {
            const rankCounts = {};
            board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
            return Math.max(...Object.values(rankCounts)) >= 2;
        },
        explain: (board, answer) => {
            if (answer) {
                const rankCounts = {};
                board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
                const paired = Object.entries(rankCounts).filter(([r, c]) => c >= 2).map(([r]) => r);
                return pt('rb.e.board_paired_yes', paired.join(', '));
            } else {
                return pt('rb.e.board_paired_no');
            }
        },
        minCards: 3
    },
    {
        id: 'trips_on_board',
        text: 'Are there trips on the board?',
        check: (board) => {
            const rankCounts = {};
            board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
            return Math.max(...Object.values(rankCounts)) >= 3;
        },
        explain: (board, answer) => {
            if (answer) {
                const rankCounts = {};
                board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
                const trips = Object.entries(rankCounts).filter(([r, c]) => c >= 3).map(([r]) => r);
                return pt('rb.e.trips_on_board_yes', trips[0]);
            } else {
                const rankCounts = {};
                board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
                const maxCount = Math.max(...Object.values(rankCounts));
                return pt('rb.e.trips_on_board_no', maxCount);
            }
        },
        minCards: 3
    },
    {
        id: 'four_flush',
        text: 'Is there a four-flush on board?',
        check: (board) => {
            const suitCounts = {};
            board.forEach(c => suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1);
            return Math.max(...Object.values(suitCounts)) >= 4;
        },
        explain: (board, answer) => {
            const suitCounts = {};
            board.forEach(c => suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1);
            if (answer) {
                const flushSuit = Object.entries(suitCounts).find(([s, c]) => c >= 4)[0];
                const suited = board.filter(c => c.suit === flushSuit);
                return pt('rb.e.four_flush_yes', suited.length, SUIT_SYMBOLS[flushSuit], suitName(flushSuit));
            } else {
                const maxCount = Math.max(...Object.values(suitCounts));
                return pt('rb.e.four_flush_no', maxCount);
            }
        },
        minCards: 4
    },
    {
        id: 'four_straight',
        text: 'Are there 4 to a straight on board?',
        check: (board) => {
            const values = board.map(c => c.value);
            if (values.includes(14)) values.push(1);
            const unique = [...new Set(values)].sort((a,b) => a-b);
            
            for (let start = 1; start <= 10; start++) {
                let count = 0;
                for (let v = start; v < start + 5; v++) {
                    if (unique.includes(v)) count++;
                }
                if (count >= 4) return true;
            }
            return false;
        },
        explain: (board, answer) => {
            if (answer) {
                const values = board.map(c => c.value);
                if (values.includes(14)) values.push(1);
                const unique = [...new Set(values)].sort((a,b) => a-b);
                
                let bestStart = 1, bestCount = 0;
                for (let start = 1; start <= 10; start++) {
                    let count = 0;
                    for (let v = start; v < start + 5; v++) {
                        if (unique.includes(v)) count++;
                    }
                    if (count > bestCount) { bestCount = count; bestStart = start; }
                }
                const windowCards = [];
                for (let v = bestStart; v < bestStart + 5; v++) {
                    const card = board.find(c => c.value === v || (v === 1 && c.value === 14));
                    if (card) windowCards.push(cardStr(card));
                }
                return pt('rb.e.four_straight_yes', windowCards.join(', '));
            } else {
                return pt('rb.e.four_straight_no');
            }
        },
        minCards: 4
    },
    {
        id: 'quads_possible',
        text: 'Could someone have quads?',
        check: (board) => {
            const rankCounts = {};
            board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
            return Math.max(...Object.values(rankCounts)) >= 2;
        },
        explain: (board, answer) => {
            if (answer) {
                const rankCounts = {};
                board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
                const paired = Object.entries(rankCounts).filter(([r, c]) => c >= 2).map(([r]) => r);
                return pt('rb.e.quads_possible_yes', paired.join(', '));
            } else {
                return pt('rb.e.quads_possible_no');
            }
        },
        minCards: 3
    },
    
    // Board Texture Questions
    {
        id: 'rainbow',
        text: 'Is this a rainbow board?',
        check: (board) => {
            const suits = new Set(board.map(c => c.suit));
            return suits.size === board.length || (board.length > 4 && suits.size >= 4);
        },
        explain: (board, answer) => {
            const suitCounts = {};
            board.forEach(c => suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1);
            if (answer) {
                const numSuits = Object.keys(suitCounts).length;
                return pt('rb.e.rainbow_yes', numSuits);
            } else {
                const duped = Object.entries(suitCounts).filter(([s, c]) => c >= 2);
                const suitInfo = duped.map(([s, c]) => `${c}× ${SUIT_SYMBOLS[s]}`).join(', ');
                return pt('rb.e.rainbow_no', suitInfo);
            }
        },
        minCards: 3
    },
    {
        id: 'monotone',
        text: 'Is this a monotone board?',
        check: (board) => {
            const suits = new Set(board.map(c => c.suit));
            return suits.size === 1;
        },
        explain: (board, answer) => {
            if (answer) {
                return pt('rb.e.monotone_yes', SUIT_SYMBOLS[board[0].suit], suitName(board[0].suit));
            } else {
                const suits = [...new Set(board.map(c => c.suit))];
                const suitList = suits.map(s => SUIT_SYMBOLS[s]).join(' ');
                return pt('rb.e.monotone_no', suits.length, suitList);
            }
        },
        minCards: 3
    },
    {
        id: 'three_straight',
        text: 'Are there 3+ connected cards?',
        check: (board) => {
            const values = board.map(c => c.value);
            if (values.includes(14)) values.push(1);
            const sorted = [...new Set(values)].sort((a,b) => a-b);
            
            let maxConnected = 1;
            let current = 1;
            for (let i = 1; i < sorted.length; i++) {
                if (sorted[i] === sorted[i-1] + 1) {
                    current++;
                    maxConnected = Math.max(maxConnected, current);
                } else {
                    current = 1;
                }
            }
            return maxConnected >= 3;
        },
        explain: (board, answer) => {
            if (answer) {
                const values = board.map(c => c.value);
                if (values.includes(14)) values.push(1);
                const sorted = [...new Set(values)].sort((a,b) => a-b);
                
                // Find the connected run
                let bestRun = [sorted[0]];
                let currentRun = [sorted[0]];
                for (let i = 1; i < sorted.length; i++) {
                    if (sorted[i] === sorted[i-1] + 1) {
                        currentRun.push(sorted[i]);
                        if (currentRun.length > bestRun.length) bestRun = [...currentRun];
                    } else {
                        currentRun = [sorted[i]];
                    }
                }
                const runCards = bestRun.map(v => {
                    const card = board.find(c => c.value === v || (v === 1 && c.value === 14));
                    return card ? cardStr(card) : v;
                });
                return pt('rb.e.three_straight_yes', runCards.join(', '));
            } else {
                return pt('rb.e.three_straight_no');
            }
        },
        minCards: 3
    },
    {
        id: 'disconnected',
        text: 'Is the board disconnected?',
        check: (board) => {
            const values = [...new Set(board.map(c => c.value))].sort((a,b) => a-b);
            for (let i = 1; i < values.length; i++) {
                if (values[i] - values[i-1] <= 3) return false;
            }
            return true;
        },
        explain: (board, answer) => {
            if (answer) {
                return pt('rb.e.disconnected_yes');
            } else {
                const values = [...new Set(board.map(c => c.value))].sort((a,b) => a-b);
                // Find the closest pair
                let minGap = 99, closeA = 0, closeB = 0;
                for (let i = 1; i < values.length; i++) {
                    const gap = values[i] - values[i-1];
                    if (gap < minGap) { minGap = gap; closeA = values[i-1]; closeB = values[i]; }
                }
                const cardA = board.find(c => c.value === closeA);
                const cardB = board.find(c => c.value === closeB);
                return pt('rb.e.disconnected_no', cardStr(cardA), cardStr(cardB), minGap);
            }
        },
        minCards: 3
    },
    {
        id: 'ace_on_board',
        text: 'Is there an Ace on the board?',
        check: (board) => board.some(c => c.rank === 'A'),
        explain: (board, answer) => {
            if (answer) {
                const aces = board.filter(c => c.rank === 'A');
                return pt('rb.e.ace_on_board_yes', boardCardsStr(aces));
            } else {
                return pt('rb.e.ace_on_board_no');
            }
        },
        minCards: 3
    },
    {
        id: 'broadway_cards',
        text: 'Are there any Broadway cards?',
        check: (board) => {
            const broadway = ['T', 'J', 'Q', 'K', 'A'];
            return board.some(c => broadway.includes(c.rank));
        },
        explain: (board, answer) => {
            const broadway = ['T', 'J', 'Q', 'K', 'A'];
            if (answer) {
                const bCards = board.filter(c => broadway.includes(c.rank));
                return pt('rb.e.broadway_cards_yes', boardCardsStr(bCards));
            } else {
                return pt('rb.e.broadway_cards_no');
            }
        },
        minCards: 3
    },
    {
        id: 'low_board',
        text: 'Are all cards 8 or below?',
        check: (board) => board.every(c => c.value <= 8),
        explain: (board, answer) => {
            if (answer) {
                const highest = board.reduce((a, b) => a.value > b.value ? a : b);
                return pt('rb.e.low_board_yes', cardStr(highest));
            } else {
                const highCards = board.filter(c => c.value > 8);
                return pt('rb.e.low_board_no', boardCardsStr(highCards));
            }
        },
        minCards: 3
    },
    {
        id: 'high_board',
        text: 'Are all cards 9 or higher?',
        check: (board) => board.every(c => c.value >= 9),
        explain: (board, answer) => {
            if (answer) {
                const lowest = board.reduce((a, b) => a.value < b.value ? a : b);
                return pt('rb.e.high_board_yes', cardStr(lowest));
            } else {
                const lowCards = board.filter(c => c.value < 9);
                return pt('rb.e.high_board_no', boardCardsStr(lowCards));
            }
        },
        minCards: 3
    },
    
    // Situational Questions
    {
        id: 'straight_flush_possible',
        text: 'Could the nuts be a straight flush?',
        check: (board) => {
            for (const suit of SUITS) {
                const suitedCards = board.filter(c => c.suit === suit);
                if (suitedCards.length >= 3) {
                    const values = suitedCards.map(c => c.value);
                    if (values.includes(14)) values.push(1);
                    
                    for (let start = 1; start <= 10; start++) {
                        let count = 0;
                        for (let v = start; v < start + 5; v++) {
                            if (values.includes(v)) count++;
                        }
                        if (count >= 3) return true;
                    }
                }
            }
            return false;
        },
        explain: (board, answer) => {
            if (answer) {
                for (const suit of SUITS) {
                    const suitedCards = board.filter(c => c.suit === suit);
                    if (suitedCards.length >= 3) {
                        const values = suitedCards.map(c => c.value);
                        if (values.includes(14)) values.push(1);
                        for (let start = 1; start <= 10; start++) {
                            let count = 0;
                            for (let v = start; v < start + 5; v++) {
                                if (values.includes(v)) count++;
                            }
                            if (count >= 3) {
                                return pt('rb.e.straight_flush_possible_yes', suitedCards.length, SUIT_SYMBOLS[suit]);
                            }
                        }
                    }
                }
            }
            return pt('rb.e.straight_flush_possible_no');
        },
        minCards: 3
    },
    {
        id: 'wheel_possible',
        text: 'Is a wheel (A-2-3-4-5) possible?',
        check: (board) => {
            const wheelRanks = ['A', '2', '3', '4', '5'];
            const boardRanks = board.map(c => c.rank);
            let wheelCount = 0;
            for (const r of wheelRanks) {
                if (boardRanks.includes(r)) wheelCount++;
            }
            return wheelCount >= 3;
        },
        explain: (board, answer) => {
            const wheelRanks = ['A', '2', '3', '4', '5'];
            const wheelCards = board.filter(c => wheelRanks.includes(c.rank));
            if (answer) {
                return pt('rb.e.wheel_possible_yes', wheelCards.length, boardCardsStr(wheelCards), 5 - wheelCards.length);
            } else {
                return pt('rb.e.wheel_possible_no', wheelCards.length);
            }
        },
        minCards: 3
    },
    {
        id: 'broadway_straight_possible',
        text: 'Is Broadway (A-K-Q-J-T) possible?',
        check: (board) => {
            const broadwayRanks = ['A', 'K', 'Q', 'J', 'T'];
            const boardRanks = board.map(c => c.rank);
            let count = 0;
            for (const r of broadwayRanks) {
                if (boardRanks.includes(r)) count++;
            }
            return count >= 3;
        },
        explain: (board, answer) => {
            const broadwayRanks = ['A', 'K', 'Q', 'J', 'T'];
            const bCards = board.filter(c => broadwayRanks.includes(c.rank));
            if (answer) {
                return pt('rb.e.broadway_straight_yes', bCards.length, boardCardsStr(bCards));
            } else {
                return pt('rb.e.broadway_straight_no', bCards.length);
            }
        },
        minCards: 3
    },
    {
        id: 'playing_the_board',
        text: 'Could someone play the board?',
        check: (board) => board.length === 5,
        explain: (board, answer) => {
            return pt('rb.e.playing_the_board');
        },
        minCards: 5
    },
    {
        id: 'flush_draw_possible',
        text: 'Is a flush draw possible?',
        check: (board) => {
            const suitCounts = {};
            board.forEach(c => suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1);
            return Object.values(suitCounts).some(count => count >= 2);
        },
        explain: (board, answer) => {
            const suitCounts = {};
            board.forEach(c => suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1);
            if (answer) {
                const drawSuit = Object.entries(suitCounts).find(([s, c]) => c >= 2)[0];
                const suited = board.filter(c => c.suit === drawSuit);
                return pt('rb.e.flush_draw_possible_yes', suited.length, SUIT_SYMBOLS[drawSuit]);
            } else {
                return pt('rb.e.flush_draw_possible_no');
            }
        },
        minCards: 3,
        maxCards: 4
    },
    {
        id: 'oesd_possible',
        text: 'Is an open-ended straight draw possible?',
        check: (board) => {
            const values = board.map(c => c.value);
            if (values.includes(14)) values.push(1);
            const unique = [...new Set(values)].sort((a,b) => a-b);
            
            for (let start = 2; start <= 10; start++) {
                let count = 0;
                for (let v = start; v < start + 4; v++) {
                    if (unique.includes(v)) count++;
                }
                if (count >= 2) return true;
            }
            return false;
        },
        explain: (board, answer) => {
            if (answer) {
                return pt('rb.e.oesd_possible_yes');
            } else {
                return pt('rb.e.oesd_possible_no');
            }
        },
        minCards: 3,
        maxCards: 4
    },
    {
        id: 'two_pair_board',
        text: 'Are there two pairs on the board?',
        check: (board) => {
            const rankCounts = {};
            board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
            const pairs = Object.values(rankCounts).filter(c => c >= 2);
            return pairs.length >= 2;
        },
        explain: (board, answer) => {
            const rankCounts = {};
            board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
            if (answer) {
                const pairs = Object.entries(rankCounts).filter(([r, c]) => c >= 2).map(([r]) => r);
                return pt('rb.e.two_pair_board_yes', pairs.join(', '));
            } else {
                const pairCount = Object.values(rankCounts).filter(c => c >= 2).length;
                return pt('rb.e.two_pair_board_no', pairCount);
            }
        },
        minCards: 4
    },
    {
        id: 'full_house_possible',
        text: 'Is a full house possible?',
        check: (board) => {
            const rankCounts = {};
            board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
            return Math.max(...Object.values(rankCounts)) >= 2 || board.length >= 3;
        },
        explain: (board, answer) => {
            const rankCounts = {};
            board.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
            if (answer) {
                const maxCount = Math.max(...Object.values(rankCounts));
                if (maxCount >= 2) {
                    const paired = Object.entries(rankCounts).filter(([r, c]) => c >= 2).map(([r]) => r);
                    return pt('rb.e.full_house_possible_paired', paired.join(', '));
                }
                return pt('rb.e.full_house_possible_generic');
            } else {
                return pt('rb.e.full_house_possible_no');
            }
        },
        minCards: 3
    }
];

// ============================================
// INITIALIZATION
// ============================================

function initReadBoardMode() {
    rbBoardEl = document.getElementById('rb-board-cards');
    rbQuestionsEl = document.getElementById('rb-questions');
    rbResultEl = document.getElementById('rb-result');
    rbResultMessageEl = document.getElementById('rb-result-message');
    rbCheckBtn = document.getElementById('rb-check-btn');
    nextRbBtn = document.getElementById('next-rb-btn');
    rbStreakEl = document.getElementById('rb-streak');
    rbCorrectEl = document.getElementById('rb-correct');
    rbTotalEl = document.getElementById('rb-total');
    
    // Board size buttons
    rbBoardSizeBtns = document.querySelectorAll('#rb-board-size .rb-size-btn');
    rbBoardSizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            rbBoardSizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            rbBoardSize = parseInt(btn.dataset.size);
            newReadBoardRound();
        });
    });
    
    rbCheckBtn.addEventListener('click', checkReadBoardAnswers);
    nextRbBtn.addEventListener('click', newReadBoardRound);
}

// ============================================
// GAME LOGIC
// ============================================

function getQuestionsForBoard(board) {
    const applicable = ALL_QUESTIONS.filter(q => {
        if (q.minCards && board.length < q.minCards) return false;
        if (q.maxCards && board.length > q.maxCards) return false;
        return true;
    });
    
    shuffle(applicable);
    return applicable.slice(0, 3);
}

function newReadBoardRound() {
    rbGameEnded = false;
    rbUserAnswers = {};
    rbResultEl.classList.add('hidden');
    rbCheckBtn.disabled = true;
    
    const deck = shuffle(createDeck());
    rbBoard = deck.slice(0, rbBoardSize);
    
    rbQuestions = getQuestionsForBoard(rbBoard);
    
    renderRbBoard();
    renderQuestions();
}

function renderRbBoard() {
    rbBoardEl.innerHTML = '';
    for (const card of rbBoard) {
        rbBoardEl.appendChild(createCardElement(card));
    }
}

function renderQuestions() {
    rbQuestionsEl.innerHTML = '';
    
    rbQuestions.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'rb-question';
        questionEl.dataset.id = q.id;
        
        const textEl = document.createElement('div');
        textEl.className = 'rb-question-text';
        textEl.textContent = `Q${index + 1}: ${pt('rb.q.' + q.id)}`;
        questionEl.appendChild(textEl);
        
        const buttonsEl = document.createElement('div');
        buttonsEl.className = 'rb-answer-buttons';
        
        const yesBtn = document.createElement('button');
        yesBtn.className = 'rb-answer-btn';
        yesBtn.dataset.answer = 'yes';
        yesBtn.textContent = pt('common.yes');
        yesBtn.addEventListener('click', () => selectAnswer(q.id, true, questionEl));
        buttonsEl.appendChild(yesBtn);
        
        const noBtn = document.createElement('button');
        noBtn.className = 'rb-answer-btn';
        noBtn.dataset.answer = 'no';
        noBtn.textContent = pt('common.no');
        noBtn.addEventListener('click', () => selectAnswer(q.id, false, questionEl));
        buttonsEl.appendChild(noBtn);
        
        questionEl.appendChild(buttonsEl);
        rbQuestionsEl.appendChild(questionEl);
    });
}

function selectAnswer(questionId, answer, questionEl) {
    if (rbGameEnded) return;
    
    rbUserAnswers[questionId] = answer;
    
    const buttons = questionEl.querySelectorAll('.rb-answer-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        if ((btn.dataset.answer === 'yes' && answer === true) ||
            (btn.dataset.answer === 'no' && answer === false)) {
            btn.classList.add('selected');
        }
    });
    
    if (Object.keys(rbUserAnswers).length === 3) {
        rbCheckBtn.disabled = false;
    }
}

function checkReadBoardAnswers() {
    if (rbGameEnded || Object.keys(rbUserAnswers).length < 3) return;
    
    rbGameEnded = true;
    rbTotalCount++;
    
    let correctAnswers = 0;
    
    rbQuestions.forEach(q => {
        const userAnswer = rbUserAnswers[q.id];
        const correctAnswer = q.check(rbBoard);
        const questionEl = rbQuestionsEl.querySelector(`[data-id="${q.id}"]`);
        const buttons = questionEl.querySelectorAll('.rb-answer-btn');
        
        // Disable buttons
        buttons.forEach(btn => btn.disabled = true);
        
        if (userAnswer === correctAnswer) {
            correctAnswers++;
            questionEl.classList.add('correct');
        } else {
            questionEl.classList.add('wrong');
            
            // Highlight the correct answer
            buttons.forEach(btn => {
                if ((btn.dataset.answer === 'yes' && correctAnswer === true) ||
                    (btn.dataset.answer === 'no' && correctAnswer === false)) {
                    btn.classList.add('correct-answer');
                }
            });
            
            // Add explanation for wrong answers
            if (q.explain) {
                const explanationEl = document.createElement('div');
                explanationEl.className = 'rb-explanation';
                explanationEl.innerHTML = q.explain(rbBoard, correctAnswer);
                questionEl.appendChild(explanationEl);
            }
        }
    });
    
    // Update results
    if (correctAnswers === 3) {
        rbCorrectCount++;
        rbStreak++;
        rbResultMessageEl.textContent = pt('rb.perfect');
        rbResultEl.className = 'result perfect';
    } else {
        rbStreak = 0;
        rbResultMessageEl.textContent = pt('rb.score', correctAnswers);
        rbResultEl.className = 'result failed';
    }
    
    updateRbStats();
    rbResultEl.classList.remove('hidden');
}

function updateRbStats() {
    rbStreakEl.textContent = rbStreak;
    rbCorrectEl.textContent = rbCorrectCount;
    rbTotalEl.textContent = rbTotalCount;
}
