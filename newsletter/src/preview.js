import { findNewsletter, buildEmailData } from './db';
import { buildEmail } from './email';

export default (context) => async (req, res) => {
	const { id } = req.params;
	const newsletter = await findNewsletter(context, id);
	console.log(newsletter);
	const emailData = await buildEmailData(context, newsletter);
	const html = buildEmail(emailData);

	res.set('Content-Security-Policy', undefined);
	res.send(html);
};
