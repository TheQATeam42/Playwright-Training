import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
/**
 * Tests for creating a new contact.
 * Uses:
 *  contacts()   → contacts list page (search, navigate to form)
 *  newContact() → create contact form (fill form, save, error messages)
 */
const newContactsTest = reactAppTest.extend({});

newContactsTest(
  "add to contacts list, search for it, delete it and check if it is deleted",
  async ({ contacts, newContact, page }): Promise<void> => {
    await contacts().createContactButton.click();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().createContactTitle).toHaveText("Create Contact");

    const randomName = "TestName" + Math.floor(Math.random() * 1000);
    await newContact().fillContactForm(randomName, "Male", "123456789", "test street", "test city");
    await newContact().saveButton.click();

    expect(page.url()).not.toContain(ReactAppEndpoints.createContact);
    await contacts().searchContacts(randomName);
    await expect(contacts().noItemsMessage).not.toBeVisible();
    await expect(contacts().getContactComponentByIndex(0).name).toHaveText(randomName);

    await page.reload();
    await contacts().searchContacts(randomName);
    await expect(contacts().getContactByName(randomName).first()).not.toBeVisible();
  }
);

newContactsTest(
  "brake the phone field with invalid characters",
  async ({ contacts, newContact, page }): Promise<void> => {
    await expect(contacts().searchBar).toBeVisible();
    await contacts().createContactButton.click();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().createContactTitle).toHaveText("Create Contact");

    await newContact().fillContactForm("TestName", "Male", "wer", "test street", "test city");
    await newContact().saveButton.click();

    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().errorMessage).toHaveText(
      "Error: The \"phone\" field should be a valid phone number."
    );
  }
);

newContactsTest(
  "brake the phone field with negative number",
  async ({ contacts, newContact, page }): Promise<void> => {
    await expect(contacts().searchBar).toBeVisible();
    await contacts().createContactButton.click();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().createContactTitle).toHaveText("Create Contact");

    await newContact().fillContactForm("TestName", "Male", "-1244334323", "test street", "test city");
    await newContact().saveButton.click();

    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().errorMessage).toHaveText(
      "Error: The \"phone\" field should be a valid phone number."
    );
  }
);

newContactsTest(
  "break the phone field with unique characters",
  async ({ contacts, newContact, page }): Promise<void> => {
    await expect(contacts().searchBar).toBeVisible();
    await contacts().createContactButton.click();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().createContactTitle).toHaveText("Create Contact");

    await newContact().fillContactForm("TestName", "Male", "!@######$%$#@!$%$", "test street", "test city");
    await newContact().saveButton.click();

    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    await expect(newContact().errorMessage).toHaveText(
      "Error: The \"phone\" field should be a valid phone number."
    );
  }
);
