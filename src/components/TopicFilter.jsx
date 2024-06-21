import { useState, useEffect } from "react";
import { listTopics } from "../../utils/api";
import "./TopicFilter.css";

export const TopicFilter = ({ selectedTopic, setSelectedTopic }) => {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    listTopics().then((topicList) => {
      if (!topicList.some(({ slug }) => slug === selectedTopic)) {
        setSelectedTopic(undefined);
      }
      setTopicList(topicList);
    });
  }, []);

  return (
    <section className="topicList">
      <label>Filter by topic:</label>
      <button
        className={!selectedTopic ? "button selectedTopic" : "button"}
        onClick={() => setSelectedTopic(undefined)}
      >
        All
      </button>
      {topicList.map((topic) => (
        <button
          className={
            selectedTopic === topic.slug ? "button selectedTopic" : "button"
          }
          onClick={() => setSelectedTopic(topic.slug)}
          key={topic.slug}
        >
          {topic.slug}
        </button>
      ))}
    </section>
  );
};
