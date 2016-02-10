describe('Teams Feature', function() {
  it('allows a user to create a team, view a list of teams and then view a specific team', function() {
    browser.get('http://localhost:5000/#/teams');

    var teamsList = element.all(by.repeater('team in ctrl.teams'));
    var firstTeamName = teamsList.get(0).element(by.css('a'));

    expect(teamsList.count()).toEqual(0);

    var header = element(by.css('header'));
    var createTeamLink = header.element(by.css('a[href*="#/teams/new"]'));

    createTeamLink.click();

    expect(browser.getCurrentUrl()).toContain('#/teams/new');


    var teamNameInput = element(by.css('input[name="teamName"]'));
    var numberOfPlayersInput = element(by.css('input[name="numberOfPlayers"]'));
    var currentPlayersInput = element(by.css('input[name="currentNumber"]'));
    var newTeamForm = element(by.css('form'));

    teamNameInput.sendKeys('Manchester United');
    numberOfPlayersInput.sendKeys('5');
    currentPlayersInput.sendKeys('2');
    newTeamForm.submit();

    expect(teamsList.count()).toEqual(1);
    expect(browser.getCurrentUrl()).toContain('#/teams');
    expect(firstTeamName.getText()).toEqual('Manchester United');

    var viewTeamLink = teamsList.get(0).element(by.css('a[href*="#/teams/"]'));

    viewTeamLink.click();

    var teamName = element(by.binding('team.name'));
    var capacity = element(by.binding('team.capacity'));
    var currentPlayers = element(by.binding('team.number_players'));

    expect(browser.getCurrentUrl()).toContain('#/teams/');
    expect(teamName.getText()).toEqual('Manchester United');
    expect(capacity.getText()).toContain('5');
    expect(currentPlayers.getText()).toContain('2');

  });
});
