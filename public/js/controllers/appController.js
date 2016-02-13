pitchup.controller('AppController',
  ['$geolocation', '$scope', '$rootScope', 'AppLoading',
  function ($geolocation, $scope, $rootScope, AppLoading){
    var self = this
    $scope.$geolocation = $geolocation

    // basic usage
    $geolocation.getCurrentPosition().then(function(location) {
      $scope.location = location
    });

    // regular updates
    // $geolocation.watchPosition({
    //   timeout: 60000,
    //   maximumAge: 2,
    //   enableHighAccuracy: true
    // });
    // $scope.coords = $geolocation.position.coords; // this is regularly updated
    // $scope.error = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs


    $rootScope.topScope = $rootScope;
    $rootScope.$on('$routeChangeStart', function() {
      AppLoading.loading();
    });

  }]);
