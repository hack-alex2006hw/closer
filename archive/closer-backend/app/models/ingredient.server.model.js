'use strict';

var relationship = require('mongoose-relationship');

// module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// a validation function for properties
var validatePresenceProperty = function(property){
  return property.length > 0;
};

// ingredient Schema
var IngredientSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: '',
    validate: [validatePresenceProperty, 'Please fill in the ingredient name']
  },
  description: {
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
  recipes: [{type: Schema.ObjectId, ref: 'Recipe', childPath: "ingredients"}]
});

// relationships
IngredientSchema.plugin(relationship, { relationshipPathName:'recipes' });

mongoose.model('Ingredient', IngredientSchema);