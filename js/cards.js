/* ============================================
   POKER TEACHER — Card Rendering Utilities
   ============================================ */

const SUITS = ['♠', '♥', '♦', '♣'];
const SUIT_NAMES = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RED_SUITS = ['♥', '♦'];

/**
 * Build a card DOM element.
 * @param {string} rank  - 'A','2'...'K'
 * @param {string} suit  - '♠','♥','♦','♣'
 * @param {string} size  - 'xs','sm','md','lg'  (default 'md')
 * @param {boolean} back - show face-down card
 */
function makeCard(rank, suit, size = 'md', back = false) {
  const card = document.createElement('div');
  const isRed = RED_SUITS.includes(suit);
  card.className = `card size-${size}${back ? ' back' : ''} ${isRed ? 'red' : 'black'}`;

  if (back) return card;

  card.innerHTML = `
    <div class="card-corner top-left">
      <span class="card-rank">${rank}</span>
      <span class="card-suit-small">${suit}</span>
    </div>
    <div class="card-center">${suit}</div>
    <div class="card-corner bottom-right">
      <span class="card-rank">${rank}</span>
      <span class="card-suit-small">${suit}</span>
    </div>
  `;
  return card;
}

/**
 * Build a card from a shorthand string like 'As', 'Kh', '10d', '2c'
 * Suit codes: s=spades, h=hearts, d=diamonds, c=clubs
 */
function makeCardFromCode(code, size = 'md') {
  if (code === 'back') return makeCard('', '', size, true);
  const suitMap = { s: '♠', h: '♥', d: '♦', c: '♣' };
  const suit = suitMap[code[code.length - 1].toLowerCase()];
  const rank = code.slice(0, -1).toUpperCase();
  return makeCard(rank, suit, size);
}

/**
 * Render a row of cards from an array of codes into a container element.
 * @param {HTMLElement} container
 * @param {string[]} codes  - e.g. ['As','Kh','back','back']
 * @param {string} size
 * @param {boolean} animate - add deal animation
 */
function renderCards(container, codes, size = 'md', animate = false) {
  container.innerHTML = '';
  codes.forEach((code, i) => {
    const card = makeCardFromCode(code, size);
    if (animate) {
      card.style.animationDelay = `${i * 80}ms`;
      card.classList.add('card-deal-in');
    }
    container.appendChild(card);
  });
}

/**
 * Build the full deck mini-view for the explorer.
 * Returns a fragment of small cards.
 */
function buildMiniDeck(filterSuit = null) {
  const frag = document.createDocumentFragment();
  const suitSymbols = filterSuit ? [filterSuit] : SUITS;
  suitSymbols.forEach(suit => {
    RANKS.forEach(rank => {
      const card = makeCard(rank, suit, 'xs');
      frag.appendChild(card);
    });
  });
  return frag;
}

/**
 * Shuffle an array (Fisher-Yates)
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a full deck as code strings e.g. ['As','Ah','Ad','Ac','2s',...]
 */
function buildDeck() {
  const suitCodes = ['s', 'h', 'd', 'c'];
  const deck = [];
  RANKS.forEach(r => suitCodes.forEach(s => deck.push(r + s)));
  return deck;
}

/**
 * Deal N cards from a shuffled deck (returns [dealt, remaining])
 */
function dealCards(deck, n) {
  return [deck.slice(0, n), deck.slice(n)];
}
