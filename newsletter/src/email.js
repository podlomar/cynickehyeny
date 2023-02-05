import { render } from './render';

export const buildEmail = (emailData, recipientId) => render(
  'mail.njk', { ...emailData, recipientId }
);
