module.exports = function(app) {
  
  var authenticate = require('../controllers/authenticationController');
  
  app.use(authenticate.setupHeaderMiddleWare);
  app.route('/authenticate')
    .post(authenticate.authenticate);
  app.use(authenticate.startMiddleWare);
};
