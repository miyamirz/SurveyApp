const mongoose = require('mongoose');
const { Schema } = mongoose;
console.log('Developing a MODEL');
const UserSchema = new Schema({
	googleId: String,
	credits: {
		type: Number,
		default: 0
	}
});

mongoose.model('users', UserSchema);
