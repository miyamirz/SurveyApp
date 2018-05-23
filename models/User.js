const mongoose = require('mongoose');
const { Schema } = mongoose;
console.log('Developing a MODEL');
const UserSchema = new Schema({
	googleId: String
});

mongoose.model('users', UserSchema);
