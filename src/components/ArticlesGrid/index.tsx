import { ArticlePreview } from "../../lib/content.js";

interface Props {
  articles: ArticlePreview[];
}

export const ArticlesGrid = ({ articles }: Props) => {
  return (
    <section className="articles-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nejnovější články</h2>
          <a href="index.html" className="see-all-link">Zobrazit všechny →</a>
        </div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <article className="article-card" key={index}>
              <div className="article-image">
                <img src={article.image} alt={article.title} />
                <div className="article-category">{article.category}</div>
              </div>
              <div className="article-content">
                <div className="article-meta-small">
                  <span>📅 {article.date}</span>
                  <span>⏱️ {article.readTime} min</span>
                </div>
                <h3><a href={article.link}>{article.title}</a></h3>
                <p>{article.lead}</p>
                <div className="article-author-small">
                  <img src={article.authorAvatar} alt={article.author} className="author-mini" />
                  <span>{article.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
