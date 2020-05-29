        
// $("#find-trails-btn").on("click", displayTrails())
var difficultyScale = {
  green: ["Easy", "green"],
  greenBlue: "Easy/Intermediate",
  blue: "Intermediate",
  blueBlack: "Intermediate/Difficult",
  black: "Difficult",
  blackBlack: "Very Difficult"
}

$("#hike-form").on("submit", function(e) {
  e.preventDefault()
  var city = $("#city-input").val().trim() + "," + $("#state-input").val().trim();
  
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
          var trailLink = $("<td>");
            trailLink.html("<a href=" + link + ">" + trailName + "</a>");
            trailLink.addClass("link");
          var trailSummary = response.trails[i].summary;
          var rating = response.trails[i].stars;
          var location = response.trails[i].location;
          var length = response.trails[i].length;
          var pic = response.trails[i].imgSmall;
          var picLink = $("<td>");
            picLink.html("<a href=" + pic + ">Picture Preview</a>")
            picLink.addClass("link");
          var difficulty = response.trails[i].difficulty;
          // var x = 0;
          // var difficultyColor = null;
          // while (x<difficultyScale.length) {
          //   if (difficulty == difficultyScale[x]) {
          //     difficulty = difficultyScale[x]
          //     // difficultyColor = difficultyScale[i].color
          //     break;
          //   }
          //   x++;
          // }
          
          var newRow = $("<tr>").append(
          trailLink,
          $("<td>").text(location),
          $("<td>").text(trailSummary),
          $("<td>").text(rating),
          $("<td>").text(length + " miles"),
          picLink,
          $("<td>").text(difficulty),
          );

          $("#hike-table > tbody").append(newRow);
        }

      });

    });
});
