        
// $("#find-trails-btn").on("click", displayTrails())
var difficultyScale = {
  green: ["Easy", "green"],
  greenBlue: "Easy/Intermediate",
  blue: "Intermediate",
  blueBlack: "Intermediate/Difficult",
  black: "Difficult",
  blackBlack: "Very Difficult"
}


var sort = "quality";
var searchResults = "Quality";
$('.form-check').click(function() {
    if($("#rating").prop("checked")) {
      sort = "quality";
      searchResults = "Quality";
    }
    if($("#distance").prop("checked")) {
      sort = "distance";
      searchResults = "Distance";
    }
});

// if($("#distance").option2==true) {
//   sort = "distance";
//   searchResults = "distance";
// }


$("#hike-form").on("submit", function(e) {
  e.preventDefault()
  $("#hike-table tbody").empty();
  $("#trailSearchType").empty();
  $("#weather-display").empty();
  $("#weather-img").empty();
  $("#weather-city").empty();
  var city = $("#city-input").val().trim()
  var state = $("#state-input").val().trim()
  console.log(city);
  console.log(state);
  var miles = $("#miles-input").val().trim()
  var maxDis = 50;
  if(miles != 0) {
    maxDis = miles;
  }


  var locationApiKey = "2b834b61e85748619fd8bc16d0a7150e";
  // var area = "moorpark, CA"

  var weatherApiKey = "33d50ec4a2dd0f93c123fd343f8b3925";
  var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=" + weatherApiKey;
  $.ajax({
      url: weatherURL,
      method: "GET"
    }).then(function(response) {
      
      var weatherImg = response.weather[0].main
      if (weatherImg == "Clear") {
        weatherImg = "<i class='em em-sunny' aria-role='presentation' aria-label='BLACK SUN WITH RAYS'></i>"
      }
      if (weatherImg == "Drizzle") {
        weatherImg = '<i class="em em-rain_cloud" aria-role="presentation" aria-label=""></i>'
      }
      if (weatherImg == "Rain") {
        weatherImg = '<i class="em em-rain_cloud" aria-role="presentation" aria-label=""></i>'
      }
      if (weatherImg == "Thunderstorm") {
        weatherImg = '<i class="em em-thunder_cloud_and_rain" aria-role="presentation" aria-label=""></i>'
      }
      if (weatherImg == "Snow") {
        weatherImg = '<i class="em em-snow_cloud" aria-role="presentation" aria-label=""></i>'
      };
      if (weatherImg == "Clouds") {
        weatherImg = '<i class="em em-cloud" aria-role="presentation" aria-label="CLOUD"></i>'
      }
      


      console.log(response);
      $("#weather-display").append(response.main.temp + "°F")
      $("#weather-img").append(weatherImg)
      $("#weather-city").append("The Current Weather for " + city + "," + state + " is:")

    });

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
      var queryURL = "https://www.hikingproject.com/data/get-trails?" + "lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDis + "&sort=" + sort + "&key=" + hikingApiKey;
      
      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        // $("#hike-options").text(JSON.stringify(response));
        var searchRow = $("<div>").html(" (Results sorted by " + searchResults + ")")
        $("#trailSearchType").append(searchRow);

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
          // var picLarge
          console.log(pic);
          var picLink = $("<td>");
            picLink.html("<a href=" + pic + ">" + "<img src=" + JSON.stringify(pic) + ">" + "</a>")
            picLink.addClass("link");
          var difficulty = response.trails[i].difficulty;
          if (difficulty == "blue") {
             difficulty = "Intermediate"
           };
          if (difficulty == "blueBlack") {
             difficulty = "Intermediate/Difficult"
           };
          if (difficulty == "green") {
            difficulty = "Easy"
          };
          if (difficulty == "greenBlue") {
            difficulty = "Easy/Intermediate"
          };
          if (difficulty == "black") {
            difficulty = "Difficult"
          };
          if (difficulty == "blackBlack") {
            difficulty = "Extremely Difficult"
          };
          

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
