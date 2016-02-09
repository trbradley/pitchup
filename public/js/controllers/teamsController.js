pitchup.controller('TeamsController', ['TeamsResource', 'UserAuth', function(TeamsResource, UserAuth) {
  var self = this;

  self.init = function() {
    TeamsResource.getTeams()
     .then(function(response) {
       self.teams = response.data;
     });
  };

  self.isLoggedIn = function() {
    return UserAuth.isLoggedIn();
  };

  self.init();
}]);
