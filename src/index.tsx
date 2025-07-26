import { JSX } from 'react/jsx-runtime';
import express from 'express';
import { prerenderToNodeStream } from 'react-dom/static';
import { HomePage } from './pages/HomePage/index.js';
import { fetchFeaturedArticle, fetchLatestArticles } from './lib/content.js';

const render = async (component: JSX.Element, res: express.Response) => {
  const { prelude } = await prerenderToNodeStream(component);
  prelude.pipe(res);
};

const app = express();
const port = process.env.PORT || 4000;

app.use('/', express.static('static'));

app.get('/', async (req, res) => {
  const featuredArticle = await fetchFeaturedArticle();
  const latestArticles = await fetchLatestArticles();
  render(
    <HomePage
      featuredArticle={featuredArticle}
      latestArticles={latestArticles}
    />,
    res,
  );
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
