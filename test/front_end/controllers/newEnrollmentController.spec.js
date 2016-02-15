describe('NewEnrollmentController', function() {
  var response = { message: 'ok' };
  var ctrl;
  var scope;
  var locationMock;
  var EnrollmentsResourceFactoryMock;
  var idMock;
  var location;
  var route;

  beforeEach(function() {
    locationMock = jasmine.createSpyObj(
      'locationMock', ['path']
    );
    routeMock = jasmine.createSpyObj(
      'routeMock', ['reload']
    );
    EnrollmentsResourceFactoryMock = jasmine.createSpyObj(
      'EnrollmentsResource', ['postEnrollments']
    );
    module('Pitchup', {
      EnrollmentsResource: EnrollmentsResourceFactoryMock,
      $location: locationMock,
      $route: routeMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope, $location, $route) {
    EnrollmentsResourceFactoryMock.postEnrollments.and.returnValue($q.when(response));
    ctrl = $controller('NewEnrollmentController');
    scope = $rootScope;
    location = $location;
    route = $route;
  }));

  describe('#enroll', function() {
    it('redirects to /#/teams/:id when a user successfully joins a team', function() {
      ctrl.id = 55;
      ctrl.enroll();
      scope.$digest();
      expect(location.path).toHaveBeenCalledWith('/teams/55');
    });
  });
});
