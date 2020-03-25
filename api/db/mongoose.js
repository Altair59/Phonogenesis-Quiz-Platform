const mongoose = require('mongoose');
const {User} = require("../models/user");
const log = console.log;

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PhonogenesisDB';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;

db.once('open', function() {
	log("DB connection successful!");

	const defaultAdmin = new User({
		type: "admin",
		name: "admin_name",
		email: "admin@pg.com",
		username: "admin",
		password: "admin",
		groups: [],
		quizzes: []
	});
	defaultAdmin.markModified("password");
	defaultAdmin.save().then(function (result) {
		log("added admin");
		log(result);
	}, function (error) {
		log("ERROR admin creation failed");
		log(error);
	});

	const defaultStudent = new User({
		type: "student",
		name: "stu_name",
		email: "stu@pg.com",
		username: "stu",
		password: "stu",
		groups: [],
		quizzes: []
	});
	defaultStudent.markModified('password');
	defaultStudent.save().then(function (result) {
		log("added student");
		log(result);
	}, function(error) {
		log("ERROR default student creation failed");
		log(error);
	});

	const defaultProf = new User({
		type: "professor",
		name: "prof_name",
		email: "prof@pg.com",
		username: "prof",
		password: "prof",
		groups: [],
		quizzes: []
	});
	defaultProf.markModified('password');
	defaultProf.save().then(function(result) {
		log("added prof");
		log(result);
	}, function(error) {
		log("ERROR default prof creation failed");
		log(error);
	});
});

module.exports = { mongoose };
