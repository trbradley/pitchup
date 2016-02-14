pitchup.controller('NewUserController',
  ['UserAuth', '$location', '$route', 'AppLoading',
  function (UserAuth, $location, $route, AppLoading) {
    var self = this;

    self.register = function() {
      UserAuth.register(
          self.username,
          self.email,
          self.password
        )
        .then(function(data) {
          $location.path('/#/users/' + data.user_id);
          $route.reload();
        })
        .catch(function(data) {
        });
    };

  }]);
