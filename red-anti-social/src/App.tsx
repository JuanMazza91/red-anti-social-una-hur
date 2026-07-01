import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import NavbarApp from "./components/Navbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Perfil } from "./pages/Perfil";
import PostDetail from "./pages/PostDetail";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PerfilLogout } from "./components/PerfilLogout";

function App() {
  const location = useLocation();

  const ocultarNavbar =
    location.pathname === "/logout" || location.pathname === "/login";

  return (
    <div>
      {!ocultarNavbar && <NavbarApp />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/logout" element={<PerfilLogout />} />

        {/* --- RUTAS PROTEGIDAS --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
