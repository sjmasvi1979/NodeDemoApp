var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Nitesh' });
});

/* GET home page. */
router.get('/helloworld', function(req, res) {
  res.render('index', { title: 'Hello World' });
});



module.exports = router;
