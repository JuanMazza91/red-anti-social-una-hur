function Noticias() {
  return (
    <div className="d-none d-md-block">
      <div
        className="card p-3 border border-2 border-dark rounded-0 "
        style={{ top: "80px", background: "#F5F5DC" }}
      >
        <h5 className="fw-bold text-dark">Noticias de la selva</h5>
        <hr />
        <div className="mb-2">
          <h6>Tension entre selvas</h6>
          <p className="small ">
            El acuerdo de paz firmado entre Planos Unidos y la Selva Irani no
            duro ni 48 hs. El pacto se vio afectado porque la Selva Israeli no
            seso el fuego hacia el Libanano, que era una de las condiciones de
            paz, probocando la ruptura del acuerdo.
          </p>
        </div>
        <div className="mb-2">
          <h6>Mundial de junglas</h6>
          <p className="small text-muted">
            El jugador Mono Messi hace historia, rompiendo todos los record de
            la selva!!!.Se convirtió en el primer monofutbolista en la historia
            en marcar goles en siete partidos consecutivos de la Copa Mundial de
            Junglas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noticias;
