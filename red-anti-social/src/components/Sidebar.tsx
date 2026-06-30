import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/LoginContext";

import {
  PiSealCheck,
  PiTree,
  PiChatCircle,
  PiNewspaper,
  PiGraph,
  PiGear,
} from "react-icons/pi";

import "../style/Sidebar.css";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { usuarioActual: user, logout } = useAuth();

  const esActivo = (ruta: string): string =>
    location.pathname === ruta ? "sidebar-btn-activo" : "";

  const manejarBotonDeAdorno = (seccion: string) => {
    alert(
      `¡OOK OOK! La sección "${seccion}" está bajo construcción por los simios ingenieros.`,
    );
  };

  const esPerfil = location.pathname === "/perfil";

  return (
    <aside className={`sidebar-contenedor ${esPerfil ? "modo-perfil" : ""}`}>
      <div className="sidebar-perfil-tarjeta">
        {/* --- AVATAR --- */}
        <div className="perfil-avatar-wrapper">
          <div className="perfil-badge">
            <PiSealCheck />
          </div>
        </div>

        {/* --- USER INFO --- */}
        <h5 className="sidebar-nombre">{user?.nickname || "Monke Master"}</h5>
        <span className="sidebar-rol">DIRECTOR DE OOKS</span>

        {/* --- BOTÓN --- */}
        <Button
          className="sidebar-btn-grito"
          onClick={() => navigate("/crear-post")}
        >
          OOK OOK!
        </Button>
      </div>

      {/* --- LÍNEA DIVISORIA --- */}
      <hr className="sidebar-divisor" />

      <nav className="sidebar-menu">
        {/* --- ENLACES ACTIVOS --- */}
        <button
          onClick={() => navigate("/home")}
          className={`sidebar-link ${esActivo("/home")}`}
        >
          <PiTree /> MURO SELVÁTICO
        </button>

        {/* --- ENLACES DESACTIVADOS --- */}
        <button
          type="button"
          onClick={() => manejarBotonDeAdorno("Charlas de Árbol")}
          className="sidebar-link deshabilitado"
        >
          <PiChatCircle /> CHARLAS DE ÁRBOL
        </button>

        <button
          type="button"
          onClick={() => manejarBotonDeAdorno("Noticias Banana")}
          className="sidebar-link deshabilitado"
        >
          <PiNewspaper /> NOTICIAS BANANA
        </button>

        <button
          type="button"
          onClick={() => navigate("/perfil")}
          className={`sidebar-link ${esActivo("/perfil")}`}
        >
          <PiGraph /> MIS LIANAS
        </button>

        {/* --- CERRAR SESIÓN --- */}
        <button
          onClick={() => {
            if (window.confirm("¿Quieres salir de la manada?")) {
              logout();
              navigate("/login");
            }
          }}
          className="sidebar-link"
        >
          <PiGear /> CERRAR SESIÓN
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
