/* ============================================
   POKER TEACHER — Quiz Engine
   ============================================ */

/**
 * Quiz data — all questions in both languages.
 * Each quiz is attached to a lesson by lessonId.
 *
 * question: string key or fn(lang) => string
 * options: array of {text, correct, explanation}
 */
const QUIZZES = {

  // ---- Module 1: The Deck ----

  'deck-suits': {
    en: {
      question: 'How many suits are in a standard deck of cards?',
      options: [
        { text: '3', correct: false, explanation: 'Close — but there are actually 4 suits: ♠ ♥ ♦ ♣' },
        { text: '4', correct: true, explanation: 'Exactly! Spades, Hearts, Diamonds, and Clubs.' },
        { text: '5', correct: false, explanation: 'Nope — 4 suits: ♠ ♥ ♦ ♣' },
        { text: '6', correct: false, explanation: 'Nope — 4 suits: ♠ ♥ ♦ ♣' },
      ]
    },
    es: {
      question: '¿Cuántos palos tiene una baraja estándar de cartas?',
      options: [
        { text: '3', correct: false, explanation: 'Cerca — pero hay 4 palos: ♠ ♥ ♦ ♣' },
        { text: '4', correct: true, explanation: '¡Exacto! Picas, Corazones, Diamantes y Tréboles.' },
        { text: '5', correct: false, explanation: 'No — 4 palos: ♠ ♥ ♦ ♣' },
        { text: '6', correct: false, explanation: 'No — 4 palos: ♠ ♥ ♦ ♣' },
      ]
    }
  },

  'deck-total': {
    en: {
      question: 'How many total cards are in a standard poker deck?',
      options: [
        { text: '48', correct: false, explanation: 'That would be missing 4 cards. A full deck has 52 cards.' },
        { text: '52', correct: true, explanation: '52 cards: 13 ranks × 4 suits = 52.' },
        { text: '54', correct: false, explanation: 'Close — but standard poker decks have 52 cards (no jokers).' },
        { text: '56', correct: false, explanation: 'Nope — it\'s 52 cards: 13 ranks × 4 suits.' },
      ]
    },
    es: {
      question: '¿Cuántas cartas tiene una baraja estándar de poker?',
      options: [
        { text: '48', correct: false, explanation: 'Faltan 4 cartas. Una baraja completa tiene 52.' },
        { text: '52', correct: true, explanation: '52 cartas: 13 valores × 4 palos = 52.' },
        { text: '54', correct: false, explanation: 'Casi — pero en poker se usan 52 cartas (sin comodines).' },
        { text: '56', correct: false, explanation: 'No — son 52 cartas: 13 valores × 4 palos.' },
      ]
    }
  },

  'deck-ace': {
    en: {
      question: 'In poker, what is the Ace\'s special power?',
      options: [
        { text: 'It can only be used as the highest card', correct: false, explanation: 'The Ace is special because it works BOTH ways — high AND low.' },
        { text: 'It can be used as the highest OR lowest card', correct: true, explanation: 'Right! A-K-Q-J-10 is the highest straight. A-2-3-4-5 is the lowest.' },
        { text: 'It beats every other card automatically', correct: false, explanation: 'An Ace is high — but a pair of 2s beats a single Ace.' },
        { text: 'It has no special power', correct: false, explanation: 'The Ace is the most versatile card — it plays both high and low in straights.' },
      ]
    },
    es: {
      question: '¿Cuál es el poder especial del As en el poker?',
      options: [
        { text: 'Solo se puede usar como la carta más alta', correct: false, explanation: 'El As es especial porque funciona en ambos sentidos — alto Y bajo.' },
        { text: 'Se puede usar como la carta más alta O más baja', correct: true, explanation: '¡Correcto! A-K-Q-J-10 es la escalera más alta. A-2-3-4-5 es la más baja.' },
        { text: 'Vence automáticamente a todas las demás cartas', correct: false, explanation: 'El As es alto — pero una pareja de 2s vence a un solo As.' },
        { text: 'No tiene ningún poder especial', correct: false, explanation: 'El As es la carta más versátil — juega como alto y bajo en escaleras.' },
      ]
    }
  },

  // ---- Module 2: Hand Rankings ----

  'rank-royal-flush': {
    en: {
      question: 'What is the BEST possible hand in poker?',
      options: [
        { text: 'Four of a Kind', correct: false, explanation: 'Four of a Kind is very strong — but the Royal Flush beats it.' },
        { text: 'Straight Flush', correct: false, explanation: 'A Straight Flush is incredible — but a Royal Flush (A-K-Q-J-10 suited) is the best.' },
        { text: 'Royal Flush', correct: true, explanation: 'A Royal Flush: A-K-Q-J-10 all in the same suit. Unbeatable.' },
        { text: 'Full House', correct: false, explanation: 'Full House is great, but Royal Flush, Straight Flush, and Four of a Kind all beat it.' },
      ]
    },
    es: {
      question: '¿Cuál es la MEJOR mano posible en el poker?',
      options: [
        { text: 'Póker (cuatro iguales)', correct: false, explanation: 'El póker es muy fuerte — pero la Escalera Real lo vence.' },
        { text: 'Escalera de Color', correct: false, explanation: 'La Escalera de Color es increíble — pero la Escalera Real (A-K-Q-J-10 del mismo palo) es la mejor.' },
        { text: 'Escalera Real', correct: true, explanation: 'La Escalera Real: A-K-Q-J-10 del mismo palo. Imbatible.' },
        { text: 'Full (Full House)', correct: false, explanation: 'El Full es excelente, pero la Escalera Real, la Escalera de Color y el Póker lo vencen.' },
      ]
    }
  },

  'rank-flush-vs-straight': {
    en: {
      question: 'Which hand ranks HIGHER: a Flush or a Straight?',
      options: [
        { text: 'Straight', correct: false, explanation: 'A Flush beats a Straight. Same suit > same sequence.' },
        { text: 'Flush', correct: true, explanation: 'Correct! Flush (#5) beats Straight (#6). It\'s harder to hit 5 cards of the same suit.' },
        { text: 'They are equal', correct: false, explanation: 'They\'re not equal — Flush ranks above Straight.' },
      ]
    },
    es: {
      question: '¿Qué mano es MEJOR: un Color o una Escalera?',
      options: [
        { text: 'Escalera', correct: false, explanation: 'El Color vence a la Escalera. Mismo palo > misma secuencia.' },
        { text: 'Color', correct: true, explanation: '¡Correcto! El Color (#5) vence a la Escalera (#6). Es más difícil conseguir 5 cartas del mismo palo.' },
        { text: 'Son iguales', correct: false, explanation: 'No son iguales — el Color está por encima de la Escalera.' },
      ]
    }
  },

  'rank-two-pair': {
    en: {
      question: 'You have two pairs: Aces & Kings. Your opponent has three 2s (Three of a Kind). Who wins?',
      options: [
        { text: 'You win — two pairs is two pairs', correct: false, explanation: 'Surprise: Three of a Kind beats Two Pair! Three of a Kind ranks #7, Two Pair ranks #8.' },
        { text: 'Your opponent wins — Three of a Kind beats Two Pair', correct: true, explanation: 'Correct! Three 2s beats two Aces and two Kings. This surprises a lot of beginners.' },
        { text: 'The higher pair wins — you win', correct: false, explanation: 'Hand rankings beat individual card values. Three of a Kind always beats Two Pair.' },
      ]
    },
    es: {
      question: 'Tienes dos pares: Ases y Reyes. Tu oponente tiene tres 2s (Trío). ¿Quién gana?',
      options: [
        { text: 'Tú ganas — dos pares son dos pares', correct: false, explanation: 'Sorpresa: ¡El Trío vence a los Dos Pares! El Trío es #7, los Dos Pares son #8.' },
        { text: 'Tu oponente gana — el Trío vence a los Dos Pares', correct: true, explanation: '¡Correcto! Tres 2s vencen a dos Ases y dos Reyes. Esto sorprende a muchos principiantes.' },
        { text: 'Gana la pareja más alta — tú ganas', correct: false, explanation: 'Las escalas de manos superan a los valores individuales. El Trío siempre vence a los Dos Pares.' },
      ]
    }
  },

  'rank-kicker': {
    en: {
      question: 'Both players have a pair of Kings. Player A also has an Ace. Player B has a Queen as their next highest card. Who wins?',
      options: [
        { text: 'It\'s a tie', correct: false, explanation: 'Not a tie! The "kicker" decides it. Player A\'s Ace kicker beats Player B\'s Queen kicker.' },
        { text: 'Player A wins — the Ace kicker wins', correct: true, explanation: 'Exactly! When hands tie on rank, the highest remaining card (kicker) decides the winner.' },
        { text: 'Player B wins — Queens beat Aces in ties', correct: false, explanation: 'No — Ace is higher than Queen. Player A\'s Ace kicker wins.' },
      ]
    },
    es: {
      question: 'Ambos jugadores tienen una pareja de Reyes. El Jugador A también tiene un As. El Jugador B tiene una Reina como su siguiente carta más alta. ¿Quién gana?',
      options: [
        { text: 'Empate', correct: false, explanation: '¡No hay empate! El "kicker" lo decide. El As del Jugador A vence a la Reina del Jugador B.' },
        { text: 'Gana el Jugador A — el kicker As gana', correct: true, explanation: '¡Exacto! Cuando las manos empatan en rango, la carta más alta restante (kicker) decide al ganador.' },
        { text: 'Gana el Jugador B — las Reinas vencen a los Ases en empates', correct: false, explanation: 'No — el As es mayor que la Reina. El kicker As del Jugador A gana.' },
      ]
    }
  },

  // ---- Module 3: Texas Hold'em ----

  'holdem-community': {
    en: {
      question: 'In Texas Hold\'em, how many community cards are dealt in total?',
      options: [
        { text: '3', correct: false, explanation: 'That\'s just the Flop. There are 5 community cards total: Flop (3) + Turn (1) + River (1).' },
        { text: '4', correct: false, explanation: 'Almost — there are 5 community cards: 3 on the Flop, then 1 on the Turn, then 1 on the River.' },
        { text: '5', correct: true, explanation: 'Correct! Flop (3 cards) + Turn (1 card) + River (1 card) = 5 community cards.' },
        { text: '6', correct: false, explanation: '5 community cards total: Flop (3) + Turn (1) + River (1).' },
      ]
    },
    es: {
      question: 'En el Texas Hold\'em, ¿cuántas cartas comunitarias se reparten en total?',
      options: [
        { text: '3', correct: false, explanation: 'Eso es solo el Flop. Hay 5 cartas comunitarias en total: Flop (3) + Turn (1) + River (1).' },
        { text: '4', correct: false, explanation: 'Casi — hay 5 cartas comunitarias: 3 en el Flop, luego 1 en el Turn, luego 1 en el River.' },
        { text: '5', correct: true, explanation: '¡Correcto! Flop (3 cartas) + Turn (1 carta) + River (1 carta) = 5 cartas comunitarias.' },
        { text: '6', correct: false, explanation: '5 cartas comunitarias en total: Flop (3) + Turn (1) + River (1).' },
      ]
    }
  },

  'holdem-best-hand': {
    en: {
      question: 'In Texas Hold\'em, how many cards can you use to make your final hand?',
      options: [
        { text: 'You must use both hole cards', correct: false, explanation: 'You can use 0, 1, or 2 of your hole cards — whatever makes the best 5-card hand from all 7.' },
        { text: 'You must use exactly 1 hole card', correct: false, explanation: 'You can use 0, 1, or 2 hole cards — whatever makes the best 5 from 7 available.' },
        { text: 'You pick the best 5 cards from your 2 hole cards + 5 community cards', correct: true, explanation: 'Correct! You have 7 cards and pick the best 5-card combo. You can even use all 5 community cards.' },
        { text: 'You can only use community cards', correct: false, explanation: 'You use the best 5 from 7: your 2 hole cards + the 5 community cards.' },
      ]
    },
    es: {
      question: 'En el Texas Hold\'em, ¿cuántas cartas puedes usar para hacer tu mano final?',
      options: [
        { text: 'Debes usar ambas cartas privadas', correct: false, explanation: 'Puedes usar 0, 1 o 2 de tus cartas privadas — lo que dé la mejor mano de 5 cartas de las 7 disponibles.' },
        { text: 'Debes usar exactamente 1 carta privada', correct: false, explanation: 'Puedes usar 0, 1 o 2 cartas privadas — lo que dé la mejor mano de 5 entre 7.' },
        { text: 'Eliges las mejores 5 cartas de tus 2 privadas + 5 comunitarias', correct: true, explanation: '¡Correcto! Tienes 7 cartas y eliges la mejor combinación de 5. Incluso puedes usar las 5 cartas comunitarias.' },
        { text: 'Solo puedes usar las cartas comunitarias', correct: false, explanation: 'Usas las mejores 5 de 7: tus 2 cartas privadas + las 5 comunitarias.' },
      ]
    }
  },

  'holdem-betting-options': {
    en: {
      question: 'When it\'s your turn to act and nobody has bet yet, which option is NOT available to you?',
      options: [
        { text: 'Check', correct: false, explanation: 'Check IS available when nobody has bet — it\'s your "I\'ll stay in for free" move.' },
        { text: 'Bet', correct: false, explanation: 'Bet IS available — you can put the first chips in.' },
        { text: 'Fold', correct: false, explanation: 'You can always Fold — though there\'s no reason to fold for free.' },
        { text: 'Call', correct: true, explanation: 'Correct! You can\'t Call if nobody has bet yet. Call means matching someone else\'s bet.' },
      ]
    },
    es: {
      question: 'Cuando es tu turno y nadie ha apostado todavía, ¿qué opción NO está disponible?',
      options: [
        { text: 'Pasar (Check)', correct: false, explanation: 'Pasar SÍ está disponible cuando nadie ha apostado — es tu movimiento de "me quedo gratis".' },
        { text: 'Apostar (Bet)', correct: false, explanation: 'Apostar SÍ está disponible — puedes poner las primeras fichas.' },
        { text: 'Retirarse (Fold)', correct: false, explanation: 'Siempre puedes retirarte — aunque no tiene sentido hacerlo gratis.' },
        { text: 'Igualar (Call)', correct: true, explanation: '¡Correcto! No puedes igualar si nadie ha apostado todavía. Igualar significa emparejar la apuesta de alguien.' },
      ]
    }
  },

  'holdem-blinds': {
    en: {
      question: 'Why do blinds exist in Texas Hold\'em?',
      options: [
        { text: 'To punish bad players', correct: false, explanation: 'Blinds aren\'t punishment — they create forced action so every hand has something to play for.' },
        { text: 'To create forced bets so every hand has money in the pot to fight for', correct: true, explanation: 'Exactly! Without blinds, everyone could just wait for perfect cards. Blinds keep the game moving.' },
        { text: 'Only the dealer pays blinds', correct: false, explanation: 'Two players post blinds each hand — the Small Blind (left of dealer) and Big Blind (two left).' },
        { text: 'Blinds replace the ante in tournaments', correct: false, explanation: 'Some tournaments have both blinds AND antes. Blinds create action regardless.' },
      ]
    },
    es: {
      question: '¿Por qué existen las ciegas en el Texas Hold\'em?',
      options: [
        { text: 'Para castigar a los malos jugadores', correct: false, explanation: 'Las ciegas no son un castigo — crean acción forzada para que cada mano tenga algo por lo que pelear.' },
        { text: 'Para crear apuestas forzadas y que siempre haya dinero en el bote', correct: true, explanation: '¡Exacto! Sin ciegas, todos esperarían cartas perfectas. Las ciegas mantienen el juego activo.' },
        { text: 'Solo el croupier paga las ciegas', correct: false, explanation: 'Dos jugadores pagan ciegas cada mano — la Ciega Pequeña (izq. del dealer) y la Ciega Grande (dos a la izq.).' },
        { text: 'Las ciegas reemplazan al ante en los torneos', correct: false, explanation: 'Algunos torneos tienen tanto ciegas como ante. Las ciegas crean acción independientemente.' },
      ]
    }
  },

  // ---- Module 4: Tournament ----

  'tourn-chips': {
    en: {
      question: 'In a poker tournament, what do your chips represent?',
      options: [
        { text: 'Real money — you can cash them out anytime', correct: false, explanation: 'Tournament chips have no cash value! You only win real money by finishing in a paid position (the "money").' },
        { text: 'Tournament points only — no cash value during play', correct: true, explanation: 'Correct! Tournament chips keep score. Cash comes from finishing well, not from chip count.' },
        { text: 'Your current prize money', correct: false, explanation: 'Not quite — chip count doesn\'t equal prize money. You need to survive until the paid positions.' },
        { text: 'Your buy-in amount', correct: false, explanation: 'Everyone starts with the same chips regardless of buy-in. Chips are just score, not money.' },
      ]
    },
    es: {
      question: 'En un torneo de poker, ¿qué representan tus fichas?',
      options: [
        { text: 'Dinero real — puedes cobrarlas en cualquier momento', correct: false, explanation: '¡Las fichas de torneo no tienen valor en efectivo! Solo ganas dinero real al terminar en una posición pagada.' },
        { text: 'Solo puntos del torneo — sin valor en efectivo durante el juego', correct: true, explanation: '¡Correcto! Las fichas llevan la puntuación. El dinero viene de terminar bien, no del conteo de fichas.' },
        { text: 'Tu dinero de premio actual', correct: false, explanation: 'El conteo de fichas no equivale a dinero de premio. Necesitas sobrevivir hasta las posiciones pagadas.' },
        { text: 'Tu cantidad de inscripción', correct: false, explanation: 'Todos empiezan con las mismas fichas independientemente de la inscripción. Las fichas son solo puntuación.' },
      ]
    }
  },

  'tourn-etiquette': {
    en: {
      question: 'You say "I raise" at the table. Then you change your mind and say "Actually, I\'ll just call." What happens?',
      options: [
        { text: 'That\'s fine — you can change your mind before putting chips in', correct: false, explanation: 'Nope! Verbal declarations are binding. "I raise" means you must raise.' },
        { text: 'You must raise — verbal declarations are binding', correct: true, explanation: 'Correct! Once you say it, you\'re committed. This protects other players from being misled.' },
        { text: 'The dealer decides what happens', correct: false, explanation: 'The rule is clear — verbal declarations bind you to that action. The dealer will enforce it.' },
        { text: 'You can change your mind once per hand', correct: false, explanation: 'There\'s no "one free change" rule. Verbal declarations are always binding.' },
      ]
    },
    es: {
      question: 'Dices "subo" en la mesa. Luego cambias de opinión y dices "en realidad, solo voy a igualar." ¿Qué pasa?',
      options: [
        { text: 'Está bien — puedes cambiar de opinión antes de poner las fichas', correct: false, explanation: '¡No! Las declaraciones verbales son vinculantes. "Subo" significa que debes subir.' },
        { text: 'Debes subir — las declaraciones verbales son vinculantes', correct: true, explanation: '¡Correcto! Una vez que lo dices, estás comprometido. Esto protege a otros jugadores de ser engañados.' },
        { text: 'El croupier decide qué pasa', correct: false, explanation: 'La regla es clara — las declaraciones verbales te comprometen a esa acción. El croupier la hará cumplir.' },
        { text: 'Puedes cambiar de opinión una vez por mano', correct: false, explanation: 'No existe una regla de "un cambio gratis". Las declaraciones verbales siempre son vinculantes.' },
      ]
    }
  },

  'tourn-act-turn': {
    en: {
      question: 'The player to your right is still thinking. You can see your cards are great. What should you do?',
      options: [
        { text: 'Go ahead and raise — everyone will know you\'re strong anyway', correct: false, explanation: 'Wait your turn! Acting out of turn gives away information and is bad etiquette (and against the rules).' },
        { text: 'Silently move your chips forward to "reserve" your action', correct: false, explanation: 'Don\'t do this — it\'s acting out of turn and can influence the player who\'s still deciding.' },
        { text: 'Wait patiently for your turn', correct: true, explanation: 'Correct! Always wait for the action to reach you. Acting out of turn is a rules violation and bad etiquette.' },
        { text: 'Tell the dealer you want to raise', correct: false, explanation: 'Wait your turn. Announcing your action early influences other players — that\'s not fair.' },
      ]
    },
    es: {
      question: 'El jugador a tu derecha todavía está pensando. Puedes ver que tus cartas son excelentes. ¿Qué debes hacer?',
      options: [
        { text: 'Sube de inmediato — todos sabrán que eres fuerte de todas formas', correct: false, explanation: '¡Espera tu turno! Actuar fuera de turno revela información y es mala etiqueta (y contra las reglas).' },
        { text: 'Mueve tus fichas hacia adelante en silencio para "reservar" tu acción', correct: false, explanation: 'No hagas esto — es actuar fuera de turno y puede influir en el jugador que aún está decidiendo.' },
        { text: 'Espera pacientemente tu turno', correct: true, explanation: '¡Correcto! Siempre espera a que la acción llegue a ti. Actuar fuera de turno es una violación de las reglas y mala etiqueta.' },
        { text: 'Dile al croupier que quieres subir', correct: false, explanation: 'Espera tu turno. Anunciar tu acción antes influye en otros jugadores — eso no es justo.' },
      ]
    }
  },
};

