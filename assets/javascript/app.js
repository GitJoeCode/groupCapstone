        
        
        
        var key = "200765577-d0ba766cf062a2c1a1bc41dbad732763";
        var lat = 40.0274;
        var lon = -105.2519;
        var maxDis = 50;
        var queryURL = "https://www.hikingproject.com/data/get-trails?" + "lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDis + "&key=" + key;
        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
        // and display it in the div with an id of movie-view
        console.log(queryURL);
        // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#hike-options").text(JSON.stringify(response));
        });