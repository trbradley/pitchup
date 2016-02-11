pitchup.controller('newUserController',
  ['$scope', '$window', 'UserAuth',
  function ($scope, $window, UserAuth) {
    $scope.register = function () {

      $scope.error = false;
      $scope.disabled = true;

      UserAuth.register(
          $scope.registerForm.username,
          $scope.registerForm.email,
          $scope.registerForm.password
        )
        .then(function () {
          $window.location.href = '/#/teams';
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };

  }]);
