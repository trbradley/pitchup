pitchup.controller('LogoutController', ['UserAuth', '$window', function(UserAuth, $window) {
  var self = this;

  self.logout = function() {

    console.log(UserAuth.isLoggedIn());
    UserAuth.logout()
      .then(function() {
        $window.location.href = '/#/teams';
      });
  };

}]);
