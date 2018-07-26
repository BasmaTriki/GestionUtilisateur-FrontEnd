var express = require('express'),
  mongoHelper = require("./utils/mongoUtils"),
  urlHelper = require("./routes"),
  http = require('http'),
  config = require("./config"),
  bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || config.port);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true, keepExtensions: true }));
app.use(bodyParser.json());

urlHelper(app);

mongoHelper.connect(function(error){
  if (error) throw error;
});

app.on('close', function(errno) {
	mongoHelper.disconnect(function(err) { });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
