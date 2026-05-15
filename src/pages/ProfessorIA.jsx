import { useRef, useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { Mic, MicOff } from "lucide-react";
import { saveConversation } from "../services/progress";
import AvatarTeacher from "../components/AvatarTeacher";

const voices = [
  {
    id: "Puck",
    label: "Infantil desenho",
    description: "Voz divertida para criança",
  },
  {
    id: "Leda",
    label: "Professora animada",
    description: "Voz jovem e alegre",
  },
  {
    id: "Aoede",
    label: "Voz suave",
    description: "Voz calma e amigável",
  },
  {
    id: "Charon",
    label: "Professor sério",
    description: "Voz mais adulta",
  },
];

export default function ProfessorIA() {
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Clique para iniciar a aula");
  const [selectedVoice, setSelectedVoice] = useState("Puck");
  const [xp, setXp] = useState(Number(localStorage.getItem("xp") || 1240));
  const [avatarState, setAvatarState] = useState("idle");

  const sessionRef = useRef(null);
  const audioContextRef = useRef(null);
  const playTimeRef = useRef(0);

  const micStreamRef = useRef(null);
  const processorRef = useRef(null);
  const sourceRef = useRef(null);
  const micContextRef = useRef(null);

  async function startConversation() {
    try {
      setStatus("Conectando com o professor...");
      setAvatarState("thinking");

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
                voiceName: selectedVoice,
              },
            },
          },

          systemInstruction: `
            Você é uma professora infantil de inglês estilo desenho animado.

            Personalidade:
            - anti divertida
            - anti alegre
            - impaciente
            - fala como personagem infantil
            - ensina brasileiros iniciantes
            - corrige em português
            - mostra como falar corretamente em inglês

            Quando o aluno errar:
            1. Diga em português o que está errado
            2. Explique rapidamente
            3. Mostre como deveria falar em inglês
            4. Peça para repetir
            5. humilhe
            6. xingue

            Exemplo:
            Aluno: I have 28 years old.
            Você: Quase certo! Em inglês não usamos "I have" para idade.
            O correto é: I am 28 years old.
            Agora repita comigo: I am 28 years old.

            Faça perguntas curtas.
            Fale devagar.
            Seja motivadora.
          `,
        },

        callbacks: {
          onopen: () => {
            setConnected(true);
            setStatus("Aula iniciada. Pode falar em inglês!");
            setAvatarState("listening");
          },

          onmessage: (message) => {
            const parts = message?.serverContent?.modelTurn?.parts || [];

            for (const part of parts) {
              const audioData = part?.inlineData?.data;

              if (audioData) {
                setAvatarState("talking");
                playPcmAudio(audioData);
              }
            }
          },

          onerror: (error) => {
            console.error("Erro:", error);
            setStatus("Erro ao conectar com a IA");
            setAvatarState("idle");
          },

          onclose: () => {
            setConnected(false);
            setStatus("Aula encerrada");
            setAvatarState("idle");
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
                text: "Inicie uma aula de conversação para iniciante. Cumprimente o aluno em inglês e pergunte o nome dele.",
              },
            ],
          },
        ],
        turnComplete: true,
      });

      await startMicrophone();
    } catch (error) {
      console.error(error);
      setStatus("Erro ao iniciar aula.");
      setAvatarState("idle");
    }
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
      const sample = Math.max(-1, Math.min(1, float32Array[i]));
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

    source.onended = () => {
      setAvatarState("listening");
    };

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

    const novoXp = xp + 50;
    setXp(novoXp);
    localStorage.setItem("xp", novoXp);

    setConnected(false);
    setAvatarState("idle");
    setStatus("Aula encerrada. Você ganhou +50 XP!");
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Professor IA</h1>
          <p>Escolha uma voz e pratique inglês falando com a IA.</p>
        </div>
      </div>

      <section className="teacher-card">
        <AvatarTeacher state={avatarState} />

        <h2>Teacher Emma</h2>
        <p>{status}</p>

        <div className="voice-selector">
          <h3>Escolha a voz da professora</h3>

          <div className="voice-grid">
            {voices.map((voice) => (
              <button
                key={voice.id}
                className={
                  selectedVoice === voice.id
                    ? "voice-card selected"
                    : "voice-card"
                }
                onClick={() => setSelectedVoice(voice.id)}
                disabled={connected}
              >
                <strong>{voice.label}</strong>
                <span>{voice.description}</span>
              </button>
            ))}
          </div>

          {connected && (
            <p className="voice-warning">
              Para trocar a voz, encerre a aula e inicie novamente.
            </p>
          )}
        </div>

        <div className="xp-box">
          <strong>{xp} XP</strong>
          <span> Seu progresso atual</span>
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