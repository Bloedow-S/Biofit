import "./style.css"; 
import { NavLink } from "react-router-dom";


import iconPerfil from "../../assets/do-utilizador.png";
import iconCalculos from "../../assets/calculadora.png";
import iconMacros from "../../assets/fatia-de-bolo.png"; 
import iconHistorico from "../../assets/historia.png";
// Faltando o ícone do Logo, vou usar texto por enquanto

export default function Sidebar() {

  return (
<aside className="sidebar-container">
  <div className="logo-container"> {/* <- AQUI */}
    <img className="logo-img" src="/src/assets/Logo2.png" alt="Logo" />
  </div>

  <nav className="sidebar-nav">
    <ul>
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
          to="/historico"
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
