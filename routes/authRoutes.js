const passport = require('passport');
module.exports = app => {
	// app.get('/', (req, res) => {
	// 	res.send({ hi: 'there' });
	// });

	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	//This is a redirect uri which is to be mentioned in the GOOGLE PLUS API credentials process

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	app.get('/api/logout', (req, res) => {
		req.logout();
		// res.send(req.user);
		res.redirect('/');
	});
};
