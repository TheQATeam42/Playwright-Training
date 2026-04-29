import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";

/**
 * Tests for creating a new contact.
 * Uses:
 *  contacts()   → contacts list page (search, navigate to form)
 *  newContact() → create contact form (fill form, save, error messages)
 */
const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "add to contacts list, search for it, delete it and check if it is deleted",
  async ({ contacts, newContact, page }): Promise<void> => {
    await contacts().createContactButtonClick();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    expect(await newContact().createContactTitle.textContent()).toBe("Create Contact");

    const randomName = "TestName" + Math.floor(Math.random() * 1000);
    await newContact().fillContactForm(randomName, "Male", "123456789", "test street", "test city");
    await newContact().saveContact();

    expect(page.url()).not.toContain(ReactAppEndpoints.createContact);
    await contacts().searchContacts(randomName);
    expect(await contacts().issearchResultEmpty()).toBeFalsy();
    expect(await contacts().getContactNameByIndex(0)).toBe(randomName);

    await page.reload();
    await contacts().searchContacts(randomName);
    expect(await contacts().isContactInList(randomName)).toBeFalsy();
  }
);

contactsListTest(
  "brake the phone field",
  async ({ contacts, newContact, page }): Promise<void> => {
    expect(await contacts().issherachbarVisible()).toBeTruthy();
    await contacts().createContactButtonClick();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    expect(await newContact().createContactTitle.textContent()).toBe("Create Contact");

    await newContact().fillContactForm("TestName", "Male", "wer", "test street", "test city");
    await newContact().saveContact();

    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    expect(await newContact().getErrorMessageText()).toBe(
      "Error: The \"phone\" field should be a valid phone number."
    );
  }
);
