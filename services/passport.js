const passport = require('passport');
const GoogleOauthStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');
console.log('IN PASSPORT');
passport.serializeUser((user, done) => {
	console.log('IN SERIALIZE called after creating a record in db');
	done(null, user.id);
	console.log('cookie is set here and it is:', user.id);
});
//user in set in req here by passport
passport.deserializeUser((id, done) => {
	console.log('IN DESERIALIZE', id);
	User.findById(id).then(user => done(null, user));
	console.log(
		'this is a further request and user is sent as req body by passport'
	);
});
passport.use(
	new GoogleOauthStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log('CALLBACK TO GOOGLEOAUTH');
			// console.log('AccessToken', accessToken);
			// console.log('RefreshToken', refreshToken);
			// console.log('pPofile:', profile);
			const existingUser = await User.findOne({
				googleId: profile.id
			});

			if (existingUser) {
				console.log('User already exists');
				done(null, existingUser);
			} else {
				console.log('NOT A NEW USER');
				const user = await new User({
					googleId: profile.id
				}).save();
				done(null, user);
			}
		}
	)
);

//before placing async / await syntax
(accessToken, refreshToken, profile, done) => {
	console.log('CALLBACK TO GOOGLEOAUTH');
	// console.log('AccessToken', accessToken);
	// console.log('RefreshToken', refreshToken);
	// console.log('pPofile:', profile);
	User.findOne({ googleId: profile.id }).then(existingUser => {
		if (existingUser) {
			console.log('User already exists');
			done(null, existingUser);
		} else {
			console.log('NOT A NEW USER');
			new User({ googleId: profile.id })
				.save()
				.then(user => done(null, user));
		}
	});
};
