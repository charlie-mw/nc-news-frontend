export const ArticleVotes = ({ currentVotes, onVotesClicked, disabled }) => {
  return (
    <button
      className="articleVotes"
      onClick={onVotesClicked}
      disabled={disabled}
    >
      Current votes = {currentVotes}
    </button>
  );
};
