import { test } from "@playwright/test";
import lazyFixture from "../../sharedFiles/utils/lazyFixture.util";
import Contacts from "../pages/contacts.page";
import NewContact from "../pages/newcontact_CreateContact.page";
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

const baseTest = test.extend<Pages>({
  contacts: lazyFixture(Contacts),
  newContact: lazyFixture(NewContact),
  playground: lazyFixture(PlaygroundPage),
});

export default baseTest;
