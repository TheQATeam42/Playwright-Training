import { test } from "@playwright/test";
import LoginPage from "../../pages/loginPage.page";
import lazyFixture from "../../../sharedFiles/utils/lazyFixture.util";

/**
 * Represents a collection of page objects for the application.
 *
 * @typedef {Object} Pages
 */
type Pages = {
  loginPage: () => LoginPage;
};

/**
 * A custom test extension that provides access to the `pages` fixture.
 *
 * This extension is built on top of the Playwright test framework and allows
 * tests to utilize the `pages` functionality
 * The `lazyFixture` function is used to ensure that the `pages`
 * are instantiated only when they are needed in the test.
 *
 * @extends {test}
 * @type {Pages}
 */
const baseTest = test.extend<Pages>({
  loginPage: lazyFixture(LoginPage),
});

export default baseTest;
