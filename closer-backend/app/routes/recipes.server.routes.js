'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users');
  var recipes = require('../../app/controllers/recipes');

  // recipes Routes
  app.route('/recipes')
    .get(recipes.list)
    .post(recipes.create);

  app.route('/recipes/:recipeId')
    .get(recipes.read)
    .put(recipes.hasAuthorization, recipes.update)
    .delete(recipes.hasAuthorization, recipes.delete);

  // Finish by binding the recipe middleware
  app.param('recipeId', recipes.recipeByID);
};