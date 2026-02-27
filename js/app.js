/* ============================================
   POKER TEACHER — Main App
   Navigation, progress, screen management
   ============================================ */

// ---- State ----
let currentLessonIndex = 0;
let completedLessons = new Set();

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
function loadLesson(index) {
  const lesson = getLessonByIndex(index);
  if (!lesson) {
    showScreen('complete');
    return;
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

// ---- Back Button ----
function goBack() {
  if (currentLessonIndex > 0) {
    loadLesson(currentLessonIndex - 1);
  } else {
    showScreen('welcome');
  }
}

// ---- Re-render current lesson (called on lang switch) ----
const App = {
  rerenderCurrent() {
    const screen = document.querySelector('.screen.active');
    if (!screen) return;
    const id = screen.id;
    if (id === 'screen-lesson') {
      loadLesson(currentLessonIndex);
    } else if (id === 'screen-quiz') {
      // Re-load quiz in new language, preserving the onComplete callback
      if (currentQuiz && currentQuiz.quizId) {
        loadQuiz(currentQuiz.quizId, currentQuiz.onComplete);
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
      loadLesson(startIndex);
    });
  }

  // Module jump buttons — tap a module tile to jump directly to its first lesson
  document.querySelectorAll('.module-jump').forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleIndex = parseInt(btn.getAttribute('data-module'), 10);
      // Find the first lesson belonging to this module
      const targetModule = ALL_MODULES[moduleIndex];
      if (!targetModule) return;
      const firstLessonId = targetModule.lessons[0].id;
      const lessonIndex = getLessonIndex(firstLessonId);
      if (lessonIndex >= 0) loadLesson(lessonIndex);
    });
  });

  // Back button
  const btnBack = document.getElementById('btn-back');
  if (btnBack) btnBack.addEventListener('click', goBack);

  // Home button
  const btnHome = document.getElementById('btn-home');
  if (btnHome) btnHome.addEventListener('click', () => showScreen('welcome'));

  // Restart button
  const btnRestart = document.getElementById('btn-restart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      completedLessons.clear();
      saveProgress();
      updateProgressBar();
      loadLesson(0);
    });
  }

  updateProgressBar();
  applyTranslations();
});
