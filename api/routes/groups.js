const express = require('express');
const router = express.Router();

const {mongoose} = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const {Group} = require("../models/group");
const {ObjectID} = require("mongodb");

// Route to get all groups of this prof
router.get("/prof/:name", (req, res) => {
	const prof = req.params.name;
	Group.find({owner: prof}).then(
		groups => {
			console.log(groups);
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
			res.status(404).send({result:null});
		} else {
			res.send({result:group});
		}
	}).catch(error => {
		res.status(500).send();
	});
});

// Route to add a new group
router.post("/", (req, res) => {
	const group = new Group({
		name: req.body.name,
		students: [],
		owner: req.body.owner
	});
	group.save().then(
		result => {
			res.send({result: true});
		}
	).catch(err => {
		console.log(err);
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