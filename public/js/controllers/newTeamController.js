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
  
}]);
