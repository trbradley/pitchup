angular.factory('UserAuth', ['$q', '$timeout', '$http', function($q, $timeout, $http) {
  var user = null;

  function isLoggedIn() {
    if(user) {
      return true;
    } else {
      return false;
    }
  }

  function login(email, password) {
    var deferred = $q.defer();

    $http.post('/sessions', {username: username, email: email, password: password})
      .success(function (data, status) {
        if(status === 200 && data.result){
          user = true;
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      .error(function (data) {
        user = false;
        deferred.reject();
      });

      return  deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();

    $http.delete('/sessions')
      .success(function (data) {
        user = false;
        deferred.resolve();
      })
      .error(function (data) {
        user = false;
        deferred.reject();
      });

    return deferred.promise;
  }

  function register(email, password) {
    var deferred = $q.defer();

    $http.post('/users', {username: username, email: email, password: password})
      .success(function (data, status) {
        if(status === 200 && data.result){
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      .error(function (data) {
        deferred.reject();
      });

    return deferred.promise;
  }

  return ({
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    register: register
  });
}]);
