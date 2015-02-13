var express = require('express');
var client = require('redis').createClient();
var jsonParser = require('body-parser').json();
var sys = require('sys');
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
		client.hkeys('users', function(error, users){
			if(error) throw error;
			response.json(users);
		});
	})
	.post(jsonParser, function(request, response) {
		var body = request.body;
		if(!body.username || !body.email || !body.password) {
			response.sendStatus(400);
			return false;
		}

		var salt = crypto.randomBytes(16);
		var password = hash.sha512(body.password, salt);
		var newUser = {
			'username': body.username,
			'email': body.email,
			'password': password
		};
    client.exists(body.username, function(error, reply){
		  if(error) throw error;
      if(reply === 0) {
        client.hmset(body.username, newUser, function(error){
			    if(error) throw error;
			    response.status(201).json(body.username);
          return true;
		    });
      } else {
        response.sendStatus(400);
        return false;
      }
	  });
  });

router.route('/:user_id')
	.get(function(request, response){
		client.hkeys(request.id, function(error, user){
			if(error) throw error;
			response.json(user);
		});
	});

module.exports = router;
