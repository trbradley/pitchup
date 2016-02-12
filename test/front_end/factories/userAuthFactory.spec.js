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
  });

  describe('#logout', function() {
    it('returns success string if logout is successful', function() {
      httpBackend
        .expect('DELETE', "/sessions").respond(200);
      userAuth.logout()
        .then(function(response) {
        });
      httpBackend.flush();
    });
  });


});
