var express = require('express');
var app = express();

app.use(express.static('public'));

var presets = require('./routes/presets');
app.use('/presets', presets);

module.exports = app;
