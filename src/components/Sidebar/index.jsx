import "./style.css";
import { NavLink } from "react-router-dom";
import iconIA from "../../assets/artificial-intelligence.png"; // Ícone provisório
import iconPerfil from "../../assets/do-utilizador.png";
import iconCalculos from "../../assets/calculadora.png";
import iconMacros from "../../assets/fatia-de-bolo.png";
import iconHistorico from "../../assets/historia.png";
import Logo from "../Logo";

export default function Sidebar() {
  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav">
        <ul>
          <Logo></Logo>
          <li>
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconPerfil} alt="Perfil" />
              <span>Perfil</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/calculos"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconCalculos} alt="Cálculos" />
              <span>Cálculos</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/macros"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconMacros} alt="Macros" />
              <span>Macros</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/ia"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconIA} alt="IA" /> {/* Ícone provisório */}
              <span>Nutri IA</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={iconHistorico} alt="Histórico" />
              <span>Histórico</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
