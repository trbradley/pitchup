var NewTeam = function() {
  this.dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
  this.addTeamLink = element(by.css('a[href*="/#/teams/new"]'));
  this.newTeamForm = element(by.css('form'));
  this.teamNameInput = element(by.css('input[name="teamName"]'));
  this.capacityInput = element(by.css('input[name="capacity"]'));
  this.numberPlayersInput = element(by.css('input[name="numberPlayers"]'));
  this.postcodeInput = element(by.css('input[name="pitchPostcode"]'));
  this.dateInput = element(by.css('input[name="date"]'));
  this.timeInput = element(by.css('input[name="time"]'));
};

NewTeam.prototype.addTeam = function(teamName, capacity, numberPlayers, postcode, date, time) {
  this.dropdownMenu.click();
  this.addTeamLink.click();
  this.teamNameInput.sendKeys(teamName);
  this.capacityInput.sendKeys(capacity);
  this.numberPlayersInput.sendKeys(numberPlayers);
  this.postcodeInput.sendKeys(postcode);
  this.dateInput.sendKeys(date);
  this.timeInput.sendKeys(time);
  this.newTeamForm.submit();
};

module.exports = NewTeam;
