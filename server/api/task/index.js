'use strict';

var express = require('express');
var controller = require('./task.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/tag/:name', controller.getByTag)
router.get('/id/:id', controller.show);
router.post('/id/', controller.create);
router.put('/id/:id', controller.update);
router.patch('/id/:id', controller.update);
router.delete('/id/:id', controller.destroy);

module.exports = router;