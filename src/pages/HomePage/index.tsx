import { Layout } from '../../components/Layout/index.js';
import { HeroSection } from '../../components/HeroSection/index.js';
import { FeaturedArticle } from '../../components/FeaturedArticle/index.js';
import { ArticlesGrid } from '../../components/ArticlesGrid/index.js';
import { NewsletterCta } from '../../components/NewsletterCta/index.js';
import { ArticlePreview } from '../../lib/content.js';

interface Props {
  featuredArticle: ArticlePreview;
  latestArticles: ArticlePreview[];
}

export const HomePage = ({ featuredArticle, latestArticles }: Props) => {
  return (
    <Layout link="/">
      <HeroSection />
      <FeaturedArticle preview={featuredArticle} />
      <ArticlesGrid articles={latestArticles} />
      <NewsletterCta />
    </Layout>
  );
};
