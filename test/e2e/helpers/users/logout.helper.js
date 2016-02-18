var Logout = function() {
  this.dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
  this.logoutLink = element(by.css('button[class*="btn btn-link btn-logout"]'));
};

Logout.prototype.logoutUser = function() {
  this.dropdownMenu.click();
  this.logoutLink.click();
};

module.exports = Logout;
