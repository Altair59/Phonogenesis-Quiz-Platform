const express = require('express');
const router = express.Router();

const {mongoose} = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const {User} = require("../models/user");
const {ObjectID} = require("mongodb");

const parseClientUser = (user) => {
	return {
		username: user.username,
		name: user.name,
		email: user.email,
		type: user.type,
		groups: user.groups,
		quizzes: user.quizzes
	}
};

// Route to login and create a session
router.post("/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findByUsernamePassword(username, password).then(user => {
		req.session.user = user.username;
		console.log("login session");
		console.log(req.session);
		res.send({currentUser: parseClientUser(user)});
		res.end();
	}).catch(error => {
		console.log(error);
		res.status(400).send();
	});
});

// Route to logout and remove the session
router.get("/logout", (req, res) => {
	req.session = null;
});

// Route to check if a user is already logged in
router.get("/check-session", (req, res) => {
	console.log("check session");
	console.log(req.session);
	if (req.session.user) {
		res.status(200).send({currentUser: req.session.user});
	} else {
		res.status(401).send({currentUser: null});
	}
});

// Route to add a new users
router.post("/", (req, res) => {
	const user = new User({
		name: req.body.name,
		type: req.body.type,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		groups: [],
		quizzes: []
	});
	user.save().then(result => {
			res.send({result: true});
		},
		error => {
			res.status(400).send(error);
		}
	);
});

// Route to get all users
router.get("/", (req, res) => {
	User.find().then(
		users => {
			res.send({users: users});
		},
		error => {
			res.status(500).send(error); // server error
		}
	);
});

/// Route to get a student by their username
router.get("/:username", (req, res) => {
	const username = req.params.username;

	User.findOne({username: username}).then(student => {
		if (!student) {
			res.status(404).send();
		} else {
			res.send(student);
		}
	}).catch(error => {
		res.status(500).send();
	});
});

/// Route to remove a student by their username
router.delete("/:username", (req, res) => {
	const username = req.params.username;

	User.findOneAndRemove({username: username}).then(student => {
		if (!student) {
			res.status(404).send();
		} else {
			res.send(student);
		}
	}).catch(error => {
		res.status(500).send();
	});
});

// Route to edit the properties of a user
router.patch("/:username", (req, res) => {
	const targetUsername = req.params.username;

	const {name, type, username, password, email, groups, quizzes} = req.body;
	const body = {name, type, username, password, email, groups, quizzes};

	User.findOneAndUpdate({username: targetUsername}, {$set: body}, {new: true}).then(student => {
		if (!student) {
			res.status(404).send();
		} else {
			res.send(student);
		}
	}).catch(error => {
		res.status(400).send();
	});
});

module.exports = router;
