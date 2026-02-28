/* ============================================
   POKER TEACHER — Main App
   Navigation, progress, screen management
   ============================================ */

// ---- State ----
let currentLessonIndex = 0;
let completedLessons = new Set();

// Navigation history stack.
// Each entry: { type: 'lesson', index: number }
//          or { type: 'quiz',   quizId: string, onComplete: fn }
// Push before navigating forward; pop to go back.
let navHistory = [];

// The lesson index where the user started this session
// (used so back doesn't go earlier than where they jumped in)
let sessionStartIndex = 0;

// Load saved progress
try {
  const saved = localStorage.getItem('pt_progress');
  if (saved) {
    const arr = JSON.parse(saved);
    completedLessons = new Set(arr);
  }
} catch(e) {}

// ---- Screen Management ----
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + name);
  if (el) el.classList.add('active');

  // Hide progress bar on welcome/home screen, show during lessons/quizzes
  const progressWrap = document.querySelector('.progress-bar-wrap');
  if (progressWrap) {
    progressWrap.style.display = (name === 'welcome') ? 'none' : '';
  }
}

// ---- Progress ----
function saveProgress() {
  localStorage.setItem('pt_progress', JSON.stringify([...completedLessons]));
}

function updateProgressBar() {
  // Show progress within the current module only
  const lesson = getLessonByIndex(currentLessonIndex);
  let pct = 0;
  if (lesson) {
    const mod = ALL_MODULES.find(m => m.id === lesson.moduleId);
    if (mod) {
      const modLessons = mod.lessons;
      const completedInMod = modLessons.filter(l => completedLessons.has(l.id)).length;
      pct = Math.round((completedInMod / modLessons.length) * 100);
    }
  }
  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = pct + '%';
}

// ---- Lesson Rendering ----
// pushHistory: when true, save current screen to history before navigating.
//              Set false when called from goBack() to avoid double-pushing.
function loadLesson(index, pushHistory = true) {
  const lesson = getLessonByIndex(index);
  if (!lesson) {
    if (pushHistory) navHistory.push({ type: 'complete' });
    showScreen('complete');
    return;
  }

  if (pushHistory) {
    navHistory.push({ type: 'lesson', index: currentLessonIndex });
  }

  currentLessonIndex = index;
  showScreen('lesson');

  // Module label
  const modLabel = document.getElementById('lesson-module-label');
  if (modLabel) modLabel.textContent = t(lesson.moduleLabelKey);

  // Counter
  const counter = document.getElementById('lesson-counter');
  if (counter) {
    counter.textContent = `${lesson.indexInModule + 1} / ${lesson.moduleSize}`;
  }

  // Content
  const content = document.getElementById('lesson-content');
  if (content) {
    content.innerHTML = lesson.render(currentLang);
    // Scroll to top
    content.scrollTop = 0;
    window.scrollTo(0, 0);
    // Run afterRender if exists
    if (lesson.afterRender) {
      setTimeout(() => lesson.afterRender(currentLang), 50);
    }
  }

  // Next button
  const btnNext = document.getElementById('btn-next');
  if (btnNext) {
    btnNext.textContent = t('btn.next');
    btnNext.onclick = () => advanceFromLesson(lesson, index);
  }

  updateProgressBar();
  updateBackButtons();
}

function advanceFromLesson(lesson, index) {
  // Mark lesson complete
  completedLessons.add(lesson.id);
  saveProgress();
  updateProgressBar();

  // If lesson has quizzes, chain them
  if (lesson.quizId && lesson.quizId2) {
    loadQuiz(lesson.quizId, () => {
      loadQuiz(lesson.quizId2, () => {
        loadLesson(index + 1);
      });
    });
  } else if (lesson.quizId) {
    loadQuiz(lesson.quizId, () => {
      loadLesson(index + 1);
    });
  } else {
    loadLesson(index + 1);
  }
}

