import { useEffect, useState } from "react";
import { listArticles } from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { ArticlePreview } from "../components/ArticlePreview";
import { TopicFilter } from "../components/TopicFilter";
import "./HomePage.css";
import { useSearchParams } from "react-router-dom";

export const HomePage = ({ currentUser }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState(searchParams.get("topic"));
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    listArticles(selectedTopic).then((articles) => {
      setArticleList(articles);
      setIsLoading(false);
    });

    if (selectedTopic) {
      setSearchParams({ topic: selectedTopic });
    } else {
      setSearchParams();
    }
  }, [selectedTopic]);

  return (
    <PageWrapper currentUser={currentUser}>
      <div className="homePage">
        <TopicFilter
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section className="articleList">
            {articleList.map((article) => (
              <ArticlePreview key={article.article_id} article={article} />
            ))}
          </section>
        )}
      </div>
    </PageWrapper>
  );
};
