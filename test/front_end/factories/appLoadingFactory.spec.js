describe('AppLoading', function() {
  var ctrl;
  var httpBackend;
  var scope;
  var route;
  var appLoading;
  var timer;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(AppLoading, $rootScope, $httpBackend) {
    appLoading = AppLoading;
    scope = $rootScope;
    httpBackend = $httpBackend;
  }));

  describe('#loading', function() {
    it('returns status as "loading"', function() {
      appLoading.loading();
      expect(scope.status).toEqual('loading');
    });
  });
  describe('#ready', function() {
    it('returns status as "ready"', function() {
      appLoading.ready(500);
      expect(scope.status).toEqual('ready');
    });
    it('delays if timeout is "null"', function() {
      timer = 'setTimeout(ready, delay)';
      appLoading.ready(null);
      expect(timer).toEqual('setTimeout(ready, delay)');
    });
  });

});
