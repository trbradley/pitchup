describe('NavbarController', function() {
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
      'UserAuth', ['logout']
    );

    module('Pitchup', {
      UserAuth: UserAuthMock,
      $location: locationMock,
      $route: routeMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope, $location, $route) {
    UserAuthMock.logout.and.returnValue($q.when({}));
    ctrl = $controller('NavbarController');
    scope = $rootScope;
    location = $location;
    route = $route;
  }));

  describe('#logout', function() {
    it('redirects the user to teams list on successful log out', function() {
      ctrl.logout();
      scope.$digest();
      expect(location.path).toHaveBeenCalledWith('/');
    });
  });
});
