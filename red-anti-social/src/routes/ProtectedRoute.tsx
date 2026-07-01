import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/LoginContext";

export function ProtectedRoute() {
  const { usuarioActual, cargando } = useAuth();

  if (cargando) {
    return <p className="text-center mt-5">Verificando sesión del simio...</p>;
  }

  if (!usuarioActual) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
