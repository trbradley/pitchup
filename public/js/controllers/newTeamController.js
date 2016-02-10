pitchup.controller('NewTeamController', ['TeamsResource', '$window', function(TeamsResource, $window) {
  var self = this;

  self.createNewTeam = function() {
    TeamsResource.postTeams(self.teamName, self.capacity, self.numberPlayers)
      .then(function() {
        $window.location.href = '/#/teams';
      });
  };
}]);
