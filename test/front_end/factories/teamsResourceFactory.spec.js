describe('factory: TeamsResource', function() {
  var teamsResource;
  var httpBackend;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(TeamsResource, _$httpBackend_) {
    teamsResource = TeamsResource;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getTeam', function() {
    it('returns an 200 status if a user successfully gets a team profile', function() {
      $httpBackend.expectGET("/teams/55").respond(200);
      teamsResource.getTeam(55);
      httpBackend.flush();
    });
  });

  describe('#getTeams', function() {
    it('returns an 200 status if a user successfully gets a list of teams', function() {
      $httpBackend.expectGET("/teams").respond(200);
      teamsResource.getTeams();
      httpBackend.flush();
    });
  });

  describe('#postTeams', function() {
    it('has TeamsResource post a new team', function() {
      $httpBackend.expectPOST("/teams").respond(201);
      teamsResource.postTeams('Arsenal', '5', '4');
      httpBackend.flush();
    });
  });
  describe('#postTeams error', function() {
    it('has TeamsResource throw error if unsuccessful postTeams', function() {
      $httpBackend.expectPOST("/teams").respond(400);
      teamsResource.postTeams('Arsenal', '5', '4');
      httpBackend.flush();
    });
  });
});
