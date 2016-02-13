pitchup.controller('NewSessionController',
  ['$window', 'UserAuth',
  function ($window, UserAuth){
    var self = this;

    self.login = function () {

      UserAuth.login(self.username, self.password)

      .then(function () {
        $window.location.href = '/#/teams';
      })

      .catch(function () {
        self.errorMessage = "Invalid username and/or password";
      });
    };
  }]);

  pitchup.controller('NewEnrollmentController',
    ['EnrollmentsResource', '$window',
    function(EnrollmentsResource, $window){
      var self = this;

  }]);
