module.exports = function(app) {
  
  var setup = require('../controllers/setupController');
  
  app.route('/setup')
    .get(setup.start);
};
