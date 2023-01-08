import { findNewsletter, markAsSent } from './db';
import { render } from './render';

export default (context) => async (req, res) => {
	const { id } = req.params;
	const newsletter = await findNewsletter(context, id);
		
	res.send(render('controls.njk', { newsletter }));
};
