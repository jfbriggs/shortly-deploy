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



// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemtedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

module.exports = User;
