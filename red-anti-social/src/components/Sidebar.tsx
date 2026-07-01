import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/LoginContext";
import { useUserPosts } from "../hooks/useUserPosts";

import {
  PiSealCheck,
  PiTree,
  PiChatCircle,
  PiNewspaper,
  PiGraph,
  PiSignOut,
} from "react-icons/pi";

import Avatar from "./Avatar";

import "../style/Sidebar.css";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { usuarioActual: user, cargando: authLoading } = useAuth();

  const { misPosts } = useUserPosts(authLoading ? undefined : user?._id);

  const esActivo = (ruta: string): string =>
    location.pathname === ruta ? "sidebar-btn-activo" : "";

  // mensajes para la navegacion deshabilitada
  const manejarBotonDeAdorno = (seccion: string) => {
    const excusas = [
      "Un gorila de 200kg se sentó sobre los servidores y rompió los cables.",
      "Se cortó la liana de fibra óptica de la conexión a internet. Intentá más tarde.",
      "El jefe de la manada confiscó esta sección temporalmente por exceso de ruido.",
      "Nuestros programadores chimpancés están durmiendo la siesta arriba de una palmera.",
      "Cambiamos el código por bananas y nos quedamos sin sistema en esta pestaña.",
    ];

    const fraseAleatoria = excusas[Math.floor(Math.random() * excusas.length)];

    alert(`🌴 [${seccion.toUpperCase()}] 🌴\n\n¡OOK OOK! ${fraseAleatoria}`);
  };

  // rango dinámico según sus posts
  const obtenerRangoSimio = (): string => {
    const cantidad = misPosts?.length || 0;
    if (cantidad === 0) return "CHIMPANCÉ NOVATO";
    if (cantidad >= 1 && cantidad <= 3) return "GORILA DE LA SELVA";
    return "REY DE LA MANADA";
  };

  return (
    <aside className="sidebar-contenedor">
      <div className="sidebar-perfil-tarjeta">
        {/* --- AVATAR --- */}
        <div className="perfil-avatar-wrapper">
          <div className="perfil-avatar">
            {user?.avatar ? (
              <Avatar user={user} size={160} />
            ) : (
              <span style={{ fontSize: "3rem" }}>🐵</span>
            )}
          </div>

          <div className="perfil-badge">
            <PiSealCheck />
          </div>
        </div>

        {/* --- USER INFO --- */}
        <h5 className="sidebar-nombre">{user?.nickname || "Monke Master"}</h5>

        <span className="sidebar-rol">{obtenerRangoSimio()}</span>

        {/* --- BOTÓN --- */}
        <Button className="sidebar-btn" onClick={() => navigate("/crear-post")}>
          OOK OOK!
        </Button>
      </div>

      {/* --- LÍNEA DIVISORIA --- */}
      <hr className="sidebar-divisor" />

      <nav className="sidebar-menu">
        {/* --- ENLACE ACTIVO --- */}
        <button
          type="button"
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

        {/* --- ENLACE ACTIVO --- */}
        <button
          type="button"
          onClick={() => navigate("/perfil")}
          className={`sidebar-link ${esActivo("/perfil")}`}
        >
          <PiGraph /> MIS LIANAS
        </button>

        {/* --- CERRAR SESIÓN --- */}
        <button
          type="button"
          onClick={() => navigate("/logout")}
          className="sidebar-link"
        >
          <PiSignOut /> CERRAR SESIÓN
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
