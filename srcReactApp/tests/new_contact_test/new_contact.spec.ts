import { expect } from "@playwright/test";
import reactAppTest from "../setup/testLevelHooks.setup";
import ReactAppEndpoints from "../../utils/endpoints.util";
import {
  newContactData,
  invalidPhoneTestCases,
  emptyFieldTestCases,
} from "./newContact.data";

/**
 * Tests for creating a new contact.
 * Uses:
 *  contacts()   → contacts list page (search, navigate to form)
 *  newContact() → create contact form (fill form, save, error messages)
 */
const newContactsTest = reactAppTest.extend({});

const phoneError = 'Error: The "phone" field should be a valid phone number.';

/** Upper bound (exclusive) for the random numeric suffix appended to test contact names. */
const RANDOM_SUFFIX_MAX = 1000;
/** Index of the first contact row in the contacts list. */
const FIRST_CONTACT_INDEX = 0;

/**
 * Navigate to the Create Contact form before every test so each
 * test body can focus solely on its own actions, not on navigation.
 */
newContactsTest.beforeEach(async ({ contacts, newContact, page }) => {
  await contacts().createContactButton.click();
  expect(page.url()).toContain(ReactAppEndpoints.createContact);
  await expect(newContact().createContactTitle).toHaveText("Create Contact");
});

newContactsTest(
  "Add to contacts list, search for it, delete it and check if it is deleted",
  async ({ contacts, newContact, page }): Promise<void> => {
    const testContact = {
      name: "TestName" + Math.floor(Math.random() * RANDOM_SUFFIX_MAX),
    };

    await newContact().fillContactForm(newContactData.valid(testContact.name));
    await newContact().saveButton.click();

    expect(page.url()).not.toContain(ReactAppEndpoints.createContact);
    await contacts().searchContacts(testContact.name);
    await expect(contacts().noItemsMessage).not.toBeVisible();
    await expect(
      contacts().getContactComponentByIndex(FIRST_CONTACT_INDEX).name
    ).toHaveText(testContact.name);

    await page.reload();
    await contacts().searchContacts(testContact.name);
    await expect(
      contacts().getContactByName(testContact.name).first()
    ).not.toBeVisible();
  }
);

for (const { description, data, errorMessage } of emptyFieldTestCases) {
  newContactsTest(
    `Submit form with ${description} shows error`,
    async ({ newContact, page }): Promise<void> => {
      await newContact().fillContactForm(data);
      await newContact().saveButton.click();

      expect(page.url()).toContain(ReactAppEndpoints.createContact);
      await expect(newContact().errorMessage).toHaveText(errorMessage);
    }
  );
}

for (const { description, data } of invalidPhoneTestCases) {
  newContactsTest(
    `Break the phone field with ${description}`,
    async ({ newContact, page }): Promise<void> => {
      await newContact().fillContactForm(data);
      await newContact().saveButton.click();

      expect(page.url()).toContain(ReactAppEndpoints.createContact);
      await expect(newContact().errorMessage).toHaveText(phoneError);
    }
  );
}
