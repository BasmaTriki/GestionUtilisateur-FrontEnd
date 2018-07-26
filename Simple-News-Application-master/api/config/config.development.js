var config = require('./config.global');
 
config.env = 'development';
config.db = 'mongodb://root:123456@ds149059.mlab.com:49059/news_app';
config.allow_origin = "*";

module.exports = config;