// ---- Quiz Engine State ----
let currentQuiz = null;
let quizAnswered = false;

function loadQuiz(quizId, onComplete) {
  const quiz = QUIZZES[quizId];
  if (!quiz) {
    console.warn('Quiz not found:', quizId);
    onComplete();
    return;
  }

  const lang = currentLang;
  const data = quiz[lang] || quiz.en;
  // Store quizId so we can re-render on language switch
  currentQuiz = { quizId, data, onComplete, answered: false };
  quizAnswered = false;

  showScreen('quiz');

  const content = document.getElementById('quiz-content');
  const feedback = document.getElementById('quiz-feedback');
  const btnNext = document.getElementById('btn-quiz-next');
  const counter = document.getElementById('quiz-counter');

  feedback.textContent = '';
  feedback.className = 'quiz-feedback';
  btnNext.classList.add('hidden');
  counter.textContent = '';

  // Build quiz HTML
  const optionsHtml = data.options.map((opt, i) =>
    `<button class="quiz-option" data-index="${i}">${opt.text}</button>`
  ).join('');

  content.innerHTML = `
    <div class="quiz-question">${data.question}</div>
    <div class="quiz-options">${optionsHtml}</div>
  `;

  // Attach handlers
  content.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.addEventListener('click', () => handleQuizAnswer(i, data));
  });

  btnNext.onclick = () => {
    if (currentQuiz && currentQuiz.onComplete) {
      currentQuiz.onComplete();
    }
  };
}

function handleQuizAnswer(index, data) {
  if (quizAnswered) return;
  quizAnswered = true;

  const options = document.querySelectorAll('.quiz-option');
  const chosen = data.options[index];
  const feedback = document.getElementById('quiz-feedback');
  const btnNext = document.getElementById('btn-quiz-next');

  // Disable all options
  options.forEach(btn => btn.classList.add('disabled'));

  // Mark correct/wrong
  data.options.forEach((opt, i) => {
    if (opt.correct) {
      options[i].classList.add('correct');
    } else if (i === index && !opt.correct) {
      options[i].classList.add('wrong');
    }
  });

  if (chosen.correct) {
    feedback.textContent = t('quiz.correct');
    feedback.className = 'quiz-feedback correct';
  } else {
    feedback.innerHTML = `${t('quiz.wrong')} <em>${chosen.explanation}</em>`;
    feedback.className = 'quiz-feedback wrong';
  }

  btnNext.classList.remove('hidden');
  btnNext.textContent = t('btn.continue');

  // Scroll to feedback
  setTimeout(() => {
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}
