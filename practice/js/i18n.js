/* ============================================
   POKER TRAINER — i18n (English / Spanish)
   Practice modes translation infrastructure
   ============================================ */

const P_TRANSLATIONS = {
  en: {
    // ==================== HOME SCREEN ====================
    'home.title': '🃏 Poker Trainer',
    'home.tagline': 'Practice drills. Pick one and go.',
    'home.group.basics': '📚 Learn the Basics',
    'home.group.basics.desc': "Good if you're still learning hand rankings or want to sharpen recognition.",
    'home.group.board': '🎯 Board Reading',
    'home.group.board.desc': 'Train your eye to quickly read what a board means for draws and made hands.',
    'home.group.advanced': '🧮 Advanced',
    'home.group.advanced.desc': 'For when you want to think in numbers — outs, equity, and hand combos.',
    'home.backToLessons': '← Back to Lessons',
    'home.cardDesign': 'Card Design',

    // ==================== GAME NAMES & HINTS ====================
    'game.namehand': 'Name That Hand',
    'game.namehand.hint': 'Identify the hand type from 5–7 cards',
    'game.ranking': 'Rank the Hands',
    'game.ranking.hint': 'Order 4 hands from best to worst',
    'game.whichwins': 'Which Wins?',
    'game.whichwins.hint': 'Pick the winning hand on a given board',
    'game.pick5': 'Pick Best 5',
    'game.pick5.hint': 'Choose the best 5 from 7 cards',
    'game.findnuts': 'Find The Nuts',
    'game.findnuts.hint': "What's the best possible hand on this board?",
    'game.readboard': 'Read the Board',
    'game.readboard.hint': 'Answer quick YES/NO questions about board texture',
    'game.outs': 'Count Your Outs',
    'game.outs.hint': 'How many cards give you the winning hand?',
    'game.handstrength': 'Combo Counting',
    'game.handstrength.hint': 'How many opponent hands beat yours?',

    // ==================== MENU ITEMS ====================
    'menu.home': '🏠 Home',
    'menu.ranking': 'Hand Ranking',
    'menu.whichwins': 'Which Wins?',
    'menu.outs': 'Outs Counter',
    'menu.namehand': 'Name That Hand',
    'menu.pick5': 'Pick Best 5',
    'menu.findnuts': 'Find The Nuts',
    'menu.readboard': 'Read the Board',
    'menu.handstrength': 'Combo Counting',

    // ==================== COMMON ====================
    'common.board': 'Board',
    'common.check': 'Check',
    'common.clear': 'Clear',
    'common.correct': '✓ Correct!',
    'common.perfect': '✓ Perfect!',
    'common.hand': 'Hand',
    'common.yourHand': 'Your Hand',
    'common.opponent': 'Opponent',
    'common.flop': 'Flop',
    'common.turn': 'Turn',
    'common.river': 'River',
    'common.cards': 'Cards:',
    'common.yes': 'YES',
    'common.no': 'NO',

    // ==================== RANKING MODE ====================
    'ranking.title': 'Rank the Hands',
    'ranking.instruction': 'Tap hands from <strong>strongest</strong> to <strong>weakest</strong>',
    'ranking.instructionHint': 'Tap a selected hand to unselect it',
    'ranking.perfect': '✓ Perfect!',
    'ranking.notQuite': '✗ Not quite',
    'ranking.correctOrder': 'Correct Order:',
    'ranking.next': 'Next Hand →',

    // ==================== WHICH WINS MODE ====================
    'ww.title': 'Which Wins?',
    'ww.hand1': 'Hand 1',
    'ww.hand2': 'Hand 2',
    'ww.tie': 'Tie',
    'ww.correct': '✓ Correct!',
    'ww.answerTie': '✗ Answer: Tie',
    'ww.answerHand': '✗ Answer: Hand',
    'ww.next': 'Next Hand →',
    'ww.vs': 'VS',

    // ==================== OUTS MODE ====================
    'outs.title': 'Count Your Outs',
    'outs.explainer': '<strong style="color:var(--accent);">Outs</strong> are unseen cards that will improve your hand enough to win. Count how many cards in the deck would give you the best hand.',
    'outs.scenarioQuestion': 'How many outs to win?',
    'outs.inputPlaceholder': '?',
    'outs.inputLabel': 'outs',
    'outs.correct': '✓ Correct!',
    'outs.answer': '✗ Answer: {0} outs',
    'outs.noOuts': 'No outs - drawing dead',
    'outs.outCards': 'Out cards:',
    'outs.next': 'Next Scenario →',
    'outs.howMany': 'How many outs to win?',
    'outs.howManyOf': 'How many of the <strong>{0}</strong> remaining cards are outs?',
    'outs.explanationText': 'Out of <strong>{0}</strong> remaining cards,<br><strong>{1}</strong> ({2}%) give you the winning hand.',

    // ==================== NAME THAT HAND MODE ====================
    'nh.title': 'Name That Hand',
    'nh.question': "What's the best hand?",
    'nh.correct': '✓ Correct!',
    'nh.itsA': "✗ It's {0}",
    'nh.next': 'Next Hand →',

    // ==================== PICK 5 MODE ====================
    'p5.title': 'Pick Best 5',
    'p5.instruction': 'Select <strong>5 cards</strong> that make the best hand',
    'p5.selected': 'Selected:',
    'p5.yourHand': 'Your hand',
    'p5.bestHand': 'Best hand',
    'p5.perfect': '✓ Perfect!',
    'p5.notBest': '✗ Not the best hand',
    'p5.next': 'Next Hand →',

    // ==================== FIND THE NUTS MODE ====================
    'fn.title': 'Find The Nuts',
    'fn.instruction': 'Select the <strong>2 cards</strong> that make the nuts',
    'fn.note': "Any hand that can't be beaten counts ✓",
    'fn.selected': 'Selected:',
    'fn.boardLabel': 'Board:',
    'fn.foundNuts': '✓ You found the nuts!',
    'fn.notNuts': '✗ Not the nuts',
    'fn.theNuts': 'The Nuts',
    'fn.more': 'more',
    'fn.next': 'Next Board →',

    // ==================== READ THE BOARD MODE ====================
    'rb.title': 'Read the Board',
    'rb.boardLabel': 'Board:',
    'rb.checkAnswers': 'Check Answers',
    'rb.perfect': '✓ Perfect! 3/3',
    'rb.score': '✗ {0}/3 correct',
    'rb.next': 'Next Board →',

    // Read Board Questions
    'rb.q.flush_possible': 'Is a flush possible?',
    'rb.q.straight_possible': 'Is a straight possible?',
    'rb.q.board_paired': 'Is the board paired?',
    'rb.q.trips_on_board': 'Are there trips on the board?',
    'rb.q.four_flush': 'Is there a four-flush on board?',
    'rb.q.four_straight': 'Are there 4 to a straight on board?',
    'rb.q.quads_possible': 'Could someone have quads?',
    'rb.q.rainbow': 'Is this a rainbow board?',
    'rb.q.monotone': 'Is this a monotone board?',
    'rb.q.three_straight': 'Are there 3+ connected cards?',
    'rb.q.disconnected': 'Is the board disconnected?',
    'rb.q.ace_on_board': 'Is there an Ace on the board?',
    'rb.q.broadway_cards': 'Are there any Broadway cards?',
    'rb.q.low_board': 'Are all cards 8 or below?',
    'rb.q.high_board': 'Are all cards 9 or higher?',
    'rb.q.straight_flush_possible': 'Could the nuts be a straight flush?',
    'rb.q.wheel_possible': 'Is a wheel (A-2-3-4-5) possible?',
    'rb.q.broadway_straight_possible': 'Is Broadway (A-K-Q-J-T) possible?',
    'rb.q.playing_the_board': 'Could someone play the board?',
    'rb.q.flush_draw_possible': 'Is a flush draw possible?',
    'rb.q.oesd_possible': 'Is an open-ended straight draw possible?',
    'rb.q.two_pair_board': 'Are there two pairs on the board?',
    'rb.q.full_house_possible': 'Is a full house possible?',

    // Read Board Explanations
    'rb.e.flush_possible_yes': '<strong>{0}</strong> cards are {1} ({2}) — a player holding two more {2} makes a flush.',
    'rb.e.flush_possible_no': 'No suit has 3+ cards (max is <strong>{0}</strong>). A flush needs 5 of the same suit.',
    'rb.e.straight_possible_yes': '<strong>{0}</strong> fit in a straight window — only <strong>{1}</strong> more card(s) needed from hole cards.',
    'rb.e.straight_possible_no': 'No 3+ board cards fit within a 5-card straight window.',
    'rb.e.board_paired_yes': 'The board has a pair of <strong>{0}</strong>s.',
    'rb.e.board_paired_no': 'All ranks are different — no pair on the board.',
    'rb.e.trips_on_board_yes': 'Three <strong>{0}</strong>s are on the board.',
    'rb.e.trips_on_board_no': 'No rank appears 3 times (max is <strong>{0}</strong> of a kind).',
    'rb.e.four_flush_yes': '<strong>{0}</strong> cards are {1} ({2}) — that\'s a four-flush.',
    'rb.e.four_flush_no': 'No suit has 4+ cards (max is <strong>{0}</strong>).',
    'rb.e.four_straight_yes': '<strong>{0}</strong> fit in a 5-card straight window — 4 to a straight.',
    'rb.e.four_straight_no': 'No 4 board cards fit within a single 5-card straight window.',
    'rb.e.quads_possible_yes': 'Board has a pair of <strong>{0}</strong>s — someone holding the other two has quads.',
    'rb.e.quads_possible_no': 'No pairs on the board — quads require at least a pair.',
    'rb.e.rainbow_yes': '<strong>{0}</strong> different suits — each card is a different suit (rainbow).',
    'rb.e.rainbow_no': 'Not rainbow — <strong>{0}</strong> share a suit.',
    'rb.e.monotone_yes': 'All cards are {0} ({1}) — monotone board.',
    'rb.e.monotone_no': '<strong>{0}</strong> different suits on board ({1}) — not monotone.',
    'rb.e.three_straight_yes': '<strong>{0}</strong> are consecutive (connected).',
    'rb.e.three_straight_no': 'No 3 cards are consecutive in rank.',
    'rb.e.disconnected_yes': 'All cards are 4+ ranks apart — fully disconnected.',
    'rb.e.disconnected_no': '<strong>{0}</strong> and <strong>{1}</strong> are only <strong>{2}</strong> rank(s) apart — not disconnected.',
    'rb.e.ace_on_board_yes': '<strong>{0}</strong> is on the board.',
    'rb.e.ace_on_board_no': 'No Ace on the board.',
    'rb.e.broadway_cards_yes': 'Broadway cards (T-A): <strong>{0}</strong>.',
    'rb.e.broadway_cards_no': 'No cards are T or higher — no Broadway cards.',
    'rb.e.low_board_yes': 'Highest card is <strong>{0}</strong> — all 8 or below.',
    'rb.e.low_board_no': '<strong>{0}</strong> is above 8.',
    'rb.e.high_board_yes': 'Lowest card is <strong>{0}</strong> — all 9 or higher.',
    'rb.e.high_board_no': '<strong>{0}</strong> is below 9.',
    'rb.e.straight_flush_possible_yes': '<strong>{0}</strong> suited cards ({1}) fit in a straight window — straight flush possible.',
    'rb.e.straight_flush_possible_no': 'No 3+ suited cards fit within a 5-card straight window.',
    'rb.e.wheel_possible_yes': '<strong>{0}</strong> of the 5 wheel cards (A-2-3-4-5) are on board: <strong>{1}</strong>. Only need {2} more.',
    'rb.e.wheel_possible_no': 'Only <strong>{0}</strong> wheel cards (A-2-3-4-5) on board — need at least 3.',
    'rb.e.broadway_straight_yes': '<strong>{0}</strong> of 5 Broadway straight cards (A-K-Q-J-T) on board: <strong>{1}</strong>.',
    'rb.e.broadway_straight_no': 'Only <strong>{0}</strong> Broadway straight cards (A-K-Q-J-T) — need at least 3.',
    'rb.e.playing_the_board': 'On the river (5 cards), any player can use all 5 board cards as their hand.',
    'rb.e.flush_draw_possible_yes': '<strong>{0}</strong> cards are {1} — a player with one more has a flush draw.',
    'rb.e.flush_draw_possible_no': 'No suit appears twice — no flush draw possible.',
    'rb.e.oesd_possible_yes': 'Board cards create a window where a player could have an open-ended straight draw.',
    'rb.e.oesd_possible_no': 'Cards are too spread out for an open-ended straight draw.',
    'rb.e.two_pair_board_yes': 'Board has pairs of <strong>{0}</strong> — two pairs on board.',
    'rb.e.two_pair_board_no': 'Only <strong>{0}</strong> pair(s) on board — need 2 for two pair.',
    'rb.e.full_house_possible_paired': 'Board is paired (<strong>{0}</strong>) — someone can make a full house.',
    'rb.e.full_house_possible_generic': 'With 3+ board cards, a player can use pocket pairs + board cards to make a full house.',
    'rb.e.full_house_possible_no': 'Not enough board cards for a full house to be possible.',

    // ==================== HAND STRENGTH / COMBO COUNTING ====================
    'hs.title': 'Combo Counting',
    'hs.question': 'How many of the <strong>{0}</strong> possible opponent hands beat you?',
    'hs.correct': '✓ Correct!',
    'hs.wrong': '✗ {0} hands beat you',
    'hs.explanationText': 'Out of <strong>{0}</strong> possible opponent hands,<br><strong>{1}</strong> ({2}%) beat your hand.',
    'hs.beatingHeader': 'Hands that beat you (strongest → weakest):',
    'hs.combo': 'combo',
    'hs.combos': 'combos',
    'hs.moreCombos': '+{0} more',
    'hs.noBeats': '🎉 You have the nuts! No hand beats you.',
    'hs.next': 'Next Hand →',

    // ==================== HAND NAMES ====================
    'hand.highCard': 'High Card',
    'hand.pair': 'Pair',
    'hand.twoPair': 'Two Pair',
    'hand.threeOfAKind': 'Three of a Kind',
    'hand.straight': 'Straight',
    'hand.flush': 'Flush',
    'hand.fullHouse': 'Full House',
    'hand.fourOfAKind': 'Four of a Kind',
    'hand.straightFlush': 'Straight Flush',
    'hand.royalFlush': 'Royal Flush',

    // ==================== HAND DESCRIPTIONS ====================
    'desc.royalFlush': 'Royal Flush',
    'desc.straightFlush': '{0}-high Straight Flush',
    'desc.quads': 'Quad {0}s',
    'desc.fullHouse': '{0}s full of {1}s',
    'desc.flush': '{0}-high Flush',
    'desc.straight': '{0}-high Straight',
    'desc.trips': 'Trip {0}s',
    'desc.twoPair': '{0}s and {1}s',
    'desc.pair': 'Pair of {0}s',
    'desc.highCard': '{0} High',
    'desc.steelWheel': 'Steel Wheel',
    'desc.wheel': 'Wheel',

    // ==================== RANK NAMES ====================
    'rank.14': 'Ace',
    'rank.13': 'King',
    'rank.12': 'Queen',
    'rank.11': 'Jack',
    'rank.10': 'Ten',
    'rank.9': 'Nine',
    'rank.8': 'Eight',
    'rank.7': 'Seven',
    'rank.6': 'Six',
    'rank.5': 'Five',
    'rank.4': 'Four',
    'rank.3': 'Three',
    'rank.2': 'Two',
  },

  es: {
    // ==================== HOME SCREEN ====================
    'home.title': '🃏 Poker Trainer',
    'home.tagline': 'Ejercicios de práctica. Elige uno y empieza.',
    'home.group.basics': '📚 Aprende lo Básico',
    'home.group.basics.desc': 'Ideal si aún estás aprendiendo las manos o quieres mejorar tu reconocimiento.',
    'home.group.board': '🎯 Lectura del Tablero',
    'home.group.board.desc': 'Entrena tu ojo para leer rápidamente qué significa un tablero para proyectos y manos hechas.',
    'home.group.advanced': '🧮 Avanzado',
    'home.group.advanced.desc': 'Para cuando quieras pensar en números — outs, equidad y combinaciones.',
    'home.backToLessons': '← Volver a Lecciones',
    'home.cardDesign': 'Diseño de Cartas',

    // ==================== GAME NAMES & HINTS ====================
    'game.namehand': 'Nombra la Mano',
    'game.namehand.hint': 'Identifica el tipo de mano con 5–7 cartas',
    'game.ranking': 'Ordena las Manos',
    'game.ranking.hint': 'Ordena 4 manos de mejor a peor',
    'game.whichwins': '¿Cuál Gana?',
    'game.whichwins.hint': 'Elige la mano ganadora en un tablero dado',
    'game.pick5': 'Elige las Mejor 5',
    'game.pick5.hint': 'Elige las mejores 5 de 7 cartas',
    'game.findnuts': 'Encuentra los Nuts',
    'game.findnuts.hint': '¿Cuál es la mejor mano posible en este tablero?',
    'game.readboard': 'Lee el Tablero',
    'game.readboard.hint': 'Responde preguntas rápidas SÍ/NO sobre la textura del tablero',
    'game.outs': 'Cuenta tus Outs',
    'game.outs.hint': '¿Cuántas cartas te dan la mano ganadora?',
    'game.handstrength': 'Conteo de Combos',
    'game.handstrength.hint': '¿Cuántas manos del oponente te ganan?',

    // ==================== MENU ITEMS ====================
    'menu.home': '🏠 Inicio',
    'menu.ranking': 'Ranking de Manos',
    'menu.whichwins': '¿Cuál Gana?',
    'menu.outs': 'Contador de Outs',
    'menu.namehand': 'Nombra la Mano',
    'menu.pick5': 'Elige las Mejor 5',
    'menu.findnuts': 'Encuentra los Nuts',
    'menu.readboard': 'Lee el Tablero',
    'menu.handstrength': 'Conteo de Combos',

    // ==================== COMMON ====================
    'common.board': 'Tablero',
    'common.check': 'Verificar',
    'common.clear': 'Limpiar',
    'common.correct': '✓ ¡Correcto!',
    'common.perfect': '✓ ¡Perfecto!',
    'common.hand': 'Mano',
    'common.yourHand': 'Tu Mano',
    'common.opponent': 'Oponente',
    'common.flop': 'Flop',
    'common.turn': 'Turn',
    'common.river': 'River',
    'common.cards': 'Cartas:',
    'common.yes': 'SÍ',
    'common.no': 'NO',

    // ==================== RANKING MODE ====================
    'ranking.title': 'Ordena las Manos',
    'ranking.instruction': 'Toca las manos de la <strong>más fuerte</strong> a la <strong>más débil</strong>',
    'ranking.instructionHint': 'Toca una mano seleccionada para deseleccionarla',
    'ranking.perfect': '✓ ¡Perfecto!',
    'ranking.notQuite': '✗ No del todo',
    'ranking.correctOrder': 'Orden correcto:',
    'ranking.next': 'Siguiente Mano →',

    // ==================== WHICH WINS MODE ====================
    'ww.title': '¿Cuál Gana?',
    'ww.hand1': 'Mano 1',
    'ww.hand2': 'Mano 2',
    'ww.tie': 'Empate',
    'ww.correct': '✓ ¡Correcto!',
    'ww.answerTie': '✗ Respuesta: Empate',
    'ww.answerHand': '✗ Respuesta: Mano',
    'ww.next': 'Siguiente Mano →',
    'ww.vs': 'VS',

    // ==================== OUTS MODE ====================
    'outs.title': 'Cuenta tus Outs',
    'outs.explainer': 'Los <strong style="color:var(--accent);">Outs</strong> son cartas no vistas que mejorarán tu mano lo suficiente para ganar. Cuenta cuántas cartas del mazo te darían la mejor mano.',
    'outs.scenarioQuestion': '¿Cuántos outs para ganar?',
    'outs.inputPlaceholder': '?',
    'outs.inputLabel': 'outs',
    'outs.correct': '✓ ¡Correcto!',
    'outs.answer': '✗ Respuesta: {0} outs',
    'outs.noOuts': 'Sin outs - sin posibilidad',
    'outs.outCards': 'Cartas de salida:',
    'outs.next': 'Siguiente Escenario →',
    'outs.howMany': '¿Cuántos outs para ganar?',
    'outs.howManyOf': '¿Cuántas de las <strong>{0}</strong> cartas restantes son outs?',
    'outs.explanationText': 'De <strong>{0}</strong> cartas restantes,<br><strong>{1}</strong> ({2}%) te dan la mano ganadora.',

    // ==================== NAME THAT HAND MODE ====================
    'nh.title': 'Nombra la Mano',
    'nh.question': '¿Cuál es la mejor mano?',
    'nh.correct': '✓ ¡Correcto!',
    'nh.itsA': '✗ Es {0}',
    'nh.next': 'Siguiente Mano →',

    // ==================== PICK 5 MODE ====================
    'p5.title': 'Elige las Mejor 5',
    'p5.instruction': 'Selecciona <strong>5 cartas</strong> que formen la mejor mano',
    'p5.selected': 'Seleccionadas:',
    'p5.yourHand': 'Tu mano',
    'p5.bestHand': 'Mejor mano',
    'p5.perfect': '✓ ¡Perfecto!',
    'p5.notBest': '✗ No es la mejor mano',
    'p5.next': 'Siguiente Mano →',

    // ==================== FIND THE NUTS MODE ====================
    'fn.title': 'Encuentra los Nuts',
    'fn.instruction': 'Selecciona las <strong>2 cartas</strong> que formen los nuts',
    'fn.note': 'Cualquier mano imbatible cuenta ✓',
    'fn.selected': 'Seleccionadas:',
    'fn.boardLabel': 'Tablero:',
    'fn.foundNuts': '✓ ¡Encontraste los nuts!',
    'fn.notNuts': '✗ No son los nuts',
    'fn.theNuts': 'Los Nuts',
    'fn.more': 'más',
    'fn.next': 'Siguiente Tablero →',

    // ==================== READ THE BOARD MODE ====================
    'rb.title': 'Lee el Tablero',
    'rb.boardLabel': 'Tablero:',
    'rb.checkAnswers': 'Verificar Respuestas',
    'rb.perfect': '✓ ¡Perfecto! 3/3',
    'rb.score': '✗ {0}/3 correctas',
    'rb.next': 'Siguiente Tablero →',

    // Read Board Questions
    'rb.q.flush_possible': '¿Es posible un color (flush)?',
    'rb.q.straight_possible': '¿Es posible una escalera?',
    'rb.q.board_paired': '¿El tablero tiene pareja?',
    'rb.q.trips_on_board': '¿Hay trío en el tablero?',
    'rb.q.four_flush': '¿Hay cuatro cartas del mismo palo?',
    'rb.q.four_straight': '¿Hay 4 cartas para escalera?',
    'rb.q.quads_possible': '¿Alguien podría tener póker (quads)?',
    'rb.q.rainbow': '¿Es un tablero arcoíris?',
    'rb.q.monotone': '¿Es un tablero monotono?',
    'rb.q.three_straight': '¿Hay 3+ cartas conectadas?',
    'rb.q.disconnected': '¿El tablero está desconectado?',
    'rb.q.ace_on_board': '¿Hay un As en el tablero?',
    'rb.q.broadway_cards': '¿Hay cartas Broadway?',
    'rb.q.low_board': '¿Todas las cartas son 8 o menos?',
    'rb.q.high_board': '¿Todas las cartas son 9 o más?',
    'rb.q.straight_flush_possible': '¿Podrían los nuts ser escalera de color?',
    'rb.q.wheel_possible': '¿Es posible una rueda (A-2-3-4-5)?',
    'rb.q.broadway_straight_possible': '¿Es posible Broadway (A-K-Q-J-T)?',
    'rb.q.playing_the_board': '¿Alguien podría jugar el tablero?',
    'rb.q.flush_draw_possible': '¿Es posible un proyecto de color?',
    'rb.q.oesd_possible': '¿Es posible un proyecto de escalera abierta?',
    'rb.q.two_pair_board': '¿Hay dos parejas en el tablero?',
    'rb.q.full_house_possible': '¿Es posible un full house?',

    // Read Board Explanations
    'rb.e.flush_possible_yes': '<strong>{0}</strong> cartas son {1} ({2}) — un jugador con dos más de {2} hace color.',
    'rb.e.flush_possible_no': 'Ningún palo tiene 3+ cartas (máximo <strong>{0}</strong>). Un color necesita 5 del mismo palo.',
    'rb.e.straight_possible_yes': '<strong>{0}</strong> encajan en una ventana de escalera — solo faltan <strong>{1}</strong> carta(s) de las hole cards.',
    'rb.e.straight_possible_no': 'No hay 3+ cartas del tablero que encajen en una ventana de escalera de 5.',
    'rb.e.board_paired_yes': 'El tablero tiene un par de <strong>{0}</strong>.',
    'rb.e.board_paired_no': 'Todos los rangos son diferentes — no hay pareja en el tablero.',
    'rb.e.trips_on_board_yes': 'Tres <strong>{0}</strong> están en el tablero.',
    'rb.e.trips_on_board_no': 'Ningún rango aparece 3 veces (máximo <strong>{0}</strong> iguales).',
    'rb.e.four_flush_yes': '<strong>{0}</strong> cartas son {1} ({2}) — eso es un four-flush.',
    'rb.e.four_flush_no': 'Ningún palo tiene 4+ cartas (máximo <strong>{0}</strong>).',
    'rb.e.four_straight_yes': '<strong>{0}</strong> encajan en una ventana de escalera — 4 para escalera.',
    'rb.e.four_straight_no': 'No hay 4 cartas que encajen en una ventana de escalera de 5.',
    'rb.e.quads_possible_yes': 'El tablero tiene par de <strong>{0}</strong> — alguien con las otras dos tiene póker.',
    'rb.e.quads_possible_no': 'No hay parejas en el tablero — el póker requiere al menos una pareja.',
    'rb.e.rainbow_yes': '<strong>{0}</strong> palos diferentes — cada carta es de un palo distinto (arcoíris).',
    'rb.e.rainbow_no': 'No es arcoíris — <strong>{0}</strong> comparten palo.',
    'rb.e.monotone_yes': 'Todas las cartas son {0} ({1}) — tablero monotono.',
    'rb.e.monotone_no': '<strong>{0}</strong> palos diferentes en el tablero ({1}) — no es monotono.',
    'rb.e.three_straight_yes': '<strong>{0}</strong> son consecutivas (conectadas).',
    'rb.e.three_straight_no': 'No hay 3 cartas consecutivas en rango.',
    'rb.e.disconnected_yes': 'Todas las cartas están a 4+ rangos de distancia — completamente desconectado.',
    'rb.e.disconnected_no': '<strong>{0}</strong> y <strong>{1}</strong> están a solo <strong>{2}</strong> rango(s) — no está desconectado.',
    'rb.e.ace_on_board_yes': '<strong>{0}</strong> está en el tablero.',
    'rb.e.ace_on_board_no': 'No hay As en el tablero.',
    'rb.e.broadway_cards_yes': 'Cartas Broadway (T-A): <strong>{0}</strong>.',
    'rb.e.broadway_cards_no': 'No hay cartas T o superiores — sin cartas Broadway.',
    'rb.e.low_board_yes': 'La carta más alta es <strong>{0}</strong> — todas son 8 o menos.',
    'rb.e.low_board_no': '<strong>{0}</strong> es mayor que 8.',
    'rb.e.high_board_yes': 'La carta más baja es <strong>{0}</strong> — todas son 9 o más.',
    'rb.e.high_board_no': '<strong>{0}</strong> es menor que 9.',
    'rb.e.straight_flush_possible_yes': '<strong>{0}</strong> cartas del mismo palo ({1}) encajan en una ventana de escalera — escalera de color posible.',
    'rb.e.straight_flush_possible_no': 'No hay 3+ cartas del mismo palo que encajen en una ventana de escalera.',
    'rb.e.wheel_possible_yes': '<strong>{0}</strong> de las 5 cartas de rueda (A-2-3-4-5) están en el tablero: <strong>{1}</strong>. Solo faltan {2}.',
    'rb.e.wheel_possible_no': 'Solo <strong>{0}</strong> cartas de rueda (A-2-3-4-5) en el tablero — se necesitan al menos 3.',
    'rb.e.broadway_straight_yes': '<strong>{0}</strong> de 5 cartas Broadway (A-K-Q-J-T) en el tablero: <strong>{1}</strong>.',
    'rb.e.broadway_straight_no': 'Solo <strong>{0}</strong> cartas Broadway (A-K-Q-J-T) — se necesitan al menos 3.',
    'rb.e.playing_the_board': 'En el river (5 cartas), cualquier jugador puede usar las 5 cartas del tablero como su mano.',
    'rb.e.flush_draw_possible_yes': '<strong>{0}</strong> cartas son {1} — un jugador con una más tiene proyecto de color.',
    'rb.e.flush_draw_possible_no': 'Ningún palo aparece dos veces — no hay proyecto de color posible.',
    'rb.e.oesd_possible_yes': 'Las cartas del tablero crean una ventana donde un jugador podría tener proyecto de escalera abierta.',
    'rb.e.oesd_possible_no': 'Las cartas están muy separadas para un proyecto de escalera abierta.',
    'rb.e.two_pair_board_yes': 'El tablero tiene parejas de <strong>{0}</strong> — dos parejas en el tablero.',
    'rb.e.two_pair_board_no': 'Solo <strong>{0}</strong> pareja(s) en el tablero — se necesitan 2 para doble pareja.',
    'rb.e.full_house_possible_paired': 'El tablero tiene pareja (<strong>{0}</strong>) — alguien puede hacer full house.',
    'rb.e.full_house_possible_generic': 'Con 3+ cartas en el tablero, un jugador puede usar parejas de mano + cartas del tablero para hacer full house.',
    'rb.e.full_house_possible_no': 'No hay suficientes cartas en el tablero para que un full house sea posible.',

    // ==================== HAND STRENGTH / COMBO COUNTING ====================
    'hs.title': 'Conteo de Combos',
    'hs.question': '¿Cuántas de las <strong>{0}</strong> manos posibles del oponente te ganan?',
    'hs.correct': '✓ ¡Correcto!',
    'hs.wrong': '✗ {0} manos te ganan',
    'hs.explanationText': 'De <strong>{0}</strong> manos posibles del oponente,<br><strong>{1}</strong> ({2}%) ganan a tu mano.',
    'hs.beatingHeader': 'Manos que te ganan (más fuerte → más débil):',
    'hs.combo': 'combo',
    'hs.combos': 'combos',
    'hs.moreCombos': '+{0} más',
    'hs.noBeats': '🎉 ¡Tienes los nuts! Ninguna mano te gana.',
    'hs.next': 'Siguiente Mano →',

    // ==================== HAND NAMES ====================
    'hand.highCard': 'Carta Alta',
    'hand.pair': 'Pareja',
    'hand.twoPair': 'Doble Pareja',
    'hand.threeOfAKind': 'Trío',
    'hand.straight': 'Escalera',
    'hand.flush': 'Color',
    'hand.fullHouse': 'Full House',
    'hand.fourOfAKind': 'Póker',
    'hand.straightFlush': 'Escalera de Color',
    'hand.royalFlush': 'Escalera Real',

    // ==================== HAND DESCRIPTIONS ====================
    'desc.royalFlush': 'Escalera Real',
    'desc.straightFlush': 'Escalera de Color al {0}',
    'desc.quads': 'Póker de {0}s',
    'desc.fullHouse': 'Full de {0}s con {1}s',
    'desc.flush': 'Color al {0}',
    'desc.straight': 'Escalera al {0}',
    'desc.trips': 'Trío de {0}s',
    'desc.twoPair': '{0}s y {1}s',
    'desc.pair': 'Pareja de {0}s',
    'desc.highCard': '{0} Alta',
    'desc.steelWheel': 'Rueda de Acero',
    'desc.wheel': 'Rueda',

    // ==================== RANK NAMES ====================
    'rank.14': 'As',
    'rank.13': 'Rey',
    'rank.12': 'Reina',
    'rank.11': 'Jota',
    'rank.10': 'Diez',
    'rank.9': 'Nueve',
    'rank.8': 'Ocho',
    'rank.7': 'Siete',
    'rank.6': 'Seis',
    'rank.5': 'Cinco',
    'rank.4': 'Cuatro',
    'rank.3': 'Tres',
    'rank.2': 'Dos',
  }
};

