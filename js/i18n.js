/* ============================================
   POKER TEACHER — i18n (English / Spanish)
   ============================================ */

const TRANSLATIONS = {
  en: {
    appTitle: 'PokerTeacher',

    // Welcome
    'welcome.title': 'Learn Poker from Zero',
    'welcome.subtitle': 'Everything you need to know before your first real tournament.',
    'welcome.mod1': 'The Deck',
    'welcome.mod2': 'Hand Rankings',
    'welcome.mod3': "Texas Hold'em",
    'welcome.mod4': 'Tournament Rules',
    'welcome.mod5': 'Starting Hands',
    'welcome.mod6': 'Board Possibilities',
    'welcome.start': "Let's Play →",
    'welcome.note': 'No experience needed. Tap through at your own pace.',

    // Buttons
    'btn.next': 'Next →',
    'btn.continue': 'Continue →',
    'btn.tryAgain': 'Try Again',

    // Quiz
    'quiz.badge': 'Quick Check',
    'quiz.correct': '✓ Correct!',
    'quiz.wrong': "Not quite — here's why:",
    'quiz.of': 'of',

    // Complete
    'complete.title': "You're Ready!",
    'complete.subtitle': 'You now know everything you need to sit down at your first tournament with confidence.',
    'complete.check1': 'The deck — 52 cards, suits & ranks',
    'complete.check2': 'All 10 hand rankings',
    'complete.check3': "Texas Hold'em — every street & bet",
    'complete.check4': 'Tournament rules & etiquette',
    'complete.restart': 'Study Again →',

    // Modules
    'module.deck': 'The Deck',
    'module.rankings': 'Hand Rankings',
    'module.holdem': "Texas Hold'em",
    'module.tournament': 'Tournament Rules',
    'module.starts': 'Starting Hands',
    'module.board': 'Board Possibilities',

    // Lesson labels
    'lesson.of': 'of',

    // Suits
    'suit.spades': 'Spades',
    'suit.hearts': 'Hearts',
    'suit.diamonds': 'Diamonds',
    'suit.clubs': 'Clubs',
    'suit.all': 'All',
  },

  es: {
    appTitle: 'PokerTeacher',

    // Welcome
    'welcome.title': 'Aprende Poker desde Cero',
    'welcome.subtitle': 'Todo lo que necesitas saber antes de tu primer torneo real.',
    'welcome.mod1': 'La Baraja',
    'welcome.mod2': 'Escalas de Manos',
    'welcome.mod3': 'Texas Hold\'em',
    'welcome.mod4': 'Reglas de Torneo',
    'welcome.mod5': 'Manos de Inicio',
    'welcome.mod6': 'Posibilidades del Tablero',
    'welcome.start': 'Empecemos →',
    'welcome.note': 'Sin experiencia necesaria. Ve a tu propio ritmo.',

    // Buttons
    'btn.next': 'Siguiente →',
    'btn.continue': 'Continuar →',
    'btn.tryAgain': 'Intentar de Nuevo',

    // Quiz
    'quiz.badge': 'Comprobación',
    'quiz.correct': '✓ ¡Correcto!',
    'quiz.wrong': 'No exactamente — aquí está el porqué:',
    'quiz.of': 'de',

    // Complete
    'complete.title': '¡Estás Listo!',
    'complete.subtitle': 'Ahora sabes todo lo necesario para sentarte en tu primer torneo con confianza.',
    'complete.check1': 'La baraja — 52 cartas, palos y valores',
    'complete.check2': 'Las 10 escalas de manos',
    'complete.check3': 'Texas Hold\'em — cada ronda y apuesta',
    'complete.check4': 'Reglas y etiqueta de torneo',
    'complete.restart': 'Estudiar de Nuevo →',

    // Modules
    'module.deck': 'La Baraja',
    'module.rankings': 'Escalas de Manos',
    'module.holdem': 'Texas Hold\'em',
    'module.tournament': 'Reglas de Torneo',
    'module.starts': 'Manos de Inicio',
    'module.board': 'Posibilidades del Tablero',

    // Lesson labels
    'lesson.of': 'de',

    // Suits
    'suit.spades': 'Picas',
    'suit.hearts': 'Corazones',
    'suit.diamonds': 'Diamantes',
    'suit.clubs': 'Tréboles',
    'suit.all': 'Todos',
  }
};

// ---- State ----
let currentLang = localStorage.getItem('pt_lang') || 'en';

function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('pt_lang', lang);
  applyTranslations();
  updateLangButton();
  // Re-render current lesson if app is running
  if (typeof App !== 'undefined' && App.rerenderCurrent) {
    App.rerenderCurrent();
  }
}

function toggleLang() {
  setLang(currentLang === 'en' ? 'es' : 'en');
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  // Update html lang attribute
  document.documentElement.lang = currentLang;
}

function updateLangButton() {
  const label = document.getElementById('lang-label');
  if (label) {
    label.textContent = currentLang === 'en' ? 'ES' : 'EN';
  }
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangButton();
  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
});
