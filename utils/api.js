import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-woew.onrender.com/api",
});

export const listUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const listArticles = (topic) => {
  return newsApi.get("/articles", { params: { topic } }).then(({ data }) => {
    return data.articles;
  });
};

export const getArticle = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then(({ data }) => {
    return data.article;
  });
};

export const listTopics = () => {
  return newsApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
