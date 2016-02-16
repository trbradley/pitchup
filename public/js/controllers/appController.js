pitchup.controller('AppController',
['$rootScope', 'UserAuth',
function ($rootScope, UserAuth){
  var self = this;
  self.currentUser = undefined;

  $rootScope.topScope = $rootScope;
  $rootScope.$on('$routeChangeStart', function() {
    UserAuth.getCurrentUser()
    .then(function(user) {
      self.currentUser = user;
    });
  });
}]);
