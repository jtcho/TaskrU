/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tasks              ->  index
 * POST    /tasks              ->  create
 * GET     /tasks/:id          ->  show
 * PUT     /tasks/:id          ->  update
 * DELETE  /tasks/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Task = require('./task.model');
var Tag = require('../tag/tag.model');
// Get list of tasks
exports.index = function(req, res) {
  Task.find(function (err, tasks) {
    if(err) { return handleError(res, err); }
    return res.json(200, tasks);
  });
};

// Get a single task
exports.show = function(req, res) {
  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err); }
    if(!task) { return res.send(404); }
    return res.json(task);
  });
};


exports.getByTag = function(req, res) {
  Tag.find({name: req.params.name}, function (err, task) {
    if(err) { return handleError(res, err); }
    if(!task) { return res.send(404); }
    if(task.length == 0) { return res.json([]);}
    var allTasks = task[0].tasks;
    //return res.json(allTasks);

    //Task.where('_id').in(allTasks).findAll(function(people) { return people });;

    Task.find({
      '_id': { $in: allTasks}
    }, function(err, docs)
    {
      return res.json(docs);
    });

  });
};

// Creates a new task in the DB.
exports.create = function(req, res) {
  Task.create(req.body, function(err, task) {
    if(err) { return handleError(res, err); }
    return res.json(201, task);
  });
};

// Updates an existing task in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Task.findById(req.params.id, function (err, task) {
    if (err) { return handleError(res, err); }
    if(!task) { return res.send(404); }
    var updated = _.merge(task, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, task);
    });
  });
};

// Deletes a task from the DB.
exports.destroy = function(req, res) {
  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err); }
    if(!task) { return res.send(404); }
    task.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}