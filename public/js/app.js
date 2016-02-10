var pitchup = angular.module('Pitchup', ['ngResource', 'ngRoute']);

pitchup.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/teams/', {
        templateUrl: '../views/partials/teams/index.html'
      })
      .when('/teams/new', {
        templateUrl: '../views/partials/teams/new.html'
      })
      .when('/teams/:id', {
        templateUrl: '../views/partials/teams/team.html'
      });
  }
]);
