pitchup.controller('TeamController',
['TeamsResource', '$routeParams',
function(TeamsResource, $routeParams) {
  var self = this;
  self.id = $routeParams.id;

  self.init = function() {
    TeamsResource.getTeam(self.id)
    .then(function(response) {
      self.team = response.data.team;
    })
    .catch(function(response) {
    });
  };

  self.init();
}]);
