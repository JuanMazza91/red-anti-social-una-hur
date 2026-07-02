import { Navbar, Container } from "react-bootstrap";
import "../style/Home.css";
import "../style/Navbar.css";

import { useSearch } from "../context/SearchContext";

function NavbarApp() {
  const { terminoBusqueda, setTerminoBusqueda } = useSearch();

  return (
    <Navbar
      className="sticky-top py-2 border-bottom border-4 border-dark fixed-top"
      style={{
        backgroundColor: "#3b6934",
        overflow: "hidden",
        zIndex: 1050,
      }}
    >
      <Container className="position-relative d-flex align-items-center">
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
          className="position-absolute start-50 translate-middle-x d-none d-md-flex"
          style={{
            width: "450px",
            maxWidth: "40vw",
          }}
        >
          <input
            className="form-control rounded-0 border border-2 border-dark"
            type="search"
            placeholder="Buscar tags o usuarios..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </form>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;