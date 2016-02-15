describe('AppController', function() {
  var UserAuth;
  var currentUser;
  var ctrl;
  var scope;
  var UserAuthFactoryMock;

  beforeEach(function() {
    UserAuthFactoryMock = jasmine.createSpyObj('UserAuth', ['getCurrentUser']);
    module('Pitchup', {
      UserAuth: UserAuthFactoryMock
    });
  });
  beforeEach(inject(function($controller, $q, $rootScope) {
    UserAuthFactoryMock.getCurrentUser.and.returnValue($q.when({}));
    ctrl = $controller('AppController');
    scope = $rootScope;
  }));

  it('intializes currentUser as undefined', function() {
    scope.$digest();
    expect(ctrl.currentUser)
      .toEqual(undefined);
  });
  // it('returns user status on $routeChangeStart', function() {
  //   UserAuth.getCurrentUser = 'Htunny';
  //   expect(ctrl.currentUser).toBe('Htunny');
  // });
});
