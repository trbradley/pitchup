describe('NewUserController', function() {
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
      'UserAuth', ['register']
    );

    module('Pitchup', {
      UserAuth: UserAuthMock,
      $location: locationMock,
      $route: routeMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope, $location, $route) {
    UserAuthMock.register.and.returnValue($q.when({}));
    ctrl = $controller('NewUserController');
    scope = $rootScope;
    location = $location;
    route = $route;
  }));

  describe('#register', function() {
    it('redirects the user to teams list on successful register', function() {
      ctrl.register();
      scope.$digest();
      expect(location.path).toHaveBeenCalledWith('/users/undefined');
    });
  });

  describe('#bad register', function() {
    beforeEach(function() {
      inject(function($q) {
        UserAuthMock.register.and.returnValue($q.reject({}));
      });
    });
    it('throws an error when register fails', function() {
      ctrl.errorMessage = 'Something went wrong!';
      ctrl.register();
      scope.$digest();
      expect(ctrl.errorMessage).toEqual('Something went wrong!');
    });
  });
});
