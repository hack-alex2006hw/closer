'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users');
  var ingredients = require('../../app/controllers/ingredients');

  // ingredients Routes
  app.route('/ingredients')
    .get(ingredients.list)
    .post(ingredients.create);

  app.route('/ingredients/:ingredientId')
    .get(ingredients.read)
    .put(ingredients.hasAuthorization, ingredients.update)
    .delete(ingredients.hasAuthorization, ingredients.delete);

  // Finish by binding the ingredient middleware
  app.param('ingredientId', ingredients.ingredientByID);
};