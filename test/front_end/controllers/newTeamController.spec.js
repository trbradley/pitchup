describe('NewTeamController', function() {
  var ctrl;
  var scope;
  var TeamsResourceMock;
  var windowMock;

  beforeEach(function() {
    windowMock = { location : { href: jasmine.createSpy() } };
    TeamsResourceMock = jasmine.createSpyObj(
      'TeamsResource', ['postTeams']
    );
    module('Pitchup', {
      TeamsResource: TeamsResourceMock,
      $window: windowMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    TeamsResourceMock.postTeams
      .and.returnValue($q.when({}));
    ctrl = $controller('NewTeamController');
    scope = $rootScope;
  }));

  describe('#createNewTeam()', function() {
    it('redirects to /#/teams', function() {
      ctrl.createNewTeam();
      scope.$digest();
      expect(windowMock.location.href).toEqual('/#/teams');
    });
  });
});
