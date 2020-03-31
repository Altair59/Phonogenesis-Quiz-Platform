const express = require('express');
const router = express.Router();

const {mongoose} = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const {Group} = require("../models/group");
const {User} = require("../models/user");
const {ObjectID} = require("mongodb");

router.post("/objectify", (req, res) => {
	const user = req.body.user;
	Group.find({name: {$in: user.groups}}).then(groups => {
		if (!groups || groups.length === 0) {
			res.send(null);
		} else {
			const groupToUsers = {};

			let groupCt = 0;
			groups.map(group => {
				const users = [];

				User.findOne({username: group.owner}).then(prof => {
					users.push(prof);

					const exec = () => {
						groupToUsers[group.name] = users;
						groupCt++;

						if (groupCt >= Object.keys(groups).length) {
							res.send(groupToUsers);
							res.end();
						}
					};

					if (group.students.length === 0) {
						exec();
					} else {
						let userCt = 0;
						group.students.map(username => {
							User.findOne({username: username}).then(stu => {
								users.push(stu);
								userCt++;

								if (userCt >= group.students.length) {
									exec();
								}
							});
						});
					}
				}).catch(err => {
					console.log("OWNER DATA ERR USER NOT FOUND");
					console.log(err);
				});

			});

		}
	}).catch(error => {
		console.log("group not found");
	});
});

// Route to get all groups of this prof
router.get("/prof/:name", (req, res) => {
	const prof = req.params.name;
	Group.find({owner: prof}).then(
		groups => {
			res.send(groups);
		},
		error => {
			res.status(500).send(error); // server error
		}
	);
});

/// Route to get a group by their name
router.get("/group/:name", (req, res) => {
	const name = req.params.name;

	Group.findOne({name: name}).then(group => {
		if (!group) {
			res.status(404).send(null);
		} else {
			res.send(group);
		}
	}).catch(error => {
		res.status(500).send(null);
	});
});

/// Check whether a group exists
router.get("/group/check/:name", (req, res) => {
	const name = req.params.name;
	Group.findOne({name: name}).then(group => {
		if (!group) {
			res.send(null);
		} else {
			res.send(group);
		}
	}).catch(error => {
		res.status(500).send(null);
	});
});

// Route to add a new group
router.post("/", (req, res) => {
	const group = new Group({
		name: req.body.name,
		students: req.body.students,
		owner: req.body.owner
	});
	group.save().then(
		savedGroup => {
			User.findOne({username: req.body.owner}).then(prof => {
				prof.groups.push(req.body.name);
				prof.save().then(savedProf => {
					res.send({result: savedProf});
				});
			}).catch(error => {
				console.log(error);
			});
		}
	).catch(err => {
		console.log(err);
		res.send({result: false});
	});
});

/// Route to remove a group by their name
router.delete("/:name", (req, res) => {
	const name = req.params.name;
	Group.findOneAndRemove({name: name}).then(group => {
		if (!group) {
			res.status(404).send();
		} else {
			res.send(group);
		}
	}).catch(error => {
		res.status(500).send();
	});
});

// Route to edit the properties of a group
router.patch("/:name", (req, res) => {
	const targetName = req.params.name;

	const {name, students, owner} = req.body;

	Group.findOne({name: targetName}).then(group => {
		if (!group) {
			res.status(404).send();
		} else {
			group.name = name;
			group.students = students;
			group.owner = owner;

			group.save().then(result => {
				res.send(group);
			}).catch(err => {
				console.log(err);
			});
		}
	}).catch(error => {
		res.status(400).send();
	});
});

module.exports = router;