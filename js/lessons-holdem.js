/* ============================================
   MODULE 3: TEXAS HOLD'EM
   ============================================ */

const MODULE_HOLDEM = {
  id: 'holdem',
  labelKey: 'module.holdem',
  lessons: [

    {
      id: 'holdem-intro',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? "Texas Hold'em" : "Texas Hold'em"}</h2>
          <div class="lesson-body">
            ${es
              ? `El Texas Hold'em es el poker más popular del mundo — el que se juega en la mayoría de torneos.<br><br>
                 La idea central: <strong>cada jugador recibe 2 cartas privadas</strong> (solo para él) y comparte <strong>5 cartas comunitarias</strong> en el centro de la mesa.`
              : `Texas Hold'em is the world's most popular poker game — the one played in most tournaments.<br><br>
                 The core idea: <strong>each player gets 2 private cards</strong> (just for them) plus shares <strong>5 community cards</strong> in the center of the table.`
            }
          </div>
          <div class="hand-example">
            <div class="hand-example-label">${es ? 'Tus cartas privadas (hole cards)' : 'Your private cards (hole cards)'}</div>
            <div class="card-row">
              ${cardHtml('A','♠','lg')}${cardHtml('K','♥','lg')}
            </div>
          </div>
          <div class="hand-example">
            <div class="hand-example-label">${es ? 'Cartas comunitarias (todos las ven)' : 'Community cards (everyone sees)'}</div>
            <div class="card-row">
              ${cardHtml('Q','♠','md')}${cardHtml('J','♥','md')}${cardHtml('10','♦','md')}
              <div class="card size-md back"></div>
              <div class="card size-md back"></div>
            </div>
          </div>
          <div class="lesson-body">
            ${es
              ? `Haces la <strong>mejor mano de 5 cartas</strong> usando cualquier combinación de tus 2 cartas privadas y las 5 comunitarias.`
              : `You make the <strong>best 5-card hand</strong> using any combination of your 2 private cards and the 5 community cards.`
            }
          </div>
          <div class="pro-tip">
            ${es
              ? 'En el ejemplo de arriba: con A♠ K♥ y Q♠ J♥ 10♦ en la mesa, ¡ya tienes Escalera Real al As!'
              : 'In the example above: with A♠ K♥ and Q♠ J♥ 10♦ on the board, you already have an Ace-high straight!'}
          </div>
        `;
      }
    },

    {
      id: 'holdem-table',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'La Mesa: Posiciones Clave' : 'The Table: Key Positions'}</h2>
          <div class="lesson-body">
            ${es
              ? `Antes de repartir, hay 3 posiciones especiales en la mesa:`
              : `Before the deal, there are 3 special positions at the table:`
            }
          </div>
          <div class="table-diagram">
            <div class="table-seats">
              <div class="seat dealer">
                <div class="seat-label gold">${es ? 'DEALER' : 'DEALER'}</div>
                <div>🎯 ${es ? 'Botón' : 'Button'}</div>
              </div>
              <div class="seat sb">
                <div class="seat-label blue">SB</div>
                <div>${es ? 'Ciega Pequeña' : 'Small Blind'}</div>
              </div>
              <div class="seat bb">
                <div class="seat-label green">BB</div>
                <div>${es ? 'Ciega Grande' : 'Big Blind'}</div>
              </div>
              <div class="seat">
                <div class="seat-label">${es ? 'JUGADORES' : 'PLAYERS'}</div>
                <div>👤👤👤</div>
              </div>
            </div>
          </div>
          <div class="etiquette-list">
            <div class="etiquette-item">
              <div class="etiquette-icon">🎯</div>
              <div class="etiquette-text">
                <h4>${es ? 'Botón del Dealer' : 'Dealer Button'}</h4>
                <p>${es
                  ? 'Un disco que rota cada mano. Marca al "dealer" de esa mano. En torneos hay un crupier real, pero el botón sigue rotando para indicar el orden de apuesta.'
                  : 'A disc that rotates every hand. Marks the "dealer" for that hand. In tournaments there\'s a real dealer, but the button still rotates to show betting order.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🔵</div>
              <div class="etiquette-text">
                <h4>${es ? 'Ciega Pequeña (SB)' : 'Small Blind (SB)'}</h4>
                <p>${es
                  ? 'El jugador a la izquierda del dealer. Pone la mitad de la apuesta mínima ANTES de ver sus cartas.'
                  : 'The player to the left of the dealer. Posts half the minimum bet BEFORE seeing cards.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🟢</div>
              <div class="etiquette-text">
                <h4>${es ? 'Ciega Grande (BB)' : 'Big Blind (BB)'}</h4>
                <p>${es
                  ? 'Dos posiciones a la izquierda del dealer. Pone la apuesta mínima completa ANTES de ver sus cartas.'
                  : 'Two positions left of the dealer. Posts the full minimum bet BEFORE seeing cards.'
                }</p>
              </div>
            </div>
          </div>
          <div class="pro-tip">
            ${es
              ? 'Las ciegas rotan cada mano — todos las pagan con el tiempo. ¡Es equitativo!'
              : 'Blinds rotate every hand — everyone pays them over time. It\'s fair!'}
          </div>
        `;
      },
      quizId: 'holdem-blinds'
    },

    {
      id: 'holdem-deal',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'El Reparto: Pre-Flop' : 'The Deal: Pre-Flop'}</h2>
          <div class="lesson-body">
            ${es
              ? `El crupier reparte <strong>2 cartas boca abajo</strong> a cada jugador, empezando por la Ciega Pequeña.<br><br>
                 Solo tú puedes ver tus cartas. <strong>Protégelas</strong> — cúbrelas con una mano.`
              : `The dealer gives <strong>2 cards face-down</strong> to each player, starting from the Small Blind.<br><br>
                 Only you can see your cards. <strong>Protect them</strong> — cover them with a hand.`
            }
          </div>
          <div class="deal-sim" id="deal-sim-preflop">
            <div class="deal-stage-label" id="sim-label-preflop">${es ? 'Toca para repartir' : 'Tap to deal'}</div>
            <div class="hole-cards" id="hole-cards-display">
              <div class="card size-lg back"></div>
              <div class="card size-lg back"></div>
            </div>
            <div class="deal-sim-controls">
              <button class="btn-deal" id="btn-reveal-hole">${es ? 'Revelar mis cartas' : 'Reveal my cards'}</button>
            </div>
          </div>
          <div class="lesson-body">
            ${es
              ? `Después del reparto inicial comienza la <strong>primera ronda de apuestas</strong>: Pre-Flop.<br><br>
                 La acción empieza en el jugador a la izquierda de la Ciega Grande y continúa en sentido horario.`
              : `After the initial deal, the <strong>first betting round</strong> begins: Pre-Flop.<br><br>
                 Action starts with the player to the left of the Big Blind and goes clockwise.`
            }
          </div>
          <div class="pro-tip dealer">
            ${es
              ? 'La Ciega Grande actúa última en el pre-flop — tiene la opción de "subir" aunque nadie más haya subido.'
              : 'The Big Blind acts last pre-flop — they have the option to raise even if nobody else raised.'}
          </div>
        `;
      },
      afterRender(lang) {
        const es = lang === 'es';
        const btn = document.getElementById('btn-reveal-hole');
        const display = document.getElementById('hole-cards-display');
        const label = document.getElementById('sim-label-preflop');
        if (!btn) return;
        let hand = dealCards(shuffle(buildDeck()), 2)[0];
        btn.onclick = () => {
          display.innerHTML = '';
          animateDeal(display, hand, 'lg', 150);
          label.textContent = es ? '¡Tus cartas!' : 'Your cards!';
          btn.textContent = es ? 'Barajar de nuevo' : 'Shuffle again';
          btn.onclick = () => {
            hand = dealCards(shuffle(buildDeck()), 2)[0];
            display.innerHTML = '';
            animateDeal(display, hand, 'lg', 150);
          };
        };
      }
    },

    {
      id: 'holdem-actions',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Tus Opciones: Apostar o No' : 'Your Options: Bet or Not'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Cuando es tu turno, tienes entre 2 y 4 opciones dependiendo de la situación:'
              : 'When it\'s your turn, you have 2–4 options depending on the situation:'}
          </div>
          <div class="bet-options">
            <div class="bet-option">
              <div class="bet-option-name">${es ? 'PASAR' : 'CHECK'}</div>
              <div class="bet-option-desc">${es
                ? '"No apuesto, pero me quedo." Solo disponible si nadie ha apostado.'
                : '"No bet, but I\'ll stay." Only available if nobody has bet yet.'}</div>
            </div>
            <div class="bet-option">
              <div class="bet-option-name">${es ? 'APOSTAR' : 'BET'}</div>
              <div class="bet-option-desc">${es
                ? 'Poner el primer chip. Los demás deben igualar o retirarse.'
                : 'Put in the first chips. Others must call or fold.'}</div>
            </div>
            <div class="bet-option">
              <div class="bet-option-name">${es ? 'IGUALAR' : 'CALL'}</div>
              <div class="bet-option-desc">${es
                ? 'Igualar la apuesta existente para quedarte en la mano.'
                : 'Match the existing bet to stay in the hand.'}</div>
            </div>
            <div class="bet-option">
              <div class="bet-option-name">${es ? 'SUBIR' : 'RAISE'}</div>
              <div class="bet-option-desc">${es
                ? 'Apostar MÁS de lo que se apostó. Fuerza a otros a pagar más.'
                : 'Bet MORE than the current bet. Forces others to pay more.'}</div>
            </div>
            <div class="bet-option">
              <div class="bet-option-name">${es ? 'RETIRARSE' : 'FOLD'}</div>
              <div class="bet-option-desc">${es
                ? 'Tirar las cartas y rendirse. Pierdes lo apostado, pero no más.'
                : 'Throw away your cards. You lose what you bet, but nothing more.'}</div>
            </div>
            <div class="bet-option">
              <div class="bet-option-name">${es ? 'ALL-IN' : 'ALL-IN'}</div>
              <div class="bet-option-desc">${es
                ? 'Apostar TODAS tus fichas. No puedes ganar más de lo que apostaste.'
                : 'Bet ALL your chips. Can\'t win more than what you put in.'}</div>
            </div>
          </div>
          <div class="pro-tip dealer">
            ${es
              ? 'En tu primer torneo: si no estás seguro de qué hacer, está bien preguntar al crupier "¿cuánto es?" para igualar. Él te ayudará.'
              : 'At your first tournament: if unsure what to do, it\'s fine to ask the dealer "how much to call?" They\'ll help.'}
          </div>
        `;
      },
      quizId: 'holdem-betting-options'
    },

    {
      id: 'holdem-flop',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'El Flop: 3 Cartas Comunitarias' : 'The Flop: 3 Community Cards'}</h2>
          <div class="lesson-body">
            ${es
              ? `Después del pre-flop, el crupier coloca <strong>3 cartas boca arriba</strong> en el centro de la mesa. Esto es el <strong>Flop</strong>.<br><br>
                 Todos los jugadores comparten estas cartas para hacer su mano.`
              : `After pre-flop betting, the dealer places <strong>3 cards face-up</strong> in the center. This is the <strong>Flop</strong>.<br><br>
                 All players share these cards to build their hand.`
            }
          </div>
          <div class="deal-sim">
            <div class="community-cards-area">
              <div class="community-label">${es ? 'CARTAS COMUNITARIAS' : 'COMMUNITY CARDS'}</div>
              <div class="community-row" id="flop-display">
                <div class="card-slot size-md">?</div>
                <div class="card-slot size-md">?</div>
                <div class="card-slot size-md">?</div>
                <div class="card-slot size-md">?</div>
                <div class="card-slot size-md">?</div>
              </div>
            </div>
            <div class="deal-sim-controls">
              <button class="btn-deal" id="btn-deal-flop">${es ? 'Repartir Flop' : 'Deal Flop'}</button>
            </div>
          </div>
          <div class="lesson-body">
            ${es
              ? `Después del Flop hay otra ronda de apuestas. La acción empieza en el jugador a la izquierda del dealer.`
              : `After the Flop there's another betting round. Action starts with the first player left of the dealer.`
            }
          </div>
          <div class="pro-tip">
            ${es
              ? 'Ya tienes 5 de las 7 cartas posibles. ¡Empieza a pensar en qué mano podrías formar!'
              : 'You now have 5 of 7 possible cards. Start thinking about what hand you might make!'}
          </div>
        `;
      },
      afterRender(lang) {
        const es = lang === 'es';
        const display = document.getElementById('flop-display');
        const btn = document.getElementById('btn-deal-flop');
        if (!btn || !display) return;

        let stage = 0;
        let board = dealCards(shuffle(buildDeck()), 5)[0];

        function resetSlots() {
          display.innerHTML = '';
          for (let i = 0; i < 5; i++) {
            const s = document.createElement('div');
            s.className = 'card-slot size-md';
            s.textContent = '?';
            display.appendChild(s);
          }
        }

        resetSlots();

        btn.onclick = () => {
          if (stage === 0) {
            // Deal flop (3 cards) — use display.children directly (not stale refs)
            for (let i = 0; i < 3; i++) {
              const card = makeCardFromCode(board[i], 'md');
              card.style.opacity = '0';
              card.style.transition = 'opacity 0.3s ease';
              display.children[i].replaceWith(card);
              setTimeout(() => { card.style.opacity = '1'; }, i * 120 + 30);
            }
            btn.textContent = es ? 'Repartir Turn' : 'Deal Turn';
            stage = 1;
          } else if (stage === 1) {
            const card = makeCardFromCode(board[3], 'md');
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.3s ease';
            display.children[3].replaceWith(card);
            setTimeout(() => { card.style.opacity = '1'; }, 30);
            btn.textContent = es ? 'Repartir River' : 'Deal River';
            stage = 2;
          } else if (stage === 2) {
            const card = makeCardFromCode(board[4], 'md');
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.3s ease';
            display.children[4].replaceWith(card);
            setTimeout(() => { card.style.opacity = '1'; }, 30);
            btn.textContent = es ? 'Nueva mano' : 'New hand';
            stage = 3;
          } else {
            board = dealCards(shuffle(buildDeck()), 5)[0];
            resetSlots();
            btn.textContent = es ? 'Repartir Flop' : 'Deal Flop';
            stage = 0;
          }
        };
      }
    },

    {
      id: 'holdem-turn-river',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Turn y River: Las Últimas Cartas' : 'Turn & River: The Last Cards'}</h2>
          <div class="round-steps">
            <div class="round-step">
              <div class="step-num">4</div>
              <div class="step-content">
                <h4>${es ? 'El Turn (4ª carta)' : 'The Turn (4th card)'}</h4>
                <p>${es
                  ? 'El crupier pone una 4ª carta boca arriba. Otra ronda de apuestas.'
                  : 'Dealer places a 4th card face-up. Another betting round.'
                }</p>
              </div>
            </div>
            <div class="round-step">
              <div class="step-num">5</div>
              <div class="step-content">
                <h4>${es ? 'El River (5ª carta)' : 'The River (5th card)'}</h4>
                <p>${es
                  ? 'La última carta comunitaria. La ronda de apuestas final.'
                  : 'The last community card. The final betting round.'
                }</p>
              </div>
            </div>
            <div class="round-step">
              <div class="step-num">6</div>
              <div class="step-content">
                <h4>${es ? 'El Showdown (Enfrentamiento)' : 'The Showdown'}</h4>
                <p>${es
                  ? 'Si quedan 2+ jugadores al final, muestran sus cartas. Gana la mejor mano de 5.'
                  : 'If 2+ players remain, they show their cards. Best 5-card hand wins.'
                }</p>
              </div>
            </div>
          </div>
          <div class="lesson-body">
            ${es
              ? `<strong>Resumen de las 4 rondas de apuesta:</strong><br>
                 1. Pre-Flop → 2. Flop → 3. Turn → 4. River`
              : `<strong>The 4 betting rounds summary:</strong><br>
                 1. Pre-Flop → 2. Flop → 3. Turn → 4. River`
            }
          </div>
          <div class="pro-tip warning">
            ${es
              ? 'En el Showdown, el jugador que hizo la última apuesta o subida muestra primero. Si nadie apostó en el river, el jugador a la izquierda del dealer muestra primero.'
              : 'At Showdown, the last person who bet or raised shows first. If nobody bet on the river, the player left of the dealer shows first.'}
          </div>
        `;
      },
      quizId: 'holdem-community'
    },

    {
      id: 'holdem-best-hand',
      quizId: 'holdem-best-hand',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Las 7 Cartas: Elige las Mejores 5' : '7 Cards: Pick Your Best 5'}</h2>
          <div class="lesson-body">
            ${es
              ? `Al final tienes <strong>7 cartas</strong>: tus 2 privadas + 5 comunitarias. Tu mano es la <strong>mejor combinación posible de 5</strong>.`
              : `At the end you have <strong>7 cards</strong>: your 2 hole cards + 5 community cards. Your hand is the <strong>best 5-card combination</strong>.`
            }
          </div>
          <div class="section-divider">${es ? 'Ejemplo' : 'Example'}</div>
          <div class="hand-example">
            <div class="hand-example-label">${es ? 'Tus cartas privadas' : 'Your hole cards'}</div>
            ${handRow([['A','♠'],['K','♠']],'md')}
          </div>
          <div class="hand-example">
            <div class="hand-example-label">${es ? 'Cartas comunitarias' : 'Community cards'}</div>
            ${handRow([['Q','♠'],['J','♠'],['10','♠'],['5','♥'],['2','♣']],'md')}
          </div>
          <div class="hand-example">
            <div class="hand-example-label" style="color:#81c784">✓ ${es ? 'Tu mejor mano (5 cartas)' : 'Your best hand (5 cards)'}</div>
            ${handRow([['A','♠'],['K','♠'],['Q','♠'],['J','♠'],['10','♠']],'md')}
            <div class="hand-desc">${es ? '¡Escalera Real al As de Picas! La mano perfecta.' : 'Royal Flush in Spades! The perfect hand.'}</div>
          </div>
          <div class="pro-tip">
            ${es
              ? 'No tienes que usar ambas cartas privadas. Puedes usar solo 1, o incluso ninguna si las 5 comunitarias son tu mejor mano.'
              : 'You don\'t have to use both hole cards. You can use just 1, or even none if the 5 community cards are your best hand.'}
          </div>
        `;
      }
    }
  ]
};
