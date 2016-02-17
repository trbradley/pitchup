pitchup.factory('GeoLocation',
['uiGmapGoogleMapApi', '$q',
function(uiGmapGoogleMapApi, $q) {
  var geoLocation = {};

  geoLocation.getCoordsFromPostcode = function(postcode, maps) {
    var geocoder = new maps.Geocoder();
    var deferred = $q.defer();

    geocoder.geocode({'address': postcode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var coords = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        };
        deferred.resolve(coords);
      } else { deferred.reject(); }
    });

    return  deferred.promise;
  }

  geoLocation.generateMarker = function(args) {
    return {
      id: args['id'],
      name: args['name'],
      latitude: args['coords'].latitude,
      longitude: args['coords'].longitude,
      icon: args['icon_url'],
      needed: args['needed'],
      time: args['time']
    };
  }

  geoLocation.generateMap = function(coords) {
    return {
      center: {
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      zoom: 12
    };
  }

  return geoLocation;
}]);
