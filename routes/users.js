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
		})
	})
	.post(jsonParser, function(request, response) {
		var newUser = request.body;
		if(!newUser.username || !newUser.email || !newUser.password || checkUserExist(newUser.username)) {
			response.sendStatus(400);
			return false;
		}

		var salt = crypto.randomBytes(16);
		var password = hash.sha512(newUser.password, salt);
		var object = {
			'username': newUser.username,
			'email': newUser.email,
			'password': password
		};
		client.hmset(newUser.email, object, function(error){
			if(error) throw error;
			response.status(201).json(newUser.username);
		});
	});

router.route('/:user_id')
	.get(function(request, response){
		client.hkeys(request.id, function(error, user){
			if(error) throw error;
			response.json(user);
		})
	});

function checkUserExist(newUser) {
	client.get(newUser.username, function(error, reply){
		if(error) throw error;
		return reply;
	});
}

module.exports = router;
