
import { useState } from 'react'; 
import { Navbar, Container, Nav, Image } from 'react-bootstrap';

function NavbarApp() {

  const [busqueda, setBusqueda] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", busqueda);
  };

  return (
    <Navbar 
      className="sticky-top py-2 border-bottom border-4 border-dark"
      style={{ 
        backgroundColor: '#3b6934', 
        overflow: 'hidden'
      }}
    >
     

      <Container className="d-flex justify-content-between align-items-center position-relative" style={{ zIndex: 1 }}>
        
        <Navbar.Brand 
          href="#home" 
          className="font-headline text-uppercase tracking-tighter mb-0 fs-3"
          style={{ 
            color: '#ffe245', 
            textShadow: '2px 2px 0px rgba(0,0,0,1)',
            fontWeight: '900'
          }}
        >
          UnaHur
        </Navbar.Brand>

        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2 rounded-0 border border-3 border-dark"
            type="search"
            placeholder="Buscar tags o usuarios..."
            aria-label="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button 
            className="btn btn-warning rounded-0 border border-3 border-dark font-headline banana-shadow-hover" 
            type="submit"
            style={{ backgroundColor: '#ffe245', fontWeight: 'bold' }}
          >
            Buscar
          </button>
        </form>

      
        <Nav className="align-items-center">
          <Nav.Link href="#perfil" className="p-0">
            <Image
              src="https://via.placeholder.com/40" 
              width={40}
              height={40}
              alt="Mi Perfil"
              className="border border-3 border-dark banana-shadow banana-shadow-hover rounded-0"
            />
          </Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
}

export default NavbarApp;