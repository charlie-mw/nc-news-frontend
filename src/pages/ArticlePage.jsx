import { useEffect, useState } from "react";
import { getArticle } from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { useParams } from "react-router-dom";
import "./ArticlePage.css";

export const ArticlePage = ({ currentUser }) => {
  const [article, setArticle] = useState();
  const [commentList, setCommentList] = useState([]);
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticle(articleId).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [articleId]);

  if (isLoading) {
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
      </div>
    </PageWrapper>
  );
};
