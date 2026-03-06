// Outs Counter Mode - Poker Outs Training
// Calculates outs dynamically by simulating all possible river cards

// Outs game state
let outsBoard = [];
let yourHand = [];
let opponentHand = [];
let currentOutsScenario = null;
let outsStreak = 0;
let outsCorrectCount = 0;
let outsTotalCount = 0;

// Template scenarios - these create INTERESTING situations
// The actual outs count is calculated by code, not hardcoded
const SCENARIO_TEMPLATES = [
    // Pair draws
    { category: "Pair Draw", board: ['Kh', '9d', '6c', '3s'], yourHand: ['Ah', 'Qd'], opponentHand: ['Kd', 'Jc'] },
    { category: "Pair Draw", board: ['Jh', '8d', '5c', '2s'], yourHand: ['Ac', 'Kd'], opponentHand: ['Jd', 'Tc'] },
    { category: "Pair Draw", board: ['Ah', 'Td', '7c', '3s'], yourHand: ['As', 'Jh'], opponentHand: ['Ad', 'Qc'] },
    { category: "Set Draw", board: ['Kh', 'Qd', '8c', '4s'], yourHand: ['Jh', 'Jd'], opponentHand: ['Kd', 'Tc'] },
    
    // Gutshot draws
    { category: "Gutshot", board: ['Jh', '9d', '5c', '2s'], yourHand: ['Qc', 'Th'], opponentHand: ['Jd', 'Kc'] },
    { category: "Gutshot", board: ['9h', '7d', '6c', '2s'], yourHand: ['Th', '8c'], opponentHand: ['9d', 'Ac'] },
    { category: "Gutshot", board: ['Kh', 'Qd', '9c', '4s'], yourHand: ['Jh', 'Td'], opponentHand: ['Kd', 'Qc'] },
    
    // Open-ended straight draws
    { category: "Open-Ender", board: ['Jh', 'Td', '4c', '2s'], yourHand: ['9h', '8c'], opponentHand: ['Jd', 'Ac'] },
    { category: "Open-Ender", board: ['8h', '7d', '3c', '2s'], yourHand: ['6h', '5d'], opponentHand: ['8d', 'Ac'] },
    { category: "Open-Ender", board: ['Qh', 'Jd', '3c', '2s'], yourHand: ['Th', '9d'], opponentHand: ['Qd', 'Kc'] },
    { category: "Open-Ender", board: ['Th', '9d', '3c', '2s'], yourHand: ['8h', '7c'], opponentHand: ['Tc', 'Ac'] },
    
    // Double gutters
    { category: "Double Gutter", board: ['Qh', 'Td', '7c', '4s'], yourHand: ['9h', '8d'], opponentHand: ['Qd', 'Jc'] },
    
    // Flush draws
    { category: "Flush Draw", board: ['Kh', '9h', '5h', '2c'], yourHand: ['Ah', 'Td'], opponentHand: ['Kd', 'Qc'] },
    { category: "Flush Draw", board: ['Jc', '8c', '4c', '2s'], yourHand: ['Ac', 'Kh'], opponentHand: ['Jd', 'Qd'] },
    { category: "Flush Draw", board: ['Qs', '8s', '4s', '3h'], yourHand: ['As', 'Kc'], opponentHand: ['Qd', 'Jd'] },
    { category: "Flush Draw", board: ['Kd', 'Td', '6d', '3c'], yourHand: ['Qd', 'Jh'], opponentHand: ['Kh', 'Qc'] },
    
    // Combo draws
    { category: "Combo Draw", board: ['Jh', '9h', '4h', '2c'], yourHand: ['Qh', 'Td'], opponentHand: ['Jd', 'Ac'] },
    { category: "Combo Draw", board: ['Tc', '9c', '3c', '2h'], yourHand: ['Jc', '8h'], opponentHand: ['Td', 'Qd'] },
    { category: "Combo Draw", board: ['Qh', 'Jh', '4h', '2c'], yourHand: ['Th', '9h'], opponentHand: ['Qd', 'Kc'] },
    
    // Overcards
    { category: "Overcards", board: ['Jh', '8d', '5c', '2s'], yourHand: ['Ah', 'Kd'], opponentHand: ['8h', '7c'] },
    { category: "Overcards", board: ['Kh', 'Td', '6c', '3s'], yourHand: ['Ah', 'Qd'], opponentHand: ['Kd', '9c'] },
    
    // Need to improve
    { category: "Two Pair Draw", board: ['Kh', 'Jd', '7c', '3s'], yourHand: ['Kd', 'Qh'], opponentHand: ['Kc', 'As'] },
    { category: "Trips Draw", board: ['Qh', 'Td', '6c', '2s'], yourHand: ['8h', '8d'], opponentHand: ['Qd', 'Jc'] },
    
    // Vs strong hands
    { category: "vs Trips", board: ['Kh', 'Jd', 'Jc', '5s'], yourHand: ['Ah', 'Kd'], opponentHand: ['Jh', '9c'] },
    { category: "vs Two Pair", board: ['Kh', 'Qd', '7c', '3s'], yourHand: ['Ah', 'Jd'], opponentHand: ['Kd', 'Qc'] },
    
    // Tricky scenarios
    { category: "Blocker", board: ['Th', '9d', '3c', '2s'], yourHand: ['8h', '7c'], opponentHand: ['Jc', 'Jh'] },
    { category: "vs Set", board: ['Qh', 'Td', '5c', '5s'], yourHand: ['Th', 'Ts'], opponentHand: ['5h', '5d'] },
    
    // More variety
    { category: "Straight Draw", board: ['9h', '8d', '4c', '2s'], yourHand: ['7h', '6c'], opponentHand: ['9d', 'Kc'] },
    { category: "Flush Draw", board: ['Ah', 'Jh', '6h', '2c'], yourHand: ['Kh', 'Qd'], opponentHand: ['Ad', 'Tc'] },
    { category: "Pair Draw", board: ['Qh', '9d', '5c', '2s'], yourHand: ['Kh', 'Jd'], opponentHand: ['Qd', '8c'] },
    { category: "vs Overpair", board: ['Th', '7d', '4c', '2s'], yourHand: ['9h', '9d'], opponentHand: ['Jh', 'Jc'] }
];

