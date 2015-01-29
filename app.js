var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(express.static('public'));

var presets = require('./routes/presets');
var users = require('./routes/users');
var jobs = require('./routes/jobs');

app.use('/presets', presets);
app.use('/users', users);
app.use('/jobs', jobs);

module.exports = app;
