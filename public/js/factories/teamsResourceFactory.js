pitchup.factory('TeamsResource',
['$http', '$q',
function($http, $q) {
  var teamsResource = {};

  teamsResource.getTeam = function(id) {
    return $http.get('/teams/' + id);
  };

  teamsResource.getTeams = function() {
    return $http.get('/teams');
  };

  teamsResource.postTeams = function(
    teamName, capacity, numberPlayers, pitchPostcode, date, time){
    return $http.post('/teams', {
      name: teamName,
      capacity: capacity,
      number_players: numberPlayers,
      pitch_postcode: pitchPostcode,
      time: date + time
    });
  };

  return teamsResource;
}]);
