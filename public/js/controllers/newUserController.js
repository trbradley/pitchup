pitchup.controller('newUserController',
  ['$window', 'UserAuth',
  function ($window, UserAuth) {
    var self = this;

    self.register = function () {

      self.error = false;
      self.disabled = true;

      UserAuth.register(
          self.username,
          self.email,
          self.password
        )
        .then(function () {
          $window.location.href = '/#/teams';
          self.disabled = false;
          self.registerForm = {};
        })
        .catch(function () {
          self.error = true;
          self.errorMessage = "Something went wrong!";
          self.disabled = false;
          self.registerForm = {};
        });
    };

  }]);
