const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
	// app.post('/api/stripe', (req, res) => {
	// 	console.log(req.body);
	// 	console.log('token:', req.body.id);
	// 	//Refer creating a charge from node api docs of stripe to understand the below code
	// 	stripe.charges.create({
	// 		amount: 500,
	// 		currency: 'usd',
	// 		description: '5$ for 5 credits',
	// 		source: req.body.id
	// 	});
	// });

	//No need requireLogin be second argument..Any number of function arguments can be present
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//No Longer required since middleware requireLogin is used which will be handled by express internally and return
		// if (!req.user) {
		// 	return res
		// 		.status(401)
		// 		.send({ error: 'You must log in first to add credits' });
		// }

		console.log(req.body);
		console.log('token:', req.body.id);
		//Refer creating a charge from node api docs of stripe to understand the below code
		const charges = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '5$ for 5 credits',
			source: req.body.id
		});
		console.log(charges);
		//req.user holds our user model instance which is set by our passports

		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
