import {ruleList} from "../../client/src/react-components/QuizData";

const express = require('express');
const router = express.Router();

const {mongoose} = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const {User} = require('../models/user');
const {Rule} = require('../models/rule');
const {Group} = require('../models/group');

router.get('/rule', (req, res) => {
	Rule.find().then(result => {
		res.send(result);
	}).catch(error => {
		console.log(error);
	});

});

router.get('/rule/getRule/:text', (req, res) => {
	Rule.findOne({ruleTxt: req.params.text}).then(result => {
		res.send(result);
	}).catch(error => {
		console.log(error);
	});
});

router.post('/makeQuiz', (req, res) => {
	const questions = req.body.questions;
	let questionCt = 0;
	questions.map(question => {
		Rule.find({ruleTxt: question.rule}).then(rules => {
			question.rule = rules[Math.random() * rules.length];
			questionCt++;
			if (questionCt >= questions.length){
				const newQuiz = {
					timeLim: req.body.timeLim,
					name: req.body.name,
					pastResult: req.body.pastResult,
					questions: questions
				};
				const groupName = req.body.groupName;
				Group.findOne({name: groupName}).then(group => {
					if (!group) {
						res.status(404).send({result: false});
					} else {
						User.findOne({username: group.owner}).then(prof => {
							prof.quizzes.push(newQuiz);
							prof.save().then(savedProf => {
									if (group.students.length === 0) {
										res.send({result: true});
									} else {
										let studentCt = 0;
										group.students.map(student => {
											User.findOne({username: student}).then(stuObj => {
												studentCt++;
												stuObj.quizzes.push(newQuiz);
												stuObj.save();
												if (studentCt >= group.students.length) {
													res.send({result: true});
												}
											})
										})
									}
								}
							)
						}).catch(error => {
							console.log(error);
							res.send({result: false});
						});
					}
				}).catch(error => {
					res.status(502).send({result: false});
				});
			}
		});
	});
});

router.post('/register', (req, res) => {
	const username = req.body.username;
	const quizName = req.body.quizName;
	const pastResult = req.body.pastResult;

	User.findOne({"username": username, "quizzes.name": quizName}).then(user => {
		user.quizzes[0].pastResult = pastResult;
		user.save().then(result => {
			res.send(user);
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

	User.findOne({"username": username, "quizzes.name": quiz, "quizzes.pastResult.timeStamp": stamp}).then(user => {
		res.send(user.quizzes[0].pastResult);
	}).catch(err => {
		console.log("User not found");
	});
});

module.exports = router;
