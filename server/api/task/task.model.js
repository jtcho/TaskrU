'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: String,
  description: String,
  active: { type: Boolean, default: true},
  requester_id: String,
  updated: { type: Date, default: Date.now },
  created: Date,
  expected_duration: Number,
  total_cost: Number,
  expires: Date,
  tags: Array,
  status: String,
  completer_id: String


});

module.exports = mongoose.model('Task', TaskSchema);