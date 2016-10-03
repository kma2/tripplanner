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


// app.use('/', Express.static(__dirname + '/static'));
app.use('/', Express.static(__dirname + '/bower_components/'));
app.use('/public', Express.static(__dirname + '/public/'));


app.get('/', function(req,res,next) {
	Promise.all([Hotel.findAll({}), Activity.findAll({}), Restaurant.findAll({})])
	.spread(function(hotel_result, activity_result, restaurant_result) {
		res.render('basic_template', { hotels: hotel_result,
																	 restaurants: restaurant_result,
																	 activities: activity_result
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
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.error(err);
	// res.render(
	// );
});


app.listen(8080, function() {
	console.log('server running!');
});
