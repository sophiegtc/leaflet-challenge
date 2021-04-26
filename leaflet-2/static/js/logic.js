// Use this link to get the geojson data.
var past7days_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicplatesData = "tectonicplates-master/GeoJSON/PB2002_plates.json";

d3.json(past7days_url).then(function(earthquake_data) {
  d3.json(tectonicplatesData).then(function(techtonic_data) {
    var myMap = L.map("map", {
      center: [earthquake_data.features[0].geometry.coordinates[1], earthquake_data.features[0].geometry.coordinates[0]],
      zoom: 5
    });
      
    earthquake_data = earthquake_data.features.coordinates;
    console.log(earthquake_data);

    //tectonicplatesData=techtonic_data.features;
   // console.log(tectonicplatesData);
    for (var i = 0; i < tectonicplatesData.length; i++) {
      var tectonicplates = tectonicplatesData[i].geometry;

      var points = [];
      for (var j = 0; j < tectonicplates.coordinates.length; j++) {
        points.push([tectonicplates.coordinates[j][1], tectonicplates.coordinates[j][0]]);
      }
      // console.log(points);
      L.polyline(points[1]).addTo(myMap);
    }

    for (var i = 0; i < earthquake_data.length; i++) {
      var location = earthquake_data[i].geometry;
 
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
        color: "#D2D2CD",
        fillColor: color,
        // Adjust radius
        radius: earthquake_data[i].properties["mag"]*30000
      }).bindPopup("<h2> size:" +  earthquake_data[i].properties["mag"] + "</h2> <hr> <h3>deep: " + location.coordinates[2] + "</h3>").addTo(myMap);
    }
    
    for (var i = 0; i < earthquake_data.length; i++) {
      var location = earthquake_data[i].geometry;


      // // Set up the legend
      var legend = L.control({ position: "bottomright" });
      legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var colors = [];

        colors.push("<div><span style=\"background-color: #A3F600;display: inline-block;height: 10px;margin-right: 5px;width: 10px;\"></span>-10-10</div>");
        colors.push("<div><span style=\"background-color: #DCF400;display: inline-block;height: 10px;margin-right: 5px;width: 10px;\"></span>10-30</div>");
        colors.push("<div><span style=\"background-color: #F7DB11;display: inline-block;height: 10px;margin-right: 5px;width: 10px;\"></span>30-50</div>");
        colors.push("<div><span style=\"background-color: #FDB72A;display: inline-block;height: 10px;margin-right: 5px;width: 10px;\"></span>50-70</div>");
        colors.push("<div><span style=\"background-color: #FCA25D;display: inline-block;height: 10px;margin-right: 5px;width: 10px;\"></span>70-90</div>");
        colors.push("<div><span style=\"background-color: #FF5F65;display: inline-block;height: 10px;margin-right: 5px;width: 10px;\"></span>90+</div>");
        div.innerHTML += "<ul>" + colors.join("") + "</ul>";
        return div;
      };
    }

    // Adding legend to the map
    legend.addTo(myMap);
    
    // var Light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "light-v10",
    //   accessToken: API_KEY
    // });

    // var Outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "outdoors-v11",
    //   accessToken: API_KEY
    // });

    // var Satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "satellite-v9",
    //   accessToken: API_KEY
    // });

    //   // Create two separate layer groups: one for cities and one for states
    // var states = L.layerGroup(stateMarkers);
    // var cities = L.layerGroup(cityMarkers);

    // // Create a baseMaps object
    // var baseMaps = {
    //   "Satellite": Satellite,
    //   "Outdoors": outdoor,
    //   "Grayscale":light
    // };

    // // Create an overlay object
    // var overlayMaps = {
    //   "Tectonic Plates": states,
    //   "Earthquake": cities
    // };

    // // Define a map object
    // var myMap = L.map("map", {
    //   center: [37.09, -95.71],
    //   zoom: 5,
    //   layers: [streetmap, states, cities]
    // });

    // // Pass our map layers into our layer control
    // // Add the layer control to the map
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(myMap);
  });
});
