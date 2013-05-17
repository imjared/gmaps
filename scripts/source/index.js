var Gmaps = window.Gmaps = {};
Gmaps.createdMap         = {};
Gmaps.currentRoute       = [];
Gmaps.Directions         = new google.maps.DirectionsService();
Gmaps.distanceIndicator  = document.getElementById('calc-distance');
Gmaps.totalDistance      = 0;

function initialize() {
  navigator.geolocation.getCurrentPosition( abstractLatLong );
}

function abstractLatLong( data ) {
  var latitude  = data.coords.latitude;
  var longitude = data.coords.longitude;
  var latLngObj = new google.maps.LatLng( latitude, longitude );
  newMap( latLngObj );
}

function provideMapOptions( latLng ) {
  var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true,
      draggableCursor: 'crosshair'
  };
  return mapOptions;
}

function newMap( latLng ) {
  Gmaps.createdMap = new google.maps.Map( document.getElementById( 'map-canvas' ),
    provideMapOptions(latLng) );
  createMapEvents( Gmaps.createdMap );
}

function createMapEvents( map ) {
  google.maps.event.addDomListener( map, 'click', function( response ) {

    var latLng = response.latLng;
    Gmaps.currentRoute.push( latLng );

    // only construct route if this isn't the first point
    if ( Gmaps.currentRoute.length > 1 ) {
      constructRouteRequest( latLng );
    }

    // recenter the map on click
    map.panTo( latLng );

  });
}

function createMarkerOptions( latLng ) {
  var markerOptions = {
    position: latLng,
    map: createdMap
  }
  createMarker( markerOptions );
}

function createMarker( options ) {
  new google.maps.Marker( options );
}

function constructRouteRequest( destination ) {
  var previousPoint = Gmaps.currentRoute[Gmaps.currentRoute.length - 1];
  var newPoint = destination;
  var directionsRequest = {
    avoidHighways: true,
    travelMode: google.maps.TravelMode.WALKING,
    origin: previousPoint,
    destination: newPoint
  }
  Gmaps.Directions.route( directionsRequest, function( result, status ) {
    var route = result.routes[0];
    drawRoute( route );
  });
}

function drawRoute( route ) {
  var lineOptions = {
      clickable: false,
      map: Gmaps.createdMap,
      strokeOpacity: 1,
      strokeWeight: 4,
      strokeColor: 'cc2644',
      path: route.overview_path
  };
  console.log( lineOptions );
  new google.maps.Polyline( lineOptions );
  recordDistance( route.legs[0].distance );
}

function recordDistance( distance ) {
  // distance provides milage for steps or metric value
  var metricValue = distance.value;
  Gmaps.totalDistance += metricValue;
  displayDistance();
}

function displayDistance() {
  var miles = convertMetersToMiles( Gmaps.totalDistance );
  Gmaps.distanceIndicator.textContent = miles.toFixed(2) + 'mi';
}

google.maps.event.addDomListener( window, 'load', initialize );
