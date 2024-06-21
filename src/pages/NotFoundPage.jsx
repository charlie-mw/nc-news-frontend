import { Link } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import "./NotFoundPage.css";

export const NotFoundPage = ({ currentUser }) => (
  <PageWrapper currentUser={currentUser}>
    <div className="notFoundPage">
      <h2>404: Not Found</h2>
      <h3>This page does not exist.</h3>
      <Link to="/homepage">Click here to go back to the homepage</Link>
    </div>
  </PageWrapper>
);
