const express = require('express');
const router = express.Router();

const {mongoose} = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const {User} = require('../models/user');

router.post('/register', (req, res) => {
	const username = req.body.username;
	const quizName = req.body.quizName;
	const pastResult = req.body.pastResult;

	User.findOne({"username": username, "quizzes.name": quizName}).then(user => {
		user.quizzes[0].past_results.push(pastResult);
		user.save().then(result => {
			res.end();
		}).catch(err => {
			console.log("Save failed");
		})
	}).catch(err => {
		console.log("User not found");
	})
});

router.get('/past/:user/:quiz/:stamp', (req, res) => {
	const stamp = req.param.stamp;
	const quiz = req.param.quiz;
	const username = req.param.user;

	User.findOne({"username": username, "quizzes.name": quiz, "quizzes.past_results.timeStamp": stamp}).then(user => {
		res.send(user.quizzes[0].past_results[0]);
	}).catch(err => {
		console.log("User not found");
	});
});

module.exports = router;