// DOM elements for outs mode
let outsBoardEl, yourHandEl, opponentHandEl, yourHandDescEl, opponentHandDescEl;
let outsOptionsEl, outsResultEl, outsResultMessageEl, outsExplanationEl, nextOutsBtn;
let outsStreakEl, outsCorrectEl, outsTotalEl, scenarioTextEl;
let outsGameEnded = false;
let outsOptions = [];

// Initialize outs mode
function initOutsMode() {
    outsBoardEl = document.getElementById('outs-board-cards');
    yourHandEl = document.getElementById('your-hand-cards');
    opponentHandEl = document.getElementById('opponent-hand-cards');
    yourHandDescEl = document.getElementById('your-hand-desc');
    opponentHandDescEl = document.getElementById('opponent-hand-desc');
    outsOptionsEl = document.getElementById('outs-options');
    outsResultEl = document.getElementById('outs-result');
    outsResultMessageEl = document.getElementById('outs-result-message');
    outsExplanationEl = document.getElementById('outs-explanation');
    nextOutsBtn = document.getElementById('next-outs-btn');
    outsStreakEl = document.getElementById('outs-streak');
    outsCorrectEl = document.getElementById('outs-correct');
    outsTotalEl = document.getElementById('outs-total');
    scenarioTextEl = document.getElementById('scenario-text');
    
    nextOutsBtn.addEventListener('click', newOutsRound);
}

// Calculate actual outs by simulating every possible river card
function calculateOuts(board, yourCards, opponentCards) {
    // Get remaining deck
    const usedCards = [...board, ...yourCards, ...opponentCards];
    const deck = createDeck();
    const remainingDeck = removeCards(deck, usedCards);
    
    // Current hand evaluations
    const yourCurrentHand = evaluateHand(board, yourCards);
    const oppCurrentHand = evaluateHand(board, opponentCards);
    const currentComparison = compareHands(yourCurrentHand, oppCurrentHand);
    
    // If we're currently ahead, no outs needed to win
    if (currentComparison > 0) {
        return { outs: 0, outCards: [], status: 'ahead', hasChopOuts: false };
    }
    
    // If currently tied, this is a tie scenario
    if (currentComparison === 0) {
        return { outs: -1, outCards: [], status: 'tied', hasChopOuts: true };
    }
    
    // We're behind - count cards that make us win
    let outs = 0;
    const outCards = [];
    let hasChopOuts = false;
    
    for (const riverCard of remainingDeck) {
        const newBoard = [...board, riverCard];
        const yourNewHand = evaluateHand(newBoard, yourCards);
        const oppNewHand = evaluateHand(newBoard, opponentCards);
        
        const comparison = compareHands(yourNewHand, oppNewHand);
        
        // Count only wins, not ties
        if (comparison > 0) {
            outs++;
            outCards.push(riverCard);
        } else if (comparison === 0) {
            // This river card would result in a chop
            hasChopOuts = true;
        }
    }
    
    return { outs, outCards, status: 'behind', hasChopOuts };
}


