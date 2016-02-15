describe('TeamController', function() {
  var response = {
    data: { team: { name: 'Arsenal', capacity: '2', numberPlayers: '1' } }
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
describe('#successful getTeam request', function() {
  it('initializes with team info from the teamsResource factory', function() {
    scope.$digest();
    expect(ctrl.team)
      .toEqual(response.data.team);
    });
  });
describe('#unsuccessful getTeam request', function() {
  beforeEach(function() {
    inject(function($q) {
      TeamsResourceFactoryMock.getTeam.and.returnValue($q.reject(response));
    });
  });
  it('throws an error when getTeam fails', function() {
    ctrl.errorMessage = 'Something went wrong!';
    scope.$digest();
    expect(ctrl.errorMessage).toEqual('Something went wrong!');
    });
  });
});
