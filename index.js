var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var db = require('./models');

var app = express();

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve any other static files
app.use(express.static(__dirname + '/public'));

app.use('/', express.static(__dirname + '/bower_components/'));
app.use('/public', express.static(__dirname + '/public/'));

// serve dynamic routes
app.use(require('./routes'));

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

// listen on a port
var port = 3000;
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
  db.sync()
  .then(function () {
    console.log('Synchronated the database');
  })
  .catch(function (err) {
    console.error('Trouble right here in River City', err, err.stack);
  });
});




// var Express = require('express');
// var app = new Express();
// var db = require('./models');
// var Promise = require('bluebird');
// var nunjucks = require('nunjucks');
//
// var Place = db.Place;
// var Hotel = db.Hotel;
// var Activity = db.Activity;
// var Restaurant = db.Restaurant;
//
// app.engine('html', nunjucks.render);
// app.set('view engine', 'html');
// nunjucks.configure('views', {noCache: true});
//
// app.use('/', Express.static(__dirname + '/bower_components/'));
// app.use('/public', Express.static(__dirname + '/public/'));
//
// app.get('/', function(req,res,next) {
// 	Promise.all([Hotel.findAll({}), Activity.findAll({}), Restaurant.findAll({})])
// 	.spread(function(hotel_result, activity_result, restaurant_result) {
// 		res.render('index', { hotels: hotel_result, restaurants: restaurant_result,
// 		activities: activity_result });
// 	});
// });
//
// // invalid route
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // handle all errors (anything passed into `next()`)
// app.use(function(err, req, res, next) {
// 	res.status(err.status || 500);
// 	console.error(err);
// });
//
//
// app.listen(8080, function() {
// 	console.log('server running!');
// });
