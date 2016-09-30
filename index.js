var Express = require('express');
var app = new Express();
var db = require('./models');
var Promise = require('bluebird');
var nunjucks = require('nunjucks');

var Place = db.Place;
var Hotel = db.Hotel;
var Activity = db.Activity;
var Restaurant = db.Restaurant;

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

app.get('/', function(req,res,next) {
	Promise.all([Hotel.findAll({}), Activity.findAll({}), Restaurant.findAll({})])
	.spread(function(hotel_result, activity_result, restaurant_result) {
		res.render('basic_template', { hotels: hotel_result,
																	 restaurants: activity_result,
																	 activities: restaurant_result
																 });
	});
});

// invalid route
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
// app.use(function(err, req, res, next) {
// 	res.status(err.status || 500);
// 	console.error(err);
// 	res.render(
//
// 	);
// })
//
// Promise.all([Place.sync(), Hotel.sync(), Restaurant.sync(), Activity.sync()])


app.listen(8080, function() {
	console.log('server running!');
});
