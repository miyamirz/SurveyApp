const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url');
//title:title ->title --->ES6
module.exports = app => {
	app.get('/api/surveys',requireLogin,async (req,res)=>{
		console.log("Getting Surveys",req.user);
		const surveys = await Survey.find({_user:req.user.id})
	                    	.select({recipients:false});
		res.send(surveys);
	})
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks For Voting!');
	});
	app.post('/api/surveys/webhooks',(req,res)=>{
		console.log("here you are in webhook")
		const p = new Path('/api/surveys/:surveyId/:choice');
	// 	const events = _.map(req.body,(event)=>{
	// 	//	const pathname = new URL(event.url).pathname;
			
	// 	//	console.log(p.test(pathname));
	// 	  const match = p.test(new URL(event.url).pathname);
	// 	  if(match){
	// 		  return {email:event.email,surveyId:match.surveyId,choice:match.choice}
	// 	  }
	// 	});
	// 	//console.log(events);
	//    const compact = _.compact(events);
	//    const uniqueEvents = _.uniqBy(compactEvents,'email','surveyId');
	//    console.log(uniqueEvents);

	   //using lodash chainer helper to refactor the code
    const events = _.chainer(req.body)
	   .map((event)=>{
		//	const pathname = new URL(event.url).pathname;
			
		//	console.log(p.test(pathname));
		  const match = p.test(new URL(event.url).pathname);
		  if(match){
			  return {email:event.email,surveyId:match.surveyId,choice:match.choice}
		  }
		})
		//console.log(events);
	   .compact()
	   .uniqBy('email','surveyId')
	   .each(({email,surveyId,choice})=>{
		   Survey.updateOne({
			   _id:surveyId,
			   recipients:{
				   $elemMatch:{email:email,responded:false}
			   }
			},{
				$inc:{[choice]:1},
				$set:{'recipients,$,responded':true},
				lastUpdated:Date.now()
			}).exec();
		   })
	   .value();
	   console.log(events);
	   

	});
	app.post(
		'/api/surveys',
		requireLogin,
		requireCredits,
		async (req, res) => {
			console.log('in survey routes-----');
			console.log('user creating a survey',req.user.id);
			const { title, subject, body, recipients } = req.body;
			const survey = new Survey({
				title,
				subject,
				body,
				_user:req.user.id,
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
