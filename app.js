var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();

app.use(express.static('public'));

var presets = [
  { '480p': '480p at 2 Mbps' },
  { '720p': '720p at 3 Mbps' },
  { '1080p': '1080p at 5Mbps' },
  { '2160p': '2160p at 20Mbps' }
];

app.get('/presets', function(request, response) {
  var keys = [];
  presets.forEach(function (preset) {
    keys.push(Object.keys(preset));
  });
  response.json(JSON.stringify(keys));
});

app.post('/presets', jsonParser,  function(request, response) {
  if (!request.body) {
    return response.status(400).json('request failed');
  }
  response.status(201).json(JSON.stringify(presets));
});

module.exports = app;
