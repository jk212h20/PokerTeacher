/* ============================================
   MODULE 4: TOURNAMENT RULES
   ============================================ */

const MODULE_TOURNAMENT = {
  id: 'tournament',
  labelKey: 'module.tournament',
  lessons: [

    {
      id: 'tourn-blinds',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Torneos: Las Ciegas Suben' : 'Tournaments: Blinds Go Up'}</h2>
          <div class="lesson-body">
            ${es
              ? `En un torneo, las ciegas <strong>aumentan cada cierto tiempo</strong> (cada 15–30 minutos típicamente).<br><br>
                 Esto es lo que hace que los torneos tengan un final. Si las ciegas no subieran, la gente podría esperar horas por cartas perfectas.`
              : `In a tournament, blinds <strong>increase at regular intervals</strong> (typically every 15–30 minutes).<br><br>
                 This is what gives tournaments an end. If blinds didn't go up, people could wait hours for perfect cards.`
            }
          </div>
          <div class="round-steps">
            <div class="round-step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>${es ? 'Nivel 1 — Ciegas bajas' : 'Level 1 — Low blinds'}</h4>
                <p>${es ? 'Ej: 25/50. Tienes muchas fichas en relación a las ciegas. Tiempo para aprender.' : 'e.g. 25/50. You have many chips relative to blinds. Time to learn.'}</p>
              </div>
            </div>
            <div class="round-step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>${es ? 'Niveles medios — La presión sube' : 'Mid levels — Pressure builds'}</h4>
                <p>${es ? 'Las ciegas son una porción mayor de tus fichas. Debes actuar.' : 'Blinds are a bigger slice of your chips. You must act.'}</p>
              </div>
            </div>
            <div class="round-step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>${es ? 'Niveles finales — Todo o nada' : 'Late levels — All or nothing'}</h4>
                <p>${es ? 'Las ciegas son enormes. Pronto tendrás que ir all-in o quedarte sin fichas.' : 'Blinds are huge. Soon you\'ll have to go all-in or run out of chips.'}</p>
              </div>
            </div>
          </div>
          <div class="pro-tip">
            ${es
              ? 'El programa de ciegas siempre está disponible en la mesa o con el director del torneo. ¡Consúltalo!'
              : 'The blind schedule is always available at the table or with the tournament director. Check it!'}
          </div>
        `;
      }
    },

    {
      id: 'tourn-chips',
      quizId: 'tourn-chips',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Fichas de Torneo ≠ Dinero' : 'Tournament Chips ≠ Money'}</h2>
          <div class="lesson-body">
            ${es
              ? `Esta es una confusión muy común en principiantes:<br><br>
                 Las fichas de torneo <strong>no tienen valor en efectivo</strong> durante el juego.`
              : `This is a very common beginner confusion:<br><br>
                 Tournament chips <strong>have no cash value</strong> during play.`
            }
          </div>
          <div class="etiquette-list">
            <div class="etiquette-item">
              <div class="etiquette-icon">🎰</div>
              <div class="etiquette-text">
                <h4>${es ? 'Juego de dinero (Cash Game)' : 'Cash Game'}</h4>
                <p>${es
                  ? 'Fichas = dinero real. Puedes salir en cualquier momento y cobrar.'
                  : 'Chips = real money. You can leave anytime and cash out.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🏆</div>
              <div class="etiquette-text">
                <h4>${es ? 'Torneo' : 'Tournament'}</h4>
                <p>${es
                  ? 'Fichas = puntuación. Solo ganas dinero real al terminar en una posición pagada ("en el dinero").'
                  : 'Chips = score. You only win real money by finishing in a paid position ("in the money").'
                }</p>
              </div>
            </div>
          </div>
          <div class="lesson-body">
            ${es
              ? `En un torneo típico, los últimos <strong>10–15%</strong> de jugadores ganan dinero.<br><br>
                 Si hay 100 jugadores, quizás los 12 últimos que queden ganan. El ganador se lleva la parte del león.`
              : `In a typical tournament, the last <strong>10–15%</strong> of players win money.<br><br>
                 If there are 100 players, maybe the last 12 standing win. First place takes the lion's share.`
            }
          </div>
          <div class="pro-tip warning">
            ${es
              ? '⚠️ No confundas tus fichas con dinero real. Tener muchas fichas no significa que estés ganando efectivo — todavía no.'
              : '⚠️ Don\'t confuse chips with real money. Having lots of chips doesn\'t mean you\'re winning cash yet — not yet.'}
          </div>
        `;
      }
    },

    {
      id: 'tourn-antes',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Antes: Otra Apuesta Forzada' : 'Antes: Another Forced Bet'}</h2>
          <div class="lesson-body">
            ${es
              ? `Muchos torneos añaden un <strong>ante</strong> en niveles más altos — una pequeña apuesta que <em>todos</em> los jugadores pagan antes de cada mano (no solo las ciegas).`
              : `Many tournaments add an <strong>ante</strong> at higher levels — a small bet that <em>every</em> player posts before each hand (not just the blinds).`
            }
          </div>
          <div class="etiquette-list">
            <div class="etiquette-item">
              <div class="etiquette-icon">💰</div>
              <div class="etiquette-text">
                <h4>${es ? '¿Por qué el ante?' : 'Why antes?'}</h4>
                <p>${es
                  ? 'Pone más dinero en el bote antes de empezar, lo que crea más acción e incentivos para jugar manos.'
                  : 'Puts more money in the pot before you start, creating more action and incentive to play hands.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🔄</div>
              <div class="etiquette-text">
                <h4>${es ? 'Ante del BB (Big Blind Ante)' : 'Big Blind Ante (BB Ante)'}</h4>
                <p>${es
                  ? 'Variante moderna: solo el jugador en la Ciega Grande paga el ante de todos, lo hace más rápido.'
                  : 'Modern variant: only the Big Blind player posts the ante for everyone. Speeds things up.'
                }</p>
              </div>
            </div>
          </div>
          <div class="pro-tip dealer">
            ${es
              ? 'Si no estás seguro de cuánto es el ante, el crupier lo dirá automáticamente. ¡No te estreses!'
              : 'If you\'re not sure how much the ante is, the dealer will announce it automatically. Don\'t stress!'}
          </div>
        `;
      }
    },

    {
      id: 'tourn-etiquette',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Etiqueta en la Mesa' : 'Table Etiquette'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Estas reglas existen para que el juego sea justo para todos:'
              : 'These rules exist to keep the game fair for everyone:'}
          </div>
          <div class="etiquette-list">
            <div class="etiquette-item">
              <div class="etiquette-icon">🔄</div>
              <div class="etiquette-text">
                <h4>${es ? 'Actúa en tu turno' : 'Act in turn'}</h4>
                <p>${es
                  ? 'Espera siempre a que la acción llegue a ti. Actuar antes de tiempo revela información y puede anularse.'
                  : 'Always wait for the action to reach you. Acting early gives away information and may be ruled invalid.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">💬</div>
              <div class="etiquette-text">
                <h4>${es ? 'Las declaraciones verbales son vinculantes' : 'Verbal declarations are binding'}</h4>
                <p>${es
                  ? '"Voy all-in", "subo", "igualo" — una vez que lo dices, no puedes retractarte.'
                  : '"I\'m all-in", "I raise", "I call" — once you say it, you\'re committed.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🛡️</div>
              <div class="etiquette-text">
                <h4>${es ? 'Protege tus cartas' : 'Protect your hand'}</h4>
                <p>${es
                  ? 'Pon algo encima de tus cartas (un chip, un objeto). Si el crupier mezcla tus cartas por accidente, no puedes reclamar si no las protegiste.'
                  : 'Put something on top of your cards (a chip, an object). If the dealer accidentally mucks them, you can\'t claim your hand if it wasn\'t protected.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🚫</div>
              <div class="etiquette-text">
                <h4>${es ? 'Sin apuestas en cuerda (String Bets)' : 'No string bets'}</h4>
                <p>${es
                  ? 'Pon todas tus fichas de apuesta en un movimiento. No pongas algunas, luego vuelves para más. Declara el monto antes o hazlo todo de una vez.'
                  : 'Put all your bet chips in one motion. Don\'t put some in, then go back for more. Declare the amount first or do it all at once.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🤫</div>
              <div class="etiquette-text">
                <h4>${es ? 'No reveles tus cartas' : 'Don\'t reveal your cards'}</h4>
                <p>${es
                  ? 'No muestres tus cartas a otros jugadores ni las comentes mientras la mano está activa.'
                  : 'Don\'t show your cards to other players or comment on them while the hand is active.'
                }</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">📱</div>
              <div class="etiquette-text">
                <h4>${es ? 'Sin teléfono en la mesa' : 'No phone at the table'}</h4>
                <p>${es
                  ? 'La mayoría de torneos prohíben usar el teléfono mientras juegas una mano activa.'
                  : 'Most tournaments prohibit using your phone while playing an active hand.'
                }</p>
              </div>
            </div>
          </div>
        `;
      },
      quizId: 'tourn-etiquette'
    },

    {
      id: 'tourn-act-in-turn',
      quizId: 'tourn-act-turn',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Actuar en Turno: Crucial' : 'Acting in Turn: Crucial'}</h2>
          <div class="lesson-body">
            ${es
              ? `La acción en el poker va en <strong>sentido horario</strong>. Solo puedes actuar cuando sea tu turno.<br><br>
                 Si actúas fuera de turno, podrías:`
              : `Action in poker goes <strong>clockwise</strong>. You can only act when it's your turn.<br><br>
                 If you act out of turn, you could:`
            }
          </div>
          <div class="terms-list">
            <div class="term-item">
              <div class="term-word">❌</div>
              <div class="term-def">${es
                ? 'Revelar información que afecta las decisiones de otros jugadores'
                : 'Reveal information that affects other players\' decisions'}</div>
            </div>
            <div class="term-item">
              <div class="term-word">❌</div>
              <div class="term-def">${es
                ? 'Que el crupier anule tu acción'
                : 'Have your action ruled invalid by the dealer'}</div>
            </div>
            <div class="term-item">
              <div class="term-word">❌</div>
              <div class="term-def">${es
                ? 'Que te amonesten o penalicen en torneos serios'
                : 'Receive a warning or penalty in serious tournaments'}</div>
            </div>
          </div>
          <div class="lesson-body">
            ${es
              ? `<strong>¿Cómo saber cuándo es tu turno?</strong><br>
                 El crupier o el jugador activo te mirarán. Muchos torneos tienen botones de acción que señalan al jugador activo.`
              : `<strong>How do you know when it's your turn?</strong><br>
                 The dealer or current player will look at you. Many tournaments have action buttons pointing at the active player.`
            }
          </div>
          <div class="pro-tip dealer">
            ${es
              ? 'Si no estás seguro de si es tu turno, pregunta "¿soy yo?" El crupier te indicará. ¡Nadie se ofende!'
              : 'If you\'re not sure if it\'s your turn, ask "Is it on me?" The dealer will indicate. Nobody minds!'}
          </div>
        `;
      }
    },

    {
      id: 'tourn-terms',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Términos Clave del Torneo' : 'Key Tournament Terms'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Estas son las palabras que escucharás en tu primer torneo:'
              : "These are the words you'll hear at your first tournament:"}
          </div>
          <div class="terms-list">
            ${[
              [es?'Bote (Pot)':'Pot', es?'El dinero total en la mesa que se puede ganar en esa mano.':'The total money on the table you can win in that hand.'],
              [es?'Stack':'Stack', es?'El total de fichas que tienes delante tuyo.':'Your total chip count in front of you.'],
              [es?'All-in':'All-in', es?'Apostar todas tus fichas. Si alguien iguala, habrá un "side pot" si quedan más jugadores.':'Betting all your chips. If called, a "side pot" is created if other players remain.'],
              [es?'Bubble':'Bubble', es?'El jugador que termina justo afuera del dinero. Muy dramático en torneos.':'The player who finishes just outside the money. Very dramatic in tournaments.'],
              [es?'UTG (Under the Gun)':'UTG (Under the Gun)', es?'Primera posición en actuar pre-flop (izq. de la ciega grande). La peor posición.':'First to act pre-flop (left of big blind). The worst position.'],
              [es?'Botón (Button)':'Button', es?'La mejor posición — actúas último en todas las rondas post-flop.':'Best position — you act last in all post-flop rounds.'],
              [es?'Showdown':'Showdown', es?'Cuando los jugadores muestran sus cartas al final para determinar el ganador.':'When players show their cards at the end to determine the winner.'],
              [es?'Muck':'Muck', es?'Tirar tus cartas boca abajo cuando te retiras o pierdes. Puedes pedir "ver" las cartas del perdedor.':'Throwing your cards face-down when folding or losing. You can ask to "see" the losing hand.'],
              [es?'Dealer\'s Choice':'Dealer\'s Choice', es?'No en torneos — siempre es Texas Hold\'em.':'Not in tournaments — it\'s always Texas Hold\'em.'],
              [es?'Re-buy':'Re-buy', es?'En algunos torneos puedes comprar más fichas si te quedas sin ellas en las primeras etapas.':'In some tournaments you can buy more chips if you bust out in early stages.'],
            ].map(([word, def]) => `
              <div class="term-item">
                <div class="term-word">${word}</div>
                <div class="term-def">${def}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
    },

    {
      id: 'tourn-firsttime',
      render(lang) {
        const es = lang === 'es';
        return `
          <h2 class="lesson-title">${es ? 'Tu Primer Torneo: Lo Que Debes Saber' : 'Your First Tournament: What to Expect'}</h2>
          <div class="lesson-body">
            ${es
              ? 'Cosas prácticas que nadie te dice hasta que llegas:'
              : 'Practical things nobody tells you until you show up:'}
          </div>
          <div class="etiquette-list">
            <div class="etiquette-item">
              <div class="etiquette-icon">🪑</div>
              <div class="etiquette-text">
                <h4>${es ? 'Llega a tiempo (o antes)' : 'Arrive on time (or early)'}</h4>
                <p>${es ? 'Los torneos empiezan con hora exacta. Si llegas tarde, tus fichas ya están en la mesa y las ciegas se te cobran aunque no estés.' : 'Tournaments start on time. If you\'re late, your chips are already at the table and blinds are posted for you anyway.'}</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">💳</div>
              <div class="etiquette-text">
                <h4>${es ? 'El buy-in y la inscripción' : 'Buy-in and registration'}</h4>
                <p>${es ? 'Paga el buy-in en el registro. Recibirás un asiento asignado al azar y tus fichas ya estarán en la mesa.' : 'Pay the buy-in at registration. You\'ll get a randomly assigned seat and your chips will already be there.'}</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">❓</div>
              <div class="etiquette-text">
                <h4>${es ? 'Pregunta sin miedo' : 'Ask freely'}</h4>
                <p>${es ? 'El crupier está para ayudarte. "¿Cuánto cuesta igualar?", "¿Es mi turno?", "¿Cuántas fichas tiene él?" son preguntas completamente válidas.' : 'The dealer is there to help. "How much to call?", "Is it my turn?", "How many chips does he have?" are all valid questions.'}</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">🎯</div>
              <div class="etiquette-text">
                <h4>${es ? 'Objetivo: Sobrevivir' : 'Goal: Survive'}</h4>
                <p>${es ? 'En tu primer torneo, el objetivo no es ganar — es terminar "en el dinero". Juega conservadoramente y observa.' : 'At your first tournament, the goal isn\'t to win — it\'s to finish "in the money." Play conservatively and observe.'}</p>
              </div>
            </div>
            <div class="etiquette-item">
              <div class="etiquette-icon">😊</div>
              <div class="etiquette-text">
                <h4>${es ? 'Todo el mundo empezó sin saber' : 'Everyone started not knowing'}</h4>
                <p>${es ? 'Los jugadores experimentados saben cómo es ser novato. La mayoría son amables. Si cometes un error, el crupier te corregirá gentilmente.' : 'Experienced players know what it\'s like to be new. Most are friendly. If you make a mistake, the dealer will gently correct you.'}</p>
              </div>
            </div>
          </div>
          <div class="pro-tip">
            ${es
              ? '¡Estás más preparado de lo que crees! Has aprendido la baraja, las manos, las reglas y la etiqueta. ¡Eso ya te pone por delante de muchos!'
              : "You're more prepared than you think! You've learned the deck, the hands, the rules, and etiquette. That already puts you ahead of many!"}
          </div>
        `;
      }
    }
  ]
};
