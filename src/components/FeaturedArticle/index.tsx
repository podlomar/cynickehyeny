import { ArticlePreview } from "../../lib/content";

interface Props {
  preview: ArticlePreview;
}

export const FeaturedArticle = ({ preview }: Props) => {
  return (
    <section className="featured-article">
      <div className="container">
        <h2 className="section-title">Doporučujeme</h2>
        <div className="featured-card">
          <div className="featured-image">
            <img src="post.jpg" alt={preview.title} />
            <div className="featured-badge">Nejnovější</div>
          </div>
          <div className="featured-content">
            <div className="featured-meta">
              <span className="meta-item">📅 {preview.date}</span>
              <span className="meta-separator">•</span>
              <span className="meta-item">⏱️ 8 min read</span>
              <span className="meta-separator">•</span>
              <span className="meta-item">🏷️ Politika</span>
            </div>
            <h3><a href="index.html">{preview.title}</a></h3>
            <p>{preview.lead}</p>
            <div className="featured-author">
              <img src="https://via.placeholder.com/32x32" alt={preview.author} className="author-avatar-small" />
              <span className="author-name-small">{preview.author}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
