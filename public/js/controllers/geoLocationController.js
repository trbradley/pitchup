pitchup.controller('GeoLocationController',
['$geolocation', 'AppLoading', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'TeamsResource', 'GeoLocation',
function ($geolocation, AppLoading, uiGmapGoogleMapApi, uiGmapIsReady, TeamsResource, GeoLocation){
  var self = this;

  $geolocation.getCurrentPosition()
  .then(function(location) {
    AppLoading.loading();
    self.coords = location.coords;
  })
  .then(function(){return uiGmapGoogleMapApi;})
  .then(function(maps){

    self.map = GeoLocation.generateMap(self.coords);

    self.onClick = function(marker, eventName, model) {
      model.show = !model.show;
    };

    var my_position_marker = GeoLocation.generateMarker({
      id: 0,
      name: 'My Position',
      coords: self.coords,
      icon_url: 'public/images/pitchup_pin_u.svg'
    });

    self.markers = [my_position_marker];

    TeamsResource.getTeams()
    .then(function(response) {
      response.data.teams.forEach(function(team) {
        GeoLocation.getCoordsFromPostcode(team.pitch_postcode, maps)
        .then(function(coords){
          var team_marker = GeoLocation.generateMarker({
            id: team.id,
            name: team.name,
            needed: team.capacity - team.number_players,
            time: team.time,
            coords: coords,
            icon_url: 'public/images/pitchup_pin.svg'
          });
          self.markers.push(team_marker);
        });
      });
    });
  });

  uiGmapIsReady.promise()
  .then(function(instances) {
    AppLoading.ready();
  });
}]);
