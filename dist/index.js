import { jsx as _jsx, jsxs as _jsxs } from "nano-jsx/esm/jsx-runtime";
import express from 'express';
import { renderSSR } from 'nano-jsx/esm/index.js';
const app = express();
const port = process.env.PORT || 4000;
const HelloWorld = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: " Hello, World! " }), _jsx("p", { children: " Welcome to your TypeScript + Express + nano - jsx backend! " }), _jsxs("p", { children: [" Current time: ", new Date().toISOString(), " "] })] }));
};
// Routes
app.get('/', (req, res) => {
    const component = _jsx(HelloWorld, {});
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
//# sourceMappingURL=index.js.map