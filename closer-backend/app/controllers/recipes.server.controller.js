'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Recipe = mongoose.model('Recipe'),
  _ = require('lodash');

/**
 * Create a recipe
 */
exports.create = function(req, res) {
  var recipe = new Recipe(req.body);
  // recipe.user = req.user;

  recipe.save(function(err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(recipe);
    }
  });
};

/**
 * Show the current recipe
 */
exports.read = function(req, res) {
  res.jsonp(req.recipe);
};

/**
 * Update a recipe
 */
exports.update = function(req, res) {
  var recipe = req.recipe;

  recipe = _.extend(recipe, req.body);

  recipe.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(recipe);
    }
  });
};

/**
 * Delete an recipe
 */
exports.delete = function(req, res) {
  var recipe = req.recipe;

  recipe.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(recipe);
    }
  });
};

/**
 * List of recipes
 */
exports.list = function(req, res) { Recipe.find().sort('-created').populate('user', 'displayName').populate('ingredients', 'name').exec(function(err, recipes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(recipes);
    }
  });
};

/**
 * recipe middleware
 */
exports.recipeByID = function(req, res, next, id) { Recipe.findById(id).populate('user', 'displayName').populate('ingredients').exec(function(err, recipe) {
    if (err) return next(err);
    if (! recipe) return next(new Error('Failed to load recipe ' + id));
    req.recipe = recipe;
    next();
  });
};

/**
 * recipe authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.recipe.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};