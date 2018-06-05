const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//title:title ->title --->ES6
module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks For Voting!');
	});
	app.post(
		'/api/surveys',
		requireLogin,
		requireCredits,
		async (req, res) => {
			console.log('in survey routes-----');
			const { title, subject, body, recipients } = req.body;
			const survey = new Survey({
				title,
				subject,
				body,
				recipients: recipients
					.split(',')
					.map(email => ({ email: email.trim() })),
				dateSent: Date.now()
			});

			//Good place to send an email
			//422 unprocessable entity
			const mailer = new Mailer(survey, surveyTemplate(survey));
			try {
				console.log('In try block');
				await mailer.send();
				await survey.save();
				req.user.credits -= 1;
				const user = await req.user.save();
				res.send(user);
			} catch (err) {
				res.status(422).send(err);
			}
		}
	);
};
