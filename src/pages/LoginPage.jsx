import { useEffect, useState } from "react";
import { listUsers } from "../../utils/api";
import { PageWrapper } from "../components/PageWrapper";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = ({ currentUser, setCurrentUser }) => {
  const [usernameText, setUsernameText] = useState("");
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    listUsers().then((users) => {
      setUserList(users);
      setIsLoading(false);
    });
  }, []);

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
              navigate("/homepage");
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
