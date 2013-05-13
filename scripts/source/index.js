var createdMap = {};

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
  google.maps.event.addDomListener( map, 'dblclick', createMarkerOptions );
}

function createMarkerOptions( latLngObj ) {
  var latitude = latLngObj.latLng.kb;
  var longitude = latLngObj.latLng.lb;

  var markerOptions = {
    position: new google.maps.LatLng( latitude, longitude ),
    map: createdMap
  }
  createMarker(markerOptions);
}

function createMarker(options) {
  new google.maps.Marker( options )
}

function clogger(e) {
  console.log(e.latLng);
}

google.maps.event.addDomListener(window, 'load', initialize);