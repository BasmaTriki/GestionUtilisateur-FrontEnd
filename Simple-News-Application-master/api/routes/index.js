var authenticationRoutes = require('./authenticationRoutes');
var userRoutes = require('./userRoutes');
var categoryRoutes = require('./categoryRoutes');
var newsRoutes = require('./newsRoutes');
var setupRoutes = require('./setupRoutes')
var publicRoutes = require('./publicRoutes')

module.exports = function(app) {
	setupRoutes(app);
	authenticationRoutes(app);
  userRoutes(app);
  categoryRoutes(app);
  newsRoutes(app);
  publicRoutes(app);
};
