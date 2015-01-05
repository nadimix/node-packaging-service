var express = require('express');
var app = express();

app.use(express.static('public'));

var presets = {
  '480p': '480p at 2 Mbps',
  '720p': '720p at 3 Mbps',
  '1080p': '1080p at 5Mbps',
  '2160p': '2160p at 20Mbps'
};

app.get('/presets', function(request, response) {
  response.json(Object.keys(presets));
});

module.exports = app;
