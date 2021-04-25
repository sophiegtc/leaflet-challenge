var past7days_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
d3.json(past7days_url).then(function(response) {
  var myMap = L.map("map", {
    center: [response.features[0].geometry.coordinates[1], response.features[0].geometry.coordinates[0]],
    zoom: 5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 5,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);


  response = response.features;
  console.log(response);

  for (var i = 0; i < response.length; i++) {
    var location = response[i].geometry;

      // Conditionals for earthquake circle color
    var color = "green";
    if (location.coordinates[2] >= -10) {
      color = "#A3F600";
    }
    if (location.coordinates[2] > 10) {
      color = "#DCF400";
    }
    if (location.coordinates[2] > 30) {
      color = "#F7DB11";
    } 
    if (location.coordinates[2] > 50) {
      color = "#FDB72A";
    }
    if (location.coordinates[2] > 70) {
      color = "#FCA25D";
    }
    if (location.coordinates[2] > 90) {
      color = "#FF5F65";
    }

    L.circle([location.coordinates[1], location.coordinates[0]], {
      fillOpacity: 0.75,
      color: "grey",
      fillColor: color,
      // Adjust radius
      radius: response[i].properties["mag"]*30000
    }).bindPopup("<h1> size:" +  response[i].properties["mag"] + "</h1> <hr> <h3>deep: " + location.coordinates[2] + "</h3>").addTo(myMap);
  }

   
});
