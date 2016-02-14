pitchup.controller('NavbarController',
['UserAuth', '$location', '$route',
function(UserAuth, $location, $route) {
  var self = this;

  self.logout = function() {
    UserAuth.logout()
    .then(function(data) {
      $location.path('/');
      $route.reload();
    })
    .catch(function(data) {
    });
  };
}]);
