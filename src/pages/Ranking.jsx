import { ranking } from "../data/mock";
import { Trophy } from "lucide-react";

export default function Ranking() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Ranking semanal</h1>
          <p>Ganhe XP e suba de divisão.</p>
        </div>
      </div>

      <section className="section">
        {ranking.map((user) => (
          <div className="rank-card" key={user.posicao}>
            <div className="rank-position">
              {user.posicao === 1 ? <Trophy color="#facc15" /> : user.posicao}
            </div>

            <div>
              <h3>{user.nome}</h3>
              <p>{user.rank} • {user.streak} dias de streak</p>
            </div>

            <strong>{user.xp} XP</strong>
          </div>
        ))}
      </section>
    </div>
  );
}