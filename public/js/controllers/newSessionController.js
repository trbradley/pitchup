pitchup.controller('newSessionController',
  ['$scope', '$window', 'UserAuth',
  function ($scope, $window, UserAuth){

    console.log(UserAuth.isLoggedIn());

    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;

      UserAuth.login($scope.loginForm.email, $scope.loginForm.password)

      .then(function () {
        $window.location.href = '/#/teams';
        $scope.disabled = false;
        $scope.loginForm = {};
      })

      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Invalid username and/or password";
        $scope.disabled = false;
        $scope.loginForm = {};
      });
    };
  }]);
