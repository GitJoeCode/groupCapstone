        
        
var lat = null;
var lon = null;    
var locationApiKey = "2b834b61e85748619fd8bc16d0a7150e";
var city = "moorpark";

var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=" + locationApiKey;
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#location-info").text(JSON.stringify(response));
  
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
      $("#hike-options").text(JSON.stringify(response));
    });

  });
