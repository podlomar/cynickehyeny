import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from '../Header/index.js';
export const Layout = ({ children }) => {
    return (_jsxs("html", { lang: "cs", children: [_jsxs("head", { children: [_jsx("meta", { charSet: "UTF-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), _jsx("title", { children: "Cynick\u00E9 Hyeny" }), _jsx("link", { rel: "stylesheet", href: "/static/styles.css" })] }), _jsxs("body", { children: [_jsx(Header, {}), _jsx("main", { className: "main-content", children: children }), _jsx("footer", { className: "main-footer", children: _jsx("div", { className: "container", children: _jsx("p", { children: "\u00A9 2023 Cynick\u00E9 Hyeny. All rights reserved." }) }) })] })] }));
};
//# sourceMappingURL=index.js.map