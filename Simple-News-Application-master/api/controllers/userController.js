var userModel = require('../models/userModel.js');
var crypt = require('../utils/crypt.js');
var User = userModel.Schema('Users').model;
var config = require('../config');

exports.list_all_users = function(req, res) {
  User.dataTable(req.query, function (err, data) {
    if (err)
      res.status(500).send(err);
    res.send(data);
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.status(500).send(err);
    res.json(user);
  });
};

exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.status(500).send(err);
    res.json(user);
  });
};

exports.count_by_email = function(req, res) {
  User.count({ '$and': [
      {'email': req.query.email},
      {'email': {'$ne': req.query.exclude }}
    ] }, function(err, count) {
    if (err)
      res.status(500).send(err);

    res.json({'count': count});
  });
}

exports.count_by_username = function(req, res) {
  User.count({ '$and': [
      {'username': req.query.username},
      {'username': {'$ne': req.query.exclude }}
    ] }, function(err, count) {
    if (err)
      res.status(500).send(err);

    res.json({'count': count});
  });
}

exports.update_a_user = function(req, res) {
  var data = { $set: { 
    name: req.body.name,
    phone_number: req.body.phone_number
  } };

  User.findOneAndUpdate({_id: req.params.userId}, data, {new: true}, function(err, user) {
    if (err)
      res.status(500).send(err);
    res.json(user);
  });
};

exports.update_profile = function(req, res) {
  var data = { $set: { 
    name: req.body.name,
    phone_number: req.body.phone_number
  } };

  User.findOneAndUpdate({_id: req.user._id}, data, {new: true}, function(err, user) {
    if (err)
      res.status(500).send(err);
    res.json(user);
  });
};

exports.change_password = function(req, res) {
  if (req.user.password == crypt.md5(req.body.currentPassword)) {
    var data = { $set: { 
      password: crypt.md5(req.body.newPassword)
    } };

    User.findOneAndUpdate({_id: req.user._id}, data, {new: true}, function(err, user) {
      if (err)
        res.status(500).send(err);
      res.json({ status: 'success', message: 'User password successfully updated' });
    });
  }
  else
    res.json({ status: 'error', message: 'Current password is not match' });
}

exports.delete_a_user = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.status(500).send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
