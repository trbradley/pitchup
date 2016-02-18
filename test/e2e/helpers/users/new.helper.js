var NewUser = function() {
  this.newUserForm = element(by.css('form'));
  this.usernameInput = element(by.css('input[name="username"]'));
  this.emailInput = element(by.css('input[name="email"]'));
  this.passwordInput = element(by.css('input[name="password"]'));
  this.loginLink = element(by.css('a[href*="/sessions/new"]'));
  this.registerLink = element(by.css('a[href*="/#/users/new"]'));
};

NewUser.prototype.addUser = function(name, email, password) {
  this.usernameInput.sendKeys(name);
  this.emailInput.sendKeys(email);
  this.passwordInput.sendKeys(password);
  this.newUserForm.submit();
};

module.exports = NewUser;
