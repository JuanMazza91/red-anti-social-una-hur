import { Button } from "react-bootstrap";
import "../styles/PerfilEstados.css";

interface PerfilErrorProps {
  mensaje: string | null;
  onRedirigir: () => void;
}

export function PerfilError({ mensaje, onRedirigir }: PerfilErrorProps) {
  const mensajeMostrado = mensaje || "Simio no encuentra a simio...";

  return (
    <div className="perfil-contenedor pantalla-completa" role="alert">
      <div className="perfil-caja-interna">
        <div className="perfil-icono" aria-hidden="true">
          🦧💥
        </div>

        <h4 className="perfil-titulo">¡ERROR EN LA COPA DEL ÁRBOL!</h4>

        <p className="perfil-mensaje">{mensajeMostrado}</p>

        <Button onClick={onRedirigir} className="perfil-error-btn">
          VOLVER A LA MANADA
        </Button>
      </div>
    </div>
  );
}

export default PerfilError;
