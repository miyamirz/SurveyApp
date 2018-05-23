const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);
require('./models/User');
require('./services/passport');

// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

const cookieSession = require('cookie-session');
const passport = require('passport');
console.log('IN FRAMING COOKIE');
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT);

console.log('Server is listening at port:', PORT);
