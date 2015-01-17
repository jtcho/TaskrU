/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Task = require('../api/task/task.model');
var Tag = require('../api/tag/tag.model');
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Task.find({}).remove(function() {
});

Task.create({
    title : 'Homework Helpp',
    description : 'Im stupid.'
  }, {
    title : 'Photoshoot',
    description : 'I needs headshots',
    tags: ['photo']
  }, {
    title : 'Get me booze',
    description : 'buy me some vodka please',
    tags: ['alcohol','store']
  });
Tag.find({}).remove(function() {
  
});
Tag.create({
    name : 'tag1',
  }, {
    name : 'tag23'
  }, {
    name : 'asdfg'
  }, {
    name : 'tag2'
  });


  var task1 = new Task({
    title : 'Homework Helpp',
    description : 'Im stupid.',
    tags: ['tag1','tag2']
  });

task1.save(function (err) {
  if (err) return handleError(err);
  


  Tag.findOneAndUpdate(
    {name: "tag1"},
    {$push: {tasks: task1._id}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    });

  Tag.findOneAndUpdate(
    {name: "tag2"},
    {$push: {tasks: task1._id}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    });

})
var task2 = new Task({
    title : 'bbb',
    description : 'aaa',
    tags: ['tag2']
  });

task2.save(function (err) {
  if (err) return handleError(err);
  
  Tag.findOneAndUpdate(
    {name: "tag2"},
    {$push: {tasks: task2._id}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    });
})