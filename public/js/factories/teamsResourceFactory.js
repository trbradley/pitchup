pitchup.factory('TeamsResource', ['$resource', '$q', function($resource, $q) {
  var teamsResource = {};

  teamsResource.getTeam = function(id) {
    return $resource('/teams/' + id);
  };

  teamsResource.getTeams = function() {
    return $resource({
      url: '/teams',
      method: 'GET'
    });
  };

  teamsResource.postTeams = function(teamName, capacity, numberPlayers) {
    var deferred = $q.defer();
    $resource('/teams', {teamName: teamName, capcity: capacity, numberPlayers: numberPlayers}, { method: 'POST'})
      .success(function (data, status) {
        if(status === 200){
          deferred.resolve(data);
        } else {
          deferred.reject();
        }
      })
      .error(function (data) {
        deferred.reject();
      });
    return deferred.promise;
  };

  return teamsResource;
}]);
