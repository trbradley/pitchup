describe('NewSessionController', function() {
  var ctrl;
  var scope;
  var windowMock;
  var UserAuthMock;

  beforeEach(function() {
    windowMock = { location : { href : jasmine.createSpy() } };
    UserAuthMock = jasmine.createSpyObj(
      'UserAuth', ['login']
    );

    module('Pitchup', {
      UserAuth: UserAuthMock,
      $window: windowMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    UserAuthMock.login.and.returnValue($q.when({}));
    ctrl = $controller('NewSessionController');
    scope = $rootScope;
  }));

  describe('#login', function() {
    it('redirects the user to teams list on successful login', function() {
      ctrl.login();
      scope.$digest();
      expect(windowMock.location.href).toEqual('/#/teams');
    });
  });

  describe('#bad login', function() {

    beforeEach(function() {
      inject(function($q) {
        UserAuthMock.login.and.returnValue($q.reject({}));
      });
    });
    it('throws an error when login fails', function() {
      ctrl.login();
      scope.$digest();
      expect(ctrl.errorMessage).toEqual('Invalid username and/or password');
    });
  });
});