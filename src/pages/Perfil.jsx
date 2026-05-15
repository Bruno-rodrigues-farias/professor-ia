import { achievements } from "../data/mock";
import { getLevel, getProgress, getRank } from "../services/progress";

export default function Perfil() {
  const progress = getProgress();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Perfil</h1>
          <p>Suas informações e progresso.</p>
        </div>
      </div>

      <section className="profile-card">
        <div className="profile-avatar">{progress.nome[0]}</div>

        <h2>{progress.nome}</h2>
        <p>Aluno de inglês</p>

        <div className="profile-grid">
          <div>
            <span>Nível</span>
            <strong>{getLevel(progress.xp)}</strong>
          </div>

          <div>
            <span>Rank</span>
            <strong>{getRank(progress.xp)}</strong>
          </div>

          <div>
            <span>XP</span>
            <strong>{progress.xp}</strong>
          </div>

          <div>
            <span>Streak</span>
            <strong>{progress.streak} dias</strong>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Conquistas</h2>

        {achievements.map((item) => {
          const unlocked = progress.achievements.includes(item.id);

          return (
            <div className="list-card" key={item.id}>
              <div>
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </div>

              <span className={unlocked ? "badge success" : "badge"}>
                {unlocked ? "Desbloqueada" : "Bloqueada"}
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}