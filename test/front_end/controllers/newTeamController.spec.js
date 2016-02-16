describe('NewTeamController', function() {
  var ctrl;
  var scope;
  var TeamsResourceMock;
  var locationMock;
  var location;
  var route;


  beforeEach(function() {
    locationMock = jasmine.createSpyObj(
      'locationMock', ['path']
    );
    routeMock = jasmine.createSpyObj(
      'routeMock', ['reload']
    );
    TeamsResourceMock = jasmine.createSpyObj(
      'TeamsResource', ['postTeams']
    );
    module('Pitchup', {
      TeamsResource: TeamsResourceMock,
      $location: locationMock,
      $route: routeMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope, $location, $route) {
    TeamsResourceMock.postTeams
      .and.returnValue($q.when({}));
    ctrl = $controller('NewTeamController');
    scope = $rootScope;
    location = $location;
    route = $route;
  }));

  describe('#createNewTeam', function() {
    it('redirects to /#/teams', function() {
      ctrl.createNewTeam();
      scope.$digest();
      expect(location.path).toHaveBeenCalledWith('/teams');
    });
  });
  describe('#unsuccessful createNewTeam', function() {
    beforeEach(function() {
      inject(function($q) {
        TeamsResourceMock.postTeams.and.returnValue($q.reject({}));
      });
    });
    it('throws an error when createNewTeam fails', function() {
      ctrl.errorMessage = 'Something went wrong!';
      ctrl.createNewTeam();
      scope.$digest();
      expect(ctrl.errorMessage).toEqual('Something went wrong!');
    });
  });
});
