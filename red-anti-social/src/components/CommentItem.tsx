import { useRelativeTime } from "../hooks/useRelativeTime";
import type { Comment } from "../types/Comment";
import type { User } from "../types/User";
import { FaTrash } from "react-icons/fa";
import Avatar from "./Avatar";


type Props = {
  comment: Comment;
  usuario: User | null;
  onDelete: (commentId: string) => void;
};

export default function CommentItem({ comment, usuario, onDelete }: Props) {
  const timeAgo = useRelativeTime(comment.createdAt);

  const puedeEliminar =
    usuario && comment.autor && comment.autor._id === usuario._id;


    console.log("COMMENT", comment);
    console.log("AUTOR", comment.autor);
    console.log("AVATAR", comment.autor?.avatar);
  return (
    <div className="comment-card">
      <div className="comment-header">

        <div className="comment-user-info">

            {comment.autor && <Avatar user={comment.autor} size={35} />}

          <div>
            <div className="comment-author">
              {comment.autor?.nickname || "Usuario"}
            </div>

            <div className="comment-date">{timeAgo}</div>
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

      <p className="comment-content">{comment.contenido}</p>
    </div>
  );
}
