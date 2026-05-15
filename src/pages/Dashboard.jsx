import { useEffect, useState } from "react";

import {
  Flame,
  Star,
  Trophy,
  BookOpen,
  Languages,
  Zap,
} from "lucide-react";

import StatCard from "../components/StatCard";

import { dailyTasks } from "../data/mock";

import {
  getLevel,
  getProgress,
  getRank,
} from "../services/progress";

export default function Dashboard() {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const level = getLevel(progress.xp);

  const rank = getRank(progress.xp);

  const nextLevelXp = 2000;

  const percent = Math.min(
    (progress.xp / nextLevelXp) * 100,
    100
  );

  const tarefas = dailyTasks.slice(0, 3);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Olá, {progress.nome} 👋</h1>

          <p>
            Continue sua jornada para falar inglês
            com confiança.
          </p>
        </div>

        <button className="primary-button">
          Continuar estudando
        </button>
      </div>

      {/* =========================
          CARDS
      ========================= */}

      <div className="stats-grid">
        <StatCard
          title="XP Total"
          value={progress.xp}
          icon={<Zap />}
          color="#22c55e"
        />

        <StatCard
          title="Streak"
          value={`${progress.streak} dias`}
          icon={<Flame />}
          color="#f97316"
        />

        <StatCard
          title="Nível"
          value={level}
          icon={<Star />}
          color="#8b5cf6"
        />

        <StatCard
          title="Rank"
          value={rank}
          icon={<Trophy />}
          color="#3b82f6"
        />

        <StatCard
          title="Aulas"
          value={progress.aulasConcluidas}
          icon={<BookOpen />}
          color="#06b6d4"
        />

        <StatCard
          title="Palavras"
          value={progress.palavrasAprendidas}
          icon={<Languages />}
          color="#ec4899"
        />
      </div>

      {/* =========================
          PROGRESSO
      ========================= */}

      <section className="section">
        <h2>Progresso do nível</h2>

        <div className="progress-box">
          <div className="progress-info">
            <span>{level}</span>

            <span>
              {progress.xp} / {nextLevelXp} XP
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${percent}%`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* =========================
          TAREFAS
      ========================= */}

      <section className="section">
        <h2>Tarefas de hoje</h2>

        {tarefas.map((tarefa) => {
          const done =
            progress.completedTasks.includes(
              tarefa.id
            );

          return (
            <div
              className="list-card"
              key={tarefa.id}
            >
              <div>
                <h3>{tarefa.title}</h3>

                <p>
                  +{tarefa.xp} XP •{" "}
                  {tarefa.level}
                </p>
              </div>

              <span
                className={
                  done
                    ? "badge success"
                    : "badge"
                }
              >
                {done
                  ? "Concluída"
                  : "Pendente"}
              </span>
            </div>
          );
        })}
      </section>

      {/* =========================
          CONVERSAS
      ========================= */}

      <section className="section">
        <h2>Últimas conversas</h2>

        {progress.conversations.length === 0 ? (
          <p>
            Nenhuma conversa salva ainda.
          </p>
        ) : (
          progress.conversations
            .slice(0, 3)
            .map((conversa) => (
              <div
                className="conversation-card"
                key={conversa.id}
              >
                <div className="conversation-header">
                  <div>
                    <h3>
                      {conversa.tema}
                    </h3>

                    <p>
                      {conversa.data}
                    </p>
                  </div>

                  <strong className="score">
                    {conversa.nota}%
                  </strong>
                </div>

                <p>
                  {conversa.resumo}
                </p>

                <div className="correction-box">
                  <strong>
                    Correção:
                  </strong>

                  <p>
                    {conversa.erro}
                  </p>
                </div>
              </div>
            ))
        )}
      </section>
    </div>
  );
}