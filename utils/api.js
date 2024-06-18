import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-woew.onrender.com/api",
});

export const listUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const listArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticle = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then(({ data }) => {
    return data.article;
  });
};
