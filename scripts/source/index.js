var createdMap = {};
var Directions = new google.maps.DirectionsService();
var currentRoute      = [];

function initialize() {
  navigator.geolocation.getCurrentPosition(abstractLatLong);
}

function abstractLatLong(data) {
  var latitude  = data.coords.latitude;
  var longitude = data.coords.longitude;
  var latLngObj = new google.maps.LatLng( latitude, longitude );
  newMap(latLngObj);
}

function provideMapOptions( latLngObj ) {
  var mapOptions = {
      center: latLngObj,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true
  };
  return mapOptions;
}

function newMap(latLngObj) {
  createdMap = new google.maps.Map( document.getElementById( "map-canvas" ), 
    provideMapOptions(latLngObj) );
  createMapEvents( createdMap );
}

function createMapEvents( map ) {
  google.maps.event.addDomListener( map, 'dblclick', function(latLngObj) {
    createMarkerOptions(latLngObj);
  });
}

function createMarkerOptions( latLngObj ) {
  var latitude = latLngObj.latLng.kb;
  var longitude = latLngObj.latLng.lb;
  var gmapsLatLong = new google.maps.LatLng( latitude, longitude );

  var markerOptions = {
    position: gmapsLatLong,
    map: createdMap
  }

  createMarker(markerOptions);

  // only construct route if this isn't the first point
  if ( currentRoute.length ) {
    constructRouteRequest(gmapsLatLong);
  }

  currentRoute.push(gmapsLatLong);
}

function createMarker( options ) {
  new google.maps.Marker( options );
}

function constructRouteRequest(destination) {
  
}

google.maps.event.addDomListener(window, 'load', initialize);