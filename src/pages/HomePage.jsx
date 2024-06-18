import { useEffect, useState } from "react";
import { listArticles } from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { ArticlePreview } from "../components/ArticlePreview";
import "./HomePage.css";

export const HomePage = ({ currentUser }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    listArticles().then((articles) => {
      setArticleList(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <PageWrapper title="NCNews" currentUser={currentUser}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className="articleList">
          {articleList.map((article) => (
            <ArticlePreview key={article.article_id} article={article} />
          ))}
        </section>
      )}
    </PageWrapper>
  );
};