// ---- State ----
let pCurrentLang = localStorage.getItem('pt_lang') || 'en';

/** Get translation by key. Supports {0}, {1}... placeholders. */
function pt(key, ...args) {
  const dict = P_TRANSLATIONS[pCurrentLang] || P_TRANSLATIONS.en;
  let str = dict[key] || P_TRANSLATIONS.en[key] || key;
  // Replace {0}, {1}, etc. with args
  args.forEach((arg, i) => {
    str = str.replace(`{${i}}`, arg);
  });
  return str;
}

function pSetLang(lang) {
  pCurrentLang = lang;
  localStorage.setItem('pt_lang', lang);
  pApplyTranslations();
  pUpdateLangButton();
  // Re-render current mode if applicable
  if (typeof pReRenderCurrentMode === 'function') {
    pReRenderCurrentMode();
  }
}

function pToggleLang() {
  pSetLang(pCurrentLang === 'en' ? 'es' : 'en');
}

/** Apply translations to all elements with data-pt attribute */
function pApplyTranslations() {
  document.querySelectorAll('[data-pt]').forEach(el => {
    const key = el.getAttribute('data-pt');
    const translation = pt(key);
    // If translation contains HTML tags, use innerHTML; otherwise textContent
    if (translation.includes('<') && translation.includes('>')) {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });
  document.documentElement.lang = pCurrentLang;
}

function pUpdateLangButton() {
  const label = document.getElementById('p-lang-label');
  if (label) {
    label.textContent = pCurrentLang === 'en' ? 'ES' : 'EN';
  }
}

/** Called after mode switch to re-apply static translations */
function pReRenderCurrentMode() {
  pApplyTranslations();
  // Mode-specific re-render handled by switchMode calling newRound etc.
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  pApplyTranslations();
  pUpdateLangButton();
  const langBtn = document.getElementById('p-lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', pToggleLang);
  }
});
