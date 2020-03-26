
'use strict';

const mongoose = require('mongoose');

const Question = new mongoose.Schema({
  rule: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: true
  },
  canUR: {
    type: Boolean,
    required: true
  },
  canPhoneme: {
    type: Boolean,
    required: true
  }
})
