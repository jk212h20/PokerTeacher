/* ============================================
   POKER TEACHER — Animations
   ============================================ */

/**
 * Animate cards dealing into a container one by one.
 * @param {HTMLElement} container
 * @param {string[]} codes
 * @param {string} size
 * @param {number} delayMs - ms between each card
 */
function animateDeal(container, codes, size = 'md', delayMs = 120) {
  container.innerHTML = '';
  codes.forEach((code, i) => {
    const card = makeCardFromCode(code, size);
    card.style.opacity = '0';
    card.style.transform = 'scale(0.6) rotate(-8deg)';
    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    container.appendChild(card);
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1) rotate(0deg)';
    }, i * delayMs + 30);
  });
}

/**
 * Flip a face-down card to reveal it (in-place replacement).
 * @param {HTMLElement} backCard - the .card.back element
 * @param {string} code - card code to reveal
 */
function flipReveal(backCard, code) {
  const size = [...backCard.classList].find(c => c.startsWith('size-'))?.replace('size-', '') || 'md';
  backCard.style.transition = 'transform 0.2s ease';
  backCard.style.transform = 'scale(0.85)';
  setTimeout(() => {
    const revealed = makeCardFromCode(code, size);
    revealed.style.transform = 'scale(0.85)';
    revealed.style.transition = 'transform 0.2s ease';
    backCard.replaceWith(revealed);
    setTimeout(() => {
      revealed.style.transform = 'scale(1)';
    }, 20);
  }, 180);
}

/**
 * Pulse a DOM element (brief scale up/down — draws attention).
 */
function pulse(el) {
  el.style.transition = 'transform 0.15s ease';
  el.style.transform = 'scale(1.05)';
  setTimeout(() => {
    el.style.transform = 'scale(1)';
  }, 150);
}

/**
 * Fade + slide in a screen element.
 */
function fadeInScreen(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}
