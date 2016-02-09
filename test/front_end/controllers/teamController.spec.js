describe('TeamController', function() {
  var response = {
    data: { teamName: 'Arsenal', capacity: '2', numberPlayers: '1' }
  };

  var ctrl;
  var scope;
  var TeamsResourceFactoryMock;

  beforeEach(function() {
    TeamsResourceFactoryMock = jasmine.createSpyObj('TeamsResource', ['getTeam']);
    module('Pitchup', {
      TeamsResource: TeamsResourceFactoryMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    TeamsResourceFactoryMock.getTeam.and.returnValue($q.when(response));
    ctrl = $controller('TeamController', { $routeParams: {id: '2'} });
    scope = $rootScope;
  }));

  it('initializes with team info from the teamsResource factory', function() {
    scope.$digest();
    expect(ctrl.team)
      .toEqual(response.data);
  });
});
