import reactAppTest from "./setup/testLevelHooks.setup";
import Contacts from "../pages/contacts.page";

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "Contacts List - Test Suite",
  async ({ page }): Promise<void> => {
    // create an instance of the page object
    const contactsPage = new Contacts(page);
    await contactsPage.searchForContact("Ariana Ball");

    // check that the search input is visible
    await contactsPage.checkContactIsVisible("Ariana Ball");

    // Check that there is only 1 contact on the list
    await contactsPage.checkContactListLength(1);

    // delete the contact
    await contactsPage.deleteContact("Ariana Ball");

    // check that there are no contacts on the list
    await contactsPage.checkContactListLength(0);

    // refresh the page to reset the state
    await contactsPage.refreshPage();

    await contactsPage.searchForContact("Ariana Ball");
  }
);
