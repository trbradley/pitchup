describe('TeamsController', function() {
  var response = {
    data: {
      "teams": [
        {
          "capacity": 10,
          "name": "squadra",
          "number_players": 7
        }
      ]
    }
  };

  var ctrl;
  var scope;
  var TeamsResourceFactoryMock;

  beforeEach(function() {
    TeamsResourceFactoryMock = jasmine.createSpyObj('TeamsResource', ['getTeams']);
    module('Pitchup', {
      TeamsResource: TeamsResourceFactoryMock
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    TeamsResourceFactoryMock.getTeams.and.returnValue($q.when(response));
    ctrl = $controller('TeamsController');
    scope = $rootScope;
  }));

  it('intializes with teams from the TeamsResource factory', function() {
    scope.$digest();
    expect(ctrl.teams)
      .toEqual(response.data.teams);
  });

});
