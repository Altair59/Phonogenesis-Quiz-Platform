var express = require('express');
var router = express.Router();

const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false);
const { User } = require("../models/user");

const { ObjectID } = require("mongodb");

// Route to login and create a session
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findByEmailPassword(username, password)
    .then(user => {
      req.session.user = user.username;
      res.send({ currentUser: user})
    })
    .catch(error => {
      res.status(400).send()
    })
})

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
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
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
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    );
});

// Route to get all students
router.get("/", (req, res) => {
    User.find().then(
        users => {
            res.send({ users });
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// Route to get a student by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }

    User.findById(id)
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(500).send();
        });
});

/// Route to remove a student by their id.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    User.findByIdAndRemove(id)
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(500).send();
        });
});

// Route to edit the properties of a user
router.patch("/:id", (req, res) => {
    const id = req.params.id;

    const { name, type, username, password, email, groups, quizzes } = req.body;
    const body = { name, type, username, password, email, groups, quizzes };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(400).send();
        });
});

module.exports = router;
