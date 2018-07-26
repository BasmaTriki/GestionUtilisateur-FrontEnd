var userModel = require('../models/userModel.js');
var crypt = require('../utils/crypt.js');
var User = userModel.Schema('Users').model;

exports.start = function(req, res){
	var adminAccount = new User({ 
      name: 'Administrator', 
      username: 'admin',
      password: crypt.md5('12345'),
      role: 'administrator',
      phone_number: '0962286085',
      email: 'trinh.nck@gmail.com'
    });

    adminAccount.save(function(err) {
      if (err) throw err;

      res.json({ success: true });
    });
}
