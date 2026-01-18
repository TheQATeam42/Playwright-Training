/**
 * Here you write all the tests for the LoginPage.
 * Good luck!
 *
 * Your checklist for this file:
 *
 * TODO: Change the file name
 * TODO: Expand the first test block
 * TODO: Add more tests
 * TODO: Delete this comment when done
 */

import swagLabsTest from "./setup/testLevelHooks.setup";

enum Users {
  STANDARD_USER = "standard_user",
}

swagLabsTest(
  "Write here the name of the test",
  async ({ loginPage }): Promise<void> => {
    loginPage().usernameInput.fill(Users.STANDARD_USER);
  }
);
