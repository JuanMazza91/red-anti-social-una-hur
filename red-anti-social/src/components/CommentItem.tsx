import { useRelativeTime } from "../hooks/useRelativeTime";
import type { Comment } from "../types/Comment";
import type { User } from "../types/User";
import { FaTrash } from "react-icons/fa";

type Props = {
  comment: Comment;
  usuario: User | null;
  onDelete: (commentId: string) => void;
};

export default function CommentItem({ comment, usuario, onDelete }: Props) {
  const timeAgo = useRelativeTime(comment.createdAt);

  const puedeEliminar =
    usuario &&
    comment.autor &&
    comment.autor._id === usuario._id;


    const avatar = comment.autor.avatar;
    console.log(comment)
  return (
    <div className="comment-card">
      <div className="comment-header">
        
        {/* LEFT SIDE */}
        <div className="comment-user-info">
          
          {/* 🐵 AVATAR */}
            <img
                src={`/avatars/${avatar}`}
                alt="avatar"
                style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    border: "2px solid #000",
                    objectFit: "cover",
                    flexShrink: 0
              }}
            />

          <div>
            <div className="comment-author">
              {comment.autor?.nickname || "Usuario"}
            </div>

            <div className="comment-date">
              {timeAgo}
            </div>
          </div>
        </div>

        {/* DELETE */}
        {puedeEliminar && (
          <button
            className="delete-comment-btn"
            onClick={() => onDelete(comment._id)}
          >
            <FaTrash />
          </button>
        )}
      </div>

      <p className="comment-content">
        {comment.contenido}
      </p>
    </div>
  );
}