import { expect } from "@playwright/test";
import Contacts from "../pages/contacts.page";
import CreateContact, { ContactData } from "../pages/createContact.page";
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

const contactsListCreateTest = reactAppTest.extend({});

contactsListCreateTest(
  "positive contact creation and verify behavior",
  async ({ page }) => {
    // step 1: navigate to the contacts list page and verify the create button is visible
    const contacts = new Contacts(page);
    await expect(contacts.createButton).toBeVisible();

    // step 2: click the create button to add a new contact
    await contacts.createButton.click();

    //step 3: make sure the user is navigated to the contact creation page
    await expect(page).toHaveURL(/.*\/tasks\/create/);
    const createContact = new CreateContact(page);
    await expect(createContact.createContactHeader).toBeVisible();

    // step 4: fill out the contact creation form with valid data
    const contactName = "Lebron James";
    await createContact.formField("name").fill(contactName);
    await createContact.formField("phone").fill("123456789");
    await createContact.formField("street").fill("Herzel 123 st");
    await createContact.formField("city").fill("Los Angeles");

    // step 5: click the save button on the contact creation page
    await createContact.saveContact.click();

    //step 6: make sure the user is navigated back to the contacts list page
    await expect(page).toHaveURL("https://hub.testingtalks.com.au/");

    // step 7: search for the contact by name
    await contacts.searchBar.fill(contactName);

    // step 8: make sure the contact card is visible in the list
    await expect(contacts.contactCard(contactName)).toBeVisible();

    // step 9: refresh the page
    await contacts.page.reload();

    // step 10: make sure the contact is not visible in the list after refresh
    await expect(contacts.contactCard(contactName)).not.toBeVisible();
  }
);

const contactsListNegativeCreateTest = reactAppTest.extend({});
contactsListNegativeCreateTest(
  "negative contact creation and verify behavior",
  async ({ page }) => {
    // step 1: navigate to the contacts list page and verify the create button is visible
    const contacts = new Contacts(page);
    await expect(contacts.createButton).toBeVisible();

    // step 2: click the create button to add a new contact
    await contacts.createButton.click();

    //step 3: make sure the user is navigated to the contact creation page
    await expect(page).toHaveURL(/.*\/tasks\/create/);
    const createContact = new CreateContact(page);
    await expect(createContact.createContactHeader).toBeVisible();

    // step 4: fill out the contact creation form with invalid data, always excluding one field
    for (const field of Object.values(ContactData)) {
      await createContact.fillFormExceptField(field);
      await createContact.saveContact.click();
      // step 5: make sure the error message is visible
      await expect(createContact.errorMessage).toBeVisible();
      // step 6: clear form for the next iteration
      await createContact.clearForm();
    }
  }
);
