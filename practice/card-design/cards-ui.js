/**
 * ============================================================
 *  Four-Color Poker Card — UI Utilities
 *  Drop this file (along with cards.css) into any project.
 *
 *  Usage:
 *    // From a card object { rank, suit, display, symbol }
 *    const el = createCardElement(card);
 *    container.appendChild(el);
 *
 *    // Or build directly from a shorthand string like "Ah", "Ts", "2d"
 *    const el = cardElementFromString("Kh");
 *    container.appendChild(el);
 * ============================================================
 */

// ── Constants ────────────────────────────────────────────────

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];

const SUIT_SYMBOLS = {
    hearts:   '♥',
    diamonds: '♦',
    clubs:    '♣',
    spades:   '♠'
};

const RANKS = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];

const RANK_VALUES = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

// Display label for each rank (extend here if you want "10" instead of "T")
const RANK_DISPLAY = {
    '2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
    'T':'T','J':'J','Q':'Q','K':'K','A':'A'
};

// ── Card object factory ──────────────────────────────────────

/**
 * Create a card data object.
 * @param {string} rank  - One of RANKS ('2'–'A')
 * @param {string} suit  - One of SUITS ('hearts','diamonds','clubs','spades')
 * @returns {{ rank, suit, value, display, symbol }}
 */
function createCard(rank, suit) {
    return {
        rank,
        suit,
        value:   RANK_VALUES[rank],
        display: RANK_DISPLAY[rank],
        symbol:  SUIT_SYMBOLS[suit]
    };
}

/**
 * Parse a two-character shorthand string into a card object.
 * @param {string} str  - e.g. "Ah", "Ts", "2d", "Kc"
 * @returns {object} card
 */
function parseCard(str) {
    const rank = str[0].toUpperCase();
    const suitChar = str[1].toLowerCase();
    const suitMap = { h: 'hearts', d: 'diamonds', c: 'clubs', s: 'spades' };
    return createCard(rank, suitMap[suitChar]);
}

/**
 * Serialize a card back to its two-character shorthand.
 * @param {object} card
 * @returns {string}  e.g. "Ah"
 */
function cardToString(card) {
    return card.rank + card.suit[0];
}

// ── DOM helpers ──────────────────────────────────────────────

/**
 * Build a DOM element for a card object.
 * Requires cards.css to be loaded.
 *
 * @param {object} card  - card object from createCard() / parseCard()
 * @returns {HTMLDivElement}
 */
function createCardElement(card) {
    const el = document.createElement('div');
    el.className = `card ${card.suit}`;
    el.innerHTML = `
        <span class="card-corner">${card.symbol}</span>
        <span class="rank">${card.display}</span>
    `;
    return el;
}

/**
 * Convenience wrapper — build a card element straight from a shorthand string.
 * @param {string} str  - e.g. "Ah"
 * @returns {HTMLDivElement}
 */
function cardElementFromString(str) {
    return createCardElement(parseCard(str));
}

/**
 * Render an array of card objects into a container element.
 * Clears the container first.
 *
 * @param {HTMLElement} container
 * @param {object[]}    cards
 */
function renderCards(container, cards) {
    container.innerHTML = '';
    cards.forEach(card => container.appendChild(createCardElement(card)));
}

// ── Deck helpers ─────────────────────────────────────────────

/** Create a full 52-card deck. */
function createDeck() {
    const deck = [];
    for (const suit of SUITS)
        for (const rank of RANKS)
            deck.push(createCard(rank, suit));
    return deck;
}

/** Shuffle an array in place (Fisher-Yates). Returns the array. */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/** Sort cards high-to-low by rank value. Returns a new array. */
function sortByValue(cards) {
    return [...cards].sort((a, b) => b.value - a.value);
}
