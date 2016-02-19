pitchup.factory('GeoLocation',
['uiGmapGoogleMapApi', '$q', 'TeamsResource',
function(uiGmapGoogleMapApi, $q, TeamsResource) {
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
      icon: args['iconUrl'],
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

  geoLocation.loadMarkers = function(my_coords, maps) {
    var deferred = $q.defer();

    var markers = [geoLocation.generateMarker({
      id: 0,
      name: 'My Position',
      coords: my_coords,
      iconUrl: 'public/images/pitchup_pin_u.svg'
    })];
    TeamsResource.getTeams()
    .then(function(response) {
      response.data.teams.forEach(function(team, idx, arr) {
        geoLocation.getCoordsFromPostcode(team.pitch_postcode, maps)
        .then(function(coords){
          var team_marker = geoLocation.generateMarker({
            id: team.id,
            name: team.name,
            needed: team.capacity - team.number_players,
            time: team.time,
            coords: coords,
            iconUrl: 'public/images/pitchup_pin.svg'
          });
          markers.push(team_marker);
          if(idx === arr.length - 1) { deferred.resolve(markers); }
        });
      });
    });
    return deferred.promise;
  }

  geoLocation.refreshMarkers = function() {
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
