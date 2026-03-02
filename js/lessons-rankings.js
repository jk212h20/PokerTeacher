/* ============================================
   MODULE 2: HAND RANKINGS
   ============================================ */

function cardHtml(rank, suit, size='md') {
  const suitClass = {'♥':'suit-hearts','♦':'suit-diamonds','♣':'suit-clubs','♠':'suit-spades'}[suit]||'suit-spades';
  return `<div class="card size-${size} ${suitClass}">
    <div class="card-corner top-left"><span class="card-rank">${rank}</span><span class="card-suit-small">${suit}</span></div>
    <div class="card-center">${suit}</div>
    <div class="card-corner bottom-right"><span class="card-rank">${rank}</span><span class="card-suit-small">${suit}</span></div>
  </div>`;
}

function handRow(cards, size='sm') {
  return `<div class="card-row">${cards.map(([r,s])=>cardHtml(r,s,size)).join('')}</div>`;
}

const MODULE_RANKINGS = {
  id: 'rankings',
  labelKey: 'module.rankings',
  lessons: [

    {
      id: 'rank-intro',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Las 10 Manos del Poker' : 'The 10 Poker Hands'}</h2>
          <div class="lesson-body">
            ${es
              ? `En el poker, siempre se usa la <strong>mejor mano de 5 cartas</strong>. Hay exactamente 10 tipos de manos, de mejor a peor.`
              : `In poker, you always play the <strong>best 5-card hand</strong>. There are exactly 10 hand types, from best to worst.`
            }
          </div>
          <table class="rank-table">
            <thead><tr>
              <th>#</th>
              <th>${es ? 'Mano' : 'Hand'}</th>
              <th>${es ? 'Ejemplo' : 'Example'}</th>
            </tr></thead>
            <tbody>
              ${[
                [1, es?'Escalera Real':'Royal Flush', 'A-K-Q-J-10 suited'],
                [2, es?'Escalera de Color':'Straight Flush', '9-8-7-6-5 suited'],
                [3, es?'Póker (4 iguales)':'Four of a Kind', 'K-K-K-K-x'],
                [4, es?'Full House':'Full House', 'Q-Q-Q-J-J'],
                [5, es?'Color (Flush)':'Flush', '5 cards same suit'],
                [6, es?'Escalera (Straight)':'Straight', '8-7-6-5-4'],
                [7, es?'Trío (3 iguales)':'Three of a Kind', '7-7-7-x-x'],
                [8, es?'Dos Pares':'Two Pair', 'A-A-K-K-x'],
                [9, es?'Un Par':'One Pair', 'J-J-x-x-x'],
                [10, es?'Carta Alta':'High Card', 'A-K-Q-J-9'],
              ].map(([n,name,ex])=>`<tr>
                <td class="rank-num">${n}</td>
                <td>${name}</td>
                <td style="color:var(--text-dim);font-size:12px">${ex}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          <div class="pro-tip">
            ${es
              ? 'No memorices la lista todavía — la siguiente sección muestra cada mano con cartas reales.'
              : "Don't memorize the list yet — the next section shows every hand with real cards."}
          </div>
        `;
      }
    },

    {
      id: 'rank-top3',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Las Mejores 3 Manos' : 'The Top 3 Hands'}</h2>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">1</span>
              ${es ? 'Escalera Real — ¡La Mejor!' : 'Royal Flush — The Best!'}
            </div>
            ${handRow([['A','♠'],['K','♠'],['Q','♠'],['J','♠'],['10','♠']],'md')}
            <div class="hand-desc">
              ${es
                ? 'A-K-Q-J-10 del mismo palo. Literalmente imposible perder. Ocurre una vez cada ~650,000 manos.'
                : 'A-K-Q-J-10 of the same suit. Literally cannot lose. Happens once every ~650,000 hands.'}
            </div>
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">2</span>
              ${es ? 'Escalera de Color' : 'Straight Flush'}
            </div>
            ${handRow([['9','♥'],['8','♥'],['7','♥'],['6','♥'],['5','♥']],'md')}
            <div class="hand-desc">
              ${es
                ? '5 cartas consecutivas del mismo palo. Solo pierde ante una Escalera Real superior.'
                : '5 consecutive cards of the same suit. Only loses to a higher Straight Flush.'}
            </div>
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">3</span>
              ${es ? 'Póker (Cuatro Iguales)' : 'Four of a Kind'}
            </div>
            ${handRow([['K','♠'],['K','♥'],['K','♦'],['K','♣'],['3','♠']],'md')}
            <div class="hand-desc">
              ${es
                ? 'Los cuatro palos del mismo valor. Casi siempre gana — a menos que alguien tenga una Escalera de Color.'
                : 'All four suits of the same rank. Almost always wins — unless someone has a Straight Flush.'}
            </div>
          </div>

          <div class="pro-tip warning">
            ${es
              ? 'Si consigues cualquiera de estas tres manos en tu primer torneo, ¡apuesta fuerte! Son extremadamente raras.'
              : 'If you hit any of these three hands in your first tournament — bet big! They\'re extremely rare.'}
          </div>
        `;
      }
    },

    {
      id: 'rank-middle3',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Full, Color y Escalera' : 'Full House, Flush & Straight'}</h2>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">4</span>
              ${es ? 'Full House' : 'Full House'}
            </div>
            ${handRow([['Q','♠'],['Q','♥'],['Q','♦'],['J','♣'],['J','♠']],'md')}
            <div class="hand-desc">
              ${es
                ? 'Un trío MÁS una pareja. Muy fuerte. En empate gana el trío más alto.'
                : 'Three of a kind PLUS a pair. Very strong. Ties broken by the higher three-of-a-kind.'}
            </div>
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">5</span>
              ${es ? 'Color (Flush)' : 'Flush'}
            </div>
            ${handRow([['A','♦'],['J','♦'],['8','♦'],['5','♦'],['2','♦']],'md')}
            <div class="hand-desc">
              ${es
                ? '5 cartas del mismo palo (no consecutivas). En empate gana la carta más alta.'
                : '5 cards of the same suit (not in sequence). Ties broken by highest card.'}
            </div>
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">6</span>
              ${es ? 'Escalera (Straight)' : 'Straight'}
            </div>
            ${handRow([['8','♠'],['7','♥'],['6','♦'],['5','♣'],['4','♠']],'md')}
            <div class="hand-desc">
              ${es
                ? '5 cartas consecutivas de distintos palos. En empate gana la escalera más alta.'
                : '5 consecutive cards of mixed suits. Ties broken by the highest straight.'}
            </div>
          </div>

          <div class="pro-tip">
            ${es
              ? '<strong>Truco:</strong> El Color vence a la Escalera. 5 del mismo palo es más difícil que 5 consecutivas.'
              : '<strong>Trick:</strong> Flush beats Straight. Getting 5 of the same suit is harder than 5 in a row.'}
          </div>
        `;
      },
      quizId: 'rank-flush-vs-straight'
    },

    {
      id: 'rank-bottom4',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Las Manos Más Comunes' : 'The Most Common Hands'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Estas son las manos que verás en la mayoría de las rondas:'
              : "These are the hands you'll see in most rounds:"}
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">7</span>
              ${es ? 'Trío (Tres Iguales)' : 'Three of a Kind'}
            </div>
            ${handRow([['7','♠'],['7','♥'],['7','♦'],['K','♣'],['3','♠']],'sm')}
            <div class="hand-desc">${es ? 'Tres cartas del mismo valor.' : 'Three cards of the same rank.'}</div>
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">8</span>
              ${es ? 'Dos Pares' : 'Two Pair'}
            </div>
            ${handRow([['A','♠'],['A','♥'],['K','♦'],['K','♣'],['Q','♠']],'sm')}
            <div class="hand-desc">${es ? 'Dos pares diferentes.' : 'Two different pairs.'}</div>
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">9</span>
              ${es ? 'Un Par' : 'One Pair'}
            </div>
            ${handRow([['J','♠'],['J','♥'],['9','♦'],['6','♣'],['2','♠']],'sm')}
            <div class="hand-desc">${es ? 'Dos cartas del mismo valor.' : 'Two cards of the same rank.'}</div>
          </div>

          <div class="hand-example">
            <div class="hand-example-label">
              <span class="hand-rank-number">10</span>
              ${es ? 'Carta Alta' : 'High Card'}
            </div>
            ${handRow([['A','♠'],['K','♥'],['Q','♦'],['J','♣'],['9','♠']],'sm')}
            <div class="hand-desc">
              ${es
                ? 'Sin combinación. Gana la carta más alta. ¡Esta mano pierde ante todo lo demás!'
                : 'No combination. Highest card plays. This hand loses to everything else!'}
            </div>
          </div>

          <div class="pro-tip warning">
            ${es
              ? '¡Sorpresa para principiantes! El Trío vence a los Dos Pares. No importa que tengas Ases y Reyes — tres 2s los baten.'
              : 'Beginner surprise: Three of a Kind beats Two Pair. It doesn\'t matter if your pairs are Aces & Kings — three 2s beats them.'}
          </div>
        `;
      },
      quizId: 'rank-two-pair'
    },

    {
      id: 'rank-kicker',
      quizId: 'rank-kicker',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'El Kicker: El Desempate' : 'The Kicker: Breaking Ties'}</h2>
          <div class="lesson-body">
            ${es
              ? `¿Qué pasa cuando dos jugadores tienen la misma mano?<br><br>
                 Imagina: ambos tienen <strong>una pareja de Reyes</strong>.`
              : `What happens when two players have the same hand?<br><br>
                 Imagine: both players have <strong>a pair of Kings</strong>.`
            }
          </div>

          <div class="section-divider">${es ? 'Jugador A' : 'Player A'}</div>
          ${handRow([['K','♠'],['K','♥'],['A','♦'],['8','♣'],['3','♠']],'sm')}

          <div class="section-divider">${es ? 'Jugador B' : 'Player B'}</div>
          ${handRow([['K','♦'],['K','♣'],['Q','♠'],['8','♥'],['3','♦']],'sm')}

          <div class="lesson-body" style="margin-top:16px">
            ${es
              ? `Ambos tienen pareja de Reyes. El desempate es el <strong>kicker</strong> — la carta más alta que no forma parte del par.<br><br>
                 El Jugador A tiene <strong>As kicker</strong>. El Jugador B tiene <strong>Reina kicker</strong>.<br><br>
                 <strong>Gana el Jugador A.</strong>`
              : `Both have a pair of Kings. The tiebreaker is the <strong>kicker</strong> — the highest card not part of the pair.<br><br>
                 Player A has an <strong>Ace kicker</strong>. Player B has a <strong>Queen kicker</strong>.<br><br>
                 <strong>Player A wins.</strong>`
            }
          </div>
          <div class="pro-tip">
            ${es
              ? 'El kicker también importa en el trío, dos pares, etc. Siempre se comparan las 5 mejores cartas.'
              : 'Kickers matter for three-of-a-kind, two pair, etc. You always compare the best 5-card hand.'}
          </div>
        `;
      }
    },

    {
      id: 'rank-royalflush-quiz',
      quizId: 'rank-royal-flush',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? '¡Dominas las Manos!' : 'You Know the Hands!'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Repasemos el orden de mayor a menor:'
              : 'Quick recap — strongest to weakest:'}
          </div>
          <div class="terms-list">
            ${[
              ['#1', es?'Escalera Real':'Royal Flush', es?'A-K-Q-J-10 del mismo palo':'A-K-Q-J-10 suited'],
              ['#2', es?'Escalera de Color':'Straight Flush', es?'5 consecutivas del mismo palo':'5 consecutive, same suit'],
              ['#3', es?'Póker':'Four of a Kind', es?'Cuatro del mismo valor':'Four of same rank'],
              ['#4', es?'Full House':'Full House', es?'Trío + pareja':'Three + pair'],
              ['#5', es?'Color':'Flush', es?'5 del mismo palo':'5 same suit'],
              ['#6', es?'Escalera':'Straight', es?'5 consecutivas':'5 in a row'],
              ['#7', es?'Trío':'Three of a Kind', es?'Tres del mismo valor':'Three same rank'],
              ['#8', es?'Dos Pares':'Two Pair', es?'Dos parejas distintas':'Two different pairs'],
              ['#9', es?'Un Par':'One Pair', es?'Dos del mismo valor':'Two same rank'],
              ['#10', es?'Carta Alta':'High Card', es?'Sin combinación':'No combination'],
            ].map(([n,name,desc])=>`
              <div class="term-item">
                <div class="term-word">${n} ${name}</div>
                <div class="term-def">${desc}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
    }
  ]
};
