pitchup.controller('NewSessionController',
['$location', '$route', 'UserAuth',
function ($location, $route, UserAuth){
  var self = this;
  self.viewClass = 'new-session';

  self.login = function () {
    UserAuth.login(self.username, self.password)
    .then(function(data) {
      $location.path('/users/' + data.user_id);
      $route.reload();
    })
    .catch(function(data) {
    });
  };
}]);
