import { test } from "@playwright/test";
import lazyFixture from "../../../sharedFiles/utils/lazyFixture.util";
import Contacts from "../../pages/contactsList.page";

/**
 * Represents a collection of page objects for the application.
 *
 * @typedef {Object} Pages
 */
type Pages = {
  contacts: () => Contacts;
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
  contacts: lazyFixture(Contacts),
});

export default baseTest;
