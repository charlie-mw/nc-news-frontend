import "./ArticleComment.css";

export const ArticleComment = ({
  comment,
  canDelete,
  onDeleteClicked,
  isBeingDeleted,
}) => {
  const commentDate = new Date(comment.created_at);

  return (
    <li className="articleComment">
      {canDelete && (
        <button
          className="articleCommentDeleteButton"
          onClick={onDeleteClicked}
          disabled={isBeingDeleted}
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
