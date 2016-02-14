pitchup.factory('AppLoading',
['$rootScope',
function($rootScope) {
  var appLoading = {};
  var timer;

  appLoading.loading = function() {
    clearTimeout(timer);
    $rootScope.status = 'loading';
    if(!$rootScope.$$phase) $rootScope.$apply();
  }
  appLoading.ready = function(delay) {
    function ready() {
      $rootScope.status = 'ready';
      if(!$rootScope.$$phase) $rootScope.$apply();
    }
    clearTimeout(timer);
    delay = delay == null ? 500 : false;
    if(delay) {
      timer = setTimeout(ready, delay);
    }
    else {
      ready();
    }
  }

  return appLoading;
}]);
