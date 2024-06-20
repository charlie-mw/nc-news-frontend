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

export const getComments = (articleId) => {
  return newsApi.get(`/articles/${articleId}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`/comments/${commentId}`);
};

export const voteOnArticle = (articleId, votesToAdd) => {
  return newsApi
    .patch(`/articles/${articleId}`, {
      inc_votes: votesToAdd,
    })
    .then(({ data }) => {
      return data.article;
    });
};
