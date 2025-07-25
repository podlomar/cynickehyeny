import express from 'express';
import { renderSSR } from 'nano-jsx/esm/index.js';

const app = express();
const port = process.env.PORT || 4000;

const HelloWorld = () => {
  return (
    <div>
      <h1> Hello, World! </h1>
      <p> Welcome to your TypeScript + Express + nano - jsx backend! </p>
      <p> Current time: {new Date().toISOString()} </p>
    </div>
  );
};

app.get('/', (req, res) => {
  const component = <HelloWorld />;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World - TypeScript Backend</title>
    </head>
    <body>
      ${renderSSR(component)}
    </body>
    </html>
  `;
  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
