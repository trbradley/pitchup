describe('TeamsController', function() {
  var response = {
    data: { capacity: '5' }
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

  beforeEach(inject(function($controller, $q, $rootscope) {
    TeamsResourceFactoryMock.getTeams.and.returnValue($q.when(response));
    ctrl = $controller('TeamsController');
    scope = $rootscope;
  }));

  it('intializes with teams from the TeamsResource factory', function() {
    scope.$digest();
    expect(ctrl.teams)
      .toEqual(response.data);
  });

});
