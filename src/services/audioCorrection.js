import { getToken } from "./api";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://professor-ia-1.onrender.com";

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

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Resposta inválida do backend:", text);
    throw new Error("Backend não respondeu JSON.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao corrigir áudio.");
  }

  return data;
}