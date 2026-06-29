import { Route, Routes } from "react-router-dom";
import NavbarApp from "./components/Navbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login"; // Importación limpia de tu Login
import PostDetail from "./pages/PostDetail";


function App() {
  return (
    <div>
      <NavbarApp />

      <Routes>
        /* 1. Ponemos el Login en la raíz temporalmente para verlo al toque */
        <Route path="/" element={<Login />} />
        /* 2. Dejamos el Home en otra ruta por ahora para no perderlo */
        <Route path="/home" element={<Home />} />
        /* 3. Dejamos el acceso directo a /login también configurado
        <Route path="/login" element={<Login />} /> */
        /* 4. Dejamos el acceso directo al detalle de un post también configurado
        <Route path="/post/:id" element={<PostDetail />}/>
      </Routes>
      
    </div>
  );
}

export default App;




