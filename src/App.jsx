import Login from "./pages/Login";
import { getToken } from "./services/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ProfessorIA from "./pages/ProfessorIA";
import Aulas from "./pages/Aulas";
import TarefasDiarias from "./pages/TarefasDiarias";
import Vocabulario from "./pages/Vocabulario";
import Conversas from "./pages/Conversas";
import Ranking from "./pages/Ranking";
import Perfil from "./pages/Perfil";

export default function App() {
  if (!getToken()) {
  return <Login />;
}
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/professor" element={<ProfessorIA />} />
            <Route path="/aulas" element={<Aulas />} />
            <Route path="/tarefas" element={<TarefasDiarias />} />
            <Route path="/vocabulario" element={<Vocabulario />} />
            <Route path="/conversas" element={<Conversas />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}