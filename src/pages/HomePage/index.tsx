import { Layout } from '../../components/Layout';
import { HeroSection } from '../../components/HeroSection';
import { FeaturedArticle } from '../../components/FeaturedArticle';
import { ArticlesGrid } from '../../components/ArticlesGrid';
import { NewsletterCta } from '../../components/NewsletterCta';
import { ArticlePreview } from '../../lib/content';

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
