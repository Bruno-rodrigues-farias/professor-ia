import { useRef, useState } from "react";
import { Mic, Square, Send, RefreshCw } from "lucide-react";
import { dailyTasks, levels } from "../data/mock";
import { correctEnglishAnswer } from "../services/aiCorrection";
import { completeTask, getProgress } from "../services/progress";

export default function TarefasDiarias() {
  const [level, setLevel] = useState("Iniciante");
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [progress, setProgress] = useState(getProgress());
  const [loadingTask, setLoadingTask] = useState(null);
  const [taskVersion, setTaskVersion] = useState(0);
  const [recordingTaskId, setRecordingTaskId] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("");

  const recognitionRef = useRef(null);

  const tasks = dailyTasks
    .filter((task) => task.level === level)
    .slice(taskVersion, taskVersion + 3);

  function updateTasks() {
    const levelTasks = dailyTasks.filter((task) => task.level === level);
    const next = taskVersion + 1 >= levelTasks.length ? 0 : taskVersion + 1;
    setTaskVersion(next);
  }

  async function handleSubmit(task) {
    const answer = answers[task.id];

    if (!answer || answer.trim().length < 2) {
      alert("Digite ou grave uma resposta primeiro.");
      return;
    }

    setLoadingTask(task.id);

    try {
      const correction = await correctEnglishAnswer({
        text: answer,
        instruction: task.instruction,
        level: task.level,
      });

      setResults((prev) => ({
        ...prev,
        [task.id]: correction,
      }));

      const updated = completeTask(task.id, task.xp);
      setProgress(updated);
    } catch (error) {
      console.error(error);
      alert("Erro ao corrigir com a IA.");
    } finally {
      setLoadingTask(null);
    }
  }

  function startRecording(taskId) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use o Google Chrome para usar reconhecimento de voz.");
      return;
    }

    try {
      recognitionRef.current?.stop();

      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let finalTranscript = "";

      recognition.onstart = () => {
        setRecordingTaskId(taskId);
        setRecordingStatus("🎤 Gravando... fale em inglês.");
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        const fullText = (finalTranscript + interimTranscript).trim();

        setAnswers((prev) => ({
          ...prev,
          [taskId]: fullText,
        }));
      };

      recognition.onerror = (event) => {
        console.error("Erro no reconhecimento de voz:", event.error);

        if (event.error === "network") {
          setRecordingStatus(
            "⚠️ Erro de rede no reconhecimento de voz. Tente novamente no Google Chrome."
          );
        } else if (event.error === "not-allowed") {
          setRecordingStatus("⚠️ Permissão do microfone negada.");
        } else if (event.error === "no-speech") {
          setRecordingStatus("⚠️ Nenhuma fala detectada. Tente novamente.");
        } else {
          setRecordingStatus("⚠️ Erro ao gravar áudio. Tente novamente.");
        }

        setRecordingTaskId(null);
      };

      recognition.onend = () => {
        setRecordingTaskId(null);

        setRecordingStatus(
          "✅ Gravação finalizada. Agora clique em enviar para IA corrigir."
        );
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error(error);
      setRecordingStatus("⚠️ Não foi possível iniciar a gravação.");
    }
  }

  function stopRecording() {
    try {
      recognitionRef.current?.stop();
      setRecordingTaskId(null);
      setRecordingStatus(
        "✅ Gravação finalizada. Agora clique em enviar para IA corrigir."
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Tarefas diárias</h1>
          <p>Escreva ou grave sua resposta em inglês e receba correção da IA.</p>
        </div>

        <button className="secondary-button" onClick={updateTasks}>
          <RefreshCw size={18} />
          Atualizar tarefas
        </button>
      </div>

      <div className="level-tabs">
        {levels.map((item) => (
          <button
            key={item}
            className={level === item ? "tab active-tab" : "tab"}
            onClick={() => {
              setLevel(item);
              setTaskVersion(0);
              stopRecording();
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {recordingStatus && (
        <div className="recording-status">{recordingStatus}</div>
      )}

      <section className="section">
        {tasks.map((task) => {
          const done = progress.completedTasks.includes(task.id);
          const result = results[task.id];
          const isRecording = recordingTaskId === task.id;

          return (
            <div className="task-card" key={task.id}>
              <div className="task-header">
                <div>
                  <span className={task.type === "audio" ? "badge warning" : "badge"}>
                    {task.type === "audio" ? "Áudio" : "Texto"}
                  </span>

                  <h2>{task.title}</h2>
                  <p>{task.instruction}</p>
                </div>

                <strong>+{task.xp} XP</strong>
              </div>

              {task.type === "text" ? (
                <textarea
                  className="answer-input"
                  placeholder="Escreva sua resposta em inglês..."
                  value={answers[task.id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [task.id]: e.target.value,
                    })
                  }
                />
              ) : (
                <div>
                  <div className="button-row left">
                    {!isRecording ? (
                      <button
                        className="primary-button"
                        onClick={() => startRecording(task.id)}
                      >
                        <Mic size={18} />
                        Iniciar gravação
                      </button>
                    ) : (
                      <button className="danger-button" onClick={stopRecording}>
                        <Square size={18} />
                        Parar gravação
                      </button>
                    )}
                  </div>

                  <div className="transcript-box">
                    <strong>Transcrição do áudio:</strong>
                    <p>{answers[task.id] || "Nenhum áudio gravado ainda."}</p>
                  </div>
                </div>
              )}

              <button
                className="primary-button"
                onClick={() => handleSubmit(task)}
                disabled={loadingTask === task.id}
              >
                <Send size={18} />
                {loadingTask === task.id
                  ? "Corrigindo..."
                  : done
                  ? "Enviar novamente para IA"
                  : "Enviar para IA"}
              </button>

              {done && (
                <span className="badge success" style={{ marginLeft: 12 }}>
                  Já concluída
                </span>
              )}

              {result && (
                <div className="correction-box">
                  <h3>Correção da IA</h3>

                  <p>
                    <strong>Nota:</strong> {result.score}/100
                  </p>

                  <p>
                    <strong>Correção em português:</strong>{" "}
                    {result.correctionPt}
                  </p>

                  <p>
                    <strong>Como falar em inglês:</strong>{" "}
                    {result.betterSentence}
                  </p>

                  <p>
                    <strong>Explicação:</strong> {result.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}