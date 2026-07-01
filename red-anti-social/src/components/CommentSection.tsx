import { useState } from "react";
import { obtenerComentariosDelPost } from "../api/PostApi";
import { crearComentario } from "../api/CommentApi";
import type { Comment } from "../types/Index";
import type { Post } from "../types/Index";
import type { User } from "../types/Index";
import "../style/CommentSection.css";
import CommentItem from "./CommentItem";
import { eliminarComentario } from "../api/CommentApi";
import Swal from "sweetalert2";

interface Props {
  comments: Comment[];
  postId: string;
  setComments: (comments: Comment[]) => void;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  usuario: User | null;
}

function CommentSection({ comments, postId, setComments, setPost, usuario }: Props) {
  const [contenido, setContenido] = useState("");

  const usuarioActual = usuario ? usuario._id: " ";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contenido.trim()) return;

    try {
      await crearComentario(contenido, usuarioActual, postId);

      const nuevosComentarios = await obtenerComentariosDelPost(postId);
      setComments(nuevosComentarios);
      setPost(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          comentarios: nuevosComentarios
        };
      });
      setContenido("");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "¡OOK! Debes estar logueado en la manada para comentar 🐵",
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const result = await Swal.fire({
      title: "Eliminar comentario",
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
      await eliminarComentario(commentId);

      const nuevosComentarios =
        await obtenerComentariosDelPost(postId);

      setComments(nuevosComentarios);

      setPost((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          comentarios: nuevosComentarios,
        };
      });

      await Swal.fire({
        title: "Comentario eliminado",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el comentario");
    }
  };

  return (
    <div className="comment-section">
      <h4 className="comment-title">
        Comentarios ({comments.length})
      </h4>

      <form onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          rows={3}
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribí un comentario..."
        />

        <button type="submit" className="comment-button">
          Comentar
        </button>
      </form>

      <div className="mt-4">
        {comments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} usuario={usuario} onDelete={handleDeleteComment}/>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;