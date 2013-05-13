(function() {

    var latitude = 0;
    var longitude = 0;

    function initialize() {
        navigator.geolocation.getCurrentPosition(storeVals);
    }

    function storeVals(values) {
        latitude  = values.coords.latitude;
        longitude = values.coords.longitude;
        createMapOptions();
        buildMap();
    }

    function createMapOptions() {
        var mapOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            keyboardShortcuts: true
        };
        return mapOptions;
    }

    function buildMap() {
        map = new google.maps.Map(
            document.getElementById("map-canvas"), createMapOptions()
        );
        placeMarker(map);
    }

    function placeMarker(mapForUse) {
        var markerOptions = {
            animation: 'DROP',
            position: new google.maps.LatLng(latitude, longitude),
            map: mapForUse
        }

        var marker = new google.maps.Marker(markerOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


 })();