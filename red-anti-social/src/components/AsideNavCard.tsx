

function MonoNav() {

  const linkStyle = {
    transition: "background-color 0.2s ease, transform 0.1s ease",
    cursor: "pointer",
    color: "#333",
  };

  const manejarHoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.08)";
  };

  const manejarHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div className="col-md-3 d-none d-md-block ">
      <div className="card p-3 sticky-top rounded-0 border-0" style={{ background: "#F5F5DC", top: "80px" }}>
        <h5 className="mb-4 fw-bold text-dark text-uppercase tracking-wider">🍌 MonoNav</h5>
        
        <ul className="list-unstyled d-flex flex-column gap-3">
          <li>
            <a 
              href="/home" 
              className="text-decoration-none d-flex align-items-center gap-3 p-3  rounded-2 fw-bold text-dark" 
              style={linkStyle}
              onMouseEnter={manejarHoverIn}
              onMouseLeave={manejarHoverOut}
            >
              <span style={{ fontSize: "1.2rem" }}>🏠</span> Inicio
            </a>
          </li>

          <li>
            <a 
              href="#notificaciones" 
              className="text-decoration-none d-flex align-items-center gap-3  p-3 rounded-2 fw-bold text-dark" 
              style={linkStyle}
              onMouseEnter={manejarHoverIn}
              onMouseLeave={manejarHoverOut}
            >
              <span style={{ fontSize: "1.2rem" }}>🔔</span> Notificaciones
            </a>
          </li>

          <li>
            <a 
              href="#mensajes" 
              className="text-decoration-none d-flex align-items-center gap-3 p-3 rounded-2 fw-bold text-dark" 
              style={linkStyle}
              onMouseEnter={manejarHoverIn}
              onMouseLeave={manejarHoverOut}
            >
              <span style={{ fontSize: "1.2rem" }}>💬</span> Mensajes de la Selva
            </a>
          </li>

          <li>
            <a 
              href="#guardados" 
              className="text-decoration-none d-flex align-items-center gap-3 p-3 rounded-2 fw-bold text-dark" 
              style={linkStyle}
              onMouseEnter={manejarHoverIn}
              onMouseLeave={manejarHoverOut}
            >
              <span style={{ fontSize: "1.2rem" }}>🔖</span> Bananas Guardadas
            </a>
          </li>

          <li>
            <a 
              href="#MonoMarket" 
              className="text-decoration-none d-flex align-items-center gap-3 p-3 rounded-2 fw-bold text-dark" 
              style={linkStyle}
              onMouseEnter={manejarHoverIn}
              onMouseLeave={manejarHoverOut}
            >
              <span style={{ fontSize: "1.2rem" }}>🐵</span> MonoMarket
            </a>
          </li>

          <hr className="my-2 text-muted" />

          <li>
            <a 
              href="#buscar-pareja" 
              className="text-decoration-none d-flex align-items-center gap-3 p-3 rounded-2 fw-bold text-danger fw-bold text-dark" 
              style={{ ...linkStyle, color: "#dc3545" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(220, 53, 69, 0.15)"}
              onMouseLeave={manejarHoverOut}
            >
              <span style={{ fontSize: "1.3rem" }}>❤️</span> Tinder Chimpancé
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MonoNav;