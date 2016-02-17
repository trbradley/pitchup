describe('Teams Feature', function() {

  it('allows a user to create a team, view a list of teams and then view a specific team', function() {

    browser.get('http://localhost:5000');

    var registerLink = element(by.css('a[href*="/#/users/new"]'));

    registerLink.click();

    expect(browser.getCurrentUrl()).toContain('/users/new');

    var newUserForm = element(by.css('form'));
    var usernameInput = element(by.css('input[name="username"]'));
    var emailInput = element(by.css('input[name="email"]'));
    var passwordInput = element(by.css('input[name="password"]'));

    usernameInput.sendKeys('Mr Example1');
    emailInput.sendKeys('example1@example.com');
    passwordInput.sendKeys('password');
    newUserForm.submit();

    expect(browser.getCurrentUrl()).toContain('/users/3');

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

    expect(browser.getCurrentUrl()).toContain('/teams');

    var teamsList = element.all(by.repeater('team in ctrl.teams'));

    expect(teamsList.count()).toEqual(2);

    dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
    dropdownMenu.click();
    logoutLink = element(by.css('button[class*="btn btn-link btn-logout"]'));
    logoutLink.click();

  });
});
