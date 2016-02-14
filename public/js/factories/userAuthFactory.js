pitchup.factory('UserAuth', ['$q', '$timeout', '$http', function($q, $timeout, $http) {

  function getCurrentUser() {
      var deferred = $q.defer();

      $http.get('/sessions')
        .success(function(data, status) {
          if(status === 200 && data){
            deferred.resolve(data.user);
          } else {
            deferred.reject(data);
          }
        })
        .error(function(data) {
          deferred.reject(data);
        });
      return deferred.promise;
  }

  function login(username, password) {
    var deferred = $q.defer();

    $http.post('/sessions', {username: username, password: password})
      .success(function(data, status) {
        if(status === 200 && data){
          deferred.resolve(data);
        } else {
          deferred.reject(data);
        }
      })
      .error(function(data) {
        deferred.reject();
      });

      return  deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();

    $http.delete('/sessions')
      .success(function(data, status) {
        if(status === 200 && data){
          deferred.resolve(data);
        } else {
          deferred.reject(data);
        }
      })
      .error(function(data) {
        deferred.reject(data);
      });

    return deferred.promise;
  }

  function register(username, email, password) {
    var deferred = $q.defer();

    $http.post('/users', {username: username, email: email, password: password})
      .success(function(data, status) {
        if(status === 201 && data){
          deferred.resolve(data);
        } else {
          deferred.reject(data);
        }
      })
      .error(function(data) {
        deferred.reject(data);
      });

    return deferred.promise;
  }

  return ({
    getCurrentUser: getCurrentUser,
    login: login,
    logout: logout,
    register: register
  });
}]);
