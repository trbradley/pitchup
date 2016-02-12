pitchup.controller('LogoutController', ['UserAuth', '$window', function(UserAuth, $window) {
  var self = this;

  self.logout = function() {
    UserAuth.logout()
      .then(function() {
        $window.location.href = '/#/teams';
      });
  };

}]);
