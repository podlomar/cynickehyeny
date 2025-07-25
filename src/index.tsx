import express from 'express';
import { prerenderToNodeStream } from 'react-dom/static';
import { Layout } from './components/Layout/index.js';

const app = express();
const port = process.env.PORT || 4000;

app.use('/static', express.static('static'))

app.get('/', async (req, res) => {
  const component = (
    <Layout>
      <div>
        <h1> Hello, World! </h1>
        <p> Welcome to your TypeScript + Express + nano - jsx backend! </p>
        <p> Current time: {new Date().toISOString()} </p>
      </div>
    </Layout>
  );

  const { prelude } = await prerenderToNodeStream(component);

  prelude.pipe(res);
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
