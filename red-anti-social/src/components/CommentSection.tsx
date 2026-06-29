import { useState } from "react";
import { obtenerComentariosDelPost } from "../api/PostApi";
import { crearComentario } from "../api/CommentApi";
import type { Comment } from "../types/Comment";
import type { Post } from "../types/Post";
import "../style/CommentSection.css";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[];
  postId: string;
  setComments: (comments: Comment[]) => void;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
}

function CommentSection({ comments, postId, setComments, setPost }: Props) {
  const [contenido, setContenido] = useState("");

  const fakeUserId = "6a3fee0241c500558bf89577";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contenido.trim()) return;

    try {
      await crearComentario(contenido, fakeUserId, postId);

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
      alert("No se pudo crear el comentario");
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
            <CommentItem key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;