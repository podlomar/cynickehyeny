import { ArticlePreview } from "../../lib/content.js";

interface Props {
  articlePreview: ArticlePreview;
}

export const ArticleCard = ({ articlePreview }: Props) => {
  return (
    <article className="article-card">
      <div className="article-image">
        <img src={articlePreview.image} alt={articlePreview.title} />
        <div className="article-category">{articlePreview.category}</div>
      </div>
      <div className="article-content">
        <div className="article-meta-small">
          <span>📅 {articlePreview.date}</span>
          <span>⏱️ {articlePreview.readTime} min</span>
        </div>
        <h3><a href={articlePreview.link}>{articlePreview.title}</a></h3>
        <p>{articlePreview.lead}</p>
        <div className="article-author-small">
          <img src={articlePreview.authorAvatar} alt={articlePreview.author} className="author-mini" />
          <span>{articlePreview.author}</span>
        </div>
      </div>
    </article>
  );
};
