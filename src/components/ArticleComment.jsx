import { useState } from "react";
import "./ArticleComment.css";

export const ArticleComment = ({ comment, canDelete, deleteComment }) => {
  const commentDate = new Date(comment.created_at);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteClicked = () => {
    setIsDeleting(true);
    deleteComment(comment.comment_id).then(() => {
      setIsDeleting(false);
    });
  };

  return (
    <li className="articleComment">
      {canDelete && (
        <button
          className="articleCommentDeleteButton"
          onClick={onDeleteClicked}
          disabled={isDeleting}
        >
          X
        </button>
      )}
      <p>
        <i>{comment.author}</i> commented:
      </p>
      <blockquote>{comment.body}</blockquote>
      <p>
        {"on: "}
        <i>{`${commentDate.toLocaleDateString()} at ${commentDate.toLocaleTimeString()}`}</i>
      </p>
    </li>
  );
};
