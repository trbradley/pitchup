pitchup.controller('NewEnrollmentController',
['EnrollmentsResource', '$location', '$route', '$routeParams',
function(EnrollmentsResource, $location, $route, $routeParams){
  var self = this;
  self.id = $routeParams.id;
  self.viewClass = 'new-enrollment';

  self.enroll = function() {
    EnrollmentsResource.postEnrollments(
      self.numberPlayers,
      self.id
    )
    .then(function() {
      $location.path('/teams/' + self.id);
      $route.reload();
    });
  };
}]);
