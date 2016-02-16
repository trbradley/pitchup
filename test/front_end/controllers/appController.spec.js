describe('AppController', function() {
  var UserAuth;
  var currentUser;
  var ctrl;
  var scope;
  var route;
  var UserAuthFactoryMock;

  beforeEach(function() {
    UserAuthFactoryMock = jasmine.createSpyObj('UserAuth', ['getCurrentUser']);
    routeMock = jasmine.createSpyObj(
      'routeMock', ['reload']
    );
    module('Pitchup', {
      UserAuth: UserAuthFactoryMock,
      $route: routeMock
    });
  });
  beforeEach(inject(function($controller, $q, $rootScope, $route) {
    UserAuthFactoryMock.getCurrentUser.and.returnValue($q.when({response: 'user'}));
    ctrl = $controller('AppController');
    scope = $rootScope;
    route = $route;
  }));

  it('intializes currentUser as undefined', function() {
    expect(ctrl.currentUser)
      .toEqual(undefined);
  });
  it('returns user status on $routeChangeStart', function() {
    scope.$broadcast("$routeChangeStart");
    expect(UserAuthFactoryMock.getCurrentUser).toHaveBeenCalled();
    scope.$digest();
    expect(ctrl.currentUser)
      .toEqual({response: 'user'});
  });
});
