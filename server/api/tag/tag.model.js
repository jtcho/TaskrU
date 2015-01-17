'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String,
  tasks: [ {type : Schema.ObjectId, ref : 'Task'} ]
});

module.exports = mongoose.model('Tag', TagSchema);