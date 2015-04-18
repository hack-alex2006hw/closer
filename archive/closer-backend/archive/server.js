'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
  config = require('./config/config'),
  mongoose = require('mongoose')
  dotenv = require('dotenv').load();

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

var MongoDB = process.env.MongoDB || 'mongodb://localhost:2701/closer';

// Bootstrap db connection
var db = mongoose.connect(MongoDB, function(err) {
  if (err) {
    console.error('\x1b[31m', 'Could not connect to MongoDB!');
    console.log(err);
  }
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);