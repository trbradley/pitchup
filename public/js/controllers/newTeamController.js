pitchup.controller('NewTeamController', ['TeamsResource', '$window', function(TeamsResource, $window) {
  var self = this;

  self.createNewTeam = function() {
    TeamsResource.postTeams(self.name, self.capacity)
      .then(function() {
        $window.location.href = '/#/teams';
      });
  };
}]);
