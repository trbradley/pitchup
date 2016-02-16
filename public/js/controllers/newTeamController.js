pitchup.controller('NewTeamController',
['TeamsResource', '$location', '$route', '$filter',
function(TeamsResource, $location, $route, $filter) {
  var self = this;

  self.createNewTeam = function() {
    date_formatted = $filter('date')(self.date, 'yyyy-MM-dd');
    time_formatted = $filter('date')(self.time, 'HH:mm');
    TeamsResource.postTeams(
      self.teamName,
      self.capacity,
      self.numberPlayers,
      self.pitchPostcode,
      date_formatted,
      time_formatted
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
