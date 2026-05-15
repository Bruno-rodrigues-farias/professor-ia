import { useEffect, useState } from "react";
import { apiFetch, logout } from "../services/api";

export default function Perfil() {
  const [profile, setProfile] = useState(null);

  async function loadProfile() {
    const data = await apiFetch("/api/me");
    setProfile(data);
  }

  async function clearHistory() {
    const confirm = window.confirm("Deseja apagar todo o histórico de conversas?");

    if (!confirm) return;

    await apiFetch("/api/conversations", {
      method: "DELETE",
    });

    await loadProfile();
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Perfil</h1>
          <p>Informações da sua conta e progresso.</p>
        </div>

        <button className="danger-button" onClick={logout}>
          Sair
        </button>
      </div>

      <section className="profile-card">
        <div className="profile-avatar">{profile.name[0]}</div>

        <h2>{profile.name}</h2>
        <p>{profile.email}</p>

        <div className="profile-grid">
          <div>
            <span>XP</span>
            <strong>{profile.xp}</strong>
          </div>

          <div>
            <span>Streak</span>
            <strong>{profile.streak}</strong>
          </div>

          <div>
            <span>Nível</span>
            <strong>{profile.level}</strong>
          </div>

          <div>
            <span>Rank</span>
            <strong>{profile.rank}</strong>
          </div>

          <div>
            <span>Tarefas concluídas</span>
            <strong>{profile.completedTasks.length}</strong>
          </div>

          <div>
            <span>Aulas concluídas</span>
            <strong>{profile.completedLessons.length}</strong>
          </div>

          <div>
            <span>Conversas salvas</span>
            <strong>{profile.conversationsCount}</strong>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Privacidade</h2>
        <p>Você pode apagar o histórico de conversas sem apagar sua conta.</p>

        <button className="danger-button" onClick={clearHistory}>
          Apagar histórico de conversas
        </button>
      </section>
    </div>
  );
}