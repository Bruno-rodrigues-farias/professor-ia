import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { getRanking } from "../services/appData";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);

  async function loadRanking() {
    const data = await getRanking();
    setRanking(data);
  }

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Ranking semanal</h1>
          <p>Ganhe XP e suba de divisão.</p>
        </div>
      </div>

      <section className="section">
        <div className="ranking-list">
          {ranking.map((user, index) => (
            <div className="ranking-row" key={user.id}>
              <div className="ranking-position">
                {index === 0 ? <Trophy color="#facc15" /> : index + 1}
              </div>

              <div>
                <h3>{user.name}</h3>
                <p>{user.rank} • {user.streak} dias de streak</p>
              </div>

              <strong>{user.xp} XP</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}