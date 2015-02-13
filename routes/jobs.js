var express = require('express');
var client = require('redis').createClient();
var jsonParser = require('body-parser').json();
var crypto = require('crypto');
var hash = require('node_hash');

client.select((process.env.NODE_ENV || 'development').length);
var router = express.Router();

router.param('user_id', function(request, response, next, id) {
  request.id = id;
  next();
});

router.route('/')
  .get(function(request, response){
    /*client.hkeys('users', function(error, users){
      if(error) throw error;
      response.json(users);
    });*/
    response.sendStatus(200);
  });

module.exports = router;
