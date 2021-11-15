const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please provide first name'],
		minlength: [3, 'First name must be minimum 3 characters long'],
		maxlength: [50, 'First name can be maximum 50 characters long'],
	},
	lastName: {
		type: String,
		required: [true, 'Please provide last name'],
		minlength: [3, 'Last name must be minimum 3 characters long'],
		maxlength: [50, 'Last name can be maximum 50 characters long'],
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide valid email',
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: [6, 'Password must be minimum 6 characters long'],
		maxlength: [50, 'Password can be maximum 50 characters long'],
	},
});

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, email: this.email },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};

UserSchema.methods.comparePasswords = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