// ---- Back Navigation ----
function goBack() {
  if (navHistory.length === 0) {
    showScreen('welcome');
    updateBackButtons();
    return;
  }

  const prev = navHistory.pop();

  if (prev.type === 'lesson') {
    // Navigate back to that lesson without pushing to history again
    if (prev.index < sessionStartIndex) {
      // Gone back past where user started — go home
      navHistory = [];
      showScreen('welcome');
      updateBackButtons();
    } else {
      currentLessonIndex = prev.index;
      loadLesson(prev.index, false);
    }
  } else if (prev.type === 'quiz') {
    // Re-show that quiz without pushing history
    loadQuizNoHistory(prev.quizId, prev.onComplete);
  } else if (prev.type === 'complete') {
    showScreen('complete');
    updateBackButtons();
  } else {
    showScreen('welcome');
    updateBackButtons();
  }
}

// Show/hide bottom back buttons based on whether there's history
function updateBackButtons() {
  const hasHistory = navHistory.length > 0;
  document.querySelectorAll('.btn-back-bottom').forEach(btn => {
    btn.style.display = hasHistory ? '' : 'none';
  });
}

// ---- Re-render current lesson (called on lang switch) ----
const App = {
  rerenderCurrent() {
    const screen = document.querySelector('.screen.active');
    if (!screen) return;
    const id = screen.id;
    if (id === 'screen-lesson') {
      loadLesson(currentLessonIndex, false);
    } else if (id === 'screen-quiz') {
      // Re-load quiz in new language, preserving the onComplete callback
      if (currentQuiz && currentQuiz.quizId) {
        loadQuizNoHistory(currentQuiz.quizId, currentQuiz.onComplete);
      }
    } else if (id === 'screen-welcome') {
      applyTranslations();
    } else if (id === 'screen-complete') {
      applyTranslations();
    }
  }
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Patch loadQuiz to push history before showing a quiz
  const _baseLoadQuiz = loadQuiz;
  window.loadQuiz = function(quizId, onComplete) {
    navHistory.push({ type: 'quiz', quizId, onComplete });
    _baseLoadQuiz(quizId, onComplete);
    updateBackButtons();
  };
  window.loadQuizNoHistory = function(quizId, onComplete) {
    _baseLoadQuiz(quizId, onComplete);
    updateBackButtons();
  };

  // Start button — resume from last uncompleted lesson
  const btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      let startIndex = 0;
      if (completedLessons.size > 0) {
        for (let i = 0; i < TOTAL_LESSONS; i++) {
          const lesson = getLessonByIndex(i);
          if (!completedLessons.has(lesson.id)) {
            startIndex = i;
            break;
          }
        }
      }
      navHistory = [];
      sessionStartIndex = startIndex;
      loadLesson(startIndex, false);
    });
  }

  // Module jump buttons — tap a module tile to jump directly to its first lesson
  document.querySelectorAll('.module-jump').forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleIndex = parseInt(btn.getAttribute('data-module'), 10);
      const targetModule = ALL_MODULES[moduleIndex];
      if (!targetModule) return;
      const firstLessonId = targetModule.lessons[0].id;
      const lessonIndex = getLessonIndex(firstLessonId);
      if (lessonIndex >= 0) {
        navHistory = [];
        sessionStartIndex = lessonIndex;
        loadLesson(lessonIndex, false);
      }
    });
  });

  // Top back button (header of lesson screen)
  const btnBack = document.getElementById('btn-back');
  if (btnBack) btnBack.addEventListener('click', goBack);

  // Bottom back buttons (lesson footer, quiz footer, complete screen)
  document.querySelectorAll('.btn-back-bottom').forEach(btn => {
    btn.addEventListener('click', goBack);
  });

  // Home button
  const btnHome = document.getElementById('btn-home');
  if (btnHome) btnHome.addEventListener('click', () => {
    navHistory = [];
    showScreen('welcome');
    updateBackButtons();
  });

  // Restart button
  const btnRestart = document.getElementById('btn-restart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      completedLessons.clear();
      saveProgress();
      updateProgressBar();
      navHistory = [];
      sessionStartIndex = 0;
      loadLesson(0, false);
    });
  }

  updateProgressBar();
  updateBackButtons();
  applyTranslations();

  // Hide progress bar on initial welcome screen
  const progressWrap = document.querySelector('.progress-bar-wrap');
  if (progressWrap) progressWrap.style.display = 'none';
});
