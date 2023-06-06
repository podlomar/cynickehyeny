import { findNewsletter, getAllSubscribers, getTestSubscribers } from './db';
import { render } from './render';

export default (context) => async (req, res) => {
	const { id } = req.params;
	const newsletter = await findNewsletter(context, id);
	const testSubscribers = await getTestSubscribers(context, id);
	const allSubscribers = await getAllSubscribers(context);
	
	res.send(
		render('controls.njk', { 
			newsletter,
			testSubsCount: testSubscribers.length,
			subsCount: allSubscribers.length
		})
	);
};
