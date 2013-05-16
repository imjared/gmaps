var createdMap        = {};
var currentRoute      = [];
var Directions        = new google.maps.DirectionsService();
var distanceIndicator = document.getElementById('calc-distance');
var totalDistance     = 0;

function initialize() {
  navigator.geolocation.getCurrentPosition( abstractLatLong );
}

function abstractLatLong( data ) {
  var latitude  = data.coords.latitude;
  var longitude = data.coords.longitude;
  var latLngObj = new google.maps.LatLng( latitude, longitude );
  newMap( latLngObj );
}

function provideMapOptions( latLngObj ) {
  var mapOptions = {
      center: latLngObj,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true,
      draggableCursor: 'crosshair'
  };
  return mapOptions;
}

function newMap( latLngObj ) {
  createdMap = new google.maps.Map( document.getElementById( 'map-canvas' ),
    provideMapOptions(latLngObj) );
  createMapEvents( createdMap );
}

function createMapEvents( map ) {
  google.maps.event.addDomListener( map, 'click', function( response ) {
    createMarkerOptions( response.latLng );
  });
}

function createMarkerOptions( latLng ) {

  var markerOptions = {
    position: latLng,
    map: createdMap
  }

  // createMarker( markerOptions );

  // only construct route if this isn't the first point
  if ( currentRoute.length ) {
    constructRouteRequest( latLng );
  }

  currentRoute.push( latLng );
}

function createMarker( options ) {
  new google.maps.Marker( options );
}

function constructRouteRequest( destination ) {
  var previousPoint = currentRoute[currentRoute.length - 1];
  var newPoint = destination;
  var directionsRequest = {
    avoidHighways: true,
    travelMode: google.maps.TravelMode.WALKING,
    origin: previousPoint,
    destination: newPoint
  }
  Directions.route( directionsRequest, function( result, status ) {
    var route = result.routes[0];
    drawRoute( route );
  });
}

function drawRoute( route ) {
  var lineOptions = {
      clickable: false,
      map: createdMap,
      strokeOpacity: 1,
      strokeWeight: 4,
      strokeColor: 'cc2644',
      path: route.overview_path
  };
  new google.maps.Polyline( lineOptions );
  addDistance( route.legs[0].distance );
}

function addDistance( distance ) {
  var metricValue = distance.value;
  distanceIndicator.textContent = convertMetersToMiles( metricValue ) + 'mi';
}

function convertMetersToMiles( meters ) {
  var miles = 0.000621371 * meters;
  return miles;
}

google.maps.event.addDomListener( window, 'load', initialize );
