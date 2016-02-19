describe('factory: UsersResource', function() {
  var usersResource;
  var scope;
  var $httpBackend;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(UsersResource, _$httpBackend_, _$rootScope_){
    usersResource = UsersResource;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function($httpBackend, $rootScope) {
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getUser', function() {
    it('returns error when getUser fails', function() {
      httpBackend.expectGET("/users/5").respond(400);
      usersResource.getUser(5);
      httpBackend.flush();
    });
    it('returns with 200 when getUser passed successfully', function() {
      httpBackend.expectGET("/users/5").respond(200);
      usersResource.getUser(5);
      httpBackend.flush();
    });
  });
});
