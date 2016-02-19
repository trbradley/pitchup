pitchup.controller('UserController',
['UsersResource', '$routeParams',
function(UsersResource, $routeParams) {
  var self = this;
  self.viewClass = 'user';
  self.id = $routeParams.id;

  self.init = function() {
    UsersResource.getUser(self.id)
    .then(function(response) {
      self.user = response.data.user;
    })
    .catch(function(response) {
    });
  };

  self.init();
}]);
