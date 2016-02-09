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
  }));
  //
  // afterEach(function() {
  //   httpBackend.verifyNoOutstandingExpectation();
  //   httpBackend.verifyNoOutstandingRequest();
  // });

  describe('#getTeam', function() {
    it('returns team hash', function() {
      teamsResource.getTeam(2)
        .then(function(response) {
          expect(response.data).toEqual({teamName: 'Arsenal', capacity: '5', numberPlayers: '4'});
        });
      httpBackend.flush();
    });
  });
});
