pitchup.controller('NewEnrollmentController',
  ['EnrollmentsResource', '$window',
  function(EnrollmentsResource, $window){
    var self = this;

    self.enroll = function() {
      EnrollmentsResource.postEnrollments(self.number_players)
        .then(function() {
          $window.location.href = '/#/teams/:id';
        })
        .catch(function() {
          self.errorMessage = "Unable to join - Team max capacity reached";
        });
    };
}]);
