'use strict';

var passport = require('passport'),
  User = require('mongoose').model('User'),
  path = require('path'),
  config = require('./config');

module.exports = function() {
  // serialize sessions
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  // deserialize sessions
  passport.deserializeUser(function(id, done){
    User.findOne({
      _id: id
    }, '-salt -password', function(err, user){
      done(err, user);
    });
  });

  // initialize strategies
  config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy){
    require(path.resolve(strategy))();
  });
};