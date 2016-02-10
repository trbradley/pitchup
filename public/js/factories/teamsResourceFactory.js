pitchup.factory('TeamsResource', ['$http', '$q', function($http, $q) {
  var teamsResource = {};

  teamsResource.getTeam = function(id) {
    return $http({
      url: ('/teams/' + id),
      method: 'GET'
    });
  };

  teamsResource.getTeams = function() {
    return $http({
      url: '/teams',
      method: 'GET'
    });
  };

  // teamsResource.getEnrollments = function(id) {
  //   return $http({
  //     url: '/teams/' + id + '/enrollments/new',
  //     method: 'GET'
  //   });
  // };

  teamsResource.postTeams = function(teamName, capacity, numberPlayers) {
    var deferred = $q.defer();
    $http.post('/teams', {teamName: teamName, capcity: capacity, numberPlayers: numberPlayers}, { method: 'POST'})
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
