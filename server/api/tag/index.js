'use strict';

var express = require('express');
var controller = require('./tag.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/name/:id', controller.show);
router.post('/name/', controller.create);
router.put('/name/:id', controller.update);
router.patch('/name/:id', controller.update);
router.delete('/name/:id', controller.destroy);

module.exports = router;