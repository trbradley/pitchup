describe('factory: UsersResource', function() {
  var usersResource;
  var scope;
<<<<<<< HEAD

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(UsersResource){
    usersResource = UsersResource;
=======
  var $httpBackend;

  beforeEach(module('Pitchup'));

  beforeEach(inject(function(UsersResource, _$httpBackend_, _$rootScope_){
    usersResource = UsersResource;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
>>>>>>> 5e1f7c87cb8b29bb96b7a13c966c2009c5eb9777
  }));

  beforeEach(inject(function($httpBackend, $rootScope) {
    httpBackend = $httpBackend;
<<<<<<< HEAD
    httpBackend
    .when(
      "GET",
      "users/"
    )
    .respond(
      [{ username: 'giamir', email: 'giamir@email.com', id: '2'}]
    );
    httpBackend
    .when(
      "GET",
      "users/2"
    )
    .respond(
      { username: 'giamir', email: 'giamir@email.com', id: '2'}
    );
  }));


  describe('#getData', function() {
    it('returns an array of users if no argument is passed', function() {
      usersResource.getData()
      .then(function(response) {
        expect(response.data[0]).toEqual({ username: 'giamir', email: 'giamir@email.com', id: '2' });
      });
      httpBackend.flush();
    });
    it('returns a specific user if the id is passed',function() {
      usersResource.getData(2)
      .then(function(response) {
        expect(response.data).toEqual({ username: 'giamir', email: 'giamir@email.com', id: '2' });
      });
=======
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
>>>>>>> 5e1f7c87cb8b29bb96b7a13c966c2009c5eb9777
      httpBackend.flush();
    });
  });
});
