module.exports = function(app) {

  var user = require('../controllers/userController');
  
  app.route('/users')
    .get(user.list_all_users)
    .post(user.create_a_user);

  app.route('/user/update_profile')
    .put(user.update_profile)

  app.route('/user/change_password')
    .post(user.change_password)

  app.route('/user/count_by_email')
    .get(user.count_by_email)

  app.route('/user/count_by_username')
    .get(user.count_by_username)

  app.route('/user/:userId')
    .get(user.read_a_user)
    .put(user.update_a_user)
    .delete(user.delete_a_user);
};
