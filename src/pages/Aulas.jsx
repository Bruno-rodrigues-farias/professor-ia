import { useEffect, useRef, useState } from "react";
import { Mic, Volume2, X, Heart, Flame, Gem, Lock } from "lucide-react";

import { lessons, levels } from "../data/mock";
import { correctAudioWithAI } from "../services/audioCorrection";
import { getProfile, completeLessonBackend } from "../services/appData";
import { addReviewItem } from "../services/progress";

export default function Aulas() {
  const [level, setLevel] = useState("Iniciante");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [step, setStep] = useState(0);

  const [selectedWords, setSelectedWords] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState(null);

  const [pronunciationText, setPronunciationText] = useState("");
  const [aiCorrection, setAiCorrection] = useState(null);
  const [isCorrecting, setIsCorrecting] = useState(false);

  const [progress, setProgress] = useState({
    xp: 0,
    streak: 0,
    completedLessons: [],
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const filteredLessons = lessons.filter((lesson) => lesson.level === level);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();

      setProgress({
        xp: data.xp || 0,
        streak: data.streak || 0,
        completedLessons: data.completedLessons || [],
      });
    } catch (error) {
      console.error(error);
    }
  }

  function isLessonUnlocked(index) {
    if (index === 0) return true;

    const previousLesson = filteredLessons[index - 1];

    return progress.completedLessons.includes(previousLesson.id);
  }

  function playSound(type) {
    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.type = "sine";

    if (type === "click") {
      oscillator.frequency.value = 650;
      gain.gain.value = 0.08;
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.08);
    }

    if (type === "success") {
      oscillator.frequency.value = 900;
      gain.gain.value = 0.12;
      oscillator.start();
      oscillator.frequency.exponentialRampToValueAtTime(
        1500,
        audio.currentTime + 0.2
      );
      oscillator.stop(audio.currentTime + 0.22);
    }

    if (type === "error") {
      oscillator.frequency.value = 220;
      gain.gain.value = 0.12;
      oscillator.start();
      oscillator.frequency.exponentialRampToValueAtTime(
        110,
        audio.currentTime + 0.3
      );
      oscillator.stop(audio.currentTime + 0.3);
    }
  }

  function openLesson(lesson, index) {
    if (!isLessonUnlocked(index)) {
      playSound("error");
      alert("Conclua a aula anterior para desbloquear esta.");
      return;
    }

    setSelectedLesson(lesson);
    setStep(0);
    resetQuestion();
  }

  function resetQuestion() {
    setSelectedWords([]);
    setSelectedOption("");
    setFeedback(null);
    setPronunciationText("");
    setAiCorrection(null);
    setAudioBlob(null);
    setAudioUrl("");
    setIsRecording(false);
    setIsCorrecting(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1.1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function checkChoice(question, option) {
    playSound("click");
    setSelectedOption(option);

    if (option === question.answer) {
      playSound("success");

      setFeedback({
        type: "success",
        title: "Correto!",
        message: "Muito bem! Você acertou.",
      });
    } else {
      playSound("error");

      addReviewItem({
        question: question.question,
        selected: option,
        correct: question.answer,
        explanation: question.explanation,
      });

      setFeedback({
        type: "error",
        title: "Ops, quase!",
        message: question.explanation,
      });
    }
  }

  function toggleWord(word) {
    setSelectedWords((prev) =>
      prev.includes(word)
        ? prev.filter((item) => item !== word)
        : [...prev, word]
    );
  }

  function checkTranslation(question) {
    playSound("click");

    const answer = selectedWords.join(" ");
    const correct = question.answer.join(" ");

    if (answer === correct) {
      playSound("success");

      setFeedback({
        type: "success",
        title: "Perfeito!",
        message: "Sua tradução está correta.",
      });
    } else {
      playSound("error");

      addReviewItem({
        question: question.phrasePt,
        selected: answer,
        correct,
        explanation: question.explanation,
      });

      setFeedback({
        type: "error",
        title: "Precisa revisar!",
        message: question.explanation,
      });
    }
  }

  async function startAudioRecording() {
    try {
      setPronunciationText("");
      setAiCorrection(null);
      setFeedback(null);
      setAudioBlob(null);
      setAudioUrl("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setPronunciationText("Áudio gravado. Clique em corrigir com IA.");
        setIsRecording(false);

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      mediaRecorder.start();
      setIsRecording(true);
      setPronunciationText("🎤 Gravando áudio real...");
    } catch (error) {
      console.error(error);
      alert("Não foi possível acessar o microfone.");
      setIsRecording(false);
    }
  }

  function stopAudioRecording() {
    try {
      mediaRecorderRef.current?.stop();
    } catch (error) {
      console.error(error);
      setIsRecording(false);
    }
  }

  async function correctRecordedAudio() {
    const question = selectedLesson?.questions?.[step];

    if (!audioBlob || !question) {
      alert("Grave um áudio primeiro.");
      return;
    }

    setIsCorrecting(true);

    try {
      const correction = await correctAudioWithAI({
        audioBlob,
        expected: question.expected,
        level,
      });

      setPronunciationText(
        correction.transcription || "Transcrição não identificada."
      );

      setAiCorrection(correction);

      playSound(correction.score >= 70 ? "success" : "error");

      setFeedback({
        type: correction.score >= 70 ? "success" : "error",
        title: correction.score >= 70 ? "Boa pronúncia!" : "Vamos melhorar!",
        message:
          correction.score >= 70
            ? "Muito bem!"
            : correction.correctionPt || "Vamos tentar novamente.",
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao corrigir áudio com IA.");
    } finally {
      setIsCorrecting(false);
    }
  }

  async function nextQuestion() {
    if (!selectedLesson) return;

    if (step + 1 < selectedLesson.questions.length) {
      setStep(step + 1);
      resetQuestion();
      return;
    }

    try {
      const updated = await completeLessonBackend(
        selectedLesson.id,
        selectedLesson.xp
      );

      setProgress({
        xp: updated.xp || 0,
        streak: updated.streak || 0,
        completedLessons: updated.completedLessons || [],
      });

      alert(`Aula concluída! +${selectedLesson.xp} XP`);

      setSelectedLesson(null);
      resetQuestion();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar aula no backend.");
    }
  }

  if (selectedLesson) {
    const question = selectedLesson.questions[step];

    return (
      <div className="lesson-play-page">
        <div className="lesson-topbar">
          <button
            className="close-btn"
            onClick={() => {
              setSelectedLesson(null);
              resetQuestion();
            }}
          >
            <X size={26} />
          </button>

          <div className="lesson-progress">
            <div
              className="lesson-progress-fill"
              style={{
                width: `${
                  ((step + 1) / selectedLesson.questions.length) * 100
                }%`,
              }}
            />
          </div>

          <div className="hearts">
            <Heart size={22} fill="#ff4b4b" color="#ff4b4b" />
            <span>5</span>
          </div>
        </div>

        <div className="exercise-card">
          {question.type === "choice" && (
            <>
              <h1>{question.question}</h1>

              <div className="duo-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={
                      selectedOption === option
                        ? option === question.answer
                          ? "duo-option correct"
                          : "duo-option wrong"
                        : "duo-option"
                    }
                    onClick={() => checkChoice(question, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {question.type === "translate" && (
            <>
              <h1>{question.question}</h1>

              <div className="speech-bubble">
                <div className="owl-avatar">🦉</div>
                <p>{question.phrasePt}</p>
              </div>

              <div className="answer-slots">
                {selectedWords.map((word) => (
                  <button key={word} onClick={() => toggleWord(word)}>
                    {word}
                  </button>
                ))}
              </div>

              <div className="word-bank">
                {question.words.map((word) => (
                  <button
                    key={word}
                    disabled={selectedWords.includes(word)}
                    onClick={() => toggleWord(word)}
                  >
                    {word}
                  </button>
                ))}
              </div>

              <button
                className="duo-check-btn"
                onClick={() => checkTranslation(question)}
              >
                Verificar
              </button>
            </>
          )}

          {question.type === "listen" && (
            <>
              <h1>{question.question}</h1>

              <button
                className="listen-button"
                onClick={() => speak(question.phrase)}
              >
                <Volume2 size={42} />
              </button>

              <div className="duo-options grid-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={
                      selectedOption === option
                        ? option === question.answer
                          ? "duo-option correct"
                          : "duo-option wrong"
                        : "duo-option"
                    }
                    onClick={() => checkChoice(question, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {question.type === "pronunciation" && (
            <>
              <h1>{question.question}</h1>

              <div className="speech-bubble blue">
                <p>{question.expected}</p>
              </div>

              {!isRecording ? (
                <button className="speak-button" onClick={startAudioRecording}>
                  <Mic size={24} />
                  Gravar áudio
                </button>
              ) : (
                <button
                  className="danger-button large"
                  onClick={stopAudioRecording}
                >
                  Parar gravação
                </button>
              )}

              <div className="transcript-box">
                <strong>Status / Transcrição:</strong>
                <p>{pronunciationText || "Ainda não gravou."}</p>
              </div>

              {audioUrl && (
                <audio
                  controls
                  src={audioUrl}
                  style={{ width: "100%", marginBottom: 16 }}
                />
              )}

              <button
                className="primary-button"
                onClick={correctRecordedAudio}
                disabled={isCorrecting}
              >
                {isCorrecting ? "Corrigindo..." : "Corrigir áudio com IA"}
              </button>

              {aiCorrection && (
                <div className="correction-box">
                  <p>
                    <strong>Nota:</strong> {aiCorrection.score}/100
                  </p>

                  <p>
                    <strong>Transcrição:</strong> {aiCorrection.transcription}
                  </p>

                  <p>
                    <strong>Correção:</strong> {aiCorrection.correctionPt}
                  </p>

                  <p>
                    <strong>Como falar:</strong> {aiCorrection.betterSentence}
                  </p>

                  <p>
                    <strong>Explicação:</strong> {aiCorrection.explanation}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {feedback && (
          <div className={`feedback-bar ${feedback.type}`}>
            <div>
              <h2>{feedback.title}</h2>
              <p>{feedback.message}</p>
            </div>

            <button onClick={nextQuestion}>
              {step + 1 === selectedLesson.questions.length
                ? "Finalizar"
                : "Continuar"}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="duo-header">
        <div>
          <h1>Trilha de Inglês</h1>
          <p>Complete unidades, ganhe XP e treine com IA.</p>
        </div>

        <div className="duo-currencies">
          <span>
            <Flame size={20} color="#ff9600" /> {progress.streak}
          </span>

          <span>
            <Gem size={20} color="#ff4b4b" /> {progress.xp}
          </span>
        </div>
      </div>

      <div className="level-tabs">
        {levels.map((item) => (
          <button
            key={item}
            className={level === item ? "tab active-tab" : "tab"}
            onClick={() => setLevel(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="duo-layout">
        <section className="duo-path-card">
          <h2>{level} skills</h2>

          <div className="lesson-path">
            {filteredLessons.map((lesson, index) => {
              const done = progress.completedLessons.includes(lesson.id);
              const unlocked = isLessonUnlocked(index);

              return (
                <div
                  key={lesson.id}
                  className={`lesson-node node-${index % 3} ${
                    !unlocked ? "locked-node" : ""
                  }`}
                  onClick={() => openLesson(lesson, index)}
                >
                  <div
                    className={`lesson-circle ${done ? "done" : ""} ${
                      !unlocked ? "locked-circle" : ""
                    }`}
                    style={{
                      background: unlocked ? lesson.color : "#cbd5e1",
                    }}
                  >
                    <span>{done ? "✓" : unlocked ? lesson.icon : <Lock />}</span>
                  </div>

                  <strong>{lesson.title}</strong>
                  <small>{unlocked ? lesson.subtitle : "Bloqueada"}</small>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="duo-sidebar-card">
          <h2>Seu progresso</h2>

          <div className="big-progress">
            <span>{progress.xp} XP</span>

            <div>
              <div
                style={{
                  width: `${Math.min((progress.xp / 3000) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          <button className="strengthen-btn">Fortalecer habilidades</button>

          <div className="leader-mini">
            <h3>Ranking semanal</h3>

            <p>🥇 Ana — 2840 XP</p>
            <p>🥈 Carlos — 2310 XP</p>
            <p>🥉 Bruno — {progress.xp} XP</p>
          </div>
        </aside>
      </div>
    </div>
  );
}