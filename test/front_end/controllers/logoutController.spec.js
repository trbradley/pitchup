describe('LogoutController', function() {
  var ctrl;
  var scope;
  var windowMock;
  var UserAuthMock;

  beforeEach(function() {
    windowMock = { location : { href : jasmine.createSpy() } };
    UserAuthMock = jasmine.createSpyObj(
      'UserAuth', ['logout']
    );

    module('Pitchup', {
      UserAuth: UserAuthMock,
      $window: windowMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    UserAuthMock.logout.and.returnValue($q.when({}));
    ctrl = $controller('LogoutController');
    scope = $rootScope;
  }));

  describe('#logout', function() {
    it('redirects the user to teams list on successful log out', function() {
      ctrl.logout();
      scope.$digest();
      expect(windowMock.location.href).toEqual('/#/teams');
    });
  });
});
