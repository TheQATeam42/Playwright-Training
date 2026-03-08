import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";
import ReactAppEndpoints from "../utils/endpoints.util";
import CreateContact from "../pages/createContact.page";

const createContactTest = reactAppTest.extend({});

type ContactFields = {
  name: string;
  phone: string;
  street: string;
  city: string;
};

const validContact: ContactFields = {
  name: "Test User 1",
  phone: "123456789",
  street: "123 Test Street",
  city: "Test City",
};


const newContact = {
  name: "Test User 1",
  gender: "Male",
  phone: "123456789",
  street: "123 Test Street",
  city: "Test City",
};

const emptyFieldCases: { field: keyof ContactFields; label: string }[] = [
  { field: "name",   label: "Name"   },
  { field: "phone",  label: "Phone"  },
  { field: "street", label: "Street" },
  { field: "city",   label: "City"   },
];

createContactTest(
  "Create a new contact - verify it appears in the list and disappears after refresh",
  async ({ page, contacts, createContact }): Promise<void> => {
    const contactsPage = contacts();
    const createContactPage = createContact();

    await expect(contactsPage.createButton).toBeVisible();
    await contactsPage.createButton.click();
    await expect(page).toHaveURL(new RegExp(ReactAppEndpoints.CREATE_CONTACT));
    await expect(createContactPage.pageTitle).toHaveText("Create Contact");
    await createContactPage.fillForm(newContact);
    await createContactPage.saveContact();
    await expect(page).toHaveURL(new RegExp(ReactAppEndpoints.HOME));
    await expect(contactsPage.pageTitle).toHaveText("Contacts");
    await contactsPage.searchContact(newContact.name);
    await expect(contactsPage.contactCards).toHaveCount(1);
    await expect(page.locator('[data-id="name"]')).toHaveText(newContact.name);
    await expect(page.locator('[data-id="gender"]')).toHaveText(newContact.gender);
    await expect(page.locator('[data-id="address"]')).toHaveText(`${newContact.street}, ${newContact.city}`);
    await page.reload();
    await contactsPage.searchContact(newContact.name);
    await expect(contactsPage.contactCards).toHaveCount(0);
  }
);

async function fillFormExcept(
  createContactPage: CreateContact,
  emptyField: keyof ContactFields
): Promise<void> {
  const data = { ...validContact, [emptyField]: "" };
  await createContactPage.fillForm(data);
}

for (const { field, label } of emptyFieldCases) {
  createContactTest(
    `Leave ${label} field empty - verify error and form stays on /create`,
    async ({ page, contacts, createContact }): Promise<void> => {
      const contactsPage    = contacts();
      const createContactPage = createContact();

      await expect(contactsPage.createButton).toBeVisible();
      await contactsPage.createButton.click();
      await expect(page).toHaveURL(new RegExp(ReactAppEndpoints.CREATE_CONTACT));
      await fillFormExcept(createContactPage, field);
      await createContactPage.saveContact();
      await expect(page).toHaveURL(new RegExp(ReactAppEndpoints.CREATE_CONTACT));
      await expect(
        page.locator(`[data-id="error-message"]`)
      ).toBeVisible();
    }
  );
}

createContactTest(
    `Phone field invalid input - verify error shown`,
    async ({ page, contacts, createContact }): Promise<void> => {
      const contactsPage      = contacts();
      const createContactPage = createContact();

      await expect(contactsPage.createButton).toBeVisible();
      await contactsPage.createButton.click();
      await expect(page).toHaveURL(new RegExp(ReactAppEndpoints.CREATE_CONTACT));
      await createContactPage.fillForm({
        name:   "Test User",
        phone:  "3534543543324523",
        street: "123 Test Street",
        city:   "Test City",
      });

      await createContactPage.saveContact();
      await expect(page).toHaveURL(new RegExp(ReactAppEndpoints.CREATE_CONTACT));
      await expect(
        page.locator('[data-id="error-message"]')
      ).toBeVisible();
    }
  );