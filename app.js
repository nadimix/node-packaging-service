var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var client = require('redis').createClient();
client.select((process.env.NODE_ENV || 'development').length);

app.use(express.static('public'));

app.get('/presets', function(request, response) {
  client.hkeys('presets', function(error, names) {
    if(error) throw error;
    response.json(names);
  });
});

app.post('/presets', jsonParser,  function(request, response) {
  var newPreset = request.body;
  if (!newPreset.name || !newPreset.description) {
    response.status(400);
    return false;
  }
  client.hset('presets', newPreset.name, newPreset.description, function(error) {
    if(error) throw error;
    response.status(201).json(newPreset.name);
  });
});

module.exports = app;
