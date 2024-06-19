import { Link } from "react-router-dom";
import "./PageWrapper.css";

export const PageWrapper = ({ currentUser, children }) => (
  <article className="pageWrapper">
      <div className="pageWrapperTitleSection">
        <Link to="/homepage">
          <h1>NCNews</h1>
        </Link>
        <p className="pageWrapperCurrentUser">
          {currentUser && `You are logged in as: ${currentUser.username}`}
          {!currentUser && (
            <>
              {"You are not logged in: "}
              <Link to="/">Login</Link>
            </>
          )}
        </p>
      </div>
    <div className="pageWrapperContent">{children}</div>
  </article>
);
