import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";
import ReactAppEndpoints from "../utils/endpoints.util";
import { IContact } from "../models/contact.model";

const createContactTest = reactAppTest.extend({});

const validContact: IContact = {
  name: "Test User 1",
  phone: "123456789",
  street: "123 Test Street",
  city: "Test City",
};

const newContact: IContact = {
  name: "Test User 1",
  gender: "Male",
  phone: "123456789",
  street: "123 Test Street",
  city: "Test City",
};

createContactTest(
  "Create a new contact - verify it appears in the list and disappears after refresh",
  async ({ page, contacts, createContact }): Promise<void> => {
    const contactsPage = contacts();
    const createContactPage = createContact();

    await contactsPage.createButton.click();
    await expect(page).toHaveURL(
      new RegExp(ReactAppEndpoints.CREATE_CONTACT)
    );
    await expect(createContactPage.pageTitle).toHaveText("Create Contact");
    await createContactPage.fillForm(newContact);
    await createContactPage.saveContact();
    await expect(page).not.toHaveURL(
      new RegExp(ReactAppEndpoints.CREATE_CONTACT)
    );
    await expect(contactsPage.pageTitle).toHaveText("Contacts");
    await contactsPage.searchBar.fill(newContact.name);
    await expect(contactsPage.contactCards).toHaveCount(1);
    await expect(contactsPage.contact.nameLabel.first()).toHaveText(
      newContact.name
    );
    await expect(page.locator('[data-id="gender"]')).toHaveText(
      newContact.gender!
    );
    await expect(page.locator('[data-id="address"]')).toHaveText(
      `${newContact.street}, ${newContact.city}`
    );
    await page.reload();
    await contactsPage.searchBar.fill(newContact.name);
    await expect(contactsPage.contactCards).toHaveCount(0);
  }
);

const emptyFieldCases: { contact: IContact; label: string }[] = [
  {
    contact: { ...validContact, name: "" },
    label: "Name",
  },
  {
    contact: { ...validContact, phone: "" },
    label: "Phone",
  },
  {
    contact: { ...validContact, street: "" },
    label: "Street",
  },
  {
    contact: { ...validContact, city: "" },
    label: "City",
  },
];

createContactTest.describe("Empty field validation", () => {
  createContactTest.describe.configure({ mode: "parallel" });

  for (const { contact, label } of emptyFieldCases) {
    createContactTest(
      `Leave ${label} field empty - verify error and form stays on /create`,
      async ({ page, contacts, createContact }): Promise<void> => {
        const contactsPage = contacts();
        const createContactPage = createContact();

        await contactsPage.createButton.click();
        await expect(page).toHaveURL(
          new RegExp(ReactAppEndpoints.CREATE_CONTACT)
        );
        await createContactPage.fillForm(contact);
        await createContactPage.saveContact();
        await expect(page).toHaveURL(
          new RegExp(ReactAppEndpoints.CREATE_CONTACT)
        );
        await expect(createContactPage.errorMessage).toBeVisible();
      }
    );
  }
});

const invalidPhoneCases: { phone: string; description: string }[] = [
  { phone: "3534543543324523", description: "too many digits" },
  { phone: "12", description: "too few digits" },
  { phone: "abcdefgh", description: "letters only" },
  { phone: "!@#$%^&*", description: "special characters" },
  { phone: "123-abc-456", description: "mixed letters and digits" },
];

// App currently accepts all phone inputs without validation — marking as fixme
createContactTest.describe.fixme("Phone field validation", () => {
  createContactTest.describe.configure({ mode: "parallel" });

  for (const { phone, description } of invalidPhoneCases) {
    createContactTest(
      `Phone field invalid input (${description}) - verify error shown`,
      async ({ page, contacts, createContact }): Promise<void> => {
        const contactsPage = contacts();
        const createContactPage = createContact();

        await contactsPage.createButton.click();
        await expect(page).toHaveURL(
          new RegExp(ReactAppEndpoints.CREATE_CONTACT)
        );
        await createContactPage.fillForm({
          ...validContact,
          phone,
        });
        await createContactPage.saveContact();
        await expect(page).toHaveURL(
          new RegExp(ReactAppEndpoints.CREATE_CONTACT)
        );
        await expect(createContactPage.errorMessage).toBeVisible();
      }
    );
  }
});
