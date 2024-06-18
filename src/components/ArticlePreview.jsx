import { Link } from "react-router-dom";
import "./ArticlePreview.css";

export const ArticlePreview = ({
  article: { title, author, topic, comment_count, article_img_url, article_id },
}) => {
  return (
    <article className="articlePreview">
      <div className="articlePreviewInfo">
        <div>
          <h3>{title}</h3>
          <p>
            {author} - {topic}
          </p>
          <p>{comment_count} comments</p>
        </div>
        <Link className="link" to={`/article/${article_id}`}>
          <button>See full article</button>
        </Link>
      </div>
      <img src={article_img_url} alt={title} />
    </article>
  );
};
