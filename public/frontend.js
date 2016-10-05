// keeping track of our current itinerary:
var currentItinerary = {
                          hotel: [], //  {name: 'something', location {20.74, 40.83}}
                          restaurantsArr: [], // { name: 'something', location: {20.74, 40.83} }
                          activitiesArr: []
                        }

// generate option tags for index.html
$(document).ready(function() {

    for (var hotel of hotelsClient) {
      var createOption = document.createElement('option');
      $(createOption).val(hotel.id).text(hotel.name);
      $('#hotelSelect select').append(createOption);
    }

    for (var restaurant of restaurantsClient) {
      var createOption = document.createElement('option');
      $(createOption).val(restaurant.id).text(restaurant.name);
      $('#restaurantSelect select').append(createOption);
    }

    for (var activities of activitiesClient) {
      var createOption = document.createElement('option');
      $(createOption).val(activities.id).text(activities.name);
      $('#activitiesSelect select').append(createOption);
    }


    $('.add').click(function() {
        var parent = $(this).parent(); // parent object: for ex <div id="hotelSelect"></div>
        var parentID = $(parent).attr('id'); // parent's id: for ex restaurantSelect
        var nearestSelectID = Number($(parent).find('select option:selected').attr('value')); // item id
        var foundObj;

        switch(parentID) {
            case "hotelSelect":
                foundObj = hotelsClient.find(hotel => hotel.id === nearestSelectID);
                updateItinerary('hotel', foundObj);
                break;
            case "restaurantSelect":
                foundObj = restaurantsClient.find(hotel => hotel.id === nearestSelectID);
                updateItinerary('restaurants', foundObj);
                break;
            case "activitiesSelect":
                foundObj = activitiesClient.find(hotel => hotel.id === nearestSelectID);
                updateItinerary('activities', foundObj);
                break;
        }
        updateMap();
    });


  function createItineraryItem(name) {
    var newItemDiv = document.createElement('DIV');

    $(newItemDiv).addClass('itinerary-item');
    $(newItemDiv).append('<div>' + name + '</div>');
    $(newItemDiv).append('<button type="button" class="btn btn-info btn-circle add"><i class="glyphicon glyphicon-minus"></i></button>');

    return newItemDiv;
  }

  function updateItinerary(type, obj) {
    var newItem = createItineraryItem(obj.name); // create and append item

    switch (type){
      case "hotel":
        if (!currentItinerary.hotel.length){
          currentItinerary.hotel.push({ name: obj.name, location: obj.place.location });
          $('.hotel-itinerary').append(newItem);
        } else {
          $('div.hotel-itinerary div.itinerary-item div').text(obj.name);
          currentItinerary.hotel[0] = { name: obj.name, location: obj.place.location }; // update currentItinerary with new itinerary item
        }
        break;
      case "restaurants":
        // if there's duplicity, don't add again
        if (currentItinerary.restaurantsArr.filter(r => r.name === obj.name).length === 0) {
          currentItinerary.restaurantsArr.push({ name: obj.name, location: obj.place.location });
          $('.restaurants-itinerary').append(newItem);
        }
        break;
      case "activities":
        if (currentItinerary.activitiesArr.filter(r => r.name === obj.name).length === 0) {
          currentItinerary.activitiesArr.push({ name: obj.name, location: obj.place.location });
          $('.activities-itinerary').append(newItem);
        }
        break;
    }

    // removes obj (validation, duplicates)
      // removes DOM node
  }

  // after a new itinerary item is added, new markers are added to the map
  function updateMap() {
    // create new markers
    for (let category in currentItinerary) { // category is array in object currentItinerary
      for (let item of currentItinerary[category]) { // item is obj in array category
        addMapMarker(item); // add markers for each itinerary item based on geo coords
      }
    }


    // zoom map accordingly to fit scope of the markers
    map.fitBounds()
  }

});


// generate a new map marker based on the itinerary item's location coordinates
function addMapMarker(obj) {
  var newLocation = new google.maps.LatLng(obj.location[0], obj.location[1]);
  var marker = new google.maps.Marker({
    position: newLocation,
  });

  markerArr.push(marker);
  marker.setMap(map);
}
