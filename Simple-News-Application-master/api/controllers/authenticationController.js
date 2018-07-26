var userModel = require('../models/userModel.js');
var crypt = require('../utils/crypt.js');
var config = require('../config');
var User = userModel.Schema('Users').model;
var jwt = require('jsonwebtoken');

exports.setupHeaderMiddleWare = function(req, res, next) {

  if (req.method === 'OPTIONS') {
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400';
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, x-access-token";
    res.writeHead(200, headers);
    res.end();
  }
  else{
    res.setHeader('Access-Control-Allow-Origin', config.allow_origin);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.setHeader('Access-Control-Request-Method', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();  
  }
}

exports.startMiddleWare = function(req, res, next) {
  if(!req.originalUrl.startsWith('/public')){
    var token = req.headers['x-access-token'] || req.query['x-access-token'];

    if (token) {
      jwt.verify(token, config.session_secret, function(err, decoded) {      
        if (err)
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        
        User.findOne({ username: decoded.u }, function(err, userInfo){
          if (err || !userInfo)
            return res.json({ success: false, message: 'Cannot find username' });

          req.user = userInfo;
          next();
        });
      });
    } else {
      return res.status(403).send({ 
        success: false, 
        message: 'No token provided.'
      });
    }
  }
  else
    next();
}

exports.authenticate = function(req, res){
  var mdPassword = crypt.md5(req.body.password);
  var queryObj = {
    username: req.body.username,
    password: mdPassword
  };

  User.findOne(queryObj, function(err, userInfo){
    if (err) throw err;

    if(userInfo){
      var token = jwt.sign({ u: userInfo.username }, config.session_secret, {
        expiresIn: '1d'
      });

      res.json({
        success: true,
        token: token,
        user_info: userInfo
      });
    } else
      res.status(403).send({ 
        success: false, 
        message: 'Authentication failed.'
      });
  });
}