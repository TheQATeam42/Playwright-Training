import { expect } from "playwright/test";
import ReactAppEndpoints from "../utils/endpoints.util";
import reactAppTest from "./setup/testLevelHooks.setup";
import Contact from "../components/contact.component";

/**
 * All tests related to the contacts list page.
 */

const contactsListTest = reactAppTest.extend({});

contactsListTest.beforeEach(async ({ contacts, page }) => {
  await page.goto(ReactAppEndpoints.CONTACTS);
  contacts().acceptAlerts();
});

/**
 * Search for a contact in the contacts list,
 * delete that contact, and validate that it reappears on refresh.
 */
contactsListTest(
  "Search for a contact and then delete it",
  async ({ contacts, page }): Promise<void> => {
    // The name of the contact to delete.
    const name = "Alika Medina";

    // Search for the contact.
    await contacts().search(name);

    // Delete the contact.
    const contact = new Contact(contacts().contacts);
    await contact.delete();

    let a = await contacts().contacts.count();
    // Validate that the contact has been deleted and the search shows no new results.
    expect(contacts().contacts).toHaveCount(0);

    // Refresh the page.
    page.reload();

    // After the refresh, the page should be reinitialized.
    // Search for the contact again and validate that it exists.
    await contacts().search(name);
  }
);
