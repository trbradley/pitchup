pitchup.controller('TeamsController',
['TeamsResource', 'AppLoading',
function(TeamsResource, AppLoading) {
  var self = this;

  self.init = function() {
    TeamsResource.getTeams()
     .then(function(response) {
       self.teams = response.data.teams;
     });
  };

  self.init();
}]);
