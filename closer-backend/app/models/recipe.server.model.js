'use strict';

var relationship = require('mongoose-relationship');

// module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// a validation function for properties
var validatePresenceProperty = function(property){
  return property.length > 0;
};

// recipe Schema
var RecipeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: '',
    validate: [validatePresenceProperty, 'Please fill in the recipe name']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },  
  steps: {
    type: String,
    trim: true,
    default: ''
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  user : {
    type: Schema.ObjectId, 
    ref: 'User'
  },
  ingredients: [{type: Schema.ObjectId, ref: 'Ingredient'}]  
});

mongoose.model('Recipe', RecipeSchema);