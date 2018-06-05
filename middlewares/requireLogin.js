module.exports = (req, res, next) => {
	console.log('In requireLogin');
	if (!req.user) {
		return res
			.status(401)
			.send({ error: 'You must log in first to add credits' });
	}
	next();
};
