import { getToken } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export async function correctAudioWithAI({ audioBlob, expected, level }) {
  const formData = new FormData();

  formData.append("audio", audioBlob, "audio.webm");
  formData.append("expected", expected);
  formData.append("level", level);

  const response = await fetch(`${API_URL}/api/audio/corrigir`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao corrigir áudio.");
  }

  return response.json();
}