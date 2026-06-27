import { Card } from "react-bootstrap";
import type { Post } from "../types/Index";
import TagList from "./TagList";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  const { autor, texto, imagenes, tag, createdAt } = post;

  // Formatear la fecha
  const fechaFormateada = new Date(createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card

      className="border border-3 border-dark rounded-0 banana-shadow mb-5 bg-white"
    >
      {/* Cabecera del post con info del autor y fecha */}
      <Card.Header className="d-flex align-items-center rounded-0 border-bottom  py-3">
        <div>
          <Card.Title className="mb-0 fs-5 fw-bold text-dark font-headline ">
            {autor?.nickname || "Monke Anónimo"}
          </Card.Title>
          <Card.Text className="text-muted small fw-bold mt-1">
            {fechaFormateada}
          </Card.Text>
        </div>
      </Card.Header>

      {/* Imagen del post con borde inferior negro grueso si existe */}
      {imagenes && imagenes.length > 0 && (
        <div className="border-bottom border-4 border-dark overflow-hidden bg-light">
          <Card.Img
            variant="top"
            src={imagenes[0].url}
            alt="Imagen del post"
            className="rounded-0 w-100 object-cover"
            style={{ maxHeight: "400px" }}
          />
        </div>
      )}

      {/* Cuerpo del post con el texto */}
      <Card.Body className="p-4">
        <Card.Text className="fs-7 " style={{ lineHeight: "1.5" }}>
          {texto}
        </Card.Text>
      </Card.Body>
      <div className="d-flex gap-2 align-items-center">
        {tag && tag.length > 0 ? (
          <TagList tags={tag} />
        ) : (
          <span className="badge bg-success text-white border border-2 border-dark rounded-0 px-3 py-1 text-xs fw-bold">
            #VIDABANANA
          </span>
        )}
      </div>
      {/* Pie del post con etiquetas y contador de comentarios */}
      {/* Pie del post con elementos alineados a la izquierda */}
      <Card.Footer className="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-sm-center bg-white border-top  border-dark rounded-0 py-3 justify-content-start">
        {/* Sección de interacciones pegada a la izquierda junto a los tags */}
        <div className="d-flex align-items-center gap-3">
          <span className="text-dark small ">🍌 72 Banano</span>
          <span className="text-dark small ">💬 12 Comentarios</span>
          
        </div>
        <Link
            to="/destallePublicacion"
            className="fw-bold text-decoration-none text-dark login-link ms-sm-auto"
          >
            Ver mas
          </Link>
      </Card.Footer>
    </Card>
  );
}

export default PostCard;
