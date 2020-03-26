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
		req.session.user = parseClientUser(user);
		req.session.save(err => {
			res.send({currentUser: req.session.user});
		});
	}).catch(error => {
		console.log(error);
		res.status(400).send();
	});
});

// Route to logout and remove the session
router.get("/logout", (req, res) => {
	req.session.destroy(error => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.send()
		}
	});
});

// Route to check if a user is already logged in
router.get("/check-session", (req, res) => {
	if (req.session.user) {
		res.send({currentUser: req.session.user});
	} else {
		res.send({currentUser: null});
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
	user.save().then(
		result => {
			res.send({result: true});
		}
	).catch(err => {
		console.log(err);
	});
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

	User.findOne({username: targetUsername}).then(student => {
		if (!student) {
			res.status(404).send();
		} else {
			student.name = name;
			student.password = password;
			student.email = email;
			// student.groups = groups;
			// student.quizzes = quizzes;

			student.save().then(result => {
				res.send(student);
			}).catch(err => {
				console.log(err);
			});
		}
	}).catch(error => {
		res.status(400).send();
	});
});

module.exports = router;
