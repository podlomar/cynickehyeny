import { ArticleCard } from "../ArticleCard";
import { ArticlePreview } from "../../lib/content";

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
            <ArticleCard key={index} articlePreview={article} />
          ))}
        </div>
      </div>
    </section>
  );
};
