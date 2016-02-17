describe('Pitchup Feature', function() {
  var newUser = require("../helpers/users/new.helper.js"),
      viewUser = require("../helpers/users/view.helper.js"),
      login = require("../helpers/users/login.helper.js"),
      logout = require("../helpers/users/logout.helper.js"),
      newTeam = require("../helpers/teams/new.helper.js"),
      viewTeams = require("../helpers/teams/view.helper.js"),
      enroll = require("../helpers/enrollments/new.helper.js"),
      addNewUser = new newUser,
      viewUserProfile = new viewUser,
      Login = new login,
      Logout = new logout,
      addNewTeam = new newTeam,
      viewTeamsList = new viewTeams,
      enrollUser = new enroll;

  it("follows the full pitchup cycle", function() {
    browser.get('http://localhost:5000');

    // User 1 registering
    addNewUser.registerLink.click();
    addNewUser.addUser(
      'Mr Example',
      'example@example.com',
      'password'
    );
      expect(browser.getCurrentUrl())
        .toContain('/users/1');

    // User1 creates a new team which redirects to the teams list page
    addNewTeam.addTeam(
      'Example United',
      '10',
      '5',
      'EC4V 5AJ',
      '2019-12-01',
      '13:00'
    );
      expect(browser.getCurrentUrl())
        .toContain('/teams');

    // Teams count is now 1
      expect(viewTeamsList.teamsList
        .count()).toEqual(1);

    // User1 logs out
    Logout.logoutUser();

    // User2 registers
    addNewUser.registerLink.click();
    addNewUser.addUser(
      'Mr Example2',
      'example@2example.com',
      'password'
    );
      expect(browser.getCurrentUrl())
        .toContain('/users/2');
      expect(addNewUser.loginLink.isDisplayed())
        .toBeFalsy();

    // User2 views profile
      expect(viewUserProfile.userDetails.getText())
        .toContain('example@2example.com');

    // User2 views teams list
    viewTeamsList.viewTeamsList();
      expect(viewTeamsList.teamTitle.getText())
        .toContain('Example United');

    // User2 views individual team profile
    viewTeamsList.viewTeamInfo();
      expect(browser.getCurrentUrl())
        .toContain('/teams/1');

    enrollUser.addEnrollments();
      expect(browser.getCurrentUrl())
        .toContain('/teams/1/enrollments/new');

    // User2 enrolls into User1's team
    enrollUser.addPlayers('2');
      expect(browser.getCurrentUrl())
        .toContain('/teams/1');
      expect(viewTeamsList.teamDetails.getText())
        .toContain('7 players ready to play');

    // User2 logs out
    Logout.logoutUser();

    // User1 logs back in
      Login.loginUser(
        'Mr Example',
        'password'
      );
        expect(browser.getCurrentUrl())
          .toContain('/users/1');
        expect(Login.loginLink.isDisplayed())
          .toBeFalsy();
        expect(Login.userDetails.getText())
          .toContain('example@example.com');

    // User1 logs back out
      Logout.logoutUser();
  });
});
