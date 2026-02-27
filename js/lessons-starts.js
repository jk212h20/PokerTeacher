/* ============================================
   MODULE 5: STARTING HANDS
   Lessons 1-3 only. Lessons 4-6 are in MODULE_BOARD (lessons-board.js)
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
              <div class="attr-example">${cardHtml('J','♠','xs')}${cardHtml('7','♠','xs')}</div>
            </div>
          </div>

          <div class="lesson-body" style="margin-top:16px">
            ${es
              ? `Cuantos más atributos, más fuerte la mano. Compara estos dos:<br><br>
                 <strong>9♠8♠</strong> — conectadas <em>y</em> del mismo palo → puede hacer escalera, color, o ambos.<br>
                 <strong>K♦3♣</strong> — una carta alta, no conectada, no del mismo palo → necesita que el Rey haga pareja y aguante.`
              : `More attributes = stronger hand. Compare these two:<br><br>
                 <strong>9♠8♠</strong> — connected <em>and</em> suited → can become a straight, flush, or both.<br>
                 <strong>K♦3♣</strong> — one high card, not connected, not suited → needs the King to pair and hold up against everything else.`
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
       Premium Hands: Maximum Attributes (interactive)
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
       Playable Hands, Draws & Trash
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

  ]
};
