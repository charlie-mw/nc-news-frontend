import "./ArticleVotes.css";
export const ArticleVotes = ({ currentVotes, onVoteClicked, disabled }) => {
  return (
    <div className="articleVotes">
      <p>Current votes: {currentVotes}</p>
      <button
        className="articleVotesUpvote"
        onClick={() => onVoteClicked(1)}
        disabled={disabled}
      >
        ＋
      </button>
      <button
        className="articleVotesDownvote"
        onClick={() => onVoteClicked(-1)}
        disabled={disabled}
      >
        ﹣
      </button>
    </div>
  );
};
