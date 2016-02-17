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

    expect(browser.getCurrentUrl()).toContain('/users/1');

    var dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
    dropdownMenu.click();
    var logoutLink = element(by.css('a[href*="/#/teams/new"]'));
    logoutLink.click();

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

    expect(teamsList.count()).toEqual(1);

    dropdownMenu = element(by.css('a[class*="dropdown-toggle"]'));
    dropdownMenu.click();
    logoutLink = element(by.css('button[class*="btn btn-link btn-logout"]'));
    logoutLink.click();

    // browser.get('http://localhost:5000/#/teams');
    //
    // var teamsList = element.all(by.repeater('team in ctrl.teams'));
    // var firstTeamName = teamsList.get(0).element(by.css('a'));
    //
    // expect(teamsList.count()).toEqual(1);

//     var header = element(by.css('header'));
//     var createTeamLink = header.element(by.css('a[href*="#/teams/new"]'));
//     createTeamLink.click();
//
//     expect(browser.getCurrentUrl()).toContain('#/teams/new');
//
//     var teamNameInput = element(by.css('input[name="teamName"]'));
//     var numberOfPlayersInput = element(by.css('input[name="numberOfPlayers"]'));
//     var currentPlayersInput = element(by.css('input[name="currentNumber"]'));
//     var newTeamForm = element(by.css('form'));
//
//     teamNameInput.sendKeys('Manchester United');
//     numberOfPlayersInput.sendKeys('5');
//     currentPlayersInput.sendKeys('2');
//     newTeamForm.submit();
//
//     expect(teamsList.count()).toEqual(1);
//     expect(browser.getCurrentUrl()).toContain('#/teams');
//     expect(firstTeamName.getText()).toEqual('Manchester United');
//
//     var viewTeamLink = teamsList.get(0).element(by.css('a[href*="#/teams/"]'));
//     viewTeamLink.click();
//
//     var teamName = element(by.binding('team.name'));
//     var capacity = element(by.binding('team.capacity'));
//     var currentPlayers = element(by.binding('team.number_players'));
//
//     expect(browser.getCurrentUrl()).toContain('#/teams/');
//     expect(teamName.getText()).toEqual('Manchester United');
//     expect(capacity.getText()).toContain('5');
//     expect(currentPlayers.getText()).toContain('2');
  });
});
