var login = function() {
  this.loginLink = element(by.css('a[href*="/sessions/new"]'));
  this.usernameInput = element(by.css('input[name="username"]'));
  this.passwordInput = element(by.css('input[name="password"]'));
  this.loginForm = element(by.css('form'));
  this.userDetails = element(by.css('section[class*="description"]'));
};

login.prototype.loginUser = function(username, password) {
  this.loginLink.click();
  this.usernameInput.sendKeys(username);
  this.passwordInput.sendKeys(password);
  this.loginForm.submit();
};

module.exports = login;
