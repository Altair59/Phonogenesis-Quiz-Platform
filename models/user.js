'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
		type: [String],
		default: null
	}
})

UserSchema.pre('save', next => {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
});

UserSchema.statics.findByEmailPassword = function(email, password) {
  const User = this

  return User.findOne({email: email}).then((user) => {
    if (!user) {
      return Promise.reject()
    }

    return new Promise((resolve, reject) => {
      bycrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user)
        } else {
          reject()
        }
      })
    })
  })
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }
