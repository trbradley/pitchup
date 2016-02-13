pitchup.controller('NewEnrollmentController', ['EnrollmentsResource', '$window', '$routeParams', function(EnrollmentsResource, $window, $routeParams) {
    var self = this;
    self.id = $routeParams.id;

    self.enroll = function() {
      EnrollmentsResource.postEnrollments(self.number_players, self.id)
        .then(function() {
          $window.location.href = ('/#/teams/' + self.id);
        });
    };

}]);
