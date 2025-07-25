import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import express from 'express';
import { prerenderToNodeStream } from 'react-dom/static';
import { Layout } from './components/Layout/index.js';
const app = express();
const port = process.env.PORT || 4000;
app.use('/static', express.static('static'));
app.get('/', async (req, res) => {
    const component = (_jsx(Layout, { children: _jsxs("div", { children: [_jsx("h1", { children: " Hello, World! " }), _jsx("p", { children: " Welcome to your TypeScript + Express + nano - jsx backend! " }), _jsxs("p", { children: [" Current time: ", new Date().toISOString(), " "] })] }) }));
    const { prelude } = await prerenderToNodeStream(component);
    prelude.pipe(res);
});
// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map