var express = require('express');
var multer = require('multer');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var env = app.get('env');
var port = process.env.PORT || 8080;

//custom modules
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var morgan = require('morgan');
var serverEvent = require('server-event');
require('./configs/prototypesDanger');
//Mongoose
var mongoose = require('mongoose');
//Configure File Uploads
//var appMulter = require('./configs/fileUploads')(multer);
//Use the passport authentication
//require('./configs/passport.js')(passport); // pass passport for configuration 
// load routes and pass in our app and fully configured passport


//db configurations
var configDB = require('./configs/db');

mongoose.connect(configDB[env], function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});


//var server = require('http').createServer(app);
//var io = require('socket.io')(server);
//server.listen(3000);
//var connections = {};
var koruRoutes = require('./routes/koruRoutes')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Use EJS as default
var layout = env === 'local' ? 'layoutDev' : 'layout';
app.set("layout", layout);
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(expressLayouts);

//Session and login 
app.use(session({secret: 'korusaltconfidentialencrypter', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());//this is for redirects

//dev Only
app.use(morgan('dev')); // log every request to the console

//app.use(appMulter);
app.use('/', koruRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

// error handlers

// development error handler
// will print stacktrace
if (env === 'development' || env === 'local') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} else {
  require('./configs/cssJs');//compile all js and css files in public foder into a single file (one for js and one for css).
}


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Log IP address of remote user
//app.use(function (req, res, next) {
//  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//  console.log('Client IP:', ip);
//  next();
//});

//use 8080 or any environment port.
app.listen(port);


module.exports = app;
