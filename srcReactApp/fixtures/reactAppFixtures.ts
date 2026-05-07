import { test } from "@playwright/test";
import lazyFixture from "../../sharedFiles/utils/lazyFixture.util";
import Contacts from "../pages/contacts.page";
import NewContact from "../pages/ContactForm.page";
import PlaygroundPage from "../pages/playground.page";

/**
 * All page objects available as fixtures in React App tests.
 *
 * contacts    → the contacts LIST page (search, browse, navigate)
 * newContact  → the create contact FORM page (fill form, save, errors)
 * playground  → the playground PAGE (movies, switches, table, new window)
 */
type Pages = {
  contacts: () => Contacts;
  newContact: () => NewContact;
  playground: () => PlaygroundPage;
};
/*

 * A custom test extension that provides access to the `pages` fixture.
 *
 * This extension is built on top of the Playwright test framework and allows
 * tests to utilize the `pages` functionality
 * The `lazyFixture` function is used to ensure that the `pages`
 * are instantiated only when they are needed in the test.
 *
 *@extends {test}
 *@type {Pages}
 */
const baseTest = test.extend<Pages>({
  contacts: lazyFixture(Contacts),
  newContact: lazyFixture(NewContact),
  playground: lazyFixture(PlaygroundPage),
});

export default baseTest;
