describe('factory: UserAuth', function() {
  var userAuth;
  var success;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(UserAuth) {
    userAuth = UserAuth;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#isLoggedIn', function() {
    it('returns false when user is not logged in', function() {
      userAuth.isLoggedIn(); {
        expect(userAuth.isLoggedIn()).toBe(false);
      }
    });
    it('returns true when user is logged in', function() {
      httpBackend
        .whenPOST("/sessions").respond("Logged in successfully");
      userAuth.login().then(function() {
        expect(userAuth.isLoggedIn()).toBe(true);
      });
      httpBackend.flush();
    });
  });

  describe('#register', function() {
    it('returns success string if registered successfully', function() {
      httpBackend
        .whenPOST("/users").respond("User created successfully");
      userAuth.register('testuser', 'email@email.com', '123456')
        .then(function(response) {
          expect(response.data).toEqual("User created successfully");
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
        .whenPOST("/sessions").respond("Logged in successfully");
      userAuth.login('testuser', '123456')
        .then(function(response) {
          expect(response.data).toEqual("Logged in successfully");
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
