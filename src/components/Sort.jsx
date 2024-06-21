import "./Sort.css";

const sortByFields = {
  created_at: "Creation Date",
  author: "Author",
  title: "Title",
  article_id: "Article ID",
  topic: "Topic",
  votes: "# of Votes",
};

export const Sort = ({ field, setField, direction, setDirection }) => (
  <section className="articleFilterSection">
    <label>
      Sort by:
      <select value={field} onChange={(event) => setField(event.target.value)}>
        {Object.entries(sortByFields).map(([fieldKey, fieldName]) => (
          <option key={fieldKey} value={fieldKey}>
            {fieldName}
          </option>
        ))}
      </select>
    </label>
    <label>
      Direction:
      <select value={direction} onChange={(event) => setDirection(event.target.value)}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </label>
  </section>
);
