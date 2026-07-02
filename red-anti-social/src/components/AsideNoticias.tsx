function Noticias() {
  return (
    <div className="d-none d-md-block">
      <div className="card border border-3 border-dark rounded-0 banana-shadow bg-white">
        
        <div className="card-header border-bottom border-3 border-dark bg-white py-3">
          <h5 className="fw-bold mb-0 font-headline">
            📰 Noticias de la Selva
          </h5>
        </div>

        <div className="card-body p-4">
          <div className="mb-4">
            <h6 className="fw-bold">
              🌴 Tensión entre selvas
            </h6>

            <p
              className="mb-0"
              style={{ lineHeight: "1.5" }}
            >
              El acuerdo de paz firmado entre Planos Unidos y la
              Selva Irani no duró ni 48 hs. El pacto se vio afectado
              porque la Selva Israeli no cesó el fuego hacia el
              Libanano, que era una de las condiciones de paz,
              provocando la ruptura del acuerdo.
            </p>
          </div>

          <hr className="border-dark border-2 opacity-100" />

          <div>
            <h6 className="fw-bold">
              ⚽ Mundial de Junglas
            </h6>

            <p
              className="mb-0"
              style={{ lineHeight: "1.5" }}
            >
              El jugador Mono Messi hace historia rompiendo todos
              los récords de la selva. Se convirtió en el primer
              monofutbolista en marcar goles en siete partidos
              consecutivos de la Copa Mundial de Junglas.
            </p>
          </div>
        </div>

        <div className="card-footer bg-white border-top border-3 border-dark py-2">
          <small className="fw-bold text-muted">
            Última actualización: hace 5 minutos 🐒
          </small>
        </div>

      </div>
    </div>
  );
}

export default Noticias;