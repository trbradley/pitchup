pitchup.controller('NewSessionController',
  ['$location', '$route', 'UserAuth', 'AppLoading',
  function ($location, $route, UserAuth, AppLoading){
    var self = this;

    self.login = function () {
      UserAuth.login(self.username, self.password)
      .then(function(data) {
        $location.path('/#/users/' + data.user_id);
        $route.reload();
      })
      .catch(function(data) {
      });
    };

  }]);
