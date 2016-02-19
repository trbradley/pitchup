pitchup.factory('UsersResource',
['$http',
function($http) {
  var usersResource = {};

  usersResource.getUser = function(id) {
    return $http.get('/users/' + id);
  };

  return usersResource;
}]);
