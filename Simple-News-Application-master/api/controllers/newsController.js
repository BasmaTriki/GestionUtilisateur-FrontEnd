var newsModel = require('../models/newsModel.js');
var News = newsModel.Schema('News').model;
var formidable = require('formidable');
var config = require('../config');
var path = require("path");

exports.list_all_news = function(req, res) {
  News.find({}, function(err, news) {
    if (err)
      res.status(500).send(err);
    res.json(news);
  });
};

exports.data_table = function(req, res) {
  News.dataTable(req.query, function (err, data) {
    if (err)
      res.status(500).send(err);
    res.send(data);
  });
};

exports.create_a_news = function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = config.upload_path;
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
    var new_news = new News(fields);
    var thumb_name = files.thumbnail.path.split(path.sep).pop();
    new_news.thumbnail = thumb_name;
    new_news.view_count = 0;
    new_news.save(function(err, news) {
      if (err)
        res.status(500).send(err);
      res.json(news);
    });
  });
};

exports.read_a_news = function(req, res) {
  News.findById(req.params.newsId, function(err, news) {
    if (err)
      res.status(500).send(err);
    res.json(news);
  });
};

exports.update_a_news = function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = config.upload_path;
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
    var new_news = new News(fields);
    if(files.thumbnail){
      var thumb_name = files.thumbnail.path.split(path.sep).pop();
      new_news.thumbnail = thumb_name;
    }
    News.findOneAndUpdate({_id: req.params.newsId}, new_news, {new: true}, function(err, news) {
      if (err)
        res.status(500).send(err);
      res.json(news);
    });
  });
};

exports.delete_a_news = function(req, res) {
  News.remove({
    _id: req.params.newsId
  }, function(err, news) {
    if (err)
      res.status(500).send(err);
    res.json({ message: 'News successfully deleted' });
  });
};
