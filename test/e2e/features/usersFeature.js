// describe('Users Feature', function() {
//
//   it("allows a user to register, logout, login and view their profile", function() {
//     browser.ignoreSynchronization = true;
//     browser.get('http://localhost:5000');
//
//     var registerLink = element(by.css('a[href*="/#/users/new"]'));
//
//     expect(browser.getTitle()).toEqual('PitchUp');
//     expect(registerLink.isDisplayed()).toBeTruthy();
//     browser.ignoreSynchronization = false;
//     registerLink.click();
//
//     expect(browser.getCurrentUrl()).toContain('/users/new');
//
//     var newUserForm = element(by.css('form'));
//     var usernameInput = element(by.css('input[name="username"]'));
//     var emailInput = element(by.css('input[name="email"]'));
//     var passwordInput = element(by.css('input[name="password"]'));
//
//     usernameInput.sendKeys('Mr Example');
//     emailInput.sendKeys('example@example.com');
//     passwordInput.sendKeys('password');
//     newUserForm.submit();
//
//     expect(browser.getCurrentUrl()).toContain('/users/1');
//     expect(registerLink.isDisplayed()).toBeFalsy();
//
//     var dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
//     dropdownMenu.click();
//     var logoutLink = element(by.css('button[class*="btn btn-link btn-logout"]'));
//     logoutLink.click();
//
//     expect(logoutLink.isDisplayed()).toBeFalsy();
//
//     var loginLink = element(by.css('a[href*="/sessions/new"]'));
//
//     loginLink.click();
//
//     var loginForm = element(by.css('form'));
//
//     usernameInput.sendKeys('Mr Example');
//     passwordInput.sendKeys('password');
//     loginForm.submit();
//
//     expect(browser.getCurrentUrl()).toContain('/users/1');
//     expect(loginLink.isDisplayed()).toBeFalsy();
//
//     var userDetails = element(by.css('section[class*="description"]'));
//
//     expect(userDetails.getText()).toContain('example@example.com');
//   });
// });
