const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(keys.mongoURI);
require('./models/User');
require('./services/passport');

const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(bodyParser.json());
console.log('IN FRAMING COOKIE');
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Only runs in production
if (process.env.NODE_ENV === 'production') {
	console.log('App running in production');
	//Express will serve up production assets
	//like our main.js file or main.css file
	const path = require('path');
	app.use(express.static(path.join(__dirname, 'client/build')));

	//Express will serve up the index.html
	//it it does not recognize the route

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'client', 'build', 'index.html')
		);
	});
}
const PORT = process.env.PORT || 8000;
app.listen(PORT);

console.log('Server is listening at port:', PORT);
