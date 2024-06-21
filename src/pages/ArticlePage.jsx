import { useEffect, useState } from "react";
import {
  getArticle,
  getComments,
  deleteComment,
  voteOnArticle,
  postComment,
} from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { useParams } from "react-router-dom";
import "./ArticlePage.css";
import { ArticleComment } from "../components/ArticleComment";
import { ArticleVotes } from "../components/ArticleVotes";
import { NotFoundPage } from "./NotFoundPage";

export const ArticlePage = ({ currentUser }) => {
  const [article, setArticle] = useState();
  const [commentList, setCommentList] = useState();
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const { articleId } = useParams();

  useEffect(() => {
    getArticle(articleId)
      .then((article) => {
        setArticle(article);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setIsNotFound(true);
        }
      });

    getComments(articleId).then((comments) => {
      setCommentList(comments);
    });
  }, [articleId]);

  const updateVotes = (voteCount) => {
    setIsUpdating(true);

    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + voteCount,
    }));

    voteOnArticle(article.article_id, voteCount)
      .then((updatedArticle) => {
        setArticle(updatedArticle);
        setIsUpdating(false);
      })
      .catch(() => {
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: currentArticle.votes - voteCount,
        }));
        setIsUpdating(false);
        alert("An error occurred when updating this article's votes");
      });
  };

  const deleteUserComment = (commentId) => {
    return deleteComment(commentId)
      .then(() => {
        setCommentList((currentComments) =>
          currentComments.filter(({ comment_id }) => comment_id !== commentId)
        );
      })
      .catch(() => {
        alert("An error occurred while deleting your comment");
      });
  };

  const postUserComment = (event) => {
    event.preventDefault();

    if (currentCommentText.length !== 0 && currentUser) {
      postComment(article.article_id, currentCommentText, currentUser.username)
        .then((newComment) => {
          setCommentList((currentComments) => [newComment, ...currentComments]);
          setCurrentCommentText("");
        })
        .catch(() => {
          alert("An error occurred while submitting your comment");
        });
    }
  };

  const articleTopic =
    article?.topic[0].toUpperCase() + article?.topic.slice(1);

  if (isNotFound) {
    return <NotFoundPage currentUser={currentUser} />;
  }

  return (
    <PageWrapper currentUser={currentUser}>
      <div className="articlePage">
        {!article ? (
          <p>Loading...</p>
        ) : (
          <>
            <section className="articleHeader">
              <div className="articleInfo">
                <h2>{article.title}</h2>
                <h3>Author: {article.author}</h3>
                <p>Topic: {articleTopic}</p>
                <p>
                  Date created:{" "}
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
              <img src={article.article_img_url} alt={article.title} />
            </section>
            <section className="articleBody">{article.body}</section>
            <section className="articleVotesSection">
              <h3>Vote on this article</h3>
              <ArticleVotes
                currentVotes={article.votes}
                onVoteClicked={updateVotes}
                disabled={isUpdating || currentUser === undefined}
              />
            </section>
            <section className="articlePageCommentSection">
              <h3>Comments</h3>
              <form
                className="articlePageCommentForm"
                onSubmit={postUserComment}
              >
                <label htmlFor="comment-input">Add a comment:</label>
                <div className="articlePageCommentInputWrapper">
                  <textarea
                    id="comment-input"
                    required
                    placeholder="Type your comment here..."
                    value={currentCommentText}
                    onChange={(event) =>
                      setCurrentCommentText(event.target.value)
                    }
                  />
                  <button
                    disabled={currentCommentText.length === 0 || !currentUser}
                  >
                    {currentUser ? "Submit" : "Log in to comment"}
                  </button>
                </div>
              </form>
              {!commentList ? (
                <p>Loading comments...</p>
              ) : commentList.length === 0 ? (
                <p>There are no comments to show - be the first to comment!</p>
              ) : (
                <ol>
                  {commentList.map((comment) => (
                    <ArticleComment
                      key={comment.comment_id}
                      comment={comment}
                      canDelete={comment.author === currentUser?.username}
                      deleteComment={deleteUserComment}
                    />
                  ))}
                </ol>
              )}
            </section>
          </>
        )}
      </div>
    </PageWrapper>
  );
};
