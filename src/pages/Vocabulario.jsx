import { vocabulario } from "../data/mock";

export default function Vocabulario() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Vocabulário</h1>
          <p>Palavras que você aprendeu nas aulas.</p>
        </div>
      </div>

      <div className="vocab-grid">
        {vocabulario.map((item) => (
          <div className="vocab-card" key={item.palavra}>
            <span className="badge">{item.categoria}</span>

            <h2>{item.palavra}</h2>
            <strong>{item.traducao}</strong>
            <p>{item.exemplo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}