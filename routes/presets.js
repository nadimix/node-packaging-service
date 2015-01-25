var express = require('express');

var jsonParser = require('body-parser').json();
var client = require('redis').createClient();
client.select((process.env.NODE_ENV || 'development').length);

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    client.hkeys('presets', function(error, presets) {
      if(error) throw error;
      response.json(presets);
    });
  })
  
  .post(jsonParser,  function(request, response) {
    var newPreset = request.body;
    if (!newPreset.name || !newPreset.description) {
      response.sendStatus(400);
      return false;
    }
    client.hset('presets', newPreset.name, newPreset.description, function(error) {
      if(error) throw error;
      response.status(201).json(newPreset.name);
    });
  });

module.exports = router;
