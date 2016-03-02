var directionsService;
var directionsDisplay;
var mapp,map;
var route1,start1,end1;
var pos;
	
 function mylocation(){
  		map.locate({setView: true, maxZoom: 16,timeout:20000,enableHighAccuracy:true,maximumAge:60000});
  		}
function toggleview()
{
if(document.querySelector(".leaflet-routing-container-show") != null)
{
route1.hide();

}
else
{

route1.show()
}
}
function onLocationFound(e) {
         			var radius = e.accuracy / 2;
pos = e.latlng;
         			L.marker(e.latlng).addTo(map)
         				.bindPopup("<span style='color:black'>You are within " + radius + " meters from this point </span>").openPopup();

         			L.circle(e.latlng, radius).addTo(map);
         		}

         		function onLocationError(e) {
         			mylocation();
         		}


function initialise() {
	

  var start = document.getElementById('start');
         start1 = new google.maps.places.Autocomplete(start);


         var end = document.getElementById('end');
         end1 = new google.maps.places.Autocomplete(end);


         map = L.map('map');
map.on('locationfound', onLocationFound);
        		map.on('locationerror', onLocationError);
         		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
         			maxZoom: 18,
         			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
         				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
         				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
         			id: 'mapbox.streets'
         		}).addTo(map);






  
  var locate = document.getElementById('locate');

  
  var back = document.getElementById('menu');


  mylocation();
}
function calcRoute() {
  var start = document.getElementById('start').value;

  var end = document.getElementById('end').value;
   if(route1 != undefined)
   {
   map.removeControl(route1);
   }
   if(start == "" && pos != undefined)
   {
    route1 = L.Routing.control({
       waypoints: [
         pos,
         L.latLng(end1.getPlace().geometry.location.lat(),end1.getPlace().geometry.location.lng())
       ]
     });

   }
   else{
  route1 = L.Routing.control({
    waypoints: [
      L.latLng(start1.getPlace().geometry.location.lat(),start1.getPlace().geometry.location.lng()),
      L.latLng(end1.getPlace().geometry.location.lat(),end1.getPlace().geometry.location.lng())
    ]
  });
}
     map.addControl(route1)

}