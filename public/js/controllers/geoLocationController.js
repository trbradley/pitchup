pitchup.controller('GeoLocationController',
['$geolocation', 'AppLoading', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'TeamsResource',
function ($geolocation, AppLoading, uiGmapGoogleMapApi, uiGmapIsReady, TeamsResource){
  var self = this;

  $geolocation.getCurrentPosition()
  .then(function(location) {
    AppLoading.loading();
    self.location = location
  })
  .then(function(){return uiGmapGoogleMapApi;})
  .then(function(maps){
    self.map = {
      center : {
        latitude: 51.517339,   // default Makers Academy coords
				longitude: -0.073337
      },
      zoom : 12
    };

    self.map.center = {
      latitude: self.location.coords.latitude,
      longitude: self.location.coords.longitude
    };

    self.markers = [
      {
        latitude: self.location.coords.latitude,
        longitude: self.location.coords.longitude,
        title: 'Your Position',
        id: 0,
        icon: 'public/images/pitchup_pin_u.svg'
      }
    ];
    TeamsResource.getTeams()
    .then(function(response) {
      response.data.teams.forEach(function(team) {
        var geocoder = new maps.Geocoder();
        geocoder.geocode( {'address': team.pitch_postcode}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var coords = results[0].geometry.location;
            self.markers.push({
              latitude: coords.lat(),
              longitude: coords.lng(),
              title: team.name,
              id: team.id,
              icon: 'public/images/pitchup_pin.svg'
            });
          }
        });
      });
    });
  });

  uiGmapIsReady.promise()
  .then(function(instances) {
    AppLoading.ready();
  });
}]);
