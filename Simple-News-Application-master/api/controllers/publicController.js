var newsModel = require('../models/newsModel.js');
var userModel = require('../models/userModel.js');
var categoryModel = require('../models/categoryModel.js');
var News = newsModel.Schema('News').model;
var User = userModel.Schema('Users').model;
var Category = categoryModel.Schema('Categories').model;
var formidable = require('formidable');
var config = require('../config');

exports.list_all_news = function(req, res) {
  var perPage = 10, 
  page = Math.max(0, req.query.page - 1);

  News.find()
    .sort({'created_date': -1})
    .limit(perPage + 1)
    .skip(perPage * page)
    .populate('author')
    .exec(function(err, news) {
      if (err)
        res.status(500).send(err);

      var last = false;
      if(news.length != perPage + 1) {
        last = true;
      }
      else
        news.pop();

      res.json({'last': last, 'data': news});
    });
};

exports.read_a_news = function(req, res) {
  News.findById(req.params.newsId)
  .populate('author')
  .exec(function(err, news) {
    if (err)
      res.status(500).send(err);

    news.view_count++;
    news.save(function (err, updated_news) {
      if (err)
        res.status(500).send(err);
      res.json(updated_news);
    });
  });
};

exports.top_news = function(req, res) {
  var perPage = 12, 
  page = Math.max(0, req.query.page - 1);

  News.find()
  .sort({'view_count': -1})
  .limit(perPage + 1)
  .skip(perPage * page)
  .populate('author')
  .exec(function(err, news) {
    if (err)
      res.status(500).send(err);

    var last = false;
    if(news.length != perPage + 1) {
      last = true;
    }
    else
      news.pop();

    res.json({'last': last, 'data': news});
  });
};

exports.today_news = function(req, res) {
  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

  var perPage = 10, 
  page = Math.max(0, req.query.page - 1);

  News.find({created_date: {$gte: start, $lt: end}})
  .sort({'view_count': -1})
  .limit(perPage + 1)
  .skip(perPage * page)
  .populate('author')
  .exec(function(err, news) {
    if (err)
      res.status(500).send(err);
    
    var last = false;
    if(news.length != perPage + 1) {
      last = true;
    }
    else
      news.pop();

    res.json({'last': last, 'data': news});
  });
};

exports.authors = function(req, res) {
  User.aggregate([
    {
      $lookup: {
          from: "news",
          localField: "_id",
          foreignField: "author",
          as: "news"
      }
    },
    {
      $project : { 
        password : 0
      } 
    }
  ])
  .exec(function(err, authors) {
    var result = [];

    authors.forEach((author) => {
      author.news_count = author.news.length;

      var sumValues = 0;
      author.news.forEach((val) => {
        sumValues += val.view_count;
      });

      author.view_count = sumValues;

      delete author.news;
      result.push(author);
    });

    res.json(result);
  });
};

exports.news_by_author = function(req, res) {
  var perPage = 10, 
  page = Math.max(0, req.query.page - 1);

  News.find({author: req.params.authorId})
    .sort({'created_date': -1})
    .limit(perPage + 1)
    .skip(perPage * page)
    .populate('author')
    .exec(function(err, news) {
      if (err)
        res.status(500).send(err);

      var last = false;
      if(news.length != perPage + 1) {
        last = true;
      }
      else
        news.pop();

      res.json({'last': last, 'data': news});
    });
};


exports.categories = function(req, res) {
  Category.aggregate([
    {
      $lookup: {
          from: "news",
          localField: "_id",
          foreignField: "category",
          as: "news"
      }
    }
  ])
  .exec(function(err, categories) {
    var result = [];

    categories.forEach((category) => {
      category.news_count = category.news.length;

      var sumValues = 0;
      category.news.forEach((val) => {
        sumValues += val.view_count;
      });

      category.view_count = sumValues;
      
      delete category.news;
      result.push(category);
    });

    res.json(result);
  });
};

exports.news_by_category = function(req, res) {
  var perPage = 10, 
  page = Math.max(0, req.query.page - 1);

  News.find({category: req.params.categoryId})
    .sort({'created_date': -1})
    .limit(perPage + 1)
    .skip(perPage * page)
    .populate('author')
    .exec(function(err, news) {
      if (err)
        res.status(500).send(err);
      
      var last = false;
      if(news.length != perPage + 1) {
        last = true;
      }
      else
        news.pop();

      res.json({'last': last, 'data': news});
    });
};