
import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuth } from "../context/LoginContext";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";
import "../style/Navbar.css";
import Avatar from "./Avatar";
import { useSearch } from "../context/SearchContext";


function NavbarApp() {
  
  const navigate = useNavigate();

  
  const { terminoBusqueda, setTerminoBusqueda } = useSearch();


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
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          href="/home"
          className="font-headline text-uppercase tracking-tighter mb-0 fs-3 d-flex align-items-center gap-2"
          style={{
            color: "#ffe245",
            textShadow: "2px 2px 0px rgba(0,0,0,1)",
            fontWeight: "900",
          }}
        >
      
          <img
            src={"/LogoAntiSocial.jpeg"}
            alt="Logo UnaHur"
            style={{ width: "45px", height: "45px", borderRadius: "50%" }}
          />
          <div className="d-flex flex-column" style={{ lineHeight: "1" }}>
            <span className="fs-3">UnaHur</span>
            <span className="fs-6" style={{ marginTop: "-2px" }}>
              Anti-Social
            </span>
          </div>
        </Navbar.Brand>

  
        <form
          className="d-none d-md-flex" 
        
        >
          <input
            className="form-control me-2 rounded-0 border border-2 border-dark"
            type="search"
            placeholder="Buscar tags o usuarios..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />

          
        </form>

        <Nav>
          <div className="navbar-user font-headline d-flex align-items-center gap-2">
            {usuarioActual && <Avatar user={usuarioActual} size={40} />}
            <span>
              Hola,{" "}
              <span className="username-highlight">
                {usuarioActual?.nickname || "Monkey"}
              </span>
            </span>
            <button
              onClick={manejarLogout}
              className="btn btn-warning rounded-0 border border-2 border-dark font-headline banana-shadow-hover"
              style={{ backgroundColor: "#ffe245" }}
            >
              <FiLogOut strokeWidth={2} />
            </button>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
