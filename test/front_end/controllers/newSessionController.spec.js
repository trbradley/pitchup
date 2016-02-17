describe('NewSessionController', function() {
  var ctrl;
  var scope;
  var locationMock;
  var UserAuthMock;
  var location;
  var route;

  beforeEach(function() {
    locationMock = jasmine.createSpyObj(
      'locationMock', ['path']
    );
    routeMock = jasmine.createSpyObj(
      'routeMock', ['reload']
    );
    UserAuthMock = jasmine.createSpyObj(
      'UserAuth', ['login']
    );
    module('Pitchup', {
      UserAuth: UserAuthMock,
      $location: locationMock,
      $route: routeMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope, $location, $route) {
    UserAuthMock.login.and.returnValue($q.when({}));
    ctrl = $controller('NewSessionController');
    scope = $rootScope;
    location = $location;
    route = $route;
  }));

  describe('#login', function() {
    it('redirects the user to teams list on successful login', function() {
      ctrl.user_id = 2;
      ctrl.login();
      scope.$digest();
      expect(location.path).toHaveBeenCalledWith('/users/undefined');
    });
  });

    describe('#bad login', function() {
      beforeEach(function() {
        inject(function($q) {
          UserAuthMock.login.and.returnValue($q.reject({}));
        });
      });
      it('throws an error when loginfails', function() {
        ctrl.errorMessage = 'Something went wrong!';
        ctrl.login();
        scope.$digest();
        expect(ctrl.errorMessage).toEqual('Something went wrong!');
      });
    });
});
