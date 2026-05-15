import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY não encontrada. Verifique o arquivo .env");
}

const ai = new GoogleGenAI({
  apiKey,
});

function cleanJson(text) {
  return text
    .replace("```json", "")
    .replace("```", "")
    .trim();
}

export async function correctEnglishAnswer({ text, instruction, level }) {
  const prompt = `
Você é um professor de inglês para brasileiros.

Nível do aluno: ${level}
Tarefa: ${instruction}
Resposta do aluno: ${text}

Corrija em português.
Mostre como deveria falar em inglês.
Explique de forma curta.
Dê uma nota de 0 a 100.

Responda somente JSON válido:
{
  "score": 0,
  "correctionPt": "",
  "betterSentence": "",
  "explanation": ""
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return JSON.parse(cleanJson(response.text));
  } catch (error) {
    console.error(error);

    return {
      score: 70,
      correctionPt:
        "Não consegui analisar perfeitamente, mas tente revisar a estrutura da frase.",
      betterSentence: text,
      explanation:
        "Verifique gramática, ordem das palavras e pronúncia.",
    };
  }
}