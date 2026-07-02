import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/LoginContext";

import Avatar from "./Avatar";
import ModalPublication from "./ModalPublication";

import {
  PiSealCheck,
  PiTree,
  PiChatCircle,
  PiNewspaper,
  PiGraph,
  PiSignOut,
} from "react-icons/pi";

import "../style/Sidebar.css";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { usuarioActual: user } = useAuth();

  const esActivo = (ruta: string): string =>
    location.pathname === ruta ? "sidebar-btn-activo" : "";

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const manejarSeccionDeshabilitada = (seccion: string): void => {
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

        {/* --- BOTÓN POST --- */}
        <div className="sidebar-btn-wrapper">
          <Button className="sidebar-btn" onClick={handleOpen}>
            OOK OOK!
          </Button>
        </div>

        <ModalPublication
          show={showModal}
          handleClose={handleClose}
          onPostCreated={() => {}}
        />
      </div>

      {/* --- LÍNEA DIVISORIA --- */}
      <hr className="sidebar-divisor" />

      <nav className="sidebar-menu">
        {/* --- ENLACES ACTIVOS --- */}
        <button
          type="button"
          onClick={() => navigate("/home")}
          className={`sidebar-link ${esActivo("/home")}`}
        >
          <PiTree /> MURO SELVÁTICO
        </button>

        <button
          type="button"
          onClick={() => navigate("/perfil")}
          className={`sidebar-link ${esActivo("/perfil")}`}
        >
          <PiGraph /> MIS LIANAS
        </button>

        {/* --- ENLACES DESACTIVADOS --- */}
        <button
          type="button"
          onClick={() => manejarSeccionDeshabilitada("Noticias Banana")}
          className="sidebar-link deshabilitado"
        >
          <PiNewspaper /> NOTICIAS BANANA
        </button>

        <button
          type="button"
          onClick={() => manejarSeccionDeshabilitada("Charlas de Árbol")}
          className="sidebar-link deshabilitado"
        >
          <PiChatCircle /> CHARLAS DE ÁRBOL
        </button>

        {/* --- CERRAR SESIÓN --- */}
        <button
          type="button"
          onClick={() => navigate("/logout")}
          className="sidebar-link sidebar-link-logout"
        >
          <PiSignOut /> CERRAR SESIÓN
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
