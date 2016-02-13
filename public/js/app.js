var pitchup = angular.module('Pitchup', [
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'ngGeolocation',
  'ngMap'
]);

pitchup.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        controller : 'TeamsController as ctrl',
        templateUrl: 'public/views/partials/home.html'
      })
      .when('/teams', {
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
        templateUrl: 'public/views/partials/users/new.html'
      })
      .when('/users/:id', {
        templateUrl: 'public/views/partials/users/user.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
