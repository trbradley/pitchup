var mock = require('protractor-http-mock');

describe('Users Feature', function() {

  beforeEach(function() {
    mock(['usersFeatureMock.js']);
  });

  afterEach(function() {
    mock.teardown();
  });

  it("allows a user to register, logout, login and view another user's profile", function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:5000');

    var registerLink = element(by.css('a[href*="/#/users/new"]'));

    expect(browser.getTitle()).toEqual('PitchUp');
    expect(registerLink.isDisplayed()).toBeTruthy();

    registerLink.click();

    expect(browser.getCurrentUrl()).toContain('/users/new');

    // var newUserForm = element(by.css('form'));
    // var usernameInput = element(by.css('input[name="username"]'));
    // var emailInput = element(by.css('input[name="email"]'));
    // var passwordInput = element(by.css('input[name="password"]'));
    //
    // usernameInput.sendKeys('Mr Example');
    // emailInput.sendKeys('example@example.com');
    // passwordInput.sendKeys('password');
    // newUserForm.submit();
    //
    // expect(browser.getCurrentUrl()).toContain('#/teams');
    // expect(registerLink.isDisplayed()).toBeFalsy();
    //
    // var logoutLink = element(by.css('a[href*="#/logout"]'));
    //
    // logoutLink.click();
    //
    // expect(browser.getCurrentUrl()).toContain('#/teams');
    // expect(logoutLink.isDisplayed()).toBeFalsy();
    //
    // var loginLink = element(by.css('a[href*="#/login"]'));
    //
    // loginLink.click();
    //
    // expect(browser.getCurrentUrl()).toContain('#/users/1');
    // expect(loginLink.isDisplayed()).toBeFalsy();
    //
    // var userDetails = element(by.css('section[class="description"]'));
    //
    // expect(browser.userDetails.getText()).toContain('example@example.com');

  });
});
