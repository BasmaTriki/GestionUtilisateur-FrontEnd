var dburl = require("../config").db;
var mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;
var DataTable = require('mongoose-datatable');

mongoose.Promise = global.Promise;
DataTable.configure({ verbose: true, debug : false });
mongoose.plugin(DataTable.init);

exports.connect = function(callback) {
  mongoose.connect(dburl, {useMongoClient: true});
}

exports.mongoObj = function(){
  return  mongoose; 
}

exports.CreateConnection=function(callback,returnFunc){
  var connection = mongoose.createConnection(dburl);

  connection.on('open', function() {
    callback(connection,Admin,returnFunc);
  });
}