var pitchup = angular.module('Pitchup', ['ngResource', 'ngRoute']);

pitchup.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/teams/', {
        templateUrl: 'public/views/partials/teams/index.html'
      })
      .when('/teams/new', {
        templateUrl: 'public/views/partials/teams/new.html'
      })
      .when('/teams/:id', {
        templateUrl: 'public/views/partials/teams/team.html'
      })
      .when('/sessions/new', {
        templateUrl: 'public/views/partials/sessions/new.html'
      })
      .when('/users/new', {
        templateUrl: 'public/view/partials/users/new.html'
      })
      .otherwise({
        redirectTo: '/teams'
      });
  }
]);
