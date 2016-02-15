pitchup.controller('NewEnrollmentController',
['EnrollmentsResource', '$location', '$route', '$routeParams',
function(EnrollmentsResource, $location, $route, $routeParams){
  var self = this;
  self.id = $routeParams.id;

  self.enroll = function() {
    EnrollmentsResource.postEnrollments(
      self.number_players,
      self.id
    )
    .then(function() {
      $location.path('/#/teams/' + self.id);
      $route.reload();
    });
  };
}]);
