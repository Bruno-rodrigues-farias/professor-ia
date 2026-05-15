import { NavLink } from "react-router-dom";
import {
  Home,
  Mic,
  BookOpen,
  Target,
  Languages,
  MessageCircle,
  Trophy,
  User,
} from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/professor", label: "Professor IA", icon: Mic },
  { to: "/aulas", label: "Aulas", icon: BookOpen },
  { to: "/tarefas", label: "Tarefas", icon: Target },
  { to: "/vocabulario", label: "Vocabulário", icon: Languages },
  { to: "/conversas", label: "Conversas", icon: MessageCircle },
  { to: "/ranking", label: "Ranking", icon: Trophy },
  { to: "/perfil", label: "Perfil", icon: User },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">AI</div>
        <div>
          <h2>English Mentor</h2>
          <span>Professor com IA</span>
        </div>
      </div>

      <nav>
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}