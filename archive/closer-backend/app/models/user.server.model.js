'use strict';

// module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// a validation function for local strategy properties
var validateLocalStrategyProperty = function(property){
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

// a validation function for local strategy password
var validateLocalStrategyPassword = function(password) {
  return (this.provider !== 'local' || (password && password.length > 6));
}

// user Schema
var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String, 
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
  },
  username: {
    type: String, 
    unique: 'testing error message',
    required: 'Please fill in a username',
    trim: true
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: "Provider is required"
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  // for reset password
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});
 
// hook a pre save method to hash the password
UserSchema.pre('save', function(next){
  if (this.password && this.password.length > 6) {
    this.salt = bcrypt.genSaltSync(10);
    this.password = this.hashPassword(this.password);
  }
  next();
});

// create instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return bcrypt.hashSync('B4c0/\/', this.salt);
  } else {
    return password;
  }
};

// create instance method for authenticating user  
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};  

// find possible not used username
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

mongoose.model('User', UserSchema);