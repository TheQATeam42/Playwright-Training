import { expect } from "@playwright/test";
import Contacts from "../pages/contacts.page";
import reactAppTest from "./setup/testLevelHooks.setup";

/**
 * Here you write all the tests for the ContactsList page.
 * Like Chappell Roan said: `Good luck babe!`
 *
 * Your checklist for this file:
 *
 * TODO: Change the file name
 * TODO: Expand the first test block
 * TODO: Delete this comment when done
 */

const contactsListDeleteTest = reactAppTest.extend({});

contactsListDeleteTest(
  "should delete a contact and verify behavior",
  async ({ page }) => {
    // step 1: navigate to the contacts list page and verify the search bar is visible
    const contacts = new Contacts(page);
    await expect(contacts.searchBar).toBeVisible();

    // step 2: search for the contact by name
    const contactName = "Alika Medina";
    await contacts.searchBar.fill(contactName);

    //step 3: make sure the contact card is visible in the list
    await expect(contacts.contactCard(contactName)).toBeVisible();

    // step 4: make sure it's the only contact in the list
    await expect(contacts.contactCards).toHaveCount(1);

    // preperation for step 6: Handle native JS alert/confirm
    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    // step 5: click the delete button on the contact card
    await contacts.deleteButton(contactName).click();

    // step 7: make sure the contact is not visible in the list
    await expect(contacts.contactCard(contactName)).not.toBeVisible();

    // step 8: refresh the page
    await contacts.page.reload();

    // step 9: make sure the contact is visible in the list after refresh
    await expect(contacts.contactCard(contactName)).toBeVisible();
  }
);
