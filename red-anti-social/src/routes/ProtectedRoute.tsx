import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/LoginContext";

export function ProtectedRoute() {
  const { usuarioActual, cargando } = useAuth();

  if (cargando) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Verificando sesión del simio...</p>
      </div>
    );
  }

  if (!usuarioActual) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
