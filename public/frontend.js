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
                break;
            case "restaurantSelect":
                foundObj = restaurantsClient.find(hotel => hotel.id === nearestSelectID);
                break;
            case "activitiesSelect":
                foundObj = activitiesClient.find(hotel => hotel.id === nearestSelectID);
                break;
        }

        // console.log(foundObj.name);

    })

    // find category of foundObj in itineraryPanel
    // append rectangle & remove button to the corresponding itinterary item
    //$()
    //  <!-- <button type="button" class="btn btn-info btn-circle"><i class="glyphicon glyphicon-minus"></i></button>-->


});
