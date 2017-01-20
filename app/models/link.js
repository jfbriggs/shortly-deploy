var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// var Link = mongoose.model('Link', urlsSchema);

var urlsSchema = mongoose.Schema({
  url: String,
  link: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', urlsSchema);

urlsSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);

  this.visits = 0;
  next();
});

module.exports = Link;
