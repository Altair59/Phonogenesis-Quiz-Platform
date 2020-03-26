'use strict';

const mongoose = require('mongoose');

const PastResultSchema = new mongoose.Schema({
	score: {
		type: Number,
		required: true
	},
	answer: {
		type: String,
		required: true,
		trim: true
	}
});

const QuestionSchema = new mongoose.Schema({
	rule: {
		type: String,
		required: true,
		unique: true,
		minlength: 1,
		trim: true
	},
	size: {
		type: Number,
		required: true,
		default: 20
	},
	canUR: {
		type: Boolean,
		required: true
	},
	canPhoneme: {
		type: Boolean,
		required: true
	},
	maxCADT: {
		type: Number,
		required: true
	}
});

const QuizSchema = new mongoose.Schema({
	timeLim: {
		type: Number,
		required: true,
	},
	dest_group: {
		type: [String],
		default: []
	},
	past_results: {
		type: [PastResultSchema],
		default: []
	},
	questions: {
		type: [QuestionSchema],
		default: []
	}
});

const Quiz = mongoose.model('Quiz', QuizSchema);
model.exports = {Quiz};
