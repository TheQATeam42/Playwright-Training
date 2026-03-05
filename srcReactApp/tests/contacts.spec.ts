import reactAppTest from "./setup/testLevelHooks.setup";
import Contacts from "../pages/contacts.page";

/**
 * Extended test instance for the Contacts List.
 * Uses the setup hooks defined in testLevelHooks.setup.
 */
const contactsListTest = reactAppTest.extend({});

/**
 * FEATURE: Contact List Management
 * SCENARIO: Search for a specific contact, verify its presence, delete it, and confirm removal.
 */
contactsListTest(
  "Contacts List - Test Suite",
  async ({ page }): Promise<void> => {
    // 1. Initialize the Page Object
    const contactsPage = new Contacts(page);

    // 2. Search for a specific record
    // This helps isolate the target contact before verification
    await contactsPage.searchForContact("Ariana Ball");

    // 3. Assert the contact is visible in the UI
    await contactsPage.checkContactIsVisible("Ariana Ball");

    // 4. Assert the result count
    // Ensures the search filter is working correctly (only 1 result returned)
    await contactsPage.checkContactListLength(1);

    // 5. Delete the contact
    // Note: The Page Object handles the browser's 'confirm' dialog internally
    await contactsPage.deleteContact("Ariana Ball");

    // 6. Verify removal
    // The list should update immediately to show 0 contacts
    await contactsPage.checkContactListLength(0);

    // 7. Reset the environment
    // Refreshing allows the test to leave the application in a clean state or verify persistence
    await contactsPage.refreshPage();

    // Final check after refresh to confirm the contact isn't still deleted
    await contactsPage.searchForContact("Ariana Ball");
  }
);
