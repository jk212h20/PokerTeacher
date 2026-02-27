/* ============================================
   MODULE 5: STARTING HANDS & READING THE BOARD
   ============================================ */

const MODULE_STARTS = {
  id: 'starts',
  labelKey: 'module.starts',
  lessons: [

    /* --------------------------------------------------
       LESSON 1 — starts-intro
       Your Two Cards Have Attributes
    -------------------------------------------------- */
    {
      id: 'starts-intro',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Tus Dos Cartas Tienen Atributos' : 'Your Two Cards Have Attributes'}</h2>
          <div class="lesson-body">
            ${es
              ? `Antes de ver el flop, ya tienes información clave: tus dos cartas. En lugar de memorizar una lista de manos "buenas" o "malas", aprende a <strong>leer sus atributos</strong>.`
              : `Before the flop, you already have key information: your two hole cards. Instead of memorizing a chart of "good" and "bad" hands, learn to <strong>read their attributes</strong>.`
            }
          </div>

          <div class="attr-grid" id="attr-grid">
            <div class="attr-card" data-attr="pair">
              <div class="attr-icon">🎯</div>
              <div class="attr-name">${es ? 'PAREJA' : 'PAIR'}</div>
              <div class="attr-desc">${es ? 'Ya tienes una mano hecha. ¿Qué tan alta es?' : 'You already have a made hand. How high?'}</div>
              <div class="attr-example">${cardHtml('A','♠','xs')}${cardHtml('A','♥','xs')}</div>
            </div>
            <div class="attr-card" data-attr="high">
              <div class="attr-icon">👑</div>
              <div class="attr-name">${es ? 'CARTAS ALTAS' : 'HIGH CARDS'}</div>
              <div class="attr-desc">${es ? 'Ases, Reyes, Reinas ganan enfrentamientos.' : 'Aces, Kings, Queens win showdowns.'}</div>
              <div class="attr-example">${cardHtml('A','♠','xs')}${cardHtml('K','♥','xs')}</div>
            </div>
            <div class="attr-card" data-attr="connected">
              <div class="attr-icon">🔗</div>
              <div class="attr-name">${es ? 'CONECTADAS' : 'CONNECTED'}</div>
              <div class="attr-desc">${es ? 'Cartas seguidas → potencial de escalera.' : 'Sequential cards → straight potential.'}</div>
              <div class="attr-example">${cardHtml('8','♠','xs')}${cardHtml('9','♥','xs')}</div>
            </div>
            <div class="attr-card" data-attr="suited">
              <div class="attr-icon">♠️</div>
              <div class="attr-name">${es ? 'DEL MISMO PALO' : 'SUITED'}</div>
              <div class="attr-desc">${es ? 'Mismo palo → potencial de color.' : 'Same suit → flush potential.'}</div>
              <div class="attr-example">${cardHtml('A','♠','xs')}${cardHtml('K','♠','xs')}</div>
            </div>
          </div>

          <div class="lesson-body" style="margin-top:16px">
            ${es
              ? `Cuantos más atributos, más fuerte la mano. Compara estos dos:<br><br>
                 <strong>9♠8♠</strong> — conectadas <em>y</em> del mismo palo → puede hacer escalera, color, o ambos.<br>
                 <strong>K♦3♣</strong> — una carta alta, no conectada, no del mismo palo → solo gana si el Rey hace pareja… y aguanta.`
              : `More attributes = stronger hand. Compare these two:<br><br>
                 <strong>9♠8♠</strong> — connected <em>and</em> suited → can become a straight, flush, or both.<br>
                 <strong>K♦3♣</strong> — one high card, not connected, not suited → only wins by pairing the King… and hoping it holds.`
            }
          </div>

          <div class="pro-tip">
            ${es
              ? 'Retirarte pre-flop es prácticamente gratis. Pierdes nada, pero conservas tus fichas y oportunidades para cuando tus cartas tengan atributos de verdad.'
              : 'Folding pre-flop is practically free. You lose nothing, but you preserve your chips and opportunities for when your cards have real attributes working.'}
          </div>
        `;
      }
    },

    /* --------------------------------------------------
       LESSON 2 — starts-premiums
       Strong Attributes = Strong Hands (interactive)
    -------------------------------------------------- */
    {
      id: 'starts-premiums',
      quizId: 'starts-premium-id',
      render(lang) {
        const es = lang === 'es';

        const hands = [
          {
            cards: [['A','♠'],['A','♥']],
            label: es ? 'A-A (As Doble)' : 'A-A (Pocket Aces)',
            pair: true, high: true, connected: false, suited: false,
            why: es
              ? 'La pareja más alta posible. Bate a toda otra pareja antes del flop. Todos los atributos de pareja y carta alta al máximo.'
              : 'The highest pair possible. Beats every other pair pre-flop. Pair + high card attributes fully maxed.',
          },
          {
            cards: [['K','♠'],['K','♥']],
            label: es ? 'K-K (Reyes)' : 'K-K (Pocket Kings)',
            pair: true, high: true, connected: false, suited: false,
            why: es
              ? 'La segunda mejor mano. Solo teme un As en el flop.'
              : 'Second best hand. Only fears an Ace on the flop.',
          },
          {
            cards: [['A','♠'],['K','♠']],
            label: es ? 'A-K (mismo palo)' : 'A-K suited',
            pair: false, high: true, connected: true, suited: true,
            why: es
              ? 'Sin pareja, pero: cartas altas + conectadas + del mismo palo = mejor posible kicker, puede hacer la mejor escalera, y la mejor posible color.'
              : 'No pair, but: high cards + connected + suited = best kicker, can make the best straight, and the best possible flush.',
          },
          {
            cards: [['A','♦'],['K','♣']],
            label: es ? 'A-K (distinto palo)' : 'A-K offsuit',
            pair: false, high: true, connected: true, suited: false,
            why: es
              ? 'Igual fuerza en cartas altas y escalera, pero pierde el potencial de color al no ser del mismo palo.'
              : 'Same high card and straight strength, but loses flush potential by not being suited.',
          },
          {
            cards: [['Q','♠'],['Q','♥']],
            label: es ? 'Q-Q / J-J (pares altos)' : 'Q-Q / J-J (high pairs)',
            pair: true, high: true, connected: false, suited: false,
            why: es
              ? 'Muy fuerte. Mano ya hecha. Se complica si el flop trae Ases o Reyes.'
              : 'Very strong. Already a made hand. Gets complicated if the flop brings Aces or Kings.',
          },
        ];

        const handItems = hands.map((h, i) => `
          <div class="premium-hand" data-idx="${i}">
            <div class="premium-hand-cards">
              ${handRow(h.cards, 'sm')}
            </div>
            <div class="premium-hand-label">${h.label}</div>
            <div class="attr-badges">
              <span class="attr-badge ${h.pair ? 'on' : 'off'}">${es ? 'PAR' : 'PAIR'}</span>
              <span class="attr-badge ${h.high ? 'on' : 'off'}">${es ? 'ALTA' : 'HIGH'}</span>
              <span class="attr-badge ${h.connected ? 'on' : 'off'}">${es ? 'CONECT' : 'CONN'}</span>
              <span class="attr-badge ${h.suited ? 'on' : 'off'}">${es ? 'PALO' : 'SUIT'}</span>
            </div>
            <div class="premium-hand-why hidden" id="why-${i}">${h.why}</div>
            <button class="btn-deal premium-toggle" data-target="why-${i}">
              ${es ? 'Ver por qué →' : 'Why? →'}
            </button>
          </div>
        `).join('');

        return `
          <h2 class="lesson-title">${es ? 'Manos Premium: Máximos Atributos' : 'Premium Hands: Maximum Attributes'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Las manos premium son las que tienen <strong>más atributos activos</strong>. Toca cada mano para ver por qué es fuerte.'
              : 'Premium hands are those with <strong>the most attributes working</strong>. Tap each hand to see why it\'s strong.'}
          </div>
          <div class="premium-hands-list">
            ${handItems}
          </div>
          <div class="pro-tip dealer">
            ${es
              ? 'En un torneo, si juegas solo tus manos premium y te retiras con todo lo demás, sobrevivirás a muchos jugadores que se meten en manos que no debían.'
              : 'In a tournament, if you only play your premium hands and fold everything else, you\'ll outlast many players who got into hands they shouldn\'t.'}
          </div>
        `;
      },
      afterRender(lang) {
        document.querySelectorAll('.premium-toggle').forEach(btn => {
          btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const why = document.getElementById(targetId);
            if (!why) return;
            const isHidden = why.classList.contains('hidden');
            why.classList.toggle('hidden', !isHidden);
            btn.textContent = isHidden
              ? (lang === 'es' ? 'Ocultar ↑' : 'Hide ↑')
              : (lang === 'es' ? 'Ver por qué →' : 'Why? →');
          });
        });
      }
    },

    /* --------------------------------------------------
       LESSON 3 — starts-playable
       Middle Hands, Draws & Trash (attribute tap game)
    -------------------------------------------------- */
    {
      id: 'starts-playable',
      render(lang) {
        const es = lang === 'es';

        const hands = [
          {
            cards: [['9','♠'],['9','♥']],
            label: es ? 'Par mediano (9-9)' : 'Medium pair (9-9)',
            pair: true, high: false, connected: false, suited: false,
            note: es
              ? 'Tienes una mano hecha, pero sin cartas altas. Un flop con figuras puede complicarte.'
              : 'Made hand, but no high cards. A board with face cards can put you in trouble.',
          },
          {
            cards: [['8','♥'],['9','♥']],
            label: es ? 'Conectadas del mismo palo (8-9♥)' : 'Suited connectors (8-9♥)',
            pair: false, high: false, connected: true, suited: true,
            note: es
              ? 'Sin carta alta, pero conectadas y del mismo palo. Necesita que el tablero ayude — mejor en manos con muchos jugadores.'
              : 'No high card, but connected and suited. Needs the board to help — better in multi-player pots.',
          },
          {
            cards: [['A','♣'],['6','♣']],
            label: es ? 'As del mismo palo (A-6♣)' : 'Ace-x suited (A-6♣)',
            pair: false, high: true, connected: false, suited: true,
            note: es
              ? 'Una carta alta y del mismo palo. Puede hacer el mejor color posible. Débil si el As no hace pareja.'
              : 'One high card, suited. Can make the best possible flush. Weak if the Ace doesn\'t pair.',
          },
          {
            cards: [['7','♠'],['2','♦']],
            label: es ? 'Basura (7-2 distinto palo)' : 'Trash (7-2 offsuit)',
            pair: false, high: false, connected: false, suited: false,
            note: es
              ? 'Ningún atributo activo. La peor mano estadística del Hold\'em. En un torneo, cada ficha que metes en esta mano es una ficha desperdiciada.'
              : 'Zero attributes active. The statistically worst hand in Hold\'em. In a tournament, every chip you put in on this hand is a chip wasted.',
          },
        ];

        const items = hands.map((h, i) => `
          <div class="playable-hand">
            <div class="playable-top">
              <div class="playable-cards">${handRow(h.cards, 'sm')}</div>
              <div class="playable-label">${h.label}</div>
            </div>
            <div class="attr-badges">
              <span class="attr-badge ${h.pair ? 'on' : 'off'}">${es ? 'PAR' : 'PAIR'}</span>
              <span class="attr-badge ${h.high ? 'on' : 'off'}">${es ? 'ALTA' : 'HIGH'}</span>
              <span class="attr-badge ${h.connected ? 'on' : 'off'}">${es ? 'CONECT' : 'CONN'}</span>
              <span class="attr-badge ${h.suited ? 'on' : 'off'}">${es ? 'PALO' : 'SUIT'}</span>
            </div>
            <div class="playable-note">${h.note}</div>
          </div>
        `).join('');

        return `
          <h2 class="lesson-title">${es ? 'Manos Jugables, Draws y Basura' : 'Playable Hands, Draws & Trash'}</h2>
          <div class="lesson-body">
            ${es
              ? 'No todas las manos no-premium son iguales. Algunas tienen <strong>atributos parciales</strong> que las hacen jugables en las circunstancias correctas. Otras no tienen nada.'
              : 'Not all non-premium hands are equal. Some have <strong>partial attributes</strong> that make them playable in the right circumstances. Others have nothing.'}
          </div>
          <div class="playable-hands-list">
            ${items}
          </div>
          <div class="pro-tip warning">
            ${es
              ? 'En un torneo, cuántos jugadores entraron a la mano importa. Las conectadas del mismo palo ganan más valor cuando hay muchos jugadores y el bote potencial es grande. Los pares altos prefieren pocas personas — menos chances de que alguien rompa su pareja.'
              : 'In a tournament, how many players entered the hand matters. Suited connectors gain value with many players and a big potential pot. High pairs prefer fewer players — fewer chances someone cracks them.'}
          </div>
        `;
      }
    },

    /* --------------------------------------------------
       LESSON 4 — starts-board
       What Does the Board Enable? (interactive 3-question)
    -------------------------------------------------- */
    {
      id: 'starts-board',
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
            flush: false,  flushWhy: es ? 'Solo 2 picas (y diferentes palos). Color no posible.' : 'Only 2 matching suit cards. Flush not possible.',
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
              ? `Cuando caen las cartas comunitarias, hazte tres preguntas sobre el tablero. Toca cada botón para ver la respuesta.`
              : `When community cards come out, ask yourself three questions about the board. Tap each button to see the answer.`
            }
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
              ? 'Antes de apostar, pregúntate: "¿Qué es lo más peligroso que puede encajar en este tablero?" Si la respuesta te supera, considera retirarte o ir con calma.'
              : 'Before betting, ask: "What\'s the most dangerous hand that fits this board?" If the answer beats you, consider folding or playing cautiously.'}
          </div>
        `;
      },
      afterRender(lang) {
        document.querySelectorAll('.board-q-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const bi = btn.dataset.board;
            const q = btn.dataset.q;
            const ans = document.getElementById(`board-ans-${bi}-${q}`);
            if (!ans) return;
            const hidden = ans.classList.contains('hidden');
            ans.classList.toggle('hidden', !hidden);
            btn.classList.toggle('active', hidden);
          });
        });
      }
    },

    /* --------------------------------------------------
       LESSON 5 — starts-relative
       Your Hand vs. The Board (3 tournament scenarios)
    -------------------------------------------------- */
    {
      id: 'starts-relative',
      quizId: 'starts-relative-quiz',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Tu Fuerza Es Relativa al Tablero' : 'Your Strength Is Relative to the Board'}</h2>
          <div class="lesson-body">
            ${es
              ? `No tienes simplemente "una buena mano" — tienes una mano que es buena <em>en comparación con lo que el tablero permite</em>. El mismo par de Reyes puede ser imbatible o muy vulnerable según lo que salga.`
              : `You don't just have "a good hand" — you have a hand that's good <em>relative to what the board allows</em>. The same pair of Kings can be unbeatable or very vulnerable depending on what falls.`
            }
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
                : '✅ You have a straight (6-7-8-9-10)! And 4 spades — one more and you have a flush. The board activated both threats <em>in your favor</em>. <strong>You\'re in excellent shape.</strong>'}
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
       LESSON 6 — starts-practice
       Read the Hand — Mini-Game (4 scenarios + quiz)
    -------------------------------------------------- */
    {
      id: 'starts-practice',
      quizId: 'starts-practice-quiz',
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
              ? '¡Cuatro 9s! El par en el tablero combinado con tu par hace póker. Ocurre cuando el tablero empareja tus cartas. Extremadamente fuerte.'
              : 'Four 9s! The pair on the board combined with your pair makes quads. Happens when the board pairs your hole cards. Extremely strong.',
          },
          {
            hole: [['Q','♣'],['J','♦']],
            board: [['K','♠'],['10','♠'],['2','♠']],
            answer: 'medium',
            explanation: es
              ? 'Tienes un draw de escalera (necesitas un As o un 9). Pero el tablero ya tiene 3 picas — si alguien tiene 2 picas, ya te tiene con color.'
              : 'You have a straight draw (need an Ace or 9). But the board has 3 spades — if anyone holds 2 spades, they already beat you with a flush.',
          },
          {
            hole: [['5','♦'],['4','♦']],
            board: [['A','♠'],['K','♣'],['J','♥']],
            answer: 'danger',
            explanation: es
              ? 'Sin pareja, sin draw de color, sin draw de escalera real. El tablero está lleno de cartas altas que no te ayudan. Cualquier oponente con un As, Rey o Jota te gana.'
              : 'No pair, no flush draw, no real straight draw. The board is full of high cards that don\'t help you. Any opponent with an Ace, King, or Jack beats you.',
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
              ? `En cada mano, mira tus cartas y el tablero. ¿Estás en buena posición, más o menos, o en peligro? Toca tu respuesta para descubrir el veredicto.`
              : `For each hand, look at your cards and the board. Are you in good shape, so-so, or in danger? Tap your answer to reveal the verdict.`
            }
          </div>

          <div class="practice-scenarios">
            ${scenarioItems}
          </div>

          <div class="pro-tip dealer">
            ${es
              ? 'En un torneo, conservar tus fichas es tan importante como ganarlas. Saber cuándo estás en peligro — y retirarte — puede mantenerte vivo mucho más tiempo.'
              : 'In a tournament, preserving your chips is as important as winning them. Knowing when you\'re in danger — and folding — can keep you alive much longer.'}
          </div>
        `;
      },
      afterRender(lang) {
        const es = lang === 'es';
        const correct = ['strong', 'strong', 'medium', 'danger'];

        document.querySelectorAll('.practice-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.scenario);
            const choice = btn.dataset.choice;
            const btns = document.querySelectorAll(`#pbtn-${idx} .practice-btn`);
            const result = document.getElementById(`pres-${idx}`);
            const resultText = document.getElementById(`pres-text-${idx}`);
            const explanation = document.getElementById(`pres-exp-${idx}`);

            // Disable all buttons for this scenario
            btns.forEach(b => b.disabled = true);

            const isCorrect = choice === correct[idx];

            // Mark buttons
            btns.forEach(b => {
              if (b.dataset.choice === correct[idx]) b.classList.add('correct-answer');
              if (b.dataset.choice === choice && !isCorrect) b.classList.add('wrong-answer');
            });

            // Show result
            const scenarios = [
              {
                explanation: es
                  ? 'Dos pares de tope (Ases y Reyes). Tablero seco — sin color, sin escalera. Muy fuerte.'
                  : 'Top two pair (Aces and Kings). Dry board — no flush, no straight. Very strong.',
              },
              {
                explanation: es
                  ? '¡Cuatro 9s! El par en el tablero combinado con tu par hace póker. Extremadamente fuerte.'
                  : 'Four 9s! The pair on the board combined with your pair makes quads. Extremely strong.',
              },
              {
                explanation: es
                  ? 'Tienes un draw de escalera, pero el tablero con 3 picas ya amenaza con color para otros.'
                  : 'You have a straight draw, but the board\'s 3 spades already threaten a flush for others.',
              },
              {
                explanation: es
                  ? 'Sin pareja, sin draws reales. El tablero de cartas altas no te ayuda en absoluto.'
                  : 'No pair, no real draws. The high-card board doesn\'t help you at all.',
              },
            ];

            resultText.textContent = isCorrect
              ? (es ? '✅ ¡Correcto!' : '✅ Correct!')
              : (es ? '❌ No del todo.' : '❌ Not quite.');
            resultText.style.color = isCorrect ? '#81c784' : '#ef9a9a';
            explanation.textContent = scenarios[idx].explanation;
            result.classList.remove('hidden');

            // Scroll to result
            setTimeout(() => result.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
          });
        });
      }
    },

  ]
};
