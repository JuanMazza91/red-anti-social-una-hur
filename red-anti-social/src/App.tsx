import { Route, Routes } from "react-router-dom";
import NavbarApp from "./components/Navbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login"; // Importación limpia de tu Login
import { Register } from "./pages/Register";

function App() {
  return (
    <div>
      <NavbarApp />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
