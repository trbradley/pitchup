describe('Enrollments Feature', function() {

  it("allows a user to register, view teams, and enrol onto a team", function() {
    browser.get('http://localhost:5000');

    var registerLink = element(by.css('a[href*="/#/users/new"]'));

    registerLink.click();

    expect(browser.getCurrentUrl()).toContain('/users/new');

    var newUserForm = element(by.css('form'));
    var usernameInput = element(by.css('input[name="username"]'));
    var emailInput = element(by.css('input[name="email"]'));
    var passwordInput = element(by.css('input[name="password"]'));

    usernameInput.sendKeys('Mr Example2');
    emailInput.sendKeys('example2@example.com');
    passwordInput.sendKeys('password');
    newUserForm.submit();

    expect(browser.getCurrentUrl()).toContain('/users/1');

    var dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
    dropdownMenu.click();
    var addTeamLink = element(by.css('a[href*="/#/teams/new"]'));
    addTeamLink.click();

    expect(browser.getCurrentUrl()).toContain('/teams/new');

    var newTeamForm = element(by.css('form'));
    var teamNameInput = element(by.css('input[name="teamName"]'));
    var capacityInput = element(by.css('input[name="capacity"]'));
    var numberPlayersInput = element(by.css('input[name="numberPlayers"]'));
    var postcodeInput = element(by.css('input[name="pitchPostcode"]'));
    var dateInput = element(by.css('input[name="date"]'));
    var timeInput = element(by.css('input[name="time"]'));

    teamNameInput.sendKeys('Example United');
    capacityInput.sendKeys('10');
    numberPlayersInput.sendKeys('5');
    postcodeInput.sendKeys('EC4V 5AJ');
    dateInput.sendKeys('2019-12-01');
    timeInput.sendKeys('13:00');
    newTeamForm.submit();

    dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
    dropdownMenu.click();
    logoutLink = element(by.css('button[class*="btn btn-link btn-logout"]'));
    logoutLink.click();

    registerLink.click();

    usernameInput.sendKeys('Mr Example3');
    emailInput.sendKeys('example3@example.com');
    passwordInput.sendKeys('password');
    newUserForm.submit();

    expect(browser.getCurrentUrl()).toContain('/users/2');

    dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
    dropdownMenu.click();
    joinTeamLink = element(by.css('a[href*="/#/teams"]'));
    joinTeamLink.click();

    var teamTitle = element(by.css('a[href*="/teams/1"]'));

    expect(teamTitle.getText()).toContain('Example United');

    teamTitle.click();

    expect(browser.getCurrentUrl()).toContain('/teams/1');

    var teamDetails = element(by.css('section[class*="description"]'));

    expect(teamDetails.getText()).toContain('10 players to play');

    var enrollTeam = element(by.css("a[href*='/#/teams/1/enrollments/new']"));

    enrollTeam.click();

    expect(browser.getCurrentUrl()).toContain('/teams/1/enrollments/new');

    var enrollForm = element(by.css('form'));
    var enrollNumberPlayersInput = element(by.css('input[name="numberPlayers"]'));

    enrollNumberPlayersInput.sendKeys('2');
    enrollForm.submit();

    expect(browser.getCurrentUrl()).toContain('/teams/1');
    expect(teamDetails.getText()).toContain('7 players ready to play');

    dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
    dropdownMenu.click();
    logoutLink = element(by.css('button[class*="btn btn-link btn-logout"]'));
    logoutLink.click();

  });
});
