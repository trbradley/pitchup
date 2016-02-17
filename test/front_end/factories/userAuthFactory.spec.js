describe('factory: UserAuth', function() {
  var userAuth;
  var success;
  var $httpBackend;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(UserAuth, _$httpBackend_, _$rootScope_) {
    userAuth = UserAuth;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getCurrentUser', function() {
    it('returns error when getCurrentUser fails', function() {
      httpBackend.expectGET("/sessions").respond(400);
      userAuth.getCurrentUser();
      httpBackend.flush();
    });
    it('returns with a 200 when getCurrentUser is successful', function() {
      httpBackend.expectGET("/sessions").respond(200);
      userAuth.getCurrentUser();
      httpBackend.flush();
    });
  });

  describe('#register', function() {
    it('returns success string if registered successfully', function() {
      httpBackend
        .whenPOST("/users").respond(201);
      userAuth.register('testuser', 'email@email.com', '123456')
        .then(function(response) {
          expect(response.status).toBe(201);
        });
      httpBackend.flush();
    });
    it('it rejects if registered unsuccessfully', function() {
      httpBackend
        .whenPOST("/users").respond(400);
      userAuth.register('testuser', 'email@email.com', '123456')
        .then(function(response) {
          expect(response.status).toBe(400);
        });
      httpBackend.flush();
    });
  });

  describe('#login', function() {
    it('returns success string if login is successful', function() {
      httpBackend
        .whenPOST("/sessions").respond(200);
      userAuth.login('testuser', '123456')
        .then(function(response) {
          expect(response.status).toBe(200);
        });
      httpBackend.flush();
    });
    it('returns error if login is unsuccessful', function() {
      httpBackend
        .whenPOST("/sessions").respond(400);
      userAuth.login('testuser', '123456')
        .then(function(response) {
          expect(response.status).toBe(400);
        });
      httpBackend.flush();
    });
  });

  describe('#logout', function() {
    it('returns success string if logout is successful', function() {
      httpBackend
        .expect('DELETE', "/sessions").respond(200);
      userAuth.logout();
      httpBackend.flush();
    });
  });
  describe('#errorlogout', function() {
    it('returns error if logout is unsuccessful', function() {
      httpBackend
        .expect('DELETE', "/sessions").respond(400);
      userAuth.logout();
      httpBackend.flush();
    });
  });



});
