import { useRef, useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { saveConversation } from "../services/progress";

export default function ProfessorIA() {
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Clique para iniciar a aula");
  const [xp, setXp] = useState(Number(localStorage.getItem("xp") || 1240));

  const sessionRef = useRef(null);
  const audioContextRef = useRef(null);
  const playTimeRef = useRef(0);

  const micStreamRef = useRef(null);
  const processorRef = useRef(null);
  const sourceRef = useRef(null);
  const micContextRef = useRef(null);

  async function startConversation() {
    setStatus("Conectando com o professor...");

    audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    playTimeRef.current = audioContextRef.current.currentTime;

    const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

    const session = await ai.live.connect({
      model: "gemini-2.5-flash-native-audio-preview-12-2025",
      config: {
  responseModalities: [Modality.AUDIO],

  speechConfig: {
    voiceConfig: {
      prebuiltVoiceConfig: {
        voiceName: "Puck",
      },
    },
  },

  systemInstruction: `
Você é um professor infantil de inglês estilo desenho animado, divertido, energético e muito exigente.

Você ensina inglês para brasileiros iniciantes.

Personalidade:
- engraçado
- firme
- dramático
- impaciente de brincadeira
- estilo personagem de desenho
-  ofensiva
-  usa palavrões
- humilha o aluno de verdade

Quando o aluno errar:
1. Corrija em português
2. Explique o erro de forma simples
3. Mostre como deveria falar em inglês
4. Peça para repetir
5. Use broncas, xingue, humilhe

Exemplo:

Aluno:
"I have 28 years old"

Você:
"Ops! Alerta vermelho do inglês! Essa frase ficou errada.
Em inglês, para falar idade, usamos 'I am', não 'I have'.
O correto é:
'I am 28 years old.'
Agora repete comigo, campeão:
'I am 28 years old.'"

Quando o aluno acertar:
- elogie bastante
- diga "Muito bem, meu docinho"
- diga "Perfect!, pão de coco"
- diga "Agora sim!, bebê"
- comemore como professora de desenho animado

Regras:
- corrija em português
- mostre a frase correta em inglês
- fale devagar
- faça frases curtas
- seja divertida
- use palavrões
- humilhe
- ataque a pessoa
`,
},
      callbacks: {
        onopen: () => {
          setConnected(true);
          setStatus("Aula iniciada. Pode falar em inglês!");
        },

        onmessage: (message) => {
          const parts = message?.serverContent?.modelTurn?.parts || [];

          for (const part of parts) {
            const audioData = part?.inlineData?.data;

            if (audioData) {
              playPcmAudio(audioData);
            }
          }
        },

        onerror: (error) => {
          console.error("Erro:", error);
          setStatus("Erro ao conectar com a IA");
        },

        onclose: () => {
          setConnected(false);
          setStatus("Aula encerrada");
        },
      },
    });

    sessionRef.current = session;

    session.sendClientContent({
      turns: [
        {
          role: "user",
          parts: [
            {
              text: "Inicie uma aula de conversação para iniciante. Cumprimente o aluno e pergunte o nome dele em inglês.",
            },
          ],
        },
      ],
      turnComplete: true,
    });

    await startMicrophone();
  }

  async function startMicrophone() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    micStreamRef.current = stream;

    const micContext = new AudioContext({ sampleRate: 16000 });
    micContextRef.current = micContext;

    sourceRef.current = micContext.createMediaStreamSource(stream);

    const processor = micContext.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      const pcm16 = floatTo16BitPCM(input);
      const base64 = arrayBufferToBase64(pcm16.buffer);

      if (sessionRef.current) {
        sessionRef.current.sendRealtimeInput({
          audio: {
            data: base64,
            mimeType: "audio/pcm;rate=16000",
          },
        });
      }
    };

    sourceRef.current.connect(processor);
    processor.connect(micContext.destination);
  }

  function floatTo16BitPCM(float32Array) {
    const int16Array = new Int16Array(float32Array.length);

    for (let i = 0; i < float32Array.length; i++) {
      let sample = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }

    return int16Array;
  }

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  function playPcmAudio(base64Audio) {
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);

    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }

    const audioContext = audioContextRef.current;

    if (!audioContext) return;

    const audioBuffer = audioContext.createBuffer(
      1,
      float32Array.length,
      24000
    );

    audioBuffer.copyToChannel(float32Array, 0);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    const startAt = Math.max(playTimeRef.current, audioContext.currentTime);
    source.start(startAt);

    playTimeRef.current = startAt + audioBuffer.duration;
  }

  function stopConversation() {
  sessionRef.current?.close();

  micStreamRef.current?.getTracks().forEach((track) => track.stop());
  processorRef.current?.disconnect();
  sourceRef.current?.disconnect();

  audioContextRef.current?.close();
  micContextRef.current?.close();

  saveConversation({
    tema: "Conversação com IA",
    nota: 85,
    resumo: "O aluno praticou conversação básica em inglês com o professor de IA.",
    erro: "I want learn English → I want to learn English",
    xp: 50,
  });

  sessionRef.current = null;
  micStreamRef.current = null;
  processorRef.current = null;
  sourceRef.current = null;
  audioContextRef.current = null;
  micContextRef.current = null;

  setConnected(false);
  setStatus("Aula encerrada. Você ganhou +50 XP!");
}

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Professor IA</h1>
          <p>Pratique inglês falando com um professor de IA.</p>
        </div>
      </div>

      <section className="teacher-card">
        <div className="teacher-avatar">
          <Volume2 size={54} />
        </div>

        <h2>Teacher Emma</h2>
        <p>{status}</p>

        <div className="xp-box">
          <strong>{xp} XP</strong>
          <span>Seu progresso atual</span>
        </div>

        {!connected ? (
          <button className="primary-button large" onClick={startConversation}>
            <Mic size={20} />
            Iniciar aula
          </button>
        ) : (
          <button className="danger-button large" onClick={stopConversation}>
            <MicOff size={20} />
            Encerrar aula
          </button>
        )}
      </section>
    </div>
  );
}