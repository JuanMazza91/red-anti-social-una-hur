import { useRelativeTime } from "../hooks/useRelativeTime";
import type { Comment } from "../types/Comment";

type Props = {
    comment: Comment;
};

export default function CommentItem({ comment }: Props) {
    const timeAgo = useRelativeTime(comment.createdAt);

    return (
        <div className="comment-card">
        <div className="comment-author">
            {comment.autor?.nickname || "Usuario"}
        </div>

        <div className="comment-date">
            {timeAgo}
        </div>

        <p className="comment-content">
            {comment.contenido}
        </p>
        </div>
    );
}