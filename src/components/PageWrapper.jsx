import { Link } from "react-router-dom";
import "./PageWrapper.css";

export const PageWrapper = ({ subtitle, currentUser, children }) => (
  <article className="pageWrapper">
    <div className="pageWrapperHeader">
      <div className="pageWrapperTitleSection">
        <h1>NCNews</h1>
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
      {subtitle && <h2>{subtitle}</h2>}
    </div>
    <div className="pageWrapperContent">{children}</div>
  </article>
);
