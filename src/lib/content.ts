import { promises as fs } from 'fs';
import path from 'path';

export interface ArticlePreview {
  title: string;
  slug: string;
  date: string;
  author: string;
  lead: string;
  image: string;
  readTime: number;
  category: string;
  authorAvatar: string;
  link: string;
}

export interface Article extends ArticlePreview {
  content: string;
}

export const fetchFeaturedArticle = async (): Promise<ArticlePreview> => {
  const fileContents = await fs.readFile('posts/posts.json', 'utf-8');
  const articles: ArticlePreview[] = JSON.parse(fileContents);
  return articles[0];
};

export const fetchLatestArticles = async (): Promise<ArticlePreview[]> => {
  const fileContents = await fs.readFile('posts/posts.json', 'utf-8');
  const articles: ArticlePreview[] = JSON.parse(fileContents);
  return articles.slice(1, 8);
};
