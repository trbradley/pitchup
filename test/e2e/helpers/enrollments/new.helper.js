var EnrollTeam = function() {
  this.enrollTeam = element(by.css("a[href*='/#/teams/1/enrollments/new']"));
  this.enrollForm = element(by.css('form'));
  this.enrollNumberPlayersInput = element(by.css('input[name="numberPlayers"]'));
};

EnrollTeam.prototype.addEnrollments = function() {
  this.enrollTeam.click();
};

EnrollTeam.prototype.addPlayers = function(players) {
  this.enrollNumberPlayersInput.sendKeys(players);
  this.enrollForm.submit();
};

module.exports = EnrollTeam;
