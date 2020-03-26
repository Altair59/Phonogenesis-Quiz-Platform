const express = require('express');
const router = express.Router();

const {mongoose} = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const {User} = require('../models/user');

router.get('/user/:username', (req, res) => {
	const username = req.params.username;

	User.findOne({username: username}).then(user => {
		const quizNames = user.quizzes;

		Quiz.find({name: {$in: quizNames}}).then(quizzes => {
			res.send(quizzes);
		}).catch(err => {
			console.log("Error finding quizzes associated to user data.");
		});
	}).catch(err => {
		console.log("User not found");
	})
});

module.exports = router;
