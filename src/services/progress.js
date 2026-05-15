const STORAGE_KEY = "english_mentor_progress";

const initialProgress = {
  nome: "Bruno",
  xp: 1240,
  streak: 5,
  lastStudyDate: null,
  aulasConcluidas: 12,
  palavrasAprendidas: 86,
  completedTasks: [],
  completedLessons: [],
  achievements: ["first_lesson"],
  conversations: [],
  reviewItems: [],
};

export function getProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return initialProgress;

  try {
    const parsed = JSON.parse(saved);

    return {
      ...initialProgress,
      ...parsed,
      completedTasks: parsed.completedTasks || [],
      completedLessons: parsed.completedLessons || [],
      achievements: parsed.achievements || [],
      conversations: parsed.conversations || [],
      reviewItems: parsed.reviewItems || [],
    };
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLevel(xp) {
  if (xp >= 5000) return "Fluent Hero";
  if (xp >= 3500) return "Advanced Learner";
  if (xp >= 2500) return "Confident Speaker";
  if (xp >= 1600) return "Communicator";
  if (xp >= 900) return "Explorer";
  if (xp >= 400) return "Basic Speaker";
  return "Beginner";
}

export function getRank(xp) {
  if (xp >= 5000) return "Master";
  if (xp >= 3500) return "Diamond";
  if (xp >= 2500) return "Platinum";
  if (xp >= 1600) return "Gold";
  if (xp >= 900) return "Silver";
  return "Bronze";
}

export function completeTask(taskId, xp) {
  const progress = getProgress();

  if (!progress.completedTasks.includes(taskId)) {
    progress.completedTasks.push(taskId);
    progress.xp += xp;
    progress.lastStudyDate = new Date().toISOString();
  }

  if (progress.completedTasks.length >= 3 && !progress.achievements.includes("daily_master")) {
    progress.achievements.push("daily_master");
  }

  saveProgress(progress);
  return progress;
}

export function completeLesson(lessonId, xp = 80) {
  const progress = getProgress();

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.aulasConcluidas += 1;
    progress.xp += xp;
    progress.lastStudyDate = new Date().toISOString();
  }

  saveProgress(progress);
  return progress;
}

export function addReviewItem(item) {
  const progress = getProgress();

  progress.reviewItems.unshift({
    id: Date.now(),
    data: new Date().toLocaleDateString("pt-BR"),
    ...item,
  });

  saveProgress(progress);
  return progress;
}

export function saveConversation(conversation) {
  const progress = getProgress();

  progress.conversations.unshift({
    id: Date.now(),
    data: new Date().toLocaleDateString("pt-BR"),
    ...conversation,
  });

  progress.aulasConcluidas += 1;
  progress.xp += conversation.xp || 50;
  progress.lastStudyDate = new Date().toISOString();

  if (!progress.achievements.includes("first_lesson")) {
    progress.achievements.push("first_lesson");
  }

  if (progress.conversations.length >= 5 && !progress.achievements.includes("five_conversations")) {
    progress.achievements.push("five_conversations");
  }

  saveProgress(progress);
  return progress;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}