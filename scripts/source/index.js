var createdMap   = {};
var currentRoute = [];
var Directions   = new google.maps.DirectionsService();

function initialize() {
  navigator.geolocation.getCurrentPosition( abstractLatLong );
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
      zoom: 15,
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
  google.maps.event.addDomListener( map, 'click', function( latLngObj ) {
    createMarkerOptions( latLngObj );
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

  // createMarker( markerOptions );

  // only construct route if this isn't the first point
  if ( currentRoute.length ) {
    constructRouteRequest( gmapsLatLong );
  }

  currentRoute.push( gmapsLatLong );
}

function createMarker( options ) {
  new google.maps.Marker( options );
}

function constructRouteRequest( destination ) {
  var previousPoint = currentRoute[currentRoute.length - 1];
  var newPoint      = destination;
  var directionsRequest = {
    avoidHighways: true,
    travelMode: google.maps.TravelMode.WALKING,
    origin: previousPoint,
    destination: newPoint
  }
  Directions.route( directionsRequest, function( result, status ) {
    drawRoute();
  });
}

function drawRoute() {
  var lineOptions = {
      clickable: false,
      map: createdMap,
      strokeOpacity: 1,
      strokeWeight: 3,
      strokeColor: '00264c',
      path: currentRoute
  };
  new google.maps.Polyline( lineOptions );
}

google.maps.event.addDomListener( window, 'load', initialize );
