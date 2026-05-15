import { useState } from "react";
import { login, register } from "../services/api";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }

      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>English Mentor AI</h1>
        <p>Entre para salvar seu progresso, tarefas, ranking e conversas.</p>

        {mode === "register" && (
          <input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-button large">
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "Criar uma conta"
            : "Já tenho uma conta"}
        </button>
      </form>
    </div>
  );
}