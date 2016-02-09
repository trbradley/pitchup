angular.module('pitchup', ['ngResource']).
    factory('TeamsResource', function($resource) {
      var teamsResource = $resource('/teams/', {}, {
        save: {method: 'GET'}
      });

      teamsResource.getTeam = function(id) {

      }
    });
