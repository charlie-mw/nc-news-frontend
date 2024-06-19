import { useEffect, useState } from "react";
import { getArticle, getComments, deleteComment } from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { useParams } from "react-router-dom";
import "./ArticlePage.css";
import { ArticleComment } from "../components/ArticleComment";

export const ArticlePage = ({ currentUser }) => {
  const [article, setArticle] = useState();
  const [commentList, setCommentList] = useState();
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [commentBeingDeleted, setCommentBeingDeleted] = useState();
  const { articleId } = useParams();

  useEffect(() => {
    getArticle(articleId).then((article) => {
      setArticle(article);
    });

    getComments(articleId).then((comments) => {
      setCommentList(comments);
    });
  }, [articleId]);

  const deleteUserComment = (comment) => {
    setCommentBeingDeleted(comment.comment_id);

    deleteComment(comment.comment_id).then(() =>
      setCommentList((currentComments) =>
        currentComments.filter(
          ({ comment_id }) => comment_id !== comment.comment_id
        )
      )
    );
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
          {!commentList ? (
            <p>Loading comments...</p>
          ) : (
            <ol>
              {commentList.map((comment) => (
                <ArticleComment
                  key={comment.comment_id}
                  comment={comment}
                  canDelete={comment.author === currentUser?.username}
                  onDeleteClicked={() => deleteUserComment(comment)}
                  isBeingDeleted={commentBeingDeleted === comment.comment_id}
                />
              ))}
            </ol>
          )}
        </section>
      </div>
    </PageWrapper>
  );
};
