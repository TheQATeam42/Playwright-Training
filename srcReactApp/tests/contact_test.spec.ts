import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

/**
 * Tests for the Contacts List page.
 *
 * Covers the core contact management flow:
 *  - Searching for an existing contact by name
 *  - Verifying the contact appears in filtered results
 *  - Deleting the contact and confirming it is removed from the UI
 *  - Reloading the page to verify the deletion is NOT persisted
 *    (confirming the expected in-memory / session behaviour)
 *
 * Uses:
 *  contacts() → the Contacts list page fixture
 */
const contactsTest = reactAppTest.extend({});

contactsTest(
  "add to contacts list, search for it, delete it and check if it is deleted",
  async ({ contacts, page }): Promise<void> => {
    await expect(contacts().searchBar).toBeVisible();
    const randomName = await contacts().getRandomContactName();
    await contacts().searchContacts(randomName);
    await expect(contacts().noItemsMessage).not.toBeVisible();
    const firstContactNumber: number = 0;
    await expect(
      contacts().getContactComponentByIndex(firstContactNumber).name
    ).toHaveText(randomName);
    await contacts().deleteContact(firstContactNumber);
    await expect(contacts().noItemsMessage).toBeVisible();
    await expect(
      contacts().getContactByName(randomName).first()
    ).not.toBeVisible();
    await page.reload();
    await expect(contacts().getContactByName(randomName).first()).toBeVisible();
  }
);
