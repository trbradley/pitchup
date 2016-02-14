pitchup.controller('GeoLocationController',
  ['$geolocation', '$scope', 'AppLoading', 'uiGmapGoogleMapApi', 'uiGmapIsReady',
  function ($geolocation, $scope, AppLoading, uiGmapGoogleMapApi, uiGmapIsReady){
    var self = this;
    var scope = $scope;

    $geolocation.getCurrentPosition().then(function(location) {
      AppLoading.loading();
      self.location = location
    })
    .then(function(){return uiGmapGoogleMapApi;})
    .then(function(maps){

      // default Makers Academy coords
      self.map = {
        center : {
          latitude: 51.517339,
  				longitude: -0.073337
        },
        zoom : 13
      };
      self.map.center = {
        latitude: self.location.coords.latitude,
        longitude: self.location.coords.longitude
      }
    });

    uiGmapIsReady.promise()
    .then(function(instances) {
      AppLoading.ready();
    });

}]);
