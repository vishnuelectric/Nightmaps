/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var geocoder;
	      var map,pos,place,autocomplete,trafficLayer,mapp;
	      var street ;
	      var directionsDisplay;
	      var settraffic =false;
	      var settransit =  false;
	      var setcycle = false;
	      var setpanaramio= false;
	      var directionsService;
          var infowindow ;
	      var direction=false;



	google.maps.event.addDomListener(window, "load", init);

function init(){


	geocoder = new google.maps.Geocoder();

	        var latlng = new google.maps.LatLng(49.265984, -123.127491);
	        var mapOptions = {
	        zoom:2,
	        rotateControl : true,
	        panControl:false,
	        mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER
    },
	          center: latlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP

	        };
	        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	         map.data.loadGeoJson("http://www.yournavigation.org/api/1.0/gosmore.php?format=geojson&flat=52.215676&flon=5.963946&tlat=52.2573&tlon=6.1799&v=motorcar&fast=1&layer=google");
	         trafficLayer = new google.maps.TrafficLayer();
	         panaramioLayer = new google.maps.panoramio.PanoramioLayer();
	         transitLayer = new google.maps.TransitLayer();
	         cycleLayer =new google.maps.BicyclingLayer();
	        var input = document.getElementById('searchtext');
         autocomplete = new google.maps.places.Autocomplete(input);
         autocomplete.bindTo('bounds', map);
         // google.maps.event.addListener(autocomplete,'place_changed',function(){ alert(autocomplete.getPlace().geometry.location); });
$('#searchtext').keypress(function(event){
   var keycode = (event.keyCode ? event.keyCode : event.which);
   if(keycode == '13'){
      searchCity();
   }
});
var input1 = document.getElementById('pac-input');
var controldiv = document.getElementById('controldiv');
  var searchBox = new google.maps.places.SearchBox(input1);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(controldiv);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
console.log(places.length);
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
        console.log(place.name);
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
       marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      });
      markers.push(marker);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
        console.log(marker.getTitle());
    infowindow.setContent('<div style= "color:black">'+place.name+ '</div>');
    infowindow.open(map, this);
  });
    });

    map.fitBounds(bounds);
  });
myloc();
}
function myloc()
		  {
          if(navigator.geolocation) {
		            navigator.geolocation.getCurrentPosition(function(position) {
		               pos = new google.maps.LatLng(position.coords.latitude,
		                                               position.coords.longitude);


                       map.setZoom(17);
		              map.setCenter(pos);

		              var marker = new google.maps.Marker({
		              map:map,
		              position:pos});
		              console.log("gotlocation");

		            }, function() {
		            	 console.log("notgotlocation");
		              handleNoGeolocation(true);
		            });
		          } else {
		            // Browser doesn't support Geolocation
		            handleNoGeolocation(false);
		          }
		        }

		        function handleNoGeolocation(errorFlag) {
		          if (errorFlag) {
		            var content = 'Error: The Geolocation service failed.';
		          } else {
		            var content = 'Error: Your browser doesn\'t support geolocation.';
		          }

		          var options = {
		            map: map,
		            position: new google.maps.LatLng(60, 105),
		            content: content
		          };

		          var infowindow = new google.maps.InfoWindow(options);
		          map.setCenter(options.position);
      }




function searchCity() {
$("#searchpanel").panel("close");
	        var address = document.getElementById('searchtext').value;
	        geocoder.geocode( { 'address': address}, function(results, status) {
	          if (status == google.maps.GeocoderStatus.OK) {
	            map.setCenter(results[0].geometry.location);
map.setZoom(17);

/* var StreetViewPanoramaOptions = { visible:true, enableCloseButton:true , clickToGo:false };

street = new google.maps.StreetViewPanorama(document.getElementById('map_canvas'),StreetViewPanoramaOptions)
street.setVisible(true);
street.setPosition(results[0].geometry.location); */
	            var marker = new google.maps.Marker({
	                map: map,

	                position: results[0].geometry.location
	            });
	           var infowindow = new google.maps.InfoWindow({


						                content: '<div style ="color:black " >'+ address+'</div>'		              });
		              infowindow.open(map,marker);
	          } else {
	            alert('Please Enter A valid name of Region,city,district,country etc  ' + status);
	          }
	        });
	      }

	      function traffic(){
	      $("#menupanel").panel("close");


	      	if(!settraffic){
  trafficLayer.setMap(map);
  settraffic = true;
  }
  else
  {
  trafficLayer.setMap();
  settraffic = false;
  }

	      }

	      function street(){
	      	$("#menupanel").panel("close");
	      	map.setMapTypeId( google.maps.MapTypeId.ROADMAP );
	      }
	      function panaromio(){
	      	$("#menupanel").panel("close");

 if(!setpanaramio){
  panaramioLayer.setMap(map);
  setpanaramio = true;
  }
  else
  {
  panaramioLayer.setMap();
  setpanaramio = false;
  }
 }

