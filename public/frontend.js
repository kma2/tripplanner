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




    $('.itineraryPanel').on('click', '.minus', function(e){
      var minusButton = e.target;

      var itineraryDiv = $(minusButton).closest('div');
      var nameDiv = $(itineraryDiv).find('div');
      var name = $(nameDiv).html();

      // remove from DOM
      $(itineraryDiv).remove();

      // find marker, and marker.setMap(null)
      for (let category in currentItinerary) { // category is array in object currentItinerary
        console.log("category", category);
        // console.log('CURRENT ITINERARY CATEGORY', currentItinerary[category]);
        var desiredObject = currentItinerary[category].filter(obj => obj.name === name)[0]; // [{}][0] = {}
          if (desiredObject) desiredObject.marker.setMap(null);
        currentItinerary[category] = currentItinerary[category].filter(obj=> obj.name !== name);
      } 


      // remove from array


    })

    function createItineraryItem(name) {
      var newItemDiv = document.createElement('DIV');

      $(newItemDiv).addClass('itinerary-item');
      $(newItemDiv).append('<div>' + name + '</div>');
      $(newItemDiv).append('<button type="button" class="btn btn-info btn-circle minus"><i class="glyphicon glyphicon-minus"></i></button>');

      return newItemDiv;
    }

    function updateItinerary(type, obj) {
      var newItem = createItineraryItem(obj.name); // create and append item
      var marker = new google.maps.Marker({
                                        position: new google.maps.LatLng(obj.place.location[0], obj.place.location[1]),
                                      });
      switch (type){
        case "hotel":
          if (!currentItinerary.hotel.length){
            currentItinerary.hotel.push({ name: obj.name, marker: marker });
            $('.hotel-itinerary').append(newItem);
          } else {
            currentItinerary.hotel[0].marker.setMap(null);
            $('div.hotel-itinerary div.itinerary-item div').text(obj.name);
            currentItinerary.hotel[0] = { name: obj.name, marker: marker }; // update currentItinerary with new itinerary item
          }
          break;
        case "restaurants":
          // if there's duplicity, don't add again
          if (currentItinerary.restaurantsArr.filter(r => r.name === obj.name).length === 0) {
            currentItinerary.restaurantsArr.push({ name: obj.name, marker: marker });
            $('.restaurants-itinerary').append(newItem);
          }
          break;
        case "activities":
          if (currentItinerary.activitiesArr.filter(r => r.name === obj.name).length === 0) {
            currentItinerary.activitiesArr.push({ name: obj.name, marker: marker });
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
      var bounds = new google.maps.LatLngBounds();

      for (let category in currentItinerary) { // category is array in object currentItinerary
        for (let item of currentItinerary[category]) { // item is obj in array category
          bounds.extend(item.marker.position);
          item.marker.setMap(map); // add markers for each itinerary item based on geo coords
        }
      }

      // zoom map accordingly to fit scope of the markers
      map.fitBounds(bounds)
    }


});



