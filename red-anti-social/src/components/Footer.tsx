
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5 border-top border-secondary">
      <Container className="text-center text-md-start">
        <Row className="text-center text-md-start">
          
          {/* COLUMNA 1: Branding / Eslogan */}
          <Col md={3} lg={3} xl={3} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">🍌 MonoSocial</h5>
            <p className="small text-muted">
              La comunidad primate de código más grande de la selva digital. Conectando desarrolladores, bananas y repositorios desde 2026.
            </p>
          </Col>

          {/* COLUMNA 2: Enlaces de la App */}
          <Col md={2} lg={2} xl={2} className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-white-50">Explorar</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#inicio" className="text-muted text-decoration-none text-white-hover">Inicio</a></li>
              <li><a href="#mensajes" className="text-muted text-decoration-none text-white-hover">Mensajes</a></li>
              <li><a href="#buscar-pareja" className="text-muted text-decoration-none text-white-hover">Tinder Chimpancé</a></li>
            </ul>
          </Col>

          {/* COLUMNA 3: Soporte / Comunidad */}
          <Col md={3} lg={2} xl={2} className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-white-50">Soporte</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#ayuda" className="text-muted text-decoration-none text-white-hover">Centro de Ayuda</a></li>
              <li><a href="#reglas" className="text-muted text-decoration-none text-white-hover">Reglas de la Selva</a></li>
              <li><a href="#terminos" className="text-muted text-decoration-none text-white-hover">Términos y Privacidad</a></li>
            </ul>
          </Col>

          {/* COLUMNA 4: Contacto / Redes */}
          <Col md={4} lg={3} xl={3} className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-white-50">Contacto</h6>
            <p className="small text-muted mb-2">🏢 Selva Central, Árbol 42</p>
            <p className="small text-muted mb-2">✉️ soporte@monosocial.com</p>
            
            {/* Iconos de Redes Sociales */}
            <div className="d-flex gap-3 mt-3">
              <a href="#github" className="text-muted text-white-hover fs-5" title="GitHub">📁</a>
              <a href="#linkedin" className="text-muted text-white-hover fs-5" title="LinkedIn">💼</a>
              <a href="#twitter" className="text-muted text-white-hover fs-5" title="Twitter">🐦</a>
            </div>
          </Col>

        </Row>

        {/* Separador inferior */}
        <hr className="mb-4 mt-4 text-secondary" />

        {/* Fila de Copyright */}
        <Row className="align-items-center">
          <Col md={7} lg={8} className="text-center text-md-start">
            <p className="small text-muted mb-0">
              © {new Date().getFullYear()} <strong>MonoSocial Inc.</strong> Todos los derechos reservados a la comunidad chimpancé.
            </p>
          </Col>
          <Col md={5} lg={4} className="text-center text-md-end mt-2 mt-md-0">
            <span className="small text-muted">Hecho con ❤️ y 🍌</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;