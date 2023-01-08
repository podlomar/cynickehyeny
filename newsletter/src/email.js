import { render } from './render';

export const buildEmail = (templateData) => render('mail.njk', templateData);
