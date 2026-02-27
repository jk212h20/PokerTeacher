/* ============================================
   MODULE 1: THE DECK
   ============================================ */

const MODULE_DECK = {
  id: 'deck',
  labelKey: 'module.deck',
  lessons: [

    {
      id: 'deck-intro',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? '¿Qué hay en una baraja?' : "What's in a Deck?"}</h2>
          <div class="lesson-body">
            ${es
              ? `Una baraja estándar de poker tiene <strong>52 cartas</strong>. Sin comodines, sin cartas extra — solo 52.`
              : `A standard poker deck has <strong>52 cards</strong>. No jokers, no extras — just 52.`
            }
          </div>
          <div class="suits-grid">
            <div class="suit-card">
              <div class="suit-symbol-big" style="color:#1a1a1a">♠</div>
              <div class="suit-name">${es ? 'Picas' : 'Spades'}</div>
            </div>
            <div class="suit-card">
              <div class="suit-symbol-big" style="color:#d32f2f">♥</div>
              <div class="suit-name">${es ? 'Corazones' : 'Hearts'}</div>
            </div>
            <div class="suit-card">
              <div class="suit-symbol-big" style="color:#d32f2f">♦</div>
              <div class="suit-name">${es ? 'Diamantes' : 'Diamonds'}</div>
            </div>
            <div class="suit-card">
              <div class="suit-symbol-big" style="color:#1a1a1a">♣</div>
              <div class="suit-name">${es ? 'Tréboles' : 'Clubs'}</div>
            </div>
          </div>
          <div class="lesson-body">
            ${es
              ? `<strong>4 palos</strong> × <strong>13 valores</strong> = 52 cartas.<br><br>
                 Los palos son solo para identificar las cartas — <strong>ningún palo es mejor que otro</strong> en el poker.`
              : `<strong>4 suits</strong> × <strong>13 ranks</strong> = 52 cards.<br><br>
                 Suits are just for identification — <strong>no suit outranks another</strong> in poker.`
            }
          </div>
          <div class="pro-tip">
            ${es
              ? 'En el poker, el 10 de picas y el 10 de corazones valen exactamente lo mismo.'
              : 'In poker, the 10 of spades and the 10 of hearts are worth exactly the same.'}
          </div>
        `;
      }
    },

    {
      id: 'deck-ranks',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Los 13 Valores' : 'The 13 Ranks'}</h2>
          <div class="lesson-body">
            ${es
              ? `Cada palo tiene 13 valores. De menor a mayor:`
              : `Each suit has 13 ranks. From lowest to highest:`
            }
          </div>
          <div class="card-row" id="rank-demo-row"></div>
          <div class="lesson-body">
            ${es
              ? `Las <strong>figuras</strong> — Jota (J), Reina (Q) y Rey (K) — valen 10 en algunos juegos, pero en poker simplemente son valores altos.<br><br>
                 El <strong>As (A)</strong> es el más especial.`
              : `The <strong>face cards</strong> — Jack (J), Queen (Q), King (K) — are worth 10 in some games, but in poker they're just high ranks.<br><br>
                 The <strong>Ace (A)</strong> is the most special.`
            }
          </div>
        `;
      },
      afterRender() {
        const row = document.getElementById('rank-demo-row');
        if (!row) return;
        const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        ranks.forEach((r, i) => {
          const card = makeCard(r, '♠', 'xs');
          card.style.animationDelay = `${i * 40}ms`;
          card.classList.add('card-deal-in');
          row.appendChild(card);
        });
      }
    },

    {
      id: 'deck-ace',
      quizId: 'deck-ace',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'El As: La Carta Más Especial' : 'The Ace: Most Versatile Card'}</h2>
          <div class="lesson-body">
            ${es
              ? `El As es la carta más alta del poker. Pero también tiene un superpoder:`
              : `The Ace is the highest card in poker. But it also has a superpower:`
            }
          </div>
          <div class="lesson-body">
            ${es
              ? `<strong>El As puede ser ALTO o BAJO en una escalera.</strong>`
              : `<strong>The Ace can go HIGH or LOW in a straight.</strong>`
            }
          </div>
          <div class="section-divider">${es ? 'Escalera más ALTA' : 'HIGHEST Straight'}</div>
          <div class="card-row">
            ${['As','Ks','Qs','Js','10s'].map(c => {
              const suitMap = {s:'♠',h:'♥',d:'♦',c:'♣'};
              const suit = suitMap[c[c.length-1]];
              const rank = c.slice(0,-1).toUpperCase();
              const isRed = ['♥','♦'].includes(suit);
              return `<div class="card size-md black">
                <div class="card-corner top-left"><span class="card-rank">${rank}</span><span class="card-suit-small">${suit}</span></div>
                <div class="card-center">${suit}</div>
                <div class="card-corner bottom-right"><span class="card-rank">${rank}</span><span class="card-suit-small">${suit}</span></div>
              </div>`;
            }).join('')}
          </div>
          <div class="section-divider">${es ? 'Escalera más BAJA' : 'LOWEST Straight'}</div>
          <div class="card-row">
            ${[['A','♠'],['2','♥'],['3','♦'],['4','♣'],['5','♠']].map(([rank, suit]) => {
              const isRed = ['♥','♦'].includes(suit);
              return `<div class="card size-md ${isRed?'red':'black'}">
                <div class="card-corner top-left"><span class="card-rank">${rank}</span><span class="card-suit-small">${suit}</span></div>
                <div class="card-center">${suit}</div>
                <div class="card-corner bottom-right"><span class="card-rank">${rank}</span><span class="card-suit-small">${suit}</span></div>
              </div>`;
            }).join('')}
          </div>
          <div class="pro-tip dealer">
            ${es
              ? '¡El As jugando bajo (A-2-3-4-5) se llama "rueda" o "escalera de acero". Es la escalera más baja posible.'
              : 'Ace playing low (A-2-3-4-5) is called a "wheel." It\'s the lowest possible straight.'}
          </div>
        `;
      }
    },

    {
      id: 'deck-explorer',
      quizId: 'deck-suits',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Explora la Baraja' : 'Explore the Deck'}</h2>
          <div class="lesson-body">
            ${es
              ? `Toca un palo para ver solo sus 13 cartas. Toca "Todos" para ver las 52.`
              : `Tap a suit to see just its 13 cards. Tap "All" to see all 52.`
            }
          </div>
          <div class="card-explorer">
            <div class="explorer-controls">
              <button class="suit-filter-btn active" data-suit="all">${es ? 'Todos (52)' : 'All (52)'}</button>
              <button class="suit-filter-btn" data-suit="♠">♠ ${es ? 'Picas' : 'Spades'}</button>
              <button class="suit-filter-btn" data-suit="♥">♥ ${es ? 'Corazones' : 'Hearts'}</button>
              <button class="suit-filter-btn" data-suit="♦">♦ ${es ? 'Diamantes' : 'Diamonds'}</button>
              <button class="suit-filter-btn" data-suit="♣">♣ ${es ? 'Tréboles' : 'Clubs'}</button>
            </div>
            <div class="mini-deck" id="mini-deck-area"></div>
          </div>
          <div class="pro-tip">
            ${es
              ? '¿Ves algo interesante? Cada palo tiene exactamente los mismos valores: A, 2, 3... hasta K.'
              : 'Notice anything? Every suit has exactly the same ranks: A, 2, 3... all the way to K.'}
          </div>
        `;
      },
      afterRender() {
        const area = document.getElementById('mini-deck-area');
        if (!area) return;

        function showSuit(suit) {
          area.innerHTML = '';
          const frag = buildMiniDeck(suit === 'all' ? null : suit);
          area.appendChild(frag);
        }

        showSuit('all');

        document.querySelectorAll('.suit-filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.suit-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showSuit(btn.dataset.suit);
          });
        });
      }
    },

    {
      id: 'deck-total-quiz',
      quizId: 'deck-total',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? '¡Lo Tienes!' : 'You Got It!'}</h2>
          <div class="lesson-body">
            ${es
              ? `Repasemos lo que acabas de aprender sobre la baraja:`
              : `Let's recap what you just learned about the deck:`
            }
          </div>
          <div class="round-steps">
            <div class="round-step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>${es ? '52 cartas en total' : '52 cards total'}</h4>
                <p>${es ? '13 valores × 4 palos' : '13 ranks × 4 suits'}</p>
              </div>
            </div>
            <div class="round-step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>${es ? '4 palos, iguales en valor' : '4 suits, equal in value'}</h4>
                <p>${es ? '♠ ♥ ♦ ♣ — ninguno supera a otro' : '♠ ♥ ♦ ♣ — none outranks another'}</p>
              </div>
            </div>
            <div class="round-step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>${es ? 'El As es alto Y bajo' : 'Ace is high AND low'}</h4>
                <p>${es ? 'La carta más versátil de la baraja' : 'Most versatile card in the deck'}</p>
              </div>
            </div>
            <div class="round-step">
              <div class="step-num">4</div>
              <div class="step-content">
                <h4>${es ? 'Sin comodines en poker' : 'No jokers in poker'}</h4>
                <p>${es ? 'El poker estándar usa exactamente 52 cartas' : 'Standard poker uses exactly 52 cards'}</p>
              </div>
            </div>
          </div>
          <div class="pro-tip dealer">
            ${es
              ? 'Una pregunta rápida antes de continuar — ¡sin presión!'
              : 'One quick question before we move on — no pressure!'}
          </div>
        `;
      }
    }
  ]
};
