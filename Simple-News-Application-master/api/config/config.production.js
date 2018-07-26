var config = require('./config.global');
 
config.env = 'product';
config.db = 'mongodb://trinhnck:password@ds127801.mlab.com:27801/testing_nodejs';
config.allow_origin = "http://localhost:3000";

module.exports = config;