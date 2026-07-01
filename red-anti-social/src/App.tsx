import { Route, Routes } from "react-router-dom";
import NavbarApp from "./components/Navbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <div>
      <NavbarApp />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;