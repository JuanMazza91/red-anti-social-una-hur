import "../style/PerfilEstados.css";

export function PerfilLoading() {
  return (
    <div
      className="perfil-contenedor pantalla-completa"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="perfil-caja-interna">
        <div className="perfil-icono" aria-hidden="true">
          🦧🍌
        </div>

        <h4 className="perfil-titulo">¡BUSCANDO EN LA COPA DEL ÁRBOL!</h4>

        <p className="perfil-mensaje">Simio buscando bananas...</p>

        <div className="perfil-loading-spinner" aria-hidden="true"></div>
      </div>
    </div>
  );
}

export default PerfilLoading;
