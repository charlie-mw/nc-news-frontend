import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-woew.onrender.com/api",
});

export const listUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    console.log();
    return data.users;
  });
};
