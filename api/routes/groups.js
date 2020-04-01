const express = require('express');
const router = express.Router();

const {mongoose} = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const {Group} = require("../models/group");
const {User} = require("../models/user");
const {ObjectID} = require("mongodb");

router.get("/objectify/:username", (req, res) => {
	const username = req.params.username;

	User.findOne({username: username}).then(user => {
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
	}).catch(err => {
		console.log("given user DNE");
	})
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
	const groupName = req.params.name;
	Group.findOneAndDelete({name: groupName}).then(group => {
		if (!group) {
			res.status(404).send({result: false});
		} else {
			User.findOne({username: group.owner}).then(prof => {
				prof.groups = prof.groups.filter(group => group !== groupName);
				prof.save().then(savedProf => {
						if (group.students.length === 0) {
							res.send({result: true});
						} else {
							let studentCt = 0;
							group.students.map(student => {
								User.findOne({username: student}).then(stuObj => {
									studentCt++;
									stuObj.groups = stuObj.groups.filter(group => group !== groupName);
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
				console.log(error)
			});
		}
	}).catch(error => {
		res.status(502).send({result: false});
	});
});

// route to add a student to a group
router.patch("/add", (req, res) => {
	const studentName = req.body.studentName;
	const groupName = req.body.groupName;
	User.findOne({username: studentName}).then(student => {
		if (!student) {
			res.send({result: false})
		} else {
			if (student.groups.includes(groupName)) {
				res.send({result: false})
			} else {
				student.groups.push(groupName);
				student.save().then(saveStudent => {
					Group.findOne({name: groupName}).then(group => {
						group.students.push(studentName);
						group.save().then(saveGroup => {
							res.send({result: true});
						})
					}).catch(error => {
						console.log(error);
					});
				});
			}
		}
	}).catch(error => {
		console.log(error);
	});
});

// Route to remove a student from a group
router.patch("/remove", (req, res) => {
	const studentName = req.body.studentName;
	const groupName = req.body.groupName;
	User.findOne({username: studentName}).then(student => {
		if (!student) {
			console.log("student dne");
			res.send({result: false})
		} else {
			if (!student.groups.includes(groupName)) {
				console.log("student not enrolled");
				res.send({result: false})
			} else {
				student.groups = student.groups.filter(function (group) {
					return group !== groupName
				});
				student.save().then(saveStudent => {
					Group.findOne({name: groupName}).then(group => {
						group.students = group.students.filter(function (student) {
							return student !== studentName
						});
						group.save().then(saveGroup => {
							res.send({result: true});
						})
					}).catch(error => {
						console.log(error);
					});
				});
			}
		}
	}).catch(error => {
		console.log(error);
	});
});

module.exports = router;