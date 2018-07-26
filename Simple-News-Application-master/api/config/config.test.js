var config = require('./config.global');
 
config.env = 'test';
config.db = 'mongodb://trinhnck:password@ds127801.mlab.com:27801/testing_nodejs';
 
module.exports = config;