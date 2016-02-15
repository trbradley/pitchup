describe('factory: EnrollmentsResource', function() {
  var enrollmentsResource;
  var httpBackend;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(EnrollmentsResource, _$httpBackend_) {
    enrollmentsResource = EnrollmentsResource;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#postEnrollments', function() {
    it('returns an 201 status if a user successfully joins a team', function() {
      $httpBackend.expectPOST("/teams/55/enrollments").respond(201);
      enrollmentsResource.postEnrollments('2', 55);
      httpBackend.flush();
    });
  });
});
