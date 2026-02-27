/* ============================================
   POKER TEACHER — Lesson Registry
   Assembles all modules into a flat lesson list
   ============================================ */

const ALL_MODULES = [
  MODULE_DECK,
  MODULE_RANKINGS,
  MODULE_HOLDEM,
  MODULE_TOURNAMENT,
  MODULE_STARTS,
];

// Flat list of all lessons with module info attached
const ALL_LESSONS = [];
ALL_MODULES.forEach(mod => {
  mod.lessons.forEach((lesson, idx) => {
    ALL_LESSONS.push({
      ...lesson,
      moduleId: mod.id,
      moduleLabelKey: mod.labelKey,
      indexInModule: idx,
      moduleSize: mod.lessons.length,
    });
  });
});

const TOTAL_LESSONS = ALL_LESSONS.length;

function getLessonByIndex(i) {
  return ALL_LESSONS[i] || null;
}

function getLessonIndex(id) {
  return ALL_LESSONS.findIndex(l => l.id === id);
}
