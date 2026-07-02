import { Card } from "react-bootstrap";
import type { DetailPostCardProps } from "../types/Index";
import TagList from "./TagList";
import { useRelativeTime } from "../hooks/useRelativeTime";
import Swal from "sweetalert2";
import { useAuth } from "../context/LoginContext";
import { darBananoAlPost } from "../api/PostApi";
import { eliminarPost } from "../api/PostApi";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Avatar from "./Avatar";

function DetailPostCard({ post, onUpdatePost }: DetailPostCardProps) {
  const { autor, texto, imagenes, tags, bananos } = post;
  const { usuarioActual } = useAuth();
  const fechaRelativa = useRelativeTime(post.createdAt);
  const navigate = useNavigate();
  const puedeEliminar =
    usuarioActual && post.autor && post.autor._id === usuarioActual._id;

  const yaDioBanano = (bananos || []).includes(usuarioActual?._id || "");

  const handleBananoClick = async () => {
    if (!usuarioActual) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "¡OOK! Debes estar logueado en la manada para dar bananos 🐵",
      });
      return;
    }

    try {
      const bananosActualizados = await darBananoAlPost(
        post._id,
        usuarioActual._id,
      );

      onUpdatePost({ ...post, bananos: bananosActualizados });
    } catch (error) {
      console.error("Error al procesar el banano en PostCard:", error);
    }
  };

  const handleDeletePost = async () => {
    const result = await Swal.fire({
      title: "Eliminar publicación",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await eliminarPost(post._id);

      await Swal.fire({
        icon: "success",
        title: "Publicación eliminada",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la publicación",
      });
    }
  };

  return (
    <Card className="border border-3 border-dark rounded-0 banana-shadow mb-0 bg-white">
      <Card.Header className="rounded-0 border-bottom py-3">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* LEFT SIDE */}
          <div className="d-flex align-items-center gap-2">
            {autor && <Avatar user={autor} size={45} />}

            <div className="d-flex flex-column">
              <span className="fw-bold text-dark font-headline">
                {autor?.nickname || "Monke Anónimo"}
              </span>

              <span className="text-muted small fw-bold">{fechaRelativa}</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          {puedeEliminar && (
            <button className="delete-post-btn" onClick={handleDeletePost}>
              <FaTrash />
            </button>
          )}
        </div>
      </Card.Header>

      {imagenes && imagenes.length > 0 && (
        <div className="bg-light p-3">
          {imagenes.length > 1 ? (
            <div className="row g-2 m-0">
              {/* COLUMNA 1 (Imagen Izquierda) */}
              <div className="col-6 p-0">
                <Card.Img
                  variant="top"
                  src={imagenes[0].url}
                  alt="Imagen del post 1"
                  className="border border-3 border-dark w-100 object-fit-cover rounded-2"
                  style={{ height: "300px" }}
                />
              </div>

              {/* COLUMNA 2 (Imagen Derecha) */}
              <div className="col-6 p-0 position-relative">
                <img
                  src={imagenes[1].url}
                  alt="Imagen del post 2"
                  className="border border-3 border-dark w-100 object-fit-cover rounded-2"
                  style={{ height: "300px" }}
                />

                {imagenes.length > 2 && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 border border-3 border-dark rounded-2 d-flex align-items-center justify-content-center"
                    style={{ pointerEvents: "none" }}
                  >
                    <span className="text-white fs-2 fw-bold font-headline">
                      +{imagenes.length - 2}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-100">
              <Card.Img
                variant="top"
                src={imagenes[0].url}
                alt="Imagen del post"
                className="border border-3 border-dark w-100 object-fit-cover rounded-2"
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Cuerpo del post con el texto */}
      <Card.Body className="p-4">
        <Card.Text className="fs-7" style={{ lineHeight: "1.5" }}>
          {texto}
        </Card.Text>
      </Card.Body>
      <div className="d-flex flex-wrap gap-2 align-items-center px-4 pb-4">
        <TagList tags={tags || []} />
      </div>

      <Card.Footer className="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-sm-center bg-white border-top border-dark rounded-0 py-3 justify-content-start">
        {/* Sección de interacciones pegada a la izquierda junto a los tags */}
        <div className="d-flex align-items-center gap-3">
          <span
            onClick={handleBananoClick}
            style={{ cursor: "pointer", userSelect: "none" }}
            className={`small fw-bold transition-all ${yaDioBanano ? "text-warning" : "text-dark"}`}
            title={yaDioBanano ? "Quitar banano" : "Dar banano"}
          >
            🍌 {bananos ? bananos.length : 0} Banano
          </span>

          <span className="text-dark small">
            💬 {post.comentarios ? post.comentarios.length : 0}{" "}
            {post.comentarios?.length === 1 ? "Comentario" : "Comentarios"}
          </span>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default DetailPostCard;
