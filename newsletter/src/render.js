import path from 'path'
import nunjucks from 'nunjucks';

nunjucks.configure(path.resolve(__dirname, 'templates'));

export const render = nunjucks.render;
