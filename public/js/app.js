var pitchup = angular.module('Pitchup', [
  'ngResource',
  'ngRoute',
  'angular-loading-bar',
  'ngAnimate',
  'ngGeolocation',
  'uiGmapgoogle-maps'
]);

pitchup.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'public/views/partials/home.html'
    })
    .when('/teams', {
      controller : 'TeamsController as ctrl',
      templateUrl: 'public/views/partials/teams/index.html'
    })
    .when('/teams/new', {
      controller : 'NewTeamController as ctrl',
      templateUrl: 'public/views/partials/teams/new.html'
    })
    .when('/teams/:id', {
      controller : 'TeamController as ctrl',
      templateUrl: 'public/views/partials/teams/team.html'
    })
    .when('/sessions/new', {
      controller : 'NewSessionController as ctrl',
      templateUrl: 'public/views/partials/sessions/new.html'
    })
    .when('/users/new', {
      controller : 'NewUserController as ctrl',
      templateUrl: 'public/views/partials/users/new.html'
    })
    .when('/users/:id', {
      controller : 'UserController as ctrl',
      templateUrl: 'public/views/partials/users/user.html'
    })
    .when('/teams/:id/enrollments/new', {
      controller : 'NewEnrollmentController as ctrl',
      templateUrl: 'public/views/partials/enrollments/new.html'
    })
    .otherwise({
      redirectTo: '/'
    })
    $locationProvider.html5Mode(true);
  }
]);

pitchup.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
    china: 'true',
		v: '3',
		libraries: 'weather,geometry,visualization'
	});
});
