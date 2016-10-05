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

    // keeping track of our current itinerary:
    var currentItinerary = {
                              hotel: null,
                              restaurantsArr: [],
                              activitiesArr: []
                            }

    //  logging the selected hotel's name whenever the adjacent add button is clicked
    // when a plus button is clicked, look at parent div
    // then find nearest select text
    // console log the text

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

        
        // updateMap();

    })

    // find category of foundObj in itineraryPanel
    // append rectangle & remove button to the corresponding itinterary item
    //$()
    //  <!-- <button type="button" class="btn btn-info btn-circle"><i class="glyphicon glyphicon-minus"></i></button>-->





  function createItineraryItem(name) {
    var newItemDiv = document.createElement('DIV');
    
    $(newItemDiv).addClass('itinerary-item');
    $(newItemDiv).append('<div>' + name + '</div>');
    $(newItemDiv).append('<button type="button" class="btn btn-info btn-circle add"><i class="glyphicon glyphicon-minus"></i></button>');
    
    return newItemDiv;
  }

  function updateItinerary(type, obj) {

    switch (type){
      case "hotel":
        console.log("adding hotel,", obj);
        if (!currentItinerary.hotel){
          // define itinerary hotel as obj
          currentItinerary.hotel = obj;

          // create and append item
          var newItem = createItineraryItem(obj.name);
          $('.hotel-itinerary').append(newItem);
        } else {
          $('div.itinerary-item div').text(obj.name);
        }

        break;
      case "restaurants":
        break;
      case "activities":
        break;
    }


    // updates array (validation, duplicates)
      // generates and appends DOM node

    // removes obj (validation, duplicates)
      // removes DOM node

  }

  function updateMap() {
    
  }







});

















