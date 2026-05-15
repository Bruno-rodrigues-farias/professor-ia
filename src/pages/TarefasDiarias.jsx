import { useEffect, useState } from "react";
import { Send, RefreshCw, BookOpen } from "lucide-react";
import { levels } from "../data/mock";
import { correctEnglishAnswer } from "../services/aiCorrection";
import { getTasks, getTaskReviews, saveTaskReview } from "../services/appData";

export default function TarefasDiarias() {
  const [level, setLevel] = useState("Iniciante");
  const [tasks, setTasks] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loadingTask, setLoadingTask] = useState(null);

  async function loadData() {
    try {
      const taskData = await getTasks();
      const reviewData = await getTaskReviews();

      setTasks(taskData);
      setReviews(reviewData);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar tarefas.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredTasks = tasks.filter((task) => task.level === level);
  const filteredReviews = reviews.filter((item) => item.level === level);

  async function handleSubmit(task) {
    const answer = answers[task.id];

    if (!answer || answer.trim().length < 2) {
      alert("Digite sua resposta em inglês primeiro.");
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

      await saveTaskReview(task.id, {
        taskTitle: task.title,
        level: task.level,
        question: task.instruction,
        studentAnswer: answer,
        score: correction.score,
        correctionPt: correction.correctionPt,
        betterSentence: correction.betterSentence,
        explanation: correction.explanation,
        xp: task.xp,
      });

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Erro ao corrigir e salvar tarefa.");
    } finally {
      setLoadingTask(null);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Tarefas diárias</h1>
          <p>As respostas e revisões ficam salvas para cada usuário.</p>
        </div>

        <button className="secondary-button" onClick={loadData}>
          <RefreshCw size={18} />
          Atualizar tarefas
        </button>
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

      <section className="section">
        {filteredTasks.map((task) => {
          const result = results[task.id];

          return (
            <div className="task-card" key={task.id}>
              <div className="task-header">
                <div>
                  <span className="badge">Texto</span>
                  <h2>{task.title}</h2>
                  <p>{task.instruction}</p>
                </div>

                <strong>+{task.xp} XP</strong>
              </div>

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

              <button
                className="primary-button"
                onClick={() => handleSubmit(task)}
                disabled={loadingTask === task.id}
              >
                <Send size={18} />
                {loadingTask === task.id
                  ? "Corrigindo..."
                  : task.completed
                  ? "Enviar novamente para IA"
                  : "Enviar para IA"}
              </button>

              {task.completed && (
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
                    <strong>Correção:</strong> {result.correctionPt}
                  </p>

                  <p>
                    <strong>Forma correta:</strong> {result.betterSentence}
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

      <section className="section">
        <div className="review-title">
          <BookOpen size={24} />

          <div>
            <h2>Revisão do aluno</h2>
            <p>Aqui aparecem somente as respostas salvas deste usuário.</p>
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <p>Nenhuma revisão salva ainda.</p>
        ) : (
          <div className="review-list">
            {filteredReviews.map((item) => (
              <div className="review-card" key={item.id}>
                <div className="review-card-header">
                  <div>
                    <span className="badge">{item.level}</span>
                    <h3>{item.taskTitle}</h3>
                    <small>
                      {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                    </small>
                  </div>

                  <strong className="score">{item.score}/100</strong>
                </div>

                <div className="review-content">
                  <p>
                    <strong>Questão:</strong> {item.question}
                  </p>

                  <p>
                    <strong>Sua resposta:</strong> {item.studentAnswer}
                  </p>

                  <p>
                    <strong>Correção:</strong> {item.correctionPt}
                  </p>

                  <p>
                    <strong>Forma correta:</strong> {item.betterSentence}
                  </p>

                  <p>
                    <strong>Explicação:</strong> {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}