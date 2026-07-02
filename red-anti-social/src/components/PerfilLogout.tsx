import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/LoginContext";

import "../style/PerfilLogout.css";

export function PerfilLogout() {
  const navigate = useNavigate();
  const { logout, usuarioActual } = useAuth();

  const [nombreUsuario] = useState<string>(usuarioActual?.nickname || "MONO");

  useEffect(() => {
    logout();

    const timer: number = window.setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="perfil-contenedor pantalla-completa">
      <div className="perfil-caja-interna">
        <div className="perfil-icono" aria-hidden="true">
          🦧👋
        </div>

        <h4 className="perfil-titulo">
          ¡HASTA LA PRÓXIMA, {nombreUsuario.toUpperCase()}!
        </h4>

        <div className="perfil-loading-spinner" aria-hidden="true"></div>
      </div>
    </div>
  );
}

export default PerfilLogout;
