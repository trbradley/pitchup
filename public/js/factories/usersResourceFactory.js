pitchup.factory('UsersResource',
['$http',
function($http) {
  var userResource = {};

  userResource.getUser = function(id) {
    return $http.get('/users/' + id);
  }

  return userResource;
}]);