// Check if scenario is valid (not tied, player is behind, no chop outs)
function isValidScenario(board, yourCards, opponentCards) {
    const result = calculateOuts(board, yourCards, opponentCards);
    
    // Skip if currently tied
    if (result.status === 'tied') return false;
    
    // Skip if already ahead (0 outs needed)
    if (result.status === 'ahead') return false;
    
    // Skip if any river card could result in a chop
    if (result.hasChopOuts) return false;
    
    return true;
}

// Generate plausible wrong answers for outs (like Combo Counting style)
function generateOutsOptions(correctOuts, remainingCards) {
    const options = [];
    
    // Add correct answer
    options.push({ count: correctOuts, isCorrect: true });
    
    // Generate wrong answers based on the correct count range
    if (correctOuts <= 2) {
        // Very few outs
        options.push({ count: correctOuts + 2, isCorrect: false });
        options.push({ count: correctOuts + 5, isCorrect: false });
        options.push({ count: correctOuts + 8, isCorrect: false });
    } else if (correctOuts <= 6) {
        // Few outs (gutshot range)
        options.push({ count: Math.max(1, correctOuts - 2), isCorrect: false });
        options.push({ count: correctOuts + 3, isCorrect: false });
        options.push({ count: correctOuts + 6, isCorrect: false });
    } else if (correctOuts <= 10) {
        // Medium outs (open-ender range)
        options.push({ count: Math.max(1, correctOuts - 4), isCorrect: false });
        options.push({ count: correctOuts + 3, isCorrect: false });
        options.push({ count: correctOuts + 6, isCorrect: false });
    } else if (correctOuts <= 15) {
        // Many outs (flush draw + range)
        options.push({ count: Math.max(1, correctOuts - 5), isCorrect: false });
        options.push({ count: Math.max(1, correctOuts - 2), isCorrect: false });
        options.push({ count: correctOuts + 4, isCorrect: false });
    } else {
        // Lots of outs (combo draw)
        options.push({ count: Math.max(1, correctOuts - 6), isCorrect: false });
        options.push({ count: Math.max(1, correctOuts - 3), isCorrect: false });
        options.push({ count: Math.min(remainingCards, correctOuts + 4), isCorrect: false });
    }
    
    // Ensure no duplicates
    const seen = new Set();
    const uniqueOptions = [];
    for (const opt of options) {
        if (!seen.has(opt.count)) {
            seen.add(opt.count);
            uniqueOptions.push(opt);
        }
    }
    
    // Fill in if duplicates removed
    while (uniqueOptions.length < 4) {
        const newCount = Math.max(0, correctOuts + Math.floor(Math.random() * 20) - 10);
        if (!seen.has(newCount) && newCount >= 0) {
            seen.add(newCount);
            uniqueOptions.push({ count: newCount, isCorrect: false });
        }
    }
    
    // Shuffle options
    shuffle(uniqueOptions);
    return uniqueOptions;
}

// Start new outs round
function newOutsRound() {
    // Reset UI
    outsGameEnded = false;
    outsResultEl.classList.add('hidden');
    outsExplanationEl.innerHTML = '';
    
    // Try to find a valid scenario
    let attempts = 0;
    let validScenario = null;
    
    while (attempts < 50 && !validScenario) {
        // 70% chance to use a template, 30% random
        if (Math.random() < 0.7 && SCENARIO_TEMPLATES.length > 0) {
            const template = SCENARIO_TEMPLATES[Math.floor(Math.random() * SCENARIO_TEMPLATES.length)];
            const board = template.board.map(parseCard);
            const yourCards = template.yourHand.map(parseCard);
            const oppCards = template.opponentHand.map(parseCard);
            
            if (isValidScenario(board, yourCards, oppCards)) {
                validScenario = {
                    category: template.category,
                    board: board,
                    yourHand: yourCards,
                    opponentHand: oppCards
                };
            }
        } else {
            // Generate random scenario
            const deck = shuffle(createDeck());
            const board = deal(deck, 4);
            const yourCards = deal(deck, 2);
            const oppCards = deal(deck, 2);
            
            if (isValidScenario(board, yourCards, oppCards)) {
                validScenario = {
                    category: "Random",
                    board: board,
                    yourHand: yourCards,
                    opponentHand: oppCards
                };
            }
        }
        attempts++;
    }
    
    // Fallback: just use any scenario
    if (!validScenario) {
        const deck = shuffle(createDeck());
        validScenario = {
            category: "Practice",
            board: deal(deck, 4),
            yourHand: deal(deck, 2),
            opponentHand: deal(deck, 2)
        };
    }
    
    currentOutsScenario = validScenario;
    outsBoard = validScenario.board;
    yourHand = validScenario.yourHand;
    opponentHand = validScenario.opponentHand;
    
    // Calculate the correct outs
    const outsResult = calculateOuts(outsBoard, yourHand, opponentHand);
    currentOutsScenario.correctOuts = outsResult.outs;
    currentOutsScenario.outCards = outsResult.outCards;
    currentOutsScenario.status = outsResult.status;
    
    // Calculate remaining cards for percentage display
    const usedCards = [...outsBoard, ...yourHand, ...opponentHand];
    const remainingCards = 52 - usedCards.length;
    currentOutsScenario.remainingCards = remainingCards;
    
    // Generate multiple-choice options
    outsOptions = generateOutsOptions(outsResult.outs, remainingCards);
    
    // Render
    renderOutsBoard();
    renderOutsHands();
    renderOutsOptions();
    
    // Update scenario text
    scenarioTextEl.innerHTML = pt('outs.howManyOf', remainingCards);
}

