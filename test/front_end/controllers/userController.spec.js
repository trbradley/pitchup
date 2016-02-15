describe('UserController', function() {
  var response = {
    data: { username: 'Stevo', email: 'stevo@email.com', id: '3' }
  };
  var ctrl;
  var scope;
  var UsersResourceFactoryMock;

  beforeEach(function() {
    UsersResourceFactoryMock = jasmine.createSpyObj('UsersResource', ['getUser']);
    module('Pitchup', {
      UsersResource: UsersResourceFactoryMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    UsersResourceFactoryMock.getUser.and.returnValue($q.when(response));
    ctrl = $controller('UserController', { $routeParams: {id: '3'} });
    scope = $rootScope;
  }));

  it('initializes with user info from the UsersResource Factory', function() {
    scope.$digest();
    expect(ctrl.user)
      .toEqual(response.data.user);
  });
});
