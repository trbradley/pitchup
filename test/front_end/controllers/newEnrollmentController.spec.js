describe('NewEnrollmentController', function() {
  var response = { message: 'ok' };
  var ctrl;
  var scope;
  var windowMock;
  var EnrollmentsResourceFactoryMock;
  var idMock;

  beforeEach(function() {
    windowMock = { location : { href: jasmine.createSpy() } };
    EnrollmentsResourceFactoryMock = jasmine.createSpyObj(
      'EnrollmentsResource', ['postEnrollments']
    );
    module('Pitchup', {
      EnrollmentsResource: EnrollmentsResourceFactoryMock,
      $window: windowMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    EnrollmentsResourceFactoryMock.postEnrollments.and.returnValue($q.when(response));
    ctrl = $controller('NewEnrollmentController');
    scope = $rootScope;
  }));

  describe('#enroll', function() {
    it('redirects to /#/teams/:id when a user successfully joins a team', function() {
      ctrl.id = 55;
      ctrl.enroll();
      scope.$digest();
      expect(windowMock.location.href).toEqual('/#/teams/55');
    });
  });
});
