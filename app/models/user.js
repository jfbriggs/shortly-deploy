var db = require('../config');
var mongoose = require('mongoose');

//var User = mongoose.model('User', usersSchema);
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


// USER STUFF
var usersSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true }
});

var User = mongoose.model('User', usersSchema);

User.comparePassword = function(attemptedPassword, currentPassword, callback) {
  bcrypt.compare(attemptedPassword, currentPassword, function(err, isMatch) {
    callback(null, isMatch);
  });
};

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
