import { useState } from "react";
import { Mic, CheckCircle } from "lucide-react";
import { lessons, levels } from "../data/mock";
import { correctEnglishAnswer } from "../services/aiCorrection";
import {
  addReviewItem,
  completeLesson,
  getProgress,
} from "../services/progress";

export default function Aulas() {
  const [level, setLevel] = useState("Iniciante");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [review, setReview] = useState([]);
  const [pronunciation, setPronunciation] = useState({});
  const [aiCorrections, setAiCorrections] = useState({});
  const [progress, setProgress] = useState(getProgress());

  const filteredLessons = lessons.filter((lesson) => lesson.level === level);

  function answerQuestion(question, optionIndex) {
    const letters = ["A", "B", "C", "D"];
    const selected = letters[optionIndex];
    const correct = selected === question.answer;

    setSelectedAnswers((prev) => ({
      ...prev,
      [question.id]: selected,
    }));

    if (!correct) {
      const item = {
        question: question.question,
        selected,
        correct: question.answer,
        explanation: question.explanation,
      };

      setReview((prev) => [...prev, item]);
      addReviewItem(item);
    }
  }

  function finishLesson() {
    if (!selectedLesson) {
      alert("Nenhuma aula selecionada.");
      return;
    }

    const updated = completeLesson(selectedLesson.id, 80);

    setProgress(updated);
    alert("Aula concluída! Você ganhou +80 XP.");

    setReview([]);
    setSelectedAnswers({});
    setPronunciation({});
    setAiCorrections({});
    setSelectedLesson(null);
  }

  function startPronunciation(question) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use o Google Chrome para reconhecimento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;

      setPronunciation((prev) => ({
        ...prev,
        [question.id]: text,
      }));

      const correction = await correctEnglishAnswer({
        text,
        instruction: `O aluno deveria pronunciar: ${question.expected}`,
        level,
      });

      setAiCorrections((prev) => ({
        ...prev,
        [question.id]: correction,
      }));
    };

    recognition.start();
  }

  if (selectedLesson) {
    const alreadyDone = progress.completedLessons.includes(selectedLesson.id);

    return (
      <div>
        <div className="page-header">
          <div>
            <h1>{selectedLesson.title}</h1>
            <p>Nível: {selectedLesson.level}</p>
          </div>

          <button
            className="danger-button"
            onClick={() => setSelectedLesson(null)}
          >
            Voltar
          </button>
        </div>

        <section className="section">
          {selectedLesson.questions.map((question, index) => (
            <div className="quiz-card" key={question.id}>
              <h2>
                {index + 1}. {question.question}
              </h2>

              {question.type === "text" && (
                <div className="options-grid">
                  {question.options.map((option, optionIndex) => {
                    const letters = ["A", "B", "C", "D"];
                    const letter = letters[optionIndex];
                    const selected = selectedAnswers[question.id] === letter;
                    const correct = question.answer === letter;

                    return (
                      <button
                        key={option}
                        className={
                          selected
                            ? correct
                              ? "option correct"
                              : "option wrong"
                            : "option"
                        }
                        onClick={() => answerQuestion(question, optionIndex)}
                      >
                        <strong>{letter})</strong> {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === "pronunciation" && (
                <div>
                  <button
                    className="primary-button"
                    onClick={() => startPronunciation(question)}
                  >
                    <Mic size={18} />
                    Gravar pronúncia
                  </button>

                  <div className="transcript-box">
                    <strong>Você falou:</strong>
                    <p>
                      {pronunciation[question.id] ||
                        "Nenhum áudio gravado ainda."}
                    </p>
                  </div>

                  {aiCorrections[question.id] && (
                    <div className="correction-box">
                      <h3>Correção da pronúncia</h3>

                      <p>
                        <strong>Nota:</strong>{" "}
                        {aiCorrections[question.id].score}/100
                      </p>

                      <p>
                        <strong>Correção:</strong>{" "}
                        {aiCorrections[question.id].correctionPt}
                      </p>

                      <p>
                        <strong>Como falar:</strong>{" "}
                        {aiCorrections[question.id].betterSentence}
                      </p>

                      <p>
                        <strong>Explicação:</strong>{" "}
                        {aiCorrections[question.id].explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="section">
          <h2>Aba de revisão</h2>

          {review.length === 0 ? (
            <p>Nenhum erro nesta aula.</p>
          ) : (
            review.map((item, index) => (
              <div className="correction-box" key={index}>
                <p>
                  <strong>Pergunta:</strong> {item.question}
                </p>

                <p>
                  <strong>Sua resposta:</strong> {item.selected}
                </p>

                <p>
                  <strong>Resposta correta:</strong> {item.correct}
                </p>

                <p>
                  <strong>Explicação:</strong> {item.explanation}
                </p>
              </div>
            ))
          )}

          <button
            className={alreadyDone ? "disabled-button" : "primary-button large"}
            disabled={alreadyDone || !selectedLesson}
            onClick={finishLesson}
          >
            <CheckCircle size={20} />
            {alreadyDone ? "Aula já concluída" : "Concluir aula"}
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Aulas</h1>
          <p>Escolha aulas por nível com quiz, revisão e pronúncia.</p>
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

      <div className="cards-grid">
        {filteredLessons.map((lesson) => {
          const done = progress.completedLessons.includes(lesson.id);

          return (
            <div className="lesson-card" key={lesson.id}>
              <span className={done ? "badge success" : "badge"}>
                {done ? "Concluída" : lesson.level}
              </span>

              <h2>{lesson.title}</h2>

              <p>{lesson.questions.length} perguntas com texto e pronúncia.</p>

              <button
                className="primary-button"
                onClick={() => {
                  setSelectedLesson(lesson);
                  setReview([]);
                  setSelectedAnswers({});
                  setPronunciation({});
                  setAiCorrections({});
                }}
              >
                {done ? "Revisar aula" : "Começar aula"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}