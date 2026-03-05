import reactAppTest from "./setup/testLevelHooks.setup";

/**
 * All tests related to the contacts list page.
 */

const contactsListTest = reactAppTest.extend({});

/**
 * Search for a contact in the contacts list,
 * delete that contact, and validate that it reappears on refresh.
 */
contactsListTest(
  "Search for a contact and then delete it",
  async ({ contacts, page }): Promise<void> => {
    // The name of the contact to delete.
    const name = "Alika Medina";

    // Accept any alerts that appear.
    contacts().acceptAlerts();

    // Search for the contact.
    await contacts().search(name, 1);

    // Delete the contact.
    await contacts().deleteNthContact(0);

    // Validate that the contact has been deleted and the search shows no results.
    await contacts().searchInput.fill("");
    await contacts().search(name, 0);

    // Refresh the page.
    page.reload();

    // After the refresh, the page should be reinitialized.
    // Search for the contact again and validate that it exists.
    await contacts().search(name, 1);
  }
);
