var mock = require('protractor-http-mock');

describe('Enrollments Feature', function() {

  beforeEach(function() {
    mock(['enrollmentsFeatureMock.js']);
  });

  afterEach(function() {
    mock.teardown();
  });
});
