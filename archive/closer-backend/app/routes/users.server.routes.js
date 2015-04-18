'use strict';

// module dependencies
var passport = require('passport');

module.exports = function(app) {
  // user routes
  var users = require('../../app/controllers/users');

  // setting up the users profile api
  app.route("/users/me").get(users.me);
  app.route('/users').put(users.update);

  // setting up the users authentication api
  app.route('/auth/signup').post(users.signup);
  app.route('/auth/signin').post(users.signin);
  app.route('/auth/signout').post(users.signout);

  // finish by binding the user middleware
  app.param('userId', users.userByID);
};