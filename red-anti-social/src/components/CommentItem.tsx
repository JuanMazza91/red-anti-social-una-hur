import { useRelativeTime } from "../hooks/useRelativeTime";
import type { Comment } from "../types/Comment";
import type { User } from "../types/User";
import { FaTrash } from "react-icons/fa";

type Props = {
    comment: Comment;
    usuario: User | null;
    onDelete: (commentId: string) => void;
};

export default function CommentItem({ comment, usuario, onDelete,}: Props) {
    const timeAgo = useRelativeTime(comment.createdAt);

    const puedeEliminar =
        usuario &&
        comment.autor &&
        comment.autor._id === usuario._id;

    return (
        <div className="comment-card">
            <div className="comment-header">
                <div>
                <div className="comment-author">
                    {comment.autor?.nickname || "Usuario"}
                </div>

                <div className="comment-date">
                    {timeAgo}
                </div>
                </div>

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