// Render the turn board
function renderOutsBoard() {
    outsBoardEl.innerHTML = '';
    for (const card of outsBoard) {
        outsBoardEl.appendChild(createCardElement(card));
    }
}

// Render both hands
function renderOutsHands() {
    yourHandEl.innerHTML = '';
    for (const card of yourHand) {
        yourHandEl.appendChild(createCardElement(card));
    }
    
    opponentHandEl.innerHTML = '';
    for (const card of opponentHand) {
        opponentHandEl.appendChild(createCardElement(card));
    }
    
    const yourEval = evaluateHand(outsBoard, yourHand);
    const oppEval = evaluateHand(outsBoard, opponentHand);
    yourHandDescEl.textContent = getHandDescription(yourEval);
    opponentHandDescEl.textContent = getHandDescription(oppEval);
}

// Render multiple-choice option buttons (matching Combo Counting style)
function renderOutsOptions() {
    outsOptionsEl.innerHTML = '';
    
    for (const opt of outsOptions) {
        const btn = document.createElement('button');
        btn.className = 'outs-option';
        btn.dataset.count = opt.count;
        btn.dataset.correct = opt.isCorrect;
        
        const pct = ((opt.count / currentOutsScenario.remainingCards) * 100).toFixed(1);
        btn.innerHTML = `<span class="outs-count">${opt.count}</span><span class="outs-pct">(${pct}%)</span>`;
        
        btn.addEventListener('click', () => selectOutsOption(opt, btn));
        outsOptionsEl.appendChild(btn);
    }
}

// Handle option selection (matching Combo Counting behavior)
function selectOutsOption(option, element) {
    if (outsGameEnded) return;
    
    outsGameEnded = true;
    outsTotalCount++;
    
    // Disable all buttons
    const buttons = outsOptionsEl.querySelectorAll('.outs-option');
    buttons.forEach(btn => btn.disabled = true);
    
    // Mark selection
    element.classList.add('selected');
    
    // Show correct answer
    buttons.forEach(btn => {
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        }
    });
    
    const correctOuts = currentOutsScenario.correctOuts;
    
    if (option.isCorrect) {
        outsCorrectCount++;
        outsStreak++;
        outsResultMessageEl.textContent = pt('outs.correct');
        outsResultEl.className = 'result perfect';
    } else {
        outsStreak = 0;
        element.classList.add('wrong');
        outsResultMessageEl.textContent = pt('outs.answer', correctOuts);
        outsResultEl.className = 'result failed';
    }
    
    // Show explanation with out cards (matching Combo Counting explanation style)
    displayOutCards();
    
    // Update stats
    updateOutsStats();
    outsResultEl.classList.remove('hidden');
}

// Display out cards explanation (styled like Combo Counting)
function displayOutCards() {
    const outCards = currentOutsScenario.outCards;
    const remaining = currentOutsScenario.remainingCards;
    const pct = ((outCards.length / remaining) * 100).toFixed(1);
    
    let html = `<div class="outs-explanation-text">`;
    html += pt('outs.explanationText', remaining, outCards.length, pct);
    html += `</div>`;
    
    if (outCards.length === 0) {
        html += `<div class="outs-no-outs">${pt('outs.noOuts')}</div>`;
    } else {
        // Sort cards by rank for cleaner display
        const sortedCards = sortByValue([...outCards]);
        
        // Group out cards by what draw they complete
        html += `<div class="outs-cards-list">`;
        html += `<div class="outs-cards-header">${pt('outs.outCards')}</div>`;
        html += `<div class="outs-cards-grid">`;
        for (const card of sortedCards) {
            html += `<span class="outs-card-combo"><span class="${card.suit}">${card.display}${card.symbol}</span></span>`;
        }
        html += `</div></div>`;
    }
    
    outsExplanationEl.innerHTML = html;
}

// Update outs stats display
function updateOutsStats() {
    outsStreakEl.textContent = outsStreak;
    outsCorrectEl.textContent = outsCorrectCount;
    outsTotalEl.textContent = outsTotalCount;
}
