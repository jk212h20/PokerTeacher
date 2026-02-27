/* ============================================
   MODULE 6: STARTING HANDS & BOARD POSSIBILITIES
   ============================================ */

const MODULE_BOARD = {
  id: 'board',
  labelKey: 'module.board',
  lessons: [

    /* --------------------------------------------------
       LESSON 1 — board-hand-board
       Starting Hands and Board Possibilities
    -------------------------------------------------- */
    {
      id: 'board-hand-board',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Manos Iniciales y Posibilidades del Tablero' : 'Starting Hands and Board Possibilities'}</h2>
          <div class="lesson-body">
            ${es
              ? `Tus cartas iniciales determinan <strong>qué posibilidades tiene el tablero de ayudarte</strong>. La misma carta en el tablero puede ser tu salvación o completamente inútil, dependiendo de lo que tengas en la mano.`
              : `Your starting hand determines <strong>what the board can do for you</strong>. The same card on the board can save you or be totally useless — depending on what you're holding.`
            }
          </div>

          <div class="hand-board-example">
            <div class="hb-header">${es ? 'Ejemplo: La misma carta en el tablero' : 'Example: The same card on the board'}</div>
            <div class="hb-board-row">
              <div class="hb-board-label">${es ? 'Tablero' : 'Board'}</div>
              ${handRow([['J','♠'],['8','♥'],['3','♦']],'md')}
            </div>
            <div class="hb-scenarios">
              <div class="hb-scenario good">
                <div class="hb-scenario-hand">
                  <div class="hb-label">${es ? 'Tienes' : 'You hold'}</div>
                  ${handRow([['J','♥'],['9','♣']],'sm')}
                </div>
                <div class="hb-result">✅ ${es ? 'La Jota te da pareja de tope. ¡Excelente!' : 'The Jack gives you top pair. Excellent!'}</div>
              </div>
              <div class="hb-scenario danger">
                <div class="hb-scenario-hand">
                  <div class="hb-label">${es ? 'Tienes' : 'You hold'}</div>
                  ${handRow([['5','♦'],['2','♣']],'sm')}
                </div>
                <div class="hb-result">❌ ${es ? 'La Jota no hace nada por ti. No tienes pareja, no tienes draw.' : 'The Jack does nothing for you. No pair, no draw.'}</div>
              </div>
            </div>
          </div>

          <div class="lesson-body" style="margin-top:16px">
            <strong>${es ? '¿Cómo se relacionan tus cartas con el tablero?' : 'How do your cards connect to the board?'}</strong>
          </div>

          <div class="connection-grid">
            <div class="connection-item">
              <div class="connection-icon">🎯</div>
              <div class="connection-name">${es ? 'Hiciste pareja' : 'You paired'}</div>
              <div class="connection-desc">${es ? 'Una de tus cartas coincide con una del tablero' : 'One of your hole cards matches a board card'}</div>
            </div>
            <div class="connection-item">
              <div class="connection-icon">🎨</div>
              <div class="connection-name">${es ? 'Draw de color' : 'Flush draw'}</div>
              <div class="connection-desc">${es ? 'Tus 2 cartas + 2 del tablero son del mismo palo → necesitas 1 más' : 'Your 2 cards + 2 board cards same suit → need 1 more'}</div>
            </div>
            <div class="connection-item">
              <div class="connection-icon">📏</div>
              <div class="connection-name">${es ? 'Draw de escalera' : 'Straight draw'}</div>
              <div class="connection-desc">${es ? '4 cartas en secuencia entre tu mano y el tablero → necesitas 1 más' : '4 cards in sequence between your hand and board → need 1 more'}</div>
            </div>
            <div class="connection-item">
              <div class="connection-icon">🚫</div>
              <div class="connection-name">${es ? 'Sin conexión' : 'No connection'}</div>
              <div class="connection-desc">${es ? 'Tus cartas no encajan con el tablero — sin pareja, sin draw' : "Your cards don't fit the board — no pair, no draw"}</div>
            </div>
          </div>

          <div class="lesson-body" style="margin-top:16px">
            ${es
              ? `Cuando el tablero no conecta con ninguna de tus cartas, estás jugando con <strong>carta alta solamente</strong>. Cualquier oponente que haya emparejado una carta del tablero ya te gana.`
              : `When the board connects with neither of your cards, you're playing with <strong>high card only</strong>. Any opponent who paired a board card already beats you.`
            }
          </div>

          <div class="pro-tip">
            ${es
              ? 'Las manos con múltiples atributos (conectadas del mismo palo) tienen más formas de conectar con el tablero. Por eso son más valiosas — tienen más rutas hacia ganar.'
              : "Hands with multiple attributes (suited connectors) have more ways to connect with the board. That's why they're more valuable — they have more routes to winning."}
          </div>
        `;
      }
    },

    /* --------------------------------------------------
       LESSON 2 — board-read
       What Does the Board Enable? (interactive)
    -------------------------------------------------- */
    {
      id: 'board-read',
      render(lang) {
        const es = lang === 'es';

        const boards = [
          {
            cards: [['Q','♠'],['7','♠'],['3','♠']],
            flush: true,   flushWhy: es ? '3 cartas de picas. Quien tenga 2 picas tiene color.' : '3 spades. Anyone with 2 spades has a flush.',
            straight: false, straightWhy: es ? 'Q-7-3: demasiado separadas para una escalera.' : 'Q-7-3: too spread apart for a straight.',
            fullhouse: false, fullhouseWhy: es ? 'No hay par en el tablero. Sin full ni póker.' : 'No pair on the board. No full house or quads.',
          },
          {
            cards: [['7','♠'],['8','♦'],['9','♣']],
            flush: false,  flushWhy: es ? '3 palos distintos. Color imposible todavía.' : '3 different suits. Flush impossible yet.',
            straight: true, straightWhy: es ? '7-8-9: cualquier 5-6, 6-10, o 10-J completa una escalera.' : '7-8-9: any 5-6, 6-10, or 10-J completes a straight.',
            fullhouse: false, fullhouseWhy: es ? 'Sin par en el tablero. No hay full house posible todavía.' : 'No pair on the board. No full house possible yet.',
          },
          {
            cards: [['K','♠'],['K','♦'],['7','♣']],
            flush: false,  flushWhy: es ? 'Solo 2 cartas del mismo palo. Color no posible.' : 'Only 2 matching suit cards. Flush not possible.',
            straight: false, straightWhy: es ? 'K-K-7: sin secuencia conectada. Sin escalera posible.' : 'K-K-7: no connected sequence. No straight possible.',
            fullhouse: true, fullhouseWhy: es ? '¡Par de Reyes en el tablero! Quien tenga un Rey tiene trío. Quien tenga 7-7 tiene full house.' : 'Pair of Kings on the board! Anyone with a King has three of a kind. Anyone with 7-7 has a full house.',
          },
        ];

        const boardItems = boards.map((b, bi) => `
          <div class="board-scenario" id="board-scenario-${bi}">
            <div class="board-cards">${handRow(b.cards, 'md')}</div>
            <div class="board-questions">
              <button class="board-q-btn" data-board="${bi}" data-q="flush">
                ${es ? '🔴 ¿Color posible?' : '🔴 Flush possible?'}
              </button>
              <button class="board-q-btn" data-board="${bi}" data-q="straight">
                ${es ? '🔵 ¿Escalera posible?' : '🔵 Straight possible?'}
              </button>
              <button class="board-q-btn" data-board="${bi}" data-q="fullhouse">
                ${es ? '🟡 ¿Full House / Póker posible?' : '🟡 Full House / Quads possible?'}
              </button>
            </div>
            <div class="board-answer hidden" id="board-ans-${bi}-flush">
              <span class="board-ans-icon">${boards[bi].flush ? '✅' : '❌'}</span>
              <span>${boards[bi].flushWhy}</span>
            </div>
            <div class="board-answer hidden" id="board-ans-${bi}-straight">
              <span class="board-ans-icon">${boards[bi].straight ? '✅' : '❌'}</span>
              <span>${boards[bi].straightWhy}</span>
            </div>
            <div class="board-answer hidden" id="board-ans-${bi}-fullhouse">
              <span class="board-ans-icon">${boards[bi].fullhouse ? '✅' : '❌'}</span>
              <span>${boards[bi].fullhouseWhy}</span>
            </div>
          </div>
        `).join(`<div class="section-divider">${es ? 'Siguiente tablero' : 'Next board'}</div>`);

        return `
          <h2 class="lesson-title">${es ? '¿Qué Permite el Tablero?' : 'What Does the Board Enable?'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Cuando caen las cartas comunitarias, hazte tres preguntas sobre el tablero. Toca cada botón para ver la respuesta.'
              : 'When community cards come out, ask yourself three questions about the board. Tap each button to see the answer.'}
          </div>

          <div class="board-legend">
            <div class="board-legend-item">🔴 <strong>${es ? 'Color' : 'Flush'}</strong> — ${es ? '¿3+ cartas del mismo palo?' : '3+ cards of the same suit?'}</div>
            <div class="board-legend-item">🔵 <strong>${es ? 'Escalera' : 'Straight'}</strong> — ${es ? '¿3+ cartas conectadas o cercanas?' : '3+ connected or near-connected cards?'}</div>
            <div class="board-legend-item">🟡 <strong>${es ? 'Full / Póker' : 'Full House / Quads'}</strong> — ${es ? '¿Hay un par en el tablero?' : 'Is there a pair on the board?'}</div>
          </div>

          <div class="boards-container">
            ${boardItems}
          </div>

          <div class="pro-tip">
            ${es
              ? 'Antes de apostar, piensa: ¿cuántas manos te ganarían en este tablero? Cuantas más manos te superen, más cauteloso debes ser.'
              : 'Before betting, think about how many hands would beat yours on this board. The more hands that beat you, the more cautious you should be.'}
          </div>
        `;
      },
      afterRender(lang) {
        document.querySelectorAll('.board-q-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const bi = btn.dataset.board;
            const q = btn.dataset.q;
            const ans = document.getElementById('board-ans-' + bi + '-' + q);
            if (!ans) return;
            const hidden = ans.classList.contains('hidden');
            ans.classList.toggle('hidden', !hidden);
            btn.classList.toggle('active', hidden);
          });
        });
      }
    },

    /* --------------------------------------------------
       LESSON 3 — board-relative
       Your Strength Is Relative to the Board
    -------------------------------------------------- */
    {
      id: 'board-relative',
      quizId: 'starts-relative-quiz',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Tu Fuerza Es Relativa al Tablero' : 'Your Strength Is Relative to the Board'}</h2>
          <div class="lesson-body">
            ${es
              ? 'No tienes simplemente "una buena mano" — tienes una mano que es buena <em>en comparación con lo que el tablero permite</em>. El mismo par de Reyes puede ser imbatible o muy vulnerable según lo que salga.'
              : "You don't just have \"a good hand\" — you have a hand that's good <em>relative to what the board allows</em>. The same pair of Kings can be unbeatable or very vulnerable depending on what falls."}
          </div>

          <div class="scenario-block scenario-good">
            <div class="scenario-header">
              <span class="scenario-badge good">${es ? 'ESCENARIO A — Tablero Seco' : 'SCENARIO A — Dry Board'}</span>
            </div>
            <div class="scenario-cards-row">
              <div class="scenario-col">
                <div class="scenario-label">${es ? 'Tus cartas' : 'Your cards'}</div>
                ${handRow([['A','♠'],['A','♥']],'sm')}
              </div>
              <div class="scenario-col">
                <div class="scenario-label">${es ? 'Flop' : 'Flop'}</div>
                ${handRow([['2','♦'],['7','♣'],['Q','♥']],'sm')}
              </div>
            </div>
            <div class="scenario-check">
              <span>🔴 ${es ? 'Color' : 'Flush'}?</span> <span class="no">✗</span>
              <span>🔵 ${es ? 'Escalera' : 'Straight'}?</span> <span class="no">✗</span>
              <span>🟡 ${es ? 'Full/Póker' : 'Full/Quads'}?</span> <span class="no">✗</span>
            </div>
            <div class="scenario-verdict good">
              ${es
                ? '✅ El tablero no activa ninguna mano peligrosa. Tus Ases probablemente son la mano más fuerte. <strong>Apuesta con confianza.</strong>'
                : '✅ The board activates no dangerous hands. Your Aces are likely the strongest hand. <strong>Bet with confidence.</strong>'}
            </div>
          </div>

          <div class="scenario-block scenario-danger">
            <div class="scenario-header">
              <span class="scenario-badge danger">${es ? 'ESCENARIO B — Tablero Peligroso' : 'SCENARIO B — Dangerous Board'}</span>
            </div>
            <div class="scenario-cards-row">
              <div class="scenario-col">
                <div class="scenario-label">${es ? 'Tus cartas' : 'Your cards'}</div>
                ${handRow([['K','♥'],['K','♦']],'sm')}
              </div>
              <div class="scenario-col">
                <div class="scenario-label">${es ? 'Flop' : 'Flop'}</div>
                ${handRow([['A','♠'],['J','♠'],['10','♠']],'sm')}
              </div>
            </div>
            <div class="scenario-check">
              <span>🔴 ${es ? 'Color' : 'Flush'}?</span> <span class="yes">✓</span>
              <span>🔵 ${es ? 'Escalera' : 'Straight'}?</span> <span class="yes">✓</span>
              <span>🟡 ${es ? 'Full/Póker' : 'Full/Quads'}?</span> <span class="no">✗</span>
            </div>
            <div class="scenario-verdict danger">
              ${es
                ? '⚠️ Ese As puede significar que alguien ya te gana. Hay escaleras posibles, y 3 picas activan el color. Tus Reyes son mucho menos cómodos ahora. <strong>Juega con precaución.</strong>'
                : '⚠️ That Ace could mean someone already beats you. Straights are possible, and 3 spades activate flush potential. Your Kings are much less comfortable. <strong>Play cautiously.</strong>'}
            </div>
          </div>

          <div class="scenario-block scenario-good">
            <div class="scenario-header">
              <span class="scenario-badge good">${es ? 'ESCENARIO C — Pegaste en el Tablero' : 'SCENARIO C — You Hit the Board'}</span>
            </div>
            <div class="scenario-cards-row">
              <div class="scenario-col">
                <div class="scenario-label">${es ? 'Tus cartas' : 'Your cards'}</div>
                ${handRow([['8','♠'],['9','♠']],'sm')}
              </div>
              <div class="scenario-col">
                <div class="scenario-label">${es ? 'Flop' : 'Flop'}</div>
                ${handRow([['7','♠'],['6','♠'],['10','♣']],'sm')}
              </div>
            </div>
            <div class="scenario-check">
              <span>🔴 ${es ? 'Color' : 'Flush'}?</span> <span class="yes">✓</span>
              <span>🔵 ${es ? 'Escalera' : 'Straight'}?</span> <span class="yes">✓</span>
              <span>🟡 ${es ? 'Full/Póker' : 'Full/Quads'}?</span> <span class="no">✗</span>
            </div>
            <div class="scenario-verdict good">
              ${es
                ? '✅ ¡Tienes escalera (6-7-8-9-10)! Y además 4 picas — una más y tienes color. El tablero activó ambas amenazas <em>a tu favor</em>. <strong>Estás en una posición excelente.</strong>'
                : "✅ You have a straight (6-7-8-9-10)! And 4 spades — one more and you have a flush. The board activated both threats <em>in your favor</em>. <strong>You're in excellent shape.</strong>"}
            </div>
          </div>

          <div class="pro-tip">
            ${es
              ? 'La pregunta más importante en el poker: <strong>"¿Qué necesita mi oponente para ganarme?"</strong> Si el tablero facilita esa mano, tu fuerza disminuye.'
              : 'The most important question in poker: <strong>"What does my opponent need to beat me?"</strong> If the board makes that hand easy, your strength decreases.'}
          </div>
        `;
      }
    },

    /* --------------------------------------------------
       LESSON 4 — board-practice
       Practice: How Strong Are You?
    -------------------------------------------------- */
    {
      id: 'board-practice',
      quizId: 'starts-practice-quiz',
      quizId2: 'starts-practice-quiz2',
      render(lang) {
        const es = lang === 'es';

        const scenarios = [
          {
            hole: [['A','♥'],['K','♥']],
            board: [['A','♦'],['K','♣'],['2','♠']],
            answer: 'strong',
            explanation: es
              ? 'Dos pares de tope (Ases y Reyes). Tablero seco — sin color, sin escalera. Muy fuerte.'
              : 'Top two pair (Aces and Kings). Dry board — no flush, no straight. Very strong.',
          },
          {
            hole: [['9','♣'],['9','♦']],
            board: [['9','♠'],['9','♥'],['A','♣']],
            answer: 'strong',
            explanation: es
              ? '¡Cuatro 9s! El par en el tablero combinado con tu par hace póker. Extremadamente fuerte.'
              : 'Four 9s! The pair on the board combined with your pair makes quads. Extremely strong.',
          },
          {
            hole: [['Q','♣'],['J','♦']],
            board: [['K','♠'],['10','♠'],['2','♠']],
            answer: 'danger',
            explanation: es
              ? 'Parecía un draw de escalera, pero el tablero ya tiene 3 picas — cualquier oponente con 2 picas YA tiene color y te gana ahora mismo. Y tus outs de escalera (A o 9) también pueden ser de picas, lo que mejoraría el color de ellos en vez de ayudarte. Solo tienes carta alta contra manos hechas. ⚠️ Peligro real.'
              : 'Looks like a straight draw, but the board already has 3 spades — any opponent holding 2 spades ALREADY has a flush and beats you right now. Your straight outs (Ace or 9) may also be spades, improving their flush instead of helping you. You only have high card against made hands. ⚠️ Real danger.',
          },
          {
            hole: [['5','♦'],['4','♦']],
            board: [['A','♠'],['K','♣'],['J','♥']],
            answer: 'danger',
            explanation: es
              ? 'Sin pareja, sin draw de color, sin draw de escalera real. El tablero está lleno de cartas altas que no te ayudan. Cualquier oponente con un As, Rey o Jota te gana.'
              : "No pair, no flush draw, no real straight draw. The board is full of high cards that don't help you. Any opponent with an Ace, King, or Jack beats you.",
          },
        ];

        const scenarioItems = scenarios.map((s, i) => `
          <div class="practice-scenario" id="pscen-${i}">
            <div class="practice-num">${es ? 'Mano' : 'Hand'} ${i + 1}</div>
            <div class="practice-cards-area">
              <div class="practice-col">
                <div class="practice-col-label">${es ? 'Tus cartas' : 'Your cards'}</div>
                ${handRow(s.hole, 'sm')}
              </div>
              <div class="practice-col">
                <div class="practice-col-label">${es ? 'Tablero' : 'Board'}</div>
                ${handRow(s.board, 'sm')}
              </div>
            </div>
            <div class="practice-buttons" id="pbtn-${i}">
              <button class="practice-btn strong" data-scenario="${i}" data-choice="strong">💪 ${es ? 'Fuerte' : 'Strong'}</button>
              <button class="practice-btn medium" data-scenario="${i}" data-choice="medium">😐 ${es ? 'Okay' : 'Okay'}</button>
              <button class="practice-btn danger" data-scenario="${i}" data-choice="danger">⚠️ ${es ? 'Peligro' : 'Danger'}</button>
            </div>
            <div class="practice-result hidden" id="pres-${i}">
              <div class="practice-result-text" id="pres-text-${i}"></div>
              <div class="practice-explanation" id="pres-exp-${i}"></div>
            </div>
          </div>
        `).join('');

        return `
          <h2 class="lesson-title">${es ? 'Practica: ¿Qué Tan Fuerte Eres?' : 'Practice: How Strong Are You?'}</h2>
          <div class="lesson-body">
            ${es
              ? 'En cada mano, mira tus cartas y el tablero. ¿Estás en buena posición, más o menos, o en peligro? Toca tu respuesta para descubrir el veredicto.'
              : 'For each hand, look at your cards and the board. Are you in good shape, so-so, or in danger? Tap your answer to reveal the verdict.'}
          </div>

          <div class="practice-scenarios">
            ${scenarioItems}
          </div>

          <div class="pro-tip dealer">
            ${es
              ? 'En un torneo, conservar tus fichas es tan importante como ganarlas. Saber cuándo estás en peligro — y retirarte — puede mantenerte vivo mucho más tiempo.'
              : "In a tournament, preserving your chips is as important as winning them. Knowing when you're in danger — and folding — can keep you alive much longer."}
          </div>
        `;
      },
      afterRender(lang) {
        const es = lang === 'es';
        const correct = ['strong', 'strong', 'danger', 'danger'];

        document.querySelectorAll('.practice-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.scenario);
            const choice = btn.dataset.choice;
            const btns = document.querySelectorAll('#pbtn-' + idx + ' .practice-btn');
            const result = document.getElementById('pres-' + idx);
            const resultText = document.getElementById('pres-text-' + idx);
            const explanation = document.getElementById('pres-exp-' + idx);

            btns.forEach(b => b.disabled = true);
            const isCorrect = choice === correct[idx];

            btns.forEach(b => {
              if (b.dataset.choice === correct[idx]) b.classList.add('correct-answer');
              if (b.dataset.choice === choice && !isCorrect) b.classList.add('wrong-answer');
            });

            const expls = [
              es ? 'Dos pares de tope (Ases y Reyes). Tablero seco — sin color, sin escalera. Muy fuerte.' : 'Top two pair (Aces and Kings). Dry board — no flush, no straight. Very strong.',
              es ? '¡Cuatro 9s! Extremadamente fuerte.' : 'Four 9s! Extremely strong.',
              es ? 'Parecía un draw de escalera, pero el tablero ya tiene 3 picas — cualquier oponente con 2 picas YA tiene color. Solo tienes carta alta contra manos hechas. ⚠️ Peligro real.' : "Looks like a straight draw, but 3 spades on board means anyone holding 2 spades ALREADY has a flush right now. You only have high card against made hands. ⚠️ Real danger.",
              es ? 'Sin pareja, sin draws reales. El tablero de cartas altas no te ayuda en absoluto.' : "No pair, no real draws. The high-card board doesn't help you at all.",
            ];

            resultText.textContent = isCorrect
              ? (es ? '✅ ¡Correcto!' : '✅ Correct!')
              : (es ? '❌ No del todo.' : '❌ Not quite.');
            resultText.style.color = isCorrect ? '#81c784' : '#ef9a9a';
            explanation.textContent = expls[idx];
            result.classList.remove('hidden');

            setTimeout(() => result.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
          });
        });
      }
    },

  ]
};
