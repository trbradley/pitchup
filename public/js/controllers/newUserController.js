pitchup.controller('NewUserController',
['UserAuth', '$location', '$route',
function (UserAuth, $location, $route) {
  var self = this;
  self.viewClass = 'new-user';

  self.register = function() {
    UserAuth.register(
      self.username,
      self.email,
      self.password
    )
    .then(function(data) {
      $location.path('/users/' + data.user_id);
      $route.reload();
    })
    .catch(function(data) {
    });
  };
}]);
