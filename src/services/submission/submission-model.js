'use strict';

// submission-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String },
  isQuestion: { type: Boolean },
  createdAt: { type: Date, 'default': Date.now }
});

const submissionModel = mongoose.model('submission', submissionSchema);

module.exports = submissionModel;
