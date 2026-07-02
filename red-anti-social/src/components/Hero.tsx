import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import ModalPublication from "./ModalPublication";

interface HeroProps {
  refreshPosts: () => void; // Definimos el tipo de la función
}

const Hero = ({ refreshPosts }: HeroProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <section
      className="w-100 py-5 text-center position-relative border-bottom border-4 border-dark"
      style={{
        backgroundColor: "#3b6934",
        overflow: "hidden",
      }}
    >
      <div
        className="position-absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)",
          backgroundSize: "32px 32px",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <Container className="py-5 position-relative z-1 d-flex flex-column align-items-center">
        {/* Título Principal */}
        <h1
          className="font-headline text-uppercase tracking-tighter mb-4 text-warning display-3"
          style={{
            color: "#ffe245",
            textShadow: "4px 4px 0px rgba(0,0,0,1)",
            lineHeight: "1",
          }}
        >
          RECHAZA LA MODERNIDAD,
          <br />
          VUELVE AL MONO
        </h1>

        {/* Subtítulo */}
        <p
          className="text-white mx-auto mb-4 fs-5 fw-bold fst-italic"
          style={{ maxWidth: "640px" }}
        >
          El único rincón de internet donde el algoritmo es simplemente cuántas
          bananas podés cargar al mismo tiempo.
        </p>

        {/* Botón de Acción Neo-brutalista */}
        <Button
          size="lg"
          className="px-5 py-3 rounded-0 text-dark font-headline border border-4 border-dark banana-shadow banana-shadow-hover d-inline-flex align-items-center gap-2"
          style={{
            backgroundColor: "#ffe245",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
          onClick={handleOpen}
        >
          <span className="material-symbols-outlined fs-3"></span>
          Nueva Huella
        </Button>
      </Container>

      <ModalPublication show={showModal} handleClose={handleClose} onPostCreated={refreshPosts}/>
    </section>
  );
}

export default Hero;
