import "./PageWrapper.css";

export const PageWrapper = ({ title, subtitle, currentUser, children }) => (
  <article className="pageWrapper">
    <div className="pageWrapperTitleSection">
      <h1>{title}</h1>
      <p className="pageWrapperCurrentUser">
        {currentUser ? `You are logged in as: ${currentUser.username}` : `You are not logged in`}
      </p>
    </div>
    {subtitle && <h2>{subtitle}</h2>}
    <div className="pageWrapperContent">{children}</div>
  </article>
);
