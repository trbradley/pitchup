pitchup.controller('AppController',
['$rootScope', 'UserAuth',
function ($rootScope, UserAuth){
  var self = this;
  self.currentUser = undefined;
  $rootScope.range = function(n) { return new Array(n); };

  $rootScope.topScope = $rootScope;
  $rootScope.$on('$routeChangeStart', function() {
    UserAuth.getCurrentUser()
    .then(function(user) {
      self.currentUser = user;
    });
  });
}]);
