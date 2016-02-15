pitchup.controller('GeoLocationController',
['$geolocation', 'AppLoading', 'uiGmapGoogleMapApi', 'uiGmapIsReady',
function ($geolocation, AppLoading, uiGmapGoogleMapApi, uiGmapIsReady){
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
      zoom : 13
    };

    self.map.center = {
      latitude: self.location.coords.latitude,
      longitude: self.location.coords.longitude
    };

    self.icon = 'public/images/pitchup_pin.svg';

    self.markers = [
      {
        latitude: self.location.coords.latitude,
        longitude: self.location.coords.longitude,
        title: 'your position',
        id: 1,
        icon: 'public/images/pitchup_pin_u.svg'
      }
    ];
  });

  uiGmapIsReady.promise()
  .then(function(instances) {
    AppLoading.ready();
  });
}]);
