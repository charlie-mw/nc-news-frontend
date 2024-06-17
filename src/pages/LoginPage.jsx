import { useEffect, useState } from "react";
import { listUsers } from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import "./LoginPage.css";

export const LoginPage = ({ currentUser, setCurrentUser }) => {
  const [usernameText, setUsernameText] = useState("");
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    listUsers().then((users) => {
      setUserList(users);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <PageWrapper title="NCNews" subtitle="Login" currentUser={currentUser}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const apiUser = userList.find(
              ({ username }) => username === usernameText
            );

            if (apiUser) {
              setCurrentUser(apiUser);
              setIsInvalid(false);
              window.location = "/";
            } else {
              setIsInvalid(true);
            }
          }}
          className="loginForm"
        >
          <label>
            <p>Username:</p>
            <input
              value={usernameText}
              onChange={(event) => setUsernameText(event.target.value)}
            />
          </label>
          <button>Login</button>
          {isInvalid && (
            <p className="invalidUsername">The selected username is invalid!</p>
          )}
        </form>
      )}
    </PageWrapper>
  );
};
