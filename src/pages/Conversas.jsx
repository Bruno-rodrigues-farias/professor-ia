import { getProgress } from "../services/progress";

export default function Conversas() {
  const progress = getProgress();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Histórico de conversas</h1>
          <p>Veja suas aulas anteriores e correções.</p>
        </div>
      </div>

      <section className="section">
        {progress.conversations.length === 0 && (
          <p>Nenhuma conversa salva ainda. Inicie uma aula com o Professor IA.</p>
        )}

        {progress.conversations.map((conversa) => (
          <div className="conversation-card" key={conversa.id}>
            <div className="conversation-header">
              <div>
                <h2>{conversa.tema}</h2>
                <p>{conversa.data}</p>
              </div>

              <strong className="score">{conversa.nota}%</strong>
            </div>

            <p>{conversa.resumo}</p>

            <div className="correction-box">
              <strong>Correção:</strong>
              <p>{conversa.erro}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}