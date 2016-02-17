var viewTeams = function() {
  this.dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
  this.joinTeamLink = element(by.css('a[href*="/#/teams"]'));
  this.teamsList = element.all(by.repeater('team in ctrl.teams'));
  this.teamTitle = element(by.css('a[href*="/teams/1"]'));
  this.teamDetails = element(by.css('section[class*="description"]'));
};

viewTeams.prototype.viewTeamsList = function() {
  this.dropdownMenu.click();
  this.joinTeamLink.click();
};

viewTeams.prototype.viewTeamInfo = function() {
  this.teamTitle.click();
};

module.exports = viewTeams;
