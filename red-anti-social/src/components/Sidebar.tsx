import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PiSealCheck } from "react-icons/pi";
import {
  PiTree,
  PiChatCircle,
  PiNewspaper,
  PiGraph,
  PiGear,
} from "react-icons/pi";

import "../styles/Sidebar.css";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const esActivo = (ruta: string): string =>
    location.pathname === ruta ? "sidebar-btn-activo" : "";

  const manejarBotonDeAdorno = (seccion: string) => {
    alert(
      `¡OOK OOK! La sección "${seccion}" está bajo construcción por los simios ingenieros.`,
    );
  };

  return (
    <aside className="sidebar-contenedor">
      <div className="sidebar-perfil-tarjeta">
        {/* --- AVATAR --- */}
        <div className="perfil-avatar-wrapper">
          <div className="perfil-avatar">{/* AGREGAR AVATAR */}</div>
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
          onClick={() => navigate("/")}
          className={`sidebar-link ${esActivo("/")}`}
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
          onClick={() => manejarBotonDeAdorno("Mis Lianas")}
          className={`sidebar-link-destacado deshabilitado ${esActivo("/perfil")}`}
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
          className={`sidebar-link ${esActivo("/ajustes")}`}
        >
          <PiGear /> CERRAR SESIÓN
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
