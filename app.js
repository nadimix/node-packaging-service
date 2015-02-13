var express = require('express');
var app = express();
var morgan = require('morgan');

var mongoose = require('mongoose');
var credentials = require('./credentials.js');
var options = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

switch(app.get('env')) {
  case 'test':
    mongoose.connect(credentials.development.connectionString, options);
    break;
  case 'production':
    mongoose.connect(credentials.production.connectionString, options);
    break;
  default:
    throw new Error('Unknown execution environment: ' + app.get('env'));
}

app.use(express.static('public'));

var presets = require('./routes/presets');
var users = require('./routes/users');
var jobs = require('./routes/jobs');

app.use('/presets', presets);
app.use('/users', users);
app.use('/jobs', jobs);

module.exports = app;
