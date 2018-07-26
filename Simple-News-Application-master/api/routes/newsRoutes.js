module.exports = function(app) {

  var news = require('../controllers/newsController');
  
  app.route('/news')
    .get(news.list_all_news)
    .post(news.create_a_news);

  app.route('/news/data_table')
    .get(news.data_table);

  app.route('/news/:newsId')
    .get(news.read_a_news)
    .put(news.update_a_news)
    .delete(news.delete_a_news);
};
