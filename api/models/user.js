'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	groups: {
		type: [String],
		default: null
	},
	quizzes: {
		type: [mongoose.Schema.Types.ObjectId],
		default: null
	}
});

UserSchema.pre('save', function (next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.hash(user.password, 10).then(function (hash) {
			user.password = hash;
		});
	}

  next();
});

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this;
	return User.find().findOne({username: username}).then(user => {
		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password).then(function (err, result) {
				if (result) {
					resolve(user);
				} else {
					reject();
				}
			})
		})
  })
}
const User = mongoose.model('User', UserSchema);
module.exports = {User};
