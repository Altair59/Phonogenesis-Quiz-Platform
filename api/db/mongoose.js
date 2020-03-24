const mongoose = require('mongoose');

// Connect to our database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose };
