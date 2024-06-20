import { useEffect, useState } from "react";
import {
  getArticle,
  getComments,
  deleteComment,
  voteOnArticle,
} from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { useParams } from "react-router-dom";
import "./ArticlePage.css";
import { ArticleComment } from "../components/ArticleComment";
import { ArticleVotes } from "../components/ArticleVotes";

export const ArticlePage = ({ currentUser }) => {
  const [article, setArticle] = useState();
  const [commentList, setCommentList] = useState();
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { articleId } = useParams();

  useEffect(() => {
    getArticle(articleId).then((article) => {
      setArticle(article);
    });

    getComments(articleId).then((comments) => {
      setCommentList(comments);
    });
  }, [articleId]);

  const addVote = () => {
    setIsUpdating(true);
    voteOnArticle(article.article_id, 1).then((updatedArticle) => {
      setArticle(updatedArticle);
      setIsUpdating(false);
    });
  };

  const deleteUserComment = (commentId) => {
    return deleteComment(commentId).then(() => {
      setCommentList((currentComments) =>
        currentComments.filter(({ comment_id }) => comment_id !== commentId)
      );
    });
  };

  if (!article) {
    return (
      <PageWrapper title={"NCNews"} currentUser={currentUser}>
        <p>Loading...</p>
      </PageWrapper>
    );
  }

  const articleTopic = article.topic[0].toUpperCase() + article.topic.slice(1);

  return (
    <PageWrapper currentUser={currentUser}>
      <div className="articlePage">
        <section className="articleHeader">
          <div className="articleInfo">
            <h2>{article.title}</h2>
            <h3>Author: {article.author}</h3>
            <p>Topic: {articleTopic}</p>
            <p>
              Date created: {new Date(article.created_at).toLocaleDateString()}
            </p>
          </div>
          <img src={article.article_img_url} alt={article.title} />
        </section>
        <section className="articleBody">{article.body}</section>
        <section>
          <h3>Comments</h3>
          <ArticleVotes
            currentVotes={article.votes}
            onVotesClicked={addVote}
            disabled={isUpdating || currentUser === undefined}
          />
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
      </div>
    </PageWrapper>
  );
};
