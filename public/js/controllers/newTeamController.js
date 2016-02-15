pitchup.controller('NewTeamController',
['TeamsResource', '$location', '$route',
function(TeamsResource, $location, $route) {
  var self = this;

  self.createNewTeam = function() {
    TeamsResource.postTeams(
      self.teamName,
      self.capacity,
      self.numberPlayers,
      self.pitchPostcode
    )
    .then(function(response) {
      $location.path('/teams');
      $route.reload();
    })
    .catch(function(response) {
    });
  };

  self.formatPostcode = function() {
    var postcode = self.pitchPostcode.toUpperCase();
    index = postcode.length - 3;
    if (postcode.charAt(index - 1) == " ") return;
    self.pitchPostcode = postcode.substr(0, index) + ' ' + postcode.substr(index);
  };
}]);
