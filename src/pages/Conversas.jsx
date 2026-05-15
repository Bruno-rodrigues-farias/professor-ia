import { useEffect, useState } from "react";
import { clearConversations, getConversations } from "../services/appData";

export default function Conversas() {
  const [conversations, setConversations] = useState([]);

  async function loadConversations() {
    const data = await getConversations();
    setConversations(data);
  }

  async function handleClear() {
    const ok = confirm("Deseja apagar todo o histórico de conversas?");

    if (!ok) return;

    await clearConversations();
    setConversations([]);
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Histórico de conversas</h1>
          <p>Veja suas aulas anteriores e correções.</p>
        </div>

        <button className="danger-button" onClick={handleClear}>
          Apagar histórico
        </button>
      </div>

      <section className="section">
        {conversations.length === 0 ? (
          <p>Nenhuma conversa salva ainda.</p>
        ) : (
          conversations.map((item) => (
            <div className="conversation-card" key={item.id}>
              <div className="conversation-header">
                <div>
                  <h2>{item.title}</h2>
                  <p>{new Date(item.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>

                <span className="score-badge">{item.score}%</span>
              </div>

              <p>{item.summary}</p>

              {item.correction && (
                <div className="correction-note">
                  <strong>Correção:</strong>
                  <p>{item.correction}</p>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}