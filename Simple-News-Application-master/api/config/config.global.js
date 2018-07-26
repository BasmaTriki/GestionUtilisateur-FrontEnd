var config = module.exports = {};

config.env = 'development';
config.debug = true;
config.port = 3003;
config.email = 'trinh.nck@gmail.com';
config.site_name = 'News';
config.site_desc = 'Very simple todo, demo for my cv application.';
config.session_secret = '26w5Mtw3Hn';
config.root=__dirname;
config.db = 'mongodb://127.0.0.1:27017/news';
config.allow_origin = "http://localhost:3000";
config.upload_path = "./public/uploads";
config.upload_uri = "uploads";