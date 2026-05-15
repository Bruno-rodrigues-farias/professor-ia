import { useEffect, useState } from "react";
import { Zap, Flame, Star, Trophy, BookOpen, Languages } from "lucide-react";
import { getProfile, getTasks } from "../services/appData";

export default function Dashboard({ setPage }) {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);

  async function loadData() {
    const profileData = await getProfile();
    const tasksData = await getTasks();

    setProfile(profileData);
    setTasks(tasksData.slice(0, 3));
  }

  useEffect(() => {
    loadData();
  }, []);

  if (!profile) return <p>Carregando dashboard...</p>;

  const progressPercent = Math.min((profile.xp / 2000) * 100, 100);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Olá, {profile.name} 👋</h1>
          <p>Continue sua jornada para falar inglês com confiança.</p>
        </div>

        <button className="primary-button" onClick={() => setPage?.("aulas")}>
          Continuar estudando
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Zap />
          <div>
            <span>XP Total</span>
            <strong>{profile.xp}</strong>
          </div>
        </div>

        <div className="stat-card">
          <Flame />
          <div>
            <span>Streak</span>
            <strong>{profile.streak} dias</strong>
          </div>
        </div>

        <div className="stat-card">
          <Star />
          <div>
            <span>Nível</span>
            <strong>{profile.level}</strong>
          </div>
        </div>

        <div className="stat-card">
          <Trophy />
          <div>
            <span>Rank</span>
            <strong>{profile.rank}</strong>
          </div>
        </div>

        <div className="stat-card">
          <BookOpen />
          <div>
            <span>Aulas</span>
            <strong>{profile.completedLessons.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <Languages />
          <div>
            <span>Conversas</span>
            <strong>{profile.conversationsCount}</strong>
          </div>
        </div>
      </div>

      <section className="section">
        <h2>Progresso do nível</h2>

        <div className="progress-header">
          <strong>{profile.level}</strong>
          <strong>{profile.xp} / 2000 XP</strong>
        </div>

        <div className="progress-bar">
          <div style={{ width: `${progressPercent}%` }} />
        </div>
      </section>

      <section className="section">
        <h2>Tarefas de hoje</h2>

        <div className="task-list-simple">
          {tasks.map((task) => (
            <div className="simple-row" key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>+{task.xp} XP • {task.level}</p>
              </div>

              <span className={task.completed ? "badge success" : "badge"}>
                {task.completed ? "Concluída" : "Pendente"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}