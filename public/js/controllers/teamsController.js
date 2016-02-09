pitchup.controller('TeamsController', ['TeamsResource', function(TeamsResource) {
  var self = this;

  self.init = function() {
    TeamsResource.getTeams()
     .then(function(response) {
       self.teams = response.data;
     });
  };

  self.init();
}]);
