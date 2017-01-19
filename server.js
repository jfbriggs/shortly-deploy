var app = require('./server-config.js');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//app server
var port = 4568;

app.listen(port);

console.log('Server now listening on port ' + port);

//DB server
var url = 'mongodb://localhost:27017/shortly-deploy';



var insertDocuments = function(db, callback) {
  var collection = db.collection('documents');

  collection.insertMany([
    {username: 'Marcus', password: '0924u5092gijsfogkjqrogi0rwgj'}, {a: 2, b: 'b'}, {a: 3, b: 'b'}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    console.log('Result.result.N is...', result.result.n);
    assert.equal(3, result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to DB server.');

  insertDocuments(db, function() {
    db.close();
    
  });
});