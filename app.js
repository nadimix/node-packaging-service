var express = require('express');
var app = express();

app.use(express.static('public'));

var presets = require('./routes/presets');
var users = require('./routes/users');

app.use('/presets', presets);
app.use('/users', users);

module.exports = app;
