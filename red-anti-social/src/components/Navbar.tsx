import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuth } from "../context/LoginContext";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";

function NavbarApp() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", busqueda);
  };

  const { usuarioActual } = useAuth();

  const manejarLogout = () => {
    navigate("/logout");
  };

  return (
    <Navbar
      className="sticky-top py-2 border-bottom border-4 border-dark fixed-top"
      style={{
        backgroundColor: "#3b6934",
        overflow: "hidden",
        zIndex: 1050,
      }}
    >
      <Container
        className="d-flex justify-content-between align-items-center position-relative"
        style={{ zIndex: 1050 }}
      >
        <Navbar.Brand
          href="/home"
          className="font-headline text-uppercase tracking-tighter mb-0 fs-3"
          style={{
            color: "#ffe245",
            textShadow: "2px 2px 0px rgba(0,0,0,1)",
            fontWeight: "900",
          }}
        >
          UnaHur
        </Navbar.Brand>

        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2 rounded-0 border border-2 border-dark"
            type="search"
            placeholder="Buscar tags o usuarios..."
            aria-label="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            className="btn btn-warning rounded-0 border border-2 border-dark font-headline banana-shadow-hover"
            type="submit"
            style={{ backgroundColor: "#ffe245", fontWeight: "bold" }}
          >
            Buscar
          </button>
        </form>

        <Nav>
          <div>
            <span className="font-headline">
              Hola,{" "}
              <span className="font-headline me-2">
                {usuarioActual?.nickname || "Monkey"}
              </span>
            </span>
            <button
              onClick={manejarLogout}
              className="btn btn-warning rounded-0 border border-2 border-dark font-headline banana-shadow-hover"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              style={{ backgroundColor: "#ffe245" }}
            >
              <FiLogOut strokeWidth={1.5} />
            </button>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
