const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

const { User } = require("./models/user");

const { ObjectID } = require("mongodb");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const session = require("express-session");
app.use(bodyParser.urlencoded({extended: true}));

//Make a session cookie
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
  })
);

// Route to login and create a session
app.post("/users/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findByEmailPassword(email, password)
    .then(user => {
      req.session.user = user._id;
      req.session.email = user.email;
      res.send({ currentUser: user.email })
    })
    .catch(error => {
      res.status(400).send()
    })
})

// Route to logout and remove the session
app.get("/users/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// Route to check if a user is already logged in
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

// Route to add a new users
app.post("/users", (req, res) => {
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
app.get("/users", (req, res) => {
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
app.get("/users/:id", (req, res) => {
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
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Student.findByIdAndRemove(id)
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
app.patch("/users/:id", (req, res) => {
    const id = req.params.id;

    const { name, type, username, password, email, groups, quizzes } = req.body;
    const body = { name, type, username, password, email, groups, quizzes };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Student.findByIdAndUpdate(id, { $set: body }, { new: true })
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

app.use(cors());

app.get("/api/test", (req, res) => {
    res.send({message: "API is working properly"});
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
