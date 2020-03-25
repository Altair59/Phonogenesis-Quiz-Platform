const mongoose = require('mongoose');

// Connect to our database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
  if(err) {
    console.log(err);
  } else {
    console.log('Mongo database connected ...')
  }
});

module.exports = { mongoose };