function transit(){
	$("#menupanel").panel("close");
	if(!settransit){
  transitLayer.setMap(map);
  settransit = true;
  }
  else
  {
  transitLayer.setMap();
  settransit = false;
  }

}
function toggleview() {

	if(!direction)
	{

	 document.getElementById("directions-panel").style.display = "block";
	 document.getElementById('mapi').style.display="none";
	 direction = true;
	}
	 else
	 {
	 document.getElementById("directions-panel").style.display = "none";
	 document.getElementById("mapi").style.display = "block";
	 direction = false;
	}
}





function initialise() {


	directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(41.850033, -87.6500523)
  };
   map = new google.maps.Map(document.getElementById('mapi'),mapOptions);
  var start = document.getElementById('start');
        var autocomplete = new google.maps.places.Autocomplete(start);
         autocomplete.bindTo('bounds', map);

         var end = document.getElementById('end');
        var autocomplete = new google.maps.places.Autocomplete(end);
         autocomplete.bindTo('bounds', map);




  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));




  myloc();
}
function calcRoute() {
  var start = document.getElementById('start').value;
  if (start == "") {
  	start = pos;
  };
  var end = document.getElementById('end').value;
  var mode = "DRIVING";
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode [mode]
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

	function onInvokeSuccess(){

	}

	function onInvokeError(error){
		alert("the error 0is :-" , error);

	}
	    function hybrid(){
	    	$("#menupanel").panel("close");
	map.setMapTypeId( google.maps.MapTypeId.HYBRID );
	    }



function lat () {

	var str,str1,str2,str3,str4,str5,str6, str7;

	options = { frequency:1000 , enableHighaccuracy:true };
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
	function onSuccess (position) {
		var pos = position;
	var head = pos.coords.heading;
	var direction;

	if(head>350 && head< 10)
	{
		direction ="N";
	}
	else if(head>10 && head<80)
	{
		direction ="NE";
	}
	else if(head>80 && head<100){
		direction ="E";
	}
	else if(head>100 && head<170) {
		direction = "SE";
	}
	else if(head>170 && head<190){
		direction ="S";
	}
	else if(head>190 && head<260){
		direction = "SW";
	}
	else if(head>260 && head<280){
		direction ="W";
	}
	else if(head>280 && head<350){
		direction ="NW";
	}
	  var la = parseInt(pos.coords.latitude * 1000);
	  la = la/1000;
	  str = 'Latitude: ' + la+ ' deg';
	  var lo = parseInt(pos.coords.longitude * 1000);
	  lo = lo/1000;
	  str1= 'Longitude: ' + lo +' deg';




	  str2 = 'Altitude: ' + pos.coords.altitude +" metres";
	  str3 =  'Accuracy: ' + pos.coords.accuracy ;
	 str4 =    'Altitude Accuracy: ' + pos.coords.altitudeAccuracy;
	   str5 = 'Heading: ' + pos.coords.heading + direction;

	    str6 = 'Speed: ' + parseInt(pos.coords.speed) +"m/s";



	   document.getElementById("dashboard").innerHTML = str +"<br>" + str1 + "<br>" + str2 +"<br>" + str3 + "<br>" + str4 +"<br>"+str5 +"<br>"+str6 +"<br>"  ;

	}



  function onError (error) {

  }
}

function cycling(){
	$("#menupanel").panel("close");
	if(!setcycle){
  cycleLayer.setMap(map);
  setcycle = true;
  }
  else
  {
  cycleLayer.setMap();
  setcycle = false;
  }

}






