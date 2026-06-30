import { Route, Routes, Navigate } from "react-router-dom";
import NavbarApp from "./components/Navbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import PostDetail from "./pages/PostDetail";

import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <div>
      <NavbarApp />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/login" element={<Login />} />

        {/* --- RUTAS PROTEGIDAS --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
