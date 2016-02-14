pitchup.controller('NewTeamController',
['TeamsResource', '$location', '$route',
function(TeamsResource, $location, $route) {
  var self = this;

  self.createNewTeam = function() {
    TeamsResource.postTeams(
      self.teamName,
      self.capacity,
      self.numberPlayers
    )
    .then(function(response) {
      $location.path('/teams');
      $route.reload();
    })
    .catch(function(response) {
    });
  };
}]);
