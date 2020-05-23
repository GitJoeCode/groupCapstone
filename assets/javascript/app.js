        
// $("#find-trails-btn").on("click", displayTrails())


$("#hike-form").on("submit", function(e) {
  e.preventDefault()
  var city = $("#city-input").val().trim();
  console.log(city);
  var locationApiKey = "2b834b61e85748619fd8bc16d0a7150e";
  // var area = "moorpark, CA"

  var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=" + locationApiKey;
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // $("#location-info").text(JSON.stringify(response));
    
      var foundLat = response.results[0].geometry.lat.toFixed(4);
      var foundLon = response.results[0].geometry.lng.toFixed(4);
      lat = foundLat;
      lon = foundLon;
      console.log(lat);
      console.log(lon);

      var hikingApiKey = "200765577-d0ba766cf062a2c1a1bc41dbad732763";
      var maxDis = 50;
      var queryURL = "https://www.hikingproject.com/data/get-trails?" + "lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDis + "&key=" + hikingApiKey;
      
      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        // $("#hike-options").text(JSON.stringify(response));
        for(i=0; i<response.trails.length; i++) {
          console.log(response.trails[i]);
          var trailName = response.trails[i].name;
          var link = response.trails[i].url;
          console.log(link);
          var imgElement = `<a href= "${link}"> ${trailName} </a>`
          console.log(imgElement);
          // var linkTag = jQuery('<a/>', {
          //                   id: link,
          //                   href: link
          //               })

          // var output = $("a")
          // output.attr("href", link);
          // output.text(trailName);
          // console.log(output);
          var trailSummary = response.trails[i].summary;
          var rating = response.trails[i].stars;
          var location = response.trails[i].location;
          var length = response.trails[i].length;
          var pic = response.trails[i].imgSmall;
          
          var newRow = $("<tr>").append(
          $("<td>").text(imgElement),
          $("<td>").text(location),
          $("<td>").text(trailSummary),
          $("<td>").text(rating),
          $("<td>").text(length),
          $("<td>").text(pic)
          );

          $("#hike-table > tbody").append(newRow);
        }

      });

    });
});
