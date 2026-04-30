import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

/**
 * Here you write all the tests for the contactsList page.
 * Like Chappell Roan said: `Good luck babe!`
 *
 * Your checklist for this file:
 *
 * TODO: Change the file name
 * TODO: Expand the first test block
 * TODO: Delete this comment when done
 */

const contactsTest = reactAppTest.extend({});

contactsTest(
  "add to contacts list, search for it, delete it and check if it is deleted",
  async ({ contacts, page }): Promise<void> => {
    await expect(contacts().searchBar).toBeVisible();
    const randomName = await contacts().getRandomContactName();
    await contacts().searchContacts(randomName);
    await expect(contacts().noItemsMessage).not.toBeVisible();
    await expect(contacts().getContactComponentByIndex(0).name).toHaveText(randomName);
    await contacts().deleteContact(0);
    await expect(contacts().noItemsMessage).toBeVisible();
    await expect(contacts().getContactByName(randomName).first()).not.toBeVisible();
    await page.reload();
    await expect(contacts().getContactByName(randomName).first()).toBeVisible();
  }
);
