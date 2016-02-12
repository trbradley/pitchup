describe('NewUserController', function() {
  var ctrl;
  var scope;
  var windowMock;
  var UserAuthMock;

  beforeEach(function() {
    windowMock = { location : { href : jasmine.createSpy() } };
    UserAuthMock = jasmine.createSpyObj(
      'UserAuth', ['register']
    );

    module('Pitchup', {
      UserAuth: UserAuthMock,
      $window: windowMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    UserAuthMock.register.and.returnValue($q.when({}));
    ctrl = $controller('NewUserController');
    scope = $rootScope;
  }));

  describe('#register', function() {
    it('redirects the user to teams list on successful register', function() {
      ctrl.register();
      scope.$digest();
      expect(windowMock.location.href).toEqual('/#/teams');
    });
  });

  describe('#bad register', function() {
    beforeEach(function() {
      inject(function($q) {
        UserAuthMock.register.and.returnValue($q.reject({}));
      });
    });
    it('throws an error when register fails', function() {
      ctrl.register();
      scope.$digest();
      expect(ctrl.errorMessage).toEqual('Something went wrong!');
    });
  });
});
