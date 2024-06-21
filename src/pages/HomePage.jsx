import { useEffect, useState } from "react";
import { listArticles } from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { ArticlePreview } from "../components/ArticlePreview";
import { TopicFilter } from "../components/TopicFilter";
import { useSearchParams } from "react-router-dom";
import { Sort } from "../components/Sort";
import "./HomePage.css";

export const HomePage = ({ currentUser }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState(searchParams.get("topic"));
  const [articleList, setArticleList] = useState([]);
  const [sortByField, setSortByField] = useState(
    searchParams.get("sort_by") ?? "created_at"
  );
  const [sortByDirection, setSortByDirection] = useState(
    searchParams.get("order") ?? "desc"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    listArticles(selectedTopic, sortByField, sortByDirection).then(
      (articles) => {
        setArticleList(articles);
        setIsLoading(false);
        setSearchParams({
          sort_by: sortByField,
          order: sortByDirection,
          ...(selectedTopic ? { topic: selectedTopic } : {}),
        });
      }
    );
  }, [selectedTopic, sortByField, sortByDirection]);

  return (
    <PageWrapper currentUser={currentUser}>
      <div className="homePage">
        <TopicFilter
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        <Sort
          field={sortByField}
          setField={setSortByField}
          direction={sortByDirection}
          setDirection={setSortByDirection}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <section className="articleList">
              {articleList.map((article) => (
                <ArticlePreview key={article.article_id} article={article} />
              ))}
            </section>
          </>
        )}
      </div>
    </PageWrapper>
  );
};
