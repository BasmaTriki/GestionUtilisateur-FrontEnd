module.exports = function(app) {

  var public = require('../controllers/publicController');
  
  app.route('/public/list_all_news')
    .get(public.list_all_news);

  app.route('/public/top_news')
    .get(public.top_news);

  app.route('/public/today_news')
    .get(public.today_news);

  app.route('/public/news/:newsId')
    .get(public.read_a_news);

  app.route('/public/authors')
    .get(public.authors);

  app.route('/public/author/:authorId')
    .get(public.news_by_author);

  app.route('/public/categories')
    .get(public.categories);

  app.route('/public/category/:categoryId')
    .get(public.news_by_category);
};
