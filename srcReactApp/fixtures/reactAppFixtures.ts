import { test } from "@playwright/test";
import lazyFixture from "../../sharedFiles/utils/lazyFixture.util";
import ContactListPage from "../pages/contactList.page";
import ContactFormPage from "../pages/contactForm.page";

/**
 * Represents a collection of page objects for the application.
 *
 * @typedef {Object} Pages
 */
type Pages = {
  contactList: () => ContactListPage;
  contactForm: () => ContactFormPage;
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
  contactList: lazyFixture(ContactListPage),
  contactForm: lazyFixture(ContactFormPage),
});

export default baseTest;
