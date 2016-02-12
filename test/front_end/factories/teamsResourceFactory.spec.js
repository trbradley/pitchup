describe('factory: TeamsResource', function() {
  var teamsResource;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(TeamsResource) {
    teamsResource = TeamsResource;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .whenGET("/teams/2").respond(
        {teamName: 'Arsenal', capacity: '5', numberPlayers: '4'}
      );
    httpBackend
      .whenGET("/teams").respond(
        [{teamName: 'Arsenal', capacity: '5', numberPlayers: '4'}]
      );

  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getTeam', function() {
    it('returns team hash', function() {
      teamsResource.getTeam(2)
        .then(function(response) {
          expect(response.data).toEqual({teamName: 'Arsenal', capacity: '5', numberPlayers: '4'});
        });
      httpBackend.flush();
    });
  });

  describe('#getTeams', function() {
    it('returns teams array', function() {
      teamsResource.getTeams()
        .then(function(response) {
          expect(response.data[0]).toEqual({teamName: 'Arsenal', capacity: '5', numberPlayers: '4'});
        });
      httpBackend.flush();
    });
  });

  describe('#postTeams', function() {
    it('returns a success message if a team has been created', function() {
      httpBackend
        .whenPOST("/teams").respond(function() {
          return [201, { message: 'Team created!' }, {}];
        });
      teamsResource.postTeams('Dortmund', '10', '2')
        .then(function(data) {
          expect(data.message).toEqual('Team created!');
        });
      httpBackend.flush();
    });
  });
  describe('#postTeams error', function() {
    it('returns an error message if a team has not been created', function() {
      httpBackend
        .whenPOST("/teams").respond(400);
      teamsResource.postTeams('Dortmund', '10', '2')
        .then(function(data, status) {
          expect(status).toBe(400);
        });
      httpBackend.flush();
    });
  });
});
