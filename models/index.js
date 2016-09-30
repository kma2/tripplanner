var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tripplanner');

var Place = db.define('place', {
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.FLOAT)
});

var Hotel = db.define('hotel', {
  name: Sequelize.STRING,
  num_stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  },
  amenities: Sequelize.STRING
});

var Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  cuisine: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  }
});

var Activity = db.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING,
});


Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);


module.exports = {
  Place: Place,
  Hotel: Hotel,
  Restaurant: Restaurant,
  Activity: Activity,
  db: db
}
