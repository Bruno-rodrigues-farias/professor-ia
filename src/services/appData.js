import { apiFetch } from "./api";

export async function getProfile() {
  return apiFetch("/api/me");
}

export async function getTasks() {
  return apiFetch("/api/tasks");
}

export async function completeTaskBackend(taskId, xp) {
  return apiFetch(`/api/tasks/${taskId}/complete`, {
    method: "POST",
    body: JSON.stringify({ xp }),
  });
}

export async function saveTaskReview(taskId, data) {
  return apiFetch(`/api/tasks/${taskId}/review`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getTaskReviews() {
  return apiFetch("/api/tasks/reviews");
}

export async function completeLessonBackend(lessonId, xp) {
  return apiFetch(`/api/lessons/${lessonId}/complete`, {
    method: "POST",
    body: JSON.stringify({ xp }),
  });
}

export async function getRanking() {
  return apiFetch("/api/ranking");
}

export async function getConversations() {
  return apiFetch("/api/conversations");
}

export async function clearConversations() {
  return apiFetch("/api/conversations", {
    method: "DELETE",
  });
}