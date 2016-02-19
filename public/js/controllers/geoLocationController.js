pitchup.controller('GeoLocationController',
['$geolocation', 'AppLoading', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'GeoLocation', '$location', '$route', '$rootScope',
function ($geolocation, AppLoading, uiGmapGoogleMapApi, uiGmapIsReady, GeoLocation, $location, $route, $rootScope){
  var self = this;

  $rootScope.topScope = $rootScope;
  $rootScope.$on('$routeChangeStart', function() {
    if (self.maps) {
      GeoLocation.loadMarkers(self.coords, self.maps)
      .then(function(markers){
        self.markers = markers;
      })
    }
  });

  $geolocation.getCurrentPosition()
  .then(function(location) {
    AppLoading.loading();
    self.coords = location.coords;
  })
  .then(function(){return uiGmapGoogleMapApi;})
  .then(function(maps){

    self.maps = maps;
    self.markers = [];
    self.map = GeoLocation.generateMap(self.coords);

    GeoLocation.loadMarkers(self.coords, self.maps)
    .then(function(markers){
      self.markers = markers;
    })

    self.window = {
      marker: {},
      show: false,
      closeClick: function() {
          this.show = false;
      },
      templateUrl: 'public/map_helpers/template/team_marker.html',
    }

    self.onClick = function(marker, eventName, model) {
      if(model.id === 0) { return; }
      if(self.window.model != model) { self.window.show = true; }
      else { self.window.show = !self.window.show; }
      self.window.model = model;
      self.window.params = model;
      self.window.options = {
        pixelOffset: new maps.Size(0, -70)
      }
      $location.path('/');
      $route.reload();
    };

  });

  uiGmapIsReady.promise()
  .then(function(instances) {
    AppLoading.ready();
  });
}]);
