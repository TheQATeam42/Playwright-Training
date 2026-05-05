import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
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

newContactsTest(
  "add to contacts list, search for it, delete it and check if it is deleted",
  async ({ contacts, newContact, page }): Promise<void> => {
    await contacts().createContactButton.click();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().createContactTitle).toHaveText("Create Contact");

    const randomName = "TestName" + Math.floor(Math.random() * 1000);
    await newContact().fillContactForm(newContactData.valid(randomName));
    await newContact().saveButton.click();
    const numberofContact: number = 0;
    expect(page.url()).not.toContain(ReactAppEndpoints.createContact);
    await contacts().searchContacts(randomName);
    await expect(contacts().noItemsMessage).not.toBeVisible();
    await expect(
      contacts().getContactComponentByIndex(numberofContact).name
    ).toHaveText(randomName);

    await page.reload();
    await contacts().searchContacts(randomName);
    await expect(
      contacts().getContactByName(randomName).first()
    ).not.toBeVisible();
  }
);

for (const { description, data, errorMessage } of emptyFieldTestCases) {
  newContactsTest(
    `submit form with ${description} shows error`,
    async ({ contacts, newContact, page }): Promise<void> => {
      await expect(contacts().searchBar).toBeVisible();
      await contacts().createContactButton.click();
      expect(page.url()).toContain(ReactAppEndpoints.createContact);
      await expect(newContact().createContactTitle).toHaveText(
        "Create Contact"
      );

      await newContact().fillContactForm(data);
      await newContact().saveButton.click();

      expect(page.url()).toContain(ReactAppEndpoints.createContact);
      await expect(newContact().errorMessage).toHaveText(errorMessage);
    }
  );
}

for (const { description, data } of invalidPhoneTestCases) {
  newContactsTest(
    `break the phone field with ${description}`,
    async ({ contacts, newContact, page }): Promise<void> => {
      await expect(contacts().searchBar).toBeVisible();
      await contacts().createContactButton.click();
      expect(page.url()).toContain(ReactAppEndpoints.createContact);
      await expect(newContact().createContactTitle).toHaveText(
        "Create Contact"
      );

      await newContact().fillContactForm(data);
      await newContact().saveButton.click();

      expect(page.url()).toContain(ReactAppEndpoints.createContact);
      await expect(newContact().errorMessage).toHaveText(phoneError);
    }
  );
}
