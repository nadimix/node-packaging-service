var express = require('express');
var client = require('redis').createClient();

client.select((process.env.NODE_ENV || 'development').length);
var router = express.Router();

/*router.param('user_id', function(request, response, next, id) {
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});*/
router.route('/')
	.get(function(request, response){
		client.hkeys('users', function(error, users){
			if(error) throw error;
			response.json(users);
		})
	});
	/*.get(':user_id', function(request, response){
  	response.sendStatus(200);
	});*/

module.exports = router;
