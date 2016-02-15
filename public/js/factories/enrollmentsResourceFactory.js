pitchup.factory('EnrollmentsResource',
['$http', '$q',
function($http, $q) {
  var enrollmentsResource = {};

  enrollmentsResource.postEnrollments = function(number_players, id) {
    return $http.post('/teams/' + id + '/enrollments', {
      number_players: number_players
    });
  };

  return enrollmentsResource;
}]);
