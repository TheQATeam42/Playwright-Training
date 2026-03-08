import Contacts from "../pages/contacts.page";
import reactAppTest from "./setup/testLevelHooks.setup";
import { test, expect } from "@playwright/test";
import Contact from "../components/contact.component";

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

const contactsListTest = reactAppTest.extend({});

contactsListTest("Contact Searchbar", async ({ page }): Promise<void> => {
  const contactListPage = new Contacts(page);

  // Checking if a certain individual exists
  let personName = "August Erickson";
  await contactListPage.search(personName);

  await expect(contactListPage.contactItems).toHaveCount(1);

  // Checking delete button
  page.once("dialog", (dialog) => {
    console.log(dialog.message());
    dialog.accept();
  });
  const contact = new Contact(page, personName);
  await contact.deleteContact();
  await expect(contactListPage.contactItems).toHaveCount(0);

  // Checking if refresh works
  await page.reload();
  await contactListPage.search(personName);
  await expect(contactListPage.contactItems).toHaveCount(1);
});
