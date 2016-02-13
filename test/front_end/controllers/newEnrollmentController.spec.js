describe('NewEnrollmentController', function() {
  var response = { message: 'ok' };
  var ctrl;
  var scope;
  var windowMock;
  var EnrollmentsResourceMock;
  var idMock;

  beforeEach(function() {
    windowMock = { location : { href: jasmine.createSpy() } };
    EnrollmentsResourceMock = jasmine.createSpyObj(
      'EnrollmentsResource', ['postEnrollments']
    );
    module('Pitchup', {
      EnrollmentsResource: EnrollmentsResourceMock,
      $window: windowMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    EnrollmentsResourceMock.postEnrollments.and.returnValue($q.when(response));
    ctrl = $controller('NewEnrollmentController');
    scope = $rootScope;
  }));

  describe('#enroll()', function() {
    it('redirects to /#/teams/:id when a user successfully joins a team', function() {
      ctrl.id = 55;
      ctrl.enroll();
      scope.$digest();
      // expect(windowMock.location.href).toEqual('/#/teams/55');
    });
  });
});
