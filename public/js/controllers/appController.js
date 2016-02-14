pitchup.controller('AppController',
  ['$geolocation', '$scope', '$rootScope', 'AppLoading', 'UserAuth',
  function ($geolocation, $scope, $rootScope, AppLoading, UserAuth){
    var self = this
    self.currentUser = undefined;

    $rootScope.topScope = $rootScope;
    $rootScope.$on('$routeChangeStart', function() {
      UserAuth.getCurrentUser().then(function(user) {
        self.currentUser = user;
      });;
    });

  }]);
